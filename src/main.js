import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/workflow-submission-store'
import { VuePlugin } from 'vuera'
import { VuejsDatatableFactory } from 'vuejs-datatable';


Vue.use(VuePlugin)
Vue.use( VuejsDatatableFactory );

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

process.title = "amppd-ui";

console.log(process); // eslint-disable-line

