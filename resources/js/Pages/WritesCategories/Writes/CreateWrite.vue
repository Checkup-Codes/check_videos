<template>
  <Head>
    <title>Yeni Yazı Oluştur</title>
    <meta name="description" content="Yeni bir blog yazısı oluşturma sayfası" />
    <meta name="keywords" content="yazı oluştur, blog, içerik yönetimi" />
  </Head>
  <LayoutWritesCategories>
    <template #screen>
      <Screen />
    </template>
  </LayoutWritesCategories>
</template>

<script setup>
import { Head } from '@inertiajs/vue3';
import LayoutWritesCategories from '@/Pages/WritesCategories/_layouts/LayoutWritesCategories.vue';
import Screen from '@/Pages/WritesCategories/Writes/Create/Screen.vue';

defineOptions({
  name: 'CreateWritePage',
});
</script>
