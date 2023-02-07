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
                        v-for="(item, i) in ['Review Scores', 'Review Outputs']"
                        :key="i"
                      >
                        <b-nav-item
                          :class="selectedResultTab === i ? 'active' : ''"
                          @click="onChangeResultTab(i)"
                          >{{ item }}</b-nav-item
                        >
                      </span>
                    </b-navbar>

                    <dl
                      class="d-flex col-12 mt-3 mb-0 pr-0 pl-0"
                      v-if="selectedResultTab === 0"
                    >
                      <div class="w-100">
                        <div>
                          <h2>{{ selectedTestResult.categoryName }}</h2>
                          <p>
                            {{ selectedTestResult.scoreDescription }}
                          </p>
                        </div>
                        <div class="row">
                          <div class="col-3">
                            <h2>Files</h2>
                            <div class="scroll-div bg-white h-300">
                              <ul class="list-unstyled">
                                <li
                                  class="mt-3"
                                  v-for="testResult in mgmEvaluationTests"
                                  :key="testResult.id"
                                >
                                  <h6>
                                    <a
                                      class="scores-files"
                                      v-bind:href="
                                        workflowResultService.getSourceUrl(
                                          testResult.workflowResult
                                            .primaryfileId
                                        )
                                      "
                                      target="_blank"
                                      >{{ testResult.primaryFilename }}</a
                                    >
                                    (<a
                                      class="scores-files"
                                      v-bind:href="
                                        workflowResultService.getOutputUrl(
                                          testResult.workflowResult.id
                                        )
                                      "
                                      target="_blank"
                                      >{{
                                        humanize(
                                          testResult.workflowResult.workflowStep
                                        )
                                      }}</a
                                    >)
                                  </h6>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div class="col-9">
                            <div class="">
                              <b-navbar
                                id="pills-tab-1"
                                toggleable="lg"
                                type="dark"
                                class="mb-3 nav-pills"
                              >
                                <span
                                  v-for="(item, i) in ['Bar chart', 'Table']"
                                  :key="i"
                                  class="nav-item mr-3"
                                >
                                  <button
                                    class="nav-link"
                                    id="pills-table-tab"
                                    :class="
                                      selectedScoreTab === i
                                        ? 'active-score'
                                        : ''
                                    "
                                    @click="onChangeScoreTab(i)"
                                  >
                                    {{ item }}
                                  </button>
                                </span>
                              </b-navbar>
                              <dl
                                class="col-12 mt-4 mb-0 pr-0"
                                v-if="selectedScoreTab === 0"
                              >
                                <BarChart
                                  v-if="barChartData.labels.length"
                                  :data="barChartData"
                                />
                              </dl>
                              <dl class="col-12 mt-4 mb-0 pr-0" v-else>
                                <div class="table-responsive scrollingTable">
                                  <table
                                    class="table table-bordered review-scores-table p-0 small-text"
                                  >
                                    <thead>
                                      <tr>
                                        <th scope="col">File</th>
                                        <th scope="col">Tool</th>
                                        <th
                                          scope="col"
                                          v-for="parameter in sharedService
                                            .sortByAlphabatical(
                                              JSON.parse(
                                                selectedTestResult.parameters
                                              )
                                            )
                                            .reverse()"
                                          :key="parameter.id"
                                        >
                                          Parameter<br />({{ parameter.name }})
                                        </th>
                                        <th
                                          scope="col"
                                          v-for="[key] of Object.entries(
                                            JSON.parse(
                                              selectedTestResult.scores
                                            ).scores
                                          )"
                                          :key="key"
                                        >
                                          {{ key }}
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr
                                        v-for="testResult in mgmEvaluationTests"
                                        :key="testResult.id"
                                      >
                                        <th scope="row">
                                          {{ testResult.primaryFilename }}
                                        </th>
                                        <td>
                                          {{
                                            humanize(
                                              testResult.workflowResult
                                                .workflowStep
                                            )
                                          }}
                                        </td>
                                        <td
                                          v-for="parameter in sharedService
                                            .sortByAlphabatical(
                                              JSON.parse(testResult.parameters)
                                            )
                                            .reverse()"
                                          :key="parameter.id"
                                        >
                                          {{
                                            typeof parameter.value !== "string"
                                              ? parameter.value.reduce(
                                                  (accumulator, currentValue) =>
                                                    accumulator +
                                                    ", " +
                                                    currentValue
                                                )
                                              : parameter.value
                                          }}
                                        </td>
                                        <td
                                          v-for="(score, index) in JSON.parse(
                                            testResult.scores
                                          ).scores"
                                          :key="index"
                                        >
                                          {{
                                            typeof score === "number" &&
                                            !Number.isInteger(score)
                                              ? score.toFixed(2)
                                              : score
                                          }}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </dl>
                            </div>
                            <div class="tab-content" id="pills-tabContent-2">
                              <!-- <div class="card">
                                <div class="card-body">
                                  <h3>
                                    Tools<a href="#" class="float-right small"
                                      ><svg
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
                                      Download</a
                                    >
                                  </h3>
                                  <ul>
                                    <li>
                                      INA Speech Segmenter (Threshold = 2
                                      second)
                                    </li>
                                  </ul>
                                </div>
                              </div> -->
                            </div>
                          </div>
                        </div>
                      </div>
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
                              <tbody class="scores">
                                <tr>
                                  <td>&nbsp;Tool</td>
                                  <td>
                                    {{
                                      humanize(
                                        selectedTestResult.workflowResult
                                          .workflowStep
                                      )
                                    }}
                                  </td>
                                </tr>
                                <tr
                                  v-for="parameter in sharedService
                                    .sortByAlphabatical(
                                      JSON.parse(selectedTestResult.parameters)
                                    )
                                    .reverse()"
                                  :key="parameter.id"
                                >
                                  <td>&nbsp;{{ parameter.name }}</td>
                                  <td>
                                    &nbsp;{{
                                      typeof parameter.value !== "string"
                                        ? parameter.value.reduce(
                                            (accumulator, currentValue) =>
                                              accumulator + ", " + currentValue
                                          )
                                        : parameter.value
                                    }}
                                  </td>
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
                                      typeof value === "number" &&
                                      !Number.isInteger(value)
                                        ? value.toFixed(2)
                                        : value
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
                                    <sortable-header
                                      v-for="header in JSON.parse(
                                        selectedTestResult.scores
                                      ).headers"
                                      :key="header.field"
                                      v-bind:id="header.field"
                                      :property-name="header.field"
                                      :sort-rule="sortRule"
                                      @sort="sortQuery"
                                      :label="header.label"
                                    >
                                      <!-- <button
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
                                      </button> -->
                                    </sortable-header>
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
import BarChart from "./BarChart.vue";
import SortableHeader from "@/components/shared/SortableHeader";
import WorkflowResultService from "@/service/workflow-result-service";

