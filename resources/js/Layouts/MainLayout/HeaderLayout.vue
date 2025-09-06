<template>
  <header
    class="sticky top-0 z-40 flex h-12 items-center justify-between border-b border-base-200 bg-base-100 px-4 sm:px-5 lg:hidden"
  >
    <!-- Back button -->
    <Link v-if="basePath" :href="`/${basePath}`" class="btn btn-ghost btn-sm px-2">
      <GoBackSvg class="h-5 w-5" />
    </Link>
    <div v-else class="w-8"></div>

    <!-- Logo/Title -->
    <div class="px-3 py-1 font-bold uppercase text-primary">
      <Link href="/">{{ title }}</Link>
    </div>

    <!-- Menu Toggle Button -->
    <button @click="toggleMenu" class="btn btn-ghost btn-sm px-2">
      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
      </svg>
    </button>
  </header>

  <!-- Backdrop with DaisyUI transition -->
  <div
    v-if="isMenuOpen"
    class="fixed inset-0 z-50 bg-black/50 transition-opacity duration-300"
    :class="isMenuOpen ? 'opacity-100' : 'opacity-0'"
    @click="closeMenu"
  ></div>

  <!-- Bottom Sheet Menu with DaisyUI transition -->
  <div
    class="drawer-content drawer-end fixed inset-x-0 bottom-0 z-50 transform transition-all duration-300 ease-in-out"
    :class="isMenuOpen ? 'translate-y-0' : 'translate-y-full'"
  >
    <div class="max-h-[90vh] overflow-y-auto rounded-t-xl border border-base-200 bg-base-100 pb-6 pt-4 shadow-lg">
      <!-- Pull indicator -->
      <div class="mb-4 flex justify-center">
        <div class="h-1 w-10 rounded-full bg-base-300"></div>
      </div>

      <!-- Menu Content - sade tasarım -->
      <div class="px-4" @click="handleMenuItemClick">
        <!-- Workspace Header - sade tasarım -->
        <Link href="/" class="block">
          <div class="mb-4 rounded-lg border border-base-300 bg-base-100 px-4 py-3 shadow-sm">
            <div class="flex items-center space-x-3">
              <div class="flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-primary">
                <template v-if="logoPath && !isLoading">
                  <img :src="logoPath" :alt="logoAlt" class="h-full w-full object-cover" @error="handleImageError" />
                </template>
                <span v-else class="text-sm font-bold text-primary-content">{{ appName.charAt(0) }}</span>
              </div>
              <div>
                <h3 class="font-semibold text-base-content">{{ appName }}</h3>
              </div>
            </div>
          </div>
        </Link>

        <!-- Powered by Button for Non-Logged In Users - sade tasarım -->
        <div v-if="!isLoggedIn" class="mb-4">
          <a href="https://youtu.be/FPsx8xHLR1k?si=3dNFdwhk5s8LyqOe" target="_blank">
            <button
              class="w-full rounded-lg border border-base-300 bg-base-100 p-3 shadow-sm transition-colors hover:bg-base-200"
            >
              <div class="flex items-center justify-center space-x-3">
                <span class="text-sm font-medium text-base-content">Powered by : Notiriel</span>
              </div>
            </button>
          </a>
        </div>

        <!-- Main Navigation - sade tasarım -->
        <div class="mb-4 space-y-1">
          <NavItem href="/" icon="home" label="Ana Sayfa" />
          <NavItem href="/dashboard" icon="chart-bar" label="Panel" />
        </div>

        <!-- Content Management - sade tasarım -->
        <div class="mb-4 space-y-1">
          <NavItem href="/writes" icon="fa-solid fa-pencil" label="Yazılar" />
          <NavItem href="/categories" icon="fa-solid fa-book" label="Kategoriler" />
        </div>

        <!-- Language & Translation - sade tasarım -->
        <div v-if="isLoggedIn" class="mb-4 space-y-1">
          <NavItem href="/rendition/words" icon="fa-solid fa-globe" label="Kelimeler" />
        </div>

        <!-- System & Tools - sade tasarım -->
        <div v-if="isLoggedIn" class="mb-4 space-y-1">
          <NavItem href="/versions" icon="fa-solid fa-sync" label="Versiyonlar" />
        </div>

        <!-- Social Links for Non-Logged In Users - sade tasarım -->
        <div v-if="!isLoggedIn" class="mb-4 space-y-1 border-t border-base-300 pt-4">
          <SocialLinks :is-compact="false" />
        </div>

        <!-- Theme Switcher and Copyright - sade tasarım -->
        <div class="mt-6 flex flex-col items-center">
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
            <p class="text-base-content/40 mt-1 text-xs">{{ currentThemeName }}</p>
          </div>
          <p class="text-base-content/60 mt-2 text-xs">Notiriel - Tüm Hakları Saklıdır</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, watch } from 'vue';
