<template>
  <div class="mb-4">
    <label :for="id" :class="linkedStyle">{{ label }}</label>
    <input :type="type" :id="id" :class="linkedStyle2" v-model="value" @input="clearError" />
      <p v-if="error" class="mt-1 text-sm text-destructive">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

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

const emit = defineEmits(['update:modelValue', 'clearError']);

const value = ref(props.modelValue);

watch(value, (newValue) => {
  emit('update:modelValue', newValue);
});

const clearError = () => {
  emit('clearError');
};

const linkedStyle = 'block font-bold mb-1 text-sm rounded';
const linkedStyle2 = 'mt-1 block w-full rounded';
</script>
