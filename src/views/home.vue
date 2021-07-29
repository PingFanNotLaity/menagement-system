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
            <!-- <div class="list-box" v-for="item in listMenu" :key="item.name">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link" style="display:inline-block">
                  {{item.name}}<i style="margin-left: 5px;" :class="item.icon"></i>
                </span>
                <el-dropdown-menu slot="dropdown" v-if="item.children">
                  <el-dropdown-item v-for="childrenItem in item.children" :key="childrenItem.name">{{childrenItem.name}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div> -->
          </div>
        </div>
      </el-header>
      <el-container>
        <!-- 侧边菜单栏 -->
        <el-aside width="200px">Aside</el-aside>
        <el-container>
          <!-- 主体 -->
          <el-main>
          </el-main>
          页脚
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",

    };
  },
  created() {
    // 获取用户名字
    this.username = this.$route.query.name;
    // console.log(this.$route);
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  components: {

  }
};
</script>

<style lang="scss" scoped>
.home-container {
  height: 100%;
  .container-box {
    height: 100%;
    // 首页顶部
    .el-header {
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
          background-color: #2b4b6b;
          // .list-box {
          //   margin: 0 15px;
          //   color: #fff;
          //   // background-color: #ccc;
          // }
        }
      }
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
  background-color: #d3dce6;
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