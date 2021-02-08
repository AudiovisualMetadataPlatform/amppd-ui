<template>
	<div class="dropdown">
	<button class="btn btn-info dropdown-toggle" :class="{ 'show' : this.displayFilter === true }" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="this.workflowDashboard.filtersEnabled.dateFilter ? 'true' : 'false'" v-on:click="setFilterFlags">
	Date range
	</button>
	<div v-click-outside="closeFilter" class="dropdown-menu compact-form" :class="{ 'show' : this.displayFilter === true }" aria-labelledby="dropdownMenuButton">
	<form class="">
		<div class="form-group row">
		<label for="colFormLabelFrom" class="col-sm-4 col-form-label col-form-label-sm text-right">From</label>
		<div >
			<datepicker v-model="fromDate" class="form-control form-control-sm col-sm-8 my-datepicker" format="MM/dd/yyyy" v-on:input="setDisabledDate()"></datepicker>
		</div>
		</div>
		<div class="form-group row">
		<label for="colFormLabelFrom2" class="col-sm-4 col-form-label col-form-label-sm text-right">To</label>
		<div>
			<datepicker v-model="toDate"  class="form-control form-control-sm col-sm-8 my-datepicker" format="MM/dd/yyyy"  :disabled-dates="state.disabledDates"></datepicker>
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
import Datepicker from 'vuejs-datepicker';
import ClickOutside from 'vue-click-outside'
export default {
	name: 'DateFilter',
	components:{
	Datepicker
	},
	data(){
    	return {
			displayFilter: false,
			fromDate :  new Date(),
			toDate : new Date(),
			state : {
				disabledDates: {
					to: new Date()
					}
				} 
  }},
  computed:{
	workflowDashboard: sync("workflowDashboard")
  },
  methods:{
	setFilterFlags(){
		this.displayFilter = !this.displayFilter;
		this.$emit('displayChanged', this.displayFilter);
	},
	setDisabledDate(){
		let self = this;
		self.state.disabledDates.to = new Date(self.fromDate);
	},
	closeFilter(){
		this.displayFilter = false;
		this.$emit('displayChanged', this.displayFilter);
	},
	filterByDate(){
		let self = this;
		self.workflowDashboard.searchQuery.filterByDates = []
		self.workflowDashboard.searchQuery.filterByDates.push(new Date(self.fromDate));
		self.workflowDashboard.searchQuery.filterByDates.push(new Date(self.toDate));
		this.displayFilter = false;
		this.$emit('displayChanged', this.displayFilter);
	},
	getMaxDate(){
		console.log("inside getMaxDate()");
		let today = new Date(),
		day = today.getDate(), month = today.getMonth()+1, //January is 0
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
  directives: {
    ClickOutside
  },
  mounted () {
    // prevent click outside event with popupItem.
    this.popupItem = this.$el
  },
}
</script>
<style>
input {
	width: -webkit-fill-available;
	border-radius: 4px;
}
.my-datepicker{
	border: none;
}

</style>