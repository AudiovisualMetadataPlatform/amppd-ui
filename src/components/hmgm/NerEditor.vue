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
        <iframe class="" :src="iframeUrl" width="1500" height="600" frameborder="1"></iframe>
        <!-- 
        <iframe class="" src="http://localhost:5000/" width="1500" height="600" frameborder="1"></iframe>
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
import AmpHeader from '@/components/Header.vue'
import Logout from '@/components/Logout.vue'
// import Timeliner from '@/components/hmgm/Timeliner.js';
import Modal from '@/components/shared/Modal.vue'
import { completeNer, resetNer } from '@/service/hmgm-service'; 

export default {
  name: 'NerEditor',
  components:{
    AmpHeader,
    Logout,
    // Timeliner,
    Modal
  },
  data(){
    return {
      iframeUrl:"",
      resourcePath:"",
      resource:"",
      callback:"",
      key: 1,
      modalHeader:"",
      modalBody:"",
      showModal: false,
      modalDismiss: null,
    }
  },
  computed:{

  },
  methods:{
    handleSuccess(action){
      let self = this;
      self.modalHeader = "Success"
      self.modalBody = "The NER edits have been successfully " + action;
      self.showModal = true;
      self.modalDismiss = function(){
        self.$router.push({ path: '/' });
      }
    },
    handleError(action){
      let self = this;
      self.modalHeader = "Error"
      self.modalBody = "There was an error " + action + " the NER edits.";
      self.showModal = true;
      self.modalDismiss = function(){
        self.$router.push({ path: '/' });
      }
    },
    // Complete the edits
    async complete(){
      var response = await completeNer(this.resourcePath);
      if(response===true){
        this.handleComplete("completed");
      }
      else {
        this.handleError("completing");
      }
    },
    // Reset to original
    async reset(){
      var response = await resetNer(this.resourcePath);
      if(response===true){
        this.handleSuccess("reset");
      }
      else {
        this.handleError("resetting");
      }      
      this.forceRender();
    },
    forceRender(){
      this.key+=1;
    },
    getFileUrl(resourcePath) {
      const BASE_URL = process.env.VUE_APP_AMP_URL;
      const url = `${BASE_URL}/hmgm/ner-editor?resourcePath=${resourcePath}`;
      return url; 
    },
    getIframeUrl(resource, callback) {
      // const TIMELINER_BASE_URL = "http://localhost:5000/"; 
      const TIMELINER_BASE_URL = "timeliner.html";
      var url = TIMELINER_BASE_URL + "?noHeader=true&noFooter=true&noSourceLink=false";
      url += "&resource=" + encodeURIComponent(resource) + "&callback=" + encodeURIComponent(callback);
      // console.log("url = " + url);
      // url = encodeURIComponent(url);
      return url;
    }
  },
  mounted(){
    this.resourcePath = this.$route.query.resourcePath;
    this.resource = this.getFileUrl(this.resourcePath);
    // this.resource = "https://dlib.indiana.edu/iiif_av/jwd/chopin.json";
    this.callback = this.resource;
    this.iframeUrl = this.getIframeUrl(this.resource, this.callback);
    // this.iframeUrl = "http://localhost:5000/"; 
    // this.iframeUrl = "http://localhost:5000/?noHeader=true&noFooter=true&noSourceLink=false&resource=https://dlib.indiana.edu/iiif_av/jwd/chopin.json&callback=https://dlib.indiana.edu/iiif_av/jwd/chopin.json"
    console.log("resourcePath = " + this.resourcePath);
    console.log("resource = " + this.resource);
    console.log("callback = " + this.callback);
    console.log("iframeUrl = " + this.iframeUrl);
  },
  // setData(data){
  //     // TODO how to trigger reload of the tmp file after each save?
  //     this.resource = data;
  //     this.callback = data;
  //     this.iframeUrl = data;
  // }
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
