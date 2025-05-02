<template>
  <div>
    <SidebarLayout
      class="fixed inset-y-0 left-0 z-40 hidden w-56 overflow-hidden lg:block"
      @link-clicked="toggleSidebar"
    />
    <div class="lg:pl-56">
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
