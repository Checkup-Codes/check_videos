<template>
  <aside
    class="flex h-screen flex-col justify-between border-r-2 border-base-300 bg-base-200 px-4 font-sans"
    :class="currentTheme"
  >
    <div class="space-y-1">
      <!-- Workspace Header -->
      <Link href="/" class="block">
        <div class="px-2 py-5">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3" :class="{ 'w-full justify-center': isCompact }">
              <div class="flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-neutral">
                <template v-if="logoPath && !isLoading">
                  <img :src="logoPath" :alt="logoAlt" class="h-full w-full object-cover" @error="handleImageError" />
                </template>
                <span v-else class="text-sm font-bold text-neutral-content">{{ appName.charAt(0) }}</span>
              </div>
              <div v-if="!isCompact">
                <h3 class="font-semibold text-base-content">{{ appName }}</h3>
              </div>
            </div>
            <!-- 
            <button v-if="!isCompact" class="text-base-content/60 transition-colors hover:text-base-content">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            -->
          </div>
        </div>
      </Link>

      <!-- Main Navigation -->
      <div :class="{ 'text-center': isCompact }">
        <!-- <h4 class="text-base-content/70 px-3 text-xs font-semibold uppercase tracking-wider">
          {{ isCompact ? '-----' : 'Ana Navigasyon' }}
        </h4>
        -->
        <NavItem href="/" icon="home" label="Ana Sayfa" :is-compact="isCompact" />
        <NavItem href="/dashboard" icon="chart-bar" label="Panel" :is-compact="isCompact" />
      </div>

      <!-- Content Management -->
      <div :class="{ 'text-center': isCompact }">
        <!--  <h4 class="text-base-content/70 px-3 text-xs font-semibold uppercase tracking-wider">
          {{ isCompact ? '-----' : 'İçerik Yönetimi' }}
        </h4>
        -->
        <NavItem href="/writes" icon="fa-solid fa-pencil" label="Yazılar" :is-compact="isCompact" />
        <NavItem href="/categories" icon="fa-solid fa-book" label="Kategoriler" :is-compact="isCompact" />
      </div>

      <!-- Language & Translation -->
      <div v-if="isLoggedIn" :class="{ 'text-center': isCompact }">
        <!-- <h4 class="text-base-content/70 px-3 text-xs font-semibold uppercase tracking-wider">
          {{ isCompact ? '-----' : 'Dil & Çeviri' }}
        </h4>
        -->
        <NavItem href="/rendition/words" icon="fa-solid fa-globe" label="Kelimeler" :is-compact="isCompact" />
        <!--  <NavItem
          href="/rendition/language-packs"
          icon="fa-solid fa-language"
          label="Dil Paketleri"
          :is-compact="isCompact"
        />
        -->
      </div>

      <!-- Project Management 
      <div v-if="isLoggedIn" :class="{ 'text-center': isCompact }">
         <h4 class="text-base-content/70 px-3 text-xs font-semibold uppercase tracking-wider">
          {{ isCompact ? '-----' : 'Proje Yönetimi' }}
        </h4>
        
        <NavItem href="/projects" icon="fa-solid fa-project-diagram" label="Projeler" :is-compact="isCompact" />
      
        <NavItem href="/customers" icon="fa-solid fa-users" label="Müşteriler" :is-compact="isCompact" />
        <NavItem href="/services" icon="fa-solid fa-cogs" label="Hizmetler" :is-compact="isCompact" />
      </div>
      -->

      <!-- System & Tools -->
      <div v-if="isLoggedIn" :class="{ 'text-center': isCompact }">
        <!-- <h4 class="text-base-content/70 px-3 text-xs font-semibold uppercase tracking-wider">
          {{ isCompact ? '-----' : 'Sistem & Araçlar' }}
        </h4>
        -->
        <NavItem href="/versions" icon="fa-solid fa-sync" label="Versiyonlar" :is-compact="isCompact" />
        <!-- 
        <NavItem
          href="/software-products"
          icon="fa-solid fa-laptop-code"
          label="Yazılım Ürünleri"
          :is-compact="isCompact"
        />
        <NavItem href="/lessons" icon="fa-solid fa-chalkboard-teacher" label="Dersler" :is-compact="isCompact" />
         -->
      </div>

      <!-- Equipment & Tools (Public) 
      <div :class="{ 'text-center': isCompact }">
        <h4 class="text-base-content/70 px-3 text-xs font-semibold uppercase tracking-wider">
          {{ isCompact ? '-----' : 'Ekipman & Araçlar' }}
        </h4>
        
        <NavItem href="/equipments" icon="fa-solid fa-tools" label="Ekipmanlar" :is-compact="isCompact" />
      </div>
       -->

      <!-- Media & Assets -->
      <div v-if="isLoggedIn" :class="{ 'text-center': isCompact }">
        <!-- <h4 class="text-base-content/70 px-3 text-xs font-semibold uppercase tracking-wider">
          {{ isCompact ? '-----' : 'Media & Varlıklar' }}
        </h4>
        <NavItem href="/bookmarks" icon="fa-solid fa-bookmark" label="Yer İmleri" :is-compact="isCompact" />
        
        <NavItem href="/social-media" icon="fa-solid fa-share-alt" label="Sosyal Medya" :is-compact="isCompact" />
        -->
      </div>

      <!-- Social Links for Non-Logged In Users -->
      <div class="space-y-1 border-t border-base-300 pt-4" :class="{ 'text-center': isCompact }">
        <SocialLinks :is-compact="isCompact" />
      </div>
    </div>

    <div class="absolute inset-x-0 bottom-0 py-4 text-center">
      <!-- Dark/Light Mode Toggle -->
      <div class="mb-3">
        <button @click="toggleDarkLight" class="btn btn-ghost btn-sm">
          <template v-if="isDarkMode">
            <svg class="h-4 w-4 fill-current text-amber-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
              />
            </svg>
          </template>
          <template v-else>
            <svg class="h-4 w-4 fill-current text-blue-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
              />
            </svg>
          </template>
        </button>
        <!-- Tema bilgisi -->
        <p v-if="!isCompact" class="text-base-content/40 mt-1 text-xs">{{ currentThemeName }}</p>
      </div>
      <!-- Powered by Button / Profile Link -->
      <div v-if="!isLoggedIn" class="space-y-1 p-4">
        <a href="https://youtu.be/FPsx8xHLR1k?si=3dNFdwhk5s8LyqOe" target="_blank">
          <button
            class="w-full rounded-lg border border-base-300 bg-base-100 p-3 shadow-sm transition-colors hover:bg-base-200"
          >
            <div class="flex items-center space-x-3" :class="{ 'justify-center': isCompact }">
              <span v-if="!isCompact" class="mx-auto items-center text-sm font-medium text-base-content"
                >Powered by : Notiriel</span
              >
            </div>
          </button>
        </a>
      </div>
      <p v-if="!isCompact" class="text-base-content/60 mt-2 text-xs">Notiriel - Tüm Hakları Saklıdır</p>
    </div>
  </aside>
