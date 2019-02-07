<template>
   <div>
      <div class="input-group">
         <span class="input-group-addon" id="basic-addon1">Search</span>
         <input type="text" data-provide="typeahead">
      </div>
      <div>
         <table class="table table-striped table-condensed table-hover">
            <tbody>
               <tr @click="selectModel(model)" v-for="model in models">{{ model.qualifiedName }}</tr>
            </tbody>
         </table>
      </div>
   </div>
</template>

<script>

import mapGetters from 'vuex'

export default {
   name: 'select-model',
   props: {
      models: {
         type: Array,
         required: true
      },
      selectedModel: {
         type: Object,
         required: false,
         default: null
      }
   },
   methods: {
      selectModel: function(model) {
         this.selectedModel = model
      }
   },
   computed: {
      getModels: function() {
         return this.models
      }
   }
}

</script>