<template>
  <div class="col-lg-5">
    <modal
      v-if="showSaveBundle"
      id="saveBundle"
      @close="workflowSubmission.showSaveBundle = false"
      class="my-modal"
    >
      <template #header><h3>Save file selection as a bundle</h3></template>
      <template #body>
        <form class="needs-validation" ref="saveBundleForm">
          <div class="mb-3">
            <label for="name" class="form-label">Bundle Name</label>
            <input
              type="text"
              id="name"
              class="form-control"
              size="50"
              placeholder="Enter bundle name"
              v-model="bundleName"
              v-on:focus="clearError"
              required
            />
            <label class="invalid-feedback" v-if="inputError.length">{{inputError}}</label>
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">Bundle Description</label>
            <input
              type="text"
              id="description"
              class="form-control"
              size="50"
              placeholder="Enter bundle description"
              v-model="bundleDescription"
            />
          </div>
        </form>
      </template>
      <template #footer><div class="action-buttons">
        <input
          type="button"
          class="secondary-button"
          v-on:click="workflowSubmission.showSaveBundle = false"
          value="Cancel"
        />
        <input
          type="button"
          class="primary-button"
          v-on:click="saveBundle"
          value="Save Selection"
        />
      </div></template>
    </modal>

    <modal
      v-if="showConfirmUpdate"
      id="confirmUpdate"
      @close="showConfirmUpdate = false"
      class="my-modal"
    >
      <template #header><h3>Confirm</h3></template>
      <template #body>
          <div>
          A bundle owned by you with name "{{ bundle.name }}" and description "{{
            bundle.description
          }}" already exists, do you want to overwrite it?
        </div>
      </template>
      <template #footer>
        <div class="action-buttons">
          <input
            type="button"
            class="secondary-button"
            v-on:click="showConfirmUpdate = false"
            value="No"
          />
          <input
            type="button"
            class="primary-button"
            v-on:click="updateConfirmed"
            value="Yes"
          />
        </div>
      </template>
    </modal>

    <modal
      v-if="showResponse"
      id="response"
      @close="showResponse = false"
      class="my-modal"
    >
      <template #header><h3>{{ responseHeader }}</h3></template>
      <template #body><div>
        {{ responseText }}
      </div>></template>
      <template #footer><div>
        <input
          type="button"
          class="secondary-button"
          v-on:click="showResponse = false"
          value="Ok"
        />
      </div></template>
    </modal>
  </div>
</template>

<script>
import sync from "@/helpers/sync";
import Modal from "@/components/shared/Modal.vue";
import WorkflowService from "../../service/workflow-service";

export default {
  name: "SaveBundle",
  props: {},

  data() {
    return {
      workflowService: new WorkflowService(),
      showConfirmUpdate: false,
      showResponse: false,
      responseHeader: "",
      responseText: "",
      bundle: null,
      bundleName: "",
      bundleDescription: "",
      inputError: "",
    };
  },

  components: {
    Modal,
  },

  computed: {
    workflowSubmission: sync("workflowSubmission"),
    selectedFiles: sync("workflowSubmission.selectedFiles"),
    showSaveBundle: sync("workflowSubmission.showSaveBundle"),
    // isConfirm: this.responseHeader === "Confirm",
  },

  methods: {
    async saveBundle() {
      console.log(
        `Saving bundle with name ${this.bundleName.length} and description ${this.bundleDescription} ...`
      );
      if (!this.validateBundleInputs()) return;

      // check if a bundle of the same named owned by the current user already exists
      await this.workflowService
        .findBundle(this.bundleName)
        .then((response) => {
          // only one bundle will be returned at most as bundle name is unique
          this.bundle = response.data[0]; 
          console.log("Returned bundle: " + this.bundle.id);
        })
        .catch((e) => {
          console.log(e);
          this.responseHeader = "Error";
          this.responseText =
            "Error checking bundle existance before saving bundle: a system error has occured, please try again later.";
          this.showResponse = true;
          this.workflowSubmission.showSaveBundle = false;
          return;
        });

      // if yes, confirm if user wants to overwrite it
      if (this.bundle && this.bundle.id) {
        console.log(
          "Found an existing bundle, will update it: " + this.bundle.id
        );
        this.showConfirmUpdate = true;
      }
      // otherwise, create a new one
      else {
        console.log("No existing bundle found, will create a new one");
        this.createBundle();
        this.workflowSubmission.showSaveBundle = false;
      }
    },

    validateBundleInputs() {
      if (this.bundleName.length === 0) {
        this.inputError = "(Bundle name required!)";
        const form = this.$refs.saveBundleForm;
        form.classList.add('was-validated');
        return false;
      }
      return true;
    },

    async updateConfirmed() {
      this.showConfirmUpdate = false;
      this.workflowSubmission.showSaveBundle = false;
      this.updateBundle();
    },

    async updateBundle() {
      let primaryfileIds = this.workflowService.getSelectedPrimaryfileIds(
        this.selectedFiles
      );
      console.log(
        "Updating bundle with selected primaryfile IDs: " + primaryfileIds
      );
      await this.workflowService
        .updateBundle(this.bundle.id, this.bundleDescription, primaryfileIds)
        .then((response) => {
          let updatedBundle = response.data;
          console.log("Updated bundle: " + updatedBundle.id);
          this.responseHeader = "Success";
          this.responseText = `The bundle with ID ${updatedBundle.id} has been updated`;
          this.showResponse = true;
          return updatedBundle;
        })
        .catch((e) => {
          console.log(e);
          this.responseHeader = "Error";
          this.responseText =
            "Error updating bundle: a system error has occured, please try again later.";
          this.showResponse = true;
          return null;
        });
    },

    async createBundle() {
      let primaryfileIds = this.workflowService.getSelectedPrimaryfileIds(
        this.selectedFiles
      );
      console.log(
        "Creating bundle with selected primaryfile IDs: " + primaryfileIds
      );
      await this.workflowService
        .createBundle(this.bundleName, this.bundleDescription, primaryfileIds)
        .then((response) => {
          let createdBundle = response.data;
          console.log("Created bundle: " + createdBundle.id);
          this.responseHeader = "Success";
          this.responseText = `A new bundle with ID ${createdBundle.id} has been created`;
          this.showResponse = true;
          return createdBundle;
        })
        .catch((e) => {
          console.log(e);
          this.responseHeader = "Error";
          this.responseText =
            "Error creating bundle: a system error has occured, please try again later.";
          this.showResponse = true;
          return null;
        });
    },

    clearError() {
      this.inputError = "";
    },
  },
};
</script>

<style lang="css">
@import "../../styles/style.css";

.primary-button {
  float: right;
  background-color: #e9972d;
  color: #2c5b7f;
  font: bolder;
  padding: 10px 20px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  border: none;
  cursor: pointer;
  border-radius: 15px;
  font-size: 12px;
  width: 150px;
}

.secondary-button {
  float: right;
  background-color: #ffffff;
  color: #2c5b7f;
  font: bolder;
  padding: 10px 20px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 1px solid #e9972d;
  cursor: pointer;
  border-radius: 15px;
  font-size: 12px;
  width: 150px;
}

.action-buttons {
  display: flex;
  justify-content: flex-end;
}
</style>
