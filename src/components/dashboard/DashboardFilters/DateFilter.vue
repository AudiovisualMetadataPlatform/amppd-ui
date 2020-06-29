<template>
	<div class="dropdown">
	<button class="btn btn-info dropdown-toggle" :class="{ 'show' : visible === true }" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="visible ? 'true' : 'false'" v-on:click="visible = !visible">
	Date range
	</button>
	<div class="dropdown-menu compact-form" :class="{ 'show' : visible === true }" aria-labelledby="dropdownMenuButton">
	<form class="">
		<div class="form-group row">
		<label for="colFormLabelFrom" class="col-sm-4 col-form-label col-form-label-sm text-right">From</label>
		<div class="col-sm-8">
			<input type="date" class="form-control form-control-sm" id="colFormLabelFrom" v-model="fromDate">
		</div>
		</div>
		<div class="form-group row">
		<label for="colFormLabelFrom2" class="col-sm-4 col-form-label col-form-label-sm text-right">To</label>
		<div class="col-sm-8">
			<input type="date" class="form-control form-control-sm" id="colFormLabelFrom2" v-model="toDate">
		</div>
		</div>
		<div class="form-group row">
		<div class="col-sm-12">
			<button class="btn btn-info float-right" @click="filterByDate">Filter</button>
		</div>
		</div>
	</form>
	</div>
	</div>
</template>
<script>
import { sync } from 'vuex-pathify'
export default {
	name: 'DateFilter',
	data(){
    return {
	visible : false,
	fromDate : '',
	toDate : ''
    }
  },
  computed:{
	workflowDashboard: sync("workflowDashboard"),
    //dates: sync("workflowDashboard.searchResult.filters.submitters"),

  },
  methods:{
	closeFilter(){
		this.visible=false;
	},
	filterByDate(){
		let self = this;
		//preliminary validation of date
		self.workflowDashboard.searchQuery.filterByDates = []
		self.workflowDashboard.searchQuery.filterByDates.push(self.fromDate);
		self.workflowDashboard.searchQuery.filterByDates.push(self.toDate);
		console.log("fromdate:",self.workflowDashboard.searchQuery.filterByDates[0]);
		console.log("todate:",self.workflowDashboard.searchQuery.filterByDates[1]);
		//self.workflowDashboard.searchQuery.filterByDates.push(1);
		self.visible=false;
	}
  },
  /* watch:{
	filterByDates: function(){
      console.log("inside watcher for filterByDates");
      //this.workflowDashboard.searchQuery.pageNum = 1;
      //this.refreshData();
    }
  } */
}
</script>
<style scoped>

</style>