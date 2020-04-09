<template>
  <div class="login-warp">
    <el-form label-position="top" class="login-form" label-width="80px" :model="formLogin">
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formLogin.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="formLogin.password"></el-input>
      </el-form-item>
      <el-button @click.prevent="handleLogin" class="login-btn" type="primary">主要按钮</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      formLogin: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async handleLogin () {
      const res = await this.$http.post('login', this.formLogin)
      // console.log(res)
      const { data, meta: { msg, status } } = res.data
      if (status === 200) {
        // 保存token
        localStorage.setItem('token', data.token)
        this.$router.push({ name: 'home' })
        this.$message.success(msg)
      } else {
        this.$message.error(msg)
      }
    }
  }
}
</script>

<style>
.login-warp{
  height: 100%;
  background-color: #0c1631;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-form{
  width: 400px;
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
}
.login-btn{
  width: 100%;
}
</style>
