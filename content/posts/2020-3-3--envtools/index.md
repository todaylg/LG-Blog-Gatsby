---
title: EnvTools
category: "大结"
cover: bg.jpg
author: todaylg
---

我们知道实时PBR渲染中的IBL部分是可以预计算的，主要包括：

-   Diffuse部分：辐照度图(irradiance map)或SH(Spherical Harmonics)
    
-   Specular部分：不同粗糙度级别对应的环境贴图、BRDF积分(LUT)
    

一些部分也可通过近似来达到实时计算：

比如LUT可以通过数学曲线来近似：

```glsl
// https://www.unrealengine.com/blog/physically-based-shading-on-mobile
vec3 integrateBRDF(const in vec3 specular, const in float roughness, const in float NoV, const in float f90) {
    const vec4 c0 = vec4(-1.0, -0.0275, -0.572, 0.022);
    const vec4 c1 = vec4(1.0, 0.0425, 1.04, -0.04);
    vec4 r = roughness * c0 + c1;
    float a004 = min(r.x * r.x, exp2(-9.28 * NoV)) * r.x + r.y;
    vec2 AB = vec2(-1.04, 1.04) * a004 + r.zw;
    return specular * AB.x + AB.y * f90;
}
```

以及Three R112以后直接纳入核心API的PMREM(Prefiltered Mipmapped Radiance Environment Map)

这里又歪出来跪一会，R112之前的PMREM是由Prashant Sharma老哥实现的，和这位印度老哥有过一些交流，其已是自由职业，不仅Shader写得惊为天人，甚至还保持着晨练的健康习惯，代码好又身体壮，xmsl。。。

近似和简化毕竟还是会造成一定的效果损失，所以一个好的离线预计算Envtools其实很关键。

现有的一些处理工具包括:

