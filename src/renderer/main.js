import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import { Icon, Tabs, TabPane } from 'iview'
import 'iview/dist/styles/iview.css'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.component('Icon', Icon)
Vue.component('Tabs', Tabs)
Vue.component('TabPane', TabPane)

/* eslint-disable no-new */
new Vue({
  components: { App, Icon, Tabs, TabPane },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