import { Link, usePage, router } from '@inertiajs/vue3';
import { useStore } from 'vuex';
import GoBackSvg from '@/Shared/Svg/GoBack.vue';
import axios from 'axios';

// Import SidebarLayout components
import NavItem from '@/Layouts/_components/NavItem.vue';
import SocialLinks from '@/Layouts/_composable/SocialLinks.vue';

const props = defineProps({
  title: {
    type: String,
    default: 'Header',
  },
});

const seoTitle = ref('');
const isMenuOpen = ref(false);
const page = usePage();
const store = useStore();
const imagePath = ref('');
const auth = ref(null);
const appName = computed(() => usePage().props.app.name);
const title = ref('');

// Theme management
const currentTheme = computed(() => store.getters['Theme/getCurrentTheme']);

// Logo path logic
const logoPath = ref(page.props?.screen?.seo?.logo);
const logoAlt = ref('Logo');
const isLoading = ref(false);

const handleImageError = () => {
  logoPath.value = '/images/default-logo.png';
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
    'neon-light': 'Neon Light',
    'neon-dark': 'Neon Dark',
    'lotr-light': 'LOTR Light',
    'lotr-dark': 'LOTR Dark',
    'cyberpunk-light': 'Cyberpunk Light',
    'cyberpunk-dark': 'Cyberpunk Dark',
    'nature-light': 'Nature Light',
    'nature-dark': 'Nature Dark',
    'ocean-light': 'Ocean Light',
    'ocean-dark': 'Ocean Dark',
    'sunset-light': 'Sunset Light',
    'sunset-dark': 'Sunset Dark',
    custom: 'Custom',
  };
  return themeMap[theme] || theme;
});

const toggleDarkLight = () => {
  const current = currentTheme.value;
  let newTheme;

  if (current.includes('dark')) {
    newTheme = current.replace('-dark', '-light');
  } else {
    newTheme = current.replace('-light', '-dark');
  }

  if (newTheme === current) {
    newTheme = current === 'light' ? 'dark' : 'light';
  }

  store.dispatch('Theme/changeTheme', newTheme);
};

// Authentication status
const isLoggedIn = computed(() => {
  return !!(page.props.auth && page.props.auth.user);
});

// Watch for page props changes to update auth data
watch(
  () => page.props.value,
  (newProps) => {
    if (newProps && newProps.auth) {
      auth.value = newProps.auth;
      if (auth.value?.user) {
        imagePath.value = auth.value.user.imagePath || '/images/default.png';
      }
    }
  },
  { immediate: true }
);

// Watch for route changes to close menu
watch(
  () => page.url,
  () => {
    closeMenu();
  }
);

const emit = defineEmits(['toggleSidebar']);

const basePath = computed(() => {
  const url = page.url;
  const parts = url.split('/').filter((part) => part);

  if (!parts.length) return null;

  const pathMap = {
    rendition: 'rendition/words',
    //  academy: 'academy/courses',
  };

  return pathMap[parts[0]] || parts[0];
});

// Toggle the mobile menu
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  emit('toggleSidebar');

  // When menu is open, prevent body scrolling
  if (isMenuOpen.value) {
    document.body.style.overflow = 'hidden';
    document.body.classList.add('menu-open');
  } else {
    document.body.style.overflow = '';
    document.body.classList.remove('menu-open');
  }
};

// Close the mobile menu
const closeMenu = () => {
  isMenuOpen.value = false;
  document.body.style.overflow = '';
  document.body.classList.remove('menu-open');
};

// Handle clicks on menu items to close the menu
const handleMenuItemClick = (event) => {
  // Check if the clicked element is a link or inside a link
  const isLink =
    event.target.tagName === 'A' ||
    event.target.closest('a') ||
    event.target.closest('.link') ||
    event.target.closest('[href]');

  if (isLink) {
    closeMenu();
  }
};
</script>

<style scoped>
/* Animation for the drawer */
.drawer-content {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Prevent scrolling when menu is open */
:deep(body.menu-open) {
  overflow: hidden;
}
</style>
