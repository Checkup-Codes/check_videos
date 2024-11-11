<template>
  <div class="bg-screen-bg px-3 pt-3">
    <GoBackButton url="/categories" />
    <CategoriesEditFrom />
  </div>
</template>

<script setup>
import GoBackButton from '@/Components/GoBackButton.vue';
import CategoriesEditFrom from '@/Pages/WritesCategories/Categories/Edit/CategoriesEditFrom.vue';
</script>
