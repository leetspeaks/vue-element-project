<template>
  <el-card>
    <!-- 面包屑 -->
    <my-bread lv1="权限管理" lv2="角色列表"></my-bread>
    <!-- 添加角色按钮 -->
    <el-row>
      <el-col>
        <el-button type="primary" plain>添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="rolesList" style="width: 100%">
      <el-table-column type="expand" width="80">
        <template slot-scope="scope">
          <el-row v-for="(item1,i) in scope.row.children" :key="i">
            <el-col :span="4">
              <el-tag @close="deleteRights(scope.row,item1.id)" closable>{{item1.authName}}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="20">
              <el-row v-for="(item2,i) in item1.children" :key='i'>
                <el-col :span="4">
                  <el-tag @close="deleteRights(scope.row,item2.id)" type='success' closable>{{item2.authName}}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="20">
                  <el-tag @close="deleteRights(scope.row,item3.id)" type='warning' v-for="(item3,i) in item2.children" :key='i' closable>{{item3.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <span v-if="scope.row.children.length===0">未分配权限</span>
        </template>
      </el-table-column>
      <el-table-column label="#" type="index" width="150"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="200"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="200"></el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button
            @click="showSetRights(scope.row)"
            size="mini"
            type="primary"
            icon="el-icon-edit"
          ></el-button>
          <el-button
            @click="deteteUsers(scope.row.id)"
            size="mini"
            type="danger"
            icon="el-icon-delete"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改权限 -->
    <!-- :default-expanded-keys="[2, 3]"
        :default-checked-keys="[5]" -->
    <el-dialog title="修改权限" :visible.sync="dialogFormVisibleRights">
      <el-tree
        :data="treeList"
        ref="tree"
        show-checkbox
        node-key="id"
        default-expand-all
        :props="defaultProps"
        :default-checked-keys="arrcheck"
        >
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRights = false">取 消</el-button>
        <el-button type="primary" @click="setRoleRights">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      rolesList: [],
      dialogFormVisibleRights: false,
      treeList: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      arrcheck: [],
      roleId: -1
    }
  },
  created() {
    this.getRolesList();
  },
  methods: {
    // 添加权限事件
    async setRoleRights(){
      let arr1 = this.$refs.tree.getCheckedKeys()
      let arr2 = this.$refs.tree.getHalfCheckedKeys()
      let arr = [...arr1,...arr2]
      const res = await this.$http.post(`roles/${this.roleId}/rights`,{
        rids: arr.join(',')
      })
      this.getRolesList()
      this.dialogFormVisibleRights = false
    },
    // 展示添加权限对话框
    async showSetRights(role){
      // console.log(role)
      this.roleId = role.id
      const res = await this.$http.get('rights/tree')
      // console.log(res)
      this.treeList = res.data.data
      let arrtemps = []
      role.children.forEach(item1 => {
        // arrtemps.push(item1.id)
        item1.children.forEach(item2 => {
          // arrtemps.push(item2.id)
          item2.children.forEach(item3 => {
            arrtemps.push(item3.id)
          })
        })
      });
      this.arrcheck = arrtemps
      this.dialogFormVisibleRights = true
    },
    // 删除分配权限
    async deleteRights(roles,rightId){
      const res = await this.$http.delete(`roles/${roles.id}/rights/${rightId}`)
      roles.children = res.data.data
    },
    async getRolesList() {
      const res = await this.$http.get('roles');
      // console.log(res);
      this.rolesList = res.data.data;
    }
  }
}
</script>

<style>
</style>
