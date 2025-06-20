<template>
  <div class="pt-0 p-3 col-12 bg-light-gray-1">
    <main class="m-0">
      <b-card class="w-100">
        <h2 class>
          {{ active ? "Active" : "Inactive" }} Workflows
          <button
            class="btn btn-link btn-lg px-2" 
            @click="onFlipList()">
            (see {{ active ? "inactive" : "active" }} workflows)
          </button>
          <!-- <span class="px-0 my-2">
            <span class="txt-v px-2 py-2">{{ active ? "Active" : "Inactive" }}</span>
            <label class="switch px-2 mt-2" :title="activeTitle">
              <input type="checkbox" v-model="active" @click="onFlipList()"/>
              <span class="slider round"></span>
            </label>
          </span> -->
          <button
            id="btn-search"
            class="ms-1 btn btn-primary btn-lg marg-b-4 float-end"
            v-b-modal.modal-lg
          >
            Search Workflows
          </button>
          <button
            v-if="active && canCreate()"
            id="btn-workflow-create"
            class="ms-1 btn btn-primary btn-lg marg-b-4 float-end"
            @click="handleWorkflowCreation()"
            :disabled="activeWorkflowSession"
          >
            Create New Workflow
          </button>
        </h2>
        <div class="clearfix"></div>
        <!-- workflow -->
        <b-card
          class="bg-light-gray"
          v-for="(workflow, index) in listOfWorkflows"
          :key="workflow.id"
        >
          <div class="row">
            <div class="col-lg-10">
              <h3 contenteditable="true" class="pe-none">
                {{ workflow.name }}
              </h3>
              <!-- <p contenteditable="true">{{ workflow.description }}</p> -->
              <span>{{ workflow.annotations[0] }}</span>
            </div>
            <div
              v-if="active && canUpdate()"
              class="col text-end px-1"
            >
              <button
                class="btn btn-primary"
                href="#"
                data-toggle="popover"
                data-content="Link goes to galaxy"
                data-original-title
                title
                @click="routeToEditorPage(workflow.id)"
                :disabled="activeWorkflowSession"
              >
                Edit
              </button>
            </div>
            <div
              v-if="canActivate()"
              class="col text-end px-1"
            >
              <button
                class="btn"
                :class="active ? 'btn-warning' : 'btn-primary'"
                :disabled="workflow.running"
                @click.prevent="onDeactivate(workflow, index)"
              >
                {{ active ? "Deactivate" : "Activate" }}
              </button>
            </div>
          </div>

          <div class="row">
            <div class="col">
              Created By:
              <br />
              {{ workflow.creator ? workflow.creator : workflow.owner }}
            </div>
            <div class="col">
              Date Created:
              <br />{{ $filters.localDate(workflow.createTime) }}
            </div>
            <div class="col">
              Last Updated:
              <br />{{ $filters.localDate(workflow.updateTime) }}
            </div>
            <div class="col" v-if="workflow.tags && workflow.tags.length">
              <p class="mb-0">Tags:</p>
              <span
                class="badge bg-secondary"
                v-for="tag in workflow.tags"
                :key="tag"
                >{{ tag }}</span
              >
            </div>
          </div>
          <b-card class="mgm-card bg-light-gray-1">
            <h3
              class="w-100 mgm-h3 card-title bg-light-gray"
              @click="getWorkflowDetails(index)"
            >
              <button
                class="btn fs-4 mgm-param-toggle"
                :class="workflow.visible ? null : 'collapsed'"
                :aria-expanded="workflow.visible ? 'true' : 'false'"
                :aria-controls="'mgm' + index"
                @click="workflow.visible = !workflow.visible"
              >
                <span v-html="rightArrowSvg" class="fs-4"></span>
                <span class="visually-hidden">Toggle hidden content</span>
                <span class="ps-3">MGM Parameter Settings</span>
              </button>
            </h3>
            <b-collapse
              :id="'mgm' + index"
              class="mgm-content"
              v-model="workflow.visible"
            >
              <b-overlay
                :show="!workflow || !workflow.details"
                rounded="sm"
              >
                <b-tabs
                  id="pills-tab-1"
                  nav-item-class="bsvn-tab"
                  nav-class="bsvn-tab-header"
                  nav-wrapper-class="bsvn-tab-header-wrapper"
                  card
                  v-if="workflow.details && workflow.details.length"
                >
                  <b-tab v-if="workflow.details?.length == 0 || !workflow.details">
                    No step specified in workflow.
                  </b-tab>
                  <b-tab
                    v-for="(node, i) in workflow.details"
                    :key="i"
                    :title="node.nodeName"
                    @click="onChangeNode(index, i)"
                    :active="workflow.selectedNode === i"
                  >
                    <dl class="d-flex col-12 mt-3 mb-0 pe-0 ps-3">
                      <div
                        v-if="workflow.details[workflow.selectedNode].params.length==0"
                        class="me-5 d-flex"
                      >
                        No parameter specified.
                      </div>
                      <div
                        class="me-5 d-flex"
                        v-for="(p, paramIndex) in workflow.details[workflow.selectedNode].params"
                        :key="paramIndex"
                      >
                        <label class="fw-bold mb-0">{{ p.name }}:</label>
                        <span class="ms-2">{{ p.value }}</span>
                      </div>
                    </dl>
                  </b-tab> 
                </b-tabs>
                <a
                  class="btn btn-primary nav-link align-items-center float-end mb-2"
                  id="pills-ner-tab-2"
                  role="tab"
                  @click="
                    routeToHelp(
                    $event,
                    workflow.details[workflow.selectedNode].node_id
                    )
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-file-text me-1"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M5 4a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zM5 8a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1H5z"
                    ></path>
                    <path
                      d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z"
                    ></path>
                  </svg>
                  Tool Documentation
                </a>
              </b-overlay>
            </b-collapse>
          </b-card>
        </b-card>
        <!-- end workflow // -->
      </b-card>
    </main>
    <b-modal 
      ref="deactivateModal" 
      title="Confirmation" 
      @ok="handleDeactivateModal(true)" 
      @cancel="handleDeactivateModal(false)"
      centered
      size="md"
      footerClass="p-2"
    >
      <div>
        <p>If deactivated, all users will be unable to edit or run this workflow. Do you want to continue?</p>
      </div>
      <template #footer="{ ok, cancel }">
        <button type="button" class="btn btn-secondary btn-sm" @click="cancel();">No</button>
        <button type="button" class="btn btn-primary btn-sm" @click="ok();">Yes</button>
      </template>
    </b-modal>
    <Search
      searchType="workflow-search"
      @handleSearchWorkflows="searchWorkflows"
      :loading="loading"
    />
  </div>
