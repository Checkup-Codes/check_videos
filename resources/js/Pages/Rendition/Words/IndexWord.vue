<template>
  <LayoutRendition v-bind="props">
    <template #screen>
      <Screen v-bind="props" />
    </template>
  </LayoutRendition>
</template>

<script setup>
import LayoutRendition from '@/Pages/Rendition/_layouts/LayoutRendition.vue';
import Screen from '@/Pages/Rendition/Words/Index/Screen.vue';

const props = defineProps({
  words: Array,
  languagePacks: Array,
  screen: Object,
  error: {
    type: String,
    default: null,
  },
});
</script>
