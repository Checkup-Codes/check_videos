<template>
  <div class="mb-4">
    <label :for="id" class="mb-1 block text-sm font-bold text-gray-700">{{ label }}</label>
    <select v-model="modelValue" :id="id" :class="selectClass">
      <option value="" disabled>Kategori seç</option>
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <p v-if="error" class="text-sm text-red-500">{{ error }}</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  id: String,
  label: String,
  options: {
    type: Array,
    default: () => [],
  },
  modelValue: [String, Number],
  error: String,
  selectClass: {
    type: String,
    default: 'mt-1 block w-full rounded border-gray-300',
  },
});
</script>
