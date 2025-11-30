<template>
  <CheckScreen>
    <GoBackButton url="/test-categories" />
    <TestCategoriesCreateForm :categories="categories" />
  </CheckScreen>
</template>

<script setup>
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';
import GoBackButton from '@/Components/GoBackButton.vue';
import TestCategoriesCreateForm from '@/Pages/TestCategories/Categories/Create/TestCategoriesCreateForm.vue';
import { usePage } from '@inertiajs/vue3';

/**
 * Component name definition
 */
defineOptions({
  name: 'CreateTestCategoryScreen',
});

/**
 * Get categories from page props
 */
const { props } = usePage();
const categories = props.categories;
</script>
