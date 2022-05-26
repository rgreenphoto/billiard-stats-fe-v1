/* eslint-disable */
import gameTypes from '@/services/gameTypes';

const state = {
  game_type: [],
  game_types: [],
};

const getters = {
  gameType() {
    return state.game_type;
  },
  gameTypes() {
    return state.game_types;
  },
};
const actions = {
  getGameType({ commit }, id) {
    return gameTypes.getGameType(id).then(data => commit('setGameType', data.game_type));
  },
  getGameTypes({ commit }) {
    return gameTypes.getGameTypes().then(data => commit('setGameTypes', data._embedded));
  },
};

const mutations = {
  setGameType(state, game_type) {
    state.game_type = game_type;
  },
  setGameTypes(state, game_types) {
    state.game_types = game_types.gameTypeList;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};