<style>
.top-padding{
   margin-top: 10px;
}

.members-view {
   margin-top: 5px;
}

.space el-form-item__label {
   width: 100%;
   height: 100%;
   /*color: #FFFFFF;*/
   color: black;
}

.field-label {
   text-align: right;
   padding-right: 5px;
   
   position: relative;
   top: 50%;
   transform: translateY(20%); 
}

.meta-form {
   margin-top: 8px;
}

.member-controls {
   margin-left: 5px;
}

.member-command-panel {
   border-radius: 4px;
   margin-top: 8px;
   width: 100%;
   height: 40px;
   background: #eef1f6;
}

</style>

<template>
   <div>
      <el-row type="flex" justify="space-between">
         <el-col :span="5" class="field-label">Name</el-col>
         <el-col :span="19"><el-input v-model="object.name" placeholder="Name" size="small"></el-input></el-col>
      </el-row>
      <!-- <el-row type="flex" justify="space-between" class="meta-form">
         <el-col :span="5" class="field-label">Static Name</el-col>
         <el-col :span="19"><el-input v-model="form.static" placeholder="Static Name" size="small"></el-input></el-col>
      </el-row> -->

      <el-row>
         <el-col :span="24">
            <members-view class="members-view" :model="object"></members-view>
         </el-col>
      </el-row>

      <!-- <create-member
         :show="isAddingMember"
         v-on:cancel="isAddingMember = false"
         v-on:create="isAddingMember = false"
         @accept="isAddingMember = false"
         :model="object">
      </create-member> -->
   </div>
</template>

<script>
//import MembersView from '@/components/Model/MemberView'
import MembersView from '@/components/Model/MemberTreeView'
//import MembersView from '@/components/Model/DraggableMemberView'
import CreateMember from '@/components/Modals/CreateMember2'
import utils from '@/lib/utils' 

export default {
   name: 'model-details',
   props: {
      object: Object // Model
   },
   data() {
      return {
         isAddingMember: false,
         form: {
            name: this.object.name,
            static: this.object.qualifiedName
         }
      }
   },
   methods: {
      changeMemberName: function(member, name) {
         member.name = name
      },
      addMember: function() {
         this.isAddingMember = true
      },
      removeMember: function() {

      },
      moveMemberUp: function() {

      },
      moveMemberDown: function() {
         
      },
      generateRandomName: function() {

      }
   },
   computed: {
      getMembers: function() {
         return this.object == null ? [] : this.object.members._items
      }
   },
   components: {
      'members-view': MembersView,
      'create-member': CreateMember
   },
   watch: {
      model: function() {
         this.form.name = this.object.name
         this.form.static = this.object.qualifiedName
      }
   }
}

</script>