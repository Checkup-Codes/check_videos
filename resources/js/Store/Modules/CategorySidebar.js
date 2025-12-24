const state = () => ({
  collapsed: new Set(),
  scrollPosition: 0,
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
  SET_SCROLL_POSITION(state, position) {
    state.scrollPosition = position;
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
  setScrollPosition({ commit }, position) {
    commit('SET_SCROLL_POSITION', position);
  },
};

const getters = {
  isCollapsed: (state) => (id) => state.collapsed.has(id),
  collapsedSet: (state) => state.collapsed,
  scrollPosition: (state) => state.scrollPosition,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
