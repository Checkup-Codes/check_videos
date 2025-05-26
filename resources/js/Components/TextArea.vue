<template>
  <textarea
    class="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    ref="input"
  ></textarea>
</template>

<script setup>
import { onMounted, ref } from 'vue';

defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
});

defineEmits(['update:modelValue']);

const input = ref(null);

onMounted(() => {
  if (input.value.hasAttribute('autofocus')) {
    input.value.focus();
  }
});

defineExpose({ focus: () => input.value.focus() });
</script>
