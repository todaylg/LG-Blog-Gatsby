---
title: 基础知识备忘（Vue、VIM、Sass）
category: "备忘"
cover: test1.jpg
author: todaylg

---

## Vue工程结构目录及注意事项

#### Vue Document

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

#### 注意事项

#### 自定义指令及过滤器

自定义指令着实是没有用到过，Vue.directive了解一下。

过滤器是自个给忘了，Vue.filter复习一下。



## VIM基本操作备忘

自己用的场景还是偏少，所以命令根本记不住。。。备忘把常用的简单指令记一下。

#### 基本移动

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

#### 搜索替换

---

| **/word**                | **在文档中向下搜索'word'**        |
|:------------------------ |:------------------------- |
| **?word**                | **在文档中向上搜索'word'**        |
| **n/N**                  | **按下Enter搜索完后显示下/上一个匹配项** |
| **:1,$s /word1/word2/g** | **全文替换**                  |

---

#### 删除

---

| **x/X** | **向前/后删除一个字符**  |
|:------- |:--------------- |
| **dd**  | **删除整行（ndd）**   |
| **yy**  | **复制整行（nyy）**   |
| **p/P** | **粘贴在光标上/下一行处** |

---

#### 撤销

---

| **u**      | **复原上一个动作** |
|:---------- |:----------- |
| **ctrl+r** | **重做上一个动作** |

---

#### 模式

---

| **:w**  | **保存**       |
|:------- |:------------ |
| **:w!** | **强存（权限问题）** |
| **:q**  | **退出**       |
| **:q!** | **强退（不保存）**  |
| **:wq** | **保存完走**     |

<hr>

## Sass基础

Sass也好Less也好，总还是要学习一个的，虽然自己平时整的小东西可能还是直接用CSS还更简单，但是要是项目大了以及要考虑便于维护的情况下，那还是得用这两的啦。

#### 变量

Sass用‘$’符来标识变量（‘$’向来是兵家必争之地啊2333），Sass中的变量值可以是任何CSS中的标准属性值（什么#FFF、solid、100px等等），值与变量名之间用':'冒号分隔，作用域则类似使用let声明(块之外定义即相当于全局变量) ,变量也可以引用其他变量,且变量可以和CSS的属性名或选择器名称相同，变量名相同后者覆盖前者，可以使用尾缀!default设定默认值，使用!important在局部声明全局变量 ：

```css
$testColor: red;    //全局
.test {
    $width: 100px;    //局部
    width: $width;
    color: $testColor;
}

//即相当于：

.test {
  width: 100px;
  color: red;
}
```

#### 嵌套

这个比较实用啊：

```css
$testColor: red;    
.test {
  p {color:$testColor}
  color: $testColor;
}

//即相当于：

.test {
  color: red;
}
.test p{
  color: red;
}
```

当然还支持嵌套嵌嵌套，嵌套的同级还可以写当级的普通CSS样式，非常好使。但是有些情况这招就不好使了：比如：

```css

$testColor: red;    
.test a{
  :hover {color: green}
  color: $testColor;
}
```

这时候是希望在.test后的a链接添上hover伪类，但是这么写就变成了a标签之后的所有子元素填上伪类了。要是普通的css我们这时候其实只要写：.test a:hover就完事了，但是这样就还得重复的多写一遍.test a{...}，所以这时候就得用&符号了，这个符号表示父选择器（虽然叫父级选择器，但是其实就是代表当前层级的选择器）：

```css

$test: red;
.test a{
  color:$test;
  &:hover{color:blue};
}

//就相当于
$test: red;
.test a{
  color:$test;
}
.test a:hover{
  color:blue;
}
```

但是& 必须出现在的选择器的开头位置（作为选择器的第一个字符），可以跟随后缀（因为编译时遇到&会直接替换）。

嵌套特性还可以结合群组选择器(子级选择器和同级选择器也是一样的)减少重复的代码：

```css
.test #p1,.test #p2,.test #p3 {color:blue}

//就可以这么写：
.test {
    #p1,#p2,#p3 {color:blue}
}
    对于CSS的属性也可以缩写从而减少代码量：
.test {
  border: 1px solid #ccc {
  left: 0px;
  right: 0px;
  }
}

//相当于：

.test {
  border: 1px solid #ccc;
  border-left: 0px;
  border-right: 0px;
}
```

#### @import

这个@import之前我都没见到用到过。。。可以在执行到@import时导入其他的CSS，Sass进行了优化，在编译的时候就把需要导入的文件导入打包，并且可以省略尾缀来导入，但是导入后不会全局有效（.css=>.scss）。

#### 注释

