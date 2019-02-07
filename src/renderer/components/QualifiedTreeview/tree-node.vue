<style>

   li {
    display: block;
   }

   .node:hover {
      /* background-color: #bacff2; */
      cursor: pointer;
   }

   .node {
     vertical-align: middle;
   }
  
   selected {
      background-color: red;
      padding-left: 25px;
      color: black
   }

   .menu-fade-enter-active, .fade-leave-active {
      transition: opacity .75s
   }

   .menu-fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
      opacity: 0
   }
</style>

<template>
   <div v-if="hasData">

      <el-popover
         ref="nodemenu"
         placement="right"
         width="175"
         trigger="hover">
         <el-row v-for="item in fillContextMenu(object)">
            <el-button type="text" @click.prevent="item.click(object)">{{ item.label }}</el-button>
         </el-row>
      </el-popover>


       <li>
         <span>
            <el-button type="text" :icon="getIcon(object)" size="mini"></el-button>
            <!-- <i type="primary" :class="getIcon(object)"></i> -->
            <!-- <span :class="getIcon(object)" aria-hidden="true"></span> -->

            <!--

            -->
            <span
               v-popover:nodemenu
               type="text"
               class="node"
               @mouseover.prevent.stop="menuActive = true"
               @mouseleave.prevent.stop="menuActive = false"
               v-bind:style="itemClass"
               @click.prevent="selectNode">
               {{ object.name == '' ? 'Root' : object.name }}
               <transition name="menu-fade">
                  <span v-show="menuActive">  
                     <el-button type="text" size="mini" icon="caret-right"></el-button>
                  </span>
               </transition>

               


            </span>
         </span>
      </li>
      <div v-if="hasChildren">
         <ul>
            <tree-node
               v-for="child in getVisibleChildren"
               :object="child"
               :getContextMenu="getContextMenu"
               v-on:selected="bubbleSelected">
            </tree-node>
         </ul>
      </div>
   </div>
</template>

<script>
   import TreeView from './tree-view.vue'
   import utils from '../../lib/utils'

   // Note: Mapped to utils.toShortKey
   // let iconMap = {
   //    'nspace': 'glyphicon glyphicon-folder-close',
   //    'model': 'glyphicon glyphicon-file',
   //    'inst': 'glyphicon glyphicon-duplicate',
   //    '': 'glyphicon glyphicon-flash' // default
   // }

   let iconMap = {
      'nspace': 'star-on', //'el-icon-star-on',
      'model': 'menu', //el-icon-menu',
      'inst': 'document',//'el-icon-document',
      '': 'gel-icon-d-arrow-right' // default
   }

   export default {
      name: 'TreeNode',
      props: {
         object: Object,
         getContextMenu: {
            type: Function,
            required: false
         }
      },
      data() {
         return {
            selected: false,
            menuActive: false,
            fillContextMenu: this.getContextMenu || this.defaultFillContextMenu
         }
      },
      methods: {
         defaultFillContextMenu: function(obj) {
            return []
         },
         selectNode: function (e) {
            this.$emit('selected', this.object)
         },
         bubbleSelected: function(obj) {
            this.$emit('selected', obj)
         },
         bubbleContextMenu: function(ctx) {
            // this.fillContextMenu(ctx)
            // this.$emit('contextmenu', ctx)
         },
         styleLi: function() {
            return iconMap[utils.toShortKey(this.obj)]
         },
         getIcon: function(obj) {
            if(utils.isNamespace(obj)) {
               return iconMap['nspace']
            }

            if(utils.isModel(obj)) {
               return iconMap['model']
            }

            if(utils.isInstance(obj)) {
               return iconMap['inst']
            }

            return iconMap['']
         }
      },
      computed: {
         hasData: function() {
            return this.object != null
         },
         hasChildren: function () {
            if (this.object == null || !utils.isNamespace(this.object)) {
               return false
            }

            return this.object.children.length > 0 ||
               this.object.models.length > 0 ||
               this.object.instances.length > 0
         },
         getVisibleChildren: function () {
            let results = []

            let collect = (items, filter) => {
               if (items.length > 0) {
                  for (let item of items) {
                     if (filter(item)) {
                        results.push(item)
                     }
                  }
               }
            }

            let filter = x => true
            collect(this.object.children, filter)
            collect(this.object.models, filter)
            collect(this.object.instances, filter)

            return results
         },
         itemClass: function() {
            return {
               selected: this.$store.getters.selected.indexOf(this.object) >= 0
            }
         },
         isSelected: function () {
            return this.$store.getters.selected.indexOf(this.object) >= 0
         }
      },
      beforeCreate: function () {
         this.$options.components['tree-view'] = require('./tree-view.vue')
      },
      created: function () {
         //console.dir(this.$store.getters.selected)
      },
      components: {
         'tree-view': TreeView
      }
   }
</script>