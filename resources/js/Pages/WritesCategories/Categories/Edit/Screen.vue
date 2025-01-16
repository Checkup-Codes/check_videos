<template>
  <CheckScreen>
    <GoBackButton url="/categories" />
    <TopScreen title="Kategoriyi Düzenle" />
    <CategoriesEditFrom />
  </CheckScreen>
</template>

<script setup>
import CheckScreen from '@/Components/CekapUI/Modals/CheckScreen.vue';
import TopScreen from '@/Components/CekapUI/Typography/TopScreen.vue';
import GoBackButton from '@/Components/GoBackButton.vue';
import CategoriesEditFrom from '@/Pages/WritesCategories/Categories/Edit/CategoriesEditFrom.vue';
</script>
