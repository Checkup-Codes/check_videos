<template>
  <div :class="shellClasses">
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  /**
   * wide: grid/list pages (max 1400px)
   * content: create/edit forms (max 768px)
   * detail: show pages and single-column views (max 896px)
   */
  width: {
    type: String,
    default: 'wide',
    validator: (value) => ['wide', 'content', 'detail'].includes(value),
  },
  class: {
    type: String,
    default: '',
  },
});

const widthClasses = {
  wide: 'max-w-[1400px]',
  content: 'max-w-3xl',
  detail: 'max-w-4xl',
};

const shellClasses = computed(() => [
  'mx-auto px-4 py-6 sm:px-6 sm:py-8',
  widthClasses[props.width],
  props.class,
]);
</script>
