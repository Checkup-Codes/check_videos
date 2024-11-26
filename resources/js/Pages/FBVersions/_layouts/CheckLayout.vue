<template>
  <Head :title="titleName" />
  <ToggleButton v-if="!isSidebarCollapsed" :isCollapsed="true" :toggle="collapseSidebar" />
  <CheckLayout :isCollapsed="isSidebarCollapsed">
    <SidebarLayoutVersion v-if="screenName === 'versions'" :class="sidebarStyle" />
    <slot name="screen"></slot>
  </CheckLayout>
</template>
<script setup>
import CheckLayout from '@/Components/CekapUI/Modals/CheckLayout.vue';
import SidebarLayoutVersion from '@/Pages/FBVersions/_layouts/SidebarLayoutVersion.vue';
import { usePage, Head } from '@inertiajs/vue3';
import { ref } from 'vue';

const { props } = usePage();
const sidebarStyle = props.isMobileSidebar ? '' : 'hidden lg:block';
const screenName = props.name;
const titleName = screenName.charAt(0).toUpperCase() + screenName.slice(1) + ' - ';
const isSidebarCollapsed = ref(true);
</script>
