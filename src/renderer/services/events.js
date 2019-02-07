let EventEmitter = require('events').EventEmitter
const electron = require('electron')

let ipcRenderer = electron.ipcRenderer
let ipcMain = electron.ipcMain
let emitter = new EventEmitter()

let main = {
   on: function(event, callback) {
      ipcRenderer.on(event, callback)
   },
   emit: function(event) {
      let args = Array.from(arguments)
      ipcRenderer.send.apply(ipcRenderer, args)
   },
   once: function(event, callback) {
      ipcRenderer.once(event, callback)
   },
   remove: function(event, listener) {
      ipcRenderer.removeListener(event, listener)
   }
}

let renderer = {
   // callback(event, [args1], [args2], ...)
   on: function(event, callback) {
      ipcRenderer.on(event, callback)
      emitter.on(event, callback)
   },
   emit: function(event) {
      let args = Array.from(arguments)
      ipcRenderer.send.apply(ipcRenderer, args)
      emitter.emit.apply(emitter, args)
   },
   once: function(event, callback) {
      ipcRenderer.once(event, callback)
      emitter.once(event, callback)
   },
   remove: function(event, listener) {
      emitter.removeListener(event, listener)
   }
}

function emit(event) {
   //this.main.emit.apply(this.main, arguments)
   let args = Array.from(arguments)
   console.log(`events:emit ${event}`)
   console.dir(args)
   this.renderer.emit.apply(this.renderer, args)
   emitter.emit.apply(emitter, args)
}

function on(event, callback) {
   console.log(`events:on ${event}`)
   console.dir(arguments)
   this.main.on(event, callback)
   this.renderer.on(event, callback)
}

function once(event, callback) {
   console.log(`events:once ${event}`)
   this.main.once(event, callback)
   this.renderer.once(event, callback)
}

function remove(event, listener) {
   console.log(`events:remove ${event}`)
   this.main.remove(event, listener)
   this.renderer.remove(event, listener)
}

export default {
   main,
   renderer,
   emit,
   on,
   once,
   remove   
}