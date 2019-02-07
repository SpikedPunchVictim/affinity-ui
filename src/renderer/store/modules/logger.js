import * as types from '../mutation-types'

const state = {
  messages: []
}

const mutations = {
   // update() always returns a promise
  [types.LOG_DEBUG] (state, { key, message }) {
     console.log(`${key}: ${message}`)
     state.messages.push({
        level: 'debug',
        key: key,
        message: message
     })
  },

  [types.LOG_INFO] (state, { key, message }) {
     console.log(`${key}: ${message}`)
     state.messages.push({
        level: 'info',
        key: key,
        message: message
     })
  },

  [types.LOG_ERROR] (state, { key, message }) {
     console.log(`${key}: ${message}`)
     state.messages.push({
        level: 'error',
        key: key,
        message: message
     })
  },

  [types.LOG_INFO] (state, { key, message }) {
     console.log(`${key}: ${message}`)
     state.messages.push({
        level: 'info',
        key: key,
        message: message
     })
  },

  [types.LOG_WARNING] (state, { key, message }) {
     console.log(`${key}: ${message}`)
     state.messages.push({
        level: 'warn',
        key: key,
        message: message
     })
  }
}

export default {
  state,
  mutations
}
