---
title: Flex布局基础
category: "基础备忘"
cover: bg.jpg
author: todaylg


---

## Flex布局基础

传统的布局方案，无非就是position(或者float、fixed)结合方向定位以及display等来整，一来比较复杂容易乱，二来对于一些复杂的布局实现起来会有困难。而flex的出现大大简化了这一过程，所以以后一般能用flex布局的尽量全改用flex布局来整（现代浏览器都已支持）

#### 基本概念

Flex即弹性布局(Flexible Box)，父元素设置为flex布局后，子元素会自动成为其item，并且子元素的float、clear和vertical-align属性都会失效。

**理解flex最重要的个人觉得就是理解主轴(X轴)和副轴(Y轴)啦**,设想有了x和y轴，在二维(即平面)中还有什么布局是不能实现的呢？当然，也会有一些特殊的布局要求（比如倒序等等），这些再结合flex容器的一些属性，那么也是非常轻松的解决了

#### 属性

##### 容器(Box)属性

1.Flex-direction

该属性用于设置item的排列方向：

```css
flex-direction:
row(defalut)：主轴为水平，起点为左端
row-reverse: 主轴为水平，起点为右端
column：主轴为垂直，起点为上端
colume-reverse：主轴为垂直，起点为下端
```

2.Flex-wrap

该属性设置当单行轴线容纳不下时的换行方式

```css
flex-wrap:
nowrap(default):不换行(最多压缩到最小宽度)
wrap:换行
wrap-reverse:换行,但是第一行在下面
```

3.Justify-content

该属性定义item在主轴上的对齐方式（与轴的方向挂钩）

```css
justify-content:
flex-start(defalut)：item们左对齐
flex-end：item们右对齐
center： item们居中对齐
space-between：item们两端到顶，剩下的间隔均分在每个item之间。
space-around：每个item两侧的间隔相等,可以理解为每个item的边距都相等（均分空隔）
```

4.Align-items

该属性自然就是定义副轴上的对齐方式了(也与轴的方向同步)

```css
align-items:
stretch(defalut)：item们会按容器的高度拉伸(填满)。
flex-start：item们顶对齐。
flex-end：item们底对齐。
center：item们中心对齐。
baseline: item们基线对齐。//TODO
```

5.Align-center

该属性定义多根轴线(各个轴线不同设置但都听它的)的对齐方式(单轴线则此属性无效)

```css
align-center:
stretch(defalut)：轴线按副轴进行拉伸(填满)。
flex-start：按副轴的起点对齐。
flex-end：按副轴的终点对齐。
center：按副轴的中点对齐。
space-between：以副轴两端到顶，轴线之间的间隔平均分布。
space-around：每条轴线两侧的间隔都相等。
```

6.Flex-flow

该属性就是flex-direction和flex-wrap的简写形式(以空格隔开)

```css
row nowrap(defalut)
```

##### Item的属性

1.order

该属性定义item的排列顺序。数值越小越靠前(可以为负数，同级按排列顺序分先后)

```css
order:0    (defalut)
```

2.flex-grow

该属性定义item放大几倍

```css
flex-grow:0    (defalut)/*即不放大*/
```

3.flex-shrink

该属性定义item缩小几倍

```css
flex-shrink:1(defalut)/*即不放缩小*/
```

4.flex-basis

该属性定义item占据主轴的多少(px),这样item就可以占据固定的空间了(剩下的空间再其他item再按设定的属性分)

```css
flex-basis:auto(defalut)
```

5.flex

该属性是flex-grow, flex-shrink 和 flex-basis的简写

```css
flex:0 1 auto(defalut)/*后两个属性可选，一般优先使用该属性而不是分开写*/
```

6.align-self

该属性用于单个item设置其特殊的对齐方式(覆盖align-item的设置)是flex-grow, flex-shrink 和 flex-basis的简写

```css
align-self:auto(defalut)
```