</template>

<script setup>
import NavItem from '@/Layouts/_components/NavItem.vue';
import SocialLinks from '@/Layouts/_composable/SocialLinks.vue';
import { usePage } from '@inertiajs/vue3';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { Link } from '@inertiajs/vue3';

const page = usePage();
const store = useStore();

const currentTheme = computed(() => store.getters['Theme/getCurrentTheme']);

// Reactive authentication status - automatically updates when auth changes
const isLoggedIn = computed(() => {
  return !!(page.props.auth && page.props.auth.user);
});

const appName = computed(() => {
  return page.props?.app?.name ?? 'Check Videos';
});

const seoTitle = computed(() => {
  return page.props?.screen?.seo?.title ?? 'Check Videos';
});

// Logo path logic
const logoPath = ref(page.props?.screen?.seo?.logo);
const logoAlt = ref('Logo');
const isLoading = ref(false);

const handleImageError = () => {
  logoPath.value = '/images/default-logo.png'; // Varsayılan bir resim yolu
};

// Dark/Light mode logic
const isDarkMode = computed(() => {
  return currentTheme.value.includes('dark');
});

const currentThemeName = computed(() => {
  const theme = currentTheme.value;
  const themeMap = {
    light: 'Light',
    dark: 'Dark',
    'lotr-light': 'LOTR Light',
    'lotr-dark': 'LOTR Dark',
    custom: 'Custom',
  };
  return themeMap[theme] || theme;
});

const toggleDarkLight = () => {
  const current = currentTheme.value;
  let newTheme;

  if (current.includes('dark')) {
    // Dark'tan Light'a geç
    newTheme = current.replace('-dark', '-light');
  } else {
    // Light'tan Dark'a geç
    newTheme = current.replace('-light', '-dark');
  }

  // Eğer değişiklik olmadıysa (light/dark gibi), alternatif tema seç
  if (newTheme === current) {
    newTheme = current === 'light' ? 'dark' : 'light';
  }

  store.dispatch('Theme/changeTheme', newTheme);
};

defineProps({
  isCompact: {
    type: Boolean,
    default: false,
  },
});
</script>
