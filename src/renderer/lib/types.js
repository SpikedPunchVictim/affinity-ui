const { types } = require('affinity')
const utils = require('@/lib/utils')

const {
   bool,
   decimal,
   int,
   string,
   uint,
   collection
} = types

function valueSwitch(value, actions) {
   let type = value.type

   if(bool.type().equals(type)) {
      return actions.bool()
   }

   if(decimal.type().equals(type)) {
      return actions.decimal()
   }

   if(int.type().equals(type)) {
      return actions.int()
   }

   if(string.type().equals(type)) {
      return actions.string()
   }

   if(uint.type().equals(type)) {
      return actions.uint()
   }

   if(collection.isCollection(type)) {
      return actions.collection()
   }

   return actions.default()
}

function displayValue(value) {

}

module.exports = {
   valueSwitch
}