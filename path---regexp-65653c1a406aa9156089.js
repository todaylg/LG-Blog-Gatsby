webpackJsonp([0xf6211a65a8c7],{412:function(n,s){n.exports={data:{post:{id:"/Users/lugang/My Github/LG-Blog-Gatsby/content/posts/2017-07-11--regexp/index.md absPath of file >>> MarkdownRemark",html:'<h2>正则表达式基础</h2>\n<blockquote>\n<p>正则表达式是用于匹配字符串中字符组合的模式。嗷嗷有用。在 JavaScript中，正则表达式也是对象。</p>\n</blockquote>\n<p>这些模式被用于 RegExp的</p>\n<ul>\n<li>\n<p>exec()（一个在字符串中执行查找匹配的RegExp方法，它返回一个数组（未匹配到则返回null）。）</p>\n</li>\n<li>\n<p>test() （一个在字符串中测试是否匹配的RegExp方法，它返回true或false。）。</p>\n</li>\n</ul>\n<p>以及 String 的</p>\n<ul>\n<li>\n<p>match()（一个在字符串中执行查找匹配的String方法，它返回一个数组或者在未匹配到时返回null。）</p>\n</li>\n<li>\n<p>replace()（一个在字符串中测试匹配的String方法，它返回匹配到的位置索引，或者在失败时返回-1。）</p>\n</li>\n<li>\n<p>search()（一个在字符串中执行查找匹配的String方法，并且使用替换字符串替换掉匹配到的子字符串。）</p>\n</li>\n<li>\n<p>split() （一个使用正则表达式或者一个固定字符串分隔一个字符串，并将分隔后的子字符串存储到数组中的String方法。）</p>\n</li>\n</ul>\n<h4>创建正则表达式</h4>\n<p>在JavaScript中可以通过两种方法来创建一个正则表达式：</p>\n<p>1.使用一个正则表达式字面量</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">var</span> re <span class="token operator">=</span> <span class="token operator">/</span>pattern<span class="token operator">/</span>flags<span class="token punctuation">;</span>\n<span class="token keyword">const</span> regex <span class="token operator">=</span> <span class="token regex">/ab+c/</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> regex <span class="token operator">=</span> <span class="token regex">/^[a-zA-Z]+[0-9]*\\W?_$/gi</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>2.调用RegExp对象的构造函数</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">var</span> re <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RegExp</span><span class="token punctuation">(</span><span class="token string">"pattern"</span><span class="token punctuation">,</span> <span class="token string">"flags"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">let</span> regex <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RegExp</span><span class="token punctuation">(</span><span class="token string">"ab+c"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">let</span> regex <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RegExp</span><span class="token punctuation">(</span><span class="token operator">/</span><span class="token operator">^</span><span class="token punctuation">[</span>a<span class="token operator">-</span>zA<span class="token operator">-</span><span class="token constant">Z</span><span class="token punctuation">]</span><span class="token operator">+</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token operator">-</span><span class="token number">9</span><span class="token punctuation">]</span><span class="token operator">*</span>\\<span class="token constant">W</span><span class="token operator">?</span>_$<span class="token punctuation">,</span> <span class="token string">"gi"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">let</span> regex <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RegExp</span><span class="token punctuation">(</span><span class="token string">"^[a-zA-Z]+[0-9]*\\W?_$"</span><span class="token punctuation">,</span> <span class="token string">"gi"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>其中的flags代表正则表达式标志，正则表达式有四个可选参数进行全局和不分大小写搜索。这些参数既可以单独使用也可以一起使用在任何顺序和包含正则表达式的部分中。</p>\n<ul>\n<li>\n<p>g：全局搜索</p>\n</li>\n<li>\n<p>i：不区分大小写搜索</p>\n</li>\n<li>\n<p>m：多行搜索</p>\n</li>\n<li>\n<p>y：/y标识让一个未锚定的正则只在目标字符串的当前位置匹配成功或匹配失败./g或其他东西也会影响当前位置具体在哪里.但比起其他因素,/y是完全独立的(更底层)…(粘滞的意思就是”使用隐式的^锚点把正则锚定在了lastIndex所指定的偏移位置处”)</p>\n</li>\n</ul>\n<h4>简单的模式匹配</h4>\n<p>1.匹配字符串字面值</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">var</span> val <span class="token operator">=</span> <span class="token string">"LG"</span><span class="token punctuation">;</span>\n<span class="token keyword">var</span> reg <span class="token operator">=</span> <span class="token regex">/LG/</span><span class="token punctuation">;</span>    <span class="token comment">//就是简单的用字符串字面量查找</span>\n<span class="token keyword">if</span><span class="token punctuation">(</span>reg<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n    <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">\'验证通过\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>\n    <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">\'验证未通过\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>2.匹配数字</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript">\\d\n<span class="token punctuation">[</span><span class="token number">0</span><span class="token operator">-</span><span class="token number">9</span><span class="token punctuation">]</span>  \n<span class="token punctuation">[</span><span class="token number">0123456789</span><span class="token punctuation">]</span>    <span class="token comment">//虽然语法不一样，但是效果是一样的</span></code></pre>\n      </div>\n<p>3.匹配非数字</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript">\\<span class="token constant">D</span>\n<span class="token punctuation">[</span><span class="token operator">^</span><span class="token number">0</span><span class="token operator">-</span><span class="token number">9</span><span class="token punctuation">]</span> \n<span class="token punctuation">[</span><span class="token operator">^</span>\\d<span class="token punctuation">]</span></code></pre>\n      </div>\n<p>4.匹配单词和非单词</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript">\\w    <span class="token comment">// \\w只匹配字母数字和下划线  \\D还会匹配空格、标点符号等字符  \\w在英语环境下相当于 [_a-zA-Z0-9]</span>\n\\<span class="token constant">W</span>    <span class="token comment">// \\W匹配非单词字符 相当于[^_a-zA-Z0-9]</span></code></pre>\n      </div>\n<p>5.匹配空白符</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript">\\s    <span class="token comment">// \\s相当于 [ \\t\\n\\r] 也就是说\\s会匹配空格、制表符、换行符、回车符 (不匹配换页符（\\f）、水平空白符（\\h）等特殊的空白字符)</span>\n\\<span class="token constant">S</span></code></pre>\n      </div>\n<p>6.匹配任意字符</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token punctuation">.</span>    <span class="token comment">//单个点号匹配任意字符</span>\n<span class="token punctuation">.</span><span class="token operator">*</span>    <span class="token comment">//匹配零个或者多个字符</span></code></pre>\n      </div>\n<h4>边界</h4>\n<p>1.行的起始和结束</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token operator">^</span>    <span class="token comment">//^会匹配行或者字符串的起始位置</span>\n$    <span class="token comment">//$会匹配行或者字符串的结束位置</span>\n举个例子：\n<span class="token keyword">var</span> val <span class="token operator">=</span> <span class="token string">"LGdsadsadEnd.end"</span><span class="token punctuation">;</span>\n<span class="token keyword">var</span> reg <span class="token operator">=</span> <span class="token regex">/^LG.*End\\.end$/</span><span class="token punctuation">;</span>\n<span class="token keyword">if</span><span class="token punctuation">(</span>reg<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n    <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">\'验证通过\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>\n    <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">\'验证未通过\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>2.单词边界与非单词边界</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript">\\b    <span class="token comment">//\\b匹配单词边界  比如\\bLG\\b \\b和^与$一样是个零宽度断言</span>\n\\<span class="token constant">B</span>    <span class="token comment">//匹配非单词边界</span></code></pre>\n      </div>\n<p>3.\\A和\\Z匹配主题词的起始和结束（？？？）</p>\n<p>4.使用元字符的字面值</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token constant">Q</span>和\\<span class="token constant">E</span>之间的任意字符都会被解释为普通字符\n\\<span class="token constant">Q</span>$\\<span class="token constant">E</span>    <span class="token comment">//会匹配$  （其实也可以在$前加\\进行转义也是可以的）  //测试这个\\Q和\\E在JavaScript正则并不好使，还是用\\进行转义吧</span></code></pre>\n      </div>\n<h4>选择、分组和后向引用</h4>\n<p>1.选择操作</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token punctuation">(</span>the<span class="token operator">|</span>The<span class="token operator">|</span><span class="token constant">THE</span><span class="token punctuation">)</span>  <span class="token comment">//其实直接设置flag为i，即可忽略大小写的区别了j</span></code></pre>\n      </div>\n<p>2.子模式</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token comment">//其实(the|The|THE)也算是三个模式，但是这种情况下匹配第二个子模式不依赖于是否匹配第一个</span>\n<span class="token punctuation">(</span>t<span class="token operator">|</span><span class="token constant">T</span><span class="token punctuation">)</span><span class="token function">h</span><span class="token punctuation">(</span>e<span class="token operator">|</span>eir<span class="token punctuation">)</span>    <span class="token comment">//这个情况第二个子模式(e|eir)就依赖于第一个子模式（tT）,它会匹配the The their Their</span>\n\\b<span class="token punctuation">[</span>tT<span class="token punctuation">]</span>h<span class="token punctuation">[</span>ceintry<span class="token punctuation">]</span><span class="token operator">*</span>\\b    <span class="token comment">//则匹配the thee thy等单词</span></code></pre>\n      </div>\n<p>3.捕获分组和后向引用</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript">一个正则表达式模式使用括号，将导致相应的子匹配被记住。例如，<span class="token operator">/</span><span class="token function">a</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span>c <span class="token operator">/</span>可以匹配字符串“abc”，并且记得“b”。回调这些括号中匹配的子串使用数组元素<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span>……<span class="token punctuation">[</span>n<span class="token punctuation">]</span>\n<span class="token keyword">var</span> re <span class="token operator">=</span> <span class="token regex">/(\\w+)\\s(\\w+)/</span><span class="token punctuation">;</span>\n<span class="token keyword">var</span> str <span class="token operator">=</span> <span class="token string">"John Smith"</span><span class="token punctuation">;</span>\n<span class="token keyword">var</span> newstr <span class="token operator">=</span> str<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>re<span class="token punctuation">,</span> <span class="token string">"$2, $1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">//[1]、\\1都不好使</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newstr<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//这个表达式输出 "Smith, John"。</span></code></pre>\n      </div>\n<p>4.非捕获分组</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token comment">//不需要任何后向引用时</span>\n<span class="token punctuation">(</span><span class="token operator">?</span><span class="token punctuation">:</span> x<span class="token punctuation">)</span>    <span class="token comment">//匹配x但是不记住匹配项</span></code></pre>\n      </div>\n<h4>字符组</h4>\n<p>字符组就是[]，也叫方括号表达式。使用字符组可以匹配某个范围的字符：</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token punctuation">[</span>a<span class="token operator">-</span>z<span class="token punctuation">]</span>、<span class="token punctuation">[</span><span class="token number">0</span><span class="token operator">-</span><span class="token number">9</span><span class="token punctuation">]</span>\n<span class="token punctuation">[</span>\\w\\s<span class="token punctuation">]</span>    <span class="token comment">//匹配空格和单词字符  等同于[_a-zAA-Z \\t\\n\\r]</span></code></pre>\n      </div>\n<p>1.字符组取反</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token punctuation">[</span><span class="token operator">^</span>a<span class="token operator">-</span>z<span class="token punctuation">]</span>    <span class="token comment">//^在字符组里的意义为取反</span></code></pre>\n      </div>\n<p>2.并集与差集</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token punctuation">[</span><span class="token number">0</span><span class="token operator">-</span><span class="token number">3</span><span class="token punctuation">[</span><span class="token number">6</span><span class="token operator">-</span><span class="token number">9</span><span class="token punctuation">]</span><span class="token punctuation">]</span>    <span class="token comment">//匹配0到3之间的数字或者6到9之间的数字     //测试JavaScript不支持</span>\n<span class="token punctuation">[</span>a<span class="token operator">-</span>z<span class="token operator">&amp;&amp;</span><span class="token punctuation">[</span><span class="token operator">^</span>m<span class="token operator">-</span>r<span class="token punctuation">]</span><span class="token punctuation">]</span>    <span class="token comment">//匹配a到z之间的字符，但是其中m到r之间的字符除外    //测试JavaScript不支持</span></code></pre>\n      </div>\n<h4>量词</h4>\n<p>1.贪心、懒惰和占用</p>\n<p>量词自身是贪心的。贪心的量词会首先匹配整个字符串。尝试匹配时，它会选定尽可能多的内容，也就是整个输入量词首次尝试匹配整个字符串，如果失败则回退一个字符后再尝试。这个过程叫做回溯。它会每次回退一个字符，直到找到匹配的内容或者没有字符可尝试了为止。懒惰的量词则使用另一种策略，它从目标的起始位置开始尝试寻找匹配，每次检查字符串的一个字符，寻找它要匹配的内容。最后它会尝试匹配整个字符串。占有量词会覆盖整个目标然后尝试寻找匹配内容，但是它只尝试一次，不会回溯。</p>\n<p>2.用*、+、？进行匹配（基本量词）</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token punctuation">.</span><span class="token operator">*</span>    <span class="token comment">//它会以贪心的方式匹配主文本中的所有字符 正则表达式之后加*表示该正则表达式所匹配的文本接连出现任意次（包括零次）</span>\n<span class="token number">9</span><span class="token operator">+</span>    <span class="token comment">//+和*的区别在于+会寻找至少一个9，而*会寻找零个或者多个9</span>\n<span class="token number">9</span>？    <span class="token comment">//匹配零次或一次</span></code></pre>\n      </div>\n<p>3.匹配特定次数</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token number">7</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">}</span>    <span class="token comment">//使用花括号可以限制某个模式在某个范围内匹配的次数，未经修饰的量词就是贪心量词。 会匹配第一次出现的7</span>\n<span class="token number">7</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token punctuation">}</span>    <span class="token comment">//匹配一个或者多个7    相当于7+    同理7{0,}和7*也是相同的、7{0,1}和7？是相同的  还可以m到n次：7{3,5}匹配3到5个7</span></code></pre>\n      </div>\n<p>4.懒惰量词</p>\n<p>如果紧跟在任何量词 *、 +、? 或 {} 的后面，将会使量词变为非贪婪的（匹配尽量少的字符），和缺省使用的贪婪模式（匹配尽可能多的字符）正好相反。</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token number">9</span><span class="token operator">+</span>    <span class="token comment">//匹配一个或者多个9</span>\n<span class="token number">9</span><span class="token operator">+</span><span class="token operator">?</span>    <span class="token comment">//变懒了，只匹配一个    //加了黑人问号（?）都变懒了，能不干就不干（匹配最少）</span>\n\n<span class="token number">9</span>？    <span class="token comment">//匹配零次或一次</span>\n<span class="token number">9</span>？？    <span class="token comment">//变懒了，一个都不匹配了</span></code></pre>\n      </div>\n<p>5.占用量词</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token number">0.</span><span class="token operator">*</span><span class="token operator">+</span>    <span class="token comment">//000xxx  可以匹配到，和贪婪好像一样</span>\n<span class="token punctuation">.</span><span class="token operator">*</span><span class="token operator">+</span><span class="token number">0</span>    <span class="token comment">//000xxx  不可以匹配到，因为不会回溯，一下就选定了所有输入，第一下没找到就不找了。</span></code></pre>\n      </div>\n<p>JavaScript正则表达式没有占有模式，只有贪婪和非贪婪（懒惰）模式，占有模式反而会报错。\n很多其他语言支持的正则表达式功能在JavaScript中不支持。\n​</p>',fields:{slug:"/regexp/",prefix:"2017-07-11"},frontmatter:{title:"正则表达式基础",author:"todaylg",category:"基础备忘",cover:{childImageSharp:{resize:{src:"/LG-Blog-Gatsby/static/bg-1d85f0ce40b9d565fe859dfebaf3b52f-ada8c.jpg"}}}}},authornote:{id:"/Users/lugang/My Github/LG-Blog-Gatsby/content/parts/author.md absPath of file >>> MarkdownRemark",html:"<p><strong>todaylg</strong> </p>"},site:{siteMetadata:{facebook:{appId:""}}}},pathContext:{slug:"/regexp/",prev:{id:"/Users/lugang/My Github/LG-Blog-Gatsby/content/posts/2017-06-25--http/index.md absPath of file >>> MarkdownRemark",fields:{slug:"/http/",prefix:"2017-06-25"},frontmatter:{title:"《图解HTTP》读书笔记",category:"读书流水"}},next:{id:"/Users/lugang/My Github/LG-Blog-Gatsby/content/posts/2017-07-23--git/index.md absPath of file >>> MarkdownRemark",fields:{slug:"/git/",prefix:"2017-07-23"},frontmatter:{title:"Git基础",category:"基础备忘"}}}}}});
//# sourceMappingURL=path---regexp-65653c1a406aa9156089.js.map