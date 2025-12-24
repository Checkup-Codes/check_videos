const state = () => ({
  scrollPosition: 0,
});

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

const getters = {
  scrollPosition: (state) => state.scrollPosition,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

