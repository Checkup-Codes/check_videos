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
  isNarrow: {
    type: Boolean,
    default: false,
  },
});

const computedClass = computed(() => {
  const baseClasses = `${props.infoClass} bg-base-200 overscroll-none`;
  return props.isNarrow ? `${baseClasses} subsidebar-narrow` : baseClasses;
});
</script>

<style>
.subsidebar-narrow {
  width: 200px;
  transition: width 0.3s ease;
}

.subsidebar-narrow .overflow-hidden {
  width: 200px;
}
</style>
