<template>
<div class="col-lg-7">
   <modal v-if="workflowSubmission.showSelectBundle" id="selectBundle" @close="workflowSubmission.showSelectBundle = false" class="my-modal">
      <h3 slot="header">Select Primaryfiles from saved bundles</h3>
      <div slot="body" class="input-group mb-3">      
      <div id="accordion" v-if="bundles && bundles.length>0" class="bundles">
         <div class="card" v-for="(bundle, index) in bundles" v-bind:key="index" >
            <div class="card-header" id="headingTwo">
               <h3 class="mb-0">
                <div class="btn btn-link bundle" :class="{ 'collapsed': visible !== index }" :key="bundle.id" 
				  	      v-on:click="expandBundle(index)" data-toggle="collapse" data-target="#collapseTwo" 
					      aria-expanded="visible === index" aria-controls="collapseTwo" :title="[bundle.description]">
                  <span class="bundle-content">
                     <svg aria-hidden="true" focusable="false" class="svg-inline dwn-arrow" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <path class="hotlink" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path>
                     </svg>
                     {{bundle.name}}
                  </span>
                  <span class="bundle-content">
                     {{bundle.createdBy}}
                  </span>
                  <button class="btn btn-link float-right" v-on:click="addAllFiles(bundle)" v-bind:disabled=allSelected(bundle) :key="updateSelectedFiles">
                     <svg class="icon-plus" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 311.5 311.5" style="enable-background:new 0 0 311.5 311.5;" xml:space="preserve">
                        <path class="circle-stroke" d="M156.8,302c-80.6,0-146.2-65.6-146.2-146.2S76.2,9.6,156.8,9.6S303,75.2,303,155.8S237.4,302,156.8,302z
                           M156.8,27.9c-70.5,0-127.9,57.4-127.9,127.9s57.4,127.9,127.9,127.9s127.9-57.4,127.9-127.9S227.3,27.9,156.8,27.9z"></path>
                        <path class="minus-stroke" d="M220.7,164.9H92.8c-5,0-9.1-4.1-9.1-9.1s4.1-9.1,9.1-9.1h127.9c5,0,9.1,4.1,9.1,9.1S225.8,164.9,220.7,164.9z"></path>
                        <path class="plus-stroke" d="M165.9,91.8v127.9c0,5-4.1,9.1-9.1,9.1s-9.1-4.1-9.1-9.1V91.8c0-5,4.1-9.1,9.1-9.1S165.9,86.8,165.9,91.8z"></path>
                     </svg>
                     Add all files
                  </button>
                </div>
               </h3>
            </div>
            <div id="collapseTwo" class="collapse" :class="{ 'show' : visible === index }" aria-labelledby="headingTwo" data-parent="#accordion">
               <div class="card-body">
                  <!-- -->
                  <ul class="list-unstyled file-list" >
                     <li v-for="(primaryfile, indexPf) in bundle.primaryfiles" v-bind:key="indexPf">
                        <button class="btn btn-light btn-sm" :disabled="true">
                           <svg v-if="!workflowService.isAudioFile(primaryfile)" class="icon-play" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                              <path class="icon-play" d="M25.7 8.8c2.7 0 5.3 0 7.8 0.1C35.9 8.9 37.8 9 39 9.1l1.8 0.1c0 0 0.2 0 0.4 0s0.4 0 0.6 0.1c0.1 0 0.3 0.1 0.6 0.1 0.3 0 0.5 0.1 0.7 0.2 0.2 0.1 0.4 0.2 0.7 0.3 0.3 0.1 0.5 0.3 0.7 0.5 0.2 0.2 0.5 0.4 0.7 0.6 0.1 0.1 0.2 0.2 0.4 0.4 0.2 0.2 0.4 0.7 0.7 1.4 0.3 0.7 0.5 1.5 0.6 2.4 0.1 1 0.2 2.1 0.3 3.3 0.1 1.2 0.1 2.1 0.1 2.7v1 3.3c0 2.3-0.1 4.6-0.4 7 -0.1 0.9-0.3 1.7-0.6 2.4s-0.5 1.2-0.8 1.5L45 36.7c-0.2 0.2-0.5 0.5-0.7 0.6 -0.2 0.2-0.5 0.3-0.7 0.5s-0.5 0.2-0.7 0.3c-0.2 0.1-0.4 0.1-0.7 0.2 -0.3 0-0.5 0.1-0.6 0.1 -0.1 0-0.3 0-0.6 0.1 -0.2 0-0.4 0-0.4 0 -4 0.3-9 0.5-15 0.5 -3.3 0-6.2-0.1-8.6-0.2 -2.4-0.1-4-0.1-4.8-0.2L11 38.6l-0.9-0.1c-0.6-0.1-1-0.2-1.3-0.2 -0.3-0.1-0.7-0.2-1.2-0.5s-1-0.6-1.4-1c-0.1-0.1-0.2-0.2-0.4-0.4 -0.2-0.2-0.4-0.7-0.7-1.4s-0.5-1.5-0.6-2.4c-0.1-1-0.2-2.1-0.3-3.3 -0.1-1.2-0.1-2.1-0.1-2.7v-1 -3.3c0-2.3 0.1-4.6 0.4-7 0.1-0.9 0.3-1.7 0.6-2.4s0.5-1.2 0.8-1.5L6.3 11c0.2-0.2 0.5-0.5 0.7-0.6 0.2-0.2 0.5-0.3 0.7-0.5C8 9.8 8.2 9.7 8.4 9.6s0.4-0.1 0.7-0.2c0.3 0 0.5-0.1 0.6-0.1 0.1 0 0.3 0 0.6-0.1s0.4 0 0.4 0C14.6 8.9 19.6 8.8 25.7 8.8zM21.2 29.4l11.6-6 -11.6-6.1V29.4z"></path>
                           </svg>
                           <svg v-else class="icon-play-audio" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                              <path d="M24.3 11.2v26.1c0 0.4-0.2 0.8-0.5 1.1 -0.3 0.3-0.7 0.5-1.1 0.5s-0.8-0.2-1.1-0.5l-8-8H7.4c-0.4 0-0.8-0.2-1.1-0.5 -0.3-0.3-0.5-0.7-0.5-1.1v-9.2c0-0.4 0.2-0.8 0.5-1.1 0.3-0.3 0.7-0.5 1.1-0.5h6.3l8-8c0.3-0.3 0.7-0.5 1.1-0.5s0.8 0.2 1.1 0.5C24.2 10.4 24.3 10.8 24.3 11.2zM32.5 20.9c0.7 1.1 1 2.2 1 3.4s-0.3 2.3-1 3.4 -1.6 1.8-2.7 2.2C29.6 30 29.4 30 29.2 30c-0.4 0-0.8-0.1-1.1-0.4s-0.5-0.7-0.5-1.1c0-0.3 0.1-0.6 0.3-0.9 0.2-0.2 0.4-0.4 0.7-0.6 0.3-0.2 0.5-0.4 0.8-0.6s0.5-0.5 0.7-0.9c0.2-0.4 0.3-0.8 0.3-1.4 0-0.5-0.1-1-0.3-1.4 -0.2-0.4-0.4-0.7-0.7-0.9 -0.3-0.2-0.5-0.4-0.8-0.6 -0.3-0.2-0.5-0.4-0.7-0.6s-0.3-0.5-0.3-0.9c0-0.4 0.2-0.8 0.5-1.1 0.3-0.3 0.7-0.4 1.1-0.4 0.2 0 0.4 0 0.6 0.1C30.9 19.1 31.8 19.8 32.5 20.9zM37.6 17.5c1.4 2.1 2 4.3 2 6.8 0 2.4-0.7 4.7-2 6.8 -1.4 2.1-3.2 3.6-5.4 4.5 -0.2 0.1-0.4 0.1-0.6 0.1 -0.4 0-0.8-0.2-1.1-0.5 -0.3-0.3-0.5-0.7-0.5-1.1 0-0.6 0.3-1.1 0.9-1.4 0.9-0.5 1.5-0.8 1.8-1.1 1.2-0.9 2.1-1.9 2.8-3.3s1-2.7 1-4.2 -0.3-2.9-1-4.2c-0.7-1.3-1.6-2.4-2.8-3.3 -0.3-0.2-0.9-0.6-1.8-1.1 -0.6-0.3-0.9-0.8-0.9-1.4 0-0.4 0.2-0.8 0.5-1.1 0.3-0.3 0.7-0.5 1.1-0.5 0.2 0 0.4 0 0.6 0.1C34.5 13.9 36.3 15.4 37.6 17.5zM42.8 14.1c2 3.1 3 6.5 3 10.1 0 3.7-1 7.1-3 10.1 -2 3.1-4.7 5.3-8.1 6.8 -0.2 0.1-0.4 0.1-0.6 0.1 -0.4 0-0.8-0.2-1.1-0.5 -0.3-0.3-0.5-0.7-0.5-1.1 0-0.6 0.3-1 0.9-1.4 0.1-0.1 0.3-0.1 0.5-0.3 0.2-0.1 0.4-0.2 0.5-0.3 0.7-0.4 1.4-0.8 2-1.2 2-1.5 3.5-3.3 4.6-5.4 1.1-2.2 1.7-4.5 1.7-6.9 0-2.4-0.6-4.8-1.7-6.9 -1.1-2.2-2.6-4-4.6-5.4 -0.6-0.4-1.2-0.8-2-1.2 -0.1-0.1-0.3-0.1-0.5-0.3s-0.4-0.2-0.5-0.3c-0.6-0.4-0.9-0.8-0.9-1.4 0-0.4 0.2-0.8 0.5-1.1 0.3-0.3 0.7-0.5 1.1-0.5 0.2 0 0.4 0 0.6 0.1C38 8.8 40.7 11 42.8 14.1z" />
                           </svg>
                           {{primaryfile.name}}
                        </button>
                     </li>
                  </ul>
                  <!-- -->
               </div>
            </div>
         </div>
      </div>	
      <div v-else>  
         No Bundles found
      </div>	    
	  </div>
      <div slot="footer">
         <input type="button" class="btn btn-primary btn-md" v-on:click="workflowSubmission.showSelectBundle = false" value="Done"/>
      </div>
   </modal>

   <modal v-if="showResponse" id="response" @close="showResponse = false" class="my-modal">
      <h3 slot="header">{{responseHeader}}</h3>
      <div slot="body">
        {{responseText}}
      </div>
      <div slot="footer">
        <input type="button" class="secondary-button" v-on:click="showResponse = false" value="Ok"/>
      </div>
   </modal>   
