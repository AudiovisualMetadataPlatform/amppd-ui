<template>
<div>
    <Header/>
    <div class="workflow-content">
      <h1>Workflow Submission</h1>
      <div class="workflow-body">
        <div class="left-pane">
          <WorkflowSelection/>
          <WorkflowFiles/>
        </div>
        <div class="right-pane">
          <div>
            <h2>Workflow Node Parameters</h2>
            <div class="workflow-parameter-nodes">
              <div v-for="(node, index) in parameters" v-bind:key="index" class="node">
                    <div class="node-name">Node: {{node.nodeName}}</div>
                    <div class="parameters" v-for="(parameter, subindex) in node.params" v-bind:key="subindex" >
                      <span class="parameter-name">{{parameter.name}}</span> <input :value="parameter.value" type="text"/>
                    </div>
              </div>
            </div>
          </div>
          <div class="workflow-submit">
              <input v-on:click="submit" type="button" value="Submit" class="primary-button">
          </div>
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
import Axios from 'axios'

export default {
  name: 'Workflow',
  components:{
    Header,
    WorkflowSelection,
    WorkflowFiles
  },
  data(){
    return {
    }
  },
  computed:{
      parameters: sync('parameters'),
      bundle: sync('bundle')
  },
  props: {
  },
  methods:{
    submit(){
      bundle = createBundle();
      submitWorkflow(bundle, selectedWorkflow);
      console.log("Form submitted");
    },
    createBundle(){
      // create a new bundle with default name/description
      bundle = { 
        name: "Bundle {{files[0].id}} ~  {{files[files.size-1].id}}", 
        description: "Bundle with {{files.size}} primary files"
      }      
      axios.post(process.env.VUE_APP_AMP_URL + '/bundles', bundle)
        .then(response => {
          bundle = response.data;
        })
        .catch(e => {
          console.log(e);
          // TODO:  Think about global error handling
        });;
  
      // add currently selected primaryfiles to the bundle
      axios.post(process.env.VUE_APP_AMP_URL + '/bundles/' + bundle.id + "/add/items/")
    }
  },
  mounted(){
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2{
  margin-top: 0;
}
h1 {

  text-align: center;
}
.workflow-content{
  padding-top:100px;
}
.workflow-body{
  padding:25px 10px 10px 10px;
  height: 100%;
  display: flex;
  align-items: stretch;
  justify-content: space-evenly;
  flex: 50%;
  flex-wrap: wrap;
}
h1{
  text-align: center;
}
.workflow-parameter-nodes{
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  font-size:13px;
}
.left-pane{
  min-width:450px;
}
.right-pane{
  min-width:450px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.right-pane h2{
  text-align: left;
}
.workflow-submit{
  display:flex;
  justify-content: flex-end;
  margin: 40px 20px 0;
  align-items: flex-end;
}
.button-row{
  display:flex;
  justify-content: center;
}
.primary-button{
  padding:5px;
  min-width:100px;
}
.node-name{
  text-align: left;
  font-weight: 700;
}
.parameter-name{
  text-align: left;
}
.parameters{
  display:flex;
  padding-left: 30px;
  justify-content: space-between;
  width:400px;
  padding-top:10px;
}
.parameters input{
  flex-basis: 60%;
}
.node{
  padding: 20px 0;
}
</style>
