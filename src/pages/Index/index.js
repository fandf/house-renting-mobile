import { Component } from "react";
import { Carousel, Flex } from "antd-mobile";
import axios from "axios";
import Nav1 from "../../assets/images/nav-1.png";
import Nav2 from "../../assets/images/nav-2.png";
import Nav3 from "../../assets/images/nav-3.png";
import Nav4 from "../../assets/images/nav-4.png";
import { useNavigate } from "react-router-dom";
import "./index.css";

export const withNavigation = (Component) => {
  return (props) => <Component {...props} navigate={useNavigate()} />;
};

const navs = [
  {
    id: 1,
    img: Nav1,
    title: "整租",
    path: "/home/list",
  },
  {
    id: 2,
    img: Nav2,
    title: "合租",
    path: "/home/list",
  },
  {
    id: 3,
    img: Nav3,
    title: "地图找房",
    path: "/home/list",
  },
  {
    id: 4,
    img: Nav4,
    title: "去出租",
    path: "/home/list",
  },
];

class Index extends Component {
  state = {
    swipersLoadFlag: false,
    swipers: [],
  };

  //获取轮播图数据方法
  async getSwipers() {
    const res = await axios.get("http://139.196.45.28:8080/home/swiper");
    console.log("轮播", res);
    this.setState({
      swipers: res.data.body,
      swipersLoadFlag: true,
    });
  }

  componentDidMount() {
    this.getSwipers();
  }

  //渲染轮播图结构
  renderSwipers() {
    return this.state.swipers.map((item) => (
      <a
        key={item.id}
        href="http://www.alipay.com"
        style={{
          display: "inline-block",
          width: "100%",
          height: 212,
        }}
      >
        <img
          src={`http://139.196.45.28:8080${item.imgSrc}`}
          alt=""
          style={{ width: "100%", verticalAlign: "top" }}
          onLoad={() => {
            // fire window resize event to change height
            window.dispatchEvent(new Event("resize"));
            this.setState({ imgHeight: "auto" });
          }}
        />
      </a>
    ));
  }

  renderNavs() {
    return navs.map((item) => (
      <Flex.Item key={item.id} onClick={() => this.props.navigate(item.path)}>
        <img src={item.img} alt="" />
        <h2>{item.title}</h2>
      </Flex.Item>
    ));
  }

  render() {
    return (
      <div className="index">
        {/* 轮播图 */}
        <div className="swiper">
          {this.state.swipersLoadFlag ? (
            <Carousel autoplay infinite>
              {this.renderSwipers()}
            </Carousel>
          ) : (
            ""
          )}
        </div>
        {/* 导航菜单 */}
        <Flex className="nav">{this.renderNavs()}</Flex>
      </div>
    );
  }
}

export default withNavigation(Index);
