<template>
  <Head :title="titleName" />
  <FlashMessage :message="flashSuccess" />
  <CheckLayout :isCollapsed="true">
    <SidebarLayoutVersion
      v-if="isSidebarCollapsed && screenName === 'versions'"
      @update:isCollapsed="handleSidebarCollapse"
      :class="sidebarStyle"
    />
    <div :class="isMobile ? 'hidden lg:block' : 'block'">
      <slot name="screen"></slot>
    </div>
  </CheckLayout>
</template>

<script setup>
import CheckLayout from '@/Components/CekapUI/Slots/CheckLayout.vue';
import SidebarLayoutVersion from '@/Pages/FBVersions/_layouts/SidebarLayoutVersion.vue';
import FlashMessage from '@/Components/CekapUI/Notifications/FlashMessage.vue';
import { usePage, Head } from '@inertiajs/vue3';
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

const page = usePage();
const props = computed(() => page.props);
const flashSuccess = computed(() => props.value.flash?.message);
console.log(props.value);
const sidebarStyle = computed(() => (props.value.screen.isMobileSidebar ? '' : 'hidden lg:block'));
const screenName = props.value.screen?.name || '';
const titleName = computed(() => {
  const name = screenName.value;
  return name ? name.charAt(0).toUpperCase() + name.slice(1) + '  ' : '';
});
const isMobile = computed(() => props.screen?.isMobileSidebar || false);
const isSidebarCollapsed = ref(true);

const handleSidebarCollapse = (newState) => {
  isSidebarCollapsed.value = newState;
};

// Prevent body scrolling on versions pages
onMounted(() => {
  document.body.style.overflow = 'hidden';
});

onBeforeUnmount(() => {
  document.body.style.overflow = '';
});
</script>
