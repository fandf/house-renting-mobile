import { Component } from "react";
import { Carousel, Flex, Grid, WingBlank } from "antd-mobile";
import axios from "axios";
import Nav1 from "../../assets/images/nav-1.png";
import Nav2 from "../../assets/images/nav-2.png";
import Nav3 from "../../assets/images/nav-3.png";
import Nav4 from "../../assets/images/nav-4.png";
import { useNavigate } from "react-router-dom";
import "./index.scss";

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
    //轮播图
    swipers: [],
    //租房小组数据
    groups: [],
    //最新资讯
    news: [],
  };

  //获取轮播图数据方法
  async getSwipers() {
    const res = await axios.get("http://139.196.45.28:8080/home/swiper");
    this.setState({
      swipers: res.data.body,
      swipersLoadFlag: true,
    });
  }

  async getGroups() {
    const res = await axios.get("http://139.196.45.28:8080/home/groups");
    this.setState({
      groups: res.data.body,
    });
  }

  async getNews() {
    const res = await axios.get("http://139.196.45.28:8080/home/news");
    console.log("getNews", res);
    this.setState({
      news: res.data.body,
    });
  }

  componentDidMount() {
    this.getSwipers();
    this.getGroups();
    this.getNews();
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

  renderNews() {
    return this.state.news.map((item) => (
      <div className="news-item" key={item.id}>
        <div className="imgwrap">
          <img
            className="img"
            src={`http://139.196.45.28:8080${item.imgSrc}`}
            alt=""
          />
        </div>
        <Flex className="content" direction="column" justify="between">
          <h3 className="title">{item.title}</h3>
          <Flex className="info" justify="between">
            <span>{item.from}</span>
            <span>{item.date}</span>
          </Flex>
        </Flex>
      </div>
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

        {/* 租房小组 */}
        <div className="group">
          <h3 className="group-title">
            租房小组 <span className="more">更多</span>
          </h3>

          <Grid
            data={this.state.groups}
            columnNum={2}
            square={false}
            hasLine={false}
            renderItem={(item) => (
              <Flex className="group-item" justify="around" key={item.id}>
                <div className="desc">
                  <p className="title">{item.title}</p>
                  <span className="info">{item.desc}</span>
                </div>
                <img src={`http://139.196.45.28:8080${item.imgSrc}`} alt="" />
              </Flex>
            )}
          />
        </div>

        {/* 最新资讯 */}
        <div className="news">
          <h3 className="group-title">最新资讯</h3>
          <WingBlank size="md">{this.renderNews()}</WingBlank>
        </div>
      </div>
    );
  }
}
export default withNavigation(Index);
