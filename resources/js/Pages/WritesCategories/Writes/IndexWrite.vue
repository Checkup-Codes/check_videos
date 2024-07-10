<template>
  <div class="grid h-full grid-cols-1 lg:grid-cols-subsidebar">
    <SidebarLayoutWrite class="hidden lg:block" />
    <div class="hidden lg:block">
      <div class="min-h-screen bg-gray-100">
        <header class="flex h-screen items-center justify-center bg-gray-100 text-black">
          <div class="text-center">
            <h2 class="animate__animated animate__fadeInDown mb-4 text-4xl font-bold">Yazılar</h2>
            <p class="animate__animated animate__fadeInUp mb-6 text-lg"></p>
          </div>
        </header>
      </div>
    </div>
  </div>
</template>

<script setup>
import SidebarLayoutWrite from './SidebarLayoutWrite.vue';

const baseClasses = 'm-2 block cursor-pointer rounded-lg p-2 text-black transition-all transition-colors duration-200';
const hoverClasses = 'hover:bg-gray-900 hover:px-2.5 hover:text-white hover:shadow-lg';
const activeClasses = 'bg-gray-900 text-white font-bold shadow-lg';

const getLinkClasses = (menu) => {
  return activeMenu.value === menu ? `${baseClasses} ${activeClasses}` : `${baseClasses} ${hoverClasses}`;
};
</script>
