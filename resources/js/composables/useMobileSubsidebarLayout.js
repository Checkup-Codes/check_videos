import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { usePage } from '@inertiajs/vue3';

export function parseCurrentPath(url) {
  return (url || '').split('?')[0].split('#')[0];
}

export function hasQueryParam(url, param) {
  if (!url) {
    return false;
  }

  if (typeof window !== 'undefined') {
    try {
      return new URL(url, window.location.origin).searchParams.has(param);
    } catch {
      // fall through to regex check
    }
  }

  return new RegExp(`[?&]${param}=`).test(url);
}

export function useIsMobile() {
  const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const isMobile = computed(() => windowWidth.value < 1024);

  const updateWindowWidth = () => {
    if (typeof window !== 'undefined') {
      windowWidth.value = window.innerWidth;
    }
  };

  onMounted(() => {
    if (typeof window !== 'undefined') {
      windowWidth.value = window.innerWidth;
      window.addEventListener('resize', updateWindowWidth);
    }
  });

  onBeforeUnmount(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', updateWindowWidth);
    }
  });

  return { isMobile, windowWidth, updateWindowWidth };
}

/**
 * Unified mobile subsidebar visibility for module layouts.
 *
 * Modes:
 * - sidebar-first: index → subsidebar only; detail/create/edit → main content (tests, writes, …)
 * - filter-query: index without filter → subsidebar; with filter or detail → main content (bookmarks)
 * - main-content-primary: main content always on mobile; subsidebar desktop-only (projects)
 */
export function useMobileSubsidebarLayout(options) {
  const page = usePage();
  const { isMobile } = useIsMobile();

  const currentPath = computed(() => parseCurrentPath(page.url));
  const fullUrl = computed(() => page.url || '');

  const isNonIndexPage = computed(() => {
    return typeof options.isNonIndexPage === 'function'
      ? options.isNonIndexPage()
      : options.isNonIndexPage?.value ?? false;
  });

  const forceMainContent = computed(() => {
    return typeof options.forceMainContent === 'function'
      ? options.forceMainContent()
      : options.forceMainContent?.value ?? false;
  });

  const hasFilter = computed(() => {
    if (options.mode !== 'filter-query' || !options.filterParam) {
      return false;
    }

    return hasQueryParam(fullUrl.value, options.filterParam);
  });

  const isIndexPage = computed(() => {
    if (options.indexPath) {
      return currentPath.value === options.indexPath;
    }

    return !isNonIndexPage.value;
  });

  const shouldShowSidebarOnMobile = computed(() => {
    if (!isMobile.value) {
      return true;
    }

    switch (options.mode) {
      case 'main-content-primary':
        return false;
      case 'filter-query':
        return isIndexPage.value && !hasFilter.value;
      case 'sidebar-first':
      default:
        return !isNonIndexPage.value && !forceMainContent.value;
    }
  });

  const shouldShowMainContentOnMobile = computed(() => {
    if (!isMobile.value) {
      return true;
    }

    switch (options.mode) {
      case 'main-content-primary':
        return true;
      case 'filter-query':
        return isNonIndexPage.value || (isIndexPage.value && hasFilter.value) || forceMainContent.value;
      case 'sidebar-first':
      default:
        return isNonIndexPage.value || forceMainContent.value;
    }
  });

  const showFullWidthMainOnMobile = computed(() => {
    return isMobile.value && shouldShowMainContentOnMobile.value && !shouldShowSidebarOnMobile.value;
  });

  return {
    isMobile,
    currentPath,
    fullUrl,
    hasFilter,
    isIndexPage,
    isNonIndexPage,
    shouldShowSidebarOnMobile,
    shouldShowMainContentOnMobile,
    showFullWidthMainOnMobile,
  };
}
