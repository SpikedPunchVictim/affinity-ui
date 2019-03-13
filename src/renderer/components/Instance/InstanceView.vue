<style>

.space el-form-item__label {
   width: 100%;
   height: 100%;
   /*color: #FFFFFF;*/
   color: #000000;
}

.field-label {
   text-align: right;
   padding-right: 5px;
   
   position: relative;
   top: 50%;
   transform: translateY(20%); 
}

.meta-form {
   margin-top: 8px;
}


</style>

<template>
   <div>
      <el-row type="flex" justify="space-between">
         <el-col :span="5" class="field-label">Name</el-col>
         <el-col :span="19"><el-input v-model="form.name" placeholder="Name" size="small"></el-input></el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="meta-form">
         <el-col :span="5" class="field-label">Static Name</el-col>
         <el-col :span="19"><el-input v-model="form.static" placeholder="Static Name" size="small"></el-input></el-col>
      </el-row>
      <field-view :instance="object"></field-view>
      
   </div>
</template>

<script>
import FieldRow from './FieldRow'
import FieldView from './FieldView'

export default {
   name: 'instance-details',
   props: {
      object: Object // Instance
   },
   data() {
      return {
         form: {
            name: '',
            static: ''
         }
      }
   },
   components: {
      FieldView,
      'field-row': FieldRow
   }
}

</script>