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
   overflow: auto;

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

/*
 Splitpanes overrides
*/
.splitpanes {
   display:-webkit-box;
   display:-ms-flexbox;
   display:flex;
   width:100%;
   height:100%
}

.splitpanes--vertical {
   -webkit-box-orient:horizontal;
   -webkit-box-direction:normal;
   -ms-flex-direction:row;
   flex-direction:row
}

.splitpanes--horizontal {
   -webkit-box-orient:vertical;
   -webkit-box-direction:normal;
   -ms-flex-direction:column;
   flex-direction:column
}

.splitpanes--dragging *{
   -webkit-user-select:none;
   -moz-user-select:none;
   -ms-user-select:none;
   user-select:none
}

.splitpanes__pane {
   width:100%;
   height:100%;
   overflow:hidden
}

.splitpanes--vertical .splitpanes__pane {
   -webkit-transition:width .2s ease-out;
   transition:width .2s ease-out
}

.splitpanes--horizontal .splitpanes__pane {
   -webkit-transition:height .2s ease-out;
   transition:height .2s ease-out
}

.splitpanes--dragging .splitpanes__pane {
   -webkit-transition:none;
   transition:none
}

.splitpanes__splitter {
   -ms-touch-action:none;
   touch-action:none
}

.splitpanes--vertical>.splitpanes__splitter {
   min-width:1px;
   cursor:col-resize
}

.splitpanes--horizontal>.splitpanes__splitter {
   min-height:1px;
   cursor:row-resize
}

.splitpanes.default-theme .splitpanes__pane {
   background-color:white;
}

.splitpanes.default-theme .splitpanes__splitter {
   background-color:#fff;
   -webkit-box-sizing:border-box;
   box-sizing:border-box;
   position:relative;
   -ms-flex-negative:0;
   flex-shrink:0
}

.splitpanes.default-theme .splitpanes__splitter:after,.splitpanes.default-theme .splitpanes__splitter:before {
   content:"";
   position:absolute;
   top:50%;
   left:50%;
   background-color:rgba(0,0,0,.15);
   -webkit-transition:background-color .3s;
   transition:background-color .3s
}

.splitpanes.default-theme .splitpanes__splitter:hover:after,.splitpanes.default-theme .splitpanes__splitter:hover:before {
   background-color:rgba(0,0,0,.25)
}

.splitpanes.default-theme .splitpanes__splitter:first-child {
   cursor:auto
}

.default-theme.splitpanes .splitpanes .splitpanes__splitter {
   z-index:1
}

.default-theme.splitpanes--vertical>.splitpanes__splitter,.default-theme .splitpanes--vertical>.splitpanes__splitter {
   width:7px;
   border-left:1px solid #eee;
   margin-left:-1px
}

.default-theme.splitpanes--vertical>.splitpanes__splitter:after,.default-theme .splitpanes--vertical>.splitpanes__splitter:after,.default-theme.splitpanes--vertical>.splitpanes__splitter:before,.default-theme .splitpanes--vertical>.splitpanes__splitter:before {
   -webkit-transform:translateY(-50%);
   transform:translateY(-50%);
   width:1px;
   height:30px
}

.default-theme.splitpanes--vertical>.splitpanes__splitter:before,.default-theme .splitpanes--vertical>.splitpanes__splitter:before {
   margin-left:-2px
}

.default-theme.splitpanes--vertical>.splitpanes__splitter:after,.default-theme .splitpanes--vertical>.splitpanes__splitter:after {
   margin-left:1px
}

.default-theme.splitpanes--horizontal>.splitpanes__splitter,.default-theme .splitpanes--horizontal>.splitpanes__splitter {
   height:7px;
   border-top:1px solid #eee;
   margin-top:-1px
}

.default-theme.splitpanes--horizontal>.splitpanes__splitter:after,.default-theme .splitpanes--horizontal>.splitpanes__splitter:after,.default-theme.splitpanes--horizontal>.splitpanes__splitter:before,.default-theme .splitpanes--horizontal>.splitpanes__splitter:before {
   -webkit-transform:translateX(-50%);
   transform:translateX(-50%);
   width:30px;
   height:1px
}

.default-theme.splitpanes--horizontal>.splitpanes__splitter:before,.default-theme .splitpanes--horizontal>.splitpanes__splitter:before {
   margin-top:-2px
}

.default-theme.splitpanes--horizontal>.splitpanes__splitter:after,.default-theme .splitpanes--horizontal>.splitpanes__splitter:after {
   margin-top:1px
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
         <pane>
            <div splitpanes-min="3" class="project">
               <!-- <project-namespace class="project" :project="project"></project-namespace> -->
               <project-view :project="project"></project-view>
            </div>
         </pane>
         <pane>
            <div class="details">
               <details-view v-if="project != null" :object="selected"></details-view>
            </div>
         </pane>
      </splitpanes>
   </div>
</template>

<script>
// import VueSplitter from "@rmp135/vue-splitter"
//import { Multipane, MultipaneResizer } from 'vue-multipane'
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'


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
      Pane,
      SideBar,
      'project-namespace': ProjectNamespaceView,
      DetailsView,
      'project-view': ProjectView
   }
}
</script>