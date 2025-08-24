<template>
  <LayoutRendition :class="currentTheme">
    <template #screen>
      <Screen v-bind="props" />
    </template>
  </LayoutRendition>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import LayoutRendition from '@/Pages/Rendition/_layouts/LayoutRendition.vue';
import Screen from '@/Pages/Rendition/LanguagePacks/Create/Screen.vue';

const store = useStore();

// Get current theme
const currentTheme = computed(() => store.getters['Theme/getCurrentTheme']);

const props = defineProps({
  screen: Object,
});
</script>
