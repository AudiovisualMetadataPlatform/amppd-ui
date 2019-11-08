<template>
  <div>
    <div class="file-selection">
      <div class="sub-header-container">
        <span class="section-title">Primary files to include in batch WF submission</span>
        <i id="addFile" class="fa fa-plus" v-on:click="showModal"></i>
        <Modal v-show="isModalVisible" @close="closeModal" @addItems="addFiles"/>
      </div>
      <div class="file-container">
        <div v-for="(file, index) in files" v-bind:key="index" class="file" href="javascript:void(0)">
          <span class="file-name">{{file.name}}</span>
          <i class="remove-file fa fa-minus-circle" v-on:click="deleteFile(file.id)"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from './Modal';
import { sync } from 'vuex-pathify';
export default {
  name: 'FileSelection',
  components: {
    Modal
  },
  props: {
  },
  data(){
    return {
      isModalVisible: false,
      fileIndex: 1
    }
  },
  computed: {
      files: sync('files')
  },
  methods:{
    showModal() {
        this.isModalVisible = true;
      },
    closeModal() {
        this.isModalVisible = false;
        console.log("the files added are:",self.files);
      },
    deleteFile(id){
      let self = this;
      console.log("deleting file " + id);
      for( var i = 0; i < self.files.length; i++){ 
        if (self.files[i].id === id) {
          console.log("deleting");
          self.files.splice(i, 1); 
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .file-selection{
    min-height:200px;
    padding:0 30px;
  }
  .sub-header-container{
    padding-bottom:20px;
    display:flex;
    flex-basis: row;
  }
  .section-title{
    margin-right: 20px;
    font-size: 14px;
  }
  #addFile{
    font-weight: 700;
  }
  i:hover{
    background-color:#133C4E;
    color:white;
  }
  i{
    
    padding:2px;
    font-size:12px;
  }
  .file-name{
    width:250px;
  }
  .file{
    color: #000000;
    text-align: left;
    font-size:13px;
    padding: 5px 5px 5px 5px;
    background-color:#eff0f1;
    width:300px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #000000;

  }
</style>
