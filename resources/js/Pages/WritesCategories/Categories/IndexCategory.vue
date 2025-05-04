<template>
  <CheckLayout>
    <template #screen>
      <Screen />
    </template>
  </CheckLayout>
</template>

<script setup>
import CheckLayout from '@/Pages/WritesCategories/_layouts/LayoutWritesCategories.vue';
import Screen from '@/Pages/WritesCategories/Categories/Index/Screen.vue';

/**
 * Component for categories listing page
 * Uses the shared layout and delegates content to Screen component
 */
defineOptions({
  name: 'IndexCategoryPage',
});
</script>
