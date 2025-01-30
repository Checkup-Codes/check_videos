<template>
  <div :class="computedClass">
    <div
      class="h-screen-minus-10 w-full max-w-full overflow-y-scroll break-words rounded-lg bg-theme-background lg:h-screen"
    >
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
