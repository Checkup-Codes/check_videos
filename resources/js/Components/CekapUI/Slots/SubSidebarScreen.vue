<template>
  <p :class="infoClass">
    <slot />
  </p>
</template>

<script setup>
const props = defineProps({
  infoClass: {
    type: String,
    default: 'h-[calc(100vh-11rem)] lg:h-[calc(100vh-10rem)] overflow-y-auto overscroll-none',
  },
});
</script>
