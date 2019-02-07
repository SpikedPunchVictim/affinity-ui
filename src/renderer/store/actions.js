import * as types from './mutation-types'


/*------------------------------------------------------------------------
* UI
*-----------------------------------------------------------------------*/
export const selectObject = ({ commit }, { obj, multiSelect }) => {
  console.log(`Vuex: Selected Object:  obj: ${obj}    multiSelect: ${multiSelect}`)
  commit(types.SELECT_QUALIFIED_OBJECT, { object: obj, multiSelect: multiSelect })
}

export const unselectObject = ({ commit }, { obj }) => {
  commit(types.UNSELECT_QUALIFIED_OBJECT,{ object: obj })
}


/*------------------------------------------------------------------------
* Logger
*-----------------------------------------------------------------------*/

export const logDebug = ({ commit }, { key, message }) => {
  commit(types.LOG_DEBUG, { key: key, message: message })
}

export const logError = ({ commit }, { key, message }) => {
  commit(types.LOG_ERROR, { key: key, message: message })
}

export const logInfo = ({ commit }, { key, message }) => {
  commit(types.LOG_INFO, { key: key, message: message })
}

export const logWarn = ({ commit }, { key, message }) => {
  commit(types.LOG_WARNING, { key: key, message: message })
}

/*------------------------------------------------------------------------
* Application
*-----------------------------------------------------------------------*/

export const setLastSavePath = ({ commit }, directory) => {
  commit(types.SET_LAST_SAVE_PATH, directory)
}

/*------------------------------------------------------------------------
* Affinity
*-----------------------------------------------------------------------*/

/*
* A generic update value function
* update: function(value)
*/
export const updateValue = ({ dispatch, commit, state }, { value, update }) => {
  commit(types.UPDATE_VALUE, value, update)
}

export const updateQualifiedObject = ({ commit }, { obj, update }) => {
   commit(types.UPDATE_QUALIFIED_OBJECT, obj, update)
}

export const createProject = ({ commit }) => {
  commit(types.PROJECT_CREATE_NEW)
}
