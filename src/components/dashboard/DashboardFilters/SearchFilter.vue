<template>
          
     <div id="myTable_filter" class="dataTables_filter">
      <label>Search:
          </label>
          <typeahead :source="getItems" filter-key="searchValue" :start-at="1" @selection="addSearchTerm"
            filter-type="contains"
            id="colFormLabelSearch" class="form-control bootstrap-typeahead" placeholder=""/>
      </div>                 
</template>

<script>
import { sync } from 'vuex-pathify'
import _ from 'underscore';
import Typeahead from '../../shared/TypeAhead.vue';

export default {
  name: 'Workflow',
  components:{
    Typeahead
  },
  data(){
    return {
        visible : false,
        searchValue: '',
        filterSuccess:false,
        searchTerms:[]
    }
  },
  computed:{
    workflowDashboard: sync("workflowDashboard"),
    searchTermList: sync("workflowDashboard.searchResult.filters.searchTerms"),
    getItems(){
        if(!this.searchTermList) return [];
        return this.searchTermList;
    }
  },
  props: {
  },
  methods:{
    addSearchTerm(term){
        if(this.searchTerms.length >0 ){
            if(this.searchTerms.indexOf(term) == -1)
                this.searchTerms.push(term);
        }
        else
            this.searchTerms.push(term);
        this.workflowDashboard.searchQuery.filterBySearchTerm = this.searchTerms;
    }
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
    height: calc(2.25rem + 1px);
    padding: 0rem 0rem;
    border:none;
  }
  #myTable_filter{
      display:flex;
      margin-bottom:20px;
  }
  #myTable_filter label{
      margin: auto;
  }
  .dataTables_wrapper .dataTables_filter input{
    margin-left: 0 !important;
  }
  .dataTables_wrapper .dataTables_filter label{
    margin-right: 5px !important;
  }
</style>
