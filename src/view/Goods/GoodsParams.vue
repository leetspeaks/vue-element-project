<template>
  <el-card>
    <my-bread lv1="商品管理" lv2="分类参数"></my-bread>
    <el-alert title="只允许为第三类设置参数" center type="error"></el-alert>
    <el-form class="form" label-position="left" label-width="80px" height="400px" overflow="auto">
      <el-form-item label="商品分类">
        <el-cascader
          clearable
          v-model="selected"
          :options="options"
          :props="defaultProps"
          :show-all-levels="false"
          @change="handleChange"
        ></el-cascader>
      </el-form-item>
    </el-form>
    <el-tabs v-model="active" type="card" @tab-click="handleClick">
    <el-tab-pane label="动态参数" name="1">
        <el-button type="danger">设置动态参数</el-button>
        <el-table :data="manyArr" style="width: 100%">
            <el-table-column type="expand" label="#">
            <template slot-scope="scope">
                <el-tag
                    :key="tag"
                    v-for="tag in scope.row.attr_vals"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(scope.row.attr_vals,scope.row.attr_id,scope.row.attr_name,tag)">
                    {{tag}}
                </el-tag>
                <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm(scope.row.attr_vals,scope.row.attr_id,scope.row.attr_name)"
                 @blur="handleInputConfirm(scope.row.attr_vals,scope.row.attr_id,scope.row.attr_name)"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </template>
            </el-table-column>
            <el-table-column
            label="商品属性"
            prop="attr_name">
            </el-table-column>
            <el-table-column
            label="操作"
            prop="">
            <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeById(scope.row.goods_id)"
            ></el-button>
          </template>
            </el-table-column>
        </el-table>
    </el-tab-pane>
    <el-tab-pane label="静态参数" name="2">
      <el-button type="danger">设置静态参数</el-button>
      <el-table :data="onlyArr" style="width: 100%">
            <el-table-column type="index" label="#">
            </el-table-column>
            <el-table-column
            label="商品属性"
            prop="attr_name">
            </el-table-column>
            <el-table-column
            label="属性值"
            prop="attr_vals">
            </el-table-column>
            <el-table-column
            label="操作"
            prop="">
            <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeById(scope.row.goods_id)"
            ></el-button>
          </template>
            </el-table-column>
        </el-table>
    </el-tab-pane>
  </el-tabs>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      // 级连绑定的数据
      selected: [],
      options: [],
      defaultProps: {
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      },
      active: '1',
      manyArr: [],
      onlyArr: [],
    //   动态tag
    inputVisible: false,
    inputValue: ''
    };
  },
  created() {
      this.category()
  },
  methods: {
    // 关闭tag事件 --发送请求
    async handleClose(attr_vals,attr_id,attr_name,tag) {
        attr_vals.splice(attr_vals.indexOf(tag), 1);
        let putData = {
            attr_name: attr_name,
            attr_sel: 'many',
            attr_vals: attr_vals.join(',')
        }
        const res = await this.$http.put(`categories/${this.selected[2]}/attributes/${attr_id}`,putData)
        console.log(res)
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
    //   回车添加tag事件
      async handleInputConfirm(attr_vals,attr_id,attr_name) {
        let inputValue = this.inputValue;
        if (inputValue) {
          attr_vals.push(inputValue);
        //   发送请求
          let putData = {
            attr_name: attr_name,
            attr_sel: 'many',
            attr_vals: attr_vals.join(',')
        }
        const res = await this.$http.put(`categories/${this.selected[2]}/attributes/${attr_id}`,putData)
        console.log(res)
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
    async handleClick(){
      if(this.active === '2'){
        if(this.selected.length === 3){
          const res = await this.$http.get(`categories/${this.selected[2]}/attributes?sel=only`)
          console.log(res)
          this.onlyArr = res.data.data
        }
      }
    },
    async category(){
      const res = await this.$http.get('categories?type=3')
      // console.log(res)
      this.options = res.data.data
    },
    async handleChange(){
      if(this.selected.length === 3){
          const res = await this.$http.get(`categories/${this.selected[2]}/attributes?sel=many`)
          this.manyArr = res.data.data
          this.manyArr.forEach((item)=>{
          item.attr_vals = item.attr_vals.length === 0 ? [] : item.attr_vals.trim().split(',')
          })
          console.log(this.manyArr)
      }
    }
  }
}
</script>
<style>
.form{
    margin-top: 20px;
}
.el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
