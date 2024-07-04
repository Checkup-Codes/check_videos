<template>
  <div>
    <span class="font-bold">{{ product.stock }}</span> stok <span class="text-gray-800">| </span>
    <span class="font-bold">{{ product.version }}</span> version <span class="text-gray-800">| </span>
    <span class="font-bold">{{ product.platform }}</span>
  </div>
</template>

<script setup>
defineProps({
  product: Object,
});
</script>
