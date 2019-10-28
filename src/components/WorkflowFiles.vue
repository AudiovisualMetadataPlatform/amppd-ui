<template>
  <div>
    <div class="file-selection">
      <span class="sub-header">Primary files to include in batch WF Submission</span>
      <i id="addFile" class="fa fa-plus" v-on:click="addFiles"></i>
      <div v-for="(value, index) in object">
      {{ index }} {{ value }}
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FileSelection',
  props: {
  },
  data(){
    return {
      files: []
    }
  },
  methods:{
    addFiles(){
      console.log("Adding file...")
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .file-selection{
    min-height:200px;
    background-color:white;
  }
  .sub-header{
    margin-right: 10px;
  }
  #addFile{
    font-weight: 700;
  }
  #addFile:hover{
    background-color:#133C4E;
    color:white;
  }
</style>