Sass支持CSS标准的/*...*/注释和//，但是默认情况下后者在打包的时候不会出现在生成的CSS文件中。

#### 混合器

混合器使用@mixin标识符定义，通过@include来使用，便于处理重复的统一样式：

```css

$test: red;
@mixin test{    //名称
  color:$test;
  &:hover{color:blue};
}
.test a{
  @include test;
}
```

混合器不仅可以包含普通属性，也可以包含CSS的各种选择器，结合&更是强的不行，是不是有种像函数的错觉？还没完，还可以传参！用@include调用的时候可以穿参数，这不就是function嘛- -：

```css

@mixin link-colors($normal, $hover, $visited) {
  color: $normal;
  &:hover { color: $hover; }
  &:visited { color: $visited; }
}

a {
  @include link-colors(blue, red, green);
}
//或者指定传参数值：
a {
    @include link-colors(
      $normal: blue,
      $visited: green,
      $hover: red
  );
}


//Sass最终生成的是：

a { color: blue; }
a:hover { color: red; }
a:visited { color: green; }

//类似ES6，还可以在定义参数的时设定默认值
@mixin link-colors(
    $normal,
    $hover: $normal,//默认就为$normal的值
    $visited: $normal//这样即使只传一个参数也可以
  )
{
  color: $normal;
  &:hover { color: $hover; }
  &:visited { color: $visited; }
}
```

#### 选择器继承

选择器继承即一个选择器可以继承另一个选择器下定义的所有样式。

```css
.error {
  border: 1px red;
  background-color: #fdd;
}
.seriousError {
  @extend .error;//继承
  border-width: 3px;
}

//就相当于：
.seriousError {
  border: 1px red;
  background-color: #fdd;
  border-width: 3px;
}
```

挺好用的对吧，麻烦的还没说呢：@extend .error后任何和.error有关的组合选择器也会被.seriousErro以组合选择器的形式继承，也就是拖家带口的全和你扯上关系了：

```css

.error a{  //也会应用到.seriousError a    
  color: red;
}
h1.error { //同样也会应用到hl.seriousError
  color: red;
}
```

所以这个继承可不能随便乱用，并且几乎所有的CSS规则都可以继承和被继承，且当继承一个复杂的选择器的时候继承的情况会乱七八糟。总的来讲，如果不出现在复杂的选择器里的话（情况会变复杂），选择器继承就相当于把样式表的任何一处.error都用.error .seriousError替换。
​

## 其他问题集合

#### 易忽视的测试点

写了测试用例讲道理是要照用例完完全全过一遍对，但是老是会对一些细枝末节的地方有所忽略。

1.别再用''+''拼接字符串啦！

2.定时器与clear要成对出现！

3.容错undefined！

#### CSS

丢了CSS一段时间后突然拿起来用发现一下懵圈了。。。一些原来很基本的问题都忘完了。。把遇到的问题记一下，捡一捡吧。。

##### 层级问题

<iframe width="100%" height="420" src="https://code.h5jun.com/junor/3/edit?html,css,output" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe>

相关：[层级](https://www.zhangxinxu.com/wordpress/2016/01/understand-css-stacking-context-order-z-index/)、[z-index](https://www.zhangxinxu.com/wordpress/2011/08/css%E7%9B%B8%E5%AF%B9%E5%AE%9A%E4%BD%8D%E7%BB%9D%E5%AF%B9%E5%AE%9A%E4%BD%8D%E4%BA%94%E4%B9%8Bz-index%E7%AF%87/)

##### 图片文字垂直居中

<iframe width="100%" height="420" src="https://code.h5jun.com/junor/1/edit?html,css,output" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe>

相关：[这里](https://www.zhangxinxu.com/wordpress/2015/08/css-deep-understand-vertical-align-and-line-height/)

##### 多行文本与单行文本垂直居中

<iframe width="100%" height="420" src="https://code.h5jun.com/junor/2/edit?html,css,output" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe>

### 神奇的JSONP

遇见了一个较为特殊的场景：

在短时间内（几乎同时），连续发起两次jsonp跨域请求一个有CDN的后端接口（cache为true），几乎必现首次请求失败(走error回调)，后次请求成功（走success回调），神奇的是NetWork显示请求只发出了一次，看起来就像jsonp直接处决掉了首次请求。。。换为cache:false（加时间戳）后两次请求正常，单次请求也正常，换用CORS也正常。

也可能是JQ的坑，待有空了再做研究。因为感觉Jsonp应该是被时代所淘汰的东西，研究一项注定被淘汰的技术总是没啥动力，比如Flash。。。。

还有个webpack打包完以后window下的全局函数访问不了的问题- -也记一下
