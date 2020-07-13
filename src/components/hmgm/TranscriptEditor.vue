<template>
<div>
    <AmpHeader/>
    <Logout/>
    <div class="transcript-content">
      <div>
        <div class="header-row">
          <h1>Transcript Editor</h1>
        </div>
        <BBCTranscriptEditor :key="key"
          v-if="transcriptDataValue && sttType"
          :transcriptData="transcriptDataValue"
          :mediaUrl="mediaUrl"
          :sttJsonType="sttType"
          :fileName="fileName"
          :isEditable="true"
          :handleAutoSaveChanges="saveTemporary"
          :autoSaveContentType="'draftjs'"
          :ref="player"
        >
        </BBCTranscriptEditor>
        
        <div class="action-buttons">
          <input type="button" class="primary-button" v-on:click="showCompleteModal = true" value="Complete"/>
          <input type="button" class="secondary-button" v-on:click="showResetModal = true" value="Reset"/>
          <input type="button" class="secondary-button" v-on:click="showSaveModal = true" value="Save and Close"/>
        </div>
      </div>
    </div>
  <modal v-if="showModal" @close="modalDismiss" class="my-modal">
    <h5  slot="header">{{modalHeader}}</h5>
    <div slot="body">
       {{modalBody}}
    </div>
  </modal>
  <modal v-if="showSaveModal" @close="saveModalCancel" class="my-modal">
    <h5  slot="header">Save and close?</h5>
    <div slot="body">
       Are you sure you want to save the transcript and exit this page?
    </div>
    <div slot="footer">
          <input type="button" class="secondary-button" v-on:click="saveModalCancel" value="Cancel"/>
          <input type="button" class="primary-button" v-on:click="saveModal" value="Yes"/>
    </div>
  </modal>
  <modal v-if="showResetModal" @close="resetModalCancel" class="my-modal">
    <h5  slot="header">Reset the transcript?</h5>
    <div slot="body">
       Are you sure you want to reset the transcript to the original text?
    </div>
    <div slot="footer">
          <input type="button" class="secondary-button" v-on:click="resetModalCancel" value="Cancel"/>
          <input type="button" class="primary-button" v-on:click="resetModalYes" value="Yes"/>
    </div>
  </modal>
  <modal v-if="showCompleteModal" @close="completeModalCancel" class="my-modal">
    <h5  slot="header">Complete?</h5>
    <div slot="body">
       Are you sure you want to complete the transcript and exit the page?
    </div>
    <div slot="footer">
          <input type="button" class="secondary-button" v-on:click="completeModalCancel" value="Cancel"/>
          <input type="button" class="primary-button" v-on:click="completeModalYes" value="Yes"/>
    </div>
  </modal>
  </div>
</template>

<script>
import AmpHeader from '@/components/shared/Header.vue'
import Logout from '@/components/shared/Logout.vue'
import BBCTranscriptEditor from "@bbc/react-transcript-editor";
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
      transcriptDataValue:null, 
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
      showSaveModal: false,
      showResetModal: false,
      showCompleteModal: false,
      modalDismiss: null,
      transcriptType: 1
    }
  },
  computed:{

  },
  methods:{
    // Set data for editor
    setData(content, temporaryFile){
      if(temporaryFile===true || !this.transcriptType){  
        this.sttType = "draftjs";
        this.transcriptDataValue = JSON.parse(content);
      }
      else {
        if(this.transcriptType==1){
          this.sttType = "amazontranscribe";
          this.transcriptDataValue = JSON.parse(content);
        }
        else {
          this.sttType = "bbckaldi";
          var tempData = JSON.parse(content);
          for(var w = 0; w < tempData.words.length; w++){
            var thisWord = tempData.words[w];
            tempData.words[w].punct = thisWord.word;
            tempData.words[w].start = thisWord.time;
            tempData.words[w].end = thisWord.time + thisWord.duration;
            if(w==tempData.words.length-1){
              tempData.words[w].punct = thisWord.punct + ".";
            }
          }
          this.transcriptDataValue = tempData;
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
      self.modalBody = "The transcript edits have been successfully saved.";
      self.showModal = true;
      self.modalDismiss = function(){
        self.$router.push({ path: '/' });
      }
    },
    handleError(){
      let self = this;
      self.modalHeader = "Error"
      self.modalBody = "There was an error saving the transcript.";
      self.showModal = true;
      self.modalDismiss = function(){
        self.$router.push({ path: '/' });
      }
    },
    handleGetTranscriptError(){
      let self = this;
      self.modalHeader = "Error"
      self.modalBody = "There was an error getting the transcript.";
      self.showModal = true;
      self.modalDismiss = function(){
        self.$router.push({ path: '/' });
      }
    },
    // Get the transcript
    async getFile(datasetPath) {
      let self = this;
      this.originalFileName = datasetPath;
      this.fileName = datasetPath + ".tmp";
      var response = await getTranscript(datasetPath, false);
      if(response.complete){
        self.handleAlreadyComplete();
        return;
      }
      if(!response.success){
        self.handleGetTranscriptError();
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
    async saveModal(){
      this.showSaveModal = false;
      this.$router.push({ path: '/' });
    },
    async saveModalCancel(){
      this.showSaveModal = false;
    },
    async resetModalYes(){
      this.reset();
      this.showResetModal = false;
    },
    async resetModalCancel(){
      this.showResetModal = false;
    },
    async completeModalYes(){
      this.complete();
      this.showCompleteModal = false;
    },
    async completeModalCancel(){
      this.showCompleteModal = false;
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
    this.transcriptType = this.$route.query.type;
    console.log(this.transcriptType);
    this.getFile(this.$route.query.datasetUrl);
    this.mediaUrl = this.$route.query.mediaUrl;
  },
  setData(data){
      this.transcriptDataValue = data;
  }
}
</script>

<style scoped>
.my-modal {
  backdrop-filter: brightness(60%);
}
h2, h3{
  margin-top: 0;
}
.transcript-content{
  padding-top:50px;
  display: flex;
  flex-direction: column;
}
.header-row{
  display:flex;
  justify-content: space-between;
}
.action-buttons{
  margin-top:40px;
  display:flex;
  justify-content: flex-end;
}
.primary-button{
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
    width:150px;
}
.secondary-button{
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
    width:150px;
}
.modal-body .my-modal-body {
  height:auto !important;
  overflow:auto;
}
</style>
