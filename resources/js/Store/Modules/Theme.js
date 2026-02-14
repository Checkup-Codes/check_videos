// Theme.js - Minimal tema yönetimi (Sadece .dark class'ını yönetir)
// CSS'teki shadcn renkleri otomatik olarak .dark class'ına göre değişir
export default {
  namespaced: true,

  state: {
    currentTheme: localStorage.getItem('theme') || 'light',
    // Font preferences - Default to Inter for best readability
    headingFont: localStorage.getItem('headingFont') || 'inter', // 'inter' = Inter (recommended), 'new' = Clash Display, 'classic' = System fonts
    bodyFont: localStorage.getItem('bodyFont') || 'inter', // 'inter' = Inter (recommended), 'new' = Satoshi, 'classic' = System fonts
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

    // Font preferences mutations
    setHeadingFont(state, font) {
      state.headingFont = font;
      localStorage.setItem('headingFont', font);
      document.documentElement.setAttribute('data-heading-font', font);
    },

    setBodyFont(state, font) {
      state.bodyFont = font;
      localStorage.setItem('bodyFont', font);
      document.documentElement.setAttribute('data-body-font', font);
    },
  },

  actions: {
    changeTheme({ commit }, theme) {
      commit('setTheme', theme);
    },

    initTheme({ commit, state }) {
      commit('setTheme', state.currentTheme);
      // Initialize font preferences
      commit('setHeadingFont', state.headingFont);
      commit('setBodyFont', state.bodyFont);
    },

    toggleTheme({ commit, state }) {
      commit('setTheme', state.currentTheme === 'light' ? 'dark' : 'light');
    },

    // Font preference actions
    changeHeadingFont({ commit }, font) {
      commit('setHeadingFont', font);
    },

    changeBodyFont({ commit }, font) {
      commit('setBodyFont', font);
    },
  },

  getters: {
    getCurrentTheme: (state) => state.currentTheme,
    isDarkTheme: (state) => state.currentTheme === 'dark',
    getHeadingFont: (state) => state.headingFont,
    getBodyFont: (state) => state.bodyFont,
  },
};
