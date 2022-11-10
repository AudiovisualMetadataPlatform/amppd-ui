<template>
  <div class="new-test">
    <loader :show="loading" />
    <h3 class="m-b-0 m-t-2 mt-1">1) Select a Test</h3>
    <b-card
      class="mgm-card bg-light-gray-1"
      v-for="(mst, i) in mgmCategory.msts"
      :key="i"
    >
      <h3
        class="w-100 d-flex justify-content-between align-items-center mgm-h3 card-title bg-light-gray"
      >
        <button
          class="btn"
          :class="visible.includes(i) ? null : 'collapsed'"
          :aria-expanded="visible.includes(i) ? 'true' : 'false'"
          :aria-controls="'mgm' + i"
          style="font-size:24px; font-weight:400"
          @click="handleVisibility(i)"
        >
          <span v-html="rightArrowSvg" style="font-size:1.25rem"></span>
          <span class="sr-only">Toggle hidden content</span>
          <span class="pl-2" style="font-size:1.25rem">{{ mst.name }}</span>
        </button>
        <b-form-radio
          v-model="selectedMst.body"
          style="font-size:1.25rem;"
          name="some-radios"
          :value="mst"
          @change="onChangeMst(i, mst)"
          >&nbsp;select test</b-form-radio
        >
      </h3>
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
          disabled
        >
          Download Ground Truth Template
        </button>
      </b-collapse>
    </b-card>
    <h3 class="m-b-0 m-t-2 mt-4">2) Set Parameters</h3>
    <div>Set any necessary parameters for running your test</div>

    <!-- Parameter by seconds -->
    <div
      v-if="
        selectedMst.body &&
          selectedMst.body.name &&
          selectedMst.body.name.includes('by seconds')
      "
      class="form-group marg-t-1"
    >
      <p class="bg-light-gray mgm-h3 p-1 mb-2">
        <strong>Analysis threshold:</strong> the number of seconds buffer
        (float) for counting a true positive (match between the ground truth and
        MGM output). For example, a 2-second threshold will consider a GT and
        MGM segment a match if both the start and end times for each fall within
        2 seconds of each other.
      </p>
      <div class="input-group mb-3">
        <input
          type="number"
          class="form-control"
          placeholder="Parameters"
          aria-label="description"
          aria-describedby="basic-addon2"
          step="0.25"
          v-model="testParams.parameter"
        />
        <div class="input-group-append">
          <span class="input-group-text" id="basic-addon2">seconds</span>
        </div>
      </div>
    </div>

    <!-- Other parameters -->
    <div v-else class="form-group marg-t-1">
      <select
        v-if="
          selectedMst.detailBody &&
            selectedMst.detailBody.parameters &&
            selectedMst.detailBody.parameters.length
        "
        class="select custom-select w-100"
        v-model="testParams.parameter"
      >
        <option
          v-for="option in selectedMst.detailBody.parameters"
          :key="option.id"
          :value="option.id"
          >{{ option.name }}</option
        >
      </select>
      <textarea
        v-else
        id="descriptiona"
        class="form-control"
        spellcheck="false"
        v-model="testParams.parameter"
      ></textarea>
    </div>
    <div>
      <h3 class="m-b-0 m-t-2 mt-4">3) Select MGM Outputs to Test</h3>
      <p class="m-b-0">
        Select the MGM output files to be tested against ground truth data
      </p>
      <WorkflowDashboard
        parent="NewTest"
        :workflowResultType="selectedMst.detailBody.workflowResultType"
      />
    </div>
    <h3 class="m-b-0 m-t-2 mt-4">4) Upload or Select Ground Truth Data</h3>
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
              <th scope="col" class="slim-col-3 border-top-0">Ground Truth</th>
              <th scope="col" class="text-right slim-col-4 border-top-0">
                Upload/Select Ground Truth
              </th>
              <th scope="col" class="text-right slim-col-5 border-top-0">
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
                <span class="ground-truth" v-if="record && record.gtSupplement">
                  {{ record.gtSupplement.name }}</span
                >
              </td>
              <td class="slim-col-4 text-right">
                <button
                  type="button"
                  class="btn btn-outline-primary btn-md  uploadModal"
                  data-toggle="modal"
                  data-target=".upload-modal"
                  @click="handleGroundTruthModal(record)"
                >
                  Upload/Select Ground Truth
                </button>
              </td>
              <td class="text-right slim-col-5">
                <a
                  @click="removeRow(record)"
                  class="float-right remove-row-top remove-row"
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
                    ></path></svg
                  >Remove Row
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <button
      class="btn btn-primary btn-lg marg-tb-3 float-right"
      type="button"
      @click="onNewTestSubmit"
      disabled
    >
      Submit
    </button>
    <button
      type="button"
      class="btn btn-outline-primary btn-lg mr-2 float-right"
      @click="onNewTestCancel"
    >
      Cancel
    </button>
    <GroundTruthModal
      v-if="selectedRecord.id"
      :showModal="showModal"
      :mstDetails="selectedMst.detailBody"
      :selectedRecord="selectedRecord"
      @close="handleGroundTruthModal"
    />
  </div>
