<template>
  <div class="lg:grid-cols-sidebar grid h-screen grid-cols-1">
    <SidebarLayout class="hidden lg:block" @link-clicked="toggleSidebar" />
    <!-- Sidebar hidden on mobile -->

    <div class="flex flex-1 flex-col">
      <HeaderLayout @toggle-sidebar="toggleSidebar" />
      <div class="flex-1 overflow-auto">
        <slot>Default Content</slot>
      </div>
    </div>

    <!-- Sidebar for mobile -->
    <transition name="fade">
      <div v-if="showSidebar" class="fixed inset-0 z-50 flex items-end lg:hidden">
        <div class="absolute inset-0 bg-black bg-opacity-50" @click="toggleSidebar"></div>
        <transition name="slide-up">
          <div class="relative h-4/5 w-full overflow-auto rounded-2xl rounded-b-none bg-white">
            <SidebarLayout class="h-full" @link-clicked="toggleSidebar" />
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import HeaderLayout from './CheckLayout/HeaderLayout.vue';
import SidebarLayout from './CheckLayout/SidebarLayout.vue';

const showSidebar = ref(false);

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value;
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease-out;
}
.slide-up-enter,
.slide-up-leave-to {
  transform: translateY(100%);
}
</style>
