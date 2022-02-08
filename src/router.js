import Vue from "vue";
import Router from "vue-router";

import Login from "./components/account/Login.vue";
import Deliverables from "./components/deliverables/Deliverables.vue";
import Register from "./components/account/Register.vue";
import WorkflowEditor from "./components/workflow/WorkflowEditor.vue";
import WorkflowSubmission from "./components/workflow/WorkflowSubmission.vue";
import WorkflowDashboard from "./components/dashboard/Dashboard.vue";
import ForgotPassword from "./components/account/ForgotPassword.vue";
import ResetPassword from "./components/account/ResetPassword.vue";
import ApproveUser from "./components/account/ApproveUser.vue";
import BatchIngest from "./components/batch/BatchIngest.vue";
import TranscriptEditor from "./components/hmgm/TranscriptEditor.vue";
import NerEditor from "./components/hmgm/NerEditor.vue";
import { accountService } from "./service/account-service.js";
import CollectionDetails from "./components/collections/CollectionDetails.vue";
import { env } from "./helpers/env.js";
import WorkflowList from './components/workflow/WorkflowList.vue';
import EntityList from "./components/entity/EntityList.vue";
Vue.use(Router);

var router = new Router({
  routes: [
    {
      // TODO we may want to have a separate landing/welcome page with some greeting and a brief introduction to AMP
      path: "/",
      redirect:"/unit/details",
      name: "home",
      component: WorkflowDashboard,
      meta: { authorize: [],
        breadCrumb: [ 
          {text: "Home", href: '#/'}, 
          {text: "Dashboard"},
        ],
        helpUrl: "AMP+User+Guide"
      },
    },
    {
      path: "/account/register",
      name: "register",
      component: Register,
      meta: {
        helpUrl: "AMP+User+Guide"
      }
    },
    {
      path: "/account/login",
      name: "login",
      component: Login,
      meta: {
        helpUrl: "AMP+User+Guide"
      }
    },
    {
      path: "/account/forgot-password",
      name: "forgot-password",
      component: ForgotPassword,
      meta: {
        helpUrl: "AMP+User+Guide"
      }
    },
    {
      path: "/account/reset-password/:token",
      name: "reset-password",
      component: ResetPassword,
      meta: {
        helpUrl: "AMP+User+Guide"
      }
    },
    {
      path: "/account/activate/:token",
      name: "activate-account",
      component: Login,
      meta: {
        helpUrl: "AMP+User+Guide"
      }
    },
    {
      path: "/account/approve/:id",
      name: "approve-user",
      component: ApproveUser,
      meta: { authorize: [], helpUrl: "AMP+User+Guide" },
    },
    {
      path: "/workflow/edit",
      name: "workflow-editor",
      component: WorkflowEditor,
      meta: { authorize: [] },
    },    
    {
      path: "/workflow/submit",
      name: "workflow-submission",
      component: WorkflowSubmission,
      meta: { authorize: [],
        breadCrumb: [ 
          {text: "Home", href: '#/'}, 
          {text: "Workflows"},
        ],
        helpUrl: "Workflow+Submissions"
      }
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: WorkflowDashboard,
      meta: { authorize: [],
        breadCrumb: [ 
          {text: "Home", href: '#/'}, 
          {text: "Dashboard"},
        ],
        helpUrl: "The+Dashboard"
      },
    },
    {
      path: "/batch/ingest",
      name: "batch-ingest",
      component: BatchIngest,
      meta: { authorize: [] ,
        breadCrumb: [ 
          {text: "Home", href: '#/'}, 
          {text: "Batch Ingest"},
        ],
        helpUrl: "Uploading+Files+via+Batch+Ingest"
      },
    },
    {
      path: "/deliverables",
      name: "deliverables",
      component: Deliverables,
      meta: { authorize: [],
        breadCrumb: [ 
          {text: "Home", href: '#/'}, 
          {text: "Workflows", href: '#/workflow/submit'},
          {text: "Deliverables"}
        ],
        helpUrl: "Deliverables"
      }
    },
    {
      path: "/hmgm/transcript-editor",
      name: "transcript-editor",
      component: TranscriptEditor,
      meta: { authorize: [], helpUrl: "AMP+User+Guide" },
    },
    {
      path: "/hmgm/ner-editor",
      name: "ner-editor",
      component: NerEditor,
      meta: { authorize: [], helpUrl: "AMP+User+Guide" },
    },
    // {
    //   path: "/collections",
    //   name: "collections",
    //   component: Collections,
    //   meta: { authorize: [] },
    // },
    {
      path: "/collections/collection-details",
      name: "collection-details",
      component: CollectionDetails,
      meta: { authorize: [], helpUrl: "AMP+User+Guide" },
      
    },
    {
      path: "/unit/details",
      name: "unit-details",
      component: EntityList,
      meta: { authorize: [], 
        breadCrumb: [
          {text: "Home", href: '#/'}, 
          {text: "Unit Details", href: '#/unit/details'}
        ],
        helpUrl: "AMP+User+Guide"
      },
      
    },
    {
      path: "/collection/details",
      name: "collection-details",
      component: EntityList,
      meta: { authorize: [], 
        breadCrumb: [
          {text: "Home", href: '#/'}, 
          {text: "Unit Details", href: '#/unit/details'},
          {text: "Collection Details", href: '#/collection/details'}
        ],
        helpUrl: "AMP+User+Guide"
      },
      
    },
    {
      path: "/collections/items/details",
      name: "items-details",
      component: EntityList,
      meta: { authorize: [],
        breadCrumb: [
          {text: "Home", href: '#/'}, 
          {text: "Unit Details", href: '#/unit/details'},
          {text: "Collection Details", href: '#/collection/details'},
          {text: "Item", href: '#/collections/items/details'}
        ],
        helpUrl: "AMP+User+Guide"
      },
      
    },
    {
      path: "/collection/create",
      name: "create-collections",
      component: EntityList,
      meta: { authorize: [], 
        breadCrumb: [
          {text: "Home", href: '#/'}, 
          {text: "Unit Details", href: '#/unit/details'},
          {text: "Collection", href: '#/collection/create'}
        ],
        helpUrl: "AMP+User+Guide"
      },
      
    },
    {
      path: "/collection/add-items",
      name: "create-items",
      component: EntityList,
      meta: { authorize: [],
        breadCrumb: [ 
          {text: "Home", href: '#/'}, 
          {text: "Collection Details", href: '#/collection/details'},
          {text: "Item", href: '#/collection/add-items'}
        ],
        helpUrl: "AMP+User+Guide"
      },
      
    },
    {
      path: "/collections/file",
      name: "file-details",
      component: EntityList,
      meta: { authorize: [],
        breadCrumb: [ 
          {text: "Home", href: '#/'}, 
          {text: "Collection Details", href: '#/collection/details'},
          {text: "File"}
        ],
        helpUrl: "AMP+User+Guide"
      },
     
    },
    {
      path: "/workflows",
      name: "workflow-listing",
      component: WorkflowList,
      meta: { authorize: [],
        breadCrumb: [ 
          {text: "Home", href: '#/'}, 
          {text: "Workflows"}
        ]
      },
    },

  ],
});

export default router;
router.beforeEach(async (to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const { authorize } = to.meta;
  const currentUser = accountService.currentUserValue;

  if (env.getDisableAuth() == "true" || !authorize) {
    return next();
  } else if (!currentUser) {
    console.log("not current user");
    // not logged in so redirect to login page with the return url
    return next({ path: "/account/login", query: { returnUrl: to.path } });
    // return next();
  } else {
    var success = await accountService.validate();
    if (!success) {
      // return next();
      router.app.$store.state.isAuthenticated = false;
      router.app.$store.commit("isAuthenticated");
      return next({ path: "/account/login", query: { returnUrl: to.path } });
    } else {
      router.app.$store.state.isAuthenticated = true;
      // router.app.$store.commit("isAuthenticated");
      return next();
    }
  }
});
