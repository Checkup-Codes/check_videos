import axios from 'axios';

const state = () => ({
  writes: [],
  categories: [],
  collapsed: false,
  scrollPosition: 0,
  filter: 'all',
  sidebarDataLoaded: false,
  sidebarDataLoading: false,
  lastUserId: null, // Login durumu değişikliğini takip etmek için
});

const mutations = {
  SET_WRITES(state, writes) {
    state.writes = writes;
  },
  SET_CATEGORIES(state, categories) {
    state.categories = categories;
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
  SET_SIDEBAR_DATA_LOADED(state, value) {
    state.sidebarDataLoaded = value;
  },
  SET_SIDEBAR_DATA_LOADING(state, value) {
    state.sidebarDataLoading = value;
  },
  SET_LAST_USER_ID(state, userId) {
    state.lastUserId = userId;
  },
  CLEAR_SIDEBAR_CACHE(state) {
    state.writes = [];
    state.categories = [];
    state.sidebarDataLoaded = false;
  },
};

const actions = {
  setScrollPosition({ commit }, position) {
    commit('SET_SCROLL_POSITION', position);
  },
  setFilter({ commit }, filter) {
    commit('SET_FILTER', filter);
  },
  
  // Sidebar verilerini yükle (user değişikliğini kontrol eder)
  async loadSidebarData({ commit, state }, { forceRefresh = false, currentUserId = null } = {}) {
    // User değiştiyse (login/logout) cache'i temizle
    const userChanged = currentUserId !== state.lastUserId;
    if (userChanged) {
      commit('CLEAR_SIDEBAR_CACHE');
      commit('SET_LAST_USER_ID', currentUserId);
    }
    
    // Zaten yüklenmişse ve force değilse, tekrar yükleme
    if (state.sidebarDataLoaded && !forceRefresh && !userChanged) {
      return { writes: state.writes, categories: state.categories };
    }
    
    // Zaten yükleniyorsa bekle
    if (state.sidebarDataLoading) {
      return new Promise((resolve) => {
        const checkLoaded = setInterval(() => {
          if (!state.sidebarDataLoading) {
            clearInterval(checkLoaded);
            resolve({ writes: state.writes, categories: state.categories });
          }
        }, 50);
      });
    }
    
    commit('SET_SIDEBAR_DATA_LOADING', true);
    
    try {
      const response = await axios.get('/api/writes/sidebar-data');
      const data = response.data;
      
      if (data.success) {
        commit('SET_WRITES', data.writes || []);
        commit('SET_CATEGORIES', data.categories || []);
        commit('SET_SIDEBAR_DATA_LOADED', true);
        return { writes: data.writes, categories: data.categories };
      }
    } catch (error) {
      console.error('Error loading sidebar data:', error);
    } finally {
      commit('SET_SIDEBAR_DATA_LOADING', false);
    }
    
    return { writes: [], categories: [] };
  },
  
  // Props'tan gelen veriyi store'a kaydet (ilk sayfa yüklemesinde)
  setSidebarDataFromProps({ commit, state }, { writes, categories, currentUserId = null }) {
    // User değiştiyse cache'i temizle ve yeni veriyi kaydet
    const userChanged = currentUserId !== state.lastUserId;
    if (userChanged) {
      commit('CLEAR_SIDEBAR_CACHE');
      commit('SET_LAST_USER_ID', currentUserId);
    }
    
    if (writes && writes.length > 0) {
      commit('SET_WRITES', writes);
    }
    if (categories && categories.length > 0) {
      commit('SET_CATEGORIES', categories);
    }
    if ((writes && writes.length > 0) || (categories && categories.length > 0)) {
      commit('SET_SIDEBAR_DATA_LOADED', true);
    }
  },
  
  // Cache'i temizle ve yeniden yükle (CRUD işlemlerinden sonra çağrılır)
  async invalidateAndReload({ commit, dispatch }, { currentUserId = null } = {}) {
    commit('CLEAR_SIDEBAR_CACHE');
    return dispatch('loadSidebarData', { forceRefresh: true, currentUserId });
  },
  
  // Sadece cache'i temizle (login/logout için)
  clearSidebarCache({ commit }) {
    commit('CLEAR_SIDEBAR_CACHE');
    commit('SET_LAST_USER_ID', null);
  },
};

const getters = {
  writes: (state) => state.writes,
  categories: (state) => state.categories,
  isCollapsed: (state) => state.collapsed,
  scrollPosition: (state) => state.scrollPosition,
  filter: (state) => state.filter,
  sidebarDataLoaded: (state) => state.sidebarDataLoaded,
  sidebarDataLoading: (state) => state.sidebarDataLoading,
  lastUserId: (state) => state.lastUserId,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
