import React from "react";
//导入NavBar组件
import { NavBar, Toast } from "antd-mobile";
import "./index.scss";
import axios from "axios";
import { List, AutoSizer } from "react-virtualized";
import { getCurrentCity } from "../../utils";
import { useNavigate } from "react-router-dom";

const formatCityData = (list) => {
  const cityList = {};
  list.forEach((item) => {
    //获取城市首字母
    const first = item.short.substr(0, 1);
    //判断cityList是否有该分类
    if (cityList[first]) {
      //有，直接push数据
      cityList[first].push(item);
    } else {
      //没有，创建数组
      cityList[first] = [item];
    }
  });
  const cityIndex = Object.keys(cityList).sort();
  return {
    cityList,
    cityIndex,
  };
};
//索引（A, B等）高度
const TITLE_HEIGHT = 36;
//每个城市名称高度
const NAME_HEIGHT = 50;
//有房源的城市
const HOUSE_CITY = ["北京", "上海", "广州", "深圳"];
const formatCityIndex = (letter) => {
  switch (letter) {
    case "#":
      return "当前定位";
    case "hot":
      return "热门城市";
    default:
      return letter.toUpperCase();
  }
};
export const withNavigation = (Component) => {
  return (props) => <Component {...props} navigate={useNavigate()} />;
};
class CityList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityList: {},
      cityIndex: [],
      //指定右侧高亮的索引号
      activeIndex: 0,
    };

    this.cityListComponent = React.createRef();
  }

  async componentDidMount() {
    await this.getCityList();
    //提前计算list中每一行的高度，实现scrollToRow精确跳转
    this.cityListComponent.current.measureAllRows();
  }

  async getCityList() {
    //城市数据
    const res = await axios.get("http://139.196.45.28:8080/area/city?level=1");
    const { cityList, cityIndex } = formatCityData(res.data.body);
    //热门城市数据
    const hotRes = await axios.get("http://139.196.45.28:8080/area/hot");
    cityList["hot"] = hotRes.data.body;
    cityIndex.unshift("hot");
    const curCity = await getCurrentCity();
    cityList["#"] = [curCity];
    cityIndex.unshift("#");

    console.log("cityList", cityList);
    console.log("cityIndex", cityIndex);
    this.setState({
      cityList: cityList,
      cityIndex: cityIndex,
    });
  }

  rowRenderer = ({
    key, // Unique key within array of rows
    index, // 索引
    isScrolling, // 是否正在滚动中
    isVisible, // 当前项在list中可见
    style, // 样式
  }) => {
    const { cityIndex, cityList } = this.state;
    const letter = cityIndex[index];
    return (
      //获取每一行字母索引

      <div key={key} style={style} className="city">
        <div className="title">{formatCityIndex(letter)}</div>
        {cityList[letter].map((item) => (
          <div
            key={item.value}
            className="name"
            onClick={() => this.changeCity(item)}
          >
            {item.label}
          </div>
        ))}
      </div>
    );
  };

  changeCity({ label, value }) {
    if (HOUSE_CITY.indexOf(label) > -1) {
      localStorage.setItem("hrm_city", JSON.stringify({ label, value }));
      this.props.navigate(-1);
    } else {
      Toast.info("该城市暂无数据", 1);
    }
  }

  //动态加载高度
  getRowHeight = ({ index }) => {
    const { cityIndex, cityList } = this.state;
    return TITLE_HEIGHT + cityList[cityIndex[index]].length * NAME_HEIGHT;
  };

  //list组件渲染行信息
  onRowsRendered = ({ startIndex }) => {
    if (this.state.activeIndex !== startIndex) {
      this.setState({
        activeIndex: startIndex,
      });
    }
  };

  renderCityIndex() {
    const { cityIndex, activeIndex } = this.state;
    return cityIndex.map((item, index) => (
      <li
        className="city-index-item"
        key={item}
        onClick={() => {
          this.cityListComponent.current.scrollToRow(index);
        }}
      >
        <span className={activeIndex === index ? "index-active" : ""}>
          {item === "hot" ? "热" : item.toUpperCase()}
        </span>
      </li>
    ));
  }

  render() {
    return (
      <div className="citylist">
        <NavBar
          className="navbar"
          mode="light"
          icon={<i className="iconfont icon-back" />}
          onLeftClick={() => console.log("onLeftClick")}
        >
          城市选择
        </NavBar>
        {/* 城市列表 */}
        <AutoSizer>
          {({ width, height }) => (
            <List
              ref={this.cityListComponent}
              width={width}
              height={height}
              rowCount={this.state.cityIndex.length}
              rowHeight={this.getRowHeight}
              rowRenderer={this.rowRenderer}
              onRowsRendered={this.onRowsRendered}
              scrollToAlignment="start"
            />
          )}
        </AutoSizer>

        {/* 右侧索引列表 */}
        <ul className="city-index">{this.renderCityIndex()}</ul>
      </div>
    );
  }
}
export default withNavigation(CityList);
