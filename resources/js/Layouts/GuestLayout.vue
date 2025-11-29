<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
</script>

<template>
  <div
    class="flex min-h-screen flex-col items-center justify-center bg-background text-foreground transition-colors duration-300 px-4 py-12"
  >
    <div class="w-full max-w-md">
      <slot />
    </div>
  </div>
</template>
