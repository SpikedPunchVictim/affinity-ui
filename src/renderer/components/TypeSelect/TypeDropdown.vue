<template>
   <div class="dropdown">
      <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
         {{ getSelectedName }}  <span class="caret"></span>
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
         <li v-for="t in typeNames" @click="selectType(t)"><a href="#">{{ t }}</a></li>
      </ul>
   </div>
</template>


<script>
import { mapGetters } from 'vuex'

export default {
   name: 'type-dropdown',
   props: {
      label: {
         type: String,
         required: false,
         default: 'Select Type'
      }
   },
   data() {
      return {
         selected: null
      }
   },
   methods: {
      getTypes: function() {
         return this.typeNames
      },
      selectType: function(type) {
         this.selected = type
         this.$emit('selected', type)
      }
   },
   computed: {
      ...mapGetters(['typeNames']),
      getSelectedName: function() {
         return this.selected == null ? this.label : this.selected
      }
   }
}

</script>