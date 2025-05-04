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
    <div class="bg-neutral px-3 py-1 font-bold uppercase text-neutral-content">
      <Link href="/">{{ seoTitle }}</Link>
    </div>

    <!-- Menu Toggle Button -->
    <button @click="toggleMenu" class="btn btn-ghost btn-sm px-2">
      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
      </svg>
    </button>
  </header>

  <!-- Bottom Sheet Menu -->
  <div
    v-if="isMenuOpen"
    class="fixed inset-0 z-50 bg-black/50 transition-opacity duration-300"
    @click="closeMenu"
  ></div>

  <div
    class="fixed inset-x-0 bottom-0 z-50 transform transition-transform duration-300 ease-in-out"
    :class="isMenuOpen ? 'translate-y-0' : 'translate-y-full'"
  >
    <div class="rounded-t-xl border border-base-200 bg-base-100 pb-6 pt-4 shadow-lg">
      <!-- Pull indicator -->
      <div class="mb-4 flex justify-center">
        <div class="h-1 w-10 rounded-full bg-base-300"></div>
      </div>

      <!-- Menu Content -->
      <div class="px-6">
        <h3 class="text-base-content/60 mb-3 text-center text-sm font-semibold uppercase">Menü</h3>

        <div class="menu w-full">
          <slot name="menu-items">
            <ul>
              <li>
                <Link href="/" @click="closeMenu" class="py-3">Ana Sayfa</Link>
              </li>
              <li>
                <Link href="/writes" @click="closeMenu" class="py-3">Yazılar</Link>
              </li>
              <li>
                <Link href="/categories" @click="closeMenu" class="py-3">Kategoriler</Link>
              </li>
              <li v-if="$page.props.auth?.user">
                <Link href="/dashboard" @click="closeMenu" class="py-3">Panel</Link>
              </li>
              <!-- Additional menu items can be added via slot -->
            </ul>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
import GoBackSvg from '@/Shared/Svg/GoBack.vue';
import axios from 'axios';

const seoTitle = ref('');
const isMenuOpen = ref(false);
const page = usePage();

const props = defineProps({
  title: {
    type: String,
    default: 'Header',
  },
});

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
  } else {
    document.body.style.overflow = '';
  }
};

// Close the mobile menu
const closeMenu = () => {
  isMenuOpen.value = false;
  document.body.style.overflow = '';
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
/* Prevent scrolling when menu is open */
:deep(body.menu-open) {
  overflow: hidden;
}
</style>
