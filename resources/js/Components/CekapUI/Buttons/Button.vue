<template>
  <div>
    <button :class="buttonClasses" :type="type" @click="onClick">
      <slot />
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'button',
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'primary', 'secondary', 'outline', 'destructive'].includes(value),
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['xsmall', 'small', 'medium', 'large'].includes(value),
  },
});

const emit = defineEmits(['click']);

const onClick = (event) => {
  emit('click', event);
};

const buttonClasses = computed(() => {
  let baseClasses =
    'inline-flex my-2 items-center justify-center font-semibold transition-colors focus:outline-none rounded-md';

  const variantClasses = {
    default: 'bg-base-300 text-base-content ',
    primary: 'bg-indigo-600 text-white hover:bg-indigo-500 focus:ring-indigo-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400',
    outline: 'border border-gray-300 text-gray-900 hover:bg-gray-100 focus:ring-gray-400',
    destructive: 'bg-red-600 text-white hover:bg-red-500 focus:ring-red-500',
  };

  const sizeClasses = {
    xsmall: 'px-2 py-1 text-xs',
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2 text-sm',
    large: 'px-6 py-3 text-base',
  };

  return `${baseClasses} ${variantClasses[props.variant]} ${sizeClasses[props.size]}`;
});
</script>
