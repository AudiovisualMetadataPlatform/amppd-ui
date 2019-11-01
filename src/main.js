import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/workflow-submission-store'

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

console.log(process); // eslint-disable-line

