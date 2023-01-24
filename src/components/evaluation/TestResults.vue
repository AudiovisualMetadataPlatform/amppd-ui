<template>
  <div class="w-100">
    <loader :show="loading" />
    <h3 class="m-b-0 m-t-2 mt-1">
      {{ mgmCategory.name }}
      Test Results
    </h3>
    <select
      class="select custom-select mb-4 select-test"
      v-model="selectedMst.id"
      @change="onInputChange($event)"
      required
      ><option value="default" disabled selected>Select a test...</option>
      <option
        v-for="(mst, i) in sharedService.sortByAlphabatical(mgmCategory.msts)"
        :key="i"
        :value="mst.id"
        >{{ mst.name }}</option
      >
    </select>
    <div class="w-100" v-if="showTestResults">
      <WorkflowDashboard parent="TestResults" />
      <button
        class="btn btn-primary btn-lg marg-tb-3 float-right mt-3 mb-3"
        type="button"
        @click="onVisualize"
        :disabled="!mgmEvaluation.selectedRecords.length"
      >
        Visualize
      </button>
    </div>
  </div>
</template>

<script>
import { sync } from "vuex-pathify";
import Loader from "@/components/shared/Loader.vue";
import SharedService from "../../service/shared-service";
import EvaluationService from "../../service/evaluation-service";
import WorkflowDashboard from "@/components/dashboard/Dashboard.vue";

export default {
  name: "TestResults",
  components: {
    Loader,
    WorkflowDashboard,
  },
  data() {
    return {
      loading: false,
      sharedService: new SharedService(),
      evaluationService: new EvaluationService(),
      selectedMst: { id: "default", detailBody: {} },
      showTestResults: false,
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
    mgmCategoryId: {
      default: null,
    },
  },
  methods: {
    async onVisualize() {
      const self = this;
      let testResultIds = "";
      for (let testResult of self.mgmEvaluation.selectedRecords) {
        testResultIds =
          testResultIds === ""
            ? testResult.id
            : testResultIds + "," + testResult.id;
      }
      self.$router.push(
        `/mgm-evaluation/${self.mgmCategoryId}/${testResultIds}`
      );
    },
    async onInputChange(ev) {
      const self = this;
      self.workflowDashboard.loading = true;
      try {
        this.mgmEvaluation.selectedRecords = [];
        this.workflowDashboard.searchQuery.pageNum = 1;
        this.workflowDashboard.searchQuery.filterByStatuses = [];
        this.workflowDashboard.searchQuery.filterByTestStatus = ["SUCCESS"];
        this.workflowDashboard.searchQuery.sortRule.columnName = "id";
        this.workflowDashboard.searchQuery.sortRule.orderByDescending = true;
        this.workflowDashboard.searchQuery.filterByCategories = [
          this.mgmCategoryId,
        ];
        self.workflowDashboard.searchQuery.filterByMstTools = [
          self.selectedMst.id,
        ];
        self.workflowDashboard.searchResult = await self.evaluationService.getMgmEvaluationTestResults(
          self.workflowDashboard.searchQuery
        );
        self.showTestResults = true;
      } catch (error) {
        self.$bvToast.toast(
          "Oops! Something went wrong.",
          self.sharedService.erorrToastConfig
        );
        console.error(error.message);
      }
      self.workflowDashboard.loading = false;
    },
  },
  mounted() {
    this.workflowDashboard.searchQuery = {
      sortRule: {
        columnName: "dateCreated",
        orderByDescending: true,
      },
      pageNum: 1,
      resultsPerPage: 10,
      filterByDates: [],
      filterByTestDates: [],
      filterBySubmitters: [],
      filterByCollections: [],
      filterByUnits: [],
      filterByExternalIds: [],
      filterByItems: [],
      filterByFiles: [],
      filterByWorkflows: [],
      filterBySteps: [],
      filterByOutputs: [],
      filterByStatuses: [],
      filterBySearchTerms: [],
      filterByRelevant: true,
    };
  },
  beforeDestroy() {
    this.workflowDashboard.searchQuery.filterByMstTools = [];
    this.workflowDashboard.searchQuery.filterByTestDates = [];
    this.workflowDashboard.searchQuery.filterByTestStatus = [];
    this.workflowDashboard.searchQuery.filterByCategories = [];
    this.workflowDashboard.searchQuery.sortRule.columnName = "dateCreated";
    this.workflowDashboard.searchQuery.sortRule.orderByDescending = true;
    this.workflowDashboard.searchQuery.pageNum = 1;
  },
};
</script>

<style lang="css">
@import "/amppd-ui/src/styles/style.css";
.select-test {
  width: 33% !important;
}
</style>
