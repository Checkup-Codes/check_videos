<template>
  <LayoutWritesCategories>
    <template #screen>
      <Screen />
    </template>
  </LayoutWritesCategories>
</template>

<script setup>
import LayoutWritesCategories from '@/Pages/WritesCategories/_layouts/LayoutWritesCategories.vue';
import Screen from '@/Pages/WritesCategories/Writes/Index/Screen.vue';

/**
 * Component for writes listing page
 * Uses the shared layout and delegates content to Screen component
 */
defineOptions({
  name: 'IndexWritePage',
});
</script>
