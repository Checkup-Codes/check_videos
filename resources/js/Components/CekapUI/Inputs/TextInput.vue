<template>
  <div class="relative mb-6">
    <label :for="id" :class="labelClass">{{ label }}</label>
    <input
      :value="modelValue"
      :type="type"
      :id="id"
      :class="inputClass"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  label: String,
  id: String,
  modelValue: String,
  type: {
    type: String,
    default: 'text',
  },
  labelClass: {
    type: String,
    default: 'block font-semibold mb-2 text-sm text-theme-text',
  },
  inputClass: {
    type: String,
    default: `
      block w-full px-4 py-2 border border-gray-300 rounded-lg 
      bg-gray-50 text-sm text-black
      focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100
      transition-shadow duration-150 ease-in-out
    `,
  },
});
</script>
