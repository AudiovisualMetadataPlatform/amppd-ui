<template>
  <div class="col-12 bg-light-gray-1">
    <main class="m-0">
      <loader :show="loading" />
      <div class="container col-12 p-0">
        <div class="row expand-h">
          <div class="col-12 p-0">
            <main class="ml-5 mr-5">
              <h1>MGM Test Results</h1>
              <b-overlay rounded="sm" class="mt-2">
                <div>
                  <div class="">
                    <b-navbar
                      id="pills-tab-1"
                      toggleable="lg"
                      type="dark"
                      class="mb-3 nav-pills"
                    >
                      <span
                        v-for="(item, i) in ['Review Scores', 'Review Ouputs']"
                        :key="i"
                      >
                        <b-nav-item
                          :class="selectedTab === i ? 'active' : ''"
                          @click="onChangeTab(i)"
                          >{{ item }}</b-nav-item
                        >
                      </span>
                    </b-navbar>

                    <dl
                      class="d-flex col-12 mt-3 mb-0 pr-0"
                      v-if="selectedTab === 0"
                    >
                      <div>Review Scores</div>
                    </dl>
                    <dl class="col-12 mt-3 mb-0 pr-0" v-else>
                      <div class="row">
                        <div class="col-3 pl-0">
                          <h2>Files</h2>
                          <form id="myForm">
                            <div class="scroll-div bg-white side-div">
                              <div
                                class="form-check mb-3"
                                v-for="testResult in mgmEvaluationTests"
                                :key="testResult.id"
                              >
                                <label class="form-check-label"
                                  ><input
                                    type="radio"
                                    class="form-check-input"
                                    name="optradio"
                                    v-model="selectedTestResult"
                                    :value="testResult"
                                  />{{ testResult.primaryFilename }}
                                </label>
                              </div>
                            </div>
                          </form>
                          <h2 class="mt-4">Scores</h2>
                          <div class="scroll-div bg-white side-div">
                            <table class="table small-text">
                              <tbody>
                                <tr>
                                  <td>&nbsp;Tool</td>
                                  <td>&nbsp;INA Speech Segmenter</td>
                                </tr>
                                <tr
                                  v-for="[key, value] of Object.entries(
                                    JSON.parse(selectedTestResult.scores).scores
                                  )"
                                  :key="key"
                                >
                                  <td>&nbsp;{{ key }}</td>
                                  <td>
                                    &nbsp;{{
                                      Number.isInteger(value)
                                        ? value
                                        : value.toFixed(2)
                                    }}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div class="col-9">
                          <div
                            id="myTable_wrapper"
                            class="dataTables_wrapper no-footer"
                          >
                            <div class="scrollingDiv">
                              <table
                                id="myTable-2"
                                data-detail-view="true"
                                class="table dataTable no-footer resultsTable myTable-2 small-text"
                                role="grid"
                                aria-describedby="myTable_info"
                              >
                                <thead>
                                  <tr role="row">
                                    <th
                                      data-sortable="true"
                                      data-field="file"
                                      class="sorting slim-col-2"
                                      tabindex="0"
                                      aria-controls="myTable-2"
                                      rowspan="1"
                                      colspan="1"
                                      aria-label="Unit: activate to sort column ascending"
                                      style="width: 163.688px"
                                      v-for="header in JSON.parse(
                                        selectedTestResult.scores
                                      ).headers"
                                      :key="header.field"
                                    >
                                      {{ header.label }}
                                      <button
                                        type="button"
                                        class="btn btn-link float-right data-pop"
                                        data-title="Filter GT Start"
                                        data-container="body"
                                        data-toggle="popover"
                                        data-placement="top"
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="16"
                                          height="16"
                                          fill="currentColor"
                                          class="bi bi-funnel-fill"
                                          viewBox="0 0 16 16"
                                        >
                                          <path
                                            d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z"
                                          />
                                        </svg>
                                      </button>
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr
                                    class="s0"
                                    dir="ltr"
                                    v-for="(comp, index) in JSON.parse(
                                      selectedTestResult.scores
                                    ).comparison"
                                    :key="index"
                                  >
                                    <td
                                      class="s0"
                                      dir="ltr"
                                      v-for="header in JSON.parse(
                                        selectedTestResult.scores
                                      ).headers"
                                      :key="header.field"
                                    >
                                      {{
                                        typeof comp[header.field] ===
                                          "number" &&
                                        !Number.isInteger(comp[header.field])
                                          ? comp[header.field].toFixed(2)
                                          : comp[header.field]
                                      }}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <div
                              class="dataTables_info"
                              id="myTable_info"
                              role="status"
                              aria-live="polite"
                            ></div>
                            <div
                              class="dataTables_paginate paging_simple_numbers"
                              id="myTable_paginate"
                            ></div>
                            <!-- <div class="card">
                                <div class="card-body">
                                  <h3>
                                    Tools
                                    <a href="#" class="float-right small">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        class="bi bi-cloud-arrow-down-fill"
                                        viewBox="0 0 16 16"
                                      >
                                        <path
                                          d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm2.354 6.854-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5a.5.5 0 0 1 1 0v3.793l1.146-1.147a.5.5 0 0 1 .708.708z"
                                        />
                                      </svg>
                                      Download
                                    </a>
                                  </h3>
                                  <ul>
                                    <li>
                                      <label
                                        class="form-check-label"
                                        for="flexRadioDefault1"
                                      >
                                        <input
                                          class="form-check-input"
                                          type="radio"
                                          name="flexRadioDefault"
                                          id="flexRadioDefault1"
                                        />
                                        INA Speech Segmenter (Threshold = 2
                                        second)
                                      </label>
                                    </li>
                                    <li>
                                      <label
                                        class="form-check-label"
                                        for="flexRadioDefault2"
                                      >
                                        <input
                                          checked
                                          class="form-check-input"
                                          type="radio"
                                          name="flexRadioDefault"
                                          id="flexRadioDefault2"
                                        />
                                        INA Speech Segmenter (Threshold = 4
                                        second)
                                      </label>
                                    </li>
                                  </ul>
                                </div>
                              </div> -->
                          </div>
                        </div>
                      </div>
                    </dl>
                  </div>
                </div>
              </b-overlay>
            </main>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { sync } from "vuex-pathify";
