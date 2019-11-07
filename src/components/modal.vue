<template>  
  <div class="modal-backdrop">
    <div class="modal">
      <!-- <header class="modal-header">
        <slot name="header">
          <h3>Search Files</h3>
        </slot>
      </header> -->
      <section class="modal-body">
        <slot name="body">
          <div class="row"><input placeholder="Search here"/></div>
          <div class="row"><button type="button"  @click="searchItems">Search</button></div></slot>
          <!-- <autocomplete :items="[ 'File12.pdf', 'File123.mp4', '2018Yearbook.mp4', 'File123.mp3', '1994Yearbook.mp4', '1994Yearbook_supp.txt', '2018Yearbook_supp.pdf', 'File123_supp.txt', 'File12_supp.txt']" 
            @updateItemList="updateItemList"/> -->
          
        
       </section>
       <footer class="modal-footer">
          <slot name="footer">
            <button type="button"  @click="addItems">Add</button>
            <button type="button"  @click="close">Close</button>
          </slot>
        </footer>
    </div>
  </div>
</template>


<script>
//import autocomplete from "./Autocomplete.vue"
export default {
    name: 'filepicker',
    /* components: {
      autocomplete
    }, */
    data() {
      return {
        selectedItems:""
      };
    },
    methods: {
      close() {
        this.$emit('close');
      },
      searchItems() {

      },
      updateItemList(str1) {
      if(str1!='')
        {
          this.selectedItems=str1;
          console.log("selected items:",str1);
        }
      },
      addItems() {
        this.$emit("addItems", this.selectedItems);
      }
	},
	
  };

</script>

<style>
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
    /* display: flex; */
    /* flex-direction: column; */
    /* padding-right: 10px;
    padding-top: 10px; */
     
    border-radius: 25px;
    border: 1px solid;
    padding: 20px 20px;
    width: 40%;
    
    display: inline-block
  

  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  /* .btn-close {
    border: none;
    font-size: 20px;
    padding: 20px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  } */

  /* .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  } */

  /* .autocomplete {
    position: relative;
    width: 130px;
  }

  .autocomplete-results {
    padding: 0;
    margin: 0;
    border: 1px solid #eeeeee;
    height: 120px;
    overflow: auto;
  }

  .autocomplete-result {
    list-style: none;
    text-align: left;
    padding: 4px 2px;
    cursor: pointer;
  }

  .autocomplete-result:hover {
    background-color: #4AAE9B;
    color: white;
  } */

  button {
    background-color: #2C5B7F;
    color: #E9972D;
    font:bolder;
    padding: 10px 10px;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    border: none;
    cursor: pointer;
    border-radius: 15px;
  }

    .row {
    text-align: center;
    /* padding:5px 10px; */
  }

</style>