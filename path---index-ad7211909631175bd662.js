webpackJsonp([0x81b8806e4260],{393:function(A,t){A.exports={data:{posts:{edges:[{node:{excerpt:"丢了CSS一段时间后突然拿起来用发现一下懵圈了。。。一些原来很基本的问题都忘完了。。把遇到的问题记一下，捡一捡吧。。 层级问题 相关： 层级 、 z-index 图片文字垂直居中 相关： 这里 多行文本与单行文本垂直居中",fields:{slug:"/css-problem/",prefix:"2018-07-07"},frontmatter:{title:"CSS问题集",category:"问题集",author:"todaylg",cover:{children:[{__typename:"ImageSharp",sizes:{base64:"data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAALABQDASIAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAMBAgX/xAAVAQEBAAAAAAAAAAAAAAAAAAACAf/aAAwDAQACEAMQAAAB27KaVIFP/8QAGBAAAgMAAAAAAAAAAAAAAAAAACECEBL/2gAIAQEAAQUC0xkb/8QAFREBAQAAAAAAAAAAAAAAAAAAARD/2gAIAQMBAT8BZ//EABURAQEAAAAAAAAAAAAAAAAAAAEQ/9oACAECAQE/ASf/xAAUEAEAAAAAAAAAAAAAAAAAAAAg/9oACAEBAAY/Al//xAAaEAACAgMAAAAAAAAAAAAAAAAAAREhEDFx/9oACAEBAAE/IbQgkXAtsW3j/9oADAMBAAIAAwAAABA4/wD/xAAVEQEBAAAAAAAAAAAAAAAAAAABEP/aAAgBAwEBPxAAz//EABURAQEAAAAAAAAAAAAAAAAAACEQ/9oACAECAQE/EEz/xAAbEAACAwEBAQAAAAAAAAAAAAABEQAhMUEQkf/aAAgBAQABPxAGlTNhuGRfOzRhHSJyAyyCHIfPP//Z",aspectRatio:2.2222222222222223,src:"/LG-Blog-Gatsby/static/test4-6b383e78f9b8388c45f77356bb879b15-aa04a.jpg",srcSet:"/LG-Blog-Gatsby/static/test4-6b383e78f9b8388c45f77356bb879b15-9897f.jpg 200w,\n/LG-Blog-Gatsby/static/test4-6b383e78f9b8388c45f77356bb879b15-3b5a5.jpg 400w,\n/LG-Blog-Gatsby/static/test4-6b383e78f9b8388c45f77356bb879b15-aa04a.jpg 800w,\n/LG-Blog-Gatsby/static/test4-6b383e78f9b8388c45f77356bb879b15-3bd67.jpg 1200w,\n/LG-Blog-Gatsby/static/test4-6b383e78f9b8388c45f77356bb879b15-8d5c0.jpg 1600w,\n/LG-Blog-Gatsby/static/test4-6b383e78f9b8388c45f77356bb879b15-2c8fe.jpg 1920w",srcWebp:"/LG-Blog-Gatsby/static/test4-6b383e78f9b8388c45f77356bb879b15-b53e0.webp",srcSetWebp:"/LG-Blog-Gatsby/static/test4-6b383e78f9b8388c45f77356bb879b15-69530.webp 200w,\n/LG-Blog-Gatsby/static/test4-6b383e78f9b8388c45f77356bb879b15-38abe.webp 400w,\n/LG-Blog-Gatsby/static/test4-6b383e78f9b8388c45f77356bb879b15-b53e0.webp 800w,\n/LG-Blog-Gatsby/static/test4-6b383e78f9b8388c45f77356bb879b15-95f52.webp 1200w,\n/LG-Blog-Gatsby/static/test4-6b383e78f9b8388c45f77356bb879b15-94ed8.webp 1600w,\n/LG-Blog-Gatsby/static/test4-6b383e78f9b8388c45f77356bb879b15-cf202.webp 1920w",sizes:"(max-width: 800px) 100vw, 800px"}}]}}}},{node:{excerpt:"Vue Document 好的基础开发结构可以大大便于之后的维护于拓展。 因为之前使用Vue都是赶时间所以Store没有进行过模块化，组件拆得也不够细（业务和纯组件能解构还是要解耦滴），通常components直接替代掉了containers…",fields:{slug:"/vue-document/",prefix:"2018-07-02"},frontmatter:{title:"Vue工程结构目录及注意事项",category:"小记",author:"todaylg",cover:{children:[{__typename:"ImageSharp",sizes:{base64:"data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAARABQDASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAIDBQT/xAAXAQEAAwAAAAAAAAAAAAAAAAADAAEC/9oADAMBAAIQAxAAAAHNVTtb0CDo4wE7AWv/xAAcEAACAgIDAAAAAAAAAAAAAAAAARESAjEDITL/2gAIAQEAAQUCfYtDVcryOs83hbP/xAAbEQACAQUAAAAAAAAAAAAAAAAAAQIDEBIhMf/aAAgBAwEBPwGjiujjsdv/xAAZEQACAwEAAAAAAAAAAAAAAAABAgADMRD/2gAIAQIBAT8Bdi2QXmJnP//EABsQAAEEAwAAAAAAAAAAAAAAAAABEBEhMUGh/9oACAEBAAY/Aq0TDXJZngr/AP/EABwQAAIDAAMBAAAAAAAAAAAAAAERACFBEDFRYf/aAAgBAQABPyF3R6uGMELoo3DNAI4K33YRY+DPIT3P/9oADAMBAAIAAwAAABBk73//xAAXEQEBAQEAAAAAAAAAAAAAAAAAAREx/9oACAEDAQE/EN7O1jpH/8QAGREBAAIDAAAAAAAAAAAAAAAAAQAQESEx/9oACAECAQE/EN9AAMUvZ//EAB8QAQACAgEFAQAAAAAAAAAAAAEAESGxQRAxYXGhgf/aAAgBAQABPxB5WxZw+SoQHhuNUUCy0NsfvBUsq3iVGcp24HPuKFowWGgAZ/J9Dt6Oo1P/2Q==",aspectRatio:2.2222222222222223,src:"/LG-Blog-Gatsby/static/test3-8558160c0a1a36b7a72aedbbebdca82f-aa04a.jpg",srcSet:"/LG-Blog-Gatsby/static/test3-8558160c0a1a36b7a72aedbbebdca82f-9897f.jpg 200w,\n/LG-Blog-Gatsby/static/test3-8558160c0a1a36b7a72aedbbebdca82f-3b5a5.jpg 400w,\n/LG-Blog-Gatsby/static/test3-8558160c0a1a36b7a72aedbbebdca82f-aa04a.jpg 800w,\n/LG-Blog-Gatsby/static/test3-8558160c0a1a36b7a72aedbbebdca82f-ec167.jpg 860w",srcWebp:"/LG-Blog-Gatsby/static/test3-8558160c0a1a36b7a72aedbbebdca82f-b53e0.webp",srcSetWebp:"/LG-Blog-Gatsby/static/test3-8558160c0a1a36b7a72aedbbebdca82f-69530.webp 200w,\n/LG-Blog-Gatsby/static/test3-8558160c0a1a36b7a72aedbbebdca82f-38abe.webp 400w,\n/LG-Blog-Gatsby/static/test3-8558160c0a1a36b7a72aedbbebdca82f-b53e0.webp 800w,\n/LG-Blog-Gatsby/static/test3-8558160c0a1a36b7a72aedbbebdca82f-1e1fd.webp 860w",sizes:"(max-width: 800px) 100vw, 800px"}}]}}}},{node:{excerpt:"Web Audio API 首先Web Audio API是啥？Web Audio API提供了在Web上分析或处理底层音频数据的一个通用的规范，是Web平台上对音频处理的一套高级API，这个API…",fields:{slug:"/complete-design-2/",prefix:"2018-06-29"},frontmatter:{title:"毕设小结（二）Web Audio API",category:"小结",author:"todaylg",cover:{children:[{__typename:"ImageSharp",sizes:{base64:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAIAAADwazoUAAAACXBIWXMAAAsSAAALEgHS3X78AAACNElEQVQozxWMy27TQABFLao4mfFM/B7P0zMT27HzdJo4SZu2CPpQi1CLkFiCgAV/AWKDhMRX8FNs+RaCdHRX5x4HIs6TnEfSOYmfLl6eLXcnboqx9DwGPe4hgbBEiHmIex6PfRkMJcYqCHMhawd4vJTlSogrob/cPbRN96yXQI8hLPwgD3wVBTL0JUbMx4xHKosES6VgVqnaOXppMmrteMfEq9NNpauCKhLlYaBoYiWxihhFtM7ymRotTbk0dmG0piwN4/9nTe3a1hHEq6IulFkq9ti2PDETPe7K6cV48mLS7I1phZhyUmfhKMFsCGLPdUqu8yTFAIYQzUwV+tFCqPf7s66Y3Lft/WJ2MVJ7GT/NyOctfZwEW4nGqVekqCFDJ/MDDDwaRJpkK112Qn9czt+tF2VGGhJ2bHhF0bdr9vf3zZ9fu++H7MHiMgISg3wInJGwF81ybqeVaW6K5uv14cFQBt0E9SYJvMrRow0/zdMfd+rnrfgwSdoETmN4SryChM62Pezm3b69vNzevZifPhVFJ0TcPyFooHxQRvDIKITzFBxbLQHnZPC2Cd5M+boYO+fdbVOtpmW7qtfXVbURZZHyGPRS2CfQpajPUL+KQUGiuVaHSr6eZs/HemNsa7RT5U2d8YNRZzStYzyEgwD0YujGwI2Am8B+HsCaJornRhqjrFWWZTIjgqbUkZHcJFHHQuUjb9DDg54P+seNkeuDHgv9Ks8plUnKMkJlxjg5QhlhfhD/A2GMULW6Z/RkAAAAAElFTkSuQmCC",aspectRatio:2.2222222222222223,src:"/LG-Blog-Gatsby/static/test2-420e4d0dad40dab9b22cfa827b8e85fe-7a6ea.png",srcSet:"/LG-Blog-Gatsby/static/test2-420e4d0dad40dab9b22cfa827b8e85fe-722ae.png 200w,\n/LG-Blog-Gatsby/static/test2-420e4d0dad40dab9b22cfa827b8e85fe-95f46.png 400w,\n/LG-Blog-Gatsby/static/test2-420e4d0dad40dab9b22cfa827b8e85fe-7a6ea.png 800w,\n/LG-Blog-Gatsby/static/test2-420e4d0dad40dab9b22cfa827b8e85fe-d00bb.png 1200w,\n/LG-Blog-Gatsby/static/test2-420e4d0dad40dab9b22cfa827b8e85fe-e9f87.png 1600w,\n/LG-Blog-Gatsby/static/test2-420e4d0dad40dab9b22cfa827b8e85fe-19e7c.png 1920w",srcWebp:"/LG-Blog-Gatsby/static/test2-420e4d0dad40dab9b22cfa827b8e85fe-33a0b.webp",srcSetWebp:"/LG-Blog-Gatsby/static/test2-420e4d0dad40dab9b22cfa827b8e85fe-2124c.webp 200w,\n/LG-Blog-Gatsby/static/test2-420e4d0dad40dab9b22cfa827b8e85fe-4d4e9.webp 400w,\n/LG-Blog-Gatsby/static/test2-420e4d0dad40dab9b22cfa827b8e85fe-33a0b.webp 800w,\n/LG-Blog-Gatsby/static/test2-420e4d0dad40dab9b22cfa827b8e85fe-f6c75.webp 1200w,\n/LG-Blog-Gatsby/static/test2-420e4d0dad40dab9b22cfa827b8e85fe-f1355.webp 1600w,\n/LG-Blog-Gatsby/static/test2-420e4d0dad40dab9b22cfa827b8e85fe-01ce2.webp 1920w",sizes:"(max-width: 800px) 100vw, 800px"}}]}}}},{node:{excerpt:"借着毕设的机会，接触了一下WebVR和Web Audio API，以及通信本行的数字信号处理的知识。 当年在DPS…",fields:{slug:"/complete-design-1/",prefix:"2018-06-26"},frontmatter:{title:"毕设小结（一）WebVR",category:"小结",author:"todaylg",cover:{children:[{__typename:"ImageSharp",sizes:{base64:"data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAALABQDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAUBAgME/8QAFwEAAwEAAAAAAAAAAAAAAAAAAAECA//aAAwDAQACEAMQAAABR6zbSeYYCP/EABkQAAIDAQAAAAAAAAAAAAAAAAERAAJBMf/aAAgBAQABBQIdujFN2oC//8QAFREBAQAAAAAAAAAAAAAAAAAAEBH/2gAIAQMBAT8Bh//EABYRAAMAAAAAAAAAAAAAAAAAABASQf/aAAgBAgEBPwFoP//EABcQAQADAAAAAAAAAAAAAAAAAAAgITH/2gAIAQEABj8CVDH/xAAaEAADAAMBAAAAAAAAAAAAAAAAAREhQVHR/9oACAEBAAE/IcPRcr0VwQixiNIP/9oADAMBAAIAAwAAABCEH//EABYRAQEBAAAAAAAAAAAAAAAAABEBEP/aAAgBAwEBPxBWrn//xAAXEQEBAQEAAAAAAAAAAAAAAAABACFR/9oACAECAQE/EABizl//xAAbEAEAAgMBAQAAAAAAAAAAAAABABFRcZFBYf/aAAgBAQABPxAgNBqJyWsKCPluZgTohKlHIu1UfI+7YuJ//9k=",aspectRatio:2.2222222222222223,src:"/LG-Blog-Gatsby/static/test1-624801bc60c20c24e549b23c0c52cbe6-aa04a.jpg",srcSet:"/LG-Blog-Gatsby/static/test1-624801bc60c20c24e549b23c0c52cbe6-9897f.jpg 200w,\n/LG-Blog-Gatsby/static/test1-624801bc60c20c24e549b23c0c52cbe6-3b5a5.jpg 400w,\n/LG-Blog-Gatsby/static/test1-624801bc60c20c24e549b23c0c52cbe6-aa04a.jpg 800w,\n/LG-Blog-Gatsby/static/test1-624801bc60c20c24e549b23c0c52cbe6-3bd67.jpg 1200w,\n/LG-Blog-Gatsby/static/test1-624801bc60c20c24e549b23c0c52cbe6-8d5c0.jpg 1600w,\n/LG-Blog-Gatsby/static/test1-624801bc60c20c24e549b23c0c52cbe6-2c8fe.jpg 1920w",srcWebp:"/LG-Blog-Gatsby/static/test1-624801bc60c20c24e549b23c0c52cbe6-b53e0.webp",srcSetWebp:"/LG-Blog-Gatsby/static/test1-624801bc60c20c24e549b23c0c52cbe6-69530.webp 200w,\n/LG-Blog-Gatsby/static/test1-624801bc60c20c24e549b23c0c52cbe6-38abe.webp 400w,\n/LG-Blog-Gatsby/static/test1-624801bc60c20c24e549b23c0c52cbe6-b53e0.webp 800w,\n/LG-Blog-Gatsby/static/test1-624801bc60c20c24e549b23c0c52cbe6-95f52.webp 1200w,\n/LG-Blog-Gatsby/static/test1-624801bc60c20c24e549b23c0c52cbe6-94ed8.webp 1600w,\n/LG-Blog-Gatsby/static/test1-624801bc60c20c24e549b23c0c52cbe6-cf202.webp 1920w",sizes:"(max-width: 800px) 100vw, 800px"}}]}}}},{node:{excerpt:"伴随着学生机的到期，又迎来了一次新的”Hello World”，博客从Wordpress=>自己整=>Hexo=>Gatsby，在这曲折的更换过程中我越来越认识到 没钱 就老老实实弄静态页的真理。 首先先来安利一波 Gatsby ，对比当下较流行静态网站生成器Jekyll…",fields:{slug:"/hello-world/",prefix:"2018-06-25"},frontmatter:{title:"Hello World!!",category:"废话集",author:"todaylg",cover:{children:[{__typename:"ImageSharp",sizes:{base64:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAIAAADwazoUAAAACXBIWXMAAAsTAAALEwEAmpwYAAACo0lEQVQozxXPWVMSAQAA4P1T9e5LVmqSyHJv3GAQh3hAihKpHAkECiYrl4CA3IgossJKBKbDkY5HkmClM0446vTQc/UDvocP+HV2XWlc6/JNA9qUBQ9A/cfOyYzIWWWbigJLSWItYxWbGGn0Gc/bQ3d2QfAT0NL13ASCczSSGbi7vM8327b8F2WwzDIhvZPJnjcZznwZp8qKbXsTvvqAsSDQIpThCFWySuCv9NLsPQQrFm/FY43APnqodW05S8dTyIXAc0A27PTPbPerUaImP+KskKayZGVGYtyR6nNcRbKb5sBxPWSelwA56Aw7IOMY9B5kvX4Bo43p9W8cuYtIVRAUiRfGommjIbKWHvJCffLUqClPH030sjxYtofA9eBpTogKA75wIfLzPj3vKCw4fK5N+yBf8ugBhBdyLXtyT1XhqTEmwvFF25IjA0piVEmIJAxS+AEi002FYKCYqwUjSHzeFh4YiLxbTJkMoqcdFLwYry5QdDnm+08GS8y3nGQpU1hhGBSs9vP8WJqrj2gjEReBtGZhbVYXfzsJ47q3ZJz1GaNqxi02bhPUKFWTA1VboArpHEp1CCIYcRR8FcIwfRjI1UeGSSQbUM0ipY1ULR13gpgYi+n3I+bPN5pUQwrvy+wVsbXcLU91ja518EOP+SGSNA4NRnFM7/8zZAeuW+c2gxVdcSfGpmP5E8fR7UKhpc+ej/kPBuF9sXWXPYu+NBdZ2lwnJ4ATRhjDcTzDTaG52DQH0KjuJe2+4KytVT87bd3mvl6FDy/h0sVU4uS1ty7+sMvWo+Puiil2LFEjDGmUyvWxOF4Be3mI4wI2XEtHaGltLvGn/fu22b65uit+b/srP2C0aU6fji9X6JrcPz/tq4WyDZ0pLxIF5eKgUhLQjgT+AlX4fRNdITK1AAAAAElFTkSuQmCC",aspectRatio:2.2222222222222223,src:"/LG-Blog-Gatsby/static/test0-2d4d7588bb566caf8cf87fed4cb30f71-7a6ea.png",srcSet:"/LG-Blog-Gatsby/static/test0-2d4d7588bb566caf8cf87fed4cb30f71-722ae.png 200w,\n/LG-Blog-Gatsby/static/test0-2d4d7588bb566caf8cf87fed4cb30f71-95f46.png 400w,\n/LG-Blog-Gatsby/static/test0-2d4d7588bb566caf8cf87fed4cb30f71-7a6ea.png 800w,\n/LG-Blog-Gatsby/static/test0-2d4d7588bb566caf8cf87fed4cb30f71-d00bb.png 1200w,\n/LG-Blog-Gatsby/static/test0-2d4d7588bb566caf8cf87fed4cb30f71-e9f87.png 1600w,\n/LG-Blog-Gatsby/static/test0-2d4d7588bb566caf8cf87fed4cb30f71-19e7c.png 1920w",srcWebp:"/LG-Blog-Gatsby/static/test0-2d4d7588bb566caf8cf87fed4cb30f71-33a0b.webp",srcSetWebp:"/LG-Blog-Gatsby/static/test0-2d4d7588bb566caf8cf87fed4cb30f71-2124c.webp 200w,\n/LG-Blog-Gatsby/static/test0-2d4d7588bb566caf8cf87fed4cb30f71-4d4e9.webp 400w,\n/LG-Blog-Gatsby/static/test0-2d4d7588bb566caf8cf87fed4cb30f71-33a0b.webp 800w,\n/LG-Blog-Gatsby/static/test0-2d4d7588bb566caf8cf87fed4cb30f71-f6c75.webp 1200w,\n/LG-Blog-Gatsby/static/test0-2d4d7588bb566caf8cf87fed4cb30f71-f1355.webp 1600w,\n/LG-Blog-Gatsby/static/test0-2d4d7588bb566caf8cf87fed4cb30f71-01ce2.webp 1920w",sizes:"(max-width: 800px) 100vw, 800px"}}]}}}}]},site:{siteMetadata:{facebook:{appId:""}}},bgDesktop:{resize:{src:"/LG-Blog-Gatsby/static/background-89b6b6dbe41d2d7ec877e03b1a4c6b5c-36d59.png"}},bgTablet:{resize:{src:"/LG-Blog-Gatsby/static/background-89b6b6dbe41d2d7ec877e03b1a4c6b5c-e54a0.png"}},bgMobile:{resize:{src:"/LG-Blog-Gatsby/static/background-89b6b6dbe41d2d7ec877e03b1a4c6b5c-198c8.png"}}},pathContext:{}}}});
//# sourceMappingURL=path---index-ad7211909631175bd662.js.map