import axios from "axios"
// axios.defaults.baseURL = "http//:127.0.0.1:3005"
axios.defaults.baseURL = "http//:127.0.0.1:3001"
console.log();
export const requestLogin = params => {
  return axios.post("/login", params);
}
// export const getUserInfo = params => {
//   return axios.get("/userinfo", params);
// }