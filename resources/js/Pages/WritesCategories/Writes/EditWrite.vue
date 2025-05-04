<template>
  <LayoutWritesCategories>
    <template #screen>
      <Screen />
    </template>
  </LayoutWritesCategories>
</template>

<script setup>
import LayoutWritesCategories from '@/Pages/WritesCategories/_layouts/LayoutWritesCategories.vue';
import Screen from '@/Pages/WritesCategories/Writes/Edit/Screen.vue';

/**
 * Component for write editing page
 * Uses the shared layout and delegates content to Screen component
 */
defineOptions({
  name: 'EditWritePage',
});
</script>
