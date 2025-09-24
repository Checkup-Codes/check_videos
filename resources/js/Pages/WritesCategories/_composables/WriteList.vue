<template>
  <div ref="scrollContainer" class="write-list-container space-y-1 overflow-y-auto p-3">
    <!-- Search bar for all users -->
    <div class="mb-3">
      <input
        v-model="searchQuery"
        type="text"
        class="input-bordered input w-full"
        placeholder="Yazı başlığı ara..."
        @input="handleSearchInput"
      />
    </div>
    <!-- Responsive filter buttons for logged-in users -->
    <div v-if="isAdmin" class="mb-3">
      <div class="hidden gap-2 sm:flex">
        <button
          class="btn btn-outline btn-xs flex items-center justify-center"
          :class="{ 'bg-base-content text-base-100': adminFilter === 'all' }"
          @click="adminFilter = 'all'"
        >
          <span v-if="props.isCollapsed">
            <!-- List icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </span>
          <span v-else>Tümü</span>
        </button>
        <button
          class="btn btn-outline btn-xs flex items-center justify-center"
          :class="{ 'bg-base-content text-base-100': adminFilter === 'published' }"
          @click="adminFilter = 'published'"
        >
          <span v-if="props.isCollapsed">
            <!-- Globe icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <circle cx="12" cy="12" r="10" stroke-width="2" />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"
              />
            </svg>
          </span>
          <span v-else>Herkese Açık</span>
        </button>
        <button
          class="btn btn-outline btn-xs flex items-center justify-center"
          :class="{ 'bg-base-content text-base-100': adminFilter === 'link_only' }"
          @click="adminFilter = 'link_only'"
        >
          <span v-if="props.isCollapsed">
            <!-- Link icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13.828 10.172a4 4 0 010 5.656l-3 3a4 4 0 01-5.656-5.656l1.5-1.5M10.172 13.828a4 4 0 010-5.656l3-3a4 4 0 015.656 5.656l-1.5 1.5"
              />
            </svg>
          </span>
          <span v-else>Sadece Link</span>
        </button>
        <button
          class="btn btn-outline btn-xs flex items-center justify-center"
          :class="{ 'bg-base-content text-base-100': adminFilter === 'private' }"
          @click="adminFilter = 'private'"
        >
          <span v-if="props.isCollapsed">
            <!-- Lock icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 11c1.104 0 2-.896 2-2V7a2 2 0 10-4 0v2c0 1.104.896 2 2 2zm6 2v5a2 2 0 01-2 2H8a2 2 0 01-2-2v-5a2 2 0 012-2h8a2 2 0 012 2z"
              />
            </svg>
          </span>
          <span v-else>Gizli</span>
        </button>
      </div>
      <!-- Mobile: show filter icon -->
      <div class="relative inline-block sm:hidden">
        <button @click="showFilterMenu = !showFilterMenu" class="btn btn-ghost btn-xs">
          <!-- Heroicons funnel icon -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414A2 2 0 0013 14.586V19a1 1 0 01-1.447.894l-2-1A1 1 0 019 18v-3.414a2 2 0 00-.293-1.172L2.293 6.707A1 1 0 012 6V4z"
            />
          </svg>
        </button>
        <div
          v-if="showFilterMenu"
          class="absolute z-10 mt-2 w-40 rounded-md bg-base-100 shadow-lg ring-1 ring-black ring-opacity-5"
        >
          <div class="flex flex-col gap-1 py-1">
            <button
              class="btn btn-outline btn-xs btn-block flex items-center justify-center"
              :class="{ 'bg-base-content text-base-100': adminFilter === 'all' }"
              @click="
                adminFilter = 'all';
                showFilterMenu = false;
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <button
              class="btn btn-outline btn-xs btn-block flex items-center justify-center"
              :class="{ 'bg-base-content text-base-100': adminFilter === 'published' }"
              @click="
                adminFilter = 'published';
                showFilterMenu = false;
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <circle cx="12" cy="12" r="10" stroke-width="2" />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"
                />
              </svg>
            </button>
            <button
              class="btn btn-outline btn-xs btn-block flex items-center justify-center"
              :class="{ 'bg-base-content text-base-100': adminFilter === 'link_only' }"
              @click="
                adminFilter = 'link_only';
                showFilterMenu = false;
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.828 10.172a4 4 0 010 5.656l-3 3a4 4 0 01-5.656-5.656l1.5-1.5M10.172 13.828a4 4 0 010-5.656l3-3a4 4 0 015.656 5.656l-1.5 1.5"
                />
              </svg>
            </button>
            <button
              class="btn btn-outline btn-xs btn-block flex items-center justify-center"
              :class="{ 'bg-base-content text-base-100': adminFilter === 'private' }"
              @click="
                adminFilter = 'private';
                showFilterMenu = false;
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 11c1.104 0 2-.896 2-2V7a2 2 0 10-4 0v2c0 1.104.896 2 2 2zm6 2v5a2 2 0 01-2 2H8a2 2 0 01-2-2v-5a2 2 0 012-2h8a2 2 0 012 2z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Write List -->
    <div class="space-y-2">
      <Link
        v-for="write in filteredWrites"
        :key="write.id"
        :href="getWriteRoute(write)"
        :class="[
          'block rounded-lg p-3',
          activeWrite === getActiveWritePath(write)
            ? 'bg-base-content text-base-100'
            : 'border border-base-300 bg-base-100 hover:bg-base-300',
        ]"
      >
        <!-- Başlık -->
        <div class="mb-1">
          <h3
            class="line-clamp-2 text-sm font-medium leading-tight"
            :class="activeWrite === getActiveWritePath(write) ? 'text-base-100' : 'text-base-content'"
          >
            {{ write.title }}
          </h3>
        </div>

        <!-- Meta bilgiler -->
        <div
          class="flex flex-col gap-1 text-xs sm:flex-row sm:items-center sm:justify-between"
          :class="activeWrite === getActiveWritePath(write) ? 'text-base-100/70' : 'text-base-content/70'"
        >
          <div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
            <!-- Tarih -->
            <span class="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3 w-3 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span class="truncate">{{ formatDate(write.created_at) }}</span>
            </span>

            <!-- Görüntülenme sayısı -->
            <span class="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3 w-3 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <span class="truncate">{{ formatNumber(write.views_count) }} görüntülenme</span>
            </span>
          </div>

          <!-- Status icons -->
          <div class="flex items-center gap-1 self-start sm:self-center">
            <span v-if="write.status === 'private'" class="text-warning" title="Gizli yazı">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            <span v-if="write.status === 'link_only'" class="text-info" title="Sadece link">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </div>

    <!-- Boş durum -->
    <div v-if="filteredWrites.length === 0" class="flex h-32 items-center justify-center text-center opacity-50">
      <div>Henüz yazı bulunmuyor</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch, onActivated, onDeactivated, inject, nextTick } from 'vue';
