<template>
  <div class="bg-theme-background">
    <SidebarLayout
      class="fixed inset-y-0 left-0 z-40 hidden w-56 overflow-hidden rounded-theme border-theme bg-theme-background text-theme-text shadow lg:block"
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
import { ref, onMounted } from 'vue';
import HeaderLayout from './MainLayout/HeaderLayout.vue';
import SidebarLayout from './MainLayout/SidebarLayout.vue';
import { useThemeStore } from '@/Stores/themeStore';

const themeStore = useThemeStore();
const showSidebar = ref(false);
const selectedTheme = ref('light');
const currentPalette = ref('modern');

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value;
};

onMounted(() => {
  const storedTheme = localStorage.getItem('selectedTheme');
  const storedPalette = localStorage.getItem('selectedPalette');

  if (!storedTheme) {
    selectedTheme.value = 'light';
    themeStore.setTheme('light');
    localStorage.setItem('selectedTheme', 'light');
  } else {
    selectedTheme.value = storedTheme;
    themeStore.setTheme(storedTheme);
  }

  if (!storedPalette) {
    currentPalette.value = 'modern';
    themeStore.applyPalette('modern');
    localStorage.setItem('selectedPalette', 'modern');
  } else {
    currentPalette.value = storedPalette;
    themeStore.applyPalette(storedPalette);
  }
});
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
