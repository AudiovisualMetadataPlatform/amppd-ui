<template>
  <div>
    <div class="workflow-selection">
      <select id="workflows" v-on:change="selection">
        <option value="None">Select a workflow...</option>
        <option value="Workflow1">Workflow 1</option>
        <option value="Workflow2">Workflow 2</option>
        <option value="Workflow3">Workflow 3</option>
      </select>
    </div>
  </div>
</template>

<script>
import { sync } from 'vuex-pathify'
export default {
  name: 'WorkflowSelection',
  props: {
  },
  data() {
    return {
    }
  },
  computed:{
      selectedWorkflow: sync('selectedWorkflow')
  },
  methods:{
    getWorkflows() {
      console.log("Getting workflows");
    },
    selection(event) {
      let self = this;
      self.selectedWorkflow = event.target.value;
      console.log("Selection changed to: " + self.selectedWorkflow);
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
