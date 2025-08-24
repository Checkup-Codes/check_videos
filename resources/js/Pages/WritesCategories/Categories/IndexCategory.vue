<template>
  <CheckLayout :class="currentTheme">
    <template #screen>
      <Screen />
    </template>
  </CheckLayout>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import CheckLayout from '@/Pages/WritesCategories/_layouts/LayoutWritesCategories.vue';
import Screen from '@/Pages/WritesCategories/Categories/Index/Screen.vue';

const store = useStore();

// Get current theme
const currentTheme = computed(() => store.getters['Theme/getCurrentTheme']);

/**
 * Component for categories listing page
 * Uses the shared layout and delegates content to Screen component
 */
defineOptions({
  name: 'IndexCategoryPage',
});
</script>
