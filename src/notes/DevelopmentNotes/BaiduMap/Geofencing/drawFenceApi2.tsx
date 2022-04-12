/*
 * 地理围栏
 */
// 使用百度原生api自定义封装

//@ts-ignore
var markerIcon = new BMap.Icon(
  'https://images.tuyacn.com/app/tuyaTravel/ding.svg',
  //@ts-ignore
  new BMap.Size(16, 29),
  {}
);

class DrawFence {
  map: any;
  _drawStatus: number;
  private _points: any[];
  private _drawPoint: any[];
  private _overlay: any;
  private _drawType: any;
  private _centerPoint: any;
  result: {
    center?: { lng: number; lat: number };
    path?: any[];
    radius?: number;
  };
  polylineOptions: {};
  polygonOptions: {};
  circleOptions: {};

  constructor(map) {
    this.map = map; // 地图实例
    this._drawStatus = 0; // 绘画状态 0，未完成 1 完成
    this._points = []; //用户绘制的点
    this._drawPoint = []; //实际需要画在地图上的点
    this._overlay = null; // 绘画数据
    this._drawType = ''; // 绘画类型
    this._centerPoint = ''; // 圆中心点
    this.result = {
      center: { lng: 0, lat: 0 },
      path: [],
      radius: 0,
    }; // 返回数据
    // 线配置
    this.polylineOptions = {
      strokeColor: '#1890FF', //边线颜色。
      fillColor: '#1890FF', //填充颜色。当参数为空时，圆形将没有填充效果。
      strokeWeight: 2, //边线的宽度，以像素为单位。
      strokeOpacity: 0.8, //边线透明度，取值范围0 - 1。
      fillOpacity: 0.2, //填充的透明度，取值范围0 - 1。
      strokeStyle: 'solid', //边线的样式，solid或dashed。
    };
    // 多边形配置
    this.polygonOptions = {
      strokeColor: '#1890FF', //边线颜色。
      fillColor: '#1890FF', //填充颜色。当参数为空时，圆形将没有填充效果。
      strokeWeight: 2, //边线的宽度，以像素为单位。
      strokeOpacity: 0.8, //边线透明度，取值范围0 - 1。
      fillOpacity: 0.2, //填充的透明度，取值范围0 - 1。
      strokeStyle: 'solid', //边线的样式，solid或dashed。
    };
    // 圆配置
    this.circleOptions = {
      strokeColor: '#1890FF', //边线颜色。
      fillColor: '#1890FF', //填充颜色。当参数为空时，圆形将没有填充效果。
      strokeWeight: 2, //边线的宽度，以像素为单位。
      strokeOpacity: 0.8, //边线透明度，取值范围0 - 1。
      fillOpacity: 0.2, //填充的透明度，取值范围0 - 1。
      strokeStyle: 'solid', //边线的样式，solid或dashed。
    };
    this.mousemoveAction = this.mousemoveAction.bind(this);
    this.rightclickAction = this.rightclickAction.bind(this);
    this.startAction = this.startAction.bind(this);
    this.endAction = this.endAction.bind(this);
  }

  start(drawType: string) {
    this._drawType = drawType;
    this._drawStatus = 0;
    this.map.setDefaultCursor('crosshair');
    switch (drawType) {
      case 'circle':
        this.map.addEventListener('mousedown', this.startAction);
        break;
      case 'polygon':
        this.map.addEventListener('mousedown', this.startAction);
        this.map.addEventListener('mousemove', this.mousemoveAction);
        this.map.addEventListener('rightclick', this.rightclickAction);
        break;
      default:
        console.error('没有此类型，请检查传参');
    }
  }
  // ------------多边形------------
  /**
   * 鼠标点击的事件
   */
  startAction(e) {
    console.log('startAction', this._points);
    switch (this._drawType) {
      case 'circle':
        this._centerPoint = e.point;
        console.log('this._centerPoint', this._centerPoint, e.point);
        this.drawMarker(e.point);
        //@ts-ignore
        this._overlay = new BMap.Circle(
          this._centerPoint,
          0,
          this.circleOptions
        );
        this.map.addOverlay(this._overlay);
        this.map.removeEventListener('mousedown', this.startAction);
        this.map.addEventListener('mousemove', this.mousemoveAction);
        break;
      case 'polygon':
        this._points.push(e.point);
        this._drawPoint = this._points.concat(
          this._points[this._points.length - 1]
        );
        if (this._points.length === 1) {
          //@ts-ignore
          this._overlay = new BMap.Polygon(
            this._drawPoint,
            this.polygonOptions
          );
          this.map.addOverlay(this._overlay);
        } else {
          this._overlay.setPath(this._drawPoint);
        }
        break;
      default:
        console.error('没有此类型，请检查传参');
    }
  }

