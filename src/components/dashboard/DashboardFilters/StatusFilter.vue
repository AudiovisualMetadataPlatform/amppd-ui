<template>
	<div class="dropdown" >
		<button class="btn btn-info dropdown-toggle" :class="{ 'show' : workflowDashboard.filtersEnabled.statusFilter === true }" type="button" id="dropdownMenuButton1" 
			data-toggle="dropdown" aria-haspopup="true" aria-expanded="workflowDashboard.filtersEnabled.statusFilter ? 'true' : 'false'" v-on:click="setFilterFlags">
			Status
		</button>
		<div v-click-outside="closeFilter" class="dropdown-menu compact-form" :class="{ 'show' : workflowDashboard.filtersEnabled.statusFilter === true }" aria-labelledby="dropdownMenuButton" 
			x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 38px, 0px);">
      <b-form-checkbox-group
        v-model="workflowDashboard.searchQuery.filterByStatuses"
        :options="getStatuses"
        stacked
      />
			<!-- <multiselect
				v-model="selectedStatuses"
				:multiple="true"
				:options="getStatuses">
			</multiselect> -->
			<button class="btn btn-info" type="button" @click="closeFilter()">
        Done
      </button>
		</div>
	</div>                   
</template>

<script>
import { sync } from 'vuex-pathify'
import _ from 'underscore';
import { BFormCheckboxGroup } from 'bootstrap-vue';
import ClickOutside from 'vue-click-outside'
// import Multiselect from 'vue-multiselect';

export default {
  name: 'StatusFilter',
  components:{
		BFormCheckboxGroup,
		// Multiselect,
  },
  data(){
    return {
			statusList: [],
			filterSuccess: false
    }
  },
  computed:{
		workflowDashboard: sync("workflowDashboard"),
		statuses: sync("workflowDashboard.searchResult.filters.statuses"),
		getStatuses(){
			if(!this.statuses) return [];
			return this.statuses;
		},
		selectedStatuses(){
			return this.workflowDashboard.searchQuery.selectedStatuses;
		}
  },
  
  methods:{
	setFilterFlags(){
		this.workflowDashboard.filtersEnabled.statusFilter = !this.workflowDashboard.filtersEnabled.statusFilter;
		if(this.workflowDashboard.filtersEnabled.statusFilter)
		{
            this.workflowDashboard.filtersEnabled.dateFilter=false;
            this.workflowDashboard.filtersEnabled.submitterFilter =false;
            this.workflowDashboard.filtersEnabled.fileFilter=false;
            this.workflowDashboard.filtersEnabled.searchFilter=false;
            this.workflowDashboard.filtersEnabled.itemFilter=false;
            this.workflowDashboard.filtersEnabled.stepFilter=false;
            this.workflowDashboard.filtersEnabled.workflowFilter=false;
		}
	},
		addStatus(status) {
			if (this.selectedStatuses.length >0) {
				if (this.selectedStatuses.indexOf(status) == -1) {
					this.selectedStatuses.push(status);
				}
				else {
					console.log("status already exists" + this.selectedStatuses);
				}
			}
			else {
				this.selectedStatuses.push(status);
			}
		},
		removeStatus(index) {
			console.log("removing status at:" + index);
			var removed = this.selectedStatuses.splice(index,1);
			console.log("selected statuses are: " + this.selectedStatuses + ", and removed element is: " + removed);
		},
		closeFilter(){
			this.workflowDashboard.filtersEnabled.statusFilter = false;
			console.log("selected statuses: " + this.selectedStatuses);
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
		selectedStatuses: function() {
			console.log("selected statuses: " + this.selectedStatuses);
			this.selectedStatuses.length>0 ? this.workflowDashboard.filtersEnabled.statusFilter = true : this.workflowDashboard.filtersEnabled.statusFilter = false;
		}
  }, 
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .status{
	margin:0.2rem;
  }

  .bootstrap-typeahead{
	height: calc(2.25rem + 1px);
	padding: 0rem 0rem;
  }

  .main-dropdown{
	height: 150px;
  }

  .selected-status-cards {
	max-height: 200px;
	overflow-y: scroll;
  }
</style>
