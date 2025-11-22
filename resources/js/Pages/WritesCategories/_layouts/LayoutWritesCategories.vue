<template>
  <FlashMessage :message="flashMessage" />
  <CheckLayout :isCollapsed="!shouldHideSidebarContent">
    <template #sidebar>
      <KeepAlive v-if="!shouldHideSidebarContent" :max="5" :include="['SidebarLayoutWrite', 'SidebarLayoutCategory']">
        <component
          :is="sidebarComponent"
          :key="screenName"
          :class="sidebarStyle"
          @update:isNarrow="handleSidebarWidthChange"
        />
      </KeepAlive>
    </template>
    <div :class="[isMobile ? 'hidden lg:block' : 'block', mainContentClass]">
      <slot name="screen"></slot>
    </div>
  </CheckLayout>
</template>

<script setup>
import { computed, ref, provide, watch, onMounted, onBeforeUnmount } from 'vue';
import { usePage } from '@inertiajs/vue3';
import CheckLayout from '@/Components/CekapUI/Slots/CheckLayout.vue';
import SidebarLayoutWrite from './SidebarLayoutWrite.vue';
import SidebarLayoutCategory from './SidebarLayoutCategory.vue';
import FlashMessage from '@/Components/CekapUI/Notifications/FlashMessage.vue';
import { useSidebar } from '../_utils/useSidebar';
import { useFlashMessage } from '../_utils/useFlashMessage';
import { useStore } from 'vuex';

// Component name definition for dev tools
defineOptions({
  name: 'LayoutWritesCategories',
});

// Composables
const { isCollapsed, isMobile, toggleSidebar, sidebarStyle } = useSidebar();
const { flashMessage } = useFlashMessage();
const store = useStore();

// Get screen name from props
const page = usePage();
const { props } = page;
const screenName = props.screen?.name || '';

// Sidebar component mapping
const sidebarComponents = {
  writes: SidebarLayoutWrite,
  categories: SidebarLayoutCategory,
};

// Check if user is logged in
const isLoggedIn = computed(() => {
  return !!(props.auth && props.auth.user);
});

// Check if current write is link-only and user is not logged in
const shouldHideSidebarContent = computed(() => {
  // Debug logging
  console.log('LayoutWritesCategories Debug:', {
    isLoggedIn: isLoggedIn.value,
    currentUrl: props.url,
    currentWrite: props.write,
    writeStatus: props.write?.status,
    screenName: screenName,
  });

  // If user is logged in, always show sidebar content
  if (isLoggedIn.value) {
    console.log('User is logged in, showing sidebar');
    return false;
  }

  // Check if we're on a write show page and the write is link-only
  const currentUrl = page.url || props.url || '';
  const isWriteShowPage =
    currentUrl.includes('/writes/') && !currentUrl.includes('/writes/create') && !currentUrl.includes('/writes/edit');

  // Also check for categories with link-only writes
  const isCategoryShowPage =
    currentUrl.includes('/categories/') &&
    !currentUrl.includes('/categories/create') &&
    !currentUrl.includes('/categories/edit');

  console.log('Page check:', { currentUrl, isWriteShowPage, isCategoryShowPage });

  if (isWriteShowPage || isCategoryShowPage) {
    // Check if the current write has link_only status
    const currentWrite = props.write;
    console.log('Current write status:', currentWrite?.status);

    if (currentWrite && currentWrite.status === 'link_only') {
      console.log('Hiding sidebar for link-only write');
      return true;
    }
  }

  console.log('Showing sidebar (default)');
  return false;
});

// Debug shouldHideSidebarContent value
watch(
  shouldHideSidebarContent,
  (newValue) => {
    console.log('shouldHideSidebarContent changed:', newValue);
  },
  { immediate: true }
);

// Determine which sidebar component to display based on screen name
const sidebarComponent = computed(() => {
  if (isCollapsed.value && screenName && !shouldHideSidebarContent.value) {
    return sidebarComponents[screenName] || null;
  }
  return null;
});

// Handle sidebar width changes
const isSidebarNarrow = ref(store.getters['Writes/isCollapsed']);

// Sync with store on mount and when store changes
watch(
  () => store.getters['Writes/isCollapsed'],
  (val) => {
    isSidebarNarrow.value = val;
  },
  { immediate: true }
);

const mainContentClass = computed(() => ({
  'transition-all duration-300': true,
  'lg:ml-[-200px]': isSidebarNarrow.value && !shouldHideSidebarContent.value,
  'lg:ml-[00px]': !isSidebarNarrow.value && !shouldHideSidebarContent.value,
  'lg:ml-0': shouldHideSidebarContent.value, // Full width when sidebar is hidden
}));

const handleSidebarWidthChange = (isNarrow) => {
  isSidebarNarrow.value = isNarrow;
};

// Prevent body scrolling on writes pages
onMounted(() => {
  document.body.style.overflow = 'hidden';
});

onBeforeUnmount(() => {
  document.body.style.overflow = '';
});

provide('categories', props.categories || []);
provide('writes', props.writes || []);
</script>

<style>
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>
