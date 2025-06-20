import { createRouter, createWebHashHistory } from 'vue-router'

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
import { env } from "./helpers/env.js";
import WorkflowList from "./components/workflow/WorkflowList.vue";
import EntityList from "./components/entity/EntityList.vue";
import ItemSearch from "./components/entity/ItemSearch.vue";
import MGMevaluation from "./components/evaluation/MGMevaluation.vue";
import TestResultsVisualiz from "./components/evaluation/TestResultsVisualiz.vue";
import SupplementList from "./components/supplement/SupplementList.vue";
import AccessDenied from "./components/shared/AccessDenied.vue";
import HomePage from "@/components/home";
import { store } from "./store/amp-store.js";


var router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
      meta: {
        helpUrl: env.getEnv("VUE_APP_DOC_AMP_USER_GUIDE"),
      },
    },
    {
      path: "/account/register",
      name: "register",
      component: Register,
      meta: {
        helpUrl: env.getEnv("VUE_APP_DOC_AMP_USER_GUIDE"),
      },
    },
    {
      path: "/account/login",
      name: "login",
      component: Login,
      meta: {
        helpUrl: env.getEnv("VUE_APP_DOC_AMP_USER_GUIDE"),
      },
    },
    {
      path: "/account/forgot-password",
      name: "forgot-password",
      component: ForgotPassword,
      meta: {
        helpUrl: env.getEnv("VUE_APP_DOC_AMP_USER_GUIDE"),
      },
    },
    {
      path: "/account/reset-password/:token",
      name: "reset-password",
      component: ResetPassword,
      meta: {
        helpUrl: env.getEnv("VUE_APP_DOC_AMP_USER_GUIDE"),
      },
    },
    {
      path: "/account/activate/:token",
      name: "activate-account",
      component: Login,
      meta: {
        helpUrl: env.getEnv("VUE_APP_DOC_AMP_USER_GUIDE"),
      },
    },
    {
      path: "/account/approve/:id",
      name: "approve-user",
      component: ApproveUser,
      meta: {
        authorize: {
          actionType: env.getEnv("VUE_APP_AC_ACTIONTYPE_UPDATE"),
          targetType: env.getEnv("VUE_APP_AC_TARGETTYPE_AMPUSER")
        },
        helpUrl: env.getEnv("VUE_APP_DOC_AMP_USER_GUIDE"),
      },
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
      path: "/workflows",
      name: "workflow-listing",
      component: WorkflowList,
      meta: {
        authorize: {
          actionType: env.getEnv("VUE_APP_AC_ACTIONTYPE_READ"),
          targetType: env.getEnv("VUE_APP_AC_TARGETTYPE_WORKFLOW")
        },
        breadCrumb: [{ text: "Home", href: "#/" }, { text: "Workflows" }],
        helpUrl: env.getEnv("VUE_APP_DOC_AMP_USER_GUIDE"),
      },
    },
    {
      path: "/workflow/edit",
      name: "workflow-editor",
      component: WorkflowEditor,
      meta: {
        authorize: {
          actionType: env.getEnv("VUE_APP_AC_ACTIONTYPE_UPDATE"),
          targetType: env.getEnv("VUE_APP_AC_TARGETTYPE_WORKFLOW")
        },
        helpUrl: env.getEnv("VUE_APP_DOC_WORKFLOW_CREATING"),
      },
    },
    {
      path: "/workflow/submit",
      name: "workflow-submission",
      component: WorkflowSubmission,
      meta: {
        authorize: {
          actionType: env.getEnv("VUE_APP_AC_ACTIONTYPE_CREATE"),
          targetType: env.getEnv("VUE_APP_AC_TARGETTYPE_WORKFLOWRESULT"),
        },
        breadCrumb: [{ text: "Home", href: "#/" }, { text: "Workflows" }],
        helpUrl: env.getEnv("VUE_APP_DOC_WORKFLOW_SUBMISSIONS"),
      },
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: WorkflowDashboard,
      meta: {
        authorize: {
          actionType: env.getEnv("VUE_APP_AC_ACTIONTYPE_READ"),
          targetType: env.getEnv("VUE_APP_AC_TARGETTYPE_WORKFLOWRESULT")
        },
        breadCrumb: [{ text: "Home", href: "#/" }, { text: "Dashboard" }],
        helpUrl: env.getEnv("VUE_APP_DOC_THE_DASHBOARD"),
      },
    },
    {
      path: "/deliverables",
      name: "deliverables",
      component: Deliverables,
      meta: {
        authorize: {
          actionType: env.getEnv("VUE_APP_AC_ACTIONTYPE_READ"),
          targetType: env.getEnv("VUE_APP_AC_TARGETTYPE_BAG")
        },
        breadCrumb: [
          { text: "Home", href: "#/" },
          { text: "Workflows", href: "#/workflow/submit" },
          { text: "Deliverables" },
        ],
        helpUrl: env.getEnv("VUE_APP_DOC_DELIVERABLES"),
      },
    },
    {
      path: "/batch/ingest",
      name: "batch-ingest",
      component: BatchIngest,
      meta: {
        authorize: {
          actionType: env.getEnv("VUE_APP_AC_ACTIONTYPE_CREATE"),
          targetType: env.getEnv("VUE_APP_AC_TARGETTYPE_BATCH")
        },
        breadCrumb: [{ text: "Home", href: "#/" }, { text: "Batch Ingest" }],
        helpUrl: env.getEnv("VUE_APP_DOC_UPLOADING_FILES_VIA_BATCH_INGEST"),
      },
    },
    {
      path: "/mgm-evaluation",
      name: "mgm-evaluation",
      component: MGMevaluation,
      meta: {
        authorize: {
          actionType: env.getEnv("VUE_APP_AC_ACTIONTYPE_READ"),
          targetType: env.getEnv("VUE_APP_AC_TARGETTYPE_MGMEVALUATIONTEST")
        },
        breadCrumb: [{ text: "Home", href: "#/" }, { text: "MGM Evaluation" }],
        helpUrl: env.getEnv("VUE_APP_DOC_MGM_EVALUATION"),
      },
    },
    {
      path: "/mgm-evaluation/:mgmCategoryId",
      name: "mgm-evaluation-category",
      component: MGMevaluation,
      meta: {
        authorize: {
          actionType: env.getEnv("VUE_APP_AC_ACTIONTYPE_CREATE"),
          targetType: env.getEnv("VUE_APP_AC_TARGETTYPE_MGMEVALUATIONTEST")
        },
        breadCrumb: [
          { text: "Home", href: "#/" },
          { text: "MGM Evaluation", href: "#/mgm-evaluation" },
          { text: "MGM Category" },
        ],
        helpUrl: env.getEnv("VUE_APP_DOC_MGM_EVALUATION"),
      },
    },
    {
      path: "/mgm-evaluation/:mgmCategoryId/:testResultIds",
      name: "mgm-evaluation-test-result",
      component: TestResultsVisualiz,
      meta: {
        authorize: {
          actionType: env.getEnv("VUE_APP_AC_ACTIONTYPE_CREATE"),
          targetType: env.getEnv("VUE_APP_AC_TARGETTYPE_MGMEVALUATIONTEST")
        },
        breadCrumb: [
          { text: "Home", href: "#/" },
          { text: "MGM Evaluation", href: "#/mgm-evaluation" },
          { text: "Test Results" },
        ],
        helpUrl: env.getEnv("VUE_APP_DOC_MGM_EVALUATION"),
      },
    },
    {
      path: "/unit/details",
      name: "unit-details",
      component: EntityList,
      meta: {
        authorize: {
          actionType: env.getEnv("VUE_APP_AC_ACTIONTYPE_READ"),
          targetType: env.getEnv("VUE_APP_AC_TARGETTYPE_UNIT")
        },
        breadCrumb: [
          { text: "Home", href: "#/" },
          { text: "Unit Details", href: "#/unit/details" },
        ],
        helpUrl: env.getEnv("VUE_APP_DOC_UNITS"),
      },
    },
    {
      path: "/collection/create",
      name: "create-collections",
      component: EntityList,
      meta: {
        authorize: {
          actionType: env.getEnv("VUE_APP_AC_ACTIONTYPE_CREATE"),
          targetType: env.getEnv("VUE_APP_AC_TARGETTYPE_COLLECTION")
        },
        breadCrumb: [
          { text: "Home", href: "#/" },
          { text: "Unit Details", href: "#/unit/details" },
          { text: "Collection", href: "#/collection/create" },
        ],
        helpUrl: env.getEnv("VUE_APP_DOC_COLLECTIONS"),
      },
    },
    {
      path: "/collection/details",
      name: "collection-details",
      component: EntityList,
      meta: {
        authorize: {
          actionType: env.getEnv("VUE_APP_AC_ACTIONTYPE_READ"),
          targetType: env.getEnv("VUE_APP_AC_TARGETTYPE_COLLECTION")
        },
        breadCrumb: [
          { text: "Home", href: "#/" },
          { text: "Unit Details", href: "#/unit/details" },
          { text: "Collection Details", href: "#/collection/details" },
        ],
        helpUrl: env.getEnv("VUE_APP_DOC_COLLECTIONS"),
      },
    },
    {
      path: "/collection/add-items",
      name: "create-items",
      component: EntityList,
      meta: {
        authorize: {
          actionType: env.getEnv("VUE_APP_AC_ACTIONTYPE_CREATE"),
          targetType: env.getEnv("VUE_APP_AC_TARGETTYPE_ITEM")
        },
        breadCrumb: [
          { text: "Home", href: "#/" },
          { text: "Unit Details", href: "#/unit/details" },
          { text: "Collection Details", href: "#/collection/details" },
          { text: "Item", href: "#/collection/add-items" },
        ],
        helpUrl: env.getEnv("VUE_APP_DOC_ITEMS"),
      },
    },
    {
      path: "/collections/items/details",
      name: "items-details",
      component: EntityList,
      meta: {
        authorize: {
          actionType: env.getEnv("VUE_APP_AC_ACTIONTYPE_READ"),
          targetType: env.getEnv("VUE_APP_AC_TARGETTYPE_ITEM")
        },
        breadCrumb: [
          { text: "Home", href: "#/" },
          { text: "Unit Details", href: "#/unit/details" },
          { text: "Collection Details", href: "#/collection/details" },
          { text: "Item Details", href: "#/collections/items/details" },
        ],
        helpUrl: env.getEnv("VUE_APP_DOC_ITEMS"),
      },
    },
    {
      path: "/collections/file",
      name: "file-details",
      component: EntityList,
      meta: {
        authorize:  {
          actionType: env.getEnv("VUE_APP_AC_ACTIONTYPE_READ"),
          targetType: env.getEnv("VUE_APP_AC_TARGETTYPE_PRIMARYFILE")
        },
        breadCrumb: [
          { text: "Home", href: "#/" },
          { text: "Unit Details", href: "#/unit/details" },
          { text: "Collection Details", href: "#/collection/details" },
          { text: "Item Details", href: "#/collections/items/details" },
          { text: "Content File Details" },
        ],
        helpUrl: env.getEnv("VUE_APP_DOC_PRIMARY_FILE"),
      },
    },
    {
      path: "/collections/items/item-search",
      name: "item-search",
      component: ItemSearch,
      meta: {
        authorize: {
          actionType: env.getEnv("VUE_APP_AC_ACTIONTYPE_READ"),
          targetType: env.getEnv("VUE_APP_AC_TARGETTYPE_ITEM")
        },
        breadCrumb: [
          { text: "Home", href: "#/" },
          { text: "Unit Details", href: "#/unit/details" },
          { text: "Item Search" },
        ],
        helpUrl: env.getEnv("VUE_APP_DOC_ITEMS"),
      },
    },
    {
      path: "/collections/items/item-search/details",
      name: "item-search-details",
      component: EntityList,
      meta: {
        authorize: {
          actionType: env.getEnv("VUE_APP_AC_ACTIONTYPE_READ"),
          targetType: env.getEnv("VUE_APP_AC_TARGETTYPE_ITEM")
        },
        breadCrumb: [
          { text: "Home", href: "#/" },
          { text: "Unit Details", href: "#/unit/details" },
          { text: "Collection Details", href: "#/collection/details" },
          { text: "Item Details" },
        ],
        helpUrl: env.getEnv("VUE_APP_DOC_ITEMS"),
      },
    },
    {
      path: "/collections/items/item-search/details/file",
      name: "item-search-file-details",
      component: EntityList,
      meta: {
        authorize: {
          actionType: env.getEnv("VUE_APP_AC_ACTIONTYPE_READ"),
          targetType: env.getEnv("VUE_APP_AC_TARGETTYPE_PRIMARYFILE")
        },
        breadCrumb: [
          { text: "Home", href: "#/" },
          { text: "Unit Details", href: "#/unit/details" },
          { text: "Collection Details", href: "#/collection/details" },
          {
            text: "Item Details",
            href: "#/collections/items/item-search/details",
          },
          { text: "Content File Details" },
        ],
        helpUrl: env.getEnv("VUE_APP_DOC_PRIMARY_FILE"),
      },
    },
    {
      path: "/supplemental-files",
      name: "supplemental-files",
      component: SupplementList,
      meta: {
        authorize: {
          actionType: env.getEnv("VUE_APP_AC_ACTIONTYPE_READ"),
          targetType: env.getEnv("VUE_APP_AC_TARGETTYPE_SUPPLEMENT")
        },
        breadCrumb: [
          { text: "Home", href: "#/" },
          { text: "Supplemental Files" },
        ],
        helpUrl: env.getEnv("VUE_APP_DOC_AMP_USER_GUIDE"),
      },
    },
    {
      path: "/supplemental-files/add",
      name: "create-supplemental",
      component: SupplementList,
      meta: {
        authorize: {
          actionType: env.getEnv("VUE_APP_AC_ACTIONTYPE_CREATE"),
          targetType: env.getEnv("VUE_APP_AC_TARGETTYPE_SUPPLEMENT")
        },
        breadCrumb: [
          { text: "Home", href: "#/" },
          { text: "Supplemental Files", href: "#/supplemental-files" },
          { text: "File Details", href: "#/supplemental-files/add" },
        ],
        helpUrl: env.getEnv("VUE_APP_DOC_AMP_USER_GUIDE"),
      },
    },
    {
      path: "/supplemental-files/:supplementType/:supplementId",
      name: "show-supplemental",
      component: SupplementList,
      meta: {
        authorize: {
          actionType: env.getEnv("VUE_APP_AC_ACTIONTYPE_READ"),
          targetType: env.getEnv("VUE_APP_AC_TARGETTYPE_SUPPLEMENT")
        },
        breadCrumb: [
          { text: "Home", href: "#/" },
          { text: "Supplemental Files", href: "#/supplemental-files" },
          { text: "File Details" },
        ],
        helpUrl: env.getEnv("VUE_APP_DOC_AMP_USER_GUIDE"),
      },
    },
    {
      path: "/access-denied",
      name: "access-denied",
      component: AccessDenied,
      meta: {
        helpUrl: env.getEnv("VUE_APP_DOC_AMP_USER_GUIDE"),
      }
    },  
  ],
});

