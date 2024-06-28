<template>
  <div class="lg:grid-cols-subsidebar grid h-full grid-cols-1">
    <SidebarLayoutWrite class="hidden lg:block" />
    <div class="p-4">Write</div>
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
