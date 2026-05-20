<template>
  <Head>
    <title>{{ title }}</title>
  </Head>
  <div class="relative flex h-screen flex-col overflow-hidden bg-background text-foreground transition-colors duration-300">
    <!-- Animated Background - Global -->
    <AnimatedBackground />

    <!-- Header - En üstte -->
    <HeaderLayout class="relative z-10" @toggle-sidebar="toggleSidebar" />

    <!-- Body: global sidebar + content -->
    <div class="relative z-10 flex min-h-0 flex-1 overflow-hidden">
      <SidebarLayout
        class="relative z-10 hidden shrink-0 lg:flex"
        :is-compact="isCompactMode"
        @link-clicked="toggleSidebar"
      />

      <!-- Content Area -->
      <div :class="contentWrapperClass" class="relative z-10 min-w-0">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, provide, computed } from 'vue';
import { usePage, Head } from '@inertiajs/vue3';
import HeaderLayout from './MainLayout/HeaderLayout.vue';
import SidebarLayout from './MainLayout/SidebarLayout.vue';
import AnimatedBackground from '@/Components/AnimatedBackground.vue';

const page = usePage();

// Browser tab title - screen.seo.title kullan (PageTitle | SiteName formatında)
const title = computed(() => {
  return (
    page.props?.screen?.seo?.title ||
    page.props?.app?.seo?.title ||
    page.props?.app?.name ||
    'Check-up Codes'
  );
});

const showSidebar = ref(false);

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value;
};

// Detect if we're in a show/create/edit page for writes
const isCompactMode = computed(() => {
  const currentUrl = page.url;
  const urlParts = currentUrl.split('/').filter((part) => part);

  // Check if we're in writes section and it's not the index page
  if (urlParts[0] === 'writes' && urlParts.length > 1) {
    const secondPart = urlParts[1];
    // If it's 'create' or 'edit' or a slug (show page)
    return secondPart === 'create' || secondPart === 'edit' || (secondPart && secondPart !== 'index');
  }

  // Check if we're in categories section and it's not the index page
  if (urlParts[0] === 'categories' && urlParts.length > 1) {
    const secondPart = urlParts[1];
    // If it's 'create' or 'edit' or a slug (show page)
    return secondPart === 'create' || secondPart === 'edit' || (secondPart && secondPart !== 'index');
  }

  return false;
});

const contentWrapperClass = computed(() => {
  const baseClass = 'min-h-0 flex-1 transition-all duration-500 ease-out';

  // Check if we're on the index page
  const isIndexPage = page.url === '/' || page.url === '';

  // Check if we're on writes pages
  const isWritesPage = page.url.startsWith('/writes');

  // Check if we're on categories pages
  const isCategoriesPage = page.url.startsWith('/categories');

  // Check if we're on login page
  const isLoginPage = page.url.startsWith('/login');

  // Check if we're on rendition pages
  const isRenditionPage = page.url.startsWith('/rendition');

  const isJourneyPage = page.url.startsWith('/journey');
  const isCertificatesPage = page.url.startsWith('/certificates');
  const isWorkspacePage = page.url.startsWith('/workspace');
  const isBookmarksPage = page.url.startsWith('/bookmarks') || page.url.startsWith('/bookmark-categories');
  const isTestsPage = page.url.startsWith('/tests') || page.url.startsWith('/test-categories');
  const isProjectsPage =
    page.url.startsWith('/services') ||
    page.url.startsWith('/projects') ||
    page.url.startsWith('/customers');

  // Check if we're on versions page
  const isVersionsPage = page.url.startsWith('/versions');

  // Check if we're on dashboard page
  const isDashboardPage = page.url.startsWith('/dashboard');

  // Check if we're on media page
  const isMediaPage = page.url.startsWith('/media');

  // Check if we're on social-media page
  const isSocialMediaPage = page.url.startsWith('/social-media');

  // Check if we're on seo page
  const isSeoPage = page.url.startsWith('/seo');

  // Check if we're on theme-management page
  const isThemeManagementPage = page.url.startsWith('/theme-management');

  // For all special pages, use full height without scroll
  if (
    isIndexPage ||
    isWritesPage ||
    isCategoriesPage ||
    isLoginPage ||
    isRenditionPage ||
    isJourneyPage ||
    isCertificatesPage ||
    isWorkspacePage ||
    isBookmarksPage ||
    isTestsPage ||
    isProjectsPage ||
    isVersionsPage ||
    isDashboardPage ||
    isMediaPage ||
    isSocialMediaPage ||
    isSeoPage ||
    isThemeManagementPage
  ) {
    return `${baseClass} overflow-hidden`;
  }

  return baseClass;
});

// Yazı listesini inertia'dan al ve provide et
const writes = page.props.writes || [];
provide('writes', writes);

// Kategori listesini inertia'dan al ve provide et
const categories = page.props.categories || [];
provide('categories', categories);
</script>
