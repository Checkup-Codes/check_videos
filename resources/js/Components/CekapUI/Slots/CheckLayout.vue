<template>
  <div :class="isCollapsed ? infoClass : ''">
    <slot name="sidebar"></slot>
    <slot />
  </div>
</template>

<script setup>
const props = defineProps({
  infoClass: {
    type: String,
    default: 'grid grid-cols-1 lg:grid-cols-subsidebar h-screen-minus-1 overflow-y-auto overscroll-none scrollbar-hide',
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
