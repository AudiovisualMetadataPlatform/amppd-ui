<template>
<div class="col-lg-5">
   <modal v-if="showSaveBundle" id="saveBundle" @close="workflowSubmission.showSaveBundle = false" class="my-modal">
      <h3 slot="header">Save file selection as a bundle</h3>
      <div slot="body" class="input-group mb-3">
	  <form>
		<div class="form-group">
          <label for="name">Bundle Name</label>
		  <label class="form-errors" v-if="inputError.length">{{inputError}}</label>
          <input type="text" id="name" class="form-control" placeholder="Enter bundle name" v-model="bundleName" v-on:focus="clearError">
		</div>
		<div class="form-group">
          <label for="description">Bundle Description</label>
          <input type="text" id="description" class="form-control" placeholder="Enter bundle description" v-model="bundleDescription">
		</div>
	  </form>
      </div>
      <div slot="footer">
         <input type="button" class="btn btn-outline-primary btn-md" v-on:click="workflowSubmission.showSaveBundle = false" value="Cancel"/>
         <input type="button" class="btn btn-primary btn-md" v-on:click="saveBundle" value="Save Selection"/>
      </div>
   </modal>

   <modal v-if="showModal" id="inform" @close="showModal = false" class="my-modal">
      <h3 slot="header">{{modalHeader}}</h3>
      <div slot="body">
        {{modalText}}
      </div>
      <div slot="footer">
        <input v-if="!isConfirm()" type="button" class="secondary-button" v-on:click="showModal = false" value="Ok"/>
        <input v-if="isConfirm()" type="button" class="secondary-button" v-on:click="showModal = false" value="No"/>
        <input v-if="isConfirm()" type="button" class="primary-button" v-on:click="updateConfirmed" value="Yes"/>
      </div>
   </modal>   
</div>
</template>

<script>
import {sync} from 'vuex-pathify';
import Modal from '@/components/shared/Modal.vue';
import WorkflowService from '../../service/workflow-service';

export default {
  name: 'SaveBundle',
  props: {
  },

  data() {
    return {
      workflowService: new WorkflowService(),
      modalHeader: "",
      modalText: "",
	  showModal: false,
	  bundleId: -1,
      bundleName: "",
	  bundleDescription: "",
	  inputError: "",
    }
  },

  components:{
     Modal
  },

  computed:{
    workflowSubmission: sync('workflowSubmission'),
	selectedFiles: sync('workflowSubmission.selectedFiles'),
	showSaveBundle: sync('workflowSubmission.showSaveBundle'),
	// isConfirm: this.modalHeader === "Confirm",
  },

  methods:{
	async saveBundle() {
		console.log(`Saving bundle with name ${this.bundleName} and description ${this.bundleDescription} ...`);	  
    	if (!this.validateBundleInputs()) return;

		// check if a bundle of the same named owned by the current user already exists 
		let bundle = this.workflowService.findBundle(this.bundleName);
		console.log("Bundle returned:" + bundle.id);				

		if (bundle && bundle.Id) { // if yes, confirm if user wants to overwrite it
			console.log("Found an existing bundle:" + bundle.id);
			this.bundleId = bundle.id;
			this.confirmUpdate();
		}
		else { // otherwise, create a new bundle		
			console.log("No existing bundle found:");
			this.createBundle();
			this.workflowSubmission.showSaveBundle = false;
		}
	},

	validateBundleInputs() {
		if (this.bundleName.length === 0) {
        	this.inputError = "(Bundle name required!)";
			return false;
	  	}
		return true;
	},

	confirmUpdate() {
		this.showModal = true;
		this.modelHeader = "Confirm"
		this.modelText = `A bundle owned by you with name "${this.bundle.name}" and description "${this.bundle.description}" already exists, do you want to overwrite it?`;
		console.log("modalHeader: " + this.modelHeader);
		console.log("modelText: " + this.modelText);
	},

	updateConfirmed() {
		this.showModal = false;
		this.updateBundle();
		this.workflowSubmission.showSaveBundle = false;
	},

	async updateBundle() {
		let primaryfileIds = this.workflowService.getSelectedPrimaryfileIds(this.selectedFiles);
		console.log("Updating bundle with selected primaryfile IDs: " + primaryfileIds)
		await this.workflowService.updateBundle(this.bundleId, this.bundleDescription, primaryfileIds)
         .then(response => {
            let updatedBundle = response.data;
			console.log("Updated bundle:" + updatedBundle.id);
			this.modalHeader = "Success";
            this.modalText = `Bundle with ID ${updatedBundle.id} has been updated`;
            this.showModal = true;
			return updatedBundle;		
         })
         .catch(e => {
			console.log(e);
			this.modalHeader = "Error";
            this.modalText = "Error creating new bundle: a system error has occured, please try again later."
			this.showModal = true;
			return null;
		 }); 
	},

	async createBundle() {
		let primaryfileIds = this.workflowService.getSelectedPrimaryfileIds(this.selectedFiles);
		console.log("Creating bundle with selected primaryfile IDs: " + primaryfileIds)
		await this.workflowService.createBundle(this.bundleName, this.bundleDescription, primaryfileIds)
         .then(response => {
            let createdBundle = response.data;
			console.log("Created bundle:" + createdBundle.id);
			this.modalHeader = "Success";
            this.modalText = `A new bundle with ID ${createdBundle.id} has been created`;
            this.showModal = true;
			return createdBundle;
         })
         .catch(e => {
			console.log(e);
			this.modalHeader = "Error";
            this.modalText = "Error creating new bundle: a system error has occured, please try again later."
			this.showModal = true;
			return null;
		 }); 
	},

	isConfirm() {
		console.log("modalHeader: " + this.modalHeader);
		return this.modalHeader === "Confirm";
	},

	clearError() {
        this.inputError = '';
	},
	
  },

  mounted() {
    let self = this;
    if(!self.selectedFiles) self.selectedFiles = [];
  }
}
</script>

<style lang="css">
@import '/amppd-ui/src/styles/style.css';

  .form-errors {
    color: red;
    margin: 0%!important;
    font-size: 0.9rem; 
    padding-left:3px; 
  }
  
</style> 