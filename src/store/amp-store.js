import Vue from 'vue'
import Vuex from 'vuex'
import pathify from 'vuex-pathify'
import { make } from 'vuex-pathify'

Vue.use(Vuex);

/*======================================================
= Helpers
=======================================================*/


/*======================================================
= Root State Object
=======================================================*/

const state = {
    workflowSubmission:{
      loading:false,
      selectedFiles: [],
      selectedWorkflow: '',
      selectedWorkflowParameters: []
    },
    workflowDashboard:{
        loading:false,
        filtersEnabled : {submitterFilter :false, dateFilter : false, fileFilter : false, itemFilter : false, searchFilter : false, statusFilter : false, stepFilter : false, workflowFilter : false},
        searchQuery: {
            sortRule: {
              columnName: 'date',
              orderByDescending: true
            },
            pageNum: 1,
            resultsPerPage: 10,
            filterBySubmitters:[],
            filterByDates:[],
            filterByWorkflows:[],
            filterByItems:[],
            filterByFiles:[],
            filterBySteps:[],
            filterByStatuses:[],
            filterBySearchTerm:[]
          },
          searchResult: {
            rows: [],
            totalResults: 0,
            filters:{
              searchTerms:[],
              submitters:[],
              dates:[],
              workflows:[],
              items:[],
              files:[],
              steps:[],
              statuses:[],
            }
          },
          rows:[]
    },
    typeAheadResult:''
};

/*======================================================
= Mutations
=======================================================*/
const mutations = make.mutations(state);

/*======================================================
= Asynchronous Actions
=======================================================*/

const actions = {
   
};

const getters = {
};

/*======================================================
= Vue Store instance
=======================================================*/

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    plugins: [ pathify.plugin ]
});