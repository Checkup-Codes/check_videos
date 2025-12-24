import axios from 'axios';

const state = () => ({
  writes: [],
  collapsed: false,
  scrollPosition: 0,
  filter: 'all',
});

const mutations = {
  SET_WRITES(state, writes) {
    state.writes = writes;
  },
  SET_COLLAPSED(state, value) {
    state.collapsed = value;
  },
  SET_SCROLL_POSITION(state, position) {
    state.scrollPosition = position;
  },
  SET_FILTER(state, filter) {
    state.filter = filter;
  },
};

const actions = {
  setScrollPosition({ commit }, position) {
    commit('SET_SCROLL_POSITION', position);
  },
  setFilter({ commit }, filter) {
    commit('SET_FILTER', filter);
  },
};

const getters = {
  writes: (state) => state.writes,
  isCollapsed: (state) => state.collapsed,
  scrollPosition: (state) => state.scrollPosition,
  filter: (state) => state.filter,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
