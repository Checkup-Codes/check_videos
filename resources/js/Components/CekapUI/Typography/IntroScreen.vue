<template>
  <header
    class="flex h-[calc(100vh-3rem)] items-center justify-center overflow-y-auto overscroll-none lg:h-[calc(100vh-5.5rem)]"
  >
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
