
import Auth from '../services/Auth';

const state = {
  loggedin: false,
  user: false,
  tokens: {
    access: null,
    refresh: null,
  },
};

const getters = {
  user() {
    return state.user;
  },
  loggedin() {
    return state.loggedin;
  },
  accesstoken() {
    return state.tokens.access;
  },
  refreshtoken() {
    return state.tokens.refresh;
  },
  auth() {
    return state;
  },
};

const actions = {
  login({ commit }, credentials) {
    return Auth.login(credentials).then((data) => {
      commit('setLoggedIn', true);
      commit('setUser', data);
      commit('setAccessToken', data.accessToken);
      commit('setRefreshToken', data.accessToken);
    });
  },
  authenticate({ commit }) {
    return Auth.authenticate(state.tokens.access).then((data) => {
      commit('setLoggedIn', true);
      commit('setUser', data.user);
    });
  },
  logout({ commit }) {
    commit('setLoggedIn', false);
    commit('setUser', false);
    commit('clearAccessToken', false);
    commit('clearRefreshToken', false);
  },
};

const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  // eslint-disable-next-line no-unused-vars
  clearUser(state, user) {
    state.user = false;
  },
  setAccessToken(state, token) {
    localStorage.setItem('accessToken', token);
    state.tokens.access = token;
  },
  clearAccessToken(state) {
    localStorage.removeItem('accessToken');
    state.tokens.access = false;
  },
  setRefreshToken(state, token) {
    localStorage.setItem('refreshToken', token);
    state.tokens.refresh = token;
  },
  clearRefreshToken(state) {
    localStorage.removeItem('refreshToken');
    state.tokens.refresh = false;
  },
  setLoggedIn(state, status) {
    state.loggedin = status;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
