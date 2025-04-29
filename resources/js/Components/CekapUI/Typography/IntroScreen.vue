<template>
  <header class="flex h-screen items-center justify-center text-gray-800">
    <div class="text-center">
      <h2 class="text-4xl font-bold">{{ title }}</h2>
    </div>
  </header>
</template>

<script setup>
const vueProps = defineProps({
  title: String,
});
</script>
