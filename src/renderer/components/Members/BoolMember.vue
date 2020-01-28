<style>

</style>

<template>
   <span>
      <span @mousedown="editing=true">
         {{ value.value }}
      </span>
      <span v-show="editing">
         <el-checkbox 
            v-model="isChecked"
            true-label="true"
            false-label="false">
         </el-checkbox>
      </span>
   </span>
</template>

<script>
import { mapActions } from 'vuex'

// Test
import { create, types } from '@/services/affinity'

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
   mounted() {
      // let proj = create()
      // let model = proj.root.models.new('first')
      // this.value = model.members.new('boolean', types.bool.type())
   },
   methods: {
      ...mapActions([
         'updateValue', 'updateSimpleValue'
      ]),
      onEdit() {
         if(!this.editable) {
            return
         }

         this.editing = true
      },
      onCheckChanged(checked) {
         console.dir(checked)
         this.updateValue({
            value: this.value,
            update: v => v.update(checked)
         })
      }
   },
   computed: {
      isChecked: {
         get: function() {
            return this.value.value
         },
         set: function(val) {
            //this.updateSimpleValue({ value: this.value, val: val })
            this.value.update(val)
            // this.updateValue({
            //    value: this.value,
            //    update: v => v.update(val)
            // })
         }
      }
   },
   watch: {
      isHovering: function(oldVal, newVal) {
         console.log(`old: ${oldVal}   new: {newVal}`)
      }
   }
}
</script>