<template>
  <FlashMessage :message="flashMessage" @close="handleFlashClose" />
  <CheckLayout
    :isCollapsed="!shouldHideSidebarContent"
    :show-sidebar-on-mobile="shouldShowSidebarOnMobile"
    :show-main-content-on-mobile="shouldShowMainContentOnMobile"
  >
    <template #sidebar>
      <!-- SSR'da sidebar içeriğini gizle, sadece client-side'da göster -->
      <!-- Mobil show sayfalarında sidebar hiç render edilmez -->
      <KeepAlive
        v-if="!shouldHideSidebarContent && isMounted && shouldShowSidebarOnMobile"
        :max="5"
        :include="['SidebarLayoutTest', 'SidebarLayoutCategory']"
      >
        <component :is="sidebarComponent" :key="screenName" @update:isNarrow="handleSidebarWidthChange" />
      </KeepAlive>
    </template>
    <div :class="[shouldShowMainContentOnMobile ? 'block' : 'hidden lg:block', mainContentClass]">
      <slot name="screen"></slot>
    </div>
  </CheckLayout>
</template>

<script setup>
import { computed, ref, provide, watch, onMounted, onBeforeUnmount } from 'vue';
import { usePage } from '@inertiajs/vue3';
import CheckLayout from '@/Components/CekapUI/Slots/CheckLayout.vue';
import SidebarLayoutTest from './SidebarLayoutTest.vue';
import SidebarLayoutCategory from './SidebarLayoutCategory.vue';
import FlashMessage from '@/Components/CekapUI/Notifications/FlashMessage.vue';
import { useSidebar } from '../_utils/useSidebar';
import { useFlashMessage } from '../_utils/useFlashMessage';
import { useStore } from 'vuex';

defineOptions({
  name: 'LayoutTestCategories',
});

const { isCollapsed, toggleSidebar, sidebarStyle } = useSidebar();
const { flashMessage } = useFlashMessage();
const store = useStore();

const handleFlashClose = () => {
  flashMessage.value = '';
};

// Get screen name from props - make it reactive
const page = usePage();
const screenName = computed(() => page.props.screen?.name || 'tests');

const sidebarComponents = {
  tests: SidebarLayoutTest,
  test_categories: SidebarLayoutCategory,
};

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

// Check if we're on a non-index page (show, create, or edit) - on mobile, hide sidebar for these pages
const isNonIndexPage = computed(() => {
  const currentUrl = page.url || '';

  // Test show page: /tests/{slug} (but not /tests, /tests/create, /tests/edit, /tests/take, /tests/result)
  const isTestShowPage =
    currentUrl.startsWith('/tests/') &&
    currentUrl !== '/tests' &&
    !currentUrl.includes('/tests/create') &&
    !currentUrl.includes('/tests/edit') &&
    !currentUrl.includes('/tests/take') &&
    !currentUrl.includes('/tests/result');

  // Test create/edit pages
  const isTestCreateEditPage = currentUrl === '/tests/create' || currentUrl.includes('/tests/edit');

  // Category show page: /test-categories/{slug}
  // (but not /test-categories, /test-categories/create, /test-categories/edit)
  const isCategoryShowPage =
    currentUrl.startsWith('/test-categories/') &&
    currentUrl !== '/test-categories' &&
    !currentUrl.includes('/test-categories/create') &&
    !currentUrl.includes('/test-categories/edit');

  // Category create/edit pages
  const isCategoryCreateEditPage = currentUrl === '/test-categories/create' || currentUrl.includes('/test-categories/edit');

  return isTestShowPage || isTestCreateEditPage || isCategoryShowPage || isCategoryCreateEditPage;
});

const shouldHideSidebarContent = computed(() => {
  // Test çözme ve sonuç sayfalarında sidebar'ı gizle
  const url = page.url;
  return url.includes('/take') || url.includes('/result');
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

// Determine which sidebar component to display based on screen name
const sidebarComponent = computed(() => {
  if (isCollapsed.value && screenName.value && !shouldHideSidebarContent.value && shouldShowSidebarOnMobile.value) {
    return sidebarComponents[screenName.value] || null;
  }
  return null;
});

const isSidebarNarrow = ref(store.getters['Writes/isCollapsed']);

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
    'lg:ml-[-200px]': isSidebarNarrow.value && !shouldHideSidebarContent.value,
    'lg:ml-[00px]': !isSidebarNarrow.value && !shouldHideSidebarContent.value,
    'lg:ml-0': shouldHideSidebarContent.value,
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

const isMounted = ref(false);

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
const categories = computed(() => page.props.categories || []);
const tests = computed(() => page.props.tests || []);

provide('categories', categories);
provide('tests', tests);
</script>

<style>
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>
