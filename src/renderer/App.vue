<style>
  @import url(https://fonts.googleapis.com/css?family=Droid+Serif);

  body {
    /*font-family: Lato, Helvetica, sans-serif;*/
    font-family: 'Droid Serif';
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
    min-height: 100%;
  }

  html {
    height:100%;
  }

  element.style {
    height: 100%;
  }

  .full-height {
    height: 100%;
  }

  .centered {
    text-align: center;
  }

   /*.app-back {
     width: 100%;
     height: 100%;
     background-colorr: #475669;
   }*/
</style>

<template>
   <div class="full-height">
      <el-dialog
         title=""
         size="tiny"
         :show-close="false"
         :close-on-press-escape="false"
         v-model="loadingProject">
         <span v-loading="loadingProject" class="centered" text="Loading Project"></span>
      </el-dialog>

      <!-- <el-button @click="saveFile">Save File</el-button> -->
      <router-view></router-view>
      <!-- <file-system-service :emitter="emitter"></file-system-service> -->
   </div>
</template>

<script>
import store from '@/store'
import events from '@/services/events'
import affinity from '@/services/affinity'
//import FileSystemService from './components/FileSystem/FileSystemService'
import { mapActions } from 'vuex'


export default {
   data() {
      return {
         emitter: events,
         loadingProject: false
      }
   },
   mounted: function() {
      console.log(`[App.vue : mounted] ${events}`)
      
      events.on('message', (type, message) => {
         // types: success, error, info, warning
         this.$message({ type: type, message: message })
      })

      events.on('project.open.start', _ => this.loadingProject = true)
      events.on('project.open.success', _ => this.loadingProject = false)
      events.on('project.open.failed', err => {
         this.loadingProject = false
         this.$message({
            type: 'error',
            message: `Failed to load project. Reason:\n${err}`
         })
      })

      // All children will have been rendered when this function runs
      this.$nextTick(function () {
         events.emit('app.loaded')
         let project = affinity.create(true)
         this.setProject({ project })
         console.log(__filename + `: Project has been set`)
      })
   },
   methods: {
      ...mapActions([
         'setProject'
      ]),
      saveFile: function() {
         this.emitter.emit('project.open')
      }
   },
   store,
   // components: {
   //    'file-system-service': FileSystemService
   // }
}
</script>
