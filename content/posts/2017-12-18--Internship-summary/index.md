---
title: 实习小结
category: "小结"
cover: bg.jpg
author: todaylg
---

搁学校待了4年，总结出老师和学校的特点就是：出招为即时制，比如今天晚上通知你明天交作业，周一通知你周五答辩(要求使用的软件名字都没听过)等等。。。总是能打你个措手不及。。。不得已败倒在了期末一下亮出的课设+实训+考试阵容之下。。。结束了上学期的实习生活。

回到正题，实习期间学习了一直都想深入的SVG+Canvas+WebGL方面的知识，也很透彻的明白了炫酷效果后都是矩阵的狂欢的事实，一下感觉自己大学最对不起的老师就是线代老师(老师对不起我连您的名字都没记住。。。)

### SVG / Anime.js

实习刚开始的第一个任务是基于SVG+Anime.js制作一个Logo动画，具体的实现前面有篇笔记记录了，这里就不赘述啦。但是现在倒回去看有些值得注意的地方还是需要记一下：

1.Sketch的文件不向下兼容（AI则没有这个问题）。也就是一开始绘图要是用的正版，那么试用期完了以后想用破解版的打开需要保证破解版的版本高于或等于正版版本，**所以要用Sketch的话一开始就要用破解版的（有经济能力的请务必用正版！）。**

2.异步回调里的DOM操作注意添加DOM元素还是否存在的判断（容错不能少）。

3.有逻辑嵌套的地方代码注释一定要写详细和规范。。。不然倒回来看都怀疑是不是自己写的了。

### PixiJs / CreateJs / Cytoscape

两个H5 2D渲染框架PixiJs(Canvas+WebGL)、CreateJs(Canvas+WebGL)，一个基于Canvas的图形关系网框架Cytoscape(Canvas)。三者各有特点，还记得当时第一回见到PixiJs官网的液体云效果以及1万个粒子同时运动丝般顺滑的时候直接给吓跪了。。。因为之前对Canvas和WebGL的了解甚少，所以之后便开始入门学习这几个框架并以Cytoscape为目标基于PixiJs/CreateJs实现一些简单的功能（画圆画线画箭头，能拖能拉能放大），根本的目的是研究能否借助WebGLRenderer解决Canvas2DRenderer渲染渲染大数量节点的极限。

**但是一头扎进实践后把根本出发点给忘了。。。**

被PixiJs的液体云给震惊之后久久不能自已，就想着怼Pixi怼Pixi，沉浸在了画圆画线画箭头，能拖能拉能放大、画三角形、画贝赛尔曲线。。。画得不亦乐乎，数学不好还各种曲线救国，直到实现到文字的时候发现文字放大后失真（Pixi下处理Text是为每一个Text new一个Canvas2DRenderer来处理,之后相当于一个Sprite（Text类继承于Sprite类））所以采用Pixi无论在CanvasRenderer又或者是WebGLRenderer下表现都是一样的，放大就会失真。至于原生的Canvas2d Renderer处理文字为什么不失真，WebGL处理文字不失真是怎么实现的（Two.js）。。。还没能搞明白，只能暂做标记，留做Todo项。。

**(From：2019.12.31): https://threejs.org/docs/index.html#manual/en/introduction/Creating-text** 

这其实就暴露一个很致命的毛病：**没有充分的调研与方案就直接上手开始实现**。

在明确了根本目的的情况下，首要做的应该是做一些核心功能的简单测试，好好看看demo或者自己先做个简单的测试，这样早就能发现pixi的这个特点了，再评估自己能否解决这个问题，那就已经自己可以给出调研结果了。一头扎进去后直到碰墙壁了才想起自己的根本目的，白白浪费了那么多时间。

**实际着手实现是最后的阶段**

这应该是实习阶段自己总结最关键的问题，以后工作上一定要万分注意！！

换成CreateJS后，其处理文字用的原生的Canvas2d Renderer，可以保证不失真，但是自个的数学实在是怼不动Cytoscape那帮大佬写的代码(向数学家低头。。连扒都扒不动。。)，所以实现出来的性能反而还不如Cytoscape。。。。

所以还有一点：**数学很重要！数学很重要！数学很重要！**，数学的坑是务必要再补上的。

**(From：2019.12.31): 不想秃头的话要不还是算了吧** 

### D3-force / Dracular

其实分别代表的就是静态布局与动态布局，静态布局只要在初始渲染的时候计算一次就行，因为之后单个节点的运动不会影响到其他节点的位置，而动态布局则需要每一帧检测所有节点的位置是否有变动，发生变动之后其他节点也会收到影响。

需要注意的是Dracular布局是不支持自定义节点宽高的，所以节点是有宽高的话按照它的布局，在布局边缘的节点的边缘会出屏幕外。

D3-force的话在他的demo里面有一个force的测试演示，结合文档和demo就能搞清楚那几个力代表啥了:[地址](http://blockbuilder.org/steveharoz/8c3e2524079a8c440df60c1ab72b5d03)

### Dijkstra / DFS / Floyd

这三都是求最短路径的算法，Floyd最慢所以翻框架源码的时候都没见过它，反而是Dijkstra基本是必备的，基于DFS判断有没有环后还可以略作修改实现查找路径的功能。自己之前也着手用JS实现过[Dijkstra](https://github.com/todaylg/Dijkstra)，但后面一直没用上，所以差不多都给还回去了。。具体的关于图的数据结构以及相关的一系列算法也没研究得很明白。。。怕说错所以也不多说啦

所以书到用时方恨少啊：**算法很重要！算法很重要！算法很重要！**，这个坑也是早晚要补的！

**(From：2019.12.31): 不想秃头的话要不也算了吧** 

还有两点需要注意的：
1.写代码的时候能模块化的一定要模块化，不能模块化的也要想办法模块化提出去，实在提不出去了想想是不是这种写法有问题，总之就是尽可能的减少耦合度，这样可以给代码维护带来非常大的方便。

2.写之前务必先分析一下，不能一上手就是干，先罗列好需要实现的功能，以及未来可能要添加的一些功能，想想怎么写可以尽可能的让加功能的时候不用改太多代码。

最后一定要感谢我的Leader岩哥给予我的实习机会以及实习期间的悉心指导（没想到也是个老二次元。。逃）。

Rua~