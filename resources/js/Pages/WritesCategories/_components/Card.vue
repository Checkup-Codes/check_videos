<template>
  <div :class="['card', bgClass, shadowClass, 'transition-all duration-200']">
    <div :class="['card-body', padding]">
      <!-- Header with optional icon and action button -->
      <div v-if="$slots.header || title" class="card-title flex items-center justify-between">
        <div class="flex items-center gap-2">
          <slot name="icon"></slot>
          <h2>{{ title }}</h2>
        </div>
        <slot name="action"></slot>
      </div>

      <!-- Card content -->
      <slot></slot>

      <!-- Card footer -->
      <div v-if="$slots.footer" class="card-actions mt-4 justify-end">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) =>
      ['default', 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error'].includes(value),
  },
  elevated: {
    type: Boolean,
    default: false,
  },
  compact: {
    type: Boolean,
    default: false,
  },
});

const bgClass = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-primary text-primary-content';
    case 'secondary':
      return 'bg-secondary text-secondary-content';
    case 'accent':
      return 'bg-accent text-accent-content';
    case 'info':
      return 'bg-info text-info-content';
    case 'success':
      return 'bg-success text-success-content';
    case 'warning':
      return 'bg-warning text-warning-content';
    case 'error':
      return 'bg-error text-error-content';
    default:
      return 'bg-base-100';
  }
});

const shadowClass = computed(() => {
  return props.elevated ? 'shadow-lg' : 'shadow-sm';
});

const padding = computed(() => {
  return props.compact ? 'p-4' : 'p-6';
});
</script>
