<template>
  <CheckLayout :class="currentTheme">
    <template #screen>
      <Screen />
    </template>
  </CheckLayout>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import CheckLayout from '@/Pages/TestCategories/_layouts/LayoutTestCategories.vue';
import Screen from '@/Pages/TestCategories/Categories/Index/Screen.vue';

const store = useStore();

const currentTheme = computed(() => store.getters['Theme/getCurrentTheme']);

defineOptions({
  name: 'IndexCategoryPage',
});
</script>

