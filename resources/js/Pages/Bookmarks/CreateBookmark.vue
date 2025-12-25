<template>
  <LayoutBookmarks>
    <template #screen>
      <Screen :categories="categories" />
    </template>
  </LayoutBookmarks>
</template>

<script setup>
import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import LayoutBookmarks from '@/Pages/Bookmarks/_layouts/LayoutBookmarks.vue';
import Screen from '@/Pages/Bookmarks/Create/Screen.vue';

const page = usePage();
const categories = computed(() => page.props.categories || []);
</script>
