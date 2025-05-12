// Theme.js - Tema yönetim modülü
export default {
  namespaced: true,
  
  state: {
    // Default tema 'light' olarak ayarlanıyor
    currentTheme: localStorage.getItem('theme') || 'light',
  },
  
  mutations: {
    // Temayı değiştirme işlemi
    setTheme(state, theme) {
      state.currentTheme = theme;
      localStorage.setItem('theme', theme);
      
      // HTML elementine tema sınıfını ekleme veya kaldırma
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        // DaisyUI tema desteği için data-theme özniteliğini de güncelliyoruz
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        // DaisyUI tema desteği için data-theme özniteliğini de güncelliyoruz
        document.documentElement.setAttribute('data-theme', 'light');
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
    
    // Temayı değiştirme (toggle) action'ı
    toggleTheme({ commit, state }) {
      const newTheme = state.currentTheme === 'light' ? 'dark' : 'light';
      commit('setTheme', newTheme);
    },
  },
  
  getters: {
    // Mevcut temayı döndürür
    getCurrentTheme: (state) => state.currentTheme,
    
    // Mevcut temanın dark olup olmadığını kontrol eder
    isDarkTheme: (state) => state.currentTheme === 'dark',
  },
}; 