<template>
<div>
    <AmpHeader/>
    <Logout/>
    <div class="ner-content">
      <div>
        <div class="header-row">
          <h2>NER Editor</h2>
          <div class="action-buttons">
            <input type="button" class="primary-button" v-on:click="onComplete" value="Complete"/>
            <input type="button" class="secondary-button" v-on:click="onReset" value="Reset"/>
          </div>
        </div>
        <iframe v-if="!requireAuth" class="" :src="iframeUrl" id="timeliner" width="1500" height="800" style="border:none;"></iframe>
        <!-- TODO 
          Below code is for importing Timeliner as a React component and it didn't work, 
          possibly need extra code in Timeliner to export Timeliner root component along with its properties.
        <Timeliner :key="key"
          :resource="resource"
          :callback="callback"
          :hasResource="true"
          :noSourceLink="false"
          :noHeader="true"
          :noFooter="true"
          :store="store"
          :persistor="persistor"
        >
        </Timeliner> 
        -->
      </div>
    </div>
    <modal v-if="showResponse" @close="modalDismiss">
      <h3 slot="header">{{responseHeader}}</h3>
      <div slot="body">
        {{responseBody}}
      </div>
    </modal>
    <modal v-if="showConfirm" @close="showConfirm = false">
      <h3 slot="header">{{confirmHeader}}</h3>
      <div slot="body">
        {{confirmBody}}
      </div>
      <div slot="footer" class="action-buttons">
        <input type="button" class="secondary-button" v-on:click="showConfirm = false" value="Cancel"/>
        <input type="button" class="primary-button" v-on:click="onConfirm" value="Continue"/>
      </div>
    </modal>
  <token-validator v-if="showTokenModal" @validAuth="authValidated" :datasetUrl="resourcePath" :authString="authString"/>
  </div>
</template>

<script>
import AmpHeader from '@/components/shared/Header.vue'
import Logout from '@/components/shared/Logout.vue'
import Modal from '@/components/shared/Modal.vue'
import { completeNer, resetNer } from '@/service/hmgm-service'; 
import TokenValidator from '@/components/hmgm/TokenValidator'
// import Timeliner from '@/components/hmgm/Timeliner.js';

