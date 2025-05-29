import { createApp } from 'vue'
import router from "./router";
import { store } from "./store/amp-store";
import App from "./App.vue";
// import { VuePlugin } from "vuera";
import VueFilterDateFormat from "@vuejs-community/vue-filter-date-format";
import moment from "moment";
import {createBootstrap} from "bootstrap-vue-next/plugins";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

const app = createApp(App)

app.config.globalProperties.$filters = {
  localDate(value) {
    if (value) return moment(value).format("YYYY/MM/DD hh:mm:ss a");
  }
}

// app.use(VuePlugin);
app.use(createBootstrap());

// Install toast notification plugin: https://www.npmjs.com/package/vue-toast-notification
app.use(ToastPlugin);

// app.use(VueFilterDateFormat, {
//   dayOfWeekNames: [
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//   ],
//   dayOfWeekNamesShort: ["Su", "Mo", "Tu", "We", "Tr", "Fr", "Sa"],
//   monthNames: [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ],
//   monthNamesShort: [
//     "Jan",
//     "Feb",
//     "Mar",
//     "Apr",
//     "May",
//     "Jun",
//     "Jul",
//     "Aug",
//     "Sep",
//     "Oct",
//     "Nov",
//     "Dec",
//   ],
// });

app.use(router);
app.use(store);
app.mount('#app');

// process.title = "amppd-ui";
