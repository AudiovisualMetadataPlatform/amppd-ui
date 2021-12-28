<template>
<div class="dataTables_wrapper no-footer">
  <loader :show="workflowDashboard.loading"/>
  <div class="export-row">
    <input id="export-results" type="button" class="btn btn-outline-primary btn-sm" v-on:click="exportResults" value="Export to CSV"/>
  </div>
  <div class="dataTables_length">
    <!-- <label>Show <select name="myTable_length" v-model="workflowDashboard.searchQuery.resultsPerPage" aria-controls="myTable" class="">
      <option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select>
      Entries
    </label> -->
    <label>Show <select name="myTable_length" v-model="workflowDashboard.searchQuery.resultsPerPage" aria-controls="myTable" class="" @change="refreshData()">
      <option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select>
      Entries
    </label>
    <!-- <span class="txt-v"> Show Relevant Results Only </span>
    <label class="switch" title="Relevant Result"><span class="sr-only">Relevant Result</span>
      <input type="checkbox" v-model="workflowDashboard.searchQuery.filterByRelevant">
      <span class="slider round"></span>
    </label> -->
  </div>   
  <div class="relevant-togggle"><span class="txt-v">Show Relevant Results Only</span>
    <label class="switch" title="Relevant Result"><span class="sr-only">Relevant Result</span>
      <input type="checkbox" v-model="workflowDashboard.searchQuery.filterByRelevant">
      <span class="slider round"></span>
    </label>
  </div>  
  <search-filter/>
   <br/>
  <b-pagination
        class="mt-3 justify-content-left"
        v-model="workflowDashboard.searchQuery.pageNum"
        :total-rows="workflowDashboard.searchResult.totalResults"
        :per-page="workflowDashboard.searchQuery.resultsPerPage"
        @change="paginate(workflowDashboard.searchQuery.pageNum)"
        size="sm"
        first-number
        last-number
      ></b-pagination>  
  <div class="table-responsive">
    <table id="myTable" class="table dataTable no-footer">
      <thead>
        <tr>
          <sortable-header v-for="column in columns" :key="column.field"
                  :property-name="column.field"
                    :sort-rule="workflowDashboard.searchQuery.sortRule"
                    @sort="sortQuery"
                    :label="column.label" />
        </tr>
      </thead>
      <tbody v-if="visibleRows && visibleRows.length>0">
        <tr v-for="rec in visibleRows"
          :key="rec.id">
          <td>{{ new Date(rec.dateCreated) | dateFormat('YYYY-MM-DD') }}</td>
          <td>{{ rec.submitter }}</td>
          <td>{{ rec.collectionName }}</td>
          <td>{{ rec.externalSource }}</td>
          <td>{{ rec.externalId }}</td>
          <td>{{ rec.itemName }}</td>
          <td><a v-bind:href="workflowResultService.getSourceUrl(rec.primaryfileId)" target="_blank">{{ rec.primaryfileName }}</a></td>
          <td>{{ rec.workflowName }}</td>
          <td>{{ rec.workflowStep }}</td>
          <td v-if="rec.outputPath != null && rec.status =='COMPLETE'"><a v-bind:href="workflowResultService.getOutputUrl(rec.id)" target="_blank" class="complete-output">{{ rec.outputName }}</a></td>
          <td v-else>{{ rec.outputName }}</td>
          <td> 
            <button v-if="rec.status==='COMPLETE'" type="button" class="btn-sm btn btn-success eq-width">Complete</button>
            <button v-else-if="rec.status==='IN_PROGRESS'" type="button" class="btn-sm btn btn-warning eq-width">In Progress</button>
            <button v-else-if="rec.status==='PAUSED'" type="button" class="btn-sm btn btn-primary eq-width">Paused</button>
            <button v-else-if="rec.status==='ERROR'" type="button" class="btn-sm btn btn-danger eq-width">Error</button>
            <button v-else-if="rec.status==='SCHEDULED'" type="button" class="btn-sm btn btn-blue eq-width">Scheduled</button>
            <button v-else-if="rec.status==='DELETED'" type="button" class="btn-sm btn eq-width">Deleted</button>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td v-if="workflowDashboard.loading" colspan="8" class="no-results"><i class="fas fa-cog fa-spin"></i> Loading</td>
          <td v-else colspan="8" class="no-results">No results</td>
        </tr>
      </tbody>
    </table>
    <!-- <pagination v-if="this.workflowDashboard.searchQuery"
          :pageNum="workflowDashboard.searchQuery.pageNum"
          :resultsPerPage="resultsPerPage"
          :totalResults="filteredRows.length"
          :maxPages="1"
          @paginate="paginate" /> -->
          <b-pagination
        class="mt-3 justify-content-left"
        v-model="workflowDashboard.searchQuery.pageNum"
        :total-rows="workflowDashboard.searchResult.totalResults"
        :per-page="workflowDashboard.searchQuery.resultsPerPage"
        @change="paginate(workflowDashboard.searchQuery.pageNum)"
        size="sm"
        first-number
        last-number
      ></b-pagination>
  </div>
