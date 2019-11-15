<template>
	<div>
		<Header/>
		<div class="jobs">
			<h3>The following primaryfiles had AMPPD jobs successfully created and scheduled to run workflow {{selectedWorkflow.id}}:</h3>
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
						<tr v-for="(primaryfileId, job) in jobs" v-bind:key="primaryfileId" class="job">
							<td>{{primarifileId}}</td>
							<td>{{job.id}}</td>
							<td>{{job.historyId}}</td>
							<td>{{job.updateTime}}</td>
							<td>{{job.state}}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<!-- <h3 v-if="nFailed > 0" class="error">The rest of the {{nFailed}} primaryfiles failed to have AMPPD jobs created to run workflow {{selectedWorkflow.id}}.</h3> -->
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
	jobs: sync('jobs')
	//   nFailed: this.files.size - this.jobs.size 
  },
  props: {
  },
  methods:{
  },
  mounted(){
  }
}
</script>


