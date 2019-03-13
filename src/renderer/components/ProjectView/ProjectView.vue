<style>
  .tree-node {
    /* flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between; */
    font-size: 14px;
    padding-right: 8px;
  }
</style>

<template>
   <div>
      <el-tree
         :data="model"
         :props="defaultProps"
         node-key="id"
         highlight-current
         @node-contextmenu="onContextMenu">

         <span class="tree-node" slot-scope="{ node, data }">
            <el-row :gutter="20">
               <el-col :span="2"><icon :name="getIcon(data.item)"/></el-col>
               <el-col :span="4">{{ node.label }}</el-col>

               <el-col :span="4" :offset="6">
                  <el-button
                     type="text"
                     size="mini"
                     @click="() => append(data)">
                     Append
                  </el-button>
               </el-col>

               <el-col :span="4" :offset="6">
                  <el-button
                     type="text"
                     size="mini"
                     @click="() => append(data)">
                     Append
                  </el-button>
               </el-col>
            </el-row>

            <!-- <span><icon :name="getIcon(node.item)"></icon></span>
            <span>{{ node.label }}</span>
            <span>
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
import { NodeType, Tree } from '@/lib/tree'
import utils from '@/lib/utils'
import icon from '@/lib/icon'
import { mapActions, mapGetters } from 'vuex'

export default {
   name: 'project-view',
   data() {
      return {
         model: [],
         view: { name: '', children: [] },
         selection: [],
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
      this.refresh(this.project)
   },
   methods: {
      ...mapActions([
         'selectObject'
      ]),
      onSelect(selected) {
         if(!utils.isNamespace(selected)) {
              this.selectObject({ obj: selected, multiSelect: true })
          }
         
         this.selected = selected
      },
      refresh(project) {
         if(project == null) {
            return
         }

         this.model = (new Tree(project)).populate()
      },
      getIcon: function(type) {
         console.log(`Icon Type: ${type}`)
         return icon.get(type).icon
      },
      onContextMenu: function(event, node, prop, treeNode) {
         console.dir(event)
         console.dir(node)
         console.dir(prop)
         console.dir(treeNode)
      },
      onFolded(item, folded) {
         console.dir(folded)
      }
   },
   computed: {
      ...mapGetters([
         'project'
      ])
   },
   watch: {
      project: function(newProj, oldProj) {
         this.refresh(newProj)
      }
   }
}
</script>