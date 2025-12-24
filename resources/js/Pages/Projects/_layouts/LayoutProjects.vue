<template>
  <Head :title="titleName" />
  <FlashMessage :message="flashMessage" @close="handleFlashClose" />
  <CheckLayout
    :isCollapsed="isCollapsed"
    :show-sidebar-on-mobile="shouldShowSidebarOnMobile"
    :show-main-content-on-mobile="shouldShowMainContentOnMobile"
  >
    <template #sidebar>
      <!-- SSR'da sidebar içeriğini gizle, sadece client-side'da göster -->
      <!-- Mobil show sayfalarında sidebar hiç render edilmez -->
      <KeepAlive
        v-if="isCollapsed && isMounted && shouldShowSidebarOnMobile"
        :max="5"
        :include="['SidebarLayoutProject']"
      >
        <component :is="SidebarLayoutProject" :key="screenName" @update:isNarrow="handleSidebarWidthChange" />
      </KeepAlive>
    </template>
    <div :class="[shouldShowMainContentOnMobile ? 'block' : 'hidden lg:block', mainContentClass]">
      <slot name="screen"></slot>
    </div>
  </CheckLayout>
</template>

<script setup>
import { computed, ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { usePage, Head } from '@inertiajs/vue3';
import CheckLayout from '@/Components/CekapUI/Slots/CheckLayout.vue';
import SidebarLayoutProject from '@/Pages/Projects/_layouts/SidebarLayoutProject.vue';
import FlashMessage from '@/Components/CekapUI/Notifications/FlashMessage.vue';
import { useSidebar } from '../_utils/useSidebar';
import { useFlashMessage } from '../_utils/useFlashMessage';

// Component name definition for dev tools
defineOptions({
  name: 'LayoutProjects',
});

// Composables
const { isCollapsed, toggleSidebar, sidebarStyle } = useSidebar();
const { flashMessage } = useFlashMessage();

const handleFlashClose = () => {
  flashMessage.value = '';
};

// Get screen name from props - make it reactive
const page = usePage();
const screenName = computed(() => page.props.screen?.name || '');

const titleName = computed(() => {
  return (screenName.value ? screenName.value.charAt(0).toUpperCase() + screenName.value.slice(1) + ' - ' : '') + 'Projeler';
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

// Check if we're on a non-index page (show, create, or edit) - on mobile, hide sidebar for these pages
const isNonIndexPage = computed(() => {
  const currentUrl = page.url || '';

  // Service show page: /services/{slug} (but not /services, /services/create, /services/edit)
  const isServiceShowPage =
    currentUrl.startsWith('/services/') &&
    currentUrl !== '/services' &&
    !currentUrl.includes('/services/create') &&
    !currentUrl.includes('/services/edit');

  // Service create/edit pages
  const isServiceCreateEditPage = currentUrl === '/services/create' || currentUrl.includes('/services/edit');

  // Project show page: /projects/{id} (but not /projects, /projects/create, /projects/edit)
  const isProjectShowPage =
    currentUrl.startsWith('/projects/') &&
    currentUrl !== '/projects' &&
    !currentUrl.includes('/projects/create') &&
    !currentUrl.includes('/projects/edit');

  // Project create/edit pages
  const isProjectCreateEditPage = currentUrl === '/projects/create' || currentUrl.includes('/projects/edit');

  // Customer show page: /customers/{id} (but not /customers, /customers/create, /customers/edit)
  const isCustomerShowPage =
    currentUrl.startsWith('/customers/') &&
    currentUrl !== '/customers' &&
    !currentUrl.includes('/customers/create') &&
    !currentUrl.includes('/customers/edit');

  // Customer create/edit pages
  const isCustomerCreateEditPage = currentUrl === '/customers/create' || currentUrl.includes('/customers/edit');

  return isServiceShowPage || isServiceCreateEditPage || isProjectShowPage || isProjectCreateEditPage || isCustomerShowPage || isCustomerCreateEditPage;
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

// Handle sidebar width changes
const isSidebarNarrow = ref(false);

const mainContentClass = computed(() => {
  const classes = {
    'transition-all duration-300': true,
    'lg:ml-[-200px]': isSidebarNarrow.value,
    'lg:ml-[00px]': !isSidebarNarrow.value,
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

// Prevent body scrolling on projects pages
onMounted(() => {
  // Mark as mounted to enable sidebar rendering (client-side only)
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
