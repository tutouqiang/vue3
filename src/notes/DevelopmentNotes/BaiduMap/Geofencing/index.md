# 地理围栏
涂鸦出行地理围栏实现

项目结构：乾坤微前端框架，geofence-app 子应用

## 一、使用百度地图官方封装的 Api DrawingManager

### 1、引入

```javascript
<!--百度地图Api-->
<script type="text/javascript" src="http://api.map.baidu.com/api?v=3.0&ak=CUAcMLy4o2yyzbQBLlKffiuGKHIZdUBk"></script>

<!--加载鼠标绘制工具-->
<script type="text/javascript" src="http://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.js"></script>
	<link rel="stylesheet" href="http://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.css"/>
```

### 2、使用

根据百度 api 文档使用，详情可见 drawFenceApi.ts

```javascript
this.drawingManager = new BMapLib.DrawingManager(this.map, {
  isOpen: false, //是否开启绘制模式
  enableDrawingTool: false, //是否显示工具栏
  drawingToolOptions: {
    //@ts-ignore
    anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
    //@ts-ignore
    offset: new BMap.Size(5, 5), //偏离值
  },
  circleOptions: this.styleOptions, //圆的样式
  polygonOptions: this.styleOptions, //多边形的样式
});
```

### 3、使用感受

#### 优点

该方法是百度封装的快速上手的 api，可以快速的搭建好绘制各种覆盖物的方法。

#### 缺点

交互操作不可变、默认样式不可变。如多边形绘制结束，只有双击才可以触发绘画结束，拿到绘画的数据。

我所在的项目要求鼠标右键结束绘画、画圆时的交互也与封装的不同，所以需要自己重新封装，满足业务需要。

## 二、使用百度地图原生 Api 封装

根据需要绘画的形状使用不同的 Api 实现，绘画操作可根据自定义监听事件，绘画交互更加灵活

示例代码可见: drawFenceApi2.ts

## 三、修改百度的方法 DrawingManager 下载脚本到本地，根据需要修改，然后本地引入该脚本。

根据该方式，速度快、收益最大，且官方脚本做了很多边缘情况的处理。更改之后的脚本要注意测试。
