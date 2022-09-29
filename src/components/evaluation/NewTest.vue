<template>
  <div class="new-test">
    <loader :show="loading" />
    <div class="tab-pane fade active show" role="tabpanel" id="collapse-test">
      <div class="row" v-show="mgmCategory.msts && mgmCategory.msts.length">
        <div
          class="col-4 nav bg-none nav-pills v-pills-body"
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          <h3 id="select-test-title" class="col-12 hdr-3">Select a New Test</h3>
          <b-overlay rounded="sm">
            <b-navbar
              id="pills-tab-1"
              toggleable="lg"
              type="dark"
              class="nav flex-column nav-pills col-12 mst-items"
            >
              <span
                class="mst-span"
                v-for="(mst, i) in mgmCategory.msts"
                :key="i"
              >
                <b-nav-item
                  :class="mst && selectedMst.index === i ? 'active' : ''"
                  @click="onChangeMst(i, mst)"
                  >{{ mst.name }}</b-nav-item
                >
              </span>
            </b-navbar>
          </b-overlay>
        </div>
        <div class="col-8 tab-content" id="v-pills-tabContent">
          <div
            class="tab-pane fade show active v-pills-card"
            id="v-pills-home"
            role="tabpanel"
            aria-labelledby="v-pills-home-tab"
          >
            <div class="card">
              <div class="card-body">
                <div class="description stt-word">
                  <h4>{{ selectedMst.body.name }}</h4>
                  <span
                    class="span-html"
                    v-html="selectedMst.body.description"
                  ></span>
                  <p>
                    Short Description of the "Ground Truth Template" and
                    requirements,
                    <a
                      class="a-link"
                      @click="onGroundtruthInfo($event, selectedMst.body)"
                      style="pointer-events: none"
                      >link to more ground truth information</a
                    >.
                  </p>
                  <p>
                    <a
                      class="a-link"
                      @click="downloadGTTemplate($event, selectedMst.body)"
                      style="pointer-events: none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="currentColor"
                        class="bi bi-file-earmark-arrow-down-fill"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zm-1 4v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 11.293V7.5a.5.5 0 0 1 1 0z"
                        ></path>
                      </svg>
                      Download the Ground Truth Template
                    </a>
                  </p>

                  <!-- Parameter by seconds -->
                  <div
                    v-if="
                      selectedMst.detailBody &&
                        selectedMst.detailBody.name &&
                        selectedMst.detailBody.name.includes('by seconds')
                    "
                    class="form-group marg-t-2"
                  >
                    <h4>Parameters</h4>
                    <p>
                      Analysis threshold: the number of seconds buffer (float)
                      for counting a true positive (match between the ground
                      truth and MGM output). For example, a 2-second threshold
                      will consider a GT and MGM segment a match if both the
                      start and end times for each fall within 2 seconds of each
                      other.
                    </p>
                    <label for="description" class="sr-only">Parameters</label>
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
                        <span class="input-group-text" id="basic-addon2"
                          >seconds</span
                        >
                      </div>
                    </div>
                  </div>
                  <!-- Other parameters -->
                  <div v-else class="form-group marg-t-2">
                    <label for="descriptiona">Parameters</label>
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
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="output-select">
          <h3 class="m-b-0 m-t-0">Select MGM Outputs to Test</h3>
          <p class="m-b-0">
            Short description of the outputs and requirements,
            <a
              class="a-link"
              style="pointer-events: none"
              @click="selectOutputProcess"
              >link to more information on this process</a
            >.
          </p>
        </div>
        <WorkflowDashboard
          parent="NewTest"
          :workflowResultType="selectedMst.detailBody.workflowResultType"
        />

        <div class="card m-b-0 m-t-0 w-100 ml-3 mr-3">
          <div class="card-body">
            <h4 class="">
              Select Ground Truth<a
                class="a-link"
                style="pointer-events: none"
                @click="selectGroundtruth"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  class="bi bi-info-circle-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
                  ></path></svg
              ></a>
            </h4>
            <table id="reviewUpload" class="table fixed">
              <thead>
                <tr>
                  <th scope="col" class="slim-col-1">File</th>
                  <th scope="col" class="slim-col-2">MGM Output</th>
                  <th scope="col" class="slim-col-3">Ground Truth</th>
                  <th scope="col" class="text-right slim-col-4">
                    Upload/Select Ground Truth
                  </th>
                  <th scope="col" class="text-right slim-col-5">Remove Row</th>
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
            <button
              class="btn btn-primary btn-lg marg-tb-3 float-right"
              type="button"
              @click="onNewTestSubmit"
              disabled
            >
              Submit
            </button>
          </div>
        </div>
        <GroundTruthModal
          v-if="selectedRecord.id"
          :showModal="showModal"
          :mstDetails="selectedMst.detailBody"
          :selectedRecord="selectedRecord"
          @close="handleGroundTruthModal"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { sync } from "vuex-pathify";
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
    handleGroundTruthModal(record) {
      const self = this;
      self.showModal = !self.showModal;
      if (record && record.primaryfileId) {
        self.selectedRecord = record;
      } else {
        self.selectedRecord = {};
      }
    },
    onNewTestSubmit() {
      const self = this;
      console.log("Selected mgm Category:" + self.mgmCategory);
      console.log("Selected mst:" + self.selectedMst);
      console.log("Selected records:" + self.mgmEvaluation.selectedRecords);
      console.log("Parameters:" + self.testParams);
    },
    selectGroundtruth() {
      console.log("Clicked on selectGroundtruth!!");
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
    selectOutputProcess() {
      console.log("Clicked on selectOutputProcess!!");
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
</style>
