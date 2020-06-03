<template>
  
<div class="modal modal-open fade bd-example-modal-lg show" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" style="padding-right: 17px; display: block;">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
              <div class="modal-content">
                <div class="modal-header my-modal-header">
                  <input class="input-text" v-model="searchWord" type="text" placeholder="Search by Name" v-on:keyup.enter="search()"/>
                  <button type="button" class="search-button btn btn-outline-warning" style="align:right"  @click="search()" v-on:keyup.enter="search()">
                    <svg class="svg-search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
							      <title>search</title>
							      <path d="M47.3 43.4c0 0.9-0.3 1.7-1 2.4 -0.7 0.7-1.5 1-2.4 1 -0.9 0-1.7-0.3-2.4-1l-9-9c-3.1 2.2-6.6 3.3-10.5 3.3 -2.5 0-4.9-0.5-7.2-1.5 -2.3-1-4.2-2.3-5.9-3.9s-3-3.6-3.9-5.9c-1-2.3-1.5-4.7-1.5-7.2 0-2.5 0.5-4.9 1.5-7.2 1-2.3 2.3-4.2 3.9-5.9s3.6-3 5.9-3.9c2.3-1 4.7-1.5 7.2-1.5 2.5 0 4.9 0.5 7.2 1.5 2.3 1 4.2 2.3 5.9 3.9s3 3.6 3.9 5.9c1 2.3 1.5 4.7 1.5 7.2 0 3.8-1.1 7.3-3.3 10.5l9 9C47 41.7 47.3 42.5 47.3 43.4zM30.4 29.9c2.3-2.3 3.4-5.1 3.4-8.3 0-3.2-1.1-6-3.4-8.3 -2.3-2.3-5.1-3.4-8.3-3.4 -3.2 0-6 1.1-8.3 3.4 -2.3 2.3-3.4 5.1-3.4 8.3 0 3.2 1.1 6 3.4 8.3 2.3 2.3 5.1 3.4 8.3 3.4C25.4 33.4 28.1 32.2 30.4 29.9z"></path>
							      </svg>
                  </button>
                  <!--  <br> <small class="text-muted">ID 5 | filename.ext</small> -->
                  <!-- <button type="button" class="close" data-dismiss="modal" aria-label="Close" >
                    <span aria-hidden="true">×</span>
                  </button>  -->
                </div>
                <div class="modal-body my-modal-body">
                  <div v-for="(file, index) in searchedFiles" v-bind:key="index">
                    <input type="checkbox" :id = "file.name" :value="file" v-model="selectedFiles" @change="addFiles()"/>
                    <span class="file-name">{{file.name}}</span>
                  </div>

                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-outline-warning" v-on:click="close">Cancel</button>
                </div>
              </div>
            </div>
          </div>
</template>

<script>
import { sync } from 'vuex-pathify'
import WorkflowService from '../../service/workflow-service';
export default {
    name: 'filepicker',
    data() {
      return {
        searchWord:'',
        searchedFiles:[],
        selectedFiles:[],
        workflowService: new WorkflowService()
        };
    },
    computed:{
      files: sync('files'),
      isWorkflowModalVisible: sync('isWorkflowModalVisible')
    },
    methods: {
      close() {
        this.searchWord = '';
        this.isWorkflowModalVisible=false;
        this.$emit('close');
      },
      search() {
        let self = this;
        console.log("the search word is:", this.searchWord);
        self.searchedFiles = self.workflowService.searchFiles(this.searchWord).then(response => {
          self.searchedFiles = response.data._embedded.primaryfiles;
        })
        .catch(e => {
          console.log(e);});
      },
      addFiles() {
        let self = this;
        self.files = this.selectedFiles;
        console.log("The file names checked are:",this.selectedFiles);
        }
      },
};
</script>


<style lang="css">
@import '/amppd-ui/src/styles/style.css';

.my-modal-body{
  height: 200px;
}

.my-modal-header{
  padding: 0.3rem 0.1rem;
}
.input-text{
  height: calc(2.25rem + 1px);
	padding: 0.7rem 0.5rem;
  width: 90%;
}

.search-button{
  width:10%;
  height: calc(2.25rem + 1px);
}


</style>