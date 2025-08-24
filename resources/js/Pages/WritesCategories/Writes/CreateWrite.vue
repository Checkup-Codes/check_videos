<template>
  <Head>
    <title>Yeni Yazı Oluştur</title>
    <meta name="description" content="Yeni bir blog yazısı oluşturma sayfası" />
    <meta name="keywords" content="yazı oluştur, blog, içerik yönetimi" />
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
import Screen from '@/Pages/WritesCategories/Writes/Create/Screen.vue';

const store = useStore();

// Get current theme
const currentTheme = computed(() => store.getters['Theme/getCurrentTheme']);

/**
 * Component for write creation page
 * Uses the shared layout and delegates content to Screen component
 */
defineOptions({
  name: 'CreateWritePage',
});
</script>
