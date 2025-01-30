import { ref, computed, watch, mergeProps, unref, useSSRContext, defineComponent, withCtx, createVNode } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrRenderStyle, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$2 } from "./AuthenticatedLayout-gT3gmpV_.js";
import { Head } from "@inertiajs/vue3";
import { defineStore } from "pinia";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const useThemeStore = defineStore("theme", {
  state: () => ({
    currentTheme: "light",
    palettes: {
      modern: {
        name: "Modern Mavi",
        light: {
          colors: {
            primary: "#0ea5e9",
            secondary: "#64748b",
            accent: "#0284c7",
            background: "#ffffff",
            text: "#0f172a",
            "text-light": "#475569",
            "text-dark": "#1e293b",
            border: "#e2e8f0",
            "border-light": "#f1f5f9",
            "border-dark": "#cbd5e1"
          },
          borderWidth: "0.5px",
          borderRadius: "0.375rem"
        },
        dark: {
          colors: {
            primary: "#38bdf8",
            secondary: "#94a3b8",
            accent: "#0ea5e9",
            background: "#0f172a",
            text: "#f8fafc",
            "text-light": "#e2e8f0",
            "text-dark": "#cbd5e1",
            border: "#1e293b",
            "border-light": "#334155",
            "border-dark": "#0f172a"
          },
          borderWidth: "0.5px",
          borderRadius: "0.375rem"
        }
      },
      nature: {
        name: "Doğal Yeşil",
        light: {
          colors: {
            primary: "#059669",
            secondary: "#64748b",
            accent: "#047857",
            background: "#f8faf8",
            text: "#1a2e1a",
            "text-light": "#374937",
            "text-dark": "#243024",
            border: "#e2e8e2",
            "border-light": "#f1f5f1",
            "border-dark": "#cbd5cb"
          },
          borderWidth: "1px",
          borderRadius: "0.5rem"
        },
        dark: {
          colors: {
            primary: "#10b981",
            secondary: "#94a3b8",
            accent: "#059669",
            background: "#1a271a",
            text: "#f8faf8",
            "text-light": "#d1fae5",
            "text-dark": "#a7f3d0",
            border: "#064e3b",
            "border-light": "#065f46",
            "border-dark": "#064e3b"
          },
          borderWidth: "1px",
          borderRadius: "0.5rem"
        }
      },
      sunset: {
        name: "Gün Batımı",
        light: {
          colors: {
            primary: "#f97316",
            secondary: "#737373",
            accent: "#ea580c",
            background: "#fffbf5",
            text: "#431407",
            "text-light": "#9a3412",
            "text-dark": "#7c2d12",
            border: "#fed7aa",
            "border-light": "#ffedd5",
            "border-dark": "#fdba74"
          },
          borderWidth: "2px",
          borderRadius: "1rem"
        },
        dark: {
          colors: {
            primary: "#fb923c",
            secondary: "#a3a3a3",
            accent: "#f97316",
            background: "#431407",
            text: "#fff7ed",
            "text-light": "#fed7aa",
            "text-dark": "#ffedd5",
            border: "#9a3412",
            "border-light": "#ea580c",
            "border-dark": "#7c2d12"
          },
          borderWidth: "2px",
          borderRadius: "1rem"
        }
      },
      purple: {
        name: "Mor Esinti",
        light: {
          colors: {
            primary: "#8b5cf6",
            secondary: "#64748b",
            accent: "#7c3aed",
            background: "#faf5ff",
            text: "#2e1065",
            "text-light": "#5b21b6",
            "text-dark": "#4c1d95",
            border: "#e9d5ff",
            "border-light": "#f3e8ff",
            "border-dark": "#d8b4fe"
          },
          borderWidth: "1px",
          borderRadius: "0.75rem"
        },
        dark: {
          colors: {
            primary: "#a78bfa",
            secondary: "#94a3b8",
            accent: "#8b5cf6",
            background: "#2e1065",
            text: "#faf5ff",
            "text-light": "#e9d5ff",
            "text-dark": "#f3e8ff",
            border: "#5b21b6",
            "border-light": "#6d28d9",
            "border-dark": "#4c1d95"
          },
          borderWidth: "1px",
          borderRadius: "0.75rem"
        }
      },
      minimal: {
        name: "Minimalist",
        light: {
          colors: {
            primary: "#18181b",
            secondary: "#71717a",
            accent: "#27272a",
            background: "#fafafa",
            text: "#18181b",
            "text-light": "#52525b",
            "text-dark": "#27272a",
            border: "#e4e4e7",
            "border-light": "#f4f4f5",
            "border-dark": "#d4d4d8"
          },
          borderWidth: "1px",
          borderRadius: "0rem"
        },
        dark: {
          colors: {
            primary: "#e4e4e7",
            secondary: "#a1a1aa",
            accent: "#d4d4d8",
            background: "#18181b",
            text: "#fafafa",
            "text-light": "#e4e4e7",
            "text-dark": "#f4f4f5",
            border: "#27272a",
            "border-light": "#3f3f46",
            "border-dark": "#18181b"
          },
          borderWidth: "1px",
          borderRadius: "0rem"
        }
      }
    },
    themes: {
      light: {
        fontFamily: "Figtree",
        colors: {
          primary: "#0ea5e9",
          secondary: "#64748b",
          accent: "#0284c7",
          background: "#ffffff",
          text: "#0f172a",
          "text-light": "#475569",
          "text-dark": "#1e293b",
          border: "#e2e8f0",
          "border-light": "#f1f5f9",
          "border-dark": "#cbd5e1",
          // Primary shades
          "primary-50": "#f0f9ff",
          "primary-100": "#e0f2fe",
          "primary-200": "#bae6fd",
          "primary-300": "#7dd3fc",
          "primary-400": "#38bdf8",
          "primary-500": "#0ea5e9",
          "primary-600": "#0284c7",
          "primary-700": "#0369a1",
          "primary-800": "#075985",
          "primary-900": "#0c4a6e",
          // Sidebar
          "sidebar-light": "#ffffff",
          sidebar: "#f8fafc",
          "sidebar-dark": "#f1f5f9"
          // Other colors...
        },
        borderWidth: "1px",
        borderRadius: "0.375rem",
        // 6px
        backgroundImage: "none"
      },
      dark: {
        fontFamily: "Figtree",
        colors: {
          primary: "#38bdf8",
          secondary: "#94a3b8",
          accent: "#0ea5e9",
          background: "#0f172a",
          text: "#f8fafc",
          "text-light": "#e2e8f0",
          "text-dark": "#cbd5e1",
          border: "#1e293b",
          "border-light": "#334155",
          "border-dark": "#0f172a",
          // Primary shades (darker version)
          "primary-50": "#082f49",
          "primary-100": "#0c4a6e",
          "primary-200": "#075985",
          "primary-300": "#0369a1",
          "primary-400": "#0284c7",
          "primary-500": "#0ea5e9",
          "primary-600": "#38bdf8",
          "primary-700": "#7dd3fc",
          "primary-800": "#bae6fd",
          "primary-900": "#e0f2fe",
          // Sidebar
          "sidebar-light": "#1e293b",
          sidebar: "#0f172a",
          "sidebar-dark": "#020617"
          // Other colors...
        },
        borderWidth: "1px",
        borderRadius: "0.375rem",
        // 6px
        backgroundImage: "none"
      }
      // Diğer temalar buraya eklenebilir
    }
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
      document.documentElement.style.setProperty("--font-family", theme.fontFamily);
      Object.entries(theme.colors).forEach(([key, value]) => {
        document.documentElement.style.setProperty(`--color-${key}`, value);
      });
      document.documentElement.style.setProperty("--border-width", theme.borderWidth);
      document.documentElement.style.setProperty("--border-radius", theme.borderRadius);
      document.documentElement.style.setProperty("--background-image", theme.backgroundImage);
    },
    updateThemeProperty(themeName, path, value) {
      const theme = this.themes[themeName];
      const parts = path.split(".");
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
      const paletteTheme = palette[this.currentTheme];
      if (!paletteTheme) return;
      const currentTheme = this.themes[this.currentTheme];
      Object.entries(paletteTheme.colors).forEach(([key, value]) => {
        if (key === "border-light" || key === "border-dark") {
          if (this.currentTheme === "light" && key === "border-light" || this.currentTheme === "dark" && key === "border-dark") {
            currentTheme.colors[key] = value;
          }
        } else {
          currentTheme.colors[key] = value;
        }
        if (key === "primary") {
          const hsl = this.hexToHSL(value);
          const isLight = this.currentTheme === "light";
          for (let i = 1; i <= 9; i++) {
            const lightness = isLight ? 95 - i * 10 : 5 + i * 10;
            currentTheme.colors[`primary-${i}00`] = this.HSLToHex(hsl.h, hsl.s, lightness);
          }
        }
      });
      currentTheme.borderWidth = paletteTheme.borderWidth;
      currentTheme.borderRadius = paletteTheme.borderRadius;
      this.applyTheme();
    },
    // Renk dönüşüm yardımcıları
    hexToHSL(hex) {
      let r = parseInt(hex.slice(1, 3), 16) / 255;
      let g = parseInt(hex.slice(3, 5), 16) / 255;
      let b = parseInt(hex.slice(5, 7), 16) / 255;
      let max = Math.max(r, g, b), min = Math.min(r, g, b);
      let h, s, l = (max + min) / 2;
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
      return `#${[4].map(
        (n) => Math.round(f(n) * 255).toString(16).padStart(2, "0")
      ).join("")}`;
    }
  }
});
const _sfc_main$1 = {
  __name: "ThemeCustomizer",
  __ssrInlineRender: true,
  setup(__props) {
    const themeStore = useThemeStore();
    console.log(themeStore);
    const selectedTheme = ref(themeStore.currentTheme);
    const themes = computed(() => themeStore.themes);
    const currentPalette = ref("modern");
    const isHovered = ref({});
    Object.keys(themeStore.palettes).forEach((name) => {
      isHovered.value[name] = false;
    });
    const currentFont = ref(themes.value[selectedTheme.value].fontFamily);
    const backgroundImage = ref(themes.value[selectedTheme.value].backgroundImage);
    const borderWidth = ref(themes.value[selectedTheme.value].borderWidth);
    const borderRadius = ref(themes.value[selectedTheme.value].borderRadius);
    watch(selectedTheme, (newTheme) => {
      themeStore.setTheme(newTheme);
      currentFont.value = themes.value[newTheme].fontFamily;
      backgroundImage.value = themes.value[newTheme].backgroundImage;
      borderWidth.value = themes.value[newTheme].borderWidth;
      borderRadius.value = themes.value[newTheme].borderRadius;
    });
    const formatLabel = (text) => {
      return text.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "rounded-lg bg-theme-background p-4 shadow-medium" }, _attrs))} data-v-18a3c4ba><h2 class="mb-4 text-xl font-semibold text-theme-text" data-v-18a3c4ba>Tema Özelleştirici</h2><div class="mb-6" data-v-18a3c4ba><h3 class="mb-3 text-lg font-medium text-theme-text" data-v-18a3c4ba>Hazır Paletler</h3><div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5" data-v-18a3c4ba><!--[-->`);
      ssrRenderList(unref(themeStore).palettes, (palette, name) => {
        _push(`<button class="${ssrRenderClass([{
          "border-primary-500": currentPalette.value === name,
          "border-theme": currentPalette.value !== name
        }, "group flex flex-col items-center rounded-lg border p-3 transition-all hover:shadow-medium"])}" data-v-18a3c4ba><div class="relative mb-2 w-full" data-v-18a3c4ba><div class="${ssrRenderClass([{ "opacity-0": selectedTheme.value === "dark" && isHovered.value[name] }, "flex w-full space-x-1 transition-opacity duration-200"])}" data-v-18a3c4ba><!--[-->`);
        ssrRenderList(["primary", "secondary", "accent"], (color) => {
          _push(`<div class="h-4 flex-1 rounded-sm" style="${ssrRenderStyle({ backgroundColor: palette.light.colors[color] })}" data-v-18a3c4ba></div>`);
        });
        _push(`<!--]--></div><div class="${ssrRenderClass([{ "opacity-0": selectedTheme.value === "light" && !isHovered.value[name] }, "absolute inset-0 flex w-full space-x-1 transition-opacity duration-200"])}" data-v-18a3c4ba><!--[-->`);
        ssrRenderList(["primary", "secondary", "accent"], (color) => {
          _push(`<div class="h-4 flex-1 rounded-sm" style="${ssrRenderStyle({ backgroundColor: palette.dark.colors[color] })}" data-v-18a3c4ba></div>`);
        });
        _push(`<!--]--></div></div><span class="text-sm text-theme-text" data-v-18a3c4ba>${ssrInterpolate(palette.name)}</span><span class="mt-1 text-xs text-theme-text-light" data-v-18a3c4ba>${ssrInterpolate(selectedTheme.value === "light" ? "Aydınlık" : "Karanlık")} Mod </span></button>`);
      });
      _push(`<!--]--></div></div><div class="mb-6" data-v-18a3c4ba><label class="mb-2 block text-theme-text-light" data-v-18a3c4ba>Tema Modu</label><div class="flex space-x-4" data-v-18a3c4ba><button class="${ssrRenderClass([{
        "border-primary-500 bg-primary-50": selectedTheme.value === "light",
        "border-theme": selectedTheme.value !== "light"
      }, "flex-1 rounded-md border p-2 transition-all"])}" data-v-18a3c4ba><span class="text-sm" data-v-18a3c4ba>Aydınlık</span></button><button class="${ssrRenderClass([{
        "border-primary-500 bg-primary-50": selectedTheme.value === "dark",
        "border-theme": selectedTheme.value !== "dark"
      }, "flex-1 rounded-md border p-2 transition-all"])}" data-v-18a3c4ba><span class="text-sm" data-v-18a3c4ba>Karanlık</span></button></div></div><div class="mb-6" data-v-18a3c4ba><label class="mb-2 block text-theme-text-light" data-v-18a3c4ba>Tema</label><select class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50" data-v-18a3c4ba><!--[-->`);
      ssrRenderList(themes.value, (_, name) => {
        _push(`<option${ssrRenderAttr("value", name)} data-v-18a3c4ba>${ssrInterpolate(name.charAt(0).toUpperCase() + name.slice(1))}</option>`);
      });
      _push(`<!--]--></select></div><div class="mb-6" data-v-18a3c4ba><label class="mb-2 block text-theme-text-light" data-v-18a3c4ba>Font Ailesi</label><select class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50" data-v-18a3c4ba><option value="Figtree" data-v-18a3c4ba${ssrIncludeBooleanAttr(Array.isArray(currentFont.value) ? ssrLooseContain(currentFont.value, "Figtree") : ssrLooseEqual(currentFont.value, "Figtree")) ? " selected" : ""}>Figtree</option><option value="Inter" data-v-18a3c4ba${ssrIncludeBooleanAttr(Array.isArray(currentFont.value) ? ssrLooseContain(currentFont.value, "Inter") : ssrLooseEqual(currentFont.value, "Inter")) ? " selected" : ""}>Inter</option><option value="Roboto" data-v-18a3c4ba${ssrIncludeBooleanAttr(Array.isArray(currentFont.value) ? ssrLooseContain(currentFont.value, "Roboto") : ssrLooseEqual(currentFont.value, "Roboto")) ? " selected" : ""}>Roboto</option><option value="Open Sans" data-v-18a3c4ba${ssrIncludeBooleanAttr(Array.isArray(currentFont.value) ? ssrLooseContain(currentFont.value, "Open Sans") : ssrLooseEqual(currentFont.value, "Open Sans")) ? " selected" : ""}>Open Sans</option></select></div><div class="mb-6" data-v-18a3c4ba><h3 class="mb-3 text-lg font-medium text-theme-text" data-v-18a3c4ba>Ana Renkler</h3><div class="space-y-4" data-v-18a3c4ba><!--[-->`);
      ssrRenderList(["primary", "secondary", "accent"], (color) => {
        _push(`<div class="flex items-center" data-v-18a3c4ba><label class="block w-1/3 text-theme-text-light" data-v-18a3c4ba>${ssrInterpolate(color.charAt(0).toUpperCase() + color.slice(1))}</label><input type="color"${ssrRenderAttr("value", themes.value[selectedTheme.value].colors[color])} class="h-8 w-20 rounded-md border-gray-300 shadow-sm" data-v-18a3c4ba></div>`);
      });
      _push(`<!--]--></div></div><div class="mb-6" data-v-18a3c4ba><h3 class="mb-3 text-lg font-medium text-theme-text" data-v-18a3c4ba>Metin Renkleri</h3><div class="space-y-4" data-v-18a3c4ba><!--[-->`);
      ssrRenderList(["text", "text-light", "text-dark"], (textColor) => {
        _push(`<div class="flex items-center" data-v-18a3c4ba><label class="block w-1/3 text-theme-text-light" data-v-18a3c4ba>${ssrInterpolate(formatLabel(textColor))}</label><input type="color"${ssrRenderAttr("value", themes.value[selectedTheme.value].colors[textColor])} class="h-8 w-20 rounded-md border-gray-300 shadow-sm" data-v-18a3c4ba></div>`);
      });
      _push(`<!--]--></div></div><div class="mb-6" data-v-18a3c4ba><h3 class="mb-3 text-lg font-medium text-theme-text" data-v-18a3c4ba>Arka Plan</h3><div class="space-y-4" data-v-18a3c4ba><div class="flex items-center" data-v-18a3c4ba><label class="block w-1/3 text-theme-text-light" data-v-18a3c4ba>Renk</label><input type="color"${ssrRenderAttr("value", themes.value[selectedTheme.value].colors.background)} class="h-8 w-20 rounded-md border-gray-300 shadow-sm" data-v-18a3c4ba></div><div class="flex items-center" data-v-18a3c4ba><label class="block w-1/3 text-theme-text-light" data-v-18a3c4ba>Arka Plan Resmi</label><input type="text"${ssrRenderAttr("value", backgroundImage.value)} placeholder="URL veya &#39;none&#39;" class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50" data-v-18a3c4ba></div></div></div><div class="mb-6" data-v-18a3c4ba><h3 class="mb-3 text-lg font-medium text-theme-text" data-v-18a3c4ba>Kenarlık Özellikleri</h3><div class="mb-4" data-v-18a3c4ba><label class="mb-2 block text-sm text-theme-text-light" data-v-18a3c4ba> Köşe Yuvarlaklığı Önizleme </label><div class="grid grid-cols-2 gap-4 sm:grid-cols-3" data-v-18a3c4ba><div class="flex flex-col items-center" data-v-18a3c4ba><div class="mb-2 h-16 w-16 border-2 transition-all duration-200" style="${ssrRenderStyle({
        borderRadius: borderRadius.value,
        borderColor: selectedTheme.value === "dark" ? themes.value[selectedTheme.value].colors["border-dark"] : themes.value[selectedTheme.value].colors["border-light"],
        backgroundColor: themes.value[selectedTheme.value].colors.background
      })}" data-v-18a3c4ba></div><span class="text-xs text-theme-text-light" data-v-18a3c4ba>Kare</span></div><div class="flex flex-col items-center" data-v-18a3c4ba><div class="mb-2 h-16 w-32 border-2 transition-all duration-200" style="${ssrRenderStyle({
        borderRadius: borderRadius.value,
        borderColor: selectedTheme.value === "dark" ? themes.value[selectedTheme.value].colors["border-dark"] : themes.value[selectedTheme.value].colors["border-light"],
        backgroundColor: themes.value[selectedTheme.value].colors.background
      })}" data-v-18a3c4ba></div><span class="text-xs text-theme-text-light" data-v-18a3c4ba>Dikdörtgen</span></div><div class="flex flex-col items-center" data-v-18a3c4ba><button class="mb-2 border-2 px-4 py-2 text-sm transition-all duration-200 hover:bg-primary-50" style="${ssrRenderStyle({
        borderRadius: borderRadius.value,
        borderColor: selectedTheme.value === "dark" ? themes.value[selectedTheme.value].colors["border-dark"] : themes.value[selectedTheme.value].colors["border-light"],
        backgroundColor: themes.value[selectedTheme.value].colors.background,
        color: themes.value[selectedTheme.value].colors.text
      })}" data-v-18a3c4ba> Buton </button><span class="text-xs text-theme-text-light" data-v-18a3c4ba>Buton</span></div></div></div><div class="space-y-4" data-v-18a3c4ba><div class="space-y-4" data-v-18a3c4ba><!--[-->`);
      ssrRenderList(["border", "border-light", "border-dark"], (borderType) => {
        _push(`<div class="flex items-center" data-v-18a3c4ba><label class="block w-1/3 text-theme-text-light" data-v-18a3c4ba>${ssrInterpolate(formatLabel(borderType))}</label><input type="color"${ssrRenderAttr("value", themes.value[selectedTheme.value].colors[borderType])} class="h-8 w-20 rounded-md border-gray-300 shadow-sm" data-v-18a3c4ba></div>`);
      });
      _push(`<!--]--></div><div class="flex items-center" data-v-18a3c4ba><label class="block w-1/3 text-theme-text-light" data-v-18a3c4ba>Kenarlık Kalınlığı</label><select class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50" data-v-18a3c4ba><option value="0px" data-v-18a3c4ba${ssrIncludeBooleanAttr(Array.isArray(borderWidth.value) ? ssrLooseContain(borderWidth.value, "0px") : ssrLooseEqual(borderWidth.value, "0px")) ? " selected" : ""}>Yok</option><option value="1px" data-v-18a3c4ba${ssrIncludeBooleanAttr(Array.isArray(borderWidth.value) ? ssrLooseContain(borderWidth.value, "1px") : ssrLooseEqual(borderWidth.value, "1px")) ? " selected" : ""}>İnce (1px)</option><option value="2px" data-v-18a3c4ba${ssrIncludeBooleanAttr(Array.isArray(borderWidth.value) ? ssrLooseContain(borderWidth.value, "2px") : ssrLooseEqual(borderWidth.value, "2px")) ? " selected" : ""}>Orta (2px)</option><option value="3px" data-v-18a3c4ba${ssrIncludeBooleanAttr(Array.isArray(borderWidth.value) ? ssrLooseContain(borderWidth.value, "3px") : ssrLooseEqual(borderWidth.value, "3px")) ? " selected" : ""}>Kalın (3px)</option></select></div><div class="space-y-2" data-v-18a3c4ba><div class="flex items-center" data-v-18a3c4ba><label class="block w-1/3 text-theme-text-light" data-v-18a3c4ba>Köşe Yuvarlaklığı</label><select class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50" data-v-18a3c4ba><option value="0" data-v-18a3c4ba${ssrIncludeBooleanAttr(Array.isArray(borderRadius.value) ? ssrLooseContain(borderRadius.value, "0") : ssrLooseEqual(borderRadius.value, "0")) ? " selected" : ""}>Köşeli (0px)</option><option value="0.25rem" data-v-18a3c4ba${ssrIncludeBooleanAttr(Array.isArray(borderRadius.value) ? ssrLooseContain(borderRadius.value, "0.25rem") : ssrLooseEqual(borderRadius.value, "0.25rem")) ? " selected" : ""}>Çok Az (4px)</option><option value="0.375rem" data-v-18a3c4ba${ssrIncludeBooleanAttr(Array.isArray(borderRadius.value) ? ssrLooseContain(borderRadius.value, "0.375rem") : ssrLooseEqual(borderRadius.value, "0.375rem")) ? " selected" : ""}>Az (6px)</option><option value="0.5rem" data-v-18a3c4ba${ssrIncludeBooleanAttr(Array.isArray(borderRadius.value) ? ssrLooseContain(borderRadius.value, "0.5rem") : ssrLooseEqual(borderRadius.value, "0.5rem")) ? " selected" : ""}>Orta (8px)</option><option value="0.75rem" data-v-18a3c4ba${ssrIncludeBooleanAttr(Array.isArray(borderRadius.value) ? ssrLooseContain(borderRadius.value, "0.75rem") : ssrLooseEqual(borderRadius.value, "0.75rem")) ? " selected" : ""}>Fazla (12px)</option><option value="1rem" data-v-18a3c4ba${ssrIncludeBooleanAttr(Array.isArray(borderRadius.value) ? ssrLooseContain(borderRadius.value, "1rem") : ssrLooseEqual(borderRadius.value, "1rem")) ? " selected" : ""}>Çok Fazla (16px)</option><option value="9999px" data-v-18a3c4ba${ssrIncludeBooleanAttr(Array.isArray(borderRadius.value) ? ssrLooseContain(borderRadius.value, "9999px") : ssrLooseEqual(borderRadius.value, "9999px")) ? " selected" : ""}>Tam Yuvarlak</option></select></div><div class="flex justify-end" data-v-18a3c4ba><span class="text-xs text-theme-text-light" data-v-18a3c4ba> Seçili değer: ${ssrInterpolate(borderRadius.value === "9999px" ? "Tam Yuvarlak" : borderRadius.value)}</span></div></div></div></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ThemeCustomizer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ThemeCustomizer = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-18a3c4ba"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Dashboard - " }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200"${_scopeId}>Dashboard</h2>`);
          } else {
            return [
              createVNode("h2", { class: "text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200" }, "Dashboard")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="mx-auto max-w-7xl sm:px-6 lg:px-8"${_scopeId}><div class="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800"${_scopeId}><div class="p-6 text-gray-900 dark:text-gray-100"${_scopeId}>You&#39;re logged in!</div>`);
            _push2(ssrRenderComponent(ThemeCustomizer, null, null, _parent2, _scopeId));
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "mx-auto max-w-7xl sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800" }, [
                    createVNode("div", { class: "p-6 text-gray-900 dark:text-gray-100" }, "You're logged in!"),
                    createVNode(ThemeCustomizer)
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
