/*

   References:
      Accelerators: https://electronjs.org/docs/api/accelerator
*/

export const MenuItemType = {
   checkbox: 'checkbox',
   normal: 'normal',
   separator: 'separator',
   submenu: 'submenu',
   radio: 'radio'
}

export class ContextMenuBuilder {
   constructor() {
      this.items = []
   }

   normal(label, accelerator, enabled, visible, onClick) {
      return this.add(label, MenuItemType.normal, accelerator, checked, enabled, visible, onClick)
   }

   submenu(label, accelerator, enabled, visible, onClick) {
      return this.add(label, MenuItemType.submenu, accelerator, checked, enabled, visible, onClick)
   }

   checkbox(label, accelerator, checked, enabled, visible, onClick) {
      return add(label, MenuItemType.checkbox, accelerator, checked, enabled, visible, onClick)
   }

   radio(label, accelerator, checked, enabled, visible, onClick) {
      return add(label, MenuItemType.radio, accelerator, checked, enabled, visible, onClick)
   }

   // normal, separator, submenu, checkbox or radio
   add(label, type, accelerator, checked, enabled, visible, onClick) {
      this.items.push({
         label,
         type,
         accelerator,
         checked,
         enabled,
         visible,
         onClick
      })
   }

   separator() {
      this.items.push({
         type: 'separator'
      })
   }
}