export default {
  name: "TestResultsVisualiz",
  components: {
    Loader,
    BarChart,
    SortableHeader,
  },
  data() {
    return {
      loading: false,
      sharedService: new SharedService(),
      evaluationService: new EvaluationService(),
      workflowResultService: new WorkflowResultService(),
      selectedResultTab: 0,
      selectedScoreTab: 0,
      activeResultTab: "review-scores",
      activeScoreTab: "bar-chart",
      mgmEvaluationTests: [],
      selectedTestResult: {},
      barChartData: {
        labels: [],
        datasets: [],
      },
      sortRule: {
        columnName: "",
        orderByDescending: true,
      },
    };
  },
  computed: {
    mgmEvaluation: sync("mgmEvaluation"),
  },
  props: {},
  methods: {
    humanize(str) {
      let i,
        frags = str.split("_");
      for (i = 0; i < frags.length; i++) {
        frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
      }
      return frags.join(" ");
    },
    refreshData() {
      const self = this;
      let scores = JSON.parse(self.selectedTestResult.scores);
      scores.comparison = this.sharedService.multiTypeSorting(
        scores.comparison,
        self.sortRule.columnName,
        self.sortRule.orderByDescending
      );
      self.selectedTestResult.scores = JSON.stringify(scores);
    },
    async sortQuery(sortRule) {
      this.sortRule = sortRule;
      this.refreshData();
    },
    onChangeScoreTab(index) {
      const self = this;
      self.selectedScoreTab = index;
      if (index === 1) {
        self.activeScoreTab = "table";
      } else {
        self.activeScoreTab = "bar-chart";
      }
    },
    onChangeResultTab(index) {
      const self = this;
      self.selectedResultTab = index;
      if (index === 1) {
        self.activeResultTab = "review-ouputs";
      } else {
        self.activeResultTab = "review-scores";
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

        //Structure of bar chart data
        self.barChartData = {
          labels: Object.keys(
            JSON.parse(self.selectedTestResult.scores).scores
          ),
          datasets: [],
        };
        for (let i = 0; i < self.mgmEvaluationTests.length; i++) {
          self.barChartData.datasets.push({
            label: self.mgmEvaluationTests[i].primaryFilename,
            backgroundColor: `rgba(${Math.floor(
              Math.random() * 256
            )}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
              Math.random() * 256
            )}, 0.66)`,
            data: Object.values(
              JSON.parse(self.mgmEvaluationTests[i].scores).scores
            ),
          });
        }

        //Set sorting order
        self.sortRule.columnName = JSON.parse(
          self.selectedTestResult.scores
        ).headers[0].field;
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
.active-score {
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
  overflow-y: auto;
}
.scrollingTable {
  height: 48vh;
  overflow-y: auto;
}
.side-div {
  height: 15rem;
}
.small-text {
  font-size: 0.85em;
}
.scores > tr:first-child > td {
  border: none;
}
.scores-files {
  color: black !important;
}
.scores-files:hover {
  cursor: pointer;
  text-decoration: underline;
  color: #f4871e !important;
}
</style>
