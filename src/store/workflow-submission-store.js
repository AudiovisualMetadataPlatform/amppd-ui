import Vue from 'vue'
import Vuex from 'vuex'
import pathify from 'vuex-pathify'
import { make } from 'vuex-pathify'
import axios from 'axios'

Vue.use(Vuex);

/*======================================================
= Helpers
=======================================================*/


/*======================================================
= Root State Object
=======================================================*/

const state = {
    parameters: [], // Workflow node parameters
    files: [], // List of files
    selectedWorkflow: null, // Selected workflow
    loading: false // For future use...can spawn loading indicator
};

/*======================================================
= Mutations
=======================================================*/
const mutations = make.mutations(state);

/*======================================================
= Asynchronous Actions
=======================================================*/

const actions = {
    async getWorkflowDetails({commit}, selectedWorkflow) {
        var tempParams = [];
        commit("SET_LOADING", true);
        // Get a the workflow details from 
        tempParams = await axios.get(Vue.config.publicPath + 'workflows/' + selectedWorkflow)
          .then(response => {
              // Get the steps from the response
              var data = response.data.steps;

              // If we didn't get an steps, return empty list
              if(!response.data.steps) {
                  return tempParams;
              }

              // Get the node keys
              var nodeKeys = Object.keys(data);
              for(var nodeKey in nodeKeys){
                var thisNode = data[nodeKey]; 

                // Create a new node object
                var newNode = {
                    nodeName: thisNode.toolId,
                    params:[]
                };

                // Iterate over the tool inputs and add appropriate
                var toolInputKeys = Object.keys(thisNode.toolInputs);
                for(var input = 0; input < toolInputKeys.length; input++){
                    // Get the input
                    var toolInputKey = toolInputKeys[input];
                    var thisInput = thisNode.toolInputs[toolInputKey];

                    // If we don't have an input, skip it
                    if(!thisInput) continue;
                    // __class__ as far as I can tell, is an indication it is not a parameter
                    if(thisInput.__class__) continue;

                    console.log(thisInput);
                    // Add the parameter
                    newNode.params.push({
                        name: toolInputKey,
                        value: thisInput,
                        type: 'text'
                    });

                }
                // If we had any params, add it to the list of nodes with params
                if(newNode.params.length>0){
                    tempParams.push(newNode);
                }
              }
              commit("SET_LOADING", false);
              return tempParams;
          })
          .catch(e => {
            console.log(e);
            commit("SET_LOADING", false);
            // TODO:  Think about global error handling
            return [];
          });
          return tempParams;
    },
};

const getters = {
};

/*======================================================
= Vue Store instance
=======================================================*/

export default new Vuex.Store({
<<<<<<< HEAD
    state,
    mutations,
    actions,
    getters,
    plugins: [ pathify.plugin ]
=======
	state,
	mutations,
	actions,
	getters,
	plugins: [ pathify.plugin ]
>>>>>>> master
});