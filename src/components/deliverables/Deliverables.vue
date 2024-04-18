<template>
  <div class="deliverables w-100">
    <loader :show="loading" />
    <div
      class="container-fluid"
      v-bind:class="[{ modalOpen: showModal }, 'container', 'col-12']"
    >
      <div class="row">
        <div class="col-12 bg-light-gray-1">
          <main class="m-0">
            <div class="pad-all-3">
              <div class="card">
                <div class="card-body">
                  <h1 class="card-title">AMP Deliverables</h1>
                  <button
                    v-bind:disabled="!canDeliverFinalResults"
                    class="btn btn-primary marg-bot-4"
                    data-toggle="modal"
                    data-target=".bd-example-modal-lg"
                  >
                    Deliver Final Results
                  </button>
                  <div>
                    <h2 class="sub-title">
                      Collection: <span>{{ pfile.collectionName }}</span>
                    </h2>
                    <h2 class="sub-title">
                      Item: <span>{{ pfile.itemName }}</span>
                    </h2>
                    <h2 class="sub-title">
                      External Source: <span>{{ pfile.externalSource }}</span>
                    </h2>
                    <h2 class="sub-title">
                      External ID: <span>{{ pfile.externalId }}</span>
                    </h2>
                    <h2 class="sub-title">
                      Content File: <span>{{ pfile.primaryfileName }}</span>
                    </h2>
                    <h2 class="sub-title">
                      Filename: <span>{{ pfile.primaryfileOriginalname }}</span>
                    </h2>
                  </div>
                  <div class="table-responsive">
                    <button
                      v-on:click="searchModal"
                      id="btn-search-modal"
                      class="btn btn-primary marg-bot-4"
                      data-toggle="modal"
                      data-target=".bd-example-modal-lg-2"
                    >
                      Search
                    </button>
                    <div class="final-choice-top">
                      <span class="txt-v">Show Final Results Only</span>
                      <label class="switch" title="Final Result"
                        ><span class="sr-only">Final Result</span>
                        <input type="checkbox" v-on:click="filterByFinal" />
                        <span class="slider round"></span>
                      </label>
                    </div>
                    <div
                      id="myTable_wrapper"
                      class="dataTables_wrapper no-footer"
                    >
                      <div class="dataTables_length" id="myTable_length">
                        <label
                          >Show
                          <select
                            name="myTable_length"
                            aria-controls="myTable"
                            class=""
                            v-model="searchQuery.resultsPerPage"
                          >
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                          </select>
                          entries</label
                        >
                      </div>
                      <DashboardTable
                        v-if="columns.length"
                        :columns="columns"
                        parent="Deliverables"
                        @deliverableSortQuery="sortQuery()"
                      />
                      <pagination
                        v-if="searchQuery"
                        :pageNum="searchQuery.pageNum"
                        :resultsPerPage="
                          Number.parseInt(searchQuery.resultsPerPage)
                        "
                        :totalResults="totalResults"
                        :maxPages="3"
                        @paginate="paginate"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <modal class="my-modal" v-if="showModal" @close="showModal = false">
              <h3 slot="header">Search</h3>
              <div slot="body">
                <div class="input-group mb-3">
                  <input
                    v-model="searchWord"
                    type="text"
                    class="form-control"
                    placeholder="Search"
                    v-on:keyup.enter="searchKeyUp"
                    v-on:keyup.down="onArrowDown"
                    ref="searchInput"
                    tabindex="0"
                  />
                  <div class="input-group-append">
                    <button
                      v-on:click="searchFiles"
                      class="btn btn-success"
                      type="button"
                    >
                      Go
                    </button>
                  </div>
                </div>
                <div class="scrollDiv">
                  <table
                    id="myTable"
                    data-detail-view="true"
                    class="table"
                    ref="tbl"
                  >
                    <thead>
                      <tr>
                        <th data-sortable="true" data-field="collectionName">
                          Collection
                        </th>
                        <th data-sortable="true" data-field="itemName">Item</th>
                        <th data-sortable="true" data-field="externalSource">
                          External Source
                        </th>
                        <th data-sortable="true" data-field="externalId">
                          External ID
                        </th>
                        <th data-sortable="true" data-field="primaryfileName">
                          Content File
                        </th>
                        <th
                          data-sortable="true"
                          data-field="primaryfileOriginalname"
                        >
                          Filename
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        class="deliverables-search"
                        v-for="(pfile, index) in searchedPfiles"
                        v-bind:key="index"
                        :ref="'row' + index"
                        tabindex="0"
                        v-on:keyup.down="onArrowDown"
                        v-on:keyup.up="onArrowUp"
                        v-on:click="rowClicked(index)"
                        v-bind:class="{
                          highlight: rowSelected(pfile.primaryfileId),
                        }"
                      >
                        <td>{{ pfile.collectionName }}</td>
                        <td>{{ pfile.itemName }}</td>
                        <td>{{ pfile.externalSource }}</td>
                        <td>{{ pfile.externalId }}</td>
                        <td>{{ pfile.primaryfileName }}</td>
                        <td
                          style="max-width: 30px !important; overflow-wrap: break-word;"
                        >
                          {{ pfile.primaryfileOriginalname }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <slot slot="footer" class="my-modal-footer">
                <button
                  type="button"
                  class="btn btn-outline pull-left"
                  data-dismiss="modal"
                  v-on:click="close()"
                  aria-label="Close"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  v-on:click="done()"
                >
                  Done
                </button>
              </slot>
            </modal>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { sync } from "vuex-pathify";
import { env } from "@/helpers/env";
import Modal from "@/components/shared/Modal.vue";
import SharedService from "@/service/shared-service";
import WorkflowService from "../../service/workflow-service";
import WorkflowResultService from "../../service/workflow-result-service";
import SortableHeader from "../shared/SortableHeader";
import Pagination from "../shared/Pagination";
import Loader from "@/components/shared/Loader.vue";
import DashboardTable from "@/components/dashboard/DashboardTable.vue";

export default {
  name: "Deliverables",
  components: {
    Modal,
    SortableHeader,
    Pagination,
    Loader,
    DashboardTable,
  },
  data() {
    return {
      sharedService: new SharedService(),
      workflowService: new WorkflowService(),
      workflowResultService: new WorkflowResultService(),
      pfile: {
        collectionName: "None",
        itemName: "None",
        externalSource: "None",
        externalId: "None",
        primaryfileName: "None",
        primaryfileOriginalname: "None",
      },
      showModal: false,
      searchWord: "",
      searchedPfiles: [],
      selectedPfileIds: [],
      selectedIndex: -1,
      finalResults: [],
      rows: [],
      totalResults: 0,
      loading: false,
      canDeliverFinalResults: false,
      columns: [
        { label: "Date", field: "dateCreated" },
        { label: "Submitter", field: "submitter" },
        { label: "Workflow", field: "workflowName" },
        { label: "Step", field: "workflowStep" },
        { label: "Output", field: "outputName" },
        { label: "Alias", field: "outputLabel" },
        { label: "Final", field: "isFinal" },
      ],
      searchQuery: {
        sortRule: {
          columnName: "outputName",
          orderByDescending: false,
        },
        pageNum: 1,
        resultsPerPage: 10,
        filterByDates: [],
        filterByTestDates: [],
        filterBySubmitters: [],
        filterByCollections: [],
        filterByItems: [],
        filterByFiles: [],
        filterByWorkflows: [],
        filterBySteps: [],
        filterByStatuses: ["COMPLETE"],
        filterBySearchTerms: [],
        filterByFinal: false,
      },
    };
  },
  computed: {
    workflowDashboard: sync("workflowDashboard"),
  },
  methods: {
    async paginate(page_number) {
      this.searchQuery.pageNum = page_number;
      await this.getResults();
    },
    async filterByFinal() {
      this.searchQuery.pageNum = 1;
      this.searchQuery.filterByFinal = !this.searchQuery.filterByFinal;
      await this.getResults();
    },
    async sortQuery() {
      this.searchQuery.sortRule = this.workflowDashboard.searchQuery.sortRule;
      this.searchQuery.pageNum = 1;
      await this.getResults();
    },
    onArrowDown(e) {
      e.preventDefault();
      let self = this;
      if (self.selectedIndex < self.searchedPfiles.length - 1) {
        self.selectedIndex++;
        self.setPrimaryfileId(self.selectedIndex);
        this.$nextTick(() => this.scroll());
      }
    },
    onArrowUp(e) {
      e.preventDefault();
      let self = this;
      if (self.selectedIndex > 0) {
        self.selectedIndex--;
        self.setPrimaryfileId(self.selectedIndex);
        this.$nextTick(() => this.scroll());
      }
    },
    scroll() {
      var thisElement = this.$refs["row" + this.selectedIndex];
      thisElement[0].focus();
      thisElement[0].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    },
    rowSelected(primaryfileId) {
      return this.selectedPfileIds.includes(primaryfileId);
    },
    rowClicked(selIndex) {
      let self = this;
      this.selectedIndex = selIndex;
      self.setPrimaryfileId(selIndex);
    },
    setPrimaryfileId(index) {
      let self = this;
      self.selectedPfileIds = [];
      var primaryfile = self.searchedPfiles[index];
      self.selectedPfileIds.push(primaryfile.primaryfileId);
    },
    close() {
      this.showModal = false;
      this.selectedPfileIds = [];
    },
    async done() {
      this.showModal = false;
      if (this.selectedPfileIds.length > 0) {
        this.setPfiles();
        this.searchQuery.pageNum = 1;
        await this.getResults();
      }
    },
    async searchKeyUp(e) {
      if (e.keyCode === 13) {
        this.searchFiles();
      }
    },
    async searchFiles() {
      let self = this;
      self.selectedIndex = -1;
      self.selectedPfileIds = [];
      self.searchedPfiles = [];
      self.loading = true;
      if (self.searchWord.length > 0) {
        var response = await self.workflowService.searchFiles(
          this.searchWord,
          "000",
          env.getEnv("VUE_APP_AC_ACTIONTYPE_CREATE"), 
          env.getEnv("VUE_APP_AC_TARGETTYPE_BAG")      
        );
        if (response && response.items) {
          for (var i = 0; i < response.items.length; i++) {
            var thisItem = response.items[i];
            for (var p = 0; p < thisItem.primaryfiles.length; p++) {
              var thisPrimaryFile = thisItem.primaryfiles[p];
              self.searchedPfiles.push({
                collectionName: thisItem.collectionName,
                collectionId: thisItem.collectionId,
                itemName: thisItem.itemName,
                itemId: thisItem.itemId,
                externalSource: thisItem.externalSource,
                externalId: thisItem.externalId,
                primaryfileId: thisPrimaryFile.id,
                primaryfileName: thisPrimaryFile.name,
                primaryfileOriginalname: thisPrimaryFile.originalFilename,
              });
            }
          }
        }
      } else {
        self.searchedPfiles = [];
      }
      self.loading = false;
    },
    setPfiles() {
      let self = this;
      this.workflowDashboard.searchQuery.sortRule = self.searchQuery.sortRule;
      this.searchQuery.filterByCollections = [];
      this.searchQuery.filterByItems = [];
      this.searchQuery.filterByFiles = [];
      for (var s = 0; s < this.selectedPfileIds.length; s++) {
        for (var i = 0; i < this.searchedPfiles.length; i++) {
          var thisPfile = this.searchedPfiles[i];
          if (thisPfile.primaryfileId === this.selectedPfileIds[s]) {
            this.searchQuery.filterByCollections.push(thisPfile.collectionId);
            this.searchQuery.filterByItems.push(thisPfile.itemId);
            this.searchQuery.filterByFiles.push(thisPfile.primaryfileId);
            this.pfile = thisPfile;
          }
        }
      }
    },
    async getResults() {
      let self = this;
      try {
        if (self.pfile.itemName == "None") {
          return;
        }
        self.loading = true;
        var response = await this.workflowResultService.getWorkflowResults(
          self.searchQuery, 
          env.getEnv("VUE_APP_AC_ACTIONTYPE_CREATE"), 
          env.getEnv("VUE_APP_AC_TARGETTYPE_BAG")
        );
        self.rows = response.rows;
        self.workflowDashboard.searchResult.rows = response.rows;
        self.totalResults = response.totalResults;
      } catch (error) {
        self.$bvToast.toast(
          "Oops! Something went wrong.",
          self.sharedService.erorrToastConfig
        );
        console.error(error.message);
      }
      self.loading = false;
    },
    searchModal() {
      let self = this;
      self.showModal = true;
      self.selectedIndex = -1;
      self.$nextTick(() => self.$refs.searchInput.focus());
    },
  },
  mounted() {
    this.workflowDashboard.searchQuery.sortRule.columnName = "outputName";
    this.workflowDashboard.searchQuery.sortRule.orderByDescending = false;
  },
  beforeDestroy() {
    this.workflowDashboard.searchQuery.rows = [];
    this.workflowDashboard.searchQuery.filterByStatuses = [];
    this.workflowDashboard.searchQuery.sortRule.columnName = "dateCreated";
    this.workflowDashboard.searchQuery.sortRule.orderByDescending = true;
    this.workflowDashboard.searchQuery.pageNum = 1;
  },
};
</script>

<style scoped>
@import "../../styles/style.css";
.deliverables-search {
  cursor: pointer;
}
.sub-title {
  font-size: 1.2em;
  float: left;
  font-weight: bold;
  padding: 0;
  margin: 0 1em 0 0;
}
.sub-title span {
  font-weight: normal;
}
#btn-search-modal {
  position: absolute;
  right: 0;
  top: 0.5em;
  z-index: 1 !important;
}
.table-responsive {
  position: relative;
  padding-top: 19px;
}
.final-choice-top {
  z-index: 1001;
  display: flex;
  justify-content: space-around;
  position: absolute;
  top: 0;
  left: 170px;
}
.modalOpen {
  position: fixed;
}
.final-choice-top {
  z-index: 1001;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: distribute;
  justify-content: space-around;
  position: absolute;
  top: 0;
  left: 170px;
}
#myTable {
  z-index: 20;
}

@media screen and (max-width: 700px) {
  #btn-search-modal {
    position: relative;
    display: block;
    margin-bottom: 10px;
  }
  .final-choice-top {
    position: relative;
    display: block;
    left: 0;
    margin-bottom: 10px;
  }
  #myTable_length {
    float: none;
    text-align: left !important;
  }
}
</style>
