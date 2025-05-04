<template>
  <div class="mb-4">
    <label :for="id" :class="linkedStyle">{{ label }}</label>
    <input :type="type" :id="id" :class="linkedStyle2" v-model="value" @input="clearError" />
    <p v-if="error" class="text-sm text-red-500">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';

/**
 * Component props definition
 */
const props = defineProps({
  /**
   * Value to display and modify (using v-model)
   */
  modelValue: {
    type: [String, Number],
    required: true,
  },

  /**
   * Label text to display above input
   */
  label: {
    type: String,
    required: true,
  },

  /**
   * HTML input type (text, email, number, etc.)
   */
  type: {
    type: String,
    default: 'text',
  },

  /**
   * Unique ID for input field (used for label association)
   */
  id: {
    type: String,
    required: true,
  },

  /**
   * Error message to display below field
   */
  error: {
    type: String,
    default: '',
  },
});

/**
 * Events emitted by this component
 */
const emit = defineEmits([
  'update:modelValue', // For v-model support
  'clearError', // When field is edited and error should clear
]);

/**
 * Local reactive value to handle input changes
 * Synced with parent via v-model
 */
const value = ref(props.modelValue);

/**
 * Watch for changes in local value and emit to parent
 */
watch(value, (newValue) => {
  emit('update:modelValue', newValue);
});

/**
 * Clear error when user types in field
 */
const clearError = () => {
  emit('clearError');
};

/**
 * Consistent style classes for labels
 */
const linkedStyle = 'block font-bold mb-1 text-sm rounded';

/**
 * Consistent style classes for input fields
 */
const linkedStyle2 = 'mt-1 block w-full rounded';
</script>
