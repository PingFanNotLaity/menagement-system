import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/assets/css/index.css"
import ElementUi from "element-ui"
import 'element-ui/lib/theme-chalk/index.css'
import "@/assets/icon/icon.css"
import axios from 'axios'
// import Mock from './mock/index'
// Mock.init()
Vue.prototype.$http = axios
Vue.prototype.$message = ElementUi.Message;
Vue.use(ElementUi)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
