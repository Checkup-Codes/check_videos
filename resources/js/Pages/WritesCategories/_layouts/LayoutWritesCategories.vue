<template>
  <FlashMessage :message="flashMessage" @close="handleFlashClose" />
  <CheckLayout
    :isCollapsed="!shouldHideSidebarContent"
    :show-sidebar-on-mobile="shouldShowSidebarOnMobile"
    :show-main-content-on-mobile="shouldShowMainContentOnMobile"
  >
    <template #sidebar>
      <!-- SSR'da sidebar içeriğini gizle, sadece client-side'da göster -->
      <!-- Mobil show sayfalarında sidebar hiç render edilmez -->
      <KeepAlive
        v-if="shouldShowSidebarOnMobile && !shouldHideSidebarContent && isMounted"
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
  if (isCollapsed.value && screenName.value && !shouldHideSidebarContent.value && shouldShowSidebarOnMobile.value) {
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
  'lg:ml-[-200px]': isSidebarNarrow.value && !shouldHideSidebarContent.value,
  'lg:ml-[00px]': !isSidebarNarrow.value && !shouldHideSidebarContent.value,
  'lg:ml-0': shouldHideSidebarContent.value, // Full width when sidebar is hidden
}));

const handleSidebarWidthChange = (isNarrow) => {
  isSidebarNarrow.value = isNarrow;
};

// Track if component is mounted (client-side only)
const isMounted = ref(false);

// Router event cleanup function
let removeRouterListener = null;

// Prevent body scrolling on writes pages
onMounted(() => {
  // Mark as mounted to enable sidebar rendering (client-side only)
  isMounted.value = true;
  document.body.style.overflow = 'hidden';

  // Initialize window width and add resize listener
  if (typeof window !== 'undefined') {
    windowWidth.value = window.innerWidth;
    window.addEventListener('resize', updateWindowWidth);
  }
  
  // CRUD işlemlerinden sonra sidebar cache'ini invalidate et
  // Flash message 'success' içeriyorsa ve writes/categories sayfasındaysak cache'i yenile
  removeRouterListener = router.on('success', (event) => {
    const flash = page.props.flash;
    const url = event.detail.page.url || '';
    
    // Yazı veya kategori CRUD işlemi yapıldıysa (success mesajı varsa)
    if (flash?.success && (url.includes('/writes') || url.includes('/categories'))) {
      // Store, update, destroy işlemlerinden sonra cache'i yenile
      const isCreatePage = url.includes('/create');
      const isEditPage = url.includes('/edit');
      const isIndexPage = url === '/writes' || url === '/categories';
      
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
const writes = computed(() => page.props.writes || []);

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
  
  // Store'da veri yoksa veya user değiştiyse API'den yükle
  if (!sidebarDataLoaded.value || userChanged) {
    await store.dispatch('Writes/loadSidebarData', { currentUserId: userId });
  }
};

// Mount olduğunda ve sidebar gösterilmesi gerektiğinde veri yükle
watch([isMounted, shouldShowSidebarOnMobile, shouldHideSidebarContent], ([mounted, showSidebar, hideSidebar]) => {
  if (mounted && showSidebar && !hideSidebar) {
    loadSidebarDataOnce();
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