import Loader from "@/components/shared/Loader.vue";
import SharedService from "@/service/shared-service";
import EvaluationService from "@/service/evaluation-service";

export default {
  name: "TestResultsVisualiz",
  components: {
    Loader,
  },
  data() {
    return {
      loading: false,
      sharedService: new SharedService(),
      evaluationService: new EvaluationService(),
      selectedTab: 0,
      activeTab: "review-scores",
      mgmEvaluationTests: [],
      selectedTestResult: {},
    };
  },
  computed: {
    mgmEvaluation: sync("mgmEvaluation"),
  },
  props: {},
  methods: {
    onChangeTab(index) {
      const self = this;
      self.selectedTab = index;
      if (index === 1) {
        self.activeTab = "review-ouputs";
      } else {
        self.activeTab = "review-scores";
      }
    },
    async networkCalls(testResultIds) {
      const self = this;
      self.loading = true;
      try {
        const mgmReviewOutput = await self.evaluationService.getMgmReviewOutput(
          testResultIds
        );
        self.mgmEvaluationTests =
          mgmReviewOutput.data._embedded.mgmEvaluationTests;
        self.selectedTestResult = self.mgmEvaluationTests[0];
      } catch (error) {
        self.$bvToast.toast(
          "Oops! Something went wrong.",
          self.sharedService.erorrToastConfig
        );
        console.error(error.message);
      }
      self.loading = false;
    },
  },
  mounted() {
    const self = this;
    self.testResultIds = self.$route.params.testResultIds;
    if (self.testResultIds) {
      self.networkCalls(self.testResultIds);
    }
  },
  beforeDestroy() {},
};
</script>

<style lang="css">
@import "/amppd-ui/src/styles/style.css";
nav.nav-pills {
  justify-content: flex-start !important;
  padding: 0.4rem !important;
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
.nav-pills .nav-link {
  border-radius: 0.25rem;
}
a:hover {
  color: #f4871e !important;
  text-decoration: none;
}

.action-btn-grp {
  padding: 8px !important;
}
.btn-new-test {
  margin-right: 40px;
}
.a-link:hover {
  cursor: pointer;
}
.active-tab {
  background: #153c4d !important;
  color: white !important;
  border-color: #153c4d !important;
}
.scrollingDiv {
  height: 600px;
  overflow-y: scroll;
}
.side-div {
  height: 15rem;
}
.small-text {
  font-size: 0.85em;
}
</style>
