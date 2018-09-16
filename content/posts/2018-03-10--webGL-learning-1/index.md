---
title: 初探WebGL(一)
category: "大结"
cover: test0.png
author: todaylg



---

## Part 1

万里长征的第一步吧。。。也不知道自己能走几步，毕竟底子真是差啊（方程都解不出来的人研究什么WebGL，好好搬砖不行吗？！经常这样想），但是奈何脑子里的骚操作不上3D又没法实现出来，但是效果后面又都是腿都跪麻的数学。。。很难受。。。总之先读本入门的书瞅瞅吧！有个大致了解再说啦！

先上一张Adobe的图：
![image](http://wwwimages.adobe.com/content/dam/acom/en/devnet/flashplayer/articles/how-stage3d-works/fig02.jpg)

一些基本的概念记上来：

**着色器**：运行在GPU中负责渲染算法的程序。最常用的为顶点着色器和片元着色器。

**GLSL**: openGL Shading Language (Directx为Hight-Level Shading Language(HLSL))

**光栅化**："连续"的三维场景显示到"离散"（红绿蓝LED）的显示器上所经过的过程。

**片元**：和最终显示在屏幕上的像素很接近，但是是一对一或多对一的关系，片元能否显示为像素还需要经过深度测试、透明度测试等。

## 最短的WebGL程序：清空绘图区

说是清空，其实是用黑色填充了绘图区

<iframe width="100%" height="430" src="//jsfiddle.net/todaylg/35br4q7m/embedded/result,js,css,html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

一般都将上下文取名为gl，因为WebGL基于OpenGL ES，这样命名可以使WebGL与OpenGL ES中的函数名对应（gl.clearColor就相当于glClearColor这样）。

gl.clearColor()接受的四个参数代表RGBA（0.0~1.0,不是0~255！！），指定一次颜色后会缓存起来直到下一次重新设置颜色才会改变。

#### gl.clearColor()

* * *

| 参数 | 参数取值 |
| --- | --- |
| R | 0.0~1.0 |
| G | 0.0~1.0 |
| B | 0.0~1.0 |
| A | 0.0~1.0 |

最后的clear()方法传入了一个奇怪的参数：gl.COLOR\_BUFFER\_BIT。清空绘图区域实际上是清空颜色缓冲区(color buffer)，传参gl.COLOR\_BUFFER\_BIT就是告诉WebGL清空颜色缓冲区（WebGL还有其他缓冲区：深度缓冲区和模板缓冲区）。

#### gl.clear()

* * *

| 参数 | 参数取值 | 作用 | 相关函数 | 函数默认值 |
| --- | --- | --- | --- | --- |
| buffer | gl.COLOR\_BUFFER\_BIT | 指定颜色缓冲区 | gl.clearColor(r,g,b,a) | (0.0,0.0,0.0,0.0) |
|  | gl.DEPTH\_BUFFER\_BIT | 指定深度缓冲区 | gl.clearDepth(depth) | 1.0 |
|  | gl.STENCIL\_BUFFER\_BIT | 指定模板缓冲区 | gl.clearStencil(s) | 0 |

可以用位操作符OR(|)指定多个缓冲区。

## 画个点

着色器出场了。

<iframe width="100%" height="430" src="//jsfiddle.net/todaylg/35br4q7m/1/embedded/result,js,css,html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

注意着色器程序里分号是不能少的。着色器程序和C一样必须包含一个main函数。

| 类型 | 变量名 | 描述 |
| --- | --- | --- |
| vec4 | gl_Position | 四个浮点数组成的矢量，在这里表示顶点的位置 |
| float | gl_PointSize | 浮点数，在这里表示点的尺寸(像素数) |

#### vec4()

* * *

| 参数 | 返回值 |
| --- | --- |
| v0,v1,v2,v3 四个浮点型分量 | 由这四个分量组成的vec4对象。 |

由4个分量组成的矢量被称为齐次坐标，齐次坐标可以提高处理三维数据的效率，所以很常用。虽然齐次坐标是四维的，但是如果最后一个分量是1.0，那这个齐次坐标就可以表示前面三个分量为其坐标值的那个点。所以需要用齐次坐标表示顶点坐标的时候，最后一个分量直接赋1.0就行。

**齐次坐标：**(x,y,z,w)，等价于三维坐标：(x/w,y/w,z/w)，当w为1的时候就可以当三维坐标来用。齐次坐标的存在使得使用矩阵乘法来描述顶点变换成为了可能。

#### gl.drawArray()

* * *

| 参数 | 参数取值 |
| --- | --- |
| mode(指定绘制的方式) | gl.POINTS |
|  | gl.LINES |
|  | gl.LINE_STRIP |
|  | gl.LINE_LOOP |
| first(指定从哪个顶点开始绘制) | 整数型 |
| count(指定绘制需要用到多少个顶点) | 整数型 |

在清空绘制区域之后，可以使用强大的gl.drawArray()来绘制各种图形。gl.drawArray()执行count次，从first开始每次处理一个顶点。顶点着色器执行完后片元着色器开始执行，最后完成绘制。
3

## WebGL的坐标系

<iframe width="100%" height="430" src="//jsfiddle.net/todaylg/35br4q7m/2/embedded/result,js,css,html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

WebGL坐标系和canvas坐标系不一样，canvas原点在左上角，沿x轴向右为正值，没y轴向下为正值。而WebGL原点在中心，沿x轴向右为正值，没y轴向上为正值，z轴由屏幕向外为正值，即右手坐标系（右手大拇指开始依次x、y、z轴）

## 再画个点

WebGL程序由JavaScript和着色器程序一起组成，那二者之间是如何通信的呢？有两种方法可以做到这点：attribute变量和uniform变量，前者用于传输顶点相关的数据，后者用于传输与顶点无关的数据，现在用attrubute来传输顶点的坐标。

#### attrubute

attrubute是GLSL ES的变量，用于从外部向顶点着色器传输数据，只有顶点着色器可以使用。就相当于定义这个变量，再把这个变量赋给要给的值，之后向这个变量传递数据就行了。

<iframe width="100%" height="430" src="//jsfiddle.net/todaylg/35br4q7m/3/embedded/result,js,css,html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

attribute vec4 a_Position;这句代码中的attribute称为存储限定符，表示接下来的变量是一个attribute变量，attribute变量必须是全局变量，数据从外部传给它，声明格式为存储限定符-类型-变量名。

#### gl.getAttribLocation

* * *

| 参数 | 描述 |
| --- | --- |
| program | 指定包含顶点着色器和片元着色器的着色器程序对象 |
| name | 指定想要获取其存储地址的attribute变量名称 |

参数gl.program先不管，方法会返回指定的attribute变量的存储地址（没有则返回-1）

#### gl.vertexAttrib3f（vertexAttrib+3个参数+float）

* * *

| 参数 | 描述 |
| --- | --- |
| location | 指定将要修改的attribute变量的存储位置（就是上面那个方法取到的地址） |
| v0 | 指定填充attribute变量第一个分量的值 (x) |
| v1 | 指定填充attribute变量第二个分量的值 (y) |
| v2 | 指定填充attribute变量第三个分量的值 (z) |

其实是有v3的，但是这个方法直接不写默认就会把第四个分量设置为1.0,何乐而不为。

同理gl.vertexAttrib1f就是只传v0，2f就是v0和v1，4f就是v0,v1,v2,v3.少传的参数除了第四个会填充上1.0以外，其他的都填充0.0。

现在直接在JavaScript里修改给gl.vertexAttrib3f传的参数值就可以动态修改画出的点的坐标了。同理更改a_PointSize也是这样。再此基础上稍微修改下程序就实现点哪画哪啦：

<iframe width="100%" height="430" src="//jsfiddle.net/todaylg/35br4q7m/4/embedded/result,js,css,html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

注意和canvas的坐标需要换算一下。

#### uniform

要是想动态改变颜色的话那就得上uniform了，步骤和atrribute变量传递是类似的，一个套路。

<iframe width="100%" height="430" src="//jsfiddle.net/todaylg/35br4q7m/5/embedded/result,js,css,html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

这里的gl.getUniformLocation和gl.getAttribLocation一个意思，差别在于当name不存在时前者返回的是-1而不是null。gl.uniform4f和gl.vertexAttrib3f也是一个套路，同族函数什么的（什么123f）就不赘述了。

## Part 2

早知道线性代数这么有用，当初就好好学啦。。。矩阵来袭！！

## 一次性多画几个点

WebGL提供了一个缓冲区对象，可以一次性向着色器传入多个顶点的数据

<iframe width="100%" height="430" src="//jsfiddle.net/todaylg/35br4q7m/6/embedded/result,js,css,html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

一下出现了很多新的东西，总的来说initVertexBuffers()方法的作用是创建顶点缓冲区对象，并且把多个顶点的数据保存在缓冲区中，然后将缓冲区传给顶点着色器进行绘制。

整体的流程是：

1.先创建缓冲区对象(gl.createBuffer())=>

2.绑定缓冲区对象(gl.bindBuffer())=>

3.将数据写入缓冲区对象(gl.bufferData())=>

4.将缓冲区对象分配给一个attribute变量(gl.vertexAttribPointer())=>

5.开启attribute变量（gl.enableVertexAttribArray()）。

### 创建缓冲区对象(gl.createBuffer())

调用gl.createBuffer()后会创建一个新的缓冲区对象，方法返回这个新创建的缓冲区对象。相对应的还有一个gl.deleteBuffer(buffer)函数可以删除其创建出来的缓冲区对象。

### 绑定缓冲区对象(gl.bindBuffer())

绑定是绑定到哪呢？绑定的这个目标是什么？为什么要绑定这个目标？

原因是我们不能直接向缓冲区写入数据，而只能向目标写入数据，所以要向缓冲区写数据，就必须先绑定（理解为一个temp变量即可）。

gl.bindBuffer(target, buffer)

* * *

| 参数 | 参数取值 | 描述 |
| --- | --- | --- |
| target | gl.ARRAY_BUFFER | 表示缓冲区对象中包含了顶点的数据 |
|  | gl.ELEMENT\_ARRAY\_BUFFER | 表示缓冲区对象中包含了顶点的索引值 |
| buffer | buffer | 指定之前由gl.createBuffer()返回的待绑定的缓冲区对象 |

缓冲区对象中存储着关于顶点的数据（位置坐标）时将其绑定到了gl.ARRAY_BUFFER上。绑定之后我们就可以向缓冲区对象写入数据了。

### 将数据写入缓冲区对象(gl.bufferData())

和上面所说的一样，这里写入缓冲区对象其实是写到target再由target写入缓冲区对象的。

gl.bufferData(target, data, usage)

* * *

| 参数 | 参数取值 | 描述 |
| --- | --- | --- |
| target | gl.ARRAY\_BUFFER或者gl.ELEMENT\_ARRAY_BUFFER | 前面绑定的啥这就是啥 |
| data | data | 写入缓冲区对象的数据 |
| usage |  | 表示程序将如何使用存储在缓冲区对象中的数据。这个参数可以帮助WebGL优化，传的不对也没事，就是慢点而已。 |
|  | gl.STATIC_DRAW | 只会向缓冲区对象中写入一次数据，但需要绘制很多次 |
|  | gl.STREAM_DRAW | 只会向缓冲区对象中写入一次数据，然后绘制若干次 |
|  | gl.DYNAMIC_DRAW | 会向缓冲区对象中多次写入数据，并绘制很多次 |

这里传入的数据是一个JavaScript的Float32Array对象，使用Float32Array是因为这类特殊数组对大量元素都是同一种类型这种情况进行优化（普通的数组对象里面啥都可以存，没有优化），这类特殊数组称为类型化数组。

### 类型化数组

| 数组类型 | 每个元素所占字节数 | 描述 |
| --- | --- | --- |
| Int8Array | 1 | 8位整型数 |
| Uint8Array | 1 | 8位无符号整型数 |
| Int16Array | 2 | 16位整型数 |
| Uint16Array | 2 | 16位无符号整型数 |
| Int32Array | 4 | 32位整型数 |
| Uint32Array | 4 | 32位无符号整型数 |
| Float32Array | 4 | 单精度32位浮点数 |
| Float64Array | 8 | 双精度64位浮点数 |

注意类型化数组只能通过new来创建，并且没有push()和pop()方法：

| 方法 | 描述 |
| --- | --- |
| get(index) | 获取第index个元素值 |  |
| set(index, value) | 设置第index个元素的值为value |  |
| set(array, offset) | 从第offset个元素开始讲数组array中的值填充进去 |  |
| length | 数组长度 |  |
| BYTES\_PER\_ELEMENT | 数组中每个元素所占的字节数 |  |

### 将缓冲区对象分配给一个attribute变量(gl.vertexAttribPointer())

之前使用gl.vertexAttrib\[1234\]f系列函数为attribute变量分配值，但是这个方法只能想其传输一个值。现在则是将整个数组中的值一次性分配给attribute变量。

gl.vertexAttribPointer(location,size,type,normalized,stride,offset)

* * *

| 参数 | 描述 |
| --- | --- |
| location | 指定待分配attribute变量的存储位置 |
| size | 指定缓冲区每个顶点的分量个数(1-4)，若size和attribute变量需要的分量有出入，会补全 |
| type | 指定数据格式 |
|  | gl.UNSIGHNED_BYTE(无符号字节，Uint8Array) |
|  | gl.SHORT(短整型，Int16Array) |
|  | gl.UNSIGHNED_SHORT(无符号短整型，Uint16Array) |
|  | gl.INT(整型，Int32Array) |
|  | gl.UNSIGNED_INT(无符号整型，Uint32Array) |
|  | gl.FLOAT(浮点型，Float32Array) |
| normalize | true or false 表明是否将非浮点型的数据归一化到\[0,1\]或\[-1,1\]之间 |
| stride | 指定相邻两个顶点间的字节数，默认为0 |
| location | 指定缓冲区对象中的偏移量（attribute变量从缓冲区的何处开始存储的，从开始就存的设为0） |

现在再回到代码去看gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);这里的2是因为在缓冲区中只提供了x,y。这样就把整个缓冲区对象分配给了attribute变量了。

