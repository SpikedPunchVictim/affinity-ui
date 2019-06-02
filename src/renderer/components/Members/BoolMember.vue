<style>

</style>

<template>
   <span>
      <span
         @click="editing=true"
         v-show="!editing">
         {{ value.value }}
      </span>
      <span v-show="editing">
         <el-checkbox 
            @change="onCheckChanged"
            value="isChecked"
            true-label="true"
            false-label="false">
            {{ value.value }}
         </el-checkbox>
      </span>
   </span>
</template>

<script>
import { mapActions } from 'vuex'

export default {
   name: 'member-bool',
   props: {
      value: Object,
      editable: {
         type: Boolean,
         default: true
      }
   },
   data() {
      return {
         editing: false
      }
   },
   methods: {
      ...mapActions([
         'updateValue'
      ]),
      onEdit() {
         if(!this.editable) {
            return
         }

         this.editing = true
      },
      onCheckChanged(checked) {
         console.dir(this.value)
         this.updateValue({
            value: this.value,
            update: v => v.update(checked)
         })
      }
   },
   computed: {
      isChecked() {
         return this.value.value
      }
   }
}
</script>