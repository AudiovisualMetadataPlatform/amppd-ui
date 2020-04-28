import Vue from "vue";
import Router from "vue-router";
/* import Home from './views/Home.vue' */
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import Welcome from "./components/Welcome.vue";
import Workflow from "./components/Workflow.vue";
import ForgotPassword from "./components/ForgotPassword.vue";
import ResetPassword from "./components/ResetPassword.vue";
import ApproveUser from "./components/ApproveUser.vue";
import BatchIngest from "./components/batch/BatchIngest.vue";
import TranscriptEditor from "./components/hmgm/TranscriptEditor.vue";
import {authenticationService} from './service/authentication-service.js';

Vue.use(Router);

var router = new Router({
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
    }, 
    {
      path: "/approve-user/:id", 
      name: 'approve-user', 
      component: ApproveUser, 
    },
    {
      path: "/activate-account/:id", 
      name: 'activate-account', 
      component: Login, 
    } ,  
    {
      path: "/batch/ingest", 
      name: 'batch-ingest', 
      component: BatchIngest, 
      meta: { authorize: [] } 
    } ,  
    {
      path: "/hmgm/transcript-editor", 
      name: 'transcript-editor', 
      component: TranscriptEditor, 
    }
  ]
});
export default router;
router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const { authorize } = to.meta;
  const currentUser = authenticationService.currentUserValue;

  if (authorize) {
      if (!currentUser) {
          // not logged in so redirect to login page with the return url
          return next({ path: '/', query: { returnUrl: to.path } });
      }
  }

  next();
})