const electron = require('electron')
const path = require('path')
const _ = require('lodash')
const fs = require('fs-extra')
const when = require('when')
const nodefn = require('when/node')
let isRenderer = require('is-electron-renderer')

let app = null
if(isRenderer) {
   app = electron.remote.app
} else {
   app = electron.app
}

let writeFile = nodefn.lift(fs.writeFile)

let configPath = path.join(app.getPath('appData'), 'affinity-ui', 'afinity.ui.json')
fs.mkdirsSync(path.dirname(configPath))
export { configPath as path }

let config = null

try {
   config = fs.readJsonSync(configPath)
   console.log(`Settings loaded from ${configPath}`)
} catch(err) {
   console.log('No settings file found. Creting new one')
   config = {}
   save()
}

export function save() {
   return writeFile(configPath, JSON.stringify(config))
      .catch(err => {
         if(err) {
            console.log(`Failed to write settings file. Reason:\n${err.stack}`)
            return
         }

         console.log(`Successfully wrote settings file ${configPath}`)
      })
}

export function set(keyPath, value) {
   return _.set(config, keyPath, value)
}

export function get(keyPath, defaultValue) {
   return _.get(config, keyPath, defaultValue)
}

// module.exports = {
//    save: save,
//    get: get,
//    set: set,
//    path: configPath
// }