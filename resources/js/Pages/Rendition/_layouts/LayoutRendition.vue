<template>
  <Head :title="titleName" />
  <FlashMessage :message="flashSuccess" />
  <CheckLayout
    :isCollapsed="isSidebarCollapsed"
    :show-sidebar-on-mobile="shouldShowSidebarOnMobile"
    :show-main-content-on-mobile="shouldShowMainContentOnMobile"
    :class="currentTheme"
  >
    <template #sidebar>
      <!-- SSR'da sidebar içeriğini gizle, sadece client-side'da göster -->
      <!-- Mobil show sayfalarında sidebar hiç render edilmez -->
      <KeepAlive
        v-if="isSidebarCollapsed && isMounted && shouldShowSidebarOnMobile && (screenName === 'words' || screenName === 'packs')"
        :max="5"
        :include="['SidebarRendition']"
      >
        <SidebarRendition :key="screenName" @update:isCollapsed="handleSidebarCollapse" />
      </KeepAlive>
    </template>
    <div :class="[shouldShowMainContentOnMobile ? 'block' : 'hidden lg:block']">
      <slot name="screen"></slot>
    </div>
  </CheckLayout>
</template>

<script setup>
import CheckLayout from '@/Components/CekapUI/Slots/CheckLayout.vue';
import FlashMessage from '@/Components/CekapUI/Notifications/FlashMessage.vue';
import SidebarRendition from '@/Pages/Rendition/_layouts/SidebarRendition.vue';
import { usePage, Head } from '@inertiajs/vue3';
import { ref, computed, onMounted, onBeforeUnmount, provide } from 'vue';
import { useStore } from 'vuex';

const page = usePage();
const store = useStore();

// Get current theme
const currentTheme = computed(() => store.getters['Theme/getCurrentTheme']);

// Real mobile detection based on window width (client-side only)
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1024);
const isMobile = computed(() => windowWidth.value < 1024);

// Update window width on resize
const updateWindowWidth = () => {
  if (typeof window !== 'undefined') {
    windowWidth.value = window.innerWidth;
  }
};

// Get screen name from props - make it reactive
const screenName = computed(() => page.props.screen?.name || '');

const titleName = computed(() => {
  return (screenName.value ? screenName.value.charAt(0).toUpperCase() + screenName.value.slice(1) + ' - ' : '') + 'Rendition';
});

const flashSuccess = ref(page.props.flash?.success);
const isSidebarCollapsed = ref(true);

const handleSidebarCollapse = (newState) => {
  isSidebarCollapsed.value = newState;
};

// Check if we're on a non-index page (show, create, or edit) - on mobile, hide sidebar for these pages
const isNonIndexPage = computed(() => {
  const currentUrl = page.url || '';

  // Word show page: /rendition/words/{slug} (but not /rendition/words, /rendition/words/create, /rendition/words/edit)
  const isWordShowPage =
    currentUrl.startsWith('/rendition/words/') &&
    currentUrl !== '/rendition/words' &&
    !currentUrl.includes('/rendition/words/create') &&
    !currentUrl.includes('/rendition/words/edit') &&
    !currentUrl.match(/\/rendition\/words\/\d+$/); // Exclude edit by ID

  // Word create/edit pages
  const isWordCreateEditPage = currentUrl === '/rendition/words/create' || currentUrl.includes('/rendition/words/edit');

  // Language pack show page: /rendition/packs/{slug} or similar
  const isPackShowPage =
    currentUrl.startsWith('/rendition/packs/') &&
    currentUrl !== '/rendition/packs' &&
    !currentUrl.includes('/rendition/packs/create') &&
    !currentUrl.includes('/rendition/packs/edit');

  // Language pack create/edit pages
  const isPackCreateEditPage = currentUrl === '/rendition/packs/create' || currentUrl.includes('/rendition/packs/edit');

  return isWordShowPage || isWordCreateEditPage || isPackShowPage || isPackCreateEditPage;
});

// On mobile: show only sidebar on index pages, only main content on non-index pages (show, create, edit)
const shouldShowSidebarOnMobile = computed(() => {
  if (!isMobile.value) return true; // Desktop: always show sidebar if collapsed
  return !isNonIndexPage.value; // Mobile: show sidebar only on index pages
});

const shouldShowMainContentOnMobile = computed(() => {
  if (!isMobile.value) return true; // Desktop: always show main content
  return isNonIndexPage.value; // Mobile: show main content on non-index pages (show, create, edit)
});

// Track if component is mounted (client-side only)
const isMounted = ref(false);

// Prevent body scrolling on rendition pages
onMounted(() => {
  isMounted.value = true;
  document.body.style.overflow = 'hidden';

  // Initialize window width and add resize listener
  if (typeof window !== 'undefined') {
    windowWidth.value = window.innerWidth;
    window.addEventListener('resize', updateWindowWidth);
  }
});

onBeforeUnmount(() => {
  document.body.style.overflow = '';

  // Remove resize listener
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', updateWindowWidth);
  }
});

// Provide reactive data
const languagePacks = computed(() => page.props.languagePacks || []);
provide('languagePacks', languagePacks);
</script>