</template>

<script>
import { sync } from "vuex-pathify";
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
      selectedMst: { index: 0, body: {}, detailBody: {} },
      testParams: {},
      showModal: false,
      selectedRecord: {},
      rightArrowSvg: config.common.icons["right_arrow"],
      visible: [],
    };
  },
  computed: {
    mgmEvaluation: sync("mgmEvaluation"),
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
    handleVisibility(index) {
      const self = this;
      if (self.visible.includes(index)) {
        self.visible = self.visible.filter((ele) => {
          return ele !== index;
        });
      } else {
        self.visible.push(index);
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
    onNewTestSubmit() {
      const self = this;
      console.log("Selected mgm Category:" + self.mgmCategory);
      console.log("Selected mst:" + self.selectedMst);
      console.log("Selected records:" + self.mgmEvaluation.selectedRecords);
      console.log("Parameters:" + self.testParams);
    },
    removeRow(record) {
      const self = this;
      let index;
      self.mgmEvaluation.selectedRecords.map((el, i) => {
        if (el.id === record.id) index = i;
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
        self.mgmEvaluation.selectedRecords = [];
        self.loading = false;
      } catch (error) {
        console.log(error);
        self.loading = false;
        self.$bvToast.toast(
          "Oops! Something went wrong.",
          self.sharedService.erorrToastConfig
        );
      }
    },
    onChangeMst(mstIndex, mstObj) {
      const self = this;
      self.selectedMst.index = mstIndex;
      self.selectedMst.body = mstObj;
      self.getDetailsMgmScoringTool(mstObj.id);
      self.testParams = {};
    },
    onGroundtruthInfo(ev, mstObj) {
      console.log("Clicked on onGroundtruthInfo!!" + mstObj);
    },
    downloadGTTemplate(ev, mstObj) {
      console.log("Clicked on onGroundtruthInfo!!" + mstObj);
    },
  },
  mounted() {
    const self = this;
    if (
      self.mgmCategory &&
      self.mgmCategory.msts &&
      self.mgmCategory.msts.length
    ) {
      self.selectedMst.body = self.mgmCategory.msts[0];
      self.getDetailsMgmScoringTool(self.mgmCategory.msts[0].id);
    }
  },
  watch: {
    mgmCategory: function() {
      const self = this;
      self.selectedMst.index = 0;
      if (self.mgmCategory.msts.length) {
        self.selectedMst.body = self.mgmCategory.msts[0];
        self.getDetailsMgmScoringTool(self.mgmCategory.msts[0].id);
        self.testParams = {};
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
@import "/amppd-ui/src/styles/style.css";
.new-test {
  padding: 0px 15px;
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

.v-pills-card {
  padding-top: 40px !important;
}
.v-pills-body {
  display: block !important;
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

.mgm-card .collapse .card,
.mgm-card .collapse .card-body {
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
  line-height: 1rem;
  text-decoration: none;
  color: #153c4d;
}
.card-title {
  margin-bottom: 0px !important;
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
</style>
