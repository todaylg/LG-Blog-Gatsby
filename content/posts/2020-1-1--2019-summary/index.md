---
title: 2019小结
category: "小结"
cover: bg.png
author: todaylg

---

转眼2019就已过去，回顾这一整年真可谓是感慨万千。。。

过去一年里最重要的就是对学习方向的调整，算是自己从Web2D转向Web3D的一个转折点吧。转行大计算是正式迈出了夯实的第一步！Rua！

<div style="text-align: center">  
<img style="width:400px;" src="https://raw.githubusercontent.com/todaylg/LG-Blog-Gatsby/master/content/posts/2020-1-1--2019-summary/normal.jpg">  
</div>

在对一些基础知识学习以及一些瞎折腾(“LGL“)后，Threejs真香😂😂😂...

其实使用Threejs的ShaderMaterial/RawMaterial已经可以很方便编写自定义材质，还能复用一些它的ShaderChunk，再加上其强大的开源社区还可以帮你吸一吸踩坑的经验值，还是真香吧。。。

总之还得继续攒经验，等升级到大后期再想LGL吧。。。（比如结合ECS是不是会比较好？Flag）

之后又陆陆续续接触和学习了：

### 结合实时光追的钻石材质：

<div style="text-align: center">  
<img style="width:600px;" src="https://raw.githubusercontent.com/todaylg/LG-Blog-Gatsby/master/content/posts/2020-1-1--2019-summary/ring.png">  
</div>

这应该是Web3D目前渲染效果最好的钻石材质了。

按之前的印象，一看到光追就会挂钩到离线渲染，或者是类似[ray-tracing-renderer](https://github.com/hoverinc/ray-tracing-renderer/)这样全场景渐进式的光追渲染，没想到还可以这样部分式的结合应用，算是开了眼界了😂

感觉同样的思路应该还可以优化某些类型材质的渲染效果，感觉后面到了大后期也可以搞一搞（Flag）

### 离线预计算EnvMap的PBR渲染：

<div style="text-align: center">  
<img style="width:600px;" src="https://raw.githubusercontent.com/todaylg/LG-Blog-Gatsby/master/content/posts/2020-1-1--2019-summary/pbr.png">  
</div>

相比实时的[PMREM](https://github.com/mrdoob/three.js/pull/18004)，效果上属实更好，这里研究的是Sketchfab的底层[osgjs](https://github.com/cedricpinson/osgjs)和[envtools](https://github.com/cedricpinson/envtools)，迁移了一套渲染方案到Threejs，这个目前还只是搞了一点，希望今**年**能搞完并开源吧（Flag）

名字和格式规范都想好了😂😂😂：

three-envtool: 生成专用的.lgl环境贴图文件

three-viewer: 用于单个模型的展示，各种特性的实验

three-sketches: 灵魂画师的画廊！！！写代码的原动力！！！精神的港湾！！！

### 基于屏幕空间的次表面反射(SSSSS)：

<div style="text-align: center">  
<img style="width:600px;" src="https://raw.githubusercontent.com/todaylg/LG-Blog-Gatsby/master/content/posts/2020-1-1--2019-summary/dragon.png">  
</div>

这个也只整了一点，结合进上面的PBR材质以后和Sketchfab一对比真是瞬间无地自容。。。也希望今年能搞出满意的效果吧（Flag）

然后2019就这么没了。。。

**没了。。。**

坑深又学得慢，感觉自己也快没了。。。


希望自己2020年：

- [ ] ~~买彩票中头奖~~

- [ ] 学习量子波动阅读法，读Paper不再如此吃力，越读越快乐

- [ ] 清空技术债：手撕UE4，脚踢SketchFab，笑谈ShaderToy，闭眼Sketches

- [ ] 增加锻炼，头发乌黑浓密

2019总算是拿起了“画笔”，希望之后能早日积累够绘制脑中世界的“颜料”。

学特么的，Rua！














