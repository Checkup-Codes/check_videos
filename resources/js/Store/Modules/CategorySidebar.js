const state = () => ({
  collapsed: new Set(),
});

const mutations = {
  TOGGLE_COLLAPSE(state, id) {
    if (state.collapsed.has(id)) {
      state.collapsed.delete(id);
    } else {
      state.collapsed.add(id);
    }
    // Vuex reactivity için referansı değiştir
    state.collapsed = new Set(state.collapsed);
  },
  EXPAND_ALL(state) {
    state.collapsed = new Set();
  },
  COLLAPSE_ALL(state, allIds) {
    state.collapsed = new Set(allIds);
  },
};

const actions = {
  toggleCollapse({ commit }, id) {
    commit('TOGGLE_COLLAPSE', id);
  },
  expandAll({ commit }) {
    commit('EXPAND_ALL');
  },
  collapseAll({ commit }, allIds) {
    commit('COLLAPSE_ALL', allIds);
  },
};

const getters = {
  isCollapsed: (state) => (id) => state.collapsed.has(id),
  collapsedSet: (state) => state.collapsed,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}; 