<template>
  <Head>
    <title>Yazılar Listesi</title>
    <meta name="description" content="Tüm blog yazılarının görüntülendiği liste sayfası" />
    <meta name="keywords" content="yazılar, blog yazıları, içerik listesi" />
  </Head>
  <LayoutWritesCategories :class="currentTheme">
    <template #screen>
      <Screen />
    </template>
  </LayoutWritesCategories>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { Head } from '@inertiajs/vue3';
import LayoutWritesCategories from '@/Pages/WritesCategories/_layouts/LayoutWritesCategories.vue';
import Screen from '@/Pages/WritesCategories/Writes/Index/Screen.vue';

const store = useStore();

// Get current theme
const currentTheme = computed(() => store.getters['Theme/getCurrentTheme']);

/**
 * Component for writes listing page
 * Uses the shared layout and delegates content to Screen component
 */
defineOptions({
  name: 'IndexWritePage',
});
</script>
