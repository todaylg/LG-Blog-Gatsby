---
title: Viewer与PBR
category: "大结"
cover: bg.png
author: todaylg
---

在通过Envtools将预计算的资源进行打包后，自然就需要在Viewer进行解包和渲染啦:

https://github.com/todaylg/three-viewer

歪出来感叹一句，搂完Viewer以后照常发了个Twitter纪念，但是没想到得到了Threejs官推的转推以及Mr.doob大神的点赞，开心得一批哈哈哈~~真是简单的快乐~~

<div style="text-align: center">  
<img style="width:70%;" src="https://raw.githubusercontent.com/todaylg/LG-Blog-Gatsby/master/content/posts/2020-3-19--viewer-pbr/twitter.png">  
</div>

回到正题，首先需要Viewer完成的是IBL部分的光照，之前在EnvTools打包好的资源就派上用场啦，主要的解包流程可以直接参考osg.js的实现，解完包以后可以得到：

* SH coefficients
* Prefiltered Mipmap CubeMap
* Blur Background CubeMap
* BRDF LUT
* Sunlight

基于这些资源便可以拟合环境光照的效果啦

## 环境光照

### IBL

IBL也是分为Diffuse部分和Specular部分。

Diffuse部分可以直接通过SH coefficients计算，相关文章：

* https://cseweb.ucsd.edu/~ravir/papers/envmap/envmap.pdf

* https://zhuanlan.zhihu.com/p/63755519

Specular部分则是根据不同粗糙度对不同级别Mipmap的预计算CubeMap进行采样，再进行BRDF的计算，相关文章：

https://zhuanlan.zhihu.com/p/66518450

手机端出于性能原因需要用过拟合函数代替LUT采样，相关文章：

* https://www.unrealengine.com/blog/physically-based-shading-on-mobile
* https://zhuanlan.zhihu.com/p/68158277

### Background

直接使用一个大的Sphere包裹场景，然后在背面采样Background CubeMap，最后再通过矩阵同步一下相机的运动方向即可。

### Sunlight

通过Envtools可以拿到环境贴图中最亮区域的方向，在场景同一方向添加一盏方向光即可模拟太阳

### Env Rotation

为了同步视觉效果，环境光的旋转不仅影响到IBL的计算，Background和Sunlight也需要同步旋转：

```javascript
updateEnvironmentRotation(value) {
  // Get panel rotation
  this.envRotationFromPanel.makeRotationY(value);
  // Sync camera roatation
  this.cameraRotationMatrix.makeRotationFromQuaternion(this.camera.quaternion);
  this.envRotationMat4.multiplyMatrices(this.envRotationFromPanel, this.cameraRotationMatrix);
  this.envRotationMat.value.setFromMatrix4(this.envRotationMat4);
  this.envRotationMatBG.value.setFromMatrix4(this.envRotationFromPanel);
  // Direction compute by position
  let resultSunlight = this.sunLightStartPos.clone();
  this.sunLightPanelRotateMat.getInverse(this.envRotationFromPanel);
  resultSunlight.applyMatrix4(this.sunLightPanelRotateMat);
  this.sunLight.position.copy(resultSunlight);
}
```

相关文章：

* https://zhuanlan.zhihu.com/p/50699527

## 直接光照

光光有环境光照是不够的，想要在场景中添加的直接光源有效果（比如前面为了模拟日光添加方向光），就还需要再实现直接光照的部分。

直接光照也同样还是分为Diffuse部分和Specular部分。各部分不同的渲染方程有很多种，为了便于比对不同方程的不同渲染效果，最后是将方程弄成了可选列表放在了Viewer中（直接把UE4 BRDF中的公式全搬了过来😂，Unreal强无敌）。

Diffuse部分的渲染方程：

* Lambert
* Burley：[Burley 2012, "Physically-Based Shading at Disney"]
* OrenNayar：[Gotanda 2012, "Beyond a Simple Physically Based Blinn-Phong Model in Real-Time"]
* Gotanda：[Gotanda 2014, "Designing Reflectance Models for New Consoles"]

相关文章：

https://zhuanlan.zhihu.com/p/53086060

Specular部分还是我们熟悉的Cook-Torrance BRDF

Normal Distribution Functions(NDF)方程：

* Blinn：[Blinn 1977, "Models of light reflection for computer synthesized pictures"]
* Beckmann：[Beckmann 1963, "The scattering of electromagnetic waves from rough surfaces"]
* GGX / Trowbridge-Reitz：[Walter et al. 2007, "Microfacet models for refraction through rough surfaces"]

相关文章：

https://zhuanlan.zhihu.com/p/69380665

Fresnel方程：

* Schlick：[Schlick 1994, "An Inexpensive BRDF Model for Physically-Based Rendering"]
* CookTorrance：[Cook-Torrance 1982]

相关文章：

https://zhuanlan.zhihu.com/p/53086060

Visibility Term方程：

* Implicit
* Neumann：[Neumann et al. 1999, "Compact metallic reflectance models"]
* Kelemen：[Kelemen 2001, "A microfacet based coupled specular-matte brdf model with importance sampling"]
* Schlick：[Schlick 1994, "An Inexpensive BRDF Model for Physically-Based Rendering"]
* Smith：[Smith 1967, "Geometrical shadowing of a random rough surface"]
* SmithJointApprox：[Heitz 2014, "Understanding the Masking-Shadowing Function in Microfacet-Based BRDFs"]

相关文章：

https://zhuanlan.zhihu.com/p/81708753

其实作为工程党，只需要大概知道有这么些公式就拉倒了，强撸Paper必定会导致秃顶的惨剧。

所以我觉得最合理的流程应该是这样的：先等着算法大佬对公式进行分析总结，再等Unreal对公式进行实践及优化，最后捡现成的，直接去翻Unreal的源码把函数扒出来用即可，这样头发又不用掉，效果还好，简直乃神策也。

其实考虑到效果及后续扩展(比如各项异性材质)，渲染方程基本都是：

Diffuse: Lambert

Specular: D_GGX * Vis_SmithJointApprox * F_Schlick

最后再放几张渲染图：

可爱的短发塞尔达！

<div style="text-align: center">  
<img style="width:100%;" src="https://raw.githubusercontent.com/todaylg/three-viewer/master/intro/zelda.png">  
</div>

MMMMMMaster Sword!!！

<div style="text-align: center">  
<img style="width:100%;" src="https://raw.githubusercontent.com/todaylg/LG-Blog-Gatsby/master/content/posts/2020-3-19--viewer-pbr/sword.png">   
</div>

来自深渊！

<div style="text-align: center">  
<img style="width:100%;" src="https://raw.githubusercontent.com/todaylg/LG-Blog-Gatsby/master/content/posts/2020-3-19--viewer-pbr/bg.png">  
</div>

在线体验地址 ：https://todaylg.com/three-viewer/

### Todo

- [x] Specular Glossiness Material

- [x] Panorama EnvMap(For the devices that dont support lod)

- [x] Fix energy loss in specular reflectance
  
- [ ] Clearcoat

- [ ] Anisotropy(GGX)
  
- [ ] Sheen

- [ ] Spot/Point Light and Shadow

- [ ] MorphTarget/Skin Animation

- [ ] Post-processing(SSS、TAA)

- [ ] Ground Shadow

- [ ] Shadow Jitter

其实Todo List渐渐变成了Undo List（逃。。。）

