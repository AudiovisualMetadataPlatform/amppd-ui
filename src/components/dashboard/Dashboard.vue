<template>

  <div class="collections w-100">
     <!-- <loader :show="!isFilterApiLoaded"/> -->
  <div class="container col-12">
    <div class="row">
      <!-- <Sidebar/> -->
      <div class="col-12 bg-light-gray-1">
        <main class="m-0">
          <!-- <Logout/> -->
          <div class="pad-all-3">
            <div class="card">
              <div class="card-body">
                <h1 class="card-title">AMP Dashboard</h1>
                <div class="container-fluid " v-if="filterCount>0">
                  <div class="row selected-filters-row">
                    <div class="col-sm-2 label-bold">CURRENTLY FILTERED BY</div>

                    <button class="btn btn-outline col-sm-2 selected-filter-button" v-if="workflowDashboard.searchQuery.filterByDates.length>0"> 
                      <div class="row">
                        <svg class="col-auto" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"  width="24" height="24" viewBox="0 0 24 24" @click="removeDateFilter()">
                        <path fill="#808080" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"></path>
                        </svg>
                        <div class="col-sm-1">
                          <label class="row label-bold no-padding-col">Date Range</label>
                          <label class="row no-padding-col">{{workflowDashboard.searchQuery.filterByDates[0].getMonth()+1}}/{{workflowDashboard.searchQuery.filterByDates[0].getDate()}}/{{workflowDashboard.searchQuery.filterByDates[0].getFullYear()}}
                             - {{workflowDashboard.searchQuery.filterByDates[1].getMonth()+1}}/{{workflowDashboard.searchQuery.filterByDates[1].getDate()}}/{{workflowDashboard.searchQuery.filterByDates[1].getFullYear()}}</label>
                        </div>
                      </div>
                    </button>     
                    <button class="btn btn-outline col-sm-2 selected-filter-button" v-for = "(submitter,index) in workflowDashboard.searchQuery.filterBySubmitters" v-bind:submitter="submitter" v-bind:index="index" v-bind:key="index"> 
                      <div class="row">
                        <svg class="col-auto" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"  width="24" height="24" viewBox="0 0 24 24" @click="removeSubmitterFilter(index)">
                          <path fill="#808080" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"></path>
                        </svg>
                        <div class="col-sm-1">
                          <label class="row label-bold no-padding-col">Submitter</label>
                          <label class="row no-padding-col">{{submitter}}</label>
                        </div>
                      </div>
                    </button>
                    <button class="btn btn-outline col-sm-2 selected-filter-button" v-for = "(unit,index) in workflowDashboard.searchQuery.filterByUnits" v-bind:workflow="unit" v-bind:index="index" v-bind:key="index"> 
                      <div class="row">
                        <svg class="col-auto" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"  width="24" height="24" viewBox="0 0 24 24" @click="removeUnitFilter(index)">
                          <path fill="#808080" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"></path>
                        </svg>
                        <div class="col-sm-1">
                          <label class="row label-bold no-padding-col">Unit</label>
                          <label class="row no-padding-col">{{unit}}</label>
                        </div>
                      </div>
                    </button>       
                    <button class="btn btn-outline col-sm-2 selected-filter-button" v-for = "(collection,index) in workflowDashboard.searchQuery.filterByCollections" v-bind:workflow="collection" v-bind:index="index" v-bind:key="index"> 
                      <div class="row">
                        <svg class="col-auto" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"  width="24" height="24" viewBox="0 0 24 24" @click="removeCollectionFilter(index)">
                          <path fill="#808080" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"></path>
                        </svg>
                        <div class="col-sm-1">
                          <label class="row label-bold no-padding-col">Collection</label>
                          <label class="row no-padding-col">{{collection}}</label>
                        </div>
                      </div>
                    </button>  
                      <button class="btn btn-outline col-sm-2 selected-filter-button" v-for = "(externalId,index) in workflowDashboard.searchQuery.filterByExternalIds" v-bind:externalId="externalId" v-bind:index="index" v-bind:key="index"> 
                      <div class="row">
                        <svg class="col-auto" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"  width="24" height="24" viewBox="0 0 24 24" @click="removeExternalIdFilter(index)">
                          <path fill="#808080" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"></path>
                        </svg>
                        <div class="col-sm-1">
                          <label class="row label-bold no-padding-col">External ID</label>
                          <label class="row no-padding-col">{{externalId}}</label>
                        </div>
                      </div>
                    </button>     
                    <button class="btn btn-outline col-sm-2 selected-filter-button" v-for = "(item,index) in workflowDashboard.searchQuery.filterByItems" v-bind:item="item" v-bind:index="index" v-bind:key="index"> 
                      <div class="row">
                        <svg class="col-auto" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"  width="24" height="24" viewBox="0 0 24 24" @click="removeItemFilter(index)">
                          <path fill="#808080" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"></path>
                        </svg>
                        <div class="col-sm-1">
                          <label class="row label-bold no-padding-col">Item</label>
                          <label class="row no-padding-col">{{item}}</label>
                        </div>
                      </div>
                    </button>       
                    <button class="btn btn-outline col-sm-2 selected-filter-button" v-for = "(file,index) in workflowDashboard.searchQuery.filterByFiles" v-bind:file="file" v-bind:index="index" v-bind:key="index"> 
                      <div class="row">
                        <svg class="col-auto" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"  width="24" height="24" viewBox="0 0 24 24" @click="removeFileFilter(index)">
                          <path fill="#808080" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"></path>
                        </svg>
                        <div class="col-sm-1">
                          <label class="row label-bold no-padding-col">Primaryfile</label>
                          <label class="row no-padding-col">{{file}}</label>
                        </div>
                      </div>
                    </button>       
                    <button class="btn btn-outline col-sm-2 selected-filter-button" v-for = "(workflow,index) in workflowDashboard.searchQuery.filterByWorkflows" v-bind:workflow="workflow" v-bind:index="index" v-bind:key="index"> 
                      <div class="row">
                        <svg class="col-auto" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"  width="24" height="24" viewBox="0 0 24 24" @click="removeWorkflowFilter(index)">
                          <path fill="#808080" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"></path>
                        </svg>
                        <div class="col-sm-1">
                          <label class="row label-bold no-padding-col">Workflow</label>
                          <label class="row no-padding-col">{{workflow}}</label>
                        </div>
                      </div>
                    </button>      
                    <button class="btn btn-outline col-sm-2 selected-filter-button" v-for = "(step,index) in workflowDashboard.searchQuery.filterBySteps" v-bind:step="step" v-bind:index="index" v-bind:key="index"> 
                      <div class="row">
                        <svg class="col-auto" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"  width="24" height="24" viewBox="0 0 24 24" @click="removeStepFilter(index)">
                          <path fill="#808080" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"></path>
                        </svg>
                        <div class="col-sm-1">
                          <label class="row label-bold no-padding-col">Step</label>
                          <label class="row no-padding-col">{{step}}</label>
                        </div>
                      </div>
                    </button>
                     <button class="btn btn-outline col-sm-2 selected-filter-button" v-for = "(output,index) in workflowDashboard.searchQuery.filterByOutputs" v-bind:output="output" v-bind:index="index" v-bind:key="index"> 
                      <div class="row">
                        <svg class="col-auto" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"  width="24" height="24" viewBox="0 0 24 24" @click="removeOutputFilter(index)">
                          <path fill="#808080" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"></path>
                        </svg>
                        <div class="col-sm-1">
                          <label class="row label-bold no-padding-col">Output</label>
                          <label class="row no-padding-col">{{output}}</label>
                        </div>
                      </div>
                    </button>       
                    <button class="btn btn-outline col-sm-2 selected-filter-button" v-for = "(status,index) in workflowDashboard.searchQuery.filterByStatuses" v-bind:status="status" v-bind:index="index" v-bind:key="index"> 
                      <div class="row">
                        <svg class="col-auto" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"  width="24" height="24" viewBox="0 0 24 24" @click="removeStatusFilter(index)">
                          <path fill="#808080" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"></path>
                        </svg>
                        <div class="col-sm-1">
                          <label class="row label-bold no-padding-col">Status</label>
                          <label class="row no-padding-col">{{status}}</label>
                        </div>
                      </div>
                    </button>
                    <button class="btn btn-outline col-sm-2 selected-filter-button" v-for = "(searchTerm,index) in workflowDashboard.searchQuery.filterBySearchTerms" v-bind:searchTerm="searchTerm" v-bind:index="index" v-bind:key="index"> 
                      <div class="row">
                        <svg class="col-auto" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"  width="24" height="24" viewBox="0 0 24 24" @click="removeSearchFilter(index)">
                        <path fill="#808080" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"></path>
                        </svg>
                        <div class="col-sm-1">
                          <label class="row label-bold no-padding-col">Search Term</label>
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
                    <b-button class="btn btn-info dropdown" v-b-modal.modal-lg @click="onOpenModal('unit')">Unit</b-button>
                    <b-button class="btn btn-info dropdown" v-b-modal.modal-lg @click="onOpenModal('collection')">Collection</b-button>
                    <b-button class="btn btn-info dropdown" v-b-modal.modal-lg @click="onOpenModal('workflow')">Workflow</b-button>
                    <b-button class="btn btn-info dropdown" v-b-modal.modal-lg @click="onOpenModal('output')">Output</b-button> 

                    <DateFilter
                      @displayChanged="changeDisplayedFilter(workflowDashboard.filtersEnabled.dateFilter)"/>
                    <TextFilter                      
                      name="Submitter Filter"
                      title="Submitter"
                      :items="workflowDashboard.searchResult.filters.submitters"
                      :selectedItems="workflowDashboard.searchQuery.filterBySubmitters"
                      @displayChanged="changeDisplayedFilter(workflowDashboard.filtersEnabled.submitterFilter)"
                    />
                    <!-- <TextFilter                      
                      name="Collection Filter"
                      title="Collection"
                      :items="workflowDashboard.searchResult.filters.collections"
                      :selectedItems="workflowDashboard.searchQuery.filterByCollections"
                      @displayChanged="changeDisplayedFilter(workflowDashboard.filtersEnabled.collectionFilter)"
                    /> -->
                   <TextFilter
                    name="External ID Filter"
                    title="External ID"
                    :items="workflowDashboard.searchResult.filters.externalIds"
                    :selectedItems="workflowDashboard.searchQuery.filterByExternalIds"
                    @displayChanged="changeDisplayedFilter(workflowDashboard.filtersEnabled.externalIdFilter)"
                    />
                    <TextFilter                      
                      name="Item Filter"
                      title="Item"
                      :items="workflowDashboard.searchResult.filters.items"
                      :selectedItems="workflowDashboard.searchQuery.filterByItems"
                      @displayChanged="changeDisplayedFilter(workflowDashboard.filtersEnabled.itemFilter)"
                    />
                    <TextFilter                      
                      name="Primaryfile Filter"
                      title="Primaryfile"
                      :items="workflowDashboard.searchResult.filters.files"
                      :selectedItems="workflowDashboard.searchQuery.filterByFiles"
                      @displayChanged="changeDisplayedFilter(workflowDashboard.filtersEnabled.fileFilter)"
                    />
                    <!-- <TextFilter                      
                      name="Workflow Filter"
                      title="Workflow"
                      :items="workflowDashboard.searchResult.filters.workflows"
                      :selectedItems="workflowDashboard.searchQuery.filterByWorkflows"
                      @displayChanged="changeDisplayedFilter(workflowDashboard.filtersEnabled.workflowFilter)"
                    /> -->
                    <TextFilter                      
                      name="Workflow Step Filter"
                      title="Step"
                      :items="workflowDashboard.searchResult.filters.steps"
                      :selectedItems="workflowDashboard.searchQuery.filterBySteps"
                      @displayChanged="changeDisplayedFilter(workflowDashboard.filtersEnabled.stepFilter)"
                    />
                      <!-- <TextFilter                      
                      name="Output Filter"
                      title="Output"
                      :items="workflowDashboard.searchResult.filters.outputs"
                      :selectedItems="workflowDashboard.searchQuery.filterByOutputs"
                      @displayChanged="changeDisplayedFilter(workflowDashboard.filtersEnabled.outputFilter)"
                    /> -->
                    <StatusFilter
                      @displayChanged="changeDisplayedFilter(workflowDashboard.filtersEnabled.statusFilter)"/>

                      <div class="relevant-togggle"><span class="txt-v pr-2">Show Relevant Results Only</span>
                        <label class="switch" title="Relevant Result"><span class="sr-only">Relevant Result</span>
                          <input type="checkbox" v-model="workflowDashboard.searchQuery.filterByRelevant">
                          <span class="slider round"></span>
                        </label>
                      </div> 
                  </div>
                  <div class="row spacer">
                  </div>
                </div>
                <DashboardTable/>
                <Search :searchType="searchType" :dataSource="searchSource" :key="searchType + searchSource.length"/>
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
import DateFilter from '@/components/dashboard/DashboardFilters/DateFilter';
import TextFilter from '@/components/dashboard/DashboardFilters/TextFilter';
import StatusFilter from '@/components/dashboard/DashboardFilters/StatusFilter';
import Logout from '@/components/shared/Logout.vue';
import Search from  '@/components/shared/Search.vue';
import WorkflowResultService from '../../service/workflow-result-service';
import Loader from '@/components/shared/Loader.vue';

