<template>
  <p :class="infoClass">
    <slot />
  </p>
</template>

<script setup>
const props = defineProps({
  infoClass: {
    type: String,
    default: 'mb-6 border-l-4 border-gray-300 pl-4 text-sm text-gray-700',
  },
});
</script>
