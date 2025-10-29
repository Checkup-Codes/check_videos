<template>
  <p :class="infoClass">
    <slot />
  </p>
</template>

<script setup>
const props = defineProps({
  infoClass: {
    type: String,
    default: 'h-[calc(100vh-3.5rem)] lg:h-[calc(100vh-8rem)] overflow-y-auto overscroll-none',
  },
});
</script>
