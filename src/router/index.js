import Vue from 'vue'
import VueRouter from 'vue-router'
 
// 解决点击重复点击面包屑报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

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
    component: () => import("@/views/home.vue"),
    // redirect: "/welcome",
    children: [
      // 首页主体
      {
        path: "/welcome",
        component: () => import("@/components/welcome/welcome.vue")
      },
      // 用户列表
      {
        path: "/users",
        component: () => import("@/components/user/users.vue")
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  mode: "history"
})
router.beforeEach( (to, from, next) => {
    const tokenStr = sessionStorage.getItem("token");
    // console.log(to,from);
    if(to.path === "/login") {
      sessionStorage.clear();
      return next();
    } 
    if(!tokenStr) return next("/login");
    next();
})

export default router
