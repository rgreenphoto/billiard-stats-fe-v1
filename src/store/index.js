import Vue from 'vue'
import Vuex from 'vuex'

/* ----------  Modules  ----------*/
import feedback from '../store/feedback';
import loading from '../store/loading';
import users from '../store/users';
import auth from '../store/auth';
import formats from '../store/formats';
import matches from '../store/matches';
import venues from '../store/venues';
import tableTypes from '../store/tableTypes';
import rackTypes from '../store/rackTypes';
import gameTypes from '../store/gameTypes';
import userMatches from '@/store/userMatches';


Vue.use(Vuex);

const state = {

};

const getters = {

};

const actions = {

};

const mutations = {

};

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  modules: {
    feedback,
    loading,
    users,
    auth,
    formats,
    matches,
    venues,
    tableTypes,
    rackTypes,
    gameTypes,
    userMatches,
  },
});
