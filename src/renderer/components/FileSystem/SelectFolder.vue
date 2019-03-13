<style>
   .invis {
      visibility: hidden;
      size: 0;
   }
</style>

<template>
   <input
      type="file"
      ref="selector"
      :class="{ invis: isVisible }"
      @change="folderSelected"
      webkitdirectory
      directory>
   </input>
</template>

<script>
let emitter = require('@/services/events')

export default {
   name: 'select-folder',
   // props: {
   //    emitter: {
   //       type: Object,
   //       required: true
   //    }
   // },
   data() {
      return {
         defaultPath: '',
         context: null,
         isVisible: false
      }
   },
   mounted: function() {
      /*
         fileTypes {Array}:
         This Array matches the structure of the 'accept' property on the input element.
         From the spec:
            accept
               If the value of the type attribute is file, then this attribute will indicate the types of files that the server accepts, otherwise it will be ignored. The value must be a comma-separated list of unique content type specifiers:
               A file extension starting with the STOP character (U+002E). (e.g. .jpg, .png, .doc).
                  - A valid MIME type with no extensions.
                  - audio/* representing sound files. HTML5
                  - video/* representing video files. HTML5
                  - image/* representing image files. HTML5
      */
      emitter.on('select-folder', this.selectFolderEvent)
   },
   beforeDestroy: function() {
      emitter.remove('select-folder', this.selectFolderEvent)
   },
   methods: {
      selectFolderEvent: function(onAccepted, onDeclined) {
         this.context = {
            accepted: onAccepted || (() => true),
            declined: onDeclined || (() => true)
         }
         this.isInvisible = false
         this.$refs.selector.click()
      },
      folderSelected: function() {
         // File path is now available
         this.isInvisible = true
         if(this.$refs.selector.files[0] == null) {
            return
         }

         let fullPath = this.$refs.selector.files[0].path
         this.selectedPath = fullPath == null ? '' : fullPath

         if(this.context.accepted) {
            this.context.accepted(this.selectedPath)
         }

         this.$emit('selected', this.selectedPath)
         emitter.emit('selected', this.selectedPath)
      }
   }
}

</script>