import React from "react";
import { NavBar } from "antd-mobile";
import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

import "./index.scss";

export const withNavigation = (Component) => {
  return (props) => <Component {...props} navigate={useNavigate()} />;
};

function NavHeader({ children, navigate, onLeftClick }) {
  const defaultHandler = () => navigate(-1);

  return (
    <NavBar
      className="navbar"
      mode="light"
      icon={<i className="iconfont icon-back" />}
      onLeftClick={onLeftClick || defaultHandler}
    >
      {children}
    </NavBar>
  );
}
//添加校验
NavHeader.propTypes = {
  children: PropTypes.string.isRequired,
  onLeftClick: PropTypes.func,
};
export default withNavigation(NavHeader);
