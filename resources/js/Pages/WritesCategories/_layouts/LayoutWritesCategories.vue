<template>
  <FlashMessage :message="flashMessage" @close="handleFlashClose" />
  
  <!-- Toggle Sidebar Button - Fixed position, only for logged in users and NOT on index pages -->
  <div v-if="isLoggedIn && !shouldHideSidebarContent && !isIndexPage" class="fixed bottom-6 right-6 z-50 lg:bottom-8 lg:right-8">
    <!-- Tooltip hint for first-time external visitors -->
    <div
      v-if="showSidebarHint"
      class="absolute bottom-full right-0 mb-2 w-64 animate-in slide-in-from-bottom-2 rounded-lg border border-primary/20 bg-primary/10 p-3 shadow-lg backdrop-blur-sm"
    >
      <div class="flex items-start gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 flex-shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div class="flex-1">
          <p class="text-xs font-medium text-foreground">Daha fazla içerik keşfet!</p>
          <p class="mt-1 text-xs text-muted-foreground">Sidebar'ı açmak için tıklayın</p>
        </div>
        <button @click="dismissSidebarHint" class="flex-shrink-0 text-muted-foreground hover:text-foreground">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
    
    <button
      @click="toggleSidebarVisibility"
      class="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:scale-110 hover:shadow-xl"
      :title="isSidebarVisible ? 'Sidebar\'ı Gizle (Odaklanmış Okuma)' : 'Sidebar\'ı Göster (Daha Fazla İçerik)'"
    >
      <svg
        v-if="isSidebarVisible"
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
      </svg>
    </button>
  </div>
  
  <CheckLayout
    :isCollapsed="!shouldHideSidebarContent && (isIndexPage || isSidebarVisible)"
    :show-sidebar-on-mobile="shouldShowSidebarOnMobile"
    :show-main-content-on-mobile="shouldShowMainContentOnMobile"
  >
    <template #sidebar>
      <!-- SSR'da sidebar içeriğini gizle, sadece client-side'da göster -->
      <!-- Mobil show sayfalarında sidebar hiç render edilmez -->
      <KeepAlive
        v-if="shouldShowSidebarOnMobile && !shouldHideSidebarContent && isMounted && (isIndexPage || isSidebarVisible)"
        :max="5"
        :include="['SidebarLayoutWrite', 'SidebarLayoutCategory']"
      >
        <component :is="sidebarComponent" :key="screenName" @update:isNarrow="handleSidebarWidthChange" />
      </KeepAlive>
    </template>
    <div :class="[shouldShowMainContentOnMobile ? 'block' : 'hidden lg:block', mainContentClass]">
      <slot name="screen"></slot>
    </div>
  </CheckLayout>
</template>

<script setup>
import { computed, ref, provide, watch, onMounted, onBeforeUnmount } from 'vue';
import { usePage, router } from '@inertiajs/vue3';
import CheckLayout from '@/Components/CekapUI/Slots/CheckLayout.vue';
import SidebarLayoutWrite from './SidebarLayoutWrite.vue';
import SidebarLayoutCategory from './SidebarLayoutCategory.vue';
import FlashMessage from '@/Components/CekapUI/Notifications/FlashMessage.vue';
import { useSidebar } from '../_utils/useSidebar';
import { useFlashMessage } from '../_utils/useFlashMessage';
import { useStore } from 'vuex';

// Component name definition for dev tools
defineOptions({
  name: 'LayoutWritesCategories',
});

// Composables
const { isCollapsed, toggleSidebar, sidebarStyle } = useSidebar();
const { flashMessage } = useFlashMessage();
const store = useStore();

// Real mobile detection based on window width (client-side only)
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1024);
const isMobile = computed(() => windowWidth.value < 1024);

// Update window width on resize
const updateWindowWidth = () => {
  if (typeof window !== 'undefined') {
    windowWidth.value = window.innerWidth;
  }
};

const handleFlashClose = () => {
  flashMessage.value = '';
};

// Get screen name from props - make it reactive
const page = usePage();
const screenName = computed(() => page.props.screen?.name || 'writes');

// Sidebar component mapping
const sidebarComponents = {
  writes: SidebarLayoutWrite,
  categories: SidebarLayoutCategory,
};

// Check if user is logged in
const isLoggedIn = computed(() => {
  return !!(page.props.auth && page.props.auth.user);
});

// Check if we're on an index page (list page) where sidebar should always be visible
const isIndexPage = computed(() => {
  const currentUrl = page.url || '';
  // Index pages: /writes, /categories, /writes?search=..., /categories?search=...
  return currentUrl === '/writes' || 
         currentUrl.startsWith('/writes?') || 
         currentUrl === '/categories' || 
         currentUrl.startsWith('/categories?');
});

