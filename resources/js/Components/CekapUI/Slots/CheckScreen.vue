<template>
  <div :class="computedClass">
    <div class="lg:h-screen-minus-1 h-screen-minus-1 overflow-y-auto overscroll-contain">
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
  return `${props.infoClass} h-[calc(100h)]  overflow-hidden`;
});
</script>
