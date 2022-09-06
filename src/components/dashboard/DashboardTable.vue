<template>
  <div class="dataTables_wrapper no-footer">
    <loader :show="workflowDashboard.loading" />
    <div v-if="parent !== 'NewTest'" class="export-row">
      <input
        id="export-results"
        type="button"
        class="btn btn-outline-primary btn-sm"
        v-on:click="exportResults"
        value="Export to CSV"
      />
    </div>

    <div class="row col-12 p-0 m-0">
      <div
        class="
          col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12
          dataTables_length
          mt-1
        "
      >
        <!-- <label>Show <select name="myTable_length" v-model="workflowDashboard.searchQuery.resultsPerPage" aria-controls="myTable" class="">
      <option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select>
      Entries
        </label>-->
        <label>
          Show
          <select
            name="myTable_length"
            v-model="workflowDashboard.searchQuery.resultsPerPage"
            aria-controls="myTable"
            class
            @change="
              refreshData();
              updateUserValues();
            "
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          Entries
        </label>
        <!-- <span class="txt-v"> Show Relevant Results Only </span>
    <label class="switch" title="Relevant Result"><span class="sr-only">Relevant Result</span>
      <input type="checkbox" v-model="workflowDashboard.searchQuery.filterByRelevant">
      <span class="slider round"></span>
        </label>-->
      </div>
      <b-pagination
        class="col-xl-6 col-lg-6 col-md-6 col-sm-12 w-100 mt-1"
        v-model="workflowDashboard.searchQuery.pageNum"
        :total-rows="workflowDashboard.searchResult.totalResults"
        :per-page="workflowDashboard.searchQuery.resultsPerPage"
        @change="paginate($event)"
        size="sm"
        align="center"
        first-number
        limit="9"
        last-number
        prev-text="Prev"
        next-text="Next"
      ></b-pagination>
      <search-filter
        class="col-xl-3 col-md-3 col-sm-12 col-xs-12 pr-0 justify-content-right"
      />
    </div>
    <!-- <div class="relevant-togggle"><span class="txt-v">Show Relevant Results Only</span>
    <label class="switch" title="Relevant Result"><span class="sr-only">Relevant Result</span>
      <input type="checkbox" v-model="workflowDashboard.searchQuery.filterByRelevant">
      <span class="slider round"></span>
    </label>
    </div>-->

    <br />

    <div
      class="table-responsive"
      :class="parent === 'NewTest' ? 'table-gap' : ''"
    >
      <table id="myTable" class="table dataTable no-footer">
        <thead>
          <tr v-if="parent === 'NewTest'">
            <th
              scope="col"
              class="btn-header"
              v-for="column in columns"
              :key="column.field"
            >
              <span class="col-title new-test-column">{{ column.label }}</span>
            </th>
          </tr>
          <tr v-else>
            <sortable-header
              class="btn-header"
              v-for="column in columns"
              :key="column.field"
              :property-name="column.field"
              :sort-rule="workflowDashboard.searchQuery.sortRule"
              @sort="sortQuery"
              v-bind:id="column.field"
            >
              <div
                v-if="column.field === 'dateCreated'"
                class="dateColumnHead"
              />
              <button
                class="btn-slim"
                data-toggle="tooltip"
                data-placement="top"
                v-bind:title="'Show/Hide ' + column.label + ' Column'"
                v-if="
                  column.field === 'dateCreated' ||
                    column.field === 'submitter' ||
                    column.field === 'unit' ||
                    column.field === 'collectionName' ||
                    column.field === 'externalId' ||
                    column.field === 'workflowName'
                "
                v-on:click="(event) => showHideColumn(event, column.field)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-arrows-collapse"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8zm7-8a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 4.293V.5A.5.5 0 0 1 8 0zm-.5 11.707-1.146 1.147a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 11.707V15.5a.5.5 0 0 1-1 0v-3.793z"
                  />
                </svg>
              </button>
              <span class="col-title">{{ column.label }}</span>
            </sortable-header>
          </tr>
        </thead>
        <tbody v-if="visibleRows && visibleRows.length > 0">
          <tr
            v-for="rec in visibleRows"
            :key="rec.id"
            :class="{
              'selected-mgm-outputs': isSelected(rec.id),
            }"
          >
            <td v-if="!collapsedColumns.dateCreated">
              {{ new Date(rec.dateCreated) | LOCAL_DATE_VALUE }}
            </td>
            <td v-else class="collapsedColumn"></td>
            <td v-if="!collapsedColumns.submitter">{{ rec.submitter }}</td>
            <td v-else class="collapsedColumn"></td>
            <td v-if="!collapsedColumns.unit">{{ rec.unitName }}</td>
            <td v-else class="collapsedColumn"></td>
            <td v-if="!collapsedColumns.collectionName">
              {{ rec.collectionName }}
            </td>
            <td v-else class="collapsedColumn"></td>
            <td>{{ rec.externalSource }}</td>
            <td v-if="!collapsedColumns.externalId">{{ rec.externalId }}</td>
            <td v-else class="collapsedColumn"></td>
            <td>{{ rec.itemName }}</td>
            <td>
              <a
                v-bind:href="
                  workflowResultService.getSourceUrl(rec.primaryfileId)
                "
                target="_blank"
                >{{ rec.primaryfileName }}</a
              >
            </td>
            <td v-if="!collapsedColumns.workflowName">
              {{ rec.workflowName }}
            </td>
            <td v-else class="collapsedColumn"></td>
            <td>{{ rec.workflowStep }}</td>
            <td v-if="rec.outputPath != null && rec.status == 'COMPLETE'">
              <a
                v-bind:href="workflowResultService.getOutputUrl(rec.id)"
                target="_blank"
                class="complete-output"
                >{{ rec.outputName }}</a
              >
            </td>
            <td v-else>{{ rec.outputName }}</td>
            <td v-if="parent !== 'NewTest'">
              <button
                v-if="rec.status === 'COMPLETE'"
                type="button"
                class="btn-sm btn btn-success eq-width"
              >
                Complete
              </button>
              <button
                v-else-if="rec.status === 'IN_PROGRESS'"
                type="button"
                class="btn-sm btn btn-warning eq-width"
              >
                In Progress
              </button>
              <button
                v-else-if="rec.status === 'PAUSED'"
                type="button"
                class="btn-sm btn btn-primary eq-width"
              >
                Paused
              </button>
              <button
                v-else-if="rec.status === 'ERROR'"
                type="button"
                class="btn-sm btn btn-danger eq-width"
              >
                Error
              </button>
              <button
                v-else-if="rec.status === 'SCHEDULED'"
                type="button"
                class="btn-sm btn btn-blue eq-width"
              >
                Scheduled
              </button>
              <button
                v-else-if="rec.status === 'DELETED'"
                type="button"
                class="btn-sm btn eq-width"
              >
                Deleted
              </button>
            </td>
            <td v-if="parent === 'NewTest'" class="text-center slim-col-14">
              <input
                class="add-to-test-checkbox"
                type="checkbox"
                v-model="mgmEvaluation.selectedRecords"
                :value="rec"
              />
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td v-if="workflowDashboard.loading" colspan="8" class="no-results">
              <i class="fas fa-cog fa-spin"></i> Loading
            </td>
            <td v-else colspan="8" class="no-results">No results</td>
          </tr>
        </tbody>
      </table>
      <!-- <pagination v-if="this.workflowDashboard.searchQuery"
          :pageNum="workflowDashboard.searchQuery.pageNum"
          :resultsPerPage="resultsPerPage"
          :totalResults="filteredRows.length"
          :maxPages="1"
      @paginate="paginate" />-->
      <div class="row col-12 p-0 m-0">
        <div class="col-2 col-md-2 col-sm-2 col-xs-12">
          <div class="dataTables_info">
            <label>{{ totalText }}</label>
          </div>
        </div>
        <div class="col-8 col-md-8 col-sm-8 col-xs-12 w-100">
          <b-pagination
            class="mt-3 justify-content-left"
            v-model="workflowDashboard.searchQuery.pageNum"
            :total-rows="workflowDashboard.searchResult.totalResults"
            :per-page="workflowDashboard.searchQuery.resultsPerPage"
            @change="paginate($event)"
            size="sm"
            align="center"
            first-number
            limit="9"
            last-number
            prev-text="Prev"
            next-text="Next"
          ></b-pagination>
        </div>
        <div class="col-2 col-md-2 col-sm-2 col-xs-12"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { sync } from "vuex-pathify";
