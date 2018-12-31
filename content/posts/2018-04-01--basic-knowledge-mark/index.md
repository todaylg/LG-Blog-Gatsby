---
title: 基础知识备忘（正则、Git、Flex）
category: "备忘"
cover: test7.jpg
author: todaylg


---

## 正则表达式基础

> 正则表达式是用于匹配字符串中字符组合的模式。嗷嗷有用。在 JavaScript中，正则表达式也是对象。

这些模式被用于 RegExp的

- exec()（一个在字符串中执行查找匹配的RegExp方法，它返回一个数组（未匹配到则返回null）。）

- test() （一个在字符串中测试是否匹配的RegExp方法，它返回true或false。）。

以及 String 的

- match()（一个在字符串中执行查找匹配的String方法，它返回一个数组或者在未匹配到时返回null。）

- replace()（一个在字符串中测试匹配的String方法，它返回匹配到的位置索引，或者在失败时返回-1。）

- search()（一个在字符串中执行查找匹配的String方法，并且使用替换字符串替换掉匹配到的子字符串。）

- split() （一个使用正则表达式或者一个固定字符串分隔一个字符串，并将分隔后的子字符串存储到数组中的String方法。）

#### 创建正则表达式

在JavaScript中可以通过两种方法来创建一个正则表达式：

1.使用一个正则表达式字面量

```javascript
var re = /pattern/flags;
const regex = /ab+c/;
const regex = /^[a-zA-Z]+[0-9]*\W?_$/gi;
```

2.调用RegExp对象的构造函数

```javascript
var re = new RegExp("pattern", "flags");
let regex = new RegExp("ab+c");
let regex = new RegExp(/^[a-zA-Z]+[0-9]*\W?_$, "gi");
let regex = new RegExp("^[a-zA-Z]+[0-9]*\W?_$", "gi");
```

其中的flags代表正则表达式标志，正则表达式有四个可选参数进行全局和不分大小写搜索。这些参数既可以单独使用也可以一起使用在任何顺序和包含正则表达式的部分中。

- g：全局搜索

- i：不区分大小写搜索

- m：多行搜索

- y：/y标识让一个未锚定的正则只在目标字符串的当前位置匹配成功或匹配失败./g或其他东西也会影响当前位置具体在哪里.但比起其他因素,/y是完全独立的(更底层)....(粘滞的意思就是"使用隐式的^锚点把正则锚定在了lastIndex所指定的偏移位置处")

#### 简单的模式匹配

1.匹配字符串字面值

```javascript
var val = "LG";
var reg = /LG/;    //就是简单的用字符串字面量查找
if(reg.test(val)){
    alert('验证通过');
}else{
    alert('验证未通过');
}
```

2.匹配数字

```javascript
\d
[0-9]  
[0123456789]    //虽然语法不一样，但是效果是一样的
```

3.匹配非数字

```javascript
\D
[^0-9] 
[^\d]
```

4.匹配单词和非单词

```javascript
\w    // \w只匹配字母数字和下划线  \D还会匹配空格、标点符号等字符  \w在英语环境下相当于 [_a-zA-Z0-9]
\W    // \W匹配非单词字符 相当于[^_a-zA-Z0-9]
```

5.匹配空白符

```javascript
\s    // \s相当于 [ \t\n\r] 也就是说\s会匹配空格、制表符、换行符、回车符 (不匹配换页符（\f）、水平空白符（\h）等特殊的空白字符)
\S
```

6.匹配任意字符

```javascript
.    //单个点号匹配任意字符
.*    //匹配零个或者多个字符
```

#### 边界

1.行的起始和结束

```javascript
^    //^会匹配行或者字符串的起始位置
$    //$会匹配行或者字符串的结束位置
举个例子：
var val = "LGdsadsadEnd.end";
var reg = /^LG.*End\.end$/;
if(reg.test(val)){
    alert('验证通过');
}else{
    alert('验证未通过');
}
```

2.单词边界与非单词边界

