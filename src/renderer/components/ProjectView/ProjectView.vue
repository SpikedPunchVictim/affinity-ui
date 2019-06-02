<style>

.search {
   margin: 0px 15px 0px 10px;
}

</style>

<template>
   <div>
      <project-search class="search"></project-search>
      <project-tree :namespace="root" @node-selected="onTreeNodeSelected"></project-tree>
   </div>
</template>


<script>
import { mapActions } from 'vuex'
import ProjectTree from '@/components/ProjectView/ProjectTree'
import ProjectSearch from '@/components/ProjectView/ProjectSearch'
import utils from '@/lib/utils'

export default {
   name: 'project-view',
   props: {
      project: Object
   },
   data() {
      return {
         namespace: null,
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
   created: function() {
      this.log(`created project: ${this.project}`)
      this.namespace = this.project.root
   },
   methods: {
      ...mapActions(['selectObject']),
      onSearch() {
         this.log('click')
      },
      log(msg) {
         console.log(`[ProjectView] ${msg}`)
      },
      onTreeNodeSelected(selected) {
         if(!utils.isNamespace(selected)) {
            this.selectObject({ obj: selected, multiSelect: true })
         }
      }
   },
   computed: {
      root() {
         return this.project ? this.project._root : null
      }
   },
   watch: {
      project: function(newProj, oldProj) {
         this.log(`Setting new namespace`)
         this.namespace = newProj.root
      }
   },
   components: {
      'project-tree': ProjectTree,
      'project-search': ProjectSearch
   }
}

</script>
