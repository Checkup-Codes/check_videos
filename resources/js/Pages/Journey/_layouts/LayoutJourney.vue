<template>
  <Head :title="titleName" />
  <FlashMessage :message="flashSuccess" />
  <CheckLayout
    :isCollapsed="shouldShowSidebar"
    :show-sidebar-on-mobile="shouldShowSidebarOnMobile"
    :show-main-content-on-mobile="shouldShowMainContentOnMobile"
  >
    <template #sidebar>
      <!-- SSR'da sidebar içeriğini gizle, sadece client-side'da göster -->
      <!-- Mobil show sayfalarında sidebar hiç render edilmez -->
      <KeepAlive
        v-if="shouldShowSidebar && isMounted && shouldShowSidebarOnMobile"
        :max="5"
        :include="['SidebarLayoutJourney']"
      >
        <SidebarLayoutJourney :key="screenName" @update:isNarrow="handleSidebarWidthChange" />
      </KeepAlive>
    </template>
    <div :class="[shouldShowMainContentOnMobile ? 'block' : 'hidden lg:block', mainContentClass]">
      <slot name="screen"></slot>
    </div>
  </CheckLayout>
</template>

<script setup>
import CheckLayout from '@/Components/CekapUI/Slots/CheckLayout.vue';
import SidebarLayoutJourney from '@/Pages/Journey/_layouts/SidebarLayoutJourney.vue';
import FlashMessage from '@/Components/CekapUI/Notifications/FlashMessage.vue';
import { usePage, Head } from '@inertiajs/vue3';
import { ref, computed, provide, onMounted, onBeforeUnmount, watch } from 'vue';
import { useStore } from 'vuex';

defineOptions({
  name: 'LayoutJourney',
});

const page = usePage();
const store = useStore();

// Flash message
const flashSuccess = computed(() => page.props.flash?.message);

// Title
const titleName = computed(() => 'Yolculuk');

// Check if user is logged in
const isLoggedIn = computed(() => {
  return !!(page.props.auth && page.props.auth.user);
});

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
const screenName = computed(() => page.props.screen?.name || 'journey');

// Provide reactive entries data
const entries = computed(() => page.props.entries || []);
const entriesByYear = computed(() => page.props.entriesByYear || {});
provide('entries', entries);
provide('entriesByYear', entriesByYear);

// Check if there are any entries
const hasEntries = computed(() => {
  return entries.value.length > 0;
});

// Show sidebar if: user is logged in OR there are entries to display
const shouldShowSidebar = computed(() => {
  return isLoggedIn.value || hasEntries.value;
});

// Check if we're on a non-index page (show, create, or edit) - on mobile, hide sidebar for these pages
const isNonIndexPage = computed(() => {
  const currentUrl = page.url || '';

  // Journey show page: /journey/{id} (but not /journey, /journey/create, /journey/edit)
  const isJourneyShowPage =
    currentUrl.startsWith('/journey/') &&
    currentUrl !== '/journey' &&
    !currentUrl.includes('/journey/create') &&
    !currentUrl.includes('/journey/edit') &&
    !currentUrl.match(/\/journey\/\d+\/edit$/); // Exclude edit by ID

  // Journey create/edit pages
  const isJourneyCreateEditPage = currentUrl === '/journey/create' || currentUrl.includes('/journey/edit');

  return isJourneyShowPage || isJourneyCreateEditPage;
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

// Sidebar state
const isSidebarNarrow = ref(store.getters['Writes/isCollapsed']);

// Sync with store
watch(
  () => store.getters['Writes/isCollapsed'],
  (val) => {
    isSidebarNarrow.value = val;
  },
  { immediate: true }
);

const mainContentClass = computed(() => {
  const classes = {
    'transition-all duration-300': true,
    'lg:ml-[-200px]': isSidebarNarrow.value && shouldShowSidebar.value,
    'lg:ml-[0px]': !isSidebarNarrow.value || !shouldShowSidebar.value,
  };

  // Mobil non-index sayfalarında (show, create, edit) tam genişlik
  if (isMobile.value && isNonIndexPage.value) {
    classes['w-full'] = true;
  }

  return classes;
});

const handleSidebarWidthChange = (isNarrow) => {
  isSidebarNarrow.value = isNarrow;
};

// Track if component is mounted (client-side only)
const isMounted = ref(false);

// Prevent body scrolling
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
</script>

<style>
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>