```javascript
\b    //\b匹配单词边界  比如\bLG\b \b和^与$一样是个零宽度断言
\B    //匹配非单词边界
```

3.\A和\Z匹配主题词的起始和结束（？？？）

4.使用元字符的字面值

```javascript
Q和\E之间的任意字符都会被解释为普通字符
\Q$\E    //会匹配$  （其实也可以在$前加\进行转义也是可以的）  //测试这个\Q和\E在JavaScript正则并不好使，还是用\进行转义吧
```

#### 选择、分组和后向引用

1.选择操作

```javascript
(the|The|THE)  //其实直接设置flag为i，即可忽略大小写的区别了j
```

2.子模式

```javascript
//其实(the|The|THE)也算是三个模式，但是这种情况下匹配第二个子模式不依赖于是否匹配第一个
(t|T)h(e|eir)    //这个情况第二个子模式(e|eir)就依赖于第一个子模式（tT）,它会匹配the The their Their
\b[tT]h[ceintry]*\b    //则匹配the thee thy等单词
```

3.捕获分组和后向引用

```javascript
一个正则表达式模式使用括号，将导致相应的子匹配被记住。例如，/a(b)c /可以匹配字符串“abc”，并且记得“b”。回调这些括号中匹配的子串使用数组元素[1],……[n]
var re = /(\w+)\s(\w+)/;
var str = "John Smith";
var newstr = str.replace(re, "$2, $1");    //[1]、\1都不好使
console.log(newstr);//这个表达式输出 "Smith, John"。
```

4.非捕获分组

```javascript
//不需要任何后向引用时
(?: x)    //匹配x但是不记住匹配项
```

#### 字符组

字符组就是\[\]，也叫方括号表达式。使用字符组可以匹配某个范围的字符：

```javascript
[a-z]、[0-9]
[\w\s]    //匹配空格和单词字符  等同于[_a-zAA-Z \t\n\r]
```

1.字符组取反

```javascript
[^a-z]    //^在字符组里的意义为取反
```

2.并集与差集

```javascript
[0-3[6-9]]    //匹配0到3之间的数字或者6到9之间的数字     //测试JavaScript不支持
[a-z&&[^m-r]]    //匹配a到z之间的字符，但是其中m到r之间的字符除外    //测试JavaScript不支持
```

#### 量词

1.贪心、懒惰和占用

量词自身是贪心的。贪心的量词会首先匹配整个字符串。尝试匹配时，它会选定尽可能多的内容，也就是整个输入量词首次尝试匹配整个字符串，如果失败则回退一个字符后再尝试。这个过程叫做回溯。它会每次回退一个字符，直到找到匹配的内容或者没有字符可尝试了为止。懒惰的量词则使用另一种策略，它从目标的起始位置开始尝试寻找匹配，每次检查字符串的一个字符，寻找它要匹配的内容。最后它会尝试匹配整个字符串。占有量词会覆盖整个目标然后尝试寻找匹配内容，但是它只尝试一次，不会回溯。

2.用*、+、？进行匹配（基本量词）

```javascript
.*    //它会以贪心的方式匹配主文本中的所有字符 正则表达式之后加*表示该正则表达式所匹配的文本接连出现任意次（包括零次）
9+    //+和*的区别在于+会寻找至少一个9，而*会寻找零个或者多个9
9？    //匹配零次或一次
```

3.匹配特定次数

```javascript
7{1}    //使用花括号可以限制某个模式在某个范围内匹配的次数，未经修饰的量词就是贪心量词。 会匹配第一次出现的7
7{1,}    //匹配一个或者多个7    相当于7+    同理7{0,}和7*也是相同的、7{0,1}和7？是相同的  还可以m到n次：7{3,5}匹配3到5个7
```

4.懒惰量词

如果紧跟在任何量词 *、 +、? 或 {} 的后面，将会使量词变为非贪婪的（匹配尽量少的字符），和缺省使用的贪婪模式（匹配尽可能多的字符）正好相反。