import { Link, usePage, router } from '@inertiajs/vue3';

defineOptions({ name: 'WriteList' });

const props = defineProps({
  writes: { type: Array, default: () => [] },
  route: { type: Function, default: null },
  isCollapsed: { type: Boolean, default: false },
});

// Daha güvenli veri alımı
const writes = computed(() => {
  // Önce props'tan gelen veriyi kontrol et
  if (props.writes && props.writes.length > 0) {
    return props.writes;
  }

  // Props'ta veri yoksa inject'ten al
  const injectedWrites = inject('writes', []);
  if (injectedWrites && injectedWrites.length > 0) {
    return injectedWrites;
  }

  // Hiçbiri yoksa boş array döndür
  return [];
});

const page = usePage();
const isAdmin = page.props.isAdmin || false;
const scrollContainer = ref(null);
const virtualContainer = ref(null);
let isActive = false;
const activeWrite = ref('');

// Search and filter state
const searchQuery = ref('');
const debouncedSearchQuery = ref('');
const adminFilter = ref('all');
const showFilterMenu = ref(false);

// Removed virtual scrolling for simpler design

// Debounce search input
let searchTimeout = null;
const handleSearchInput = () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    debouncedSearchQuery.value = searchQuery.value;
  }, 300);
};

/**
 * Determine the correct route for a write based on current context
 */
const getWriteRoute = (write) => {
  const currentPath = window.location.pathname;

  // If we're in categories context, use category-based route
  if (currentPath.includes('/categories/')) {
    // Extract category slug from current URL
    const pathParts = currentPath.split('/').filter((part) => part.length > 0);

    // Check if we're in a category page (not create/edit)
    if (pathParts.length >= 2 && pathParts[0] === 'categories') {
      const categorySlug = pathParts[1];

      // Make sure we're not in create/edit pages
      if (categorySlug && categorySlug !== 'create' && categorySlug !== 'edit') {
        return route('categories.showByCategory', { category: categorySlug, slug: write.slug });
      }
    }
  }

  // Default to writes.show route
  return route('writes.show', { write: write.slug });
};

/**
 * Get active write path for highlighting
 */
const getActiveWritePath = (write) => {
  const currentPath = window.location.pathname;

  // If we're in categories context, use category-based path
  if (currentPath.includes('/categories/')) {
    const pathParts = currentPath.split('/').filter((part) => part.length > 0);

    // Check if we're in a category page (not create/edit)
    if (pathParts.length >= 2 && pathParts[0] === 'categories') {
      const categorySlug = pathParts[1];

      // Make sure we're not in create/edit pages
      if (categorySlug && categorySlug !== 'create' && categorySlug !== 'edit') {
        return `/categories/${categorySlug}/${write.slug}`;
      }
    }
  }

  // Default to writes path
  return `/writes/${write.slug}`;
};

