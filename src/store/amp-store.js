import { createStore } from "vuex";
import Pathify, { make } from 'vuex-pathify';
import defaultState from "./state";
import createPersistedState from "vuex-persistedstate";

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

export const store = createStore({
    state,
    mutations,
    actions,
    getters,
    plugins: [Pathify.plugin, createPersistedState()]
  });

