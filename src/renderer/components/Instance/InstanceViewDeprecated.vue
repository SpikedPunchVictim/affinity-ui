<template>
   <div>
      <div class="container">
         <div class="row">
            <div class="col-xs-12">
               <div class="input-group">
                  <span class="input-group-addon" id="basic-addon1">Name</span>
                  <input type="text" class="form-control" placeholder="Instance Name" aria-describedby="basic-addon1">
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>

export default {
   name: 'instance-details',
   props: {
      instance: Object
   }
}

</script>