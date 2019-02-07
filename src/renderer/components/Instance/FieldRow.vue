<template>
   <div>
   <!--<el-row>
      <el-col :span="4">{{ field.name }}</el-col>
      <el-col :span="4">
         <div v-if="isEditorMultiLine(field.type)"></div>
         <div v-else>
            <component :is="getEditorName(field.type)" :value="field.value"></component>
         </div>

      </el-col>
   </el-row>-->
   <el-table
      v-show="model.members.length > 0"
      border
      :data="getMembers"
      :show-header="false"
      empty-text=""
      @select="rowSelectionChanged">
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
         type="selection"
         width="33"
         align="center">
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
         width="140">
         <template slot-scope="data">
            <el-input
               size="small"
               @change="changeMemberName(data.row, value)"
               :value="data.row.name">
            </el-input>
         </template>
      </el-table-column>
      <el-table-column
         prop="member">
         <template slot-scope="props">
            <div v-if="isEditorMultiLine(props.row.type)"></div>
            <div v-else>
               <component :is="getEditorName(props.row.type)" :value="props.row.value"></component>
            </div>
         </template>
         <!--
         <template v-if="!isEditorMultiLine(member)" slot-scope="props">
            <component :is="getEditorName(props.row.type)" :value="props.row.value"></component>
         </template>
         -->
      </el-table-column>
      <h3 slot="empty"></h3>
   </el-table>
   
   
   
   </div>
</template>


<script>
import valueEditors from '@/components/ValueEditors/editors'

export default {
   name: 'field-row',
   props: {
      field: null
   },
   data() {
      return {
         checked: false
      }
   },
   methods: {
      onCheckChange: function(ev) {
         this.$emit('check-changed')
      },
      isEditorMultiLine: function(type) {
         return valueEditors.getEditor(type).isMultiLine
      },
      getEditorName: function(type) {
         let name = valueEditors.getEditorName(type)
         return name
      }
   }
}

</script>