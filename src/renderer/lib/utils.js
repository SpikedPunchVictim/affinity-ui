// import { remote } from 'electron'
// let aff = remote.getGlobal('affinity')

//import aff from 'affinity'
const aff = require('affinity')
const util = require('util')

let Namespace = aff.Namespace
let Model = aff.Model
let Instance = aff.Instance


function isNamespace(obj) {
   return obj instanceof Namespace
}

function isModel(obj) {
   return obj instanceof Model
}

function isInstance(obj) {
   return obj instanceof Instance
}

function typeSwitch(obj, actions) {
   if(isNamespace(obj) && actions.namespace != null) {
      return actions.namespace()
   }
   
   if(isModel(obj) && actions.model != null) {
      return actions.model()
   }

   if(isInstance(obj) && actions.instance != null) {
      return actions.instance()
   }

   if(actions.default != null) {
      return actions.default()
   }
}

function toShortKey(obj) {
   if(isNamespace(obj)) {
      return 'nspace'
   } else if(isModel(obj)) {
      return 'model'
   } else if(isInstance(obj)) {
      return 'inst'
   } else {
      return ''
   }
}

function randomInt(low, high) {
   return Math.floor(Math.random() * (high - low + 1) + low);
}

function generateValidName(namedCollection) {
   let genName = () => {
      return `rng_${randomInt(0, 25000000)}`
   }

   let name = genName()

   while(namedCollection.get(name) == null) {
      name = genName()
   }

   return name
}

function inspect(label, obj) {
   console.log(`:: ${label} ::`)
   console.log(util.inspect(obj, { depth: null }))
}

class Type {
   static isCollection(type) {
      if(typeof type === 'object') {
         return type.toString().indexOf('collection') == 0
      }

      return false
   }
}

/**
 * 
 */
class CollectionViewModel {
   /**
    * 
    * @param {*} source 
    * @param {*} events 
    */
   constructor(source, events) {
      this.source = source
      this.events = events
      this.items = []

      this.source.on(this.events.add, this.add.bind(this))
      this.source.on(this.events.remove, this.remove.bind(this))
      this.source.on(this.events.move, this.move.bind(this))
   }

   dispose() {
      this.source.removeListener(this.events.add, this.add)
      this.source.removeListener(this.events.remove, this.remove)
      this.source.removeListener(this.events.move, this.move)
   }

   add(changes) {
      let self = this
      changes.forEach(it => self.items.splice(it.index, 0, it.item))
   }

   remove(changes) {
      let self = this
      changes.forEach(it => self.items.splice(it.index, 1))
   }

   move(changes) {
      let self = this
      changes.forEach(it => self.items.splice(it.from, 1))
      changes.forEach(it => self.items.splice(it.to, 0, it.item))
   }
}

function toObservable(source, events) {
   if(aff.utils.isObservableCollection(source)) {
      return new CollectionViewModel(source, events)
   }
}


export default {
   isNamespace: isNamespace,
   isModel: isModel,
   isInstance: isInstance,
   toShortKey: toShortKey,
   type: Type,
   randomInt: randomInt,
   generateValidName: generateValidName,
   toObservable: toObservable,
   typeSwitch: typeSwitch,
   inspect: inspect
}