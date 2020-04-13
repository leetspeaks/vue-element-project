<template>
  <el-container class="container">
  <el-header class="header">
      <el-row>
        <el-col :span="22"><div class="grid-content bg-purple"><h3>Vue后台管理系统</h3></div></el-col>
        <el-col :span="2"><div class="grid-content bg-purple-light"><a href="#" @click="handleLoginout" class="loginout">退出</a></div></el-col>
      </el-row>
  </el-header>
  <el-container>
    <el-aside class="aside" width="200px">
        <el-menu
      default-active="2"
      :unique-opened="true"
      :router="true"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
     >
      <el-submenu :index="''+item1.order" v-for="(item1,index) in menus" :key="index">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span>{{item1.authName}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item :index="item2.path" v-for="(item2,index) in item1.children" :key="index">
              <i class="el-icon-menu"></i>
              <span>{{item2.authName}}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      
    </el-menu>
    </el-aside>
    <el-main class="main">
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  data() {
    return {
      menus: []
    }
  },
  beforeCreate () {
    // const token = localStorage.getItem('token')
    // if (!token) {
    //   this.$router.push({ name: 'login' })
    // }
  },
  created() {
    this.getMenus()
  },
  methods: {
    async getMenus(){
      const res = await this.$http.get('menus')
      // console.log(res)
      this.menus = res.data.data
    },
    handleLoginout () {
      localStorage.clear()
      this.$message.success('退出成功')
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style>
.container{
    height: 100%;
}
.header{
    color: #fff;
    background-color: rgb(74, 81, 88);
}
.aside{
    background-color: #545c64;
}
.main{
     background-color: rgb(228, 230, 231);
}
.loginout{
    color: #fff;
    text-decoration: none;
    line-height: 55px;
}
</style>
