<style>
x-scroll {
   overflow-x:scroll;
}

.treeview {
   min-height: 100%;
   /* box-shadow: 10px 10px 5px grey; */
   border-radius: 2px;
   border: 1px;
}

.search-style {
   margin: 5px 0px 5px 0px;
}

.filter-style {
   margin: 0px 0px 5px 0px;
}

.tree-style {
   margin-top: 5px;
}

.search-type {
   /* margin: auto; */
   margin: 3px 0px 5px 3px;
   /* width: 150px; */
}

</style>

<template>
   <div class="treeview">
      <el-input
         class="search-style"
         placeholder="Search"
         v-model="search.query"
         size="small">
         <!-- <el-button-group class="search-style" slot="prepend">
            <el-button type="primary" size="mini">
               <icon :name="getIcon('namespace')"></icon>
            </el-button>
            <el-button type="primary" size="mini">
               <icon :name="getIcon('model')"></icon>
            </el-button>
            <el-button type="primary" size="mini">
               <icon :name="getIcon('instance')"></icon>
            </el-button>
         </el-button-group> -->
         <el-button slot="append" @click="onSearch"><icon name="search"></icon></el-button>
      </el-input>

      <!-- <el-select
         v-model="search.types"
         multiple placeholder="Select"
         size="small"
         class="search-type">
         <el-option :label="Namespace" :value="Namespace"></el-option>
         <el-option :label="Model" :key="model" :value="Model"></el-option>
         <el-option :label="Instance" :key="instance" :value="Instance"></el-option>
      </el-select> -->
      <div>
         <el-button-group class="search-type">
            <el-tooltip effect="light" content="Filter: Namespaces" placement="top" :open-delay="750">
               <el-button 
                  :type="getNamespaceFilterState"
                  size="small"
                  @click="onFilter('namespace')">
                  <icon :name="getIcon('namespace')"></icon>
               </el-button>
            </el-tooltip>

            <el-tooltip effect="light" content="Filter: Model" placement="top" :open-delay="750">
               <el-button
                  :type="getModelFilterState"
                  size="small"
                  @click="onFilter('model')">
                  <icon :name="getIcon('model')"></icon>
               </el-button>
            </el-tooltip>

            <el-tooltip effect="light" content="Filter: Instances" placement="top" :open-delay="750">
               <el-button
                  :type="getInstanceFilterState"
                  size="small"
                  @click="onFilter('instance')">
                  <icon :name="getIcon('instance')"></icon>
               </el-button>
            </el-tooltip>
         </el-button-group>
      </div>


      <!-- <el-input
         class="search-style"
         placeholder="Search"
         icon="search"
         v-model="search"
         size="small"
         :on-icon-click="onSearch">
      </el-input>
      <el-button-group class="search-style">
         <el-button type="primary" size="mini">
            <icon :name="getIcon('namespace')"></icon>
         </el-button>
         <el-button type="primary" size="mini">
            <icon :name="getIcon('model')"></icon>
         </el-button>
         <el-button type="primary" size="mini">
            <icon :name="getIcon('instance')"></icon>
         </el-button>
      </el-button-group> -->
      <div-view
         class="tree-style"
        :project="project"
        v-on:selected="onSelected">
      </div-view>
   </div>
</template>

<script>
import CreateNamespace from '@/components/Modals/CreateNamespace'
import CreateModel from '@/components/Modals/CreateModel'
import CreateInstance from '@/components/Modals/CreateInstance'
import utils from '@/lib/utils'
import icon from '@/lib/icon'
import app from 'electron'
import { mapActions } from 'vuex'

import DivView from './DivView'

export default {
   name: 'project-namespace',
   props: {
      project: Object
   },
   data() {
      return {
         nspace: {
            isCreating: false,
            parent: null,
            name: ''
         },
         model: {
            isCreating: false,
            parent: null,
            name: ''
         },
         inst: {
            isCreating: false,
            model: null,
            parent: null,
            name: ''
         },
         activeObject: null,
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
   methods: {
      ...mapActions([
         'selectObject',
         'logInfo',
         'logError'
      ]),
      log(msg) {
         console.log(`[ProjectNamespaceView] ${msg}`)
      },
      onSelected: function(obj) {
          if(!utils.isNamespace(obj)) {
              this.selectObject({ obj: obj, multiSelect: true })
          }
      },
      onSearch: function(val) {
         this.log(val)
      },
      onFilter: function(val) {
         this.search.filter[val] = !this.search.filter[val]
      },
      getIcon: function(type) {
         return icon.get(type).icon
      }
   },
   computed: {
      getRoot: function() {
         return this.project == null ? null : this.project.root
      },
      hasProject: function() {
         return this.project != null
      },
      showTree: function() {
         return this.hasProject && this.isCreatingNamespace != true
      },
      getNamespaceFilterState: function() {
         return this.search.filter.namespace ? 'primary' : 'success'
      },
      getModelFilterState: function() {
         return this.search.filter.model ? 'primary' : 'success'
      },
      getInstanceFilterState: function() {
         return this.search.filter.instance ? 'primary' : 'success'
      }
   },
   components: {
      'div-view': DivView,
      'create-namespace': CreateNamespace,
      'create-model': CreateModel,
      'create-instance': CreateInstance
   }
}
</script>