</div>
</template>

<script>
import {sync} from 'vuex-pathify';
import Modal from '@/components/shared/Modal.vue';
import WorkflowService from '../../service/workflow-service';

export default {
  name: 'SelectBundle',
  props: {
  },

  data() {
    return {
      workflowService: new WorkflowService(),
	   showResponse: false,
      responseHeader: "",
      responseText: "",
	   bundles: [],
      visible : -1,
    }
  },

  components:{
     Modal
  },

  computed:{
    workflowSubmission: sync('workflowSubmission'),
	 selectedFiles: sync('workflowSubmission.selectedFiles'),
    updateSelectedFiles: sync('workflowSubmission.updateSelectedFiles'),
	 showSelectBundle: sync('workflowSubmission.showSelectBundle'),
  },

  methods:{
    expandBundle(index){
    	if (this.visible === index) {
            this.visible = -1;
        }
        else
            this.visible = index;
    },

	// return true if all primaryfiles in the bundle have been added to the selected files list
	allSelected(bundle) {
		let pfs = bundle.primaryfiles;
		let someNotSelected = pfs.some(pf => !this.selectedFiles.has(pf.id))
		console.log("bundle " + bundle.id + " all selected: " + !someNotSelected);
		return !someNotSelected;
	},

	// add all primaryfiles of the bundle to the selected files list
    addAllFiles(bundle) {
		let pfs = bundle.primaryfiles;
		pfs.forEach(pf => {
			if (!this.selectedFiles.has(pf.id)) {
				this.selectedFiles.set(pf.id, pf);
	            this.workflowSubmission.updateSelectedFiles = this.updateSelectedFiles + 1;
				console.log("Added selected primaryfile " + pf.id + " from bundle " + bundle.id);
			}
			else {
				console.log("Primaryfile " + pf.id + " already selected from bundle " + bundle.id);
			}
		})
    },

	async listBundles() {
		await this.workflowService.listBundles().then(response => {
			// console.log("response data:" + response.data._embedded.bundles);
			// this.bundles = response.data._embedded.bundles;
			this.bundles = response.data;
			console.log(`Found a total of ${this.bundles.length} bundles`);
			// this.responseHeader = "Success";
			// this.responseText = `The bundle with ID ${updatedBundle.id} has been updated`;
			// this.showResponse = true;	
		}).catch(e => {
			console.log(e);
			this.responseHeader = "Error";
			this.responseText = "Error retrieving bundles: a system error has occured, please try again later."
			this.showResponse = true;
			this.workflowSubmission.showSelectBundle = false;
		}); 
	}
  },

  mounted() {
    // let self = this;
	// if(!self.selectedFiles) self.selectedFiles = [];
	console.log("mounted: showSelectBundle: " + this.showSelectBundle);
	this.listBundles();
  }
}
</script>

<style lang="css">
@import '/amppd-ui/src/styles/style.css';

.bundles{
  width: 100%;
}

.bundle{
  display: flex;
  flex-direction: row;
  justify-content: space-between;   
}

.bundle-content{
  margin: auto 0
}

.my-modal-body{
  width: 100%;
  height: fit-content;
}
</style> 