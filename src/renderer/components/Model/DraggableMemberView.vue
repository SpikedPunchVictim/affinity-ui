<style>
.member {
   text-align: right;
   padding-right: 5px;
}

.member:hover {
   background-color: lightskyblue;
   cursor: pointer;
   transition: border-color .3s, background-color .3s, color .3s;
   border-radius: 4px;
}

.name {
   margin: 3px 3px 0px 0px;
}

.type {
   text-align: center;
   margin: 6px 6px 0px 0px;
   text-overflow: ellipsis;
   width: 75px;
   overflow: hidden;
}

.value {
   margin: 3px 10px 5px 5px;
}

.multiline-editor-value {
   text-align: left;
   margin: 7px 0px 0px 5px;
}

.tag-button {
   margin-top: 5px;
   font-family: 'Droid Serif';
   font-size: 14px;
}

.tag-button-icon {
   margin-top: 5px;
}

.add-member {
   display: flex;
   justify-content: center;
}

.drag-handle {
   width: 0;
   height: 0;
   border-right: 20px solid transparent;
   border-top: 20px solid black;
   cursor: move;
}

</style>

<template>
   <div>
      <div class="add-member">
         <!-- <el-tag
               type="primary"
               class="tag-button">
               <icon name="plus-square" class=""></icon>Add Member
            </el-tag> -->
         <el-button type="info" size="small" @click="addMember">
            Add Member
         </el-button>
      </div>
      <draggable v-model="members" @change="memberListChanged">
         <el-row v-show="isListVisible" v-for="member in getMembers" class="member">
            <div class="drag-handle"></div>
            <!-- Type -->
            <el-col :span="6">
               <el-tooltip placement="top-start" :openDelay="1000" effect="light" :content="getTypeName(member.type)">
                  <div>
                     <el-tag type="primary" class="type">{{ getTypeName(member.type) }}</el-tag>
                  </div>
                  <el-tag type="primary">{{ getTypeName(member.type) }}</el-tag>
               </el-tooltip>
            </el-col>
            <!-- Name -->
            <el-col :span="8">
               <el-input size="small" class="name" @change="changeMemberName(member, value)" :value="member.name">
               </el-input>
            </el-col>
            <!-- Value -->
            <el-col :span="6" class="value">
               <div v-if="isEditorMultiLine(member.type)" class="multiline-editor-value">
                  <i class="el-icon-caret-right expand-caret"></i>
                  <div>
                     <component :is="getEditorName(member.type)" :value="member.value"></component>
                  </div>
               </div>
               <div v-else>
                  <component :is="getEditorName(member.type)" :value="member.value"></component>
               </div>
            </el-col>

         </el-row>
         <!-- <div
               v-show="isListVisible"
               v-for="member in getMembers"
               class="member">
               {{ member.name}}
               <el-tooltip placement="top-start" :openDelay="1000">
                  <div><el-tag type="primary">{{ getTypeName(member.type) }}</el-tag></div>
                  <el-tag type="primary">{{ getTypeName(member.type) }}</el-tag>
               </el-tooltip>
            </div> -->
      </draggable>

      <create-member :show="isAddingMember" v-on:cancel="isAddingMember = false" v-on:create="isAddingMember = false" @accept="isAddingMember = false" :model="model">
      </create-member>
   </div>
</template>

<script>
import CreateMember from '@/components/Modals/CreateMember2'
import Draggable from 'vuedraggable'
import utils from '@/lib/utils'
import valueEditors from '@/components/ValueEditors/editors'


export default {
   name: 'member-view',
   props: {
      model: Object
   },
   data() {
      return {
         isAddingMember: false,
         members: this.model.members._items
      }
   },
   methods: {
      isListVisible: function() {
         return this.model != null &&
            this.model.members.length > 0
      },
      getTypeName: function(type) {
         return type.toString()
      },
      addMember: function() {
         this.isAddingMember = true
      },
      memberListChanged: function(evt) {
         utils.inspect('memberListChanged', evt)

         if(evt.moved) {
            utils.inspect('before-move', this.model.members)
            this.model.members.move(evt.oldIndex, evt.newIndex)
            this.members = this.model.members._items
            utils.inspect('after-move', this.model.members)
         }
      },
      onDragAdd: function(evt) {
         utils.inspect('onDragAdd', evt)
      },
      onDragUpdate: function(evt) {
         utils.inspect('onDragUpdate', evt)
      },
      onDragEnd: function(evt) {
         utils.inspect('onDragEnd', evt)
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
      }
   },
   computed: {
      getMembers: function() {
         return this.model == null ? [] : this.model.members._items
      }
   },
   components: {
      ...(valueEditors.map()),
      'draggable': Draggable,
      'create-member': CreateMember
   }
}

</script>