<template>
	<div>
		<Header/>
		<div class="jobs">
			<h3>The following AMPPD jobs have been successfully created for primary files and scheduled to run workflow {{selectedWorkflow.id}}:</h3>
			<div class="jobs-list">
				<table class="jobs-table">
					<thead>
						<tr>
							<th>Primary File ID</th>
							<th>AMPPD Job ID</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{{job.id}}</td>
							<td>{{job.id}}</td>
						</tr>
					</tbody>
				</table>

				<div v-for="(job, index) in jobs" v-bind:key="index" class="job">
					<div class="job-id">Job {{job.id}}</div>
					<div class="parameters" v-for="(parameter, subindex) in node.params" v-bind:key="subindex" >
					<span class="parameter-name">{{parameter.name}}</span> <input :value="parameter.value" type="text"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Header from '@/components/Header.vue'
import WorkflowSelection from '@/components/WorkflowSelection.vue'
import WorkflowFiles from '@/components/WorkflowFiles.vue'
import { sync } from 'vuex-pathify'

