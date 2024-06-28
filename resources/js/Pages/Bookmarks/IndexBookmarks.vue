<template>
  <div class="p-5">
    <div v-for="bookmark in bookmarkCategory" :key="bookmarkCategory.id">
      {{ bookmark.name }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  bookmarkCategory: String,
});
</script>
