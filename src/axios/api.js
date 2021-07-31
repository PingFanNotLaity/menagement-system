import axios from "./http";
// 登录
export const requestLogin = params => {
  return axios.post("/login", params);
}
// 获取菜单栏列表
export const getMenuList = () => {
  return axios.get("/menu");
}
// 获取用户列表
export const getUsersList = (params) => {
  return axios.get("/userslist", params);
}