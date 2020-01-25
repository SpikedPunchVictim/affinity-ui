const { create, test } = require('affinity')
import { Tree } from '../lib/ProjectTree'
import Vue from 'vue'

class ProjectContainer {
   constructor(project) {
      this.setProject(project || create())
   }

   setProject(project) {
      if(this.project == project) {
         return
      }


      let tree = new Tree()
      
      if(project != null) {
         tree = new Tree(project.root)
         tree.populate()
      }

      Vue.set(this, 'project', project)
      Vue.set(this, 'tree', tree)
   }
}

let Container = Vue.observable(new ProjectContainer())

function createNewProject(populate=false) {
   let project = create()

   if(populate) {
      test.fill.project(project)
   }

   Container.setProject(project)
   return project
}

function populate() {
   test.fill.project(Container.project)
}

export {
   Container,
   createNewProject,
   populate
}
