// import Vue from 'vue'
// import Vuex from 'vuex'
// import * as actions from './actions'
import * as getters from './getters'
// import modules from './modules'

// Vue.use(Vuex)

// export default new Vuex.Store({
//   actions,
//   getters,
//   modules,
//   strict: false
// })

import Vue from 'vue'
import Vuex from 'vuex'

import { createPersistedState, createSharedMutations } from 'vuex-electron'

import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  getters,
  plugins: [
    createPersistedState(),
    createSharedMutations()
  ],
  strict: process.env.NODE_ENV !== 'production'
})