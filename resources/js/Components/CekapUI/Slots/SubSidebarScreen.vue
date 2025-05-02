<template>
  <p :class="infoClass">
    <slot />
  </p>
</template>

<script setup>
const props = defineProps({
  infoClass: {
    type: String,
    default: 'h-screen-minus-28 lg:h-screen-minus-20 overflow-y-auto overscroll-contain',
  },
});
</script>
