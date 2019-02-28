//import utils from "@/lib/utils";
//import { Events } from 'affinity'
//import { Events, utils } from 'affinity'

//const utils = require('./utils')
const affinity = require('affinity')
const { Events, utils } = require('affinity')

export const NodeType = {
  Instance: "instance",
  Model: "model",
  Namespace: "namespace"
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

export default class Tree {
  constructor(project) {
    this.project = project
    this.children = []
  }

  get name() {
    return "Root"
  }

  get type() {
    return NodeType.Namespace
  }

  get item() {
    return this.project.root
  }

  populate() {
    this.createChildren(this.project.root, this.children)
    return [{
      name: this.name,
      type: this.type,
      item: this.item,
      children: this.children
    }]
  }

  createChildren(namespace, parentList) {
    let { children, models, instances } = namespace

    for (let i = 0; i < children.length; ++i) {
      let current = children.at(i)
      let node = new Node(current, parentList)
      parentList.push(node)
      this.createChildren(current, node.children)
    }

    for (let i = 0; i < models.length; ++i) {
      parentList.push(new Node(models.at(i), parentList))
    }

    for (let i = 0; i < instances.length; ++i) {
      parentList.push(new Node(instances.at(i), parentList))
    }
  }
}