export default {
  name: 'NerEditor',
  components:{
    AmpHeader,
    Logout,
    Modal,
    TokenValidator
    // Timeliner,
  },
  data(){
    return {
      requireAuth: true,
      authString:  null,
      iframeUrl:"",
      resourcePath:"",
      resource:"",
      callback:"",
      responseHeader:"",
      responseBody:"",
      modalDismiss: null,
      showResponse: false,
      confirmHeader:"",
      confirmBody:"",
      confirmAction: "",
      showConfirm: false,
    }
  },
  computed:{
    showTokenModal(){
      if(!this.resourcePath || !this.resourcePath.length > 0) return false;
      if(!this.authString) return false;
      return this.requireAuth;
    }
  },
  methods:{
    // This method is required by the token validator to load data on success callback
    authValidated(){
      this.requireAuth = false;
      this.iframeUrl = this.getIframeUrl(this.resource, this.callback);
      console.log("iframeUrl = " + this.iframeUrl);
    },
    // Prompt success message upon action success
    handleSuccess(action){
      let self = this;
      self.responseHeader = "Success"
      self.responseBody = "The NER edits have been successfully " + action;
      self.showResponse = true;
      self.modalDismiss = function() {
        if (action === "completed") {
          console.log("Redirect to root upon successful completion");
          self.$router.push({ path: '/' });
        }
        self.showResponse = false;
      }
    },
    // Prompt error message upon action failure
    handleError(action){
      let self = this;
      self.responseHeader = "Error"
      self.responseBody = "There was an error " + action + " the NER edits.";
      self.showResponse = true;
      self.modalDismiss = function() {
        if (action === "completing") {
          console.log("Redirect to root upon failed completion");
          self.$router.push({ path: '/' });
        }
        self.showResponse = false;
      }
    },
    async onConfirm() {
      if (this.confirmAction === "Complete") {
        this.complete();
      }
      else if (this.confirmAction === "Reset") {
        this.reset();
      }
      this.showConfirm = false;
    },
    async onComplete() {
      // Prompt confirmation if content has been edited since last save
      if (!this.isContentSaved()) {
        this.confirmHeader = "Warning"
        this.confirmBody = "There are unsaved changes. Do you want to continue without saving?"
        this.confirmAction = "Complete";
        this.showConfirm = true;
        console.log("showConfirm: " + this.showConfirm + ", confirmAction: " + this.confirmAction);
      }
      else {
        this.complete();
      }
    },
    async onReset() {
      // always prompt a warning so users don't accidentally lose their edits
      this.confirmHeader = "Warning"
      this.confirmBody = "All previously saved changes will be removed and the content will be reset to the original file. Are you sure you want to contine?";
      this.confirmAction = "Reset";
      this.showConfirm = true;
      console.log("showConfirm: " + this.showConfirm + ", confirmAction: " + this.confirmAction);
    },
    // Complete the edits
    async complete(){
      var response = await completeNer(this.resourcePath);
      if (response === true) {
        this.handleSuccess("completed");
      }
      else {
        this.handleError("completing");
      }
    },
    // Reset to original
    async reset(){
      var response = await resetNer(this.resourcePath);
      if (response === true) {
        this.handleSuccess("reset");
        // reload Timeliner iframe
        this.forceReload();
      }
      else {
        this.handleError("resetting");
      }      
    },
    forceReload(){
      document.getElementById('timeliner').contentDocument.location.reload(true);
      // below code also works as an alternative way to reload the iframe, but using reload as above is preferred
      // document.getElementById('timeliner').src += ''; 
      console.log("Reload Timeliner, iframe src = " + document.getElementById('timeliner').src);
    },
    getFileUrl(resourcePath) {
      const BASE_URL = process.env.VUE_APP_AMP_URL;
      const url = `${BASE_URL}/hmgm/ner-editor?resourcePath=${resourcePath}`;
      return url; 
    },
    getIframeUrl(resource, callback) {
      // const TIMELINER_BASE_URL = "http://localhost:5000/"; 
      const TIMELINER_BASE_URL = "timeliner.html";
      var url = TIMELINER_BASE_URL + "#noHeader=true&noFooter=true&noSourceLink=false";
      url += "&resource=" + encodeURIComponent(resource) + "&callback=" + encodeURIComponent(callback);
      return url;
    },
    isContentSaved() {
      let ifrm = document.getElementById("timeliner");
      console.log("iFrame:" + ifrm);
      let idoc = ifrm.contentDocument? ifrm.contentDocument: ifrm.contentWindow.document;
      console.log("iFrame document:" + idoc);
      let button = idoc.getElementById("saveProject");
      console.log("saveProject button:" + button)
      return button && button.disabled;
    },
  },
  mounted(){
    this.resourcePath = this.$route.query.resourcePath;
    this.resource = this.getFileUrl(this.resourcePath);
    this.callback = this.resource;
    this.authString = this.$route.query.auth;
    console.log("resourcePath = " + this.resourcePath);
    console.log("resource = " + this.resource);
    console.log("callback = " + this.callback);
  },
}
</script>

<style scoped>
h2, h3{
  margin-left: 10px;
  margin-top: 2px;
  max-height: 50px;
}
.ner-content{
  padding-top:0px;
  display: flex;
  flex-direction: column;
}
.header-row{
  display:flex;
  justify-content: space-between;
  max-height: 50px;
}
.action-buttons{
  display: flex;
}
.action-buttons{
  display: flex;
}
.primary-button{
    float: right;
    background-color: #E9972D;
    color: #2C5B7F;
    font: bolder;
    padding: 5px 20px;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    border: none;
    cursor: pointer;
    border-radius: 15px;
    font-size: 12px;
}
.secondary-button{
    float: right;
    background-color: #ffffff;
    color: #2C5B7F;
    font: bolder;
    padding: 5px 20px;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #E9972D;
    cursor: pointer;
    border-radius: 15px;
    font-size: 12px;
}
</style>