### 开启attribute变量（gl.enableVertexAttribArray()）

就相当于打开开关一样，为了使顶点着色器能访问缓冲区内的数据，我们需要使用gl.enableVertexAttribArray()来激活attribute变量，使缓冲区对attitude变量的分配生效。

gl.enableVertexAttribArray(location)就没啥好说的了，传入一个已经分配好的缓冲区attribute变量后就开启了该变量，更应该注意的是这个方法的名字看起来像是处理顶点数组的，其实处理的对象是缓冲区。相对应的gl.disableVertexAttribArray(location)则用于关闭。

最后调用gl.drawArray(gl.POINTS, 0, n);从缓冲区的第一个坐标开始画起，画n次。总之，心里有个WebGL系统（JS+着色器），也就有了WebGL系统，心里有了缓冲区，也就有了缓冲区。😂

## Hello Triangle

<iframe width="100%" height="430" src="//jsfiddle.net/todaylg/35br4q7m/7/embedded/result,js,css,html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

代码只修改了两行，一行是删除gl_PointSize = 10.0，这句只有在画单个点的时候才起作用；一行则是修改gl.drawArrays的第一个参数为gl.TRIANGLES。这样三角形就画出来了。简单粗暴源自gl.drawArrays()的强大,其代表了WebGL所能绘制的基本图形：

