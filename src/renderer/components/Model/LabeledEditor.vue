<style scoped>

</style>

<template>
   <div>
      <el-row :gutter="12">
         <el-col :span="6" style="labelStyle"><slot name="label"></slot></el-col>
         <el-col :span="18"><slot name="editor"></slot></el-col>
      </el-row>
      <el-row>
         <el-col :span="24"><slot name="detailed-editor"></slot></el-col>
      </el-row>
   </div>
</template>

<script>

export default {
   name: 'labeled-editor',
   props: {
      labelStyle: ''
   }
}
</script>