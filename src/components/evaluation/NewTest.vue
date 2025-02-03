<template>
  <div class="w-100 new-test">
    <loader :show="workflowDashboard.loading ? false : loading" />
    <h3 class="m-b-0 m-t-2 mt-1">1) Select a Test</h3>
    <b-card
      class="mgm-card bg-light-gray-1"
      v-for="(mst, i) in sharedService.sortByAlphabatical(mgmCategory.msts)"
      :key="i"
    >
      <div
        class="w-100 d-flex justify-content-between align-items-center mgm-h3 card-title bg-light-gray">
        <button
          class="btn fs-4 "
          :class="visible.includes(i) ? null : 'collapsed'"
          :aria-expanded="visible.includes(i) ? 'true' : 'false'"
          :aria-controls="'mgm' + i"
          @click="handleVisibility(i)"
        >
          <span v-html="rightArrowSvg" class="fs-5"></span>
          <span class="visually-hidden">Toggle hidden content</span>
          <span class="ps-2 fs-5">{{ mst.name }}</span>
        </button>
        <b-form-radio
          v-model="selectedMst.body"
          class="fs-5"
          name="mst-radios"
          :value="mst"
          @change="onChangeMst(i, mst)"
          >select test
        </b-form-radio>
      </div>
      <b-collapse
        :id="'mgm' + i"
        class="mgm-content"
        :visible="visible.includes(i)"
      >
        <span class="span-html" v-html="mst.description"></span>
        <button
          type="button"
          class="btn btn-outline-primary btn-md"
          data-toggle="modal"
          data-target=".upload-modal"
          @click="downloadGTTemplate($event, mst)"
          :disabled="!mst.groundtruthTemplate"
        >
          Download Ground Truth Template
        </button>
      </b-collapse>
    </b-card>
    <div v-if="selectedMst.index.toString()">
      <div
        v-if="
          selectedMst.detailBody &&
            selectedMst.mgmScoringParameters &&
            selectedMst.mgmScoringParameters.length
        "
      >
        <h3 class="m-b-0 m-t-2 mt-4">
          2) Set Parameters
        </h3>
        <div>
          Set any necessary parameters for running your test
        </div>
      </div>
      <div
        class="mb-3 mt-2"
        v-if="
          selectedMst.detailBody &&
            selectedMst.mgmScoringParameters &&
            selectedMst.mgmScoringParameters.length
        "
      >
        <div
          v-for="par in sharedService
            .sortByAlphabatical(
              JSON.parse(JSON.stringify(selectedMst.mgmScoringParameters))
            )
            .reverse()"
          :key="par.id"
        >
          <p
            class="bg-light-gray mgm-h3 p-1 mb-2"
            v-if="
              par.type !== 'MULTI_SELECT' ||
                (par.type === 'MULTI_SELECT' &&
                  selectedMst.detailBody.dependencyParamName &&
                  testParams[selectedMst.detailBody.dependencyParamName]) ||
                (par.type === 'MULTI_SELECT' && !par.dependencyName)
            "
          >
            <strong>{{ par.name }}:</strong> {{ par.description }}
          </p>
          <div class="input-group mb-3" v-if="par.type === 'FLOAT'">
            <input
              type="number"
              class="form-control"
              placeholder="Parameters"
              aria-label="description"
              aria-describedby="basic-addon2"
              step="0.25"
              min="0"
              v-model="testParams[par.name]"
            />
            <span class="input-group-text" id="basic-addon2">seconds</span>
          </div>
          <div class="mb-3" v-else-if="par.type === 'SINGLE_SELECT'">
            <b-form-radio-group
              v-model="testParams[par.name]"
              :options="JSON.parse(par.selections)"
              :name="`${par.id}-radios`"
              @change="onChangeSelect(par.name)"
              class="mb-2 param-radio"
            ></b-form-radio-group>
          </div>
          <div
            class="mb-3"
            v-else-if="par.type === 'MULTI_SELECT' && !par.dependencyName"
          >
            <b-form-group>
              <b-form-checkbox-group
                v-model="testParams[par.name]"
                :options="JSON.parse(par.selections)"
                name="multiselect-checkbox"
              ></b-form-checkbox-group>
            </b-form-group>
          </div>
          <div
            class="mb-3"
            v-else-if="
              par.type === 'MULTI_SELECT' &&
                selectedMst.detailBody.dependencyParamName &&
                testParams[par.dependencyName]
            "
          >
            <b-form-group>
              <b-form-checkbox-group
                v-model="testParams[par.name]"
                :options="options(par, testParams[par.dependencyName])"
                name="multiselect-checkbox"
              ></b-form-checkbox-group>
            </b-form-group>
          </div>
        </div>
      </div>
      <div>
        <h3 class="m-b-0 m-t-2 mt-4">
          {{
            selectedMst.detailBody &&
            selectedMst.mgmScoringParameters &&
            selectedMst.mgmScoringParameters.length
              ? "3"
              : "2"
          }} Select MGM Outputs to Test
        </h3>
        <p class="m-b-0">
          Select the MGM output files to be tested against ground truth data
        </p>
        <WorkflowDashboard
          parent="NewTest"
          :workflowResultType="selectedMst.detailBody.workflowResultType"
          :workflowResultOutput="selectedMst.detailBody.workflowResultOutput"
        />
      </div>
      <h3 class="m-b-0 m-t-2 mt-4">
        {{
          selectedMst.detailBody &&
          selectedMst.mgmScoringParameters &&
          selectedMst.mgmScoringParameters.length
            ? "4"
            : "3"
        }} Upload or Select Ground Truth Data
      </h3>
      <p class="m-b-0">
        Upload a ground truth data file for each MGM output or select previously
        uploaded files
      </p>
      <div class="card m-b-0 m-t-0 w-100 mt-0">
        <div class="card-body pt-0">
          <table
            id="reviewUpload"
            class="table fixed"
            :class="
              mgmEvaluation &&
              mgmEvaluation.selectedRecords &&
              mgmEvaluation.selectedRecords.length
                ? 'mb-0'
                : 'mb-4'
            "
          >
            <thead>
              <tr>
                <th scope="col" class="slim-col-1 border-top-0">File</th>
                <th scope="col" class="slim-col-2 border-top-0">MGM Output</th>
                <th scope="col" class="slim-col-3 border-top-0">
                  Ground Truth
                </th>
                <th scope="col" class="text-end slim-col-4 border-top-0">
                  Upload/Select Ground Truth
                </th>
                <th scope="col" class="text-end slim-col-5 border-top-0">
                  Remove Row
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="cloneable selected-mgm-outputs"
                v-for="(record, i) in mgmEvaluation.selectedRecords"
                :key="i"
              >
                <td class="primaryFile cloneCell slim-col-1">
                  <span> {{ record.primaryfileName }}</span>
                </td>
                <td class="output cloneCell slim-col-2">
                  <span>{{ record.outputName }}</span>
                </td>
                <td class="output cloneCell slim-col-3">
                  <span
                    class="ground-truth"
                    v-if="record && record.gtSupplement"
                  >
                    {{ record.gtSupplement.name }}</span
                  >
                </td>
                <td class="slim-col-4 text-end">
                  <button
                    type="button"
                    class="btn btn-outline-primary btn-md  uploadModal"
                    data-toggle="modal"
                    data-target=".upload-modal"
                    @click="handleGroundTruthModal(record)"
                    :disabled="
                      selectedMst.detailBody.dependencyParamName &&
                        !testParams[selectedMst.detailBody.dependencyParamName]
                    "
                  >
                    Upload/Select Ground Truth
                  </button>
                </td>
                <td class="text-end slim-col-5">
                  <a
                    @click="removeRow(record)"
                    class="float-end remove-row-top remove-row"
                  >
                    <svg
                      class="remove-svg"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="red"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"
                      ></path></svg>
                      Remove Row
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <button
      class="btn btn-primary btn-lg marg-tb-3 float-end"
      type="button"
      @click="onNewTestSubmit"
      :disabled="activeSubmitButton()"
    >
      Submit
    </button>
    <button
      type="button"
      class="btn btn-outline-primary btn-lg me-2 float-end"
      @click="onNewTestCancel"
    >
      Cancel
    </button>
    <GroundTruthModal
      v-if="selectedRecord.id"
      :showModal="showModal"
      :mstDetails="selectedMst.detailBody"
      :selectedRecord="selectedRecord"
      :selectedParams="testParams"
      @close="handleGroundTruthModal"
    />
  </div>
