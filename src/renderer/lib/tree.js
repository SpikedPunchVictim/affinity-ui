import utils from '@/lib/utils'
import affinity from 'affinity'

export const NodeType = {
  Instance: "instance",
  Model: "model",
  Namespace: "namespace"
};

class Node {
  constructor(qualifiedObject, array) {
    this.qualifiedObject = qualifiedObject;
    this.array = array;
    this.type = Node.getType(qualifiedObject);
    this.qualifiedObject.on(affinity.Events.disposed);
    this.children = [];
  }

  get name() {
    return this.qualifiedObject.name;
  }

  _onDisposed() {
    let found = this.array.indexOf(this);

    if (found) {
      this.array.splice(found, 1);
    }
  }

  static getType(qualifiedObject) {
    if (utils.isNamespace(qualifiedObject)) {
      return NodeType.Namespace;
    }

    if (utils.isModel(qualifiedObject)) {
      return NodeType.Model;
    }

    if (utils.isInstance(qualifiedObject)) {
      return NodeType.Instance;
    }

    console.dir(qualifiedObject)
    throw new Error("Unsupported Qualified Object Type for Tree.");
  }
}

export default class Tree {
  constructor(project) {
    this.project = project;
    this.children = [];
    this.populate();
  }

  get name() {
    return "Root";
  }

  get type() {
    return NodeType.Namespace;
  }

  get item() {
    return this.project.root;
  }

  populate() {
    this.createChildren(this.project.root, this.children);
  }

  createChildren(namespace, parentList) {
    let { children, models, instances } = namespace;

    for (let i = 0; i < children.length; ++i) {
      let current = children.at(i);
      let node = new Node(current, parentList);
      parentList.push(node);
      this.createChildren(current, node.children);
    }

    for (let i = 0; i < models.length; ++i) {
      parentList.push(new Node(models.at(i), parentList));
    }

    for (let i = 0; i < instances.length; ++i) {
      parentList.push(new Node(instances.at(i), parentList));
    }
  }
}
