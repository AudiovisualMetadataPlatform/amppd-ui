<template>
<div>
    <AmpHeader/>
    <Logout/>
    <div class="ner-content">
      <div>
        <div class="header-row">
          <h1>NER Editor</h1>
          <div class="action-buttons">
            <input type="button" class="primary-button" v-on:click="complete" value="Complete"/>
            <input type="button" class="secondary-button" v-on:click="reset" value="Reset"/>
          </div>
        </div>
        <iframe class="" :src="iframeUrl" id="timeliner" width="1500" height="600" frameborder="1"></iframe>
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
    <modal v-if="showModal" @close="modalDismiss">
    <h3 slot="header">{{modalHeader}}</h3>
    <div slot="body">
       {{modalBody}}
    </div>
  </modal>
  </div>
</template>

<script>
import AmpHeader from '@/components/shared/Header.vue'
import Logout from '@/components/shared/Logout.vue'
import Modal from '@/components/shared/Modal.vue'
import { completeNer, resetNer } from '@/service/hmgm-service'; 
// import Timeliner from '@/components/hmgm/Timeliner.js';

export default {
  name: 'NerEditor',
  components:{
    AmpHeader,
    Logout,
    Modal
    // Timeliner,
  },
  data(){
    return {
      iframeUrl:"",
      resourcePath:"",
      resource:"",
      callback:"",
      modalHeader:"",
      modalBody:"",
      showModal: false,
      modalDismiss: null,
    }
  },
  computed:{

  },
  methods:{
    // Prompt success message upon action success
    handleSuccess(action){
      let self = this;
      self.modalHeader = "Success"
      self.modalBody = "The NER edits have been successfully " + action;
      self.showModal = true;
      self.modalDismiss = function() {
        if (action === "completed") {
          console.log("Redirect to root upon successful completion");
          self.$router.push({ path: '/' });
        }
        self.showModal = false;
      }
    },
    // Prompt error message upon action failure
    handleError(action){
      let self = this;
      self.modalHeader = "Error"
      self.modalBody = "There was an error " + action + " the NER edits.";
      self.showModal = true;
      self.modalDismiss = function() {
        if (action === "completing") {
          console.log("Redirect to root upon failed completion");
          self.$router.push({ path: '/' });
        }
        self.showModal = false;
      }
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
      var url = TIMELINER_BASE_URL + "/#noHeader=true&noFooter=true&noSourceLink=false";
      url += "&resource=" + encodeURIComponent(resource) + "&callback=" + encodeURIComponent(callback);
      return url;
    }
  },
  mounted(){
    this.resourcePath = this.$route.query.resourcePath;
    this.resource = this.getFileUrl(this.resourcePath);
    this.callback = this.resource;
    this.iframeUrl = this.getIframeUrl(this.resource, this.callback);
    console.log("resourcePath = " + this.resourcePath);
    console.log("resource = " + this.resource);
    console.log("callback = " + this.callback);
    console.log("iframeUrl = " + this.iframeUrl);
  },
}
</script>

<style scoped>
h2, h3{
  margin-top: 0;
}
.ner-content{
  padding-top:100px;
  display: flex;
  flex-direction: column;
}
.header-row{
  display:flex;
  justify-content: space-between;
}
.primary-button{
    margin-top: 30px;
    float: right;
    background-color: #E9972D;
    color: #2C5B7F;
    font: bolder;
    padding: 10px 20px;
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
    margin-top: 30px;
    float: right;
    background-color: #ffffff;
    color: #2C5B7F;
    font: bolder;
    padding: 10px 20px;
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
