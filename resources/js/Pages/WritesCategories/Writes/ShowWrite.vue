<template>
  <PageMeta
    :title="metaTitle"
    :description="metaDescription"
    :keywords="metaKeywords"
    :image="metaImage"
    type="article"
  />
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
import Screen from '@/Pages/WritesCategories/Writes/Show/Screen.vue';
import PageMeta from '@/Components/PageMeta.vue';

/**
 * Component for write details page
 * Uses the shared layout and delegates content to Screen component
 */
defineOptions({
  name: 'ShowWritePage',
});

/**
 * Extract SEO metadata from page props
 */
const { props } = usePage();
const write = props.write || {};

/**
 * Generate title for the meta tag
 */
const metaTitle = computed(() => {
  return write.title || 'Yazı Detayları';
});

/**
 * Generate description for the meta tag
 * Using summary or meta_description if available
 */
const metaDescription = computed(() => {
  return write.meta_description || write.summary || truncateText(write.content?.replace(/<[^>]*>?/gm, '') || '', 160);
});

/**
 * Use SEO keywords if available
 */
const metaKeywords = computed(() => {
  return write.seo_keywords || write.tags || '';
});

/**
 * Use cover image for social sharing
 */
const metaImage = computed(() => {
  return write.cover_image || '';
});

/**
 * Helper function to truncate text to a specific length
 */
const truncateText = (text, maxLength) => {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};
</script>
