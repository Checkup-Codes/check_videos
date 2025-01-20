<template>
  <LayoutRendition>
    <template #screen>
      <Screen :words="words" :screen="screen" />
    </template>
  </LayoutRendition>
</template>

<script setup>
import LayoutRendition from '@/Pages/Rendition/_layouts/LayoutRendition.vue';
import Screen from '@/Pages/Rendition/Words/Index/Screen.vue';

const props = defineProps({
  words: Array,
  screen: Object,
});
</script>