// Check if we're on a non-index page (show, create, or edit) - on mobile, hide sidebar for these pages
const isNonIndexPage = computed(() => {
  const currentUrl = page.url || '';

  // Write show page: /writes/{slug} (but not /writes, /writes/create, /writes/edit)
  const isWriteShowPage =
    currentUrl.startsWith('/writes/') &&
    currentUrl !== '/writes' &&
    !currentUrl.includes('/writes/create') &&
    !currentUrl.includes('/writes/edit');

  // Write create/edit pages
  const isWriteCreateEditPage = currentUrl === '/writes/create' || currentUrl.includes('/writes/edit');

  // Category show page: /categories/{slug} or /categories/{slug}/{write}
  // (but not /categories, /categories/create, /categories/edit)
  const isCategoryShowPage =
    currentUrl.startsWith('/categories/') &&
    currentUrl !== '/categories' &&
    !currentUrl.includes('/categories/create') &&
    !currentUrl.includes('/categories/edit');

  // Category create/edit pages
  const isCategoryCreateEditPage = currentUrl === '/categories/create' || currentUrl.includes('/categories/edit');

  return isWriteShowPage || isWriteCreateEditPage || isCategoryShowPage || isCategoryCreateEditPage;
});

// Check if current write is link-only and user is not logged in
const shouldHideSidebarContent = computed(() => {
  // If user is logged in, always show sidebar content
  if (isLoggedIn.value) {
    return false;
  }

  // Check if we're on a write show page and the write is link-only
  const currentUrl = page.url || '';
  const isWriteShowPageCheck =
    currentUrl.includes('/writes/') && !currentUrl.includes('/writes/create') && !currentUrl.includes('/writes/edit');

  // Also check for categories with link-only writes
  const isCategoryShowPageCheck =
    currentUrl.includes('/categories/') &&
    !currentUrl.includes('/categories/create') &&
    !currentUrl.includes('/categories/edit');

  if (isWriteShowPageCheck || isCategoryShowPageCheck) {
    // Check if the current write has link_only status
    const currentWrite = page.props.write;
    if (currentWrite && currentWrite.status === 'link_only') {
      return true;
    }
  }

  return false;
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

// Determine which sidebar component to display based on screen name
const sidebarComponent = computed(() => {
  if (isCollapsed.value && screenName.value && !shouldHideSidebarContent.value && shouldShowSidebarOnMobile.value && (isIndexPage.value || isSidebarVisible.value)) {
    return sidebarComponents[screenName.value] || null;
  }
  return null;
});

// Handle sidebar width changes
const isSidebarNarrow = ref(store.getters['Writes/isCollapsed']);

// Sync with store on mount and when store changes
watch(
  () => store.getters['Writes/isCollapsed'],
  (val) => {
    isSidebarNarrow.value = val;
  },
  { immediate: true }
);

const mainContentClass = computed(() => ({
  'transition-all duration-300': true,
  'lg:ml-[-200px]': isSidebarNarrow.value && !shouldHideSidebarContent.value && (isIndexPage.value || isSidebarVisible.value),
  'lg:ml-[00px]': !isSidebarNarrow.value && !shouldHideSidebarContent.value && (isIndexPage.value || isSidebarVisible.value),
  'lg:ml-0': shouldHideSidebarContent.value || (!isIndexPage.value && !isSidebarVisible.value), // Full width when sidebar is hidden or toggled off (except on index pages)
}));

const handleSidebarWidthChange = (isNarrow) => {
  isSidebarNarrow.value = isNarrow;
};

// Track if component is mounted (client-side only)
const isMounted = ref(false);

// Sidebar visibility state - smart default based on referrer
const isSidebarVisible = ref(true);

// Show hint for first-time external visitors
const showSidebarHint = ref(false);

// Track if this is the first load in the session
const isFirstLoad = ref(true);

// Check if user came from external source (Google, social media, etc.)
const isExternalReferrer = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false;
  
  const referrer = document.referrer;
  const currentHost = window.location.hostname;
  
  // No referrer means direct access (bookmark, typed URL, etc.) - treat as external
  if (!referrer) return true;
  
  try {
    const referrerUrl = new URL(referrer);
    const referrerHost = referrerUrl.hostname;
    
    // Check if referrer is from the same domain (including subdomains)
    // For multi-tenant: checkupcodes.com, elselif.com, etc.
    const currentDomain = currentHost.split('.').slice(-2).join('.');
    const referrerDomain = referrerHost.split('.').slice(-2).join('.');
    
    // If domains match, it's internal navigation
    return currentDomain !== referrerDomain;
  } catch (e) {
    // If URL parsing fails, treat as external
    return true;
  }
};

// Smart initial sidebar state
const getInitialSidebarState = () => {
  if (typeof window === 'undefined') return true;
  
  // On index pages, sidebar is always visible
  if (isIndexPage.value) return true;
  
  // PRIORITY 1: Check sessionStorage first (maintains state during site navigation)
  const sessionPreference = sessionStorage.getItem('sidebar_visible');
  if (sessionPreference !== null) {
    return sessionPreference === 'true';
  }
  
  // PRIORITY 2: Check localStorage (user's saved preference from previous sessions)
  const savedPreference = localStorage.getItem('sidebar_visible');
  if (savedPreference !== null) {
    return savedPreference === 'true';
  }
  
  // PRIORITY 3: No saved preference - use smart default based on referrer
  // External referrer (Google, social, direct) = hide sidebar for focused reading
  // Internal navigation = show sidebar for easy navigation
  return !isExternalReferrer();
};

// Check if we should show the hint
const shouldShowHint = () => {
  if (typeof window === 'undefined') return false;
  
  // Never show hint on index pages (sidebar is always visible there)
  if (isIndexPage.value) return false;
  
  // Don't show hint if user has already seen it
  const hintDismissed = localStorage.getItem('sidebar_hint_dismissed');
  if (hintDismissed === 'true') return false;
  
  // Don't show hint if user has a saved preference (they already know about the feature)
  const savedPreference = localStorage.getItem('sidebar_visible');
  if (savedPreference !== null) return false;
  
  // Show hint only for external visitors with sidebar hidden
  return isExternalReferrer();
};

// Dismiss the hint
const dismissSidebarHint = () => {
  showSidebarHint.value = false;
  if (typeof window !== 'undefined') {
    localStorage.setItem('sidebar_hint_dismissed', 'true');
  }
};

// Load sidebar visibility with smart defaults
const loadSidebarVisibility = () => {
  if (typeof window !== 'undefined') {
    isSidebarVisible.value = getInitialSidebarState();
    
    // Mark that we've loaded the initial state
    isFirstLoad.value = false;
    
    // Save to sessionStorage to maintain state during site navigation
    sessionStorage.setItem('sidebar_visible', isSidebarVisible.value.toString());
    
    // Show hint after a short delay if conditions are met
    if (shouldShowHint() && !isSidebarVisible.value) {
      setTimeout(() => {
        showSidebarHint.value = true;
        // Auto-dismiss hint after 8 seconds
        setTimeout(() => {
          if (showSidebarHint.value) {
            dismissSidebarHint();
          }
        }, 8000);
      }, 2000); // Show hint 2 seconds after page load
    }
  }
};

// Save sidebar visibility to both localStorage and sessionStorage
const saveSidebarVisibility = () => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('sidebar_visible', isSidebarVisible.value.toString());
    sessionStorage.setItem('sidebar_visible', isSidebarVisible.value.toString());
  }
};

