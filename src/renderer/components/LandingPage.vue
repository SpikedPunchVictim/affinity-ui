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
      <vue-splitter :margin="5">
         <div slot="left-pane">
            <!-- <project-namespace class="project" :project="project"></project-namespace> -->
            <project-view :project="project"></project-view>
         </div>
         <div slot="right-pane">
            <details-view class="details" :object="selected"></details-view>
         </div>
      </vue-splitter>
   </div>
</template>

<script>
import VueSplitter from "@rmp135/vue-splitter"
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
   mounted: function() {
      // if (this.project == null) {
      //    this.createProject()
      // }
      events.main.on('project.populate', _ => {
         this.populateProject()
      })
   },
   methods: {
      ...mapActions([
         'createProject',
         'populateProject'
      ])
   },
   computed: {
      ...mapGetters([
         'project'
      ]),
      ...mapState({
         selected: state => state.selected.selected,
      }),
      getProject: function() {
         //return this.project
         return this.$store.state.affinity.project
      },
      hasProject: function() {
         return this.project != null
      }
   },
   components: {
      VueSplitter,
      SideBar,
      'project-namespace': ProjectNamespaceView,
      DetailsView,
      'project-view': ProjectView
   }
}
</script>