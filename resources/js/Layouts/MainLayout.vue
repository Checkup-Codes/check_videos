<template>
  <div class="flex h-[100%] overflow-hidden">
    <!-- Sidebar -->
    <SidebarLayout
      class="fixed left-0 top-0 z-40 hidden h-full w-56 overflow-y-auto lg:block"
      @link-clicked="toggleSidebar"
    />

    <!-- Main Content -->
    <div class="flex h-[100%] flex-1 flex-col lg:pl-56">
      <!-- Header -->
      <HeaderLayout class="sticky top-0 z-30 block h-10 w-full bg-white lg:left-56" @toggle-sidebar="toggleSidebar" />

      <!-- Content -->
      <div class="flex-1 overflow-auto lg:mt-0">
        <slot>Default Content</slot>
      </div>

      <div class="hidden overflow-hidden bg-gray-100 py-1 lg:block">
        <div class="marquee-container">
          <div ref="marquee" class="marquee">Haber kanallarında olmazsa olmazıydı ben de eklemek istedim.</div>
        </div>
      </div>
    </div>

    <transition name="fade">
      <div v-if="showSidebar" class="fixed inset-0 z-50 flex lg:hidden">
        <div class="absolute inset-0 bg-black bg-opacity-50" @click="toggleSidebar"></div>
        <transition name="slide-up">
          <div class="relative h-full w-56 overflow-y-auto bg-white">
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

const showSidebar = ref(false);

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value;
};

const marquee = ref(null);
onMounted(() => {
  const marqueeElement = marquee.value;
  const containerWidth = marqueeElement.parentElement.offsetWidth;
  const textWidth = marqueeElement.offsetWidth;

  const keyframes = `
    @keyframes scroll-left {
      0% { transform: translateX(${containerWidth}px); }
      100% { transform: translateX(-${textWidth}px); }
    }
  `;

  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerHTML = keyframes;
  document.head.appendChild(styleSheet);
});
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

.marquee-container {
  overflow: hidden;
  white-space: nowrap;
  position: relative;
}

.marquee {
  display: inline-block;
  white-space: nowrap;
  animation: scroll-left 15s linear infinite;
}
</style>