export default {
  name: 'Dashboard',
  components:{
    Sidebar,
    DashboardTable,
    DateFilter,
    TextFilter,
    StatusFilter,
    Logout,
    Search,
    Loader
  },
  data(){
    return {
      workflowSubmitted: false,
      bundle: null,
      visible : true,
      searchType: "",
      searchSource: [],
      workflowResultService: new WorkflowResultService(),
      isFilterApiLoaded: false
    }
  },
  computed:{
    workflowDashboard: sync("workflowDashboard"),
    filterCount:function(){
      var dateFilter = 0;
      if(this.workflowDashboard.searchQuery.filterByDates.length > 0)
        dateFilter = 1;
      return dateFilter 
        + this.workflowDashboard.searchQuery.filterBySubmitters.length 
        + this.workflowDashboard.searchQuery.filterByWorkflows.length 
        + this.workflowDashboard.searchQuery.filterByCollections.length
        + this.workflowDashboard.searchQuery.filterByUnits.length
        + this.workflowDashboard.searchQuery.filterByExternalIds.length 
        + this.workflowDashboard.searchQuery.filterByItems.length 
        + this.workflowDashboard.searchQuery.filterByFiles.length 
        + this.workflowDashboard.searchQuery.filterBySteps.length
        + this.workflowDashboard.searchQuery.filterByOutputs.length 
        + this.workflowDashboard.searchQuery.filterByStatuses.length
        + this.workflowDashboard.searchQuery.filterBySearchTerms.length;
    },
    
    filterByCollections: sync("workflowDashboard.searchQuery.filterByCollections"),
    filterByUnits: sync("workflowDashboard.searchQuery.filterByUnits"),
    filterByWorkflows: sync("workflowDashboard.searchQuery.filterByWorkflows"),
    filterByOutputs: sync("workflowDashboard.searchQuery.filterByOutputs"),
    selectedFilters: sync("selectedFilters"),
    
  },
  props: {
  },
  methods:{
    changeDisplayedFilter(item){
      this.workflowDashboard.filtersEnabled.dateFilter=false;
      this.workflowDashboard.filtersEnabled.submitterFilter =false;
      this.workflowDashboard.filtersEnabled.collectionFilter = false;
      this.workflowDashboard.filtersEnabled.externalIdFilter=false;
      this.workflowDashboard.filtersEnabled.itemFilter=false;
      this.workflowDashboard.filtersEnabled.fileFilter=false;
      this.workflowDashboard.filtersEnabled.workflowFilter=false;
      this.workflowDashboard.filtersEnabled.stepFilter=false;
      this.workflowDashboard.filtersEnabled.outputFilter=false;
      this.workflowDashboard.filtersEnabled.statusFilter=false;
      this.workflowDashboard.filtersEnabled.searchFilter=false;
      item = !item;

    },
    clearAll(){
      this.workflowDashboard.searchQuery.filterByDates = [];
      this.workflowDashboard.searchQuery.filterBySubmitters=[];
      this.workflowDashboard.searchQuery.filterByCollections=[];
      this.workflowDashboard.searchQuery.filterByUnits=[];
      this.workflowDashboard.searchQuery.filterByExternalIds=[];
      this.workflowDashboard.searchQuery.filterByItems=[];
      this.workflowDashboard.searchQuery.filterByFiles=[];
      this.workflowDashboard.searchQuery.filterByWorkflows=[];
      this.workflowDashboard.searchQuery.filterBySteps=[];
      this.workflowDashboard.searchQuery.filterByOutputs=[];
      this.workflowDashboard.searchQuery.filterByStatuses=[];
      this.workflowDashboard.searchQuery.filterBySearchTerms=[];
      // Clear selected search on popup
      this.selectedFilters["collections"] = [];
      this.selectedFilters["units"] = [];
      this.selectedFilters["workflows"] = [];
      this.selectedFilters["outputs"] = [];
    },
    removeDateFilter() {
      this.workflowDashboard.searchQuery.filterByDates = []
      console.log("current date filter is:"+this.workflowDashboard.searchQuery.filterByDates);
    },
    removeSubmitterFilter(index){
      var removed = this.workflowDashboard.searchQuery.filterBySubmitters.splice(index,1);
      console.log("selected submitters are:"+this.workflowDashboard.searchQuery.filterBySubmitters +" and removed element is:"+removed);
    },
    removeCollectionFilter(index){
      this.selectedFilters["collections"].splice(this.selectedFilters["collections"].indexOf(el => el.collectionName === this.workflowDashboard.searchQuery.filterByCollections[index]), 1);
      var removed = this.workflowDashboard.searchQuery.filterByCollections.splice(index,1);
      console.log("selected search terms are:" + this.workflowDashboard.searchQuery.filterByCollections + " and removed element is:"+removed);
    },
     removeExternalIdFilter(index){
      var removed = this.workflowDashboard.searchQuery.filterByExternalIds.splice(index,1);
      console.log("selected externalIds are:"+this.workflowDashboard.searchQuery.filterByExternalIds +" and removed element is:"+removed);
    },
    removeItemFilter(index){
      var removed = this.workflowDashboard.searchQuery.filterByItems.splice(index,1);
      console.log("selected items are:"+this.workflowDashboard.searchQuery.filterByItems +" and removed element is:"+removed);
    },
    removeFileFilter(index){
      var removed = this.workflowDashboard.searchQuery.filterByFiles.splice(index,1);
      console.log("selected files are:"+this.workflowDashboard.searchQuery.filterByFiles +" and removed element is:"+removed);
    },
    removeWorkflowFilter(index){
      this.selectedFilters["workflows"].splice(this.selectedFilters["workflows"].indexOf(el => el.workflowName === this.workflowDashboard.searchQuery.filterByWorkflows[index]), 1);
      var removed = this.workflowDashboard.searchQuery.filterByWorkflows.splice(index,1);
      console.log("selected workflows are:"+this.workflowDashboard.searchQuery.filterByWorkflows +" and removed element is:"+removed);
    },
    removeStepFilter(index){
      var removed = this.workflowDashboard.searchQuery.filterBySteps.splice(index,1);
      console.log("selected steps are:"+this.workflowDashboard.searchQuery.filterBySteps +" and removed element is:"+removed);
    },
     removeOutputFilter(index){
      this.selectedFilters["outputs"].splice(this.selectedFilters["outputs"].indexOf(el => el.outputNamea === this.workflowDashboard.searchQuery.filterByOutputs[index]), 1);
      var removed = this.workflowDashboard.searchQuery.filterByOutputs.splice(index,1);
      console.log("selected outputs are:"+this.workflowDashboard.searchQuery.filterByOutputs +" and removed element is:"+removed);
    },
    removeStatusFilter(index){
      var removed = this.workflowDashboard.searchQuery.filterByStatuses.splice(index,1);
      console.log("selected statuses are:"+this.workflowDashboard.searchQuery.filterByStatuses +" and removed element is:"+removed);
    },
    removeSearchFilter(index){
      var removed = this.workflowDashboard.searchQuery.filterBySearchTerms.splice(index,1);
      console.log("selected search terms are:"+this.workflowDashboard.searchQuery.filterBySearchTerms +" and removed element is:"+removed);
    },
    removeUnitFilter(index){
      this.selectedFilters["units"].splice(this.selectedFilters["units"].indexOf(el => el.unitName === this.workflowDashboard.searchQuery.filterByUnits[index]), 1);
      var removed = this.workflowDashboard.searchQuery.filterByUnits.splice(index,1);
      console.log("selected outputs are:"+this.workflowDashboard.searchQuery.filterByUnits +" and removed element is:"+removed);
    },
    onOpenModal(value) {
      let self = this;
      const unitName = self.workflowDashboard.searchResult.filters.units[0];
      switch(value) {
        case 'collection':
          this.searchType = "collections";
          this.searchSource = (self.workflowDashboard.searchResult.filters.collections).map((el, index) => ({id: index+1, "collectionName": el, "unitName": unitName }));
        break;
        case 'unit':
          this.searchType = "units";
          this.searchSource = self.workflowDashboard.searchResult.filters.units.map((el, index) => ({id: index+1, "unitName": el}));
        break;
        case 'workflow':
          this.searchType = "workflows";
          this.searchSource = self.workflowDashboard.searchResult.filters.workflows.map((el, index) => ({id: index+1, "workflowName": el}));
        break;
        case 'output':
          this.searchType = "outputs";
          this.searchSource = self.workflowDashboard.searchResult.filters.outputs.map((el, index) => ({id: index+1, "outputName": el}));
        break;
      }

      this.$bvModal.show('modal-lg');
      
    },
  },
  mounted() {
    // this.getFilterValues();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main-margin-min {
    margin: 0.5em!important;
  }

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

  .btn-info {
    color: #fff !important;
    background-color: #17a2b8 !important;
    border-color: #17a2b8 !important;
}
.relevant-togggle {
  margin-left: auto;
  margin-right:0;
  margin-top: auto;
}
</style>
