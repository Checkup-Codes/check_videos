<template>
  <Head :title="titleName" />
  <FlashMessage :message="flashMessage" @close="handleFlashClose" />
  <CheckLayout :isCollapsed="isCollapsed">
    <template #sidebar>
      <KeepAlive v-if="isCollapsed && isMounted" :max="5" :include="['SidebarLayoutProject']">
        <component
          :is="SidebarLayoutProject"
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
const { isCollapsed, isMobile, toggleSidebar, sidebarStyle } = useSidebar();
const { flashMessage } = useFlashMessage();

const handleFlashClose = () => {
  flashMessage.value = '';
};

// Get screen name from props
const page = usePage();
const { props } = page;
const screenName = props.screen?.name || '';

const titleName = computed(() => {
  return (screenName ? screenName.charAt(0).toUpperCase() + screenName.slice(1) + ' - ' : '') + 'Projeler';
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

// Track if component is mounted (client-side only)
const isMounted = ref(false);

// Prevent body scrolling on projects pages
onMounted(() => {
  // Mark as mounted to enable sidebar rendering (client-side only)
  isMounted.value = true;
  document.body.style.overflow = 'hidden';
});

onBeforeUnmount(() => {
  document.body.style.overflow = '';
});
</script>

<style>
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>
