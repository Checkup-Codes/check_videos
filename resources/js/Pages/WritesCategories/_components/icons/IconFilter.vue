<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :class="class"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="2"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414A2 2 0 0013 14.586V19a1 1 0 01-1.447.894l-2-1A1 1 0 019 18v-3.414a2 2 0 00-.293-1.172L2.293 6.707A1 1 0 012 6V4z"
    />
  </svg>
</template>

<script setup>
defineProps({
  class: {
    type: String,
    default: 'h-3 w-3',
  },
});
</script>

