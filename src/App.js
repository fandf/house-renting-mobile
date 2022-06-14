import React from "react";

//导入要使用的组件
// import { Button } from "antd-mobile";
//导入路由
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
//导入首页和城市选择两个组件
import CityList from "./pages/CityList";
import Home from "./pages/Home";
import Map from "./pages/Map";

function App() {
  return (
    <Router>
      <div className="App">
        {/* 配置路由 */}
        <Routes>
          {/* 默认初始化入口/home*/}
          <Route path="/" element={<Navigate to="/home/index" />} />
          <Route path="/home/*" element={<Home />}></Route>
          <Route path="/citylist" element={<CityList />}></Route>
          <Route path="/map" element={<Map />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
