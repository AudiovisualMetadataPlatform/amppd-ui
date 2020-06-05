<template>
<div>
    <Header/>
    <Logout/>
    <div class="workflow-content" :class="{ 'modal-open' : isWorkflowModalVisible === true }" v-if="!workflowSubmitted">
      <h1>Workflow Submission</h1>
      <div class="workflow-body">
        <div class="left-pane">
          <WorkflowSelection/>
          <WorkflowFiles/>
          <Modal  class="my-modal" v-show="isWorkflowModalVisible"/>
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

    <Modal class="my-modal" v-if="isWorkflowModalVisible" @close="close()">
      <div slot="header" class="no-flex-header">
        <h5>Add Input files</h5>
      </div>
      <div slot="body">
          <input class="input-text" v-model="searchWord" type="text" placeholder="Search file by Name" v-on:keyup.enter="search()"/>
          <button type="button" class="search-button btn btn-info" style="align:right"  @click="search()" v-on:keyup.enter="search()">
          <svg class="svg-search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
					<title>search</title>
						<path d="M47.3 43.4c0 0.9-0.3 1.7-1 2.4 -0.7 0.7-1.5 1-2.4 1 -0.9 0-1.7-0.3-2.4-1l-9-9c-3.1 2.2-6.6 3.3-10.5 3.3 -2.5 0-4.9-0.5-7.2-1.5 -2.3-1-4.2-2.3-5.9-3.9s-3-3.6-3.9-5.9c-1-2.3-1.5-4.7-1.5-7.2 0-2.5 0.5-4.9 1.5-7.2 1-2.3 2.3-4.2 3.9-5.9s3.6-3 5.9-3.9c2.3-1 4.7-1.5 7.2-1.5 2.5 0 4.9 0.5 7.2 1.5 2.3 1 4.2 2.3 5.9 3.9s3 3.6 3.9 5.9c1 2.3 1.5 4.7 1.5 7.2 0 3.8-1.1 7.3-3.3 10.5l9 9C47 41.7 47.3 42.5 47.3 43.4zM30.4 29.9c2.3-2.3 3.4-5.1 3.4-8.3 0-3.2-1.1-6-3.4-8.3 -2.3-2.3-5.1-3.4-8.3-3.4 -3.2 0-6 1.1-8.3 3.4 -2.3 2.3-3.4 5.1-3.4 8.3 0 3.2 1.1 6 3.4 8.3 2.3 2.3 5.1 3.4 8.3 3.4C25.4 33.4 28.1 32.2 30.4 29.9z"></path>
					</svg>
          </button>

          <div v-for="(file, index) in searchedFiles" v-bind:key="index">
            <input type="checkbox" :id = "file.name" :value="file" v-model="selectedFiles" @change="addFiles()"/>
              <span class="file-name">{{file.name}}</span>
          </div>
    </div>
  </Modal>


    <div v-if="workflowSubmitted"> 
      <Jobs/>
    </div>
  </div>
</template>

<script>
import Modal from '@/components/shared/Modal';
import Header from '@/components/shared/Header.vue'
import Logout from '@/components/shared/Logout.vue'
import WorkflowSelection from '@/components/workflow/WorkflowSelection.vue'
import WorkflowFiles from '@/components/workflow/WorkflowFiles.vue'
import Jobs from '@/components/Jobs.vue'
import { sync } from 'vuex-pathify'
import WorkflowService from '../../service/workflow-service';

export default {
  name: 'Workflow',
  components:{
    Header,
    Logout,
    WorkflowSelection,
    WorkflowFiles,
    Jobs,
    Modal
  },
  data(){
    return {
      workflowSubmitted: false,
      bundle: null,
      workflowService: new WorkflowService(),
      searchWord:'',
      searchedFiles:[],
      selectedFiles:[]
    }
  },
  computed:{
      parameters: sync('parameters'),
      selectedWorkflow: sync('selectedWorkflow'),
      files: sync('files'),
      jobs: sync('jobs'),
      isWorkflowModalVisible: sync('isWorkflowModalVisible')
  },
  props: {
  },
  methods:{
    search() {
      let self = this;
      console.log("the search word is:", this.searchWord);
      self.searchedFiles = self.workflowService.searchFiles(this.searchWord).then(response => {
      self.searchedFiles = response.data._embedded.primaryfiles;
      })
      .catch(e => {
      console.log(e);});  
    },
    addFiles() {
      let self = this;
      self.files = this.selectedFiles;
      console.log("The file names checked are:",this.selectedFiles);
    },
    close() {
      this.searchWord = '';
      this.searchedFiles=[];
      this.isWorkflowModalVisible=false;
      this.$emit('close');
    },

    async createBundle(){
      let self = this;
      // create a new bundle with default name/description
      var bundle = {
        name: "Bundle #{this.files[0].id} ~ #{this.files[this.files.size-1].id}", 
        description: "Bundle with #{this.files.size} primaryfiles"
        // name: "Bundle " + this.files[0].id + " ~ " + this.files[this.files.size-1].id, 
        // description: "Bundle with " + this.files.size + " primaryfiles"
      }      
      await self.workflowService.createBundle(bundle)
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
      await self.workflowService.addPrimaryFiles(this.bundle.id, primaryfileIds)
       .then(response => {
          this.bundle = JSON.parse(response.data);
        })
        .catch(e => {
          console.log(e);
          // TODO:  Think about global error handling
        });
      },

      async submitWorkflow(){
        let self = this;
        console.log("Submitting workflow " + this.selectedWorkflow + " on bundle " + this.bundle.id);
        // console.log("workflowId = " + this.selectedWorkflow);
        // console.log("bundleId = " + this.bundle.id);
        await self.workflowService.submitWorkflow(this.selectedWorkflow, this.bundle.id)
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

.no-flex-header {
  display: contents;  
}
.modal-open {
    overflow-x: hidden;
    overflow-y: auto;
}

.my-modal {
  backdrop-filter: brightness(60%);
}

.input-text{
  height: calc(2.25rem + 1px);
	padding: 0.7rem 0.5rem;
  width: 90%;
}

.search-button{
  width:10%;
  height: calc(2.25rem + 1px);
}

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
