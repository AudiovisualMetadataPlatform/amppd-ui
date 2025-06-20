<template>
  <div>
    <loader :show="loading" />
    <b-modal
      :modelValue="showModal"
      @update:modelValue="showModal = $event" 
      id="modal-center"
      centered
      no-close-on-backdrop
      size="xl"
    >
      <template #header>
        <h5 class="modal-title" id="exampleModalLongTitle">
          Upload/Select Ground Truth
        </h5>
      </template>
      <template #default>
        <div class="row body-m">
          <div class="col-12">
            <h3>Select a Ground Truth</h3>
            <div class="scrollDiv gt-table">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Ground Truth</th>
                    <th scope="col">File Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Date of Upload</th>
                    <th scope="col" class="text-center selected-col">Select</th>
                  </tr>
                </thead>
                <tbody v-if="supplements.length">
                  <tr v-for="supplement in supplements" :key="supplement.id">
                    <th scope="row" class="groundTruth">
                      {{ supplement.name }}
                    </th>
                    <td>{{ supplement.originalFilename }}</td>
                    <td>
                      {{ supplement.description }}
                    </td>
                    <td>{{ $filters.localDate(supplement.createdDate) }}</td>
                    <td class="text-center slim-col-12">
                      <input
                        type="radio"
                        class="ck-lg radioBtn select-gt"
                        name="groundtruth"
                        v-model="selectedSupplement"
                        :value="supplement"
                      />
                    </td>
                  </tr>
                  <tr
                    v-if="selectedSupplement"
                    id="clearBtnContainer"
                    class="hideTillRadio"
                  >
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td class="text-center clear-btn-cell">
                      <button
                        type="button"
                        class="btn btn-outline-warning text-center marg-r-2"
                        data-clear="clear"
                        @click="clearSelectedGt()"
                      >
                        Clear
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="col-12">
            <h3>Upload Ground Truth</h3>
            <table class="table" v-if="uploadGtFiles && uploadGtFiles.length">
              <thead>
                <tr>
                <th>File Label*</th>
                <th>Filename</th>
                <th>Description</th>
                <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(file, index) in uploadGtFiles" :key="file.id">
                  <td>
                    <input
                      type="text"
                      class="w-100 form-control"
                      required
                      :class="{
                        'error-border': upladFile && !file.name,
                      }"
                      v-model="file.name"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      class="w-100 form-control"
                      v-model="file.originalFilename"
                      :disabled="true"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      class="w-100 form-control"
                      v-model="file.description"
                    />
                  </td>
                  <td>
                    <button
                      class="btn btn-primary btn float-end"
                      @click="handleUploadSaveBtn($event, file)"
                    >
                      Save
                    </button>
                    <button
                      class="btn btn-link add-remove float-end me-1"
                      @click="removeFile(index)"
                    >
                      <span v-html="removeIcon" class="pe-1"></span>Remove File
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="d-flex w-100 mt-3">
              <div class="input-group w-100 p-0 me-1">
                <input
                  type="file"
                  :accept="'.' + mstDetails.groundtruthFormat"
                  class="btn btn-light btn w-100"
                  ref="fileupload"
                  @change="getFile"
                  :disabled="uploadGtFiles.length > 0"
                />
              </div>
              <div class="p-0 align-self-center">
                <button
                  class="btn btn-primary btn float-end"
                  @click="uploadFile()"
                  :disabled="uploadGtFiles.length > 0"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <button
          type="button"
          class="btn btn-outline-warning"
          data-dismiss="modal"
          @click="onCancel()"
        >
          Cancel
        </button>
        <button size="sm" class="btn btn-primary" @click="onSave()">
          Save
        </button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import sync from "@/helpers/sync";
import Loader from "@/components/shared/Loader.vue";
import SharedService from "@/service/shared-service";
import config from "@/assets/constants/common-contant.js";
import WorkflowService from "@/service/workflow-service";
import SupplementService from "@/service/supplement-service";

