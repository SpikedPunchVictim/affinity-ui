<style>

.details {
   /*height: 350px;*/
   height: 100%;
   width: 100%;
}

.tab-icon {
   margin-right: 3px;
}

</style>

<template>
   <div>
      <el-tabs
         v-if="tabs.length > 0"
         :value="selectedTab"
         theme="light"
         type="card"
         closable
         @tab-remove="closeTab">
         <el-tab-pane
            v-for="(obj, index) in tabs"
            :label="obj.name"
            v-bind:key="obj.qualifiedName"
            :name="obj.qualifiedName">
            <span slot="label">
               <icon :name="getIcon(obj)" class="tab-icon"></icon>
               {{ obj.name }}
            </span>
            <detail-view :object="obj"></detail-view>
         </el-tab-pane>
      </el-tabs>
   </div>
</template>


<script>
import DetailView from '@/components/Details/DetailView'
import utils from '@/lib/utils'
import icon from '@/lib/icon'
import _ from 'lodash'
import { mapActions } from 'vuex'

export default {
   name: 'details-view',
   props: {
      object: Array
   },
   data() {
      return {
         tabs: [],
         selectedTab: ''
      }
   },
   methods: {
      ...mapActions([ 'unselectObject' ]),
      closeTab: function(tabName) {
         let index = this.tabs.findIndex(it => it.qualifiedName === tabName)

         if(index != null) {
            this.unselectObject(this.tabs[index])
            this.tabs.splice(index, 1)
         }
      },
      getIcon: function(obj) {
         return icon.get(obj).icon
      }
   },
   watch: {
      object: function(newObj) {
         // Close the results
         //let diff = _.difference(this.object, newObj)
         this.tabs.splice(0, this.tabs.length)
         newObj.forEach((obj, index) => {
            this.tabs.push(obj)
         })
         this.selectedTab = this.tabs.length > 0 ? this.tabs[this.tabs.length - 1].qualifiedName : ''
         // console.log(`[DetailsView] Selected: ${newObj.qualifiedName}`)
         // console.dir(newObj)
      }
   },
   components: {
      'detail-view': DetailView
   }
}
</script>