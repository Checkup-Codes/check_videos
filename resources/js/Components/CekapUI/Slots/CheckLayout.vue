<template>
  <div :class="isCollapsed ? infoClass : 'h-[calc(100vh-7rem)] overflow-hidden'">
    <slot name="sidebar" v-if="isCollapsed"></slot>
    <slot />
  </div>
</template>

<script setup>
const props = defineProps({
  infoClass: {
    type: String,
    default: 'grid grid-cols-1 lg:grid-cols-subsidebar h-screen overflow-hidden overscroll-none scrollbar-hide',
  },
  isCollapsed: {
    type: Boolean,
  },
});
</script>

<style>
.scrollbar-hide {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
