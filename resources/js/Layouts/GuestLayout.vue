<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import { ref, onMounted } from 'vue';

const title = ref('Check Videos');
</script>

<template>
  <div class="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
    <div class="text-2xl font-bold">{{ title }} Admin</div>

    <div class="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
      <slot />
    </div>
  </div>
</template>
