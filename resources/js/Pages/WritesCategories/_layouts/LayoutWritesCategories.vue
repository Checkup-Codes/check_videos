<template>
  <FlashMessage :message="flashMessage" />
  <CheckLayout :isCollapsed="true" :class="currentTheme">
    <template #sidebar>
      <KeepAlive :max="5" :include="['SidebarLayoutWrite', 'SidebarLayoutCategory']">
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

// Get current theme
const currentTheme = computed(() => store.getters['Theme/getCurrentTheme']);

// Get screen name from props
const { props } = usePage();
const screenName = props.screen?.name || '';

// Sidebar component mapping
const sidebarComponents = {
  writes: SidebarLayoutWrite,
  categories: SidebarLayoutCategory,
};

// Determine which sidebar component to display based on screen name
const sidebarComponent = computed(() => {
  if (isCollapsed.value && screenName) {
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
  'lg:ml-[-200px]': isSidebarNarrow.value,
  'lg:ml-[00px]': !isSidebarNarrow.value,
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
