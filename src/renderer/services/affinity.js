/*
   Note:
   Affinity is delivered to us from the main process. We need to do this
   since that is where the UI is to load and save projects. The renderer
   process is only used to edit the Project once it has been loaded.

   Later, the main process will also be responsible for loading plugins, which
   may contain UI elements. So it will be best if we handle this before any
   BrowserWindow is loaded.
*/

import Affinity from 'affinity'
import axml from 'affinity-xml'
import { EventEmitter } from 'events' 
//import utils from '@/lib/utils'
//import events from './events'
//import affVuex from '@/vuex/modules/affinity.js'
const settings = require('./settings')

let events = require('./events')
let emitter = new EventEmitter()

Affinity.use(axml)

/**
 * Creates a new Affinity project
 */
function create() {
   let project = Affinity.create()
   emitter.emit('project.created', project)
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

function fill(project) {
   Affinity.test.fill.project(project)
}


export default {
   aff: Affinity,
   load: load,
   create: create,
   events: emitter,
   fill: fill,
   save: save
}