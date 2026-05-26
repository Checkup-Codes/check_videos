<template>
  <PageMeta
    :title="metaTitle"
    :description="metaDescription"
    :keywords="metaKeywords"
  />
  <LayoutTestCategories>
    <template #screen>
      <Screen />
    </template>
  </LayoutTestCategories>
</template>

<script setup>
import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import LayoutTestCategories from '@/Pages/TestCategories/_layouts/LayoutTestCategories.vue';
import Screen from '@/Pages/TestCategories/Tests/Show/Screen.vue';
import PageMeta from '@/Components/PageMeta.vue';
import { stripHtml } from '@/utils/stripHtml';

defineOptions({
  name: 'ShowTestPage',
});

const { props } = usePage();
const test = props.test || {};

const metaTitle = computed(() => {
  return test.title || 'Test Detayları';
});

const metaDescription = computed(() => {
  return stripHtml(test.description) || 'Test detayları ve sorular';
});

const metaKeywords = computed(() => {
  return test.title || '';
});
</script>

