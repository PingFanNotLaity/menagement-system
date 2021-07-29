<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 表单头像 -->
      <div class="login_avatar">
        <img src="../assets/images/avatar.jpg" alt="" />
      </div>
      <!-- 表单 -->
      <el-form
        label-width="0"
        class="login_form"
        :model="loginForm"
        :rules="loginFormRules"
        ref="loginForm"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
            prefix-icon="iconfont icon-yonghuming"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            placeholder="请输入密码"
            prefix-icon="iconfont icon-password"
          ></el-input>
        </el-form-item>
        <!-- 登录/重置 -->
        <el-form-item class="btn_box">
          <el-button type="primary" @click.native="handleLogin" @keyup.enter="loginEnter">登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {requestLogin,getUserInfo} from "../axios/api.js"
export default {
  data() {
    return {
      loginForm: {
        // 用户名
        username: "",
        // 密码
        password: "",
      },
      // 效验规则
      loginFormRules: {
        // 用户名验证规则
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: ["blur"],
          },
          {
            pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
            message: "用户名不支持特殊字符",
            trigger: "blur",
          }
        ],
        // 密码验证规则
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: ["blur"],
          },
          {
            pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
            message: "密码不支持特殊字符",
            trigger: "blur",
          },
          {
            pattern: /[A-Za-z0-9]{6,15}$/,
            message: "密码格式为数字和字母",
            trigger: "blur",
          }
        ],
      },
    };
  },
  methods: {
    // 表单重置
    reset() {
      this.$refs.loginForm.resetFields();
    },
    // 表单登录
    handleLogin() {
      this.$refs.loginForm.validate(async (valid) => {
        if(valid) {
          let loginParams = {
            username: this.loginForm.username,
            password: this.loginForm.password
          };
          requestLogin(loginParams).then(res => {
            // console.log(res);
            // 根据返回的code判断是否成功
            // let { code, message, user, token } = await requestLogin(loginParams);
            // console.log(code,message);
            let {code,msg,user,token} = res.data;
            if(code === 200) {
              this.$message({
                type: "success",
                message: msg
              })
              sessionStorage.setItem('user',JSON.stringify(user));
              sessionStorage.setItem('token',JSON.stringify(token));
              this.reset();
              this.$router.push({path:"/home",query:{name:user.username}})
            }else{
              this.$message({
                type: "error",
                message: msg
              })
            }
          })
        }else{
          this.$message.error("登录失败")
        }
      });
    },
    // 按回车键登录
    loginEnter() {
      document.onkeyup = e => {
        if(e.keyCode === 13) {
          this.handleLogin()
        }
      }
    },
    // async getUserInfo() {
    //   let data = await getUserInfo();
    //   console.log(data);
    // }
  },
  created() {
    this.loginEnter();
    // this.getUserInfo();
  }
};
</script>

<style lang="scss" scoped>
.login_container {
  height: 100%;
  background-color: #2b4b6b;
  position: relative;
  .login_box {
    width: 600px;
    height: 400px;
    background-color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    // 表单头像
    .login_avatar {
      width: 150px;
      height: 150px;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      border: 1px solid #ddd;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #ddd;
      background-color: #fff;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #dcdcdc;
      }
    }
    // 表单
    .login_form {
      position: absolute;
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
      top: 35%;
      .btn_box {
        display: flex;
        justify-content: center;
      }
    }
  }
}
</style>