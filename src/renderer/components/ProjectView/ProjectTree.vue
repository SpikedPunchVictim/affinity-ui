<style>
.tree-node-item-label {
  grid-area: label;
  grid-column-start: 1;
  grid-column-end: span col2-end;
  grid-row-start: 1;
  grid-row-end: span 2;
}

.tree-node-item-menu {
  grid-area: menu;
  grid-column-start: 3;
  grid-column-end: span col3-end;
  grid-row-start: 1;
  grid-row-end: span 2;
}

.tree-node {
  /* flex: 1;
  /* display: flex;
  /* align-items: center;
   justify-content: space-between; */
  font-size: 14px;
  padding-right: 8px;
  display: grid;
  grid-template-columns: 50px 50px 50px;
  grid-template-rows: auto;
  grid-template-areas: "label label menu";
}

.tree-label {
  margin-left: 5px;
  color: #000000;
}

.el-tree-node__content:hover {
  background-color: rgb(68, 59, 122);
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.tree-node-menu {
  align-content: flex-end;
}
</style>

<template>
  <div>
    <el-tree
      :data="model"
      :props="defaultProps"
      node-key="id"
      highlight-current
      empty-text
      @node-click="onNodeSelected"
      @node-contextmenu="onContextMenu"
    >
      <span class="tree-node el-tree-node__content" slot-scope="{ node, data }">
        <span>
          <icon color="rgb(69, 69, 69)" :name="getIcon(data.item)"></icon>
        </span>
        <span class="tree-label">{{ node.label }}</span>
        <span class="tree-node-menu">
          <el-dropdown 
            v-if="showContextMenu"
            trigger="hover"
            small
            @command="onContextMenuClicked">
               <span class="el-dropdown-link">
               {{ contextMenu.label }}
               <i class="el-icon-arrow-down el-icon--right"></i>
               </span>
               <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item 
                     v-for="(item, index) in contextMenu.items"
                     :key=index
                     :command=index>
                        {{ item.label }}
                     </el-dropdown-item>
               </el-dropdown-menu>
          </el-dropdown>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
import { NodeType, Tree } from "@/lib/ProjectTree";
import { AffinityUI } from "@/services/affinity";
import icon from "@/lib/icon";
import { mapActions, mapGetters } from "vuex";
import { ipcRenderer } from "electron";

export default {
  name: "project-tree",
  props: {
    namespace: Object,
    /*
      {
         label: "top level label",
         items: [
            { 
               label: "the label",
               action: () => {}
            }
         ]
      }


    */
    contextMenu: Object
  },
  data() {
    return {
      model: Tree.empty(),
      view: { name: "", children: [] },
      selection: [],
      tree: null,
      defaultProps: {
        children: "children",
        label: "name",
        isLeaf: (node, data) => {
          return node.type !== NodeType.Namespace;
        }
      }
    };
  },
  mounted: function() {
    this.refresh(this.namespace);
  },
  methods: {
    ...mapActions(["selectObject"]),
    log(msg) {
      console.log(`[ProjectTree] ${msg}`);
    },
    onNodeSelected(selected) {
      let { item } = selected;
      this.$emit("node-selected", item);
    },
    refresh(namespace) {
      if (namespace == null) {
        this.model = Tree.empty();
        return;
      }

      this.model = AffinityUI.toTree(this.namespace);
    },
    getIcon: function(type) {
      return icon.get(type).icon;
    },
    onContextMenu: function(event, node, prop, treeNode) {
      //this.$emit("contextmenu", { event, node, prop, treeNode });
      // console.dir(event)
      // console.dir(node)
      // console.dir(prop)
      // console.dir(treeNode)
      //ipcRenderer.send();
    },
    onContextMenuClicked: function(index, some, other) {
      this.contextMenu.items[index].action()
    },
    onNodeClick(data, node, tree) {
      console.dir(data);
      console.dir(node);
      console.dir(tree);
    },
    onFolded(item, folded) {
      console.dir(folded);
    }
  },
  computed: {
    showContextMenu: vm => true //vm.contextMenu != null
  },
  watch: {
    namespace: function(newNamespace, oldNamespace) {
      this.log(`watch:namespace triggered`);
      this.refresh(newNamespace);
    }
  }
};
</script>