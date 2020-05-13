import Vue from "vue";
import Router from "vue-router";

import Login from "./components/account/Login.vue";
import Register from "./components/account/Register.vue";
import Workflow from "./components/workflow/Workflow.vue";
import ForgotPassword from "./components/account/ForgotPassword.vue";
import ResetPassword from "./components/account/ResetPassword.vue";
import ApproveUser from "./components/account/ApproveUser.vue";
import BatchIngest from "./components/batch/BatchIngest.vue";
import TranscriptEditor from "./components/hmgm/TranscriptEditor.vue";
import NerEditor from "./components/hmgm/NerEditor.vue";
import {accountService} from './service/account-service.js';

// import Jobs from "./components/Jobs.vue";

Vue.use(Router);

var router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: BatchIngest,
      meta: { authorize: [] } 
    },
    {
      path: "/account/forgot-password",
      name: "forgot-password",
      component: ForgotPassword
    },  
    {
      path: "/account/reset-password/:token", 
      name: 'reset-password', 
      component: ResetPassword, 
    }, 
    {
      path: "/account/approve/:id", 
      name: 'approve-user', 
      component: ApproveUser,
      meta: { authorize: [] }  
    },
    {
      path: "/account/activate/:token", 
      name: 'activate-account', 
      component: Login, 
    },  
    {
      path: "/account/register",
      name: "register",
      component: Register
    },
    {
      path: "/account/login",
      name: "login",
      component: Login
    },
    {
      path: "/welcome",
      name: 'batch-ingest', 
      component: BatchIngest,
      meta: { authorize: [] } 
    },
    {
      path: "/workflow/submit",
      name: "workflow",
      component: Workflow,
      meta: { authorize: [] } 
    },
    {
      path: "/batch/ingest", 
      name: 'batch-ingest', 
      component: BatchIngest, 
      meta: { authorize: [] } 
    },  
    {
      path: "/hmgm/transcript-editor", 
      name: 'transcript-editor', 
      component: TranscriptEditor, 
    } ,
    {
      path: "/hmgm/ner-editor", 
      name: 'ner-editor', 
      component: NerEditor, 
    }  
  ]
});
export default router;
router.beforeEach(async(to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const { authorize } = to.meta;
  const currentUser = accountService.currentUserValue;

  if (authorize) {
    if (!currentUser) {
        console.log("not current user");
        // not logged in so redirect to login page with the return url
        return next({ path: '/account/login', query: { returnUrl: to.path } });
    }
    else {
      var success = await accountService.validate();
      if(!success){
        return next({ path: '/account/login', query: { returnUrl: to.path } });
      }
    }
  }

  next();
})
