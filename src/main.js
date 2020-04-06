import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/workflow-submission-store'
import { VuePlugin } from 'vuera'

Vue.use(VuePlugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

process.title = "amppd-ui";

console.log(process); // eslint-disable-line

