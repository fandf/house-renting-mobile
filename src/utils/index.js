import axios from "axios";

export const getCurrentCity = () => {
  const localCity = JSON.parse(localStorage.getItem("hrm_city"));
  if (!localCity) {
    return new Promise((resolve, reject) => {
      //通过i p定位获取当前城市名称
      const curCity = new window.BMapGL.LocalCity();
      curCity.get(async (res) => {
        try {
          console.log("utils ", res);
          const result = await axios.get(
            `http://139.196.45.28:8080/area/info?name=${res.name}`
          );
          //存储本地存储
          console.log("curCity", result);
          localStorage.setItem("hrm_city", JSON.stringify(result.data.body));
          resolve(result.data.body);
        } catch (e) {
          reject(e);
        }
      });
    });
  }
  return Promise.resolve(localCity);
};
