<template>
  <Head :title="titleName" />
  <FlashMessage :message="flashSuccess" />
  <CheckLayout
    :isCollapsed="!shouldHideSidebarContent"
    :is-narrow="isSidebarNarrow"
    :show-sidebar-on-mobile="shouldShowSidebarOnMobile"
    :show-main-content-on-mobile="shouldShowMainContentOnMobile"
  >
    <template #sidebar>
      <!-- SSR'da sidebar içeriğini gizle, sadece client-side'da göster -->
      <!-- Mobil show sayfalarında sidebar hiç render edilmez -->
      <KeepAlive
        v-if="!shouldHideSidebarContent && isMounted && shouldShowSidebarOnMobile"
        :max="5"
        :include="['SidebarLayoutBookmarks']"
      >
        <SidebarLayoutBookmarks :key="screenName" @update:isNarrow="handleSidebarWidthChange" />
      </KeepAlive>
    </template>
    <div :class="[shouldShowMainContentOnMobile ? 'block' : 'hidden lg:block', 'flex h-full min-h-0 flex-col overflow-hidden', mainContentClass]">
      <slot name="screen"></slot>
    </div>
  </CheckLayout>
</template>

<script setup>
import { ref, computed, provide, onMounted, onBeforeUnmount, watch } from 'vue';
import { usePage, Head } from '@inertiajs/vue3';
import CheckLayout from '@/Components/CekapUI/Slots/CheckLayout.vue';
import SidebarLayoutBookmarks from '@/Pages/Bookmarks/_layouts/SidebarLayoutBookmarks.vue';
import FlashMessage from '@/Components/CekapUI/Notifications/FlashMessage.vue';
import { useStore } from 'vuex';
import { useMobileSubsidebarLayout } from '@/composables/useMobileSubsidebarLayout';

// Component name definition for dev tools
defineOptions({
  name: 'LayoutBookmarks',
});

const page = usePage();
const store = useStore();

// Provide reactive categories data
const categories = computed(() => page.props.categories || []);
provide('categories', categories);

// Reactive screen name
const screenName = computed(() => page.props.screen?.name || 'bookmarks');

// Flash message
const flashSuccess = computed(() => page.props.flash?.message);

// Browser tab title - screen.seo.title kullan (PageTitle | SiteName formatında)
const titleName = computed(() => {
  return (
    page.props?.screen?.seo?.title ||
    page.props?.app?.seo?.title ||
    'Yer İmleri'
  );
});

// Check if we're on a non-index page (show, create, or edit)
const isNonIndexPage = computed(() => {
  const path = (page.url || '').split('?')[0].split('#')[0];

  // Bookmark show page: /bookmarks/{id}
  const isBookmarkShowPage = /^\/bookmarks\/[^/]+$/.test(path);

  // Bookmark create/edit pages
  const isBookmarkCreateEditPage =
    path === '/bookmarks/create' || /^\/bookmarks\/[^/]+\/edit$/.test(path);

  // Category create page
  const isCategoryCreatePage = path === '/bookmark-categories/create';

  return isBookmarkShowPage || isBookmarkCreateEditPage || isCategoryCreatePage;
});

const shouldHideSidebarContent = computed(() => false);

const {
  shouldShowSidebarOnMobile,
  shouldShowMainContentOnMobile,
  showFullWidthMainOnMobile,
} = useMobileSubsidebarLayout({
  mode: 'filter-query',
  indexPath: '/bookmarks',
  filterParam: 'category',
  isNonIndexPage: () => isNonIndexPage.value,
});

// Sidebar state (always expanded unless shouldHideSidebarContent)
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

// Prevent body scrolling on bookmarks pages
onMounted(() => {
  // Mark as mounted to enable sidebar rendering (client-side only)
  isMounted.value = true;
  document.body.style.overflow = 'hidden';
});

onBeforeUnmount(() => {
  document.body.style.overflow = '';
});
</script>

<style>
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>
