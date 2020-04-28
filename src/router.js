import Vue from "vue";
import Router from "vue-router";

import Login from "./components/userAccountComponents/Login.vue";
import Register from "./components/userAccountComponents/Register.vue";
import Workflow from "./components/workflowComponents/Workflow.vue";
import ForgotPassword from "./components/userAccountComponents/ForgotPassword.vue";
import ResetPassword from "./components/userAccountComponents/ResetPassword.vue";
import ApproveUser from "./components/userAccountComponents/ApproveUser.vue";
import BatchIngest from "./components/batchComponents/BatchIngest.vue";
import TranscriptEditor from "./components/hmgmComponents/TranscriptEditor.vue";

import NerEditor from "./components/hmgm/NerEditor.vue";

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
      name: 'batch-ingest', 
      component: BatchIngest,
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
    } ,  
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
    // {
    //   path: "/jobs",
    //   name: "jobs",
    //   component: Jobs
    // }      
  ]
});