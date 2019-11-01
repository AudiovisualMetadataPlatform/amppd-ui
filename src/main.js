import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/workflow-submission-store'

Vue.config.productionTip = false
// TEMPORARY:  Use this to determine location of AMP.  Will think of something better. (localhost will work if running on same machine)
Vue.config.publicPath = "http://10.77.1.132:8200/";

// let WorkflowPlugins = {
// 	install(Vue) {
// 		Vue.prototype.$workflowService = new workflowService();
// 	}
// };

//Vue.use(WorkflowPlugins);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

