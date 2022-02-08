import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/amp-store'
import { VuePlugin } from 'vuera'
import VueFilterDateFormat from '@vuejs-community/vue-filter-date-format';
import BootstrapVue from 'bootstrap-vue'
import moment from 'moment'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.use(VuePlugin)
Vue.use(BootstrapVue)

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

Vue.filter("LOCAL_DATE_VALUE", (value) => {
  if(value) return moment(value).format("YYYY/MM/DD hh:mm:ss a");
});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
process.title = "amppd-ui";


