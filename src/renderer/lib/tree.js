const { Events, utils } = require('affinity')

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

let NamespaceHandler = {
  get: function(target, prop, proxy) {
    switch(prop) {
      case 'name': { return target.name }
      case 'type': { return NodeType.Namespace }
      case 'item': { return target }
      case 'id': { return `namespace_${target.qualifiedName}` }
      case 'children': { return target.children._items }
    }
  }
}

let ModelHandler = {
  get: function(target, prop, proxy) {
    switch(prop) {
      case 'name': { return target.name }
      case 'type': { return NodeType.Model }
      case 'item': { return target }
      case 'id': { return `model_${target.qualifiedName}` }
      case 'children': { return [] }
    }
  }
}

let InstanceHandler = {
  get: function(target, prop, proxy) {
    switch(prop) {
      case 'name': { return target.name }
      case 'type': { return NodeType.Instance }
      case 'item': { return target }
      case 'id': { return `instance_${target.qualifiedName}` }
      case 'children': { return [] }
    }
  }
}


function createChild(item) {
  let handler = {}
  
  if(utils.isNamespace(item)) {
    handler = NamespaceHandler
  } else if(utils.isModel(item)) {
    handler = ModelHandler
  } else if(utils.isInstance(item)) {
    handler = InstanceHandler
  }

  return new Proxy(item, handler)
}

class Node {
  constructor(qualifiedObject, array) {
    this.item = qualifiedObject
    this.array = array || []
    this.type = Node.getType(qualifiedObject)
    this.item.on(Events.disposed, this._onDisposed)
    this.children = []
  }

  get name() {
    return this.item.name
  }

  get id() {
    return `${this.type}_${this.item.qualifiedName}`
  }

  _onDisposed() {
    let found = this.array.indexOf(this)

    if (found) {
      this.array.splice(found, 1)
    }
  }

  static getType(qualifiedObject) {
    if (utils.isNamespace(qualifiedObject)) {
      return NodeType.Namespace
    }

    if (utils.isModel(qualifiedObject)) {
      return NodeType.Model
    }

    if (utils.isInstance(qualifiedObject)) {
      return NodeType.Instance
    }

    console.dir(qualifiedObject)
    throw new Error("Unsupported Qualified Object Type for Tree.")
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

  populate() {
    let root = createChild(this.item)
    this.createChildren(this.namespace, root.children)
    return [root]
    // return [{
    //   name: this.name,
    //   type: this.type,
    //   item: this.item,
    //   children: this.children
    // }]
  }

  createChildren(namespace, parentList) {
    let { children, models, instances } = namespace

    for (let i = 0; i < children.length; ++i) {
      let current = children.at(i)
      //let node = new Node(current, parentList)
      let node = createChild(current)
      parentList.push(node)
      this.createChildren(current, node.children)
    }

    for (let i = 0; i < models.length; ++i) {
      //parentList.push(new Node(models.at(i), parentList))
      parentList.push(createChild(models.at(i)))
    }

    for (let i = 0; i < instances.length; ++i) {
      // parentList.push(new Node(instances.at(i), parentList))
      parentList.push(createChild(instances.at(i)))
    }
  }
}