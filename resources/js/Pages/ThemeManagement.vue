<template>
  <AuthenticatedLayout>
    <template #header>
      <h2 class="text-xl font-semibold leading-tight text-base-content">Tema Yönetimi</h2>
    </template>

    <div class="py-12">
      <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="overflow-hidden bg-base-200 shadow-sm sm:rounded-lg">
          <div class="p-6 text-base-content">
            <h1 class="mb-8 text-center text-4xl font-bold">Tema Yönetimi</h1>

            <!-- Mevcut Tema Bilgisi -->
            <div class="card mb-8 bg-base-200 p-6">
              <h2 class="mb-4 text-2xl font-semibold">Mevcut Tema</h2>
              <div class="flex items-center gap-4">
                <div class="text-3xl">{{ getThemeIcon(currentTheme) }}</div>
                <div>
                  <h3 class="text-xl font-semibold">{{ getThemeName(currentTheme) }}</h3>
                  <p class="text-base-content/70">{{ getThemeDescription(currentTheme) }}</p>
                </div>
              </div>
            </div>

            <!-- Tema Paletleri -->
            <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <!-- Sol Sütun: Light Temalar -->
              <div class="space-y-4">
                <h3 class="text-center text-xl font-bold text-success">☀️ Light Temalar</h3>
                <div class="space-y-3">
                  <div
                    v-for="theme in lightThemes"
                    :key="theme"
                    class="card cursor-pointer bg-base-200 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    @click="selectTheme(theme)"
                    :class="{ 'ring-2 ring-primary': currentTheme === theme }"
                  >
                    <div class="card-body p-4">
                      <div class="flex items-center gap-3">
                        <div class="text-2xl">{{ getThemeIcon(theme) }}</div>
                        <div class="flex-1">
                          <h4 class="font-semibold">{{ getThemeName(theme) }}</h4>
                          <p class="text-base-content/70 text-xs">{{ getThemeDescription(theme) }}</p>
                        </div>
                        <button
                          @click.stop="changeTheme(theme)"
                          :class="['btn btn-xs', currentTheme === theme ? 'btn-success' : 'btn-success btn-outline']"
                        >
                          {{ currentTheme === theme ? '✓' : 'Seç' }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Orta Sütun: Tema Önizleme -->
              <div class="space-y-4">
                <h3 class="text-center text-xl font-bold">🎨 Tema Önizleme</h3>
                <div class="card bg-base-200 p-4">
                  <div class="mb-4 text-center">
                    <div class="mb-2 text-4xl">{{ getThemeIcon(selectedTheme || currentTheme) }}</div>
                    <h4 class="text-lg font-bold">{{ getThemeName(selectedTheme || currentTheme) }}</h4>
                    <p class="text-base-content/70 text-sm">{{ getThemeDescription(selectedTheme || currentTheme) }}</p>
                  </div>

                  <!-- Renk Paleti Önizleme -->
                  <div class="mb-4">
                    <h5 class="mb-2 text-sm font-semibold">Renk Paleti</h5>
                    <div class="grid grid-cols-5 gap-1">
                      <div
                        v-for="(color, index) in getThemeColors(selectedTheme || currentTheme)"
                        :key="index"
                        class="h-8 w-8 rounded border border-base-300"
                        :style="{ backgroundColor: color }"
                        :title="color"
                      ></div>
                    </div>
                  </div>

                  <!-- Örnek Bileşenler -->
                  <div class="space-y-3">
                    <h5 class="text-sm font-semibold">Örnek Bileşenler</h5>
                    <div class="grid grid-cols-2 gap-2">
                      <button class="btn btn-primary btn-sm">Primary</button>
                      <button class="btn btn-secondary btn-sm">Secondary</button>
                    </div>
                    <div class="card bg-base-100 p-3">
                      <h6 class="text-sm font-semibold">Örnek Card</h6>
                      <p class="text-base-content/70 text-xs">Bu tema ile nasıl görüneceğini gösterir</p>
                    </div>
                    <div class="alert alert-info p-2">
                      <svg class="h-4 w-4 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      <span class="text-xs">Alert örneği</span>
                    </div>
                  </div>

                  <!-- Tema Özellikleri -->
                  <div class="mt-4">
                    <h5 class="mb-2 text-sm font-semibold">Özellikler</h5>
                    <div class="space-y-1">
                      <div
                        v-for="feature in getThemeFeatures(selectedTheme || currentTheme)"
                        :key="feature"
                        class="flex items-center gap-2 text-xs"
                      >
                        <svg class="h-3 w-3 text-success" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        <span>{{ feature }}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Tema Seç Butonu -->
                  <div class="mt-4" v-if="selectedTheme && selectedTheme !== currentTheme">
                    <button @click="changeTheme(selectedTheme)" class="btn btn-primary btn-sm w-full">
                      Bu Temayı Uygula
                    </button>
                  </div>
                </div>
              </div>

              <!-- Sağ Sütun: Dark Temalar -->
              <div class="space-y-4">
                <h3 class="text-center text-xl font-bold text-info">🌙 Dark Temalar</h3>
                <div class="space-y-3">
                  <div
                    v-for="theme in darkThemes"
                    :key="theme"
                    class="card cursor-pointer bg-base-200 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    @click="selectTheme(theme)"
                    :class="{ 'ring-2 ring-primary': currentTheme === theme }"
                  >
                    <div class="card-body p-4">
                      <div class="flex items-center gap-3">
                        <div class="text-2xl">{{ getThemeIcon(theme) }}</div>
                        <div class="flex-1">
                          <h4 class="font-semibold">{{ getThemeName(theme) }}</h4>
                          <p class="text-base-content/70 text-xs">{{ getThemeDescription(theme) }}</p>
                        </div>
                        <button
                          @click.stop="changeTheme(theme)"
                          :class="['btn btn-xs', currentTheme === theme ? 'btn-info' : 'btn-info btn-outline']"
                        >
                          {{ currentTheme === theme ? '✓' : 'Seç' }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Tema Detay Modal -->
            <div v-if="selectedTheme && selectedTheme !== 'custom'" class="modal-open modal">
              <div class="modal-box max-w-4xl">
                <h3 class="mb-4 text-2xl font-bold">
                  {{ getThemeIcon(selectedTheme) }} {{ getThemeName(selectedTheme) }}
                </h3>

                <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <!-- Renk Paleti -->
                  <div>
                    <h4 class="mb-3 text-lg font-semibold">Renk Paleti</h4>
                    <div class="space-y-3">
                      <div
                        v-for="(color, name) in getThemeColorDetails(selectedTheme)"
                        :key="name"
                        class="flex items-center gap-3"
                      >
                        <div
                          class="h-8 w-8 rounded border border-base-300"
                          :style="{ backgroundColor: color.value }"
                        ></div>
                        <div class="flex-1">
                          <div class="font-medium">{{ color.name }}</div>
                          <div class="text-base-content/70 text-sm">{{ color.value }}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Tema Özellikleri -->
                  <div>
                    <h4 class="mb-3 text-lg font-semibold">Özellikler</h4>
                    <div class="space-y-2">
                      <div
                        v-for="feature in getThemeFeatures(selectedTheme)"
                        :key="feature"
                        class="flex items-center gap-2"
                      >
                        <svg class="h-4 w-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        <span>{{ feature }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Örnek Bileşenler -->
                <div class="mt-6">
                  <h4 class="mb-3 text-lg font-semibold">Örnek Bileşenler</h4>
                  <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <button class="btn btn-primary">Primary Button</button>
                    <button class="btn btn-secondary">Secondary Button</button>
                    <button class="btn btn-accent">Accent Button</button>
                  </div>
                  <div class="mt-4">
                    <div class="alert alert-info">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        class="h-6 w-6 shrink-0 stroke-current"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      <span>Bu tema ile uyumlu alert örneği</span>
                    </div>
                  </div>
                </div>

                <div class="modal-action">
                  <button @click="selectedTheme = null" class="btn">Kapat</button>
                  <button
                    @click="changeTheme(selectedTheme)"
                    :class="['btn', currentTheme === selectedTheme ? 'btn-primary' : 'btn-outline']"
                  >
                    {{ currentTheme === selectedTheme ? 'Aktif Tema' : 'Bu Temayı Seç' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Custom Tema Modal -->
        <div v-if="selectedTheme === 'custom'" class="modal-open modal">
          <div class="modal-box max-w-6xl">
            <h3 class="mb-4 text-2xl font-bold">⚙️ Özel Tema Ayarları</h3>

            <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <!-- Renk Ayarları -->
              <div>
                <h4 class="mb-3 text-lg font-semibold">Renk Ayarları</h4>
                <div class="space-y-4">
                  <div>
                    <label class="label">
                      <span class="label-text">Primary Renk</span>
                    </label>
                    <input
                      type="color"
                      v-model="customTheme.primary"
                      class="input-bordered input w-full"
                      @change="updateCustomTheme"
                    />
                  </div>
                  <div>
                    <label class="label">
                      <span class="label-text">Secondary Renk</span>
                    </label>
                    <input
                      type="color"
                      v-model="customTheme.secondary"
                      class="input-bordered input w-full"
                      @change="updateCustomTheme"
                    />
                  </div>
                  <div>
                    <label class="label">
                      <span class="label-text">Accent Renk</span>
                    </label>
                    <input
                      type="color"
                      v-model="customTheme.accent"
                      class="input-bordered input w-full"
                      @change="updateCustomTheme"
                    />
                  </div>
                  <div>
                    <label class="label">
                      <span class="label-text">Neutral Renk</span>
                    </label>
                    <input
                      type="color"
                      v-model="customTheme.neutral"
                      class="input-bordered input w-full"
                      @change="updateCustomTheme"
                    />
                  </div>
                  <div>
                    <label class="label">
                      <span class="label-text">Base 100 Renk</span>
                    </label>
                    <input
                      type="color"
                      v-model="customTheme['base-100']"
                      class="input-bordered input w-full"
                      @change="updateCustomTheme"
                    />
                  </div>
                </div>
              </div>

              <!-- Stil Ayarları -->
              <div>
                <h4 class="mb-3 text-lg font-semibold">Stil Ayarları</h4>
                <div class="space-y-4">
                  <div>
                    <label class="label">
                      <span class="label-text">Border Radius</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="2"
                      step="0.1"
                      v-model="customTheme.borderRadius"
                      class="range range-primary"
                      @input="updateCustomTheme"
                    />
                    <div class="text-base-content/70 text-sm">{{ customTheme.borderRadius }}rem</div>
                  </div>
                  <div>
                    <label class="label">
                      <span class="label-text">Animasyon Hızı</span>
                    </label>
                    <input
                      type="range"
                      min="0.1"
                      max="1"
                      step="0.1"
                      v-model="customTheme.animationSpeed"
                      class="range range-secondary"
                      @input="updateCustomTheme"
                    />
                    <div class="text-base-content/70 text-sm">{{ customTheme.animationSpeed }}s</div>
                  </div>
                  <div>
                    <label class="label">
                      <span class="label-text">Neon Efekt</span>
                    </label>
                    <input
                      type="checkbox"
                      v-model="customTheme.neonEffect"
                      class="toggle toggle-accent"
                      @change="updateCustomTheme"
                    />
                  </div>
                  <div>
                    <label class="label">
                      <span class="label-text">Gölge Efekti</span>
                    </label>
                    <select
                      v-model="customTheme.shadow"
                      class="select-bordered select w-full"
                      @change="updateCustomTheme"
                    >
                      <option value="0 4px 6px -1px rgba(0, 0, 0, 0.1)">Hafif Gölge</option>
                      <option value="0 10px 15px -3px rgba(0, 0, 0, 0.1)">Orta Gölge</option>
                      <option value="0 20px 25px -5px rgba(0, 0, 0, 0.1)">Koyu Gölge</option>
                      <option value="0 0 20px rgba(0, 255, 255, 0.5)">Neon Gölge</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <!-- Önizleme -->
            <div class="mt-6">
              <h4 class="mb-3 text-lg font-semibold">Önizleme</h4>
              <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                <button class="btn btn-primary">Primary Button</button>
                <button class="btn btn-secondary">Secondary Button</button>
                <button class="btn btn-accent">Accent Button</button>
              </div>
              <div class="mt-4">
                <div class="card bg-base-200 p-4">
                  <h5 class="font-semibold">Örnek Card</h5>
                  <p class="text-base-content/70 text-sm">Bu bir örnek card'tır.</p>
                </div>
              </div>
            </div>

            <div class="modal-action">
              <button @click="selectedTheme = null" class="btn">Kapat</button>
              <button @click="changeTheme('custom')" class="btn btn-primary">Bu Temayı Uygula</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';

const store = useStore();
const selectedTheme = ref(null);

const currentTheme = computed(() => store.getters['Theme/getCurrentTheme']);
const availableThemes = computed(() => store.getters['Theme/getAvailableThemes']);
const customTheme = computed(() => store.getters['Theme/getCustomTheme']);

// Light ve dark temaları ayır
const lightThemes = computed(() =>
  availableThemes.value.filter((theme) => theme.includes('-light') || theme === 'light')
);
const darkThemes = computed(() => availableThemes.value.filter((theme) => theme.includes('-dark') || theme === 'dark'));

const changeTheme = (theme) => {
  store.dispatch('Theme/changeTheme', theme);
  selectedTheme.value = null;
};

const selectTheme = (theme) => {
  selectedTheme.value = theme;
};

const showThemeDetails = (theme) => {
  selectedTheme.value = theme;
};

const updateCustomTheme = () => {
  store.dispatch('Theme/updateCustomTheme', customTheme.value);
};

const getThemeIcon = (theme) => {
  const icons = {
    light: '☀️',
    dark: '🌙',
    'neon-light': '💡☀️',
    'neon-dark': '💡🌙',
    'lotr-light': '🧙‍♂️☀️',
    'lotr-dark': '🧙‍♂️🌙',
    'cyberpunk-light': '🤖☀️',
    'cyberpunk-dark': '🤖🌙',
    'nature-light': '🌿☀️',
    'nature-dark': '🌿🌙',
    'ocean-light': '🌊☀️',
    'ocean-dark': '🌊🌙',
    'sunset-light': '🌅☀️',
    'sunset-dark': '🌅🌙',
    custom: '⚙️',
  };
  return icons[theme] || '🎨';
};

const getThemeName = (theme) => {
  const names = {
    light: 'Açık Tema',
    dark: 'Koyu Tema',
    'neon-light': 'Neon Açık',
    'neon-dark': 'Neon Koyu',
    'lotr-light': 'LOTR Açık',
    'lotr-dark': 'LOTR Koyu',
    'cyberpunk-light': 'Cyberpunk Açık',
    'cyberpunk-dark': 'Cyberpunk Koyu',
    'nature-light': 'Doğa Açık',
    'nature-dark': 'Doğa Koyu',
    'ocean-light': 'Okyanus Açık',
    'ocean-dark': 'Okyanus Koyu',
    'sunset-light': 'Gün Batımı Açık',
    'sunset-dark': 'Gün Batımı Koyu',
    custom: 'Özel Tema',
  };
  return names[theme] || theme;
};

const getThemeDescription = (theme) => {
  const descriptions = {
    light: 'Klasik açık tema, günlük kullanım için ideal',
    dark: 'Göz yormayan koyu tema, gece kullanımı için mükemmel',
    'neon-light': 'Neon ışıklar ve parlak renklerle dolu futuristik açık tema',
    'neon-dark': 'Neon ışıklar ve parlak renklerle dolu futuristik koyu tema',
    'lotr-light': "J.R.R. Tolkien'in efsanevi dünyasından ilham alınmış açık tema",
    'lotr-dark': "J.R.R. Tolkien'in efsanevi dünyasından ilham alınmış koyu tema",
    'cyberpunk-light': 'Cyberpunk dünyasından ilham alınmış neon ve açık tema',
    'cyberpunk-dark': 'Cyberpunk dünyasından ilham alınmış neon ve koyu tema',
    'nature-light': 'Doğanın huzur verici yeşil ve kahverengi tonları - açık versiyon',
    'nature-dark': 'Doğanın huzur verici yeşil ve kahverengi tonları - koyu versiyon',
    'ocean-light': 'Okyanusun derinliklerinden ilham alınmış mavi tonlar - açık versiyon',
    'ocean-dark': 'Okyanusun derinliklerinden ilham alınmış mavi tonlar - koyu versiyon',
    'sunset-light': 'Gün batımının sıcak turuncu ve pembe tonları - açık versiyon',
    'sunset-dark': 'Gün batımının sıcak turuncu ve pembe tonları - koyu versiyon',
    custom: 'Kendi renklerinizi ve ayarlarınızı özelleştirin',
  };
  return descriptions[theme] || 'Tema açıklaması';
};

const getThemeColors = (theme) => {
  const colors = {
    light: ['#570df8', '#f000b8', '#37cdbe', '#3d4451', '#ffffff'],
    dark: ['#570df8', '#f000b8', '#37cdbe', '#ffffff', '#1f2937'],
    'neon-light': ['#00ffff', '#ff00ff', '#00ff00', '#e5e5e5', '#ffffff'],
    'neon-dark': ['#00ffff', '#ff00ff', '#00ff00', '#1a1a1a', '#0d0d0d'],
    'lotr-light': ['#d4af37', '#8b4513', '#ffd700', '#2d1810', '#f5f5dc'],
    'lotr-dark': ['#ffd700', '#d4af37', '#8b4513', '#2d1810', '#1a0f0a'],
    'cyberpunk-light': ['#ff0000', '#ffff00', '#0000ff', '#d9d9d9', '#ffffff'],
    'cyberpunk-dark': ['#ff0000', '#ffff00', '#0000ff', '#262626', '#141414'],
    'nature-light': ['#22c55e', '#f97316', '#eab308', '#365314', '#f0fdf4'],
    'nature-dark': ['#22c55e', '#f97316', '#eab308', '#365314', '#0a1f0a'],
    'ocean-light': ['#3b82f6', '#06b6d4', '#1d4ed8', '#1e3a8a', '#f0f9ff'],
    'ocean-dark': ['#3b82f6', '#06b6d4', '#1d4ed8', '#1e3a8a', '#0a0f1a'],
    'sunset-light': ['#fb923c', '#ec4899', '#fbbf24', '#9a3412', '#fff7ed'],
    'sunset-dark': ['#fb923c', '#ec4899', '#fbbf24', '#9a3412', '#1a0f0a'],
    custom: ['#570df8', '#f000b8', '#37cdbe', '#3d4451', '#ffffff'],
  };
  return colors[theme] || ['#000000', '#ffffff', '#cccccc', '#999999', '#666666'];
};

const getThemeColorDetails = (theme) => {
  const colorDetails = {
    light: {
      primary: { name: 'Primary', value: '#570df8' },
      secondary: { name: 'Secondary', value: '#f000b8' },
      accent: { name: 'Accent', value: '#37cdbe' },
      neutral: { name: 'Neutral', value: '#3d4451' },
      'base-100': { name: 'Base 100', value: '#ffffff' },
    },
    dark: {
      primary: { name: 'Primary', value: '#570df8' },
      secondary: { name: 'Secondary', value: '#f000b8' },
      accent: { name: 'Accent', value: '#37cdbe' },
      neutral: { name: 'Neutral', value: '#ffffff' },
      'base-100': { name: 'Base 100', value: '#1f2937' },
    },
    'lotr-light': {
      primary: { name: 'Primary (Altın)', value: '#d4af37' },
      secondary: { name: 'Secondary (Kahve)', value: '#8b4513' },
      accent: { name: 'Accent (Parlak Altın)', value: '#ffd700' },
      neutral: { name: 'Neutral (Koyu Kahve)', value: '#2d1810' },
      'base-100': { name: 'Base 100 (Bej)', value: '#f5f5dc' },
    },
    'lotr-dark': {
      primary: { name: 'Primary (Parlak Altın)', value: '#ffd700' },
      secondary: { name: 'Secondary (Altın)', value: '#d4af37' },
      accent: { name: 'Accent (Kahve)', value: '#8b4513' },
      neutral: { name: 'Neutral (Koyu Kahve)', value: '#2d1810' },
      'base-100': { name: 'Base 100 (Çok Koyu Kahve)', value: '#1a0f0a' },
    },
    'neon-light': {
      primary: { name: 'Primary (Cyan)', value: '#00ffff' },
      secondary: { name: 'Secondary (Magenta)', value: '#ff00ff' },
      accent: { name: 'Accent (Lime)', value: '#00ff00' },
      neutral: { name: 'Neutral (Açık Gri)', value: '#e5e5e5' },
      'base-100': { name: 'Base 100 (Beyaz)', value: '#ffffff' },
    },
    'neon-dark': {
      primary: { name: 'Primary (Cyan)', value: '#00ffff' },
      secondary: { name: 'Secondary (Magenta)', value: '#ff00ff' },
      accent: { name: 'Accent (Lime)', value: '#00ff00' },
      neutral: { name: 'Neutral (Koyu Gri)', value: '#1a1a1a' },
      'base-100': { name: 'Base 100 (Neredeyse Siyah)', value: '#0d0d0d' },
    },
  };
  return colorDetails[theme] || {};
};

const getThemeFeatures = (theme) => {
  const features = {
    light: ['Klasik açık tasarım', 'Yüksek kontrast', 'Günlük kullanım için optimize', 'Hızlı okuma deneyimi'],
    dark: ['Göz yormayan koyu arka plan', 'Gece kullanımı için ideal', 'Enerji tasarrufu', 'Modern görünüm'],
    'lotr-light': [
      'Orta Çağ tarzı font (Cinzel)',
      'Altın ve kahverengi renk paleti',
      'Özel hover animasyonları',
      'Gradient arka planlar',
      'Kahverengi tonlarında gölgeler',
      'Yumuşak border radius',
      'Açık tema uyumlu',
    ],
    'lotr-dark': [
      'Orta Çağ tarzı font (Cinzel)',
      'Altın ve kahverengi renk paleti',
      'Özel hover animasyonları',
      'Gradient arka planlar',
      'Altın tonlarında gölgeler',
      'Yumuşak border radius',
      'Koyu tema uyumlu',
    ],
    'neon-light': [
      'Futuristik neon ışıklar',
      'Parlak renk paleti',
      'Glow efektleri',
      'Hızlı animasyonlar',
      'Açık tema uyumlu',
    ],
    'neon-dark': [
      'Futuristik neon ışıklar',
      'Parlak renk paleti',
      'Glow efektleri',
      'Hızlı animasyonlar',
      'Koyu tema uyumlu',
    ],
    'cyberpunk-light': [
      'Cyberpunk estetiği',
      'Neon renkler',
      'Keskin köşeler',
      'Hızlı animasyonlar',
      'Açık tema uyumlu',
    ],
    'cyberpunk-dark': [
      'Cyberpunk estetiği',
      'Neon renkler',
      'Keskin köşeler',
      'Hızlı animasyonlar',
      'Koyu tema uyumlu',
    ],
  };
  return features[theme] || ['Tema özellikleri'];
};
</script>