```javascript
9+    //匹配一个或者多个9
9+?    //变懒了，只匹配一个    //加了黑人问号（?）都变懒了，能不干就不干（匹配最少）

9？    //匹配零次或一次
9？？    //变懒了，一个都不匹配了
```

5.占用量词

```javascript
0.*+    //000xxx  可以匹配到，和贪婪好像一样
.*+0    //000xxx  不可以匹配到，因为不会回溯，一下就选定了所有输入，第一下没找到就不找了。
```

JavaScript正则表达式没有占有模式，只有贪婪和非贪婪（懒惰）模式，占有模式反而会报错。
 很多其他语言支持的正则表达式功能在JavaScript中不支持。
​

## Git常用指令

用过一段时间的Github客户端，感觉确实是简单粗暴有效，但是缺点也很明显：用到一些高级或者说是复杂一些的功能时就无能为力了，并且使用命令行自己也知晓每一步都在干啥，所以使用命令行还是利大于弊的

#### Git基本命令

- git init/git clone 初始化git仓库

- git status 查看仓库的状态（没事就输下）

- git add xxx 然后git commit -m 'test~'进行提交

- git log 查看所有的commit记录

- git branch查看分支及所在分支情况（默认是主分支master），新建分支为git branch xxx。删除分支为git branch -d xxx，强制删除为git branch -D xxx（分支还没合并就想直接删除就得用这个）. 注意：find . -name ".git" | xargs rm -Rf 可以删除git仓库。

- git checkout xxx。切换到xxx分支。5和6可以一步到位：git checkout -b xxx，新建并切换分支。

- git merge xxx。把xxx分支合并过来（合并到你输入这行命令时你所在的分支，如果是要合并到master分支你首先就要切换到master分支下再输入这行命令）

- git tag V1.xxx。新建一个标签，便于版本切换。（也就相当于版本库的一个快照）.git tag V1.xxx commitId(默认的是把标签打到最新提交的commit上的，也可以像这样指定commitId来打tag)。git show tagname可以查看标签信息。还可以创建带有说明的标签：-a指定标签吗，-m指定说明文字：git tag -a v1.0 -m ‘test~~’。-d还可以删除标签，至于更复杂的就先不提了，用到了再说。

#### Github

- Git/Github先配好SSH，之后：git remote add origin git@server-name:path/repo-name.git 关联一个远程库(后面的一串可以从github获得，origin是默认的名字)

- git pull origin master。将远程代码更新到本地，一般在push之前都先pull，这样不容易冲突。

- git push origin master。将本地代码推送到远程master分支。（第一次git push -u origin master推送master分支的所有内容）

#### 其他操作

- 每次commit都会产生一条log，log记录提交者的姓名和邮箱，这两条信息时可以更改的：git config --global user.name 'xxx'/git config --global user.email'xxx'.

- alias git config --global alias.xx xxxxx 可以进行简写。

- git config --global alias.lg "log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --date=relative" 之后输入git lg，重新排版的git log

- git config --global core.editor "vim" # 设置Editor使用vim（默认是Vi）

- git config --global color.ui true Git着色（好像默认就是着色的）

- git config --global core.quotepath false # 设置显示中文文件名

- git diff。查看修改的内容（以Unix同样的diff格式显示），直接输入git diff只能显示当前文件和暂存区文件的差别（也就是没有执行git add的文件），当然也还可以有其他的比较用法：git diff <$id1> <$id2>比较两次commit之间的差异、git diff <branch1> <branch2>比较两个分支之间差异、git diff --staged 比较暂存区和版本库之间的差异。

- git checkout -- index.html(这个--怎么有没有都可以啊？？)。checkout除了切换分支还有个作用是撤销（即使是文件删除了也可以撤销回来），对于还没有进行git add的更改，可以使用checkout进行撤销改动，直接把文件还原(若是已经add了的，则用：git reset HEAD index.html)。

