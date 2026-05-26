<template>
  <Head :title="browserTitle" />
  <FlashMessage :message="flashSuccess" />
  <div class="flex h-full min-h-0 flex-col">
    <div class="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-y-auto">
      <slot name="screen" />
    </div>
  </div>
</template>

<script setup>
import FlashMessage from '@/Components/CekapUI/Notifications/FlashMessage.vue';
import { usePage, Head } from '@inertiajs/vue3';
import { computed, onMounted, onUnmounted } from 'vue';

defineOptions({
  name: 'LayoutJourney',
});

const page = usePage();

onMounted(() => {
  document.body.style.overflow = 'hidden';
});

onUnmounted(() => {
  document.body.style.overflow = '';
});

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

