---
title: 《WebGL编程指南》读书笔记
category: "读书流水"
cover: bg.jpg
author: todaylg
---
脑里还是有个挥之不去的3D梦呀~
## Part 1

万里长征的第一步吧。。。也不知道自己能走几步，毕竟底子真是差啊，但是奈何想搞的一些骚操作不上3D又没法实现出来，效果后面都是腿都跪麻的数学。。。难受。。。希望自己能坚持下去吧，总之先从入门的书开始吧~

先上一张渲染管线的图：
![image](http://wwwimages.adobe.com/content/dam/acom/en/devnet/flashplayer/articles/how-stage3d-works/fig02.jpg)

一些基本的概念记下来：

**着色器**：运行在GPU中负责渲染算法的程序。最常用的为顶点着色器和片元着色器。

**GLSL**: openGL Shading Language (Directx为Hight-Level Shading Language(HLSL))

**光栅化**："连续"的三维场景显示到"离散"（红绿蓝LED）的显示器上所经过的过程。

**片元**：和最终显示在屏幕上的像素很接近，但是是一对一或多对一的关系，片元能否显示为像素还需要经过深度测试、透明度测试等。

## 最短的WebGL程序：清空绘图区

说是清空，其实是用黑色填充了绘图区

<iframe width="100%" height="430" src="//jsfiddle.net/todaylg/35br4q7m/embedded/result,js,css,html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

一般都将上下文取名为gl，因为WebGL基于OpenGL ES，这样命名可以使WebGL与OpenGL ES中的函数名对应（gl.clearColor就相当于glClearColor这样），之后学习OpenGL的时候就能有印象了。

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

其他实例：

### Sierpinski

<iframe height='357' scrolling='no' title='Sierpinski' src='//codepen.io/todaylg/embed/gjjgXZ/?height=357&theme-id=0&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/todaylg/pen/gjjgXZ/'>Sierpinski</a> by todaylg (<a href='https://codepen.io/todaylg'>@todaylg</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### 重写ParticleLine

<iframe height='400' scrolling='no' title='WebGL\_Learning\_Day1' src='//codepen.io/todaylg/embed/GOwdWM/?height=307&theme-id=0&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/todaylg/pen/GOwdWM/'>WebGL\_Learning\_Day1</a> by todaylg (<a href='https://codepen.io/todaylg'>@todaylg</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>
