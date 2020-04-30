<template> 
  <div calss="collections">
  <div class="container col-12">   
      <div class="row expand-h">        
      <Sidebar/>    
      <div class="col-10 bg-light-gray-1">
        <Logout/>
        <main>
          <div class="pad-all-3">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <h1 class="col-lg-12">Batch Ingest</h1>
                  <p class="text-muted col-lg-12">
                    Add items to Unit: {{unitName}}
                  </p>
                  <div class="col-lg-9">
                    To add items as a batch, please use the <a href="#">AMP Batch Item template</a>. Once items have been prepared using the template, click upload below.
                  </div>
                  <div class="col-lg-3">
                  <button class="btn btn-outline-primary btn-lg marg-bot-3">Batch manifest template</button>
                  </div>
                </div>
                <div class="form-row">
                  <div class="col">
                    <input type="file" class="form-control-file btn btn-light btn-lg" id="exampleFormControlFile1" ref="inputFile" value="Upload batch manifest" :disabled="inProgress" v-bind="filename" accept=".csv" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length">
                  </div>
                  <div class="col">
                      <button class="btn btn-secondary btn-lg" @click="save()" :disabled="inProgress">Upload</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>    
    </div>  
    <modal v-if="showModal" @close="reset()">
    <h3 slot="header" v-if="validationResponse && !validationResponse.success">
      Batch Ingest Errors
    </h3>
    <h3  slot="header" v-else>Batch Submitted Successfully!</h3>
    <div slot="body">
      <div v-if="validationResponse && !validationResponse.success && validationResponse.validationErrors.length>0" class="batch-errors">
        <p>There is an error validating your batch.</p>
        <ul>
          <li v-for="(error, index) in validationResponse.validationErrors" v-bind:key="index">{{error}}</li>
        </ul>
      </div>
      <div v-else-if="validationResponse && !validationResponse.success " class="batch-errors">
        <p>There is an error processing your batch.</p>
        <ul>
          <li v-for="(error, index) in validationResponse.processingErrors" v-bind:key="index">{{error}}</li>
        </ul>
      </div>
      <div v-else-if="validationResponse && !validationResponse.success" class="batch-errors">
        <p>There is an error processing your batch.</p>
      </div> 
      <div v-else>
        Your batch has been successfully submitted and all files are ready to be submitted to a workflow.
      </div>
    </div>
  </modal>
  </div>  
  </div>
</template>  
<script>
import Sidebar from '@/components/navigation/Sidebar.vue';
import Logout from '@/components/shared/Logout.vue'
import Modal from '@/components/shared/Modal.vue'
import { upload } from '@/service/batch-ingest-service';

export default {
  name: 'Workflow',
  components:{
    Sidebar,
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


<style lang="css">
@import '/amppd-ui/src/styles/style.css';
  .form-errors {
    color: red;
    margin: 0%!important;
    font-size: 0.9rem; 
    padding-left:3px; 
  }

</style>