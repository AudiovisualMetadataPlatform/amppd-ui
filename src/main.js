import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/amp-store'
import { VuePlugin } from 'vuera'
import { VuejsDatatableFactory } from 'vuejs-datatable';
import VueFilterDateFormat from '@vuejs-community/vue-filter-date-format';


Vue.use(VuePlugin)
Vue.use( VuejsDatatableFactory );


Vue.use(VueFilterDateFormat, {
  dayOfWeekNames: [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
    'Friday', 'Saturday'
  ],
  dayOfWeekNamesShort: [
    'Su', 'Mo', 'Tu', 'We', 'Tr', 'Fr', 'Sa'
  ],
  monthNames: [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ],
  monthNamesShort: [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ]
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

process.title = "amppd-ui";


