<template>
<div class="col-lg-5">
   <div class="card pad-all-2">
      <h4>Select workflow</h4>
      <div class="form-group">
         <label for="workflow-name-select" class="sr-only">Select list:</label>
         <select class="form-control" id="workflow-name-select" v-on:change="selection" >
            <option value="">Select a workflow...</option>
            <option v-for="(workflow, index) in workflows"  v-bind:key="index" v-bind:value="workflow.id">{{workflow.name}}</option>
         </select>
      </div>
      <div class="scroll-div">
         <ul class="list-unstyled">
            <li v-for="(param, index) in parameters" v-bind:key="index" v-bind:value="parameters.nodeId">
               <h5>Node {{param.nodeId}}: {{param.nodeName}}</h5>
               <p v-for="(p, paramIndex) in param.params" v-bind:key="paramIndex" v-bind:value="p.name">
                  {{p.name}}: {{p.value}}
               </p>
            </li>
         </ul>
      </div>
      <div class="pad-all-2">
         <!-- h3>Workflow selection</h3>
            <ul class="list-unstyled">
              <li>
                <button class="btn"> <svg class="icon-play  " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                    <path class="icon-play" d="M25.7 8.8c2.7 0 5.3 0 7.8 0.1C35.9 8.9 37.8 9 39 9.1l1.8 0.1c0 0 0.2 0 0.4 0s0.4 0 0.6 0.1c0.1 0 0.3 0.1 0.6 0.1 0.3 0 0.5 0.1 0.7 0.2 0.2 0.1 0.4 0.2 0.7 0.3 0.3 0.1 0.5 0.3 0.7 0.5 0.2 0.2 0.5 0.4 0.7 0.6 0.1 0.1 0.2 0.2 0.4 0.4 0.2 0.2 0.4 0.7 0.7 1.4 0.3 0.7 0.5 1.5 0.6 2.4 0.1 1 0.2 2.1 0.3 3.3 0.1 1.2 0.1 2.1 0.1 2.7v1 3.3c0 2.3-0.1 4.6-0.4 7 -0.1 0.9-0.3 1.7-0.6 2.4s-0.5 1.2-0.8 1.5L45 36.7c-0.2 0.2-0.5 0.5-0.7 0.6 -0.2 0.2-0.5 0.3-0.7 0.5s-0.5 0.2-0.7 0.3c-0.2 0.1-0.4 0.1-0.7 0.2 -0.3 0-0.5 0.1-0.6 0.1 -0.1 0-0.3 0-0.6 0.1 -0.2 0-0.4 0-0.4 0 -4 0.3-9 0.5-15 0.5 -3.3 0-6.2-0.1-8.6-0.2 -2.4-0.1-4-0.1-4.8-0.2L11 38.6l-0.9-0.1c-0.6-0.1-1-0.2-1.3-0.2 -0.3-0.1-0.7-0.2-1.2-0.5s-1-0.6-1.4-1c-0.1-0.1-0.2-0.2-0.4-0.4 -0.2-0.2-0.4-0.7-0.7-1.4s-0.5-1.5-0.6-2.4c-0.1-1-0.2-2.1-0.3-3.3 -0.1-1.2-0.1-2.1-0.1-2.7v-1 -3.3c0-2.3 0.1-4.6 0.4-7 0.1-0.9 0.3-1.7 0.6-2.4s0.5-1.2 0.8-1.5L6.3 11c0.2-0.2 0.5-0.5 0.7-0.6 0.2-0.2 0.5-0.3 0.7-0.5C8 9.8 8.2 9.7 8.4 9.6s0.4-0.1 0.7-0.2c0.3 0 0.5-0.1 0.6-0.1 0.1 0 0.3 0 0.6-0.1s0.4 0 0.4 0C14.6 8.9 19.6 8.8 25.7 8.8zM21.2 29.4l11.6-6 -11.6-6.1V29.4z" /></svg>
                  6 video files</button>
              </li>
              <li>
                <button class="btn"> <svg class="icon-play-audio" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                    <path d="M24.3 11.2v26.1c0 0.4-0.2 0.8-0.5 1.1 -0.3 0.3-0.7 0.5-1.1 0.5s-0.8-0.2-1.1-0.5l-8-8H7.4c-0.4 0-0.8-0.2-1.1-0.5 -0.3-0.3-0.5-0.7-0.5-1.1v-9.2c0-0.4 0.2-0.8 0.5-1.1 0.3-0.3 0.7-0.5 1.1-0.5h6.3l8-8c0.3-0.3 0.7-0.5 1.1-0.5s0.8 0.2 1.1 0.5C24.2 10.4 24.3 10.8 24.3 11.2zM32.5 20.9c0.7 1.1 1 2.2 1 3.4s-0.3 2.3-1 3.4 -1.6 1.8-2.7 2.2C29.6 30 29.4 30 29.2 30c-0.4 0-0.8-0.1-1.1-0.4s-0.5-0.7-0.5-1.1c0-0.3 0.1-0.6 0.3-0.9 0.2-0.2 0.4-0.4 0.7-0.6 0.3-0.2 0.5-0.4 0.8-0.6s0.5-0.5 0.7-0.9c0.2-0.4 0.3-0.8 0.3-1.4 0-0.5-0.1-1-0.3-1.4 -0.2-0.4-0.4-0.7-0.7-0.9 -0.3-0.2-0.5-0.4-0.8-0.6 -0.3-0.2-0.5-0.4-0.7-0.6s-0.3-0.5-0.3-0.9c0-0.4 0.2-0.8 0.5-1.1 0.3-0.3 0.7-0.4 1.1-0.4 0.2 0 0.4 0 0.6 0.1C30.9 19.1 31.8 19.8 32.5 20.9zM37.6 17.5c1.4 2.1 2 4.3 2 6.8 0 2.4-0.7 4.7-2 6.8 -1.4 2.1-3.2 3.6-5.4 4.5 -0.2 0.1-0.4 0.1-0.6 0.1 -0.4 0-0.8-0.2-1.1-0.5 -0.3-0.3-0.5-0.7-0.5-1.1 0-0.6 0.3-1.1 0.9-1.4 0.9-0.5 1.5-0.8 1.8-1.1 1.2-0.9 2.1-1.9 2.8-3.3s1-2.7 1-4.2 -0.3-2.9-1-4.2c-0.7-1.3-1.6-2.4-2.8-3.3 -0.3-0.2-0.9-0.6-1.8-1.1 -0.6-0.3-0.9-0.8-0.9-1.4 0-0.4 0.2-0.8 0.5-1.1 0.3-0.3 0.7-0.5 1.1-0.5 0.2 0 0.4 0 0.6 0.1C34.5 13.9 36.3 15.4 37.6 17.5zM42.8 14.1c2 3.1 3 6.5 3 10.1 0 3.7-1 7.1-3 10.1 -2 3.1-4.7 5.3-8.1 6.8 -0.2 0.1-0.4 0.1-0.6 0.1 -0.4 0-0.8-0.2-1.1-0.5 -0.3-0.3-0.5-0.7-0.5-1.1 0-0.6 0.3-1 0.9-1.4 0.1-0.1 0.3-0.1 0.5-0.3 0.2-0.1 0.4-0.2 0.5-0.3 0.7-0.4 1.4-0.8 2-1.2 2-1.5 3.5-3.3 4.6-5.4 1.1-2.2 1.7-4.5 1.7-6.9 0-2.4-0.6-4.8-1.7-6.9 -1.1-2.2-2.6-4-4.6-5.4 -0.6-0.4-1.2-0.8-2-1.2 -0.1-0.1-0.3-0.1-0.5-0.3s-0.4-0.2-0.5-0.3c-0.6-0.4-0.9-0.8-0.9-1.4 0-0.4 0.2-0.8 0.5-1.1 0.3-0.3 0.7-0.5 1.1-0.5 0.2 0 0.4 0 0.6 0.1C38 8.8 40.7 11 42.8 14.1z" /></svg>
                  6 audio files</button>
              </li>
            </ul -->
      </div>
      <h4>Selected Files</h4>
      <div class="container no-pad no-marg">
         <div class="">
            <div class="">
               <div class="eq-btns btn-columns">
                  <button v-on:click="submitWorkflow" :disabled="submissionEnabled === false" type="button" class="btn btn-primary btn-md" data-toggle="modal" data-target=".save-modal">Submit to workflow</button>
                  <button type="button" class="btn btn-outline-primary btn-md" data-toggle="modal" data-target=".bd-example-modal-lg">Save selection as bundle</button>
               </div>
               <ul class="list-unstyled file-list">
                  <li v-for="(file, index) in selectedFiles" v-bind:key="index" v-bind:value="file.id">
                     <button class="btn">
                        <svg class="icon-play  " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                           <path class="icon-play" d="M25.7 8.8c2.7 0 5.3 0 7.8 0.1C35.9 8.9 37.8 9 39 9.1l1.8 0.1c0 0 0.2 0 0.4 0s0.4 0 0.6 0.1c0.1 0 0.3 0.1 0.6 0.1 0.3 0 0.5 0.1 0.7 0.2 0.2 0.1 0.4 0.2 0.7 0.3 0.3 0.1 0.5 0.3 0.7 0.5 0.2 0.2 0.5 0.4 0.7 0.6 0.1 0.1 0.2 0.2 0.4 0.4 0.2 0.2 0.4 0.7 0.7 1.4 0.3 0.7 0.5 1.5 0.6 2.4 0.1 1 0.2 2.1 0.3 3.3 0.1 1.2 0.1 2.1 0.1 2.7v1 3.3c0 2.3-0.1 4.6-0.4 7 -0.1 0.9-0.3 1.7-0.6 2.4s-0.5 1.2-0.8 1.5L45 36.7c-0.2 0.2-0.5 0.5-0.7 0.6 -0.2 0.2-0.5 0.3-0.7 0.5s-0.5 0.2-0.7 0.3c-0.2 0.1-0.4 0.1-0.7 0.2 -0.3 0-0.5 0.1-0.6 0.1 -0.1 0-0.3 0-0.6 0.1 -0.2 0-0.4 0-0.4 0 -4 0.3-9 0.5-15 0.5 -3.3 0-6.2-0.1-8.6-0.2 -2.4-0.1-4-0.1-4.8-0.2L11 38.6l-0.9-0.1c-0.6-0.1-1-0.2-1.3-0.2 -0.3-0.1-0.7-0.2-1.2-0.5s-1-0.6-1.4-1c-0.1-0.1-0.2-0.2-0.4-0.4 -0.2-0.2-0.4-0.7-0.7-1.4s-0.5-1.5-0.6-2.4c-0.1-1-0.2-2.1-0.3-3.3 -0.1-1.2-0.1-2.1-0.1-2.7v-1 -3.3c0-2.3 0.1-4.6 0.4-7 0.1-0.9 0.3-1.7 0.6-2.4s0.5-1.2 0.8-1.5L6.3 11c0.2-0.2 0.5-0.5 0.7-0.6 0.2-0.2 0.5-0.3 0.7-0.5C8 9.8 8.2 9.7 8.4 9.6s0.4-0.1 0.7-0.2c0.3 0 0.5-0.1 0.6-0.1 0.1 0 0.3 0 0.6-0.1s0.4 0 0.4 0C14.6 8.9 19.6 8.8 25.7 8.8zM21.2 29.4l11.6-6 -11.6-6.1V29.4z"></path>
                        </svg>
                        {{file.name}}
                     </button>
                     <button class="btn btn-link add-remove float-right" v-on:click="removeFile(file.id)">
                        <svg class="icon-minus" version="1.1" id="Layer_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 311.5 311.5" style="enable-background:new 0 0 311.5 311.5;" xml:space="preserve">
                           <path class="circle-stroke" d="M156.8,302c-80.6,0-146.2-65.6-146.2-146.2S76.2,9.6,156.8,9.6S303,75.2,303,155.8S237.4,302,156.8,302z
                              M156.8,27.9c-70.5,0-127.9,57.4-127.9,127.9s57.4,127.9,127.9,127.9s127.9-57.4,127.9-127.9S227.3,27.9,156.8,27.9z"></path>
                           <path class="minus-stroke" d="M220.7,164.9H92.8c-5,0-9.1-4.1-9.1-9.1s4.1-9.1,9.1-9.1h127.9c5,0,9.1,4.1,9.1,9.1S225.8,164.9,220.7,164.9z"></path>
                           <path class="plus-stroke" d="M165.9,91.8v127.9c0,5-4.1,9.1-9.1,9.1s-9.1-4.1-9.1-9.1V91.8c0-5,4.1-9.1,9.1-9.1S165.9,86.8,165.9,91.8z"></path>
                        </svg>
                        Remove file
                     </button>
                  </li>
               </ul>
            </div>
         </div>
      </div>
   </div>
   <modal v-if="showModal" @close="showModal = false" class="my-modal">
      <h3  slot="header">{{modalHeader}}</h3>
      <div slot="body">
         {{modalText}}
      </div>
      <div slot="footer">
            <input type="button" class="secondary-button" v-on:click="showModal = false" value="Ok"/>
      </div>
   </modal>
