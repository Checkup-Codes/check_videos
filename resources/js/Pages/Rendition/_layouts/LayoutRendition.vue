<template>
  <Head :title="titleName" />
  <FlashMessage :message="flashSuccess" variant="success" />
  <FlashMessage :message="flashError" variant="error" />
  <CheckLayout
    :isCollapsed="isSidebarCollapsed"
    :is-narrow="isSidebarNarrow"
    :show-sidebar-on-mobile="shouldShowSidebarOnMobile"
    :show-main-content-on-mobile="shouldShowMainContentOnMobile"
    :class="currentTheme"
  >
    <template #sidebar>
      <!-- SSR'da sidebar içeriğini gizle, sadece client-side'da göster -->
      <!-- Mobil show sayfalarında sidebar hiç render edilmez -->
      <KeepAlive
        v-if="isSidebarCollapsed && isMounted && shouldShowSidebarOnMobile && (screenName === 'words' || screenName === 'packs')"
        :max="5"
        :include="['SidebarRendition']"
      >
        <SidebarRendition :key="screenName" @update:isCollapsed="handleSidebarCollapse" />
      </KeepAlive>
    </template>
    <div :class="[shouldShowMainContentOnMobile ? 'block' : 'hidden lg:block', 'h-full min-h-0 overflow-hidden', mainContentClass]">
      <slot name="screen"></slot>
    </div>
  </CheckLayout>
</template>

<script setup>
import CheckLayout from '@/Components/CekapUI/Slots/CheckLayout.vue';
import FlashMessage from '@/Components/CekapUI/Notifications/FlashMessage.vue';
import SidebarRendition from '@/Pages/Rendition/_layouts/SidebarRendition.vue';
import { usePage, Head } from '@inertiajs/vue3';
import { ref, computed, onMounted, onBeforeUnmount, provide, watch } from 'vue';
import { useStore } from 'vuex';
import { useMobileSubsidebarLayout } from '@/composables/useMobileSubsidebarLayout';

const page = usePage();
const store = useStore();

const currentTheme = computed(() => store.getters['Theme/getCurrentTheme']);

const screenName = computed(() => page.props.screen?.name || '');

const titleName = computed(() => {
  return (
    page.props?.screen?.seo?.title ||
    page.props?.app?.seo?.title ||
    'Kelimeler'
  );
});

const flashSuccess = ref(page.props.flash?.success);
const flashError = ref(page.props.flash?.error);

watch(
  () => page.props.flash?.success,
  (value) => {
    flashSuccess.value = value || null;
  }
);

watch(
  () => page.props.flash?.error,
  (value) => {
    flashError.value = value || null;
  }
);

const isSidebarCollapsed = ref(true);
const isSidebarNarrow = ref(store.getters['Writes/isCollapsed']);

watch(
  () => store.getters['Writes/isCollapsed'],
  (val) => {
    isSidebarNarrow.value = val;
  },
  { immediate: true }
);

const handleSidebarCollapse = (newState) => {
  isSidebarCollapsed.value = newState;
};

// Check if we're on a non-index page (show, create, or edit)
const isNonIndexPage = computed(() => {
  const currentUrl = page.url || '';

  // Word show page: /rendition/words/{slug} (but not /rendition/words, /rendition/words/create, /rendition/words/edit)
  const isWordShowPage =
    currentUrl.startsWith('/rendition/words/') &&
    currentUrl !== '/rendition/words' &&
    !currentUrl.includes('/rendition/words/create') &&
    !currentUrl.includes('/rendition/words/edit') &&
    !currentUrl.match(/\/rendition\/words\/\d+$/); // Exclude edit by ID

  // Word create/edit pages
  const isWordCreateEditPage = currentUrl === '/rendition/words/create' || currentUrl.includes('/rendition/words/edit');

  // Language pack show page: /rendition/packs/{slug} or similar
  const isPackShowPage =
    currentUrl.startsWith('/rendition/packs/') &&
    currentUrl !== '/rendition/packs' &&
    !currentUrl.includes('/rendition/packs/create') &&
    !currentUrl.includes('/rendition/packs/edit');

  // Language pack create/edit pages
  const isPackCreateEditPage = currentUrl === '/rendition/packs/create' || currentUrl.includes('/rendition/packs/edit');

  return isWordShowPage || isWordCreateEditPage || isPackShowPage || isPackCreateEditPage;
});

const {
  shouldShowSidebarOnMobile,
  shouldShowMainContentOnMobile,
  showFullWidthMainOnMobile,
} = useMobileSubsidebarLayout({
  mode: 'sidebar-first',
  isNonIndexPage: () => isNonIndexPage.value,
});

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

// Track if component is mounted (client-side only)
const isMounted = ref(false);

// Prevent body scrolling on rendition pages
onMounted(() => {
  isMounted.value = true;
  document.body.style.overflow = 'hidden';
});

onBeforeUnmount(() => {
  document.body.style.overflow = '';
});

// Provide reactive data
const languagePacks = computed(() => page.props.languagePacks || []);
provide('languagePacks', languagePacks);
</script>
