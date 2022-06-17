/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

//导入组件自己的样式文件
import "./index.css";

import News from "../News";
import Index from "../Index";
import HouseList from "../HouseList";
import Profile from "../Profile";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { TabBar } from "antd-mobile";

export const withNavigation = (Component) => {
  return (props) => (
    <Component {...props} navigate={useNavigate()} location={useLocation()} />
  );
};

const tabItems = [
  { title: "首页", icon: "icon-ind", path: "/home/index" },
  { title: "找房", icon: "icon-findHouse", path: "/home/list" },
  { title: "资讯", icon: "icon-infom", path: "/home/news" },
  { title: "我的", icon: "icon-my", path: "/home/profile" },
];

class Home extends React.Component {
  state = {
    selectedTab: this.props.location.pathname,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        selectedTab: this.props.location.pathname,
      });
    }
  }

  renderTabBarItem() {
    return tabItems.map((item) => (
      <TabBar.Item
        title={item.title}
        key={item.title}
        icon={<i className={`iconfont ${item.icon}`} />}
        selectedIcon={<i className={`iconfont ${item.icon}`} />}
        selected={this.state.selectedTab === item.path}
        onPress={() => {
          this.setState({
            selectedTab: item.path,
          });
          //路由切换
          this.props.navigate(item.path);
        }}
      ></TabBar.Item>
    ));
  }

  render() {
    return (
      <div className="home">
        {/* 2.3渲染子路由 */}
        <Routes>
          <Route path="index" element={<Index />}></Route>
          <Route path="news" element={<News />}></Route>
          <Route path="list" element={<HouseList />}></Route>
          <Route path="profile" element={<Profile />}></Route>
        </Routes>
        {/* TabBar */}

        <TabBar tintColor="#21b97a" barTintColor="white" noRenderContent={true}>
          {this.renderTabBarItem()}
        </TabBar>
      </div>
    );
  }
}

export default withNavigation(Home);
