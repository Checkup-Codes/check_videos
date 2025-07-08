import axios from 'axios';

const state = () => ({
  writes: [],
  collapsed: false,
});

const mutations = {
  SET_WRITES(state, writes) {
    state.writes = writes;
  },
  SET_COLLAPSED(state, value) {
    state.collapsed = value;
  },
};

const actions = {
  //   async fetchWrites({ commit }) {
  //     try {
  //       const response = await axios.get('/api/v1/writes');
  //       commit('SET_WRITES', response.data.writes);
  //     } catch (error) {
  //       console.error('Error fetching writes:', error);
  //     }
  //   },
};

const getters = {
  writes: (state) => state.writes,
  isCollapsed: (state) => state.collapsed,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
