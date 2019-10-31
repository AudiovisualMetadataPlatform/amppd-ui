import Vue from 'vue'
import Vuex from 'vuex'
import pathify from 'vuex-pathify';
import { make } from 'vuex-pathify';

Vue.use(Vuex);

/*======================================================
= Helpers
=======================================================*/


/*======================================================
= Root State Object
=======================================================*/

const state = {
    parameters: [],
    files: [],
    selectedWorkflow: null
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