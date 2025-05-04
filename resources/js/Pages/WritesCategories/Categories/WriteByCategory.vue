<template>
  <PageMeta
    :title="metaTitle"
    :description="metaDescription"
    :keywords="metaKeywords"
    :image="metaImage"
    type="article"
  />
  <CheckLayout>
    <template #screen>
      <Screen />
    </template>

    <!-- Add slot for potential mobile actions -->
    <template #mobile-actions v-if="$page.props.auth?.user">
      <div class="flex justify-end gap-2 p-2">
        <Link
          v-if="write.id"
          :href="route('writes.edit', { write: write.slug })"
          class="btn btn-ghost btn-sm btn-circle"
          title="Düzenle"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-5 w-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </Link>
      </div>
    </template>
  </CheckLayout>
</template>

<script setup>
import { computed } from 'vue';
import { usePage, Link } from '@inertiajs/vue3';
import CheckLayout from '@/Pages/WritesCategories/_layouts/LayoutWritesCategories.vue';
import Screen from '@/Pages/WritesCategories/Categories/WriteByCategory/Screen.vue';
import PageMeta from '@/Components/PageMeta.vue';

/**
 * Component for displaying writes filtered by category
 * Uses the shared layout and delegates content to Screen component
 */
defineOptions({
  name: 'WriteByCategoryPage',
});

/**
 * Extract SEO metadata from page props
 */
const { props } = usePage();
const category = props.category || {};
const write = props.write || {};

/**
 * Generate title for the meta tag with category context
 */
const metaTitle = computed(() => {
  if (write.title && category.name) {
    return `${write.title} | ${category.name} Kategorisi`;
  } else if (write.title) {
    return write.title;
  } else if (category.name) {
    return `${category.name} Kategorisi`;
  }
  return 'Kategori Yazısı';
});

/**
 * Generate description for the meta tag
 */
const metaDescription = computed(() => {
  return (
    write.meta_description || write.summary || `${category.name} kategorisinde yer alan "${write.title}" başlıklı yazı.`
  );
});

/**
 * Use SEO keywords if available
 */
const metaKeywords = computed(() => {
  return [write.seo_keywords || '', write.tags || '', category.name || ''].filter(Boolean).join(', ');
});

/**
 * Use cover image for social sharing
 */
const metaImage = computed(() => {
  return write.cover_image || '';
});
</script>