// Toggle sidebar visibility
const toggleSidebarVisibility = () => {
  isSidebarVisible.value = !isSidebarVisible.value;
  saveSidebarVisibility();
  
  // Dismiss hint when user interacts with the button
  if (showSidebarHint.value) {
    dismissSidebarHint();
  }
};

// Router event cleanup function
let removeRouterListener = null;

// Prevent body scrolling on writes pages
onMounted(() => {
  // Mark as mounted to enable sidebar rendering (client-side only)
  isMounted.value = true;
  document.body.style.overflow = 'hidden';
  
  // Load sidebar visibility preference
  loadSidebarVisibility();

  // Initialize window width and add resize listener
  if (typeof window !== 'undefined') {
    windowWidth.value = window.innerWidth;
    window.addEventListener('resize', updateWindowWidth);
  }
  
  // F5 sonrası veya ilk yüklemede sidebar verilerini yükle
  // Watch'tan bağımsız olarak, mount olduğunda da kontrol et
  if (shouldShowSidebarOnMobile.value && !shouldHideSidebarContent.value && (isIndexPage.value || isSidebarVisible.value)) {
    loadSidebarDataOnce();
  }
  
  // Listen to Inertia navigation events to maintain sidebar state
  removeRouterListener = router.on('navigate', (event) => {
    // On every navigation, reload sidebar state from storage
    // This ensures state persists when navigating between write pages
    if (typeof window !== 'undefined') {
      const sessionPreference = sessionStorage.getItem('sidebar_visible');
      if (sessionPreference !== null) {
        isSidebarVisible.value = sessionPreference === 'true';
      }
    }
  });
  
  // CRUD işlemlerinden sonra sidebar cache'ini invalidate et
  router.on('success', (event) => {
    const flash = page.props.flash;
    const url = event.detail.page.url || '';
    
    // Yazı veya kategori CRUD işlemi yapıldıysa (success mesajı varsa)
    if (flash?.success && (url.includes('/writes') || url.includes('/categories'))) {
      // Store, update, destroy işlemlerinden sonra cache'i yenile
      const isCreatePage = url.includes('/create');
      const isEditPage = url.includes('/edit');
      const isIndexPageCheck = url === '/writes' || url === '/categories';
      
      // Create veya Edit sayfasından redirect olduysa (yani CRUD işlemi yapıldı)
      if (!isCreatePage && !isEditPage) {
        // Sidebar verilerini yeniden yükle
        store.dispatch('Writes/invalidateAndReload', { 
          currentUserId: page.props.auth?.user?.id || null 
        });
      }
    }
  });
});

