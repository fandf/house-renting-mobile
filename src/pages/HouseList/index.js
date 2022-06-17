import { Flex } from "antd-mobile";
import { Component } from "react";
import SearchHeader from "../../components/SearchHeader";
import { useNavigate } from "react-router-dom";
import style from "./index.module.css";

const { label } = JSON.parse(localStorage.getItem("hrm_city"));

export const withNavigation = (Component) => {
  return (props) => <Component {...props} navigate={useNavigate()} />;
};

class HouseList extends Component {
  render() {
    return (
      // 标题栏
      <div>
        <Flex>
          <i
            className="iconfont icon-back"
            onClick={() => {
              this.props.navigate(-1);
            }}
          />
          <SearchHeader cityName={label} className={style.searchHeader} />
        </Flex>
      </div>
    );
  }
}

export default withNavigation(HouseList);
