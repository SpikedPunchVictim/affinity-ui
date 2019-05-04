<style>

</style>

<template>
   <div>
      <el-tree
         :data="treeModel"
         node-key="id"
         highlight-current
         empty-text="">
      </el-tree>

   </div>
</template>


<script>
import { Tree } from '@/lib/ModelTree'

export default {
   name: 'members-view',
   props: {
      model: Object
   },
   data() {
      return {
         treeModel: []
      }
   },
   mounted: function() {
      this.refresh(this.model)
   },
   methods: {
      refresh() {
         // TODO: Smart update
         let tree = new Tree(this.model)
         this.treeModel = tree.populate()
      }
   }
}

</script>