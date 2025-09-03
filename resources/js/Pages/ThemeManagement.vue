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
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div
                v-for="theme in availableThemes"
                :key="theme"
                class="card cursor-pointer bg-base-200 transition-all duration-300 hover:shadow-lg"
                @click="showThemeDetails(theme)"
              >
                <div class="card-body">
                  <div class="mb-4 flex items-center gap-3">
                    <div class="text-2xl">{{ getThemeIcon(theme) }}</div>
                    <h3 class="card-title">{{ getThemeName(theme) }}</h3>
                  </div>

                  <!-- Renk Paleti Önizleme -->
                  <div class="mb-4 grid grid-cols-5 gap-1">
                    <div
                      v-for="(color, index) in getThemeColors(theme)"
                      :key="index"
                      class="h-8 w-8 rounded border border-base-300"
                      :style="{ backgroundColor: color }"
                      :title="color"
                    ></div>
                  </div>

                  <p class="text-base-content/70 mb-4 text-sm">{{ getThemeDescription(theme) }}</p>

                  <div class="card-actions justify-end">
                    <button
                      @click.stop="changeTheme(theme)"
                      :class="['btn btn-sm', currentTheme === theme ? 'btn-primary' : 'btn-outline']"
                    >
                      {{ currentTheme === theme ? 'Aktif' : 'Seç' }}
                    </button>
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

const changeTheme = (theme) => {
  store.dispatch('Theme/changeTheme', theme);
  selectedTheme.value = null;
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
    lotr: '🧙‍♂️',
    neon: '💡',
    cyberpunk: '🤖',
    nature: '🌿',
    ocean: '🌊',
    sunset: '🌅',
    custom: '⚙️',
  };
  return icons[theme] || '🎨';
};

const getThemeName = (theme) => {
  const names = {
    light: 'Açık Tema',
    dark: 'Koyu Tema',
    lotr: 'Lord of the Rings',
    neon: 'Neon Teması',
    cyberpunk: 'Cyberpunk',
    nature: 'Doğa Teması',
    ocean: 'Okyanus Teması',
    sunset: 'Gün Batımı',
    custom: 'Özel Tema',
  };
  return names[theme] || theme;
};

const getThemeDescription = (theme) => {
  const descriptions = {
    light: 'Klasik açık tema, günlük kullanım için ideal',
    dark: 'Göz yormayan koyu tema, gece kullanımı için mükemmel',
    lotr: "J.R.R. Tolkien'in efsanevi dünyasından ilham alınmış tema",
    neon: 'Neon ışıklar ve parlak renklerle dolu futuristik tema',
    cyberpunk: 'Cyberpunk dünyasından ilham alınmış neon ve karanlık tema',
    nature: 'Doğanın huzur verici yeşil ve kahverengi tonları',
    ocean: 'Okyanusun derinliklerinden ilham alınmış mavi tonlar',
    sunset: 'Gün batımının sıcak turuncu ve pembe tonları',
    custom: 'Kendi renklerinizi ve ayarlarınızı özelleştirin',
  };
  return descriptions[theme] || 'Tema açıklaması';
};

const getThemeColors = (theme) => {
  const colors = {
    light: ['#570df8', '#f000b8', '#37cdbe', '#3d4451', '#ffffff'],
    dark: ['#570df8', '#f000b8', '#37cdbe', '#ffffff', '#1f2937'],
    lotr: ['#d4af37', '#8b4513', '#ffd700', '#2d1810', '#f5f5dc'],
    neon: ['#00ffff', '#ff00ff', '#00ff00', '#1a1a1a', '#0d0d0d'],
    cyberpunk: ['#ff0000', '#ffff00', '#0000ff', '#262626', '#141414'],
    nature: ['#22c55e', '#f97316', '#eab308', '#365314', '#f0fdf4'],
    ocean: ['#3b82f6', '#06b6d4', '#1d4ed8', '#1e3a8a', '#f0f9ff'],
    sunset: ['#fb923c', '#ec4899', '#fbbf24', '#9a3412', '#fff7ed'],
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
    lotr: {
      primary: { name: 'Primary (Altın)', value: '#d4af37' },
      secondary: { name: 'Secondary (Kahve)', value: '#8b4513' },
      accent: { name: 'Accent (Parlak Altın)', value: '#ffd700' },
      neutral: { name: 'Neutral (Koyu Kahve)', value: '#2d1810' },
      'base-100': { name: 'Base 100 (Bej)', value: '#f5f5dc' },
    },
  };
  return colorDetails[theme] || {};
};

const getThemeFeatures = (theme) => {
  const features = {
    light: ['Klasik açık tasarım', 'Yüksek kontrast', 'Günlük kullanım için optimize', 'Hızlı okuma deneyimi'],
    dark: ['Göz yormayan koyu arka plan', 'Gece kullanımı için ideal', 'Enerji tasarrufu', 'Modern görünüm'],
    lotr: [
      'Orta Çağ tarzı font (Cinzel)',
      'Altın ve kahverengi renk paleti',
      'Özel hover animasyonları',
      'Gradient arka planlar',
      'Kahverengi tonlarında gölgeler',
      'Yumuşak border radius',
    ],
  };
  return features[theme] || ['Tema özellikleri'];
};
</script>