| 基本图形 | 参数mode | 描述 |
| --- | --- | --- |
| 点 | gl.POINTS | 一些列点，绘制在v0、v1、v2...处 |
| 线段 | gl.LINES | 一些列单独的线段点，绘制在（v0，v1）、（v2，v3）...处 |
| 线条 | gl.LINES_STRIP | 一些列连接的线段点，绘制在（v0，v1）、（v1，v2）...处 |
| 回路 | gl.LINES_LOOP | 一些列连接的线段，相当于gl.LINES_STRIP+（vn,v0） |
| 三角形 | gl.TRIANGLES | 一些列单独的三角形，绘制在（v0,v1,v2）、(v3,v4,v5)...处，不够三个点就忽略了 |
| 三角带 | gl.TRIANGLES_STRIP | 一些带状的三角形，每个三角形与前一个三角形共享一条边，即绘制在（v0,v1,v2）、(v2,v1,v3)、(v2,v3,v4)...处 |
| 三角扇 | gl.TRIANGLES_FAN | 一些列三角形组成的类似于扇形的图形，绘制在（v0,v1,v2）、(v0,v2,v3)、(v0,v3,v4)...处，不够三个点就忽略了 |

WebGL只能绘制点、线段和三角形。但是三角形已经足够构建世界了，如果不够，那就再加几个。

