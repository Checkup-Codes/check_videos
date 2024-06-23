
const state = () => ({
  activeMenu: 'home',
});

const mutations = {
  SET_ACTIVE_MENU(state, menu) {
    state.activeMenu = menu;
  },
};

const actions = {
  setActiveMenu({ commit }, menu) {
    commit('SET_ACTIVE_MENU', menu);
  },
};

const getters = {
  activeMenu: (state) => state.activeMenu,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
