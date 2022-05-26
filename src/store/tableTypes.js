/* eslint-disable */
import tableTypes from '@/services/tableTypes';

const state = {
  table_types: [],
};

const getters = {
  tableTypes() {
    return state.table_types;
  },
};

const actions = {
  getTableTypes({ commit }) {
    return tableTypes.getTableTypes().then(data => commit('setTableTypes', data._embedded));
  },
};

const mutations = {
  setTableTypes(state, table_types) {
    state.table_types = table_types.tableTypeList;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};