## Hello Rectangle

矩形就是两个三角形，可以用gl.TRIANGLES（6）、gl.TRIANGLES\_STRIP（4）、gl.TRIANGLES\_FAN（12，4个小三角形）来绘制。

<iframe width="100%" height="430" src="//jsfiddle.net/todaylg/35br4q7m/8/embedded/result,js,css,html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

## 平移、旋转和缩放

### 平移

平移最简单，直接在每个分量上加上对应要改变的值即可，这是一个逐顶点操作而非逐片元操作，所以发生在顶点着色器上：

<iframe width="100%" height="430" src="//jsfiddle.net/todaylg/35br4q7m/9/embedded/result,js,css,html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

我们使用uniform变量来表示三角形的平移距离，还是老套路，在着色器程序里创建后，在JavaScript代码中获取其存储位置，然后赋值数据，最后再把数据传给着色器。这里gl.uniform4f()最后一个分量之所以是0.0是因为vec4的各个分量相加时原坐标的最后一个分量为1.0，那要保证加出来的坐标最后一个分量也为1.0,那就只好让这个代表位移的vec4最后一个分量为0.0咯。

注意GLSL ES中的赋值操作只能发生在相同类型的变量之间（没有JavaScript的隐式转换）。这里都是vec4所以可以直接相加。

