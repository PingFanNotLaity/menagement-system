import axios from "axios"

// 开发请求地址
axios.defaults.baseURL = "http://127.0.0.1:3005"
axios.defaults.timeout = 100000;
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 为请求头对象添加token验证Authorization字段
  config.headers.Authorization = window.sessionStorage.getItem("token")
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});
// moke 请求地址
// axios.defaults.baseURL = "http//:127.0.0.1:3001"
export default  axios;