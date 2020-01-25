<style>
  .tree-node {
      /* flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between; */
      font-size: 14px;
      padding-right: 8px;
   }

   .tree-label {
      margin-left: 5px;
      color: #000000
   }

   .el-tree-node__content:hover {
      background-color:rgb(68, 59, 122);
   }
</style>

<template>
   <div>
      <el-tree
         :data="model"
         :props="defaultProps"
         node-key="id"
         highlight-current
         empty-text=""
         @node-click="onNodeSelected"
         @node-contextmenu="onContextMenu">

         <span class="tree-node el-tree-node__content" slot-scope="{ node, data }">
            <span><icon color="rgb(69, 69, 69)" :name="getIcon(data.item)"></icon></span>
            <span class="tree-label">{{ node.label }}</span>
            <!-- <span>
               <el-button
                  type="text"
                  size="mini"
                  @click="() => append(data)">
                  Append
               </el-button>
               <el-button
                  type="text"
                  size="mini"
                  @click="() => remove(node, data)">
                  Delete
               </el-button>
            </span> -->
         </span>
      </el-tree>
   </div>
</template>

<script>
import { NodeType, Tree } from '@/lib/ProjectTree'
import icon from '@/lib/icon'
import { mapActions, mapGetters } from 'vuex'
import { ipcRenderer } from 'electron'

export default {
   name: 'project-tree',
   props: {
      namespace: Object
   },
   data() {
      return {
         model: Tree.empty(),
         view: { name: '', children: [] },
         selection: [],
         tree: null,
         defaultProps: {
            children: 'children',
            label: 'name',
            isLeaf: (node, data) => {
               return node.type !== NodeType.Namespace
            }
        }
      }
   },
   mounted: function() {
      this.refresh(this.namespace)
   },
   methods: {
      ...mapActions([
         'selectObject'
      ]),
      log(msg) {
         console.log(`[ProjectTree] ${msg}`)
      },
      onNodeSelected(selected) {
         let { item } = selected
         this.$emit('node-selected', item)
      },
      refresh(namespace) { 
         if(namespace == null) {
            this.model = Tree.empty()
            return
         }

         this.tree = new Tree(namespace)
         this.tree.populate({ depth: -1 })
         this.model = this.tree.data
      },
      getIcon: function(type) {
         this.log(`Icon Type: ${type}`)
         return icon.get(type).icon
      },
      onContextMenu: function(event, node, prop, treeNode) {
         console.dir(event)
         console.dir(node)
         console.dir(prop)
         console.dir(treeNode)

         ipcRenderer.send()
      },
      onNodeClick(data, node, tree) {
         console.dir(data)
         console.dir(node)
         console.dir(tree)
      },
      onFolded(item, folded) {
         console.dir(folded)
      }
   },
   watch: {
      namespace: function(newNamespace, oldNamespace) {
         this.log(`watch:namespace triggered`)
         this.refresh(newNamespace)
      }
   }
}
</script>