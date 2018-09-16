---
title: 备忘册
category: "备忘"
cover: test5.png
author: todaylg




---

## Vue工程结构目录及注意事项（18-7-1）

### Vue Document

好的基础开发结构可以大大便于之后的维护于拓展。

```html
.
├── assets                            // 公共资源
│   ├── api                            // 公共API
│   ├── lib                            // 公共第三方库
├── components                        // 公共组件
├── pages                            // 页面集
│   ├── page                        // 具体页面
│   │   ├── common                    // 页面公共资源
│   │   ├── components                // 组件（不含业务代码）
│   │   ├── containers                // 根据业务代码对组件进行整合形成的容器,
                                    // 包含自身的数据管理
│   │   ├── store                    // 数据模块化分散至容器
│   │   ├── router                    // 路由分配
├── app.vue/js/html                    // 入口
```

因为之前使用Vue都是赶时间所以Store没有进行过模块化，组件拆得也不够细（业务和纯组件能解构还是要解耦滴），通常components直接替代掉了containers这一层，有时间讲道理还是要解耦的。

### 注意事项

#### 自定义指令及过滤器

自定义指令着实是没有用到过，Vue.directive了解一下。

过滤器是自个给忘了，Vue.filter复习一下。

#### 易忽视的测试点

写了测试用例讲道理是要照用例完完全全过一遍对，但是老是会对一些细枝末节的地方有所忽略。

1.这辈子请别再用''+''这样拼接字符串啦！

2.除非是万不得已，别用setTimeInterval！！！并且切记与clear是同生共死的！

3.没有一种初始值叫做undefined！却有一种赋值叫做99999999*n。请容错！

自己用的场景还是偏少，所以命令根本记不住。。。备忘把常用的简单指令记一下。

## VIM基本操作备忘（18-7-7）

### 基本移动

| h   | j   | k   | l   |
|:--- |:--- |:--- |:--- |
| ⬅️  | ⬇️  | ⬆️  | ➡️  |

---

| H     | 本屏首行     |
|:-----:|:--------:|
| **L** | **本屏末行** |

---

| **o** | **这一行的最前处** |
|:-----:|:-----------:|
| **$** | **这一行的最末尾** |

---

| **G**       | **移动到整个文档最后一行**     |
|:----------- |:------------------- |
| **gg**      | **移动到整个文档首行，相当于1g** |
| **n+Enter** | **向下移动n行**          |
| **nG**      | **跳转到第n行**          |

---

### 搜索替换

---

| **/word**                | **在文档中向下搜索'word'**        |
|:------------------------ |:------------------------- |
| **?word**                | **在文档中向上搜索'word'**        |
| **n/N**                  | **按下Enter搜索完后显示下/上一个匹配项** |
| **:1,$s /word1/word2/g** | **全文替换**                  |

---

### 删除

---

| **x/X** | **向前/后删除一个字符**  |
|:------- |:--------------- |
| **dd**  | **删除整行（ndd）**   |
| **yy**  | **复制整行（nyy）**   |
| **p/P** | **粘贴在光标上/下一行处** |

---

### 撤销

---

| **u**      | **复原上一个动作** |
|:---------- |:----------- |
| **ctrl+r** | **重做上一个动作** |

---

### 模式

---

| **:w**  | **保存**       |
|:------- |:------------ |
| **:w!** | **强存（权限问题）** |
| **:q**  | **退出**       |
| **:q!** | **强退（不保存）**  |
| **:wq** | **保存完走**     |

<hr>

## CSS问题集（18-7-14）

丢了CSS一段时间后突然拿起来用发现一下懵圈了。。。一些原来很基本的问题都忘完了。。把遇到的问题记一下，捡一捡吧。。

#### 层级问题

<iframe width="100%" height="420" src="https://code.h5jun.com/junor/3/edit?html,css,output" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe>

相关：[层级](https://www.zhangxinxu.com/wordpress/2016/01/understand-css-stacking-context-order-z-index/)、[z-index](https://www.zhangxinxu.com/wordpress/2011/08/css%E7%9B%B8%E5%AF%B9%E5%AE%9A%E4%BD%8D%E7%BB%9D%E5%AF%B9%E5%AE%9A%E4%BD%8D%E4%BA%94%E4%B9%8Bz-index%E7%AF%87/)

#### 图片文字垂直居中

<iframe width="100%" height="420" src="https://code.h5jun.com/junor/1/edit?html,css,output" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe>

相关：[这里](https://www.zhangxinxu.com/wordpress/2015/08/css-deep-understand-vertical-align-and-line-height/)

#### 多行文本与单行文本垂直居中

<iframe width="100%" height="420" src="https://code.h5jun.com/junor/2/edit?html,css,output" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe>

## 神奇的JSONP（18-7-29）

遇见了一个较为特殊的场景：

在短时间内（几乎同时），连续发起两次jsonp跨域请求一个有CDN的后端接口（cache为true），几乎必现首次请求失败(走error回调)，后次请求成功（走success回调），神奇的是NetWork显示请求只发出了一次，看起来就像jsonp直接处决掉了首次请求。。。换为cache:false（加时间戳）后两次请求正常，单次请求也正常，换用CORS也正常。

也可能是JQ的坑，待有空了再做研究。因为感觉Jsonp应该是被时代所淘汰的东西，研究一项注定被淘汰的技术总是没啥动力，比如Flash。。。。

还有个webpack打包完以后window下的全局函数访问不了的问题- -也记一下
