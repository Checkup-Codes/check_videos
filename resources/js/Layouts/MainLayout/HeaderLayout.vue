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

      <!-- Menu Content - Structured like SidebarLayout -->
      <div class="px-4" @click="handleMenuItemClick">
        <!-- Workspace Header -->
        <Link href="/" class="block">
          <div class="mb-4 rounded-lg border border-base-300 bg-base-100 p-4 shadow-sm">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <span class="text-sm font-bold text-primary-content">{{ appName.charAt(0) }}</span>
                </div>
                <div>
                  <h3 class="font-semibold text-base-content">{{ appName }}</h3>
                </div>
              </div>
            </div>
          </div>
        </Link>

        <!-- Powered by Button for Non-Logged In Users -->
        <div v-if="!isLoggedIn" class="mb-4">
          <a href="https://youtu.be/FPsx8xHLR1k?si=3dNFdwhk5s8LyqOe" target="_blank">
            <button
              class="w-full rounded-lg border border-base-300 bg-base-100 p-3 shadow-sm transition-colors hover:bg-base-200"
            >
              <div class="flex items-center space-x-3">
                <div class="flex h-5 w-5 items-center justify-center rounded bg-secondary">
                  <svg class="h-3 w-3 text-secondary-content" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <span class="text-sm font-medium text-base-content">Powered by : Notiriel</span>
              </div>
            </button>
          </a>
        </div>

        <!-- Main Navigation -->
        <div class="mb-4 space-y-1">
          <h4 class="text-base-content/70 px-3 text-xs font-semibold uppercase tracking-wider">Ana Navigasyon</h4>
          <NavItem href="/" icon="home" label="Ana Sayfa" />
          <NavItem href="/dashboard" icon="chart-bar" label="Dashboard" />
        </div>

        <!-- Content Management -->
        <div class="mb-4 space-y-1">
          <h4 class="text-base-content/70 px-3 text-xs font-semibold uppercase tracking-wider">İçerik Yönetimi</h4>
          <NavItem href="/writes" icon="fa-solid fa-pencil" label="Yazılar" />
          <NavItem href="/categories" icon="fa-solid fa-book" label="Kategoriler" />
        </div>

        <!-- Language & Translation -->
        <div v-if="isLoggedIn" class="mb-4 space-y-1">
          <h4 class="text-base-content/70 px-3 text-xs font-semibold uppercase tracking-wider">Dil & Çeviri</h4>
          <NavItem href="/rendition/words" icon="fa-solid fa-globe" label="Kelimeler" />
          <NavItem href="/rendition/language-packs" icon="fa-solid fa-language" label="Dil Paketleri" />
        </div>

        <!-- Project Management -->
        <div v-if="isLoggedIn" class="mb-4 space-y-1">
          <h4 class="text-base-content/70 px-3 text-xs font-semibold uppercase tracking-wider">Proje Yönetimi</h4>
          <NavItem href="/projects" icon="fa-solid fa-project-diagram" label="Projeler" />
        </div>

        <!-- System & Tools -->
        <div v-if="isLoggedIn" class="mb-4 space-y-1">
          <h4 class="text-base-content/70 px-3 text-xs font-semibold uppercase tracking-wider">Sistem & Araçlar</h4>
          <NavItem href="/versions" icon="fa-solid fa-sync" label="Versiyonlar" />
        </div>

        <!-- Equipment & Tools (Public) -->
        <div class="mb-4 space-y-1">
          <h4 class="text-base-content/70 px-3 text-xs font-semibold uppercase tracking-wider">Ekipman & Araçlar</h4>
          <NavItem href="/equipments" icon="fa-solid fa-tools" label="Ekipmanlar" />
        </div>

        <!-- Media & Assets -->
        <div v-if="isLoggedIn" class="mb-4 space-y-1">
          <h4 class="text-base-content/70 px-3 text-xs font-semibold uppercase tracking-wider">Media & Varlıklar</h4>
          <NavItem href="/media" icon="fa-solid fa-photo-video" label="Medya" />
          <NavItem href="/bookmarks" icon="fa-solid fa-bookmark" label="Yer İmleri" />
          <NavItem href="/social-media" icon="fa-solid fa-share-alt" label="Sosyal Medya" />
        </div>

        <!-- Social Links for Non-Logged In Users -->
        <div v-if="!isLoggedIn" class="mb-4">
          <SocialLinks :is-compact="false" />
        </div>

        <!-- Theme Switcher and Copyright -->
        <div class="mt-6 flex flex-col items-center">
          <ThemeSwitcher />
          <p class="text-base-content/60 mt-2 text-xs">{{ appName }} - Tüm Hakları Saklıdır</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, watch } from 'vue';
import { Link, usePage, router } from '@inertiajs/vue3';
import GoBackSvg from '@/Shared/Svg/GoBack.vue';
import axios from 'axios';

// Import SidebarLayout components
import NavItem from '@/Layouts/_components/NavItem.vue';
import SocialLinks from '@/Layouts/_composable/SocialLinks.vue';
import ThemeSwitcher from '@/Layouts/_components/ThemeSwitcher.vue';

const props = defineProps({
  title: {
    type: String,
    default: 'Header',
  },
});

const seoTitle = ref('');
const isMenuOpen = ref(false);
const page = usePage();
const imagePath = ref('');
const auth = ref(null);
const appName = computed(() => usePage().props.app.name);
const title = ref('');

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
