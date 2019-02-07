<style>
.boolean {
   font-family: 'Droid Serif';
   font-size: 13px;
}

</style>

<template>
   <el-button-group>
      <el-button 
         type="info"
         size="small"
         class="boolean"
         :icon="getTrueIcon"
         :disabled="isUpdating"
         @click.prevent="set(true)">True</el-button>
      <el-button
         type="info"
         size="small"
         class="boolean"
         :disabled="isUpdating"
         :icon="getFalseIcon"
         @click.prevent="set(false)">False</el-button>
   </el-button-group>
</template>

<script>

export default {
   name: 'value-editor-bool',
   isMultiLine: false,
   props: {
      value: Object
   },
   data() {
      return {
         isUpdating: false
      }
   },
   methods: {
      set: function(value) {
         this.setUpdating(true)
         this.value.update(value)
            .then(_ => this.setUpdating(false))
            .then(_ => console.log('done'))
      },
      setUpdating: function(updating) {
         this.isUpdating = updating
      }
   },
   computed: {
      isTrue: function() {
         return this.value.value == true
      },
      isFalse: function() {
         return this.value.value == false
      },
      getTrueIcon: function() {
         return this.value.value ? 'circle-check' : ''
      },
      getFalseIcon: function(val) {
         return this.value.value == false ? 'circle-check' : ''
      }
   }
}

</script>