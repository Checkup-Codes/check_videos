<template>
  <FlashMessage :message="flashMessage" />
  <ToggleSubSidebarButtonOpen v-if="!isCollapsed" :isCollapsed="true" :toggle="toggleSidebar" />
  <CheckLayout :isCollapsed="true">
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
import { computed, ref } from 'vue';
import { usePage } from '@inertiajs/vue3';
import CheckLayout from '@/Components/CekapUI/Slots/CheckLayout.vue';
import SidebarLayoutWrite from './SidebarLayoutWrite.vue';
import SidebarLayoutCategory from './SidebarLayoutCategory.vue';
import FlashMessage from '@/Components/CekapUI/Notifications/FlashMessage.vue';
import ToggleSubSidebarButtonOpen from '@/Components/CekapUI/Buttons/ToggleSubSidebarButton.vue';
import { useSidebar } from '../_utils/useSidebar';
import { useFlashMessage } from '../_utils/useFlashMessage';

// Component name definition for dev tools
defineOptions({
  name: 'LayoutWritesCategories',
});

// Composables
const { isCollapsed, isMobile, toggleSidebar, sidebarStyle } = useSidebar();
const { flashMessage } = useFlashMessage();

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
const isSidebarNarrow = ref(false);
const mainContentClass = computed(() => ({
  'transition-all duration-300': true,
  'lg:ml-[-200px]': isSidebarNarrow.value,
  'lg:ml-[00px]': !isSidebarNarrow.value,
}));

const handleSidebarWidthChange = (isNarrow) => {
  isSidebarNarrow.value = isNarrow;
};
</script>

<style>
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>
