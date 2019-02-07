import BoolEditor from './Bool'
// import DecimalEditor from './Decimal'
// import IntEditor from './Int'
// import StringEditor from './String'
// import UintEditor from './Uint'
import CollectionEditor from './Collection2'
import PrimitiveEditor from './PrimitiveEditor'

import utils from '@/lib/utils'

let namedMap = {
   'value-editor-bool': BoolEditor,
   'value-editor-decimal': PrimitiveEditor, // DecimalEditor,
   'value-editor-int': PrimitiveEditor, //IntEditor,
   'value-editor-string': PrimitiveEditor, //StringEditor,
   'value-editor-uint': PrimitiveEditor, //UintEditor,
   'value-editor-collection': CollectionEditor
}

export default {
   getEditorName: function(type) {
      // console.log(`[ValueEditors/editors] getEditorName: value-editor-${type}`)
      // console.dir(type)
      if(utils.type.isCollection(type)) {
         return 'value-editor-collection'
      }

      return `value-editor-${type}`
   },
   getEditor: function(type) {
      let name = this.getEditorName(type)
      //console.log(`[ValueEditors/editors] getEditor: ${name}`)
      return namedMap[name]
   },
   map: function() {
      return namedMap
   }
}