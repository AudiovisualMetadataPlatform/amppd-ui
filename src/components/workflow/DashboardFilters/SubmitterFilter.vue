<template>
	<div class="dropdown" >
		<button class="btn btn-info dropdown-toggle" :class="{ 'show' : visible === true }" type="button" id="dropdownMenuButton1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="visible ? 'true' : 'false'" v-on:click="visible = !visible">
		Submitter
		</button>
		<div class="dropdown-menu compact-form" :class="{ 'show' : visible === true }" aria-labelledby="dropdownMenuButton" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 38px, 0px);">
			<form class="">
				<div class="container-fluid">
					<label for="colFormLabelSearch" class=" bold">Submitter Name</label>
					<div class="input-group mb-3">
						<vue-bootstrap-typeahead :data="getSubmitters" v-model="searchValue" @hit="addSubmitter($event)" :minMatchingChars="1"
						id="colFormLabelSearch" type="text" class="form-control bootstrap-typeahead" placeholder="Search Submitter Name"/>
						<div class="input-group-append">
							<button class="btn btn-outline" id="btn-search" type="submit"> <svg class="svg-search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
							<title>search</title>
							<path d="M47.3 43.4c0 0.9-0.3 1.7-1 2.4 -0.7 0.7-1.5 1-2.4 1 -0.9 0-1.7-0.3-2.4-1l-9-9c-3.1 2.2-6.6 3.3-10.5 3.3 -2.5 0-4.9-0.5-7.2-1.5 -2.3-1-4.2-2.3-5.9-3.9s-3-3.6-3.9-5.9c-1-2.3-1.5-4.7-1.5-7.2 0-2.5 0.5-4.9 1.5-7.2 1-2.3 2.3-4.2 3.9-5.9s3.6-3 5.9-3.9c2.3-1 4.7-1.5 7.2-1.5 2.5 0 4.9 0.5 7.2 1.5 2.3 1 4.2 2.3 5.9 3.9s3 3.6 3.9 5.9c1 2.3 1.5 4.7 1.5 7.2 0 3.8-1.1 7.3-3.3 10.5l9 9C47 41.7 47.3 42.5 47.3 43.4zM30.4 29.9c2.3-2.3 3.4-5.1 3.4-8.3 0-3.2-1.1-6-3.4-8.3 -2.3-2.3-5.1-3.4-8.3-3.4 -3.2 0-6 1.1-8.3 3.4 -2.3 2.3-3.4 5.1-3.4 8.3 0 3.2 1.1 6 3.4 8.3 2.3 2.3 5.1 3.4 8.3 3.4C25.4 33.4 28.1 32.2 30.4 29.9z"></path>
							</svg></button>
						</div>
					</div>
				</div>
			</form>
			<div class="container">
				<div class="card p-2">
					<strong>Selected Submitters</strong>
					<div>  <!--loop through all the selected here -->
						<button class="btn btn-outline submitter" v-for = "(submitter,index) in selectedSubmitters" v-bind:submitter="submitter" v-bind:index="index" v-bind:key="submitter.id">
							<svg class="user-remove" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" @click="removeSubmitter(index)">
							<path d="M30.3 30.8l-4.1 4.1c-0.6 0.6-0.8 1.3-0.8 2.1 0 0.8 0.3 1.5 0.8 2.1l1.9 1.9c-0.3 0-0.7 0.1-1 0.1H7c-1.8 0-3.3-0.5-4.4-1.6 -1.1-1.1-1.7-2.5-1.7-4.3 0-0.8 0-1.6 0.1-2.4 0.1-0.8 0.2-1.6 0.3-2.5 0.2-0.9 0.4-1.7 0.6-2.5 0.2-0.8 0.6-1.5 1-2.2 0.4-0.7 0.9-1.3 1.4-1.9 0.5-0.5 1.2-0.9 2-1.2C7.1 22.1 7.9 22 8.8 22c0.3 0 0.6 0.1 0.9 0.4 2.3 1.9 4.8 2.8 7.3 2.8s4.9-0.9 7.3-2.8c0.3-0.3 0.6-0.4 0.9-0.4 0.4 0 0.9 0 1.3 0.1 -0.4 0.4-0.7 0.8-0.9 1.1s-0.3 0.8-0.3 1.3c0 0.8 0.3 1.5 0.8 2.1L30.3 30.8zM23.2 20.9c-1.7 1.7-3.8 2.6-6.2 2.6 -2.4 0-4.5-0.9-6.2-2.6 -1.7-1.7-2.6-3.8-2.6-6.2s0.9-4.5 2.6-6.2c1.7-1.7 3.8-2.6 6.2-2.6 2.4 0 4.5 0.9 6.2 2.6 1.7 1.7 2.6 3.8 2.6 6.2S25 19.1 23.2 20.9zM41.7 30.8l5.7 5.7c0.1 0.1 0.2 0.3 0.2 0.5 0 0.2-0.1 0.4-0.2 0.5l-3.1 3.1c-0.1 0.1-0.3 0.2-0.5 0.2 -0.2 0-0.4-0.1-0.5-0.2l-5.7-5.7 -5.7 5.7c-0.1 0.1-0.3 0.2-0.5 0.2 -0.2 0-0.4-0.1-0.5-0.2l-3.1-3.1c-0.1-0.1-0.2-0.3-0.2-0.5 0-0.2 0.1-0.4 0.2-0.5l5.7-5.7 -5.7-5.7c-0.1-0.1-0.2-0.3-0.2-0.5 0-0.2 0.1-0.4 0.2-0.5l3.1-3.1c0.1-0.1 0.3-0.2 0.5-0.2 0.2 0 0.4 0.1 0.5 0.2l5.7 5.7 5.7-5.7c0.1-0.1 0.3-0.2 0.5-0.2 0.2 0 0.4 0.1 0.5 0.2l3.1 3.1c0.1 0.1 0.2 0.3 0.2 0.5 0 0.2-0.1 0.4-0.2 0.5L41.7 30.8z"></path></svg>
							{{submitter}}
						</button>
						<!-- close
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M44.8 13.7c2 3.4 3 7.1 3 11.2 0 4-1 7.8-3 11.2 -2 3.4-4.7 6.1-8.1 8.1 -3.4 2-7.1 3-11.2 3 -4 0-7.8-1-11.2-3 -3.4-2-6.1-4.7-8.1-8.1 -2-3.4-3-7.1-3-11.2 0-4 1-7.8 3-11.2 2-3.4 4.7-6.1 8.1-8.1 3.4-2 7.1-3 11.2-3 4 0 7.8 1 11.2 3C40.1 7.5 42.8 10.2 44.8 13.7zM39.1 32.8c1.4-2.4 2.1-5.1 2.1-7.9 0-2.9-0.7-5.5-2.1-7.9 -1.4-2.4-3.3-4.3-5.7-5.7 -2.4-1.4-5.1-2.1-7.9-2.1 -2.9 0-5.5 0.7-7.9 2.1 -2.4 1.4-4.3 3.3-5.7 5.7 -1.4 2.4-2.1 5.1-2.1 7.9 0 2.9 0.7 5.5 2.1 7.9 1.4 2.4 3.3 4.3 5.7 5.7 2.4 1.4 5.1 2.1 7.9 2.1 2.9 0 5.5-0.7 7.9-2.1C35.8 37.1 37.7 35.2 39.1 32.8zM35 30.1l-4.2 4.2c-0.2 0.2-0.4 0.3-0.7 0.3 -0.3 0-0.5-0.1-0.7-0.3l-4-4 -4 4c-0.2 0.2-0.4 0.3-0.7 0.3 -0.3 0-0.5-0.1-0.7-0.3l-4.2-4.2c-0.2-0.2-0.3-0.4-0.3-0.7 0-0.3 0.1-0.5 0.3-0.7l4-4 -4-4c-0.2-0.2-0.3-0.4-0.3-0.7 0-0.3 0.1-0.5 0.3-0.7l4.2-4.2c0.2-0.2 0.4-0.3 0.7-0.3 0.3 0 0.5 0.1 0.7 0.3l4 4 4-4c0.2-0.2 0.4-0.3 0.7-0.3 0.3 0 0.5 0.1 0.7 0.3l4.2 4.2c0.2 0.2 0.3 0.4 0.3 0.7 0 0.3-0.1 0.5-0.3 0.7l-4 4 4 4c0.2 0.2 0.3 0.4 0.3 0.7C35.3 29.7 35.2 30 35 30.1z"/></svg>
						-->
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
import WorkflowService from '../../../service/workflow-service';
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead';
import _ from 'underscore';

