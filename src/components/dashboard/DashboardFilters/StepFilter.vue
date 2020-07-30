<template>
    <div class="dropdown" >
        <button class="btn btn-info dropdown-toggle" :class="{ 'show' : workflowDashboard.filtersEnabled.stepFilter === true }" type="button" id="dropdownMenuButton1" 
            data-toggle="dropdown" aria-haspopup="true" aria-expanded="workflowDashboard.filtersEnabled.stepFilter ? 'true' : 'false'" v-on:click="setFilterFlags">
            Workflow Step
        </button>
        <div v-click-outside="closeFilter" class="dropdown-menu compact-form" :class="{ 'show' : workflowDashboard.filtersEnabled.stepFilter === true }" aria-labelledby="dropdownMenuButton" 
            x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 38px, 0px);">
            <form class="main-dropdown">
                <div class="container-fluid">
                    <label for="colFormLabelSearch" class=" bold">Workflow Step</label>
                    <div class="input-group mb-3">
                        <typeahead :source="getSteps" filter-key="step" filter-type="contains" :start-at="1" @selection="addStep"
                            id="colFormLabelSearch" class="form-control bootstrap-typeahead" placeholder="Search Workflow Step"/>
                        <div class="input-group-append">
                            <button class="btn btn-outline" id="btn-search" type="submit"> 
                                <svg class="svg-search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                                    <title>search</title>
                                    <path d="M47.3 43.4c0 0.9-0.3 1.7-1 2.4 -0.7 0.7-1.5 1-2.4 1 -0.9 0-1.7-0.3-2.4-1l-9-9c-3.1 2.2-6.6 3.3-10.5 3.3 -2.5 0-4.9-0.5-7.2-1.5 -2.3-1-4.2-2.3-5.9-3.9s-3-3.6-3.9-5.9c-1-2.3-1.5-4.7-1.5-7.2 0-2.5 0.5-4.9 1.5-7.2 1-2.3 2.3-4.2 3.9-5.9s3.6-3 5.9-3.9c2.3-1 4.7-1.5 7.2-1.5 2.5 0 4.9 0.5 7.2 1.5 2.3 1 4.2 2.3 5.9 3.9s3 3.6 3.9 5.9c1 2.3 1.5 4.7 1.5 7.2 0 3.8-1.1 7.3-3.3 10.5l9 9C47 41.7 47.3 42.5 47.3 43.4zM30.4 29.9c2.3-2.3 3.4-5.1 3.4-8.3 0-3.2-1.1-6-3.4-8.3 -2.3-2.3-5.1-3.4-8.3-3.4 -3.2 0-6 1.1-8.3 3.4 -2.3 2.3-3.4 5.1-3.4 8.3 0 3.2 1.1 6 3.4 8.3 2.3 2.3 5.1 3.4 8.3 3.4C25.4 33.4 28.1 32.2 30.4 29.9z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            <div class="container">
                <div class="card p-2">
                    <strong>Selected Steps</strong>
                    <div class="selected-step-cards">  <!--loop through all the selected here -->
                        <button class="btn btn-outline step" v-for = "(step,index) in workflowDashboard.searchQuery.filterBySteps" v-bind:step="step" v-bind:index="index" v-bind:key="step.id">
                            <svg class="user-remove" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" @click="removeStep(index)">
                                <path d="M30.3 30.8l-4.1 4.1c-0.6 0.6-0.8 1.3-0.8 2.1 0 0.8 0.3 1.5 0.8 2.1l1.9 1.9c-0.3 0-0.7 0.1-1 0.1H7c-1.8 0-3.3-0.5-4.4-1.6 -1.1-1.1-1.7-2.5-1.7-4.3 0-0.8 0-1.6 0.1-2.4 0.1-0.8 0.2-1.6 0.3-2.5 0.2-0.9 0.4-1.7 0.6-2.5 0.2-0.8 0.6-1.5 1-2.2 0.4-0.7 0.9-1.3 1.4-1.9 0.5-0.5 1.2-0.9 2-1.2C7.1 22.1 7.9 22 8.8 22c0.3 0 0.6 0.1 0.9 0.4 2.3 1.9 4.8 2.8 7.3 2.8s4.9-0.9 7.3-2.8c0.3-0.3 0.6-0.4 0.9-0.4 0.4 0 0.9 0 1.3 0.1 -0.4 0.4-0.7 0.8-0.9 1.1s-0.3 0.8-0.3 1.3c0 0.8 0.3 1.5 0.8 2.1L30.3 30.8zM23.2 20.9c-1.7 1.7-3.8 2.6-6.2 2.6 -2.4 0-4.5-0.9-6.2-2.6 -1.7-1.7-2.6-3.8-2.6-6.2s0.9-4.5 2.6-6.2c1.7-1.7 3.8-2.6 6.2-2.6 2.4 0 4.5 0.9 6.2 2.6 1.7 1.7 2.6 3.8 2.6 6.2S25 19.1 23.2 20.9zM41.7 30.8l5.7 5.7c0.1 0.1 0.2 0.3 0.2 0.5 0 0.2-0.1 0.4-0.2 0.5l-3.1 3.1c-0.1 0.1-0.3 0.2-0.5 0.2 -0.2 0-0.4-0.1-0.5-0.2l-5.7-5.7 -5.7 5.7c-0.1 0.1-0.3 0.2-0.5 0.2 -0.2 0-0.4-0.1-0.5-0.2l-3.1-3.1c-0.1-0.1-0.2-0.3-0.2-0.5 0-0.2 0.1-0.4 0.2-0.5l5.7-5.7 -5.7-5.7c-0.1-0.1-0.2-0.3-0.2-0.5 0-0.2 0.1-0.4 0.2-0.5l3.1-3.1c0.1-0.1 0.3-0.2 0.5-0.2 0.2 0 0.4 0.1 0.5 0.2l5.7 5.7 5.7-5.7c0.1-0.1 0.3-0.2 0.5-0.2 0.2 0 0.4 0.1 0.5 0.2l3.1 3.1c0.1 0.1 0.2 0.3 0.2 0.5 0 0.2-0.1 0.4-0.2 0.5L41.7 30.8z"></path>
                            </svg>
                            {{step}}
                        </button>
                    </div>
                </div>
            </div>
            <button class="btn btn-info" type="button" @click="closeFilter()">
                  Done
              </button>
        </div>
    </div>                   
