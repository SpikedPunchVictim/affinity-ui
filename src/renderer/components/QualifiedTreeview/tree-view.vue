<style>
   /*ul {
    list-style: none;
    padding:0;
    margin:0;
}*/
   
   ul {
      padding-left: 1em
   }
</style>

<template>
   <div>
      <ul v-if="isAssigned">
         <tree-node
            v-on:selected="onSelected"
            v-on:contextmenu="onContextMenu"
            :getContextMenu="getContextMenu"
            :object="root">
            <div slot="node-menu"><slot name="node-menu-child"></slot></div>
        </tree-node>
      </ul>
   </div>
</template>

<script>
import TreeNode from './tree-node.vue'

export default {
    name: 'tree-view',
    props: {
        root: Object,
        filter: Array,
        // Function that with the following signature:
        //     function(nodeObj)
        //         return Array of objects, each containing:
        //             - label
        //             - click {function()}
        getContextMenu: {
            type: Function,
            required: false,
            default: null
        }
    },
    data() {
        return {

        }
    },
    methods: {
        onSelected: function (obj) {
        // Forward the selected event
        this.$emit('selected', obj)
        },
        onContextMenu: function(ctx) {
        this.$emit('contextmenu', ctx)
        }
    },
    computed: {
        isAssigned: function () {
        return this.root != null
        }
    },
    components: {
        'tree-node': TreeNode
    }
}
</script>