import * as types from '../mutation-types'
import affinity from '@/services/affinity'
import events from '@/services/events'
import { populateProject } from '../actions'

let typeNames = [
   'bool',
   'decimal',
   'int',
   'string',
   'uint',
   'collection'
]

const state = {
   affinity: affinity,
   project: null,
   failed: [],
   typeNames: typeNames
}

events.main.on('project.open', (event, dirPath) => {
   events.emit('project.open.start', dirPath)
   affinity.load(dirPath)
      .then(proj => state.project = proj)
      .then(_ => events.emit('project.open.success', state.project))
      .catch(err => events.emit('project.open.failed', err))
})

events.on('project.save', (event, saveDir) => {
   affinity.save(state.project, saveDir)
})

// events.main.on('project.populate', _ => {
//    populateProject()
//    // console.log('Populating...')

//    // if(state.project == null) {
//    //    state.project = affinity.create()
//    // }

//    // affinity.fill(state.project)
//    // console.log('Populating: Done')
// })

affinity.events.on('project.load.success', project => {
   console.log('Assigning Project')
   state.project = project
})

const mutations = {
   [types.PROJECT_CREATE_NEW](state) {
      let project = affinity.create()
      state.project = project
      console.dir(state.project)
   },

   [types.PROJECT_POPULATE](state) {
      let project = state.project
      state.project = null

      if(project == null) {
         project = affinity.create()
      }

      console.log('[vuex/affinity] Populating...')
      affinity.fill(project)
      state.project = project
   },

   [types.UPDATE_SIMPLE_VALUE](state, { value, val }) {
      let onError = err => {
         events.emit('message', 'error', `Setting the value of type ${value.type} failed. Reason: ${err.stack}`)
      }

      try {
         value.update(val)
      } catch(err) {
         onError(err)
      }
   },

   [types.UPDATE_VALUE](state, { value, update }) {
      let promise = null;

      let onError = err => {
         events.emit('message', 'error', `Setting the value of type ${value.type} failed. Reason: ${err.stack}`)
      }

      try {
         promise = update(value)
      } catch(err) {
         onError(err)
         return
      }
      
      if(promise != null) {
         promise
            .then(_ => events.emit('success', `Successfully updated value of type ${value.type}`))
            .catch(err => onError(err))
      }
   },

   [types.UPDATE_QUALIFIED_OBJECT](state, { obj, update }) {
      let promise = null;

      let onError = err => {
         events.emit('message', 'error', `Setting the value of ${value.qualifiedName} failed. Reason: ${err.stack}`)
      }

      try {
         promise = update(value)
      } catch(err) {
         onError(err)
         return
      }
      
      if(promise != null) {
         promise
            .then(_ => events.emit('success', `Successfully updated value of ${value.qualifiedName}`))
            .catch(err => onError(err))
      }
   },

   [types.PROJECT_LOAD](state, { projectPath }) {
      return affinity.load(projectPath)
   },

   [types.PROJECT_SAVE](state, { saveDir }) {
      
   },

   [types.PROJECT_SET](state, { project }) {
      console.log(`${__filename}: Setting project from Vuex`)
      console.dir(project, { depth: null })
      state.project = project
   }
}

export default {
   state,
   mutations
}