<template>
  <FlashMessage :message="flashSuccess" />
  <ToggleSubSidebarButtonOpen v-if="!isSidebarCollapsed" :isCollapsed="true" :toggle="collapseSidebar" />
  <CheckLayout :isCollapsed="isSidebarCollapsed">
    <template #sidebar>
      <KeepAlive :max="5" :include="['SidebarLayoutWrite', 'SidebarLayoutCategory']">
        <component
          :is="sidebarComponent"
          :key="screenName"
          @update:isCollapsed="handleSidebarCollapse"
          :class="sidebarStyle"
        />
      </KeepAlive>
    </template>
    <div :class="isMobile ? 'hidden lg:block' : 'block'">
      <slot name="screen"></slot>
    </div>
  </CheckLayout>
</template>

<script setup>
import CheckLayout from '@/Components/CekapUI/Slots/CheckLayout.vue';
import SidebarLayoutWrite from '@/Pages/WritesCategories/_layouts/SidebarLayoutWrite.vue';
import SidebarLayoutCategory from '@/Pages/WritesCategories/_layouts/SidebarLayoutCategory.vue';
import FlashMessage from '@/Components/CekapUI/Notifications/FlashMessage.vue';
import ToggleSubSidebarButtonOpen from '@/Components/CekapUI/Buttons/ToggleSubSidebarButton.vue';
import { usePage, router } from '@inertiajs/vue3';
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue';

// Component name definition for dev tools
defineOptions({
  name: 'LayoutWritesCategories',
});

// Get page props
const { props } = usePage();
const isMobile = props.screen?.isMobileSidebar || false;
const sidebarStyle = isMobile ? '' : 'hidden lg:block';
const screenName = props.screen?.name || '';

const flashSuccess = ref(props.flash?.success || '');
const isSidebarCollapsed = ref(true);

// Watch for flash message changes
watch(
  () => props.flash?.success,
  (newVal) => {
    if (newVal) {
      flashSuccess.value = newVal;
    }
  }
);

// Sidebar component mapping
const sidebarComponents = {
  writes: SidebarLayoutWrite,
  categories: SidebarLayoutCategory,
};

// Determine which sidebar component to display based on screen name
const sidebarComponent = computed(() => {
  if (isSidebarCollapsed.value && screenName) {
    return sidebarComponents[screenName] || null;
  }
  return null;
});

// Setup default navigation behavior when component is mounted
onMounted(() => {
  // Preserve scroll and state when navigating between writes and categories
  if (window.Inertia) {
    window.Inertia.visit = Object.assign(window.Inertia.visit || {}, {
      preserveScroll: true,
      preserveState: true,
    });
  }
});

// Clean up when component is unmounted
onBeforeUnmount(() => {
  // Clear state to prevent memory leaks
  flashSuccess.value = '';
});

// Event handlers for sidebar collapse state
const handleSidebarCollapse = (newState) => {
  isSidebarCollapsed.value = newState;
};

const collapseSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
};
</script>
