<style>
.node {
   vertical-align: middle;
   text-overflow: ellipsis;
   font-size: 14px;
}

.node:hover {
   background-color: lightskyblue;
   cursor: pointer;
   transition: border-color .3s, background-color .3s, color .3s;
   border-radius: 4px;
}

.icon {
/*display:table;
margin:0 auto;*/
}

span {
  display: inline-flex;
  align-items: center;
}

</style>

<template>
   <div>
      <create-namespace
         key="create-namespace"
         :parent="nspace.parent || getRoot()"
         :show="nspace.isCreating"
         v-on:cancel="nspace.isCreating = false"
         v-on:accept="nspace.isCreating = false">
      </create-namespace>

      <create-model
         key="create-model"
         :parent="model.parent || getRoot()"
         :show="model.isCreating"
         v-on:cancel="model.isCreating = false"
         v-on:accept="model.isCreating = false">
      </create-model>

      <create-instance
         key="create-instance"
         :parent="inst.parent || getRoot()"
         :model="inst.model"
         :show="inst.isCreating"
         v-on:cancel="inst.isCreating = false"
         v-on:accept="inst.isCreating = false">
      </create-instance>

      <div
         :style="{ paddingLeft: left + 'px' }"
         class="node"
         @click="onSelected"
         @contextmenu="onMenu">
         <!--<span class="icon">-->
            <icon :name="getIcon"></icon>
         <!--</span>-->
         <span>{{ displayName }}</span>
      </div>
      <!--<div v-show="hasChildren && expanded">-->
         <div-node
            v-show="showChildren"
            v-for="child in getChildren"
            :object="child"
            v-bind:key=child.qualifiedName
            v-on:selected="bubbleSelected">
         </div-node>
      <!--</div>-->
   </div>
</template>

<script>
import CreateNamespace from '@/components/Modals/CreateNamespace'
import CreateModel from '@/components/Modals/CreateModel'
import CreateInstance from '@/components/Modals/CreateInstance'
import utils from '@/lib/utils'
import icon from '@/lib/icon'
import { remote } from 'electron'
import { mapActions } from 'vuex'

export default {
   name: 'div-node',
   props: {
      object: Object
   },
   data() {
      return {
         left: 5,
         showMenu: false,
         expanded: true,
         nspace: {
            isCreating: false,
            parent: null,
            name: ''
         },
         model: {
            isCreating: false,
            parent: null,
            name: ''
         },
         inst: {
            isCreating: false,
            model: null,
            parent: null,
            name: ''
         }
      }
   },
   mounted: function() {
      this.updateIndent()
   },
   methods: {
      ...mapActions([ 'updateQualifiedObject' ]),
      onSelected: function() {
         if(utils.isNamespace(this.object)) {
            this.expanded = !this.expanded
         }
         this.$emit('selected', this.object)
      },
      onEndDrag: function() {
         console.dir(arguments)
      },
      bubbleSelected: function(obj) {
         this.$emit('selected', obj)
      },
      onMenu: function(e) {
         let namespaceMenu = {
            label: 'Create Namespace...',
            click: () => {
               this.nspace.isCreating = true
               this.nspace.parent = utils.isNamespace(this.object) ?
                  this.object :
                  this.object.parent
            }
         }

         let modelMenu = {
            label: 'Create Model...',
            click: () => {
               this.model.isCreating = true
               this.model.parent = utils.isNamespace(this.object) ?
                  this.object :
                  this.object.parent
            }
         }

         let instMenu = {
            label: 'Create Instance...',
            click: () => {
               
               this.inst.model = utils.isModel(this.object) ?
                  this.object :
                  null

               this.inst.parent = utils.isNamespace(this.object) ?
                  this.object :
                  this.object.parent

               this.inst.isCreating = true
            }
         }

         let sep = { type: 'separator' }

         let deleteMenu = {
               label: 'Delete...',
               click: () => {
                  this.$confirm(`Permanently delete ${this.object.name}?`, 'Warning', {
                     confirmButtonText: 'OK',
                     cancelButtonText: 'Cancel',
                     type: 'warning'
                  }).then(() => {
                     let parent = this.object.parent
                     utils.typeSwitch(this.object, {
                        namespace: _ => this.updateQualifiedObject(this.object, _ => parent.children.remove(this.object)),
                        model: _ => this.updateQualifiedObject(this.object, _ => parent.models.remove(this.object)),
                        instance: _ => this.updateQualifiedObject(this.object, _ => parent.instances.remove(this.object))
                     })
                  })
               }
         }

         let menu = remote.Menu.buildFromTemplate([namespaceMenu, modelMenu, instMenu, sep, deleteMenu])
         menu.popup()
      },
      updateIndent: function() {
         let indent = 8

         let add = 0
         if(utils.isNamespace(this.object) && !this.object.name == '') {
            add = indent
         } else if(utils.isModel(this.object) || utils.isInstance(this.object)) {
            add = indent * 2
         }

         this.left = (Math.max(1, this.object.qualifiedName.split('.').length) * indent) + add
      },
      getRoot: function() {
         let proj = this.project()
         return proj == null ? null : proj.root
      },
      project: function() {
         return this.$store.state.affinity.project
      }
   },
   // watch: {
   //   object: function(newValue) {
   //      console.log('Object changed')
   //      console.dir(newValue)
   //   } 
   // },
   computed: {
      hasChildren: function() {
         if(utils.isNamespace(this.object)) {
            return this.object.children.length > 0 ||
               this.object.models.length > 0 ||
               this.object.instances.length > 0
         }

         return false
      },
      showChildren: function() {
         if(utils.isNamespace(this.object)) {
            return this.expanded &&
               (this.object.children.length > 0 ||
               this.object.models.length > 0 ||
               this.object.instances.length > 0)
         }

         return false
      },
      getIcon: function() {
         let icn = icon.get(this.object)
         if(utils.isNamespace(this.object)) {
            return this.expanded ? icn.open : icn.closed
         }

         return icn.icon
      },
      getChildren: function() {
         let results = []
         if(utils.isNamespace(this.object) && this.expanded) {
            results = results.concat(this.object.models._items)
            results = results.concat(this.object.instances._items)
            results = results.concat(this.object.children._items)
         }
 
         return results    
      },
      displayName: function() {
         return  this.object.name == '' ? 'Root' : this.object.name
      }
   },
   components: {
      'create-namespace': CreateNamespace,
      'create-model': CreateModel,
      'create-instance': CreateInstance
   }
}

</script>