import Roles from '@/services/Roles';

const state = {
  users: [],
};

const getters = {
  roles() {
    return state.users;
  },
};

const actions = {
  getRoles({ commit }) {
    return Roles.getRoles().then(data => commit('setRoles', data.data.roles));
  },
};

const mutations = {
  setRoles(state, users) {
    state.users = users;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
