<template>
<div class="dataTables_wrapper no-footer">
  <loader :show="workflowDashboard.loading"/>
  <div class="dataTables_length">
    <label>Show <select name="myTable_length" v-model="workflowDashboard.searchQuery.resultsPerPage" aria-controls="myTable" class="">
      <option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select> 
      entries
    </label>
  </div>
 <search-filter />
      <div class="table-responsive">
        <table ide="myTable" class="table dataTable no-footer">
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
              <td>{{ new Date(rec.date) | dateFormat('YYYY-MM-DD') }}</td>
              <td>{{ rec.submitter }}</td>
              <td>{{ rec.workflowName }}</td>
              <td>{{ rec.sourceItem }}</td>
              <td>{{ rec.sourceFilename }}</td>
              <td>{{ rec.workflowStep }}</td>
              <td v-if="rec.outputPath == null">{{ rec.outputFile }}</td>
              <td v-else-if="rec.outputPath != null"><a v-bind:href="getOutputUrl(rec)" target="_blank">{{ rec.outputFile }}</a></td>
              <td> 
                <button v-if="rec.status==='COMPLETE'" type="button" class="btn-sm btn btn-success eq-width">Complete</button>
                <button v-else-if="rec.status==='IN_PROGRESS'" type="button" class="btn-sm btn btn-warning eq-width ">In Progress</button>
                <button v-else-if="rec.status==='ERROR'" type="button" class="btn-sm btn btn-danger eq-width ">Error</button>
                <button v-else-if="rec.status==='SCHEDULED'" type="button" class="btn-sm btn btn-light eq-width ">Scheduled</button>
                <button v-else-if="rec.status==='PAUSED'" type="button" class="btn-sm btn btn-light eq-width ">Paused</button>
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
          <pagination v-if="this.workflowDashboard.searchQuery"
                :pageNum="workflowDashboard.searchQuery.pageNum"
                :resultsPerPage="Number.parseInt(workflowDashboard.searchQuery.resultsPerPage)"
                :totalResults="workflowDashboard.searchResult.totalResults"
                :maxPages="1"
                @paginate="paginate" />
      </div>
</div>
</template>

<script>

import { sync } from 'vuex-pathify';
import DashboardService from '../../service/dashboard-service';
import SortableHeader from '../shared/SortableHeader';
import Pagination from '../shared/Pagination';
import SearchFilter from './DashboardFilters/SearchFilter';
import Loader from '@/components/shared/Loader.vue';

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
        {label: 'Date', field: 'date'},
        {label: 'Submitter', field: 'submitter'},
        {label: 'Workflow Name', field: 'workflowName'},
        {label: 'Source Item', field: 'sourceItem'},
        {label: 'Source Filename', field: 'sourceFilename'},
        {label: 'Workflow Step', field: 'workflowStep'},
        {label: 'Output File', field: 'outputFile'},
        {label: 'Status', field: 'status'},
      ],
      dashboardService: new DashboardService(),
    }
  },
  computed:{
    workflowDashboard: sync("workflowDashboard"),
    filterBySearchTerm: sync("workflowDashboard.searchQuery.filterBySearchTerm"),
    filterBySubmitters: sync("workflowDashboard.searchQuery.filterBySubmitters"),
    filterByWorkflows: sync("workflowDashboard.searchQuery.filterByWorkflows"),
    filterByItems: sync("workflowDashboard.searchQuery.filterByItems"),
    filterByFiles: sync("workflowDashboard.searchQuery.filterByFiles"),
    filterBySteps: sync("workflowDashboard.searchQuery.filterBySteps"),
    filterByStatues: sync("workflowDashboard.searchQuery.filterByStatues"),
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
  props: {
  },
  
  methods:{
    async sortQuery(sortRule) {
        this.workflowDashboard.searchQuery.sortRule = sortRule;
        this.workflowDashboard.searchQuery.pageNum = 1;
        this.refreshData();
      },
    paginate(page_number) {
      this.workflowDashboard.searchQuery.pageNum = page_number;
      this.refreshData();
    },
    async refreshData(){
      this.workflowDashboard.loading = true;
      this.workflowDashboard.searchResult = await this.dashboardService.getDashboardResults(this.workflowDashboard.searchQuery);
      this.workflowDashboard.loading = false;
    },
    getOutputUrl(rec) {
      const BASE_URL = process.env.VUE_APP_AMP_URL;
      const url = `${BASE_URL}/dashboard/${rec.id}/output`;
      return url; 
    }
  },
  async mounted(){
    this.refreshData();
  },
  watch:{
    filterBySearchTerm: function(){
      this.workflowDashboard.searchQuery.pageNum = 1;
      this.refreshData();
    },
    filterBySubmitters: function(){
      this.workflowDashboard.searchQuery.pageNum = 1;
      this.refreshData();
    },
    filterByWorkflows: function(){
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
    filterBySteps: function(){
      this.workflowDashboard.searchQuery.pageNum = 1;
      this.refreshData();
    },
    filterByStatuses: function(){
      this.workflowDashboard.searchQuery.pageNum = 1;
      this.refreshData();
    },
  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '/amppd-ui/src/styles/style.css';
  .no-results{
    text-align: center;
    font-weight: 700;
    color: #c5c5c5c5;
  } 
  table{font-size: .8em;}
.font-light-gray-1 {
  color: #dee2e6; 
}
.font-purple-1{
  color: #6f42c1;
}
th {
  padding: 10px 18px;
  border-bottom: 1px solid #111 !important;
}
</style>