### 旋转

旋转复杂一点，但都在初中数学范畴以内。描述一个旋转操作比如：绕Z轴（z轴坐标不用变了）旋转b角度（角度的正负按照右手法则旋转，大拇指指向轴的正方形，其他手指的方向就是旋转的正方向（正值））。一顿简单的三角函数和差化积得到旋转后xy和旋转前xy的关系：

<iframe width="100%" height="430" src="//jsfiddle.net/todaylg/35br4q7m/10/embedded/result,js,css,html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

这样每次新的变换就重新求取一个新的关系式来实现是不科学的，所以。。。。。矩阵来袭。。。

### 变换矩阵：旋转

<iframe width="100%" height="430" src="//jsfiddle.net/todaylg/35br4q7m/11/embedded/result,js,css,html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

一开始定义的u_xformMatrix类型为mat4类型，也就是4x4矩阵。JavaScript并没有专门的表示矩阵的类型，所以使用的是Float32Array，在数组中存储矩阵的每个元素。这就有牵扯到一个问题，数组是一维的，但是矩阵是二维的。WebGL和OpenGL一样，矩阵元素是按列主序列排列的，也就是aeimbfjncgkodnlp这样来的，而不是按行主序的abcdef...

#### gl.uniformMatrix4fv(location,transpose,array)

* * *

| 参数 | 描述 |
| --- | --- |
| location | uniform变量的存储位置 |
| Transpose | 在WebGL中必须指定为false |
| array | 待传输的类型化数组，4x4矩阵按列主序存储在其中 |

用变换矩阵进行平移、缩放也都是一个套路：

<iframe width="100%" height="430" src="//jsfiddle.net/todaylg/35br4q7m/12/embedded/result,js,css,html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

不同于OpenGL提供了一系列有用的函数来帮助我们创建变换矩阵，WebGL没有提供矩阵函数，所以除了手动指定变换矩阵的每个元素外就是使用其他大佬的开源矩阵库了。

## Part 3

要同时得到gl\_Position和gl\_PointSize的信息的话我们有两种方法：

一种是再创建一个缓冲区对象，将数据写入缓冲区后分配给再创建的一个新的attribute变量，像这样：

<iframe width="100%" height="430" src="//jsfiddle.net/todaylg/35br4q7m/13/embedded/result,js,css,html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

另一种则是只使用一个缓冲区对象，但是里面的数据是坐标和尺寸交错尺寸的，这时候读取数据的时候就有讲究了，即gl.vertexAttribPointer()函数的第五个参数stride和第六个参数offset派上用场的时候了：

