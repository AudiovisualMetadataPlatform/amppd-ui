<template>
  <div class="dataTables_wrapper no-footer">
    <loader :show="workflowDashboard.loading" />
    <div
      v-if="
        parent !== 'NewTest' &&
          parent !== 'TestResults' &&
          parent !== 'Deliverables'
      "
      class="export-row"
    >
      <input
        id="export-results"
        type="button"
        class="btn btn-outline-primary btn-sm"
        v-on:click="exportResults"
        value="Export to CSV"
      />
    </div>

    <div v-if="parent !== 'Deliverables'" class="row col-12 p-0 m-0">
      <div
        class="
          col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12
          dataTables_length
          mt-1
        "
      >
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
        v-if="parent !== 'Deliverables'"
        :parent="parent"
        class="col-xl-3 col-md-3 col-sm-12 col-xs-12 pr-0 justify-content-right"
      />
    </div>
    <br v-if="parent !== 'Deliverables'" />
    <div
      class="table-responsive"
      :class="
        parent === 'NewTest' ||
        parent === 'TestResults' ||
        parent === 'Deliverables'
          ? 'table-gap'
          : ''
      "
    >
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
            <td v-if="checkAvailability('dateCreated')">
              {{ new Date(rec.dateCreated) | LOCAL_DATE_VALUE }}
            </td>
            <td v-if="checkAvailability('testDate')">
              {{ new Date(rec.testDate) | LOCAL_DATE_VALUE }}
            </td>
            <td v-if="checkAvailability('outputDate')">
              {{ new Date(rec.outputDate) | LOCAL_DATE_VALUE }}
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
            <td v-if="checkAvailability('primaryfileName') && canAccessLink(rec, true)">
              <a
                v-bind:href="
                  workflowResultService.getSourceUrl(rec.primaryfileId)
                "
                target="_blank"
                class="complete-output"
                >{{ rec.primaryfileName }}</a
              >
            </td>
            <td v-else-if="checkAvailability('primaryfileName')">
              {{ rec.primaryfileName }}
            </td>
            <td v-if="checkAvailability('workflowName')">
              {{ rec.workflowName }}
            </td>
            <td v-if="checkAvailability('workflowStep')">
              {{ rec.workflowStep }}
            </td>
            <td
              v-if="checkAvailability('outputName') && 
                canAccessLink(rec, false) && 
                outputReady(rec)"
            >
              <a
                v-bind:href="workflowResultService.getOutputUrl(rec.id)"
                target="_blank"
                class="complete-output"
                >{{ rec.outputName }}</a
              >
            </td>
            <td v-else-if="checkAvailability('outputName') && canAccessLink(rec, false)">
              <a role="link" aria-disabled="true">{{ rec.outputName }}</a>
            </td>            
            <td v-else-if="checkAvailability('outputName')">
              {{ rec.outputName }}
            </td>
            <td
              v-if="checkAvailability('outputLabel') && 
                canAccessLink(rec, false) && 
                outputReady(rec)"
            >
              <a
                v-bind:href="workflowResultService.getOutputUrl(rec.id)"
                target="_blank"
                class="complete-output"
                >{{ rec.outputLabel }}</a
              >
            </td>
            <td v-else-if="checkAvailability('outputLabel') && canAccessLink(rec, false)">
              <a role="link" aria-disabled="true" class="complete-output">{{ rec.outputLabel }}</a>
            </td>            
            <td v-else-if="checkAvailability('outputLabel')">
              {{ rec.outputLabel }}
            </td>
            <td v-if="checkAvailability('groundTruth')">
              {{ rec.groundTruth }}
            </td>
            <td v-if="checkAvailability('outputTest')">
              {{ rec.outputTest }}
            </td>
            <td
              v-if="
                parent !== 'NewTest' &&
                  parent !== 'TestResults' &&
                  checkAvailability('status')
              "
            >
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
            <td
              v-if="
                parent !== 'NewTest' &&
                  parent !== 'TestResults' &&
                  checkAvailability('actions')
              "
              class="toggleActions"
            >
              <a
                class="btn btn-link add-remove to-delete"
                :class="{
                  'disabled dis-color': currentUser.username !== rec.submitter,
                }"
              >
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
              v-if="
                (parent === 'NewTest' || parent === 'TestResults') &&
                  checkAvailability('addToTest')
              "
              class="text-center slim-col-14"
            >
              <input
                class="add-to-test-checkbox"
                type="checkbox"
                v-model="mgmEvaluation.selectedRecords"
                :value="rec"
              />
            </td>
            <td
              v-if="parent === 'Deliverables' && checkAvailability('isFinal')"
              class="slim-col-14"
            >
              <label class="switch" title="Final Result">
                <span class="sr-only">Final Result</span>
                <input
                  type="checkbox"
                  v-model="rec.isFinal"
                  v-on:click="setWorkflowResultFinal(rec.id)"
                />
                <span class="slider round"></span>
              </label>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td
              v-if="workflowDashboard.loading"
              :colspan="columns.length"
              class="no-results"
            >
              <i class="fas fa-cog fa-spin"></i> Loading
            </td>
            <td v-else :colspan="columns.length" class="no-results">
              No results
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="parent !== 'Deliverables'" class="row col-12 p-0 m-0">
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

      <!-- Modal for delete confirmation -->
      <b-modal v-model="showModal" id="modal-center" centered>
        <template #modal-header="{}">
          <h5 class="text-capitalize">
            Confirm
          </h5>
        </template>
        <template #default="{}">
          <div class="row pad-all-2">
            Are you sure you want to delete this result from the Dashboard? This
            action cannot be rolled back.
          </div>
        </template>
        <template #modal-footer="{ hide }">
          <button class="btn btn-outline" @click="hide()">
            Cancel
          </button>
          <button size="sm" class="btn btn-primary" @click="handleDeleteRow()">
            Delete
          </button>
        </template>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { sync } from "vuex-pathify";