- git stash。将当前分支还没有commit的代码先暂存起来，这个时候git status就啥也没了，git stash list可以查看暂存的记录。这时候你就可以在源代码上直接修改并发布啥的而不用删除最开始写在上面的代码了。git stash apply即可还原代码，git stash drop删掉stash记录，就当一切都没有发生过。一部到位的是git stash pop可以代替apply和drop。git stash clear是直接清空。

- merge/rebase，两者都是合并，前者便于分清楚合并来源，后者按顺序重新排序整理改动，但是自然也就很难清晰的知道合并来源了。

- git commit -a --allow-empty-message -m '' 提交的时候输入空的说明。这个哈哈哈哈老爽了（客户端本来默认是必要参数）

#### 版本回退

- git lg显示出所有从开始道现在的所有commit记录，有了commitId在各个版本之间就可以随意串行了。

- git reset --hard。HEAD 回退到上一个版本

- git reflag。记录每一次的命令，可以看到之前版本的commitId，免得回到上一个版本之后回不去了（git log不会只会显示之前的版本信息）

- git reset --hard xxxxx。通过commitId就可以在任意版本之间自由切换了，这里commitId也不用输全，输个几位git自己就找到了。

- 没git add可以git checkout撤销，git add了还可以git reset -- file把暂存区的修改退回工作区，git commit了也还可以git reset --hard xxxxx进行版本回退，但是要是你git push到远程仓库了，那就只能gg了。

## Flex布局基础

传统的布局方案，无非就是position(或者float、fixed)结合方向定位以及display等来整，一来比较复杂容易乱，二来对于一些复杂的布局实现起来会有困难。而flex的出现大大简化了这一过程，所以以后一般能用flex布局的尽量全改用flex布局来整（现代浏览器都已支持）

#### 基本概念

Flex即弹性布局(Flexible Box)，父元素设置为flex布局后，子元素会自动成为其item，并且子元素的float、clear和vertical-align属性都会失效。

**理解flex最重要的个人觉得就是理解主轴(X轴)和副轴(Y轴)啦**,设想有了x和y轴，在二维(即平面)中还有什么布局是不能实现的呢？当然，也会有一些特殊的布局要求（比如倒序等等），这些再结合flex容器的一些属性，那么也是非常轻松的解决了

#### 属性

##### 容器(Box)属性

1.Flex-direction

该属性用于设置item的排列方向：

```
flex-direction:
row(defalut)：主轴为水平，起点为左端
row-reverse: 主轴为水平，起点为右端
column：主轴为垂直，起点为上端
colume-reverse：主轴为垂直，起点为下端
```

2.Flex-wrap

该属性设置当单行轴线容纳不下时的换行方式

```
flex-wrap:
nowrap(default):不换行(最多压缩到最小宽度)
wrap:换行
wrap-reverse:换行,但是第一行在下面
```

3.Justify-content

该属性定义item在主轴上的对齐方式（与轴的方向挂钩）

```
justify-content:
flex-start(defalut)：item们左对齐
flex-end：item们右对齐
center： item们居中对齐
space-between：item们两端到顶，剩下的间隔均分在每个item之间。
space-around：每个item两侧的间隔相等,可以理解为每个item的边距都相等（均分空隔）
```

4.Align-items

该属性自然就是定义副轴上的对齐方式了(也与轴的方向同步)

```
align-items:
stretch(defalut)：item们会按容器的高度拉伸(填满)。
flex-start：item们顶对齐。
flex-end：item们底对齐。
center：item们中心对齐。
baseline: item们基线对齐。//TODO
```

5.Align-center

该属性定义多根轴线(各个轴线不同设置但都听它的)的对齐方式(单轴线则此属性无效)

```
align-center:
stretch(defalut)：轴线按副轴进行拉伸(填满)。
flex-start：按副轴的起点对齐。
flex-end：按副轴的终点对齐。
center：按副轴的中点对齐。
space-between：以副轴两端到顶，轴线之间的间隔平均分布。
space-around：每条轴线两侧的间隔都相等。
```

6.Flex-flow

