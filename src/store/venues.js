/* eslint-disable */
import Venues from '@/services/Venues';

const state = {
  venue: [],
  venues: [],
};

const getters = {
  venue() {
    return state.venue;
  },
  venues() {
    return state.venues;
  },
};

const actions = {
  getVenue({ commit }, id) {
    return Venues.getVenue(id).then(data => commit('setVenue', data.venue));
  },
  getVenues({ commit }) {
    return Venues.getVenues().then(data => commit('setVenues', data._embedded));
  },
};

const mutations = {
  setVenue(state, venue) {
    state.venue = venue
  },
  setVenues(state, venues) {
    state.venues = venues.venueList;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};