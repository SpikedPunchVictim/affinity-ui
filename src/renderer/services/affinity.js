/*
   Note:
   Affinity is delivered to us from the main process. We need to do this
   since that is where the UI is to load and save projects. The renderer
   process is only used to edit the Project once it has been loaded.

   Later, the main process will also be responsible for loading plugins, which
   may contain UI elements. So it will be best if we handle this before any
   BrowserWindow is loaded.
*/

import Vue from 'vue' // Needed to access the store to set the active project
const Affinity = require('affinity')
const axml = require('affinity-xml')
const { EventEmitter } = require('events')
//import utils from '@/lib/utils'
//import events from './events'
//import affVuex from '@/vuex/modules/affinity.js'
const settings = require('./settings')
import { mapActions } from 'vuex'
import events from '@/services/events'

let emitter = new EventEmitter()

Affinity.use(axml)

let activeProject = null

// events.on('app.loaded', _ => {
//    let project = create(true)
//    let { setProject } = mapActions(['setProject'])
//    setProject({ project })
//    //Vue.store.actions.setProject(project)
// })

/**
 * Creates a new Affinity project
 */
function create(preFill=false) {
   let project = Affinity.create()

   if(preFill) {
      fill(project, 4)
   }

   return project
}

/**
 * Loads a project from the given path
 * @param {string} projectPath
 * @return Promise Resolves to a the new Project
 */
function load(projectPath) {
   return new Promise((resolve, reject) => {
      axml.load(projectPath, (err, project) => {
         if(err) {
            return reject(err)
         }

         settings.set('lastProjectPath', projectPath)
         settings.save()
         resolve(project)
      });
   })
}

// TODO: Promisify
function save(project, saveDir) {
   // utils.inspect('[save] project', project)
   // utils.inspect('[save] saveDir', saveDir)

   axml.add(project, saveDir)
   project.commit()
   emitter.emit('project.saved', { project, dir: saveDir })
}

function setActiveProject(project) {
   activeProject = project
   return activeProject 
}

function fill(project, depth = 3) {
   console.log('filling...')
   Affinity.test.fill.project(project, depth)
   console.log('  : done')
}


export default {
   affinity: Affinity,
   load: load,
   create: create,
   events: emitter,
   fill: fill,
   activeProject: activeProject,
   save: save,
   setActiveProject: setActiveProject,
   types: Affinity.types
}