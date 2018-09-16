---
title: 初探WebGL(二)
category: "大结"
cover: test0.jpg
author: todaylg





---

## Part 4

Welcome to 3D!!

三维比二维多了一个深度信息(Z轴)，所以为了确定孤独的观测者的状态需要确定三个信息：1.观测的目标的坐标。2.观测者的坐标（视点）。3.上方向（比如你坐着不动头却乱扭，看到的场景也会变）。有了这三个矢量就可以创建出对应的视图矩阵，具体怎么算的我们暂且先不深入：

<iframe width="100%" height="430" src="//jsfiddle.net/todaylg/35br4q7m/19/embedded/result,js,css,html" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe>

在代码中我们将创建出来的视图矩阵直接与顶点坐标相乘，简单粗暴。WebGL默认视点(0,0,0)，观测点(0,0,-1),上方向（0,1,0）。

其实视点是可以不需要移动的，比如视点后移一个单位，是完全等价于把被观察对象向前平移一个单位的，二者本质是一样的，都可以用矩阵来描述。

而将旋转矩阵、平移矩阵、缩放矩阵和视图矩阵组合（就是矩阵相乘），比如先对三角形进行旋转变换，再怼旋转后的三角形进行与移动视点等效的变换，得到的就是在某个视点观察旋转后的三角形的图像了，而相乘后的矩阵就叫模型视图矩阵。

### 键盘控制移动视点

<iframe width="100%" height="430" src="//jsfiddle.net/todaylg/35br4q7m/20/embedded/result,js,css,html" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe>

但是会发现转着转着会少一个角，这是因为我们没有指定可视范围造成的，即观察者的可视空间。常用的可视空间为正射投影（长方体）、金字塔(透视)投影（四棱锥）。

### 正射投影

首先可视空间都是由前后两个矩形表面来确定的，分别是近裁剪面和远裁剪面，前者的四个顶点为(right,top,-near),(-left,top,-near),(-left,-bottom,-near),(right,-bottom,-near)，后者的四个顶点为(right,top,-far),(-left,top,-far),(-left,-bottom,-far),(right,-bottom,-far).

而正射投影是长方体的可视空间，那么其在xy轴上的坐标都是一样的，也就是需要确定的参数为：left,right,bottom,top,near,far。通过这些参数我们就可以计算得出正射投影矩阵（怎么算先不研究）,左右箭头修改near和far的值：

<iframe width="100%" height="430" src="//jsfiddle.net/todaylg/35br4q7m/21/embedded/result,js,css,html" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe>

知道了这个道理我们就可以修复之前缺角的情况了，无非就是把far调远一点,那顶点坐标再乘以一个投影矩阵呗：

<iframe width="100%" height="430" src="//jsfiddle.net/todaylg/35br4q7m/22/embedded/result,js,css,html" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe>

### 透视投影

在正射投影中物体不管距离的远近是多大就多大，但是我们真实世界中很明显物体是近大远小的，这就是透视投影的可视空间了。

透视投影需要的参数与正射投影不一样，需要确定的是可视空间顶面和底面的夹角fov、近裁剪面的宽高比aspect、near、far的位置四个参数，也是通过这几个参数可以计算出透视投影的矩阵（具体怎么算出来的先不研究）：

<iframe width="100%" height="430" src="//jsfiddle.net/todaylg/35br4q7m/23/embedded/result,js,css,html" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe>

将投影矩阵、视图矩阵、模型矩阵相乘可以得到模型试图投影矩阵。。。。上面的例子画了9个三角形，其实我们只需要画三个，剩下的通过变换即可得到:

<iframe width="100%" height="430" src="//jsfiddle.net/todaylg/35br4q7m/23/embedded/result,js,css,html" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe>

### 前后关系

WebGL默认会按照缓冲区中的顺序绘制图形，后面的盖前面的，为了解决前后关系的问题，WebGL提供了隐藏面消除的功能：

### gl.enable(cap)

---

| 参数  | 描述                              |
| --- | ------------------------------- |
| cap | 指定需要开启的功能                       |
|     | gl.DEPTH_TEST(隐藏面消除)            |
|     | gl.BLEND(混合)                    |
|     | gl.POLYGON\_OFFSET\_FILL(多边形位移) |

