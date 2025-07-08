<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import { ref, onMounted } from 'vue';

const title = ref('Check Videos');
</script>

<template>
  <div
    class="flex min-h-screen flex-col items-center justify-center bg-base-200 text-base-content transition-colors duration-300 dark:bg-base-300 dark:text-base-content"
  >
    <div class="mb-4 text-2xl font-bold">{{ title }} Admin</div>
    <div class="w-full max-w-md rounded-xl border border-base-300 bg-base-100 p-8 shadow-lg dark:bg-base-200">
      <slot />
    </div>
  </div>
</template>
