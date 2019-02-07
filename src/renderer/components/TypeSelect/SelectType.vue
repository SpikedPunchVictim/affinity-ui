<style>
li:hover {

}
</style>

<template>
   <div>
      <div>
         <type-dropdown
            :label="label"
            v-on:selected="typeSelected">
         </type-dropdown>
      </div>
      <div>
         <ul>
            <li v-if="subItem != null">
               <keep-alive>
                  <component v-bind:is="subItem" v-on:selected="subTypeSelected"></component>
               </keep-alive>
            </li>
         </ul>
      </div>
   </div>
</template>


<script>
//import typeDefs from './type-definitions'
import TypeDropdown from './TypeDropdown2'

//let typeMap = typeDefs.typeMap


import affinity from '../../services/affinity'
import Collection from './Collection'

let types = affinity.aff.types

let typeMap = {
   'bool': {
      isMultiSelect: false,
      create: function() {
         return types.bool.type()
      }  
   },
   'decimal': {
      isMultiSelect: false,
      create: function() {
         return types.decimal.type()
      }  
   },
   'int': {
      isMultiSelect: false,
      create: function() {
         return types.int.type()
      }  
   },
   'string': {
      isMultiSelect: false,
      create: function() {
         return types.string.type()
      }  
   },
   'uint': {
      isMultiSelect: false,
      create: function() {
         return types.uint.type()
      }  
   },
   'collection': {
      isMultiSelect: true,
      component: 'select-type-collection',
      create: function(selected) {
         return types.collection.type(selected)
      }  
   }
}



export default {
   name: 'select-type',
   props: {
      label: {
         type: String,
         required: false,
         default: 'Select Type'
      }
   },
   data() {
      return {
         selectedTypes: [],
         subItem: null,
         selectedTypeName: '',
         subType: null,
         types: Object.keys(typeMap)
      }
   },
   methods: {
      getTypes: function() {
         return Object.keys(typeMap)
      },
      typeSelected: function(type) {
         let info = typeMap[type]
         this.selectedTypeName = type

         if(info.isMultiSelect) {
            this.subItem = info.component
            return
         }

         this.subItem = null
         this.$emit('selected', info.create())
      },
      subTypeSelected: function(type) {
         let info = typeMap[this.selectedTypeName]
         this.$emit('selected', info.create(type))
      }
   },
   components: {
      'type-dropdown': TypeDropdown,
      'select-type-collection': Collection
   }
}

</script>