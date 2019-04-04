<template>
   <div>
      <!-- <div>
         <el-input
            class="search-style"
            placeholder="Search"
            v-model="search.query"
            size="small">
               <el-button slot="append" @click=""><icon name="search"></icon></el-button>
         </el-input>
      </div> -->

      <project-tree :namespace="root" @node-selected="onTreeNodeSelected"></project-tree>
   </div>
</template>


<script>
import { mapGetters } from 'vuex'
import ProjectTree from '@/components/ProjectView/ProjectTree'
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
      'project-tree': ProjectTree
   }
}

</script>
