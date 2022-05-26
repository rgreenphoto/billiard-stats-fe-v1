/* eslint-disable */
import rackTypes from '@/services/rackTypes';

const state = {
  rack_types: [],
};

const getters = {
  rackTypes() {
    return state.rack_types;
  },
};

const actions = {
  getRackTypes({ commit }) {
    return rackTypes.getRackTypes().then(data => commit('setRackTypes', data._embedded));
  },
};

const mutations = {
  setRackTypes(state, rack_types) {
    state.rack_types = rack_types.rackTypeList;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};