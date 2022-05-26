/* eslint-disable */
import Formats from '@/services/Formats';

const state = {
  formats: [],
  format: [],
};

const getters = {
  formats() {
    return state.formats;
  },
  format() {
    return state.format;
  },
};

const actions = {
  getFormats({ commit }) {
    return Formats.getFormats().then(data => commit('setFormats', data._embedded));
  },
  getFormat({ commit }, id) {
    return Formats.getFormat(id).then(data => commit('setFormat', data.format));
  },
};

const mutations = {
  setFormats(state, formats) {
    state.formats = formats.formatList;
  },
  setFormat(state, format) {
    state.format = format;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
