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
* update: function(value) : Promise
*/
export const updateValue = ({ dispatch, commit, state }, { value, update }) => {
  //commit(types.UPDATE_VALUE, { value, update })
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

  return promise
}

export const updateSimpleValue = ({ dispatch, commit, state }, { value, val }) => {
  //commit(types.UPDATE_SIMPLE_VALUE, { value, val })
}

export const updateQualifiedObject = ({ commit }, { obj, update }) => {
   commit(types.UPDATE_QUALIFIED_OBJECT, { obj, update })
}

export const createProject = ({ commit }) => {
  commit(types.PROJECT_CREATE_NEW)
}

export const populateProject = ({ commit }) => {
  commit(types.PROJECT_POPULATE)
}

export const setProject = ({ commit }, { project }) => {
  commit(types.PROJECT_SET, { project })
}