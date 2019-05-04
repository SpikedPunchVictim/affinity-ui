class Node {
   constructor(member) {
      this.member = member
   }

   get label() {
      return this.member.name
   }

   get isLeaf() {
      return true
   }
}

export class Tree {
   constructor(model) {
      this.model = model
      this.children = []
      this.populate()
   }

   populate() {
      this.children = []

      this.model.members.forEach(member => {
         this.children.push(new Node(member))
      })

      return this.children
   }
}