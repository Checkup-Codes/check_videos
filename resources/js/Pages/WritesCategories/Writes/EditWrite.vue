<template>
  <Head>
    <title>Yazı Düzenle</title>
    <meta name="description" content="Blog yazısı düzenleme sayfası" />
    <meta name="keywords" content="yazı düzenle, blog, içerik yönetimi" />
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
import Screen from '@/Pages/WritesCategories/Writes/Edit/Screen.vue';

defineOptions({
  name: 'EditWritePage',
});
</script>
