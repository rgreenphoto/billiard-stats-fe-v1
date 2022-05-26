/* eslint-disable */
import userMatches from '@/services/userMatches';

const state = {
  user_matches: [],
  user_matches_links: [],
  userMatch: [],
  activeScoreCard: [],
};

const getters = {
  user_matches() {
    return state.user_matches;
  },
  userMatch() {
      return state.userMatch;
  },
  activeScoreCard() {
      return state.activeScoreCard;
  }
};

const actions = {
  getUserMatches({ commit }) {
    return userMatches.getUserMatches().then(data => commit('setUserMatches', data));
  },
  addUserMatch({ commit }, userMatch) {
    return userMatches.addUserMatch(userMatch).then(data => commit('setUserMatch', data.user_match));
  },
  setActiveScoreCard({ commit }, user) {
    return commit('setActiveScoreCard', user);
  },
  updateUserMatch({ commit }, userMatch) {
    return userMatches.updateUserMatch(userMatch).then(data => commit('setUserMatch', data.user_match))
  },
  deleteUserMatch({ commit }, userMatch) {
    return userMatches.deleteUserMatch(userMatch).then(data => commit('deleteUserMatch', data.user_match))
  }
};

const mutations = {
  setUserMatches(state, user_matches) {
    state.user_matches_links = user_matches._links;
    state.user_matches = user_matches._embedded.userMatchList;
  },
  setUserMatch(state, userMatch) {
    state.userMatch = userMatch;
  },
  setActiveScoreCard(state, user){
    state.activeScoreCard = user;
  },
  deleteUserMatch(state, userMatch) {
    Object.keys(state.userMatch).forEach(key => {
        state.userMatch[key] = null;
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