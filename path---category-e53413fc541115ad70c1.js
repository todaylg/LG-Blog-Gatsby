webpackJsonp([0x68a3bb584008],{388:function(A,t){A.exports={data:{posts:{edges:[{node:{excerpt:"Vue工程结构目录及注意事项（18-7-1） Vue Document 好的基础开发结构可以大大便于之后的维护于拓展。 因为之前使用Vue都是赶时间所以Store没有进行过模块化，组件拆得也不够细（业务和纯组件能解构还是要解耦滴），通常components…",fields:{slug:"/problem-set/",prefix:"2018-07-07"},frontmatter:{title:"备忘册",category:"备忘",author:"todaylg",cover:{children:[{__typename:"ImageSharp",sizes:{base64:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC+ElEQVQozxWSy28bVRTGp4nfM36Ox6/xtH4/J3Fj17Hr1kkaHFd22oTWbuKmSpOUlKqpQlQ1QRFUFKUUCSEBQoAQKlTqtkJCwJIlWSF12wVr/gEk1j9uFlfn6pz7fd8537lSUzWoyhqj/CR3i5MMNYMHZoX9+S7dRo/S1IByZYmJs4tcaA+pibhVqHOvfonR2jaryxvs9LcZzi6ju4NIzwpl3oue4aNWm/u1JluC8EV3nl92Nvnk9jpr954QzdwgmFyj33/A6uAhPx1+yG9ffs7ytV26lQ6jXI1qJEdRVpH++/qQVwsd9jIT3Jmok3CEaIYzvHn+hD+O9lm/ucf17iaN1h693R955/F3PNt4xNH9A0rVJczTFXbNKvulEqYngnQ8usV+eoqtsw1qsSxOS5CYLczPO3d4fHWFcqbHF0+/5/fjf/jgz39pbLxktbvL+zfvkjKmuV7v8Mis87w6ye1iFmnaoXMxkODTuQWmoxlkq+hQL7BTm2X90jWKqT7LV4749uVrtn/4m0LnK3LZFfqtAYo1wVunJzm4vEI9kiXpCSO1tARJqyo8KBJVdBSLytPOZb5pNLmaqaIHTEx/GVNrEtKu4HaaGL4cw/I8H6eaHMYrLKablHWT2MnIq+dmiDvDlCJTqC4dSXIyNLIcvztgJpTCJQTSYz7C1iABVwzdkyTjTfBZ623+Wljh11afh+0RazOL3JqZReqdn+OMlqaii4X40mLcPEWbSl/YoLlCqDY/5wVx1BPHLRamyToRV5yDuRt0fRkhpjFf6nEh3+JisYLkd0QJiA4Nv/AgkGar2qbhDNB0BjFEXnVo9LJT5NUkLnsQ3WeQD2bZbC6R9CewnpLx2yOkwklywk9JtvqwjyvYxhRBrFEUwGnxnwqKhmEPiK37GTvlxTHuxzbu5ZxRIuE1CMkxfEJAEW9O8B6nSsQnLJMtgtCi4LK6xfHitmsiBvDYAshidIfFiyLuLkHsdoQZ1NqCMI5FUpBFzSkwJ7UTjNcZ4n8gFmGwjmqg+gAAAABJRU5ErkJggg==",aspectRatio:2.2222222222222223,src:"/LG-Blog-Gatsby/static/test5-6e63f45c61cd9143a38fd80960b786f7-7a6ea.png",srcSet:"/LG-Blog-Gatsby/static/test5-6e63f45c61cd9143a38fd80960b786f7-722ae.png 200w,\n/LG-Blog-Gatsby/static/test5-6e63f45c61cd9143a38fd80960b786f7-95f46.png 400w,\n/LG-Blog-Gatsby/static/test5-6e63f45c61cd9143a38fd80960b786f7-7a6ea.png 800w,\n/LG-Blog-Gatsby/static/test5-6e63f45c61cd9143a38fd80960b786f7-d00bb.png 1200w,\n/LG-Blog-Gatsby/static/test5-6e63f45c61cd9143a38fd80960b786f7-e9f87.png 1600w,\n/LG-Blog-Gatsby/static/test5-6e63f45c61cd9143a38fd80960b786f7-19e7c.png 1920w",srcWebp:"/LG-Blog-Gatsby/static/test5-6e63f45c61cd9143a38fd80960b786f7-33a0b.webp",srcSetWebp:"/LG-Blog-Gatsby/static/test5-6e63f45c61cd9143a38fd80960b786f7-2124c.webp 200w,\n/LG-Blog-Gatsby/static/test5-6e63f45c61cd9143a38fd80960b786f7-4d4e9.webp 400w,\n/LG-Blog-Gatsby/static/test5-6e63f45c61cd9143a38fd80960b786f7-33a0b.webp 800w,\n/LG-Blog-Gatsby/static/test5-6e63f45c61cd9143a38fd80960b786f7-f6c75.webp 1200w,\n/LG-Blog-Gatsby/static/test5-6e63f45c61cd9143a38fd80960b786f7-f1355.webp 1600w,\n/LG-Blog-Gatsby/static/test5-6e63f45c61cd9143a38fd80960b786f7-01ce2.webp 1920w",sizes:"(max-width: 800px) 100vw, 800px"}}]}}}},{node:{excerpt:"借着毕设的机会，接触了一下WebVR和Web Audio API，以及通信本行的数字信号处理的知识： WebVR-Audio-Visualizer 当年在DPS…",fields:{slug:"/webVR-and-web-audio-api/",prefix:"2018-07-01"},frontmatter:{title:"初探WebVR与Web Audio API",category:"大结",author:"todaylg",cover:{children:[{__typename:"ImageSharp",sizes:{base64:"data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAALABQDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAUBAgME/8QAFwEAAwEAAAAAAAAAAAAAAAAAAAECA//aAAwDAQACEAMQAAABR6zbSeYYCP/EABkQAAIDAQAAAAAAAAAAAAAAAAERAAJBMf/aAAgBAQABBQIdujFN2oC//8QAFREBAQAAAAAAAAAAAAAAAAAAEBH/2gAIAQMBAT8Bh//EABYRAAMAAAAAAAAAAAAAAAAAABASQf/aAAgBAgEBPwFoP//EABcQAQADAAAAAAAAAAAAAAAAAAAgITH/2gAIAQEABj8CVDH/xAAaEAADAAMBAAAAAAAAAAAAAAAAAREhQVHR/9oACAEBAAE/IcPRcr0VwQixiNIP/9oADAMBAAIAAwAAABCEH//EABYRAQEBAAAAAAAAAAAAAAAAABEBEP/aAAgBAwEBPxBWrn//xAAXEQEBAQEAAAAAAAAAAAAAAAABACFR/9oACAECAQE/EABizl//xAAbEAEAAgMBAQAAAAAAAAAAAAABABFRcZFBYf/aAAgBAQABPxAgNBqJyWsKCPluZgTohKlHIu1UfI+7YuJ//9k=",aspectRatio:2.2222222222222223,src:"/LG-Blog-Gatsby/static/test1-624801bc60c20c24e549b23c0c52cbe6-aa04a.jpg",srcSet:"/LG-Blog-Gatsby/static/test1-624801bc60c20c24e549b23c0c52cbe6-9897f.jpg 200w,\n/LG-Blog-Gatsby/static/test1-624801bc60c20c24e549b23c0c52cbe6-3b5a5.jpg 400w,\n/LG-Blog-Gatsby/static/test1-624801bc60c20c24e549b23c0c52cbe6-aa04a.jpg 800w,\n/LG-Blog-Gatsby/static/test1-624801bc60c20c24e549b23c0c52cbe6-3bd67.jpg 1200w,\n/LG-Blog-Gatsby/static/test1-624801bc60c20c24e549b23c0c52cbe6-8d5c0.jpg 1600w,\n/LG-Blog-Gatsby/static/test1-624801bc60c20c24e549b23c0c52cbe6-2c8fe.jpg 1920w",srcWebp:"/LG-Blog-Gatsby/static/test1-624801bc60c20c24e549b23c0c52cbe6-b53e0.webp",srcSetWebp:"/LG-Blog-Gatsby/static/test1-624801bc60c20c24e549b23c0c52cbe6-69530.webp 200w,\n/LG-Blog-Gatsby/static/test1-624801bc60c20c24e549b23c0c52cbe6-38abe.webp 400w,\n/LG-Blog-Gatsby/static/test1-624801bc60c20c24e549b23c0c52cbe6-b53e0.webp 800w,\n/LG-Blog-Gatsby/static/test1-624801bc60c20c24e549b23c0c52cbe6-95f52.webp 1200w,\n/LG-Blog-Gatsby/static/test1-624801bc60c20c24e549b23c0c52cbe6-94ed8.webp 1600w,\n/LG-Blog-Gatsby/static/test1-624801bc60c20c24e549b23c0c52cbe6-cf202.webp 1920w",sizes:"(max-width: 800px) 100vw, 800px"}}]}}}},{node:{excerpt:"伴随着学生机的到期，又迎来了一次新的”Hello World”，博客从Wordpress=>自己整=>Hexo=>Gatsby，在这曲折的更换过程中我越来越认识到 没钱 就老老实实弄静态页的真理。 首先先来安利一波 Gatsby ，对比当下较流行静态网站生成器Jekyll…",fields:{slug:"/hello-world/",prefix:"2018-06-25"},frontmatter:{title:"Hello World!!",category:"废话集",author:"todaylg",cover:{children:[{__typename:"ImageSharp",sizes:{base64:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAIAAADwazoUAAAACXBIWXMAAAsTAAALEwEAmpwYAAACo0lEQVQozxXPWVMSAQAA4P1T9e5LVmqSyHJv3GAQh3hAihKpHAkECiYrl4CA3IgossJKBKbDkY5HkmClM0446vTQc/UDvocP+HV2XWlc6/JNA9qUBQ9A/cfOyYzIWWWbigJLSWItYxWbGGn0Gc/bQ3d2QfAT0NL13ASCczSSGbi7vM8327b8F2WwzDIhvZPJnjcZznwZp8qKbXsTvvqAsSDQIpThCFWySuCv9NLsPQQrFm/FY43APnqodW05S8dTyIXAc0A27PTPbPerUaImP+KskKayZGVGYtyR6nNcRbKb5sBxPWSelwA56Aw7IOMY9B5kvX4Bo43p9W8cuYtIVRAUiRfGommjIbKWHvJCffLUqClPH030sjxYtofA9eBpTogKA75wIfLzPj3vKCw4fK5N+yBf8ugBhBdyLXtyT1XhqTEmwvFF25IjA0piVEmIJAxS+AEi002FYKCYqwUjSHzeFh4YiLxbTJkMoqcdFLwYry5QdDnm+08GS8y3nGQpU1hhGBSs9vP8WJqrj2gjEReBtGZhbVYXfzsJ47q3ZJz1GaNqxi02bhPUKFWTA1VboArpHEp1CCIYcRR8FcIwfRjI1UeGSSQbUM0ipY1ULR13gpgYi+n3I+bPN5pUQwrvy+wVsbXcLU91ja518EOP+SGSNA4NRnFM7/8zZAeuW+c2gxVdcSfGpmP5E8fR7UKhpc+ej/kPBuF9sXWXPYu+NBdZ2lwnJ4ATRhjDcTzDTaG52DQH0KjuJe2+4KytVT87bd3mvl6FDy/h0sVU4uS1ty7+sMvWo+Puiil2LFEjDGmUyvWxOF4Be3mI4wI2XEtHaGltLvGn/fu22b65uit+b/srP2C0aU6fji9X6JrcPz/tq4WyDZ0pLxIF5eKgUhLQjgT+AlX4fRNdITK1AAAAAElFTkSuQmCC",aspectRatio:2.2222222222222223,src:"/LG-Blog-Gatsby/static/test0-2d4d7588bb566caf8cf87fed4cb30f71-7a6ea.png",srcSet:"/LG-Blog-Gatsby/static/test0-2d4d7588bb566caf8cf87fed4cb30f71-722ae.png 200w,\n/LG-Blog-Gatsby/static/test0-2d4d7588bb566caf8cf87fed4cb30f71-95f46.png 400w,\n/LG-Blog-Gatsby/static/test0-2d4d7588bb566caf8cf87fed4cb30f71-7a6ea.png 800w,\n/LG-Blog-Gatsby/static/test0-2d4d7588bb566caf8cf87fed4cb30f71-d00bb.png 1200w,\n/LG-Blog-Gatsby/static/test0-2d4d7588bb566caf8cf87fed4cb30f71-e9f87.png 1600w,\n/LG-Blog-Gatsby/static/test0-2d4d7588bb566caf8cf87fed4cb30f71-19e7c.png 1920w",srcWebp:"/LG-Blog-Gatsby/static/test0-2d4d7588bb566caf8cf87fed4cb30f71-33a0b.webp",srcSetWebp:"/LG-Blog-Gatsby/static/test0-2d4d7588bb566caf8cf87fed4cb30f71-2124c.webp 200w,\n/LG-Blog-Gatsby/static/test0-2d4d7588bb566caf8cf87fed4cb30f71-4d4e9.webp 400w,\n/LG-Blog-Gatsby/static/test0-2d4d7588bb566caf8cf87fed4cb30f71-33a0b.webp 800w,\n/LG-Blog-Gatsby/static/test0-2d4d7588bb566caf8cf87fed4cb30f71-f6c75.webp 1200w,\n/LG-Blog-Gatsby/static/test0-2d4d7588bb566caf8cf87fed4cb30f71-f1355.webp 1600w,\n/LG-Blog-Gatsby/static/test0-2d4d7588bb566caf8cf87fed4cb30f71-01ce2.webp 1920w",sizes:"(max-width: 800px) 100vw, 800px"}}]}}}},{node:{excerpt:"Part 4 Welcome to 3D!! 三维比二维多了一个深度信息(Z轴)，所以为了确定孤独的观测者的状态需要确定三个信息：1.观测的目标的坐标。2.观测者的坐标（视点）。…",fields:{slug:"/webGL-learning-2/",prefix:"2018-03-11"},frontmatter:{title:"初探WebGL(二)",category:"大结",author:"todaylg",cover:{children:[{__typename:"ImageSharp",sizes:{base64:"data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAALABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAQFAf/EABcBAAMBAAAAAAAAAAAAAAAAAAABAgP/2gAMAwEAAhADEAAAAU2cdsnFIzf/xAAbEAEAAgIDAAAAAAAAAAAAAAABAAIDERMUIf/aAAgBAQABBQIx7eskti01gvHb2/8A/8QAFREBAQAAAAAAAAAAAAAAAAAAABH/2gAIAQMBAT8BR//EABYRAQEBAAAAAAAAAAAAAAAAAAABEv/aAAgBAgEBPwGtP//EABwQAAMAAQUAAAAAAAAAAAAAAAABAhEhIjEyQf/aAAgBAQAGPwJKq7E45N2jJZD9Hk//xAAbEAEAAgMBAQAAAAAAAAAAAAABABEhMWFBcf/aAAgBAQABPyEs6ZUeMawH3qJUjgQFVFu5lV0zBymp/9oADAMBAAIAAwAAABBjH//EABcRAQADAAAAAAAAAAAAAAAAAAARQXH/2gAIAQMBAT8QuGn/xAAXEQEBAQEAAAAAAAAAAAAAAAABABEh/9oACAECAQE/EAnS3f/EABoQAQADAQEBAAAAAAAAAAAAAAEAESFBMWH/2gAIAQEAAT8QynDYA4j9l03gpQNd6zMcaWE7xVq9yec02+tMJNnFtUUT/9k=",aspectRatio:2.2222222222222223,src:"/LG-Blog-Gatsby/static/test0-001f0e2d7f4ddf714c80fd94baee6c4e-aa04a.jpg",srcSet:"/LG-Blog-Gatsby/static/test0-001f0e2d7f4ddf714c80fd94baee6c4e-9897f.jpg 200w,\n/LG-Blog-Gatsby/static/test0-001f0e2d7f4ddf714c80fd94baee6c4e-3b5a5.jpg 400w,\n/LG-Blog-Gatsby/static/test0-001f0e2d7f4ddf714c80fd94baee6c4e-aa04a.jpg 800w,\n/LG-Blog-Gatsby/static/test0-001f0e2d7f4ddf714c80fd94baee6c4e-3bd67.jpg 1200w,\n/LG-Blog-Gatsby/static/test0-001f0e2d7f4ddf714c80fd94baee6c4e-8d5c0.jpg 1600w,\n/LG-Blog-Gatsby/static/test0-001f0e2d7f4ddf714c80fd94baee6c4e-6acac.jpg 2400w,\n/LG-Blog-Gatsby/static/test0-001f0e2d7f4ddf714c80fd94baee6c4e-4a67b.jpg 2880w",srcWebp:"/LG-Blog-Gatsby/static/test0-001f0e2d7f4ddf714c80fd94baee6c4e-b53e0.webp",srcSetWebp:"/LG-Blog-Gatsby/static/test0-001f0e2d7f4ddf714c80fd94baee6c4e-69530.webp 200w,\n/LG-Blog-Gatsby/static/test0-001f0e2d7f4ddf714c80fd94baee6c4e-38abe.webp 400w,\n/LG-Blog-Gatsby/static/test0-001f0e2d7f4ddf714c80fd94baee6c4e-b53e0.webp 800w,\n/LG-Blog-Gatsby/static/test0-001f0e2d7f4ddf714c80fd94baee6c4e-95f52.webp 1200w,\n/LG-Blog-Gatsby/static/test0-001f0e2d7f4ddf714c80fd94baee6c4e-94ed8.webp 1600w,\n/LG-Blog-Gatsby/static/test0-001f0e2d7f4ddf714c80fd94baee6c4e-f32e4.webp 2400w,\n/LG-Blog-Gatsby/static/test0-001f0e2d7f4ddf714c80fd94baee6c4e-84040.webp 2880w",sizes:"(max-width: 800px) 100vw, 800px"}}]}}}},{node:{excerpt:"Part 1 万里长征的第一步吧。。。也不知道自己能走几步，毕竟底子真是差啊（方程都解不出来的人研究什么WebGL，好好搬砖不行吗？！经常这样想），但是奈何脑子里的骚操作不上3D…",fields:{slug:"/webGL-learning-1/",prefix:"2018-03-10"},frontmatter:{title:"初探WebGL(一)",category:"大结",author:"todaylg",cover:{children:[{__typename:"ImageSharp",sizes:{base64:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAIAAADwazoUAAAACXBIWXMAAAsSAAALEgHS3X78AAACqklEQVQozwGfAmD9ABwuQR0uQCEzPCM2PU9kd6zB173b8sbp9tLs96LL7HS562i77YLI9Hi66l2g0om73oy73Za202aIsDBajAAqMzoqNzssPUVMZXNHWnB4h5vB2erT+v/l8vmIxfJ7xvx71P6A1P190v1pt+LE3eiQo62SrsKdvt1DX3oAJTE3Mz9FYGxycoifS15+mKSw3/r/5/3+8vz+rOf/j9Xwhdzxk/D/kej+n+v/0uTnWGp3XHSKbYKSJzM6ACg+TFFhb6Wjrs/U26nC08LU4orB6sjp+ajl/pPm/6Hm75Ph5rj//93+/9/4/OH2/LnT2lh4ezJLUyQ0QgA1SllNYW9VZHaToKzW///a8vmNxO53zfiY5Pup7/i7/v/D+vvZ///2///V9fbD5unK5OmnxM5BYGQpQEwAVXGFbIiTSm2CM1pxrMzS7P//ktX0ouf/zfL20/f34f//7v//9v//8P//vvz4jtzbg8TLp9PfVoePPGdxAG+BlYOQnEdaa1BjdbDJz93x9Y/F5qHa9bvf57HV2b7n5+H7+9///8j7+6Pn5orIyXqssaDAyZu1vlpudgB2hpmElJ+Qn6q30tPb///0//+uz+pruuuSxtx9n6p3qbKmztHJ+Pqv19l0rLh0mKdvjZiEnamvv82DkqAAQVFeUWNxZXyLYYahcY6og6PMVZDOaLHpir3li6G0dpCapbi55erpnKevT259V3eLaoOVUGZyUGRtO0hQABooNyo9TRwuOyY9Vi1Ke3yXwJ666Ie08ICt2n2UsVdqgnJ+jpOdpHZ+jlxle2V7jVNmcRwrNhkoLxQhKwAaKkIdLUUdM0wWJjxMVWna3e3o7//f7f+Hm75aZ49PY4REV3g1SWlWaH5+fpRfcYAhMDgJFCEPHCwQHzTKo5QiFPa0MwAAAABJRU5ErkJggg==",aspectRatio:2.2222222222222223,src:"/LG-Blog-Gatsby/static/test0-84267c3736676a9271f27d011db15d4f-7a6ea.png",srcSet:"/LG-Blog-Gatsby/static/test0-84267c3736676a9271f27d011db15d4f-722ae.png 200w,\n/LG-Blog-Gatsby/static/test0-84267c3736676a9271f27d011db15d4f-95f46.png 400w,\n/LG-Blog-Gatsby/static/test0-84267c3736676a9271f27d011db15d4f-7a6ea.png 800w,\n/LG-Blog-Gatsby/static/test0-84267c3736676a9271f27d011db15d4f-d00bb.png 1200w,\n/LG-Blog-Gatsby/static/test0-84267c3736676a9271f27d011db15d4f-e9f87.png 1600w,\n/LG-Blog-Gatsby/static/test0-84267c3736676a9271f27d011db15d4f-21b27.png 2400w,\n/LG-Blog-Gatsby/static/test0-84267c3736676a9271f27d011db15d4f-47328.png 3840w",srcWebp:"/LG-Blog-Gatsby/static/test0-84267c3736676a9271f27d011db15d4f-33a0b.webp",srcSetWebp:"/LG-Blog-Gatsby/static/test0-84267c3736676a9271f27d011db15d4f-2124c.webp 200w,\n/LG-Blog-Gatsby/static/test0-84267c3736676a9271f27d011db15d4f-4d4e9.webp 400w,\n/LG-Blog-Gatsby/static/test0-84267c3736676a9271f27d011db15d4f-33a0b.webp 800w,\n/LG-Blog-Gatsby/static/test0-84267c3736676a9271f27d011db15d4f-f6c75.webp 1200w,\n/LG-Blog-Gatsby/static/test0-84267c3736676a9271f27d011db15d4f-f1355.webp 1600w,\n/LG-Blog-Gatsby/static/test0-84267c3736676a9271f27d011db15d4f-d1fb4.webp 2400w,\n/LG-Blog-Gatsby/static/test0-84267c3736676a9271f27d011db15d4f-26b17.webp 3840w",sizes:"(max-width: 800px) 100vw, 800px"}}]}}}},{node:{excerpt:"主要是对当前Canvas2D渲染框架进行了了解学习，并最后基于Pixi.js以可视化框架Cytoscape为目标动手进行了一波实践： PGraph PixiJS 说到Pixi，如果你在玩一些H5游戏的时候有看过它的源码的话那相信你应该就不会陌生，很多游戏都是基于Pixi…",fields:{slug:"/canvas-renderermation/",prefix:"2017-11-11"},frontmatter:{title:"初探数据可视化与Canvas渲染",category:"大结",author:"todaylg",cover:{children:[{__typename:"ImageSharp",sizes:{base64:"data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAALABQDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAUBAgME/8QAFwEAAwEAAAAAAAAAAAAAAAAAAAECA//aAAwDAQACEAMQAAABR6zbSeYYCP/EABkQAAIDAQAAAAAAAAAAAAAAAAERAAJBMf/aAAgBAQABBQIdujFN2oC//8QAFREBAQAAAAAAAAAAAAAAAAAAEBH/2gAIAQMBAT8Bh//EABYRAAMAAAAAAAAAAAAAAAAAABASQf/aAAgBAgEBPwFoP//EABcQAQADAAAAAAAAAAAAAAAAAAAgITH/2gAIAQEABj8CVDH/xAAaEAADAAMBAAAAAAAAAAAAAAAAAREhQVHR/9oACAEBAAE/IcPRcr0VwQixiNIP/9oADAMBAAIAAwAAABCEH//EABYRAQEBAAAAAAAAAAAAAAAAABEBEP/aAAgBAwEBPxBWrn//xAAXEQEBAQEAAAAAAAAAAAAAAAABACFR/9oACAECAQE/EABizl//xAAbEAEAAgMBAQAAAAAAAAAAAAABABFRcZFBYf/aAAgBAQABPxAgNBqJyWsKCPluZgTohKlHIu1UfI+7YuJ//9k=",aspectRatio:2.2222222222222223,src:"/LG-Blog-Gatsby/static/test7-624801bc60c20c24e549b23c0c52cbe6-aa04a.jpg",srcSet:"/LG-Blog-Gatsby/static/test7-624801bc60c20c24e549b23c0c52cbe6-9897f.jpg 200w,\n/LG-Blog-Gatsby/static/test7-624801bc60c20c24e549b23c0c52cbe6-3b5a5.jpg 400w,\n/LG-Blog-Gatsby/static/test7-624801bc60c20c24e549b23c0c52cbe6-aa04a.jpg 800w,\n/LG-Blog-Gatsby/static/test7-624801bc60c20c24e549b23c0c52cbe6-3bd67.jpg 1200w,\n/LG-Blog-Gatsby/static/test7-624801bc60c20c24e549b23c0c52cbe6-8d5c0.jpg 1600w,\n/LG-Blog-Gatsby/static/test7-624801bc60c20c24e549b23c0c52cbe6-2c8fe.jpg 1920w",srcWebp:"/LG-Blog-Gatsby/static/test7-624801bc60c20c24e549b23c0c52cbe6-b53e0.webp",srcSetWebp:"/LG-Blog-Gatsby/static/test7-624801bc60c20c24e549b23c0c52cbe6-69530.webp 200w,\n/LG-Blog-Gatsby/static/test7-624801bc60c20c24e549b23c0c52cbe6-38abe.webp 400w,\n/LG-Blog-Gatsby/static/test7-624801bc60c20c24e549b23c0c52cbe6-b53e0.webp 800w,\n/LG-Blog-Gatsby/static/test7-624801bc60c20c24e549b23c0c52cbe6-95f52.webp 1200w,\n/LG-Blog-Gatsby/static/test7-624801bc60c20c24e549b23c0c52cbe6-94ed8.webp 1600w,\n/LG-Blog-Gatsby/static/test7-624801bc60c20c24e549b23c0c52cbe6-cf202.webp 1920w",sizes:"(max-width: 800px) 100vw, 800px"}}]}}}},{node:{excerpt:"基础知识 1.SVG (Scalable Vector Graphics) 首先需要知道SVG大概是个啥，SVG即可缩放矢量图形（Scalable Vector Graphics),是一种用XML定义的语言，用来描述二维矢量图形，并且已经是一个W3C标准，所以它也可以和CSS…",fields:{slug:"/svg-outlineAnimation/",prefix:"2017-09-28"},frontmatter:{title:"初探SVG动画",category:"大结",author:"todaylg",cover:{children:[{__typename:"ImageSharp",sizes:{base64:"data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAALABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAwABBP/EABUBAQEAAAAAAAAAAAAAAAAAAAIB/9oADAMBAAIQAxAAAAEi6DC2GN//xAAZEAEBAQEBAQAAAAAAAAAAAAABAgMAEhP/2gAIAQEAAQUCMJ68bifgHar3prBpT//EABURAQEAAAAAAAAAAAAAAAAAAAAR/9oACAEDAQE/AVf/xAAXEQEAAwAAAAAAAAAAAAAAAAAAARJR/9oACAECAQE/AVZ1/8QAHBAAAgICAwAAAAAAAAAAAAAAAAERISJRYYLB/9oACAEBAAY/AlfAmy7Oo5c4+inR/8QAHRAAAgICAwEAAAAAAAAAAAAAAREAMSFBUWFxof/aAAgBAQABPyFBjYNMOa7dACuZWP0040nRL5Mqk2gtkzhXc//aAAwDAQACAAMAAAAQxN//xAAYEQADAQEAAAAAAAAAAAAAAAAAASERUf/aAAgBAwEBPxBuwzw//8QAFhEBAQEAAAAAAAAAAAAAAAAAAAER/9oACAECAQE/EMWx/8QAIBABAQACAgAHAAAAAAAAAAAAAREAITFBUWFxgaHB0f/aAAgBAQABPxBblQrogq74/MQtKQnC4T2q77w1Cjg6npfGnthJKN8igfjHcsJVkB9GAoDYiwQZ/9k=",aspectRatio:2.2222222222222223,src:"/LG-Blog-Gatsby/static/test6-21ca7438687527091bf3efa2c4be52b2-aa04a.jpg",srcSet:"/LG-Blog-Gatsby/static/test6-21ca7438687527091bf3efa2c4be52b2-9897f.jpg 200w,\n/LG-Blog-Gatsby/static/test6-21ca7438687527091bf3efa2c4be52b2-3b5a5.jpg 400w,\n/LG-Blog-Gatsby/static/test6-21ca7438687527091bf3efa2c4be52b2-aa04a.jpg 800w,\n/LG-Blog-Gatsby/static/test6-21ca7438687527091bf3efa2c4be52b2-3bd67.jpg 1200w,\n/LG-Blog-Gatsby/static/test6-21ca7438687527091bf3efa2c4be52b2-8d5c0.jpg 1600w,\n/LG-Blog-Gatsby/static/test6-21ca7438687527091bf3efa2c4be52b2-2c8fe.jpg 1920w",srcWebp:"/LG-Blog-Gatsby/static/test6-21ca7438687527091bf3efa2c4be52b2-b53e0.webp",srcSetWebp:"/LG-Blog-Gatsby/static/test6-21ca7438687527091bf3efa2c4be52b2-69530.webp 200w,\n/LG-Blog-Gatsby/static/test6-21ca7438687527091bf3efa2c4be52b2-38abe.webp 400w,\n/LG-Blog-Gatsby/static/test6-21ca7438687527091bf3efa2c4be52b2-b53e0.webp 800w,\n/LG-Blog-Gatsby/static/test6-21ca7438687527091bf3efa2c4be52b2-95f52.webp 1200w,\n/LG-Blog-Gatsby/static/test6-21ca7438687527091bf3efa2c4be52b2-94ed8.webp 1600w,\n/LG-Blog-Gatsby/static/test6-21ca7438687527091bf3efa2c4be52b2-cf202.webp 1920w",sizes:"(max-width: 800px) 100vw, 800px"}}]}}}}]},site:{siteMetadata:{facebook:{appId:""}}}},pathContext:{}}}});
//# sourceMappingURL=path---category-e53413fc541115ad70c1.js.map