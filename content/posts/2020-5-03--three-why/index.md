---
title: Threejs问题小记
category: "小结"
cover: bg.jpg
author: todaylg
---

前段日子发现了一门神课：闫令琪老师的[《现代计算机图形学入门》](https://www.bilibili.com/video/BV1X7411F744?p=22)，强烈推荐，完结撒花以后感觉是要从入门到入土了，水好深。。看完课程印象最为深刻的却是闫老师说他学了十年的图形学还是感觉自己什么都不知道。。。这。。。

好在前些日子我们的精神领袖切·格瓦拉重见天日，学是学不完的，这辈子都学不完的，只能随便看看，实在搞不动了就回家种种地，勉强维持一下生活这样子。

不扯了不扯了。。。

主要还是要记录一下Threejs实际使用过程中遇到的一些疑问。。。

### 1.射线检测(Raycaster)的底层实现与性能问题

[Raycaster](https://threejs.org/docs/index.html#api/en/core/Raycaster)中的[Ray](https://threejs.org/docs/index.html#api/en/math/Ray)其实只是一个用于计算射线方向的向量(比如调用setFromCamera)，核心的求交计算交给不同的Object各自实现：

```javascript
function intersectObject( object, raycaster, intersects, recursive ) {
    if ( object.layers.test( raycaster.layers ) ) {
        // 调用object上的raycast方法
        object.raycast( raycaster, intersects );
    }

    if ( recursive === true ) {
        var children = object.children;
        for ( var i = 0, l = children.length; i < l; i ++ ) {
            intersectObject( children[ i ], raycaster, intersects, true );
        }
    }
}
```

比如Mesh的raycast方法：

```javascript
raycast: function ( raycaster, intersects ) {
    ... 
    // 先检测BoundingSphere与BoundingBox是否有交
    if ( raycaster.ray.intersectsSphere( _sphere ) === false ) return;
    if ( _ray.intersectsBox( geometry.boundingBox ) === false ) return;
    ...  
    // 再遍历geometry每个面的3个顶点与ray进行求交
    raycaster.ray.intersectTriangle( pC, pB, pA, true, point )
}
```

具体的求交计算方法可以直接看intersectTriangle方法的源码，Three也给出了[Refer](http://www.geometrictools.com/GTEngine/Include/Mathematics/GteIntrRay3Triangle3.h)

```javascript
// 求射线(Q+tD)与平面的交点(b1*edge1 + b2*edge2)的解
// Solve Q + t*D = b1*E1 + b2*E2 (Q = kDiff, D = ray direction,
// E1 = edge1, E2 = edge2, N = Cross(E1,E2)) by
//   |Dot(D,N)|*b1 = sign(Dot(D,N))*Dot(D,Cross(Q,E2))
//   |Dot(D,N)|*b2 = sign(Dot(D,N))*Dot(D,Cross(E1,Q))
//   |Dot(D,N)|*t = -sign(Dot(D,N))*Dot(Q,N)
```

然而问题来了，上面整个Raycasting的计算都是在CPU(js)进行的，但是Skin和MorphTarget的顶点变换是在GPU(shader)里计算的，所以SkinnedMesh的射线检测就需要特殊处理，相关的讨论Issue可见：

https://github.com/mrdoob/three.js/pull/8953

最直接想到的方法当然就是把顶点变换在Raycast前先进行计算(CPU)，Three在前些天也提供了支持(R116):

[SkinnedMesh: Apply skinning while raycasting by donmccurdy · Pull Request #19178 · mrdoob/three.js · GitHub](https://github.com/mrdoob/three.js/pull/19178)

但是这样在CPU端添加了这么多的计算量，性能自然就不那么顶了，这时候GPU Object Picking就有声音了，相关原理示例可见：

[three.js webgl_interactive_cubes_gpu examples](http://192.168.1.105:8080/examples/?q=gpu#webgl_interactive_cubes_gpu)

现成的封装库：

[three_js_gpu_picking](https://github.com/bzztbomb/three_js_gpu_picking)

原理其实就是为每个Gemetry添加一个顶点ID信息(color atrribute)，之后以vertex color先渲染当前鼠标所在位置单个像素，再获取回ID值即可

### 2.glTF与Draco压缩

Three里使用Draco需要额外再引入解析文件：

* `draco_decoder.js`（792KB）

或wasm：

* `draco_decoder.wasm`（323 KB）

* `draco_wasm_wrapper.js`（65 KB）

额外引入的解析文件大小只是需要考虑的其中一个因素，还需要考虑在客户端增加的解码时间损耗（在移动端一些低端机器上尤为明显），并且需要实际测试移动端低端机器对wasm的支持有没有坑。

所以模型文件不是特别大的情况下(且要兼顾移动端)，不采用Draco压缩反而更好。

### 3.无伤(不动源码)改Shader

可以通过重写Material的onBeforeCompile钩子来替换需要改动的Shader代码：

```javascript
material.onBeforeCompile = (shader) => {
    shader.fragmentShader = shader.fragmentShader.replace(
        `varying vec3 vViewPosition;`,
        `XXX`,
    );
}
```

有伤的话可以直接改THREE.ShaderLib/ShaderChunk

```javascript
THREE.ShaderChunk.shadowmap_pars_fragment =
    THREE.ShaderChunk.shadowmap_pars_fragment
        .replace( /float getShadow/, t => `XXX\n${ t }` )
```

如果需要修改的太多了，也可以直接用Shader/Raw Material，再在Shader里面引可以共用的ShaderChunk。

### 4.Loader的加载

Three核心的FileLoader的load方法会返回XMLHttpRequest对象，但是外层模型加载的Loader(比如GLTFLoader)并对这个XMLHttpRequest对象做处理，所以要反悔的话需要改一下Loader把XMLHttpRequest对象返回出来：

```javascript
// GLTFLoader
...
var loader = new FileLoader( scope.manager );
...
// 从GLTFLoader里再return出去
return loader.load(...)
```

拿到XMLHttpRequest对象以后调用abort方法就完事啦：

```javascript
...
let timeoutId = null;
return new Promise((resolve, reject) => {
    const timeOutDuration = 10 * 1000; // 10秒超时
    let isEnd = false;
    let request = loader.load(path, (gltf) => {
        if(!isEnd){
            resolve(gltf);
            clearTimeout(timeOutId);
            isEnd = true;
         }
    });
    // 超时报错
    timeoutId = setTimeout(() => {
        if(!isEnd){
            isEnd = true;
            reject();
            if(request) request.abort();
            clearTimeout(timeOutId);
         }
     }, timeOutDuration);
});
```

相关Issue可见：

https://github.com/mrdoob/three.js/issues/6641

### 5.后处理与Alpha

绝大多数后处理效果都考虑alpha，比如Bloom、Outline等
相关Issue和改动处理见：

https://github.com/mrdoob/three.js/issues/14104


##  ToRecord

- [ ] 移动端需要注意的Texture unit limit
- [ ] IOS深度精度问题：[issue](https://github.com/vanruesc/postprocessing/issues/199)
- [ ] glViewport与glScissors
- [ ] 太多了，懒得记了（逃。。）

