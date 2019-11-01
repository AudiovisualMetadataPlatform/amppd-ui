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
import axios from 'axios';
export default {
  name: 'WorkflowSelection',
  props: {
  },
  data() {
    return {
      workflows:[]
    }
  },
  computed:{
      selectedWorkflow: sync('selectedWorkflow'),
      parameters: sync('parameters')
  },
  methods:{
    getWorkflows() {
      let self = this;
      console.log("Getting workflows");
      axios.get('http://10.77.1.132:8200/workflows')
        .then(response => {
          self.workflows = response.data;
        })
        .catch(e => {
          console.log(e);
          // TODO:  Think about global error handling
        });
    },
    async selection(event) {
      let self = this;
      self.selectedWorkflow = event.target.value;
      //self.$workflowService.getWorkflowParameters(self.selectedWorkflow);
      //console.log("Selection changed to: " + self.selectedWorkflow);
      
      self.parameters = await self.$store.dispatch('getWorkflowDetails', self.selectedWorkflow);

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
