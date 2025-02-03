<template>
  <div class="collections w-100 px-0">
    <div class="container-fluid"
      :class="{ 'p-0': parent === 'NewTest' || parent === 'TestResults' }">
      <div class="row">
        <div class="col-12"
          :class="{ 'bg-light-gray-1': parent !== 'NewTest' && parent !== 'TestResults' }">
          <main class="m-0">
            <div class="card"
              :class="{ 'mb-0': parent === 'NewTest' || parent === 'TestResults' }">
              <div class="card-body px-2">
                <h1 v-if="parent !== 'NewTest' && parent !== 'TestResults'" class="card-title pb-3">
                  AMP Dashboard
                </h1>
                <div v-if="filterCount > 0">
                  <div class="d-flex flex-wrap px-0">
                    <div class="col-sm-2 fw-bold">CURRENTLY FILTERED BY</div>
                    <button
                      class="btn btn-outline col-sm-2 selected-filter-button"
                      v-if="workflowDashboard.searchQuery.filterByDates.length > 0">
                      <div class="d-flex flex-row justify-content-between">
                        <span v-html="closeIconSvg" class="col-auto" @click="removeDateFilter(index)"></span>
                        <div class="d-flex flex-column">
                          <label class="fw-bold col-auto">
                            {{ parent === "TestResults" ? "Output date" : "Date" }}
                            range
                          </label>
                          <label>{{
                              workflowDashboard.searchQuery.filterByDates[0].getMonth() +
                                1
                            }}/{{
                              workflowDashboard.searchQuery.filterByDates[0].getDate()
                            }}/{{
                              workflowDashboard.searchQuery.filterByDates[0].getFullYear()
                            }}
                            -
                            {{
                              workflowDashboard.searchQuery.filterByDates[1].getMonth() +
                                1
                            }}/{{
                              workflowDashboard.searchQuery.filterByDates[1].getDate()
                            }}/{{
                              workflowDashboard.searchQuery.filterByDates[1].getFullYear()
                            }}</label
                          >
                        </div>
                      </div>
                    </button>
                    <button
                      class="btn btn-outline col-sm-2 selected-filter-button"
                      v-if="workflowDashboard.searchQuery.filterByTestDates.length > 0">
                      <div class="d-flex flex-row justify-content-between">
                        <span v-html="closeIconSvg" class="col-auto" @click="removeTestDateFilter(index)"></span>
                        <div class="d-flex flex-column">
                          <label class="fw-bold col-auto">Test date range</label>
                          <label>{{
                              workflowDashboard.searchQuery.filterByTestDates[0].getMonth() +
                                1
                            }}/{{
                              workflowDashboard.searchQuery.filterByTestDates[0].getDate()
                            }}/{{
                              workflowDashboard.searchQuery.filterByTestDates[0].getFullYear()
                            }}
                            -
                            {{
                              workflowDashboard.searchQuery.filterByTestDates[1].getMonth() +
                                1
                            }}/{{
                              workflowDashboard.searchQuery.filterByTestDates[1].getDate()
                            }}/{{
                              workflowDashboard.searchQuery.filterByTestDates[1].getFullYear()
                            }}</label>
                        </div>
                      </div>
                    </button>
                    <button
                      class="btn btn-outline col-sm-2 selected-filter-button"
                      v-for="(submitter, index) in workflowDashboard.searchQuery.filterBySubmitters"
                      v-bind:submitter="submitter"
                      v-bind:index="index"
                      v-bind:key="index">
                      <div class="d-flex flex-row justify-content-between">
                        <span v-html="closeIconSvg" class="col-auto" @click="removeSubmitterFilter(index)"></span>
                        <div class="d-flex flex-column">
                          <label class="fw-bold col-auto">Submitter</label>
                          <label>{{ submitter }}</label>
                        </div>
                      </div>
                    </button>
                    <button
                      class="btn btn-outline col-sm-2 selected-filter-button"
                      v-for="(unit, index) in selectedFilters.units"
                      v-bind:workflow="unit.unitName"
                      v-bind:index="index"
                      v-bind:key="index">
                      <div class="d-flex flex-row justify-content-between">
                        <span v-html="closeIconSvg" class="col-auto" @click="removeUnitFilter(index)"></span>
                        <div class="d-flex flex-column">
                          <label class="fw-bold col-auto">Unit</label>
                          <label>{{ unit.unitName }}</label>
                        </div>
                      </div>
                    </button>
                    <button
                      class="btn btn-outline col-sm-2 selected-filter-button"
                      v-for="(collection, index) in selectedFilters.collections"
                      v-bind:workflow="collection.collectionName"
                      v-bind:index="index"
                      v-bind:key="index">
                      <div class="d-flex flex-row justify-content-between">
                        <span v-html="closeIconSvg" class="col-auto" @click="removeCollectionFilter(index)"></span>
                        <div class="d-flex flex-column">
                          <label class="fw-bold col-auto">Collection</label>
                          <label>{{ collection.collectionName }}</label>
                        </div>
                      </div>
                    </button>
                    <button
                      class="btn btn-outline col-sm-2 selected-filter-button"
                      v-for="(externalId, index) in workflowDashboard.searchQuery.filterByExternalIds"
                      v-bind:externalId="externalId"
                      v-bind:index="index"
                      v-bind:key="index">
                      <div class="d-flex flex-row justify-content-between">
                        <span v-html="closeIconSvg" class="col-auto" @click="removeExternalIdFilter(index)"></span>
                        <div class="d-flex flex-column">
                          <label class="fw-bold col-auto">External ID</label>
                          <label>{{ externalId }}</label>
                        </div>
                      </div>
                    </button>
                    <button
                      class="btn btn-outline col-sm-2 selected-filter-button"
                      v-for="(item, index) in selectedFilters.items"
                      v-bind:item="item.itemName"
                      v-bind:index="index"
                      v-bind:key="index">
                      <div class="d-flex flex-row justify-content-between">
                        <span v-html="closeIconSvg" class="col-auto" @click="removeItemFilter(index)"></span>
                        <div class="d-flex flex-column">
                          <label class="fw-bold col-auto">Item</label>
                          <label>{{ item.itemName }}</label>
                        </div>
                      </div>
                    </button>
                    <button
                      class="btn btn-outline col-sm-2 selected-filter-button"
                      v-for="(file, index) in selectedFilters.primaryfiles"
                      v-bind:file="file.primaryfileName"
                      v-bind:index="index"
                      v-bind:key="index">
                      <div class="d-flex flex-row justify-content-between">
                        <span v-html="closeIconSvg" class="col-auto" @click="removeFileFilter(index)"></span>
                        <div class="d-flex flex-column">
                          <label class="fw-bold col-auto">Content File</label>
                          <label>{{ file.primaryfileName }}</label>
                        </div>
                      </div>
                    </button>
                    <button
                      class="btn btn-outline col-sm-2 selected-filter-button"
                      v-for="(workflow, index) in workflowDashboard.searchQuery.filterByWorkflows"
                      v-bind:workflow="workflow"
                      v-bind:index="index"
                      v-bind:key="index">
                      <div class="d-flex flex-row justify-content-between">
                        <span v-html="closeIconSvg" class="col-auto" @click="removeWorkflowFilter(index)"></span>
                        <div class="d-flex flex-column">
                          <label class="fw-bold col-auto">Workflow</label>
                          <label>{{ workflow }}</label>
                        </div>
                      </div>
                    </button>
                    <button
                      class="btn btn-outline col-sm-2 selected-filter-button"
                      v-for="(step, index) in workflowDashboard.searchQuery.filterBySteps"
                      v-bind:step="step"
                      v-bind:index="index"
                      v-bind:key="index">
                      <div class="d-flex flex-row justify-content-between">
                        <span v-html="closeIconSvg" class="col-auto" @click="removeStepFilter(index)"></span>
                        <div class="d-flex flex-column">
                          <label class="fw-bold col-auto">Step</label>
                          <label>{{ step }}</label>
                        </div>
                      </div>
                    </button>
                    <span v-if="parent !== 'NewTest'">
                      <button
                        class="btn btn-outline col-sm-2 selected-filter-button"
                        v-for="(output, index) in workflowDashboard.searchQuery.filterByOutputs"
                        v-bind:output="output"
                        v-bind:index="index"
                        v-bind:key="index">
                        <div class="d-flex flex-row justify-content-between">
                          <span v-html="closeIconSvg" class="col-auto" @click="removeOutputFilter(index)"></span>
                          <div class="d-flex flex-column">
                            <label class="fw-bold col-auto">Output</label>
                            <label>{{ output }}</label>
                          </div>
                        </div>
                      </button>
                    </span>
                    <span v-if="parent !== 'NewTest' && parent !== 'TestResults'">
                      <button
                        class="btn btn-outline col-sm-2 selected-filter-button"
                        v-for="(status, index) in workflowDashboard.searchQuery.filterByStatuses"
                        v-bind:status="status"
                        v-bind:index="index"
                        v-bind:key="index">
                        <div class="d-flex flex-row justify-content-between">
                          <span v-html="closeIconSvg" class="col-auto" @click="removeStatusFilter(index)"></span>
                          <div class="d-flex flex-column">
                            <label class="fw-bold col-auto">Status</label>
                            <label>{{ status }}</label>
                          </div>
                        </div>
                      </button>
                    </span>
                    <button
                      class="btn btn-outline col-sm-2 selected-filter-button"
                      v-for="(searchTerm, index) in workflowDashboard.searchQuery.filterBySearchTerms"
                      v-bind:searchTerm="searchTerm"
                      v-bind:index="index"
                      v-bind:key="index">
                      <div class="d-flex flex-row justify-content-between">
                        <span v-html="closeIconSvg" class="col-auto" @click="removeSearchFilter()"></span>
                        <div class="d-flex flex-column">
                          <label class="fw-bold col-auto">Search Term</label>
                          <label>{{ searchTerm }}</label>
                        </div>
                      </div>
                    </button>
                    <button
                      class="btn btn-outline col-sm-2 selected-filter-button"
                      v-if="filterCount > 1">
                      <div class="d-flex flex-row justify-content-between align-items-center clear-all-filters-button">
                        <span v-html="closeIconSvg" class="col-auto" @click="clearAll()"></span>
                        <label class="fw-bold">Clear all</label>
                      </div>
                    </button>
                  </div>
                </div>

                <div class="col d-flex flex-wrap filter-btns px-0">
                  <DateFilter
                    :parent="parent"
                    v-if="parent === 'TestResults'"
                    label="Test Date"
                    @displayChanged="changeDisplayedFilter(workflowDashboard.filtersEnabled.dateFilter)"
                  />
                  <DateFilter
                    :parent="parent"
                    @displayChanged="changeDisplayedFilter(workflowDashboard.filtersEnabled.dateFilter)"
                  />
                  <b-button class="btn btn-info dropdown" v-b-modal.modal-lg @click="onOpenModal('submitter')">Submitter</b-button>                        
                  <b-button class="btn btn-info dropdown" v-b-modal.modal-lg @click="onOpenModal('unit')">Unit</b-button>
                  <b-button class="btn btn-info dropdown" v-b-modal.modal-lg @click="onOpenModal('collection')">Collection</b-button>
                  <b-button class="btn btn-info dropdown" v-b-modal.modal-lg @click="onOpenModal('item')">Item</b-button>
                  <b-button class="btn btn-info dropdown" v-b-modal.modal-lg @click="onOpenModal('primaryfile')">Content File</b-button>
                  <b-button class="btn btn-info dropdown" v-b-modal.modal-lg @click="onOpenModal('workflow')">Workflow</b-button>
                  <b-button 
                    v-if="parent !== 'NewTest'" 
                    class="btn btn-info dropdown" 
                    v-b-modal.modal-lg @click="onOpenModal('output')">
                    Output
                  </b-button>                        
                  <b-button class="btn btn-info dropdown" v-b-modal.modal-lg @click="onOpenModal('step')">Step</b-button>
                  <b-button 
                    v-if="parent !== 'NewTest' && parent !== 'TestResults'" 
                    class="btn btn-info dropdown" 
                    v-b-modal.modal-lg @click="onOpenModal('status')">
                    Status
                  </b-button>
                  <search-filter
                    v-if="parent !== 'Deliverables'"
                    :parent="parent"
                    class="px-2 my-1" />
                  <span  v-if="parent !== 'NewTest' && parent !== 'TestResults'" class="px-2 my-2">
                    <span class="txt-v px-1 py-2">Show Relevant Results Only</span>
                    <label class="switch my-0" title="Relevant Result">
                      <span class="visually-hidden">Relevant Result</span>
                      <input type="checkbox" v-model="workflowDashboard.searchQuery.filterByRelevant" />
                      <span class="slider round"></span>
                    </label>
                  </span>
                  <span
                    v-if="parent !== 'NewTest' && parent !== 'TestResults' && parent !== 'Deliverables'"
                    class="ms-auto px-2 my-2">
                    <input
                      id="export-results"
                      type="button"
                      class="btn btn-outline-primary btn-sm"
                      v-on:click="exportResults"
                      value="Export to CSV" />
                  </span>
                </div>

                <DashboardTable
                  v-if="columns.length"
                  :columns="columns"
                  :parent="parent"
                  :workflowResultType="workflowResultType"
                  :workflowResultOutput="workflowResultOutput">
                  <template #show-hide-columns>
                    <div
                      v-if="parent !== 'NewTest' && parent !== 'Deliverables'"
                      id="btn-show-hide"
                      class="dropdown mb-2">
                      <b-dropdown id="dropdown-form" auto-close="outside">
                          <template #button-content>
                            <span>Show/Hide Columns</span>
                            <i class="fa fa-sort-down ms-1"></i>
                          </template>
                          <b-dropdown-form class="dashboard-filters">
                            <b-form-checkbox
                              v-for="column in dashboardColumns.filter(
                                (item) => {
                                  if (parent === 'TestResults')
                                    return (
                                      item.field !== 'status' &&
                                      item.field !== 'actions' &&
                                      item.field !== 'addToTest'
                                    );
                                  else
                                    return (
                                      item.field !== 'testDate' &&
                                      item.field !== 'groundTruth' &&
                                      item.field !== 'scores' &&
                                      item.field !== 'addToTest'
                                    );
                                }
                              )"
                              :key="column.field"
                              :value="column"
                              :checked="column"
                              v-model="columns"
                              @change="onChange($event.target, column)"
                              class="mb-3 form-check">
                              {{ column.label }}
                            </b-form-checkbox>
                          </b-dropdown-form>
                      </b-dropdown>
                    </div>  
                  </template>
                </DashboardTable>
                <Search
                  :searchType="searchType"
                  :dataSource="searchSource"
                  :key="searchType + searchSource.length"
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sync from "@/helpers/sync";
import config from "../../assets/constants/common-contant.js";
import Sidebar from "@/components/navigation/Sidebar.vue";
import DashboardTable from "@/components/dashboard/DashboardTable.vue";
import DateFilter from "@/components/dashboard/DashboardFilters/DateFilter";
import SearchFilter from "@/components/dashboard/DashboardFilters/SearchFilter";
import Logout from "@/components/shared/Logout.vue";
import Search from "@/components/shared/Search.vue";
import WorkflowResultService from "../../service/workflow-result-service";
import SharedService from "@/service/shared-service";

