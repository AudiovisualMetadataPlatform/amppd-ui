import Vue from "vue";
import Router from "vue-router";
/* import Home from './views/Home.vue' */
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import Welcome from "./components/Welcome.vue";
import Workflow from "./components/Workflow.vue";
import ForgotPassword from "./components/ForgotPassword.vue";
import ResetPassword from "./components/ResetPassword.vue";
import BatchIngest from "./components/batch/BatchIngest.vue";
// import Jobs from "./components/Jobs.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/welcome",
      name: "welcome",
      component: Welcome
    },
    {
      path: "/workflow",
      name: "workflow",
      component: Workflow
    },
    {
      path: "/forgot-password",
      name: "forgot-password",
      component: ForgotPassword
    },  
    {
      path: "/reset-password/:token", 
      name: 'reset-password', 
      component: ResetPassword, 
    } ,  
    {
      path: "/batch/ingest", 
      name: 'batch-ingest', 
      component: BatchIngest, 
    } 

    // {
    //   path: "/jobs",
    //   name: "jobs",
    //   component: Jobs
    // }      
  ]
});