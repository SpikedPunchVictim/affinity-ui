<style>


/* Search bar */

/* .ProjectTreeView>input[type="search"] {
    width: 100%;
    background: rgba(0, 0, 0, 0.05);
    height: 3em;
    border-width: 2px;
    transition: border 0.5s;
} */

/* Elements */

.ProjectTreeView {
    box-shadow: 0px 0px 10px #DADADA;
    white-space: nowrap;
}

.ProjectTreeView ul {
    list-style: none;
}

.ProjectTreeView li {
    min-width: 100px;
    transition: all 0.25s ease-in-out;
}

.ProjectTreeView ul li a {
    color: #222;
}

.ProjectTreeView ul li>.item>a {
    display: inline-block;
    vertical-align: middle;
    width: calc(100% - 55px);
    margin-right: 30px;
    padding: 10px 5px;
    text-decoration: none;
    transition: all 0.25s;
}

.ProjectTreeView ul li:not(.disabled) {
    cursor: pointer;
}

.ProjectTreeView ul li.selected>.item>a {
    color: crimson;
}

.ProjectTreeView ul li.selected>.item>a:hover {
    color: #aaa;
}

.ProjectTreeView ul li:not(.disabled)>.item>a:hover {
    color: #e26f6f;
}


/* Root elements */

.ProjectTreeView ul.depth-0 {
    padding: 20px;
    margin: 0;
    background-color: rgba(255, 255, 255, 0.4);
    user-select: none;
    transition: all 0.25s;
}


/* Categories : Nodes with children */

.ProjectTreeView li.category>.item {
    display: block;
    margin-bottom: 5px;
    transition: all 0.25s ease-in-out;
}

.ProjectTreeView li.category:not(.folded)>.item {
    border-bottom: 1px solid crimson;
}


/* Category opener */

.ProjectTreeView .opener {
    display: inline-block;
    vertical-align: middle;
    font-size: 20px;
    cursor: pointer;
}

.ProjectTreeView .opener::after {
    content: '+';
    display: block;
    transition: all 0.25s;
    font-family: monospace;
    margin: 0 0 0 5px
}

.ProjectTreeView li.category.async>.item>.opener::after {
    content: '!';
}

.ProjectTreeView .opener:hover {
    color: #e26f6f;
}

.ProjectTreeView li.category:not(.folded)>.item>.opener::after {
    color: crimson;
    transform: rotate(45deg);
}

@keyframes spin {
    from {
        transform: rotate(0deg)
    }
    to {
        transform: rotate(360deg)
    }
}

.ProjectTreeView li.category.loading>.item>.opener::after {
    animation: spin 1s infinite;
}


/* Animations on fold / unfold */

.ProjectTreeViewTransition-enter, .ProjectTreeViewTransition-leave-to {
    opacity: 0;
    transform: translateX(-50px);
}

.ProjectTreeViewTransition-enter-active, .ProjectTreeViewTransition-leave-active {
    transition: all .3s ease-in-out;
}


/* Drag'n'drop */

.ProjectTreeView li.dragover, .ProjectTreeView ul.dragover {
    box-shadow: 0px 0px 5px #CCC
}

.ProjectTreeView ul.dragover {
    background-color: rgba(200, 200, 200, 0.3);
}

.ProjectTreeView li.dragover {
    background-color: rgba(100, 100, 100, 0.05);
    padding: 0px 5px;
}

.ProjectTreeView li.dragover>span.item {
    border-color: transparent;
}

.ProjectTreeView li.nodrop {
    box-shadow: 0px 0px 5px crimson;
    background-color: rgba(255, 20, 60, 0.1);
    padding: 0px 5px;
}

</style>

<template>
   <div>
      <tree-view
         :model="model"
         :display="display"
         :css="css"
         :strategies="strategies"
         category="children"
         :onSelect="onSelect"
         transition="transition"
         :selection="selection"
         :unique="unique">
      </tree-view>
   </div>
</template>

<script>
import { TreeView } from "@bosket/vue"
import Tree from '@/lib/tree'
import { mapGetters } from 'vuex'

export default {
   name: '--project-view',
   // props: {
   //    project: Object
   // },
   data() {
      return {
         model: [],
         view: { name: '', children: [] },
         selection: [],
         css: {
            TreeView: "ProjectTreeView"
         },
         strategies: {
            // Select on click
            click: ["select"],
            // Use keyboard modifiers
            selection: ["modifiers"],
            // Use the opener to control element folding
            fold: ["opener-control"]
         },
         transition: {
            attrs: { appear: true },
            props: { name: "TreeViewDemoTransition" }
         },
         display: item => item.name,
         unique: item => {
            console.dir(item)
            return item.item.qualifiedName
         }
      }
   },
   mounted() {
      //this.refresh(this.project)
   },
   methods: {
      onSelect(selected) {
         this.selected = selected
      },
      refresh(project) {
         if(project == null) {
            return
         }

         this.model = (new Tree(project)).populate()

         console.dir(this.model)
      },
      onFolded(item, folded) {
         console.dir(folded)
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