-   babylon使用的[IBLBaker](https://github.com/derkreature/IBLBaker)
    
-   filament的[cmgen](https://github.com/google/filament/tree/master/filament)
    
-   ogl使用的[ibl-converter](https://github.com/oframe/ibl-converter)
    
-   osg.js使用的[envtools](https://github.com/cedricpinson/envtools)
    

但要数其中功能最多最强大的，那还得看envtools。

毕竟宇宙最强Web渲染SketchFab便是基于osg.js的。

## Envtools

在简单的学习一些涉及的知识后（Docker、Cmake、C++、Python）后，便可以一窥强大的envtools到底都干了啥啦。。

[envTools](https://github.com/todaylg/envTools)

核心指令：

## envremap

提供任意两种格式之间的转换，包括：

**rect**

极坐标映射，入射方向r(x,y,z)对应的纹理坐标为：

![image](https://latex.codecogs.com/gif.latex?%5Ctheta%20%3D%20arccos%28z%29)

![image](https://latex.codecogs.com/gif.latex?%5Cvarphi%20%3D%20atan2%28ry%2Crx%29)

投影计算包含反三角函数，计算效率不高，且在两极附近会有较大拉伸。

**ball**

球面映射，缺点是采样分布非常不均匀，球面边缘附近大量方向会被映射到边缘较窄的面积。

**cube**

立方体映射，目前使用最多的映射方式。

关于seamless CubeMap的问题，CubeMap在边缘的顶点采样需要考虑其他面，即需额外采样相邻面进行插值才能得到正确的结果。

WebGL已经提供了[API](https://www.khronos.org/opengl/wiki/Cubemap_Texture#Seamless_cubemap)支持，但一些老的浏览器并不支持seamless CubeMap，envtools的解决方法：[Nvidia的texture-tools的修复方法](https://github.com/castano/nvidia-texture-tools/blob/master/src/nvtt/CubeSurface.cpp)

剩下的**dome**、**hemi**介绍可见Readme，不赘述

在格式转换过程中还可以控制不同的超采样方法(cent/rgss/box2/box3/box4)

Three中也提供了实时的直方图转CubeMap方法，即WebGLRenderTargetCube.fromEquirectangularTexture（R110之前为EquirectangularToCubeGenerator）

## envIrradiance

生成irradiance map并输出SH，计算全局光照中的间接光照

SH可以用作近似irradiance map，通过SH coefficients可重建低频的环境光

相关文章：

-   [https://cseweb.ucsd.edu/~ravir/papers/envmap/envmap.pdf](https://cseweb.ucsd.edu/~ravir/papers/envmap/envmap.pdf)
    
-   [https://zhuanlan.zhihu.com/p/63755519](https://zhuanlan.zhihu.com/p/63755519)
    
-   [https://zhuanlan.zhihu.com/p/50208005](https://zhuanlan.zhihu.com/p/50208005)
    

Three目前对IBL的间接光照部分计算用的是环境贴图的最低一级的mipmap（见函数getLightProbeIndirectIrradiance）

对SH的相关的讨论：

-   [https://github.com/mrdoob/three.js/pull/13115](https://github.com/mrdoob/three.js/pull/13115)
    

## envPrefilter

不同粗糙度对应预计算得到的CubeMap，相关文章:

-   [https://seblagarde.files.wordpress.com/2015/07/course\_notes\_moving\_frostbite\_to\_pbr\_v32.pdf](https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf) p67
    
-   [https://placeholderart.wordpress.com/2015/07/28/implementation-notes-runtime-environment-map-filtering-for-image-based-lighting/](https://placeholderart.wordpress.com/2015/07/28/implementation-notes-runtime-environment-map-filtering-for-image-based-lighting/)
    

Three PMREM(^R112)的实现，直接上的高斯模糊（应用在球面极坐标系），也没有见到相关的Refer，算是个[Hack](https://github.com/mrdoob/three.js/pull/18004)吗？。。

## envBRDF

单独计算并输出BRDF的LUT, 相关文章:

-   [http://blog.selfshadow.com/publications/s2013-shading-course/karis/s2013\_pbs\_epic\_notes\_v2.pdf](http://blog.selfshadow.com/publications/s2013-shading-course/karis/s2013_pbs_epic_notes_v2.pdf)
    

## envBackground

采用高斯模糊进行背景模糊计算，也是耗时最长的一步，

-   [http://stackoverflow.com/questions/17841098/gaussian-blur-standard-deviation-radius-and-kernel-size](http://stackoverflow.com/questions/17841098/gaussian-blur-standard-deviation-radius-and-kernel-size)
    
-   [https://developer.nvidia.com/gpugems/gpugems3/part-vi-gpu-computing/chapter-40-incremental-computation-gaussian](https://developer.nvidia.com/gpugems/gpugems3/part-vi-gpu-computing/chapter-40-incremental-computation-gaussian)
    

filament则是直接延用按粗糙度模糊的方法，速度相对较快，但是输出图像作为背景看起来的效果感觉却不太行。。

## extractLights

分析环境贴图中的明亮区域，从而提取出方向光的方向及亮度等信息

一般用于提取环境贴图中的太阳信息，Viewer中可以在相应位置通过添加一盏方向光来模拟太阳。

相关文章：

-   [http://gl.ict.usc.edu/Research/MedianCut/](http://gl.ict.usc.edu/Research/MedianCut/)
    
-   [https://gist.github.com/Kuranes/fa7466291c9fad3cdfb845f80fabe646](https://gist.github.com/Kuranes/fa7466291c9fad3cdfb845f80fabe646)
    

## process_environment

串联起所有模块的控制入口，除了上面的模块外还添加了：

-   压缩打包
    
-   缩略图生成
    
-   GPU计算加速
    

其基本流程为：

### initBaseTexture

通过oiiotool(OpenImageIO)将输入文件转化为tiff格式的panorama\_highres，调用envremap\_cmd生成cubemap_highres

### thumbnail_create

通过oiiotool将cubemap_highres缩放到所需缩小的尺寸即可

### cubemap\_specular\_create_mipmap

调用envremap\_cmd将cubemap\_highres按mipmap级数进行resize，加速后面的预处理

### specular\_create\_prefilter

调用envPrefilter_cmd进行预处理(panorama、cubeMap)，有mipmap的话则直接加载mipmap

### extract_lights

通过oiiotool将panorama\_highres缩放1024x512，再调用extractLights\_cmd输出灯光信息

### background_create

按传入的background\_size复用对应尺寸的mipmap(没有则取第一层)，再调用envBackground\_cmd进行背景模糊处理

### compute_irradiance

调用envIrradiance\_cmd对cubemap\_highres分析输出irradiance Map及输出shCoef

### compute\_brdf\_lut_ue4

调用envIntegrateBRDF_cmd输出lut

### cubemap_packer

调用cubemap\_packer\_cmd将mipmap数据打包为二进制，在viewer中再进行解包

### compress

调用compress\_7Zip\_cmd对图片资源进行压缩

### writeConfig

将所有相关信息输出到config.json

### zip

最后调用compress\_zip\_cmd将整个文件进行zip打包

整个envTools应用的效果可见：[](https://github.com/todaylg/three-viewer)[https://github.com/todaylg/three-viewer](https://github.com/todaylg/three-viewer)

## Todo

-   [x] 
    
    升级Unbutu及相关依赖包，删除一些冗余依赖
    
-   [ ] 
    
    直接输出多级背景模糊
    
-   [ ] 
    
    学习如何应用OpenCL/Cuda计算加速