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
</style>

<template>
   <div>
      <splitpanes class="default-theme">
         <div splitpanes-min="3">
            <!-- <project-namespace class="project" :project="project"></project-namespace> -->
            <project-view :project="project"></project-view>
         </div>
         <div >
            <details-view class="details" :object="selected"></details-view>
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
//import Affinity from '@/services/affinity'
import { mapState, mapGetters, mapActions } from 'vuex'
import events from '@/services/events'

export default {
   name: 'landing-page',
   data() {
      return {
         isPopualated: false
      }
   },
   created: function() {
      // if (this.project == null) {
      //    this.createProject()
      // }
      events.renderer.on('project.populate', _ => {
         this.populateProject()
      })
   },
   methods: {
      ...mapActions([
         'createProject',
         'populateProject'
      ]),
      log(msg) {
         console.log(`[LandingPage] ${msg}`)
      }
   },
   computed: {
      ...mapGetters([
         'project'
      ]),
      ...mapState({
         selected: state => state.selected.selected,
      }),
      // project: function() {
      //    this.log('Affinity:')
      //    console.dir(this.$store.state.affinity)
      //    return this.$store.state.affinity.project
      // },
      getRoot: function() {
         //return this.project
         return this.$store.state.affinity.project.root
      },
      hasProject: function() {
         return this.project != null
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