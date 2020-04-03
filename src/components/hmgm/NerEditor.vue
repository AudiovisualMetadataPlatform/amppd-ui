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
        <VariationsMainView :key="key"
          :hasResource="true"
          :noSourceLink="false"
          :noHeader="true"
          :noFooter="true"
          :resource="resouce"
          :callback="callback"
          :store="store"
          :persistor="persistor"
        >
        </VariationsMainView>
      </div>
    </div>
    <modal v-if="showModal" @close="modalDismiss">
    <h3  slot="header">{{modalHeader}}</h3>
    <div slot="body">
       {{modalBody}}
    </div>
  </modal>
  </div>
</template>

<script>
import AmpHeader from '@/components/Header.vue'
import Logout from '@/components/Logout.vue'
import VariationsMainView from '@/components/hmgm/Timeliner.js';
import Modal from '@/components/shared/Modal.vue'
import { getNer, saveNer, completeNer } from '@/service/hmgm-service'; 

export default {
  name: 'NerEditor',
  components:{
    AmpHeader,
    Logout,
    NerEditor,
    Modal
  },
  data(){
    return {
      resource:"",
      callback:"",
      fileCount: 0,
      fileName:"",
      originalFileName:"",
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
    // Set data for editor
    setData(content, temporaryFile){
      // reload iiif manifest
    },
    handleAlreadyComplete(){
      let self = this;
      self.modalHeader = "File Already Complete"
      self.modalBody = "This file has already been completed.";
      self.showModal = true;
      self.modalDismiss = function(){
        self.$router.push({ path: '/' });
      }
    },
    handleComplete(){
      let self = this;
      self.modalHeader = "Success"
      self.modalBody = "The ner edits have been successfully saved.";
      self.showModal = true;
      self.modalDismiss = function(){
        self.$router.push({ path: '/' });
      }
    },
    handleError(){
      let self = this;
      self.modalHeader = "Error"
      self.modalBody = "There was an error saving the ner.";
      self.showModal = true;
      self.modalDismiss = function(){
        self.$router.push({ path: '/' });
      }
    },
    // Get the ner
    async getFile(datasetPath) {
      let self = this;
      this.originalFileName = datasetPath;
      this.fileName = datasetPath + ".tmp";
      var response = await getNer(datasetPath, false);
      if(response.complete){
        self.handleAlreadyComplete();
        return;
      }
      this.setData(response.content, response.temporaryFile);
    },
    // Complete the edits
    async complete(){
      var response = await completeNer(this.fileName);
      if(response===true){
        this.handleComplete();
      }
      else {
        this.handleError();
      }
    },
    // Reset to original
    async reset(){
      var response = await getNer(this.originalFileName, true);
      this.setData(response.content, response.temporaryFile);
      this.forceRender();
    },
    // Save temporary changes
    async saveTemporary(request){
      saveNer(JSON.stringify(request.data), this.fileName);
    },
    // Force re-render of the editor when we reset.  Use key to do this.
    forceRender(){
      this.key+=1;
    }
    
  },
  mounted(){
    this.resource = this.$route.query.datasetUrl;
    this.callback = this.$route.query.datasetUrl + ".completed";
    console.log(this.resource);
    this.getFile(this.$route.query.datasetUrl);
  },
  setData(data){
      this.resource = data;
      this.callback = data + ".tmp"
      // need to reload the tmp file
  }
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
