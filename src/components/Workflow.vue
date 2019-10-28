<template>
  <div>
    <h1>Workflow Submission</h1>
    <div class="workflow-body">
      <div class="left-pane">
        <WorkflowSelection/>
        <WorkflowFiles/>
      </div>
      <div class="right-pane">
        <h2>Workflow parameters</h2>
        <div>
          PARAMETERS
        </div>
      </div>
    </div>
    <div class="workflow-submit">
      <input v-on:click="submit" type="button" value="Submit" class="primary-button">
    </div>

  </div>
</template>

<script>
import WorkflowSelection from '@/components/WorkflowSelection.vue'
import WorkflowFiles from '@/components/WorkflowFiles.vue'
export default {
  name: 'Workflow',
  components:{
    WorkflowSelection,
    WorkflowFiles
  },
  props: {
  },
  methods:{
    submit(){
      console.log("Form submitted");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.workflow-body{
  background-color: teal;
  padding:10px;
  height: 100%;
  display: flex;
  align-items: stretch;
  justify-content: space-evenly;
  flex: 50%;
  flex-wrap: wrap;
}
.left-pane{
  background-color:wheat;
  width:50%;
}
.right-pane{
  background-color:yellow;
  width:50%;
}
.workflow-submit{
  display: flex;
  justify-content: flex-end;
  flex-flow:row;
  margin: 10px 0;
}
.primary-button{
  padding:5px;
  min-width:100px;
}
</style>