<iframe width="100%" height="430" src="//jsfiddle.net/todaylg/35br4q7m/14/embedded/result,js,css,html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

gl.vertexAttribPointer()之前有介绍过了，这里的stride参数代表去指定相邻两个顶点间的字节数，offset代表去指定缓冲区对象中的偏移量（即attribute变量是从缓冲区何处开始存储）直接看代码会好理解很多，就是（再配合size参数）指定了两套读取规则分别把数据读出即可。

通过从顶点着色器传数据到片元着色器来绘制颜色。之前:

```
'uniform vec4 u_FragColor;\n' + 
  'void main() {\n' +
  '  gl_FragColor = u_FragColor;\n' +
  '}\n';
```

通过uniform变量来将颜色信息传入片元着色器，但是uniform是一致的而不是可变的，一个一个顶点传颜色也太蠢了。所以该到varying变量登场了，其作用是从顶点着色器向片元着色器传输数据：

<iframe width="100%" height="430" src="//jsfiddle.net/todaylg/35br4q7m/15/embedded/result,js,css,html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

只要片元着色器与顶点着色器用命名相同名字的varying变量数据就自动传过去了，将gl.drawArrays(gl.POINTS)改成gl.TRIANGLES，一个渐变的三角形就出现了！

<iframe width="100%" height="430" src="//jsfiddle.net/todaylg/35br4q7m/16/embedded/result,js,css,html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

贼漂亮，仅仅传了三个点的颜色怎么就能搞出一个渐变的三角形呢？？这是什么情况呢？？为什么我们制定三角形的顶点颜色，WebGL就会自动在三角形表面产生颜色的平滑过渡呢？

顶点着色器和片元着色器之间有两个步骤：图形装配（将孤立的顶点坐标装配成几何图形，几何图形的类别由gl.drawArrays()函数的第一个参数决定）、光栅化（将装配好的几何图形转化为片元）。

也就是由孤立的顶点到几何图形（点、线、面）再由几何图形分解为片元这么个过程，光栅化结束后程序就开始逐片元调用片元着色器，对于每个片元，片元着色器计算出该片元的颜色写入颜色缓冲区，最后显示出结果。在笔记一中也画过彩色三角形，当时是直接指定了每一个片元的颜色画出来的,比如我们换换，不是直接指定每一片元的颜色，而是让颜色跟随片元所在位置而有所区别：

<iframe width="100%" height="430" src="//jsfiddle.net/todaylg/35br4q7m/17/embedded/result,js,css,html" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe>

其中的gl_FragCoord是WebGL的内置变量，其第一个和第二个分量表示片元在canvas坐标系中的坐标。

而使用varying变量完成内插则更为方便，根据顶点的颜色，WebGL会自你得改计算出线段上所有片元的颜色并且赋值到片元着色器中的varying
变量（即从0.0=>1.0、1.0=>0.0这样）。

## 纹理（Texture）

纹理映射的作用就是根据纹理图像，将之前光栅化的每个片元涂上合适的颜色，组成纹理图像的像素又称为纹素，每一个纹素的颜色都使用RGB或者RGBA格式编码。

那这个纹理映射到底是怎么个映射规则呢？首先得知道纹理坐标系统，左下角为（0.0，0.0），右上角为(1.0,1.0)不管多少x多少，都是这样。常常说的uv、st就是指纹理坐标。纹理映射的过程需要顶点着色器和片元着色器的配合：首先在顶点着色器中为每个顶点指点纹理坐标，然后在片元着色器中根据每个片元的纹理坐标从纹理图像中抽取纹素颜色:

<iframe width="100%" height="430" src="//jsfiddle.net/todaylg/35br4q7m/18/embedded/result,js,css,html" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe>

jsfiddle跨域的问题，图像加载不了。程序流程：首先顶点着色器中接收到顶点的纹理坐标，光栅化后传递给片元着色器，片元着色器根据片元的纹理坐标从纹理图像中抽取纹素颜色赋给当前片元，设置顶点的纹理坐标，加载纹理图像，加载完成后使用纹理。

