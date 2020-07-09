<template>
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