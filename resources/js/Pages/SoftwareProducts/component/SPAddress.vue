<template>
  <span> {{ product.platform }} {{ product.category }}, {{ product.name }}</span>
</template>

<script setup>
defineProps({
  product: Object,
});
</script>
