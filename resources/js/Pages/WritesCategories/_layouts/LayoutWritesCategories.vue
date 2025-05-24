<template>
  <FlashMessage :message="flashMessage" />
  <ToggleSubSidebarButtonOpen v-if="!isCollapsed" :isCollapsed="true" :toggle="toggleSidebar" />
  <CheckLayout :isCollapsed="isCollapsed">
    <template #sidebar>
      <KeepAlive :max="5" :include="['SidebarLayoutWrite', 'SidebarLayoutCategory']">
        <component :is="sidebarComponent" :key="screenName" :class="sidebarStyle" />
      </KeepAlive>
    </template>
    <div :class="isMobile ? 'hidden lg:block' : 'block'">
      <slot name="screen"></slot>
    </div>
  </CheckLayout>
</template>

<script setup>
import { computed } from 'vue';
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
</script>
