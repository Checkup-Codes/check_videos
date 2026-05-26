<template>
  <Head :title="titleName" />
  <FlashMessage :message="flashSuccess" />
  <CheckLayout :isCollapsed="false">
    <div class="h-full min-h-0 overflow-hidden">
      <slot name="screen"></slot>
    </div>
  </CheckLayout>
</template>

<script setup>
import CheckLayout from '@/Components/CekapUI/Slots/CheckLayout.vue';
import FlashMessage from '@/Components/CekapUI/Notifications/FlashMessage.vue';
import { usePage, Head } from '@inertiajs/vue3';
import { computed, onMounted, onBeforeUnmount } from 'vue';

defineOptions({
  name: 'LayoutCertificates',
});

const page = usePage();

const flashSuccess = computed(() => page.props.flash?.message);

const titleName = computed(() => {
  return page.props?.screen?.seo?.title || page.props?.app?.seo?.title || 'Sertifikalar';
});

onMounted(() => {
  document.body.style.overflow = 'hidden';
});

onBeforeUnmount(() => {
  document.body.style.overflow = '';
});
</script>
