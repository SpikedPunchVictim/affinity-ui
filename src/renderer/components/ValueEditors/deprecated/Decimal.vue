<template>
   <el-input
      v-model="rawValue"
      size="small"
      :disabled="isUpdating"
      icon="edit"
      :on-icon-click="set">

   </el-input>

   <!--<span>
      <input
         type="text"
         class="form-control"
         :class="{ active: !isUpdating }"
         placeholder="Value"
         v-model="rawValue">
         </input>
      </span>-->
</template>

<script>
import { mapActions } from 'vuex'

export default {
   name: 'value-editor-decimal',
   isMultiLine: false,
   props: {
      value: Object
   },
   data() {
      return {
         isUpdating: false,
      }
   },
   methods: {
      ...mapActions([
         'updateValue'
      ]),
      setUpdating: function(updating) {
         this.isUpdating = updating
      }
   },
   computed: {
      rawValue: {
         get: function() {
            return this.value.value
         },
         set: function(val) {
            this.setUpdating(true)
            this.updateValue({
               value: this.value,
               update: v => v.update(val).then(_ => this.setUpdating(false))
            })
         }
      }
   }
}

</script>