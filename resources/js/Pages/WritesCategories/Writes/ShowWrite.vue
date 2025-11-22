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

defineOptions({
  name: 'ShowWritePage',
});

const { props } = usePage();
const write = props.write || {};

const metaTitle = computed(() => {
  return write.title || 'Yazı Detayları';
});

const metaDescription = computed(() => {
  return write.meta_description || write.summary || truncateText(write.content?.replace(/<[^>]*>?/gm, '') || '', 160);
});

const metaKeywords = computed(() => {
  return write.seo_keywords || write.tags || '';
});

const metaImage = computed(() => {
  return write.cover_image || '';
});

const truncateText = (text, maxLength) => {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};
</script>
