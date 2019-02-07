<template>
   <el-row class="tac">
      <el-col :span="8">
         <el-menu default-active="1" theme="dark" @open="handleOpen" @close="handleClose">
            <el-menu-item index="1"><i class="el-icon-menu"></i></el-menu-item>
            <el-menu-item index="2"><i class="el-icon-search"></i></el-menu-item>
         </el-menu>
      </el-col>
   </el-row>
</template>

<script>
export default {
   name: 'side-bar',
   methods: {
      handleOpen: function(index, indexPath) {
         
      },
      handleClose: function(index, indexPath) {

      }
   }
}
</script>