<template>
  <div class="dataTables_wrapper no-footer">
    <loader :show="workflowDashboard.loading" />
    <div v-if="parent !== 'Deliverables'" class="col d-flex flex-wrap px-2 justify-content-between">
      <div class="dataTables_length my-auto">
        <label class="ps-1">
          Show 
          <select
            name="myTable_length"
            v-model="workflowDashboard.searchQuery.resultsPerPage"
            aria-controls="myTable"
            @change="
              refreshData();
              updateUserValues();
            ">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          Entries 
        </label>
      </div>
      <pagination
        :pageNum="workflowDashboard.searchQuery.pageNum"
        :resultsPerPage="Number.parseInt(workflowDashboard.searchQuery.resultsPerPage)"
        :totalResults="workflowDashboard.searchResult.totalResults"
        :maxPages="9"
        @paginate="paginate"
        :showTotalText="false"
      />
      <slot name="show-hide-columns"></slot>
    </div>

    <div class="table-responsive">
      <table id="myTable" class="table dataTable no-footer">
        <thead>
          <tr v-if="parent === 'NewTest' || parent === 'TestResults'">
            <th
              scope="col"
              v-for="column in columns"
              :key="column.field"
              :class="{ 'text-center': column.field === 'addToTest' }"
            >
              <span class="col-title new-test-column">{{ column.label }}</span>
            </th>
          </tr>
          <tr v-else>
            <sortable-header
              v-for="column in columns"
              :key="column.field"
              v-bind:id="column.field"
              :property-name="column.field"
              :sort-rule="workflowDashboard.searchQuery.sortRule"
              @sort="sortQuery"
              :label="column.label"
            />
          </tr>
        </thead>
        <tbody v-if="visibleRows && visibleRows.length > 0">
          <tr
            v-for="rec in visibleRows"
            :key="rec.id"
            :class="{
              'selected-mgm-outputs':
                (parent === 'NewTest' || parent === 'TestResults') &&
                isSelected(rec.id),
            }"
          >
            <td v-if="checkAvailability('testDate')">
              {{ $filters.localDate(new Date(rec.testDate)) }}
            </td>
            <td v-if="checkAvailability('dateCreated')">
              {{ $filters.localDate(new Date(rec.dateCreated)) }}
            </td>
            <td v-if="checkAvailability('submitter')">{{ rec.submitter }}</td>
            <td v-if="checkAvailability('unit')">{{ rec.unitName }}</td>
            <td v-if="checkAvailability('collectionName')">
              {{ rec.collectionName }}
            </td>
            <td v-if="checkAvailability('externalSource')">
              {{ rec.externalSource }}
            </td>
            <td v-if="checkAvailability('externalId')">{{ rec.externalId }}</td>
            <td v-if="checkAvailability('itemName')">{{ rec.itemName }}</td>
            <td v-if="checkAvailability('primaryfileName')">
              <a            
                v-if="canAccessLink(rec, true)"
                @click="workflowResultService.getSymlinkContent(rec, false, parent, $event)"
                target="_blank"
                class="complete-output"              
                >{{ rec.primaryfileName }}
              </a>
              <span v-else>{{ rec.primaryfileName }}</span>
            </td>
            <td v-if="checkAvailability('workflowName')">
              {{ rec.workflowName }}
            </td>
            <td v-if="checkAvailability('workflowStep')">
              {{ rec.workflowStep }}
            </td>
            <td v-if="checkAvailability('outputName')">            
              <a v-if="canAccessLink(rec, false) && outputReady(rec)"
                @click="workflowResultService.getSymlinkContent(rec, true, parent, $event)"                
                target="_blank"
                class="complete-output">
                {{ rec.outputName }}
              </a>
              <a v-else-if="canAccessLink(rec, false)"
                role="link" aria-disabled="true">{{ rec.outputName }}
              </a>         
            <span v-else> {{ rec.outputName }} </span>
            </td>
            <td v-if="checkAvailability('outputLabel')">            
              <a v-if="canAccessLink(rec, false) && outputReady(rec)"
                @click="workflowResultService.getSymlinkContent(rec, true, parent, $event)"                
                target="_blank" class="complete-output">
                {{ rec.outputLabel }}
              </a>
              <a v-else-if="canAccessLink(rec, false)" role="link" aria-disabled="true">{{ rec.outputLabel }}</a>         
            <span v-else> {{ rec.outputLabel }} </span>
            </td>
            <td v-if="checkAvailability('groundTruth')">
              {{ rec.groundTruth }}
            </td>
            <td v-if="checkAvailability('scores')">
              {{ rec.scores }}
            </td>
            <td v-if="parent !== 'NewTest' && parent !== 'TestResults' && checkAvailability('status')">
              <button v-if="rec.status === 'COMPLETE'" type="button" class="btn-sm btn btn-success eq-width">
                Complete
              </button>
              <button v-else-if="rec.status === 'IN_PROGRESS'" type="button" class="btn-sm btn btn-warning eq-width">
                In Progress
              </button>
              <button v-else-if="rec.status === 'PAUSED'" type="button" class="btn-sm btn btn-primary eq-width">
                Paused
              </button>
              <button v-else-if="rec.status === 'ERROR'" type="button" class="btn-sm btn btn-danger eq-width">
                Error
              </button>
              <button v-else-if="rec.status === 'SCHEDULED'" type="button" class="btn-sm btn btn-blue eq-width">
                Scheduled
              </button>
              <button v-else-if="rec.status === 'DELETED'" type="button" class="btn-sm btn eq-width">
                Deleted
              </button>
            </td>
            <td
              v-if="parent !== 'NewTest' && parent !== 'TestResults' && checkAvailability('actions')"
              class="toggleActions">
              <a class="btn btn-link add-remove to-delete"
                :class="{ 'disabled dis-color': currentUser.username !== rec.submitter }">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fill="currentColor"
                  class="bi bi-x-octagon-fill icon-delete-stop"
                  viewBox="0 0 16 16"
                  @click="deleteRow(rec)"
                >
                  <title>Delete this item</title>
                  <path
                    d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"
                  />
                </svg>
              </a>
            </td>
            <td
              v-if="(parent === 'NewTest' || parent === 'TestResults') && checkAvailability('addToTest')"
              class="text-center slim-col-14">
              <input
                class="add-to-test-checkbox"
                type="checkbox"
                v-model="mgmEvaluation.selectedRecords"
                :value="rec"/>
            </td>
            <td v-if="parent === 'Deliverables' && checkAvailability('isFinal')" class="slim-col-14">
              <label class="switch" title="Final Result">
                <span class="visually-hidden">Final Result</span>
                <input type="checkbox" v-model="rec.isFinal" v-on:click="setWorkflowResultFinal(rec.id)"/>
                <span class="slider round"></span>
              </label>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td v-if="workflowDashboard.loading" :colspan="columns.length" class="no-results">
              <i class="fas fa-cog fa-spin"></i> Loading
            </td>
            <td v-else :colspan="columns.length" class="no-results">
              No results
            </td>
          </tr>
        </tbody>
      </table>
    </div>     
     
    <div v-if="parent !== 'Deliverables'">
      <pagination
        class="col-xl-10 col-lg-10 col-md-10 col-sm-12"
        :pageNum="workflowDashboard.searchQuery.pageNum"
        :resultsPerPage="Number.parseInt(workflowDashboard.searchQuery.resultsPerPage)"
        :totalResults="workflowDashboard.searchResult.totalResults"
        :maxPages="9"
        @paginate="paginate"
        :showTotalText="true"
      />
    </div>

    <!-- Modal for delete confirmation -->
    <b-modal v-model="showModal" id="modal-center" centered>
      <template #header>
        <h5 class="text-capitalize">
          Confirm
        </h5>
      </template>
      <template #default>
        <div class="row p-3">
          Are you sure you want to delete this result from the Dashboard? This
          action cannot be rolled back.
        </div>
      </template>
      <template #footer="{ hide }">
        <button class="btn btn-outline" @click="hide()">
          Cancel
        </button>
        <button size="sm" class="btn btn-primary" @click="handleDeleteRow()">
          Delete
        </button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import sync from "@/helpers/sync";
