<template>
  <div class="workflows">
   <div class="container col-12">
   <div class="row expand-h">
   <Sidebar/>
   <div class="col-10 bg-light-gray-1">
   <header class="bg-white">
      <a href="#">
         <svg data-prefix="fas" data-icon="user-circle" class="float-right icon-user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
            <path class="icon-dark-1" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"></path>
         </svg>
      </a>
   </header>
   <main>
      <div class="container-fluid">
         <div class="row">
            <SelectFilesLeft/>
            <SelectWorkflowRight/>
         </div>
      </div>
   </main>
   </div>
   </div>
   </div>
  </div>
</template>
<script>
   import Sidebar from '@/components/navigation/Sidebar.vue';
   import SelectFilesLeft from '@/components/workflow/SelectFilesLeft.vue';
   import SelectWorkflowRight from '@/components/workflow/SelectWorkflowRight.vue';
   import { sync } from 'vuex-pathify'
   import WorkflowService from '../../service/workflow-service';
   
   export default {
     name: 'Workflow',
     components:{
       SelectFilesLeft,
       SelectWorkflowRight,
       Sidebar
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

<style scoped>
@import '/amppd-ui/src/styles/style.css';
</style>