const filteredWrites = computed(() => {
  let result = writes.value;
  // Search filter for all users
  if (debouncedSearchQuery.value) {
    result = result.filter((write) => write.title.toLowerCase().includes(debouncedSearchQuery.value.toLowerCase()));
  }
  if (!isAdmin) {
    // Guest: hide private
    result = result.filter((write) => write.status !== 'private');
    return result;
  } else {
    // Admin: filter by selected status
    if (adminFilter.value === 'published') {
      result = result.filter((write) => write.status === 'published');
    } else if (adminFilter.value === 'link_only') {
      result = result.filter((write) => write.status === 'link_only');
    } else if (adminFilter.value === 'private') {
      result = result.filter((write) => write.status === 'private');
    }
    return result;
  }
});

// Removed virtual scrolling computed properties

defineExpose({ filteredWrites, scrollContainer });

/**
 * Handle component activation (from KeepAlive)
 */
onActivated(() => {
  isActive = true;
  updateActiveWrite();
});

/**
 * Handle component deactivation (from KeepAlive)
 */
onDeactivated(() => {
  isActive = false;
});

// Removed virtual scrolling watchers

/**
 * Watch for route changes to update data
 */
watch(
  () => page.url,
  () => {
    nextTick(() => {
      updateActiveWrite();
    });
  }
);

// Removed props watcher for virtual scrolling

/**
 * Update active write based on current URL
 */
const updateActiveWrite = () => {
  activeWrite.value = window.location.pathname;
};

const getScrollKey = () => {
  return `writeListScroll_${adminFilter.value}_${debouncedSearchQuery.value}`;
};

const handleScroll = (e) => {
  localStorage.setItem(getScrollKey(), e.target.scrollTop);
};

onMounted(() => {
  isActive = true;

  // Filtre ve arama sorgusunu localStorage'dan yükle
  const savedFilter = localStorage.getItem('writeListFilter');
  if (savedFilter) adminFilter.value = savedFilter;
  const savedSearch = localStorage.getItem('writeListSearch');
  if (savedSearch) {
    searchQuery.value = savedSearch;
    debouncedSearchQuery.value = savedSearch;
  }

  updateActiveWrite();

  // DOM'un hazır olmasını bekle
  nextTick(() => {
    if (scrollContainer.value) {
      scrollContainer.value.addEventListener('scroll', handleScroll);
      // Scroll pozisyonunu geri yükle
      const savedScroll = localStorage.getItem(getScrollKey());
      if (savedScroll) {
        scrollContainer.value.scrollTop = parseInt(savedScroll, 10);
      }
      // Initialize scroll position
    }
  });

  const handlePopState = () => {
    if (isActive) {
      updateActiveWrite();
    }
  };

  // Handle Inertia navigation
  const handleNavigationStart = () => {};

  const handleNavigationEnd = () => {
    if (isActive) {
      updateActiveWrite();
    }
  };

  // Add event listeners
  window.addEventListener('popstate', handlePopState);
  window.addEventListener('inertia:start', handleNavigationStart);
  window.addEventListener('inertia:finish', handleNavigationEnd);

  // Cleanup on unmount
  onUnmounted(() => {
    isActive = false;
    if (scrollContainer.value) {
      scrollContainer.value.removeEventListener('scroll', handleScroll);
    }
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    window.removeEventListener('popstate', handlePopState);
    window.removeEventListener('inertia:start', handleNavigationStart);
    window.removeEventListener('inertia:finish', handleNavigationEnd);
  });
});

/**
 * Format date for display in Turkish
 */
const formatDate = (date) => {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    locale: 'tr-TR',
  };

  const dateObj = new Date(date);
  const monthNames = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];

  const day = dateObj.getDate();
  const month = monthNames[dateObj.getMonth()];
  const year = dateObj.getFullYear();

  return `${day} ${month} ${year}`;
};

/**
 * Format number with thousand separators
 */
const formatNumber = (num) => {
  return new Intl.NumberFormat('tr-TR').format(num);
};

// Filtre ve arama sorgusu değişince localStorage'a kaydet
watch(adminFilter, (val) => {
  localStorage.setItem('writeListFilter', val);
});
watch(debouncedSearchQuery, (val) => {
  localStorage.setItem('writeListSearch', val);
});
</script>

<style scoped>
.write-list-container {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

/* Custom scrollbar styling */
.write-list-container::-webkit-scrollbar {
  width: 6px;
}

.write-list-container::-webkit-scrollbar-track {
  background: transparent;
}

.write-list-container::-webkit-scrollbar-thumb {
  background-color: rgba(var(--color-base-300), 0.5);
  border-radius: 3px;
}

@media (prefers-color-scheme: dark) {
  .write-list-container::-webkit-scrollbar-thumb {
    background-color: rgba(var(--color-base-100), 0.5);
  }
}

/* Line clamp utility for title truncation */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
