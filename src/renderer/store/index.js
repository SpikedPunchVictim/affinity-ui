// import Vue from 'vue'
// import Vuex from 'vuex'
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
import modules from './modules'
import * as actions from './actions'
import * as getters from './getters'

import { createPersistedState, createSharedMutations } from 'vuex-electron'


Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  getters,
  actions,
  plugins: [
    //createPersistedState(),
    //createSharedMutations()
  ],
  strict: process.env.NODE_ENV !== 'production',
  devtools: process.env.NODE_ENV !== 'production'
})