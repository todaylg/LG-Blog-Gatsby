---
title: Blender快捷键备忘
category: "小结"
cover: bg.png
author: todaylg


---

建模是不可能建模的，这辈子估计都搂不完一个模型，只能了解一下，来勉强维持生活这样子。

当我们在[Sketchfab](https://sketchfab.com/)上苦寻想要的模型无果时，或是找到了模型想要做些动画时。。。

这时我们要是对建模软件有所了解的话，就可以自己动手丰衣足食。比如建个简单的模型、绑个骨骼K个动画啥的。

当然，能白嫖还是要白嫖，抖M专属才自己K帧。。

为啥选择[Blender](https://www.blender.org/)而不是Maya/3DMax呢？

首先是因为Blender很轻，可以理解为VSCode，缺啥可以通过插件来补啥。Maya/3DMax相当于WebStorm，大而全。

所以其实归根结底还是看心情。

Blender现在最新的版本是2.80，较之2.79更新的变化很大。。秉承着面向未来学习，所以了解下2.80版本。

开始试着使用建模软件才发现鼠标中键的舒适度原来这么重要。。。

## 常用快捷键

---

**视角调整**

* 滚动视角：**鼠标中键**

* 平移视角：**Shift+鼠标中键**

* 推拉视角：**滚动滚轮**

* 三视图()

* * **`键+鼠标**

  * 正视图：**小键盘 1**

  * 右视图：**小键盘 3**

  * 顶视图：**小键盘 7**

* 其他

* * 正交/透视视图：**小键盘 5**

  * 左右旋转视角：**小键盘 4/6**

  * 上下翻转视角：**小键盘 8/2**

* Cursor：

* * **shift+c键** 回归原点

  * **shift + s + 鼠标左键**

**新建物体**

* 添加物体：**Shift + A (Add)**

* 选中物体：**2.80默认为鼠标左键**

* 删除物体：**X键/Delete键（注意不是Backspace啊）**

**编辑模式 - 点线面（Tab键）**

* 编辑物体（**G键(Grab)**）

* * **鼠标左键**：确认修改

  * **鼠标右键**：撤销修改

  * **X键**：在X轴上移动物体

  * **Y键**：在Y轴上移动物体

  * **Z键**：在Z轴上移动物体

  * **Shift + Z键**：在除开Z轴以外的面(XY)移动物体

* 旋转物体（**R键(Rotate)**）

* * 与 Grab 相同

* 缩放物体（**S键(Scale)**）

* * 与 Grab 相同

* 其他

* * 挤出物体：**E键(Extrude)**

  * 倒角：**Crtl+B键**

  * * **鼠标滚轮**：细分

* * 环切：**Ctrl+R键**

  * 切割：**K键**

**渲染相关**

着色方式：

* **z键+鼠标**

## 编辑模式

---

Tab键可以切换到编辑模式

* 点-线-面的选择：**键盘1-2-3** （多选加Shift）

* 添加立方体

* 挤出

* * 整体挤出

  * 各自挤出

  * 法线方向挤出

  * Cursor朝向挤出

* 内插面（即面内插面）

* 倒角（光滑）

* 环切

* * 间隔环切（切面之间不相连）

* 切分

* * 切割（真·砍一刀）

* Poly Build

* Span

* 光滑

* * 随机

* 滑动边线

* * 顶点滑移

* 法向缩放

* * 推/拉

* 切变（Shear）

## 修改器

---

修改器的一个好处是对添加物体无副作用（非破坏性修改）

**生成**

* 阵列

* 倒角

* 布尔

* 精简

* 多级精度/表面细分

**形变**

* 置换

* 缩裹

### 动画模式

---

物体任何属性都可添加关键帧：

- 黄色：属性有动画且当前帧为关键帧

- 绿色：属性有动画且当前帧非关键帧

- 灰色：属性没有动画

骨骼动画在选中骨骼进入姿势模式后再K帧

MMD模型导入Blender之后

在顶点数据中可以进行表情K帧（Morph）