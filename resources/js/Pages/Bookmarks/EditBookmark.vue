<template>
  <LayoutBookmarks>
    <template #screen>
      <Screen :bookmark="bookmark" :categories="categories" />
    </template>
  </LayoutBookmarks>
</template>

<script setup>
import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import LayoutBookmarks from '@/Pages/Bookmarks/_layouts/LayoutBookmarks.vue';
import Screen from '@/Pages/Bookmarks/Edit/Screen.vue';

const page = usePage();
const bookmark = computed(() => page.props.bookmark);
const categories = computed(() => page.props.categories || []);
</script>
