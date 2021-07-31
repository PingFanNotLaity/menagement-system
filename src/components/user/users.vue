<template>
  <div class="users-container">
    <!-- 卡片区域 -->
    <el-card class="box-card">
      <el-row :gutter="30">
        <el-col :span="10">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 表格区域 -->
      <el-table :data="userList" style="width: 100%">
        <el-table-column prop="username" label="用户名" width="180">
        </el-table-column>
        <el-table-column prop="password" label="密码" width="180">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="180">
        </el-table-column>
        <el-table-column prop="phone_number" label="手机号码" width="180">
        </el-table-column>
        <el-table-column prop="role" label="角色" width="180">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getUsersList } from "@/axios/api.js";
export default {
  data() {
    return {
      userList: [],
      page: 1,
      pagesize: 2,
      total: 0,
    };
  },
  created() {
    // 获取所有用户列表
    this.getUsersList();
  },
  methods: {
    // 获取所有用户列表
    async getUsersList() {
      let { data: res } = await getUsersList();
      let { code, message, data, total } = res;
      console.log(data);
      if (code !== 20000) {
        this.$message({
          type: "error",
          message: message,
        });
      }
      this.userList = data;
      this.total = total;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>