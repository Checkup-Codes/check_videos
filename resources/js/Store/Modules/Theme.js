// Theme.js - Minimal tema yönetimi (Sadece .dark class'ını yönetir)
// CSS'teki shadcn renkleri otomatik olarak .dark class'ına göre değişir
export default {
  namespaced: true,

  state: {
    currentTheme: localStorage.getItem('theme') || 'light',
    // Font preference - Single unified font choice for entire site
    font: localStorage.getItem('font') || 'inter', // 'inter' = Inter (default), 'geist' = Geist (minimalist)
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

    // Font preference mutation - applies to entire site
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
      // Initialize font preference
      commit('setFont', state.font);
    },

    toggleTheme({ commit, state }) {
      commit('setTheme', state.currentTheme === 'light' ? 'dark' : 'light');
    },

    // Font preference action
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
