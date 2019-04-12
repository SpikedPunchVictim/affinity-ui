const { EventEmitter } = require('events')
const { Events, utils, ObservableCollection } = require('affinity')

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
    this.item.on(Events.disposed, _ => this.emit('disposed', { item: this.item }))
    this.children = []
  }

  get name() {
    if(utils.isNamespace(this.item) && this.item.name === '') {
      return 'Root'
    } 

    return this.item.name
  }

  get type() {
    return typeswitch(this.item,
      _ => NodeType.Namespace,
      _ => NodeType.Model,
      _ => NodeType.Instance,
      _ => { throw new Error("Unsupported Qualified Object Type for Tree.") }
    )
  }

  /**
   * Gets the priority when ordering the Qualified items in the Tree
   * 
   * @param {QualifiedObject} qualifiedObject 
   */
  static priority(qualifiedObject) {
    return typeswitch(qualifiedObject,
      _ => 1,
      _ => 2,
      _ => 3,
      _ => 4)
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
      node.on('disposed', obj => this._onDisposed(obj.item))
      this.children.push(node)
    }

    // let addNamespace = nspace => {
    //   console.log(`[tree.js] Adding Namespace ${nspace.qualifiedName}`)
    //   let node = new Node(nspace)
    //   node.on('disposed', obj => this._onDisposed(obj.item))
    //   this.children.push(node)
    // }

    // let addModel = model => {
    //   console.log(`[tree.js] Adding Model ${model.qualifiedName}`)

    //   let node = new Node(model)
    //   this.children.push(node)
    //   node.on('disposed', obj => this._onDisposed(obj.item))
    // }

    // let addInstance = instance => {
    //   console.log(`[tree.js] Adding instance ${instance.qualifiedName}`)

    //   let node = new Node(instance)
    //   this.children.push(node)
    //   node.on('disposed', obj => this._onDisposed(obj.item))
    // }

    let { children, models, instances } = this.item

    children.on(Events.namespaceCollection.added, items => items.forEach(obj => addNode(obj.item)))
    models.on(Events.modelCollection.added, items => items.forEach(obj => addNode(obj.item)))
    instances.on(Events.instanceCollection.added, items => items.forEach(obj => addNode(obj.item)))

    children.forEach(nspace => {
      addNode(nspace)

      if(options.depth < 0 || options.depth > 0) {
        let tempOpts = options
        
        if(tempOpts.depth > 0) {
          tempOpts.depth -= 1
        }

        node.populate(tempOpts)
      }
    })

    models.forEach(model => addModel(model))
    instances.forEach(instance => addInstance(instance))
  }

  _onDisposed(obj) {
    let found = this.children.find(it => it.item === obj)

    if (found) {
      this.children.splice(found, 1)
    }
  }

  /**
   * Determines the index at which the node should be inserted
   * into the tree for proper ordering
   * 
   * @param {Node} node 
   */
  getSortedIndex(node) {
    let priority = Node.priority(node.item)

    for(let i = 0; i < this.children.length; ++i) {
      let currentNode = this.children[i]
      let currentPriority = Node.priority(currentNode.item)

      if(currentPriority > priority) {
        return i
      }
    }


    return typeswitch(node.item,
      _ => {
        return this.children.findIndex(n => {

        })
      },
      _ => {

      },
      _ => {

      }
    )
  }
}


export class Tree {
  constructor(namespace) {
    this.namespace = namespace
    this.children = []
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
    let root = new Node(this.item)
    root.populate(options)
    return [root]
  }

  // createChildren(namespace, parentList) {
  //   let { children, models, instances } = namespace

  //   for (let i = 0; i < children.length; ++i) {
  //     let current = children.at(i)
  //     //let node = new Node(current, parentList)
  //     let node = createProxy(current)
  //     parentList.push(node)
  //     this.createChildren(current, node.children)
  //   }

  //   for (let i = 0; i < models.length; ++i) {
  //     //parentList.push(new Node(models.at(i), parentList))
  //     parentList.push(createProxy(models.at(i)))
  //   }

  //   for (let i = 0; i < instances.length; ++i) {
  //     // parentList.push(new Node(instances.at(i), parentList))
  //     parentList.push(createProxy(instances.at(i)))
  //   }
  // }
}