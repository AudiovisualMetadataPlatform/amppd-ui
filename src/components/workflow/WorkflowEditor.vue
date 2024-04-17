<template>
  <div class="p-3 col-12 bg-light-gray-1">
    <main>
      <div class="workflow-content">
        <div>
          <div class="header-row">
            <h2>Workflow Editor</h2>
            <div class="action-buttons">
              <input
                type="button"
                class="primary-button"
                v-on:click="onDone"
                value="Done"
              />
            </div>
          </div>
          <iframe
            v-if="iframeUrl"
            class=""
            :src="iframeUrl"
            id="workflow-editor"
            width="100%"
            height="800"
            style="border:none;"
          ></iframe>
        </div>
      </div>
      <b-modal v-model="showModal" id="modal-center" centered>
        <template #modal-header="{}">
          <h5 class="text-capitalize">
            Confirm
          </h5>
        </template>
        <template #default="{}">
          <div class="row pad-all-2">
            Any unsaved changes will be lost. Do you want to continue?
          </div>
        </template>
        <template #modal-footer="{ hide }">
          <button class="btn btn-secondary" @click="hide()">
            Go Back
          </button>
          <button size="sm" class="btn btn-primary" @click="onContinue()">
            Continue
          </button>
        </template>
      </b-modal>
      <!-- <modal v-if="showValidation" @close="modalDismiss">
      <h3 slot="header">{{validationHeader}}</h3>
      <div slot="body">
        {{validationErrors}}
      </div>
    </modal> -->
    </main>
  </div>
</template>

<script>
import AmpHeader from "@/components/shared/AmpHeader.vue";
import Logout from "@/components/shared/Logout.vue";
import Modal from "@/components/shared/Modal.vue";
import { env } from "../../helpers/env";
import WorkflowService from "../../service/workflow-service";
import SharedService from "../../service/shared-service";

export default {
  name: "WorkflowEditor",
  components: {
    AmpHeader,
    Logout,
    Modal,
  },
  data() {
    return {
      workflowService: new WorkflowService(),
      sharedService: new SharedService(),
      id: "",
      iframeUrl: "",
      responseHeader: "",
      responseBody: "",
      modalDismiss: null,
      showValidation: false,
      showModal: false,
    };
  },
  computed: {},
  methods: {
    getIframeUrl(id) {
      return env.getGalaxyWorkflowUrl() + id;
    },
    onDone() {
      const self = this;
      self.showModal = true;
    },
    async onContinue() {
      const self = this;
      await self.workflowService
        .getEditorEndStatus(self.id)
        .then((el) => {
          localStorage.removeItem("activeWorkflowSession");
          self.showModal = false;
          this.$router.push(`/workflows`);
        })
        .catch((e) => {
          self.showModal = false;
          self.$bvToast.toast(
            "Unable to process your request. Please contact Administrator",
            self.sharedService.erorrToastConfig
          );
        });
    },
  },
  mounted() {
    this.id = this.$route.query.id;
    this.iframeUrl = this.getIframeUrl(this.id);
    console.log("workflowId = " + this.id + ", iframeUrl = " + this.iframeUrl);

    //Scroll back to top
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    //Setting activeWorkflowId
    localStorage.setItem("activeWorkflowSession", this.id);

    //Prevent browser back button event
    window.onpopstate = function() {
      window.history.forward();
      if (this.location.hash.includes("/workflow/edit"))
        alert(
          "Workflow editor session is active. Please click on done button before leaving the page."
        );
    };

    //Prevent page closing
    let confirm = true;
    let cancel = true;
    window.onbeforeunload = function() {
      return confirmCancel();
    };
    window.onunload = function() {
      return confirmLeave();
    };
    function confirmCancel() {
      if (cancel === true) {
        return "WARNING! You have unsaved changes that may be lost!";
      }
    }
    function confirmLeave() {
      if (confirm === true) {
        localStorage.removeItem("activeWorkflowSession");
      }
    }
  },
  destroyed() {
    //Removing activeWorkflowId
    localStorage.removeItem("activeWorkflowSession");

    //Removing prevention of page closing
    if (window.onbeforeunload != null) {
      window.onbeforeunload = null;
    }

    //Removing prevention of back button event
    if (window.onpopstate != null) {
      window.onpopstate = null;
    }
  },
};
</script>

<style scoped>
h2,
h3 {
  margin-left: 10px;
  margin-top: 2px;
  max-height: 50px;
}
.workflow-content {
  padding-top: 0px;
  display: flex;
  flex-direction: column;
}
.header-row {
  display: flex;
  justify-content: space-between;
  max-height: 50px;
}
.action-buttons {
  display: flex;
}
.primary-button {
  float: right;
  background-color: #e9972d;
  color: #2c5b7f;
  font: bolder;
  padding: 5px 20px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  border: none;
  cursor: pointer;
  border-radius: 15px;
  font-size: 12px;
}
</style>
