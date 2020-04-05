<template>
  <el-card class="box-card">
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 搜索框 -->
      <el-row class="search-row">
          <el-col :span="8">
              <el-input @clear="loadUserList" clearable placeholder="请输入内容" v-model="query">
                <el-button @click="searhUser" slot="append" icon="el-icon-search"></el-button>
              </el-input>
          </el-col>
          <el-button @click="showUserAdd" type="success" plain>添加用户</el-button>
      </el-row>
      <!-- 表格 -->
      <el-table
    :data="userList"
    style="width: 100%">
    <el-table-column
      label="#"
      type="index"
      width="60">
    </el-table-column>
    <el-table-column
      prop="username"
      label="姓名"
      width="80">
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱">
    </el-table-column>
    <el-table-column
      prop="mobile"
      label="电话">
    </el-table-column>

    <el-table-column
      label="创建日期">
      <template slot-scope='scope'>
        {{scope.row.create_time | fmtdate}}
      </template>
    </el-table-column>

    <el-table-column
      label="用户状态">
      <template slot-scope="scope">
        <el-switch
          v-model="scope.row.mg_state"
          @change="changeStatus(scope.row)"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </template>
    </el-table-column>

    <el-table-column
      prop="address"
      label="操作">
      <template slot-scope="scope">
        <el-button @click="showUserEdit(scope.row)" size="mini" plain type="primary" icon="el-icon-edit" circle></el-button>
        <el-button @click="showSetUsers(scope.row)" size="mini" plain type="success" icon="el-icon-check" circle></el-button>
        <el-button @click="deteteUsers(scope.row.id)" size="mini" plain type="danger" icon="el-icon-delete" circle></el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <!-- 添加对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
  <el-form :model="form">
    <el-form-item label="用户名" label-width="100px">
      <el-input v-model="form.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" label-width="100px">
      <el-input v-model="form.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" label-width="100px">
      <el-input v-model="form.email" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="电话" label-width="100px">
      <el-input v-model="form.mobile" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
    <el-button type="primary" @click="addUser">确 定</el-button>
  </div>
</el-dialog>


<!-- 编辑对话框 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
  <el-form :model="form">
    <el-form-item label="用户名" label-width="100px">
      <el-input disabled v-model="form.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" label-width="100px">
      <el-input v-model="form.email" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="电话" label-width="100px">
      <el-input v-model="form.mobile" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
    <el-button type="primary" @click="editUsers">确 定</el-button>
  </div>
</el-dialog>

<!-- 分配角色对话框 -->
<el-dialog title="分配角色" :visible.sync="dialogFormVisibleRole">
  <el-form :model="form">
    <el-form-item label="用户名" label-width="100px">
      {{role}}
    </el-form-item>
    <el-form-item label="分配角色" label-width="100px">
      <el-select v-model="currenRole">
        <el-option label="请选择" :value="-1"></el-option>
        <el-option :label="item.roleName" :value="item.id" v-for="(item,i) in roles" :key="i"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisibleRole = false">取 消</el-button>
    <el-button type="primary" @click="setUsers">确 定</el-button>
  </div>
</el-dialog>
  </el-card>
</template>
<script>
export default {
  data () {
    return {
      query: '',
      userList: [],
      total: -1,
      pagenum: 1,
      pagesize: 2,
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      dialogFormVisibleRole: false,
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      currenRole: -1,
      roleId: -1,
      role: '',
      // 角色列表
      roles: []
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    // 分配角色修改数据
    async setUsers(){
      const res = await this.$http.put(`users/${this.roleId}/role`,{
        rid: this.currenRole
      })
      this.dialogFormVisibleRole = false
    },
    // 分配角色显示画框
    async showSetUsers(user){
      this.role = user.username
      this.roleId = user.id
      const res1 = await this.$http.get('roles')
      this.roles = res1.data.data
      const res = await this.$http.get(`users/${user.id}`)
      this.currenRole = res.data.data.rid
      console.log(res1)
      this.dialogFormVisibleRole = true
    },
    // 改变用户状态
    async changeStatus(user){
      const res = await this.$http.put(`users/${user.id}/state/${user.mg_state}`)
      // console.log(res)
    },
    // 编辑用户
    async editUsers(){
      this.dialogFormVisibleEdit = false
      const res = await this.$http.put(`users/${this.form.id}`,this.form)
      // console.log(res)
        this.getUserList()

    },
    // 点击编辑显示对话框
    showUserEdit(user){
      this.dialogFormVisibleEdit = true
      this.form = user
    },
    // 删除用户
    deteteUsers(usersId){
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await this.$http.delete(`users/${usersId}`)
          console.log(res)
          if(res.data.meta.status === 200){
            this.pagenum = 1
            this.getUserList()
            this.$message({
            type: 'success',
            message: res.data.meta.msg
          });
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    // 点击确定添加用户
    async addUser(){
      this.dialogFormVisibleAdd = false
      const res = await this.$http.post('users',this.form)
      // console.log(res)
      const {meta:{status,msg},data} = res.data
      if (status === 201) {
        this.form = {}
        this.$message.success(msg)
        this.getUserList()
      }else{
        this.$message.error(msg)
      }
    },
    // 点击添加用户显示对话框
    showUserAdd(){
      this.dialogFormVisibleAdd = true
      this.form = {}
    },
    // 点击清空数据还原表格
    loadUserList(){
      this.getUserList()
    },
    // 点击搜索
    searhUser(){
      this.getUserList()
    },
    // 分页数据
    handleSizeChange(val) {
        // console.log(`每页 ${val} 条`)
        this.pagesize = val
        this.getUserList()
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`)
        this.pagenum = val
        this.getUserList()
      },
      // 获取表格数据
    async getUserList () {
      const AUTH_TOKEN = localStorage.getItem('token')
      this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
      const res = await this.$http.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      // console.log(res)
      const {meta:{status,msg},data:{total,users}} = res.data
      if (status === 200) {
        this.userList = users
        this.total = total
        // this.$message.success(msg)
      }else{
        this.$message.error(msg)
      }
    }
  }
}
</script>

<style>
.box-card{
    height: 100%;
}
.search-row{
    margin-top: 15px;
}
</style>
