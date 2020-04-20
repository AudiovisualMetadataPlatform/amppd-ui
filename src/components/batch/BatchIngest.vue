<template> 
  <div class="container col-12">   
      <div class="form-content expand-h">        
      <Sidebar/>    
      <div class="col-10 bg-light-gray-1">
        <Logout/>
        <main>
          <div class="pad-all-3">
            <div class="card">
              <div class="card-body">
                <div class="form-content">
                  <h1 class="col-lg-12">Batch Ingest</h1>
                  <p class="text-muted col-lg-12">
                    Add items to Unit: <input v-model="unitName" type="text" disabled />
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
        <p>There was an error validating your batch.</p>
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
import Sidebar from '@/components/navigation/Sidebar.vue';
import Logout from '@/components/Logout.vue'
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


<style scoped>
  .col, .col-12, .col-2, .col-10, .col-lg-12, .col-lg-3, .col-lg-9 {
    width: 100%;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
  }

  .col-12 {
    padding: 0px;
    flex: 0 0 100%;
    max-width: 100%;
    
  }

  .container.expand-h, .expand-h, .row.expand-h {
    height: 100%;
    min-height: 100%;
  }

  /* .container {
    margin:0px!important;
    margin-top: -8px;
  } */

  .expand-h .col-2 {
    position: sticky;
    left: 0;
    top: 0;
    padding: 0;
  }

  .bg-dark-1 a, .bg-dark-1 a:active, .bg-dark-1 a:visited {
    color: #fff!important;
  }

  a {
    text-decoration: none;
    background-color: transparent;
  }

  a:link {
    color: #153c4d;
  }

  a:-webkit-any-link {
    color: -webkit-link;
    cursor: pointer;
  }

  .expand-h .col-10 {
    padding: 0;
    margin-left: 0;
    margin-right: 0;
  }

  .expand-h .col-10, .expand-h .col-2 {
    margin-bottom: -9999px;
    padding-bottom: 9999px;
  }

  .bg-dark-1 {
    background-color: #153c4d;
  }

  .bg-light-gray-1 {
    background-color: #fafafa;
  }

  .col-2 {
    -ms-flex: 0 0 16.666667%;
    flex: 0 0 16.666667%;
    max-width: 16.666667%;
  }

  .col-10 {
    flex: 0 0 83.333333%;
    max-width: 83.333333%;
  }

  .bg-light-gray-1 header {
    height: auto;
    min-height: 4rem;
    padding: 0.5rem;
  }

  .bg-white {
    background: #fff;
  }

  /*.bg-white {
    background-color: #fff!important;
  }*/

  header, nav, main {
    display: block;
  }

  /* @media screen and (max-width: 39em) #logo 
  {
    min-width: 100px;
    padding: 0;
  } */
  
  #logo {
    max-width: 420px;
    width: 100%;
  }

  .logo-bg {
    fill: #153c4d;
  }

  .logo-fg {
    fill: #F4871E;
}

  svg {
    overflow: hidden;
    vertical-align: middle;
  }

  .svg-inline {
    width: 20px;
    height: auto;
  }

  :not(svg) {
    transform-origin: 0px 0px;
  }

  .icon-white {
    fill: #fff;
  }

  .icon-dark-1, .svg-inline.dwn-arrow {
    fill: #153c4d;
  }

  .workflows .workflows, .collections .collections {
    background: #22617d;
  }

  svg.icon-user {
    width: 2.5rem;
  }

  .float-right {
    float: right!important;
  }

  .pad-all-3 {
    padding: 1.5rem;
  }

  .card {
    margin: 2.5rem auto;
  }

  .card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0,0,0,.125);
    border-radius: .25rem;
  }

  .card-body {
    flex: 1 1 auto;
    padding: 1.25rem;
  }
  
  .h1, h1 {
    font-size: 2.5rem;
  }

  .h1, .h2, .h3, .h4, .h5, .h6, h1, h2, h3, h4, h5, h6 {
    margin-bottom: .5rem;
    font-family: inherit;
    font-weight: 500;
    line-height: 1.2;
    color: inherit;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    margin-bottom: .5rem;
  }

  h1 {
    display: block;
    font-size: 2em;
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
  }

  nav ul {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
  }

  nav ul li {
    padding: 1rem;
  }

  ul {
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
  }

  li {
    display: list-item;
    text-align: -webkit-match-parent;
  }

  h2 {
    margin-bottom: .50rem;
    font-size: 2rem;
    font-weight: 500;
    line-height: 1.2;
    margin-top: 0;
    display: block;
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    color: #000;
  }

  
  .marg-bot-4 {
    margin-bottom: 2rem;
  }

  .marg-t-2 {
    margin-top: 1rem;
  }

  .marg-t-5 {
    margin-top: 2.5rem;
  }

  .marg-bot-3 {
    margin-bottom: 1.5rem;
  }

  main {
    margin: 2em;
  }

  .form-control-file {
    display: block;
    width: 100%;
  }

  .btn {
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    user-select: none;
    border: 1px solid transparent;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: .25rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  }

  btn:not(:disabled):not(.disabled) {
    cursor: pointer;
  }
  .btn-light {
    color: #212529;
    background-color: #f8f9fa;
    border-color: #f8f9fa;
  }
  .btn-group-lg>.btn, .btn-lg {
    padding: .5rem 1rem;
    font-size: 1.25rem;
    line-height: 1.5;
    border-radius: .3rem;
  }
  .btn-outline-primary {
    background-color: transparent;
    background-image: none;
  }

  button {
    text-transform: none;
    font-size: inherit;
    line-height: inherit;
  }

  button, input {
    overflow: visible;
    margin: 0;
    font-family: inherit;
    
  }

  button:hover {
    color: #F4871E;
    background-color: #153c4d;
  }

  input[type="file"] {
    border-radius: .3em;
    align-items: baseline;
  }

  .form-content{
    display: flex;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;

  }

  .form-row {
    display: flex;
    flex-wrap: wrap;
    margin-right: -5px;
    margin-left: -5px;
  }

  .form-row>.col, .form-row>[class*=col-] {
    padding-right: 5px;
    padding-left: 5px;
  }

  .col {
    flex-basis: 0;
    flex-grow: 1;
    max-width: 100%;
  }

  .text-muted {
    color: #6c757d!important;
  }

  label {
    display: inline-block;
    margin-bottom: .5rem;
    cursor: default;
    width: 100%;
  }

  .form-control {
    display: block;
    width: 100%;
    height: calc(2.25rem + 2px);
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  }

  .active-link {
    color: #153c4d;
  }

  .active-link:hover {
    color: #F4871E; 
  }

  input {
    text-rendering: auto;
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    text-align: start;
    cursor: text;
    font: 400 13.3333px Arial;
  }

  .form-errors {
    color: red;
    margin: 0%!important;
    font-size: 0.9rem;
  }
 
  p {
    margin-top: 0;
    margin-bottom: 1rem;
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }

  *, ::after, ::before {
    box-sizing: border-box;
  }

  body {
    background: #fff;
    height: 100%;
    min-height: 100%;
    margin-top: 0px!important;
    background-color: #fff;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #404040;
    text-align: left;
    display: block;
  }
  
</style>