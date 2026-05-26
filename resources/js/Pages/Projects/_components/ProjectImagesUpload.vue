<template>
  <RelatedImagesUpload v-bind="$attrs" />
</template>

<script setup>
import RelatedImagesUpload from './RelatedImagesUpload.vue';

defineOptions({
  inheritAttrs: false,
});
</script>
