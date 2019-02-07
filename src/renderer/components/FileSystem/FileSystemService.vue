<template>
   <div>
      <select-folder :emitter="emitter"></select-folder>
   </div>
</template>

<script>
import SelectFolder from './SelectFolder'

export default { 
   name: 'file-system-service',
   props: {
      emitter: {
         type: Object,
         required: true
      }
   },
   components: {
      'select-folder': SelectFolder
   }
}
</script>