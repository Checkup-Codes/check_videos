<template>
  <Screen>
    <GoBackButton url="/categories" />
    <CategoriesCreateFrom />
  </Screen>
</template>

<script setup>
import Screen from '@/Components/CekapUI/Modals/Screen.vue';
import GoBackButton from '@/Components/GoBackButton.vue';
import CategoriesCreateFrom from '@/Pages/WritesCategories/Categories/Create/CategoriesCreateFrom.vue';
</script>
