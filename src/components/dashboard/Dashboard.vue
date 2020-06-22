<template>

  <div class="collections">
  <div class="container col-12">
    <div class="row expand-h">
      <Sidebar/>
      <div class="col-10 bg-light-gray-1">
        <header class="bg-white"> <a href="#">
            <svg data-prefix="fas" data-icon="user-circle" class="float-right icon-user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
              <path class="icon-dark-1" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"></path>
            </svg></a>
        </header>
        <main>
          <div class="pad-all-3">
            <div class="card">
              <div class="card-body">
                <h1 class="card-title">AMP Dashboard</h1>
                <button class="btn-sm btn btn-primary marg-bot-4" v-on:click="startWorkflow">Start a new workflow</button>


                <div class="container-fluid " v-if="filterCount>0">
                  <div class="row selected-filters-row">
                    <div class="col-sm-2 label-bold">CURRENTLY FILTERED BY</div>
                    
                    <button class="btn btn-outline col-sm-2 selected-filter-button" v-for = "(submitter,index) in workflowDashboard.searchQuery.filterBySubmitters" v-bind:submitter="submitter" v-bind:index="index" v-bind:key="submitter.id"> 
                      <div class="row">
                        <svg class="col-auto" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"  width="24" height="24" viewBox="0 0 24 24" @click="removeSubmitterFilter(index)">
                          <path fill="#808080" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"></path>
                        </svg>
                        <div class="col-sm-1">
                          <label class="row label-bold no-padding-col">Submitter </label>
                          <label class="row no-padding-col">{{submitter}}</label>
                        </div>
                      </div>
                    </button>       
                    <button class="btn btn-outline col-sm-2 selected-filter-button" v-for = "(workflow,index) in workflowDashboard.searchQuery.filterByWorkflows" v-bind:workflow="workflow" v-bind:index="index" v-bind:key="workflow.id"> 
                      <div class="row">
                        <svg class="col-auto" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"  width="24" height="24" viewBox="0 0 24 24" @click="removeWorkflowFilter(index)">
                          <path fill="#808080" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"></path>
                        </svg>
                        <div class="col-sm-1">
                          <label class="row label-bold no-padding-col">Workflow </label>
                          <label class="row no-padding-col">{{workflow}}</label>
                        </div>
                      </div>
                    </button>       
                    <button class="btn btn-outline col-sm-2 selected-filter-button" v-for = "(item,index) in workflowDashboard.searchQuery.filterByItems" v-bind:item="item" v-bind:index="index" v-bind:key="item.id"> 
                      <div class="row">
                        <svg class="col-auto" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"  width="24" height="24" viewBox="0 0 24 24" @click="removeItemFilter(index)">
                          <path fill="#808080" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"></path>
                        </svg>
                        <div class="col-sm-1">
                          <label class="row label-bold no-padding-col">Item </label>
                          <label class="row no-padding-col">{{item}}</label>
                        </div>
                      </div>
                    </button>       
                    <button class="btn btn-outline col-sm-2 selected-filter-button" v-for = "(file,index) in workflowDashboard.searchQuery.filterByFiles" v-bind:file="file" v-bind:index="index" v-bind:key="file.id"> 
                      <div class="row">
                        <svg class="col-auto" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"  width="24" height="24" viewBox="0 0 24 24" @click="removeFileFilter(index)">
                          <path fill="#808080" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"></path>
                        </svg>
                        <div class="col-sm-1">
                          <label class="row label-bold no-padding-col">File </label>
                          <label class="row no-padding-col">{{file}}</label>
                        </div>
                      </div>
                    </button>       
                    <button class="btn btn-outline col-sm-2 selected-filter-button" v-for = "(step,index) in workflowDashboard.searchQuery.filterBySteps" v-bind:step="step" v-bind:index="index" v-bind:key="step.id"> 
                      <div class="row">
                        <svg class="col-auto" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"  width="24" height="24" viewBox="0 0 24 24" @click="removeStepFilter(index)">
                          <path fill="#808080" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"></path>
                        </svg>
                        <div class="col-sm-1">
                          <label class="row label-bold no-padding-col">Step </label>
                          <label class="row no-padding-col">{{step}}</label>
                        </div>
                      </div>
                    </button>       
                    <button class="btn btn-outline col-sm-2 selected-filter-button" v-for = "(status,index) in workflowDashboard.searchQuery.filterByStatuses" v-bind:status="status" v-bind:index="index" v-bind:key="status.id"> 
                      <div class="row">
                        <svg class="col-auto" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"  width="24" height="24" viewBox="0 0 24 24" @click="removeStatusFilter(index)">
                          <path fill="#808080" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"></path>
                        </svg>
                        <div class="col-sm-1">
                          <label class="row label-bold no-padding-col">Status </label>
                          <label class="row no-padding-col">{{status}}</label>
                        </div>
                      </div>
                    </button>       
                    <button class="btn btn-outline col-sm-2 selected-filter-button" v-for = "(searchTerm,index) in workflowDashboard.searchQuery.filterBySearchTerm" v-bind:searchTerm="searchTerm" v-bind:index="index" v-bind:key="index"> 
                      <div class="row">
                        <svg class="col-auto" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"  width="24" height="24" viewBox="0 0 24 24" @click="removeSearchFilter(index)">
                        <path fill="#808080" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"></path>
                        </svg>
                        <div class="col-sm-1">
                          <label class="row label-bold no-padding-col">Search Term </label>
                          <label class="row no-padding-col">{{searchTerm}}</label>
                        </div>
                      </div>
                    </button>     

                    <button class="btn btn-outline col-sm-2 selected-filter-button" v-if="filterCount>1"> 
                      <div class="row">
                        <svg class="col-auto" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"  width="24" height="24" viewBox="0 0 24 24" @click="clearAll()">
                        <path fill="#808080" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"></path>
                        </svg>
                        <div class="col-sm-1">
                          <label class="bold" style="min-height:16px;">Clear all</label>
                        </div>
                      </div>
                    </button>          
                  </div>
                </div>
                
                <div class="container-fluid">
                  <div class="row filter-btns">
                    <div class="dropdown">
                      <button class="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Date range
                      </button>
                      <div class="dropdown-menu compact-form" aria-labelledby="dropdownMenuButton">
                        <form class="">
                          <div class="form-group row">
                            <label for="colFormLabelFrom" class="col-sm-4 col-form-label col-form-label-sm text-right">From</label>
                            <div class="col-sm-8">
                              <input type="date" class="form-control form-control-sm" id="colFormLabelFrom">
                            </div>
                          </div>
                          <div class="form-group row">
                            <label for="colFormLabelFrom2" class="col-sm-4 col-form-label col-form-label-sm text-right">To</label>
                            <div class="col-sm-8">
                              <input type="date" class="form-control form-control-sm" id="colFormLabelFrom2">
                            </div>
                          </div>
                          <div class="form-group row">
                            <div class="col-sm-12">
                              <button class="btn btn-info float-right">Filter</button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    <SubmitterFilter/>
                    <WorkflowFilter/>
                    <ItemFilter/>
                    <FileFilter/>
                    <StepFilter/>
                    <StatusFilter/>
                  </div>
                  <div class="row spacer">
                  </div>
                </div>
                <DashboardTable/>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
  
