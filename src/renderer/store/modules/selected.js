import * as types from '../mutation-types'

const state = {
   selected: []
}

const mutations = {
   [types.SELECT_QUALIFIED_OBJECT] (state, payload) {
      payload.multiSelect = payload.multiSelect || false

      if(payload.multiSelect) {
         if(state.selected.indexOf(payload.object) == -1) {
            state.selected.push(payload.object)
         }
      } else {
         state.selected = [payload.object]
      }
   },
   [types.UNSELECT_QUALIFIED_OBJECT] (state, payload) {
      let i = state.selected.length
      while(i--) {
         if(state.selected[i] === payload.object) {
            state.selected.splice(i, 1)
            return
         }
      }
   }
}

export default {
   state,
   mutations
}
