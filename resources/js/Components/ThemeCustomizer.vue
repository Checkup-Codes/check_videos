<template>
  <div class="rounded-lg bg-theme-background p-4 shadow-medium">
    <h2 class="mb-4 text-xl font-semibold text-theme-text">Tema Özelleştirici</h2>

    <!-- Renk Paletleri (Hazır Paletler) -->
    <div class="mb-6">
      <h3 class="mb-3 text-lg font-medium text-theme-text">Hazır Paletler</h3>
      <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        <button
          v-for="(palette, name) in themeStore.palettes"
          :key="name"
          @click="applyPalette(name)"
          class="group flex flex-col items-center rounded-lg border p-3 transition-all hover:shadow-medium"
          :class="{
            'border-primary-500': currentPalette === name,
            'border-theme': currentPalette !== name,
          }"
          @mouseenter="isHovered[name] = true"
          @mouseleave="isHovered[name] = false"
        >
          <!-- Palet Renk Önizlemesi -->
          <div class="relative mb-2 w-full">
            <!-- Light Mode Preview -->
            <div
              class="flex w-full space-x-1 transition-opacity duration-200"
              :class="{ 'opacity-0': selectedTheme === 'dark' && isHovered[name] }"
            >
              <div
                v-for="color in ['primary', 'secondary', 'accent']"
                :key="color"
                class="h-4 flex-1 rounded-sm"
                :style="{ backgroundColor: palette.light.colors[color] }"
              ></div>
            </div>

            <!-- Dark Mode Preview -->
            <div
              class="absolute inset-0 flex w-full space-x-1 transition-opacity duration-200"
              :class="{ 'opacity-0': selectedTheme === 'light' && !isHovered[name] }"
            >
              <div
                v-for="color in ['primary', 'secondary', 'accent']"
                :key="color"
                class="h-4 flex-1 rounded-sm"
                :style="{ backgroundColor: palette.dark.colors[color] }"
              ></div>
            </div>
          </div>
          <span class="text-sm text-theme-text">{{ palette.name }}</span>
          <!-- Mode Indicator -->
          <span class="mt-1 text-xs text-theme-text-light">
            {{ selectedTheme === 'light' ? 'Aydınlık' : 'Karanlık' }} Mod
          </span>
        </button>
      </div>
    </div>

    <!-- Tema Modu Seçici (Light / Dark) -->
    <div class="mb-6">
      <label class="mb-2 block text-theme-text-light">Tema Modu</label>
      <div class="flex space-x-4">
        <button
          @click="setThemeMode('light')"
          class="flex-1 rounded-md border p-2 transition-all"
          :class="{
            'border-primary-500 bg-primary-50': selectedTheme === 'light',
            'border-theme': selectedTheme !== 'light',
          }"
        >
          <span class="text-sm">Aydınlık</span>
        </button>
        <button
          @click="setThemeMode('dark')"
          class="flex-1 rounded-md border p-2 transition-all"
          :class="{
            'border-primary-500 bg-primary-50': selectedTheme === 'dark',
            'border-theme': selectedTheme !== 'dark',
          }"
        >
          <span class="text-sm">Karanlık</span>
        </button>
      </div>
    </div>

    <!-- Tema Seçici -->
    <div class="mb-6">
      <label class="mb-2 block text-theme-text-light">Tema</label>
      <select
        v-model="selectedTheme"
        class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
      >
        <option v-for="(_, name) in themes" :key="name" :value="name">
          {{ name.charAt(0).toUpperCase() + name.slice(1) }}
        </option>
      </select>
    </div>

    <!-- Font Ailesi -->
    <div class="mb-6">
      <label class="mb-2 block text-theme-text-light">Font Ailesi</label>
      <select
        v-model="currentFont"
        @change="updateFont"
        class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
      >
        <option value="Figtree">Figtree</option>
        <option value="Inter">Inter</option>
        <option value="Roboto">Roboto</option>
        <option value="Open Sans">Open Sans</option>
      </select>
    </div>

    <!-- Ana Renkler (primary, secondary, accent) -->
    <div class="mb-6">
      <h3 class="mb-3 text-lg font-medium text-theme-text">Ana Renkler</h3>
      <div class="space-y-4">
        <div v-for="color in ['primary', 'secondary', 'accent']" :key="color" class="flex items-center">
          <label class="block w-1/3 text-theme-text-light">
            {{ color.charAt(0).toUpperCase() + color.slice(1) }}
          </label>
          <input
            type="color"
            :value="themes[selectedTheme].colors[color]"
            @input="(e) => updateColor(color, e.target.value)"
            class="h-8 w-20 rounded-md border-gray-300 shadow-sm"
          />
        </div>
      </div>
    </div>

    <!-- Metin Renkleri (text, text-light, text-dark) -->
    <div class="mb-6">
      <h3 class="mb-3 text-lg font-medium text-theme-text">Metin Renkleri</h3>
      <div class="space-y-4">
        <div v-for="textColor in ['text', 'text-light', 'text-dark']" :key="textColor" class="flex items-center">
          <label class="block w-1/3 text-theme-text-light">
            {{ formatLabel(textColor) }}
          </label>
          <input
            type="color"
            :value="themes[selectedTheme].colors[textColor]"
            @input="(e) => updateColor(textColor, e.target.value)"
            class="h-8 w-20 rounded-md border-gray-300 shadow-sm"
          />
        </div>
      </div>
    </div>

    <!-- Arka Plan (light/dark, resim) -->
    <div class="mb-6">
      <h3 class="mb-3 text-lg font-medium text-theme-text">Arka Plan</h3>
      <div class="space-y-4">
        <div class="flex items-center">
          <label class="block w-1/3 text-theme-text-light">Renk</label>
          <input
            type="color"
            :value="themes[selectedTheme].colors.background"
            @input="(e) => updateColor('background', e.target.value)"
            class="h-8 w-20 rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div class="flex items-center">
          <label class="block w-1/3 text-theme-text-light">Arka Plan Resmi</label>
          <input
            type="text"
            v-model="backgroundImage"
            @change="updateBackgroundImage"
            placeholder="URL veya 'none'"
            class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
          />
        </div>
      </div>
    </div>

    <!-- Border Özellikleri (light/dark uyumlu) -->
    <div class="mb-6">
      <h3 class="mb-3 text-lg font-medium text-theme-text">Kenarlık Özellikleri</h3>

      <!-- Border Radius Preview (Dinamik renk) -->
      <div class="mb-4">
        <label class="mb-2 block text-sm text-theme-text-light"> Köşe Yuvarlaklığı Önizleme </label>
        <div class="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <!-- Kare Preview -->
          <div class="flex flex-col items-center">
            <div
              class="mb-2 h-16 w-16 border-2 transition-all duration-200"
              :style="{
                borderRadius: borderRadius,
                borderColor:
                  selectedTheme === 'dark'
                    ? themes[selectedTheme].colors['border-dark']
                    : themes[selectedTheme].colors['border-light'],
                backgroundColor: themes[selectedTheme].colors.background,
              }"
            ></div>
            <span class="text-xs text-theme-text-light">Kare</span>
          </div>

          <!-- Dikdörtgen Preview -->
          <div class="flex flex-col items-center">
            <div
              class="mb-2 h-16 w-32 border-2 transition-all duration-200"
              :style="{
                borderRadius: borderRadius,
                borderColor:
                  selectedTheme === 'dark'
                    ? themes[selectedTheme].colors['border-dark']
                    : themes[selectedTheme].colors['border-light'],
                backgroundColor: themes[selectedTheme].colors.background,
              }"
            ></div>
            <span class="text-xs text-theme-text-light">Dikdörtgen</span>
          </div>

          <!-- Buton Preview -->
          <div class="flex flex-col items-center">
            <button
              class="mb-2 border-2 px-4 py-2 text-sm transition-all duration-200 hover:bg-primary-50"
              :style="{
                borderRadius: borderRadius,
                borderColor:
                  selectedTheme === 'dark'
                    ? themes[selectedTheme].colors['border-dark']
                    : themes[selectedTheme].colors['border-light'],
                backgroundColor: themes[selectedTheme].colors.background,
                color: themes[selectedTheme].colors.text,
              }"
            >
              Buton
            </button>
            <span class="text-xs text-theme-text-light">Buton</span>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <!-- Border Colors (border, border-light, border-dark) -->
        <div class="space-y-4">
          <div
            v-for="borderType in ['border', 'border-light', 'border-dark']"
            :key="borderType"
            class="flex items-center"
          >
            <label class="block w-1/3 text-theme-text-light">
              {{ formatLabel(borderType) }}
            </label>
            <input
              type="color"
              :value="themes[selectedTheme].colors[borderType]"
              @input="(e) => updateColor(borderType, e.target.value)"
              class="h-8 w-20 rounded-md border-gray-300 shadow-sm"
            />
          </div>
        </div>

        <!-- Border Width -->
        <div class="flex items-center">
          <label class="block w-1/3 text-theme-text-light">Kenarlık Kalınlığı</label>
          <select
            v-model="borderWidth"
            @change="updateBorderWidth"
            class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
          >
            <option value="0px">Yok</option>
            <option value="1px">İnce (1px)</option>
            <option value="2px">Orta (2px)</option>
            <option value="3px">Kalın (3px)</option>
          </select>
        </div>

        <!-- Border Radius + Seçili Değer -->
        <div class="space-y-2">
          <div class="flex items-center">
            <label class="block w-1/3 text-theme-text-light">Köşe Yuvarlaklığı</label>
            <select
              v-model="borderRadius"
              @change="updateBorderRadius"
              class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
            >
              <option value="0">Köşeli (0px)</option>
              <option value="0.25rem">Çok Az (4px)</option>
              <option value="0.375rem">Az (6px)</option>
              <option value="0.5rem">Orta (8px)</option>
              <option value="0.75rem">Fazla (12px)</option>
              <option value="1rem">Çok Fazla (16px)</option>
              <option value="9999px">Tam Yuvarlak</option>
            </select>
          </div>
          <div class="flex justify-end">
            <span class="text-xs text-theme-text-light">
              Seçili değer:
              {{ borderRadius === '9999px' ? 'Tam Yuvarlak' : borderRadius }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- /Border Özellikleri -->
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useThemeStore } from '@/Stores/themeStore';

