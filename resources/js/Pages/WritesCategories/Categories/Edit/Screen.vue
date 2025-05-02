<template>
  <CheckScreen>
    <GoBackButton url="/categories" />
    <CategoriesEditFrom />
  </CheckScreen>
</template>

<script setup>
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';
import TopScreen from '@/Components/CekapUI/Typography/TopScreen.vue';
import GoBackButton from '@/Components/GoBackButton.vue';
import CategoriesEditFrom from '@/Pages/WritesCategories/Categories/Edit/CategoriesEditFrom.vue';
</script>
