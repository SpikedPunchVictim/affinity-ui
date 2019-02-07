<template>
   <div>
      <select-type label="Select Item Type" v-on:selected="selected"></select-type>
   </div>
</template>


<script>
import TypeDropdown from './TypeDropdown'
import SelectType from './SelectType'

export default {
   name: 'select-type-collection',
   beforeCreate: function () {
      this.$options.components['select-type'] = require('./SelectType')
   },
   methods: {
      selected: function(type) {
         this.$emit('selected', type)
      }
   },
   components: {
      SelectType
   }
}

</script>