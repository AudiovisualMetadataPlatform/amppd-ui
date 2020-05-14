<template>
<div class="dataTables_wrapper no-footer">
  <loader :show="workflowDashboard.loading"/>
  <div class="dataTables_length">
    <label>Show <select name="myTable_length" v-model="workflowDashboard.searchQuery.resultsPerPage" aria-controls="myTable" class="">
      <option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select> 
      entries
    </label>
  </div>
  <div id="myTable_filter" class="dataTables_filter"><label>Search:<input type="search" class="" placeholder="" aria-controls="myTable"></label></div>
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
              <td>{{ rec.outputFile }}</td>
              <td> 
                <button v-if="rec.status==='COMPLETE'" type="button" class="btn-sm btn btn-success eq-width">Complete</button>
                <button v-else-if="rec.status==='IN_PROGRESS'" type="button" class="btn-sm btn btn-warning eq-width ">In Progress</button>
                <button v-else-if="rec.status==='ERROR'" type="button" class="btn-sm btn btn-danger eq-width ">Error</button>
                <button v-else-if="rec.status==='SCHEDULED'" type="button" class="btn-sm btn btn-light eq-width ">Scheduled</button>
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
import WorkflowService from '../../service/workflow-service';
import SortableHeader from '../shared/SortableHeader';
import Pagination from '../shared/Pagination';
import Loader from '@/components/shared/Loader.vue';
export default {
  name: 'WorkflowDashboardTable',
  components:{
    SortableHeader,
    Pagination,
    Loader
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
      workflowService: new WorkflowService()
    }
  },
  computed:{
    workflowDashboard: sync("workflowDashboard"),
    visibleRows(){
      var from = ((this.workflowDashboard.searchQuery.pageNum - 1) * this.workflowDashboard.searchQuery.resultsPerPage);
      var to = this.workflowDashboard.searchQuery.pageNum * this.workflowDashboard.searchQuery.resultsPerPage;
      if(!this.workflowDashboard.rows || this.workflowDashboard.rows.length<=0) {
        return this.workflowDashboard.rows;
      }
      return this.workflowDashboard.rows.slice(from, to);
    }
  },
  props: {
  },
  methods:{
    async sortQuery(sortRule) {
        // TODO: Some sort of filtering algorithm should go here to reduce the result set
        this.workflowDashboard.searchQuery.sortRule = sortRule;
        this.workflowDashboard.searchQuery.pageNum = 1;
        var sortOrder = sortRule.orderByDescending ? 'desc' : 'asc';
        this.workflowDashboard.rows.sort(this.compareValues(sortRule.columnName, sortOrder))
      },

    compareValues(key, order = 'asc') {
      return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
          // property doesn't exist on either object
          return 0;
        }

        const varA = (typeof a[key] === 'string')
          ? a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string')
          ? b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
          comparison = 1;
        } else if (varA < varB) {
          comparison = -1;
        }
        return (
          (order === 'desc') ? (comparison * -1) : comparison
        );
      };
    },
    paginate(page_number) {
      this.workflowDashboard.searchQuery.pageNum = page_number;
    },
    refreshData(){
      this.workflowDashboard.searchResult.totalResults = this.workflowDashboard.rows.length;
    }
  },
  async mounted(){
    this.workflowDashboard.loading = true;
    this.workflowDashboard.rows = await this.workflowService.getDashboardResults();
    this.workflowDashboard.loading = false;
    this.refreshData();
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