gl.clear()除了可以清楚颜色缓冲区，还可以清除深度缓冲区，深度缓冲区就是为了帮助WebGL进行隐藏面的消除，用来存储深度信息的。在绘制任意一帧之前都必须清除深度缓冲区，以消除绘制上一帧时留下的痕迹。

我们只需要开启应场面消除，在绘制之前清空深度缓冲区，之后就不用在意放入缓冲区的顺序（倒着放入也无所谓）了：

<iframe width="100%" height="430" src="//jsfiddle.net/todaylg/35br4q7m/24/embedded/result,js,css,html" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe>

但是当Z轴的值完全一样的时候就会出现深度冲突的情况，因为两个表面过于接近，深度缓冲区的有限精度已经不能区分前后关系了，这时候再开启多边形偏移即可：

### gl.polygonOffset(factor,units)

---

指定加到每个顶点会之后Z值上的偏移量，偏移量按照公式m x factor+ r x units计算(m表示顶点所在表面相对于观察者视线的角度，r表示硬件能够区分两个Z值之差的最小值)：

<iframe width="100%" height="430" src="//jsfiddle.net/todaylg/35br4q7m/25/embedded/result,js,css,html" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe>

先画了一个绿色的三角形，然后通过gl.polygonOffset()设置了多边形偏移参数，使得之后的绘制受到多边形偏移机制影响，再画一个黄色三角形，这样就避免了深度冲突了。

### 画个立方体

画立方体有很多种方法，比如一个面用两个三角形拼，6个面就是6x6=36个顶点，或者用gl.TRIANGLE_FAN来画，四个顶点就可以绘制一个四边形，就只需要4x6=24个顶点，一般我们都是使用gl.drawElements()替代gl.drawArrays()来进行绘制，能够避免重复定义顶点，保持顶点数量最小，立方体的话就是8个顶点，每个三角形与顶点列表的三个顶点相关联。

### gl.drawElements(mode,count,type,offset)

---

| 参数     | 描述             |
| ------ | -------------- |
| mode   | 指定绘制方式         |
| count  | 指定绘制顶点数        |
| type   | 指定索引值数据类型      |
| offset | 指定索引数组中开始绘制的位置 |

我们需要将顶点索引写入到缓冲区并绑定到gl.ELEMENT\_ARRAY\_BUFFER上：

<iframe width="100%" height="430" src="//jsfiddle.net/todaylg/35br4q7m/26/embedded/result,js,css,html" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe>

你会发现每个顶点的颜色影响到了三个面，我们只要单独把顶点坐标拎出来即可：

<iframe width="100%" height="430" src="//jsfiddle.net/todaylg/35br4q7m/27/embedded/result,js,css,html" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe>

## Part 5

OF光呢！！！？？？

常见的光为以下三种：

1.平行光。可以用一个方向和一个颜色来定义。

2.点光源光。可以用一个坐标和颜色来定义。

3.环境光。只需要颜色即可。

反射类型分为：

1.漫反射。漫反射是针对于平行光或者点光源而言的，反射光的颜色取决于入射光的颜色x表面基底色xcos(angle)(angle为入射光与表面形成的入射角，可以根据光线和表面的方向计算得出)

2.环境反射。环境反射是针对于环境光而言的，反射光的方向可以认为就是入射光的反方向，即取决于入射光颜色x表面基底色。

如果二者同时存在就直接相加。

<iframe width="100%" height="420" src="//jsfiddle.net/todaylg/35br4q7m/28/embedded/result,js,css,html" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe>

再加上环境光：

<iframe width="100%" height="420" src="//jsfiddle.net/todaylg/35br4q7m/29/embedded/result,js,css,html" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe>

要是加上变换的话情况就更复杂了，平移还好，不会改变平面的法向量，但是旋转就会了，这时候强大的逆转置矩阵就有声音了，怎么计算经过变换（乘以模型矩阵）后的法向量呢？只要将变换之前的法向量乘以模型矩阵的逆转置矩阵即可。首先逆矩阵是什么，矩阵乘以逆矩阵为单位矩阵，转置就是行列进行调换。（果然全是数学😂。。想放弃治疗了。。😢）

<iframe width="100%" height="420" src="//jsfiddle.net/todaylg/35br4q7m/30/embedded/result,js,css,html" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe>

换成点光源光（需要光源的世界坐标了）：

逐顶点：

<iframe width="100%" height="420" src="//jsfiddle.net/todaylg/35br4q7m/31/embedded/result,js,css,html" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe>

