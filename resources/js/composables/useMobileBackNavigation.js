import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import { parseCurrentPath, hasQueryParam } from './useMobileSubsidebarLayout';

const MODULE_INDEX_PATHS = new Set([
  '/tests',
  '/test-categories',
  '/writes',
  '/categories',
  '/bookmarks',
  '/bookmark-categories',
  '/services',
  '/projects',
  '/customers',
  '/rendition/words',
  '/rendition/packs',
  '/certificates',
  '/versions',
]);

const INDEX_PATH_BY_PREFIX = {
  customers: '/customers',
  projects: '/projects',
  services: '/services',
  tests: '/tests',
  writes: '/writes',
  categories: '/categories',
  bookmarks: '/bookmarks',
  'test-categories': '/test-categories',
  'bookmark-categories': '/bookmark-categories',
  certificates: '/certificates',
  versions: '/versions',
};

function resolveModuleIndexPath(path, segments) {
  if (segments[0] === 'rendition' && segments[1]) {
    return `/rendition/${segments[1]}`;
  }

  return INDEX_PATH_BY_PREFIX[segments[0]] || null;
}

function getQueryParam(url, param) {
  if (!url) {
    return null;
  }

  if (typeof window !== 'undefined') {
    try {
      return new URL(url, window.location.origin).searchParams.get(param);
    } catch {
      // fall through to regex check
    }
  }

  const match = url.match(new RegExp(`[?&]${param}=([^&]+)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function useMobileBackNavigation() {
  const page = usePage();

  const fullUrl = computed(() => page.url || '');
  const currentPath = computed(() => parseCurrentPath(fullUrl.value));

  const mobileBackHref = computed(() => {
    const path = currentPath.value;
    const url = fullUrl.value;
    const segments = path.split('/').filter(Boolean);

    if (!segments.length) {
      return null;
    }

    if (path === '/bookmarks' && hasQueryParam(url, 'category')) {
      return '/bookmarks';
    }

    if (segments[segments.length - 1] === 'edit' && segments.length >= 2) {
      return `/${segments.slice(0, -1).join('/')}`;
    }

    if (segments[segments.length - 1] === 'create') {
      return `/${segments.slice(0, -1).join('/')}`;
    }

    if (path.includes('/take') || path.includes('/result')) {
      const testMatch = path.match(/^(\/tests\/[^/]+)/);
      return testMatch ? testMatch[1] : '/tests';
    }

    if (segments[0] === 'categories' && segments.length >= 3) {
      return `/${segments.slice(0, 2).join('/')}`;
    }

    if (MODULE_INDEX_PATHS.has(path)) {
      return null;
    }

    if (/^\/bookmarks\/[^/]+$/.test(path)) {
      const categoryFromUrl = getQueryParam(url, 'category');
      if (categoryFromUrl) {
        return `/bookmarks?category=${encodeURIComponent(categoryFromUrl)}`;
      }

      const categoryId = page.props.bookmark?.category_id || page.props.category?.id;
      if (categoryId) {
        return `/bookmarks?category=${categoryId}`;
      }

      return '/bookmarks';
    }

    const indexPath = resolveModuleIndexPath(path, segments);
    if (indexPath && path !== indexPath && path.startsWith(`${indexPath}/`)) {
      return indexPath;
    }

    return null;
  });

  return {
    mobileBackHref,
    currentPath,
  };
}
