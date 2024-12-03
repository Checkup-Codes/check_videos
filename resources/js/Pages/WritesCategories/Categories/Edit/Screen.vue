<template>
  <CheckScreen>
    <GoBackButton url="/categories" />
    <CategoriesEditFrom />
  </CheckScreen>
</template>

<script setup>
import CheckScreen from '@/Components/CekapUI/Modals/CheckScreen.vue';
import GoBackButton from '@/Components/GoBackButton.vue';
import CategoriesEditFrom from '@/Pages/WritesCategories/Categories/Edit/CategoriesEditFrom.vue';
</script>
