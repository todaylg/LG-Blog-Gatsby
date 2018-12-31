---
title: 初探Canvas2D渲染与数据可视化
category: "小结"
cover: test7.png
author: todaylg




---

主要是对当前Canvas2D渲染框架进行了了解学习，并最后基于Pixi.js以可视化框架Cytoscape为目标动手进行了一波实践：[PGraph](https://github.com/todaylg/PGraph)

## PixiJS

说到Pixi，如果你在玩一些H5游戏的时候有看过它的源码的话那相信你应该就不会陌生，很多游戏都是基于Pixi开发的，大名鼎鼎的H5游戏框架Phaser也是基于Pixi的，但是基于Pixi可不仅仅只能开发游戏，包括很多炫酷的网站、效果、甚至App都可以基于Pixi开发，Pixi其实是一个超快的H5 2D渲染引擎，提供一个超快并且兼容所有设备的2D库，根据设备对WebGl、Canvas的支持情况智能进行渲染器的切换，从而保证兼容性与高速。头回打开 **[Pixi官网](http://www.pixijs.com/)** 的我直接被液体云的效果给吓跪了=>。。。之后手一个不小心又点到了它的 **[画廊](http://www.pixijs.com/gallery)** 里，本年份的膝盖也都交代在那了。。。

印象比较深的是 **[Weareuprising](http://www.weareuprising.com/work)** 我次。。这碎片特效和噪点特效，简直了。。感觉还是按音频鼓点分散的。不知道是不是错觉。。一直没闲下时间来研究，有空一定要扒下来好好瞅瞅(Flag)！！！视音频结合玩的飞起的=> **[LOL](http://na.leagueoflegends.com/en/featured/champions/trial-of-the-kraken-priestess)**、 **[Goplaces](http://goplaces.theheinekencompany.com/en/age-gate)** 居然还可以将交互和视频这样结合。。。真的是给跪了。。

#### Canvas/WebGL/SVG

---

既然咱们从零开始，那必然得先大概了解这三兄弟的关系，Web可视化的主流技术就是这三，而这三又各自有各自的特点。

1.SVG

SVG功能强大并且很灵活，并且有一些效果还是无法替代的(比如贝赛尔曲线上紧贴文字的效果)。但是每个SVG都是一个DOM元素，数量达到一定限度之后不可避免的会有明显卡顿，因为交互会使元素发生改变（位置移动、样式改变、增删改查等等）从而触发reflow，reflow会触发repaint，一个节点的reflow很可能导致子节点甚至是父节点或者同级节点的reflow，所以reflow的成本很高。SVG在处理千级的数量时就已经显得很吃力了。

2.Canvas

Canvas就没有reflow的概念了，只有repaint的概念，因此在性能上要好过SVG许多。因为Canvas实际上只是一个画布元素，通过getContext()方法，传入参数：'2d',可以获得2d绘图API接口对象：CanvasRenderingContext2D,或者传入参数'webgl'，则可获得3d绘图API。有时候在交流的时候一直念叨Canvas、Canvas的，但是意思却是在说CanvasRenderingContext2D,二者是一个父子级的关系，别搞混啦。CanvasRenderingContext2D是由浏览器按照 **[W3C](https://www.w3.org/TR/2dcontext/#canvasrenderingcontext2d)** 规定的统一标准实现的。

3.WebGL

WebGL则是一种3D绘图标准，可以理解为OpenGL和JavaScript技术的结合。允许开发者直接和GPU进行通信，从而获得来自GPU的强大力量，渲染什么几十万级的数量都是洒洒水（显卡牛逼的话），并且之后不管什么粒子效果、图形纹理什么的，想画啥就能画啥，简直是为所欲为。但是对应的这东西有点复杂，画了个点就要接近100行的代码。。。还需要懂OpenGL。。感觉坑有点深。。。画了个点之后先跑路了。。

#### Pixi源码浅析

得益于Pixi的代码模块化分得很清楚，所以虽然具体的代码咱看不懂，但是文件名字看得懂啊，函数名字看得懂啊哈哈哈，也能大概知道个来龙去脉啦, 首先从入口文件index.js开始窥探一下：

```javascript
// import polyfills. Done as an export to make sure polyfills are imported first
export * from './polyfill';

// export core
export * from './core';

// export libs
import deprecation from './deprecation';//旧版存在，但是新版pixi已不再支持的特性做兼容性提示
import * as accessibility from './accessibility';
import * as extract from './extract';//such like saving an Image
import * as extras from './extras';
import * as filters from './filters';//WebGL-Only
import * as interaction from './interaction';//events
import * as loaders from './loaders';//loading assets, data, and other resources dynamically.
import * as mesh from './mesh';
import * as particles from './particles';
import * as prepare from './prepare';
```

---

这样看这个core应该就是boss了，果然不出所料：

```javascript
export * from './const';//所有静态变量
export * from './math';//数学相关计算

import * as utils from './utils';//一些小的工具方法
import * as ticker from './ticker';//时钟类，控制渲染帧率
import settings from './settings';
import CanvasRenderer from './renderers/canvas/CanvasRenderer';
import WebGLRenderer from './renderers/webgl/WebGLRenderer';

export { settings, utils, ticker, CanvasRenderer, WebGLRenderer };

export { default as glCore } from 'pixi-gl-core';

export { default as Bounds } from './display/Bounds';
export { default as DisplayObject } from './display/DisplayObject';//可展示对象的基础，基础到直接继承自EventEmitter类,但是他却是一个抽象类，作为所有待展示对象的基类,继承之后复写了才有意义。

export { default as Container } from './display/Container';//最强大的基础类
export { default as Transform } from './display/Transform';
export { default as TransformStatic } from './display/TransformStatic';
export { default as TransformBase } from './display/TransformBase';
export { default as Sprite } from './sprites/Sprite';
export { default as CanvasSpriteRenderer } from './sprites/canvas/CanvasSpriteRenderer';
export { default as CanvasTinter } from './sprites/canvas/CanvasTinter';
export { default as SpriteRenderer } from './sprites/webgl/SpriteRenderer';
export { default as Text } from './text/Text';
export { default as TextStyle } from './text/TextStyle';
export { default as TextMetrics } from './text/TextMetrics';
export { default as Graphics } from './graphics/Graphics';//图形
export { default as GraphicsData } from './graphics/GraphicsData';
export { default as GraphicsRenderer } from './graphics/webgl/GraphicsRenderer';
export { default as CanvasGraphicsRenderer } from './graphics/canvas/CanvasGraphicsRenderer';
export { default as Spritesheet } from './textures/Spritesheet';
export { default as Texture } from './textures/Texture';
export { default as BaseTexture } from './textures/BaseTexture';
export { default as RenderTexture } from './textures/RenderTexture';
export { default as BaseRenderTexture } from './textures/BaseRenderTexture';
export { default as VideoBaseTexture } from './textures/VideoBaseTexture';
export { default as TextureUvs } from './textures/TextureUvs';
export { default as CanvasRenderTarget } from './renderers/canvas/utils/CanvasRenderTarget';
export { default as Shader } from './Shader';
export { default as WebGLManager } from './renderers/webgl/managers/WebGLManager';
export { default as ObjectRenderer } from './renderers/webgl/utils/ObjectRenderer';
export { default as RenderTarget } from './renderers/webgl/utils/RenderTarget';
export { default as Quad } from './renderers/webgl/utils/Quad';
export { default as SpriteMaskFilter } from './renderers/webgl/filters/spriteMask/SpriteMaskFilter';
export { default as Filter } from './renderers/webgl/filters/Filter';
export { default as Application } from './Application';
export { autoDetectRenderer } from './autoDetectRenderer';
```

---

通过看继承关系可以大概了解到这个DisplayObject类是Pixi中所有可展示对象的基础了，是一个基础的抽象类，Container类继承于DisplayObject类,主要添加了一些对子元素的操作方法，Sprite类又继承于Container类，到这已经是我们可以看见的实例了，也就是已经具象化了的，所实现的方法返回的都已经是计算得出的具体数值了，Graph类也是如此，继承Container类，而Text类则继承自Sprite类，这些都是具象化的实例了。而穿插在其中的Texture比较复杂，十分懵逼。。感觉好像缺图形学的知识了。。所以瞟一眼得了先。。最原始的是BasicTexture类，根据不同的资源又有VideoBaseTexture这种处理具体类型资源的辅助类，最后RenderTexture根据WebGL和Canvas又会有RenderTarget类和CanvasBuffer类。。。。。额O__O "…还是不看了😂

对了！我们主要研究的是图形，所以瞅瞅Graphics，Pixi渲染图形也支持WebGL简直美滋滋，正和我们意，具体到代码就是数学家与矩阵的狂欢了。。先跑路。

我们先在Pixi中画一些基本的图形对比一下用WebGL和Canvas2d渲染的情况，方便我们对这两种方式有个大概的理解：

先来WebGL：

<iframe width="100%" height="300" src="//jsfiddle.net/todaylg/mcpg6wos/embedded/result,js,html,css/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

再看看Canvas2D：

<iframe width="100%" height="300" src="//jsfiddle.net/todaylg/8cea3qw4/embedded/result,js,html,css/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

鼠标滚轮可以放大缩小，左键点击后可以拖拽（模仿Cytoscape），放大之后可以比较明显的看出二者渲染结果的差别了，WebGL渲染的图形即使加了抗锯齿、FXAA（Fast Approximate Anti-Aliasing 快速近似抗锯齿）但是效果还是和Canvas2D有差距，WebGL的抗锯齿效果并不是那么的理想（具体原因没搞明白，待研究WebGL），而Canvas2D的效果则是很棒了。虽然WebGLRender效果没有那么好，但是也还能凑合，等数量多了以后WebGLRender的优势就会凸显出来了。

## Cytoscape

相比于D3的大红大紫， **[Cytoscape](http://js.cytoscape.org/#introduction/factsheet)** 就显得低调很多了，Cytoscape是一个用于分析和可视化图形及关系网的库，不同于D3，Cytoscape只基于Canvas进行了
一系列的封装，作者是多伦多大学的Donnelly Centre（给数学家们献上膝盖。。。）功能十分强大。

## PiCi

那既然有Cytoscape了，那还研究个啥？？正如之前所述，当数量达到万级的时候，Canvas2dRender也得GG了，这时候WebGL就称霸了。所以现在研究的就是能否基于Pixi，利用它支持WebGL渲染并且可以向下兼容Canvas的特性，在大数量渲染的时候把性能提升上去呢？比如在Pixi里面实现 **[Cytoscape官网的一个基本例子](http://js.cytoscape.org/demos/visual-style/)**

<iframe width="100%" height="300" src="//jsfiddle.net/todaylg/f6oj27am/embedded/result,js,html,css/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

这个例子麻雀虽小五脏俱全，包含的东西挺多的，首先是 **节点的几何体（矩形、三角形、圆）**、**节点、边上的字、边（直线和曲线）**、**边两端的箭头**、**合理的布局**、**随鼠标焦点的拖拽和放大**，且！**没有失真**！那么基于Pixi到底能否实现呢？先给答案再解释=>不改源码的话=>不行🚫！ok👌，先一点一点来吧~：

### 节点

首先自然是最基本的节点，节点是各种多边形，我们有两种方法可以实现出不错的效果：

第一个当然是直接画，圆还好说（可以看前面的例子），只需要目标点的坐标以及圆半径即可。但是要是多边形的话就得吃数学了，需要自己计算出各个顶点的坐标，对于我这种高数 = 高中数学的选手，那自然是相当的吃力。

第二种方法则是启动Ps，画出需要的图形，导出白色的图形，在Pixi中将图片转为Sprite，这下Pixi就厉害了，可以通过更改tint来更改颜色，这样一来你画得出什么图片，就能拿什么图片当节点啦，但是这样会出现两个问题：1.由于图片像素的限制也不能保证无限放大不失真了；2.还需要计算碰撞体积，还是吃数学。

对于问题一咱们可以在Ps导出的时候就导出高分辨率的图片，这样就能保证在放大一定程度以内是没有失真的，这在实际使用中也是可以接受了的，毕竟谁去一直滚滚轮啊（和resize浏览器窗口一个道理，只有开发者才会闲得无聊这么干）。放大的问题解决了但是又发现sprite在缩小后边缘锯齿效果非常严重： **[奇怪的问题](https://github.com/pixijs/pixi.js/issues/4205)**,原因还不得而知。。。所以贯彻我们曲线救国的方针，我们给sprite添上一个BlurFilter，效果一下又好了不少~

但是对于问题二。。。。=\> 直接无解，直接忽视，直接不想！！咱们以圆为例子即可，不然话题将会没法继续了。

这种方法最后实现的例子（滚轮放大）：

<iframe width="100%" height="400" src="//jsfiddle.net/todaylg/z8nwrhj8/7/embedded/result,js,html,css/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

### 边

边分为直线和曲线两种，直线自不必多说，直接lineTo即可，曲线就得用贝塞尔曲线来画了，扯到这个贝塞尔曲线就又涉及到数学家们的狂欢了。。。什么二阶贝塞尔、三阶贝塞尔。。。那这个贝塞尔曲线到底是啥呢？

#### 贝塞尔曲线

其实总而言之n阶的贝塞尔曲线就有n-1个控制点，而画出一段贝赛尔曲线就需要起点终点以及控制点的坐标,计算公式可见 **[Wiki](https://en.wikipedia.org/wiki/B%C3%A9zier_curve#Quadratic_curves)**或者 **[这里](http://blog.csdn.net/zhaopenghhhhhh/article/details/17753615)**,要是对推导过程有兴趣还可以看看 **[这里](http://www.cnblogs.com/equal/p/6414263.html)**(给数学家献上膝盖。。)，用的时候直接套公式即可，比如Cytoscape里的：

```javascript
//Cytoscape qbezierAt
math.qbezierAt = function( p0, p1, p2, t ){
  return (1 - t) * (1 - t) * p0 + 2 * (1 - t) * t * p1 + t * t * p2;
};
```

---

起点和终点我们通过手动赋值或者后面说的布局后就得到了其坐标位置了，但是控制点的位置该如何移动才能实现Cytoscape例子中那样Q弹的效果呢？

仔细观察的话可以看出应该是二阶贝塞尔曲线，控制点取的应该是起终点的中点，但是高度应该随着距离的减小而增加，有了大致的想法后我们想想如何具体实现。

第一个方法当然是直接去翻Cytoscape的源码看它是怎么算的就行啦~翻到Cytoscape源码extension/renderer/canvas/drawing-edges.js，又会发现CRp继承的是BRp，，往上翻回base下的coord-ele-math就是计算的具体方法了，一条边的绘制总共涉及四个点的坐标：source、mid-target、mid-source、target，根据线形状的不同以及箭头形状的不同各个点计算的方法又不同（涉及角度等等因素），膝盖跪穿了都没看懂具体是怎么算的。。。搞不懂计算的方法也就搞不懂代码中一些数值的含义。。但是直接从源码中扒出来也是可以直接用的。。。比如把画三角形箭头的代码给扒出来：

<iframe width="100%" height="300" src="//jsfiddle.net/todaylg/nwf749rn/3/embedded/result,js,html,css/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

第二个方法自然就是自己来了呗。有了前面说的思路，起终点以箭头的几何状不同取不同的位置，比如圆取中心，三角形取底边中心这样，难点在控制点的计算上，列出了个二元二次方程组用万能公式都没解出来（菜的抠脚。。），总之保留这个思路嘛可以，等大神赐教一番或者补补高数以后再继续算吧。。。

第三个方法则比较麻烦：由SVG转Canvas来直接绘制贝塞尔曲线。先看d3的一个基于SVG边是贝塞尔曲线的 **[例子](http://bl.ocks.org/mbostock/1153292)**,它的贝塞尔曲线效果不正是我们需要的吗？看代码：

```javascript
function linkArc(d) {
  var dx = d.target.x - d.source.x,
      dy = d.target.y - d.source.y,
      dr = Math.sqrt(dx * dx + dy * dy);
  return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
}
```

---

这里的实现非常的简单，就一句代码，那我们只要把SVG的ArcTo用Canvas里的arc()方法替代一下就ok啦，但是二者是不同的，具体怎么在Canvas里将SVG ArcTo做转换我整明白（又是个数学问题。。。）但是找找github果然已经有大佬实现了： **[svg-arc-to-cubic-bezier](https://github.com/colinmeinke/svg-arc-to-cubic-bezier)** 这个库不知道为啥只有这么点star，但是很多其他库都是依赖它的，比如腾讯的 **[pasition](https://github.com/AlloyTeam/pasition)** 。使用它可以将一段SVG Arc转换为一段或者多段三阶贝塞尔曲线实现，返回贝赛尔曲线的起终点和两个控制点坐标.而Canvas也封装了三阶贝塞尔曲线方法bezierCurveTo（二阶是quadraticCurveTo），所以方法三实现起来会比较舒服（但是中间多了一层转换，性能会差一点）。

#### 箭头

箭头我想到的办法比较笨，就是简单的相似三角形加上四个象限分别讨论的方法确定坐标，比如三角形：

```javascript

//这个三角形默认按顶角为50°，两个底角为65°来算，两边长先按一半nodeWidth来算吧
let t_nodeRadius = nodeWidth;
if (!targetFlag && sourcePos.width) t_nodeRadius = sourcePos.width;
if (targetFlag && targetPos.width) t_nodeRadius = targetPos.width;

//边界判定 => 贴一起了就别显示啦
if ((Math.abs(source.y - target.y) < t_nodeRadius * 1.5) &&
    (Math.abs(source.x - target.x) < t_nodeRadius * 1.5)) {
    t_nodeRadius = 0;
}

let t_srcPos = targetFlag ? sourcePos : targetPos;
let t_tgtPos = targetFlag ? targetPos : sourcePos;

let topAngle = Math.PI / 180 * 50,//角度转弧度，注意Math的那些方法的单位是弧度
    sideEdge = t_nodeRadius,//瞅着合适，先凑合
    halfBottomEdge = Math.sin(topAngle / 2) * sideEdge,
    centerEdge = Math.cos(topAngle / 2) * sideEdge;
//angle是一样的，先按node中心算，arrow中心算之后再说，先todo(直线版看出不这个问题，曲线就崩了)
let angle = Math.atan(Math.abs(t_srcPos.y - t_tgtPos.y) / Math.abs(t_srcPos.x - t_tgtPos.x));
let beginPosX = t_nodeRadius * Math.cos(angle),
    beginPosY = t_nodeRadius * Math.sin(angle),
    pos1X, pos1Y, pos2X, pos2Y,
    centerX = (t_nodeRadius + centerEdge) * Math.cos(angle),
    centerY = (t_nodeRadius + centerEdge) * Math.sin(angle);

pos1X = pos2X = Math.sin(angle) * halfBottomEdge;
pos1Y = pos2Y = Math.cos(angle) * halfBottomEdge;//简单的几何知识(手动抽搐😖)

//还需要分类讨论target和source的左右位置的各种情况
//1234代表target相对source所在象限
if (t_srcPos.x > t_tgtPos.x) {//source节点在右
    if (t_srcPos.y > t_tgtPos.y) {//下 ----> 1
        beginPosX = t_tgtPos.x + beginPosX;
        beginPosY = t_tgtPos.y + beginPosY;

        centerX = t_tgtPos.x + centerX;
        centerY = t_tgtPos.y + centerY;

        pos1X = centerX + pos1X;
        pos1Y = centerY - pos1Y;//+ -

        pos2X = centerX - pos2X;
        pos2Y = centerY + pos2Y;//- +
    } else {//上 ----> 4
        beginPosX = t_tgtPos.x + beginPosX;
        beginPosY = t_tgtPos.y - beginPosY;

        centerX = t_tgtPos.x + centerX;
        centerY = t_tgtPos.y - centerY;

        pos1X = centerX + pos1X;
        pos1Y = centerY + pos1Y;//+ +

        pos2X = centerX - pos2X;
        pos2Y = centerY - pos2Y;//- -
    }

} else {//source节点在左
    if (t_srcPos.y > t_tgtPos.y) {//下 ----> 2
        beginPosX = t_tgtPos.x - beginPosX;
        beginPosY = t_tgtPos.y + beginPosY;

        centerX = t_tgtPos.x - centerX;
        centerY = t_tgtPos.y + centerY;

        pos1X = centerX - pos1X;
        pos1Y = centerY - pos1Y;//- -

        pos2X = centerX + pos2X;
        pos2Y = centerY + pos2Y;//+ +
    } else {//上 ----> 3
        beginPosX = t_tgtPos.x - beginPosX;
        beginPosY = t_tgtPos.y - beginPosY;

        centerX = t_tgtPos.x - centerX;
        centerY = t_tgtPos.y - centerY;

        pos1X = centerX - pos1X;
        pos1Y = centerY + pos1Y;//- +

        pos2X = centerX + pos2X;
        pos2Y = centerY - pos2Y;//+ -
    }
}

//Draw triangle
let triangle = new Graphics();

triangle.beginFill(0x66CCFF);
triangle.lineStyle(0, 0x66CCFF, 1);
triangle.moveTo(beginPosX, beginPosY);
triangle.lineTo(pos1X, pos1Y);
triangle.lineTo(pos2X, pos2Y);
triangle.endFill();
```

---

最后的效果：

<iframe width="100%" height="400" src="//jsfiddle.net/todaylg/z8nwrhj8/3/embedded/result,js,html,css/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

### Zoom/Scale

这个就没有那么多好说的了，D3也有封装好的d3-zoom,自己实现的话需要注意的就是stage(canvas也一样)放大的中心是左上角(即(0,0)),所以要保证放大之后鼠标位置的图形还保持不动，就得分两步走：1.先把当前鼠标在浏览器中的位置转换为在stage中的位置；2.根据放大还是缩小，stage做与当前坐标相反的差值位移。这样放大或者缩小后鼠标在stage中的指向位置就不会变了。Scale也是类似的倒立，只不过要注意stage做负向位移的时候要考虑当前放大倍数的因素。

### 布局(Layout)

节点少的时候我们还可以人工的手动给赋值，或者直接随机赋值，但是当数量大了的时候这两者的问题就暴露得很明显了，因为节点和节点之间是有关系的，不能随机乱放，手动赋值则赋值到手抽筋。。。所以布局还是很重要的，好的布局能让关系凸显的更加清楚。

#### Dracula

[Dracula](https://www.graphdracula.net/)就是用于布局图形和关系网的,只需要添加边信息即可赋予节点位置，核心代码如下：

```javascript
let g = new Dracula.Graph();
for (let i = 0, l = edges.length; i < l; i++) {
    let data = edges[i], id = data.id;
    g.addEdge(data.source, data.target);
}
var layouter = new Dracula.Layout.Spring(g);
layouter.layout();

var renderer = new Dracula.Renderer.Raphael('canvas', g,canvas.width, canvas.height);

renderer.draw();//这里改动了Dragular的源码,这个draw方法不再进行渲染

//根据g生成的位置进行初始化
let nodesObj = g.nodes;
for (let node in nodesObj) {...}
```

---

因为想省时间的原因没有单把其布局算法抽出来，而是粗暴的直接删掉渲染方法提出坐标信息。Dracula作为静态布局效果不错，但是并不考虑节点的大小问题(width)，估计得自己在其代码基础上进行修改，所以先不深入了。

#### D3-force

力布局就显得效果炫酷很多了，而且得益于D3 V4模块化分得很清楚，可以把D3-force单独拎出来用于布局：

<iframe width="100%" height="400" src="//jsfiddle.net/todaylg/z8nwrhj8/8/embedded/result,js,html,css/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

关于d3-force的具体介绍可以看 **[这里](https://github.com/xswei/d3js_doc/tree/master/API/d3-force-master#link_distance)** ，我试来试去，一种力一种力的测试还是比较好理解的，但是一旦加上d3.forceLink(edges)之后就变得很奇怪。。。这块还待继续研究。。

### Text

Text就是GG的原因了。。还记得最开始初探源码那会说的Text继承于Sprite吗？Pixi对文字的处理相当于是在Sprite的基础上的，用Canvas2d（fillText( **[规范](https://www.w3.org/TR/2dcontext/#dom-context-2d-filltext)** )）处理文字后最终返回的Text实例即使跟随stage同步放大渲染出来的文字也是失真的：

<iframe width="100%" height="300" src="//jsfiddle.net/todaylg/z8nwrhj8/9/embedded/result,js,html,css/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

Text实例即使跟随stage同步缩放：

<iframe width="100%" height="300" src="//jsfiddle.net/todaylg/z8nwrhj8/11/embedded/result,js,html,css/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

WebGL怎么渲染出放大后不失真的字体？Canvas2d又是怎么解决这个问题的呢？想弄明白估计得补补图形学（WebGL3D）并且去看浏览器内核（Canvas2D）是怎么实现的了，疯狂的触及着我的知识盲区。。。希望以后能搞明白吧。。。。

## CreateJS

和Pixi一样，CreateJS也是一个H5 2D渲染引擎，在今年9.16号更新的1.0版本，但是要知道上一个版本0.8.2是在2015年更新的。。。时隔2年突然更新了一下，这两年他们到底经历了什么？连官网都停留在两年前。。各种莫名其妙不由的让人想试试这个框架2333。所以干脆接着上边被卡住对文字渲染问题继续拿CreateJS往下折腾吧~

CreateJS也提供WebGL与Canvas2D两个Renderer,默认是使用Canvas2D,如果设置为WebGL渲染，当遇到WebGL不支持渲染的Shape、Shadow、Text的时候会直接忽视掉（不进行渲染）。

### Text

CreateJS渲染Text使用的是Canvas2D,所以自然是无失真的，对于节点来说Text默认应当处于节点的正中间，对于直边来说也是这样，但是对于贝赛尔曲线的边这里还没有想到很好的实现方法，所以先放在贝赛尔曲线两个控制点的中点:

<iframe width="100%" height="400" src="//jsfiddle.net/todaylg/03Ladyqs/10/embedded/result,js,html,css/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

### Pin Effect

图钉效果可以直接通过设置D3-force的fx、fy来实现，拖拉以后双击可以恢复弹力：

<iframe width="100%" height="400" src="//jsfiddle.net/todaylg/03Ladyqs/11/embedded/result,js,html,css/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

### Right Click/Add Image

右键菜单就没啥好说的了，添加图片这里需要注意一下转成Bitmap后由于Bitmap格式已经足够简单所以不用cache反而会好一些（但是如果用了filter则必须使用cache）：

<iframe width="100%" height="400" src="//jsfiddle.net/todaylg/03Ladyqs/12/embedded/result,js,html,css/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

## Two.js

[two.js](https://two.js.org/)和CreateJS一样，给人的感觉都是懒癌患者，two.js最近的版本更新的时间是在2016年2月。。。

但是支持WebGL渲染字体且效果理想的我只找到了它。。

<iframe width="100%" height="300" src="//jsfiddle.net/todaylg/b7fLwvcd/1/embedded/result,js,html,css/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

但是这兄弟长时间不更新像是放弃治疗了是一回事，另一回事是这兄弟在性能表现上不太理想。。。或者说十分不理想，原因还没有深究：

\[测试在这里\]([https://two.js.org/examples/particle-sandbox.html?type=webgl&shapes=circle&operations=translation&count=2000](https://two.js.org/examples/particle-sandbox.html?type=webgl&shapes=circle&operations=translation&count=2000)
)

2000个运动的圆在WebGL下也GG了。。。。要知道D3给1000多个节点使用d3-force且是使用用SVG的都能十分流畅。。。。

## 结论

自己缺东西，问题研究到底下会发现开始寸步难行，一方面缺到是算法和数学，特别是与可视化方面相关的与这两的关系就更为密切了，炫酷的效果后面都是数学；另一方面是缺图形学这些一大块一大块的计算机知识体系，所以研究不得不只停留在初探。。。希望安心拿了通信毕业证以后早点把计科的知识补上吧。。。再继续研究吧。。。

## To Be Continued
