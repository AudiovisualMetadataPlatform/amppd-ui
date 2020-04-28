<template>  
	<div class="modal-backdrop">
		<div class="modal">
			<section class="modal-body">
				<slot name="body">
					<div class="search-bar left-align-row">
						<span class="search-icon"><i class="fas fa-search"></i></span>
						<input v-model="searchWord" type="text" placeholder="Search by Name"/>
						<button type="button" style="align:right"  @click="search()">Search</button>
          </div>
          <div class="left-align-row">
            <div v-for="(file, index) in searchedFiles" v-bind:key="index">
              <input type="checkbox" :id = "file.name" :value="file" v-model="selectedFiles" @change="addFiles()"/>
              <span class="file-name">{{file.name}}</span>
            </div>
          </div>
        </slot>
      </section>
      <div>
        <slot>
          <button type="button"  @click="close()">Close</button>
        </slot>
      </div>
    </div>
  </div>
</template>


<script>
import { sync } from 'vuex-pathify'
import axios from 'axios';
export default {
    name: 'filepicker',
    data() {
      return {
        searchWord:'',
        searchedFiles:[],
        selectedFiles:[]
        };
    },
    computed:{
      files: sync('files')
    },
    methods: {
      close() {
        this.searchWord = '';
        this.$emit('close');
      },
      search() {
        let self = this;
        console.log("the search word is:", this.searchWord);
        axios.get(process.env.VUE_APP_AMP_URL + '/primaryfiles/search/findByKeyword?keyword='+this.searchWord)
        .then(response => {
          self.searchedFiles = response.data._embedded.primaryfiles;})
        .catch(e => {
          console.log(e);});
        console.log("The file names fetched are:",self.searchedFiles);
      },
      addFiles() {
        let self = this;
        self.files = this.selectedFiles;
        console.log("The file names checked are:",this.selectedFiles);
        }
      },
};
</script>

<style scoped>
	.search-bar {
    border-radius: 5px;
    border: 1px solid #ccc;
	}

	.search-icon {
    position: relative;
	}
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;     
    border-radius: 25px;
    border: 1px solid;
    padding: 20px 20px;
    width: 40%;
    
    display: inline-block
  
  }
  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

    /* Full-width inputs */
  input[type=text] {
    padding: 10px 10px;
    margin: 10px;
    border: 0px solid #ccc;
    width: 75%
  }

  button {
    background-color: #2C5B7F;
    color: #E9972D;
    font:bolder;
    padding: 10px 20px;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    border: none;
    cursor: pointer;
    border-radius: 15px;
  }
  .left-align-row {
    text-align: left;
    padding: 0px 10px;
    margin: 10px;
  }
</style>