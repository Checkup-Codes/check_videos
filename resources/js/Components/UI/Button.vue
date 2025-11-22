<template>
  <button
    :class="[
      'inline-flex items-center justify-center rounded-md font-medium transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      variantClass,
      sizeClass,
      { 'w-full': block },
      { 'rounded-full': circle },
    ]"
    :disabled="disabled || loading"
    @click="$emit('click')"
  >
    <svg
      v-if="loading"
      class="mr-2 h-4 w-4 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    <slot v-if="!loading"></slot>
  </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value) =>
      [
        'default',
        'primary',
        'secondary',
        'destructive',
        'outline',
        'ghost',
        'link',
      ].includes(value),
  },
  size: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'sm', 'lg', 'icon'].includes(value),
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
  const base = 'hover:opacity-90';
  
  if (props.outline || props.variant === 'outline') {
    return 'border border-input bg-background hover:bg-accent hover:text-accent-foreground';
  }
  
  switch (props.variant) {
    case 'primary':
      return `bg-primary text-primary-foreground hover:bg-primary/90 ${base}`;
    case 'secondary':
      return `bg-secondary text-secondary-foreground hover:bg-secondary/80 ${base}`;
    case 'destructive':
      return `bg-destructive text-destructive-foreground hover:bg-destructive/90 ${base}`;
    case 'ghost':
      return 'hover:bg-accent hover:text-accent-foreground';
    case 'link':
      return 'text-primary underline-offset-4 hover:underline';
    default:
      return `bg-primary text-primary-foreground hover:bg-primary/90 ${base}`;
  }
});

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'h-9 rounded-md px-3 text-xs';
    case 'lg':
      return 'h-11 rounded-md px-8';
    case 'icon':
      return 'h-10 w-10';
    default:
      return 'h-10 px-4 py-2';
  }
});

defineEmits(['click']);
</script>
