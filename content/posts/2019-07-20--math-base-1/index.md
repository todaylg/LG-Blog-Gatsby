---
title: 《Mathematics for 3D Game Programming and Computer Graphics》读书笔记 (上)
category: "读书流水"
cover: bg.jpg
author: todaylg

---

学习的过程中深感自己的地基不够牢固，决定补习巩固一波基础知识。

这本书涵盖了图形学相关的各方面数学知识，希望通过阅读这本书籍能补回丢掉的数学知识，也可以提高自己英语书籍的~~疯狂查词典~~阅读能力。

本着实践为主的目的，尽量能实践的就搂个Example，慢慢整吧～

公式编辑使用[LateX](https://blog.csdn.net/qingdujun/article/details/80805613)，在线预览可在[这里](https://www.codecogs.com/latex/eqneditor.php?lang=zh-cn)，养成好习惯从现在开始，强烈推荐。

## Chapter 1：渲染管线

首先复习一波最重要的渲染管线（From：RTR4）：

定义：给定虚拟摄像机、三维物体、光源等的条件下，生成或者渲染出一幅二维图像的过程。

阶段划分：

* 应用程序阶段(Application) ：开发者能够完全控制的阶段，通常在此阶段实现视椎体裁剪、碰撞检测、输入检测、加速算法、动画等。

* 几何处理阶段(Geometry Processing)

* * 顶点处理（不同坐标系的转换）

  * 图元装配（顶点组成图元）

  * 裁剪（对图元进行视体裁剪，舍弃无法成像的图元）

* 光栅化阶段(Rasterization)：由图元输出片元，三维顶点转二维像素

* * 三角形设定阶段(Triangle Setup)：计算三角形表面到差异和三角形表面到其他相关数据

  * 三角形遍历阶段(Triangle Traversal)：进行逐像素检查操作，找到哪些采样点或者像素位于三角形中到过程

* 像素处理阶段(Pixel Processing)

* * 像素着色(Pixel Shading)：所有逐像素的着色计算都在像素着色阶段进行

  * 融合阶段(Merging)：合成当前缓冲区中由之前的像素着色阶段产生的信息（颜色/深度/Alpha/模板/帧缓存）

### 图形处理

OpenGL支持绘制的图元有10种：

* Points

* Lines、Line Strip、Line Loop

* Triangles、Triangle Strip、Triangle Fan

* Quads、Quad Strip、Polygon

WebGL只支持其中的7种图元（除开Quads、Quad Strip、Polygon）

**CPU与GPU间的通信：**

CPU => App（Rendering Commands） => OpenGL/DX => Graphics Driver （Command Buffer）=> GPU

**CPU内存与GPU内存的通信**

CPU内存 => Vertex/Texture Data、Shader Parameters => GPU内存 VRAM(Video Random Access Memory)，存储例如Image Buffer、Depth/Stencil Buffer、Texture Maps、Vertex Buffers等数据，并支持front/back buffer swap

### 顶点变换

坐标空间：

* 局部空间(Local Space/Object Space)：局部坐标是对象相对于局部原点的坐标

* 世界空间(World Space)：世界空间坐标相对于世界的全局原点

* 观察空间(View Space/Eye Space)：使每个坐标都是从摄像机角度进行观察得到的

* 裁剪空间(Clip Space)：裁剪坐标会被处理至-1.0到1.0的范围内，并判断哪些顶点将会出现在屏幕上

* 屏幕空间(Window Space/Screen Space)：视口变换将位于-1.0到1.0范围的坐标变换到由glViewport函数所定义的坐标范围内

坐标变换：

* 模型(Model)矩阵：局部空间=>世界空间

* 观察(View)矩阵：世界空间=>观察空间

* 投影(Projection)矩阵：观察空间=>裁剪空间

MVP矩阵将Object Space转为齐次的Clip Space之后，最后经过视口变换（Viewport transform）最终转到 Window Space：

* 齐次的Clip Space中顶点需转换为NDC(Normalized Device Coordinates) 即x、y、z =>  [-1,1]

* 最终的viewPort Transform将规范化坐标映射到视图所覆盖的像素坐标实际范围，z坐标映射到浮点范围 => [0,1]

### 片元计算

片元集合了经过GPU计算的深度信息、插值后的顶点信息、插值后的UV坐标信息、像素本身的位置信息。

Face Culling =>  Rasterization => Fragment Shading => Fragment Operations

**Fragment Operations：**

* 像素所有权测试（pixel ownership test）：像素所有权测试只是确定片元是否位于当前可见的viewport区域内，比如其他窗口挡住了当前viewPort的一部分的情况，此测试不可diable

* 裁剪测试（scissor test）：应用程序可以在视图端口中指定一个矩形，称为剪切矩形，任何落在剪切矩形外的碎片都将被丢弃。

* 透明度测试（alpha test）：alpha测试将片段的最终alpha值与应用程序预先设置的常量值进行比较

* 模板测试（stencil test）：根据模板缓冲的值决定是否通过

* 深度测试（depth test）：比对当前片元的深度值与深度缓冲中的深度值

* 混合（Blending）：当所有的测试通过后，片元的最终颜色经过混合（Blending）最终输出到 Image Buffer。Blending操作会通过结合当前片元的最终颜色和片段所在位置的图像缓冲区中已经存储的颜色来计算新的颜色（可以实现透明度效果之类的效果），Alpha值也是如此。

## Chapter 2：向量

### 点乘

**点乘公式：**

![image](https://latex.codecogs.com/gif.latex?P%20%5Ccdot%20Q%20%3D%20%5Csum_%7Bi%3D1%7D%5E%7Bn%7DP_%7Bi%7DQ_%7Bi%7D)

![image](https://latex.codecogs.com/gif.latex?P%20%5Ccdot%20Q%20%3D%20%7CP%7C%7CQ%7Ccos%28%5Calpha%29)

**证明过程：**

由三角函数公式：

![image](https://latex.codecogs.com/gif.latex?c%5E2%20%3D%20a%5E2+b%5E2-2abcos%28%5Calpha%29)

可得：

![image](https://latex.codecogs.com/gif.latex?%7CP%20-%20Q%20%7C%5E%7B2%7D%3D%20%5Cleft%20%7C%20P%20%5Cright%20%7C%5E%7B2%7D+%5Cleft%20%7C%20Q%20%5Cright%20%7C%5E%7B2%7D-2%5Cleft%20%7C%20P%20%5Cright%20%7C%5Cleft%20%7C%20Q%20%5Cright%20%7Ccos%5Cleft%20%5B%20%5Calpha%20%5Cright%20%5D)

化简即可得。

**常用作用：**

1.点乘结果正负表示两个向量的相对方向

* PQ = 0 : 二者互相垂直

* PQ > 0 : 二者同向

* PQ > 0 : 二者反向

2.点乘结果表明两个向量角度的接近程度 （即cos(a)的大小）

**向量投影**

P在Q上的投影(projection)向量：

![image](https://latex.codecogs.com/gif.latex?%7Bproj_%7BQ%7D%7D%5E%7BP%7D%3D%20%5Cfrac%7BP%20%5Ccdot%20Q%7D%7B%7CQ%7C%7D%5Ctimes%20%5Cfrac%20%7BQ%7D%7B%7CQ%7C%7D%20%3D%5Cfrac%7BP%20%5Ccdot%20Q%7D%7B%7CQ%7C%5E2%7DQ)

其中Q/|Q|代表Q向量的单位长度。

向量相减可得垂线(perpendicular)向量：

![image](https://latex.codecogs.com/gif.latex?%7Bperp_%7BQ%7D%7D%5E%7BP%7D%3D%20P%20-%20%7Bproj_%7BQ%7D%7D%5E%7BP%7D%20%3DP-%5Cfrac%7BP%20%5Ccdot%20Q%7D%7B%7CQ%7C%5E2%7DQ)

### 叉乘

叉乘公式：

![image](https://latex.codecogs.com/gif.latex?P%5Ctimes%20Q%20%3D%20%5Clangle%20P_%7By%7DQ_%7Bz%7D-P_%7Bz%7DQ_%7By%7D%2C%20P_%7Bz%7DQ_%7Bx%7D-P_%7Bx%7DQ_%7Bz%7D%2C%20P_%7Bx%7DQ_%7By%7D-P_%7By%7DQ_%7Bx%7D%20%5Crangle)

![image](https://latex.codecogs.com/gif.latex?P%20%5Ctimes%20Q%20%3D%20%7CP%7C%7CQ%7Csin%28%5Calpha%29)

也可写作：

![image](https://latex.codecogs.com/gif.latex?P%5Ctimes%20Q%20%3D%20%5Cbegin%7Bbmatrix%7D%200%20%26-P_%7Bz%7D%20%26P_%7By%7D%20%5C%5C%20P_%7Bz%7D%20%260%20%26-P_%7Bx%7D%20%5C%5C%20-P_%7By%7D%20%26P_%7Bx%7D%20%26%200%20%5Cend%7Bbmatrix%7D%5Cbegin%7Bbmatrix%7D%20Q_%7Bx%7D%5C%5C%20Q_%7By%7D%5C%5C%20Q_%7Bz%7D%20%5Cend%7Bbmatrix%7D)

或伪行列式（好记）：

![image](https://latex.codecogs.com/gif.latex?P%5Ctimes%20Q%20%3D%20%5Cbegin%7Bvmatrix%7D%20i%20%26j%20%26k%20%5C%5C%20P_%7Bx%7D%20%26P_%7By%7D%20%26P_%7Bz%7D%20%5C%5C%20Q_%7Bx%7D%20%26Q_%7By%7D%20%26%20Q_%7Bz%7D%20%5Cend%7Bvmatrix%7D)

其中i=(1,0,0)、j=(0,1,0)、k=(0,0,1)

**常用作用：**

叉乘返回垂直于两个向量的新向量，常用与求解表面法线。

### 向量空间

[施密特正交化](https://www.zhihu.com/question/60689540)（实践中暂未发现要用到施密特正交化的地方。。）

## Chapter 3：矩阵

**矩阵相乘：**

![image](https://latex.codecogs.com/gif.latex?%28FG%29_%7Bij%7D%20%3D%20%5Csum_%7Bk%3D1%7D%5E%7Bm%7DF_%7Bik%7DG_%7Bkj%7D)

* 列行：左列=右行为相乘前提条件

* 行列：左i行 * 右j列 = Cij

**最简形矩阵条件：**

* 对于每一个非零行，最左边的非零项（前导项）为 1

* 无零行在有零行之前

* 前导项所在的列上不再有其他的非零项

* 任意一对非零行i1，i2（i2>i1）对应的包含其前导项的列j1，j2需要满足j2>j1（即列位置在右方）

**初等行变换：**

* 交换矩阵的某两行

* 矩阵的某一行乘以非零数

* 将矩阵的某一行的倍数加到另一行

**初等变换化简矩阵步骤**

* A.将第一列中最大数值（绝对值）的行交换至第一行

* B.将第一行的先导项化为1（乘系数）

* C.通过相乘相加第一列的方法将其他行的首个元素化为0

* D.继续将第二行的先导项化为1

* F.通过相乘相加第二列的方法将其他行的第二个元素化为0（包括第一行）

* G.如此循环

**求逆矩阵：**

前提：含有全零行的矩阵不可逆

* A.构造分块矩阵（A|E），E为单位阵 

* B.对矩阵（A|E）实施初等行变换，将其化为行最简形矩阵（即A=>E）

* C.如果A不能行等价于E，则A不可逆。若A能行等价于E，则A可逆，且E就行等价于A^-1 

**行列式**

计算公式：

![image](https://latex.codecogs.com/gif.latex?detM%20%3D%20%5Csum_%7Bi%3D1%7D%5E%7Bn%7DM_%7Bik%7DC_%7Bik%7D%28M%29)

其中：

![image](https://latex.codecogs.com/gif.latex?C_%7Bij%7D%28M%29%20%3D%20%28-1%29%5E%7Bi+j%7DdetM%5E%7B%5C%7Bi%2Cj%5C%7D%7D)

M^{i,j}表示从矩阵M中去掉第i行和第j列后的矩阵。

上面两个式子递归即可求得结果，比如2x2矩阵：

![image](https://latex.codecogs.com/gif.latex?%5Cbegin%7Bvmatrix%7D%20a%20%26b%20%5C%5C%20c%20%26d%20%5Cend%7Bvmatrix%7D%20%3D%20ad-bc
)

3x3矩阵：

![image](https://latex.codecogs.com/gif.latex?%5Cbegin%7Bvmatrix%7D%20a_%7B11%7D%20%26a_%7B12%7D%20%26a_%7B13%7D%20%5C%5C%20a_%7B21%7D%20%26a_%7B22%7D%20%26a_%7B23%7D%20%5C%5C%20a_%7B31%7D%20%26a_%7B32%7D%20%26a_%7B33%7D%20%5C%5C%20%5Cend%7Bvmatrix%7D%20%3D%20a_%7B11%7D%28a_%7B22%7Da_%7B33%7D-a_%7B23%7Da_%7B32%7D%29-a_%7B12%7D%28a_%7B21%7Da_%7B33%7D-a_%7B23%7Da_%7B31%7D%29+a_%7B13%7D%28a_%7B21%7Da_%7B32%7D-a_%7B22%7Da_%7B31%7D%29)

矩阵可逆的充分必要条件为：

![image](https://latex.codecogs.com/gif.latex?detM%20%5Cneq%200)

方程组有非零解的充分必要条件是

使用行列式计算逆矩阵的方法：

![image](https://latex.codecogs.com/gif.latex?G_%7Bij%7D%20%3D%20%5Cfrac%7BC_%7Bij%7D%28F%29%7D%7BdetF%7D)

初等行变换对行列式结果的影响：

* 交换两行 => 行列式结果取反

* 行乘系数a => 行列式结果也乘系数a

* 行与行之间相加对行列式结果没有影响

**特征值与特征向量：**

n阶矩阵M，若数λ和n维非零列向量α使下列的关系式成立：

![image](https://latex.codecogs.com/gif.latex?M%5Calpha%20%3D%20%5Clambda%20%5Calpha)

那么数λ称为矩阵M的**特征值**，非零向量α称为M对应于特征值λ的**特征向量**，比如：

![image](https://latex.codecogs.com/gif.latex?M%5Calpha%20%3D%20%5Cbegin%7Bbmatrix%7D%20-1%20%262%20%260%20%5C%5C%200%20%263%20%260%20%5C%5C%202%20%261%20%26-1%20%5C%5C%20%5Cend%7Bbmatrix%7D%5Cbegin%7Bbmatrix%7D%201%20%5C%5C%202%20%5C%5C%201%20%5C%5C%20%5Cend%7Bbmatrix%7D%20%3D%20%5Cbegin%7Bbmatrix%7D%203%20%5C%5C%206%20%5C%5C%203%20%5C%5C%20%5Cend%7Bbmatrix%7D%20%3D%203%5Cbegin%7Bbmatrix%7D%201%20%5C%5C%202%20%5C%5C%201%20%5C%5C%20%5Cend%7Bbmatrix%7D)

那3就是矩阵M的特征值，α是M对应于特征值3的特征向量。

将式子移到左边可得：

![image](https://latex.codecogs.com/gif.latex?%28M-%5Clambda%20I%29%20%5Calpha%3D%200)

α为非零向量的话，(M-λI)必须不可逆，即：

![image](https://latex.codecogs.com/gif.latex?det%28M-%5Clambda%20I%29%20%3D%200)

求得非零解λ后重新代入方程：

![image](https://latex.codecogs.com/gif.latex?%28M-%5Clambda%20I%29%20%5Calpha%3D%200)

即可求得特征向量α。

举例说明，例如：

![image](https://latex.codecogs.com/gif.latex?M%20%3D%20%5Cbegin%7Bbmatrix%7D%201%20%261%20%5C%5C%203%20%26-1%20%5C%5C%20%5Cend%7Bbmatrix%7D)

矩阵M-λI即为：

![image](https://latex.codecogs.com/gif.latex?M-%5Clambda%20I%20%3D%20%5Cbegin%7Bbmatrix%7D%201-%5Clambda%20%261%20%5C%5C%203%20%26-1-%5Clambda%20%5C%5C%20%5Cend%7Bbmatrix%7D)

可得：

![image](https://latex.codecogs.com/gif.latex?det%28M-%5Clambda%20I%29%20%3D%20%281-%5Clambda%29%28-1-%5Clambda%29-3%20%3D%20%5Clambda%20%5E2%20-4%20%3D%200)

所以矩阵M的特征值为λ1=2、λ2=-2。将其代入方程求特征向量可得：

![image](https://latex.codecogs.com/gif.latex?%5Cbegin%7Bbmatrix%7D%203%20%261%20%5C%5C%203%20%261%20%5C%5C%20%5Cend%7Bbmatrix%7D%20%5Calpha_%7B1%7D%20%3D%20%5Cbegin%7Bbmatrix%7D%200%20%5C%5C%200%20%5C%5C%20%5Cend%7Bbmatrix%7D)

![image](https://latex.codecogs.com/gif.latex?%5Cbegin%7Bbmatrix%7D%20-1%20%261%20%5C%5C%203%20%26-3%20%5C%5C%20%5Cend%7Bbmatrix%7D%20%5Calpha_%7B2%7D%20%3D%20%5Cbegin%7Bbmatrix%7D%200%20%5C%5C%200%20%5C%5C%20%5Cend%7Bbmatrix%7D)

可求得特征向量α1与α2：

![image](https://latex.codecogs.com/gif.latex?%5Calpha_%7B1%7D%20%3D%20%5Cbegin%7Bbmatrix%7D%201%20%5C%5C%20-3%20%5C%5C%20%5Cend%7Bbmatrix%7D)

![image](https://latex.codecogs.com/gif.latex?%5Calpha_%7B2%7D%20%3D%20%5Cbegin%7Bbmatrix%7D%201%20%5C%5C%201%20%5C%5C%20%5Cend%7Bbmatrix%7D)

**对角化**

如果V1,V2,...Vn是一个n×n矩阵M的线性无关特征向量，那么相似变换矩阵A可以表示为：

![image](https://latex.codecogs.com/gif.latex?A%20%3D%20%5Cbegin%7Bvmatrix%7D%20V_%7B1%7D%20%26V_%7B2%7D%20%26...%26V_%7Bn%7D%20%5Cend%7Bvmatrix%7D)

相似对角化矩阵M为：

![image](https://latex.codecogs.com/gif.latex?A%5E%7B-1%7DMA%20%3D%20%5Cbegin%7Bvmatrix%7D%20%5Clambda_%7B1%7D%20%260%20%26...%260%5C%5C%200%20%26%5Clambda_%7B2%7D%20%26...%260%5C%5C%20...%20%26...%20%26...%26...%5C%5C%200%20%260%20%26...%26%5Clambda_%7Bn%7D%5C%5C%20%5Cend%7Bvmatrix%7D)

其中λ1、λ2...λn为矩阵M的特征值。

## Chapter 4：变换

**正交矩阵**

正交矩阵的条件：

![image](https://latex.codecogs.com/gif.latex?M%5E%7B-1%7D%20%3D%20M%5E%7BT%7D)

正交矩阵保持其长度和角度，所以只受旋转和反射变换影响。？

**平移(Translate)矩阵：**

![image](https://latex.codecogs.com/gif.latex?%5Cbegin%7Bbmatrix%7D%201%20%260%20%260%2C%20%26a%20%5C%5C%200%20%261%20%260%2C%20%26b%20%5C%5C%200%20%260%20%261%2C%20%26c%20%5C%5C%200%20%260%20%260%2C%20%261%20%5C%5C%20%5Cend%7Bbmatrix%7D)

**缩放(Scale)矩阵：**

![image](https://latex.codecogs.com/gif.latex?%5Cbegin%7Bbmatrix%7D%20a%20%260%20%260%2C%20%260%20%5C%5C%200%20%26b%20%260%2C%20%260%20%5C%5C%200%20%260%20%26c%2C%20%260%20%5C%5C%200%20%260%20%260%2C%20%261%20%5C%5C%20%5Cend%7Bbmatrix%7D)

**旋转(Rotation)矩阵：**

首先求二维旋转矩阵，由球坐标系公式：

![image](https://latex.codecogs.com/gif.latex?x%3Drcos%28%5Cvarphi%20%29%20%5Cspace%20y%20%3D%20rsin%28%5Cvarphi%20%29)

假设旋转的角度为θ，由三角函数正弦余弦公式可得：

![image](https://latex.codecogs.com/gif.latex?%7Bx%7D%27%20%3D%20rcos%28%5Ctheta+%5Cvarphi%29%20%3D%20rcos%28%5Ctheta%29cos%28%5Cvarphi%29-rsin%28%5Ctheta%29sin%28%5Cvarphi%29)

![image](https://latex.codecogs.com/gif.latex?%7By%7D%27%20%3D%20rsin%28%5Ctheta+%5Cvarphi%29%20%3D%20rsin%28%5Ctheta%29cos%28%5Cvarphi%29+rcos%28%5Ctheta%29sin%28%5Cvarphi%29)

代入x、y可得：

![image](https://latex.codecogs.com/gif.latex?%7Bx%7D%27%20%3D%20xcos%28%5Ctheta%29-ysin%28%5Ctheta%29)

![image](https://latex.codecogs.com/gif.latex?%7By%7D%27%20%3D%20xsin%28%5Ctheta%29+ycos%28%5Ctheta%29)

使用矩阵表示即为：

![image](https://latex.codecogs.com/gif.latex?%5Cbegin%7Bbmatrix%7D%20%7Bx%7D%27%20%5C%5C%20%7By%7D%27%20%5C%5C%20%5Cend%7Bbmatrix%7D%20%3D%20%5Cbegin%7Bbmatrix%7D%20cos%28%5Ctheta%29%20%26-sin%28%5Ctheta%29%5C%5C%20sin%28%5Ctheta%29%20%26cos%28%5Ctheta%29%5C%5C%20%5Cend%7Bbmatrix%7D%5Cbegin%7Bbmatrix%7D%20%7Bx%7D%20%5C%5C%20%7By%7D%20%5C%5C%20%5Cend%7Bbmatrix%7D)

绕任意点的二维旋转可以通过级联两次位移矩阵计算（旋转点位移至原点 => 绕原点旋转 => 旋转点移回原位）

通过齐次坐标引入绕三个轴的三维旋转矩阵：

![image](https://latex.codecogs.com/gif.latex?R_x%28%5Ctheta%29%20%3D%20%5Cbegin%7Bbmatrix%7D%201%260%20%260%5C%5C%200%20%26cos%28%5Ctheta%29%26-sin%28%5Ctheta%29%5C%5C%200%26sin%28%5Ctheta%29%20%26cos%28%5Ctheta%29%5C%5C%20%5Cend%7Bbmatrix%7D)

![image](https://latex.codecogs.com/gif.latex?R_y%28%5Ctheta%29%20%3D%20%5Cbegin%7Bbmatrix%7D%20cos%28%5Ctheta%29%20%260%26-sin%28%5Ctheta%29%5C%5C%200%261%20%260%5C%5C%20-sin%28%5Ctheta%29%260%20%26cos%28%5Ctheta%29%5C%5C%20%5Cend%7Bbmatrix%7D)

![image](https://latex.codecogs.com/gif.latex?R_z%28%5Ctheta%29%20%3D%20%5Cbegin%7Bbmatrix%7D%20cos%28%5Ctheta%29%20%26-sin%28%5Ctheta%29%260%5C%5C%20sin%28%5Ctheta%29%26cos%28%5Ctheta%29%260%5C%5C%200%260%20%261%5C%5C%20%5Cend%7Bbmatrix%7D)

**围绕任意轴的旋转：**

有两种思路：

* 通过将旋转轴旋转到与X/Y/Z某一轴重合，再执行基本旋转，之后再执行反向旋转恢复旋转轴方向。

* 计算旋转点在旋转轴上的平行和垂直分量，再分别计算分量绕A轴旋转角度后的所增加的分量

求点P绕任意轴A（单位向量，|A|=1）旋转的旋转矩阵：

首先求得在轴A上的投影及垂线分量：

![image](https://latex.codecogs.com/gif.latex?%7Bproj_%7BA%7D%7D%5E%7BP%7D%3D%20%5Cfrac%7BP%20%5Ccdot%20A%7D%7B%7CA%7C%7D%5Ctimes%20%5Cfrac%20%7BA%7D%7B%7CA%7C%7D%20%3D%20%28A%5Ccdot%20P%29A)

![image](https://latex.codecogs.com/gif.latex?%7Bperp_%7BA%7D%7D%5E%7BP%7D%3D%20P%20-%20%7Bproj_%7BA%7D%7D%5E%7BP%7D%20%3DP-%28A%20%5Ccdot%20P%29A)

垂线分量（与A垂直）绕A旋转θ后的结果为：

![image](https://latex.codecogs.com/gif.latex?%5BP-%28A%20%5Ccdot%20P%29A%5Dcos%28%5Ctheta%29%20+%20%28A%20%5Ctimes%20P%29sin%28%5Ctheta%29)

再加上A轴上的投影分量：

![image](https://latex.codecogs.com/gif.latex?%7BP%7D%27%20%3D%20A%28A%20%5Ccdot%20P%29%20+%20%5BP-%28A%20%5Ccdot%20P%29A%5Dcos%28%5Ctheta%29%20+%20%28A%20%5Ctimes%20P%29sin%28%5Ctheta%29%20%3D%20Pcos%28%5Ctheta%29%20+%20%28A%20%5Ctimes%20P%29sin%28%5Ctheta%29%20+%20A%28A%20%5Ccdot%20P%29%281-cos%28%5Ctheta%29%29)

最后代入前面的点乘叉乘的矩阵表示可得：

![image](https://latex.codecogs.com/gif.latex?%7BP%7D%27%20%3D%20%5Cbegin%7Bbmatrix%7D%201%260%20%260%5C%5C%200%20%261%260%5C%5C%200%260%20%261%5C%5C%20%5Cend%7Bbmatrix%7DPcos%28%5Ctheta%29%20+%20%5Cbegin%7Bbmatrix%7D%200%26-A_%7Bz%7D%20%26A_%7By%7D%5C%5C%20A_%7Bz%7D%260%20%26-A_%7Bx%7D%5C%5C%20-A_%7By%7D%26A_%7Bx%7D%20%260%5C%5C%20%5Cend%7Bbmatrix%7DPsin%28%5Ctheta%29%20+%20%5Cbegin%7Bbmatrix%7D%20A_%7Bx%7D%5E2%26A_%7Bx%7DA_%7By%7D%20%26A_%7Bx%7DA_%7Bz%7D%5C%5C%20A_%7Bx%7DA_%7By%7D%26A_%7By%7D%5E2%20%26A_%7By%7DA_%7Bz%7D%5C%5C%20A_%7Bx%7DA_%7Bz%7D%26A_%7By%7DA_%7Bz%7D%20%26A_%7Bz%7D%5E2%5C%5C%20%5Cend%7Bbmatrix%7DP%281-cos%28%5Ctheta%29%29)

最终围绕任意旋转轴A的旋转矩阵：

![image](https://latex.codecogs.com/gif.latex?R_A%28%5Ctheta%29%20%3D%20%5Cbegin%7Bbmatrix%7D%20c+%281-c%29A_%7Bx%7D%5E2%26%281-c%29A_%7Bx%7DA_%7By%7D-sA_%7Bz%7D%20%26%281-c%29A_%7Bx%7DA_%7Bz%7D+sA_%7By%7D%5C%5C%20%281-c%29A_%7Bx%7DA_%7By%7D+sA_%7Bz%7D%26c+%281-c%29A_%7By%7D%5E2%20%26%281-c%29A_%7By%7DA_%7Bz%7D-sA_%7Bx%7D%5C%5C%20%281-c%29A_%7Bx%7DA_%7Bz%7D-sA_%7By%7D%26%281-c%29A_%7By%7DA_%7Bz%7D+sA_%7Bx%7D%20%26c+%281-c%29A_%7Bz%7D%5E2%5C%5C%20%5Cend%7Bbmatrix%7D)

转换为Shader代码在顶点着色器中使用：

```javascript
mat4 rotationMatrix(vec3 axis, float angle) {
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;

    return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
                oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
                oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
                0.0,                                0.0,                                0.0,                                1.0);
}

vec3 rotate(vec3 v, vec3 axis, float angle) {
    mat4 m = rotationMatrix(axis, angle);
    return (m * vec4(v, 1.0)).xyz;
}
```

**齐次坐标：**

三维表示的点和向量可能会被搞混，齐次坐标可以解决这个问题，其对三维空间中的点和向量的表示都是四维的：

任意点(w分量为1)：

![image](https://latex.codecogs.com/gif.latex?%5Cbegin%7Bbmatrix%7D%20a_%7B1%7D%5C%5C%20a_%7B2%7D%5C%5C%20a_%7B3%7D%5C%5C%201%5C%5C%20%5Cend%7Bbmatrix%7D)

任意向量(w分量为0)：

![image](https://latex.codecogs.com/gif.latex?%5Cbegin%7Bbmatrix%7D%20b_%7B1%7D%5C%5C%20b_%7B2%7D%5C%5C%20b_%7B3%7D%5C%5C%200%5C%5C%20%5Cend%7Bbmatrix%7D)

两点相减即表示向量（w分量变为0，不受平移矩阵影响）。

所有仿射变换（具有保持直线的特性）都可以借助齐次坐标表示成矩阵相乘的形式。

比如三维表示的平移变换为矩阵加法，采样齐次坐标的话就可以统一表示为矩阵乘法。

3X3的变换矩阵M和3维平移矩阵T可以结合为4X4的变换矩阵F：

![image](https://latex.codecogs.com/gif.latex?F%3D%5Cbegin%7Bbmatrix%7D%20M_%7B11%7D%26M_%7B12%7D%26M_%7B13%7D%26T_%7Bx%7D%5C%5C%20M_%7B21%7D%26M_%7B22%7D%26M_%7B23%7D%26T_%7By%7D%5C%5C%20M_%7B31%7D%26M_%7B32%7D%26M_%7B33%7D%26T_%7Bz%7D%5C%5C%200%260%260%261%5C%5C%20%5Cend%7Bbmatrix%7D)

**法向量矩阵：**

在经过非正交矩阵变换之后，法向量通常会不再垂直于表面。

法向量(N)与切向量(T)互相垂直，而切向量经过变换后仍是切向量，则可得：

![image](https://latex.codecogs.com/gif.latex?%7BN%7D%27%5Ccdot%7BT%7D%27%20%3D%20%28GN%29%5Ccdot%28MT%29%20%3D%20%28GN%29%5E%7BT%7D%28MT%29%20%3D%20N%5E%7BT%7DG%5E%7BT%7DMT%20%3D%200)

由N·T=0（互相垂直）=> G·MT = T => G·M = I(I为单位阵) =>

![image](https://latex.codecogs.com/gif.latex?G%3D%28M%5E%7B-1%7D%29%5E%7BT%7D)

因此**法线变换矩阵应该使用变换矩阵的逆转置矩阵**。

**四元数：**

介绍可看之前[LGL总结的Math部分](http://todaylg.com/LG-Blog-Gatsby/lgl/)，这里不再重复，了解一下就好..

绕A轴旋转角度θ的四元数表示（没有对比就没有伤害...）：

![image](https://latex.codecogs.com/gif.latex?q%20%3D%20cos%5Cfrac%7B%5Ctheta%7D%7B2%7D+Asin%5Cfrac%7B%5Ctheta%7D%7B2%7D)

应用到点P：

![image](https://latex.codecogs.com/gif.latex?%7BP%7D%27%20%3D%20qPq%5E%7B-1%7D)

相当于3x3矩阵：

![image](https://latex.codecogs.com/gif.latex?R_%7Bq%7D%20%3D%20%5Cbegin%7Bbmatrix%7D%201-2y%5E2-2z%5E2%262xy-2wz%262xz+2wy%5C%5C%202xy+2wz%261-2x%5E2-2z%5E2%262yz-2wx%5C%5C%202xz-2wy%262yz+2wx%261-2x%5E2-2y%5E2%5C%5C%20%5Cend%7Bbmatrix%7D)

球内插值（0<=t<=1）：

![image](https://latex.codecogs.com/gif.latex?q%28t%29%20%3D%20%5Cfrac%7Bsin%281-%5Ctheta%29%7D%7Bsin%28%5Ctheta%29%7Dq_%7B1%7D+%5Cfrac%7Bsin%28%5Ctheta%20t%29%7D%7Bsin%28%5Ctheta%29%7Dq_%7B2%7D)

### Chapter 5：几何体

**点线距离**(直接计算其垂直分量即可)：

![image](https://latex.codecogs.com/gif.latex?d%5E2%20%3D%20%28Q-S%29%5E2%20-%20%5Bproj_%7Bv%7D%28Q-S%29%5D%5E2%20%3D%20%28Q-S%29%5E2%20-%20%5B%5Cfrac%7B%28Q-S%29%5Ccdot%20V%7D%7BV%5E2%7DV%5D%5E2)

**面：**

给定法线向量N和点P，则由二者确定的平面需满足（Q为面内点）：

![image](https://latex.codecogs.com/gif.latex?N%5Ccdot%20%28Q-P%29%20%3D%200)

再由平面方程：

![image](https://latex.codecogs.com/gif.latex?Ax+By+Cz+D%3D0)

可知：A、B、C为法向量N的xyz分量，D=-N·P：

![image](https://latex.codecogs.com/gif.latex?d%3DN%5Ccdot%20Q+D)

当：

* d=0时：点Q在平面中

* d>0时，点Q在正面上

* d<0时，点Q在背面下

**线面交点：**

设直线过点S，平行于向量V，则直线方程可以表示为：P(t) = S + tV，可得与面交点方程：

![image](https://latex.codecogs.com/gif.latex?N%5Ccdot%20P%28t%29%20+%20D%20%3D%200)

可得：

![image](https://latex.codecogs.com/gif.latex?t%3D%5Cfrac%7B-%28N%20%5Ccdot%20S+D%29%7D%7BN%5Ccdot%20V%7D)

**视椎体:**

假设水平视野的角度为α，相机到视椎体近平面的距离e为：

![image](https://latex.codecogs.com/gif.latex?e%3D%20%5Cfrac%7B1%7D%7Btan%28%5Cfrac%7Ba%7D%7B2%7D%29%7D)

垂直视野角度β可以表示为：

![image](https://latex.codecogs.com/gif.latex?%5Cbeta%20%3D%202tan%5E%7B-1%7D%28%5Cfrac%7B%5Calpha%7D%7Be%7D%29)

**透视插值校正：**

深度插值公式：

![image](https://latex.codecogs.com/gif.latex?%5Cfrac%7B1%7D%7Bz_3%7D%20%3D%20%5Cfrac%7B1%7D%7Bz_1%7D%281-y%29%20+%20%5Cfrac%7B1%7D%7Bz_2%7Dt)

结果表明在透视投影中，深度值z1和z2需要通过对它们的**倒数**进行线性插值来正确地插值:。

顶点插值校正：

![image](https://latex.codecogs.com/gif.latex?%5Cfrac%7Bb_3%7D%7Bz_3%7D%20%3D%20%5B%5Cfrac%7Bb_1%7D%7Bz_1%7D%281-t%29%20+%20%5Cfrac%7Bb_2%7D%7Bz_2%7Dt%5D)

**透视矩阵：**

假设点P(Px,Py,Pz,1)是在视椎体中的一个点（视椎体中n为负)，可得在视椎体近平面的坐标x,y：

![image](https://latex.codecogs.com/gif.latex?%5Cfrac%7Bx%7D%7BP_x%7D%20%3D%20-%5Cfrac%7Bn%7D%7BP_z%7D%20%5CRightarrow%20x%20%3D%20-%5Cfrac%7Bn%7D%7BP_z%7DP_x)

同理y：

![image](https://latex.codecogs.com/gif.latex?%5Cfrac%7By%7D%7BP_y%7D%20%3D%20-%5Cfrac%7Bn%7D%7BP_z%7D%20%5CRightarrow%20y%20%3D%20-%5Cfrac%7Bn%7D%7BP_z%7DP_y)

透视矩阵需要将视椎体映射成齐次裁剪空间的立方体，即需要将X轴\[l,r] => \[-1,1]、Y轴\[b,t]=>\[-1,1]，可得关系式：

![image](https://latex.codecogs.com/gif.latex?%7Bx%7D%27%20%3D%202%5Cfrac%7B%28x-l%29%7D%7Br-l%7D-1)

![image](https://latex.codecogs.com/gif.latex?%7By%7D%27%20%3D%202%5Cfrac%7B%28y-b%29%7D%7Bt-b%7D-1)

代入近平面上点xy的关系式并化简后可得：

![image](https://latex.codecogs.com/gif.latex?%7Bx%7D%27%20%3D%20%5Cfrac%7B2n%7D%7Br-l%7D%28-%5Cfrac%7BP_%7Bx%7D%7D%7BP_%7Bz%7D%7D%29-%5Cfrac%7Br+l%7D%7Br-l%7D)

![image](https://latex.codecogs.com/gif.latex?%7By%7D%27%20%3D%20%5Cfrac%7B2n%7D%7Bt-b%7D%28-%5Cfrac%7BP_%7By%7D%7D%7BP_%7Bz%7D%7D%29-%5Cfrac%7Bt+b%7D%7Bt-b%7D)

Z轴坐标的变换复杂一些，为了保证线性，我们需要构造z的倒数关系式：

![image](https://latex.codecogs.com/gif.latex?%7Bz%7D%27%20%3D%20A%5Cfrac%7B1%7D%7Bz%7D+B)

由-n => -1、-f => 1可得：

![image](https://latex.codecogs.com/gif.latex?-1%20%3D%20%5Cfrac%7BA%7D%7B-n%7D+B%20%5Cspace%20and%5Cspace%201%20%3D%20%5Cfrac%7BA%7D%7B-f%7D+B)

可计算出A、B：

![image](https://latex.codecogs.com/gif.latex?A%20%3D%20%5Cfrac%7B2nf%7D%7Bf-n%7D%20%5Cspace%20and%20%5Cspace%20B%20%3D%20%5Cfrac%7Bf+n%7D%7Bf-n%7D)

最终z坐标的变换公式：

![image](https://latex.codecogs.com/gif.latex?%7Bz%7D%27%20%3D%20-%5Cfrac%7B2nf%7D%7Bf-n%7D%28-%5Cfrac%7B1%7D%7BP_z%7D%29+%5Cfrac%7Bf+n%7D%7Bf-n%7D)

对xyz化简后可得：

![image](https://latex.codecogs.com/gif.latex?-%7Bx%7D%27P_z%20%3D%20%5Cfrac%7B2n%7D%7Br-l%7DP_%7Bx%7D-%5Cfrac%7Br+l%7D%7Br-l%7DP_%7Bz%7D)

![image](https://latex.codecogs.com/gif.latex?-%7By%7D%27P_z%20%3D%20%5Cfrac%7B2n%7D%7Bt-b%7DP_%7By%7D-%5Cfrac%7Bt+b%7D%7Bt-b%7DP_%7Bz%7D)

![image](https://latex.codecogs.com/gif.latex?-%7Bz%7D%27P_z%20%3D%20%5Cfrac%7Bf+n%7D%7Bf-n%7DP_z-%5Cfrac%7B2nf%7D%7Bf-n%7D)

使用矩阵表示即为：

![image](https://latex.codecogs.com/gif.latex?P%27%20%3D%20M_%7Bfrustum%7DP%20%3D%20%5Cbegin%7Bbmatrix%7D%20%5Cfrac%7B2n%7D%7Br-l%7D%260%26%5Cfrac%7Br+l%7D%7Br-l%7D%260%5C%5C%200%26%5Cfrac%7B2n%7D%7Bt-b%7D%26%5Cfrac%7Bt+b%7D%7Bt-b%7D%260%5C%5C%200%260%26-%5Cfrac%7Bf+n%7D%7Bf-n%7D%26-%5Cfrac%7B2nf%7D%7Bf-n%7D%5C%5C%200%260%26-1%260%5C%5C%20%5Cend%7Bbmatrix%7D%5Cbegin%7Bbmatrix%7D%20P_%7Bx%7D%5C%5C%20P_%7By%7D%5C%5C%20P_%7Bz%7D%5C%5C%201%5C%5C%20%5Cend%7Bbmatrix%7D)

**正交矩阵：**

与投影矩阵同理，只不过x'/y/'z'与x/y/z之间的关系在正交投影下的关系式是直接相等的：

![image](https://latex.codecogs.com/gif.latex?%7Bx%7D%27%20%3D%20%5Cfrac%7B2%7D%7Br-l%7D%7Bx%7D-%5Cfrac%7Br+l%7D%7Br-l%7D)

![image](https://latex.codecogs.com/gif.latex?%7By%7D%27%20%3D%20%5Cfrac%7B2%7D%7Bt-b%7D%7By%7D-%5Cfrac%7Bt+b%7D%7Bt-b%7D)

Z轴也是同理：

![image](https://latex.codecogs.com/gif.latex?%7Bz%7D%27%20%3D%20%5Cfrac%7B-2%7D%7Bf-n%7D%7Bz%7D-%5Cfrac%7Bf+n%7D%7Bf-n%7D)

最终的变换矩阵即为：

![image](https://latex.codecogs.com/gif.latex?P%27%20%3D%20M_%7Bortho%7DP%20%3D%20%5Cbegin%7Bbmatrix%7D%20%5Cfrac%7B2%7D%7Br-l%7D%260%260%26-%5Cfrac%7Br+l%7D%7Br-l%7D%5C%5C%200%26%5Cfrac%7B2%7D%7Bt-b%7D%260%26%5Cfrac%7Bt+b%7D%7Bt-b%7D%5C%5C%200%260%26-%5Cfrac%7B2%7D%7Bf-n%7D%26-%5Cfrac%7Bf+n%7D%7Bf-n%7D%5C%5C%200%260%260%261%5C%5C%20%5Cend%7Bbmatrix%7D%5Cbegin%7Bbmatrix%7D%20P_%7Bx%7D%5C%5C%20P_%7By%7D%5C%5C%20P_%7Bz%7D%5C%5C%201%5C%5C%20%5Cend%7Bbmatrix%7D)

**斜视锥体深度投影和裁剪：**

涉及反射场景的情况一般是通过一个反射平面，反射主相机生成一个虚拟相机对场景进行渲染。

需要注意的是当有物体横跨反射平面的时候，渲染反射的虚拟相机中的场景就会出现问题（会把平面以下的部分渲染到反射结果中）。

最简单的解决方法是让GPU暴露一个自定义选定剪切平面的方法，截断反射表面下的所有几何体。但是很不幸的是并不是所有GPU都支持这个自定义的剪切选项，并且即使支持改起来也会很麻烦（因为要改动代码）。

这时候斜视锥体裁剪的办法就派上用场了，对视椎体进行裁剪，用反射平面替代原来的近裁剪面（即新的斜视椎体），这样反射平面以下的物体都不会渲染（因为在视椎体以外了），其中变换后的新投影矩阵M'与原投影矩阵M的关系：

![image](https://latex.codecogs.com/gif.latex?M%27%20%3D%20%5Cbegin%7Bbmatrix%7D%20M_1%5C%5C%20M_2%5C%5C%20%5Cfrac%7B-2Q_%7Bz%7D%7D%7BC%5Ccdot%20Q%7DC+%3C0%2C0%2C1%2C0%3E%5C%5C%20M_4%5C%5C%20%5Cend%7Bbmatrix%7D)

其中:

![image](https://latex.codecogs.com/gif.latex?Q%20%3D%20M%5E%7B-1%7DQ%27)

![image](https://latex.codecogs.com/gif.latex?Q%27%20%3D%20%3Csgn%28C_x%27%2CC_y%27%2C1%2C1%29%3E)

![image](https://latex.codecogs.com/gif.latex?C%27%20%3D%20%28M%5E%7B-1%7D%29%5E%7BT%7DC)

代码实现：

```javascript
//reflectorPlane.setFromNormalAndCoplanarPoint
reflectorPlane.normal.copy(normal);
reflectorPlane.constant = -reflectorWorldPosition.dot(reflectorPlane.normal);

//reflectorPlane.applyMatrix4
reflectorPlane.m1.getNormalMatrix(virtualCamera.viewMatrix);
reflectorPlane.v1.copy(reflectorPlane.normal).multiply(-reflectorPlane.constant);
reflectorPlane.v1.applyMatrix4(virtualCamera.viewMatrix);
reflectorPlane.normal.applyMatrix3(reflectorPlane.m1).normalize();
reflectorPlane.constant = -reflectorPlane.v1.dot(reflectorPlane.normal);

//C'
clipPlane.set(reflectorPlane.normal.x, reflectorPlane.normal.y, reflectorPlane.normal.z, reflectorPlane.constant);

let projectionMatrix = virtualCamera.projectionMatrix;
q.x = (Math.sign(clipPlane.x) + projectionMatrix[8]) / projectionMatrix[0];
q.y = (Math.sign(clipPlane.y) + projectionMatrix[9]) / projectionMatrix[5];
q.z = - 1.0;
q.w = (1.0 + projectionMatrix[10]) / projectionMatrix[14];

// Calculate the scaled plane vector
let res = 2.0 / clipPlane.dot(q);
clipPlane.multiply(res);

// Replacing the third row of the projection matrix
projectionMatrix[2] = clipPlane.x;
projectionMatrix[6] = clipPlane.y;
projectionMatrix[10] = clipPlane.z + 1.0 - clipBias;
projectionMatrix[14] = clipPlane.w;
```

实践反射场景：

[Examples: Reflector](http://todaylg.com/LGL/examples/?src=reflector.html)

相关文章：

[Paper](http://www.terathon.com/lengyel/Lengyel-Oblique.pdf)

[reflect向量计算](https://blog.csdn.net/yinhun2012/article/details/79466517)

## Chapter 6：光线追踪

[相关介绍文章](https://zhuanlan.zhihu.com/p/41269520)

//Todo：待实践 + WebWorker学习

## Chapter 7：光照与着色

### Light Source

**环境光(Ambient Light):**

环境光从各个方向以相同的强度照射过来，并且均匀地照亮物体的每一部分。在场景中环境光的系数通常是一个常量（也可以读纹理）。

**定向光(Directional Light ):**

定向光源是一种从无限远的地方向单一方向照射的光源。定向光通常用于模拟太阳，它的光线可以认为是平行的，且其光强不会随着距离的增加而减弱。

**点光源(Point Light)：**

![image](https://latex.codecogs.com/gif.latex?C%3D%5Cfrac%7B1%7D%7Bk_c+k_%7Bl%7Dd+k_qd%5E2%7DC_0)

其中光源强度为C，d为距离光源的距离，C0为灯的颜色，常量Kc、Kl、Kq控制衰减。

**聚光灯(Spot Light)：**

![image](https://latex.codecogs.com/gif.latex?C%3D%5Cfrac%7Bmax%5C%7B-R%5Ccdot%20L%2C0%5C%7D%5Ep%7D%7Bk_c+k_%7Bl%7Dd+k_qd%5E2%7DC_0)

其中R为聚光灯方向，L为照射点指向光源的单位向量，指数p控制聚光灯的集中度，控制光照强度随R和- L夹角的增大而减小的速率。

**环境光与漫反射光(Ambient and Diffuse Light)：**

漫反射(Lambertian)指入射光在表面某一点上的光的一部分向随机方向散射，因为光在每个方向上都是均匀反射的，所以朗伯反射的计算不要考虑观察者的位置因素。

考虑环境光强度与n个光源的贡献，可以将漫反射分量表示为：

![image](https://latex.codecogs.com/gif.latex?K_%7Bdiffuce%7D%20%3D%20DA+D%5Csum_%7Bi%3D1%7D%5E%7Bn%7DC_imax%5C%7BN%5Ccdot%20L_i%2C0%5C%7D)

其中D是表面的漫反射颜色，A代表环境光的颜色，N是反射表面的法向量，L是指向第i个光源的单位向量，Ci是第i个光源的光照强度。

**镜面光照(Specular Lighting)：**

![image](https://latex.codecogs.com/gif.latex?K_%7Bspecular%7D%20%3D%20S%5Csum_%7Bi%3D1%7D%5E%7Bn%7DC_imax%5C%7BN%5Ccdot%20H_i%2C0%5C%7D%5Em%5Cspace%28N%5Ccdot%20L_i%20%3E%200%29)

其中S表面的镜面反射颜色，Hi观察者与光源Li的半角向量，m控制反射的锐度，N与Li的点乘结果决定表面是正对光源还是背对光源（背对的话就不用计算了）。



实践可见：[Exmaple](http://todaylg.com/LGL/examples/?src=shadowMap_DirSpot.html)

**纹理映射(Texture Mapping)**

Projective Texture Maps：

投射纹理映射的一个应用是模拟聚光灯将图像投射到环境中，随着与聚光灯距离的增加，投影图像变大。这种效果是通过使用一个4×4纹理矩阵将一个物体的顶点位置映射到纹理坐标（s, t, 0, q），这样除以q就得到了正确的二维纹理坐标（s，t），用于对投影图像进行采样。

首先需要乘以转换矩阵，将每个顶点的坐标先转换为以聚光灯位置为原点的坐标系下的坐标，再乘以投影矩阵（仅xy）

//Todo: 待实践

Cube Texture Maps：

立方体纹理贴图通常用于近似环境周围的反射，纹理的采样坐标为三维向量，表示从立方体中心发出的指向要采样的texel的方向向量。

实践可见：[Example](http://localhost:8080/examples/?src=cubeMap.html)

**着色模型(Shading Models)：**

Blinn-Phong Shading：

实践可见：[Example](http://localhost:8080/examples/?src=basePrimitives.html)

**凹凸映射(Bump Mapping)：**

* Bump Map Construction

* Tangent Space

* Calculating Tangent Vectors

* Implementation

//Todo: 实践

**物理反射模型**

* Bidirectional Reflectance Distribution Functions（BRDF）

* Cook-Torrance Illumination

* The Fresnel Factor

* The Microfacet Distribution Function

* The Geometrical Attenuation Factor

* Todo：Implementation

PBR实践可见：[Example](http://localhost:8080/examples/?src=glTFLoader.html)