</template>

<script>
import sync from "@/helpers/sync";
import config from "@/assets/constants/common-contant.js";
import Loader from "@/components/shared/Loader.vue";
import SharedService from "@/service/shared-service";
import EvaluationService from "@/service/evaluation-service";
import WorkflowDashboard from "@/components/dashboard/Dashboard.vue";
import GroundTruthModal from "./GroundTruthModal.vue";

export default {
  name: "NewTest",
  components: {
    Loader,
    WorkflowDashboard,
    GroundTruthModal,
  },
  data() {
    return {
      loading: false,
      sharedService: new SharedService(),
      evaluationService: new EvaluationService(),
      selectedMst: {
        index: "",
        body: {},
        detailBody: {},
        mgmScoringParameters: [],
      },
      testParams: { "Match types": "Yes" },
      showModal: false,
      selectedRecord: {},
      rightArrowSvg: config.common.icons["right_arrow"],
      visible: [],
    };
  },
  computed: {
    mgmEvaluation: sync("mgmEvaluation"),
    workflowDashboard: sync("workflowDashboard"),
  },
  props: {
    mgmCategory: {
      default: {},
    },
    mgmCategoryLoading: {
      default: false,
    },
  },
  methods: {
    activeSubmitButton() {
      const self = this;

      // Checking values for all the parameters
      let availableParameters = false;
      if (
        self.selectedMst.detailBody.id &&
        !self.selectedMst.mgmScoringParameters.length
      )
        availableParameters = true;
      if (
        self.selectedMst.mgmScoringParameters.length === 1 &&
        self.selectedMst.mgmScoringParameters[0].name &&
        self.testParams[self.selectedMst.mgmScoringParameters[0].name]
      )
        availableParameters = true;
      if (self.selectedMst.mgmScoringParameters.length > 1) {
        for (let i = 0; i < self.selectedMst.mgmScoringParameters.length; i++) {
          if (
            self.selectedMst.mgmScoringParameters[i].type === "MULTI_SELECT" ||
            (self.selectedMst.mgmScoringParameters[i].name &&
              self.testParams[self.selectedMst.mgmScoringParameters[i].name])
          ) {
            /* if (
              self.selectedMst.mgmScoringParameters[i].type ===
                "MULTI_SELECT" &&
              !!self.testParams[
                self.selectedMst.mgmScoringParameters[i].name
              ] &&
              !self.testParams[self.selectedMst.mgmScoringParameters[i].name]
                .length
            ) {
              availableParameters = false;
              break;
            } else  */
            availableParameters = true;
          } else {
            availableParameters = false;
            break;
          }
        }
      }

      // Checking groundtruth for all the selected files
      let availableGtSupplement = false;
      for (let i = 0; i < self.mgmEvaluation.selectedRecords.length; i++) {
        if (
          self.mgmEvaluation.selectedRecords[i] &&
          self.mgmEvaluation.selectedRecords[i].gtSupplement
        )
          availableGtSupplement = true;
        else {
          availableGtSupplement = false;
          break;
        }
      }

      return (
        !self.mgmCategory.id ||
        !self.selectedMst.detailBody.id ||
        !availableParameters ||
        !availableGtSupplement
      );
    },
    clearSelectedRecords() {
      const self = this;
      //Reset "Upload or Select Ground Truth Data"
      for (let i = 0; i < self.mgmEvaluation.selectedRecords.length; i++) {
        self.mgmEvaluation.selectedRecords[i].gtSupplement &&
          delete self.mgmEvaluation.selectedRecords[i].gtSupplement;
      }
      self.mgmEvaluation.selectedRecords = [];
    },
    onChangeSelect(paramName) {
      const self = this;
      self.clearSelectedRecords();

      //Reset multi select parameters on depending parameter change
      if (paramName === self.selectedMst.detailBody.dependencyParamName) {
        const multiSelectParameter = self.selectedMst.mgmScoringParameters.filter(
          (param) => param.type === "MULTI_SELECT"
        )[0];
        if (
          multiSelectParameter &&
          multiSelectParameter.name &&
          multiSelectParameter.dependencyName
        )
          delete self.testParams[multiSelectParameter.name];
      }
    },
    options(parameter, type) {
      return JSON.parse(parameter.selections).filter(
        (selection) => selection[type]
      )[0][type];
    },
    handleVisibility(index, open = "") {
      const self = this;
      if (open) {
        self.visible = [];
        self.visible.push(index);
      } else {
        if (self.visible.includes(index)) {
          self.visible = self.visible.filter((ele) => {
            return ele !== index;
          });
        } else {
          self.visible.push(index);
        }
      }
    },
    handleGroundTruthModal(record) {
      const self = this;
      self.showModal = !self.showModal;
      if (record && record.primaryfileId) {
        self.selectedRecord = record;
      } else {
        self.selectedRecord = {};
      }
    },
    onNewTestCancel() {
      const self = this;
      this.$emit("changeTab", 0);
    },
    async onNewTestSubmit() {
      const self = this;
      // console.log("Selected mgm Category: " + self.mgmCategory);
      // console.log("Selected mst: " + self.selectedMst);
      // console.log("Selected records: " + self.mgmEvaluation.selectedRecords);
      // console.log("Parameters: " + self.testParams);
      if (!self.activeSubmitButton()) {
        self.loading = true;
        let parameters = [];
        for (let i = 0; i < self.selectedMst.mgmScoringParameters.length; i++) {
          parameters.push({
            id: self.selectedMst.mgmScoringParameters[i].id,
            value:
              self.testParams[self.selectedMst.mgmScoringParameters[i].name],
          });
        }
        let files = [];
        for (let i = 0; i < self.mgmEvaluation.selectedRecords.length; i++) {
          if (self.mgmEvaluation.selectedRecords[i].gtSupplement)
            files.push({
              groundtruthFileId:
                self.mgmEvaluation.selectedRecords[i].gtSupplement.id,
              workflowResultId: self.mgmEvaluation.selectedRecords[i].id,
            });
        }

        let body;
        body = {
          categoryId: self.mgmCategory.id,
          mstId: self.selectedMst.detailBody.id,
          parameters: parameters,
          files: files,
        };

        try {
          await this.evaluationService
            .mgmSubmitNewTest(body)
            .then((response) => {
              self.loading = false;
              if (response.success) {
                this.$emit("changeTab", 0);
                return response;
              } else {
                response.validationErrors.map((el) =>
                  self.$toast.error(el, self.sharedService.toastNotificationConfig)
                );
              }
            })
            .then((res) => {
              if (res && res.success)
                self.$toast.success(
                  "Test has been successfully submitted.",
                  self.sharedService.toastNotificationConfig
                );
            });
        } catch (error) {
          self.loading = false;
          self.$toast.error(
            "Something went wrong. Please try again!",
            self.sharedService.toastNotificationConfig
          );
        }
      }
    },
    removeRow(record) {
      const self = this;
      let index;
      self.mgmEvaluation.selectedRecords.map((el, i) => {
        if (el.id === record.id) {
          index = i;
          delete record.gtSupplement;
        }
      });
      self.mgmEvaluation.selectedRecords.splice(index, 1);
    },
    async getDetailsMgmScoringTool(mstId) {
      const self = this;
      try {
        self.loading = true;
        const mgmScoringToolDetailsResponse = await this.evaluationService.getDetailsMgmScoringTool(
          mstId
        );
        self.selectedMst.detailBody = JSON.parse(
          JSON.stringify(mgmScoringToolDetailsResponse.data)
        );
        const mgmScoringToolParametersDetailsResponse = await this.evaluationService.getDetailParametersMgmScoringTool(
          mstId
        );
        self.selectedMst.mgmScoringParameters = JSON.parse(
          JSON.stringify(
            mgmScoringToolParametersDetailsResponse.data._embedded
              .mgmScoringParameters
          )
        );
        self.mgmEvaluation.selectedRecords = [];
        self.loading = false;
      } catch (error) {
        console.log(error);
        self.loading = false;
        self.$toast.error(
          "Oops! Something went wrong.",
          self.sharedService.toastNotificationConfig
        );
      }
    },
    async onChangeMst(mstIndex, mstObj) {
      const self = this;
      self.handleVisibility(mstIndex, "forceOpen");
      self.selectedMst.index = mstIndex;
      self.selectedMst.body = mstObj;
      await self.getDetailsMgmScoringTool(mstObj.id);
      this.testParams = { "Match types": "Yes" };
      self.clearSelectedRecords();
    },
    onGroundtruthInfo(ev, mstObj) {
      console.log("Clicked on onGroundtruthInfo!!" + mstObj);
    },
    async downloadGTTemplate(ev, mstObj) {
      let fileName = mstObj.groundtruthTemplate;
      await this.evaluationService
        .downloadFile(fileName)
        .then((x) => {
          var uriContent = encodeURIComponent(x);
          var link = document.createElement("a");
          link.download = fileName;
          link.href = "data:text/csv," + uriContent;
          link.click();
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
  watch: {
    mgmCategory: function() {
      const self = this;
      self.selectedMst.index = 0;
      if (self.mgmCategory.msts.length) {
        self.selectedMst.body = self.mgmCategory.msts[0];
        self.getDetailsMgmScoringTool(self.mgmCategory.msts[0].id);
        self.testParams = { "Match types": "Yes" };
      }
    },
    mgmCategoryLoading: function() {
      const self = this;
      const newTestTitle = document.getElementById("select-test-title");
      if (self.mgmCategoryLoading) {
        newTestTitle.classList.remove("hdr-3");
      } else {
        newTestTitle.classList.add("hdr-3");
      }
    },
  },
};
</script>

<style lang="css">
@import "../../styles/style.css";
.new-test {
  padding-left: 15px;
}

.pulse,
.tab-pane .hdr-3 {
  animation-name: pulse;
  animation-duration: 1.5s;
  animation-iteration-count: 1s;
}

.hdr-3 {
  width: 300px;
  color: #153c4d;
  font-size: xl-large;
  font-weight: bold;
}

@keyframes pulse {
  0% {
    opacity: 0;
    transform: scale3d(1, 1, 1);
    color: #153c4d;
  }
  50% {
    opacity: 1;
    transform: scale3d(1.12, 1.12, 1.12);
  }
  100% {
    opacity: 1;
    transform: scale3d(1, 1, 1);
    color: #153c4d;
  }
}

.mst-items {
  align-items: flex-start !important;
}
.mst-span {
  width: 100%;
}
.span-html > ul {
  padding-left: 1.5rem;
}
.output-select {
  padding: 0px 15px;
  margin-bottom: -10px;
}
.remove-svg {
  margin-right: 3px;
}
.remove-row {
  cursor: pointer;
}
.selected-mgm-outputs {
  background-color: #fef4ea;
}
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
.mgm-h3 .svg-inline {
  vertical-align: middle;
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
.card-title {
  margin-bottom: 0px !important;
}
.custom-radio .custom-control-input:checked ~ .custom-control-label::after {
  width: 1.25rem !important;
  height: 1.25rem !important;
}
.custom-radio .custom-control-input:checked ~ .custom-control-label::before {
  width: 1.25rem !important;
  height: 1.25rem !important;
  background-color: #153c4d !important;
  border-color: #153c4d !important;
}
.custom-control-label::after {
  width: 1.25rem !important;
  height: 1.25rem !important;
}
.custom-radio .custom-control-label::before {
  width: 1.25rem !important;
  height: 1.25rem !important;
}
.custom-checkbox .custom-control-input:checked ~ .custom-control-label::after {
  width: 1rem !important;
  height: 1rem !important;
}
.custom-control-label {
  cursor: pointer !important;
}
.param-radio
  > .custom-radio
  .custom-control-input:checked
  ~ .custom-control-label::after {
  width: 1rem !important;
  height: 1rem !important;
}
.param-radio
  > .custom-radio
  .custom-control-input:checked
  ~ .custom-control-label::before {
  width: 1rem !important;
  height: 1rem !important;
  background-color: #153c4d !important;
  border-color: #153c4d !important;
}
.param-radio > .custom-control-label::after {
  width: 1rem !important;
  height: 1rem !important;
}
.param-radio > div > .custom-control-label::before {
  width: 1rem !important;
  height: 1rem !important;
}
.param-radio
  > div
  > .custom-control-input:checked
  ~ .custom-control-label::after {
  width: 1rem !important;
  height: 1rem !important;
}
</style>