结合程序来看，首先是将顶点坐标和其对应的纹理坐标写入缓冲区分配给变量，之后调用gl.createTexture创建纹理对象，低啊用gl.getUniformLocation从片元着色器获取uniform变量u_Sampler的存储位置，改变量用来接收纹理图像，之后是重头戏配置纹理的函数loadTexture:

```javascript

function loadTexture(gl, n, texture, u_Sampler, image) {
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // Flip the image's y axis
  // Enable texture unit0
  gl.activeTexture(gl.TEXTURE0);
  // Bind the texture object to the target
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Set the texture parameters
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  // Set the texture image
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

  // Set the texture unit 0 to the sampler
  gl.uniform1i(u_Sampler, 0);

  gl.clear(gl.COLOR_BUFFER_BIT);   // Clear 

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, n); // Draw the rectangle
}
```

我们一行行看。

在使用图像之前必须先对其进行Y轴翻转，因为WebGL纹理坐标系统中的t轴方向和PNG/BMP/JPG等格式图片的坐标系统的Y轴方向是相反的：

### gl.pixedStorei(pname,param)

* * *

| 参数 | 参数取值 | 描述 |
| --- | --- | --- |
| pname | gl.UNPACK\_FLIP\_Y_WEBGL | 对图形进行Y轴翻转，默认为false |
|  | gl.UNPACK\_PREMULTIPLY\_ALPHA_WEBGL | 将图像RGB颜色值的每一个分量乘以A，默认为false |
| param | 指定非0或0 |  |

翻转之后需要激活纹理单元，默认情况下WebGL至少支持8个纹理单元，一个单元负责管理一张纹理图象，使用纹理单元之前还需要调用gl.activeTexture来激活它：

### gl.activeTexture(texUnit)

* * *

| 参数 | 参数取值 |
| --- | --- |
| textUnit | 指定准备激活的纹理单元：gl.TEXTURE0/1/2/3... |

接下还需要告诉WebGL系统纹理对象使用的是哪种类型的纹理，在操作纹理对象之前我们还需要先绑定它，这和缓冲区很像。WebGL支持两种类型的纹理：gl.TEXTURE\_2D（二维纹理）、gl.TEXTURE\_CUBE_MAP（立方体纹理）

### gl.bindTexture(target, texture)

* * *

| 参数 | 参数取值 |
| --- | --- |
| target | gl.TEXTURE\_2D（二维纹理）或gl.TEXTURE\_CUBE_MAP（立方体纹理） |

texture | 表示绑定的纹理单元

这个方法开启纹理对象的通知将纹理对象绑定到纹理单元（已经用activeTexture激活了）上。

接下来还需要配置纹理对象的参数，以此来设置纹理图象映射到图形上的具体方法：怎么获取纹素颜色，怎么重复填充

### gl.texParameteri(target, pname, param)

* * *

| 参数 | 参数取值 |
| --- | --- |
| target | gl.TEXTURE\_2D（二维纹理）或gl.TEXTURE\_CUBE_MAP（立方体纹理） |
| pname | 纹理参数 |
|  | gl.TEXTURE\_MAG\_FILTER（纹理放大）默认值：gl.LINEAR |
|  | gl.TEXTURE\_MIN\_FILTER（纹理缩小）默认值：gl.NEAREST\_MIPMAP\_LINEAR（金字塔纹理，即原始纹理图像的一系列不同分辨率的版本） |
|  | gl.TEXTURE\_WRAP\_S（纹理水平填充）默认值：gl.REPEAT |
|  | gl.TEXTURE\_WRAP\_T（纹理垂直填充）默认值：gl.REPEAT |
| param | 纹理参数的值 |

这个方法吧param的值赋给绑定到目标的纹理对象的pname参数上。pname可以指定4个纹理参数：放大方法（gl.TEXTURE\_MAG\_FILTER）表示当纹理的绘制范围比纹理本身还大的时候怎么取纹素颜色，缩小方法（gl.TEXTURE\_MIN\_FILTER）小了的时候取纹素颜色，纹理水平填（gl.TEXTURE\_WRAP\_S）如何对纹理图像左侧或者右侧的区域进行填充，纹理垂直填充就是上下。

param由pname的不同也有不同的值可取：

放大和缩小可取：

