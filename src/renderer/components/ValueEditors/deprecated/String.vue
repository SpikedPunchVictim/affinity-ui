<template>
   <el-input
      v-model="rawValue"
      size="small"
      :disabled="isUpdating"
      placeholder="Empty"
      icon="edit"
      :on-icon-click="set">

   </el-input>
   <!--<input
      type="text"
      @change="set(value)"
      class="form-control"
      :class="{ active: !isUpdating }"
      placeholder="Empty"
      v-model="rawValue">-->
</template>

<script>
import { mapActions } from 'vuex'

export default {
   name: 'value-editor-string',
   isMultiLine: false,
   props: {
      value: Object
   },
   data() {
      return {
         isUpdating: false
      }
   },
   methods: {
      ...mapActions([
         'updateValue'
      ]),
      setUpdating: function(updating) {
         this.isUpdating = updating
      },
      set: function(val) {
         this.setUpdating(true)
         this.updateValue({
            value: this.value,
            update: v => v.update(val).then(_ => this.setUpdating(false))
         })
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