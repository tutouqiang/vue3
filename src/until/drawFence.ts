/*
 * 地理围栏
 */
// 百度官方封装的api实现

//@ts-ignore
var markerIcon = new BMap.Icon(
  'https://images.tuyacn.com/app/tuyaTravel/ding.svg',
  //@ts-ignore
  new BMap.Size(16, 29),
  {},
);
class DrawFence {
  map: any;
  drawingManager: any;
  styleOptions: object;
  styleMarker: object;
  overlays: any[];
  result: any;
  drawType: string;

  constructor(map) {
    this.map = map; // 地图实例
    this.drawingManager = null; //绘图实例
    this.overlays = []; // 绘图结果
    this.result = null;
    this.drawType = '';

    // 围栏样式
    this.styleOptions = {
      strokeColor: '#1890FF', //边线颜色。
      fillColor: '#1890FF', //填充颜色。当参数为空时，圆形将没有填充效果。
      strokeWeight: 2, //边线的宽度，以像素为单位。
      strokeOpacity: 0.8, //边线透明度，取值范围0 - 1。
      fillOpacity: 0.2, //填充的透明度，取值范围0 - 1。
      strokeStyle: 'solid', //边线的样式，solid或dashed。
    };

    // market样式
    this.styleMarker = {
      url: 'https://avatars.githubusercontent.com/in/29110?s=48&v=4',
      //@ts-ignore
      size: new BMap.Size(10, 10),
      options: {},
    };
    // this.init();
    this.rightclickEvent = this.rightclickEvent.bind(this);
  }

  init() {
    const that = this;
    // 实例化鼠标绘制工具
    //@ts-ignore
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
    //添加鼠标绘制工具监听事件，用于获取绘制结果
    this.drawingManager.addEventListener(
      'overlaycomplete',
      this.overlaycomplete.bind(this),
    );
    this.map.addEventListener('rightclick', this.rightclickEvent);
  }

  rightclickEvent(e) {
    this.drawingManager.close();
    console.log('rightclickEvent', e, this.drawingManager);
    this.map.removeEventListener('rightclick', this.rightclickEvent); // 清除右键事件
  }

  // 获取绘制结果 marker
  overlaycomplete(e) {
    console.log('overlaycomplete', e.overlay);
    this.overlays.push(e.overlay);
    if (this.drawType === 'circle') {
      this.handleDraw();
    } else if (this.drawType === 'polygon') {
      this.drawingManager.close();
    }
    this.dealData();
  }

  // 关闭圆形画笔、开启编辑
  handleDraw() {
    //获取中心点
    let centerPoint = this.overlays[0].getCenter();
    // @ts-ignore
    var marker = new BMap.Marker(centerPoint, { icon: markerIcon }); // 创建标注
    this.map.addOverlay(marker); // 将标注添加到地图中
    this.overlays.push(marker);
    this.drawingManager.close();
    this.overlays[0].setRadius(500);
    this.overlays[0].enableEditing();
  }

  //清除当前绘图
  clearDraw() {
    this.map.clearOverlays();
    for (var i = 0; i < this.overlays.length; i++) {
      this.map.removeOverlay(this.overlays[i]);
    }
    this.overlays.length = 0;
    this.result = null;
  }

  //画图（多种格式）
  start(type) {
    this.init();
    this.drawType = type;
    this.drawingManager.open();
    // @ts-ignore
    this.drawingManager._setDrawingMode(type);
    // this.map.setDefaultCursor('url(@/components/Geofence/images/ding.cur)');
  }

  /**
   * 画圆
   * @param pointCenter 中心点坐标
   */
  drawCircle(data) {
    // 修改时云端以number传回会损失精度，所以以字符串传回，此处转为number
    //@ts-ignore
    let pointCenter = new BMap.Point(
      Number(data.center.lng),
      Number(data.center.lat),
    );
    this.drawMarker(pointCenter);
    //@ts-ignore
    this.drawingManager = new BMap.Circle(pointCenter, data.radius, {
      ...this.styleOptions,
    });
    //画到地图上面
    this.map.addOverlay(this.drawingManager);
    this.overlays.push(this.drawingManager);
  }

  /**
   * 画多边形
   * @param data
   */
  drawPolygon(data) {
    console.log('drawPolygon', data);
    let polArry = [];
    data.pointList.forEach((item) => {
      //@ts-ignore
      let p = new BMap.Point(item.lng, item.lat);
      polArry.push(p);
    });
    //@ts-ignore
    let polygon = new BMap.Polygon(polArry, this.styleOptions);
    console.log('drawPolygon', polArry, polygon);
    this.map.addOverlay(polygon);
    this.overlays.push(polygon);
  }
  /**
   * 标记
   * @param data
   */
  drawMarker(pointCenter) {
    //@ts-ignore
    var m = new BMap.Marker(pointCenter, { icon: markerIcon });
    this.map.addOverlay(m);
  }

  /**
   * 处理接口需要的数据
   */
  dealData() {
    console.log('this.overlays', this.overlays);
    //边界点
    let path = this.overlays[0].getPath();
    if (this.drawType === 'circle') {
      let center = this.overlays[0].getCenter(); //获取中心点
      let radius = this.overlays[0].getRadius(); // 半径
      this.result = {
        center,
        path,
        radius,
      };
    } else {
      this.result = {
        path,
      };
    }
  }
}

export default DrawFence;
