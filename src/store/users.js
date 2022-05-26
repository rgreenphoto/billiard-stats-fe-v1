/* eslint-disable */
import Users from '@/services/Users';

const state = {
  users: [],
};

const getters = {
  users() {
    return state.users;
  },
};

const actions = {
  getUsers({ commit }) {
    return Users.getUsers().then(data => commit('setUsers', data._embedded));
  },
};

const mutations = {
  setUsers(state, users) {
    state.users = users.userList;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