</template>

<script>
import sync from "@/helpers/sync";
import WorkflowService from "../../service/workflow-service";
import config from "../../assets/constants/common-contant.js";
import SharedService from "../../service/shared-service";
import { env } from "../../helpers/env.js";
import Search from "@/components/shared/Search.vue";

export default {
  name: "WorkflowList",
  components: {
    Search,
  },
  data() {
    return {
      listOfWorkflows: [],
      workflowService: new WorkflowService(),
      sharedService: new SharedService(),
      rightArrowSvg: config.common.icons["right_arrow"],
      activeWorkflowSession: "",
      loading: false,
      workflowToDeactivate: { id: "", index: -1 }, // workflow to de/activate
      active: true, // true if showing active workflows, false if showing inactive workflows
    };
  },
  computed: {
    acIsAdmin: sync("acIsAdmin"),
    acActions: sync("acActions"),
    // activeTitle() {
    //   return this.active ?
    //     "Uncheck to show inactive workflows" :
    //     "Check to show active workflow";
    // } 
  },
  methods: {
    canCreate() {
      let actionKey = env.getEnv("VUE_APP_AC_ACTIONTYPE_CREATE") + "-" + env.getEnv("VUE_APP_AC_TARGETTYPE_WORKFLOW")
      return this.acIsAdmin || this.acActions.includes(actionKey);
    },
    canUpdate() {
      let actionKey = env.getEnv("VUE_APP_AC_ACTIONTYPE_UPDATE") + "-" + env.getEnv("VUE_APP_AC_TARGETTYPE_WORKFLOW")
      return this.acIsAdmin || this.acActions.includes(actionKey);
    },
    canActivate() {
      let actionKey = env.getEnv("VUE_APP_AC_ACTIONTYPE_ACTIVATE") + "-" + env.getEnv("VUE_APP_AC_TARGETTYPE_WORKFLOW")
      return this.acIsAdmin || this.acActions.includes(actionKey);
    },
    async searchWorkflows(searchFields) {
      const self = this;
      const name = searchFields.name;
      const creator = searchFields.creator;
      const fromDate = new Date(searchFields.dateRange.fromDate);
      const toDate = new Date(searchFields.dateRange.toDate);
      let dateRange = [];
      if (searchFields.dateRange.fromDate || searchFields.dateRange.toDate) {
        dateRange = [
          new Date(fromDate.setHours(0, 0, 0, 0)).toISOString(),
          new Date(toDate.setHours(23, 59, 59, 999)).toISOString(),
        ];
      }
      const annotations = searchFields.annotations;
      const tags = searchFields.tags;
      self.workflowService
        .getFilteredWorkflows(this.active, name, creator, dateRange, annotations, tags)
        .then((response) => {
          self.listOfWorkflows = self.sharedService.sortByAlphabatical(
            response.data.rows
          );
        })
        .catch((e) => {
          console.log(e, "error");
        });
    },
    async getWorkflowList() {
      const self = this; // handles both in/active workflows
      console.log("getWorkflowList: active = " + this.active);
      this.loading = true;
      self.workflowService
        .getWorkflows(this.active)
        .then((response) => {
          this.loading = true;
          self.listOfWorkflows = self.sharedService.sortByAlphabatical(
            response.data.rows
          );
          console.log("getWorkflowList: number of workflows retrieved: " + self.listOfWorkflows.length);
        })
        .catch((e) => {
          this.loading = true;
          console.log("getWorkflowList: failed to retrieve workflows", e);
        });
    },
    async getWorkflowDetails(index) {
      const self = this;
      if (!self.listOfWorkflows[index].visible) {
        self.selectedDetailIndex = 0;
        return;
      }

      if (!self.listOfWorkflows[index].details) {
        let wfDetails = await this.workflowService.getWorkflowDetails(
          self.listOfWorkflows[index].id
        );
        const workflowDetails = wfDetails.tempParams;
        self.listOfWorkflows[index].details = workflowDetails;
        self.listOfWorkflows[index].selectedNode = 0;
        self.listOfWorkflows.index = self.listOfWorkflows[index];
      }
    },
    onChangeNode(workflowIndex, nodeIndex) {
      const self = this;
      self.listOfWorkflows[workflowIndex].selectedNode = nodeIndex;
      self.listOfWorkflows.workflowIndex = self.listOfWorkflows[workflowIndex];
      self.listOfWorkflows[workflowIndex].visible = true;
    },
    async handleWorkflowCreation() {
      const self = this;
      await self.workflowService
        .createNewWorkflow()
        .then((res) => {
          const workflowId = res.data;
          self.routeToEditorPage(workflowId);
        })
        .catch((e) => {
          self.$toast.error(
            "Unable to process your request. Please contact Administrator",
            self.sharedService.toastNotificationConfig
          );
        });
    },
    async routeToEditorPage(workflowId) {
      const self = this;
      await self.workflowService
        .getEditorStartStatus(workflowId)
        .then((el) => {
          this.$router.push(`/workflow/edit?id=${workflowId}`);
        })
        .catch((e) => {
          self.$toast.error(
            "Unable to process your request. Please contact Administrator",
            self.sharedService.toastNotificationConfig
          );
        });
    },
    getMgmNodeUrl(node_id) {
      const self = this;
      const baseStr = "VUE_APP_DOC_MGM_";
      const endStr = node_id.toUpperCase();
      const envKey = baseStr.concat(endStr);
      const mgmNodeUrl = env.getEnv(envKey);
      return mgmNodeUrl ? mgmNodeUrl : env.getEnv("VUE_APP_DOC_MGM_USER_GUIDE");
    },
    routeToHelp(ev, node_id) {
      ev.preventDefault();
      const url = this.getMgmNodeUrl(node_id);
      window.open(url, "helpwindow", "width=800, height=500");
    },
    async onFlipList() {
      this.active = !this.active;
      console.log("onFlipList: active = " + this.active);
      await this.getWorkflowList();
    },
    async onDeactivate(workflow, index) {
      console.log("onDeactivate: active = " + this.active + ", workflowId = " + workflow.id, ", index = " + index); 
      this.workflowToDeactivate = { id: workflow.id, index: index };
      if (this.active) {
        // show confirmation for deactivation
        this.$refs.deactivateModal.show();      
      }
      else {
        // no need to show confirmation for activation
        await this.deactivateWorkflow();
      }
    },    
    async deactivateWorkflow() { // also handles activation
      this.loading = true;
      this.workflowService.updateWorkflow(this.workflowToDeactivate.id, !this.active)
        .then((success) => {
          this.loading = false;
          let action = this.active ? "deactivated" : "activated";
          let msg = `Successfully ${action} workflow ${this.workflowToDeactivate.id}.`;
          this.$toast.success(
            msg,
            this.sharedService.toastNotificationConfig
          );
          // remove the workflow from active/inactive list
          this.listOfWorkflows.splice(this.workflowToDeactivate.index, 1);
          console.log(`${msg} at index ${this.workflowToDeactivate.index}`);
        })
        .catch((err) => {
          this.loading = false;
          let action = this.active ? "deactivate" : "activate";
          let msg = `Failed to ${action} workflow ${this.workflowToDeactivate.id}`;
          this.$toast.error(
            `${msg} Please try again later!`,
            this.sharedService.toastNotificationConfig
          );
          console.log(`${msg} at index ${this.workflowToDeactivate.index}`, err);
        });
    },
    async handleDeactivateModal(confirmed) { // only used by deactivation
      console.log("handleDeactivateModal: confirmed = " + confirmed);  
      if (confirmed) { // When clicked on 'Yes', deactivate workflow
        await this.deactivateWorkflow();
      } else { // When clicked on 'No', hide the modal
        let action = this.active ? "Deactivating" : "Activating";
        console.log(`${action} on workflow ${this.workflowToDeactivate.id} is cancelled.`);
        this.$refs.deactivateModal.hide();
      }
    },    
  },
  mounted() {
    const self = this;
    self.activeWorkflowSession = localStorage.getItem("activeWorkflowSession");
    this.getWorkflowList();
  },
};
</script>

<style >
.btn:focus {
  box-shadow: none !important;
}
.mgm-card {
  margin: 10px 0px !important;
}
.mgm-card .card-body {
  padding: 0px !important;
}
.mgm-h3 {
  padding: 0.75rem 1.25rem !important;
  border: 1px solid rgba(0, 0, 0, 0.125);
  margin-bottom: 0px;
}
.mgm-param-toggle {
  &:focus, &:active {
    border-color: transparent !important;
  }
}
.mgm-card .collapse .card,
.mgm-card .collapse .card-body {
  border: 0px !important;
}
.mgm-content {
  padding: 1.25rem !important;
}
.bg-light-gray {
  background-color: rgba(0, 0, 0, 0.03) !important;
}
h3.card-title .btn {
  line-height: 1rem;
  text-decoration: none;
  color: #153c4d;
}
a#pills-ner-tab-2 {
  padding: 0.5rem 1rem;

  &:hover {
    color: #f4871e !important;
    text-decoration: none;
  }
}
</style>