</div>
</template>

<script>

import { sync } from 'vuex-pathify';
import WorkflowResultService from '../../service/workflow-result-service';
import SortableHeader from '../shared/SortableHeader';
import Pagination from '../shared/Pagination';
import SearchFilter from './DashboardFilters/SearchFilter';
import Loader from '@/components/shared/Loader.vue';
import SharedService from '../../service/shared-service';

export default {
  name: 'DashboardTable',
  components:{
    SortableHeader,
    Pagination,
    Loader,
    SearchFilter
  },
  data(){
    return {
      columns:[
        {label: 'Date', field: 'dateCreated'},
        {label: 'Submitter', field: 'submitter'},
        {label: 'Collection', field: 'collectionName'},
        {label: 'External Source', field: 'externalSource'},
        {label: 'External ID', field: 'externalId'},
        {label: 'Item', field: 'itemName'},
        {label: 'Primaryfile', field: 'primaryfileName'},
        {label: 'Workflow', field: 'workflowName'},
        {label: 'Step', field: 'workflowStep'},
        {label: 'Output', field: 'outputName'},
        {label: 'Status', field: 'status'},
      ],
      workflowResultService: new WorkflowResultService(),
      sharedService: new SharedService(),
    }
  },
  computed:{
    workflowDashboard: sync("workflowDashboard"),
    filterByCollections: sync("workflowDashboard.searchQuery.filterByCollections"),
    filterByUnits: sync("workflowDashboard.searchQuery.filterByUnits"),
    filterByWorkflows: sync("workflowDashboard.searchQuery.filterByWorkflows"),
    filterByOutputs: sync("workflowDashboard.searchQuery.filterByOutputs"),
    filterByStatuses: sync("workflowDashboard.searchQuery.filterByStatuses"),
    filterBySearchTerms: sync("workflowDashboard.searchQuery.filterBySearchTerms"),
    filterByRelevant: sync("workflowDashboard.searchQuery.filterByRelevant"),
    filterBySteps: sync("workflowDashboard.searchQuery.filterBySteps"),
    filterByExternalIds: sync("workflowDashboard.searchQuery.filterByExternalIds"),
    filterByDates: sync("workflowDashboard.searchQuery.filterByDates"),
    filterBySubmitters: sync("workflowDashboard.searchQuery.filterBySubmitters"),
    filterByItems: sync("workflowDashboard.searchQuery.filterByItems"),
    filterByFiles: sync("workflowDashboard.searchQuery.filterByFiles"),
   
    visibleRows(){
      let self=this;
      var from = ((this.workflowDashboard.searchQuery.pageNum - 1) * this.workflowDashboard.searchQuery.resultsPerPage);
      var to = this.workflowDashboard.searchQuery.pageNum * this.workflowDashboard.searchQuery.resultsPerPage;
      if(!this.workflowDashboard.searchResult.rows || this.workflowDashboard.searchResult.rows.length<=0) {
        return this.workflowDashboard.searchResult.rows;
      }
      
      return this.workflowDashboard.searchResult.rows;
    }
  },
  props: {},
  methods:{
    async sortQuery(sortRule) {
        this.workflowDashboard.searchQuery.sortRule = sortRule;
        this.workflowDashboard.searchQuery.pageNum = 1;
        this.refreshData();
    },
    getDateString() {
        const date = new Date();
        const year = date.getFullYear();
        const month = `${date.getMonth() + 1}`.padStart(2, '0');
        const day =`${date.getDate()}`.padStart(2, '0');
        return `${year}${month}${day}`
    },
    async exportResults() {
      console.log("export results");
      console.log(event.target);
      var content = await this.workflowResultService.exportWorkflowResults(this.workflowDashboard.searchQuery);
      var uriContent = encodeURIComponent(content);
      
      var link = document.createElement('a');
      var dateString 
      link.download = "AMPDashboardExport_" + this.getDateString() + ".csv";
      link.href = 'data:text/csv,' + uriContent;
      link.click();
    },
    paginate(page_number) {
      this.workflowDashboard.searchQuery.pageNum = page_number;
      this.refreshData();
    },
    async refreshData(){
      const self = this;
      self.workflowDashboard.loading = true;
      const response = await this.workflowResultService.getWorkflowResults(this.workflowDashboard.searchQuery);
        if(response.rows) {
          self.workflowDashboard.searchResult.rows = response.rows;
          this.workflowDashboard.searchResult.totalResults = response.totalResults;
        }
      self.workflowDashboard.loading = false;
    },
  },
  async mounted(){
    this.refreshData();
  },
  watch:{
    filterByDates: function(){
      // console.log("inside watcher for filterByDates",this.filterByDates[0]," ",this.filterByDates[1]);
      this.workflowDashboard.searchQuery.pageNum = 1;
      this.refreshData();
    },
    filterBySubmitters: function(){
      this.workflowDashboard.searchQuery.pageNum = 1;
      this.refreshData();
    },
    filterByCollections: function(){
      this.workflowDashboard.searchQuery.pageNum = 1;
      this.refreshData();
    },
    filterByUnits: function(){
      this.workflowDashboard.searchQuery.pageNum = 1;
      this.refreshData();
    },
    filterByExternalIds: function(){
      this.workflowDashboard.searchQuery.pageNum = 1;
      this.refreshData();
    },
    filterByItems: function(){
      this.workflowDashboard.searchQuery.pageNum = 1;
      this.refreshData();
    },
    filterByFiles: function(){
      this.workflowDashboard.searchQuery.pageNum = 1;
      this.refreshData();
    },
    filterByWorkflows: function(){
      this.workflowDashboard.searchQuery.pageNum = 1;
      this.refreshData();
    },
    filterBySteps: function(){
      this.workflowDashboard.searchQuery.pageNum = 1;
      this.refreshData();
    },
     filterByOutputs: function(){
      this.workflowDashboard.searchQuery.pageNum = 1;
      this.refreshData();
    },
    filterByStatuses: function(){
      this.workflowDashboard.searchQuery.pageNum = 1;
      this.refreshData();
    },
    filterBySearchTerms: function(){
      this.workflowDashboard.searchQuery.pageNum = 1;
      this.refreshData();
    },
    filterByRelevant: function(){
      this.workflowDashboard.searchQuery.pageNum = 1;
      this.refreshData();
    },    
  },
  beforeDestroy() {
    this.workflowDashboard.searchResult.rows = [];
    this.workflowDashboard.searchQuery.pageNum = 1;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '/amppd-ui/src/styles/style.css';  
  .no-results {
    text-align: center;
    font-weight: 700;
    color: #c5c5c5c5;
  }
  .table-responsive {
    padding-top:0;
  }
  table {
    font-size: .8em;
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
  .export-row{
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
  .btn-blue:hover, .btn-blue:active, .btn-blue:visited {
    background-color: #006de2 !important;
    border-color: #006de2 !important;
    cursor:auto;
  }
  .btn-success:hover, .btn-success:active, .btn-success:visited {
    background-color: #28a745 !important;
    border-color: #28a745 !important;
    cursor:auto;
  }
  .btn-danger:hover, .btn-danger:active, .btn-danger:visited {
    background-color: #dc3545 !important;
    border-color: #dc3545 !important;
    cursor:auto;
  }
  .btn-primary:hover, .btn-primary:active, .btn-primary:visited {
    background-color: #F4871E !important;
    border-color: #F4871E !important;
    color: #153c4d !important;
    cursor:auto;
  }
  .table thead th {
    vertical-align: middle !important;
  }
</style>
