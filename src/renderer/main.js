import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

// Reference: https://github.com/Justineo/vue-awesome
import Icon from 'vue-awesome/components/Icon'
Vue.component('icon', Icon)

import 'vue-awesome/icons/beer'
import 'vue-awesome/icons/search'
import 'vue-awesome/icons/folder'
import 'vue-awesome/icons/folder-open'
import 'vue-awesome/icons/file'
import 'vue-awesome/icons/file-alt'

// Splitpanes
import 'splitpanes/dist/splitpanes.css'

// Element UI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/index.js'
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
