<template>
  <CheckScreen>
    <GoBackButton url="/categories" />
    <CategoriesCreateFrom :categories />
  </CheckScreen>
</template>

<script setup>
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';
import GoBackButton from '@/Components/GoBackButton.vue';
import CategoriesCreateFrom from '@/Pages/WritesCategories/Categories/Create/CategoriesCreateFrom.vue';
import TopScreen from '@/Components/CekapUI/Typography/TopScreen.vue';

import { useForm, usePage } from '@inertiajs/vue3';
const { props } = usePage();
const categories = props.categories;
</script>
