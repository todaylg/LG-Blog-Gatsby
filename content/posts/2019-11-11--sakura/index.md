---
title: Sakura是怎样炼成的
category: "小结"
cover: bg.jpg
author: todaylg

---

平常在动漫里其实可以非常高频的看到各种伴随樱花的场景，而这些场景又都美得一批，每每看到这些场景让人都不由自主的连连称奇、拍案叫绝、惊为天人、振聋发聩、大呼过瘾

<img src="https://raw.githubusercontent.com/todaylg/LG_Parallax/master/images/BG%20_bg.png" style="width:100%">

从此对 Sakura 有了执念。

其实有许多大牛前辈早已在 Web 中进行了实现：

有使用**Canvas2D**的：比如路人女主的[官网](https://www.saenai.tv/)在第二季还未开播的时候，网站的入场就使用的是大量樱花飘过的场景(可惜如今的官网已经改版掉了)，类似现在官网上这个[页面](https://www.saenai.tv/misakiten/)的效果(基于[particles.js](https://github.com/VincentGarreau/particles.js))，实现的原理其实就是若干张樱花图片作为素材(ctx.drawImage)+位移计算。

可惜效果和性能上都差强人意。

当然也有上**WebGL**的：比如直接建模一个简单樱花模型的[这个页面](https://yiwenl.github.io/Sketches/exps/32)，模型+instance其实已经能获得不错的效果与性能了：[LGL-instance](http://todaylg.com/LGL/examples/?src=instance.html)

但是要说最狠的，那还得是CodePen 上的[Sakura Animation using WebGL](https://codepen.io/FrankFitzGerald/pen/LAbfm)，完全没有使用任何图片素材，效果全部通过Shader计算及绘制。

白嫖这个牛皮的效果其实很久了，可惜当年水平太垃圾，压根看不懂，只能瞎改几个数值凑凑效果。

时过境迁，现在终于是能看个一知半解了，作为一名秉持着**“白嫖也要知其所以然”**学术精神的白学家，所以讲道理必须补一波“Sakura是怎样炼成的”，上Threejs从头搂一个专用的Sakura效果岂不美滋滋：

<iframe src="https://codesandbox.io/embed/sakura-tm298?fontsize=14&hidenavigation=1&theme=dark" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" title="Sakura" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin" ></iframe>

## Shape

前面也提到了这是一个纯 WebGL 效果，没有使用素材图片，所以首先最基础的一步自然是 Sakura 的形状绘制。

直接通过片元着色器绘制一些图案其实并不罕见，比如：[shadertoy](https://www.shadertoy.com/)、[glslsandbox](http://glslsandbox.com/)

所以我们哗啦一下就画出一个椭圆了！

<iframe height="300" style="width: 100%;" scrolling="no" title="Threejs-Sakura-Step1:Ellipse" src="https://codepen.io/todaylg/embed/NWWBdgj?height=300&theme-id=default&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/todaylg/pen/NWWBdgj'>Threejs-Sakura-Step1:Ellipse</a> by todaylg
  (<a href='https://codepen.io/todaylg'>@todaylg</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

旋转一些角度并且通过透明度裁剪一下，哗啦就可以画出基本形状了！

<iframe height="300" style="width: 100%;" scrolling="no" title="Threejs-Sakura-Step2:Sakura Shape" src="https://codepen.io/todaylg/embed/yLLxweg?height=300&theme-id=default&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/todaylg/pen/yLLxweg'>Threejs-Sakura-Step2:Sakura Shape</a> by todaylg
  (<a href='https://codepen.io/todaylg'>@todaylg</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Vertex Animation

2D 扩展到 3D，添加上各个轴向的一些随机旋转，哗啦一下就旋转起来了！

<iframe height="300" style="width: 100%;" scrolling="no" title="Threejs-Sakura-Step3:Vertex Animation" src="https://codepen.io/todaylg/embed/OJJoYxa?height=300&theme-id=default&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/todaylg/pen/OJJoYxa'>Threejs-Sakura-Step3:Vertex Animation</a> by todaylg
  (<a href='https://codepen.io/todaylg'>@todaylg</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Particle

粒子化哗啦一下数量就多了：

<iframe height="300" style="width: 100%;" scrolling="no" title="Threejs-Sakura-Step4:Particle" src="https://codepen.io/todaylg/embed/mddQmbW?height=300&theme-id=default&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/todaylg/pen/mddQmbW'>Threejs-Sakura-Step4:Particle</a> by todaylg
  (<a href='https://codepen.io/todaylg'>@todaylg</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Light/PostProcessing

再加个简单的方向光和辉光、暗角的后处理，窃个 Megumi 的素材图，哗啦一下美爆了！Rua！！（图片跨域的原因此处换用的 codesandbox，速度会慢些）

<iframe src="https://codesandbox.io/embed/sakura-tm298?fontsize=14&hidenavigation=1&theme=dark" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" title="Sakura" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin" ></iframe>