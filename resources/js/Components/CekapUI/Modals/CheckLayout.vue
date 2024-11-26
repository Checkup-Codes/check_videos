<template>
  <div :class="isCollapsed ? infoClass : ''">
    <slot />
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  infoClass: {
    type: String,
    default: 'grid grid-cols-1 h-[100%] lg:grid-cols-subsidebar',
  },
  isCollapsed: {
    type: Boolean,
  },
});
</script>
