<template>
   <div>
      <tree-view 
         :model="project"
         :display="display"
         category="children"
         :onSelect="onSelect"
         :selection="selection">
      </tree-view>
   </div>
</template>

<script>
import { TreeView } from "@bosket/vue"
import { ProjectTreeView, QualifiedObjectType } from "@/lib/proxy"
import { mapGetters } from 'vuex'

export default {
   name: 'project-view',
   // props: {
   //    project: Object
   // },
   data() {
      return {
         model: [],
         view: { name: '', children: [] },
         selection: []
      }
   },
   mounted() {
      //this.refresh(this.project)
   },
   methods: {
      display(obj) {
         return obj.name
      },
      onSelect(selected) {
         this.selected = selected
      },
      refresh(project) {
         if(project == null) {
            return
         }

         this.view = new ProjectTreeView(project)
         this.model = this.view.toArray()

         console.dir(this.model)
      }
   },
   computed: {
      ...mapGetters([
         'project'
      ])
   },
   watch: {
      project: function(newProj, oldProj) {
         this.refresh(newProj)
      }
   },
   components: {
      'tree-view': TreeView
   }
}

// class Proxie {
//    static model(m) {
//       let proxy = new Proxy(m, {
//          get: (obj, prop) => {

//          }
//       })

//       return { label: proxy.name }
//    }
// }

</script>