该属性就是flex-direction和flex-wrap的简写形式(以空格隔开)

```
row nowrap(defalut)
```

##### Item的属性

1.order

该属性定义item的排列顺序。数值越小越靠前(可以为负数，同级按排列顺序分先后)

```
order:0    (defalut)
```

2.flex-grow

该属性定义item放大几倍

```
flex-grow:0    (defalut)/*即不放大*/
```

3.flex-shrink

该属性定义item缩小几倍

```
flex-shrink:1(defalut)/*即不放缩小*/
```

4.flex-basis

该属性定义item占据主轴的多少(px),这样item就可以占据固定的空间了(剩下的空间再其他item再按设定的属性分)

```
flex-basis:auto(defalut)
```

5.flex

该属性是flex-grow, flex-shrink 和 flex-basis的简写

```
flex:0 1 auto(defalut)/*后两个属性可选，一般优先使用该属性而不是分开写*/
```

6.align-self

该属性用于单个item设置其特殊的对齐方式(覆盖align-item的设置)是flex-grow, flex-shrink 和 flex-basis的简写

```
align-self:auto(defalut)
```

## 其他问题集合

#### Mac重装系统方法

##### 事出有因

---

年久失修是一方面，我想更主要的原因则是装的乱七八糟的程序太多了，这下一升级10.12，结果直接就卡死了，再重启就已经GG了。为啥我说主要的原因还是装的程序太多造成的呢？因为在升级系统之前Dock栏就一直保持在7月份左右的图标图案了，我后来删除了Fiddler（Mac下Charles更好），开机Dock没有刷新反而是变成了问号❓，还有其他一些种种的预示比如什么AI装不上啊的就不多说了。。。。

总之重装好系统之后现在流畅得飞起，感觉机器又+1s了~

这回重装比较与以往普通的重装又麻烦了挺多，废话不多说了，做个笔记下回抢救的时候还能知道怎么整。。。

##### 崩溃导火索

---

升级最新版本。升级过程中卡死（等待了很久进度条也不动弹），只得强制重启，强制重启后会继续自动安装，无限死循环。

##### 解决过程

---

一般Mac重装有三种方法：

`方法一：`TimeMachine。
将备份盘连接到电脑后开机再选用备份盘里的备份恢复即可，这个方法最简单最有效，可以直接恢复到你当时备份的电脑的状态，真是一模一样，包括那时你开着什么程序打开了什么网页，就像时间机器一样，强得不行。

但是，一个很严重的问题：一个懒癌选手没事会去备份吗？？看了看备份盘里17年2月的系统，还是咬了咬牙，换个方法吧。。。

`方法二：`找个U盘当系统盘重装。
这个方法需要一个大于8g的U盘，然后去网上下载一个你想重新安装的Mac系统版本，具体的过程百度(在这种情况下google反而搜不到想要的结果。。)一下，过程还是也不复杂，但是这有一个查不到的坑！！！！就是你下载的版本不能比你RecoverHD的系统版本低。不然不管你怎么装都装不上，中途会冒出一个红色的🚫 宣告GG，因为我是升级新的系统过程中崩的，所以RecoverHD里记录的版本信息是10.12，比重装的系统10.11要高，现在想倒回10.11，这个方法就也不行了。。。还得再想其他办法。

`方法三：`网络重装。
这个方法比较吃网速，需要连入wifi直接下载系统来进行重装，开机按住commond+shift+R 强制进行网络重装(不然又会自动安装安不上10.12)，直接系统网络重装后会按照机器的年份自动下载相应的系统版本，也就是重新装上出厂时的版本，之后进入系统再App Store下载10.11,下载完成后再重新安装10.11，最后问题终于得以解决，并且系统流畅得不行~

##### 总结

---

首先，别给电脑瞎安软件，什么Angular、Xcode，不会的就不要装。
其次，会的变成了曾经会的就赶紧卸，像什么React、Ae。
最后，老老实实分个区给Timemachine，这样前面两条就不用管了~
