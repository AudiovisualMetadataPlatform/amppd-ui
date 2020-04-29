import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/workflow-submission-store'
import { VuePlugin } from 'vuera'
import VueAxios from 'vue-axios'

import axios from './service/axios'

Vue.use(VueAxios, axios)

Vue.use(VuePlugin)

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')

process.title = "amppd-ui";

console.log(process); // eslint-disable-line

