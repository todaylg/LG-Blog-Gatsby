webpackJsonp([0xd2a57dc1d883],{74:function(n,e,t){"use strict";function o(n,e,t){var o=a.map(function(t){if(t.plugin[n]){var o=t.plugin[n](e,t.options);return o}});return o=o.filter(function(n){return"undefined"!=typeof n}),o.length>0?o:t?[t]:[]}function r(n,e,t){return a.reduce(function(t,o){return o.plugin[n]?t.then(function(){return o.plugin[n](e,o.options)}):t},Promise.resolve())}e.__esModule=!0,e.apiRunner=o,e.apiRunnerAsync=r;var a=[{plugin:t(376),options:{plugins:[]}},{plugin:t(379),options:{plugins:[]}},{plugin:t(377),options:{plugins:[]}}]},180:function(n,e,t){"use strict";e.components={"component---node-modules-gatsby-plugin-offline-app-shell-js":t(343),"component---src-templates-category-template-js":t(349),"component---src-templates-post-template-js":t(351),"component---src-templates-page-template-js":t(350),"component---src-pages-404-js":t(345),"component---src-pages-category-js":t(346),"component---src-pages-contact-js":t(347),"component---src-pages-index-js":t(348)},e.json={"layout-index.json":t(352),"offline-plugin-app-shell-fallback.json":t(369),"category-miku.json":t(359),"category-废话集.json":t(362),"category-备忘.json":t(360),"category-小结.json":t(361),"category-读书流水.json":t(363),"blender-learnopengl.json":t(356),"miku-setup.json":t(368),"problem-set.json":t(370),"web-vr-and-web-audio-api.json":t(374),"hello-world.json":t(365),"basic-knowledge-mark.json":t(355),"web-gl-learning-1.json":t(373),"internship-summary.json":t(367),"canvas-renderermation.json":t(357),"svg-outline-animation.json":t(371),"test.json":t(372),"404.json":t(353),"category.json":t(358),"contact.json":t(364),"index.json":t(366),"404-html.json":t(354)},e.layouts={"layout---index":t(344)}},181:function(n,e,t){"use strict";function o(n){return n&&n.__esModule?n:{default:n}}function r(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}function a(n,e){if(!n)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?n:e}function u(n,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);n.prototype=Object.create(e&&e.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(n,e):n.__proto__=e)}e.__esModule=!0;var i=Object.assign||function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(n[o]=t[o])}return n},c=t(1),s=o(c),l=t(2),p=o(l),f=t(125),d=o(f),m=t(55),h=o(m),g=t(74),y=t(469),v=o(y),j=function(n){var e=n.children;return s.default.createElement("div",null,e())},x=function(n){function e(t){r(this,e);var o=a(this,n.call(this)),u=t.location;return d.default.getPage(u.pathname)||(u=i({},u,{pathname:"/404.html"})),o.state={location:u,pageResources:d.default.getResourcesForPathname(u.pathname)},o}return u(e,n),e.prototype.componentWillReceiveProps=function(n){var e=this;if(this.state.location.pathname!==n.location.pathname){var t=d.default.getResourcesForPathname(n.location.pathname);if(t)this.setState({location:n.location,pageResources:t});else{var o=n.location;d.default.getPage(o.pathname)||(o=i({},o,{pathname:"/404.html"})),d.default.getResourcesForPathname(o.pathname,function(n){e.setState({location:o,pageResources:n})})}}},e.prototype.componentDidMount=function(){var n=this;h.default.on("onPostLoadPageResources",function(e){d.default.getPage(n.state.location.pathname)&&e.page.path===d.default.getPage(n.state.location.pathname).path&&n.setState({pageResources:e.pageResources})})},e.prototype.shouldComponentUpdate=function(n,e){return!e.pageResources||(!(this.state.pageResources||!e.pageResources)||(this.state.pageResources.component!==e.pageResources.component||(this.state.pageResources.json!==e.pageResources.json||(!(this.state.location.key===e.location.key||!e.pageResources.page||!e.pageResources.page.matchPath&&!e.pageResources.page.path)||(0,v.default)(this,n,e)))))},e.prototype.render=function(){var n=(0,g.apiRunner)("replaceComponentRenderer",{props:i({},this.props,{pageResources:this.state.pageResources}),loader:f.publicLoader}),e=n[0];return this.props.page?this.state.pageResources?e||(0,c.createElement)(this.state.pageResources.component,i({key:this.props.location.pathname},this.props,this.state.pageResources.json)):null:this.props.layout?e||(0,c.createElement)(this.state.pageResources&&this.state.pageResources.layout?this.state.pageResources.layout:j,i({key:this.state.pageResources&&this.state.pageResources.layout?this.state.pageResources.layout:"DefaultLayout"},this.props)):null},e}(s.default.Component);x.propTypes={page:p.default.bool,layout:p.default.bool,location:p.default.object},e.default=x,n.exports=e.default},55:function(n,e,t){"use strict";function o(n){return n&&n.__esModule?n:{default:n}}var r=t(412),a=o(r),u=(0,a.default)();n.exports=u},182:function(n,e,t){"use strict";function o(n){return n&&n.__esModule?n:{default:n}}var r=t(73),a=t(126),u=o(a),i={};n.exports=function(n){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return function(t){var o=decodeURIComponent(t),a=(0,u.default)(o,e);if(a.split("#").length>1&&(a=a.split("#").slice(0,-1).join("")),a.split("?").length>1&&(a=a.split("?").slice(0,-1).join("")),i[a])return i[a];var c=void 0;return n.some(function(n){if(n.matchPath){if((0,r.matchPath)(a,{path:n.path})||(0,r.matchPath)(a,{path:n.matchPath}))return c=n,i[a]=n,!0}else{if((0,r.matchPath)(a,{path:n.path,exact:!0}))return c=n,i[a]=n,!0;if((0,r.matchPath)(a,{path:n.path+"index.html"}))return c=n,i[a]=n,!0}return!1}),c}}},183:function(n,e,t){"use strict";function o(n){return n&&n.__esModule?n:{default:n}}var r=t(112),a=o(r),u=t(74),i=(0,u.apiRunner)("replaceHistory"),c=i[0],s=c||(0,a.default)();n.exports=s},354:function(n,e,t){t(3),n.exports=function(n){return t.e(0xa2868bfb69fc,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(387)})})}},353:function(n,e,t){t(3),n.exports=function(n){return t.e(0xe70826b53c04,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(388)})})}},355:function(n,e,t){t(3),n.exports=function(n){return t.e(0x96d3d69c244f,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(389)})})}},356:function(n,e,t){t(3),n.exports=function(n){return t.e(0xb96950567496,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(390)})})}},357:function(n,e,t){t(3),n.exports=function(n){return t.e(0xddd31d355a60,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(391)})})}},359:function(n,e,t){t(3),n.exports=function(n){return t.e(0xed1d068e546c,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(392)})})}},360:function(n,e,t){t(3),n.exports=function(n){return t.e(0x6c5253d2c844,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(393)})})}},361:function(n,e,t){t(3),n.exports=function(n){return t.e(50353500245631,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(394)})})}},362:function(n,e,t){t(3),n.exports=function(n){return t.e(0x78934b31c1b2,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(395)})})}},363:function(n,e,t){t(3),n.exports=function(n){return t.e(0xbeb53d200c92,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(396)})})}},358:function(n,e,t){t(3),n.exports=function(n){return t.e(0x68a3bb584008,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(397)})})}},364:function(n,e,t){t(3),n.exports=function(n){return t.e(0xa7f31e1aeaea,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(398)})})}},365:function(n,e,t){t(3),n.exports=function(n){return t.e(0x834755aae49e,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(399)})})}},366:function(n,e,t){t(3),n.exports=function(n){return t.e(0x81b8806e4260,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(400)})})}},367:function(n,e,t){t(3),n.exports=function(n){return t.e(39973725597277,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(401)})})}},352:function(n,e,t){t(3),n.exports=function(n){return t.e(60335399758886,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(115)})})}},368:function(n,e,t){t(3),n.exports=function(n){return t.e(0x7274b8f01873,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(402)})})}},369:function(n,e,t){t(3),n.exports=function(n){return t.e(0xbf4c176e203a,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(403)})})}},370:function(n,e,t){t(3),n.exports=function(n){return t.e(0xd101c648d252,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(404)})})}},371:function(n,e,t){t(3),n.exports=function(n){return t.e(0x944b75436eb0,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(405)})})}},372:function(n,e,t){t(3),n.exports=function(n){return t.e(89450997894629,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(406)})})}},373:function(n,e,t){t(3),n.exports=function(n){return t.e(29578651168118,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(407)})})}},374:function(n,e,t){t(3),n.exports=function(n){return t.e(0xf34fe90c249a,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(408)})})}},344:function(n,e,t){t(3),n.exports=function(n){return t.e(0x67ef26645b2a,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(184)})})}},125:function(n,e,t){(function(n){"use strict";function o(n){return n&&n.__esModule?n:{default:n}}e.__esModule=!0,e.publicLoader=void 0;var r=t(1),a=(o(r),t(182)),u=o(a),i=t(55),c=o(i),s=t(126),l=o(s),p=void 0,f={},d={},m={},h={},g={},y=[],v=[],j={},x="",b=[],R={},w=function(n){return n&&n.default||n},C=void 0,N=!0,k=[],_={},P={},E=5;C=t(185)({getNextQueuedResources:function(){return b.slice(-1)[0]},createResourceDownload:function(n){T(n,function(){b=b.filter(function(e){return e!==n}),C.onResourcedFinished(n)})}}),c.default.on("onPreLoadPageResources",function(n){C.onPreLoadPageResources(n)}),c.default.on("onPostLoadPageResources",function(n){C.onPostLoadPageResources(n)});var L=function(n,e){return R[n]>R[e]?1:R[n]<R[e]?-1:0},O=function(n,e){return j[n]>j[e]?1:j[n]<j[e]?-1:0},T=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){};if(h[e])n.nextTick(function(){t(null,h[e])});else{var o=void 0;o="component---"===e.slice(0,12)?d.components[e]:"layout---"===e.slice(0,9)?d.layouts[e]:d.json[e],o(function(n,o){h[e]=o,k.push({resource:e,succeeded:!n}),P[e]||(P[e]=n),k=k.slice(-E),t(n,o)})}},S=function(e,t){g[e]?n.nextTick(function(){t(null,g[e])}):P[e]?n.nextTick(function(){t(P[e])}):T(e,function(n,o){if(n)t(n);else{var r=w(o());g[e]=r,t(n,r)}})},A=function(){var n=navigator.onLine;if("boolean"==typeof n)return n;var e=k.find(function(n){return n.succeeded});return!!e},D=function(n,e){console.log(e),_[n]||(_[n]=e),A()&&window.location.pathname.replace(/\/$/g,"")!==n.replace(/\/$/g,"")&&(window.location.pathname=n)},M=1,U={empty:function(){v=[],j={},R={},b=[],y=[],x=""},addPagesArray:function(n){y=n,x="/LG-Blog-Gatsby",p=(0,u.default)(n,x)},addDevRequires:function(n){f=n},addProdRequires:function(n){d=n},dequeue:function(){return v.pop()},enqueue:function(n){var e=(0,l.default)(n,x);if(!y.some(function(n){return n.path===e}))return!1;var t=1/M;M+=1,j[e]?j[e]+=1:j[e]=1,U.has(e)||v.unshift(e),v.sort(O);var o=p(e);return o.jsonName&&(R[o.jsonName]?R[o.jsonName]+=1+t:R[o.jsonName]=1+t,b.indexOf(o.jsonName)!==-1||h[o.jsonName]||b.unshift(o.jsonName)),o.componentChunkName&&(R[o.componentChunkName]?R[o.componentChunkName]+=1+t:R[o.componentChunkName]=1+t,b.indexOf(o.componentChunkName)!==-1||h[o.jsonName]||b.unshift(o.componentChunkName)),b.sort(L),C.onNewResourcesAdded(),!0},getResources:function(){return{resourcesArray:b,resourcesCount:R}},getPages:function(){return{pathArray:v,pathCount:j}},getPage:function(n){return p(n)},has:function(n){return v.some(function(e){return e===n})},getResourcesForPathname:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){};N&&navigator&&navigator.serviceWorker&&navigator.serviceWorker.controller&&"activated"===navigator.serviceWorker.controller.state&&(p(e)||navigator.serviceWorker.getRegistrations().then(function(n){if(n.length){for(var e=n,t=Array.isArray(e),o=0,e=t?e:e[Symbol.iterator]();;){var r;if(t){if(o>=e.length)break;r=e[o++]}else{if(o=e.next(),o.done)break;r=o.value}var a=r;a.unregister()}window.location.reload()}})),N=!1;if(_[e])return D(e,'Previously detected load failure for "'+e+'"'),t();var o=p(e);if(!o)return D(e,"A page wasn't found for \""+e+'"'),t();if(e=o.path,m[e])return n.nextTick(function(){t(m[e]),c.default.emit("onPostLoadPageResources",{page:o,pageResources:m[e]})}),m[e];c.default.emit("onPreLoadPageResources",{path:e});var r=void 0,a=void 0,u=void 0,i=function(){if(r&&a&&(!o.layoutComponentChunkName||u)){m[e]={component:r,json:a,layout:u,page:o};var n={component:r,json:a,layout:u,page:o};t(n),c.default.emit("onPostLoadPageResources",{page:o,pageResources:n})}};return S(o.componentChunkName,function(n,e){n&&D(o.path,"Loading the component for "+o.path+" failed"),r=e,i()}),S(o.jsonName,function(n,e){n&&D(o.path,"Loading the JSON for "+o.path+" failed"),a=e,i()}),void(o.layoutComponentChunkName&&S(o.layout,function(n,e){n&&D(o.path,"Loading the Layout for "+o.path+" failed"),u=e,i()}))},peek:function(n){return v.slice(-1)[0]},length:function(){return v.length},indexOf:function(n){return v.length-v.indexOf(n)-1}};e.publicLoader={getResourcesForPathname:U.getResourcesForPathname};e.default=U}).call(e,t(116))},409:function(n,e){n.exports=[{componentChunkName:"component---node-modules-gatsby-plugin-offline-app-shell-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"offline-plugin-app-shell-fallback.json",path:"/offline-plugin-app-shell-fallback/"},{componentChunkName:"component---src-templates-category-template-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"category-miku.json",path:"/category/miku/"},{componentChunkName:"component---src-templates-category-template-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"category-废话集.json",path:"/category/废话集/"},{componentChunkName:"component---src-templates-category-template-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"category-备忘.json",path:"/category/备忘/"},{componentChunkName:"component---src-templates-category-template-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"category-小结.json",path:"/category/小结/"},{componentChunkName:"component---src-templates-category-template-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"category-读书流水.json",path:"/category/读书流水/"},{componentChunkName:"component---src-templates-post-template-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"blender-learnopengl.json",path:"/blender-learnopengl/"},{componentChunkName:"component---src-templates-post-template-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"miku-setup.json",path:"/miku-setup/"},{componentChunkName:"component---src-templates-post-template-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"problem-set.json",path:"/problem-set/"},{componentChunkName:"component---src-templates-post-template-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"web-vr-and-web-audio-api.json",path:"/webVR-and-web-audio-api/"},{componentChunkName:"component---src-templates-post-template-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"hello-world.json",path:"/hello-world/"},{componentChunkName:"component---src-templates-post-template-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"basic-knowledge-mark.json",path:"/basic-knowledge-mark/"},{componentChunkName:"component---src-templates-post-template-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"web-gl-learning-1.json",path:"/webGL-learning-1/"},{componentChunkName:"component---src-templates-post-template-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"internship-summary.json",path:"/Internship-summary/"},{componentChunkName:"component---src-templates-post-template-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"canvas-renderermation.json",path:"/canvas-renderermation/"},{componentChunkName:"component---src-templates-post-template-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"svg-outline-animation.json",path:"/svg-outlineAnimation/"},{componentChunkName:"component---src-templates-page-template-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"test.json",path:"/test/"},{componentChunkName:"component---src-pages-404-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"404.json",path:"/404/"},{componentChunkName:"component---src-pages-category-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"category.json",path:"/category/"},{componentChunkName:"component---src-pages-contact-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"contact.json",path:"/contact/"},{componentChunkName:"component---src-pages-index-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"index.json",path:"/"},{componentChunkName:"component---src-pages-404-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"404-html.json",path:"/404.html"}]},185:function(n,e){"use strict";n.exports=function(n){var e=n.getNextQueuedResources,t=n.createResourceDownload,o=[],r=[],a=function(){var n=e();n&&(r.push(n),t(n))},u=function(n){switch(n.type){case"RESOURCE_FINISHED":r=r.filter(function(e){return e!==n.payload});break;case"ON_PRE_LOAD_PAGE_RESOURCES":o.push(n.payload.path);break;case"ON_POST_LOAD_PAGE_RESOURCES":o=o.filter(function(e){return e!==n.payload.page.path});break;case"ON_NEW_RESOURCES_ADDED":}setTimeout(function(){0===r.length&&0===o.length&&a()},0)};return{onResourcedFinished:function(n){u({type:"RESOURCE_FINISHED",payload:n})},onPreLoadPageResources:function(n){u({type:"ON_PRE_LOAD_PAGE_RESOURCES",payload:n})},onPostLoadPageResources:function(n){u({type:"ON_POST_LOAD_PAGE_RESOURCES",payload:n})},onNewResourcesAdded:function(){u({type:"ON_NEW_RESOURCES_ADDED"})},getState:function(){return{pagesLoading:o,resourcesDownloading:r}},empty:function(){o=[],r=[]}}}},0:function(n,e,t){"use strict";function o(n){return n&&n.__esModule?n:{default:n}}var r=Object.assign||function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(n[o]=t[o])}return n},a=t(74),u=t(1),i=o(u),c=t(111),s=o(c),l=t(73),p=t(385),f=t(332),d=o(f),m=t(114),h=t(183),g=o(h),y=t(55),v=o(y),j=t(409),x=o(j),b=t(410),R=o(b),w=t(181),C=o(w),N=t(180),k=o(N),_=t(125),P=o(_);t(236),window.___history=g.default,window.___emitter=v.default,P.default.addPagesArray(x.default),P.default.addProdRequires(k.default),window.asyncRequires=k.default,window.___loader=P.default,window.matchPath=l.matchPath;var E=R.default.reduce(function(n,e){return n[e.fromPath]=e,n},{}),L=function(n){var e=E[n];return null!=e&&(g.default.replace(e.toPath),!0)};L(window.location.pathname),(0,a.apiRunnerAsync)("onClientEntry").then(function(){function n(n){window.___history&&c!==!1||(window.___history=n,c=!0,n.listen(function(n,e){L(n.pathname)||setTimeout(function(){(0,a.apiRunner)("onRouteUpdate",{location:n,action:e})},0)}))}function e(n,e){var t=e.location.pathname,o=(0,a.apiRunner)("shouldUpdateScroll",{prevRouterProps:n,pathname:t});if(o.length>0)return o[0];if(n){var r=n.location.pathname;if(r===t)return!1}return!0}(0,a.apiRunner)("registerServiceWorker").length>0&&t(186);var o=function(n){function e(n){n.page.path===P.default.getPage(o).path&&(v.default.off("onPostLoadPageResources",e),clearTimeout(u),window.___history.push(t))}var t=(0,m.createLocation)(n,null,null,g.default.location),o=t.pathname,r=E[o];r&&(o=r.toPath);var a=window.location;if(a.pathname!==t.pathname||a.search!==t.search||a.hash!==t.hash){var u=setTimeout(function(){v.default.off("onPostLoadPageResources",e),v.default.emit("onDelayedLoadPageResources",{pathname:o}),window.___history.push(t)},1e3);P.default.getResourcesForPathname(o)?(clearTimeout(u),window.___history.push(t)):v.default.on("onPostLoadPageResources",e)}};window.___navigateTo=o,(0,a.apiRunner)("onRouteUpdate",{location:g.default.location,action:g.default.action});var c=!1,f=(0,a.apiRunner)("replaceRouterComponent",{history:g.default})[0],h=function(n){var e=n.children;return i.default.createElement(l.Router,{history:g.default},e)},y=(0,l.withRouter)(C.default);P.default.getResourcesForPathname(window.location.pathname,function(){var t=function(){return(0,u.createElement)(f?f:h,null,(0,u.createElement)(p.ScrollContext,{shouldUpdateScroll:e},(0,u.createElement)(y,{layout:!0,children:function(e){return(0,u.createElement)(l.Route,{render:function(t){n(t.history);var o=e?e:t;return P.default.getPage(o.location.pathname)?(0,u.createElement)(C.default,r({page:!0},o)):(0,u.createElement)(C.default,{page:!0,location:{pathname:"/404.html"}})}})}})))},o=(0,a.apiRunner)("wrapRootComponent",{Root:t},t)[0],c=(0,a.apiRunner)("replaceHydrateFunction",void 0,s.default.render)[0];(0,d.default)(function(){return c(i.default.createElement(o,null),"undefined"!=typeof window?document.getElementById("___gatsby"):void 0,function(){(0,a.apiRunner)("onInitialClientRender")})})})})},410:function(n,e){n.exports=[]},186:function(n,e,t){"use strict";function o(n){return n&&n.__esModule?n:{default:n}}var r=t(55),a=o(r),u="/";u="/LG-Blog-Gatsby/","serviceWorker"in navigator&&navigator.serviceWorker.register(u+"sw.js").then(function(n){n.addEventListener("updatefound",function(){var e=n.installing;console.log("installingWorker",e),e.addEventListener("statechange",function(){switch(e.state){case"installed":navigator.serviceWorker.controller?window.location.reload():(console.log("Content is now available offline!"),a.default.emit("sw:installed"));break;case"redundant":console.error("The installing service worker became redundant.")}})})}).catch(function(n){console.error("Error during service worker registration:",n)})},126:function(n,e){"use strict";e.__esModule=!0,e.default=function(n){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return n.substr(0,e.length)===e?n.slice(e.length):n},n.exports=e.default},332:function(n,e,t){!function(e,t){n.exports=t()}("domready",function(){var n,e=[],t=document,o=t.documentElement.doScroll,r="DOMContentLoaded",a=(o?/^loaded|^c/:/^loaded|^i|^c/).test(t.readyState);return a||t.addEventListener(r,n=function(){for(t.removeEventListener(r,n),a=1;n=e.shift();)n()}),function(n){a?setTimeout(n,0):e.push(n)}})},3:function(n,e,t){"use strict";function o(){function n(n){var e=o.lastChild;return"SCRIPT"!==e.tagName?void("undefined"!=typeof console&&console.warn&&console.warn("Script is not a script",e)):void(e.onload=e.onerror=function(){e.onload=e.onerror=null,setTimeout(n,0)})}var e,o=document.querySelector("head"),r=t.e,a=t.s;t.e=function(o,u){var i=!1,c=!0,s=function(n){u&&(u(t,n),u=null)};return!a&&e&&e[o]?void s(!0):(r(o,function(){i||(i=!0,c?setTimeout(function(){s()}):s())}),void(i||(c=!1,n(function(){i||(i=!0,a?a[o]=void 0:(e||(e={}),e[o]=!0),s(!0))}))))}}o()},375:function(n,e,t){"use strict";var o=t(23);n.exports=function(n,e){n.addEventListener("click",function(n){if(0!==n.button||n.altKey||n.ctrlKey||n.metaKey||n.shiftKey||n.defaultPrevented)return!0;for(var t=null,r=n.target;r.parentNode;r=r.parentNode)if("A"===r.nodeName){t=r;break}if(!t)return!0;if(t.target&&"_self"!==t.target.toLowerCase())return!0;if(t.pathname===window.location.pathname&&""!==t.hash)return!0;if(""===t.pathname)return!0;if(t.pathname.search(/^.*\.((?!htm)[a-z0-9]{1,5})$/i)!==-1)return!0;var a=document.createElement("a");a.href=t.href;var u=document.createElement("a");if(u.href=window.location.href,a.host!==u.host)return!0;var i=new RegExp("^"+u.host+(0,o.withPrefix)("/"));return!i.test(""+a.host+a.pathname)||(n.preventDefault(),e(t.getAttribute("href")),!1)})}},376:function(n,e,t){"use strict";function o(n){return n&&n.__esModule?n:{default:n}}var r=t(23),a=t(375),u=o(a);e.onClientEntry=function(){(0,u.default)(window,function(n){(0,r.navigateTo)(n)})}},377:function(n,e,t){"use strict";e.onRouteUpdate=function(n){var e=n.location;if("function"==typeof ga){if(e&&"undefined"!=typeof window.excludeGAPaths&&window.excludeGAPaths.some(function(n){return n.test(e.pathname)}))return;window.ga("set","page",e?e.pathname+e.search+e.hash:void 0),window.ga("send","pageview")}}},343:function(n,e,t){t(3),n.exports=function(n){return t.e(99219681209289,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(378)})})}},379:function(n,e){"use strict";e.registerServiceWorker=function(){return!0}},412:function(n,e){function t(n){return n=n||Object.create(null),{on:function(e,t){(n[e]||(n[e]=[])).push(t)},off:function(e,t){n[e]&&n[e].splice(n[e].indexOf(t)>>>0,1)},emit:function(e,t){(n[e]||[]).slice().map(function(n){n(t)}),(n["*"]||[]).slice().map(function(n){n(e,t)})}}}n.exports=t},116:function(n,e){function t(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function r(n){if(l===setTimeout)return setTimeout(n,0);if((l===t||!l)&&setTimeout)return l=setTimeout,setTimeout(n,0);try{return l(n,0)}catch(e){try{return l.call(null,n,0)}catch(e){return l.call(this,n,0)}}}function a(n){if(p===clearTimeout)return clearTimeout(n);if((p===o||!p)&&clearTimeout)return p=clearTimeout,clearTimeout(n);try{return p(n)}catch(e){try{return p.call(null,n)}catch(e){return p.call(this,n)}}}function u(){h&&d&&(h=!1,d.length?m=d.concat(m):g=-1,m.length&&i())}function i(){if(!h){var n=r(u);h=!0;for(var e=m.length;e;){for(d=m,m=[];++g<e;)d&&d[g].run();g=-1,e=m.length}d=null,h=!1,a(n)}}function c(n,e){this.fun=n,this.array=e}function s(){}var l,p,f=n.exports={};!function(){try{l="function"==typeof setTimeout?setTimeout:t}catch(n){l=t}try{p="function"==typeof clearTimeout?clearTimeout:o}catch(n){p=o}}();var d,m=[],h=!1,g=-1;f.nextTick=function(n){var e=new Array(arguments.length-1);if(arguments.length>1)for(var t=1;t<arguments.length;t++)e[t-1]=arguments[t];m.push(new c(n,e)),1!==m.length||h||r(i)},c.prototype.run=function(){this.fun.apply(null,this.array)},f.title="browser",f.browser=!0,f.env={},f.argv=[],f.version="",f.versions={},f.on=s,f.addListener=s,f.once=s,f.off=s,f.removeListener=s,f.removeAllListeners=s,f.emit=s,f.prependListener=s,f.prependOnceListener=s,f.listeners=function(n){return[]},f.binding=function(n){throw new Error("process.binding is not supported")},f.cwd=function(){return"/"},f.chdir=function(n){throw new Error("process.chdir is not supported")},f.umask=function(){return 0}},469:function(n,e){"use strict";function t(n,e){for(var t in n)if(!(t in e))return!0;for(var o in e)if(n[o]!==e[o])return!0;return!1}e.__esModule=!0,e.default=function(n,e,o){return t(n.props,e)||t(n.state,o)},n.exports=e.default},345:function(n,e,t){t(3),n.exports=function(n){return t.e(0x9427c64ab85d,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(214)})})}},346:function(n,e,t){t(3),n.exports=function(n){return t.e(0x6bb91e53a7a7,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(215)})})}},347:function(n,e,t){t(3),n.exports=function(n){return t.e(70144966829960,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(216)})})}},348:function(n,e,t){t(3),n.exports=function(n){return t.e(35783957827783,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(217)})})}},349:function(n,e,t){t(3),n.exports=function(n){return t.e(78839606078735,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(218)})})}},350:function(n,e,t){t(3),n.exports=function(n){return t.e(0xd5d9d741ef0b,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(219)})})}},351:function(n,e,t){t(3),n.exports=function(n){return t.e(0xb48ce3051dcc,function(e,o){o?(console.log("bundle loading error",o),n(!0)):n(null,function(){return t(220)})})}}});
//# sourceMappingURL=app-11be54f8689d73870004.js.map