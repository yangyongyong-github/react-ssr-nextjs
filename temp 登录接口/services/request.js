import axios from "axios";
import isBrowser from "../util/isBrowser"

const config = {};
if (isBrowser()) {
  //服务器
  config.baseURL = "http://yuanjin.tech:5100/";
} else {
  //浏览器
  config.baseURL = "http://yuanjin.tech:5100/";
  // 这里由于库本身ｂｕｇ的原因，不再使用代理
}

const instance = axios.create(config);

export default instance;
