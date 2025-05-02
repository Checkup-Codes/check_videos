<template>
  <div class="form-control w-full">
    <label v-if="label" class="label">
      <span class="label-text">{{ label }}</span>
      <span v-if="optional" class="label-text-alt opacity-70">Opsiyonel</span>
    </label>

    <div class="relative">
      <input
        v-if="type !== 'textarea'"
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :class="[
          'input w-full',
          { 'input-bordered': bordered },
          { 'input-primary': variant === 'primary' },
          { 'input-secondary': variant === 'secondary' },
          { 'input-accent': variant === 'accent' },
          { 'input-info': variant === 'info' },
          { 'input-success': variant === 'success' },
          { 'input-warning': variant === 'warning' },
          { 'input-error': variant === 'error' || error },
          { 'input-ghost': variant === 'ghost' },
          sizeClass,
        ]"
      />

      <textarea
        v-else
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :rows="rows"
        :class="[
          'textarea w-full',
          { 'textarea-bordered': bordered },
          { 'textarea-primary': variant === 'primary' },
          { 'textarea-secondary': variant === 'secondary' },
          { 'textarea-accent': variant === 'accent' },
          { 'textarea-info': variant === 'info' },
          { 'textarea-success': variant === 'success' },
          { 'textarea-warning': variant === 'warning' },
          { 'textarea-error': variant === 'error' || error },
          { 'textarea-ghost': variant === 'ghost' },
          sizeClass,
        ]"
      ></textarea>

      <div v-if="$slots.append" class="absolute inset-y-0 right-0 flex items-center pr-3">
        <slot name="append"></slot>
      </div>
    </div>

    <label v-if="error" class="label">
      <span class="label-text-alt text-error">{{ error }}</span>
    </label>

    <label v-if="hint && !error" class="label">
      <span class="label-text-alt">{{ hint }}</span>
    </label>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  rows: {
    type: [String, Number],
    default: 3,
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) =>
      ['default', 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error', 'ghost'].includes(value),
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['xs', 'sm', 'md', 'lg'].includes(value),
  },
  bordered: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: '',
  },
  hint: {
    type: String,
    default: '',
  },
  optional: {
    type: Boolean,
    default: false,
  },
});

const sizeClass = computed(() => {
  switch (props.size) {
    case 'xs':
      return props.type === 'textarea' ? 'textarea-xs' : 'input-xs';
    case 'sm':
      return props.type === 'textarea' ? 'textarea-sm' : 'input-sm';
    case 'lg':
      return props.type === 'textarea' ? 'textarea-lg' : 'input-lg';
    default:
      return '';
  }
});

defineEmits(['update:modelValue']);
</script>
