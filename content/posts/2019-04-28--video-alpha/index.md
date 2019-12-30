---
title: "Web动效通用实现方案探究"
category: "大结"
cover: bg.jpg
author: todaylg

---

### 前言

在平时的工作中我们会遇到一些动画师设计的动效需要在Web实现，大多数情况下我们使用CSS3就可以搞定了，但对于一些复杂的动效（比如粒子效果）用我们就得另寻他法了。那在考虑性能与完成效果的前提下，我们该哪种方案复现这些复杂的动效呢？

### 方案对比

**动态图片（gif）**

使用gif图自然是我们想到的第一个解决方法，但是其缺陷在于应用于一些场景时会导致导出的gif图大小过大：

* 动效时长若较长时

* 需要考虑移动端IOS或PC Retina屏时（即画质有要求时）

**序列帧动画**

我们还可以使用 animation + sprite 的方式实现序列帧动画，比如：

```javascript
.test {
  animation: testAnimation 0.2s forwards 1.5s;
}

@keyframes testAnimation{
  0.000% { background-position: 0 0; }
  6.667% { background-position: -168px 0; }
  13.333% { background-position: -336px 0; }
  20.000% { background-position: -504px 0; }
  26.667% { background-position: -672px 0; }
  33.333% { background-position: -840px 0; }
  40.000% { background-position: -1008px 0; }
  46.667% { background-position: -1176px 0; }
  53.333% { background-position: -1344px 0; }
  60.000% { background-position: -1512px 0; }
  66.667% { background-position: -1680px 0; }
  73.333% { background-position: -1848px 0; }
  80.000% { background-position: -2016px 0; }
  86.667% { background-position: -2184px 0; }
  93.333% { background-position: -2352px 0; }
  100.000% { background-position: 0 0; }
}
```

这个方法的缺陷同样也是在文件大小上，实测在保证基本帧数的情况下，导出的雪碧图较之gif图还要更大。。

**Lottie/SVGA**