export default {
  name: "Dashboard",
  components: {
    Sidebar,
    DashboardTable,
    DateFilter,
    SearchFilter,
    Logout,
    Search,
  },
  data() {
    return {
      workflowSubmitted: false,
      bundle: null,
      visible: true,
      searchType: "",
      searchSource: [],
      workflowResultService: new WorkflowResultService(),
      sharedService: new SharedService(),
      isFilterApiLoaded: false,
      columns: [],
      closeIconSvg: config.common.icons["close_icon"],
    };
  },
  computed: {
    workflowDashboard: sync("workflowDashboard"),
    dashboardColumns: sync("dashboardColumns"),
    filterCount: function() {
      var dateFilter = 0;
      if (this.workflowDashboard.searchQuery.filterByDates.length > 0)
        dateFilter = 1;
      if (this.workflowDashboard.searchQuery.filterByTestDates.length > 0)
        dateFilter = 1;
      if (
        this.workflowDashboard.searchQuery.filterByDates.length > 0 &&
        this.workflowDashboard.searchQuery.filterByTestDates.length > 0
      )
        dateFilter = 2;
      if (this.parent !== "NewTest")
        dateFilter =
          dateFilter +
          this.workflowDashboard.searchQuery.filterByOutputs.length +
          this.workflowDashboard.searchQuery.filterByStatuses.length;
      return (
        dateFilter +
        this.workflowDashboard.searchQuery.filterBySubmitters.length +
        this.workflowDashboard.searchQuery.filterByWorkflows.length +
        this.workflowDashboard.searchQuery.filterByCollections.length +
        this.workflowDashboard.searchQuery.filterByUnits.length +
        this.workflowDashboard.searchQuery.filterByExternalIds.length +
        this.workflowDashboard.searchQuery.filterByItems.length +
        this.workflowDashboard.searchQuery.filterByFiles.length +
        this.workflowDashboard.searchQuery.filterBySteps.length +
        this.workflowDashboard.searchQuery.filterBySearchTerms.length
      );
    },

    filterByCollections: sync(
      "workflowDashboard.searchQuery.filterByCollections"
    ),
    filterByUnits: sync("workflowDashboard.searchQuery.filterByUnits"),
    filterByWorkflows: sync("workflowDashboard.searchQuery.filterByWorkflows"),
    filterByOutputs: sync("workflowDashboard.searchQuery.filterByOutputs"),
    selectedFilters: sync("selectedFilters"),
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
  },
  methods: {
    onChange(ev, col) {
      const self = this;
      self.columns = self.sharedService.sortByAlphabatical(
        self.columns,
        "order"
      );
      if (col.field === "actions") {
        // To remove the sortable icon
        let actionsButton = document.getElementById("actions");
        if (actionsButton) {
          const actionButtonFirstChild = actionsButton.childNodes[0];
          actionButtonFirstChild.removeChild(actionButtonFirstChild.lastChild);
          actionButtonFirstChild.style.justifyContent = "center";
        }
      }
    },
    changeDisplayedFilter(item) {
      this.workflowDashboard.filtersEnabled.dateFilter = false;
      this.workflowDashboard.filtersEnabled.submitterFilter = false;
      this.workflowDashboard.filtersEnabled.collectionFilter = false;
      this.workflowDashboard.filtersEnabled.externalIdFilter = false;
      this.workflowDashboard.filtersEnabled.itemFilter = false;
      this.workflowDashboard.filtersEnabled.fileFilter = false;
      this.workflowDashboard.filtersEnabled.workflowFilter = false;
      this.workflowDashboard.filtersEnabled.stepFilter = false;
      this.workflowDashboard.filtersEnabled.outputFilter = false;
      this.workflowDashboard.filtersEnabled.statusFilter = false;
      this.workflowDashboard.filtersEnabled.searchFilter = false;
      item = !item;
    },
    clearAll() {
      this.workflowDashboard.searchQuery.filterByDates = [];
      this.workflowDashboard.searchQuery.filterByTestDates = [];
      this.workflowDashboard.searchQuery.filterBySubmitters = [];
      this.workflowDashboard.searchQuery.filterByCollections = [];
      this.workflowDashboard.searchQuery.filterByUnits = [];
      this.workflowDashboard.searchQuery.filterByExternalIds = [];
      this.workflowDashboard.searchQuery.filterByItems = [];
      this.workflowDashboard.searchQuery.filterByFiles = [];
      this.workflowDashboard.searchQuery.filterByWorkflows = [];
      this.workflowDashboard.searchQuery.filterBySteps = [];
      this.workflowDashboard.searchQuery.filterBySearchTerms = [];
      if (this.parent !== "NewTest") {
        this.workflowDashboard.searchQuery.filterByOutputs = [];
        this.workflowDashboard.searchQuery.filterByStatuses = [];
      } else if (this.parent === "TestResults") {
        this.workflowDashboard.searchQuery.sortRule.columnName = "id";
      }
      // Clear selected search on popup
      this.selectedFilters["items"] = [];
      this.selectedFilters["primaryfiles"] = [];
      this.selectedFilters["collections"] = [];
      this.selectedFilters["units"] = [];
      this.selectedFilters["workflows"] = [];
      this.selectedFilters["outputs"] = [];
      this.selectedFilters["submitters"] = [];
      this.selectedFilters["steps"] = [];
      if (this.parent !== "NewTest") {
        this.selectedFilters["statuses"] = [];
      }
    },
    removeDateFilter() {
      this.workflowDashboard.searchQuery.filterByDates = [];
    },
    removeTestDateFilter() {
      this.workflowDashboard.searchQuery.filterByTestDates = [];
    },
    removeSubmitterFilter(index) {
      this.selectedFilters["submitters"].splice(index, 1);
      this.workflowDashboard.searchQuery.filterBySubmitters = this.selectedFilters['submitters'].map((el) => el.submitterName);
    },
    removeCollectionFilter(index) {
      this.selectedFilters["collections"].splice(index, 1);
      this.workflowDashboard.searchQuery.filterByCollections = this.selectedFilters['collections'].map((el) => el.collectionId);
    },
    removeExternalIdFilter(index) {
      this.workflowDashboard.searchQuery.filterByExternalIds = []
    },
    removeItemFilter(index) {
      this.selectedFilters["items"].splice(index, 1);
      this.workflowDashboard.searchQuery.filterByItems = this.selectedFilters['items'].map((el) => el.itemId);
    },
    removeFileFilter(index) {
      this.selectedFilters["primaryfiles"].splice(index, 1);
      this.workflowDashboard.searchQuery.filterByFiles = this.selectedFilters['primaryfiles'].map((el) => el.primaryfileId);
    },
    removeWorkflowFilter(index) {
      this.selectedFilters["workflows"].splice(index, 1);
      this.workflowDashboard.searchQuery.filterByWorkflows = this.selectedFilters['workflows'].map((el) => el.workflowName);
    },
    removeStepFilter(index) {
      this.selectedFilters["steps"].splice(index, 1);
      this.workflowDashboard.searchQuery.filterBySteps = this.selectedFilters['steps'].map((el) => el.stepName);
    },
    removeOutputFilter(index) {
      this.selectedFilters["outputs"].splice(index, 1);
      this.workflowDashboard.searchQuery.filterByOutputs = this.selectedFilters['outputs'].map((el) => el.outputName);
    },
    removeStatusFilter(index) {
      this.selectedFilters["statuses"].splice(index, 1);
      this.workflowDashboard.searchQuery.filterByStatuses = this.selectedFilters['statuses'].map((el) => el.statusName);
    },
    removeSearchFilter() {
      this.workflowDashboard.searchQuery.filterBySearchTerms = []
    },
    removeUnitFilter(index) {
      this.selectedFilters["units"].splice(index, 1);
      this.workflowDashboard.searchQuery.filterByUnits = this.selectedFilters['units'].map((el) => el.unitId);
    },
    onOpenModal(value) {
      let self = this;
      switch (value) {
        case "item":
          this.searchType = "items";
          this.searchSource = self.workflowDashboard.searchResult.filters.items.map(
            (el) => ({
              id: el.itemId,
              itemName: el.itemName,
              itemId: el.itemId,
              collectionName: el.collectionName,
              unitName: el.unitName,
            })
          );
          break;
        case "primaryfile":
          this.searchType = "primaryfiles";
          this.searchSource = self.workflowDashboard.searchResult.filters.files.map(
            (el) => ({
              id: el.primaryfileId,
              primaryfileName: el.primaryfileName,
              primaryfileId: el.primaryfileId,
              itemName: el.itemName,
              externalSource: el.externalSource,
              externalId: el.externalId,
            })
          );
          break;
        case "collection":
          this.searchType = "collections";
          this.searchSource = self.workflowDashboard.searchResult.filters.collections.map(
            (el) => ({
              id: el.collectionId,
              collectionName: el.collectionName,
              collectionId: el.collectionId,
              unitName: el.unitName,
            })
          );
          break;
        case "unit":
          this.searchType = "units";
          this.searchSource = self.workflowDashboard.searchResult.filters.units.map(
            (el) => ({
              id: el.unitId,
              unitName: el.unitName,
              unitId: el.unitId,
            })
          );
          break;
        case "workflow":
          this.searchType = "workflows";
          this.searchSource = self.workflowDashboard.searchResult.filters.workflows.map(
            (el) => ({ id: el, workflowName: el })
          );
          break;
        case "output":
          this.searchType = "outputs";
          this.searchSource = self.workflowDashboard.searchResult.filters.outputs.map(
            (el) => ({ id: el, outputName: el })
          );
          break;
        case "submitter":
          this.searchType = "submitters";
          this.searchSource = self.workflowDashboard.searchResult.filters.submitters.map(
            (el) => ({ id: el, submitterName: el })
          );
          break;
        case "step":
          this.searchType = "steps";
          this.searchSource = self.workflowDashboard.searchResult.filters.steps.map(
            (el) => ({ id: el, stepName: el })
          );
          break;
        case "status":
          this.searchType = "statuses";
          this.searchSource = self.workflowDashboard.searchResult.filters.statuses.map(
            (el) => ({ id: el, statusName: el })
          );
          break;
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
  },
  mounted() {
    this.columns = this.dashboardColumns;
    if (this.parent === "TestResults") {
      this.clearAll();
      this.columns = this.columns.filter((column) => {
        if (column.field === "addToTest") {
          column.label = "Visualize";
        }

        return (
          column.field !== "status" &&
          column.field !== "actions"
        );
      });
      this.workflowDashboard.searchQuery.pageNum = 1;
      this.workflowDashboard.searchQuery.filterByTypes = [];
      this.workflowDashboard.searchQuery.filterByOutputs = [];
    } else if (this.parent === "NewTest") {
      this.clearAll();
      this.columns = this.columns.filter((column) => {
        if (column.field === "addToTest") {
          column.label = "Add to Test";
        }

        return (
          column.field !== "testDate" &&
          column.field !== "groundTruth" &&
          column.field !== "scores" &&
          column.field !== "status" &&
          column.field !== "actions"
        );
      });
      this.workflowDashboard.searchQuery.pageNum = 1;
      this.workflowDashboard.searchQuery.filterByTypes = [
        this.workflowResultType,
      ];
      this.workflowDashboard.searchQuery.filterByOutputs = [
        ...this.workflowResultOutput.split(/\s*,\s*/),
      ];
      this.workflowDashboard.searchQuery.filterByStatuses = ["COMPLETE"];
    } else {
      this.columns = this.columns.filter((column) => {
        return (
          column.field !== "testDate" &&
          column.field !== "unit" &&
          column.field !== "externalSource" &&
          column.field !== "workflowStep" &&
          column.field !== "groundTruth" &&
          column.field !== "scores" &&
          column.field !== "actions" &&
          column.field !== "addToTest"
        );
      });
      this.workflowDashboard.searchQuery.filterByTypes = [];
      this.workflowDashboard.searchQuery.filterByOutputs = [];
      this.clearAll();
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-margin-min {
  margin: 0.5em !important;
}

.selected-filter-button {
  background-color: white;
  border: 2px solid;
  text-align-last: left;
  align-self: flex-start;
  color: black;
  border-radius: 5px;
  border-color: #ced4da;
  padding-bottom: 0px;
  padding-right: 20px;
  margin-bottom: 5px;
  margin-right: 10px;
  flex-wrap: wrap;
  min-width: max-content;
  width: auto;
  div.flex-row {
    gap: 1em;
  }
}

.btn-info {
  color: #fff !important;
  background-color: #17a2b8 !important;
  border-color: #17a2b8 !important;
}

#dropdown-form {
  margin: 0px;
  padding: 0px;
}

#dropdown-form > button > span > svg > g > path {
  fill: #153c4d !important;
}

#dropdown-form > button:hover > span > svg > g > path {
  fill: #fff !important;
}

.dashboard-filters {
  column-count: 2;
}

.clear-all-filters-button {
  height: 3em;
}

#btn-show-hide i {
  vertical-align: text-top;
}
</style>
