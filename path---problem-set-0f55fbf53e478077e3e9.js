webpackJsonp([0xd101c648d252],{393:function(t,n){t.exports={data:{post:{id:"/Users/lugang/My Github/LG-Blog-Gatsby/content/posts/2018-07-07--problem-set/index.md absPath of file >>> MarkdownRemark",html:'<h2>Vue工程结构目录及注意事项（18-7-1）</h2>\n<h3>Vue Document</h3>\n<p>好的基础开发结构可以大大便于之后的维护于拓展。</p>\n<div class="gatsby-highlight">\n      <pre class="language-html"><code class="language-html">.\n├── assets                            // 公共资源\n│   ├── api                            // 公共API\n│   ├── lib                            // 公共第三方库\n├── components                        // 公共组件\n├── pages                            // 页面集\n│   ├── page                        // 具体页面\n│   │   ├── common                    // 页面公共资源\n│   │   ├── components                // 组件（不含业务代码）\n│   │   ├── containers                // 根据业务代码对组件进行整合形成的容器,\n                                    // 包含自身的数据管理\n│   │   ├── store                    // 数据模块化分散至容器\n│   │   ├── router                    // 路由分配\n├── app.vue/js/html                    // 入口</code></pre>\n      </div>\n<p>因为之前使用Vue都是赶时间所以Store没有进行过模块化，组件拆得也不够细（业务和纯组件能解构还是要解耦滴），通常components直接替代掉了containers这一层，有时间讲道理还是要解耦的。</p>\n<h3>注意事项</h3>\n<h4>自定义指令及过滤器</h4>\n<p>自定义指令着实是没有用到过，Vue.directive了解一下。</p>\n<p>过滤器是自个给忘了，Vue.filter复习一下。</p>\n<h4>易忽视的测试点</h4>\n<p>写了测试用例讲道理是要照用例完完全全过一遍对，但是老是会对一些细枝末节的地方有所忽略。</p>\n<p>1.这辈子请别再用”+”这样拼接字符串啦！</p>\n<p>2.除非是万不得已，别用setTimeInterval！！！并且切记与clear是同生共死的！</p>\n<p>3.没有一种初始值叫做undefined！却有一种赋值叫做99999999*n。请容错！</p>\n<p>自己用的场景还是偏少，所以命令根本记不住。。。备忘把常用的简单指令记一下。</p>\n<h2>VIM基本操作备忘（18-7-7）</h2>\n<h3>基本移动</h3>\n<table>\n<thead>\n<tr>\n<th align="left">h</th>\n<th align="left">j</th>\n<th align="left">k</th>\n<th align="left">l</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td align="left">⬅️</td>\n<td align="left">⬇️</td>\n<td align="left">⬆️</td>\n<td align="left">➡️</td>\n</tr>\n</tbody>\n</table>\n<hr>\n<table>\n<thead>\n<tr>\n<th align="center">H</th>\n<th align="center">本屏首行</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td align="center"><strong>L</strong></td>\n<td align="center"><strong>本屏末行</strong></td>\n</tr>\n</tbody>\n</table>\n<hr>\n<table>\n<thead>\n<tr>\n<th align="center"><strong>o</strong></th>\n<th align="center"><strong>这一行的最前处</strong></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td align="center"><strong>$</strong></td>\n<td align="center"><strong>这一行的最末尾</strong></td>\n</tr>\n</tbody>\n</table>\n<hr>\n<table>\n<thead>\n<tr>\n<th align="left"><strong>G</strong></th>\n<th align="left"><strong>移动到整个文档最后一行</strong></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td align="left"><strong>gg</strong></td>\n<td align="left"><strong>移动到整个文档首行，相当于1g</strong></td>\n</tr>\n<tr>\n<td align="left"><strong>n+Enter</strong></td>\n<td align="left"><strong>向下移动n行</strong></td>\n</tr>\n<tr>\n<td align="left"><strong>nG</strong></td>\n<td align="left"><strong>跳转到第n行</strong></td>\n</tr>\n</tbody>\n</table>\n<hr>\n<h3>搜索替换</h3>\n<hr>\n<table>\n<thead>\n<tr>\n<th align="left"><strong>/word</strong></th>\n<th align="left"><strong>在文档中向下搜索’word’</strong></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td align="left"><strong>?word</strong></td>\n<td align="left"><strong>在文档中向上搜索’word’</strong></td>\n</tr>\n<tr>\n<td align="left"><strong>n/N</strong></td>\n<td align="left"><strong>按下Enter搜索完后显示下/上一个匹配项</strong></td>\n</tr>\n<tr>\n<td align="left"><strong>:1,$s /word1/word2/g</strong></td>\n<td align="left"><strong>全文替换</strong></td>\n</tr>\n</tbody>\n</table>\n<hr>\n<h3>删除</h3>\n<hr>\n<table>\n<thead>\n<tr>\n<th align="left"><strong>x/X</strong></th>\n<th align="left"><strong>向前/后删除一个字符</strong></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td align="left"><strong>dd</strong></td>\n<td align="left"><strong>删除整行（ndd）</strong></td>\n</tr>\n<tr>\n<td align="left"><strong>yy</strong></td>\n<td align="left"><strong>复制整行（nyy）</strong></td>\n</tr>\n<tr>\n<td align="left"><strong>p/P</strong></td>\n<td align="left"><strong>粘贴在光标上/下一行处</strong></td>\n</tr>\n</tbody>\n</table>\n<hr>\n<h3>撤销</h3>\n<hr>\n<table>\n<thead>\n<tr>\n<th align="left"><strong>u</strong></th>\n<th align="left"><strong>复原上一个动作</strong></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td align="left"><strong>ctrl+r</strong></td>\n<td align="left"><strong>重做上一个动作</strong></td>\n</tr>\n</tbody>\n</table>\n<hr>\n<h3>模式</h3>\n<hr>\n<table>\n<thead>\n<tr>\n<th align="left"><strong>:w</strong></th>\n<th align="left"><strong>保存</strong></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td align="left"><strong>:w!</strong></td>\n<td align="left"><strong>强存（权限问题）</strong></td>\n</tr>\n<tr>\n<td align="left"><strong>:q</strong></td>\n<td align="left"><strong>退出</strong></td>\n</tr>\n<tr>\n<td align="left"><strong>:q!</strong></td>\n<td align="left"><strong>强退（不保存）</strong></td>\n</tr>\n<tr>\n<td align="left"><strong>:wq</strong></td>\n<td align="left"><strong>保存完走</strong></td>\n</tr>\n</tbody>\n</table>\n<hr>\n<h2>CSS问题集（18-7-14）</h2>\n<p>丢了CSS一段时间后突然拿起来用发现一下懵圈了。。。一些原来很基本的问题都忘完了。。把遇到的问题记一下，捡一捡吧。。</p>\n<h4>层级问题</h4>\n<iframe width="100%" height="420" src="https://code.h5jun.com/junor/3/edit?html,css,output" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe>\n<p>相关：<a href="https://www.zhangxinxu.com/wordpress/2016/01/understand-css-stacking-context-order-z-index/">层级</a>、<a href="https://www.zhangxinxu.com/wordpress/2011/08/css%E7%9B%B8%E5%AF%B9%E5%AE%9A%E4%BD%8D%E7%BB%9D%E5%AF%B9%E5%AE%9A%E4%BD%8D%E4%BA%94%E4%B9%8Bz-index%E7%AF%87/">z-index</a></p>\n<h4>图片文字垂直居中</h4>\n<iframe width="100%" height="420" src="https://code.h5jun.com/junor/1/edit?html,css,output" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe>\n<p>相关：<a href="https://www.zhangxinxu.com/wordpress/2015/08/css-deep-understand-vertical-align-and-line-height/">这里</a></p>\n<h4>多行文本与单行文本垂直居中</h4>\n<iframe width="100%" height="420" src="https://code.h5jun.com/junor/2/edit?html,css,output" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe>\n<h2>神奇的JSONP（18-7-29）</h2>\n<p>遇见了一个较为特殊的场景：</p>\n<p>在短时间内（几乎同时），连续发起两次jsonp跨域请求一个有CDN的后端接口（cache为true），几乎必现首次请求失败(走error回调)，后次请求成功（走success回调），神奇的是NetWork显示请求只发出了一次，看起来就像jsonp直接处决掉了首次请求。。。换为cache:false（加时间戳）后两次请求正常，单次请求也正常，换用CORS也正常。</p>\n<p>也可能是JQ的坑，待研究。</p>\n<p>还有个webpack打包完以后window下的全局函数访问不了的问题- -也记一下</p>',fields:{slug:"/problem-set/",prefix:"2018-07-07"},frontmatter:{title:"备忘册",author:"todaylg",category:"备忘",cover:{childImageSharp:{resize:{src:"/LG-Blog-Gatsby/static/test5-6e63f45c61cd9143a38fd80960b786f7-160fa.png"}}}}},authornote:{id:"/Users/lugang/My Github/LG-Blog-Gatsby/content/parts/author.md absPath of file >>> MarkdownRemark",html:"<p><strong>todaylg</strong> </p>"},site:{siteMetadata:{facebook:{appId:""}}}},pathContext:{slug:"/problem-set/",prev:{id:"/Users/lugang/My Github/LG-Blog-Gatsby/content/posts/2018-07-01--webVR-and-web-audio-api/index.md absPath of file >>> MarkdownRemark",fields:{slug:"/webVR-and-web-audio-api/",prefix:"2018-07-01"},frontmatter:{title:"初探WebVR与Web Audio API",category:"大结"}}}}}});
//# sourceMappingURL=path---problem-set-0f55fbf53e478077e3e9.js.map