<template>
  <Head :title="titleName" />
  <FlashMessage :message="flashSuccess" />
  <CheckLayout
    :isCollapsed="isSidebarCollapsed"
    :is-narrow="isSidebarNarrow"
    :show-sidebar-on-mobile="shouldShowSidebarOnMobile"
    :show-main-content-on-mobile="shouldShowMainContentOnMobile"
  >
    <template #sidebar>
      <!-- SSR'da sidebar içeriğini gizle, sadece client-side'da göster -->
      <!-- Mobil show sayfalarında sidebar hiç render edilmez -->
      <KeepAlive
        v-if="isSidebarCollapsed && isMounted && shouldShowSidebarOnMobile && screenName === 'versions'"
        :max="5"
        :include="['SidebarLayoutVersion']"
      >
        <SidebarLayoutVersion :key="screenName" @update:isNarrow="handleSidebarWidthChange" />
      </KeepAlive>
    </template>
    <div :class="[shouldShowMainContentOnMobile ? 'block' : 'hidden lg:block', 'h-full min-h-0 overflow-hidden', mainContentClass]">
      <slot name="screen"></slot>
    </div>
  </CheckLayout>
</template>

<script setup>
import CheckLayout from '@/Components/CekapUI/Slots/CheckLayout.vue';
import SidebarLayoutVersion from '@/Pages/FBVersions/_layouts/SidebarLayoutVersion.vue';
import FlashMessage from '@/Components/CekapUI/Notifications/FlashMessage.vue';
import { usePage, Head } from '@inertiajs/vue3';
import { ref, computed, provide, onMounted, onBeforeUnmount, watch } from 'vue';
import { useStore } from 'vuex';
import { useMobileSubsidebarLayout } from '@/composables/useMobileSubsidebarLayout';

defineOptions({
  name: 'LayoutFBVersions',
});

const page = usePage();
const store = useStore();

// Reactive screen name
const screenName = computed(() => page.props.screen?.name || 'versions');

// Flash message
const flashSuccess = computed(() => page.props.flash?.message);

// Browser tab title - screen.seo.title kullan (PageTitle | SiteName formatında)
const titleName = computed(() => {
  return (
    page.props?.screen?.seo?.title ||
    page.props?.app?.seo?.title ||
    'Versiyonlar'
  );
});

// Check if we're on a non-index page (show, create, or edit)
const isNonIndexPage = computed(() => {
  const currentUrl = page.url || '';

  // Version show page: /versions/{version} (but not /versions, /versions/create, /versions/edit)
  const isVersionShowPage =
    currentUrl.startsWith('/versions/') &&
    currentUrl !== '/versions' &&
    !currentUrl.includes('/versions/create') &&
    !currentUrl.includes('/versions/edit') &&
    !currentUrl.match(/\/versions\/\d+$/); // Exclude edit by ID

  // Version create/edit pages
  const isVersionCreateEditPage = currentUrl === '/versions/create' || currentUrl.includes('/versions/edit');

  return isVersionShowPage || isVersionCreateEditPage;
});

const {
  shouldShowSidebarOnMobile,
  shouldShowMainContentOnMobile,
  showFullWidthMainOnMobile,
} = useMobileSubsidebarLayout({
  mode: 'sidebar-first',
  isNonIndexPage: () => isNonIndexPage.value,
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
    'lg:ml-0': true,
  };

  if (showFullWidthMainOnMobile.value) {
    classes['w-full'] = true;
  }

  return classes;
});

const handleSidebarWidthChange = (isNarrow) => {
  isSidebarNarrow.value = isNarrow;
};

// Track if component is mounted (client-side only)
const isMounted = ref(false);

// Prevent body scrolling on versions pages
onMounted(() => {
  isMounted.value = true;
  document.body.style.overflow = 'hidden';
});

onBeforeUnmount(() => {
  document.body.style.overflow = '';
});

// Provide reactive versions data
const versions = computed(() => page.props.versions || []);
provide('versions', versions);
</script>

<style>
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>
