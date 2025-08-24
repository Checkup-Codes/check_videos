// Theme.js - Tema yönetim modülü
export default {
  namespaced: true,

  state: {
    // Default tema 'light' olarak ayarlanıyor
    currentTheme: localStorage.getItem('theme') || 'light',
    // Mevcut temalar
    availableThemes: ['light', 'dark', 'lotr', 'neon', 'cyberpunk', 'nature', 'ocean', 'sunset', 'custom'],
    customTheme: JSON.parse(localStorage.getItem('customTheme')) || {
      primary: '#570df8',
      secondary: '#f000b8',
      accent: '#37cdbe',
      neutral: '#3d4451',
      'base-100': '#ffffff',
      borderRadius: '0.5rem',
      animationSpeed: '0.3s',
      neonEffect: false,
      shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    }
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

    // Custom tema güncelleme
    updateCustomTheme(state, customTheme) {
      state.customTheme = { ...state.customTheme, ...customTheme };
      localStorage.setItem('customTheme', JSON.stringify(state.customTheme));
      
      // Custom tema aktifse CSS değişkenlerini güncelle
      if (state.currentTheme === 'custom') {
        this.dispatch('Theme/applyCustomTheme');
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

    // Custom tema uygulama
    applyCustomTheme({ state }) {
      const custom = state.customTheme;
      const root = document.documentElement;
      
      // CSS değişkenlerini güncelle
      root.style.setProperty('--p', this.hexToHsl(custom.primary));
      root.style.setProperty('--s', this.hexToHsl(custom.secondary));
      root.style.setProperty('--a', this.hexToHsl(custom.accent));
      root.style.setProperty('--n', this.hexToHsl(custom.neutral));
      root.style.setProperty('--b1', this.hexToHsl(custom['base-100']));
      root.style.setProperty('--border-radius', custom.borderRadius);
      root.style.setProperty('--animation-duration', custom.animationSpeed);
      root.style.setProperty('--shadow', custom.shadow);
      
      // Neon efekt
      if (custom.neonEffect) {
        root.classList.add('neon-effect');
      } else {
        root.classList.remove('neon-effect');
      }
    },

    // Hex'i HSL'ye çevirme yardımcı fonksiyonu
    hexToHsl(hex) {
      // Basit hex to hsl dönüşümü
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;
      
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h, s, l = (max + min) / 2;

      if (max === min) {
        h = s = 0;
      } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
      }

      return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
    },
  },

  getters: {
    // Mevcut temayı döndürür
    getCurrentTheme: (state) => state.currentTheme,

    // Mevcut temanın dark olup olmadığını kontrol eder
    isDarkTheme: (state) => state.currentTheme === 'dark',

    // Tüm temaları döndürür
    getAvailableThemes: (state) => state.availableThemes,

    // Custom tema ayarlarını döndürür
    getCustomTheme: (state) => state.customTheme,
  },
};
