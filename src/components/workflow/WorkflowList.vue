<template>
  <div class="pt-0 p-3 col-12 bg-light-gray-1">
    <main class="m-0">
      <b-card class="w-100">
        <h2 class>
          Workflows
          <button
            id="btn-search"
            class="ml-1 btn btn-primary btn-lg marg-b-4 float-right"
            data-toggle="modal"
            data-target=".bd-example-modal-lg-2"
            @click="handleWorkflowSearch()"
          >
            Search Workflows
          </button>
          <button
            v-if="canCreate()"
            id="btn-workflow-create"
            class="ml-1 btn btn-primary btn-lg marg-b-4 float-right"
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
              <h3 contenteditable="true" class="pointer-events-none">
                {{ workflow.name }}
              </h3>
              <!-- <p contenteditable="true">{{ workflow.description }}</p> -->
              <span>{{ workflow.annotations[0] }}</span>
            </div>
            <div
              v-if="canUpdate()"
              class="col-lg-2 text-right"
            >
              <button
                class="btn btn-primary btn marg-t-5"
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
          </div>

          <div class="row">
            <div class="col">
              Created By:
              <br />
              {{ workflow.creator ? workflow.creator : workflow.owner }}
            </div>
            <!-- <div class="col"> Creator: </div> -->
            <div class="col">
              Date Created:
              <br />{{ $filters.localDate(workflow.createTime) }}
            </div>
            <div class="col">
              Last Updated:
              <br />{{ $filters.localDate(workflow.updateTime) }}
            </div>
            <!-- <div class="col"> Version: </div> -->
            <div class="col" v-if="workflow.tags && workflow.tags.length">
              <p class="mb-0">Tags:</p>
              <span
                class="badge badge-secondary"
                v-for="tag in workflow.tags"
                :key="tag"
                >{{ tag }}</span
              >
            </div>
            <!-- <div class="col">
                            Input File Formats:
                            <br />
                            <span class="badge badge-secondary">Video</span>
                        <div class="col">
                            Input File Formats:
                            <br />
                            <span class="badge badge-secondary">Video</span>
                            <span class="badge badge-secondary">Audio</span>
                        </div>    <span class="badge badge-secondary">Audio</span>
                        </div>-->
          </div>
          <b-card class="mgm-card bg-light-gray-1">
            <h3
              class="w-100 mgm-h3 card-title bg-light-gray"
              @click="getWorkflowDetails(index)"
            >
              <button
                class="btn"
                :class="workflow.visible ? null : 'collapsed'"
                :aria-expanded="workflow.visible ? 'true' : 'false'"
                :aria-controls="'mgm' + index"
                style="font-size:24px; font-weight:400"
                @click="workflow.visible = !workflow.visible"
              >
                <span v-html="rightArrowSvg" style="font-size:24px"></span>
                <span class="sr-only">Toggle hidden content</span>
                <span class="pl-3">MGM Parameter Settings</span>
              </button>
            </h3>
            <b-collapse
              :id="'mgm' + index"
              class="mgm-content"
              v-model="workflow.visible"
            >
              <div
                :class="{
                  'p-2':
                    !workflow || !workflow.details || !workflow.details.length,
                }"
              >
                <b-overlay
                  :show="!workflow || !workflow.details"
                  rounded="sm"
                  c
                >
                  <b-navbar
                    id="pills-tab-1"
                    toggleable="lg"
                    type="dark"
                    class="nav-pills"
                  >
                    <span v-if="!workflow.details || workflow.details.length==0">
                      No step specified in workflow.
                    </span>
                    <span v-for="(node, i) in workflow.details" :key="i">
                      <b-nav-item
                        :class="
                          node && workflow.selectedNode === i ? 'active' : ''
                        "
                        @click="onChangeNode(index, i)"
                        >{{ node.nodeName }}</b-nav-item
                      >
                    </span>
                  </b-navbar>

                  <dl
                    class="d-flex col-12 mt-3 mb-0 pr-0"
                    v-if="
                      workflow && workflow.details && workflow.details.length
                    "
                  >
                    <div
                      v-if="workflow.details[workflow.selectedNode].params.length==0"
                      class="mr-5 d-flex"
                    >
                      No parameter specified.
                    </div>
                    <div
                      class="mr-5 d-flex"
                      v-for="(p, paramIndex) in workflow.details[
                        workflow.selectedNode
                      ].params"
                      :key="paramIndex"
                    >
                      <label class="font-weight-bold mb-0">{{ p.name }}:</label>
                      <span class="ml-2">{{ p.value }}</span>
                    </div>
                    <a
                      class="btn btn-primary float-right nav-link"
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
                        class="bi bi-file-text"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M5 4a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zM5 8a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1H5z"
                        ></path>
                        <path
                          d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z"
                        ></path>
                      </svg>
                      Tool documentation
                    </a>
                  </dl>
                </b-overlay>
              </div>
            </b-collapse>
          </b-card>
        </b-card>
        <!-- end workflow // -->
      </b-card>
    </main>
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
    };
  },
  computed: {
    acIsAdmin: sync("acIsAdmin"),
    acActions: sync("acActions"),
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
    searchWorkflows(searchFields) {
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
        .getFilteredWorkflows(name, creator, dateRange, annotations, tags)
        .then((response) => {
          self.listOfWorkflows = self.sharedService.sortByAlphabatical(
            response.data.rows
          );
        })
        .catch((e) => {
          console.log(e, "error");
        });
    },
    getWorkflowList() {
      const self = this;
      self.workflowService
        .getAllWorkflows()
        .then((response) => {
          self.listOfWorkflows = self.sharedService.sortByAlphabatical(
            response.data.rows
          );
        })
        .catch((e) => {
          console.log(e, "error");
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
        this.$set(self.listOfWorkflows, index, self.listOfWorkflows[index]);
      }
    },
    onChangeNode(workflowIndex, nodeIndex) {
      const self = this;
      self.listOfWorkflows[workflowIndex].selectedNode = nodeIndex;
      this.$set(
        self.listOfWorkflows,
        workflowIndex,
        self.listOfWorkflows[workflowIndex]
      );
    },
    handleWorkflowSearch() {
      this.$bvModal?.show("modal-lg");
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
          self.$bvToast.toast(
            "Unable to process your request. Please contact Administrator",
            self.sharedService.erorrToastConfig
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
          self.$bvToast.toast(
            "Unable to process your request. Please contact Administrator",
            self.sharedService.erorrToastConfig
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
  },
  mounted() {
    const self = this;
    self.activeWorkflowSession = localStorage.getItem("activeWorkflowSession");
    this.getWorkflowList();
  },
};
</script>

<style scoped>
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

.mgm-card .collapse .card,
.mgm-card .collapse .card-body {
  /* padding: 10px !important; */
  border: 0px !important;
}

.mgm-content {
  padding: 1.25rem !important;
}
nav.nav-pills {
  justify-content: flex-start !important;
  padding: 0.5rem !important;
  background: #e9ecef !important;
  border-radius: 0.5rem !important;
  list-style: none;
}

.nav-pills .nav-item.active {
  background: #153c4d !important;
  color: white !important;
}

.nav-item.active .a:link,
.nav-item.active a {
  color: white !important;
}

a:link,
a {
  color: #153c4d !important;
}

.nav-pills .active {
  border-radius: 0.25rem !important;
}

a:hover {
  color: #f4871e;
  text-decoration: none;
}
.nav {
  list-style: none !important;
}
.bg-light-gray {
  background-color: rgba(0, 0, 0, 0.03) !important;
}
h3.card-title .btn {
  /* font-size: 1.5rem; */
  line-height: 1rem;
  text-decoration: none;
  color: #153c4d;
}

.nav-pills .nav-link {
  border-radius: 0.25rem;
}
.nav-link:focus,
.nav-link:hover {
  text-decoration: none;
}
a:hover {
  color: #f4871e !important;
  text-decoration: none;
}

.pointer-events-none {
  pointer-events: none;
}

.nav-link {
  margin-left: auto;
  margin-right: 0;
}
</style>
