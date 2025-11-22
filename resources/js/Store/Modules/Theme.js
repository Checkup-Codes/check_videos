// Theme.js - Minimal tema yönetimi (Sadece .dark class'ını yönetir)
// CSS'teki shadcn renkleri otomatik olarak .dark class'ına göre değişir
export default {
  namespaced: true,

  state: {
    currentTheme: localStorage.getItem('theme') || 'light',
  },

  mutations: {
    // Sadece .dark class'ını toggle eder - CSS'teki renkler otomatik değişir
    setTheme(state, theme) {
      state.currentTheme = theme;
      localStorage.setItem('theme', theme);

      // Shadcn dark mode - CSS'teki .dark selector'ı aktif eder
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
  },

  actions: {
    changeTheme({ commit }, theme) {
      commit('setTheme', theme);
    },

    initTheme({ commit, state }) {
      commit('setTheme', state.currentTheme);
    },

    toggleTheme({ commit, state }) {
      commit('setTheme', state.currentTheme === 'light' ? 'dark' : 'light');
    },
  },

  getters: {
    getCurrentTheme: (state) => state.currentTheme,
    isDarkTheme: (state) => state.currentTheme === 'dark',
  },
};
