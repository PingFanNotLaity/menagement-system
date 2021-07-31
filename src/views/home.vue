<template>
  <div class="home-container">
    <el-container class="container-box">
      <el-header>
        <!-- 首页头部 -->
        <div class="header-box">
          <!-- 头部logo -->
          <div class="logo">
            <div class="logo-image">
              <img src="../assets/images/logo.png" alt="" />
            </div>
          </div>
          <!-- 头部右侧 -->
          <div class="header-right">
            <!-- 个人中心 -->
            <div class="header-menu">
              <el-dropdown trigger="click">
                <div class="personal-center">
                  <!-- 头像 -->
                  <img src="../assets/images/avatar.jpg" alt="" />
                  <span class="el-dropdown-link">
                    {{ username
                    }}<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                </div>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>我的消息</el-dropdown-item>
                  <el-dropdown-item>个人信息</el-dropdown-item>
                  <el-dropdown-item @click.native="modify">修改密码</el-dropdown-item>
                  <el-dropdown-item @click.native="loginOut"
                    >退出登录</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
      </el-header>
      <el-container>
        <!-- 侧边菜单栏 -->
        <el-aside :width="hasToggle ? '64px' : '200px'">
          <!-- 侧边栏组件 -->
          <aside-com @changeWidth="changeWidth"></aside-com>
        </el-aside>
        <el-container>
          <!-- 主体 -->
          <el-main>
            <crumbs-nav></crumbs-nav>
            <router-view></router-view>
          </el-main>
          <!-- 页脚 -->
          <el-footer>平凡个人专享 @版权归个人所有</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// 导入侧边栏组件
import asideCom from "../components/aside/aside.vue"
import crumbsNav from "../components/crumbsNav/crumbsNav.vue"
export default {
  data() {
    return {
      username: "",
      // 展开收起控制
      hasToggle: false
    };
  },
  created() {
    // 获取用户名字
    this.getUername();
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    // 获取用户名
    getUername() {
      let { username } = JSON.parse(localStorage.getItem("user"));
      this.username = username;
    },
    // 退出登录
    loginOut() {
      this.$confirm("确认退出吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "退出成功!",
          });
          // 清空本地存储的所有信息
          window.sessionStorage.clear();
          // 打回到登录页面
          this.$router.replace("/");
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消'
          // });
        });
    },
    // 修改密码
    modify() {
      const h = this.$createElement;
      this.$msgbox({
        title: "修改密码",
        message: h("p", null, [
          h("span", null, "内容可以是 "),
          h("i", { style: "color: teal" }, "VNode"),
        ]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "执行中...";
            setTimeout(() => {
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            }, 3000);
          } else {
            done();
          }
        },
      }).then((action) => {
        this.$message({
          type: "info",
          message: "action: " + action,
        });
      }).catch(() => {});
    },
    // 展开收起按钮控制
    changeWidth(hasToggle) {
      this.hasToggle = hasToggle;
    }
  },
  components: {
    // 侧边栏组件
    asideCom,
    crumbsNav
  },
};
</script>

<style lang="scss" scoped>
.home-container {
  height: 100%;
  .container-box {
    height: 100%;
    // 首页顶部
    .el-header {
      padding-right: 20px;
      background-color: #2b4b6b;
      .header-box {
        height: 100%;
        display: flex;
        justify-content: space-between;
        // 头部logo
        .logo {
          width: 200px;
          height: 100%;
          background-color: #2b4b6b;
          .logo-image {
            display: flex;
            width: 200px;
            height: 100%;
            justify-content: center;
            align-items: center;
          }
        }
        // 头部右侧
        .header-right {
          flex: 1;
          display: flex;
          height: 100%;
          justify-content: flex-end;
          align-items: center;
          background-color: #2b4b6b;
          .header-menu {
            height: 100%;
            overflow: hidden;
            .el-dropdown {
              height: 100%;
              .personal-center {
                display: flex;
                align-items: center;
                height: 100%;
                cursor: pointer;
                // 头像
                img {
                  width: 50px;
                  border-radius: 50%;
                  margin-right: 10px;
                  vertical-align: center;
                }
                .el-dropdown-link {
                  line-height: 60px;
                  width: max-content;
                  color: #fff;
                }
              }
            }
          }
        }
      }
    }
    // 侧边栏
    // .el-aside{
    // }
    // 页脚
    .el-footer{
      color: #fff;
      text-align: center;
      font-size: 14px;
      letter-spacing: 2px;
    }
  }
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
  padding: 0;
}

.el-aside {
  background-color: #2b4b6b;
  color: #333;
  // text-align: center;
  // line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  // text-align: center;
  // line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>