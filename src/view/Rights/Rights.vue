<template>
  <el-card>
    <!-- 面包屑 -->
    <my-bread lv1="角色列表" lv2="权限列表"></my-bread>
    <!-- 表格 -->
    <el-table :data="rightsList" border style="width: 100%" height="450px">
      <el-table-column label="#" width="80" type="index"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径"></el-table-column>
      <el-table-column label="层级">
        <template slot-scope="scope">
          <span v-if="scope.row.level==='0'">一级</span>
          <span v-if="scope.row.level==='1'">二级</span>
          <span v-if="scope.row.level==='2'">三级</span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      rightsList: []
    };
  },
  created() {
    this.getRightsList();
  },
  methods: {
    async getRightsList() {
      // 请求头在http.js文件发送请求时为login时被拦截，其余的发送请求全部调用
      // const AUTH_TOKEN = localStorage.getItem('token')
      // this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
      const res = await this.$http.get('rights/list');
      // console.log(res)
      this.rightsList = res.data.data;
    }
  }
}
</script>

<style>
</style>
