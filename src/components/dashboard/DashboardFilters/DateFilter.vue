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
			<input type="date" :max="getMaxDate()" class="form-control form-control-sm" id="colFormLabelFrom" v-model="fromDate">
		</div>
		</div>
		<div class="form-group row">
		<label for="colFormLabelFrom2" class="col-sm-4 col-form-label col-form-label-sm text-right">To</label>
		<div class="col-sm-8">
			<input type="date" :max="getMaxDate()" :min="fromDate" class="form-control form-control-sm" id="colFormLabelFrom2" v-model="toDate">
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
	fromDate : new Date(),
	toDate : new Date()
    }
  },
  computed:{
	workflowDashboard: sync("workflowDashboard"),
  },
  methods:{
	closeFilter(){
		this.visible=false;
	},
	filterByDate(){
		let self = this;
		//TODO : preliminary validation of date
		self.workflowDashboard.searchQuery.filterByDates = []
		self.workflowDashboard.searchQuery.filterByDates.push(new Date(self.fromDate.replace("-", '/')));
		self.workflowDashboard.searchQuery.filterByDates.push(new Date(self.toDate.replace("-", '/')));
		self.visible=false;
	},
	getMaxDate(){
		console.log("inside getMaxDate()");
		let today = new Date(),
    	day = today.getDate(),
    	month = today.getMonth()+1, //January is 0
    	year = today.getFullYear();
        if(day<10){
                day='0'+day
            } 
        if(month<10){
            month='0'+month
        }
		today = year+'-'+month+'-'+day;
		console.log("todays date :"+today);
		return today;
	}
  },
}
</script>
<style scoped>

</style>