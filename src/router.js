import Vue from "vue";
import Router from "vue-router";

import Login from "./components/account/Login.vue";
import Deliverables from "./components/deliverables/Deliverables.vue";
import Register from "./components/account/Register.vue";
import WorkflowSubmission from "./components/workflow/WorkflowSubmission.vue";
import WorkflowDashboard from "./components/dashboard/Dashboard.vue";
import ForgotPassword from "./components/account/ForgotPassword.vue";
import ResetPassword from "./components/account/ResetPassword.vue";
import ApproveUser from "./components/account/ApproveUser.vue";
import BatchIngest from "./components/batch/BatchIngest.vue";
import TranscriptEditor from "./components/hmgm/TranscriptEditor.vue";
import NerEditor from "./components/hmgm/NerEditor.vue";
import { accountService } from "./service/account-service.js";
import Collections from "./components/collections/Collections.vue";
import CollectionDetails from "./components/collections/CollectionDetails.vue";
import CreateCollection from "./components/collections/CreateCollection.vue";
import AddItemToCollection from "./components/collections/AddItemToCollection.vue";
import EditCollection from "./components/collections/EditCollection.vue"
Vue.use(Router);

var router = new Router({
  routes: [
    {
      // TODO we may want to have a separate landing/welcome page with some greeting and a brief introduction to AMP
      path: "/",
      name: "home",
      component: WorkflowDashboard,
      meta: { authorize: [] },
    },
    {
      path: "/account/register",
      name: "register",
      component: Register,
    },
    {
      path: "/account/login",
      name: "login",
      component: Login,
    },
    {
      path: "/account/forgot-password",
      name: "forgot-password",
      component: ForgotPassword,
    },
    {
      path: "/account/reset-password/:token",
      name: "reset-password",
      component: ResetPassword,
    },
    {
      path: "/account/activate/:token",
      name: "activate-account",
      component: Login,
    },
    {
      path: "/account/approve/:id",
      name: "approve-user",
      component: ApproveUser,
      meta: { authorize: [] },
    },
    {
      path: "/workflow/submit",
      name: "workflow-submission",
      component: WorkflowSubmission,
      meta: { authorize: [] },
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: WorkflowDashboard,
      meta: { authorize: [] },
    },
    {
      path: "/batch/ingest",
      name: "batch-ingest",
      component: BatchIngest,
      meta: { authorize: [] },
    },
    {
      path: "/deliverables",
      name: "deliverables",
      component: Deliverables,
      meta: { authorize: [] },
    },
    {
      path: "/hmgm/transcript-editor",
      name: "transcript-editor",
      component: TranscriptEditor,
    },
    {
      path: "/hmgm/ner-editor",
      name: "ner-editor",
      component: NerEditor,
    },
    {
      path: "/collections",
      name: "collections",
      component: Collections,
      meta: { authorize: [] },
    },
    {
      path: "/collections/collection-details",
      name: "collection-details",
      component: CollectionDetails,
      meta: { authorize: [] },
    },
    {
      path: "/collections/create-collection",
      name: "create-collection",
      component: CreateCollection,
      meta: { authorize: [] },
    },
    {
      path: "/collections/add-item-to-collection",
      name: "add-item-to-collection",
      component: AddItemToCollection,
      meta: { authorize: [] },
    },
    {
      path: "/collections/edit-collection",
      name: "edit-collection",
      component: EditCollection,
      meta: { authorize: [] },
    },
  ],
});


export default router;
router.beforeEach(async (to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const { authorize } = to.meta;
  const currentUser = accountService.currentUserValue;

  if (process.env.VUE_APP_DISABLE_AUTH == "true" || !authorize) {
    return next();
  } else if (!currentUser) {
    console.log("not current user");
    // not logged in so redirect to login page with the return url
    return next({ path: "/account/login", query: { returnUrl: to.path } });
  } else {
    var success = await accountService.validate();
    if (!success) {
      return next({ path: "/account/login", query: { returnUrl: to.path } });
    } else {
      return next();
    }
  }
});
