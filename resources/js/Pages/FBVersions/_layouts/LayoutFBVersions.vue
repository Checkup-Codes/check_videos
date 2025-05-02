<template>
  <Head :title="titleName" />
  <FlashMessage :message="flashSuccess" />
  <ToggleSubSidebarButtonOpen v-if="!isSidebarCollapsed" :isCollapsed="true" :toggle="collapseSidebar" />
  <CheckLayout :isCollapsed="isSidebarCollapsed">
    <SidebarLayoutVersion
      v-if="isSidebarCollapsed && screenName === 'versions'"
      @update:isCollapsed="handleSidebarCollapse"
      :class="sidebarStyle"
    />
    <div :class="isMobile ? 'hidden' : 'block'" class="w-full">
      <slot name="screen"></slot>
    </div>
  </CheckLayout>
</template>

<script setup>
import CheckLayout from '@/Components/CekapUI/Slots/CheckLayout.vue';
import SidebarLayoutVersion from '@/Pages/FBVersions/_layouts/SidebarLayoutVersion.vue';
import FlashMessage from '@/Components/CekapUI/Notifications/FlashMessage.vue';
import ToggleSubSidebarButtonOpen from '@/Components/CekapUI/Buttons/ToggleSubSidebarButton.vue';
import { usePage, Head } from '@inertiajs/vue3';
import { ref, computed } from 'vue';

const page = usePage();
const props = computed(() => page.props);
const flashSuccess = computed(() => props.value.flash?.message);
const sidebarStyle = computed(() => (props.value.isMobileSidebar ? '' : 'hidden lg:block'));
const screenName = computed(() => props.value.name);
const titleName = computed(() => {
  const name = screenName.value;
  return name ? name.charAt(0).toUpperCase() + name.slice(1) + ' - ' : '';
});
const isMobile = computed(() => props.value.isMobile || false);
const isSidebarCollapsed = ref(true);

const collapseSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
};

const handleSidebarCollapse = (newState) => {
  isSidebarCollapsed.value = newState;
};
</script>
