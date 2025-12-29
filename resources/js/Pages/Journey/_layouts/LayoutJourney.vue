<template>
  <Head :title="browserTitle" />
  <FlashMessage :message="flashSuccess" />
  <!-- Full width layout for Journey pages with contained scroll -->
  <div class="h-[calc(100vh-3rem)] overflow-y-auto overscroll-none lg:h-[calc(100vh-5.5rem)]">
    <slot name="screen"></slot>
  </div>
</template>

<script setup>
import FlashMessage from '@/Components/CekapUI/Notifications/FlashMessage.vue';
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


