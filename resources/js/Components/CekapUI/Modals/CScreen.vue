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
    default: 'mx-auto mt-0 h-screen w-full max-w-full overflow-auto bg-screen-bg lg:pb-10 px-3 lg:mt-3',
  },
});
</script>
