const { EventEmitter } = require('events')
const { Events, utils, ObservableCollection } = require('affinity')
const { compare} = require('natural-orderby')

import Vue from 'vue'

export const NodeType = {
  Instance: "instance",
  Model: "model",
  Namespace: "namespace"
}

/*

      name: "Root",
      type: NodeType.Namespace,
      item: null,
      id: "_root",
      children: []

*/

function typeswitch(item, onNamespace, onModel, onInstance, onUnsupported) {
  if (utils.isNamespace(item)) {
    return onNamespace()
  } else if (utils.isModel(item)) {
    return onModel()
  } else if (utils.isInstance(item)) {
    return onInstance()
  } else {
    return onUnsupported()
  }
}


class Node extends EventEmitter {
  constructor(qualifiedObject) {
    super()
    this.item = qualifiedObject
    this._updateName(qualifiedObject)
    this.item.on(Events.disposed, _ => this.emit('disposed', { item: this.item }))
    this.item.on(Events.nameChanged, _ => this._updateName(this.item))
    this.children = []
  }

  get type() {
    return typeswitch(this.item,
      _ => NodeType.Namespace,
      _ => NodeType.Model,
      _ => NodeType.Instance,
      _ => { throw new Error("Unsupported Qualified Object Type for Tree.") }
    )
  }

  static empty() {
    return {
      name: "Root",
      type: NodeType.Namespace,
      item: null,
      id: "_root",
      children: []
    }
  }

  /**
   * Gets the priority when ordering the Qualified items in the Tree
   * 
   * @param {QualifiedObject} qualifiedObject 
   */
  static priority(qualifiedObject) {
    return typeswitch(qualifiedObject,
      _ => 3, // Namespace
      _ => 2, // Model
      _ => 1, // Instance
      _ => 0)
  }

  get id() {
    return `${this.type}_${this.item.qualifiedName}`
  }

  populate(options) {
    if(!utils.isNamespace(this.item)) {
      return
    }

    options = options || {}
    options.depth = options.depth || -1

    this.children.splice(0, this.children.length)

    let addNode = qualifiedObject => {
      let node = new Node(qualifiedObject)
      node.populate()
      node.on('disposed', obj => this._onDisposed(obj.item))
      
      let sortedIndex = this.getSortedIndex(node)
      this.children.splice(sortedIndex, 0, node)
      return node
    }

    let { children, models, instances } = this.item

    let test = items => { items.forEach(obj => addNode(obj.item)); }

    this.item.on(Events.namespace.childAdded, test /*items => items.forEach(obj => addNode(obj.item))*/)
    this.item.on(Events.namespace.modelAdded, items => items.forEach(obj => addNode(obj.item)))
    this.item.on(Events.namespace.instanceAdded, items => items.forEach(obj => addNode(obj.item)))

    //children.on(Events.namespaceCollection.added, items => items.forEach(obj => addNode(obj.item)))
    // models.on(Events.modelCollection.added, items => items.forEach(obj => addNode(obj.item)))
    // instances.on(Events.instanceCollection.added, items => items.forEach(obj => addNode(obj.item)))

    children.forEach(nspace => {
      let node = addNode(nspace)

      if(options.depth < 0 || options.depth > 0) {
        let tempOpts = options
        
        if(tempOpts.depth > 0) {
          tempOpts.depth -= 1
        }

        node.populate(tempOpts)
      }
    })

    models.forEach(model => addNode(model))
    instances.forEach(instance => addNode(instance))
  }

  /**
   * Determines the index at which the node should be inserted
   * into the child collection for proper ordering
   * 
   * @param {Node} node 
   */
  getSortedIndex(node) {
    if(this.children.length == 0) {
      return 0
    }

    let nodePriority = Node.priority(node.item)

    for(let i = 0; i < this.children.length; ++i) {
      let current = this.children[i]
      let currentPriority = Node.priority(current.item)

      if(nodePriority > currentPriority) {
        return i
      }

      if(nodePriority == currentPriority) {
        let compareResult = compare()(node.item.name, current.item.name)

        if(compareResult >= 0) {
          continue
        } else {
          return i
        }
      }
    }

    return this.children.length
  }

  _onDisposed(obj) {
    let found = this.children.find(it => it.item === obj)

    if (found) {
      this.children.splice(found, 1)
    }
  }

  _updateName(obj) {
    if(utils.isNamespace(obj) && obj.name === '') {
      this.name = 'Root'
      return
    } 

    this.name = obj.name
    this.emit('name-changed', { item: obj })
  }
}


export class Tree {
  constructor(namespace) {
    this.namespace = namespace
    this.children = []
    this.node = Node.empty()
    this.data = [this.node]
  }

  static empty() {
    return [{
      name: "Root",
      type: NodeType.Namespace,
      item: null,
      id: "_root",
      children: []
    }]
  }

  get name() {
    return "Root"
  }

  get type() {
    return NodeType.Namespace
  }

  get item() {
    return this.namespace
  }

  get id() {
    return `_root`
  }

  populate(options) {
    if(this.item == null) {
      return
    }

    let node = new Node(this.item)
    node.populate(options)
    this.node = node
    this.data = [this.node]
  }
}