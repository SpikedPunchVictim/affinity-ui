<template>
  <el-dialog
      title="Create Member"
      v-model="isVisible"
      v-on:open="onOpen"
      v-on:close="onClose">
    <el-form :model="form" :label-position="right">
      <el-form-item label="Name" :label-width="formLabelWidth">
         <el-input 
            v-model="form.name"
            prop="name"
            auto-complete="off"
            @keyup.enter="onCreate"
            focus>
         </el-input>
      </el-form-item>
      <el-form-item label="Type" :label-width="formLabelWidth">
         <select-type v-on:selected="onTypeSelected"></select-type>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="isVisible = false">Cancel</el-button>
      <el-button type="primary" @click="onCreate">Create</el-button>
    </span>
  </el-dialog>
</template>

<script>
import SelectType from '@/components/TypeSelect/SelectType'

export default {
   name: 'create-member',
   props: {
      model: {
         type: Object,
         required: true
      },
      show: Boolean
   },
   data: function() {
      let validateName = (rule, value, cb) => {
         if(this.model.members.findByName(value) != null) {
            return cb(new Error('A member with htis name already exists'))
         }

         cb()
      }

      return {
         formLabelWidth: '65px',
         form: {
            name: '',
            type: null
         },
         isVisible: this.show,
         rules: {
            name: [
               { validator: validateName, trigger: 'blur' }
            ]
         }
      }
   },
   methods: {
      onOpen: function() {
         this.$emit('open')
      },
      onClose: function() {
         this.isVisible = false
         this.$emit('cancel')
      },
      onTypeSelected: function(type) {
         this.type = type
      },
      onCreate: function() {
         let member = this.model.members.new(this.form.name, this.type.default())
         this.isVisible = false
         this.$emit('accept', member)
      }
   },
   watch: {
      show: function() {
         this.isVisible = this.show
      }
   },
   components: {
      'select-type': SelectType
   }
}

</script>