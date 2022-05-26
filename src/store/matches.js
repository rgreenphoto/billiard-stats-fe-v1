/* eslint-disable */
import Matches from '@/services/Matches';

const state = {
  match: [],
  matches: [],
  activeMatch: [],
};

const getters = {
  match() {
    return state.match; 
  },
  matches() {
    return state.matches;
  },
  activeMatch() {
    return state.activeMatch;
  }
};

const actions = {
  async getMatches({ commit }) {
    return Matches.getMatches().then(data => commit('setMatches', data._embedded));
  },
  async addMatch({ commit }, match) {
    return Matches.addMatch(match).then(data => commit('activeMatch', data));
  },
  async updateMatch({ commit }, match) {
    return Matches.updateMatch(match).then(data => commit('setMatch', data.match))
  },
  async deleteMatch({ commit }, match) {
    return Matches.deleteMatch(match).then(data => commit('deleteMatch', data.match))
  },
  async deleteActiveMatch({ commit }) {
    commit('deleteMatch', []);
  }
};

const mutations = {
  setMatch(state, match) {
    state.match = match;
  },
  setMatches(state, matches) {
    state.matches = matches.matchList;
  },
  activeMatch(state, match) {
    console.log(match);
    state.activeMatch = match;
  },
  deleteMatch(state, match) {
    Object.keys(state.activeMatch).forEach(key => {
      state.activeMatch[key] = null;
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};