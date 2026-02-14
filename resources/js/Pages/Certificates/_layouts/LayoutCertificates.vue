<template>
  <Head :title="titleName" />
  <FlashMessage :message="flashSuccess" />
  <CheckLayout
    :isCollapsed="isSidebarCollapsed"
    :show-sidebar-on-mobile="shouldShowSidebarOnMobile"
    :show-main-content-on-mobile="shouldShowMainContentOnMobile"
  >
    <template #sidebar>
      <!-- SSR'da sidebar içeriğini gizle, sadece client-side'da göster -->
      <!-- Mobil show sayfalarında sidebar hiç render edilmez -->
      <KeepAlive
        v-if="isSidebarCollapsed && isMounted && shouldShowSidebarOnMobile && screenName === 'certificates'"
        :max="5"
        :include="['SidebarLayoutCertificate']"
      >
        <SidebarLayoutCertificate :key="screenName" @update:isNarrow="handleSidebarWidthChange" />
      </KeepAlive>
    </template>
    <div :class="[shouldShowMainContentOnMobile ? 'block' : 'hidden lg:block', mainContentClass]">
      <slot name="screen"></slot>
    </div>
  </CheckLayout>
</template>

<script setup>
import CheckLayout from '@/Components/CekapUI/Slots/CheckLayout.vue';
import SidebarLayoutCertificate from '@/Pages/Certificates/_layouts/SidebarLayoutCertificate.vue';
import FlashMessage from '@/Components/CekapUI/Notifications/FlashMessage.vue';
import { usePage, Head } from '@inertiajs/vue3';
import { ref, computed, provide, onMounted, onBeforeUnmount, watch } from 'vue';
import { useStore } from 'vuex';

defineOptions({
  name: 'LayoutCertificates',
});

const page = usePage();
const store = useStore();

// Reactive screen name
const screenName = computed(() => page.props.screen?.name || 'certificates');

// Flash message
const flashSuccess = computed(() => page.props.flash?.message);

// Browser tab title - screen.seo.title kullan (PageTitle | SiteName formatında)
const titleName = computed(() => {
  return (
    page.props?.screen?.seo?.title ||
    page.props?.app?.seo?.title ||
    'Sertifikalar'
  );
});

// Real mobile detection based on window width (client-side only)
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1024);
const isMobile = computed(() => windowWidth.value < 1024);

// Update window width on resize
const updateWindowWidth = () => {
  if (typeof window !== 'undefined') {
    windowWidth.value = window.innerWidth;
  }
};

// Check if we're on a non-index page (show, create, or edit) - on mobile, hide sidebar for these pages
const isNonIndexPage = computed(() => {
  const currentUrl = page.url || '';

  // Certificate show page: /certificates/{slug} (but not /certificates, /certificates/create, /certificates/edit)
  const isCertificateShowPage =
    currentUrl.startsWith('/certificates/') &&
    currentUrl !== '/certificates' &&
    !currentUrl.includes('/certificates/create') &&
    !currentUrl.includes('/certificates/edit');

  // Certificate create/edit pages
  const isCertificateCreateEditPage = currentUrl === '/certificates/create' || currentUrl.includes('/certificates/edit');

  return isCertificateShowPage || isCertificateCreateEditPage;
});

// On mobile: show only sidebar on index pages, only main content on non-index pages (show, create, edit)
const shouldShowSidebarOnMobile = computed(() => {
  if (!isMobile.value) return true; // Desktop: always show sidebar if collapsed
  return !isNonIndexPage.value; // Mobile: show sidebar only on index pages
});

const shouldShowMainContentOnMobile = computed(() => {
  if (!isMobile.value) return true; // Desktop: always show main content
  return isNonIndexPage.value; // Mobile: show main content on non-index pages (show, create, edit)
});

// Sidebar state
const isSidebarCollapsed = ref(true);
const isSidebarNarrow = ref(store.getters['Writes/isCollapsed']);

// Sync with store on mount and when store changes
watch(
  () => store.getters['Writes/isCollapsed'],
  (val) => {
    isSidebarNarrow.value = val;
  },
  { immediate: true }
);

const mainContentClass = computed(() => {
  const classes = {
    'transition-all duration-300': true,
    'lg:ml-[-200px]': isSidebarNarrow.value,
    'lg:ml-[0px]': !isSidebarNarrow.value,
  };

  // Mobil non-index sayfalarında (show, create, edit) tam genişlik
  if (isMobile.value && isNonIndexPage.value) {
    classes['w-full'] = true;
  }

  return classes;
});

const handleSidebarWidthChange = (isNarrow) => {
  isSidebarNarrow.value = isNarrow;
};

// Track if component is mounted (client-side only)
const isMounted = ref(false);

// Prevent body scrolling on certificates pages
onMounted(() => {
  isMounted.value = true;
  document.body.style.overflow = 'hidden';

  // Initialize window width and add resize listener
  if (typeof window !== 'undefined') {
    windowWidth.value = window.innerWidth;
    window.addEventListener('resize', updateWindowWidth);
  }
});

onBeforeUnmount(() => {
  document.body.style.overflow = '';

  // Remove resize listener
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', updateWindowWidth);
  }
});

// Provide reactive certificates data
const certificates = computed(() => page.props.certificates || []);
provide('certificates', certificates);
</script>

<style>
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>
