<template>
  <CheckLayout :isCollapsed="true">
    <template #sidebar>
      <KeepAlive :max="5" :include="['SidebarLayoutCertificate']">
        <SidebarLayoutCertificate :key="screenName" @update:isNarrow="handleSidebarWidthChange" />
      </KeepAlive>
    </template>
    <Head :title="pageTitle" />
    <FlashMessage />
    <slot />
  </CheckLayout>
</template>

<script setup>
import { computed, provide } from 'vue';
import { usePage, Head } from '@inertiajs/vue3';
import CheckLayout from '@/Components/CekapUI/Slots/CheckLayout.vue';
import SidebarLayoutCertificate from './SidebarLayoutCertificate.vue';
import FlashMessage from '@/Components/CekapUI/Notifications/FlashMessage.vue';

const page = usePage();

const screenName = computed(() => page.props.screen?.name || 'certificates');
const pageTitle = computed(() => page.props.screen?.title || 'Sertifikalar');

// Provide certificates to child components
provide('certificates', computed(() => page.props.certificates || []));

const handleSidebarWidthChange = (isNarrow) => {
  // Handle sidebar width changes if needed
};
</script>