onBeforeUnmount(() => {
  document.body.style.overflow = '';

  // Remove resize listener
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', updateWindowWidth);
  }
  
  // Remove router listener
  if (removeRouterListener) {
    removeRouterListener();
  }
});

// Provide reactive data
const categories = computed(() => page.props.categories || []);
const writes = computed(() => page.props.writes || page.props.allWrites || []); // allWrites fallback for category pages

// Current user ID (login durumu takibi için)
const currentUserId = computed(() => page.props.auth?.user?.id || null);

// Store'dan sidebar verilerini al
const storeWrites = computed(() => store.getters['Writes/writes']);
const storeCategories = computed(() => store.getters['Writes/categories']);
const sidebarDataLoaded = computed(() => store.getters['Writes/sidebarDataLoaded']);
const lastUserId = computed(() => store.getters['Writes/lastUserId']);

// Combined categories and writes (store > props)
const combinedCategories = computed(() => {
  // Önce store'a bak (cache'lenmiş veri)
  if (storeCategories.value && storeCategories.value.length > 0) {
    return storeCategories.value;
  }
  // Sonra props'a bak
  if (categories.value && categories.value.length > 0) {
    return categories.value;
  }
  return [];
});

const combinedWrites = computed(() => {
  // Önce store'a bak (cache'lenmiş veri)
  if (storeWrites.value && storeWrites.value.length > 0) {
    return storeWrites.value;
  }
  // Sonra props'a bak
  if (writes.value && writes.value.length > 0) {
    return writes.value;
  }
  return [];
});

provide('categories', combinedCategories);
provide('writes', combinedWrites);

// Sidebar verilerini yükle (user değişikliğini kontrol eder)
const loadSidebarDataOnce = async () => {
  const userId = currentUserId.value;
  const userChanged = userId !== lastUserId.value;
  
  // Props'tan veri geldiyse store'a kaydet
  if (categories.value.length > 0 || writes.value.length > 0) {
    store.dispatch('Writes/setSidebarDataFromProps', {
      writes: writes.value,
      categories: categories.value,
      currentUserId: userId
    });
    return;
  }
  
  // Store'da veri yoksa, user değiştiyse, veya F5 sonrası store boşaldıysa API'den yükle
  const storeIsEmpty = (!storeWrites.value || storeWrites.value.length === 0) && 
                        (!storeCategories.value || storeCategories.value.length === 0);
  
  if (!sidebarDataLoaded.value || userChanged || storeIsEmpty) {
    await store.dispatch('Writes/loadSidebarData', { 
      currentUserId: userId,
      forceRefresh: storeIsEmpty // F5 sonrası force refresh
    });
  }
};

// Mount olduğunda ve sidebar gösterilmesi gerektiğinde veri yükle
watch([isMounted, shouldShowSidebarOnMobile, shouldHideSidebarContent, isSidebarVisible, isIndexPage], async ([mounted, showSidebar, hideSidebar, visible, indexPage]) => {
  if (mounted && showSidebar && !hideSidebar && (indexPage || visible)) {
    await loadSidebarDataOnce();
  }
}, { immediate: true });

// User değiştiğinde (login/logout) cache'i yenile
watch(currentUserId, (newUserId, oldUserId) => {
  if (newUserId !== oldUserId && isMounted.value) {
    store.dispatch('Writes/loadSidebarData', { forceRefresh: true, currentUserId: newUserId });
  }
});
</script>

<style>
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>