import { env } from "@/helpers/env";
import WorkflowResultService from "../../service/workflow-result-service";
import SortableHeader from "../shared/SortableHeader";
import Pagination from "../shared/Pagination";
import SearchFilter from "./DashboardFilters/SearchFilter";
import Loader from "@/components/shared/Loader.vue";
import SharedService from "../../service/shared-service";
import { accountService } from "@/service/account-service.js";
import EvaluationService from "@/service/evaluation-service";

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
      workflowResultService: new WorkflowResultService(),
      evaluationService: new EvaluationService(),
      sharedService: new SharedService(),
      showModal: false,
      currentUser: "",
    };
  },
  computed: {
    accessControl: sync("accessControl"),
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
      return wr.outputPath != null && wr.status == 'COMPLETE'
    },
    canAccessLink(result, forMedia) {      
      let actionType = env.getEnv("VUE_APP_AC_ACTIONTYPE_READ");
      let targetType = forMedia ? // for media or output
        env.getEnv("VUE_APP_AC_TARGETTYPE_PRIMARYFILE_MEDIA") :
        env.getEnv("VUE_APP_AC_TARGETTYPE_WORKFLOWRESULT_OUTPUT");
      let actionKey = `${actionType}-${targetType}`;
      let units =  this.accessControl.actionsUnits.get(actionKey);
      return units && units.has(result.unitId);
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
            self.$bvToast.toast(
              "Workflow result has been removed successfully.",
              self.sharedService.successToastConfig
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
        self.$bvToast.toast(
          "Oops! Something went wrong.",
          self.sharedService.erorrToastConfig
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
      // console.log("inside watcher for filterByDates",this.filterByDates[0]," ",this.filterByDates[1]);
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
      this.columns = this.columns.filter(
        (column) => column.field !== "status" && column.field !== "actions"
      );
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
.table-gap {
  margin-top: -20px !important;
  margin-bottom: 0px;
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
.icon-delete-stop {
  fill: red;
}
.icon-delete-stop:hover {
  fill: #f4871e;
}
.dis-color > svg {
  fill: rgba(187, 187, 187, 0.856) !important;
}
</style>
