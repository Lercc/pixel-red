import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'

import { rounded } from '@/filter'


Vue.config.productionTip = false

Vue.filter('fixed',rounded)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
