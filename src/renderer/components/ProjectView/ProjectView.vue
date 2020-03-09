<style>

.search {
   margin: 0px 15px 0px 10px;
}

</style>

<template>
   <div>
      <project-search class="search"></project-search>
      <project-tree 
         v-if="root != null" 
         :namespace="root"
         :contextMenu="contextMenu"
         @node-selected="onTreeNodeSelected"></project-tree>
   </div>
</template>


<script>
import { mapActions } from 'vuex'
import ProjectTree from '@/components/ProjectView/ProjectTree'
import ProjectSearch from '@/components/ProjectView/ProjectSearch'
import { select } from '@/stores/project'
import utils from '@/lib/utils'

export default {
   name: 'project-view',
   props: {
      project: Object
   },
   data() {
      return {
         contextMenu: {
            label: "Options",
            items: [
               { label: "Create Instance...", action: (_ => console.log('create instance')) },
               { label: "Create Model...", action: (_ => console.log('create model')) },
               { label: "Move", action: (_ => console.log('move')) },
               { label: "Delete", action: (_ => console.log('delete')) },
            ]
         },
         search: {
            query: '',
            filter: {
               namespace: true,
               model: true,
               instance: true   
            },
            typeOptions: [
               {
                  label: 'Namespace'
               }
            ]
         }
      }
   },
   // created: function() {
   //    this.log(`created project: ${this.project}`)
   //    this.namespace = this.project.root
   // },
   methods: {
      onSearch() {
         this.log('click')
      },
      log(msg) {
         console.log(`[ProjectView] ${msg}`)
      },
      onTreeNodeSelected(obj) {
         if(!utils.isNamespace(obj)) {
            select(obj)
         }
      },
      createContextMenu({ event, node, prop, treeNode }) {
         console.log('ContextMenu Opening...')
         console.dir(event)
         this.$refs.menu.open(event, treeNode)

         /*
         return {
            items: [
               {
                  label: "Create Namespace...",
                  onClick: () => {

                  }
               },
               {
                  label: "Create Model...",
                  divided: true,
                  onClick: () => {

                  }
               },
               {
                  label: "Create Instance...",
                  onClick: () => {

                  }
               },
               {
                  label: "Delete",
                  onClick: () => {

                  }
               }
            ],
            event

         }
         */
      }
   },
   computed: {
      root: function() {
         console.log(`[ProjectView] computed:root Has Project Root Changed? ${this.project ? this.project.item : null}`)
         console.dir(this.project)
         return this.project ? this.project._root : null
      }
   },
   components: {
      'project-tree': ProjectTree,
      'project-search': ProjectSearch
   }
}

</script>
