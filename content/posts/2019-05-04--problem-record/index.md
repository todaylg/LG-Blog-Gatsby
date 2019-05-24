---
title: 日常踩坑小记
category: "小结"
cover: bg.jpg
author: todaylg
---

存放日常工作和学习过程中的一些踩坑记录~

## 踩坑总结：

### 兼容性：

**IE**

* IE8不支持transform、background-color

* IE9不支持transition、animation、linear-gradient

* IE不支持animation变化伪类content的动画

hack：

```css
\9     //IE6/IE7/IE8/IE9/IE10都生效 
\0     //IE8/IE9/IE10都生效，是IE8/9/10的hack 
\9\0   //只对IE9/IE10生效，是IE9/10的hack 

/* $.browser.msie && parseInt($.browser.version) === 8 */  
.IE8{   
   ... /* Only works in IE8 */  
}
```

条件注释：

```javascript
<!--[if IE]> 所有的IE可识别 <![endif]-->
<!--[if IE 10]> 仅IE10可识别 <![endif]-->

<!--[if lt IE 10]> IE10以下版本可识别 <![endif]-->
<!--[if gte IE 10]> IE10及以上版本可识别 <![endif]-->
```

IE下的背景透明方法：

```css
.testModal{
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#7F000000, endColorstr=#7F000000);
    background: rgba(0, 0, 0, .6);
}
```

**Chrome低版本（V31）：**

animation及transform需要添加前缀-webkit-，animationEnd事件也是同理(webkitAnimationEnd)。

**搜狗浏览器：**

图片src为空时会出现边框：

```css
.testArea img[src=""],

.testArea img:not([src]) {

  opacity: 0;
}
```

**H5滚动穿透**

可以先[参考文章](https://segmentfault.com/a/1190000012313337)

实测文章中的最终第三个方案中设置`position: fixed`时整个页面会回到顶端，虽然可以记录top值在关闭蒙层时还原top值，但若是蒙层本身带有透明度的话看着背景莫名其妙的变换会很变扭。

所以最终的完美方案还是引入[iScroll]([https://github.com/cubiq/iscroll](https://github.com/cubiq/iscroll)（iScroll使用[CSS实现滚动]([https://iiunknown.gitbooks.io/iscroll-5-api-cn/core.html](https://iiunknown.gitbooks.io/iscroll-5-api-cn/core.html)）

```javascript
//禁用多余滚动
new iScroll(this.$modalEle);
//再安心处理业务逻辑
['touchstart','click'].forEach(item =>{
  this.$modalEle.addEventListener(
    item,
    (e)=>{
      onClose();
      e.preventDefault();
      e.stopPropagation();
     }
   )
}
//modal的height最好设为100.1vh，+0.1不然少数机型(比如Vivo)底部白边
```

**APP交互坑合集**

* ios中H5和APP交互采用的是url shema的方式，所以location.href在短时连续多次执行时，会被浏览器默认只执行最后一次（所以发送多个命令的时，需添加间隔，确保多个location.href的操作不被覆盖）

* 微信内分享，只能分享当前URL

* CSS Filter滤镜在H5很耗性能

**CreateJs**

Createjs不支持IOS 8（1.0版本完全无法运行，0.8版本部分功能无法运行）

issue见 [https://github.com/CreateJS/EaselJS/issues/982](https://github.com/CreateJS/EaselJS/issues/982)

官方看起来已经是放弃治疗了，自己翻源码修或者换Pixi吧

**其他**

行高大于等于字体字号时在会因兼容性问题导致字体显示不全（PC比如360极速、H5如小米Max）

### 性能优化

**节流与防抖**

```javascript
/**
 * 节流函数（固定周期内，只执行一次动作）
*/
function throttle(fn, delay) {
  let preTime = Date.now();
  return function () {
    let now = Date.now();
    if(now - preTime>= delay){
        fn();
        preTime = Date.now();
    }
  }
}
$(window).resize(throttle(testFunction, 100))
/**

 * 防抖函数（事件触发时，周期内延迟执行，若重复触发，则重设周期，直至周期结束，执行动作）

*/

function debounce(timer, fn, delay) {

  return function () {

    clearTimeout(timer.id);

      timer.id = setTimeout(function () {

        fn();

      }, delay);

  }

}
$(window).resize(debounce(debounceTimer, testFunction, 100))
```

### React

注意setState与DOM实际更新时机是不同的，二者最好不要有强依赖关系

### 其他

**特殊字体**

引入特殊字体时可以只提取自己需要的字进行打包，以减小字体文件体积：

[ttf字体提取](https://github.com/ngdly/sfnttool)

但是需要注意在Window下，字体字号较小时（一般是小于16px时）会出现部分笔画不清。

---

**IOS下资源请求必须Https**

**WebSocket**

短时高并发（密度至秒级以内）的Socket推送，考虑性能需要丢弃部分同一时刻无法区分先后的消息。

容错需要多考虑一层跨天清零的情况（比如加票数增加容错只加不减，但是跨天清零时这个逻辑就不能用了）

**jQuery**

jQuery下用Model-Render的写法的话，需要注意render的时候需要同步变化的所有model数据（比如直接操作DOM更改的倒计时这种，可以用闭包变量同步数据）