export default {
  name: "GroundTruthModal",
  components: {
    Loader,
  },
  data() {
    return {
      loading: false,
      sharedService: new SharedService(),
      workflowService: new WorkflowService(),
      supplementService: new SupplementService(),
      removeIcon: config.common.icons["remove"],
      supplements: [],
      uploadGtFiles: [],
      upladFile: false,
      selectedSupplement: null,
    };
  },
  computed: {
    mgmEvaluation: sync("mgmEvaluation"),
  },
  props: {
    showModal: {
      default: false,
    },
    mstDetails: {
      default: {},
    },
    selectedRecord: {
      default: {},
    },
    selectedParams: {
      default: {},
    },
  },
  methods: {
    async networkCalls() {
      const self = this;
      self.selectedSupplement = this.selectedRecord.gtSupplement;
      try {
        self.loading = true;
        const primaryfileId = self.selectedRecord.primaryfileId;
        const name = "";
        const format = self.mstDetails.groundtruthFormat;

        let category = "";
        if (self.mstDetails.dependencyParamName) {
          const dependencyParamName = self.mstDetails.dependencyParamName;
          const selectedParamValue = self.selectedParams[dependencyParamName];
          const groundtruthSubcategory = JSON.parse(
            self.mstDetails.groundtruthSubcategory
          );
          category = `Groundtruth-${groundtruthSubcategory[selectedParamValue]}`;
        } else
          category = `Groundtruth-${self.mstDetails.groundtruthSubcategory}`;

        await self.workflowService
          .getSupplementsForPrimaryfiles(primaryfileId, name, category, format)
          .then((response) => {
            self.supplements = self.sharedService.sortByAlphabatical(
              response.data[0]
            );
          });
        self.loading = false;
      } catch (error) {
        self.loading = false;
        self.$toast.error(
          "Something went wrong. Please try again!",
          self.sharedService.toastNotificationConfig
        );
      }
    },
    clearSelectedGt() {
      this.selectedSupplement = null;
    },
    uploadFile() {
      const self = this;
      const sourceFiles = self.files;
      const source = Object.keys(sourceFiles).map((key) => sourceFiles[key]);
      source.forEach((file) => {
        const fileData = {
          name: "",
          originalFilename: file.name,
          description: "",
          file: file,
          id: file.filename,
        };
        self.uploadGtFiles.push(fileData);
      });
      self.files = [];
      this.$refs.fileupload.value = "";
    },
    removeFile(index = 0) {
      const self = this;
      self.uploadGtFiles.splice(index, 1);
      self.upladFile = false;
    },
    getFile(e) {
      const self = this;
      self.files = e.target.files || e.dataTransfer.files;
    },
    async handleUploadSaveBtn(e, data) {
      const self = this;
      e.preventDefault();
      self.upladFile = true;
      if (!data.name) {
        self.$toast.error(
          "Please provide required fields!",
          self.sharedService.toastNotificationConfig
        );
        return;
      }
      try {
        self.loading = true;
        let category = "";
        if (self.mstDetails.dependencyParamName) {
          const dependencyParamName = self.mstDetails.dependencyParamName;
          const selectedParamValue = self.selectedParams[dependencyParamName];
          const groundtruthSubcategory = JSON.parse(
            self.mstDetails.groundtruthSubcategory
          );

          category = `Groundtruth-${groundtruthSubcategory[selectedParamValue]}`;
        } else
          category = `Groundtruth-${self.mstDetails.groundtruthSubcategory}`;

        let formData = new FormData();
        formData.append(
          "primaryfileSupplement",
          new Blob(
            [
              JSON.stringify({
                name: data.name,
                originalFilename: data.originalFilename,
                description: data.description,
                category: category,
              }),
            ],
            {
              type: "application/json",
            }
          )
        );
        formData.append("mediaFile", data.file);
        await self.supplementService
          .addSupplement(
            "primaryfile",
            self.selectedRecord.primaryfileId,
            formData
          )
          .then((res) => {
            self.networkCalls().then(() => {
              self.removeFile();
            });
          });
        self.loading = false;
      } catch (error) {
        self.loading = false;
        self.upladFile = false;
        if (
          error.response &&
          error.response.data &&
          error.response.data.validationErrors
        ) {
          const errorMessages = self.sharedService.extractErrorMessage(
            error.response.data.validationErrors
          );
          errorMessages.map((el) =>
            self.$toast.error(el, self.sharedService.toastNotificationConfig)
          );
        } else {
          self.$toast.error(
            "Something went wrong.Please try again!",
            self.sharedService.toastNotificationConfig
          );
        }
      }
    },
    onCancel() {
      this.clearSelectedGt();
      this.$emit("close");
    },
    onSave() {
      const self = this;
      let index;
      self.mgmEvaluation.selectedRecords.map((el, i) => {
        if (el.id === self.selectedRecord.id) index = i;
      });
      self.mgmEvaluation.selectedRecords[index].gtSupplement =
        self.selectedSupplement;
      this.$emit("close");
    },
  },
  mounted() {
    this.networkCalls();
  },
};
</script>

<style lang="css">
@import "../../styles/style.css";
.body-m {
  min-height: 32rem;
}
.gt-table {
  min-height: 20rem;
}
.error-border {
  border: 1px solid red !important;
}
.clear-btn-cell {
  border-top: 1px solid #dee2e6;
}
.select-gt {
  width: 28px;
  height: 28px;
}
.selected-col {
  min-width: 88px !important;
}
</style>
