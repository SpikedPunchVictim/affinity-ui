export const QualifiedObjectType = {
   Instance: 'instance',
   Model: 'model',
   Namespace: 'namespace'
}

export class ProjectTreeView {
   constructor(root) {
      this.root = root
   }

   toArray() {
      let rootNode = {
         name: 'Root',
         type: QualifiedObjectType.Namespace,
         children: []
      }

      let results = [rootNode]

      for(nspace in this.root.children) {
         rootNode.children.push(this._namespace(nspace))
      }

      return results
   }

   _namespace(nspace) {
      let result = {
         name: nspace.name,
         type: QualifiedObjectType.Namespace,
         children: []
      }

      for(n in nspace.children) {
         result.children.push(this._namespace(n))
      }

      for(model in nspace.models) {
         result.children.push(this._model(model))
      }

      for(inst in nspace.instances) {
         result.children.push(this._instance(inst))
      }

      return result
   }

   _model(model) {
      return {
         name: model.name,
         type: QualifiedObjectType.Model,
         children: []
      }
   }

   _instance(inst) {
      return {
         name: inst.name,
         type: QualifiedObjectType.Instance,
         children: []
      }
   }
}