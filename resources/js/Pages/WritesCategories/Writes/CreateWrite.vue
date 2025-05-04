<template>
  <LayoutWritesCategories>
    <template #screen>
      <Screen />
    </template>
  </LayoutWritesCategories>
</template>

<script setup>
import LayoutWritesCategories from '@/Pages/WritesCategories/_layouts/LayoutWritesCategories.vue';
import Screen from '@/Pages/WritesCategories/Writes/Create/Screen.vue';

/**
 * Component for write creation page
 * Uses the shared layout and delegates content to Screen component
 */
defineOptions({
  name: 'CreateWritePage',
});
</script>
