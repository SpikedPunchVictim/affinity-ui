import * as types from '../mutation-types'

const state = {
  lastSavePath: ''
}

const mutations = {
  [types.SET_LAST_SAVE_PATH] (state, path) {
    state.lastSavePath = path
  }
}

export default {
  state,
  mutations
}
