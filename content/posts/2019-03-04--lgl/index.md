---
title: "LGL"
category: "LGL"
cover: bg.png
author: todaylg
---

## 前言

转眼间2018年就过去了，自己也结束了通信生涯正式变为了“社畜”。7月份拿到毕业证回到公司后，便是深陷各种业务需求，平时回到寒舍便是早已筋疲力竭，周末再补觉续命+打打游戏，一年下来积累沉淀得相比于学生时代是少之又少，实为惭愧。

游戏戒是不可能戒了，还没经住毒瘤同事和G胖眼神的安利与诱惑，Switch、Steam游戏还买了一堆，成为了又一位海拉鲁大陆观光团成员。。。

虽说多玩点游戏增长下画面渲染的见识总是好的嘛（逃。。）

转行任务是十分艰巨呀。。

最后还是决定即使照是葫芦画瓢也好，学着搂一个自己的渲染器，这样也能算是较为系统的一步步补全相关图形学知识。

老样子，先上瓢：[LGL](https://github.com/todaylg/LGL)（名字就不提了哈哈）

葫芦主要是[ogl](https://github.com/oframe/ogl)和[three.js](https://github.com/mrdoob/three.js)，Three.js自不必多说，已经是Web3D框架的代表了吧。ogl则是一个低抽象级的小型WebGL库，语法直接使用的ES6+，麻雀虽小但是五脏俱全，非常适合用来学习取经，并且正好其还处于beta版本，缺的功能后面也正好直接补上。

## LGL整体结构

分为Core、Math、Extras三个大模块，Core与Math为核心功能，Extras为封装的一些扩展功能。

Core目前包含以下模块：

* Renderer  根据配置创建WebGL Renderer，并控制整个渲染队列的渲染

* Transform  变换物体基类

* Camera  根据配置创建相机，继承Transform

* Program  根据shader及配置输入创建并设置好WebGL的program对象

* Geometry 几何图形基类，根据输入的顶点信息创建几何图元

* Texture  根据配置创建材质对象

* Mesh  对Geometry+Program的多一层封装抽象

* RenderTarget 创建基本的渲染缓冲目标

Math目前包含以下模块：

* Vec2  二维向量

* Vec3  三维向量

* Vec4  四维向量

* Color  色值

* Euler  欧拉角

* Mat3  三维矩阵

* Mat4  四维矩阵

* Quat  四元数

Extras目前包含以下模块：

* Orbit  Camera 轨道控制

* Plane  平面几何体

* Cube  立方体

* Sphere  球体

* Torus  圆环几何体

* [ ] Text  文本

* [ ] Post  后期处理

* [ ] glTFLoader  glTF格式加载器

具体到每个方法的用途的话，已经在文档给出了注释：[Document](http://todaylg.com/LGL/docs/)

这里介绍一波：[jsDoc]([https://github.com/jsdoc3/jsdoc) 养成良好的注释编写习惯，连写文档的功夫都省啦~

下面是对模块中的一些具体计算原理及方法做记录及介绍：

## Math

---

首先从最为独立的Math模块开始，一些基本的数学计算代表的几何意义是需要熟悉和掌握的，这比单纯的记忆公式去死算更有意义：

### 基础知识

#### 向量（Vector）

一组有序实数组，对应空间中一个有方向的长度，一个特定变换的概念性记号（线性变换的物质载体）

`vec3 (a1,a2,a3)`

**线性代数紧紧围绕向量加法与数乘**

#### 张成空间（span）：

所有可以表示为给定向量线性组合的向量的集合，称为给定向量的张成空间。

比如：单个向量张成空间为一条直线，两个向量张成空间为二维平面（不考虑共线），三个向量张成空间为三维空间（不考虑共线共面）。

#### 线性相关：

一个向量可以表示为其他向量的线性组合（即这个向量已经落在其他向量的张成空间中），称它们为线性相关。

或者表述为：有多个向量时，移除其中一个而不减小张成空间，则它们线性相关。

#### 线性无关：

可想而知，如果所有向量都给张成空间带来了新的维度，则它们线性无关

#### 基

向量空间的一组基是张成该空间的一个线性无关向量集

#### 线性变换：

保持网格线平行且等距分布，并且保持原点不动的变换（这两个条件下可以确保变换后的向量与变换后的单位向量是同样的线性组合）。

` v = -1i + 2j`

`Transformed v = -1(Transform i) + 2(Transform j) `

可以知道一个二维线性变换仅仅需要四个数字就可以确定（即变换后单位向量i与j的xy坐标)）

#### 矩阵（Matrix）

而所谓的矩阵，其实就是描述一个对空间进行线性变换的信息

比如二维矩阵(三维同理)，可以理解为变换后单位向量坐标的组合(a,c)i ，(b,d)j

```glsl
mat2 mat = [
    a b
    c d
];
vec2 vec = [x,y];
mat*vec = (x*[a,c],y*[b,d]) = (ax+by,cx+dy)
```

比如逆时针旋转90°的变换，x轴单位向量i的坐标就变成了(0,1)，y轴单位向量j的坐标就变成了(-1,0)，那变换矩阵即为：

```glsl
[
    0 -1
    1  0
]
```

非方阵变换也一样，只不过代表的是不同维度之间的映射：

```glsl
[
  2,0
 -1,1,
 -2,1
]
//这个变换即代表将i变换到（2,-1,-2）,j变换到（0,1,1），从二维空间到三维空间的映射
```

#### 复合变换

矩阵相乘代表着多个线性变换相继作用（需要注意顺序是从右往左）

```glsl
mat2 m1 = [
    a b
    c d
];
mat2 m2 = [
    e f
    g h
];
//最终方向向量i：
(xi,yi) = m1*[e,g] = e[a,c]+g[b,d] = [ae+bg,ce+dg]
//最终方向向量j：
(xj,yj) = m1*[f,h] = f[a,c]+h[b,d] = [af+bh,cg+dh]
//即复合变换矩阵为：
m1*m2 = [
    ae+bg,ce+dg
    af+bh,cg+dh
]
```

#### 行列式（determinant）

线性变换改变面积（三维是体积）的比例，称之为这个变换的行列式

```glsl
//以单位向量的乘积（二维为面积为1的正方形，三维为体积为1的立方体）
det([
    0.0,2.0
    -1.5,1.0
]) = 3.0

det([
 0.5,0.5
 -0.5,0.5
]) = 0.5
//压缩成一条直线时(即将空间压缩到更小的维度时)，行列式为0
det([
 4,2
 2,1
]) = 0
```

变换之后i与j的左右关系若变化，则代表空间发生了翻转（三维及变换后不再符合右手法则），此时符号位为负，行列式也如此。

实际计算的公式为：

```glsl
det([
 a,b
 c,d
]) = ad - bc
//(a,c)为单位向量i变换后xy坐标
//(b,d)为单位向量j变换后xy坐标
//当b与c都为0，变换后为矩形，面积为ad
//当b或c为0，变换后为平行四边形，面积也为ad
//当b与c都不为0时，得回到定义计算来解释：
//(a+b)(c+d)-ac-bd-2bc=ad-bc
//其实就是有坐标矩形减出变换后平行四边形面积，最后得到ad-bc
```

#### 逆变换

即经过变换和逆变换后回到原始状态

```glsl
A*A^-1 = [
    1,0
    0,1
]
```

在解线性方程组时：

```glsl
//det(A)!=0
A*x = v
A^-1*A*x = A^-1*v
x = A^-1*v
```

#### 秩

代表变换后列空间（列即代表基向量变换后的坐标）的维数。可知秩最大与列数相同。

#### 点积

两个维数相同的向量的点积结果为相应坐标配对相乘再相加。

其几何意义为向量w在过零点和向量v直线上的投影，投影长度与向量v的长度相乘。（dot(v,w) = |v||w|cosθ)）

也可以以变换的观点理解，将其中一个向量转换为线性变换矩阵（x与y代表映射到一维数轴上后的单位向量i与j)，一维矩阵与向量相乘的数值运算与两个向量的点积是一致的。（对偶性：一个空间到数轴的线性变换，都能找到一个向量，称为这个变换的对偶向量）

```glsl
dot([1,2],[3,4]]) = 1*3 + 2*4
//点积结果大于0，代表两个向量指向大致相同
//点积结果等于0，代表两个向量互相垂直
//点积结果大于0，代表两个向量指向相反
```

#### 叉积

 向量w于v的叉积结果为垂直于这两个向量所在平面的向量u，u的长度为w于v所张成的平行四边形的面积（二维），方向遵循右手定则。提到面积自然想到上面的行列式，所以计算方法：

```glsl
//二维向量叉积（数值代表面积）
cross(vec2(a,b),vec2(c,d)) = det(mat2[
    a,c
    b,d
]) = ad - bc  //方向垂直于（a,b）、（c,d）所在平面，遵循右手定则
//三维向量叉积（数值代表体积）
cross(vec3(v1,v2,v3),vec3(w1,w2,w3)) = det([
    i,v1,w1
    j,v2,w2
    k,v3,w3
]) = i(v2w3-v3w2)+j(v3w1-v1w3)+k(v1w2-v2w1)
```

#### 基变换

通过矩阵变换(称为基变换矩阵 )完成两组不同基向量（i、j）的映射，逆矩阵则反向转换。

```glsl
//A为基向量变换矩阵，M为变换矩阵
A^-1 * M * A //通常代表在另一坐标系中描述M变换
```

#### 特征向量与特征值

特征向量及在线性变换之后任停留在它张成空间（直线）里的向量，特征值则为衡量特征向量在变换中拉伸或压缩比例的因子。比如三维空间的旋转，其特征向量及为旋转轴（特征值为1，不压缩拉伸）。行列式与特征向量的好处在于其与所选的坐标系无关，并不会改变它们最根本的值

```glsl
A*v = λv //矩阵变换等于特征值与向量相乘（降维情况）
A*v-λΙv = 0 //I为单位矩阵
(A-λΙ)v = 0
det(A-λΙ) = 0
```

#### 齐次坐标

三维表示的点和向量可能会被搞混，齐次坐标可以解决这个问题，其对三维空间中的点和向量的表示都是四维的：

```glsl
vec4 p = [a1,a2,a3,1];//任意点
vec4 w = [b1,b2,b3,0];//任意向量
```

所有的仿射变换（具有保持直线的特性）都可以借助其次坐标表示成矩阵相乘的形式。因为所有的仿射变换都可以用一致的形式来表示，所以在处理级联的情况，会比三维的表示方便得多。

#### 平移

平移变换通过一个位移向量来移动点的位置

```glsl
vec4 p = [x,y,z,1];//初始点  **写按行写，但是意思是列坐标描述点的坐标，左乘
vec4 d = [ax,ay,az,0];//位移向量
vec4 p1 = [x1,y1,z1,1];//位移终点

x1 = x + ax;
y1 = y + ay;
z1 = z + az;

//平移矩阵 T
p1 = T * p; //（行*列）
//其中：
mat4 T = [
    1,0,0,ax,
    0,1,0,ay,
    0,0,1,az,
    0,0,0,1   //用于保持结果为齐次坐标形式
]
```

#### 缩放

```glsl
p1 = S * p;

x1 = x*bx;
y1 = y*by;
z1 = z*bz;

//其中
mat4 S = [
    bx,0,0,0
    0,by,0,0,
    0,0,bz,0,
    0,0,0,1
]
```

#### 旋转

旋转会复杂一些，需要旋转点（不动点）、制定旋转轴方向的一个向量、旋转的角度。

可以参考：[https://blog.csdn.net/csxiaoshui/article/details/65446125](https://blog.csdn.net/csxiaoshui/article/details/65446125)

由简单的条件下一步一步推导至通用的旋转矩阵

```glsl
//1.绕原点的二维旋转
//极坐标公式：
x=rcosϕ
y=rsinϕ
//三角函数正弦余弦公式：
x′=rcos(θ+ϕ)=rcosθcosϕ−rsinθsinϕ
y′=rsin(θ+ϕ)=rsinθcosϕ+rcosθsinϕ
//代入x、y
x′=xcosθ−ysinθ  
y′=xsinθ+ycosθ  
//矩阵表示
[x,y] = R * [x′, y′]
mat2 R = [
    cosθ,−sinθ
    sinθ,cosθ
]
//2.绕任意点的二维旋转
//级联上两次位移矩阵即可（旋转点位移至原点 => 绕原点旋转 => 旋转点移回原位）
v’=T(x,y)*R*T(-x,-y)
//引入三维齐次坐标
mat3 M = [
    1,0,tx,
    0,1,ty,
    0,0,1
] * [
    cosθ,−sinθ,0,
    sinθ,cosθ,0,
    0,0,1
]* [
    1,0,-tx,
    0,1,-ty,
    0,0,1
] = [
    cosθ,−sinθ,,(1−cosθ)tx+ty∗sinθ,
    sinθ,cosθ,(1−cosθ)ty−tx∗sinθ,
    0,0,1
]
//3.三维基本旋转
//引入四维齐次坐标
//绕X轴的旋转：
x′=x
y′=ycosθ−zsinθ
z′=ysinθ+zcosθ
//矩阵表示
mat4 Mx = [
    1,0,0,0,
    0,cosθ,−sinθ,0,
    0,sinθ,cosθ,0,
    0,0,0,1
]
//同理可求得绕Y轴旋转的矩阵My，绕Z轴旋转的矩阵Mz
//任何旋转点在原点的旋转矩阵都可以表示成Mx、My、Mz三个旋转矩阵的级联
//可以将任意旋转轴旋转到与X/Y/Z某一轴重合，执行基本旋转，之后再执行反向旋转恢复旋转轴方向
```

#### 错切

错切（shear）由角度θ来表征，比如x错切：

```glsl
x1 = x + y*cot(θ);
y1 = y;
z1 = z;

//错切矩阵
mat4 Hx = [
    1,cot(θ),0,0,
    0,1,0,0,
    0,0,1,0,
    0,0,0,1
]
```

#### 欧拉角

欧拉角是通过制定三个与旋转轴相关的角度以表示任意方向的方法。zX顺规：

* 物体绕全局的 z 轴旋转角 α

* 继续绕自己的 X 轴旋转角 β

* 最后绕自己的 Z 轴旋转角 γ

万向节死锁（Gimbal Lock）：

[https://zh.wikipedia.org/wiki/%E7%92%B0%E6%9E%B6%E9%8E%96%E5%AE%9A](https://zh.wikipedia.org/wiki/%E7%92%B0%E6%9E%B6%E9%8E%96%E5%AE%9A)

角度为±90°的第二次旋转使得第一次和第三次旋转的旋转轴相同的现象（丧失了一个自由度），称作万向锁。

[https://www.youtube.com/watch?v=rsKy-4dbA04](https://www.youtube.com/watch?v=rsKy-4dbA04)

[https://www.matongxue.com/madocs/442.html](https://www.matongxue.com/madocs/442.html)

附：飞行器旋转的专业的术语

* 偏航（Yaw），围绕机头上方轴旋转（左右摇头）

* 俯仰（Pitch），围绕机身右方轴旋转（上下点头）

* 桶滚（Roll），围绕机头前方轴旋转（左右摆头）

#### 四元数

对二维的情形，通常会使用复数来表示旋转的变换：

```glsl
//欧拉公式（i^2 = -1）
e^iθ = cosθ + isinθ
//复数c的极坐标可以写成 (r^2 = a^2 + b^2)
c = a + ib = re^(iθ)
//设旋转角度为φ
c′ = re^i(θ+φ)  = re^(iθ)e^(iφ) //e^(iφ)即为复平面的一个旋转算子
```

对于三维的情况，确定一个以原点为旋转点（不是的话可以级联位移矩阵）的三维旋转，需要指定一个旋转方向（向量）和旋转角度（标量），使用一种即包含向量又包含标量的表示，称为四元数形式：

```glsl
vec4 a = (q0,q1,q2,q3) = (q0, q); //q为三维向量
```

具体介绍可参考：

[https://www.zhihu.com/question/23005815/answer/33971127](https://www.zhihu.com/question/23005815/answer/33971127)

[https://zh.wikipedia.org/wiki/%E5%9B%9B%E5%85%83%E6%95%B8](https://zh.wikipedia.org/wiki/%E5%9B%9B%E5%85%83%E6%95%B8)

#### 色值换算

**HEX <=> RGB**

Hex转RGB其实就是十六进制与十进制之间的转换，核心为 `parseInt("FF", 16)`

```javascript
const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
this.r = r ? parseInt(r[1], 16) / 255 : 0;

this.g = r ? parseInt(r[2], 16) / 255 : 0;

this.b = r ? parseInt(r[3], 16) / 255 : 0;
```

RGB转Hex即十进制转十六进制，核心为`Number(255).toString(16);`

```javascript
let hex = Number(rgbArr[index]).toString(16);
```

**RGB <=> HSL/HSV**

H指Hue(色调)。 0(或360)表示红色，120表示绿色，240表示蓝色，当然可取其他数值来确定其它颜色；  
S指Saturation(饱和度)。 取值为0%到100%之间的值；  
L指Lightness(亮度)。 取值为0%到100%之间的值；

参考换算公式：[https://en.wikipedia.org/wiki/HSL_and_HSV](https://en.wikipedia.org/wiki/HSL_and_HSV)

**CSS颜色关键字**

至于CSS颜色关键字的转换，可以像Three.js直接粗暴的罗列其与Hex格式的对应关系：

```javascript
var ColorKeywords = { 'aliceblue': 0xF0F8FF, 'antiquewhite': 0xFAEBD7, 'aqua': 0x00FFFF, 'aquamarine': 0x7FFFD4, 'azure': 0xF0FFFF ......};
```

或者借助DOM特性读取色值：

```javascript
var div = document.createElement('div');
div.style.backgroundColor = color;

document.body.appendChild(div);

var c = window.getComputedStyle(createDiv).backgroundColor;    

document.body.removeChild(div);
```

之后再对读取出的字符串进行格式转化。

## 模块划分

Math模块基于 [gl-Matrix](https://github.com/toji/gl-matrix) (column-major format)进行封装，对外暴露向量（Vec2、Vec3、Vec4）、矩阵（Mat3、Mat4）、欧拉角（Euler）、四元数（Quat）的一些基本运算方法。

没啥好说的，具体到每个方法的计算方法可以直接查看文档。

## Core

---

Core模块依赖Math模块，对WebGL API进行了封装和抽象。

对外暴露的API与Three.js有一些类似的地方，最大的区别在于Core部分不提供默认和可选的材质，即完全分离开了Shader部分。

这样做的好处显而易见，Core只用专注于控制物体的渲染队列即可，而不用耦合进各式各样的Shader片段。弊端也同样显而易见，需要自己为每个场景编写全部Shader，使用成本无疑高了很多。

### Transform

Thansform相当于Three.js中的Object3D，是在场景中具体显示物体的基类，包含了基本的比如位置(Position)旋转(Rotate)缩放(Scale)等信息，提供了父子(Child/Parent)关系的抽象。

渲染框架基本都会提供父子对象的抽象，这样的好处是啥呢？

要到Renderer的遍历才够详细

### Camera

确定相机的定位的计算需要得到

* VRP（Voew-Reference Point，观察参考点）

* VPN（View-Plane Normal，观察平面法向量）

* VUP（View-Up Vector，观察正向向量）

**LookAt**

相机的位置称为视点（eye point），相机的方向指向一个点称为参考点（at point），这两个点确定了VPN和VRP。VRP自然就是视点，VPN则是视点和参考点相减再归一化即可得到。最后我们只需要再对照相机指定想要观察的正向（VUP）就OK了，所以lookAt函数一般暴露的API为：

```javascript
 /**
  * @function

  * @description  Generates a matrix that makes something look at something else.

  * @param {vec3} eye Position of the viewer

  * @param {vec3} target Point the viewer is looking at

  * @param {vec3} up vec3 pointing up

  * @returns {Mat4} 

*/
lookAt(eye, target, up) {

   ...
}
```

具体是如何计算的呢？

首先明确Camera矩阵（View矩阵）的作用，是将世界坐标系中的物体的顶点坐标转换到摄像机坐标系。

转换步骤：

* 整体平移，将相机视点平移至世界坐标系原点

* 将参考点从世界坐标系转换至相机坐标系

即：`ViewMatrix = R * T`

1.首先求UVW：

首先W即为视线方向，normalize(target-eye)即可

V则可以通过叉乘up和W得到

U自然就是叉乘W和V即可

就可以求得坐标系矩阵：

```glsl
mat4 R = [
    ux,uy,uz,0,
    vx,vy,vz,0,
    wx,wy,wz,0,
    0,0,0,1
]
//由eye可得平移矩阵
mat4 T= [
    1,0,0,-eyeX,
    0,1,0,-eyeY,
    0,0,1,-eyeZ,
    0,0,0,1
]
//最后的结果：
mat4 viewMatrix = R * T = [
    ux,uy,uz,-(u0 * eyex + u1 * eyey + u2 * eyez),
    vx,vy,vz,-(v0 * eyex + v1 * eyey + v2 * eyez),
    wx,wy,wz,-(w0 * eyex + w1 * eyey + w2 * eyez),
    0,0,0,1
]
```

**正交(orthographic)投影**

```javascript
/**
 * Generates a orthogonal projection matrix with the given bounds
 * @private
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
function ortho(out, left, right, bottom, top, near, far) {
    ...
}
```

在WebGL中，默认的投影变换矩阵是单位矩阵（视见体是规范的立方体）。显然，为了得到一般的正交投影变换矩阵，我们只需找到将暴露出去ortho函数所指定的长方体映射成这个立方体的变换矩阵即可。

实施步骤：

* 通过平移把指定视见体的中心移动到规范视见体的中心（原点）

* 缩放指定视见体使得每条边的长度都为2（+1 - -1）

前面说的位移矩阵还有缩放矩阵就派上用场啦：

```glsl
//位移矩阵
mat4 T = [
 1,0,0,-(r+l)/2,
 0,1,0,-(t+b)/2,
 0,0,1,-(f+n)/2,
 0,0,0,1
]
//缩放矩阵
mat4 S = [
 2/(r-l),0,0,0,
 0,2/(t-b),0,0,
 0,0,2/(n-f),0,
 0,0,0,1
]
//正交变换矩阵即为：
mat4 N = S * T = [
 2/(r-l),0,0,-(r+l)/(r-l),
 0,2/(t-b),0,-(t+b)/(t-b),
 0,0,-2/(f-n),-(f+n)/(f-n),
 0,0,0,1
]
//如果视见体是对称的(r = -l, t = -b)，还可以进一步简化矩阵
mat4 N = [
 1/r,0,0,0
 0,1/t,0,0,
 0,0,-2/(f-n),-(f+n)/(f-n),
 0,0,0,1
]
```

**透视(perspective)投影**

```javascript
/**
 * Generates a perspective projection matrix with the given bounds
 * @private
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
export function perspective(out, fovy, aspect, near, far) {
    ...
}
```

同样的思路，为了得到WebGL中(frustum)可以使用的透视投影变换矩阵，我们先将指定的棱台视见体变换为规范视见体：

* 通过错切变换矩阵H

* 缩放变换矩阵S

* 投影规范化矩阵N

通过错切变换矩阵H的目的是将不对称的棱台转化为对称的棱台：

`H = H(arccot((l+r)/-2*near,arccot((t+b)/-2*near))`

缩放矩阵：

`S = S(-2*near/(r-l), -2*near/(t-b), 1)`

投影规范化矩阵:

```java
N = [
    1,0,0,0,
    0,1,0,0,
    0,0,a,b,
    0,0,-1,0
]
```

三者级联即可得到最后的投影变换矩阵

```glsl
P = N*S*H = [
    -2n/(r-l),0,(r+l)/(r-l),0,
    0,-2n/(t-b),(t+b)/(t-b),0,
    0,0,-(f+n)/(f-n),2fn/f-n,
    0,0,-1,0
]
//如果视见体是对称的(r = -l, t = -b)，还可以进一步简化矩阵
P = [
 n/r,0,0,0,
 0,n/t,0,0,
 0,0,-(f+n)/(f-n),2fn/f-n,
 0,0,-1,0
]
```

推导过程还可参考：

[http://www.360doc.com/content/14/1028/10/19175681_420522154.shtml](http://www.360doc.com/content/14/1028/10/19175681_420522154.shtml)

### Renderer

因为没有任何内置材质，这里Renderer只负责管理渲染队列及根据配置项初始化gl上下文。

优先获取WebGL2的gl绘图上下文，若不支持WebGL2.0则尝试加载相关[扩展](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Using_Extensions)：

* [OES_texture_float](https://developer.mozilla.org/en-US/docs/Web/API/OES_texture_float)：纹素坐标支持浮点类型

* [OES_texture_float_linear](https://developer.mozilla.org/en-US/docs/Web/API/OES_texture_float_linear)：纹理过滤支持浮点类型的线性过滤

* [OES_texture_half_float](https://developer.mozilla.org/en-US/docs/Web/API/OES_texture_half_float)：纹素坐标支持16位（32/2）浮点类型数据

* [OES_element_index_uint](https://developer.mozilla.org/en-US/docs/Web/API/OES_element_index_uint)：渲染图元(`gl.drawElements`)的数据支持无符号整型

* [OES_standard_derivatives](https://developer.mozilla.org/en-US/docs/Web/API/OES_standard_derivatives)：在GLSL中添加方法：`dFdx`,`dFdy`和`fwidth`

* [EXT_sRGB](https://developer.mozilla.org/en-US/docs/Web/API/EXT_sRGB)：纹理及帧缓存支持[sRGB](https://baike.baidu.com/item/sRGB/1350619?fr=aladdin)颜色格式

* [WEBGL_depth_texture](https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_depth_texture)：定义2D深度和深度模板纹理 //Todo

* [ANGLE_instanced_arrays](https://developer.mozilla.org/en-US/docs/Web/API/ANGLE_instanced_arrays)：使用实例化渲染绘制多个相似物体

* [OES_vertex_array_object](https://developer.mozilla.org/en-US/docs/Web/API/OES_vertex_array_object)：支持VAO

[深度缓冲与画家算法](http://johnnymao.com/2016/03/07/GC/)

总而言之：画家算法是按照物体（多边形）的深度进行排序，而Z-buffer算法是按照图像每一个像素进行排序。

渲染队列绘制的顺序：

* 1.先绘制所有不透明的物体。

* 2.对所有透明的物体排序。

* 3.按物体的z值排序绘制所有透明的物体。

drawCall中再更新scene及camera的矩阵信息

### Program

Program负责绑定并更新传入的uniform变量、创建及编译程序对象。

### Geometry

Geometry负责绑定及更新传入的attribute变量、创建基本的几何对象、计算几何体的边界数据。

绘制多个物体时可开启[实例化](https://learnopengl-cn.github.io/04%20Advanced%20OpenGL/10%20Instancing/)

### Texture

Texture根据传入配置创建对应的材质对象。

对应参数可参考：[https://learnopengl-cn.github.io/01%20Getting%20started/06%20Textures/](https://learnopengl-cn.github.io/01%20Getting%20started/06%20Textures/)

### Mesh

Mesh是对Program和Geometry添加的一层封装，每次drawCall时将Camera的矩阵数据同步至Program的uniform中，最后再调用Geometry的draw方法同步attribute变量并完成绘制。

### RenderTarget

RenderTarget对[帧缓存对象(Framebuffers)](https://learnopengl-cn.github.io/04%20Advanced%20OpenGL/05%20Framebuffers/) 的创建进行了封装

## Extras

---

### Orbit

Orbit通过监听Web中的鼠标几个事件动态变化Camera的轨道位置：

**contextmenu**

直接屏蔽原生的右键点击事件：`e.preventDefault();`

**mousedown**

需要实现：

* 左键点击按住控制旋转

* 中键点击按住控制推拉

* 右键点击按住控制位移

在触发mousedown事件时记录鼠标此时的在屏幕中的位置（clientX/Y），并开始监听mousemove和mouseup事件，分别用于处理具体的相机轨道位置变化和结束后删除mousemove和mouseup的事件监听。

那最核心的计算是如何实现的呢？

[球坐标系-wiki](https://zh.wikipedia.org/wiki/%E7%90%83%E5%BA%A7%E6%A8%99%E7%B3%BB)

假设P（x，y，z）为空间内一点，则点P也可用这样三个有次序的数(r，θ，φ)来确定，其中：

* r为原点O与点P间的距离（radius）

* φ为有向线段OP与z轴正向的夹角（phi）

* θ为从正z轴来看自x轴按逆时针方向转到OM所转过的角，M为点P在xOy面上的投影（theta）

`Tips1：需要注意我们的世界坐标y轴是朝上的，而非百科里z轴是朝上的。`

`Tips2：φ与θ的符号标记在数学中与物理中正好相反（可见wiki）`

直角坐标系与球坐标系的转换即为(画个图加上基本的三角函数即可得)：

```javascript
radius = Math.sqrt(x * x + y * y + z * z);
theta = Math.atan2(x, z);
phi =  Math.acos(Math.min(Math.max(y / radius, -1), 1));
```

Tips: [atan2](https://zh.wikipedia.org/wiki/Atan2)

所以可以知道：

* X轴的旋转即为theta的变化

* Y轴的旋转即为phi的变化

* Z轴的推拉即为radius的变化

具体的实现代码：

```javascript
/**
* Handle left click + mouse move event => 旋转

*/

handleMoveRotate(x, y) {

    tempVec2a.set(x, y);

    tempVec2b.sub(tempVec2a, rotateStart).multiply(this.rotateSpeed); //计算变化向量

    let el = this.element === document ? document.body : this.element;

    this.sphericalDelta.theta -= 2 * Math.PI * tempVec2b.x / el.clientHeight; //换算成变换的弧度

    this.sphericalDelta.phi -= 2 * Math.PI * tempVec2b.y / el.clientHeight;

    rotateStart.copy(tempVec2a); //重置变换点

}


/**

* Handle midlle click + mouse move event => 推拉

*/

handleMouseMoveDolly(e) {

    tempVec2a.set(e.clientX, e.clientY);

    tempVec2b.sub(tempVec2a, dollyStart);

    if (tempVec2b.y > 0) { // Up scroll

        this.dolly(getZoomScale(this.zoomSpeed));

    } else if (tempVec2b.y < 0) { // Dwon scroll

        this.dolly(1 / getZoomScale(this.zoomSpeed));

    }

    dollyStart.copy(tempVec2a);

}

dolly(dollyScale) {
    this.sphericalDelta.radius /= dollyScale; //变换radius

}
```

**wheel**

中键的滚轮控制放大/缩小也就是变化radius，只不过添加了一个速度因子

```javascript
/**
* Handle mourse wheel event

*/

onMouseWheel(e) {

    const { enabled, enableZoom, state } = this;

    if (!enabled || !enableZoom || (state !== STATE.NONE && state !== STATE.ROTATE)) return;

    e.preventDefault();

    e.stopPropagation();


    if (e.deltaY < 0) {

        this.dolly(1 / getZoomScale(this.zoomSpeed));

    } else if (e.deltaY > 0) {

        this.dolly(getZoomScale(this.zoomSpeed));

    }

}
```

唯一不同的是右键的位移效果：

```javascript
/**
* Handle right click + mouse move event

*/

handleMovePan(x, y) {

    tempVec2a.set(x, y);

    tempVec2b.sub(tempVec2a, panStart).multiply(this.panSpeed); //计算变化向量

    this.pan(tempVec2b.x, tempVec2b.y);

    panStart.copy(tempVec2a);

}

pan(deltaX, deltaY) {

    let { element, camera } = this;

    let el = element === document ? document.body : element;
    // perspective

    tempVec3.copy(camera.position).sub(this.target);

    let targetDistance = tempVec3.distance();
    // half of the fov is center to top of screen

    targetDistance *= Math.tan(((camera.fov || 45) / 2) * Math.PI / 180.0); //投影高度

    // we use only clientHeight here so aspect ratio does not distort speed
    this.panLeft(deltaX * 2 * targetDistance / el.clientHeight, camera.matrix); //高度比值

    this.panUp(deltaY * 2 * targetDistance / el.clientHeight, camera.matrix);

};

panLeft(distance, m) {

    tempVec3.set(m[0], m[1], m[2]);//X

    tempVec3.multiply(-distance);

    this.panDelta.add(tempVec3);

}

panUp(distance, m) {

    tempVec3.set(m[4], m[5], m[6]);//Y

    tempVec3.multiply(distance);

    this.panDelta.add(tempVec3);

}
```

移动端对`touchstart/touchend/touchmove`事件的处理方法也是同理，就不再赘述了。



### Base Primitives

**Plane**

根据传入参数决定面几何体横向与纵向组成块数，然后计算顶点的position、normal、uv、index信息：

```javascript
static buildPlane(position, normal, uv, index, width, height, depth = 0, wSegs, hSegs,

        u = 0, v = 1, w = 2,
        uDir = 1, vDir = -1,
        i = 0, ii = 0
    ) {
        const io = i;
        const segW = width / wSegs;
        const segH = height / hSegs;

        for (let iy = 0; iy <= hSegs; iy++) {
            let y = iy * segH - height / 2; //y = [-h/2,h/2]
            for (let ix = 0; ix <= wSegs; ix++) {
                let x = ix * segW - width / 2; //x = [-w/2,w/2]

                position[i * 3 + u] = x * uDir;
                position[i * 3 + v] = y * vDir; // eg:leftTopfirPos = [-w/2,h/2]
                position[i * 3 + w] = depth / 2;

                normal[i * 3 + u] = 0;
                normal[i * 3 + v] = 0;
                normal[i * 3 + w] = depth >= 0 ? 1 : -1;

                uv[i * 2] = ix / wSegs;
                uv[i * 2 + 1] = 1 - iy / hSegs;

                i++;

                if (iy === hSegs || ix === wSegs) continue;

                //indices(two triangle)
                let indicesWSegs = (wSegs + 1);
                let a = io + ix + iy * indicesWSegs; //iy * indicesWSegs => a rows
                let b = io + ix + (iy + 1) * indicesWSegs;
                let c = io + (ix + 1) + (iy + 1) * indicesWSegs;
                let d = io + (ix + 1) + iy * indicesWSegs;

                index[ii * 6] = a;
                index[ii * 6 + 1] = b;
                index[ii * 6 + 2] = d;

                index[ii * 6 + 3] = b;
                index[ii * 6 + 4] = c;
                index[ii * 6 + 5] = d;

                ii++;
            }
        }
    }
```

**Cube**

Cube则是直接拼合六块Plane即可：

```javascript
 // left, right
 Plane.buildPlane(position, normal, uv, index, depth, height, width, dSegs, hSegs, 2, 1, 0, -1, -1, i, ii); //ZYX

Plane.buildPlane(position, normal, uv, index, depth, height, -width, dSegs, hSegs, 2, 1, 0, 1, -1, i += (dSegs + 1) * (hSegs + 1), ii += dSegs * hSegs);


// top, bottom

Plane.buildPlane(position, normal, uv, index, width, depth, height, dSegs, hSegs, 0, 2, 1, 1, 1, i += (dSegs + 1) * (hSegs + 1), ii += dSegs * hSegs); //XZY

Plane.buildPlane(position, normal, uv, index, width, depth, -height, dSegs, hSegs, 0, 2, 1, 1, -1, i += (wSegs + 1) * (dSegs + 1), ii += wSegs * dSegs);


// front, back

Plane.buildPlane(position, normal, uv, index, width, height, -depth, wSegs, hSegs, 0, 1, 2, -1, -1, i += (wSegs + 1) * (dSegs + 1), ii += wSegs * dSegs); //XYZ

Plane.buildPlane(position, normal, uv, index, width, height, depth, wSegs, hSegs, 0, 1, 2, 1, -1, i += (wSegs + 1) * (hSegs + 1), ii += wSegs * hSegs);

```

**Sphere**

Sphere根据φ（phi）与θ（theta）的数值及横向与纵向组成块数计算坐标：

```javascript
//画个图+三角函数
let x = -radius * Math.sin(tStart + v * tLength) * Math.cos(pStart + u * pLength);
let y = radius * Math.cos(tStart + v * tLength);

let z = radius * Math.sin(tStart + v * tLength) * Math.sin(pStart + u * pLength);
```

ToAdd:

- [ ] Text：字体渲染的方法

- [ ] Post：后期处理

- [ ] glTFLoader：这个单拆一篇文章
