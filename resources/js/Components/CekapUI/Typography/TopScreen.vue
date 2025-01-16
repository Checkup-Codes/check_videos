<template>
  <h1
    :class="[
      'group flex h-12 cursor-pointer select-none items-center justify-between border-b border-gray-300 bg-gradient-to-r from-gray-100 to-gray-200 px-4 text-xl font-extrabold text-gray-900 transition-all duration-300 ease-in-out hover:bg-gradient-to-l hover:shadow-md',
    ]"
  >
    <span :class="[title.length > 30 ? 'text-xl' : 'text-2xl']">{{ title }}</span>
  </h1>
</template>

<script setup>
const vueProps = defineProps({
  title: String,
});
</script>