  /**
   * 鼠标移动过程的事件
   */
  mousemoveAction(e) {
    switch (this._drawType) {
      case 'circle':
        this._overlay.setRadius(
          this.map.getDistance(this._centerPoint, e.point)
        );
        console.log(
          'mousemoveAction',
          this._overlay,
          this.map.getDistance(this._centerPoint, e.point)
        );
        if (Object.keys(this.map.Li.onmouseup).length === 1) {
          this.map.addEventListener('mouseup', this.endAction);
        }

        break;
      case 'polygon':
        if (this._drawPoint.length !== 0) {
          this._overlay.setPositionAt(this._drawPoint.length - 1, e.point);
        }
        break;
      default:
        console.error('没有此类型，请检查传参');
    }
  }

  /**
   * 鼠标右键的事件
   */
  rightclickAction(e) {
    this.map.setDefaultCursor('pointer');
    switch (this._drawType) {
      case 'circle':
        break;
      case 'polygon':
        this.map.removeEventListener('mousedown', this.startAction);
        this.map.removeEventListener('mousemove', this.mousemoveAction);
        this.map.removeEventListener('rightclick', this.rightclickAction);
        this._points.pop();
        this.result.path = this._points;
        this._drawStatus = 1;
        break;
      default:
        console.error('没有此类型，请检查传参');
    }
  }

  /**
   * 绘制圆形结束
   */
  endAction = function (e) {
    this.result.center = this._overlay.getCenter();
    this.result.radius = this._overlay.getRadius();
    console.log('this._overlay.getRadius();', this._overlay.getRadius());
    this._drawStatus = 1;
    this.map.setDefaultCursor('pointer');
    this.map.removeEventListener('mousedown', this.startAction);
    this.map.removeEventListener('mouseup', this.endAction);
    this.map.removeEventListener('mousemove', this.mousemoveAction);
  };
  // --------------画圆---------------

  /**
   * 画圆
   * @param pointCenter 中心点坐标
   */
  drawCircle(data) {
    // 修改时云端以number传回会损失精度，所以以字符串传回，此处转为number
    //@ts-ignore
    let pointCenter = new BMap.Point(
      Number(data.center.lng),
      Number(data.center.lat)
    );
    this.drawMarker(pointCenter);
    //@ts-ignore
    const overlay = new BMap.Circle(pointCenter, data.radius, {
      ...this.circleOptions,
    });
    //画到地图上面
    this.map.addOverlay(overlay);
    this._overlay = overlay;
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
    const polygon = new BMap.Polygon(polArry, this.polygonOptions);
    this.map.addOverlay(polygon);
    this._overlay = polygon;
    console.log('polArry', polygon);
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
  /*
   * 清楚所有覆盖物
   */
  clearDraw() {
    console.log('clearDraw');
    this._points = []; //用户绘制的点
    this._drawPoint = []; //实际需要画在地图上的点
    this._overlay = null; // 回话数据
    this._drawType = ''; // 绘画类型
    this._centerPoint = ''; // 圆中心点
    this.result = {
      center: { lng: 0, lat: 0 },
      path: [],
      radius: 0,
    }; // 数据
    this.map.clearOverlays();
    this.map.removeEventListener('mouseup', this.endAction);
    this.map.removeEventListener('mousedown', this.startAction);
    this.map.removeEventListener('mousemove', this.mousemoveAction);
    this.map.removeEventListener('rightclick', this.rightclickAction);
  }
}

export default DrawFence;
