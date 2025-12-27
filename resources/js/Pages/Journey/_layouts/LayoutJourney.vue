<template>
  <Head :title="browserTitle" />
  <FlashMessage :message="flashSuccess" />
  <CheckScreen>
      <slot name="screen"></slot>
  </CheckScreen>
</template>

<script setup>
import FlashMessage from '@/Components/CekapUI/Notifications/FlashMessage.vue';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';
import { usePage, Head } from '@inertiajs/vue3';
import { computed } from 'vue';

defineOptions({
  name: 'LayoutJourney',
});

const page = usePage();

// Flash message
const flashSuccess = computed(() => page.props.flash?.message);

// Browser tab title - screen.seo.title kullan (PageTitle | SiteName formatında)
const browserTitle = computed(() => {
  return (
    page.props?.screen?.seo?.title ||
    page.props?.app?.seo?.title ||
    'Yolculuk'
  );
});
</script>


