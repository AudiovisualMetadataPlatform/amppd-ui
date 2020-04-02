<template>
<div>
    <AmpHeader/>
    <Logout/>
    <div class="ner-content">
      <div>
        <div class="header-row">
          <h1>Transcript Editor</h1>
          <div class="action-buttons">
            <input type="button" class="primary-button" v-on:click="complete" value="Complete"/>
            <input type="button" class="secondary-button" v-on:click="reset" value="Reset"/>
          </div>
        </div>
        <VariationsMainView :key="key"
          v-if="nerDataValue && sttType"
          :nerData="nerDataValue"
          :mediaUrl="mediaUrl"
          :sttJsonType="sttType"
          :fileName="fileName"
          :isEditable="true"
          :handleAutoSaveChanges="saveTemporary"
          :autoSaveContentType="'draftjs'"
          :ref="player"
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
import BBCTranscriptEditor from "@bbc/react-ner-editor";
import Modal from '@/components/shared/Modal.vue'
import { getTranscript, saveTranscript, completeTranscript } from '@/service/hmgm-service'; 

export default {
  name: 'TranscriptEditor',
  components:{
    AmpHeader,
    Logout,
    BBCTranscriptEditor,
    Modal
  },
  data(){
    return {
      nerDataValue:null, 
      fileCount: 0,
      mediaUrl: "",
      sttType: null,
      fileName:"",
      originalFileName:"",
      player:null,
      key: 1,
      modalHeader:"",
      modalBody:"",
      showModal: false,
      modalDismiss: null,
      nerType: 1
    }
  },
  computed:{

  },
  methods:{
    // Set data for editor
    setData(content, temporaryFile){
      this.nerDataValue = JSON.parse(content);
      if(temporaryFile===true){  
        this.sttType = "draftjs";
      }
      else {
        if(!this.nerType || this.nerType==1){
          this.sttType = "amazontranscribe";
        }
        else {
          this.sttType = "bbckaldi";
        }
      }
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
      var response = await getTranscript(datasetPath, false);
      if(response.complete){
        self.handleAlreadyComplete();
        return;
      }
      this.setData(response.content, response.temporaryFile);
    },
    // Complete the edits
    async complete(){
      var response = await completeTranscript(this.fileName);
      if(response===true){
        this.handleComplete();
      }
      else {
        this.handleError();
      }
    },
    // Reset to original
    async reset(){
      var response = await getTranscript(this.originalFileName, true);
      this.setData(response.content, response.temporaryFile);
      this.forceRender();
    },
    // Save temporary changes
    async saveTemporary(request){
      saveTranscript(JSON.stringify(request.data), this.fileName);
    },
    // Force re-render of the editor when we reset.  Use key to do this.
    forceRender(){
      this.key+=1;
    }
    
  },
  mounted(){
    this.nerType = this.$route.query.type;
    console.log(this.nerType);
    this.getFile(this.$route.query.datasetUrl);
    this.mediaUrl = this.$route.query.mediaUrl;
  },
  setData(data){
      this.nerDataValue = data;
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
