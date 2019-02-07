<style>

.set-value {
   margin-top: 1px;
}

.invalid-value {
   padding-top: 7px;
   padding-left: 20px;
}

</style>

<template>
   <el-row :gutter="2">
      <el-col :span="18">
         <el-input
            v-model="currentValue"
            size="small"
            :disabled="isUpdating">
         </el-input>
      </el-col>
      <el-col :span="2">
         <el-button
            icon="edit"
            type="info"
            size="small"
            class="set-value"
            @click.prevent="set">
         </el-button>
      </el-col>      
      <el-col v-if="invalidValue" :span="2">
         <el-tooltip effect="dark" :content="errorReason" placement="top">
            <i class="el-icon-warning invalid-value" type="danger"></i>
         </el-tooltip>
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
         currentValue: this.value.value,
         errorReason: ''
      }
   },
   methods: {
      ...mapActions([
         'updateValue'
      ]),
      setUpdating: function(updating) {
         this.isUpdating = updating

         if(updating) {
            this.errorReason = ''
         }
      },
      set: function(val) {
         if(!this.value.isValidValue(this.currentValue)) {
            this.invalidValue = true
            return
         }

         this.invalidValue = false
         this.setUpdating(true)
         this.updateValue({
            value: this.value,
            update: v => {
               return v.update(this.currentValue)
                  .then(_ => this.setUpdating(false))
                  .catch(err => {
                     this.setUpdating(false)
                     this.errorReason = `${err}`
                  })
            }
         })
      }
   }
}

</script>