<template>
<div>
    <Header/>
    <Logout/>
    <div class="workflow-content" v-if="!workflowSubmitted">
      <h1>Workflow Submission</h1>
      <div class="workflow-body">
        <div class="left-pane">
          <WorkflowSelection/>
          <WorkflowFiles/>
        </div>
        <div class="right-pane">
          <div>
            <h2>Workflow Step Parameters</h2>
            <div class="workflow-parameter-nodes">
              <div v-for="(node, index) in parameters" v-bind:key="index" class="node">
                    <div class="node-name">Step {{node.nodeId}}: {{node.nodeName}} ({{node.annotation}})</div>
                    <div class="parameters" v-for="(parameter, subindex) in node.params" v-bind:key="subindex" >
                      <span class="parameter-name">{{parameter.name}}</span> <input :value="parameter.value" type="text"/>
                    </div>
              </div>
            </div>
          </div>
          <div class="workflow-submit">
              <input v-on:click="submit" type="button" value="Submit" :disabled="!(selectedWorkflow && files.length>0)" class="primary-button">
          </div>
        </div>
      </div>
    </div>
    <div v-if="workflowSubmitted"> 
      <Jobs/>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Logout from '@/components/Logout.vue'
import WorkflowSelection from '@/components/WorkflowSelection.vue'
import WorkflowFiles from '@/components/WorkflowFiles.vue'
import Jobs from '@/components/Jobs.vue'
import { sync } from 'vuex-pathify'
import axios from 'axios'

export default {
  name: 'Workflow',
  components:{
    Header,
    Logout,
    WorkflowSelection,
    WorkflowFiles,
    Jobs
  },
  data(){
    return {
      workflowSubmitted: false,
      bundle: null
    }
  },
  computed:{
      parameters: sync('parameters'),
      selectedWorkflow: sync('selectedWorkflow'),
      files: sync('files'),
      jobs: sync('jobs')
  },
  props: {
  },
  methods:{

    async createBundle(){
      // create a new bundle with default name/description
      var bundle = {
        name: "Bundle #{this.files[0].id} ~ #{this.files[this.files.size-1].id}", 
        description: "Bundle with #{this.files.size} primaryfiles"
        // name: "Bundle " + this.files[0].id + " ~ " + this.files[this.files.size-1].id, 
        // description: "Bundle with " + this.files.size + " primaryfiles"
      }      
      await axios.post(process.env.VUE_APP_AMP_URL + '/bundles', bundle)
        .then(response => {
          this.bundle = response.data;
        })
        .catch(e => {
          console.log(e);
          // TODO:  Think about global error handling
        });
  
      // add currently selected primaryfiles to the bundle
      var primaryfileIds = this.files[0].id; 
      for (var i=1; i<this.files.length; i++) {
        primaryfileIds += "," + this.files[i].id;
      }
      // console.log("Adding primaryfiles " + primaryfileIds + " to bundle " + this.bundle.id);
      console.log("bundleId = " + this.bundle.id);
      console.log("primaryfileIds = " + primaryfileIds);
      await axios.post(process.env.VUE_APP_AMP_URL + '/bundles/' + this.bundle.id + '/addPrimaryfiles?primaryfileIds=' + primaryfileIds)
       .then(response => {
          this.bundle = JSON.parse(response.data);
        })
        .catch(e => {
          console.log(e);
          // TODO:  Think about global error handling
        });
      },

      async submitWorkflow(){
        console.log("Submitting workflow " + this.selectedWorkflow + " on bundle " + this.bundle.id);
        // console.log("workflowId = " + this.selectedWorkflow);
        // console.log("bundleId = " + this.bundle.id);
        await axios.post(process.env.VUE_APP_AMP_URL + '/jobs/bundle?workflowId=' + this.selectedWorkflow + '&bundleId=' + this.bundle.id)
        .then(response => {
            this.jobs = response.data;
            // this.$router.push("/jobs");
          })
          .catch(e => {
            console.log(e);
            // TODO:  Think about global error handling
          });
      },

    async submit(){
      await this.createBundle();
      await this.submitWorkflow();
      this.workflowSubmitted = true;
      console.log("Workflow submitted");
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
