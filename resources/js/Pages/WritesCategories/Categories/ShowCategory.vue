<template>
  <PageMeta :title="metaTitle" :description="metaDescription" type="website" />
  <LayoutWritesCategories>
    <template #screen>
      <Screen />
    </template>
  </LayoutWritesCategories>
</template>

<script setup>
import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import LayoutWritesCategories from '@/Pages/WritesCategories/_layouts/LayoutWritesCategories.vue';
import Screen from '@/Pages/WritesCategories/Categories/Show/Screen.vue';
import PageMeta from '@/Components/PageMeta.vue';

/**
 * Component for category details page
 * Uses the shared layout and delegates content to Screen component
 */
defineOptions({
  name: 'ShowCategoryPage',
});

/**
 * Extract SEO metadata from page props
 */
const { props } = usePage();
const category = props.category || {};
const writes = props.writes || [];

/**
 * Generate title for the meta tag
 */
const metaTitle = computed(() => {
  return category.name ? `${category.name} Kategorisi` : 'Kategori Detayları';
});

/**
 * Generate description for the meta tag
 * Using category details and write count
 */
const metaDescription = computed(() => {
  const writeCount = category.writes_count || writes.length || 0;
  return (
    category.description ||
    `${category.name} kategorisinde ${writeCount} yazı bulunmaktadır. Bu kategori altındaki tüm içerikleri keşfedin.`
  );
});
</script>
