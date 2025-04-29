<template>
  <div class="bg-white">
    <SidebarLayout
      class="fixed inset-y-0 left-0 z-40 hidden w-56 overflow-hidden rounded border bg-white text-gray-900 shadow lg:block"
      @link-clicked="toggleSidebar"
    />

    <div class="h-full overflow-hidden lg:pl-56">
      <HeaderLayout @toggle-sidebar="toggleSidebar" />
      <div>
        <slot>Default Content</slot>
      </div>
    </div>

    <transition name="fade">
      <div v-if="showSidebar" class="fixed inset-0 z-50 flex lg:hidden">
        <div class="absolute inset-0 bg-opacity-50" @click="toggleSidebar"></div>

        <transition name="slide-up">
          <div class="relative h-full w-56 overflow-y-auto shadow">
            <SidebarLayout @link-clicked="toggleSidebar" />
          </div>
        </transition>
      </div>
    </transition>
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

<style scoped>
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