export default {
  name: 'Workflow',
  components:{
	VueBootstrapTypeahead
  },
  data(){
    return {
		workflowService: new WorkflowService(),
		visible : false,
		searchValue: '',
		submitterList:[],
		filterSuccess:false,
		selectedSubmitters : []
    }
  },
  computed:{
	workflowDashboard: sync("workflowDashboard"),
	getSubmitters(){
		var submitters=[];
		var i=0;
		for(i=0;i<this.workflowDashboard.rows.length;i++){
			submitters.push(this.workflowDashboard.rows[i].submitter);
		}
		submitters = submitters.filter((item, i, ar) => ar.indexOf(item) === i);
		console.log("unique submitters"+submitters);
		return submitters;
	},
  },
  props: {
  },
  methods:{
    
	addSubmitter($event){
		//console.log("selected submitters is:"+this.searchValue+"  "+$event);
		if(this.selectedSubmitters.length >0 ){
			if(this.selectedSubmitters.indexOf(this.searchValue) == -1)
				this.selectedSubmitters.push(this.searchValue);
		}
		else
			this.selectedSubmitters.push(this.searchValue);
		this.workflowDashboard.searchQuery.filterBySubmitters = this.selectedSubmitters;
		console.log("selected submitters are:"+this.workflowDashboard.searchQuery.filterBySubmitters);
	},
	removeSubmitter(index){
		console.log("removing index:"+index);
		//this.selectedSubmitters.pop(this.selectedSubmitters[index]);
		var removed = this.selectedSubmitters.splice(index,1);
		console.log("selected submitters are:"+this.selectedSubmitters +" and removed element is:"+removed);
	},
	closeFilter(){
		this.searchValue='';
		this.visible=false;
	}
  },
  
  watch: {
	searchValue: function(submitter) { this.getSubmitters },
	selectedSubmitters: function() {
		this.selectedSubmitters.length>0 ? this.workflowDashboard.filtersEnabled.submitterFilter = true : this.workflowDashboard.filtersEnabled.submitterFilter = false},
	//visible: function(){this.searchValue=""}
  },
  created(){
	this.searchValue='';
  },
  mounted(){
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .spacer{
    height: 24px;
  }
  .submitter{
	margin:0.2rem;
  }
  .bootstrap-typeahead{
	height: calc(2.25rem + 1px);
	padding: 0rem 0rem;
  }
</style>
