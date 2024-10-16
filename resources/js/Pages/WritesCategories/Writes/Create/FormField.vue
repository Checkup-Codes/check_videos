<template>
  <div class="mb-4">
    <label :for="id" :class="linkedStyle">{{ label }}</label>
    <input :type="type" :id="id" :class="linkedStyle2" v-model="value" @input="clearError" />
    <p v-if="error" class="text-sm text-red-500">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';

// Props
const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'text',
  },
  id: {
    type: String,
    required: true,
  },
  error: {
    type: String,
    default: '',
  },
});

// Emits
const emit = defineEmits(['update:modelValue', 'clearError']);

// Local reactive value to track input changes
const value = ref(props.modelValue);

// Watch for changes in the value and emit updates
watch(value, (newValue) => {
  emit('update:modelValue', newValue);
});

// Clear error when input is typed in
const clearError = () => {
  emit('clearError');
};

const linkedStyle = 'block font-bold mb-1 text-sm rounded';
const linkedStyle2 = 'mt-1 block w-full rounded';
</script>
