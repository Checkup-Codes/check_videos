<template>
  <Head>
    <title>{{ title }}</title>
  </Head>
  <SidebarLayout :class="sidebarClass" :is-compact="isCompactMode" @link-clicked="toggleSidebar" />
  <div :class="contentWrapperClass">
    <HeaderLayout @toggle-sidebar="toggleSidebar" />
    <slot />
  </div>
</template>

<script setup>
import { ref, provide, computed } from 'vue';
import { usePage, Head } from '@inertiajs/vue3';
import HeaderLayout from './MainLayout/HeaderLayout.vue';
import SidebarLayout from './MainLayout/SidebarLayout.vue';

const page = usePage();

const title = computed(() => {
  const pageTitle = page.props.title;
  const appName = page.props.app.name;
  return pageTitle ? `${pageTitle} - ${appName}` : appName;
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

const sidebarClass = computed(() => {
  const baseClass = 'fixed inset-y-0 left-0 z-40 overflow-hidden transition-all duration-500 ease-out';
  const widthClass = isCompactMode.value ? 'lg:w-24' : 'lg:w-64';
  return `${baseClass} ${widthClass}`;
});

const contentWrapperClass = computed(() => {
  const baseClass = 'transition-all duration-500 ease-out';
  const paddingClass = isCompactMode.value ? 'lg:pl-24' : 'lg:pl-64';

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
    isVersionsPage ||
    isDashboardPage ||
    isMediaPage ||
    isSocialMediaPage ||
    isSeoPage ||
    isThemeManagementPage
  ) {
    return `${baseClass} ${paddingClass} h-screen overflow-hidden`;
  }

  return `${baseClass} ${paddingClass}`;
});

// Yazı listesini inertia'dan al ve provide et
const writes = page.props.writes || [];
provide('writes', writes);

// Kategori listesini inertia'dan al ve provide et
const categories = page.props.categories || [];
provide('categories', categories);
</script>
