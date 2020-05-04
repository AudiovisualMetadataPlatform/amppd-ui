<template>
  <div>
    <div class="workflow-selection">
      <select id="workflows" v-on:change="selection" v-if="workflows">
        <option value="">Select a workflow...</option>
          <option v-for="(workflow, index) in workflows"  v-bind:key="index" v-bind:value="workflow.id">{{workflow.name}}</option>
      </select>
    </div>
  </div>
</template>

<script>
import { sync } from 'vuex-pathify'
import {requestOptions} from '@/helpers/request-options'
import WorkflowService from '../../service/workflow-service';
export default {
  name: 'WorkflowSelection',
  props: {
  },
  data() {
    return {
      workflows:[],
      workflowService: new WorkflowService()
    }
  },
  computed:{
      selectedWorkflow: sync('selectedWorkflow'),
      parameters: sync('parameters')
  },
  methods:{
    async getWorkflows() {
      let self = this;
 
      this.workflowService.getWorkflows().then(response => {
           self.workflows = response.data;
        });
    },
    async selection(event) {
      let self = this;
      self.selectedWorkflow = event.target.value;
      self.parameters = await this.workflowService.getWorkflowDetails(self.selectedWorkflow);
      console.log(self.parameters);
    }
  },
  mounted() {
    let self = this;
    self.getWorkflows();
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .workflow-selection{
    height:70px;
    display:flex;
    align-items: flex-start;
    justify-content: flex-start;
    padding:0 30px;
  }
  #workflows{
    width: 310px;
    padding:3px;
    margin-right:10px;
  }
</style>
