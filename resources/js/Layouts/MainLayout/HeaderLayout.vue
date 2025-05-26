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
      <Link href="/">{{ seoTitle }}</Link>
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
        <!-- ProfileCard -->
        <ProfileCard :imagePath="imagePath" />

        <!-- Navigation -->
        <div class="mt-4">
          <MainNavigation />
        </div>

        <!-- Social Links -->
        <div class="mt-4">
          <SocialLinks />
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
import ProfileCard from '@/Layouts/_composable/ProfileCard.vue';
import MainNavigation from '@/Layouts/_composable/MainNavigation.vue';
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
const imagePath = ref('/images/checkup_codes_logo.png');
const auth = ref(null);
const appName = computed(() => usePage().props.app.name);

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

onMounted(async () => {
  try {
    const response = await axios.get('/api/seo/home');
    if (response.data && response.data.title) {
      seoTitle.value = response.data.title;
    }
  } catch (error) {
    console.error('Error fetching SEO title:', error);
  }

  // Add escape key listener to close menu
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen.value) {
      closeMenu();
    }
  });
});
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