</template>

<script>
import { sync } from 'vuex-pathify'
import _ from 'underscore';
import Typeahead from '../../shared/TypeAhead.vue';
import ClickOutside from 'vue-click-outside'

export default {
  name: 'StepFilter',
  components:{
    Typeahead
  },
  data(){
    return {
        stepList: [],
        filterSuccess: false,
        selectedSteps: []
    }
  },
  computed:{
    workflowDashboard: sync("workflowDashboard"),
    steps: sync("workflowDashboard.searchResult.filters.steps"),
    getSteps(){
        if(!this.steps) return [];
        return this.steps;
    }
  },
  
  methods:{
    setFilterFlags(){
		this.workflowDashboard.filtersEnabled.stepFilter = !this.workflowDashboard.filtersEnabled.stepFilter;
		if(this.workflowDashboard.filtersEnabled.stepFilter)
		{
            this.workflowDashboard.filtersEnabled.dateFilter=false;
            this.workflowDashboard.filtersEnabled.submitterFilter =false;
            this.workflowDashboard.filtersEnabled.fileFilter=false;
            this.workflowDashboard.filtersEnabled.searchFilter=false;
            this.workflowDashboard.filtersEnabled.statusFilter=false;
            this.workflowDashboard.filtersEnabled.itemFilter=false;
            this.workflowDashboard.filtersEnabled.workflowFilter=false;
		}
	},
    addStep(step) {
        if (this.selectedSteps.length >0) {
            if (this.selectedSteps.indexOf(step) == -1) {
                this.selectedSteps.push(step);
            }
            else {
                console.log("step already exists" + this.selectedSteps);
            }
        }
        else {
            this.selectedSteps.push(step);
        }
        this.workflowDashboard.searchQuery.filterBySteps = this.selectedSteps;
    },
    removeStep(index) {
        console.log("removing step at:" + index);
        var removed = this.selectedSteps.splice(index,1);
        this.workflowDashboard.searchQuery.filterBySteps = this.selectedSteps;
        console.log("selected steps are: " + this.selectedSteps + ", and removed element is: " + removed);
    },
    closeFilter(){
        this.workflowDashboard.filtersEnabled.stepFilter = false;
    }
  },
  directives: {
    ClickOutside
  },
  mounted () {
    // prevent click outside event with popupItem.
    this.popupItem = this.$el
  },
  watch: {
    selectedSteps: function() {
        this.selectedSteps.length>0 ? this.workflowDashboard.filtersEnabled.stepFilter = true : this.workflowDashboard.filtersEnabled.stepFilter = false
    }
  }, 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .step{
    margin:0.2rem;
  }

  .bootstrap-typeahead{
    height: calc(2.25rem + 1px);
    padding: 0rem 0rem;
  }

  .main-dropdown{
    height: 150px;
  }

  .selected-step-cards {
    max-height: 200px;
    overflow-y: scroll;
  }
</style>
