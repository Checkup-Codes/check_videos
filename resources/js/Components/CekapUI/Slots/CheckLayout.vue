<template>
  <div :class="isCollapsed ? infoClass : ''">
    <slot />
  </div>
</template>

<script setup>
const props = defineProps({
  infoClass: {
    type: String,
    default: 'grid grid-cols-1 lg:grid-cols-subsidebar',
  },
  isCollapsed: {
    type: Boolean,
  },
});
</script>
