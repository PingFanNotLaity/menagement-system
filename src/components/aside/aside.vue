<template>
  <div class="aside-container">
    <!-- 侧边栏菜单区域 -->
    <div class="zoom" @click="toggleButton">|||</div>
    <el-menu
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#2b4b6b"
      text-color="#fff"
      active-text-color="#ffd04b"
      unique-opened
      :collapse="hasToggle"
      :collapse-transition="false"
      :router="true"
      :default-active="activePath"
    >
      <!-- 一级菜单模板区域 -->
      <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
        <template slot="title">
          <!-- 图标 -->
          <i :class="iconfont[item.id]" class="iconfont"></i>
          <!-- 文本 -->
          <span>{{ item.authName }}</span>
        </template>
        <!-- 二级菜单 -->
        <el-menu-item
          :index="childrenItem.path + ''"
          v-for="childrenItem in item.children"
          :key="childrenItem.id"
          @click.native="saveActivePath(childrenItem.path)"
        >
          <template slot="title">
            <!-- 图标 -->
            <i :class="iconfont[item.id]" style="margin-right:10px"></i>
            <!-- 文本 -->
            <span>{{ childrenItem.authName }}</span>
          </template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { getMenuList } from "../../axios/api.js";
export default {
  data() {
    return {
      // 菜单栏列表
      menuList: [],
      // icon图标
      iconfont: {
        1: "iconfont icon-yonghuguanli",
        2: "iconfont icon-quanxian",
        3: "iconfont icon-shangpinguanli",
        4: "iconfont icon-dingdanguanli1",
        5: "iconfont icon-shujuguanli",
      },
      // 展开收起开关
      hasToggle: false,
      activePath: ""
    };
  },
  created() {
    // 获取所有菜单栏列表
    this.getAsideMenu();
    this.activePath = window.sessionStorage.getItem("activePath");
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 获取所有菜单栏列表
    async getAsideMenu() {
      let { data } = await getMenuList("/menu");
      if (data.code !== 20000) {
        return this.$message.error(data.message);
      }

      this.menuList = data.data;
      console.log(this.menuList);
    },
    // 侧边栏展开按钮切换
    toggleButton() {
      this.hasToggle = !this.hasToggle;
      this.$emit("changeWidth", this.hasToggle)
    },
    // 点击菜单栏把当前点击菜单的路由存在sessionStorage里面，为了点击菜单高亮显示
    saveActivePath(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = window.sessionStorage.getItem("activePath");
    }
  },
};
</script>

<style lang="scss" scoped>
.aside-container {
  // 展开收起按钮
  .zoom {
    color: #fff;
    text-align: center;
    letter-spacing: 3px;
    font-size: 10px;
    line-height: 24px;
    background-color: #586f94;
    cursor: pointer;
  }
  // 侧边菜单栏
  .el-menu {
    border-right: 0;
    // 侧边栏icon图标
    .iconfont {
      // font-size:20px;
      margin-right: 10px;
    }
  }
}
</style>