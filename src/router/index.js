import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "/login"
  },
  // 登录
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login.vue")
  },
  // 首页（home）
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/home.vue")
  }
]

const router = new VueRouter({
  routes,
  mode: "history"
})
router.beforeEach( (to, from, next) => {
    const tokenStr = sessionStorage.getItem("token");
    // console.log(to,from);
    if(to.path === "/login") return next();
    if(!tokenStr) return next("/login");
    next();
})

export default router
