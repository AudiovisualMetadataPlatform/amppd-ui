<template>
	<div>
		<Header/>
		<div class="jobs">
			<h3>The following primaryfiles had AMPPD jobs successfully created and scheduled to run workflow {{selectedWorkflow}}:</h3>
			<div class="jobs-list">
				<table class="jobs-table">
					<thead>
						<tr>
							<th>Primary File ID</th>
							<th>AMPPD Job ID</th>
							<th>History ID</th>
							<th>Update Time</th>
							<th>State</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(job, primaryfileId) in jobs" v-bind:key="primaryfileId" class="job">
							<td>{{primaryfileId}}</td>
							<td>{{job.id}}</td>
							<td>{{job.historyId}}</td>
							<td>{{job.updateTime}}</td>
							<td>{{job.state}}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<h3 v-if="nFailed > 0" class="error">The rest of the {{nFailed}} primaryfiles failed to have AMPPD jobs created to run workflow {{selectedWorkflow}}:</h3>
		</div>
	</div>
</template>

<script>
import Header from '@/components/Header.vue'
import { sync } from 'vuex-pathify'

export default {
  name: 'Jobs',
  components:{
    Header
  },
  data(){
    return {		
    }
  },
  computed:{
	selectedWorkflow: sync('selectedWorkflow'),
	files: sync('files'),
	jobs: sync('jobs'),
	nFailed: function() {
		console.log("files.length: " + this.files.length);
		console.log("jobs.size: " + this.jobs.size);
		return this.files.length - this.jobs.size
	} 
  },
  props: {
  },
  methods:{
  },
  mounted(){
    // for (var job in this.jobs) {
	// 	console.log("key=" + job);
	// 	console.log("value=" + this.jobs[job]);
	// }
	// console.log("files.length: " + this.files.length);
	// console.log("jobs.size: " + this.jobs.size);
  }
}
</script>

<style scoped>
h3{
  margin-top: 0;
  text-align: left;
}
table {
  border-collapse: collapse;
}
table, th, td {
  border: 1px solid black;
}
th, td {
  padding: 15px;
  text-align: left;
}
.jobs{
  padding-top:100px;
}
</style>