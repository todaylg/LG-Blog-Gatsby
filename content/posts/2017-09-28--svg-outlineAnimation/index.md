---
title: SVG描边动画
category: "小结"
cover: test6.jpg
author: todaylg





---

## 基础知识

### 1.SVG (Scalable Vector Graphics)

首先需要知道SVG大概是个啥，SVG即可缩放矢量图形（Scalable Vector Graphics),是一种用XML定义的语言，用来描述二维矢量图形，并且已经是一个W3C标准，所以它也可以和CSS、DOM协同工作。SVG的属性和元素有茫茫多，详细的可以瞅瞅[MDN](https://developer.mozilla.org/zh-CN/docs/Web/SVG)，这里首先需要注意**stroke**属性，因为描边动画与这小子关系很大,简单的先瞅瞅吧：

| stroke            | 表示描边颜色（为啥不直接叫stroke-color??!）                                  |
| ----------------- | -------------------------------------------------------------- |
| stroke-width      | 表示描边粗细                                                         |
| stroke-linecap    | 表示描边两边端点的表现方式 stroke-linejoin 表示描边转角的地方的表现方式                   |
| stoke-miterlimit  | 这个属性有点复杂，表示在两描边相交(必须是锐角)的地方的表现方式，其值代表斜切长度/描边宽度的最大值，超出的直接表现为切除。 |
| stroke-opacity    | 表示描边透明度                                                        |
| stroke-dasharray  | 表示虚线描边中虚线的长度                                                   |
| stroke-dashoffset | 表示虚线描边的其实偏移值                                                   |

在这里我们主要关心的是**stroke-dasharray**和**stroke-dashoffset**，因为这两与描边效果有最直接的关系。

其次还需要注意一下SVG自带的**transform**属性，它和CSS的transform在有些地方可不太一样。

**相同点**：在2D层面下的变换和CSS的一样的，包括translate、rotate、scale、skewX、skewY以及matrix。二者transform属性都支持多声明累加，但是这里要注意坐标系也是随变换移动的，所以变换的顺序会影响到最后的结果（可以在下面的Demo里试一试就知道啦）。

Wait！这个matrix是不是没瞅过？这老哥还挺复杂的，详细分析这个属性可以瞅这：[Matrix](http://www.zhangxinxu.com/wordpress/2012/06/css3-transform-matrix-%E7%9F%A9%E9%98%B5/)

<iframe width="100%" height="300" src="//jsfiddle.net/todaylg/uwkmpqwj/embedded/result,js,html,css/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

**不同点**： 首先最大的不同点在于各自的坐标系统，CSS的transform是相对于当前元素而言的，默认是元素中心(transform-origin:50% 50%),但是SVG的transfrom则是以SVG画布左上角为中心点计算的，用旋转变换可以一下就看出区别了。

那要是想让SVG元素以自己的中心点进行变换该怎么办呢？最容易想到的当然就是通过transform-origin修改中心点再配合CSS变换，但是其实SVG的rotate属性也是可以设置中心点的：

<iframe width="100%" height="300" src="//jsfiddle.net/todaylg/pux0y3xn/embedded/result,js,html,css/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

上边的rotate(45 100 100),45自然代表旋转45度，后面的两个100则是修正中心点的坐标，那这100是怎么来的呢？100=起始偏移(50)+宽度/高度的一半(100/2=50).

<iframe width="100%" height="300" src="//jsfiddle.net/todaylg/pux0y3xn/embedded/result,js,html,css/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

同理，因为坐标系统不一样，scale在放大之后你也会发现二者的位置不一样了，CSS的transform中心为元素中点，所以放大之后没有偏移，但是SVG中心为左上角，放大之后相对于左上角的偏移值也会被放大scale数值的倍数。然而scale又不像rotate那样有可以调整中心的参数，所以 只能靠手动挡来解决问题：先找到图形的中心坐标，将图形中心从左上角translate到中心坐标，再做scale变换（这里坐标系也放大），最后再归位，看实例：

<iframe width="100%" height="300" src="//jsfiddle.net/todaylg/pux0y3xn/1/embedded/result,js,html,css/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

这里需要注意的是在经过scale变换后，整个坐标系都受到了相应的影响(也scale了)，所以后面的tranlate虽然数值和前面的数值是一样的，但是其实是相当于translate(scale*原数值的)。这儿有点绕啊，换一个说法，左上角到中心点的距离，和变换之后再往回移同样的距离(数值)，其实不就是相当于把左上角到中心点的这段距离也做了scale变换吗，所以就是相当于以图形中心点放大的效果啦。

skew也是类似的情况，不过这里的SVG的skew只能skewX、skewY分开来写，总而言之最简单的解决坐标系的差异的放大还是都转用CSS的transform变换。不过我们知道了这些差异后，改着改着要是出现莫名其妙的变换结果也能知道是为啥啦。

### 2.Adobe Illustrator/Sketch

在绘制一些简单的图形时我们可以直接用代码实现出来，但是需要绘制的是一些复杂的路径组合成的图形时我们就需要借助工具了。AI和Sketch都是很棒的矢量绘图工具，但是在实践中我发现两者在导出SVG的代码上、功能上都存在一些区别(区别后面会详细介绍)，所以这里需要两者结合着使用（也可能是我使用的姿势不对(╯﹏╰)）。具体两个软件的基础操作可以观看一些基础教学视频，在这里就不赘诉啦~

#### Anime.js/Velocity.js/Greensock

动画框架有很多，各自有各自的特点和适用场景：

**GSAP**

---

毫无疑问是做复杂动画的最佳选择,特别适用于对时间要求非常精确的场景，功能十分强大，用它写动画会简单很多，相应的缺点自然就是它比较重，压缩过后的TweenMax也达到了115KB，当然，TweenMax的目的就是要全功能，如果简单的动画使用TweenLite即可，TweenLite压缩后为29KB。还有一点需要注意的是它的开源协议不是MIT，免费使用的前提是不能向用户收取使用/访问/许可的费用，简单来说就是用户使用和访问都不能收费，也不能通过转让许可来获利。

**Velocity.js**

---

显得就中规中矩了，感觉自从anime.js出来以后，Velocity就崩了😂，上一次提交已经是1个月以前了。。。压缩以后大小为45KB，优势在于可以和JQuery无缝配合，并且最低可以兼容到IE8 和 Android 2.3。

**Anime.js**

---

胜在其小巧且常用功能一个不缺，压缩之后只有16KB，并且文档棒，上手速度快，应该可以说是目前最火的动画框架了。

这里选用的是Anime.js，当然其他两框架也都能实现SVG动画，但是一来Anime.js很轻，二来文档炫酷上手较容易，三来其他两个都用过了也想尝试一下新的框架，最重要的：**它的star最多！**这不用用看能服气吗？[Anime.js](http://animejs.com/)

## 绘图

基础知识整得差不多了，下边我们就开工吧~ 第一步毋庸置疑需要我们先将脑海里的东西绘制出来，这里有的小伙伴一听要画图直接哭了出来😂，这里再推荐一个网站:[convertio.co](https://convertio.co/zh/png-svg/),可以将jpg或者png直接转成svg，效果也还是不错滴(自己再删改一下凑合就能用啦)。

这里绘制的具体过程就不展开了(偏题啦)，一些需要注意的问题结合具体要实现的动画效果再做提醒。

在绘制完成后，导出并保存为SVG（也可以直接Copy SVG代码），有了SVG我们便可以愉快的开始实现我们炫酷的动画效果啦。

## 狂拽酷炫

#### 1.描边动画

Tips:描边动画的制作在AI中比较方便，选中对象(或文字)后，点击Type中的Create Outline创建轮廓，之后再导出便是Path啦~

之前也有介绍和描边动画关系最为密切的就是`stroke-dasharray`和`stroke-dashoffset`，核心效果的实现其实是很容易理解的：

1. 将stroke-dashoffset设置为>=整个字体路径的长度(这样就看不到字体了)

2. 将stroke-dasharray设置为>=整个路径的长度(以做出实线的效果)

3. 通过插值(CSS animation/动画框架)将stroke-dasharray降为0

这样一个描边效果就实现啦，举两个例子：

<iframe height='400' scrolling='no' title='Bayleys animated logo (SVG)' src='//codepen.io/rafita/embed/aNyRgv/?height=265&theme-id=0&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/rafita/pen/aNyRgv/'>Bayleys animated logo (SVG)</a> by Rafael Contreras (<a href='https://codepen.io/rafita'>@rafita</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

<iframe height='265' scrolling='no' title='anime.js logo animation' src='//codepen.io/juliangarnier/embed/xOgyjB/?height=265&theme-id=0&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/juliangarnier/pen/xOgyjB/'>anime.js logo animation</a> by Julian Garnier (<a href='https://codepen.io/juliangarnier'>@juliangarnier</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

上边的两个例子中，前者实现方式是通过CSS，两后者则是使用JS获取到准确的路径长度(`path.getTotalLength()`)之后在进行的动画，用纯CSS来实现的话则只需要设置元素的stroke-dasharray和stroke-dashoffset为一个较大的值(保证大于路径长度即可)。

#### 2.形变动画

Tips:这里有点需要注意的地方，那就是如果使用AI将图案导出为SVG，AI为了使得代码尽可能精简以压缩svg文件大小，会将部分你用钢笔工具勾出的贝塞尔曲线路径用椭圆弧曲线路径替代，也就是你会发现导出的SVG里的d属性中会有A/a把C/c、Q/q替代了，这样动画框架在做插值运算的时候就会导致报错，因为Arcto有些参数只能是0或者1，用来决定（LargeArcFlag）是要画小弧（0）还是画大弧（1）或者确定（SweepFlag）弧是顺时针方向（1）还是逆时针方向（0），这时候用Sketch来导出就没这些问题啦（清一色M+C/M+Q）。

首先需要绘制出形变前和形变后的矢量图案，这里需要注意形变前后的路径点数必须一致，否则也会报错。使用Sketch导出SVG后，提取出形变后的路径信息(d属性)，就可以很方便的实现形变动画啦

<iframe height='265' scrolling='no' title='animejs - social morph' src='//codepen.io/ainalem/embed/ryRMbB/?height=265&theme-id=0&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/ainalem/pen/ryRMbB/'>animejs - social morph</a> by Mikael Ainalem (<a href='https://codepen.io/ainalem'>@ainalem</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

#### 3.碎片效果

Tips:这里借助AI的美工刀工具（Knife）会很方便,将对象切割开AI便会自动新生成一个个小对象（即碎片啦）

导出后再给碎片的translateX、translateY、rotate属性在一定范围内赋予一个随机值作为起始点，一定时间后归为0（归位）就实线碎片复原的效果啦：

<iframe height='265' scrolling='no' title='Shattering Text Animation' src='//codepen.io/ARS/embed/pjypwd/?height=265&theme-id=0&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/ARS/pen/pjypwd/'>Shattering Text Animation</a> by Arsen Zbidniakov (<a href='https://codepen.io/ARS'>@ARS</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

#### 4.动态渐变效果

动态渐变的效果其实只不过是mask标签以logo路径与不同渐变色的circle结合作为遮罩，再结合不同渐变色的圆从小到大的动画实现的：

<iframe height='265' scrolling='no' title='Brand Logo Animation' src='//codepen.io/mallendeo/embed/xVXrYR/?height=265&theme-id=0&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/mallendeo/pen/xVXrYR/'>Brand Logo Animation</a> by Mauricio Allende (<a href='https://codepen.io/mallendeo'>@mallendeo</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

这里出现了两个新的SVG元素：use和mask：

use元素在SVG文档内取得目标节点(xlink:href)，并在use元素所在的地方粘贴它们（注意：是Deep Copy）

mask元素可以指定一个对象（谁引用就是谁，在这里即为circle）和透明的遮罩层合成，形成背景。透明遮罩层可以是任何其他图形对象或者<g>元素（用mask元素包裹，在这里即为logo路径）。mask元素用于定义这样的遮罩元素。属性mask用来引用一个这样的遮罩元素。
