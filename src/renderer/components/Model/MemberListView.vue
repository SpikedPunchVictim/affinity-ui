<style>
.member-container {
   border-radius: 3px;
   background: white;

}

.member {
   margin: 5px 0px 0px 5px
}

.member:hover {
   cursor: pointer;
   background: rgb(95, 187, 218);
}

.member-name {
   font-weight: bold;
}
</style>

<template>
   <div>
      <member-bool :value="getMember('member_0').value"></member-bool>
      <splitpanes class="default-theme" vertical :push-other-panes="false">
         <div>
            <div 
               splitpanes-min="2"
               v-for="member in members"
               class="member"
               v-bind:key="member.name">
               <span class="member-name">{{ member.name }}</span> :
               <span @click="onClickValue(member)">{{ displayValue(member) }}</span>
            </div>
         </div>
         <div>
            Property Window
         </div>
      </splitpanes>

   </div>
</template>

<script>
import Splitpanes from 'splitpanes'
import { valueSwitch } from '@/lib/types'
import Bool from '@/components/Members/BoolMember'

export default {
   name: 'members-view',
   props: {
      model: Object
   },
   data() {
      return {
         members: this.model ? this.model.members._items : []
      }
   },
   methods: {
      getMember(name) {
         if(this.model == null) {
            return ''
         }

         return this.model.members.get(name)
      },
      displayValue(member) {
         let { value } = member

         return valueSwitch(member.value, {
            bool() {
               return value.value
            },
            decimal() {
               return value.value
            },
            int() {
               return value.value
            },
            string() {
               return value.value
            },
            uint() {
               return value.value
            },
            collection() {
               return `${value.length} items`
            },
            default() {
               return `No display value can be determined`
            }
         })
      },
      onClickValue(member) {
         console.log(member.name)
      }

   },
   components: {
      'member-bool': Bool,
      Splitpanes
   }
}

</script>