可以参考[这篇](https://www.jianshu.com/p/60d28d7bab48)文章，文章有较为详细的介绍Lottie与SVGA，不再赘述。

**Scene Loader**

动画师在3D建模软件中制作动画场景 => 导出附带动画参数的模型格式 => 模型格式Loader => Web中还原场景。

此方法动画师的制作成本很高，且最后导出的模型文件大小也会很大。 （当然也可以让动画师只提供纹理素材，其他全由我们自己写，这样制作依旧很高，只不过是转到了开发这边。）

总结：

---

| 方案           | 制作成本                     | 性能  | 还原效果      | 文件体积 |
|:------------ |:------------------------ | --- | --------- | ---- |
| 动态图          | 低                        | 中   | 全还原       | 大    |
| 序列帧          | 低                        | 中   | 全还原       | 大    |
| Lottie       | 中（依赖AE）                  | 优   | 部分插件效果不支持 | 小    |
| SVGA         | 中（依赖AE、Animate CC）       | 优   | 全还原       | 中    |
| Scene Loader | 高（依赖Blender/3DMax/Maya等） | 中   | 全还原       | 大    |

---

那还有没有更好的解决方案呢？

我们知道视频的体积和编解码效率都要优于图片，我们以视频为切入点，探讨通过播放视频的方式复现动效的方法。

### Video实现方案

通过播放Video来复现动效，首先需要解决如何支持动效中的透明度的问题。mp4并不支持Alpha通道，[webM](https://lsvih.com/2017/06/30/%E5%9C%A8html%E4%B8%AD%E4%BD%BF%E7%94%A8%E8%83%8C%E6%99%AF%E9%80%8F%E6%98%8E%E7%9A%84video%E8%A7%86%E9%A2%91/)的视频格式虽然支持Alpha通道，但是其堪忧的[兼容性](https://caniuse.com/#search=webM)（特别是移动端）让人不得不另寻他法。

好在早有珠玉在前，透明视频的处理方法可以参考[这篇](http://dopro.io/animation-solution-alpha-video.html)文章。简而言之就是通过划定区域的方法分别对Video的RGB及Alpha通道进行提取，最后在进行拼合。

这里总结下基于该文章实践及拓展过程中遇到的一些问题和解决方案。

### 多量动效

**canvas2D：**

上面那篇文章介绍了单个动效复现的步骤及方法，但是对于需要同时出现多个动效的情况（比如每次位置随机且多数量的烟花动效），需要进行一些优化处理：

因为若是每次动效渲染都经过一遍对Video的RGB、Alpha通道的提取及拼合的过程（drawImageData => getImageData => putImageData），当同时展示的动效数量较多时会导致CPU占用过高。

瓶颈既然是在**每个效果都需要走一遍Video处理流程**造成的，那在首次处理Video的时候缓存拼合RGBA后的imageData数据，再次展示该动效时直接使用对应缓存的数据即可：

```javascript
//首次播放视频缓存Canvas帧数据
video.oncanplay = () => {
 video.play();
 drawVideo();
}
video.onended = () => {
 cancelAnimationFrame(rafId);
}

function drawVideo() {
 rafId = requestAnimationFrame(update);
 let update = () => {
 ... //省略拼合RGBA色值数据(image)的过程
 firDrawCanvasContext.putImageData(image, 0, 0, 0, 0, showWidth, showHeight);
 //保存帧数据
 imgCacheDataArray.push(firDrawCanvas.toDataURL('png'));
 }
}

//重复绘制时直接使用缓存数据（以Pixi为例）
let app = new PIXI.Application({
 width: showWidth,
 height: showHeight,
 transparent: true
});
document.body.appendChild(app.view);
function drawCanvasFromCache() {
 //构建Group
 let spriteGroup = new PIXI.extras.AnimatedSprite.fromImages(imgCacheDataArray);
 ... //设置此Group的缩放大小及位置信息
 spriteGroup.animationSpeed = 0.3;//保持与Video帧率一致
 spriteGroup.play();
 app.stage.addChild(spriteGroup);
}
```

缓存的办法可以省掉播放重复动画资源时绘制及提取的过程，缺陷在于每种不同的动画都需要对应保存整个视频动画每一帧的色值数据，后期动效数量上升后，需要关心内存/本地存储的占用量问题。但不失为Canvas2D渲染下切实可行的办法。

**WebGL：**

使用WebGL完成动效复现的话，就可以借助GPU来进一步优化性能。

在不顾及[兼容性](https://caniuse.com/#search=webgl)的情况下，显然这个解决方案会更好。

将Video RGB及Alpha通道的提取与拼合部分直接在片元着色器中完成，实现也并不复杂，只需要变换一下采样Texture时的UV坐标（RGB值采样上半部分，Alpha值采样下半部分）即可：

需要注意纹理坐标系的原点(0,0)位于左下角，取值在[0,1]之间。我们将上半部分的采样坐标传入着色器用于采样RGB值，下半部分的采样坐标可通过上半部分采样坐标减去vec2(0, 0.5)得到，从而采样Alpha值。

相关JS代码：

```javascript
// 上半部分纹理坐标
let uvCoord = new Float32Array([0, 1, 1, 1, 0, 0.5, 1, 0.5]);//即(0,1)、(1,1)、(0,0.5)、(1,0.5)四个坐标
const videoGeometry = new Plane(gl);

videoGeometry.addAttribute("topUv", {
 size: 2,
 data: uvCoord
});
```

相关Shader代码：

```javascript
const vertex = `#version 300 es
precision highp float;
precision highp int;

in vec2 uv;
in vec3 position;

in vec2 topUv;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

out vec2 vUv;

void main() {
 vUv = topUv;
 gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;
precision highp int;

uniform sampler2D tMap;

in vec2 vUv;

out vec4 FragColor;

void main() {
 vec3 rgbColor = texture(tMap, vUv).rgb;
 float alphaColor = texture(tMap, vUv - vec2(0, 0.5)).r;
 FragColor = vec4(rgbColor, alphaColor);
}
`;

export default {vertex, fragment};
```

#### WebGL Renderer

实际接入到项目中最好引入一个WebGL Renderer。

裸写只针对一个动效的话还好。。但是考虑到后面的扩展性，要么自己从WebGL API开始封装，要么就是引入一个开源Renderer了。

---

| 框架                   | 大小     |
| -------------------- | ------ |
| Pixi.min.js(V4.8.5)  | 428 kb |
| Three.min.js(V104)   | 558 kb |
| Claygl.min.js(V1.03) | 413 kb |

---

**引入Pixi**

引入Pixi应该是这种场景下的最优解，可以简化当前Canvas 2D渲染的同时，又提供了WebGL的渲染支持，接入和改造成本也相对较小。

但是实践通过Pixi的Filter实现自定义Shader的过程中，发现其并不支持自定义顶点变量(attribute)的传入：

```javascript
//SpriteRenderer中render的方法
function flush(){
 ...
 // build the vao object that will render..
 // 创建VAO之后写死了传入Sprite的三个attribute变量，没有封装和暴露添加自定义attribute的方法
 const vao = this.renderer.createVao()
 .addIndex(this.indexBuffer)
 .addAttribute(vertexBuffer, attrs.aVertexPosition, gl.FLOAT, false, this.vertByteSize, 0)
 .addAttribute(vertexBuffer, attrs.aTextureCoord, gl.UNSIGNED_SHORT, true, this.vertByteSize, 2 * 4)
 .addAttribute(vertexBuffer, attrs.aColor, gl.UNSIGNED_BYTE, true, this.vertByteSize, 3 * 4);
 ...
}
```

我们需要将上半部分的UV坐标从顶点着色器传送至片元着色器，但是Pixi又没有暴露自由添加顶点变量的方法，所以我们只能：

1.改造Pixi：由固定的几个顶点变量输入改为读取传参并遍历的方式输入顶点变量，并添加一个特定处理RGBA拼合的Filter。

2.不修改PIxi的前提下，可尝试一些妖路子：比如重写掉Pixi提供的封装好的Filter的Shader，并且在顶点着色器中直接将当前顶点映射的纹理坐标直接暴力的除以2，得到下半部分的映射纹理坐标，代码如下：

```javascript
const vertex = `
 attribute vec2 aVertexPosition;
 attribute vec2 aTextureCoord;
 uniform mat3 projectionMatrix;
 varying vec2 vTextureCoord;
 void main(void)
 {
 vTextureCoord = vec2(aTextureCoord.x, aTextureCoord.y/2.0);
 gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
 }
`;

const fragment = `
 varying vec2 vTextureCoord;
 uniform sampler2D uSampler;
 void main(void)
 {
 vec3 rgbColor = texture2D(uSampler, vTextureCoord).rgb;
 float alphaColor = texture2D(uSampler, vTextureCoord + vec2(0, 0.5)).r;
 gl_FragColor = vec4(rgbColor, alphaColor);
 }
 `;

function videoPlay() {
 let texture = Texture.fromVideo(videoPath);
 let videoSprite = new Sprite(texture);
 //以改写AlphaFilter为例
 let myFilter = new Filters.AlphaFilter(uvCoord);
 //覆盖原Shader
 myFilter.vertexSrc = vertex;
 myFilter.fragmentSrc = fragment;
 videoSprite.filters = [myFilter];
 videoSprite.width = showWidth;
 videoSprite.height = showHeight;
 app.stage.addChild(videoSprite);
}
```

实测这样暴力的处理方法在最后的采样坐标上会和理论数值有所偏差（0.5 => 0.477）//Todo 具体原因还没研究明白，并且实现过程丑陋不堪，不建议使用

**引入其他的3D框架**

引入一个3D后实现过程倒是没啥问题了。只是如果单纯只是为了写一个Shader而引入Three.js或者Claygl之类的这种大而全的3D框架，有种杀鸡用牛刀的感觉。

所以这时候，[LGL](https://github.com/todaylg/LGL) 就可以了解一下啦~




