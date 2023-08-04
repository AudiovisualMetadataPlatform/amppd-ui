import Vue from "vue";
import Vuex from "vuex";
import pathify from "vuex-pathify";
import { make } from "vuex-pathify";
import defaultState from "./state";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

/*======================================================
= Helpers
=======================================================*/

/*======================================================
= Root State Object
=======================================================*/

const state = JSON.parse(JSON.stringify(defaultState));

/*======================================================
= Mutations
=======================================================*/
const mutations = make.mutations(state);

/*======================================================
= Asynchronous Actions
=======================================================*/

const actions = {};

const getters = {};

/*======================================================
= Vue Store instance
=======================================================*/

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  plugins: [pathify.plugin, createPersistedState()],
});

export default store;