router.beforeEach(async (to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const { authorize } = to.meta;
  const currentUser = accountService.currentUserValue;

  console.log("router: from: ", from, "\nto: ", to, "\nnext: ", next);
  console.log("router: currentUser: ", currentUser);

  if (env.getDisableAuth() == "true" || !authorize) {
    console.log("router: No auth needed.");
    // if user was logged in, validate token and clear up auth info if timed out
    if (currentUser) {
      var success = await accountService.validate();
      if (!success) {
        store.state.isAuthenticated = false;
        store.commit("isAuthenticated");
        console.log("User was previously logged in but currently auto logged out!");
      }
    }
    return next();
  } else if (!currentUser) {
    console.log("router: Current user not logged in yet.");
    // not logged in so redirect to access-denied page with login link and with the return url
    return next({ path: "/access-denied", query: { returnUrl: to.path }});
  } else {
    // TODO
    // below API call is to validate the auth token before new page is loaded, in case the current login has expired;
    // there should be better way to achieve this without making such extra API call
    console.log("Validating current user login token ...");
    var success = await accountService.validate();
    if (!success) {
      store.state.isAuthenticated = false;
      store.commit("isAuthenticated");
      console.log("router: Auth token invalid or timed out! routing to login page.")
      return next({ path: "/account/login", query: { returnUrl: to.path } });
    } else {
      store.state.isAuthenticated = true;
      let action = authorize.actionType + "-" + authorize.targetType;
      // let acActions = router.app.$store.state.acActions;
      let acActions = store.state.acActions;
      let acIsAdmin = store.state.acIsAdmin;
      console.log("router: Auth token valid. initPermissions =  ", acActions," isAdmin = ", acIsAdmin);
      if (acActions.includes(action) || acIsAdmin) {
        console.log(currentUser.username + " can perform action " + action);
        return next();
      }
      else {
        console.log(currentUser.username + " can't perform action " + action);
        return next("/access-denied");
      }
    }
  }
});

export default router;
