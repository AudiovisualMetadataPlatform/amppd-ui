<template>
<div>
  
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr >
              <sortable-header v-for="column in columns" :key="column.field"
                      :property-name="column.field"
                       :sort-rule="searchQuery.sortRule"
                       @sort="sortQuery"
                       :label="column.label" />
            </tr>
          </thead>
          <tbody>
            <tr v-for="rec in visibleRows"
              :key="rec.id">
              <td>{{ rec.date }}</td>
              <td>{{ rec.submitter }}</td>
              <td>{{ rec.workflowName }}</td>
              <td>{{ rec.sourceItem }}</td>
              <td>{{ rec.sourceFileName }}</td>
              <td>{{ rec.workflowStep }}</td>
              <td>{{ rec.outputFile }}</td>
              <td>{{ rec.status }}</td>
            </tr>
          </tbody>
        </table>
      </div>
          <pagination v-if="this.searchQuery"
                :pageNum="searchQuery.pageNum"
                :resultsPerPage="searchQuery.resultsPerPage"
                :totalResults="searchResult.totalResults"
                :maxPages="1"
                @paginate="paginate" />
</div>
</template>

<script>

import { sync } from 'vuex-pathify';
import WorkflowService from '../../service/workflow-service';
import SortableHeader from '../shared/SortableHeader';
import Pagination from '../shared/Pagination';
export default {
  name: 'WorkflowDashboardTable',
  components:{
    SortableHeader,
    Pagination
  },
  data(){
    return {
      searchQuery: {
        sortRule: {
          columnName: 'Created',
          orderByDescending: true
        },
        pageNum: 1,
        resultsPerPage: 5
      },
      searchResult: {
        totalResults: 0
      },
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
      rows:[
      {
        date: new Date(new Date().getTime() + Math.random() * 100000000),
        submitter: 'Dan',
        workflowName: 'Test Workflow ' + Math.random(),
        sourceItem: 'West Side Story',
        sourceFilename: 'valjd.mp4',
        workflowStep: 'step 1',
        outputFile: 'out.1.txt',
        status: 'Completed'
      },{
        date: new Date(new Date().getTime() + Math.random() * 100000000),
        submitter: 'Dan',
        workflowName: 'Test Workflow ' + Math.random(),
        sourceItem: 'West Side Story',
        sourceFilename: 'valjd.mp4',
        workflowStep: 'step 1',
        outputFile: 'out.1.txt',
        status: 'Completed'
      },{
        date: new Date(new Date().getTime() + Math.random()),
        submitter: 'Dan',
        workflowName: 'Test Workflow ' + Math.random(),
        sourceItem: 'West Side Story',
        sourceFilename: 'valjd.mp4',
        workflowStep: 'step 1',
        outputFile: 'out.1.txt',
        status: 'Completed'
      },{
        date: new Date(new Date().getTime() + Math.random() * 100000000),
        submitter: 'Dan',
        workflowName: 'Test Workflow ' + Math.random(),
        sourceItem: 'West Side Story',
        sourceFilename: 'valjd.mp4',
        workflowStep: 'step 1',
        outputFile: 'out.1.txt',
        status: 'Completed'
      },{
        date: new Date(),
        submitter: 'Dan',
        workflowName: 'Test Workflow ' + Math.random(),
        sourceItem: 'West Side Story',
        sourceFilename: 'valjd.mp4',
        workflowStep: 'step 1',
        outputFile: 'out.1.txt',
        status: 'Completed'
      },{
        date: new Date(),
        submitter: 'Dan',
        workflowName: 'Test Workflow',
        sourceItem: 'West Side Story',
        sourceFilename: 'valjd.mp4',
        workflowStep: 'step 1',
        outputFile: 'out.1.txt',
        status: 'Completed'
      },{
        date: new Date(),
        submitter: 'Dan',
        workflowName: 'Test Workflow ' + Math.random(),
        sourceItem: 'West Side Story',
        sourceFilename: 'valjd.mp4',
        workflowStep: 'step 1',
        outputFile: 'out.1.txt',
        status: 'Completed'
      },{
        date: new Date(new Date().getTime() + Math.random()),
        submitter: 'Dan',
        workflowName: 'Test Workflow ' + Math.random(),
        sourceItem: 'West Side Story',
        sourceFilename: 'valjd.mp4',
        workflowStep: 'step 1',
        outputFile: 'out.1.txt',
        status: 'Completed'
      },{
        date: new Date(),
        submitter: 'Dan',
        workflowName: 'Test Workflow',
        sourceItem: 'West Side Story',
        sourceFilename: 'valjd.mp4',
        workflowStep: 'step 1',
        outputFile: 'out.1.txt',
        status: 'Completed'
      },{
        date: new Date(new Date().getTime() + Math.random()),
        submitter: 'Dan',
        workflowName: 'Test Workflow ' + Math.random(),
        sourceItem: 'West Side Story',
        sourceFilename: 'valjd.mp4',
        workflowStep: 'step 1',
        outputFile: 'out.1.txt',
        status: 'Completed'
      },{
        date: new Date(),
        submitter: 'Dan',
        workflowName: 'Test Workflow',
        sourceItem: 'West Side Story',
        sourceFilename: 'valjd.mp4',
        workflowStep: 'step 1',
        outputFile: 'out.1.txt',
        status: 'Completed'
      },{
        date: new Date(new Date().getTime() + Math.random()),
        submitter: 'Dan',
        workflowName: 'Test Workflow ' + Math.random(),
        sourceItem: 'West Side Story',
        sourceFilename: 'valjd.mp4',
        workflowStep: 'step 1',
        outputFile: 'out.1.txt',
        status: 'Completed'
      },{
        date: new Date(),
        submitter: 'Dan',
        workflowName: 'Test Workflow',
        sourceItem: 'West Side Story',
        sourceFilename: 'valjd.mp4',
        workflowStep: 'step 1',
        outputFile: 'out.1.txt',
        status: 'Completed'
      },{
        date: new Date(),
        submitter: 'Dan',
        workflowName: 'Test Workflow',
        sourceItem: 'West Side Story',
        sourceFilename: 'valjd.mp4',
        workflowStep: 'step 1',
        outputFile: 'out.1.txt',
        status: 'Completed'
      },{
        date: new Date(new Date().getTime() + Math.random()),
        submitter: 'Dan',
        workflowName: 'Test Workflow',
        sourceItem: 'West Side Story',
        sourceFilename: 'valjd.mp4',
        workflowStep: 'step 1',
        outputFile: 'out.1.txt',
        status: 'Completed'
      },{
        date: new Date(),
        submitter: 'Dan',
        workflowName: 'Test Workflow',
        sourceItem: 'West Side Story',
        sourceFilename: 'valjd.mp4',
        workflowStep: 'step 1',
        outputFile: 'out.1.txt',
        status: 'Completed'
      }
      ],
      workflowService: new WorkflowService()
    }
  },
  computed:{
    visibleRows(){
      var from = ((this.searchQuery.pageNum - 1) * this.searchQuery.resultsPerPage);
      var to = this.searchQuery.pageNum * this.searchQuery.resultsPerPage;
      console.log(this.searchQuery.pageNum);
      console.log(from + " " + to);
      return this.rows.slice(from, to);
    }
  },
  props: {
  },
  methods:{
    async sortQuery(sortRule) {
        this.searchQuery.sortRule = sortRule;
        this.searchQuery.pageNum = 1;
        var sortOrder = sortRule.orderByDescending ? 'desc' : 'asc';
        this.rows.sort(this.compareValues(sortRule.columnName, sortOrder))
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
      this.searchQuery.pageNum = page_number;
    },
    refreshData(){
      this.searchResult.totalResults = this.rows.length;
      console.log(this.searchResult.totalResults);
    }
  },
  mounted(){
    this.refreshData();
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  @import '/amppd-ui/src/styles/style.css';
  .center-row{
    text-align: center;
    font-weight: 700;
    background-color: #c5c5c5c5;
  }
  
.font-light-gray-1 {
  color: #dee2e6; 
}
.font-purple-1{
  color: #6f42c1;
}

</style>
