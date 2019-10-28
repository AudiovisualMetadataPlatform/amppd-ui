<template>
  <div>
    <h2>Workflow selection</h2>
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
export default {
  name: 'WorkflowSelection',
  props: {
  },
  data(){
    return {
      selectedWorkflow: null
    }
  },
  methods:{
    getWorkflows(){
      console.log("Getting workflows");
    },
    selection(event){
      let self = this;
      self.selectedWorkflow = event.target.value;
      console.log("Selection changed to: " + self.selectedWorkflow);
    }
  },
  mounted(){
    let self = this;
    self.getWorkflows();
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .workflow-selection{
    height:125px;
    background-color: aqua;
    display:flex;
    align-items: center;
    justify-content:center;
  }
  #workflows{
    width: 200px;
    padding:3px;
    margin-right:10px;
  }
</style>
