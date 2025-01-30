import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
  state: () => ({
    currentTheme: 'light',
    palettes: {
      modern: {
        name: 'Modern Mavi',
        light: {
          colors: {
            primary: '#0ea5e9',
            secondary: '#64748b',
            accent: '#0284c7',
            background: '#ffffff',
            text: '#0f172a',
            'text-light': '#475569',
            'text-dark': '#1e293b',
            border: '#e2e8f0',
            'border-light': '#f1f5f9',
            'border-dark': '#cbd5e1',
          },
          borderWidth: '0.5px',
          borderRadius: '0.375rem',
        },
        dark: {
          colors: {
            primary: '#38bdf8',
            secondary: '#94a3b8',
            accent: '#0ea5e9',
            background: '#0f172a',
            text: '#f8fafc',
            'text-light': '#e2e8f0',
            'text-dark': '#cbd5e1',
            border: '#1e293b',
            'border-light': '#334155',
            'border-dark': '#0f172a',
          },
          borderWidth: '0.5px',
          borderRadius: '0.375rem',
        },
      },
      nature: {
        name: 'Doğal Yeşil',
        light: {
          colors: {
            primary: '#059669',
            secondary: '#64748b',
            accent: '#047857',
            background: '#f8faf8',
            text: '#1a2e1a',
            'text-light': '#374937',
            'text-dark': '#243024',
            border: '#e2e8e2',
            'border-light': '#f1f5f1',
            'border-dark': '#cbd5cb',
          },
          borderWidth: '1px',
          borderRadius: '0.5rem',
        },
        dark: {
          colors: {
            primary: '#10b981',
            secondary: '#94a3b8',
            accent: '#059669',
            background: '#1a271a',
            text: '#f8faf8',
            'text-light': '#d1fae5',
            'text-dark': '#a7f3d0',
            border: '#064e3b',
            'border-light': '#065f46',
            'border-dark': '#064e3b',
          },
          borderWidth: '1px',
          borderRadius: '0.5rem',
        },
      },
      sunset: {
        name: 'Gün Batımı',
        light: {
          colors: {
            primary: '#f97316',
            secondary: '#737373',
            accent: '#ea580c',
            background: '#fffbf5',
            text: '#431407',
            'text-light': '#9a3412',
            'text-dark': '#7c2d12',
            border: '#fed7aa',
            'border-light': '#ffedd5',
            'border-dark': '#fdba74',
          },
          borderWidth: '2px',
          borderRadius: '1rem',
        },
        dark: {
          colors: {
            primary: '#fb923c',
            secondary: '#a3a3a3',
            accent: '#f97316',
            background: '#431407',
            text: '#fff7ed',
            'text-light': '#fed7aa',
            'text-dark': '#ffedd5',
            border: '#9a3412',
            'border-light': '#ea580c',
            'border-dark': '#7c2d12',
          },
          borderWidth: '2px',
          borderRadius: '1rem',
        },
      },
      purple: {
        name: 'Mor Esinti',
        light: {
          colors: {
            primary: '#8b5cf6',
            secondary: '#64748b',
            accent: '#7c3aed',
            background: '#faf5ff',
            text: '#2e1065',
            'text-light': '#5b21b6',
            'text-dark': '#4c1d95',
            border: '#e9d5ff',
            'border-light': '#f3e8ff',
            'border-dark': '#d8b4fe',
          },
          borderWidth: '1px',
          borderRadius: '0.75rem',
        },
        dark: {
          colors: {
            primary: '#a78bfa',
            secondary: '#94a3b8',
            accent: '#8b5cf6',
            background: '#2e1065',
            text: '#faf5ff',
            'text-light': '#e9d5ff',
            'text-dark': '#f3e8ff',
            border: '#5b21b6',
            'border-light': '#6d28d9',
            'border-dark': '#4c1d95',
          },
          borderWidth: '1px',
          borderRadius: '0.75rem',
        },
      },
      minimal: {
        name: 'Minimalist',
        light: {
          colors: {
            primary: '#18181b',
            secondary: '#71717a',
            accent: '#27272a',
            background: '#fafafa',
            text: '#18181b',
            'text-light': '#52525b',
            'text-dark': '#27272a',
            border: '#e4e4e7',
            'border-light': '#f4f4f5',
            'border-dark': '#d4d4d8',
          },
          borderWidth: '1px',
          borderRadius: '0rem',
        },
        dark: {
          colors: {
            primary: '#e4e4e7',
            secondary: '#a1a1aa',
            accent: '#d4d4d8',
            background: '#18181b',
            text: '#fafafa',
            'text-light': '#e4e4e7',
            'text-dark': '#f4f4f5',
            border: '#27272a',
            'border-light': '#3f3f46',
            'border-dark': '#18181b',
          },
          borderWidth: '1px',
          borderRadius: '0rem',
        },
      },
    },
    themes: {
      light: {
        fontFamily: 'Figtree',
        colors: {
          primary: '#0ea5e9',
          secondary: '#64748b',
          accent: '#0284c7',
          background: '#ffffff',
          text: '#0f172a',
          'text-light': '#475569',
          'text-dark': '#1e293b',
          border: '#e2e8f0',
          'border-light': '#f1f5f9',
          'border-dark': '#cbd5e1',
          // Primary shades
          'primary-50': '#f0f9ff',
          'primary-100': '#e0f2fe',
          'primary-200': '#bae6fd',
          'primary-300': '#7dd3fc',
          'primary-400': '#38bdf8',
          'primary-500': '#0ea5e9',
          'primary-600': '#0284c7',
          'primary-700': '#0369a1',
          'primary-800': '#075985',
          'primary-900': '#0c4a6e',
          // Sidebar
          'sidebar-light': '#ffffff',
          sidebar: '#f8fafc',
          'sidebar-dark': '#f1f5f9',
          // Other colors...
        },
        borderWidth: '1px',
        borderRadius: '0.375rem', // 6px
        backgroundImage: 'none',
      },
      dark: {
        fontFamily: 'Figtree',
        colors: {
          primary: '#38bdf8',
          secondary: '#94a3b8',
          accent: '#0ea5e9',
          background: '#0f172a',
          text: '#f8fafc',
          'text-light': '#e2e8f0',
          'text-dark': '#cbd5e1',
          border: '#1e293b',
          'border-light': '#334155',
          'border-dark': '#0f172a',
          // Primary shades (darker version)
          'primary-50': '#082f49',
          'primary-100': '#0c4a6e',
          'primary-200': '#075985',
          'primary-300': '#0369a1',
          'primary-400': '#0284c7',
          'primary-500': '#0ea5e9',
          'primary-600': '#38bdf8',
          'primary-700': '#7dd3fc',
          'primary-800': '#bae6fd',
          'primary-900': '#e0f2fe',
          // Sidebar
          'sidebar-light': '#1e293b',
          sidebar: '#0f172a',
          'sidebar-dark': '#020617',
          // Other colors...
        },
        borderWidth: '1px',
        borderRadius: '0.375rem', // 6px
        backgroundImage: 'none',
      },
      // Diğer temalar buraya eklenebilir
    },
  }),

  actions: {
    setTheme(themeName) {
      if (this.themes[themeName]) {
        this.currentTheme = themeName;
        this.applyTheme();
      }
    },

    applyTheme() {
      const theme = this.themes[this.currentTheme];

      // Font family'i ayarla
      document.documentElement.style.setProperty('--font-family', theme.fontFamily);

      // Renkleri ayarla
      Object.entries(theme.colors).forEach(([key, value]) => {
        document.documentElement.style.setProperty(`--color-${key}`, value);
      });

      // Border özelliklerini ayarla
      document.documentElement.style.setProperty('--border-width', theme.borderWidth);
      document.documentElement.style.setProperty('--border-radius', theme.borderRadius);

      // Arka plan resmini ayarla
      document.documentElement.style.setProperty('--background-image', theme.backgroundImage);
    },

    updateThemeProperty(themeName, path, value) {
      // Örnek: updateThemeProperty('light', 'colors.primary', '#ff0000')
      const theme = this.themes[themeName];
      const parts = path.split('.');
      let current = theme;

      for (let i = 0; i < parts.length - 1; i++) {
        current = current[parts[i]];
      }

      current[parts[parts.length - 1]] = value;

      if (themeName === this.currentTheme) {
        this.applyTheme();
      }
    },

    applyPalette(paletteName) {
      const palette = this.palettes[paletteName];
      if (!palette) return;

      // Mevcut tema moduna göre (light/dark) paleti seç
      const paletteTheme = palette[this.currentTheme];
      if (!paletteTheme) return;

      // Mevcut temanın diğer özelliklerini koru
      const currentTheme = this.themes[this.currentTheme];

      // Renkleri güncelle
      Object.entries(paletteTheme.colors).forEach(([key, value]) => {
        // Border renkleri için özel işlem
        if (key === 'border-light' || key === 'border-dark') {
          // Light modda sadece border-light, dark modda sadece border-dark aktif olsun
          if (
            (this.currentTheme === 'light' && key === 'border-light') ||
            (this.currentTheme === 'dark' && key === 'border-dark')
          ) {
            currentTheme.colors[key] = value;
          }
        } else {
          currentTheme.colors[key] = value;
        }

        // Primary shades'i otomatik oluştur
        if (key === 'primary') {
          const hsl = this.hexToHSL(value);
          const isLight = this.currentTheme === 'light';
          for (let i = 1; i <= 9; i++) {
            // Dark mode için renk tonlarını ters çevir
            const lightness = isLight ? 95 - i * 10 : 5 + i * 10;
            currentTheme.colors[`primary-${i}00`] = this.HSLToHex(hsl.h, hsl.s, lightness);
          }
        }
      });

      // Border özelliklerini güncelle
      currentTheme.borderWidth = paletteTheme.borderWidth;
      currentTheme.borderRadius = paletteTheme.borderRadius;

      this.applyTheme();
    },

    // Renk dönüşüm yardımcıları
    hexToHSL(hex) {
      let r = parseInt(hex.slice(1, 3), 16) / 255;
      let g = parseInt(hex.slice(3, 5), 16) / 255;
      let b = parseInt(hex.slice(5, 7), 16) / 255;

      let max = Math.max(r, g, b),
        min = Math.min(r, g, b);
      let h,
        s,
        l = (max + min) / 2;

      if (max === min) {
        h = s = 0;
      } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
      }

      return { h: h * 360, s: s * 100, l: l * 100 };
    },

    HSLToHex(h, s, l) {
      s /= 100;
      l /= 100;
      const k = (n) => (n + h / 30) % 12;
      const a = s * Math.min(l, 1 - l);
      const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
      return `#${[4]
        .map((n) =>
          Math.round(f(n) * 255)
            .toString(16)
            .padStart(2, '0')
        )
        .join('')}`;
    },
  },
});
