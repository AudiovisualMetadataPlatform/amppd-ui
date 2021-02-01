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
        filtersEnabled : {submitterFilter :false, dateFilter : false, fileFilter : false, itemFilter : false, searchFilter : false, statusFilter : false, collectionFilter : false, stepFilter : false, workflowFilter : false},
        searchQuery: {
            sortRule: {
              columnName: 'dateCreated',
              orderByDescending: true
            },
            pageNum: 1,
            resultsPerPage: 10,
            filterBySubmitters:[],
            filterByDates:[],
            filterByWorkflows:[],
            filterByCollections:[],
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
              collections:[],
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