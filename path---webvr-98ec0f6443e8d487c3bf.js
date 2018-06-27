webpackJsonp([0xdae4f67458e1],{386:function(t,n){t.exports={data:{post:{id:"/Users/lugang/My Github/LG-Blog-Gatsby/content/posts/2018-06-26--webvr/index.md absPath of file >>> MarkdownRemark",html:'<p>借着毕设的机会，接触了一下WebVR和Web Audio API，以及通信本行的数字信号处理的知识。</p>\n<p>当年在DPS和高数课上流的口水化成了如今流下的泪水。。。内心不尽五味杂陈，<strong>技多不压身</strong>属实是有道理的呀，学的时候觉得没有用，用的时候才后悔没好好学，人家毕业扔课本，我却寄课本：高数、DSP、从隔壁计科借过来的四大门课本，缺的东西属实有点忒多了。。。</p>\n<p>回到正题，因为涉及的新东西有点多，所以小结拆分为3个部分，分别介绍<strong>WebVR</strong>、<strong>Web Audio API</strong>、<strong>音乐节奏检测</strong>。走你～</p>\n<h2>WebVR</h2>\n<p>因为穷和宅，在此之前一直没有体验过VR设备，就更别说啥VR开发了。印象里VR都是有钱人才能玩的东西，其实并不是这样，穷人也可以通过穷人版VR来进行VR体验，这穷人版VR就包括WebVR啦。</p>\n<h3>VR设备</h3>\n<p>为了避免一脸懵逼，我们先了解一下当前市面上的VR设备：</p>\n<p>目前主流的VR设备为头戴式VR设备，即VR头显，功能差异主要体现在以下方面：</p>\n<table>\n<thead>\n<tr>\n<th align="center">头显自由度</th>\n<th align="center">控制器自由度</th>\n<th align="center">供电</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td align="center">3自由度（旋转跟踪）</td>\n<td align="center">3自由度（旋转跟踪）</td>\n<td align="center">PC供电</td>\n</tr>\n<tr>\n<td align="center">6自由度（定位跟踪）</td>\n<td align="center">6自由度（定位跟踪）</td>\n<td align="center">移动设备供电</td>\n</tr>\n</tbody>\n</table>\n<p>旋转跟踪就是允许人们环顾四周或者旋转物体（所有VR头显都支持旋转跟踪），而定位跟踪则对用户在一定范围内的位置变化进行追踪。</p>\n<h4>穷人版VR头显</h4>\n<p>穷人版VR头显泛指使用手机作为头显显示器的设备，部分提供控制器，体验成本较低。</p>\n<p>最最便宜的Cardboard</p>\n<div style="text-align: center">  \n<img src="http://photocdn.sohu.com/20160108/Img433906043.jpeg">  \n</div>\n<p>高贵一点的Daydream</p>\n<div style="text-align: center">  \n<img src="https://img1.tuicool.com/3yARZbr.jpg!web">  \n</div>\n<p>穷人版VR头显设备之间的核心差别其实就在于镜片的好坏以及佩戴的舒适程度，显示效果的好坏以及性能高低取决于你的手机显示屏分辨率的高低和手机性能的高低。没有测试过4k屏，但是1920和2k屏手机的显示效果实测下来都不理想，颗粒状明显。总的来说，穷人版VR更适用于进行初步体验。</p>\n<h4>土豪版VR头显</h4>\n<p>土豪版VR头显不仅拥有为定位跟踪配置的硬件设备，并且头显配备了专用的显示器，渲染则是通过高GPU配置的PC进行，什么1080TI、四路泰坦啥的了解一下。总体来说，效果已较为理想。</p>\n<p>VIVE</p>\n<div style="text-align: center">  \n<img style="width:500px" src="https://media.wired.com/photos/5af4e6e53733a15a44c5d038/master/w_2400,c_limit/HEADER-HTC-Vive-Pro-Full-Kit-SOURCE-HTC_topart.jpg">  \n</div>\n<p>Oculus</p>\n<div style="text-align: center">  \n<img src="http://www.gamelook.com.cn/wp-content/uploads/2017/10/18-4.jpg">  \n</div>\n<p><strong>那到底WebVR是个啥呢？</strong></p>\n<p>一图胜前言：</p>\n<div style="text-align: center">  \n<img style="width:600px;" src="http://pazg80lq8.bkt.clouddn.com/WebVR%20Intro.png">  \n</div>\n<p>正如之前介绍的，当前VR设备种类繁多，生态圈处于支离破碎的状态，各个VR设备拥有各自的生态，比如应用商店、控制器等等，各个VR设备、操作系统之间又有着不同的开发规范，给用户及开发者的跨终端体验都带来了极大的不便。WebVR便孕育而出了，其最早由Mozilla所倡导，现由W3C组织来制定，如今已经成为了一种通用开放标准，它提供了统一的JavaScript API，使开发者可以获取VR设备的输入信息。跨终端不再需要付出庞大的工作量，只需要你的VR设备上装有一个支持WebVR的浏览器，是不是美滋滋。</p>\n<table>\n<thead>\n<tr>\n<th align="center">VR平台</th>\n<th align="center">浏览器支持</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td align="center">Cardboard</td>\n<td align="center">chrome</td>\n</tr>\n<tr>\n<td align="center">Dayream</td>\n<td align="center">chrome</td>\n</tr>\n<tr>\n<td align="center">GearVR</td>\n<td align="center">Oculus Carmel、Samsung Internet</td>\n</tr>\n<tr>\n<td align="center">Oculus Rift</td>\n<td align="center">Firefox、Chromium experimental分支</td>\n</tr>\n<tr>\n<td align="center">HTC Vive</td>\n<td align="center">Firefox、Chromium experimental分支、Servo</td>\n</tr>\n</tbody>\n</table>\n<h3>WebVR框架</h3>\n<p>WebVR开发依赖于WebGL，所以一般WebVR框架都是基于Three.js的。国外主要由谷歌和Facebook对WebVR生态布局，Facebook和火狐都开发了自己的WebVR框架，即<a href="https://github.com/facebook/react-360">React VR</a>和<a href="https://github.com/aframevr/aframe">A-Frame</a>。其中当数A-Frame最为知名，值得一提的是他的可视化调试面板是相当的牛，感觉都快整出Unity的感觉了。</p>\n<div style="text-align: center">  \n<img style="width:600px;" src="http://pazg80lq8.bkt.clouddn.com/%E6%8E%A7%E5%88%B6%E9%9D%A2%E6%9D%BF.png">  \n</div>',fields:{slug:"/webvr/",prefix:"2018-06-26"},frontmatter:{title:"毕设小结（一）",author:"todaylg",category:"小结",cover:{childImageSharp:{resize:{src:"/LG-Blog-Gatsby/static/test1-624801bc60c20c24e549b23c0c52cbe6-ada8c.jpg"}}}}},authornote:{id:"/Users/lugang/My Github/LG-Blog-Gatsby/content/parts/author.md absPath of file >>> MarkdownRemark",html:"<p><strong>todaylg</strong> </p>"},site:{siteMetadata:{facebook:{appId:""}}}},pathContext:{slug:"/webvr/",prev:{id:"/Users/lugang/My Github/LG-Blog-Gatsby/content/posts/2018-06-25--hello-world/index.md absPath of file >>> MarkdownRemark",fields:{slug:"/hello-world/",prefix:"2018-06-25"},frontmatter:{title:"Hello World!!",category:"废话集"}}}}}});
//# sourceMappingURL=path---webvr-98ec0f6443e8d487c3bf.js.map