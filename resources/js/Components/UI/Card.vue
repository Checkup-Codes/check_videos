<template>
  <div
    :class="[
      'rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-200',
      shadowClass,
      bgClass,
    ]"
  >
    <div :class="['p-6', { 'p-4': compact }]">
      <!-- Header with optional icon and action button -->
      <div v-if="$slots.header || title" class="mb-4 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <slot name="icon"></slot>
          <h2 class="text-lg font-semibold text-card-foreground">{{ title }}</h2>
        </div>
        <slot name="action"></slot>
      </div>

      <!-- Card content -->
      <slot></slot>

      <!-- Card footer -->
      <div v-if="$slots.footer" class="mt-4 flex justify-end">
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
      ['default', 'primary', 'secondary', 'destructive'].includes(value),
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
      return 'bg-primary text-primary-foreground border-primary';
    case 'secondary':
      return 'bg-secondary text-secondary-foreground border-secondary';
    case 'destructive':
      return 'bg-destructive text-destructive-foreground border-destructive';
    default:
      return 'bg-card text-card-foreground border-border';
  }
});

const shadowClass = computed(() => {
  return props.elevated ? 'shadow-lg' : 'shadow-sm';
});
</script>