</div>
</template>

<script>
import { sync } from 'vuex-pathify'
import Sidebar from '@/components/navigation/Sidebar.vue'; 
import DashboardTable from '@/components/dashboard/DashboardTable.vue';
import SubmitterFilter from '@/components/dashboard/DashboardFilters/SubmitterFilter';
import WorkflowFilter from '@/components/dashboard/DashboardFilters/WorkflowFilter';
import ItemFilter from '@/components/dashboard/DashboardFilters/ItemFilter';
import FileFilter from '@/components/dashboard/DashboardFilters/FileFilter';
import StepFilter from '@/components/dashboard/DashboardFilters/StepFilter';
import StatusFilter from '@/components/dashboard/DashboardFilters/StatusFilter';


export default {
  name: 'Dashboard',
  components:{
    Sidebar,
    DashboardTable,
    SubmitterFilter,
    WorkflowFilter,
    ItemFilter,
    FileFilter,
    StepFilter,
    StatusFilter,
  },
  data(){
    return {
      workflowSubmitted: false,
      bundle: null,
      visible : true,
    }
  },
  computed:{
    workflowDashboard: sync("workflowDashboard"),
    filterCount:function(){
      return this.workflowDashboard.searchQuery.filterBySubmitters.length 
        + this.workflowDashboard.searchQuery.filterByWorkflows.length 
        + this.workflowDashboard.searchQuery.filterByItems.length 
        + this.workflowDashboard.searchQuery.filterByFiles.length 
        + this.workflowDashboard.searchQuery.filterBySteps.length 
        + this.workflowDashboard.searchQuery.filterByStatuses.length 
        + this.workflowDashboard.searchQuery.filterBySearchTerm.length;
    }
  },
  props: {
  },
  methods:{
    clearAll(){
      this.workflowDashboard.searchQuery.filterBySubmitters=[];
      this.workflowDashboard.searchQuery.filterByWorkflows=[];
      this.workflowDashboard.searchQuery.filterByItems=[];
      this.workflowDashboard.searchQuery.filterByFiles=[];
      this.workflowDashboard.searchQuery.filterBySteps=[];
      this.workflowDashboard.searchQuery.filterByStatuses=[];
      this.workflowDashboard.searchQuery.filterBySearchTerm=[];
    },
    startWorkflow(){
      this.$router.push('/workflow/submit');
    },
    removeSubmitterFilter(index){
      var removed = this.workflowDashboard.searchQuery.filterBySubmitters.splice(index,1);
      console.log("selected submitters are:"+this.workflowDashboard.searchQuery.filterBySubmitters +" and removed element is:"+removed);
    },
    removeWorkflowFilter(index){
      var removed = this.workflowDashboard.searchQuery.filterByWorkflows.splice(index,1);
      console.log("selected workflows are:"+this.workflowDashboard.searchQuery.filterByWorkflows +" and removed element is:"+removed);
    },
    removeItemFilter(index){
      var removed = this.workflowDashboard.searchQuery.filterByItems.splice(index,1);
      console.log("selected items are:"+this.workflowDashboard.searchQuery.filterByItems +" and removed element is:"+removed);
    },
    removeFileFilter(index){
      var removed = this.workflowDashboard.searchQuery.filterByFiles.splice(index,1);
      console.log("selected files are:"+this.workflowDashboard.searchQuery.filterByFiles +" and removed element is:"+removed);
    },
    removeStepFilter(index){
      var removed = this.workflowDashboard.searchQuery.filterBySteps.splice(index,1);
      console.log("selected steps are:"+this.workflowDashboard.searchQuery.filterBySteps +" and removed element is:"+removed);
    },
    removeStatusFilter(index){
      var removed = this.workflowDashboard.searchQuery.filterByStatuses.splice(index,1);
      console.log("selected statuses are:"+this.workflowDashboard.searchQuery.filterByStatuses +" and removed element is:"+removed);
    },
    removeSearchFilter(index){
      var removed = this.workflowDashboard.searchQuery.filterBySearchTerm.splice(index,1);
      console.log("selected search terms are:"+this.workflowDashboard.searchQuery.filterBySearchTerm +" and removed element is:"+removed);
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .spacer{
    height: 24px;
  }

  .selected-filters-row{
    margin-left: -30px;
    margin-bottom: 8px;
    flex-wrap: wrap;
  }

  .selected-filter-button{
    background-color:white;
    border:2px solid;
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
  }

  .label-bold{
    font-weight: bold;
    flex-wrap: wrap; 
  }

  .no-padding-col{
    margin-bottom: 0px;
    flex-wrap: wrap;
  }
</style>
