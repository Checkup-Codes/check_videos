<template>
  <div :class="computedClass">
    <div class="h-screen-minus-12 overflow-y-auto overscroll-none lg:h-screen-minus">
      <div class="container mx-auto">
        <slot />
      </div>
    </div>
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
  return `${props.infoClass} h-[calc(100h)] overflow-hidden`;
});
</script>
