import React from "react";

import "./index.scss";

export default class Map extends React.Component {
  componentDidMount() {
    //初始化地图
    //全局对象需要使用window访问，否则造成eslint校验错误
    const map = new window.BMapGL.Map("container");
    //设置中心点坐标
    const point = new window.BMapGL.Point(116.404, 39.915);
    map.centerAndZoom(point, 15);
  }

  render() {
    return (
      <div className="map">
        <div id="container"></div>
      </div>
    );
  }
}
