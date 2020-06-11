<template>
     <div id="myTable_filter" class="dataTables_filter">
      <label>Search:
          </label>
          <vue-bootstrap-typeahead :data="getItems" v-model="searchValue" @hit="addSearchTerm($event)" :minMatchingChars="1"
                        id="search-input" type="text" class="bootstrap-typeahead" placeholder="" aria-controls="myTable"/>
      </div>                 
</template>

<script>
import { sync } from 'vuex-pathify'
import WorkflowService from '../../../service/workflow-service';
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead';
import _ from 'underscore';

export default {
  name: 'Workflow',
  components:{
    VueBootstrapTypeahead
  },
  data(){
    return {
        workflowService: new WorkflowService(),
        visible : false,
        searchValue: '',
        submitterList:[],
        filterSuccess:false,
        searchTerms : []
    }
  },
  computed:{
    workflowDashboard: sync("workflowDashboard"),
    getItems(){
        var items=[];
        var i=0;
        for(i=0;i<this.workflowDashboard.rows.length;i++){
            items.push(this.workflowDashboard.rows[i].sourceItem);
            items.push(this.workflowDashboard.rows[i].sourceFilename);
        }
        items = items.filter((item, i, ar) => ar.indexOf(item) === i);
        console.log("unique submitters"+items);
        return items;
    },
  },
  props: {
  },
  methods:{
    
    addSearchTerm($event){
        //console.log("selected submitters is:"+this.searchValue+"  "+$event);
        if(this.searchTerms.length >0 ){
            if(this.searchTerms.indexOf(this.searchValue) == -1)
                this.searchTerms.push(this.searchValue);
        }
        else
            this.searchTerms.push(this.searchValue);
        this.workflowDashboard.searchQuery.filterBySearchTerm = this.searchTerms;
        console.log("selected submitters are:"+this.workflowDashboard.searchQuery.filterBySearchTerm);
    }
  },
  
  watch: {
    searchValue: function(searchValue) { this.getItems },
  },
  created(){
    this.searchValue='';
  },
  mounted(){
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #search-input{
        display:inline;
    }
  .spacer{
    height: 24px;
  }
  .submitter{
    margin:0.2rem;
  }
  .bootstrap-typeahead{
    border:none !important;
  }
  #myTable_filter{
      display:flex;
      margin-bottom:10pxx;
  }
  #myTable_filter label{
      margin: auto;
  }
</style>
