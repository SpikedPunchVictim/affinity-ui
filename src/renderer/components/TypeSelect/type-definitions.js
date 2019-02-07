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
      component: Collection,
      create: function(selected) {
         return types.collection.type(selected)
      }  
   }
}

export default {
   typeMap: typeMap
}