import { env } from "@/helpers/env";
import WorkflowResultService from "../../service/workflow-result-service";
import SortableHeader from "../shared/SortableHeader";
import Loader from "@/components/shared/Loader.vue";
import SharedService from "../../service/shared-service";
import { accountService } from "@/service/account-service.js";
import EvaluationService from "@/service/evaluation-service";
import Pagination from "@/components/shared/Pagination.vue";

export default {
  name: "DashboardTable",
  components: {
    SortableHeader,
    Loader,
    Pagination,
  },
  data() {
    return {
      workflowResultService: new WorkflowResultService(),
      evaluationService: new EvaluationService(),
      sharedService: new SharedService(),
      showModal: false,
      currentUser: "",
    };
  },
  computed: {
    accessControl: sync("accessControl"),
    acIsAdmin: sync("acIsAdmin"),
    acUnitsMedia: sync("acUnitsMedia"),
    acUnitsOutput: sync("acUnitsOutput"),
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
    filterByTestDates: sync("workflowDashboard.searchQuery.filterByTestDates"),
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
    workflowResultOutput: {
      default: "",
    },
    columns: {
      default: [],
    },
  },
  methods: {
    async setWorkflowResultFinal(workflowResultId) {
      for (
        var r = 0;
        r < this.workflowDashboard.searchResult.rows.length;
        r++
      ) {
        if (
          this.workflowDashboard.searchResult.rows[r].id == workflowResultId
        ) {
          var thisRow = this.workflowDashboard.searchResult.rows[r];
          if (!thisRow.isFinal) {
            thisRow.isFinal = false;
          }
          thisRow.isFinal = !thisRow.isFinal;
          this.workflowResultService.setWorkflowResultFinal(
            workflowResultId,
            thisRow.isFinal
          );
          break;
        }
      }
    },
    checkAvailability(fieldName) {
      const search = this.columns.find((column) => column.field === fieldName);
      if (!search) return false;
      else return true;
    },
    outputReady(wr) {
      return this.parent === "TestResults" || this.parent === "NewTest" ||
        wr.outputPath != null && wr.status == 'COMPLETE'
    },
    canAccessLink(result, forMedia) {      
      // get units for media or output
      let units = forMedia ? this.acUnitsMedia : this.acUnitsOutput;      	
      return this.acIsAdmin || units && units.includes(result.unitId);
    },
    handleDeleteRow() {
      const self = this;
      self.workflowDashboard.loading = true;
      try {
        self.showModal = false;
        this.workflowResultService
          .deleteWorkflowResult(self.selectedRecord.id)
          .then(() => {
            self.refreshData();
            self.$toast.success(
              "Workflow result has been removed successfully.",
              self.sharedService.toastNotificationConfig
            );
          });
      } catch (error) {
        self.showModal = false;
        self.workflowDashboard.loading = false;
        console.error(error.message);
      }
    },
    deleteRow(record) {
      const self = this;
      if (self.currentUser.username === record.submitter) {
        self.showModal = true;
        self.selectedRecord = record;
      }
    },
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
      if (this.parent === "Deliverables") {
        this.workflowDashboard.searchQuery.sortRule = sortRule;
        this.$emit("deliverableSortQuery");
      } else {
        if (sortRule.columnName !== "actions") {
          this.workflowDashboard.searchQuery.sortRule = sortRule;
          this.workflowDashboard.searchQuery.pageNum = 1;
          this.refreshData();
        }
      }
    },
    paginate(page_number) {
      this.workflowDashboard.searchQuery.pageNum = page_number;
      this.refreshData();
    },
    async refreshData() {
      const self = this;
      self.workflowDashboard.loading = true;
      try {
        if (self.parent === "TestResults") {
          self.workflowDashboard.searchResult = await this.evaluationService.getMgmEvaluationTestResults(
            this.workflowDashboard.searchQuery
          );
        } else if (self.parent === "NewTest") {
          self.workflowDashboard.searchResult = await this.workflowResultService.getWorkflowResults(
            this.workflowDashboard.searchQuery, 
            env.getEnv("VUE_APP_AC_ACTIONTYPE_CREATE"), 
            env.getEnv("VUE_APP_AC_TARGETTYPE_MGMEVALUATIONTEST")
          );
        } else if (self.parent !== "Deliverables") {
          self.workflowDashboard.searchResult = await this.workflowResultService.getWorkflowResults(
            this.workflowDashboard.searchQuery
          );
        }
        self.workflowDashboard.loading = false;
      } catch (error) {
        self.workflowDashboard.loading = false;
        self.$toast.error(
          "Oops! Something went wrong.",
          self.sharedService.toastNotificationConfig
        );
        console.error(error.message);
      }
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
    this.currentUser = accountService.currentUserValue;

    const limit = this.sharedService.getUserValue("limit");
    this.workflowDashboard.searchQuery.resultsPerPage = limit
      ? limit
      : this.workflowDashboard.searchQuery.resultsPerPage;
    this.refreshData();

    let actionsButton = document.getElementById("actions"); //To remove the sortable icon
    if (actionsButton) {
      actionsButton.childNodes[0].removeChild(
        actionsButton.childNodes[0].childNodes[1]
      );
      actionsButton.childNodes[0].style.justifyContent = "center";
    }
  },
  watch: {
    filterByDates: function() {
      this.workflowDashboard.searchQuery.pageNum = 1;
      this.refreshData();
    },
    filterByTestDates: function() {
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
      if(!this.columns) {
        this.columns = this.columns.filter(
          (column) => column.field !== "status" && column.field !== "actions"
        );
      }
      this.workflowDashboard.searchQuery.pageNum = 1;
      this.workflowDashboard.searchQuery.filterByTypes = [
        this.workflowResultType,
      ];
      this.workflowDashboard.searchQuery.filterByOutputs = [
        ...this.workflowResultOutput.split(/\s*,\s*/),
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
@import "../../styles/style.css";
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
.icon-delete-stop {
  fill: red;
}
.icon-delete-stop:hover {
  fill: #f4871e;
}
.dis-color > svg {
  fill: rgba(187, 187, 187, 0.856) !important;
}
li {
  list-style: none;
  padding: 1pt;
}
</style>
