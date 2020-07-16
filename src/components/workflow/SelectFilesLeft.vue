<template>
<div class="col-lg-7">
   <h1>Workflow Submissions</h1>
   <h2>Select files</h2>
   <form class="marg-t-3 filter-form">
      <div class="container-fluid">
         <div class="row">
            <div class="col-12">
               <div id="limiter">
                  <strong>Limit results to </strong>
                  <div class="form-check form-check-inline">
                     <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1">
                     <label class="form-check-label" for="inlineCheckbox1">Audio</label>
                  </div>
                  <div class="form-check form-check-inline">
                     <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2">
                     <label class="form-check-label" for="inlineCheckbox2">Video</label>
                  </div>
               </div>
               <button id="select-saved" type="button" class="btn btn-primary float-right" data-toggle="modal" data-target=".select-from-saved-modal">Select from saved bundles</button>
            </div>
         </div>
      </div>
      <div class="form-group ">
         <div class="container-fluid">
            <div class="row">
               <div class="col-12">
                  <div class="input-group mb-3">
                     <label for="exampleFormControlInput100" class="sr-only">Search</label>
                     <input type="text" class="form-control" id="exampleFormControlInput100" placeholder="filter" v-model="searchWord">
                     <div class="input-group-append">
                        <button class="btn" v-on:click="searchFiles()">
                           <svg class="icon-filter" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 472.6 472.6">
                              <polygon points="472.6 12.9 0 12.9 180.1 202.6 180.1 459.7 292.6 401.5 292.5 202.6 "></polygon>
                           </svg>
                           Apply filter
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
     <div>
      </div>
   </form>
   <div>
      <h3>Search Results</h3>
      <div id="accordion">

         <div class="card" v-for="(item, index) in searchedFiles.rows" v-bind:key="index">
            <div class="card-header" id="headingTwo">
               <h5 class="mb-0">
                  <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                     <svg aria-hidden="true" focusable="false" class="svg-inline dwn-arrow" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <path class="hotlink" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path>
                     </svg>
                     <span class="sr-only">Toggle hidden content</span>
                     {{item.itemName}}
                  </button>
                  <!-- -->
                  <button class="btn btn-link float-right">
                     <svg class="icon-plus" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 311.5 311.5" style="enable-background:new 0 0 311.5 311.5;" xml:space="preserve">
                        <path class="circle-stroke" d="M156.8,302c-80.6,0-146.2-65.6-146.2-146.2S76.2,9.6,156.8,9.6S303,75.2,303,155.8S237.4,302,156.8,302z
                           M156.8,27.9c-70.5,0-127.9,57.4-127.9,127.9s57.4,127.9,127.9,127.9s127.9-57.4,127.9-127.9S227.3,27.9,156.8,27.9z"></path>
                        <path class="minus-stroke" d="M220.7,164.9H92.8c-5,0-9.1-4.1-9.1-9.1s4.1-9.1,9.1-9.1h127.9c5,0,9.1,4.1,9.1,9.1S225.8,164.9,220.7,164.9z"></path>
                        <path class="plus-stroke" d="M165.9,91.8v127.9c0,5-4.1,9.1-9.1,9.1s-9.1-4.1-9.1-9.1V91.8c0-5,4.1-9.1,9.1-9.1S165.9,86.8,165.9,91.8z"></path>
                     </svg>
                     Add all files
                  </button>
                  <!-- -->
               </h5>
            </div>
            <div id="collapseTwo" class="collapse show" aria-labelledby="headingTwo" data-parent="#accordion">
               <div class="card-body">
                  <!-- -->
                  <ul class="list-unstyled file-list" >
                     <li v-for="(file, index) in searchedFiles" v-bind:key="index">
                        <button class="btn btn-light btn-sm" disabled="">
                           <svg class="icon-play  " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                              <path class="icon-play" d="M25.7 8.8c2.7 0 5.3 0 7.8 0.1C35.9 8.9 37.8 9 39 9.1l1.8 0.1c0 0 0.2 0 0.4 0s0.4 0 0.6 0.1c0.1 0 0.3 0.1 0.6 0.1 0.3 0 0.5 0.1 0.7 0.2 0.2 0.1 0.4 0.2 0.7 0.3 0.3 0.1 0.5 0.3 0.7 0.5 0.2 0.2 0.5 0.4 0.7 0.6 0.1 0.1 0.2 0.2 0.4 0.4 0.2 0.2 0.4 0.7 0.7 1.4 0.3 0.7 0.5 1.5 0.6 2.4 0.1 1 0.2 2.1 0.3 3.3 0.1 1.2 0.1 2.1 0.1 2.7v1 3.3c0 2.3-0.1 4.6-0.4 7 -0.1 0.9-0.3 1.7-0.6 2.4s-0.5 1.2-0.8 1.5L45 36.7c-0.2 0.2-0.5 0.5-0.7 0.6 -0.2 0.2-0.5 0.3-0.7 0.5s-0.5 0.2-0.7 0.3c-0.2 0.1-0.4 0.1-0.7 0.2 -0.3 0-0.5 0.1-0.6 0.1 -0.1 0-0.3 0-0.6 0.1 -0.2 0-0.4 0-0.4 0 -4 0.3-9 0.5-15 0.5 -3.3 0-6.2-0.1-8.6-0.2 -2.4-0.1-4-0.1-4.8-0.2L11 38.6l-0.9-0.1c-0.6-0.1-1-0.2-1.3-0.2 -0.3-0.1-0.7-0.2-1.2-0.5s-1-0.6-1.4-1c-0.1-0.1-0.2-0.2-0.4-0.4 -0.2-0.2-0.4-0.7-0.7-1.4s-0.5-1.5-0.6-2.4c-0.1-1-0.2-2.1-0.3-3.3 -0.1-1.2-0.1-2.1-0.1-2.7v-1 -3.3c0-2.3 0.1-4.6 0.4-7 0.1-0.9 0.3-1.7 0.6-2.4s0.5-1.2 0.8-1.5L6.3 11c0.2-0.2 0.5-0.5 0.7-0.6 0.2-0.2 0.5-0.3 0.7-0.5C8 9.8 8.2 9.7 8.4 9.6s0.4-0.1 0.7-0.2c0.3 0 0.5-0.1 0.6-0.1 0.1 0 0.3 0 0.6-0.1s0.4 0 0.4 0C14.6 8.9 19.6 8.8 25.7 8.8zM21.2 29.4l11.6-6 -11.6-6.1V29.4z"></path>
                           </svg>
                           {{item.primaryFileName}}
                        </button>
                        <button class="btn btn-link  add-remove float-right" disabled="">
                           <svg class="icon-plus" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 311.5 311.5" style="enable-background:new 0 0 311.5 311.5;" xml:space="preserve">
                              <path class="circle-stroke" d="M156.8,302c-80.6,0-146.2-65.6-146.2-146.2S76.2,9.6,156.8,9.6S303,75.2,303,155.8S237.4,302,156.8,302z
                                 M156.8,27.9c-70.5,0-127.9,57.4-127.9,127.9s57.4,127.9,127.9,127.9s127.9-57.4,127.9-127.9S227.3,27.9,156.8,27.9z"></path>
                              <path class="minus-stroke" d="M220.7,164.9H92.8c-5,0-9.1-4.1-9.1-9.1s4.1-9.1,9.1-9.1h127.9c5,0,9.1,4.1,9.1,9.1S225.8,164.9,220.7,164.9z"></path>
                              <path class="plus-stroke" d="M165.9,91.8v127.9c0,5-4.1,9.1-9.1,9.1s-9.1-4.1-9.1-9.1V91.8c0-5,4.1-9.1,9.1-9.1S165.9,86.8,165.9,91.8z"></path>
                           </svg>
                           Add file
                        </button>
                     </li>
                  </ul>
                  <!-- -->
               </div>
            </div>
         </div>

      </div>
   </div>
</div>
</template>
<script>
import { sync } from 'vuex-pathify';
import WorkflowService from '../../service/workflow-service';
export default {
	name: 'selectFilesLeft',
    data(){
		return {
		searchAudio : false,
		searchVideo : false,
		searchWord : '',
		searchedFiles:[],
        selectedFiles:[],
		workflowService: new WorkflowService()
		}
	},
	methods:{
		async searchFiles() {
			let self = this;
			console.log("the search word is:"+ self.searchWord);
         self.searchedFiles = await self.workflowService.searchFiles(this.searchWord);
         /*.then(response => {
				self.searchedFiles = response.data._embedded.primaryfiles;})
				.catch(e => {
					console.log(e);});*/
			console.log("the files are:"+self.searchedFiles.length);
		},
		addFiles() {
			let self = this;
			self.files = this.selectedFiles;
			console.log("The file names checked are:",this.selectedFiles);
		},
	}
}
</script>