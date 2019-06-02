<style>
.member-name {
   font-weight: bold;
}
</style>

<template>
   <div>
      <el-tree
         :data="treeModel"
         node-key="id"
         empty-text="">
         <span slot-scope="{ node, data }">
            <span class="member-name">{{ data.member.name }}</span> : {{ displayNode(node, data) }}
         </span>
      </el-tree>

   </div>
</template>


<script>
import { Tree } from '@/lib/ModelTree'
import { valueSwitch } from '@/lib/types'

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
      },
      displayNode(node, data) {
         let { value } = data.member

         return valueSwitch(data.member.value, {
            bool() {
               return value.value
            },
            decimal() {
               return value.value
            },
            int() {
               return value.value
            },
            string() {
               return value.value
            },
            uint() {
               return value.value
            },
            collection() {
               return `${value.length} items`
            },
            default() {
               return `No display value can be determined`
            }
         })
      }
   }
}

</script>