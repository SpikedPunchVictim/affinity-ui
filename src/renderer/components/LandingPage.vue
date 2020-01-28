<style scoped>
.details {
   -webkit-order: 2;
   /* NEW - Chrome */
   /*width: 60%;*/
   /* No flex here, other cols take up remaining space */
   /*background: #696969;*/
   border-radius: 4px;
   padding: 8px;
   overflow: auto;
   /* Show vertical scrll bar */
   max-height: 95vh;
   /* Fill the view port */
   height: 100vh;


   /*display: table-row; */
   /*align-items: stretch;
  -webkit-flex: 1;
  height: 100%;
  width: 100%;
  max-width: 180px;
  background-color: #696969*/
}

.project {
   /* position: absolute; */
   -webkit-order: 1;
   /* NEW - Chrome */
   -webkit-flex: 1;
   /* Chrome */
   height: 100vh;

   /*color: #FFFFFF;*/
   /*background: #696969;*/
   /*border-radius: 4px;*/
   margin-right: 5px;
   /* min-height: 95%; */
   /* height: 100%; */
   overflow: auto;
   max-height: 95vh;
   /* Fill the view port */
}

.content-body {
   display: table-cell;
}

.column {
   float: right;
}


.el-menu-vertical:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>

<template>
   <div>
      <!-- <el-menu class="el-menu-vertical" :collapse="true" background-color="#545c64">
         <el-submenu index="1">
            <template slot="title">
               <i class="el-icon-circle-plus-outline"></i>
            </template>
         </el-submenu>
      </el-menu> -->

      <splitpanes class="default-theme">
         <div splitpanes-min="3">
            <!-- <project-namespace class="project" :project="project"></project-namespace> -->
            <project-view :project="project"></project-view>
         </div>
         <div>
            <details-view v-if="project != null" class="details" :object="selected"></details-view>
         </div>
      </splitpanes>
   </div>
</template>

<script>
// import VueSplitter from "@rmp135/vue-splitter"
//import { Multipane, MultipaneResizer } from 'vue-multipane'
import Splitpanes from 'splitpanes'
import SideBar from './SideBarView/SideBarView'
import ProjectNamespaceView from './ProjectNamespaceView/ProjectNamespaceView'
import ProjectView from '@/components/ProjectView/ProjectView'
import DetailsView from './DetailsView'
import { active, create, setActiveProject } from '../services/affinity'
import { mapState, mapGetters, mapActions } from 'vuex'
import events from '@/services/events'
import { Container, populate, selected } from '@/stores/project'

export default {
   name: 'landing-page',
   data() {
      return {
         isPopualated: false,
         project: Container.project,
         selected: selected
      }
   },
   mounted: function() {
      this.$nextTick(function() {
         populate()
      })
   },
   methods: {
      log(msg) {
         console.log(`[LandingPage] ${msg}`)
      }
   },
   computed: {
      hasProject: function() {
         console.log(`${__filename}: hasProject? ${this.project != null}`)
         return this.project != null
      },
   },
   watch: {
      selected: function(newObj, oldObj) {
         console.dir(newObj)
      }
   },
   components: {
      // VueSplitter,
      // 'multipane': Multipane,
      // 'multipane-resizer': MultipaneResizer,
      Splitpanes,
      SideBar,
      'project-namespace': ProjectNamespaceView,
      DetailsView,
      'project-view': ProjectView
   }
}
</script>