<style>
.top-padding{
   margin-top: 10px;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 350px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

/*
.modal-default-button {
  float: right;
}
*/

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>


<template>
   <transition name="modal">
      <div class="modal-mask">
         <div class="modal-wrapper">
         <div class="modal-container">

            <div class="modal-header"><h3>Create Member</h3></div>   

            <div class="modal-body">
               <div class="input-group">
                  <span class="input-group-addon" id="basic-addon1">Name</span>
                  <input
                     type="text"
                     class="form-control"
                     autofocus="autofocus"
                     placeholder="Member Name"
                     aria-describedby="basic-addon1"
                     v-model="name"
                     v-on:keyup.enter="onCreate"
                     @change="onChange">
               </div>
               <div class="top-padding">
                 <select-type v-on:selected="onTypeSelected"></select-type>
               </div>
            </div>

            <div>
               <div class="btn-group" role="group">
                  <button class="btn btn-default modal-footer-button" @click="$emit('cancel')">
                     Cancel
                  </button>
                  <button
                     class="btn btn-default modal-footer-button"
                     :class="{active: !isNameValid}"
                     @click="onCreate">
                     Create
                  </button>
                  </div>
            </div>
         </div>
         </div>
      </div>
   </transition>
</template>


<script>
import SelectType from '@/components/TypeSelect/SelectType'

export default {
   name: 'create-member',
   props: {
      model: {
         type: Object,
         required: true
      }
   },
   data() {
      return {
         name: '',
         type: null,
         isNameValid: false
      }
   },
   methods: {
      onCreate: function() {
         if(this.type == null || this.name == null || this.name == '') {
            return
         }
         this.$emit('created', this.model.members.new(this.name, this.type.default()))
      },
      onChange: function() {
         this.isNameValid = this.name != '' && this.model.members.get(this.name) == null
      },
      onTypeSelected: function(type) {
         this.type = type
      }
   },
   components: {
      'select-type': SelectType
   }
}

</script>