const themeStore = useThemeStore();
console.log(themeStore);

const selectedTheme = ref(themeStore.currentTheme); // light veya dark (ya da başka tanımlı bir tema)
const themes = computed(() => themeStore.themes);
const currentPalette = ref('modern'); // Başlangıçta bir paletin seçili olduğunu varsayalım
const isHovered = ref({});

// Palet hover durumlarını yönetmek için
Object.keys(themeStore.palettes).forEach((name) => {
  isHovered.value[name] = false;
});

/**
 * Tema bileşeninde kullanılan reaktif değişkenler.
 */
const currentFont = ref(themes.value[selectedTheme.value].fontFamily);
const backgroundImage = ref(themes.value[selectedTheme.value].backgroundImage);
const borderWidth = ref(themes.value[selectedTheme.value].borderWidth);
const borderRadius = ref(themes.value[selectedTheme.value].borderRadius);

/**
 * Tema Modunu (light/dark) set eder.
 * Palet seçiliyse, paleti de tekrar uygular.
 */
const setThemeMode = (mode) => {
  selectedTheme.value = mode;
  if (currentPalette.value) {
    applyPalette(currentPalette.value);
  }
};

/**
 * Kullanıcı temayı değiştirdiğinde store'a bildirip
 * diğer reaktif değerleri günceller.
 */
