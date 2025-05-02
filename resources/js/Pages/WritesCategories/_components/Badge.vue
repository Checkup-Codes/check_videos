<template>
  <span :class="['badge', variantClass, sizeClass, { 'badge-outline': outline }]">
    <slot></slot>
  </span>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) =>
      ['default', 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error', 'ghost', 'neutral'].includes(
        value
      ),
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
});

const variantClass = computed(() => {
  if (props.variant === 'default') return '';
  return `badge-${props.variant}`;
});

const sizeClass = computed(() => {
  if (props.size === 'md') return '';
  return `badge-${props.size}`;
});
</script>
