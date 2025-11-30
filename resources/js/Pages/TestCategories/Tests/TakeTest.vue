<template>
  <LayoutTestCategories>
    <template #screen>
      <Screen />
    </template>
  </LayoutTestCategories>
</template>

<script setup>
import LayoutTestCategories from '@/Pages/TestCategories/_layouts/LayoutTestCategories.vue';
import Screen from '@/Pages/TestCategories/Tests/Take/Screen.vue';

defineOptions({
  name: 'TakeTestPage',
});
</script>

