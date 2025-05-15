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
    default: 'grid grid-cols-1 lg:grid-cols-subsidebar overscroll-none',
  },
  isCollapsed: {
    type: Boolean,
  },
});
</script>
