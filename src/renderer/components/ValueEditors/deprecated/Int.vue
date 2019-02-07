<style>

.set-button {
   margin-top: 1px;
}

</style>

<template>
   <el-row :gutter="3">
      <el-col :span="10">
         <el-input
            v-model="rawValue"
            size="small"
            :disabled="isUpdating">
         </el-input>
      </el-col>
      <el-col :span="2">
         <el-button
            icon="edit"
            type="info"
            size="small"
            class="set-button"
            :disable="invalidValue"
            @click.prevent="set">
         </el-button>
      </el-col>      
      <el-col v-if="invalidValue" :span="2"><icon name="exclamation"></icon></el-col>
      </el-col>
   </el-row>
</template>

<script>
import { mapActions } from 'vuex'

export default {
   name: 'value-editor-int',
   isMultiLine: false,
   props: {
      value: Object
   },
   data() {
      return {
         isUpdating: false,
         invalidValue: false,
         currentValue: this.value.value
      }
   },
   methods: {
      ...mapActions([
         'updateValue'
      ]),
      setUpdating: function(updating) {
         this.isUpdating = updating
      },
      validate: function() {
         console.log(`validating ${this.currentValue}: ${this.value.isValidValue(this.currentValue)}`)
         this.invalidValue = !this.value.isValidValue(this.currentValue)
      },
      set: function(val) {
         // if(parseInt(val) == NaN) {
         //    console.log('[Int.vue] Invalid int!')
         //    this.invalidValue = true
         //    return
         // }

         this.invalidValue = false
         this.setUpdating(true)
         this.updateValue({
            value: this.value,
            update: v => v.update(this.currentValue).then(_ => this.setUpdating(false))
         })
      }
   },
   computed: {
      rawValue: {
         get: function() {
            return this.value.value
         },
         set: function(val) {
            console.log(`setting ${val}: ${this.value.isValidValue(val)}`)
            this.invalidValue = !this.value.isValidValue(val)
            // if(!this.value.isValidValue(val)) {
            //    this.invalidValue = true
            //    return
            // }

            // this.invalidValue = false
            // this.setUpdating(true)
            // this.updateValue({
            //    value: this.value,
            //    update: v => v.update(val).then(_ => this.setUpdating(false))
            // })
         }
      }
   }
}

</script>