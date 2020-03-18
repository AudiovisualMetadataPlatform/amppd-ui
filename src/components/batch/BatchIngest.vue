<template>
<div>
    <AmpHeader/>
    <Logout/>
    <div class="batch-content" v-if="!batchSubmitted">
      <div class="batch-body">
      <h1>Batch Ingest Items</h1>
        <p v-if="errors.length>0" class="errors">
            <b>Please correct the following error(s):</b>
            <ul>
              <li v-for="error in errors" v-bind:key="error"><span>{{ error }}</span></li>
            </ul>
        </p>
        <div class="unit-name">
          <label style="display:block;">Unit Name</label>
          <input v-model="unitName" type="text" disabled />
        </div>
        <div class="file-select">
          <label style="display:block;">Upload Batch Manifest</label>
          <input type="text" v-model="displayFileName" disabled/>
          <label for="inputFile" class="primary-button">Browse</label>
          <input id="inputFile" ref="inputFile" name="inputFile" class="inputfile" type="file" 
          :disabled="inProgress"
          v-bind="filename" accept=".csv" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length" />
        </div>
        <div class="batch-submit">
            <input type="button" value="Submit" class="primary-button" @click="save" :disabled="inProgress">
        </div>
      </div>
    </div>
    <modal v-if="showModal" @close="reset()">
    <h3 slot="header" v-if="validationResponse && !validationResponse.success">
      Batch Ingest Errors
    </h3>
    <h3  slot="header" v-else>Batch Submitted Successfully!</h3>
    <div slot="body">
      <div v-if="validationResponse && !validationResponse.success && validationResponse.validationErrors.length>0" class="batch-errors">
        <p>There was an error validation your batch.</p>
        <ul>
          <li v-for="(error, index) in validationResponse.validationErrors" v-bind:key="index">{{error}}</li>
        </ul>
      </div>
      <div v-else-if="validationResponse && !validationResponse.success " class="batch-errors">
        <p>There was an error processing your batch.</p>
        <ul>
          <li v-for="(error, index) in validationResponse.processingErrors" v-bind:key="index">{{error}}</li>
        </ul>
      </div>
      <!-- <div v-else-if="validationResponse && !validationResponse.success" class="batch-errors">
        <p>There was an error processing your batch.</p>
      </div> -->
      <div v-else>
        Your batch has been successfully submitted and all files are ready to be submitted to a workflow.
      </div>


    </div>
  </modal>
  </div>
</template>

<script>
import AmpHeader from '@/components/Header.vue'
import Logout from '@/components/Logout.vue'
import Modal from '@/components/shared/Modal.vue'
import { upload } from '@/service/batch-ingest-service';

export default {
  name: 'Workflow',
  components:{
    AmpHeader,
    Logout,
    Modal
  },
  data(){
    return {
      filename: "",
      batchSubmitted: false,
      uploadError:null,
      fileCount: 0,
      formData: new FormData(),
      displayFileName: "",
      displayFileNameEnabled: false,
      unitName:"AMP Pilot Unit",
      showModal: false,
      validationResponse: null,
      inProgress:false,
      errors: []
    }
  },
  computed:{
  },
  props: {
  },
  methods:{
    reset(){
      //this.filename="";
      this.displayFileName="";
      this.displayFileNameEnabled=false;
      this.validationResponse = null;
      this.showModal = false;
      this.formData = new FormData();
      this.errors = [];
      this.$refs.inputFile.value = '';
    },
    save() {
        this.errors = [];
        if (!this.formData.has('file')) {
          this.errors.push("Please select a valid file");
        }
        if(!this.unitName || this.unitName.length==0){
          this.errors.push("Enter a valid unit name");
        }

        if(this.errors.length>0) return;
        self.inProgress = true;
        upload(this.formData)
          .then(x => {
            this.validationResponse = x;
            this.showModal = true;
          })
          .catch(err => {
            this.uploadError = err.response;
            console.log(this.uploadError);
          }).finally(()=>{
            this.inProgress = false;
          });
    },
    async filesChange(fieldName, fileList) {
      // handle file changes
      this.formData = new FormData();

      // This is another possible solution.  Read file on client side and submit as string
      // const reader = new FileReader();
      // reader.onload = e => console.log(e.target.result);
      // reader.readAsText(fileList[0]);

      // append the files to FormData
      for(var x=0; x<fileList.length; x++){
        this.displayFileNameEnabled = true;
        this.displayFileName=fileList[x].name;
        this.displayFileNameEnabled = false;
        this.formData.append('file', fileList[x], fileList[x].name);
      }
      this.formData.append('unitName', this.unitName)
    }

  },
  mounted(){
    console.log("reached batchingest.vue");
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2, h3{
  margin-top: 0;
}
.errors{
  color:red;
}
.batch-errors{
  overflow-y: scroll;
}
.batch-content{
  padding-top:100px;
  display: flex;
  flex-direction: column;
}
.batch-body{
  display: flex;
  flex-direction: column;
  width: 700px;
  align-self: center
}
.batch-submit{
  display:flex;
  justify-content: flex-start;
  margin: 40px 0 0;
}
.unit-name{
  flex-direction: column;
  justify-content: center;
}
.unit-name input{
  width: 100% !important;
}
.file-select{
  flex-direction: column;
  justify-content: space-evenly;
}
.file-select input:first-child{
  width:60%;
}
.file-select input:last-child{
  width:35%;
}
.inputfile{
    display:none;
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
input[type="text"]{
  background-color: white;
  border: 1px solid lightgray;
}
input[type="button"]:disabled {
  background: #c5c5c5;
}
</style>
