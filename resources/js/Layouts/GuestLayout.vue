<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import { ref, onMounted } from 'vue';

const title = ref('');
</script>

<template>
  <div
    class="flex min-h-screen flex-col items-center justify-start bg-background text-foreground transition-colors duration-300 pt-20"
  >
    <div class="mb-4 text-2xl font-bold">{{ title }} Admin</div>
    <div class="w-full max-w-md rounded-xl border border-border bg-card text-card-foreground p-8 shadow-lg">
      <slot />
    </div>
  </div>
</template>
