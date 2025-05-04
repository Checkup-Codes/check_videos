<template>
  <div>
    <SidebarLayout
      class="fixed inset-y-0 left-0 z-40 hidden overflow-hidden lg:block lg:w-64 xl:w-72"
      @link-clicked="toggleSidebar"
    />
    <div class="lg:pl-64 xl:pl-72">
      <HeaderLayout @toggle-sidebar="toggleSidebar" />
      <div>
        <slot>Default Content</slot>
      </div>
    </div>
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
</script>
