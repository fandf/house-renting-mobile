import React from "react";

import { Flex } from "antd-mobile";

import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

// 导入样式
import "./index.scss";

export const withNavigation = (Component) => {
  return (props) => <Component {...props} navigate={useNavigate()} />;
};

function SearchHeader({ navigate, cityName, className }) {
  return (
    <Flex className={["search-box", className || " "].join(" ")}>
      {/* 左侧白色区域 */}
      <Flex className="search">
        {/* 位置 */}
        <div className="location" onClick={() => navigate("/citylist")}>
          <span className="name">{cityName}</span>
          <i className="iconfont icon-arrow" />
        </div>

        {/* 搜索表单 */}
        <div className="form" onClick={() => navigate("/search")}>
          <i className="iconfont icon-seach" />
          <span className="text">请输入小区或地址</span>
        </div>
      </Flex>
      {/* 右侧地图图标 */}
      <i className="iconfont icon-map" onClick={() => navigate("/map")} />
    </Flex>
  );
}

// 添加属性校验
SearchHeader.propTypes = {
  cityName: PropTypes.string.isRequired,
};

export default withNavigation(SearchHeader);
