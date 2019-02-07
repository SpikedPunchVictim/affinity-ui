<template>
   <div>
      <div class="btn-group" role="group" aria-label="...">
         <button type="button" class="btn btn-default" @click="add"><span class="glyphicon glyphicon-plus"></span></button>
         <button type="button" class="btn btn-default" :class="{active: !isItemSelected}" @click="remove"><span class="glyphicon glyphicon-remove"></span></button>
         <button type="button" class="btn btn-default" :class="{active: !isItemSelected}" @click="moveUp"><span class="glyphicon glyphicon-arrow-up"></span></button>
         <button type="button" class="btn btn-default" :class="{active: !isItemSelected}" @click="moveDown"><span class="glyphicon glyphicon-arrow-down"></span></button>
      </div>
      <div>Selected Index: {{ selectedValue == null ? 'None' : value.indexOf(selectedValue) }}</div>
      <div style="max-height: 380px; overflow: auto;">
         <table class="table table-condensed top-padding table-hover" style="border-collapse:collapse;">
            <thead>
               <tr>  
                  <th>Index</th>
                  <th>Value</th>
               </tr>
            </thead>
            <tbody v-for="item in getItems">
               <tr @click="selectItem(item)" :class="{ 'table-active': this.selectedValue == null }" >
                  <td>{{ getItemIndex(item) }}</td>
                  <td><component :is="getItemView(item.type)" :value="item"></component></td>
               </tr>
            </tbody>
         </table>
      </div>
   </div>
</template>

<script>
import BoolEditor from './Bool'
// import DecimalEditor from './Decimal'
// import IntEditor from './Int'
// import StringEditor from './String'
// import UintEditor from './Uint'
import PrimitiveEditor from './PrimitiveEditor'
import CollectionEditor from './Collection'
import editors from './editors'
import utils from '@/lib/utils'
import Affinity from '@/services/affinity'
import { mapActions } from 'vuex'

let aff = Affinity.aff

export default {
   name: 'value-editor-collection',
   isMultiLine: true,
   props: {
      value: Object
   },
   data() {
      return {
         isUpdating: false,
         showEditor: false,
         selectedValue: null,
         isUpdating: false,
         propValue: this.value
      }
   },
   methods: {
      ...mapActions([
         'updateValue'
      ]),
      set: function(value) {
         this.setUpdating(true)
         this.value.update(value).then(_ => this.setUpdating(false))
      },
      setUpdating: function(updating) {
         this.isUpdating = updating
      },
      getItemView: function(type) {
         return editors.getEditorName(type)
      },
      getItemIndex: function(item) {
         return this.value.indexOf(item)
      },
      selectItem: function(item) {
         this.selectedValue = item
      },
      isItemSelected: function(item) {
         return this.selectedValue == item
      },
      add: function() {
         //console.dir(this.value)
         //this.value.add(this.value.itemType.default())
         this.updateValue({
            value: this.value,
            update: v => v.add(v.itemType.default())
         })
      },
      remove: function() {
         let index = this.value.indexOf(this.selectedValue)
         this.updateValue({
            value: this.value,
            update: v => v.remove(this.selectedValue)
               .then(_ => {
                  // Update the selectedValue with the next available
                  if(this.value.length == 0) {
                     return
                  }

                  let nextIndex = index > (this.value.length - 1) ? (this.value.length - 1) : index
                  this.selectedValue = this.value.at(nextIndex)
               })
         })        
      },
      moveUp: function() {
         if(this.selectedValue == null) {
            return;
         }

         // Wrap around
         let from = this.value.indexOf(this.selectedValue)
         let to = from == 0 ? (this.value.length - 1) : (from - 1)

         this.updateValue({
            value: this.value,
            update: v => v.move(from, to)
         })
      },
      moveDown: function() {
         if(this.selectedValue == null) {
            return;
         }

         // Wrap around
         let from = this.value.indexOf(this.selectedValue)
         let to = from == (this.value.length - 1) ? 0 : (from + 1)

         this.updateValue({
            value: this.value,
            update: v => v.move(from, to)
         })
      }
   },
   computed: {
      getItems: function() {
         return this.value == null ? [] : this.value.items._items
      }
   },
   components: {
      'value-editor-bool': BoolEditor,
      // 'value-editor-decimal': DecimalEditor,
      // 'value-editor-int': IntEditor,
      // 'value-editor-string': StringEditor,
      // 'value-editor-uint': UintEditor,
      'value-editor-primitive': PrimitiveEditor,
      'value-editor-collection': CollectionEditor
   }
}

</script>