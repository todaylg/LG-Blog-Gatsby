---
title: 初探WebVR与Web Audio API
category: "大结"
cover: bg.jpg
author: todaylg

---

借着毕设的机会，接触了一下WebVR和Web Audio API，以及通信本行的数字信号处理的知识：

老样子，先上结果：[WebVR-Audio-Visualizer](https://github.com/todaylg/WebVR-Audio-Visualizer)

当年在DPS和高数课上流的口水化成了如今流下的泪水。。。内心不尽五味杂陈，**技多不压身**属实是有道理的呀，学的时候觉得没有用，用的时候才后悔没好好学，人家毕业扔课本，我却寄课本：高数、DSP、从隔壁计科借过来的四大门课本，缺的东西属实有点忒多了。。。

总结一句精辟的话：排除两个前提条件（起步早、天赋高）的前提下，本科阶段跨离自己本专业自学转软件方向最大的两个问题在于**知识体系的完整程度**和**研究深度**。这些问题只能靠自己后面用时间给填回来，希望自己继续加油吧！

回到正题，因为涉及的新东西有点多，所以小结拆分为3个部分，分别介绍**WebVR**、**Web Audio API**、**音乐节奏检测**。走你～

## WebVR

因为穷和宅，在此之前一直没有体验过VR设备，就更别说啥VR开发了。印象里VR都是有钱人才能玩的东西，其实并不是这样，穷人也可以通过穷人版VR来进行VR体验，这穷人版VR就包括WebVR啦。

### VR设备

为了避免一脸懵逼，我们先了解一下当前市面上的VR设备：

目前主流的VR设备为头戴式VR设备，即VR头显，功能差异主要体现在以下方面：

| 头显自由度      | 控制器自由度     | 供电     |
|:----------:|:----------:|:------:|
| 3自由度（旋转跟踪） | 3自由度（旋转跟踪） | PC供电   |
| 6自由度（定位跟踪） | 6自由度（定位跟踪） | 移动设备供电 |

旋转跟踪就是允许人们环顾四周或者旋转物体（所有VR头显都支持旋转跟踪），而定位跟踪则对用户在一定范围内的位置变化进行追踪。

#### 穷人版VR头显

穷人版VR头显泛指使用手机作为头显显示器的设备，部分提供控制器，体验成本较低。

最最便宜的Cardboard

<div style="text-align: center">  
<img src="http://photocdn.sohu.com/20160108/Img433906043.jpeg"/>  
</div>

高贵一点的Daydream

<div style="text-align: center">  
<img src="https://img1.tuicool.com/3yARZbr.jpg!web"/>  
</div>

穷人版VR头显设备之间的核心差别其实就在于镜片的好坏以及佩戴的舒适程度，显示效果的好坏以及性能高低取决于你的手机显示屏分辨率的高低和手机性能的高低。没有测试过4k屏，但是1920和2k屏手机的显示效果实测下来都不理想，颗粒状明显。总的来说，穷人版VR更适用于进行初步体验。

#### 土豪版VR头显

土豪版VR头显不仅拥有为定位跟踪配置的硬件设备，并且头显配备了专用的显示器，渲染则是通过高GPU配置的PC进行，什么1080TI、四路泰坦啥的了解一下。总体来说，效果已较为理想。

VIVE

<div style="text-align: center">  
<img style="width:500px" src="https://media.wired.com/photos/5af4e6e53733a15a44c5d038/master/w_2400,c_limit/HEADER-HTC-Vive-Pro-Full-Kit-SOURCE-HTC_topart.jpg">  
</div>

Oculus

<div style="text-align: center">  
<img src="http://www.gamelook.com.cn/wp-content/uploads/2017/10/18-4.jpg">  
</div>

**那到底WebVR是个啥呢？**

上图：

<div style="text-align: center">  
<img style="width:600px;" src="https://raw.githubusercontent.com/todaylg/LG-Blog-Gatsby/master/content/posts/2018-07-01--webVR-and-web-audio-api/WebVR1.png">  
</div>

正如之前介绍的，当前VR设备种类繁多，生态圈处于支离破碎的状态，各个VR设备拥有各自的生态，比如应用商店、控制器等等，各个VR设备、操作系统之间又有着不同的开发规范，给用户及开发者的跨终端体验都带来了极大的不便。WebVR便孕育而出了，其最早由Mozilla所倡导，现由W3C组织来制定，如今已经成为了一种通用开放标准，它提供了统一的JavaScript API，使开发者可以获取VR设备的输入信息。跨终端不再需要付出庞大的工作量，只需要你的VR设备上装有一个支持WebVR的浏览器，是不是美滋滋。

| VR平台        | 浏览器支持                                 |
|:-----------:|:-------------------------------------:|
| Cardboard   | chrome                                |
| Dayream     | chrome                                |
| GearVR      | Oculus Carmel、Samsung Internet        |
| Oculus Rift | Firefox、Chromium experimental分支       |
| HTC Vive    | Firefox、Chromium experimental分支、Servo |

### WebVR框架

WebVR开发依赖于WebGL，所以一般WebVR框架都是基于Three.js的。国外主要由谷歌和Facebook对WebVR生态布局，Facebook和火狐都开发了自己的WebVR框架，即[React VR](https://github.com/facebook/react-360)和[A-Frame](https://github.com/aframevr/aframe)。其中当数A-Frame最为知名，这次使用的也是A-Frame框架，值得一提的是他的可视化调试面板是相当的牛，感觉都快整出Unity的感觉了。

<div style="text-align: center">  
<img style="width:600px;" src="https://raw.githubusercontent.com/todaylg/LG-Blog-Gatsby/master/content/posts/2018-07-01--webVR-and-web-audio-api/WebVR2.png">  
</div>

因为只实际使用了A-Frame这一个框架，所以在此就不进行框架对比了。A-Frame使用下来文档完善且例子丰富，还是非常容易上手的，并且其和Unity有点像的实体-组件开发架构也提高了拓展性和可维护性。但是说到底不管什么WebVR框架，吃的还是开发者WebGL以及Three.js的功底，因为框架只不过是为开发者提供了一些简单常用物体的封装，当需要实现一些稍微复杂的效果还是得上Three.js甚至WebGL。这块自己是缺东西的，所以毕设中使用到的3D物体要么是框架自带封装，要么就是从官方例子那扒过来的😂😂😂。。。

## Web Audio API

首先Web Audio API是啥？Web Audio API提供了在Web上分析或处理底层音频数据的一个通用的规范，是Web平台上对音频处理的一套高级API，这个API设计的初衷是用来编写游戏声音引擎以及完成在各种音乐制作软件中对声音的编辑和混缩的，所以十分复杂和强大，体量相当于Canvas API，通过Web Audio API可以获取音频时频域信息（音乐可视化）、过滤特定频率（通过高通、低通等各种滤波器）、立体声、各个声道处理，甚至生成音效等等。值得一提的是这个API对于时间精度控制得非常精确，实测确实几乎没有延迟。

在音频上下文中的各个音频节点通过输入输出相互连接，形成一个链，即代表了整个音频数据的处理流程。一个通过Web Audio API处理音频的基本流程如下图所示：

<div style="text-align: center">  
<img style="width:200px;" src="https://raw.githubusercontent.com/todaylg/LG-Blog-Gatsby/master/content/posts/2018-07-01--webVR-and-web-audio-api/WebVR3.png">  
</div>

开发者在Web Audio API中处理音频文件首先需要创建音频上下文（AudioContext），处理音频的过程都将在音频上下文中进行。之后在音频上下文中创建音频源，可以是audio元素或者是音频流。通过连接不同的效果节点，对音频数据进行不同效果的加工处理，如混响、滤波等。最后连接一个输出节点，比如麦克风，扬声器等等，再经过音频渲染进行最终的效果输出。

简单的示例代码：

```javascript
var audioCtx = new （window.AudioContext || window.webkitAudioContext）（）;//创建实时音频上下文
var analyser = audioCtx.createAnalyser（）;//创建实时分析节点
source = audioCtx.createMediaStreamSource（stream）;//连接声源
source.connect（analyser）;//声源连接分析节点
analyser.connect（distortion）;//分析节点连接输出设备
```

接下来对API所接触到的各部分进行介绍和示例演示：

### 音频上下文

因为使用Web Audio API处理音频的过程都在音频上下文中进行，所以首先对音频上下文进行介绍。

类似于Canvas API分为2D绘制上下文和3D绘制上下文，Web Audio API的音频上下文也又分类，分为离线音频上下文（offline AudioContext）和实时音频上下文（AudioContext），顾名思义也可猜出个大概区别：在离线音频上下文中对音频数据的渲染将不经过硬件，说白了就是预分析，输入的音频有多长就渲染多长，并提供一个回调函数尽量快的返回渲染结果（PCM数据）；而实时音频上下文对音频数据的渲染将会经过硬件进行实时渲染。

离线渲染示例：

```javascript
let OfflineContext = window.OfflineAudioContext;
let context = new OfflineContext(2, audioLength * config.sampleRateGuess, config.sampleRateGuess);//numOfChannels,length,sampleRate

//LoadBuffer封装根据musicSrc发送XMLHttpRequest请求获取音频数据（ArrayBuffer）
LoadBuffer(context, musicSrc, function onload(buffer) {
        let destination = context.destination;//离线渲染也需要指定输出设备(非硬件，没声)

        let source = context.createBufferSource();
        source.buffer = buffer;//ArrayBuffer

        source.connect(destination);

        source.start(0);

        context.startRendering().then((buffer) => {//离线音频上下文特有的回调函数
            console.log(`预分析完毕，结果为：${buffer}`);//AudioBuffer
            audio.play();
        });
    });
```

实时渲染示例：

```javascript
let context = new AudioContext();
let analyser = context.createAnalyser();//实时分析节点
let levels = new Uint8Array(this.analyser.frequencyBinCount);//频域数据
let waveform = new Uint8Array(this.analyser.fftSize);//时域数据

//RAF
window.requestAnimationFrame = window.requestAnimationFrame
        || window.webkitRequestAnimationFrame
        || window.mozRequestAnimationFrame
        || function (f) {
    setTimeout(f, 30);
};

let getLevels = ()=> {//实时获取音频频域数据
  analyser.getByteFrequencyData(freqByteData);
  window.requestAnimationFrame(renderFFT);
  //可视化效果同步
};
let getWaveform = ()=> {//实时获取音频时域数据
    analyser.getByteTimeDomainData(this.waveform);
    window.requestAnimationFrame(renderFFT);
  //可视化效果同步
}
```

翻阅W3C规范会发现Web Audio API的很多规定参数都是个迷。。。比如实时取得的频域数据数组大小为什么规定为FFT大小的一半？猜想是浏览器底层实现FFT时为了防止频谱泄露使用了加窗函数（一般取50%)?包括Web Audio API 的卷积运算（Convolution）功能实现环境音效的模拟。在声学中，回声可以用源声音与一个反映各种反射效应的波形的卷积表示（具体怎么实现的呢？）而要验证则需要看浏览器的实现代码。。。所以现在还是老老实实先放一放吧。。

## 节奏检测

详见提取出来的库：[BeatDetector](https://github.com/todaylg/BeatDetector)

应用的节奏检测基于时域能量比较和频域能量比较，针对音乐高潮部分节奏点和伴随全曲的节奏点进行检测。



## 总结

其实这次对Web3D以及音频处理的研究深度还是挺浅面的，毕竟时间有点赶，划水痕迹还是挺明显的哈哈，不过好在顺利毕业啦~

希望以后还有机会更深入的学习和研究两者吧，毕竟这可是真正的“视听盛宴”所需要的两个核心技术。
