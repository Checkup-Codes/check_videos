<template>
  <CheckLayout>
    <template #screen>
      <Screen />
    </template>
  </CheckLayout>
</template>

<script setup>
import CheckLayout from '@/Pages/WritesCategories/_layouts/LayoutWritesCategories.vue';
import Screen from '@/Pages/WritesCategories/Categories/Create/Screen.vue';

/**
 * Component for category creation page
 * Uses the shared layout and delegates content to Screen component
 */
defineOptions({
  name: 'CreateCategoryPage',
});
</script>
