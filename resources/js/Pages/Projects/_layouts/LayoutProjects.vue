<template>
  <Head :title="titleName" />
  <FlashMessage :message="flashSuccess" />
  <CheckLayout :isCollapsed="isSidebarCollapsed">
    <SidebarLayoutProject v-if="isSidebarCollapsed" @update:isCollapsed="handleSidebarCollapse" :class="sidebarStyle" />
    <div :class="isMobile ? 'hidden lg:block' : 'block'">
      <slot name="screen"></slot>
    </div>
  </CheckLayout>
</template>

<script setup>
import CheckLayout from '@/Components/CekapUI/Slots/CheckLayout.vue';
import SidebarLayoutProject from '@/Pages/Projects/_layouts/SidebarLayoutProject.vue';
import FlashMessage from '@/Components/CekapUI/Notifications/FlashMessage.vue';
import { usePage, Head } from '@inertiajs/vue3';
import { ref, computed } from 'vue';

const { props } = usePage();
const isMobile = props.screen.isMobileSidebar;
const sidebarStyle = isMobile ? '' : 'hidden lg:block';
const screenName = props.screen.name;
const titleName = computed(() => {
  return (screenName ? screenName.charAt(0).toUpperCase() + screenName.slice(1) + ' - ' : '') + 'Projeler';
});
const flashSuccess = ref(props.flash?.success || '');
const isSidebarCollapsed = ref(true);

const handleSidebarCollapse = (newState) => {
  isSidebarCollapsed.value = newState;
};
</script>
