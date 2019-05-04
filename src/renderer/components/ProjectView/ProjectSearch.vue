<style>
.filter-list {
   margin-top: 5px;
}

.filter-list-item {
   margin-right: 5px;
}

</style>

<template>
   <div>
      <el-input placeholder="Search..." :value="query" size="small">
         <el-select 
            slot="prepend"
            :value="select"
            ref="select"
            style="width: 40px;"
            multiple
            @change="onFilterAdd"
            @remove-tag="onFilterRemove" 
            placeholder="">
               <el-option label="Namespace" value="Namespace"></el-option>
               <el-option label="Model" value="Model"></el-option>
               <el-option label="Instance" value="Instance"></el-option>
         </el-select>
         <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <div class="filter-list">
         <el-tag 
            v-for="item in filtered" :key="item"
            closable
            type="success"
            @close="onFilterRemove(item)"
            class="filter-list-item">{{ item }}</el-tag>
      </div>
   </div>
</template>

<script>

export default {
   name: 'project-search',
   data() {
      return {
         query: '',
         select: [],
         filtered: []
      }
   },
   methods: {
      onFilterAdd(selected) {
         if(Array.isArray(selected)) {
            selected.forEach(s => {
               if(!this.filtered.includes(s)) {
                  this.filtered.push(s)
               }
            })
         }

         this.$refs.select.blur()
      },
      onFilterRemove(source) {
         let found = this.filtered.indexOf(source)
         
         if(found !== undefined) {
            this.filtered.splice(found, 1)
         }
      },
      getFilter() {
         return {
            query: this.query,
            types: this.filtered
         }
      }
   },
   watch: {
      filtered: function(newValue, oldValue) {
         this.$emit('filter-change', this.getFilter())
      }
   }

} 

</script>