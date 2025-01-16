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
    <div :class="isMobile ? 'hidden' : 'block'">
      <slot name="screen"></slot>
    </div>
  </CheckLayout>
</template>

<script setup>
import CheckLayout from '@/Components/CekapUI/Modals/CheckLayout.vue';
import SidebarLayoutVersion from '@/Pages/FBVersions/_layouts/SidebarLayoutVersion.vue';
import FlashMessage from '@/Components/CekapUI/Notifications/FlashMessage.vue';
import ToggleSubSidebarButtonOpen from '@/Components/CekapUI/Buttons/ToggleSubSidebarButton.vue';
import { usePage, Head } from '@inertiajs/vue3';
import { ref } from 'vue';

const { props } = usePage();
const sidebarStyle = props.isMobileSidebar ? '' : 'hidden lg:block';
const screenName = props.name;
const titleName = screenName.charAt(0).toUpperCase() + screenName.slice(1) + ' - ';
const isSidebarCollapsed = ref(true);

const collapseSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
};

const handleSidebarCollapse = (newState) => {
  isSidebarCollapsed.value = newState;
};
</script>
