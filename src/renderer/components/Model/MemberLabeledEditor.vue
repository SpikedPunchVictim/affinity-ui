<style scoped>

.label {
   color: #696969;
   text-align: right;
}

</style>

<template>
   <div>
      <labeled-editor 
         v-for="member in members"
         :key="member.name"
         :labelStyle="labelStyle">
         
         <template v-slot:label><span>{{ member.name }}</span></template>
         <template v-slot:editor>
            <el-input placeholder="Please input" size="small">{{ displayValue(member) }}</el-input>
            <el-checkbox @change="editorChecked(member)" :key="member.name"></el-checkbox>
         </template>
         <template v-slot:detailed-editor v-if="checkedItems[member.name] === true">
            <el-calendar value="1"></el-calendar>
         </template>
      </labeled-editor>
   </div>   
</template>

<script>
import LabeledEditor from '@/components/Model/LabeledEditor'
import { valueSwitch } from '@/lib/types'

export default {
   props: {
      model: Object
   },
   data() {
      return {
         members: this.model ? this.model.members : [],
         checkedItems: {},  // TODO: Replace with a Map of uuids-to-chekced. Do not rely on the name that can change
         labelStyle: "text-align: right"
      }
   },
   methods: {
      displayValue(member) {
         let { value } = member

         return valueSwitch(value, {
            bool() {
               return value.value
            },
            decimal() {
               return value.value
            },
            int() {
               return value.value
            },
            string() {
               return value.value
            },
            uint() {
               return value.value
            },
            collection() {
               return `${value.length} items`
            },
            default() {
               return `No display value can be determined`
            }
         })
      },
      editorChecked(member, other) {
         if(typeof this.checkedItems[member.name] === 'undefined') {
            this.$set(this.checkedItems, member.name, true)
         } else {
            this.$set(this.checkedItems, member.name,  !this.checkedItems[member.name])
         }
      }
   },
   computed: {

   },
   components: {
      'labeled-editor': LabeledEditor
   }
}
</script>