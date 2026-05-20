<template>
  <Head :title="browserTitle" />
  <FlashMessage :message="flashSuccess" />
  <!-- Full width layout for Journey pages with contained scroll -->
  <div class="h-full overflow-hidden px-2 sm:px-4 lg:px-8">
    <div class="h-[calc(100vh-3rem)] overflow-y-auto overscroll-none lg:h-full">
      <div class="mx-auto max-w-full sm:max-w-[920px]" :class="{ 'xl:mx-auto': isWideScreen }">
        <slot name="screen"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import FlashMessage from '@/Components/CekapUI/Notifications/FlashMessage.vue';
import { usePage, Head } from '@inertiajs/vue3';
import { computed, onMounted, onUnmounted, ref } from 'vue';

defineOptions({
  name: 'LayoutJourney',
});

const page = usePage();
const isWideScreen = ref(false);

const checkScreenWidth = () => {
  if (typeof window !== 'undefined') {
    isWideScreen.value = window.innerWidth >= 1800;
  }
};

onMounted(() => {
  document.body.style.overflow = 'hidden';
  checkScreenWidth();
  window.addEventListener('resize', checkScreenWidth);
});

onUnmounted(() => {
  document.body.style.overflow = '';
  window.removeEventListener('resize', checkScreenWidth);
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

