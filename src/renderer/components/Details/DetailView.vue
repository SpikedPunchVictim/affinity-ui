<style>

.detail-style {
   /*background: #696969;*/
   border-radius: 4px;
   padding: 5px 10px 5px 10px
}

</style>

<template>
   <component :is="view" :object="object" class="detail-style"></component>
</template>

<script>
import utils from '@/lib/utils'
import ModelView from '@/components/Model/ModelView'
import InstanceView from '@/components/Instance/InstanceView'

export default {
   name: 'detail-view',
   props: {
      object: Object
   },
   data() {
      return {
         view: ''
      }
   },
   mounted: function() {
      if(utils.isModel(this.object)) {
         return this.view = 'model-details'
      }

      if(utils.isInstance(this.object)) {
         return this.view = 'instance-details'
      }
   },
   components: {
      'model-details': ModelView,
      'instance-details': InstanceView
   }
}

</script>