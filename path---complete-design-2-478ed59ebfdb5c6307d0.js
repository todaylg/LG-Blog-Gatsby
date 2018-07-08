webpackJsonp([0xf6172fe4b986],{390:function(n,s){n.exports={data:{post:{id:"/Users/lugang/My Github/LG-Blog-Gatsby/content/posts/2018-06-29--complete-design-2/index.md absPath of file >>> MarkdownRemark",html:'<h2>Web Audio API</h2>\n<p>首先Web Audio API是啥？Web Audio API提供了在Web上分析或处理底层音频数据的一个通用的规范，是Web平台上对音频处理的一套高级API，这个API设计的初衷是用来编写游戏声音引擎以及完成在各种音乐制作软件中对声音的编辑和混缩的，所以十分复杂和强大，体量相当于Canvas API，通过Web Audio API可以获取音频时频域信息（音乐可视化）、过滤特定频率（通过高通、低通等各种滤波器）、立体声、各个声道处理，甚至生成音效等等。值得一提的是这个API对于时间精度控制得非常精确，实测确实几乎没有延迟。</p>\n<p>在音频上下文中的各个音频节点通过输入输出相互连接，形成一个链，即代表了整个音频数据的处理流程。一个通过Web Audio API处理音频的基本流程如下图所示：</p>\n<div style="text-align: center">  \n<img style="width:200px;" src="http://pazg80lq8.bkt.clouddn.com/Web%20Audio%20API%20%E6%B5%81%E7%A8%8B.png">  \n</div>\n<p>开发者在Web Audio API中处理音频文件首先需要创建音频上下文（AudioContext），处理音频的过程都将在音频上下文中进行。之后在音频上下文中创建音频源，可以是audio元素或者是音频流。通过连接不同的效果节点，对音频数据进行不同效果的加工处理，如混响、滤波等。最后连接一个输出节点，比如麦克风，扬声器等等，再经过音频渲染进行最终的效果输出。</p>\n<p>简单的示例代码：</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">var</span> audioCtx <span class="token operator">=</span> <span class="token keyword">new</span> （window<span class="token punctuation">.</span>AudioContext <span class="token operator">||</span> window<span class="token punctuation">.</span>webkitAudioContext）（）<span class="token punctuation">;</span><span class="token comment">//创建实时音频上下文</span>\n<span class="token keyword">var</span> analyser <span class="token operator">=</span> audioCtx<span class="token punctuation">.</span>createAnalyser（）<span class="token punctuation">;</span><span class="token comment">//创建实时分析节点</span>\nsource <span class="token operator">=</span> audioCtx<span class="token punctuation">.</span>createMediaStreamSource（stream）<span class="token punctuation">;</span><span class="token comment">//连接声源</span>\nsource<span class="token punctuation">.</span>connect（analyser）<span class="token punctuation">;</span><span class="token comment">//声源连接分析节点</span>\nanalyser<span class="token punctuation">.</span>connect（distortion）<span class="token punctuation">;</span><span class="token comment">//分析节点连接输出设备</span></code></pre>\n      </div>\n<p>接下来对API所接触到的各部分进行介绍和示例演示：</p>\n<h3>音频上下文</h3>\n<p>因为使用Web Audio API处理音频的过程都在音频上下文中进行，所以首先对音频上下文进行介绍。</p>\n<p>类似于Canvas API分为2D绘制上下文和3D绘制上下文，Web Audio API的音频上下文也又分类，分为离线音频上下文（offline AudioContext）和实时音频上下文（AudioContext），顾名思义也可猜出个大概区别：在离线音频上下文中对音频数据的渲染将不经过硬件，说白了就是预分析，输入的音频有多长就渲染多长，并提供一个回调函数尽量快的返回渲染结果（PCM数据）；而实时音频上下文对音频数据的渲染将会经过硬件进行实时渲染。</p>\n<p>离线渲染示例：</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">let</span> OfflineContext <span class="token operator">=</span> window<span class="token punctuation">.</span>OfflineAudioContext<span class="token punctuation">;</span>\n<span class="token keyword">let</span> context <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">OfflineContext</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> audioLength <span class="token operator">*</span> config<span class="token punctuation">.</span>sampleRateGuess<span class="token punctuation">,</span> config<span class="token punctuation">.</span>sampleRateGuess<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//numOfChannels,length,sampleRate</span>\n\n<span class="token comment">//LoadBuffer封装根据musicSrc发送XMLHttpRequest请求获取音频数据（ArrayBuffer）</span>\n<span class="token function">LoadBuffer</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> musicSrc<span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token function">onload</span><span class="token punctuation">(</span>buffer<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\t\t<span class="token keyword">let</span> destination <span class="token operator">=</span> context<span class="token punctuation">.</span>destination<span class="token punctuation">;</span><span class="token comment">//离线渲染也需要指定输出设备(非硬件，没声)</span>\n\n\t\t<span class="token keyword">let</span> source <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token function">createBufferSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\t\tsource<span class="token punctuation">.</span>buffer <span class="token operator">=</span> buffer<span class="token punctuation">;</span><span class="token comment">//ArrayBuffer</span>\n\n\t\tsource<span class="token punctuation">.</span><span class="token function">connect</span><span class="token punctuation">(</span>destination<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n\t\tsource<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n\t\tcontext<span class="token punctuation">.</span><span class="token function">startRendering</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span>buffer<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span><span class="token comment">//离线音频上下文特有的回调函数</span>\n\t\t\tconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token string">`预分析完毕，结果为：</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>buffer<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//AudioBuffer</span>\n\t\t\taudio<span class="token punctuation">.</span><span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\t\t<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\t<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>实时渲染示例：</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">let</span> context <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AudioContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">let</span> analyser <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token function">createAnalyser</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//实时分析节点</span>\n<span class="token keyword">let</span> levels <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Uint8Array</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>analyser<span class="token punctuation">.</span>frequencyBinCount<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//频域数据</span>\n<span class="token keyword">let</span> waveform <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Uint8Array</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>analyser<span class="token punctuation">.</span>fftSize<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//时域数据</span>\n\n<span class="token comment">//RAF</span>\nwindow<span class="token punctuation">.</span>requestAnimationFrame <span class="token operator">=</span> window<span class="token punctuation">.</span>requestAnimationFrame\n        <span class="token operator">||</span> window<span class="token punctuation">.</span>webkitRequestAnimationFrame\n        <span class="token operator">||</span> window<span class="token punctuation">.</span>mozRequestAnimationFrame\n        <span class="token operator">||</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>f<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">setTimeout</span><span class="token punctuation">(</span>f<span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token keyword">let</span> <span class="token function-variable function">getLevels</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=></span> <span class="token punctuation">{</span><span class="token comment">//实时获取音频频域数据</span>\n  analyser<span class="token punctuation">.</span><span class="token function">getByteFrequencyData</span><span class="token punctuation">(</span>freqByteData<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  window<span class="token punctuation">.</span><span class="token function">requestAnimationFrame</span><span class="token punctuation">(</span>renderFFT<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token comment">//可视化效果同步</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token keyword">let</span> <span class="token function-variable function">getWaveform</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=></span> <span class="token punctuation">{</span><span class="token comment">//实时获取音频时域数据</span>\n\tanalyser<span class="token punctuation">.</span><span class="token function">getByteTimeDomainData</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>waveform<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\twindow<span class="token punctuation">.</span><span class="token function">requestAnimationFrame</span><span class="token punctuation">(</span>renderFFT<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token comment">//可视化效果同步</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>翻阅W3C规范会发现Web Audio API的很多规定参数都是个迷。。。比如实时取得的频域数据数组大小为什么规定为FFT大小的一半？猜想是浏览器底层实现FFT时为了防止频谱泄露使用了加窗函数（一般取50%），而要验证则需要看浏览器的实现代码。。。所以现在还是老老实实先放一放吧。</p>\n<p>包括Web Audio API 的卷积运算（Convolution）功能实现环境音效的模拟。在声学中，回声可以用源声音与一个反映各种反射效应的波形的卷积表示（具体怎么实现的没有深入研究），这些反映反射效应的波形可以反映房间室内回声、教堂回声、电话声等等。</p>',fields:{slug:"/complete-design-2/",prefix:"2018-06-29"},frontmatter:{title:"毕设小结（二）Web Audio API",author:"todaylg",category:"小结",cover:{childImageSharp:{resize:{src:"/LG-Blog-Gatsby/static/test2-420e4d0dad40dab9b22cfa827b8e85fe-160fa.png"}}}}},authornote:{id:"/Users/lugang/My Github/LG-Blog-Gatsby/content/parts/author.md absPath of file >>> MarkdownRemark",html:"<p><strong>todaylg</strong> </p>"},site:{siteMetadata:{facebook:{appId:""}}}},pathContext:{slug:"/complete-design-2/",prev:{id:"/Users/lugang/My Github/LG-Blog-Gatsby/content/posts/2018-06-26--complete-design-1/index.md absPath of file >>> MarkdownRemark",fields:{slug:"/complete-design-1/",prefix:"2018-06-26"},frontmatter:{title:"毕设小结（一）WebVR",category:"小结"}},next:{id:"/Users/lugang/My Github/LG-Blog-Gatsby/content/posts/2018-07-02--vue-document/index.md absPath of file >>> MarkdownRemark",fields:{slug:"/vue-document/",prefix:"2018-07-02"},frontmatter:{title:"Vue工程结构目录及注意事项",category:"小记"}}}}}});
//# sourceMappingURL=path---complete-design-2-478ed59ebfdb5c6307d0.js.map