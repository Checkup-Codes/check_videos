<template>
  <div :class="computedClass">
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  infoClass: {
    type: String,
    default: '',
  },
});

const computedClass = computed(() => {
  return `${props.infoClass} bg-theme-background rounded-theme text-theme-text relative border-r flex-shrink-0 min-w-[var(--subsidebar-width)]`;
});
</script>
