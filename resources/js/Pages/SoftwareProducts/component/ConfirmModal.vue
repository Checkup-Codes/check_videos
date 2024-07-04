<template>
  <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
    <div class="rounded bg-white p-6 shadow-md">
      <h2 class="mb-4 text-lg">{{ title }}</h2>
      <p>{{ message }}</p>
      <div class="mt-4 flex justify-end">
        <button @click="$emit('cancel')" class="mr-2 rounded bg-gray-300 px-4 py-2 text-gray-700">Cancel</button>
        <button @click="$emit('confirm')" class="rounded bg-red-500 px-4 py-2 text-white">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  title: String,
  message: String,
  isVisible: Boolean,
});
</script>