</div>
</template>
<script>
import { sync } from 'vuex-pathify'
import {requestOptions} from '@/helpers/request-options'
import Modal from '@/components/shared/Modal.vue'
import WorkflowService from '../../service/workflow-service';
export default {
  name: 'WorkflowSelection',
  props: {
  },
  data() {
    return {
      workflows:[],
      workflowService: new WorkflowService(),
      modalHeader: "Error",
      modalText: "",
      showModal: false
    }
  },
  components:{
     Modal
  },
  computed:{
      selectedWorkflow: sync('selectedWorkflow'),
      workflowSubmission: sync('workflowSubmission'),
      selectedFiles: sync('workflowSubmission.selectedFiles'),
      parameters: sync('parameters'),
      submissionEnabled(){
         let self = this;
         if(self.selectedFiles.length==0 || !self.selectedWorkflow) return false;
         return true;
      }
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
    },
    async addPrimaryFilesToBundle(bundle){
       let self = this;
       // add currently selected primaryfiles to the bundle
      var primaryfileIds = this.selectedFiles[0].id; 
      for (var i=1; i<this.selectedFiles.length; i++) {
         primaryfileIds += "," + this.selectedFiles[i].id;
      }

      await self.workflowService.addPrimaryFiles(bundle.id, primaryfileIds)
         .then(response => {
            console.log("return from bundle");
            console.log(response);
            bundle = response.data;
         })
         .catch(e => {
            console.log(e);
            self.modalText = "Error adding primary files to bundle. Please contact a system administrator."
            self.showModal = true;
         });
      return bundle;
    },
    async createTemporaryBundle(){
      let self = this;
      // create a new bundle with default name/description
      var startId = self.selectedFiles[0].id;
      var size = self.selectedFiles.length;
      var endId = self.selectedFiles[size-1].id;
      var bundle = {
         name: "Bundle #" + startId + " ~ #" + endId, 
         description: "Bundle with #" + size + " primaryfiles"
      };
      var createdBundle = await self.workflowService.createBundle(bundle)
         .then(response => {
            var createdBundle = response.data;
            self.addPrimaryFilesToBundle(createdBundle);
            return createdBundle;
         })
         .catch(e => {
            console.log(e);
            self.modalText = "Error creating bundle. Please contact a system administrator."
            self.showModal = true;
            throw new Error("Could not create bundle");
         }); 
      console.log("Bundle created");
      console.log(createdBundle);
      return createdBundle;     
    },
    async createBundle(name, description){
         console.log("Creating a bundle!!!")
    },
    async showCreateBundleModal(name, description){
         console.log("Showing create bundle modal!!!")
    },
   async submitWorkflow(){
      console.log("Submitting workflow");
      let self = this;
      self.workflowSubmission.loading = true;
      self.createTemporaryBundle().then(bundleResponse=>{
         self.workflowService.submitWorkflow(this.selectedWorkflow, bundleResponse.id)
            .then(response => {
               this.jobs = response.data;
               self.modalHeader = "Success!";
               self.modalText = "Your files have been successfully submitted to workflow " + self.selectedWorkflow;
               self.showModal = true;
               })
               .catch(e => {
                  console.log(e);
                  self.modalText = "Error submitting workflow. Please contact a system administrator."
                  self.showModal = true;
               });
               
      });      
      self.workflowSubmission.loading = false;
   },
    removeFile(id){
      let self = this;
      for( var i = 0; i < self.selectedFiles.length; i++){ 
        if (self.selectedFiles[i].id === id) {
          self.selectedFiles.splice(i, 1); 
        }
      }
    }
  },
  mounted() {
    let self = this;
    self.getWorkflows();
    if(!self.selectedFiles) self.selectedFiles = [];
  }
}
</script>
<style lang="css">
@import '/amppd-ui/src/styles/style.css';
</style>