watch(selectedTheme, (newTheme) => {
  themeStore.setTheme(newTheme);
  currentFont.value = themes.value[newTheme].fontFamily;
  backgroundImage.value = themes.value[newTheme].backgroundImage;
  borderWidth.value = themes.value[newTheme].borderWidth;
  borderRadius.value = themes.value[newTheme].borderRadius;
});

/**
 * Color picker ile güncellenen renkleri store'a işler.
 */
const updateColor = (colorKey, value) => {
  themeStore.updateThemeProperty(selectedTheme.value, `colors.${colorKey}`, value);
};

/**
 * Seçili font değiştiğinde store'a bildir.
 */
const updateFont = () => {
  themeStore.updateThemeProperty(selectedTheme.value, 'fontFamily', currentFont.value);
};

/**
 * Arka plan resmi değiştiğinde store'a bildir.
 */
const updateBackgroundImage = () => {
  themeStore.updateThemeProperty(selectedTheme.value, 'backgroundImage', backgroundImage.value);
};

/**
 * Kenarlık kalınlığı güncellendiğinde store'a bildir.
 */
const updateBorderWidth = () => {
  themeStore.updateThemeProperty(selectedTheme.value, 'borderWidth', borderWidth.value);
};

/**
 * Köşe yuvarlaklığı güncellendiğinde store'a bildir.
 */
const updateBorderRadius = () => {
  themeStore.updateThemeProperty(selectedTheme.value, 'borderRadius', borderRadius.value);
};

/**
 * Hazır paletlerden birini uygular ve mevcut tema değerlerini günceller.
 */
const applyPalette = (paletteName) => {
  currentPalette.value = paletteName;
  themeStore.applyPalette(paletteName);
  // Paletin uygulanmasıyla birlikte, ilgili tema değerleri de güncellenir
  const theme = themes.value[selectedTheme.value];
  borderWidth.value = theme.borderWidth;
  borderRadius.value = theme.borderRadius;
};

/**
 * "border-light", "border-dark" gibi key'leri
 * daha okunaklı göstermek için küçük bir yardımcı fonksiyon.
 */
const formatLabel = (text) => {
  return text
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
</script>

<style scoped>
/* Örnek olarak ek stil tanımları veya kendi Tailwind yapılandırmanız */
</style>
