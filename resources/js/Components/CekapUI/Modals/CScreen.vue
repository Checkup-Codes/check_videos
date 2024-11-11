<template>
  <div :class="infoClass">
    <slot />
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  infoClass: {
    type: String,
    default: 'bg-screen-bg h-screen px-3 pt-3',
  },
});
</script>
