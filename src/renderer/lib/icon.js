import utils from '@/lib/utils'

let iconMap = {
   namespace: {
      icon: 'folder',
      open: 'folder-open',
      closed: 'folder'
   },
   model: {
      icon: 'file'
   },
   instance: {
      icon: 'file-alt'
   },
   default: {
      icon: 'beer'
   }
}

/**
 * Returns the icon name based on the affinity type
 * @param {object|string} type 
 */
function get(type) {
   let name = 'default'

   if(typeof type == 'string') {
      name = type.toLowerCase()
   } else {
      utils.typeSwitch(type, {
         namespace: _ => name = 'namespace',
         model: _ => name = 'model',
         instance: _ => name = 'instance',
         default: _ => {
            name = 'default'
            return
         }
      })
   }

   return iconMap[name]
}

export default {
   get
}