<style>

.table-style {
   margin: 5px 0px 0px 0px;
   border-radius: 4px;
}

</style>

<template>
   <div>
      <el-table
         v-show="instance.fields.length > 0"
         class="table-style"
         border
         :data="getFields"
         :show-header="false"
         empty-text="">
         <el-table-column
            type="expand"
            prop="member"
            width="25">
            <template slot-scope="props">
               <div v-if="isEditorMultiLine(props.row.type)">
                  <component :is="getEditorName(props.row.type)" :value="props.row.value"></component>
               </div>
            </template>
         </el-table-column>
         <el-table-column
            label="Type"
            resizable
            width="85">
            <template slot-scope="data">
               <!-- data.row = member (?) -->
               <el-tooltip placement="top-start" :openDelay="1000">
                  <div slot="content"><el-tag type="primary">{{ getTypeName(data.row.type) }}</el-tag></div>
                  <el-tag type="primary">{{ getTypeName(data.row.type) }}</el-tag>
               </el-tooltip>
            </template>
         </el-table-column>
         <el-table-column
            label="Name"
            prop="name"
            width="140">
         </el-table-column>
         <el-table-column
            prop="field">
            <template slot-scope="props">
               <div v-if="isEditorMultiLine(props.row.type)"></div>
               <div v-else>
                  <component :is="getEditorName(props.row.type)" :value="props.row.value"></component>
               </div>
            </template>
         </el-table-column>
         <h3 slot="empty"></h3>
      </el-table>
   </div>
</template>


<script>
import valueEditors from '@/components/ValueEditors/editors'

export default {
   name: 'field-view',
   props: {
      instance: Object
   },
   methods: {
      getEditorName: function(type) {
         let name = valueEditors.getEditorName(type)
         return name
      },
      isEditorMultiLine: function(type) {
         return valueEditors.getEditor(type).isMultiLine
      },
      getTypeName: function(type) {
         return type.toString()
      }
   },
   computed: {
      getFields: function() {
         return this.instance == null ? [] : this.instance.fields._items
      }
   },
   components: {
      ...(valueEditors.map())
   }
}

</script>