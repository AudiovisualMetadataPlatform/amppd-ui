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
      showBundleError:false,
      showSelectBundle:false,
      showSaveBundle:false,
      bundles: [],
      selectedFiles: new Map(), // use map instead of array to improve search performance
      updateSelectedFiles: 0,   // flag to indiate changes in selectedFiles, a work-around to solve the issue that Vue does not watch Map
      selectedWorkflow: null,
      selectedWorkflowParameters: []
    },
    workflowDashboard:{
        loading:false,
        filtersEnabled: {
          dateFilter: false, 
          submitterFilter: false, 
          collectionFilter: false, 
          itemFilter: false, 
          fileFilter: false, 
          workflowFilter: false,
          stepFilter: false, 
          statusFilter: false, 
          searchFilter: false,
        },
        searchQuery: {
            sortRule: {
              columnName: 'dateCreated',
              orderByDescending: true
            },
            pageNum: 1,
            resultsPerPage: 10,
            filterByDates:[],
            filterBySubmitters:[],
            filterByCollections:[],
            filterByItems:[],
            filterByFiles:[],
            filterByWorkflows:[],
            filterBySteps:[],
            filterByStatuses:[],
            filterBySearchTerms:[],
            filterByRelevant:true,
          },
          searchResult: {
            rows: [],
            totalResults: 0,
            filters:{
              dates:[],
              submitters:[],
              collections:[],
              items:[],
              files:[],
              workflows:[],
              steps:[],
              statuses:[],
              searchTerms:[],
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