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
    parameters: [], // Workflow step parameters
    files: [], // List of files
    selectedWorkflow: null, // Selected workflow
    isWorkflowModalVisible: false,
    // bundle: null, // bundle created for primaryfiles upon submission
    jobs: [], // jobs successfully created
    workflowDashboard:{
        loading:false,
        filtersEnabled : {submitterFilter :false},
        searchQuery: {
            sortRule: {
              columnName: 'Date',
              orderByDescending: true
            },
            pageNum: 1,
            resultsPerPage: 10,
            filterBySubmitters:[]
          },
          searchResult: {
            totalResults: 0
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