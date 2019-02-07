<template>
  <el-dialog
      title="Create Model"
      v-model="isVisible"
      v-on:open="onOpen"
      v-on:close="onClose"
      @keyup.enter="onEnter">
    <el-form :model="form" label-position="right">
      <el-form-item label="Name" :label-width="formLabelWidth">
        <el-input v-model="form.name" auto-complete="off" v-on:keyup.enter="onCreate" focus></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="isVisible = false">Cancel</el-button>
      <el-button type="primary" @click="onCreate">Create</el-button>
    </span>
  </el-dialog>
</template>

<script>

export default {
   name: 'create-model',
   props: {
      parent: {
         type: Object,
         required: true
      },
      show: Boolean
   },
   data: function() {
      return {
         formLabelWidth: '65px',
         form: {
            name: ''
         },
         isVisible: this.show
      }
   },
   methods: {
      onOpen: function() {
         this.$emit('open')
      },
      onClose: function() {
         this.$emit('cancel')
      },
      onCreate: function() {
         let nspace = this.parent.models.new(this.form.name)
         this.isVisible = false
         this.$emit('accept', nspace)
      },
      onEnter: function() {
        console.log('Enter pressed')
      }
   },
   watch: {
      show: function() {
         this.isVisible = this.show
      }
   }
}

</script>