<template>
  <SidebarLayout :class="sidebarClass" @link-clicked="toggleSidebar" />
  <div :class="contentWrapperClass">
    <HeaderLayout @toggle-sidebar="toggleSidebar" />
    <slot />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import HeaderLayout from './MainLayout/HeaderLayout.vue';
import SidebarLayout from './MainLayout/SidebarLayout.vue';

const showSidebar = ref(false);

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value;
};

const sidebarClass = 'fixed inset-y-0 left-0 z-40 hidden overflow-hidden lg:block lg:w-64 xl:w-72';
const contentWrapperClass = 'lg:pl-64 xl:pl-72';
</script>
