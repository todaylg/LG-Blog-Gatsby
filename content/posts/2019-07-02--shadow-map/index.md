---
title: ShadowMap学习笔记
category: "小结"
cover: bg.png
author: todaylg

---

给场景添加上shadow可以大大提高场景的真实感，所以讲道理关于Shadow的实现还是要学习一波的～

最简易的Shadow实现方法就是直接在物体下方摆张黑底贴图啦。好处自然是省掉了Shadow的相关计算，非常节约性能，所以如今在很多游戏里都还可以见到使用；坏处则是其毕竟是“粗旷“的模拟，效果及通用性都差强人意。

当前较流行的实时Shadow渲染技术是**Shadow Map**与**Shadow Volume**，二者的介绍及比较可以参考[这篇文章](https://www.cnblogs.com/wonderKK/p/5069863.html)。

两种技术各有优劣，但是Shadow Map的实现相较于Shadow Volume更简易，并且场景适用性、渲染效果、性能都不差，所以在实时渲染中Shadow Map更为流行。

总结一波实践Shadow Map的涉及的一些原理以及实践接入LGL过程中所遇到的问题：

[实践Example](http://todaylg.com/LGL/examples/?src=shadowMap_Spot.html)

## ShadowMap

shadowMap的原理其实很简单：以光源的视角渲染整个场景，在这个视角下看不到的物体就是在阴影中（也就是被挡住了）。

所以整个ShadowMap的渲染可以分为两大步：

* 1.以光源为视点对场景进行渲染，得到场景中距离光源最近片元深度值的DepthTexture（GPU实现）

* 2.回到视点正常渲染场景，通过比较场景中片元到光源的距离与DepthTexture相应位置值的大小来判断该片元是否处于阴影中

实践过程中还是遇到了挺多问题的：

### Depth Texture

在正常渲染场景之前需要先完成DepthTexture的渲染，而渲染DepthTexture只关心场景中物体的深度值，所以Shader可以简化到很少：

```glsl
const vertex = `
precision highp float;
precision highp int;

in vec2 uv;
in vec3 position;
in vec3 normal;

uniform mat4 worldMatrix; //使用WorldMatrix来同步父级Transform的变换

uniform mat4 lightSpaceMatrix;

void main() {
    //完成视点变换即可
    gl_Position = lightSpaceMatrix * worldMatrix * vec4(position, 1.0);

}
`;

const fragment = `#version 300 es
void main() {
    // gl_FragDepth = gl_FragCoord.z; //默认就是读取gl_FragCoord.z的值，

}
`;

export default {vertex, fragment};
```

**Skinning/MorphTarget：**

需要注意Skinning和MorphTarget这些顶点在Shader中还会进行特殊处理的特性，若要实现渲染包含这些特性的Shadow，那么在渲染DepthTexture的Shader也要添加同步的顶点变换，否则就会一直停留在绑定姿势的顶点位置。Skinning/MorphTarget在前面的[glTF学习笔记](http://todaylg.com/LG-Blog-Gatsby/glTF-record/)有记录，这里不再赘述。

**API差别：**

在WebGL1.0中渲染DepthTexture需要依赖插件[WEBGL\_depth\_texture](https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_depth_texture)，2.0原生支持。

```javascript
//WebGL1.0 + WEBGL_depth_texture
gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, gl.DEPTH_COMPONENT, gl.UNSIGNED_INT, null);

//WebGL2.0
gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, width, height, 0, gl.DEPTH_COMPONENT24, gl.UNSIGNED_INT, null);
```

**DepthTexture的精度：**

在设置Texture的internalFormat时便决定了能存储的Depth值精度（gl.DEPTH_COMPONENT24 => 24位精度）：

```glsl
//1.渲染DepthTexture时的片元着色器
void main() {
    // gl_FragDepth = gl_FragCoord.z;
}
//2.使用DepthTexture时：
float depth = texture(depthMap, vUv).r; //深度值会存储在R通道
```

我们还可以在渲染DepthTexture时将深度值存储在RGBA通道，在使用DepthTexture的时候再复原，这样便有4x8=32位的精度：

```javascript
//1.渲染DepthTexture时的片元着色器

vec4 packDepthToRGBA( const in float z ) {
    vec4 bitShift = vec4(1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0);//左移0/8/16/32位

    vec4 rgbaDepth = fract(z * bitShift);//取左移后的小数部分
    //左移0位 - 左移8位的多余部分：1.0/256
    //左移8位 - 左移16位的多余部分：1.0/256
    //左移16位 - 左移24位的多余部分：1.0/256
    //左移24位 - 后面的不用管了:0
    const vec4 bitMask = vec4(1.0/256.0, 1.0/256.0, 1.0/256.0, 0.0);

    return rgbaDepth -= rgbaDepth.gbaa * bitMask;
}
out vec4 FragColor;
void main() {
    FragColor = packDepthToRGBA(gl_FragCoord.z);
}
//2.使用DepthTexture时：
float unpackRGBAToDepth( const in vec4 v ) {
    //右移相应位数复原Depth
    const vec4 bitShift = vec4(1.0, 1.0/256.0, 1.0/(256.0*256.0), 1.0/(256.0*256.0*256.0));
    float depth = dot(v, bitShift);
    return depth;
}
```

**Ortho/Perspective：**

在渲染深度贴图时，Light的正交投影(Orthographic)和透视投影(Projection)之间有所不同，正交投影中深度值保持线性，而透视投影深度值为非线性，在Shader中与View Space下的深度进行比较时需要逆变换还原到线性的深度值：

```glsl

// Projection <=> View
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
    return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {
    return linearClipZ * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
    return (( near + viewZ ) * far ) / (( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {
    return ( near * far ) / ( ( far - near ) * invClipZ - far );
}

float readOrthoDepth(sampler2D depthSampler, vec2 coord ) {
    //直接读取就行

    float depth = texture(depthSampler, coord).r;
    return depth;
}
float readPerspectiveDepth(sampler2D depthSampler, vec2 coord, float near, float far ) {
    float fragCoordZ = texture(depthSampler, coord).r; // Screen Space 

    float z = fragCoordZ * 2.0 - 1.0; // Clip Space 
    float viewZ = perspectiveDepthToViewZ(z, near, far);
    viewZ = viewZToOrthographicDepth(viewZ, near, far);
    return viewZ;
}
```

**CubeDepthTexture：**

点光源阴影的渲染依赖CubeDepthTexture：

```javascript
//创建CubeMap Texture
let cubeTexture = this.gl.createTexture();
this.gl.bindTexture(gl.TEXTURE_CUBE_MAP, cubeTexture);
...//设置Texture参数
//渲染每个面:
for (let i = 0; i < 6; i++) {
    this.gl.framebufferTexture2D(depthBuffer.target, this.gl.DEPTH_ATTACHMENT, this.gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, light.depthTexture.texture, 0);
    renderScene();
}
```

### Light

在得到DepthTexture之后就可以进行Shadow的渲染了，计算光照效果都用的是[Blinn-Phong](https://learnopengl-cn.github.io/05%20Advanced%20Lighting/01%20Advanced%20Lighting/)模型进行计算，但每种不同的光源所模拟的光照效果以及对应的Shadow渲染方法都不太一样，需要进行区分处理：

**Direction Light：**

Direction Light模拟的是平行光效果，所有光线都是平行的（比如太阳光）

```glsl
//Light Calulation
vec3 CalcDirLight(DirectionalLight dirLight, vec3 normal){
    vec3 lightDir = normalize(dirLight.lightPos - dirLight.target);
    vec3 viewDir = normalize(cameraPosition - vFragPos);
    vec3 halfwayDir = normalize(lightDir + viewDir);
    // diffuse
    vec3 diffuse = dirLight.diffuseFactor * max(dot(normal, lightDir),0.0) * dirLight.lightColor;
    // specular
    float spec = pow(max(dot(normal, halfwayDir), 0.0), 32.0);
    vec3 specular = dirLight.specularFactor * spec * dirLight.lightColor;

    return (diffuse + specular);
}
//Shadow Calulation
float dirShadowMaskCal(sampler2D shadowMap, vec4 fragPosLightSpace, DirectionalLight dirLight, vec3 normalVal) {
    vec3 lightDirVal = normalize(dirLight.lightPos - vFragPos);
    // View Space => Screen Space

    vec3 projCoords = fragPosLightSpace.xyz / fragPosLightSpace.w;
    projCoords = projCoords * 0.5 + 0.5;
    float bias = max(0.05 * (1.0 - max(dot(normalVal, lightDirVal),0.)), 0.005);
    // Get current fragment depth
    projCoords.z -= bias;
    float shadow = 0.0;
    //PCF
    #ifdef SHADOWMAP_TYPE_PCF
        vec2 texelSize = 1.0 /vec2(textureSize(shadowMap, 0));

        for(int x = -1; x <= 1; ++x)

        {

            for(int y = -1; y <= 1; ++y)

            {

                float pcfDepth = 0.0;

                pcfDepth = readOrthoDepth(shadowMap, projCoords.xy + vec2(x, y) * texelSize); 

                shadow += compareDepthTexture(pcfDepth, projCoords.z);

            }    

        }

            shadow /= 9.0;
    #else

        shadow = compareDepthTexture(readOrthoDepth(shadowMap, projCoords.xy), projCoords.z);

    #endif
}
```

添加阴影偏移值bias、PCF的原理都可见[文章](https://learnopengl-cn.github.io/05%20Advanced%20Lighting/03%20Shadows/01%20Shadow%20Mapping/)

**Spot Light：**

Spot Light模拟的是聚光灯的效果，向一个方向发射光速（比如手电筒、台灯）:

```glsl
//Light Calulation
vec3 CalcSpotLight(SpotLight spotLight, vec3 normal){
    ... // diffuse与specular计算与DirectionLight一致
    // attenuation
    float distance = length(spotLight.lightPos - vFragPos);
    float attenuation = 1.0 / (spotLight.constant + spotLight.linear * distance + spotLight.quadratic * (distance * distance));    
    // spotlight intensity
    float theta = dot(lightDir, normalize(spotLight.lightPos - spotLight.target));
    float epsilon = spotLight.cutOff - spotLight.outerCutOff;
    float intensity = clamp((theta - spotLight.outerCutOff) / epsilon, 0.0, 1.0);
    // combine results
    diffuse *= attenuation * intensity;
    specular *= attenuation * intensity;
    return (diffuse + specular);
}
//Shadow Calulation
float spotShadowMaskCal(sampler2D shadowMap, vec4 fragPosLightSpace, SpotLight spotLight, vec3 normalVal) {
    vec3 lightDirVal = normalize(spotLight.lightPos - vFragPos);

    float clipSpaceDepth = fragPosLightSpace.z / fragPosLightSpace.w;

    // Clip Space => View Space
    float linearDepth = perspectiveDepthToViewZ(fragPosLightSpace.z/fragPosLightSpace.w, spotLight.lightCameraNear, spotLight.lightCameraFar);
    linearDepth = viewZToOrthographicDepth(linearDepth, spotLight.lightCameraNear, spotLight.lightCameraFar);
    // Clip Space => Screen Space
    vec3 projCoords = fragPosLightSpace.xyz / fragPosLightSpace.w;
    projCoords = projCoords * 0.5 + 0.5;

    float bias = max(0.05 * (1.0 - max(dot(normalVal, lightDirVal),0.)), 0.005);
    linearDepth -= bias;

    float shadow = 0.0;
    #ifdef SHADOWMAP_TYPE_PCF
        vec2 texelSize = 1.0 /vec2(textureSize(shadowMap, 0));
        for(int x = -1; x <= 1; ++x)
        {
            for(int y = -1; y <= 1; ++y)
            {
                float pcfDepth = 0.0;
                pcfDepth = readPerspectiveDepth(shadowMap, projCoords.xy + vec2(x, y) * texelSize, spotLight.lightCameraNear, spotLight.lightCameraFar); 
                shadow += compareDepthTexture(pcfDepth, linearDepth);
            }    
        }
        shadow /= 9.0;
    #else
        shadow = compareDepthTexture(readPerspectiveDepth(shadowMap, projCoords.xy, spotLight.lightCameraNear, spotLight.lightCameraFar), linearDepth); 
    #endif

    return shadow;
}
```

**Point Light：**

Point Light模拟的是点光源的效果，向所有方向发射光线（比如灯泡）

```glsl
//Light Calulation
vec3 CalcPointLight(PointLight pointLight, vec3 normal){
    vec3 viewDir = normalize(cameraPosition - vFragPos);
    vec3 lightDir = normalize(pointLight.lightPos - vFragPos);
    vec3 halfwayDir = normalize(lightDir + viewDir);
    // diffuse
    vec3 diffuse = pointLight.diffuseFactor * max(dot(normal, lightDir),0.0) * pointLight.lightColor;
    // specular
    float spec = pow(max(dot(normal, halfwayDir), 0.0), 32.0);
    vec3 specular = pointLight.specularFactor * spec * pointLight.lightColor;
    // attenuation
    float distance = length(pointLight.lightPos - vFragPos);
    float attenuation = 1.0 / (pointLight.constant + pointLight.linear * distance + pointLight.quadratic * (distance * distance));    
    // combine results
    diffuse *= attenuation;
    specular *= attenuation;
    return (diffuse + specular);
}
```

点光源的阴影依赖CubeDepthTexture，在渲染深度贴的时候写入片元与光源的线性距离作为深度值：

```glsl
void main() {
    #ifdef POINT_SHADOW
        // get distance between fragment and light source
        float lightDistance = length(vFragPos - lightPos);
        // map to [0;1] range by dividing by far_plane
        lightDistance = lightDistance / far;
        // write this as modified depth
        gl_FragDepth = lightDistance;
    #endif
    // gl_FragDepth = gl_FragCoord.z;
}
```

渲染点阴影的时候再直接进行比较：

```glsl

float readCubeMapDepth(samplerCube depthSampler, vec3 coord, float far ) {
    float distanceZ = texture(depthSampler, coord).r; // Screen Space [0,1]
    // (0=>1) => (0=>far)
    distanceZ +=  0.0002; // bias
    distanceZ *= far;
    return distanceZ;
}
float pointShadowMaskCal(samplerCube shadowMap, PointLight pointLight) {
    // Get vector between fragment position and light position
    vec3 fragToLight = vFragPos - pointLight.lightPos; //View Space
    float currentDepth = length(fragToLight);//View Distance
    float closestDepth = readCubeMapDepth(shadowMap, fragToLight, pointLight.lightCameraFar);
    float shadow = step(currentDepth, closestDepth);
    return shadow;
}
```

最后再将各个光源结果累加即可得到结果：

```glsl
void main() {
    vec3 ambient = ambientStrength * ambientLightColor;
    vec3 normal = normalize(vNormal);
    vec3 result = vec3(0.);
    #if NUM_DIR_LIGHTS > 0
        vec3 perDirLightRes = vec3(0.);
        for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
            perDirLightRes = CalcDirLight(dirLights[i], normal);
            float shadow = dirShadowMaskCal(dirShadowMap[i], dirFragPos[i], dirLights[i], normal);
            result += perDirLightRes * shadow;
        }
    #endif
    #if NUM_SPOT_LIGHTS > 0
        vec3 perSpotLightRes = vec3(0.);
        for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
            perSpotLightRes = CalcSpotLight(spotLights[i], normal);
            float shadow = spotShadowMaskCal(spotShadowMap[i], spotFragPos[i], spotLights[i], normal);
            result += perSpotLightRes * shadow;
        }
    #endif
    #if NUM_POINT_LIGHTS > 0
        vec3 perPointLightRes = vec3(0.);
        for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
            perPointLightRes = CalcPointLight(pointLights[i], normal);
            float shadow = pointShadowMaskCal(pointShadowMap[i], pointFragPos[i], pointLights[i]);
            result += perPointLightRes * shadow;
        }
    #endif
    result = baseColor * (ambient + result);
    FragColor = vec4(result, 1.0);
}
```

Todo：

- [ ] Frustum Culling

- [ ] 实现其他的[Soft ShadowMap](https://www.cnblogs.com/lancidie/archive/2012/02/07/2341298.html)方法
