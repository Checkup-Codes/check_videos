<template>
  <button
    :class="[
      'btn',
      variantClass,
      sizeClass,
      { 'btn-outline': outline },
      { 'btn-block': block },
      { 'btn-circle': circle },
      { 'btn-loading': loading },
      { 'no-animation': !animated },
    ]"
    :disabled="disabled || loading"
    @click="$emit('click')"
  >
    <slot v-if="!loading"></slot>
    <span v-if="loading" class="loading loading-spinner"></span>
  </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) =>
      [
        'default',
        'primary',
        'secondary',
        'accent',
        'info',
        'success',
        'warning',
        'error',
        'link',
        'ghost',
        'neutral',
      ].includes(value),
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['xs', 'sm', 'md', 'lg'].includes(value),
  },
  outline: {
    type: Boolean,
    default: false,
  },
  block: {
    type: Boolean,
    default: false,
  },
  circle: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  animated: {
    type: Boolean,
    default: true,
  },
});

const variantClass = computed(() => {
  if (props.variant === 'default') return '';
  return `btn-${props.variant}`;
});

const sizeClass = computed(() => {
  if (props.size === 'md') return '';
  return `btn-${props.size}`;
});

defineEmits(['click']);
</script>