逐片元：

<iframe width="100%" height="420" src="//jsfiddle.net/todaylg/35br4q7m/32/embedded/result,js,css,html" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe>

动起来：

环境光：

<iframe width="100%" height="420" src="//jsfiddle.net/todaylg/35br4q7m/33/embedded/result,js,css,html" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe>

点光源光：

<iframe width="100%" height="420" src="//jsfiddle.net/todaylg/35br4q7m/34/embedded/result,js,css,html" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe>

### initShaders()

其作用总的来说就是编译GLSL ES代码，创建和初始化着色器（顶点和片元）：

1.创建着色器对象（gl.createShader()）

2.向着色器对象中填充着色器程序的源代码（gl.shaderSource()）

3.编译着色器（gl.compileShader()）

4.创建程序对象（gl.createProgram()）

5.为程序对象分配着色器（gl.attachShader()）

6.连接程序对象（gl.linkProgram()）

7.使用程序对象（gl.useProgram()）

这里的着色器对象用于管理一个顶点着色器或者一个片元着色器，每一个着色器都有一个着色器对象。程序对象是管理着色器对象的容器，在WebGL中一个程序对象必须包含一个顶点着色器和一个片元着色器。所以一般都是两个着色器（顶点加片元）对象和一个程序对象。

### 1.创建着色器对象（gl.createShader()）

所有的着色器对象都必须通过调用gl.createShader()来创建。

### gl.createShader(type)

---

| 参数   | 参数取值                                                 |
| ---- | ---------------------------------------------------- |
| type | gl.VERTEX\_SHADER(顶点着色器)或者gl.FRAGMENT\_SHADER(片元着色器) |

有create必有delete，所以gl.deleteShader()函数则是用来删除（不是马上删除，会等到程序对象不再使用该着色器后再删除）着色器对象的。

### 2.向着色器对象中填充着色器程序的源代码（gl.shaderSource()）

### gl.shaderSource(shader, source)

---

| 参数     | 参数取值           |
| ------ | -------------- |
| shader | 指定需要传入代码的着色器对象 |
| source | 指定字符串形式的代码     |

### 3.编译着色器（gl.compileShader()）

传入源代码之后还需要编译之后才能使用（所以要是更新了源代码想要效果也跟着更新就还需要重新编译）

### gl.compileShader(shader)

---

| 参数     | 参数取值    |
| ------ | ------- |
| shader | 待编译的着色器 |

debug的话可以调用gl.getShaderParameter()函数来检查着色器的状态。

### gl.getShaderParameter(shader, pname)

---

| 参数     | 参数取值              |
| ------ | ----------------- |
| shader | 指定待获取参数的着色器       |
| shader | 指定待获取参数的类型        |
|        | gl.SHADER_TYPE    |
|        | gl.DELETE_STATUS  |
|        | gl.COMPILE_STATUS |

要是直接编译失败gl.getShaderParameter会返回false，我们可以通过getShaderInfoLog（shader）来查看信息日志

### 4.创建程序对象（gl.createProgram()）

之前使用的gl.getAttribLocation和gl.getUniformLocation函数的第一个参数就是这个程序对象。

### gl.createProgram()

---

| 参数  | 参数取值 |
| --- | ---- |
| 无   |      |

一旦程序对象被创建之后，需要向程序附上两个着色器：

### 5.为程序对象分配着色器（gl.attachShader()）

### gl.attachShader(program, shader)

---

| 参数      | 参数取值    |
| ------- | ------- |
| program | 指定程序对象  |
| shader  | 指定着色器对象 |

同样的gl.detachShader函数用来解除分配给程序对象的着色器。

### 6.连接程序对象（gl.linkProgram()）

在为程序对象分配了两个着色器对象后，还需要将顶点着色器和片元着色器连接起来。

### gl.linkProgram(program)

---

| 参数      | 参数取值          |
| ------- | ------------- |
| program | 连接指定程序对象中的着色器 |

程序对象进行连接操作，目的是保证顶点着色器和片元着色器的varying变量同名同类型且一一对应；顶点着色器对每个varying变量赋了值；顶点着色器和片元着色器中的同名uniform变量也是同类型的（无需一一对应）；着色器中的attribute、uniform、varying变量的个数没有超过着色器的上限。

