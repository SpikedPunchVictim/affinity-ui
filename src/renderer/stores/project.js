const { create, test } = require('affinity')
import { Tree } from '../lib/ProjectTree'
import Vue from 'vue'

class ProjectContainer {
   constructor(project) {
      this.setProject(project || create())
      this.selected = []
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

   select(obj) {
      if(this.selected.indexOf(obj) >= 0) {
         return
      }

      this.selected.splice(-1, 0, obj)
   }

   unselect(obj) {
      let found = this.selected.indexOf(obj)

      if(found < 0) {
         return
      }

      this.selected.splice(found, 1)
   }
}

let Container = Vue.observable(new ProjectContainer())
let selected = Container.selected

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

function select(obj) {
   Container.select(obj)
}

function unselect(obj) {
   Container.unselect(obj)
}

export {
   Container,
   createNewProject,
   populate,
   select,
   selected,
   unselect
}
