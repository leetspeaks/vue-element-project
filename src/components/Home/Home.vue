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
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
     >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">
              <i class="el-icon-menu"></i>
              <span>用户列表</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-s-release"></i>
          <span>权限管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1">
              <i class="el-icon-menu"></i>
              <span>角色列表</span>
          </el-menu-item>
          <el-menu-item index="2-2">
              <i class="el-icon-menu"></i>
              <span>权限列表</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-s-goods"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1">
              <i class="el-icon-menu"></i>
              <span>商品列表</span>
          </el-menu-item>
          <el-menu-item index="3-2">
              <i class="el-icon-menu"></i>
              <span>分类参数</span>
          </el-menu-item>
          <el-menu-item index="3-3">
              <i class="el-icon-menu"></i>
              <span>商品分类</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-s-claim"></i>
          <span>订单管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="4-1">
              <i class="el-icon-menu"></i>
              <span>订单列表</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-s-marketing"></i>
          <span>数据统计</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="5-1">
              <i class="el-icon-menu"></i>
              <span>数据报表</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
    </el-aside>
    <el-main class="main">Main</el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  beforeCreate () {
    const token = localStorage.getItem('token')
    if (!token) {
      this.$router.push({ name: 'login' })
    }
  },
  methods: {
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
