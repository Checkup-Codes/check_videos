<template>
  <CheckScreen>
    <GoBackButton url="/test-categories" />
    <TestCategoriesEditForm />
  </CheckScreen>
</template>

<script setup>
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';
import GoBackButton from '@/Components/GoBackButton.vue';
import TestCategoriesEditForm from '@/Pages/TestCategories/Categories/Edit/TestCategoriesEditForm.vue';

/**
 * Component for test category editing screen
 * Provides category edit form with back navigation
 */
defineOptions({
  name: 'EditTestCategoryScreen',
});
</script>