查看是否连接成功可以通过调用gl.getProgramPara-meters()函数来实现，如果连接失败了也可以通过调用gl.getProgramInfoLog从信息日志中获取连接出错信息。

### 7.使用程序对象（gl.useProgram()）

最后就是通过调用gl.useProgram()来告知WebGL系统绘制时使用哪个程序对象

### gl.useProgram(program)

---

| 参数      | 参数取值       |
| ------- | ---------- |
| program | 指定待使用的程序对象 |

所以initShaders()函数的内部流程也是这几步。

### 放弃治疗了放弃治疗了。。。。

## 实例分析

这是CodePen上一个大佬的WebGL粒子效果的例子，瞅了瞅发现好像不是那么复杂，决定好好研究下代码，先上个改巴改巴后的最终效果（jsfiddle效果直接出不来。。。所以换成了codepen）：

<iframe height='307' scrolling='no' title='WebGL_Learning_Day1' src='//codepen.io/todaylg/embed/GOwdWM/?height=307&theme-id=0&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/todaylg/pen/GOwdWM/'>WebGL_Learning_Day1</a> by todaylg (<a href='https://codepen.io/todaylg'>@todaylg</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

代码分析：

首先看到html，其中定义了简单的顶点着色器和片元着色器代码：

顶点着色器：

```JavaScript
attribute vec3 vertexPosition;
uniform mat4 modelViewMatrix;
uniform mat4 perspectiveMatrix;

void main(void) {
    gl_Position = perspectiveMatrix * modelViewMatrix * vec4(  vertexPosition, 1.0);
}
```

片元着色器：

```JavaScript
#ifdef GL_ES
precision highp float;
#endif
void main(void) {
    gl_FragColor = vec4(0.2, 0.3, 0.4, 1.0);
    //gl_FragColor = vec4(0.4, 0.2, 0.3, 1.0);
}
```

顶点着色器程序创建了模型矩阵、投影矩阵、3维顶点坐标，为了统一计算把3维顶点坐标换为了四维参与运算得到最终的位置。片元着色器程序则是直接简单粗暴的写死了粒子的颜色。

转到js：

loadScene()函数相当于做了initSharder()函数的活，完成了程序对象的创建和使用，之后开启混合模式并且对随机变量进行初始化、金字塔投影矩阵的初始化、模型矩阵的初始化。

setup()中初始化的rad代表粒子旋转轨迹圆的半径，theta相当于angle，velTheta相当于变换的幅度（角度变换），freq和boldRate不用管，没有用到，randomPosX/Y是整个屏幕内的随机坐标。

核心方法在draw0/draw1/draw2方法，这几个方法会在一定间隔时间以内循环依次调用。

### draw0：

---

```javascript

function draw0() {

  var i, n = vertices.length, p, bp;
  var px, py;
  var pTheta;
  var rad;
  var num;
  var targetX, targetY;

  for (i = 0; i < numLines * 2; i += 2) {//因为是线，粒子数量乘以2，然后将多复制出来的一份粒子坐标略做偏移，之后相连，效果就出来了？？？？？并不对i+=2才是导致numLines * 2的原因
    count += .3;
    bp = i * 3;

    vertices[bp] = vertices[bp + 3];
    vertices[bp + 1] = vertices[bp + 4];//确保线起始点一致

    num = parseInt(i / 2);
    targetX = randomTargetXArr[num];//init时的随机位置
    targetY = randomTargetYArr[num];


    px = vertices[bp + 3];
    px += (targetX - px) * (Math.random() * .04 + .6);//相较于上一时刻的位置略做偏移
    vertices[bp + 3] = px;//所以虽然是线但是两个点的坐标相差不大。


    //py = (Math.sin(cn) + 1) * .2 * (Math.random() * .5 - .25);
    py = vertices[bp + 4];
    py += (targetY - py) * (Math.random() * .04 + .06);//位置略做偏移
    vertices[bp + 4] = py;

  }
}
```

这里需要注意因为缓冲区里面只存放顶点的坐标信息，而不带大小、透明度等其他信息，所以gl.drawArray的时候要是画点（即第一个参数传入gl.POINTS），那么粒子亮度很低（因为太小了），视觉效果不好。这里采用的办法是画线，而每次绘制时先同步线的起终点，之后对线的终点做微小的位移，draw0/1/2都是如此。

draw0最简单，就是把各个坐标朝最开始全屏随机分配的坐标归位回去，也就是回到分散状态的动画效果。

### draw1

---

```javascript
function draw1() {

  var i, n = vertices.length, p, bp;
  var px, py;
  var pTheta;
  var rad;
  var num;
  var targetX, targetY;

  for (i = 0; i < numLines * 2; i += 2) {
    count += .3;
    bp = i * 3;

    vertices[bp] = vertices[bp + 3];
    vertices[bp + 1] = vertices[bp + 4];

    num = parseInt(i / 2);
    pTheta = thetaArr[num];
    rad = velRadArr[num];

    pTheta += velThetaArr[num];
    thetaArr[num] = pTheta;

    targetX = rad *2* Math.cos(pTheta);
    targetY = rad *2* Math.sin(pTheta);

    px = vertices[bp + 3];
    px += (targetX - px) * (Math.random() * .1 + .1);//朝方向缓动
    vertices[bp + 3] = px;

    //py = (Math.sin(cn) + 1) * .2 * (Math.random() * .5 - .25);
    py = vertices[bp + 4];
    py += (targetY - py) * (Math.random() * .1 + .1);
    vertices[bp + 4] = py;
  }
}
```

draw1则是朝屏幕中心（WebGL的原点）以rad为半径，每次变换velThetaArr角度的圆为轨迹运动。

### draw2

---

```javascript
function draw2() {
  cn += .1;

  var i, n = vertices.length, p, bp;
  var px, py;
  var pTheta;
  var rad;
  var num;

  for (i = 0; i < numLines * 2; i += 2) {
    count += .3;
    bp = i * 3;
    // copy old positions

    vertices[bp] = vertices[bp + 3];
    vertices[bp + 1] = vertices[bp + 4];

    num = parseInt(i / 2);
    pTheta = thetaArr[num];

    rad = velRadArr[num];// + Math.cos(pTheta + i * freqArr[i]) *  boldRateArr[num];

    pTheta += velThetaArr[num];
    thetaArr[num] = pTheta;

    px = vertices[bp + 3];
    px += rad * Math.cos(pTheta) * 0.5;//cos、sin都会有负值
    vertices[bp + 3] = px;


    //py = (Math.sin(cn) + 1) * .2 * (Math.random() * .5 - .25);
    py = vertices[bp + 4];

    py += rad * Math.sin(pTheta) * 0.5;
    //p *= ( Math.random() -.5);
    vertices[bp + 4] = py;
  }
}
```

draw2的角度变化和draw1是一致的，但是粒子旋转的轨迹圆不在是以屏幕中心为统一坐标，而是分散开来了。

最后通过timer和draw：

```javascript

function timer() {
  drawType = (drawType + 1) % 3;

  setTimeout(timer, 1500);
}

function draw() {
  switch (drawType) {
    case 0:
      draw1();
      break;
    case 1:
      draw2();
      break;
    case 2:
      draw0();
      break;
  }
}
```

在三者之间循环依次调用，效果就完成啦。

<iframe height='307' scrolling='no' title='WebGL_Learning_Day1' src='//codepen.io/todaylg/embed/GOwdWM/?height=307&theme-id=0&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/todaylg/pen/GOwdWM/'>WebGL_Learning_Day1</a> by todaylg (<a href='https://codepen.io/todaylg'>@todaylg</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Rewrite (18-08-20)

打算重新再从顶向下学习一下WebGL，主要目的是补齐相关的图形学知识，这主要是我发现了一本相当相当适合缺知识块的同学入坑的好书：**交互式计算机图形学（基于WebGL的自顶向下方法）**，是一本国外的图形学教材，但是基于的是WebGL，很全面的覆盖了图形学的知识点，感觉要是好好怼完这本书，应该是收获蛮大的。

### Sierpinski

<iframe height='357' scrolling='no' title='Sierpinski' src='//codepen.io/todaylg/embed/gjjgXZ/?height=357&theme-id=0&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/todaylg/pen/gjjgXZ/'>Sierpinski</a> by todaylg (<a href='https://codepen.io/todaylg'>@todaylg</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### ParticleLine

<iframe height='400' scrolling='no' title='WebGL\_Learning\_Day1' src='//codepen.io/todaylg/embed/GOwdWM/?height=307&theme-id=0&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/todaylg/pen/GOwdWM/'>WebGL\_Learning\_Day1</a> by todaylg (<a href='https://codepen.io/todaylg'>@todaylg</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>
