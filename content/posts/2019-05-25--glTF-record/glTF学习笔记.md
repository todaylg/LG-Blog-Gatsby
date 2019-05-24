---
title: glTF学习笔记
category: "小结"
cover: bg.jpg
author: todaylg

---

当想要构建包含复杂模型的场景时，如何从建模工具导出的模型文件中解析并复原模型就成了必须要解决的一个问题。

首先需要了解一下各种三维文件的格式：[三维文件格式知多少](https://www.bgteach.com/article/132)

glTF无疑是应用于Web平台的首选格式，作为一个WebGL Renderer的LGL，可以没有其他格式的Loader，但是glTFLoader还是要想办法搞出来的：

[glTFLoader of LGL](https://github.com/todaylg/glTFLoader)

当前Animation和Extension还不支持，在实践过程中又踩了几块之前没有学习到的知识，总结备忘一波：

## glTF

正如上面格式介绍的文章中有对glTF的介绍，glTF是由[Khronos Group设计与设定](https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md)的，设计目的在于为3D建模工具和应用间提供一个高效率传输、易拓展、具有互通性的**3D内容格式规范**，并且当前已得到了广泛的认可与支持（[Apple除外](https://zhuanlan.zhihu.com/p/37735460)）。

### 节点数据结构

![image](https://github.com/KhronosGroup/glTF/raw/master/specification/2.0/figures/dictionary-objects.png)

glTF资源由三部分组成：

* 包含完整场景描述的json格式文件（`.gltf`）

* 包含几何、动画数据以及其他缓冲数据的二进制文件（`.bin`）

* 纹理图片文件（`.jpg``.png`）

即需要通过对.glTF的解析，获取到整个场景的完整组成及层级信息，并且按照划分的读取区域从.bin文件中读取出对应的具体数据，纹理图片则通过加载图片获取。最终Loader使用具体数据并依照层级关系重新复现场景。

上层的各个节点之间通过数组索引的方式建立联接，最底层的buffer、image节点则通过URI引入资源。

以buffer => bufferViews => accessors这条链路为例：

* 每个buffer会通过URI联接到二进制的数据文件(.bin)上，并从原始数据块中分割指定的长度（由byteLength参数决定）。

* 每个bufferView则指向一个buffer，由byteOffset和byteLength定义出属于这个bufferView的buffer数据部分，并指定buffer target（[bindBuffer](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/bindBuffer)）

* 每个accessors定义了如何解析每个bufferViews，比如附加的byteOffset指的是读取bufferView的起始位置，type、componentType决定了数据类型及排列方式。（[VertexAttribPointer](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/VertexAttribPointer)）

至于上层节点之间层级关系的构建，其实就是各自节点获取各自节点的依赖引用节点后进行实现，这里就不再赘述了。

### Physically Based Rendering（PBR）

关于PBR的WebGL实现其实已经有现成的例子：[glTF-Sample-Viewer](https://github.com/KhronosGroup/glTF-Sample-Viewer)，但是鲁迅先生可能曾经说过：

> 白嫖没有问题，但是至少要知道白嫖的是个什么东西。

秉持着这样的学术精神，我们还是有必要了解一下PBR是个啥。

关于PBR的理论知识可以参考下面的几篇文章：

[https://learnopengl.com/PBR/Theory](https://learnopengl.com/PBR/Theory)

[https://zhuanlan.zhihu.com/p/61962884](https://zhuanlan.zhihu.com/p/61962884)

[https://zhuanlan.zhihu.com/p/53086060](https://zhuanlan.zhihu.com/p/53086060)

正如第三篇文章的脑图，PBR设计的知识非常的广且多，想要非常深入的理解并不容易。

不过第一篇文章的PBR部分堪称新手之友了，形象的描述了公式各部分的作用，同时又隐藏掉了公式的推导和计算细节，并且还提供了各部分的实现的实例代码。所以只需要有一个大致了解的话，仔细读第一篇文章+翻源码就完事啦~

最主要的是反射方程：

`Lo(p,ωo)=∫Ω fr(p,ωi,ωo) Li(p,ωi) n⋅ωi dωi`

表示累积在半球领域Ω（以p点法线为中心）内，入射(光)角为ωi的入射光在点p上对反射(观察)角wo的所有出射辐射量总和Lo（受fr的影响）。

把公式拆分：

* fr(p,ωi,ωo)：双向反射分布函数(BRDF - Bidirectional Reflective Distribution Function) 

* Li(p,ωi)：入射光

* n⋅ωi ：Lambert漫反射的点乘

**BRDF(双向反射分布函数)**:

作用为：近似的求出每束光线对一个给定了材质属性的平面上最终反射出来的光线所作出的贡献程度，即入射方向到出射方向光的反射比例。

由漫反射及镜面反射两部分组成：`fr=kd*flambert+ks*fcook−torrance`

漫反射：`flambert=c/π`

镜面反射：`DFG/4(ωo⋅n)(ωi⋅n)`

保证能量守恒：`kd = 1- ks`

**lambert**：

```glsl
vec3 diffuse(PBRInfo pbrInputs)
{
    return pbrInputs.diffuseColor / M_PI;
}
```

**D-法线分布函数(Normal Distribution Function)**

估算在受到表面粗糙度的影响下，取向方向与中间向量一致的微平面的数量。这是用来估算微平面的主要函数。

```glsl
//Trowbridge-Reitz GGX
float microfacetDistribution(PBRInfo pbrInputs)
{
    float roughnessSq = pbrInputs.alphaRoughness * pbrInputs.alphaRoughness;
    float f = (pbrInputs.NdotH * roughnessSq - pbrInputs.NdotH) * pbrInputs.NdotH + 1.0;
    return roughnessSq / (M_PI * f * f);
}
```

**F-菲涅尔方程(Fresnel Rquation)**

菲涅尔方程描述的是在不同的表面角下表面所反射的光线所占的比率。

```glsl
//Fresnel-Schlick近似(Fresnel-Schlick Approximation)
float geometricOcclusion(PBRInfo pbrInputs)
{
    float NdotL = pbrInputs.NdotL;
    float NdotV = pbrInputs.NdotV;
    float r = pbrInputs.alphaRoughness;

    float attenuationL = 2.0 * NdotL / (NdotL + sqrt(r * r + (1.0 - r * r) * (NdotL * NdotL)));
    float attenuationV = 2.0 * NdotV / (NdotV + sqrt(r * r + (1.0 - r * r) * (NdotV * NdotV)));
    return attenuationL * attenuationV;
}
```

**G-几何函数(Geometry Function)**

描述了微平面自成阴影的属性。当一个平面相对比较粗糙的时候，平面表面上的微平面有可能挡住其他的微平面从而减少表面所反射的光线。

```glsl
//Smith’s Schlick-GGX
vec3 specularReflection(PBRInfo pbrInputs)
{
    return pbrInputs.reflectance0 + (pbrInputs.reflectance90 - pbrInputs.reflectance0) * pow(clamp(1.0 - pbrInputs.VdotH, 0.0, 1.0), 5.0);
}
```

最后结果即为：

```glsl
vec3 diffuseContrib = (1.0 - F) * diffuse(pbrInputs);

vec3 specContrib = F * G * D / (4.0 * NdotL * NdotV);

// Obtain final intensity as reflectance (BRDF) scaled by the energy of the light (cosine law)

vec3 color = NdotL * u_LightColor * (diffuseContrib + specContrib);
```

**IBL（Image Based Lighting）**

对于环境光照的因素，采样的是IBL，即基于图像的照明，相当于一个无限大的球面光源在照射场景。

IBL也由漫反射及镜面反射两部分组成，但是为了追求实时渲染的快速计算，需要做一些预计算，最终在实时渲染中只需要通过简单的纹理采样即可得到结果。

详细的原理可以参考这篇[文章](https://zhuanlan.zhihu.com/p/66518450)的解释

```glsl
#ifdef USE_IBL
vec3 getIBLContribution(PBRInfo pbrInputs, vec3 n, vec3 reflection)
{
    //预计算贴图tLUT
    vec3 brdf = SRGBtoLINEAR(texture(tLUT, vec2(pbrInputs.NdotV, 1.0 - pbrInputs.perceptualRoughness))).rgb;
    // CubeMap
    vec3 diffuseLight = SRGBtoLINEAR(texture(tEnvDiffuse, n)).rgb;
    vec3 specularLight = SRGBtoLINEAR(texture(tEnvSpecular, reflection)).rgb;


    vec3 diffuse = diffuseLight * pbrInputs.diffuseColor;
    vec3 specular = specularLight * (pbrInputs.specularColor * brdf.x + brdf.y);


    return diffuse + specular;
}
#endif
```

最后将其他贴图的结果也进行累加：

```glsl
// Calculate lighting contribution from image based lighting source (IBL)
#ifdef USE_IBL

    color += getIBLContribution(pbrInputs, n, reflection);

#endif


// Apply optional PBR terms for additional (optional) shading
// AO MAP
#ifdef HAS_OCCLUSIONMAP

    float ao = texture(u_OcclusionSampler, vUv).r;

    color = mix(color, color * ao, u_OcclusionStrength);

#endif

//EMISSIVE MAP
#ifdef HAS_EMISSIVEMAP

    vec3 emissive = SRGBtoLINEAR(texture(u_EmissiveSampler, vUv)).rgb * u_EmissiveFactor;

    color += emissive;

#endif

FragColor = vec4(color, baseColor.a);
```

就得到最终的结果啦，白嫖Shader并接入LGL后的结果：

[http://todaylg.com/glTFLoader/examples/](http://todaylg.com/glTFLoader/examples/)

### Skinning

Skinning即蒙皮，表示将三维网格顶点联系至骨骼的过程。在此过程中，顶点需要获取其关联关节的关节矩阵，再根据蒙皮权重计算出蒙皮矩阵，从而变换顶点的位置和法线信息。

那如何在顶点着色器中获取到对应的关节矩阵呢？白嫖了一眼Three.js之后才恍然大悟，直接把所有关节矩阵保存为texture作为uniform属性，在顶点着色器中再根据绑定的skinIndex读取出来：

```javascript
this.boneTexture = new Texture(this.gl, {
    image: this.boneMatrices,

    generateMipmaps: false,

    type: this.gl.FLOAT,

    internalFormat: this.gl.renderer.isWebgl2 ? this.gl.RGBA16F : this.gl.RGBA,

    flipY: false,

    width: size,

});
```

```glsl
uniform sampler2D boneTexture;
uniform int boneTextureSize;

mat4 getBoneMatrix(const in float i) {
    float j = i * 4.0;
    float x = mod(j, float(boneTextureSize)); //所在行

    float y = floor(j / float(boneTextureSize)); //所在列


    float dx = 1.0 / float(boneTextureSize);
    float dy = 1.0 / float(boneTextureSize);

    y = dy * (y + 0.5);

    vec4 v1 = texture2D(boneTexture, vec2(dx * (x + 0.5), y)); //转换回UV范围内坐标

    vec4 v2 = texture2D(boneTexture, vec2(dx * (x + 1.5), y));
    vec4 v3 = texture2D(boneTexture, vec2(dx * (x + 2.5), y));
    vec4 v4 = texture2D(boneTexture, vec2(dx * (x + 3.5), y)); 


    return mat4(v1, v2, v3, v4);
}
```

// TODO:

- [ ] Animation

- [ ] Extension
