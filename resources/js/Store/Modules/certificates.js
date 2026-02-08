const state = {
  scrollPosition: 0,
};

const getters = {
  scrollPosition: (state) => state.scrollPosition,
};

const mutations = {
  SET_SCROLL_POSITION(state, position) {
    state.scrollPosition = position;
  },
};

const actions = {
  setScrollPosition({ commit }, position) {
    commit('SET_SCROLL_POSITION', position);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
