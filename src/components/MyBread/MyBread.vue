<template>
    <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{lv1}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{lv2}}</el-breadcrumb-item>
      </el-breadcrumb>
</template>

<script>
export default {
    name: 'my-bread',
    props: ['lv1','lv2']
}
</script>

<style>
.bread{
  margin-bottom: 15px;
}
</style>
