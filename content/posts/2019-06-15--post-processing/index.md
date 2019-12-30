---
title: Post-Processing学习笔记
category: "小结"
cover: bg.jpg
author: todaylg
---

Post Processing Effect指的是后期处理效果，这些效果的实现是基于已经渲染的场景之上的，即通过将场景以纹理形式渲染到一个覆盖全屏的四边形上，再对纹理图形进行处理：

```javascript
// 一个覆盖全屏的大三角形，保持屏幕内的UV坐标映射仍为0 => 1，画图即可知。
// 此法性能优于使用四边形。（From RTR4）
this.geometry = new Geometry(gl, {

    position: { size: 3, data: new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]) },

    uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) },

});
```

### RenderTarget/Post

在进行后处理之前我们需要将场景先渲染到[帧缓冲(FrameBuffer)](https://learnopengl-cn.github.io/04%20Advanced%20OpenGL/05%20Framebuffers/)上，RenderTarget就是对创建完整的Framebuffer进行的封装：

- 创建及绑定Framebuffer

- 创建附件（Texture/Renderbuffer Object）并附加缓冲（Color/Depth/Stencil）

而Post则是对场景需要添加多个后处理效果的情况进行管理：

- 根据各个处理效果的Shader（即Program）实例化相应Mesh实体

- Ping-Pong Pass渲染队列

Ping-Pong Pass的后处理队列指的是上一处理效果的输出为下一处理效果的输入（使用两个FrameBufferObject交替作为input和output的target实现），适用于多个后处理效果的叠加：

```javascript
//Post drawCall
render(...){
    ...
    // 首先正常渲染场景

    this.gl.renderer.render({

        scene, camera, update, sort, frustumCull,
        target: enabledPasses.length ? this.fbos[this.currentFBO] : target,

    });
    if(!enabledPasses.length) return;
    // Ping-Pong Pass
    enabledPasses.forEach((pass, i) => {
        ...
        // 最后一次Render (i == enabledPasses.length - 1) render回到target(默认即回到main FrameBuffer)

        this.gl.renderer.render({

            scene: pass.mesh, clear: false,

            target: i === enabledPasses.length - 1 ? target : this.fbos[1 - this.currentFBO]

        });

        // 替换输入输出target
        this.currentFBO = 1 - this.currentFBO;

    });
}
```

### Post Processing Effect

常见的后处理效果包括：

- Gaussian Blur

- FXAA

- Glitch

- CrossFade

- Bloom

- ToneMapping

- Vignette

- LensFlare

- reProjection

- Depth of Field（DOF）

- Motion Blur

这些效果可以使得场景变得更为炫酷，可以说对于构建炫酷场景是不可或缺的部分，所以这部分决定好好学习一波，瞅瞅各个效果的原理并进行实践。

实践效果还是在[Example](http://todaylg.com/LGL/examples/?src=postProcessing_Blur.html)

### Gaussian Blur

高斯模糊的理论知识可以参考[这篇文章](https://xiazdong.github.io/2017/04/30/%E9%AB%98%E6%96%AF%E6%A8%A1%E7%B3%8A/)

之前一直奇怪为什么纹理要规定纹理环绕方式，原来一些算法对纹理采样的坐标还真是会超出边缘边界的。

具体实现的话可以直接使用[已有轮子](https://github.com/Jam3/glsl-fast-gaussian-blur) , 其Shader根据blur的模糊像素（双向时=>5/9/13）将权重具体数值化来提升运行效率：

```javascript
vec4 blur5(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {
  vec4 color = vec4(0.0);
  vec2 off1 = vec2(1.3333333333333333) * direction;
  color += texture(image, uv) * 0.29411764705882354;
  color += texture(image, uv + (off1 / resolution)) * 0.35294117647058826;
  color += texture(image, uv - (off1 / resolution)) * 0.35294117647058826;
  return color;
}
```

由理论知识的那篇文章可知，将二维高斯分布函数分解为两个一维高斯分布函数相乘可以降低算法复杂度，从而获得性能提升。所以我们使用的时候需要进行双向Pass才能得到正确结果：

```javascript
const post = new Post(gl);
let w = gl.canvas.width;

let h = gl.canvas.height;
// Y轴
post.addPass({

    fragment: blurPassShader,

    uniforms: {

    resolution: { value: new Vec2(w, h) },

        direction: { value: new Vec2(0, 1) }

    }

});
// X轴
post.addPass({

    fragment: blurPassShader,

    uniforms: {

        resolution: { value: new Vec2(w, h) },

        direction: { value: new Vec2(1, 0) }

    }

});
```

### FXAA

FXAA是抗锯齿(Anti-Aliasing)技术之一，抗锯齿技术的相关的介绍可以参考[这篇文章](https://www.zhihu.com/question/20236638/answer/44821615)

其中的SMAA和MLAA技术介绍可以参考[这篇文章](https://blog.csdn.net/qezcwx11/article/details/78426052)

而关于FXAA具体的计算原理可以参考[这篇文章](http://blog.simonrodriguez.fr/articles/30-07-2016_implementing_fxaa.html?tdsourcetag=s_pctim_aiomsg)

后处理AA（PPAA）的核心方法其实都是边缘检测+blur来达到柔化边缘的抗锯齿效果，各种AA不同主要在于各自的边缘检测算法不同。

具体实现可以直接使用[已有轮子](https://github.com/mattdesl/glsl-fxaa)

```glsl
vec4 fxaa(sampler2D tex, vec2 uv, vec2 resolution) {

    ....//没搞懂的计算原理
}

void main() {
    FragColor = fxaa(tMap, vUv, resolution);
}
```

### Bloom

Bloom的相关介绍可以参考[这篇文章](https://learnopengl-cn.github.io/05%20Advanced%20Lighting/07%20Bloom/)

核心其实就是：提取场景中的亮部=>对亮部进行模糊处理=>与原场景融合。

正常处理步骤如下：

- 场景渲染 => 亮部提取 => 模糊处理 =\> 结果（FrameBufferObejct）

- 场景渲染（FrameBufferObejct）

- 原场景与结果融合

可以看到同样是场景渲染这个步骤，但是我们分别渲染到了两个不同的帧缓冲，这里可以使用MRT(Multiple Render Targets，多渲染目标)进行优化：只需创建一个帧缓冲对象，经过Shader渲染到多个颜色缓冲中：

```glsl
//WebGL 1.0
#extension GL_EXT_draw_buffers : require 
precision highp float;

void main(void) {
    gl_FragData[0] = vec4(0.0, 0.0, 0.0, 1.0);//gl.COLOR_ATTACHMENT00

    gl_FragData[1] = vec4(0.0, 0.0, 0.0, 1.0);//gl.COLOR_ATTACHMENT01
    gl_FragData[2] = vec4(0.0, 0.0, 0.0, 1.0);//gl.COLOR_ATTACHMENT02

}
```

MTR在WebGL1.0依赖[WEBGL\_draw\_buffers扩展](https://developer.mozilla.org/zh-CN/docs/Web/API/WEBGL_draw_buffers)的支持，在WebGL2.0原生支持：[drawBuffers](https://developer.mozilla.org/en-US/docs/Web/API/WebGL2RenderingContext/drawBuffers)

**亮部提取：**

```glsl
// uniforms: {
//    luminosityThreshold: { value: 0.8 },
//    smoothWidth: { value: 0.01 },
//    defaultOpacity: { value : 0 },
//    defaultColor: { value : new Color(0,0,0) }
// }
void main() {
    vec4 texel = texture( tMap, vUv );
    vec3 luma = vec3( 0.299, 0.587, 0.114 );//Luma值表示为介于0.0和1.0之间的灰度级（公式L = 0.299 * R + 0.587 * G + 0.114 * B）
    float v = dot( texel.xyz, luma );
    vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );
    //限制在容差范围内
    float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );//if v ≤ luminosityThreshold and 1.0 if v ≥ luminosityThreshold + smoothWidth

    FragColor =  mix( outputColor, texel, alpha );//x⋅(1−a)+y⋅a => y⋅a

}
```

**模糊处理：**

模糊处理基于高斯模糊，模糊的质量高低基本就决定了泛光效果的质量好坏，所以并不是简单的一次高斯模糊，而是多次不同半径的高斯模糊并按不同权重结合，原理可参考[这篇文章](https://docs.unrealengine.com/udk/Three/Bloom.html)

```glsl
let w = gl.canvas.width * renderer.dpr;
let h = gl.canvas.height * renderer.dpr;

let tw = w;

let th = h;

let blurPasses = [];

const levels = 5;//重复5次双向高斯模糊

for(let i = 0;i < levels; i++){

    tw = Math.round(tw/2);

    th = Math.round(th/2);

    const blurPass = new Post(gl);
    //Y轴

    blurPass.addPass({

    fragment: blurPassShader,

    uniforms: {

        tMap: { value: thresholdPassTarget },

        resolution: { value: new Vec2(tw, th) },

            direction: { value: new Vec2(0, 1) }

        }

    });
    //X轴

    blurPass.addPass({

    fragment: blurPassShader,

       uniforms: {

           resolution: { value: new Vec2(tw, th) },

           direction: { value: new Vec2(1, 0) }

       }

    });

    let blurPassTarget = new RenderTarget(gl);

     blurPasses.push({ blurPass, blurPassTarget });

}
```

最后各模糊纹理再与原场景混合：

```glsl
// bloomFactors: { value: [ 1.0, 0.8, 0.6, 0.4, 0.2 ] }
// bloomTintColors: { value: [ new Vec3(1), new Vec3(1), new Vec3(1),new  Vec3(1), new Vec3(1) ]}
float lerpBloomFactor(const in float factor) {
   float mirrorFactor = 1.2 - factor;
   return mix(factor, mirrorFactor, bloomRadius);
}
void main() {
   vec4 bloom = vec4(0.);
   bloom += lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture(blurTexture1, vUv);
   bloom += lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture(blurTexture2, vUv);
   bloom += lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture(blurTexture3, vUv);
   bloom += lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture(blurTexture4, vUv);
   bloom += lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture(blurTexture5, vUv);
   bloom *= bloomStrength;
   vec4 orignColor = texture(tMap, vUv);
   FragColor = orignColor + bloom;

}`;
```

### CrossFade

CrossFade效果的原理其实就是基于两个不同场景插值，若是有添加过渡的纹理图片则以纹理图片为基础调整插值：

```glsl
// mixRatio: 0=>1
void main() {
    vec4 texel1 = texture( tMap, vUv );
    vec4 texel2 = texture( tPreMap, vUv );
    if (useTexture==1) {//是否有过渡用的纹理图片
        vec4 transitionTexel = texture( tMixTexture, vUv );
        float r = mixRatio * (1.0 + threshold * 2.0) - threshold;
        float mixf= clamp((transitionTexel.r - r)*(1.0/threshold), 0.0, 1.0);// magic算法??
        FragColor = mix( texel1, texel2, mixf );
    } else {
        FragColor = mix( texel2, texel1, mixRatio );
    }
}`;
```

### Glitch

Glitch效果的核心在于变化UV坐标，从而达到各种扰乱的效果：

生成随机的扰乱数据贴图:

```javascript
const dtSize = 64;
let dataArr = new Float32Array( dtSize * dtSize * 3 );
let dataLength = dtSize * dtSize;
//填充随机数
for ( let i = 0; i < dataLength; i ++ ) {
    let val = randFloat( 0, 1 );
    dataArr[ i * 3 + 0 ] = val;
    dataArr[ i * 3 + 1 ] = val;
    dataArr[ i * 3 + 2 ] = val;
}
const dataTexture = new Texture(gl, {
    image: dataArr,
    generateMipmaps: false,
    type: gl.FLOAT,
    format: gl.RGB,
    internalFormat: gl.renderer.isWebgl2 ? gl.RGB16F : gl.RGB,
    flipY: false,
    width: dtSize,
});
let uniformsProp = {
     perturbationMap: { value: dataTexture },
     amount: { value: 0.08 },
     angle: { value: 0.02 },
     random: { value: 0.02 },
     seed_x: { value: 0.02 },//-1,1
     seed_y: { value: 0.02 },//-1,1
     distortion_x: { value: 0.5 },
     distortion_y: { value: 0.6 },
     col_s: { value: 0.02 }
 }
```

变换UV坐标模拟多种扰乱效果：

```glsl
float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);//magic
}

void main() {
    vec2 p = vUv;
    float xs = floor(gl_FragCoord.x / 0.5);
    float ys = floor(gl_FragCoord.y / 0.5);
    vec4 normal = texture (perturbationMap, p*random*random);
      // 1.block effect 块状随机扰乱
      // Y轴
    if(p.y<distortion_x+col_s && p.y>distortion_x-col_s*random) {
        if(seed_x>0.){
            p.y = 1. - (p.y + distortion_y);
        }else {
            p.y = distortion_y;
        }
    }
    // X轴
    if(p.x<distortion_y+col_s && p.x>distortion_y-col_s*random) {
        if(seed_y>0.){
            p.x=distortion_x;
        }else {
            p.x = 1. - (p.x + distortion_x);
        }
    }

    p.x+=normal.x*seed_x*(random/5.);
    p.y+=normal.y*seed_y*(random/5.);

    //2.RGB移位效果
    vec2 offset = amount * vec2( cos(angle), sin(angle));
    vec4 cr = texture(tMap, p + offset);
    vec4 cga = texture(tMap, p);
    vec4 cb = texture(tMap, p - offset);
    FragColor = vec4(cr.r, cga.g, cb.b, cga.a);
    //3.雪花效果
    vec4 snow = 200.*amount*vec4(rand(vec2(xs * random,ys * random*50.))*0.2);
    FragColor = FragColor+ snow;
}
```

### Vignette

Vignette效果是根据当前片元的采样UV坐标与UV中心坐标的距离，对屏幕的颜色进行插值影响：

```javascript
vec4 mainImage(const in vec4 inputColor, const in vec2 uv) {
	const vec2 center = vec2(0.5);
	vec3 color = inputColor.rgb;
	#ifdef ESKIL
  // Enable Eskil's vignette technique
		vec2 coord = (uv - center) * vec2(offset);
		color = mix(color, vec3(1.0 - darkness), dot(coord, coord));
	#else
		float d = distance(uv, center);
		color *= smoothstep(0.8, offset * 0.799, d * (darkness + offset));//边缘
 		//smoothstep(edge0, edge1, x):
		//t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
    //return t * t * (3.0 - 2.0 * t);
	#endif
	return vec4(color, inputColor.a);
}

void main() {
  vec4 textureColor = texture( tMap, vUv );
  FragColor =  mainImage(textureColor, vUv);
}
```

### Depth of Field（DOF）

DOF的效果旨在模仿相机的[景深](https://capbone.com/depth-of-field-and-aperture-focal-distance/)概念，根据一个阀值范围和物体相对与相机的深度，对屏幕颜色进行模糊处理：

```javascript
vec4 calculateBokeh(const in vec4 inputColor, const in vec2 uv, const in float depth, sampler2D inputBuffer) {
	vec2 aspectCorrection = vec2(1.0, aspect);
	float focusNear = clamp(focus - dof, 0.0, 1.0);
	float focusFar = clamp(focus + dof, 0.0, 1.0);
	// Calculate a DoF mask.
	float low = step(depth, focusNear);
	float high = step(focusFar, depth);

	float factor = (depth - focusNear) * low + (depth - focusFar) * high;
	vec2 dofBlur = vec2(clamp(factor * aperture, -maxBlur, maxBlur));

	vec2 dofblur9 = dofBlur * 0.9;
	vec2 dofblur7 = dofBlur * 0.7;
	vec2 dofblur4 = dofBlur * 0.4;

	vec4 color = inputColor;
	color += texture(inputBuffer, uv + (vec2( 0.0,   0.4 ) * aspectCorrection) * dofBlur);
	color += texture(inputBuffer, uv + (vec2( 0.15,  0.37) * aspectCorrection) * dofBlur);
	color += texture(inputBuffer, uv + (vec2( 0.29,  0.29) * aspectCorrection) * dofBlur);
	color += texture(inputBuffer, uv + (vec2(-0.37,  0.15) * aspectCorrection) * dofBlur);
	color += texture(inputBuffer, uv + (vec2( 0.40,  0.0 ) * aspectCorrection) * dofBlur);
	color += texture(inputBuffer, uv + (vec2( 0.37, -0.15) * aspectCorrection) * dofBlur);
	color += texture(inputBuffer, uv + (vec2( 0.29, -0.29) * aspectCorrection) * dofBlur);
	color += texture(inputBuffer, uv + (vec2(-0.15, -0.37) * aspectCorrection) * dofBlur);
	color += texture(inputBuffer, uv + (vec2( 0.0,  -0.4 ) * aspectCorrection) * dofBlur);
	color += texture(inputBuffer, uv + (vec2(-0.15,  0.37) * aspectCorrection) * dofBlur);
	color += texture(inputBuffer, uv + (vec2(-0.29,  0.29) * aspectCorrection) * dofBlur);
	color += texture(inputBuffer, uv + (vec2( 0.37,  0.15) * aspectCorrection) * dofBlur);
	color += texture(inputBuffer, uv + (vec2(-0.4,   0.0 ) * aspectCorrection) * dofBlur);
	color += texture(inputBuffer, uv + (vec2(-0.37, -0.15) * aspectCorrection) * dofBlur);
	color += texture(inputBuffer, uv + (vec2(-0.29, -0.29) * aspectCorrection) * dofBlur);
	color += texture(inputBuffer, uv + (vec2( 0.15, -0.37) * aspectCorrection) * dofBlur);

	color += texture(inputBuffer, uv + (vec2( 0.15,  0.37) * aspectCorrection) * dofblur9);
	color += texture(inputBuffer, uv + (vec2(-0.37,  0.15) * aspectCorrection) * dofblur9);
	color += texture(inputBuffer, uv + (vec2( 0.37, -0.15) * aspectCorrection) * dofblur9);
	color += texture(inputBuffer, uv + (vec2(-0.15, -0.37) * aspectCorrection) * dofblur9);
	color += texture(inputBuffer, uv + (vec2(-0.15,  0.37) * aspectCorrection) * dofblur9);
	color += texture(inputBuffer, uv + (vec2( 0.37,  0.15) * aspectCorrection) * dofblur9);
	color += texture(inputBuffer, uv + (vec2(-0.37, -0.15) * aspectCorrection) * dofblur9);
	color += texture(inputBuffer, uv + (vec2( 0.15, -0.37) * aspectCorrection) * dofblur9);

	color += texture(inputBuffer, uv + (vec2( 0.29,  0.29) * aspectCorrection) * dofblur7);
	color += texture(inputBuffer, uv + (vec2( 0.40,  0.0 ) * aspectCorrection) * dofblur7);
	color += texture(inputBuffer, uv + (vec2( 0.29, -0.29) * aspectCorrection) * dofblur7);
	color += texture(inputBuffer, uv + (vec2( 0.0,  -0.4 ) * aspectCorrection) * dofblur7);
	color += texture(inputBuffer, uv + (vec2(-0.29,  0.29) * aspectCorrection) * dofblur7);
	color += texture(inputBuffer, uv + (vec2(-0.4,   0.0 ) * aspectCorrection) * dofblur7);
	color += texture(inputBuffer, uv + (vec2(-0.29, -0.29) * aspectCorrection) * dofblur7);
	color += texture(inputBuffer, uv + (vec2( 0.0,   0.4 ) * aspectCorrection) * dofblur7);

	color += texture(inputBuffer, uv + (vec2( 0.29,  0.29) * aspectCorrection) * dofblur4);
	color += texture(inputBuffer, uv + (vec2( 0.4,   0.0 ) * aspectCorrection) * dofblur4);
	color += texture(inputBuffer, uv + (vec2( 0.29, -0.29) * aspectCorrection) * dofblur4);
	color += texture(inputBuffer, uv + (vec2( 0.0,  -0.4 ) * aspectCorrection) * dofblur4);
	color += texture(inputBuffer, uv + (vec2(-0.29,  0.29) * aspectCorrection) * dofblur4);
	color += texture(inputBuffer, uv + (vec2(-0.4,   0.0 ) * aspectCorrection) * dofblur4);
	color += texture(inputBuffer, uv + (vec2(-0.29, -0.29) * aspectCorrection) * dofblur4);
	color += texture(inputBuffer, uv + (vec2( 0.0,   0.4 ) * aspectCorrection) * dofblur4);

	return color / 41.0;
}
```

Todo：

- [ ] ToneMapping

- [x] Vignette

- [ ] LensFlare

- [ ] ReProjection

- [x] Depth of Field（DOF）

- [ ] Motion Blur
