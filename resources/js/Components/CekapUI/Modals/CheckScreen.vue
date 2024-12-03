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
    default: '',
  },
});

const computedClass = computed(() => {
  return `${props.infoClass} h-[calc(94vh)] lg:h-[calc(95vh)]`;
});
</script>
