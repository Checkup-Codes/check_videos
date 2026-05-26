// Theme.js - Minimal tema yönetimi (Sadece .dark class'ını yönetir)
// CSS'teki shadcn renkleri otomatik olarak .dark class'ına göre değişir
export default {
  namespaced: true,

  state: {
    currentTheme: localStorage.getItem('theme') || 'light',
    font: localStorage.getItem('font') || 'inter',
  },

  mutations: {
    setTheme(state, theme) {
      state.currentTheme = theme;
      localStorage.setItem('theme', theme);

      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },

    setFont(state, font) {
      state.font = font;
      localStorage.setItem('font', font);
      document.documentElement.setAttribute('data-font', font);
    },
  },

  actions: {
    changeTheme({ commit }, theme) {
      commit('setTheme', theme);
    },

    initTheme({ commit, state }) {
      commit('setTheme', state.currentTheme);
      commit('setFont', state.font);
    },

    toggleTheme({ commit, state }) {
      commit('setTheme', state.currentTheme === 'light' ? 'dark' : 'light');
    },

    changeFont({ commit }, font) {
      commit('setFont', font);
    },
  },

  getters: {
    getCurrentTheme: (state) => state.currentTheme,
    isDarkTheme: (state) => state.currentTheme === 'dark',
    getFont: (state) => state.font,
  },
};