import WorkflowResultService from "../../service/workflow-result-service";
import SortableHeader from "../shared/SortableHeader";
import Pagination from "../shared/Pagination";
import SearchFilter from "./DashboardFilters/SearchFilter";
import Loader from "@/components/shared/Loader.vue";
import SharedService from "../../service/shared-service";

export default {
  name: "DashboardTable",
  components: {
    SortableHeader,
    Pagination,
    Loader,
    SearchFilter,
  },
  data() {
    return {
      columns: [
        { label: "Date", field: "dateCreated" },
        { label: "Submitter", field: "submitter" },
        { label: "Unit", field: "unit" },
        { label: "Collection", field: "collectionName" },
        { label: "External Source", field: "externalSource" },
        { label: "External ID", field: "externalId" },
        { label: "Item", field: "itemName" },
        { label: "Primaryfile", field: "primaryfileName" },
        { label: "Workflow", field: "workflowName" },
        { label: "Step", field: "workflowStep" },
        { label: "Output", field: "outputName" },
        { label: "Status", field: "status" },
        { label: "Add to Test", field: "addToTest" },
      ],
      workflowResultService: new WorkflowResultService(),
      sharedService: new SharedService(),
      collapsedColumns: {
        dateCreated: false,
        submitter: false,
        unit: false,
        collectionName: false,
        externalId: false,
        workflowName: false,
      },
    };
  },
  computed: {
    mgmEvaluation: sync("mgmEvaluation"),
    workflowDashboard: sync("workflowDashboard"),
    filterByCollections: sync(
      "workflowDashboard.searchQuery.filterByCollections"
    ),
    filterByUnits: sync("workflowDashboard.searchQuery.filterByUnits"),
    filterByWorkflows: sync("workflowDashboard.searchQuery.filterByWorkflows"),
    filterByOutputs: sync("workflowDashboard.searchQuery.filterByOutputs"),
    filterByStatuses: sync("workflowDashboard.searchQuery.filterByStatuses"),
    filterBySearchTerms: sync(
      "workflowDashboard.searchQuery.filterBySearchTerms"
    ),
    filterByRelevant: sync("workflowDashboard.searchQuery.filterByRelevant"),
    filterBySteps: sync("workflowDashboard.searchQuery.filterBySteps"),
    filterByExternalIds: sync(
      "workflowDashboard.searchQuery.filterByExternalIds"
    ),
    filterByDates: sync("workflowDashboard.searchQuery.filterByDates"),
    filterBySubmitters: sync(
      "workflowDashboard.searchQuery.filterBySubmitters"
    ),
    filterByItems: sync("workflowDashboard.searchQuery.filterByItems"),
    filterByFiles: sync("workflowDashboard.searchQuery.filterByFiles"),

    visibleRows() {
      let self = this;
      var from =
        (this.workflowDashboard.searchQuery.pageNum - 1) *
        this.workflowDashboard.searchQuery.resultsPerPage;
      var to =
        this.workflowDashboard.searchQuery.pageNum *
        this.workflowDashboard.searchQuery.resultsPerPage;
      if (
        !this.workflowDashboard.searchResult.rows ||
        this.workflowDashboard.searchResult.rows.length <= 0
      ) {
        return this.workflowDashboard.searchResult.rows;
      }

      return this.workflowDashboard.searchResult.rows;
    },
    totalText() {
      let total = this.workflowDashboard.searchResult.totalResults;
      let start =
        this.workflowDashboard.searchQuery.pageNum > 1
          ? (this.workflowDashboard.searchQuery.pageNum - 1) *
              this.workflowDashboard.searchQuery.resultsPerPage +
            1
          : total === 0
          ? 0
          : 1;
      let end =
        this.workflowDashboard.searchQuery.pageNum *
        this.workflowDashboard.searchQuery.resultsPerPage;
      end = end > total ? total : end;
      return `Showing ${start} - ${end} of ${total}`;
    },
  },
  props: {
    parent: {
      default: "",
    },
    workflowResultType: {
      default: "",
    },
  },
  methods: {
    isSelected(recId) {
      const selctedRecordIds = this.mgmEvaluation.selectedRecords.map(
        (record) => record.id
      );
      if (selctedRecordIds.indexOf(recId) !== -1) {
        return true;
      } else {
        return false;
      }
    },
    async sortQuery(sortRule) {
      this.workflowDashboard.searchQuery.sortRule = sortRule;
      this.workflowDashboard.searchQuery.pageNum = 1;
      this.refreshData();
    },
    getDateString() {
      const date = new Date();
      const year = date.getFullYear();
      const month = `${date.getMonth() + 1}`.padStart(2, "0");
      const day = `${date.getDate()}`.padStart(2, "0");
      return `${year}${month}${day}`;
    },
    async exportResults() {
      console.log("export results");
      console.log(event.target);
      var content = await this.workflowResultService.exportWorkflowResults(
        this.workflowDashboard.searchQuery
      );
      var uriContent = encodeURIComponent(content);

      var link = document.createElement("a");
      var dateString;
      link.download = "AMPDashboardExport_" + this.getDateString() + ".csv";
      link.href = "data:text/csv," + uriContent;
      link.click();
    },
    showHideColumn(event, field) {
      event.stopPropagation();
      let columnHTMLs = document.getElementsByClassName("btn-header");
      let currentColumnHTML;
      for (let i = 0; i < columnHTMLs.length; i++) {
        if (columnHTMLs[i].id === field) {
          currentColumnHTML = columnHTMLs[i];
        }
      }
      let classes = Array.from(currentColumnHTML.classList);
      let index = classes.indexOf("slim");
      if (index === -1) {
        currentColumnHTML.classList.add("slim");
      } else {
        currentColumnHTML.classList.remove("slim");
      }
      this.collapsedColumns[field] = !this.collapsedColumns[field];
    },
    paginate(page_number) {
      this.workflowDashboard.searchQuery.pageNum = page_number;
      this.refreshData();
    },
    async refreshData() {
      const self = this;
      self.workflowDashboard.loading = true;
      self.workflowDashboard.searchResult = await this.workflowResultService.getWorkflowResults(
        this.workflowDashboard.searchQuery
      );
      self.workflowDashboard.loading = false;
    },
    updateUserValues() {
      const self = this;
      self.sharedService.setUserValues(
        "limit",
        self.workflowDashboard.searchQuery.resultsPerPage
      );
    },
  },
  async mounted() {
    if (this.parent === "NewTest") {
      this.$emit("clearAll");
      this.columns = this.columns.filter((column) => column.field !== "status");
      this.workflowDashboard.searchQuery.pageNum = 1;
      this.workflowDashboard.searchQuery.filterByTypes = [
        this.workflowResultType,
      ];
      this.workflowDashboard.searchQuery.filterByStatuses = ["COMPLETE"];
    } else {
      this.columns = this.columns.filter(
        (column) => column.field !== "addToTest"
      );
      this.workflowDashboard.searchQuery.filterByTypes = [];
      this.$emit("clearAll");
    }

    const limit = this.sharedService.getUserValue("limit");
    this.workflowDashboard.searchQuery.resultsPerPage = limit
      ? limit
      : this.workflowDashboard.searchQuery.resultsPerPage;
    this.refreshData();

    let dateColumnHeadHTML = document.getElementsByClassName("btn-slim")[0];
    dateColumnHeadHTML.style.left = 0;
  },
  watch: {
    filterByDates: function() {
      // console.log("inside watcher for filterByDates",this.filterByDates[0]," ",this.filterByDates[1]);
      this.workflowDashboard.searchQuery.pageNum = 1;
      this.refreshData();
    },
    filterBySubmitters: function() {
      this.workflowDashboard.searchQuery.pageNum = 1;
      this.refreshData();
    },
    filterByCollections: function() {
      this.workflowDashboard.searchQuery.pageNum = 1;
      this.refreshData();
    },
    filterByUnits: function() {
      this.workflowDashboard.searchQuery.pageNum = 1;
      this.refreshData();
    },
    filterByExternalIds: function() {
      this.workflowDashboard.searchQuery.pageNum = 1;
      this.refreshData();
    },
    filterByItems: function() {
      this.workflowDashboard.searchQuery.pageNum = 1;
      this.refreshData();
    },
    filterByFiles: function() {
      this.workflowDashboard.searchQuery.pageNum = 1;
      this.refreshData();
    },
    filterByWorkflows: function() {
      this.workflowDashboard.searchQuery.pageNum = 1;
      this.refreshData();
    },
    filterBySteps: function() {
      this.workflowDashboard.searchQuery.pageNum = 1;
      this.refreshData();
    },
    filterByOutputs: function() {
      this.workflowDashboard.searchQuery.pageNum = 1;
      this.refreshData();
    },
    filterByStatuses: function() {
      this.workflowDashboard.searchQuery.pageNum = 1;
      this.refreshData();
    },
    filterBySearchTerms: function() {
      this.workflowDashboard.searchQuery.pageNum = 1;
      this.refreshData();
    },
    filterByRelevant: function() {
      this.workflowDashboard.searchQuery.pageNum = 1;
      this.refreshData();
    },
    workflowResultType: function() {
      this.columns = this.columns.filter((column) => column.field !== "status");
      this.workflowDashboard.searchQuery.pageNum = 1;
      this.workflowDashboard.searchQuery.filterByTypes = [
        this.workflowResultType,
      ];
      this.workflowDashboard.searchQuery.filterByStatuses = ["COMPLETE"];
    },
  },
  beforeDestroy() {
    this.workflowDashboard.searchResult.rows = [];
    this.workflowDashboard.searchQuery.pageNum = 1;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "/amppd-ui/src/styles/style.css";
.no-results {
  text-align: center;
  font-weight: 700;
  color: #c5c5c5c5;
}
.table-responsive {
  padding-top: 0;
}
table {
  font-size: 0.8em;
  table-layout: fixed;
}
.font-light-gray-1 {
  color: #dee2e6;
}
.font-purple-1 {
  color: #6f42c1;
}
th {
  padding: 10px 18px;
  border-bottom: 1px solid #111 !important;
}
#export-results {
  width: 200px;
  margin: 10px 0 10px 15px;
}
.export-row {
  display: flex;
  justify-content: flex-end;
}
.relevant-togggle {
  /* z-index: 1001; */
  display: flex;
  justify-content: space-around;
  position: absolute;
  top: 0;
  /* left: 170px; */
}
.btn-blue:hover,
.btn-blue:active,
.btn-blue:visited {
  background-color: #006de2 !important;
  border-color: #006de2 !important;
  cursor: auto;
}
.btn-success:hover,
.btn-success:active,
.btn-success:visited {
  background-color: #28a745 !important;
  border-color: #28a745 !important;
  cursor: auto;
}
.btn-danger:hover,
.btn-danger:active,
.btn-danger:visited {
  background-color: #dc3545 !important;
  border-color: #dc3545 !important;
  cursor: auto;
}
.btn-primary:hover,
.btn-primary:active,
.btn-primary:visited {
  background-color: #f4871e !important;
  border-color: #f4871e !important;
  color: #153c4d !important;
  cursor: auto;
}
.table thead th {
  vertical-align: middle !important;
}
.justify-content-right {
  justify-content: right;
}
.btn-slim:hover,
.btn-slim:active,
.btn-slim:focus {
  background-color: transparent;
  border: none;
  outline: none;
}
.btn-header {
  position: relative;
}
.btn-slim {
  position: absolute;
  left: -15px;
  cursor: pointer;
  border: none;
  background-color: transparent;
  display: none;
}
.slim .btn-slim {
  left: 10%;
  right: 10%;
}
.slim .btn-slim svg {
  fill: #153c4d;
}
th.slim .btn-slim,
th:hover .btn-slim {
  display: block;
}
.btn-slim svg {
  transform: rotate(90deg) scale(1.5, 1.5);
  fill: #f4871e;
}
#myTable td.slim span,
#myTable .slim .col-title {
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
  visibility: hidden;
  display: none;
}
.collapsedColumn,
.slim {
  background: #fafafa;
  width: 15px;
}
.dateColumnHead {
  width: 15px;
  background: transparent;
}
.table-gap {
  margin-top: -20px !important;
  overflow-y: hidden;
}
.add-to-test-checkbox {
  width: 28px;
  height: 28px;
}
.new-test-column {
  font-size: 14px;
}
.selected-mgm-outputs {
  background-color: #fef4ea;
}
</style>
