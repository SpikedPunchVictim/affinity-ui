<template>
   <div>
      <div-node
         :object="project.root"
         v-on:selected="onSelected">
      </div-node>
   </div>
</template>


<script>
import DivNode from './DivNode'

export default {
   name: 'div-view',
   props: {
      project: Object,
      filter: Function
   },
   data() {
      return {

      }
   },
   // mounted: function() {
   //    console.log(`DivView mounted.`)
   //    console.dir(this.object)
   // },
   methods: {
      onSelected: function (obj) {
         // Forward the selected event
         this.$emit('selected', obj)
      },
   },
   computed: {
      visibleItems: function() {
         return this.project.root
      }
   },
   components: {
      'div-node': DivNode
   }
}

</script>