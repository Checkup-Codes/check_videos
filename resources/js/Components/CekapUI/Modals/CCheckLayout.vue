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
    default: 'grid mt-12 lg:mt-0 h-full grid-cols-1 lg:grid-cols-subsidebar',
  },
  isCollapsed: {
    type: Boolean,
  },
});
</script>
