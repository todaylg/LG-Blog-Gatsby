webpackJsonp([0xf5e2ed4cf1b7],{392:function(t,e){t.exports={data:{post:{id:"/Users/lugang/My Github/LG-Blog-Gatsby/content/posts/2018-07-02--vue-document/index.md absPath of file >>> MarkdownRemark",html:'<h3>Vue Document</h3>\n<p>好的基础开发结构可以大大便于之后的维护于拓展。</p>\n<div class="gatsby-highlight">\n      <pre class="language-html"><code class="language-html">.\n├── assets\t\t\t\t\t\t\t// 公共资源\n│   ├── api\t\t\t\t\t\t\t// 公共API\n│   ├── lib\t\t\t\t\t\t\t// 公共第三方库\n├── components\t\t\t\t\t\t// 公共组件\n├── pages\t\t\t\t\t\t\t// 页面集\n│   ├── page\t\t\t\t\t\t// 具体页面\n│   │   ├── common\t\t\t\t\t// 页面公共资源\n│   │   ├── components\t\t\t\t// 组件（不含业务代码）\n│   │   ├── containers\t\t\t\t// 根据业务代码对组件进行整合形成的容器,\n\t\t\t\t\t\t\t\t\t// 包含自身的数据管理\n│   │   ├── store\t\t\t\t\t// 数据模块化分散至容器\n│   │   ├── router\t\t\t\t\t// 路由分配\n├── app.vue/js/html\t\t\t\t\t// 入口</code></pre>\n      </div>\n<p>因为之前使用Vue都是赶时间所以Store没有进行过模块化，组件拆得也不够细，通常components直接替代掉了containers这一层，有时间讲道理还是要解耦的。</p>\n<h3>注意事项</h3>\n<h4>自定义指令及过滤器</h4>\n<p>自定义指令着实是没有用到过，Vue.directive了解一下。</p>\n<p>过滤器是自个给忘了，Vue.filter复习一下。</p>\n<h4>易忽视的测试点</h4>\n<p>写了测试用例讲道理是要照用例完完全全过一遍对，但是老是会对一些细枝末节的地方有所忽略。</p>\n<p>1.这辈子请别再用”+”这样拼接字符串啦！</p>\n<p>2.除非是万不得已，别用setTimeInterval！！！并且切记与clear是同生共死的！</p>\n<p>3.没有一种初始值叫做undefined！却有一种赋值叫做99999999*n。请容错！</p>',fields:{slug:"/vue-document/",prefix:"2018-07-02"},frontmatter:{title:"Vue工程结构目录及注意事项",author:"todaylg",category:"小记",cover:{childImageSharp:{resize:{src:"/LG-Blog-Gatsby/static/test3-8558160c0a1a36b7a72aedbbebdca82f-ada8c.jpg"}}}}},authornote:{id:"/Users/lugang/My Github/LG-Blog-Gatsby/content/parts/author.md absPath of file >>> MarkdownRemark",html:"<p><strong>todaylg</strong> </p>"},site:{siteMetadata:{facebook:{appId:""}}}},pathContext:{slug:"/vue-document/",prev:{id:"/Users/lugang/My Github/LG-Blog-Gatsby/content/posts/2018-06-29--complete-design-2/index.md absPath of file >>> MarkdownRemark",fields:{slug:"/complete-design-2/",prefix:"2018-06-29"},frontmatter:{title:"毕设小结（二）Web Audio API",category:"小结"}}}}}});
//# sourceMappingURL=path---vue-document-9325150f68c6c0e9aa4e.js.map