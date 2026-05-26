<template>
  <Head :title="titleName" />
  <FlashMessage :message="flashMessage" @close="handleFlashClose" />
  <CheckLayout
    :isCollapsed="isCollapsed"
    :is-narrow="isSidebarNarrow"
    :show-sidebar-on-mobile="shouldShowSidebarOnMobile"
    :show-main-content-on-mobile="shouldShowMainContentOnMobile"
  >
    <template #sidebar>
      <!-- SSR'da sidebar içeriğini gizle, sadece client-side'da göster -->
      <!-- Mobil show sayfalarında sidebar hiç render edilmez -->
      <KeepAlive
        v-if="isCollapsed && isMounted && shouldShowSidebarOnMobile"
        :max="5"
        :include="['SidebarLayoutProject']"
      >
        <component :is="SidebarLayoutProject" :key="screenName" @update:isNarrow="handleSidebarWidthChange" />
      </KeepAlive>
    </template>
    <div :class="[shouldShowMainContentOnMobile ? 'flex' : 'hidden lg:flex', 'h-full min-h-0 flex-col overflow-hidden', mainContentClass]">
      <ProjectsModuleTabs class="lg:hidden shrink-0" />
      <div class="min-h-0 flex-1 overflow-hidden">
        <slot name="screen"></slot>
      </div>
    </div>
  </CheckLayout>
</template>

<script setup>
import { computed, ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { usePage, Head } from '@inertiajs/vue3';
import CheckLayout from '@/Components/CekapUI/Slots/CheckLayout.vue';
import SidebarLayoutProject from '@/Pages/Projects/_layouts/SidebarLayoutProject.vue';
import FlashMessage from '@/Components/CekapUI/Notifications/FlashMessage.vue';
import ProjectsModuleTabs from '@/Pages/Projects/_components/ProjectsModuleTabs.vue';
import { useSidebar } from '../_utils/useSidebar';
import { useFlashMessage } from '../_utils/useFlashMessage';
import { useMobileSubsidebarLayout } from '@/composables/useMobileSubsidebarLayout';

// Component name definition for dev tools
defineOptions({
  name: 'LayoutProjects',
});

// Composables
const { isCollapsed, toggleSidebar, sidebarStyle } = useSidebar();
const { flashMessage } = useFlashMessage();

const handleFlashClose = () => {
  flashMessage.value = '';
};

// Get screen name from props - make it reactive
const page = usePage();
const screenName = computed(() => page.props.screen?.name || '');

// Browser tab title - screen.seo.title kullan (PageTitle | SiteName formatında)
const titleName = computed(() => {
  return (
    page.props?.screen?.seo?.title ||
    page.props?.app?.seo?.title ||
    'Projeler'
  );
});

// Check if we're on a non-index page (show, create, or edit)
const isNonIndexPage = computed(() => {
  const currentUrl = page.url || '';

  // Service show page: /services/{slug} (but not /services, /services/create, /services/edit)
  const isServiceShowPage =
    currentUrl.startsWith('/services/') &&
    currentUrl !== '/services' &&
    !currentUrl.includes('/services/create') &&
    !currentUrl.includes('/services/edit');

  // Service create/edit pages
  const isServiceCreateEditPage = currentUrl === '/services/create' || currentUrl.includes('/services/edit');

  // Project show page: /projects/{id} (but not /projects, /projects/create, /projects/edit)
  const isProjectShowPage =
    currentUrl.startsWith('/projects/') &&
    currentUrl !== '/projects' &&
    !currentUrl.includes('/projects/create') &&
    !currentUrl.includes('/projects/edit');

  // Project create/edit pages
  const isProjectCreateEditPage = currentUrl === '/projects/create' || currentUrl.includes('/projects/edit');

  // Customer show page: /customers/{id} (but not /customers, /customers/create, /customers/edit)
  const isCustomerShowPage =
    currentUrl.startsWith('/customers/') &&
    currentUrl !== '/customers' &&
    !currentUrl.includes('/customers/create') &&
    !currentUrl.includes('/customers/edit');

  // Customer create/edit pages
  const isCustomerCreateEditPage = currentUrl === '/customers/create' || currentUrl.includes('/customers/edit');

  return isServiceShowPage || isServiceCreateEditPage || isProjectShowPage || isProjectCreateEditPage || isCustomerShowPage || isCustomerCreateEditPage;
});

const {
  shouldShowSidebarOnMobile,
  shouldShowMainContentOnMobile,
  showFullWidthMainOnMobile,
} = useMobileSubsidebarLayout({
  mode: 'main-content-primary',
  isNonIndexPage: () => isNonIndexPage.value,
});

// Handle sidebar width changes
const isSidebarNarrow = ref(false);

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

// Prevent body scrolling on projects pages
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