| 取值 | 描述 |
| --- | --- |
| gl.LINEAR | 表示使用距离新像素中心最近的四个像素颜色值的加权平均作为新像素的值 |
| gl.NEAREST | 表示使用原纹理上距离映射后像素(新像素)中心最近(曼哈顿距离)的那个像素的颜色值（就是少了个加权平均） |

而对于水平和垂直填充则可使用:

| 取值 | 描述 |
| --- | --- |
| gl.REPEAT | 平铺式的重复纹理 |
| gl.MIRRORED_REPEAT | 镜像对称式的重复纹理 |
| gl.CLAMP\_TO\_EDGE | 使用纹理图形边缘值 |

接下来将纹理图像分配给纹理对象：

### gl.texImage2D(target, level, internalformat, format ,type, image)

* * *

| 参数 | 参数取值 |
| --- | --- |
| target | gl.TEXTURE\_2D（二维纹理）或gl.TEXTURE\_CUBE_MAP（立方体纹理） |
| level | 0(该参数为金字塔纹理准备的，不用金字塔纹理的话直接设置为0即可) |
| internalformat | 图像的内部格式 |
| format | 纹理数据的格式（必须与internalformat相同） |
|  | gl.RGB(比如图像是jpg的) |
|  | gl.RGBA(比如图像是png的) |
|  | gl.ALPHA |
|  | gl.LUMINANCE(灰度图像) |
| type | 纹理数据的类型 |
|  | gl.UNSIGNED_BYTE(无符号整型，每个颜色分量占据1字节，一般都用这个，其他是的用来压缩数据的) |
|  | gl.UNSIGNED\_SHORT\_5*6*5(RGB每个分量分布占据5，6，5比特) |
|  | gl.UNSIGNED\_SHORT\_4*4*4_4 |
|  | gl.UNSIGNED\_SHORT\_5*5*5_1 |
| image | 包含纹理图像的Image对象 |

这样Image对象中的图像就从JavaScript传入到WebGL系统中，并存储在纹理对象中了,而一旦纹理图像进入了WebGL系统，就必须将其传入片元着色器并映射到图形的表面上去，这时候可以用uniform来表示纹理（因为纹理图像不会随着片元变化），而因为是二维纹理，所以uniform变量的数据类型设为sampler2D

| 取值 | 描述 |
| --- | --- |
| sampler2D | 专用于绑定到gl.TEXTURE_2D上的纹理类型 |
| samplerCube | 专用于绑定到gl.TEXTURE\_CUBE\_MAP上的纹理类型 |

我们在获取了u\_Sample的存储地址后将其作为参数传给了loadTexture函数，最后我们必须通过制定纹理单元编号将纹理对象传给u\_Sample，也就是gl.uniformi的第二个参数为0。

终于，片元着色器可以访问到纹理图像了！！

之后使用老招数varying，通过attribute变量接收顶点的纹理坐标，然后通过varying传到片元着色器，顶点之间片元的纹理坐标也会在光栅化的过程中内插出来，这样就只需要根据片元的纹理坐标从纹理图像上抽取出纹素颜色，然后涂到当前的片元上即可。

最后的最后，我们只需要在片元着色器中从纹理图像上获取纹素的颜色：

### texture2D(sampler2D sampler, vec2 coord)

* * *

| 参数 | 参数取值 |
| --- | --- |
| sampler | 指定纹理单元编号 |
| coord | 指定纹理坐标 |

其返回值的格式由前面的gl.textImage2D()的internalformat参数决定：

| internalformat | 返回值 |
| --- | --- |
| gl.RGB | (R,G,B,1.0) |
| gl.RGBA | (R,G,B,A) |
| gl.ALPHA | (0.0,0.0,0.0,1.0) |
| gl.LUMINANCE | (L,L,L,1.0) |
| gl.LUMINANCE_ALPHA | (L,L,L,A) |

修改一下纹理坐标与顶点坐标使纹理图像不够大的情况（改一下gl.texParameteri的参数来决定怎么渲染即可）以及多幅纹理的情况（从两个纹理取出纹素颜色来计算最终的片元颜色即可：比如二者分量相乘（遮罩效果）），实例就不上了，jsfiddle跨域问题解决不了也显示不出结果。
