---
title: 个人主页开发小记
category: "小结"
cover: bg.jpg
author: todaylg
---

趁着有空，这些天又把主页更新了一波：

[todaylg.com](https://todaylg.com)

![image](https://github.com/todaylg/self-introduction/blob/master/intro/intro.gif)

把喜欢的几部动漫和游戏都整进去了，开心得一批哈哈哈

## Home Section

首先那必然是首屏的最终幻想7啦，其实之前并不了解最终幻想系列，直到看到了最终幻想7重制版的几个预告片，这Tifa和Aerith实在是太好看了，这谁顶得住，遂入坑。。。

于是把核心危机、原作、圣子降临一整套全部补了一遍，再加上良心重置版的Aerith二周目剧情，差点激动得猛男落泪。。。太难顶了。。。

咳咳。。。

这里两边的粒子效果是在[这篇文章](https://tympanus.net/codrops/2019/01/17/interactive-particles-with-three-js/)基础上进行改造得到的，不得不说[Codrops](https://tympanus.net/codrops/category/tutorials/)真心是个学习的好网站，强烈推荐！

之后下滑会切换到Anime的Section，这里Section之间的切换效果其实是通过：
* 两个场景渲染到两个RenderTarget上
* 将两个RenderTarget渲染到铺满全屏的两个plane上
* 通过屏幕的Y轴控制各个RenderTarget透明的部分即可

期间还遇到一个问题，就是Mac的触控板在用户疯狂抽搐滑动的情况，滚动事件会一直延后触发，即使节流也没得效果，暂时没找到好办法只能先拉倒了

## Anime Section

Anime这个Section强烈推荐了《宝石之国》(动画版)、《冰菓》、《命运石之门》三部动漫，其实想列的远远不止这几部好吧。。出于避免过多的图片资源才如此克制哈哈

宝石之国动画刚出的时候这三渲二的效果着实让人眼前一亮：

[Anitama解](https://www.bilibili.com/video/BV1Ux411L7SH?from=search&seid=12187598008364640836)

可惜后面剧情太黑了。。。漫画完全不推荐

冰菓和命运石之门都是纪念逝去的中二病，以前看完这两部动漫就老想着什么时候我的助手才会从其他世界性过来找我，什么时候才会有美少女喊着“我很好奇”然后贴我一脸。。。然而如今的我。。只渴望富婆。。。

<div style="text-align: center">  
<img style="width:70%;" src="https://raw.githubusercontent.com/todaylg/LG-Blog-Gatsby/master/content/posts/2020-7-01--hompage/fupo.jpg">  
</div>

咳咳。。。

这里几种几何图形的SDF计算全都直接扒拉的IQ大佬的总结：

http://www.iquilezles.org/www/articles/distfunctions2d/distfunctions2d.htm

只能说，IQ，永远滴神！

## Work Section

Work Section使的是《No Game No Life》，这番咋说呢，虽然很中二，但是看了就很燃很开心，中二那股劲上头的时候，再吼一嗓子：“得哇，game阿西勒麻秀！”，干劲直接拉满好吧，效率直接上升30个百分点都不是问题

更不要提剧场版《Zero》，别问，问就猛男落泪

咳咳。。。

这个PBR材质前面[Viewer的文章](http://todaylg.com/LG-Blog-Gatsby/viewer-pbr/)已经详述了，这里就不再重复了

## About Section

Work Section上的是《一拳超人》，直接吹爆好吧，饿狼篇最后对兴趣的讨论至今让我印象深刻，“妥协的兴趣与认真的兴趣”，直击灵魂，简直就是灵魂拷问。。。吹爆！

咳咳。。。

剩下也没啥了。。就一个Blur前面也有文章记录过了。

## 总结

回看主页这些年的变化：

* 2017：2D的一个中二的[视差效果页面](https://todaylg.com/LG_Parallax/)
* 2018: 2D结合一堆音视频的中二[页面](https://todaylg.com/WebAMV/What_Anime_Mean_To_Me/)
* 2019：一堆音视频开始混入一个3D樱花的中二[页面](http://todaylg.github.io/WebAMV/Keep_Going/)

最后到今年3D的中二[页面](https://todaylg.com)。

时间在变，唯独中二没变。但是岁月不饶人啊，纸片人老婆又不能结婚（叹气）

只能朝天空大喊一声：“这是我最后的波纹了！”

Rua!

