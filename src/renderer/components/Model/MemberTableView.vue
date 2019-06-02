<style>
  .el-col {
    border-radius: 4px;
  }

.command-bar {
  /* background-color: #99ccff; */
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 5px;
  font-family: 'Droid Serif';
  font-size: 13px; 
}

.center-image {
  margin-left: auto;
  margin-right: auto;
}

.command-bar-button {
  vertical-align: middle;
  margin: 0px 0px 0px 3px;
  padding: 5px;
  padding-left: 5px;
   font-family: 'Droid Serif';
  font-size: 14px; 
  /*text-align: center;
  list-style-type: none;*/
}

.table-style {
  border-radius: 4px;
}

.tag-button {
  margin-top: 5px;
  font-family: 'Droid Serif';
  font-size: 14px; 
}

.tag-button:hover {
  background:lightskyblue;
  cursor: pointer;
}
</style>

<template>
   <div>
      <el-row>
         <el-col :span="24" class="command-bar">
           <span>
              <el-button
                  type="primary"
                  size="mini"
                  @click="isAddingMember = true"
                  class="tag-button">Add Member
               </el-button>
            </span>
            <!-- <el-button-group>
               <el-button
                  type="text"
                  class="command-bar-button"
                  icon="plus"
                  size="small"
                  @click="addMember">Add
               </el-button>
               <el-button
                  type="text"
                  class="command-bar-button"
                  icon="caret-top"
                  size="small"
                  :disabled="!canMove"
                  @click="moveUp">Move Up
               </el-button>
               <el-button
                  type="text"
                  class="command-bar-button"
                  icon="caret-bottom"
                  size="small"
                  :disabled="!canMove"
                  @click="moveDown">Move Down
               </el-button>
           </el-button-group> -->
           <!--<span class="command-bar-button"><icon name="plus" scale="1"></icon></span>
           <span class="command-bar-button"><icon name="remove"></icon></span>
           <span class="command-bar-button"><icon name="caret-up"></icon></span>
           <span class="command-bar-button"><icon name="caret-down"></icon></span>-->
            <!--<el-menu mode="horizontal" theme="dark">
               <el-menu-item @click="addMember" index="1"><icon name="plus"></icon></el-menu-item>
               <el-menu-item @click="removeMember" index="2"><icon name="remove"></icon></el-menu-item>
               <el-menu-item @click="moveUp" index="3"><icon name="sort-up"></icon></el-menu-item>
               <el-menu-item @click="moveDown" index="4"><icon name="sort-down"></icon></el-menu-item>
            </el-menu>-->
         </el-col>
      </el-row>
      <el-row>
         <el-col :span="24">
            <el-table
               v-show="model.members.length > 0"
               class="table-style"
               fit
               :data="model.members._items"
               :show-header="false"
               empty-text=""
               @select="rowSelectionChanged">
               <!-- <el-table-column
                  type="expand"
                  prop="member"
                  width="25">
                  <template slot-scope="props">
                     <div v-if="isEditorMultiLine(props.row.type)">
                        <component :is="getEditorName(props.row.type)" :value="props.row.value"></component>
                     </div>
                  </template>
               </el-table-column> -->
               <el-table-column
                  type="selection"
                  width="33"
                  align="center">
               </el-table-column>
               <!-- <el-table-column
                  label="Type"
                  resizable
                  width="85">
                  <template slot-scope="scope">
                    {{ getTypeName(scope.row) }}
                     <el-tooltip placement="top-start" :openDelay="1000">
                        <div slot="content"><el-tag type="primary">{{ getTypeName(scope.row.type) }}</el-tag></div>
                        <el-tag type="primary">{{ getTypeName(scope.row.type) }}</el-tag>
                     </el-tooltip>
                  </template>
               </el-table-column> -->
               <el-table-column
                  label="Name"
                  width="140">
                  <template slot-scope="data">
                     <el-input
                        size="small"
                        @change="changeMemberName(data.row, value)"
                        :value="data.row.name">
                     </el-input>
                  </template>
               </el-table-column>
               <el-table-column
                  prop="member">
                  <template slot-scope="props">
                     <div v-if="isEditorMultiLine(props.row.type)"></div>
                     <div v-else>
                        <component :is="getEditorName(props.row.type)" :value="props.row.value"></component>
                     </div>
                  </template>
               </el-table-column>
               <el-table-column
                  label=""
                  width="60">
                  <template slot-scope="data">
                     <el-button size="small" type="primary" icon="delete" @click="removeMember(data.row)"></el-button>
                  </template>
               </el-table-column>
               <h3 slot="empty"></h3>
            </el-table>
         </el-col>
      </el-row>

      <!-- <el-row>
         <el-col>
            <div v-for="member in getMembers">
               {{member.name}}
            </div>
         </el-col>
      </el-row> -->

      <create-member
         :show="isAddingMember"
         v-on:cancel="isAddingMember = false"
         v-on:create="isAddingMember = false"
         @accept="isAddingMember = false"
         :model="model">
      </create-member>

   </div>
</template>

<script>
import CreateMember from '@/components/Modals/CreateMember2'
import valueEditors from '@/components/ValueEditors/editors'
import utils from '@/lib/utils'
import { mapActions } from 'vuex'

// Note: We should keep the 'members' property as a MemberCollection(?)
export default {
   name: 'members-view',
   props: {
      model: Object
   },
   data() {
      return {
         visibleEditors: [],
         selectedMembers: [],
         isAddingMember: false
      }
   },
   methods: {
      ...mapActions([
         'updateValue'
      ]),
      seescope: function(scope) {
        console.dir(scope)
      },
      changeMemberName: function(member, name) {
         member.name = name
      },
      getEditorName: function(type) {
         let name = valueEditors.getEditorName(type)
         return name
      },
      isEditorMultiLine: function(type) {
         return valueEditors.getEditor(type).isMultiLine
      },
      getTypeName: function(member) {
        console.dir(member)
         console.log(`[MemberView] getTypeName: ${member.type.toString()}`)
         return member.type.toString()
      },
      toggleEditor: function(name) {
         let index = this.visibleEditors.indexOf(name)
         if(index >= 0) {
            this.visibleEditors.splice(index, 1)
         } else {
            this.visibleEditors.push(name)
         }
      },
      rowSelectionChanged: function(selection, row) {
         // selection contains all Members selected
         // row is the Member that was just selected
         this.selectedMembers = selection
      },
      addMember: function() {
         this.isAddingMember = true
      },
      removeMember: function(member) {
         this.model.members.remove(member)
      },
      moveUp: function() {
         // Wrap around
         let from = this.model.members.indexOf(this.selectedMembers[0])
         let to = from == 0 ? (this.model.members.length - 1) : (from - 1)

         this.updateValue({
            value: this.model.members,
            update: v => v.move(from, to)
         })
      },
      moveDown: function() {
         // Wrap around
         let from = this.model.members.indexOf(this.selectedMembers[0])
         let to = from == (this.model.members.length - 1) ? 0 : (from + 1)

         this.updateValue({
            value: this.model.members,
            update: v => v.move(from, to)
         })
      }
   },
   computed: {
      getMembers: function() {
         return this.model == null ? [] : this.model.members._items
      },
      canMove: function() {
         return this.selectedMembers.length == 1
      },
      canRemove: function() {
         return this.selectedMembers.length > 0
      }
   },
   components: {
      ...(valueEditors.map()),
      'create-member': CreateMember
   }
}

</script>