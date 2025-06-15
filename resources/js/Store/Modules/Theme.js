// Theme.js - Tema yönetim modülü
export default {
  namespaced: true,

  state: {
    // Default tema 'light' olarak ayarlanıyor
    currentTheme: localStorage.getItem('theme') || 'light',
    // Mevcut temalar
    availableThemes: ['light', 'dark', 'nature', 'ocean'],
  },

  mutations: {
    // Temayı değiştirme işlemi
    setTheme(state, theme) {
      // Mevcut temayı state'den kaldır
      document.documentElement.classList.remove(state.currentTheme);

      // Yeni temayı ayarla
      state.currentTheme = theme;
      localStorage.setItem('theme', theme);

      // DaisyUI tema desteği için data-theme özniteliğini güncelliyoruz
      document.documentElement.setAttribute('data-theme', theme);

      // HTML'e tema sınıfını ekle (Özel CSS seçicileri için)
      document.documentElement.classList.add(theme);

      // Dark mode özel işlemleri
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
  },

  actions: {
    // Temayı değiştirme action'ı
    changeTheme({ commit }, theme) {
      commit('setTheme', theme);
    },

    // Temayı başlatma action'ı (uygulama başladığında çağrılır)
    initTheme({ commit, state }) {
      // localStorage'dan tema tercihi alınır ve uygulanır
      commit('setTheme', state.currentTheme);
    },

    // Temayı değiştirme (toggle) action'ı - artık sadece light/dark arası geçiş değil
    toggleTheme({ commit, state }) {
      const currentIndex = state.availableThemes.indexOf(state.currentTheme);
      const nextIndex = (currentIndex + 1) % state.availableThemes.length;
      const newTheme = state.availableThemes[nextIndex];
      commit('setTheme', newTheme);
    },
  },

  getters: {
    // Mevcut temayı döndürür
    getCurrentTheme: (state) => state.currentTheme,

    // Mevcut temanın dark olup olmadığını kontrol eder
    isDarkTheme: (state) => state.currentTheme === 'dark',

    // Tüm temaları döndürür
    getAvailableThemes: (state) => state.availableThemes,
  },
};
