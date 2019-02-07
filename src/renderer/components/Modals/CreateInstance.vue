<template>
  <el-dialog
      title="Create Instance"
      v-model="isVisible"
      v-on:open="onOpen"
      v-on:close="onClose">
    <el-form :model="form" label-position="right">
      <el-form-item label="Name" :label-width="formLabelWidth">
        <el-input v-model="form.name" auto-complete="off" focus @keyup.enter="onCreate"></el-input>
      </el-form-item>
      <el-form-item label="Model" :label-width="formLabelWidth">
         <el-autocomplete
            class="inline-input"
            v-model="form.modelName"
            :fetch-suggestions="querySearch"
            placeholder="Model"
            :trigger-on-focus="false"
            @select="onModelSelect"
            @keyup.enter="onCreate">
         </el-autocomplete>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="isVisible = false">Cancel</el-button>
      <el-button type="primary" @click="onCreate">Create</el-button>
    </span>
  </el-dialog>
</template>

<script>
import SelectModel from '@/components/Search/SelectModel'
import { mapGetters } from 'vuex'

export default {
   name: 'create-instance',
   props: {
      parent: {
         type: Object,
         required: true
      },
      model: {
         type: Object,
         required: false,
         default: null
      },
      show: Boolean
   },
   data: function() {
      return {
         formLabelWidth: '65px',
         form: {
            name: '',
            model: this.model,
            models: this.parent.root.models,
            modelName: this.model == null ? '' : this.model.qualifiedName
         },
         isVisible: this.show
      }
   },
   mounted: function() {
      this.refreshModelName()
   },
   methods: {
      onOpen: function() {
         this.$emit('open')
      },
      onClose: function() {
         this.$emit('cancel')
      },
      onCreate: function() {
         let inst = this.parent.instances.new(this.form.name, this.form.model)
         this.isVisible = false
         this.$emit('accept', inst)
      },
      querySearch: function(query, cb) {
         let project = this.project

         let models = []
         for(let model of this.project.models) {
            models.push(model)
         }

         let matching = models.filter(it => it.name.indexOf(query) >= 0)

         let results = matching.map(it => {
            return { value: it.qualifiedName }
         })

         cb(results || [])
      },
      onModelSelect: function() {
        this.form.model = this.project.search.model.find(this.form.modelName)
      },
      refreshModelName: function() {
         this.form.modelName = this.model == null ? '' : this.model.qualifiedName
      }
   },
   watch: {
      show: function() {
         this.isVisible = this.show
      }
   },
   computed: {
      ...mapGetters(['project'])      
   },
   components: {
      'select-model': SelectModel
   }
}

</script>