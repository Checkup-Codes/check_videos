<template>
  <LayoutRendition>
    <template #screen>
      <Screen v-bind="props" />
    </template>
  </LayoutRendition>
</template>

<script setup>
import LayoutRendition from '@/Pages/Rendition/_layouts/LayoutRendition.vue';
import Screen from '@/Pages/Rendition/LanguagePacks/Create/Screen.vue';

const props = defineProps({
  screen: Object,
});
</script>
