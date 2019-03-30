webpackJsonp([0x9c7731e53dab],{405:function(t,n){t.exports={data:{post:{id:"/Users/lugang/My Github/LG-Blog-Gatsby/content/posts/2017-06-25--http/index.md absPath of file >>> MarkdownRemark",html:'<p>通信工程搞软件真是举步维艰。。。唯一值得兴奋一点的是这学期好歹学个有用的计算机通信与网络（计网）然而毕竟是通信的计网。。老师从物理层讲到传输层就往后的就基本没涉及了。。。用了大概30分钟提了提了TCP/IP。。。这尼玛。。结果还是得自己来呀。。。准备先补本基础的书，这是第一本的笔记。既然身为通信人，还是好好研究研究通信吧。</p>\n<p>在开始读书笔记之前，先提问一个有意思的问题：当你在浏览器的地址栏输入URL按下回车之后都发生了啥？</p>\n<p>这个问题在github上就有比较详细的解答：<a href="https://github.com/alex/what-happens-when%5C">https://github.com/alex/what-happens-when\\</a>](<a href="https://github.com/alex/what-happens-when">https://github.com/alex/what-happens-when</a></p>\n<p>回答中将期间的每个过程都做了简要的介绍，但也因为是简要介绍所以没有对整个过程有完整详细的说明，突然出现的一些专有名词也是吓得我瑟瑟发抖。。。所以之后的相关笔记都会结合着这个问题做相关的讨论。OK，AV GO~</p>\n<h2>Web及网络基础</h2>\n<hr>\n<p>计算机与网络设备需要通信，双方就必须按照统一的标准来。不同的硬件、操作系统之间的通信都需要一种规则，而我们就把这种规则称为 <strong>协议(protocol)</strong> ,在理解HTTP之前我们得先了解一下TCP/IP协议族，通常使用的网络就是在TCP/IP协议族的基础上运作的，HTTP属于他内部的一个子集。当接收端的服务器在链路层接收到数据，按序往上层发送，一直到应用层。当传输到应用层才能算真正接收到由客户端发送过来的HTTP请求。</p>\n<h3>与HTTP关系密切的协议</h3>\n<p>IP、TCP、DNS与HTTP可谓是密不可分：</p>\n<h4>1.负责传输的IP协议</h4>\n<p>IP（Internet Protocol）位于网络层（几乎所有使用网络的系统都会用到IP协议），简要来说其作用是把各种数据包传送给对方，而你传送总得需要一个地址，所以必不可缺的两个重要条件：IP地址以及MAC地址。IP地址指明了节点被分配到的地址，MAC地址则是网卡所属的固定地址，二者可以配对（IP地址可变但是MAC地址一般都是不变的了）。而IP间的通信由依赖于MAC地址，因为通信的双方基本不会在同一局域网（LAN）内，通常需要经过多台计算机和网络设备中转才能连接到对方。而进行中转的时候，会利用下一站中转设备的MAC地址来搜索下一个中转目标。ARP（Address Resolution Protocol）就是用以解析地址的协议，它可以根据通信方的IP地址反查出对应的MAC地址，其中中转过程用到的路由选择机制可以理解为寄快递，你填了个目标地址，剩下的过程集散中心会自动判断。</p>\n<h4>2.确保可靠性的TCP协议</h4>\n<p>TCP位于传输层，提供可靠的字节流服务（将大块数据分割成以报文段为单位的数据包方便传输，并且能够确认数据是否到达），为了确认数据是否到达目标处，TCP采用三次握手、四次挥手的策略。</p>\n<h3>3.负责域名解析的DNS服务</h3>\n<p>提供域名到IP地址之间的解析服务，这个就没啥好说的了</p>\n<h4>URI</h4>\n<p>地址栏的URL（Uniform Resource Locator,统一资源定位符）就是URI（Uniform Resource Identifier,统一资源标识符）子集，URI表示由某个协议方案表示的资源定位标识符，即用字符串标识某一互联网资源，而URL表示资源的地点（互联网上所处的位置），URL其格式：首先是协议类型（比如http、https等）、登录信息（可选，没见过。。。）、服务器地址（或者是DNS能解析的名称）、服务器端口号（没有就用默认端口号）、带层次的文件路径、查询字符串、片段标识符。</p>\n<p>二者关系：locators are also identifiers, so every URL is also a URI, but there are URIs which are not URLs</p>\n<h2>简单的HTTP协议</h2>\n<hr>\n<p>进入正题啦，HTTP协议用于客户端和服务器之间通信，也就是如果两台计算机使用HTTP协议进行通信，那么在一条通信线路上必然有一端是客户端，另一端是服务器端（虽然有时候角色可能会互换）。二者通过请求和响应的交换达成通信。那请求报文与响应报文里是什么情况？</p>\n<p>光说不练假把式呀，抓个包便一目了然，抓包工具推荐三：Wireshark、Charles、Fiddler。我原来是用Wireshark的，界面简洁功能罗列清晰，但是比较伤的是不提供修改请求的功能，所以我转而用了下Fiddler，但是Fiddler没得Mac版的（Mono不算），最后换成了Charles，这个嗷嗷好用的，搁这推荐一下（其实用Chrome devtool network也可以直接看报文）。</p>\n<p>请求报文由请求方法、请求URL、协议版本。可选的请求首部字段和内容实体构成。响应报文一般由协议版本、状态码、用以解释状态码的原因语句，可选的 响应首部字段以及实体主体构成。稍后会对报文中的内容做详细的解释。</p>\n<p>需要注意的是HTTP是不保存状态的协议，对于发送过的请求或响应都不做持久化处理，为了实现期望的保持状态的功能，于是引入了Cookie技术。</p>\n<h3>HTTP方法</h3>\n<h4>Get</h4>\n<p>Get方法用来请求访问已被URI识别的资源，指定的资源经服务器端解析后返回响应内容。</p>\n<h4>Post，</h4>\n<p>Post方法用来传输实体的主体（虽然Get方法也可以传，但是一般不用Get传）</p>\n<h4>Put</h4>\n<p>Put方法用来传输文件（像FTP一样），要求在请求报文的主体中包含文件内容，然后保存到请求URL指定的位置。（由于HTTP/1.1的Put方法不带验证机制，任何人都可以上传文件，存在安全性问题，一般不用这个方法）。</p>\n<h4>Head，</h4>\n<p>Head方法和Get方法一样，只是不返回报文主体部分，用于确认URI的有效性及资源更新的日期时间等。</p>\n<h4>Delete</h4>\n<p>Delete方法用来删除文件，是与Put相反的方法，但是也是一样存在安全性的问题所以一般不用（除非自己在应用程序中添加验证）。</p>\n<h4>Option</h4>\n<p>Option方法用来查询针对请求URI指定的资源支持的方法，比如CORS会先发一个Options请求。</p>\n<h4>Trace</h4>\n<p>Trace方法用来确认连接过程中发生的一系列操作（基本不用，容易引发XST（Cross-Site Tracing,跨站追踪攻击））。</p>\n<h4>Connect</h4>\n<p>Connect方法要求在与代理服务器通信时建立隧道，实现用隧道协议进行TCP通信（主要用于SSL、TLS协议把通信内容加密后经网络隧道传输）。</p>\n<p>其实一般只接触到Get、Post，剩下的方法很少用到了。</p>\n<h3>持久连接</h3>\n<p>在HTTP协议的初始版本中，每进行一次HTTP通信就要断开一次TCP连接，增加了通信量的开销。为了解决这个问题，HTTP/1.1和一部分的HTTP/1.0想出了持久连接的方法，也称为HTTP keep-alive或者HTTP connection reuse，持久连接的特点是，只要任一一端没有明确提出断开连接，则保持TCP连接状态（旨在建立一次TCP连接后进行多次请求和响应的交互，减轻服务器端的负载）。在HTTP/1,1中，所有的连接默认都是持久连接。持久连接使得多数请求得以管线化发送成为了可能，从前发送请求后需要等待并收到响应才能发送下一个请求。管线化技术出现后，不用等待响应也可直接发送下一个请求。</p>\n<h3>Cookie</h3>\n<p>Cookie会根据从服务器端发送的响应报文内的一个叫做Set-Cookie的首部字段信息通知客户端保存Cookie，当下次客户端再往该服务器发送请求的时候，客户端会自动在请求报文中加入Cookie值后发送出去，服务器端发现客户端发送过来的Cookie后会去检查究竟是哪一个客户端发来的连接请求，然后对比服务器上的记录，最后得到之前的状态信息。</p>\n<h2>HTTP报文内的HTTP信息</h2>\n<hr>\n<p>HTTP报文大致可分为报文首部和报文主体两块，两者由最初出现的空行（CR（回车）+LF（换行））来划分，通常不一定要有报文主体。</p>\n<p>请求报文的报文首部一般含有：请求行、请求首部字段、通用首部字段、实体首部字段。</p>\n<p>响应报文则是：状态行、响应首部字段、通用首部字段、实体首部字段。</p>\n<h4>提升传输速率</h4>\n<p>压缩传输的内容编码。比如gzip（GNU zip）、compress（Unix系统的标准压缩）、deflate（zlib）、identity（不进行编码）。</p>\n<p>分割发送的分块传输编码。通过把数据分割成多块，能够让浏览器逐步显示页面，这种把实体主体分块的功能称为分块传输编码。</p>\n<h4>发送多种数据的多部分对象集合</h4>\n<p>发邮件的时候我们可以在邮件里面写入文字并添加多份附件，这是因为采用了MIME（Multipurpose Internet Mail Extensions，多用途英特网邮件拓展）机制，它允许邮件处理文本、图片、视频等多个不同类型的数据，而在MIME拓展中会使用一种称为多部分对象集合的方法来容纳不同类型的数据。相应的，HTTP协议中也采纳了多部分对象集合，发送的一份报文主体内可包含有多类型实体。通常在图片或文本文件上传时使用。多部分对象集合包含的对象如下：</p>\n<ul>\n<li>\n<p>multipart/form-data:在Web表单文件上传时使用</p>\n</li>\n<li>\n<p>multipart/byteranges:状态码206（部分内容）响应报文包含了多个范围的内容时使用。</p>\n</li>\n</ul>\n<p>在HTTP报文中会用多部分对象集合时，需要再首部字段里加上Content-type。</p>\n<h3>获取部分内容的范围请求</h3>\n<p>在以前，下载过程遇到网络中断的状况就必须从头开始。为了解决这个问题，需要一种可恢复的机制（即在断点恢复下载而不是从头再来一遍）。</p>\n<p>要实现该功能需要指定下载的实体范围。像这样指定范围发送的请求称为范围请求（Range Request）。执行范围请求时，会用到首部字段Range来知道资源的byte范围：Range：bytes=-3000，5001-10000 。针对范围请求，响应会返回状态码为206 Partial Content的响应报文。另外，对于多重范围的范围请求，响应会在首部字段Conyent-type标明multipart/byteranges后返回响应报文。如果服务器端无法响应范围请求，则会返回状态码200 OK和完整的实体内容。</p>\n<h2>返回结果的HTTP状态码</h2>\n<hr>\n<p>这个很关键啊，不知道为啥，经常考这个，首先是大体的分类：</p>\n<table>\n<thead>\n<tr>\n<th align="center">状态码</th>\n<th align="center">名称</th>\n<th align="center">含义</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td align="center">1XX</td>\n<td align="center">Informational（信息状态码）</td>\n<td align="center">接收的请求正在处理</td>\n</tr>\n<tr>\n<td align="center">2XX</td>\n<td align="center">Success（成功状态码）</td>\n<td align="center">请求正常处理完毕</td>\n</tr>\n<tr>\n<td align="center">3XX</td>\n<td align="center">Redirection（重定向状态码）</td>\n<td align="center">需要进行附加操作以完成请求</td>\n</tr>\n<tr>\n<td align="center">4XX</td>\n<td align="center">ClientErr（客户端错误状态码）</td>\n<td align="center">服务器无法处理请求</td>\n</tr>\n<tr>\n<td align="center">5XX</td>\n<td align="center">ServerError（服务器错误状态码）</td>\n<td align="center">服务器处理请求出错</td>\n</tr>\n</tbody>\n</table>\n<p>比较具有代表性的有以下14个：</p>\n<table>\n<thead>\n<tr>\n<th align="center">状态码</th>\n<th align="center">名称</th>\n<th align="center">含义</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td align="center">200</td>\n<td align="center">OK</td>\n<td align="center">表示从客户端发来的请求被正常处理了</td>\n</tr>\n<tr>\n<td align="center">204</td>\n<td align="center">NO Content</td>\n<td align="center">表示服务器接收的请求已被成功处理，但在返回的响应报文中不含实体的主体部分（浏览器页面不发生更新，即对客户端不需要发送新信息的情况）</td>\n</tr>\n<tr>\n<td align="center">206</td>\n<td align="center">Partical Content</td>\n<td align="center">该状态码表示客户端进行了范围请求，而服务器成功返回了这部分的GET请求</td>\n</tr>\n<tr>\n<td align="center">301</td>\n<td align="center">Moved Permanently</td>\n<td align="center">永久性重定向。该状态码表示请求的资源已被分配了新的URI，以后应使用资源限制所指的URI。也就是说，如果已经把资源对应的URI保存为书签了，这时应按Location首部字段提升的URI重新保存</td>\n</tr>\n<tr>\n<td align="center">302</td>\n<td align="center">See Other</td>\n<td align="center">临时性重定向（将来还有可能改变，不会像301那样去更新书签）。该状态码表示请求的资源已被分配了新的URI，希望用户本次能使用新的URI访问。</td>\n</tr>\n<tr>\n<td align="center">303</td>\n<td align="center">OK</td>\n<td align="center">303状态码和302有着相同的功能，但是303状态码明确表示客户端应当采用GET方法获取资源，这点与302状态码有区别（标准是这么规定的，但是几乎所有浏览器遇到301、302、303状态码返回时都会把Post改成Get）</td>\n</tr>\n<tr>\n<td align="center">304</td>\n<td align="center">Not Modified</td>\n<td align="center">该状态码表示客户端发送附带条件的请求时，服务器端允许请求访问资源，但未满足条件的情况。304状态码返回的时候，不包含任何响应的主体部分。304虽然被划在3XX类别中，但是和重定向没有太大关系。（硬要说的话也算是重定向到本地文件吧）</td>\n</tr>\n<tr>\n<td align="center">307</td>\n<td align="center">Temporary Redirect</td>\n<td align="center">临时性重定向，该状态码与302 Found有着相同的含义，尽管302标准禁止Post转换为Get，但是实际使用中大家并不遵守，但是307会遵守浏览器标准，不会从Post编程Get。</td>\n</tr>\n<tr>\n<td align="center">400</td>\n<td align="center">Bad Request</td>\n<td align="center">>该状态码表示请求报文中存在语法错误，当错误发生时需要修改请求的内容后再次发送请求。另外，浏览器会像200 OK一样对待该状态码。</td>\n</tr>\n<tr>\n<td align="center">401</td>\n<td align="center">Unauthorized</td>\n<td align="center">该状态码表示发送的请求需要有通过HTTP认证的认证信息，浏览器初次（多次发送请求服务端会认为用户认证失败）接收到401响应会弹出认证用的对话窗口。</td>\n</tr>\n<tr>\n<td align="center">404</td>\n<td align="center">Not Found</td>\n<td align="center">该状态码表明服务器上无法找到请求的资源（也可以在服务器端拒绝请求且不想说明原因的时候使用）</td>\n</tr>\n<tr>\n<td align="center">500</td>\n<td align="center">Internal Server Error</td>\n<td align="center">该状态码表示服务器端在执行请求时发生了错误，也可能是Web应用存在的bug或临时的故障</td>\n</tr>\n<tr>\n<td align="center">503</td>\n<td align="center">Service Unavailable</td>\n<td align="center">表明服务器暂时处于超负载或正在进行停机维护，现在无法处理请求。</td>\n</tr>\n</tbody>\n</table>\n<h2>与HTTP协作的Web服务器</h2>\n<hr>\n<p>HTTP/1.1规范允许一台HTTP服务器搭建多个Web站点。比如提供Web托管服务的运营商，可以使用一台服务器为多位客户服务，也可以以每位客户持有的域名运行各自不同的网站。这是因为使用了虚拟主机的功能（物理层面只有一台服务器，但是只要使用虚拟主机的功能就可以假想已有多台服务器），在相同的IP地址下，由于虚拟主机可以寄存多个不同主机名和域名的Web网站，因此在发送HTTP请求时，必须在Host首部内完整指定主机名或域名的URI。</p>\n<h3>通信数据转发程序</h3>\n<ul>\n<li>\n<p>1.代理：代理是一种有转发功能的应用程序，位于服务器端与客户端之间，相当于中间人（代理服务器转发请求或响应时，会追加Via首部信息）。</p>\n</li>\n<li>\n<p>2.网关：网关是转发其他服务器通信数据的服务器，接收从客户端发送来的请求时，它就像自己拥有资源的源服务器一样对请求进行处理。有时客户端可能都不会察觉，自己的通信目标是一个网关。</p>\n</li>\n<li>\n<p>3.隧道：隧道是在相隔甚远的客户端和服务器两者之间进行中转，并保持双发通信连接的应用程序。</p>\n</li>\n</ul>\n<p>使用代理的好处是利用缓存技术减少网络带宽的流量。代理有多种使用方法，按两种基准分类。一种是否使用缓存，一种是否会修改报文。缓存代理转发响应时，缓存代理会预先将资源的副本（缓存）保存在代理服务器上，当代理再次接受到对相同资源的请求时，就可以不从源服务器哪里获取资源，而是将之前缓存的资源作为响应返回。另一种则是透明代理，转发请求或响应时不对报文做任何加工的代理类型被称为透明代理，反之则是非透明代理</p>\n<p>使用网关的好处则是可以提高通信的安全性，网关的工作机制和代理很类似，但是网关能使通信线路上的服务器提供非HTTP协议服务。因为可以在客户端与网关之间的通信线路上加密以确保连接的安全，比如网关可以连接数据库，使用SQL语句查询数据。又或者在Web购物网站上进行信用卡结算时，网关可以和信用卡结算系统联动。</p>\n<p>使用隧道的目的是确保客户端与服务器进行安全的通信，且隧道本身是透明的，客户端不用关心隧道的存在。</p>',fields:{slug:"/http/",prefix:"2017-06-25"},frontmatter:{title:"《图解HTTP》读书笔记",author:"todaylg",category:"读书流水",cover:{childImageSharp:{resize:{src:"/LG-Blog-Gatsby/static/bg-292560167a785258e2b2e110a687564c-ada8c.jpg"}}}}},authornote:{id:"/Users/lugang/My Github/LG-Blog-Gatsby/content/parts/author.md absPath of file >>> MarkdownRemark",html:"<p><strong>todaylg</strong> </p>"},site:{siteMetadata:{facebook:{appId:""}}}},pathContext:{slug:"/http/",prev:{id:"/Users/lugang/My Github/LG-Blog-Gatsby/content/posts/2017-05-17--javascript-data-structure/index.md absPath of file >>> MarkdownRemark",fields:{slug:"/javascript-data-structure/",prefix:"2017-05-17"},frontmatter:{title:"《JavaScript数据结构与算法》读书笔记",category:"读书流水"}},next:{id:"/Users/lugang/My Github/LG-Blog-Gatsby/content/posts/2017-07-11--regexp/index.md absPath of file >>> MarkdownRemark",fields:{slug:"/regexp/",prefix:"2017-07-11"},frontmatter:{title:"正则表达式基础",category:"基础备忘"}}}}}});
//# sourceMappingURL=path---http-936735c57d53ef643e72.js.map