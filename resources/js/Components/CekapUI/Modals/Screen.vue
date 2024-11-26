<template>
  <div :class="computedClass">
    <slot />
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue';

const props = defineProps({
  infoClass: {
    type: String,
    default: 'mx-auto px-3',
  },
});

const computedClass = computed(() => {
  return `${props.infoClass} h-[calc(95vh)] lg:h-[calc(95vh)] lg:pt-3`;
});
</script>
