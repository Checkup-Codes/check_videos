<template>
  <CheckScreen>
    <div class="p-6 pt-12 sm:p-8 sm:pt-16">
      <!-- Title and category section - sade tasarım -->
      <div class="mb-8">
        <div v-if="isLoading" class="space-y-3">
          <div class="h-8 w-1/2 rounded bg-base-200"></div>
          <div class="h-4 w-24 rounded bg-base-200"></div>
        </div>
        <template v-else>
          <div class="mb-6">
            <h1 class="text-2xl font-semibold text-base-content sm:text-3xl">
              {{ category.name }}
            </h1>
            <div class="text-base-content/60 mt-2 flex items-center gap-3 text-sm">
              <span>{{ filteredWrites?.length || 0 }} yazı</span>
              <span v-if="category.description" class="text-base-content/40">•</span>
              <span v-if="category.description" class="text-base-content/40">{{ category.description }}</span>
            </div>
          </div>

          <!-- Admin actions - sade tasarım -->
          <div v-if="auth.user && !isLoading" class="flex gap-2">
            <Link :href="route('categories.edit', category.id)" class="btn btn-ghost btn-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-4 w-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
              Düzenle
            </Link>
            <button @click="deleteCategory(category.id)" class="btn btn-ghost btn-sm text-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-4 w-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
              Sil
            </button>
          </div>
        </template>
      </div>

      <!-- Search and Filter Section - sade tasarım -->
      <div v-if="!isLoading" class="mb-8">
        <div class="flex flex-col gap-4">
          <!-- Search Input -->
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              class="input-bordered input w-full pl-10"
              placeholder="Yazı başlığı ara..."
              @input="handleSearchInput"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="text-base-content/50 absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>

          <!-- Filter Buttons -->
          <div class="flex flex-wrap gap-2">
            <button
              @click="statusFilter = 'all'"
              class="btn btn-sm"
              :class="statusFilter === 'all' ? 'btn-primary' : 'btn-ghost'"
            >
              Tümü
            </button>
            <button
              @click="statusFilter = 'published'"
              class="btn btn-sm"
              :class="statusFilter === 'published' ? 'btn-primary' : 'btn-ghost'"
            >
              Yayında
            </button>
            <button
              v-if="auth.user"
              @click="statusFilter = 'private'"
              class="btn btn-sm"
              :class="statusFilter === 'private' ? 'btn-primary' : 'btn-ghost'"
            >
              Gizli
            </button>
            <button
              v-if="auth.user"
              @click="statusFilter = 'link_only'"
              class="btn btn-sm"
              :class="statusFilter === 'link_only' ? 'btn-primary' : 'btn-ghost'"
            >
              Sadece Link
            </button>
          </div>
        </div>

        <!-- Results Count and Clear Filters -->
        <div class="mt-4 flex items-center justify-between">
          <div class="text-base-content/60 text-sm">
            {{ paginatedWrites.length }} / {{ filteredWrites.length || 0 }} yazı
            <span v-if="debouncedSearchQuery || statusFilter !== 'all'" class="text-base-content/40">
              ({{ writes.length || 0 }} toplam)
            </span>
          </div>
          <button
            v-if="debouncedSearchQuery || statusFilter !== 'all'"
            @click="clearFilters"
            class="btn btn-ghost btn-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-4 w-4"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Temizle
          </button>
        </div>
      </div>

      <!-- List view of writes - sade tasarım -->
      <div v-if="isLoading" class="space-y-3">
        <div v-for="i in 3" :key="i" class="rounded-lg bg-base-100 p-4">
          <div class="flex items-center gap-3">
            <div class="h-8 w-8 rounded bg-base-200"></div>
            <div class="flex-1 space-y-2">
              <div class="h-4 w-3/4 rounded bg-base-200"></div>
              <div class="h-3 w-1/2 rounded bg-base-200"></div>
            </div>
            <div class="h-6 w-16 rounded bg-base-200"></div>
          </div>
        </div>
      </div>

      <div v-else>
        <!-- Sade list view -->
        <div class="space-y-1">
          <div
            v-for="write in paginatedWrites"
            :key="write.id"
            class="rounded-lg bg-base-100 p-4 transition-all duration-200 hover:shadow-sm"
          >
            <div class="flex items-center gap-3">
              <!-- Write icon/status indicator -->
              <div class="bg-primary/10 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-primary">
                <svg
                  v-if="write.status === 'private'"
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
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <svg
                  v-else-if="write.status === 'link_only'"
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
                <svg
                  v-else
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>

              <!-- Content -->
              <div class="min-w-0 flex-1">
                <Link
                  :href="route('categories.showByCategory', { category: category.slug, slug: write.slug })"
                  class="block"
                >
                  <h3 class="text-sm font-medium text-base-content">
                    {{ write.title }}
                  </h3>
                </Link>

                <p v-if="write.summary" class="text-base-content/60 mt-1 text-xs">
                  {{ write.summary }}
                </p>

                <!-- Metadata -->
                <div class="text-base-content/50 mt-2 flex items-center gap-3 text-xs">
                  <span class="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      class="h-3 w-3"
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
                    {{ write.views_count }} görüntülenme
                  </span>
                  <span class="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      class="h-3 w-3"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {{ formatDateMobile(write.created_at) }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Load More Section - sade tasarım -->
          <div v-if="(hasMore || isLoadingMore) && filteredWrites.length > perPage" class="flex justify-center py-6">
            <div v-if="isLoadingMore" class="text-base-content/60 flex items-center gap-2 text-sm">
              <div class="loading loading-spinner loading-sm"></div>
              Yükleniyor...
            </div>
            <button v-else @click="loadMore" class="btn btn-ghost btn-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-4 w-4"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
              </svg>
              Daha Fazla
            </button>
          </div>
        </div>

        <!-- Empty state - sade tasarım -->
        <div v-if="filteredWrites.length === 0" class="py-12 text-center">
          <div class="text-base-content/40 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="mx-auto h-12 w-12"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <p class="text-base-content/60 text-sm">
            <span v-if="debouncedSearchQuery || statusFilter !== 'all'">
              Arama kriterlerinize uygun yazı bulunamadı.
            </span>
            <span v-else>Bu kategoride henüz yazı bulunmuyor.</span>
          </p>
        </div>

        <!-- No more items message - sade tasarım -->
        <div v-else-if="!hasMore && paginatedWrites.length > 0" class="py-6 text-center">
          <p class="text-base-content/40 text-sm">Tüm yazılar yüklendi</p>
        </div>
      </div>
    </div>
  </CheckScreen>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch, onUnmounted } from 'vue';
import { usePage, Link, router } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';

/**
 * Component name definition
 */
defineOptions({
  name: 'ShowCategoryScreen',
});

/**
 * Get category data from page props
 */
const { props } = usePage();
const category = ref(props.category || {});
const writes = ref(props.writes || []);
const auth = props.auth;
const flashSuccess = ref(props.flash?.success);

// Loading states
const isLoading = ref(true);

// Search and filter states
const searchQuery = ref('');
const debouncedSearchQuery = ref('');
const statusFilter = ref('all');

// Pagination states
const page = ref(1);
const perPage = 10;
const isLoadingMore = ref(false);
const hasMore = ref(true);

// Debounce search input
let searchTimeout = null;
const handleSearchInput = () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    debouncedSearchQuery.value = searchQuery.value;
    // Reset pagination when search changes
    page.value = 1;
    hasMore.value = true;
  }, 300);
};

/**
 * Filter writes based on user role and status
 */
const filteredWrites = computed(() => {
  let filtered = writes.value || [];

  if (debouncedSearchQuery.value) {
    filtered = filtered.filter((write) => write.title.toLowerCase().includes(debouncedSearchQuery.value.toLowerCase()));
  }

  if (statusFilter.value !== 'all') {
    filtered = filtered.filter((write) => write.status === statusFilter.value);
  }

  return filtered;
});

/**
 * Get paginated writes
 */
const paginatedWrites = computed(() => {
  const filtered = filteredWrites.value;
  return filtered.slice(0, page.value * perPage);
});

/**
 * Load more writes
 */
const loadMore = async () => {
  if (isLoadingMore.value || !hasMore.value) return;

  isLoadingMore.value = true;

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  page.value++;

  // Check if we have more items
  const totalFiltered = filteredWrites.value.length;
  const currentLoaded = page.value * perPage;

  if (currentLoaded >= totalFiltered) {
    hasMore.value = false;
  }

  isLoadingMore.value = false;
};

/**
 * Reset pagination when filters change
 */
watch([debouncedSearchQuery, statusFilter], () => {
  page.value = 1;
  hasMore.value = true;
});

/**
 * Clear search and filters
 */
const clearFilters = () => {
  searchQuery.value = '';
  debouncedSearchQuery.value = '';
  statusFilter.value = 'all';
  page.value = 1;
  hasMore.value = true;
};

/**
 * Format date for display
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
const formatDate = (dateString) => {
  if (!dateString) return '';

  const date = new Date(dateString);
  return date.toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Format date for mobile display (shorter format)
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date for mobile
 */
const formatDateMobile = (dateString) => {
  if (!dateString) return '';

  const date = new Date(dateString);
  return date.toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Get status text for display
 * @param {string} status - Write status
 * @returns {string} Status text in Turkish
 */
const getStatusText = (status) => {
  const statusMap = {
    published: 'Yayında',
    draft: 'Taslak',
    private: 'Gizli',
    link_only: 'Dış Bağlantı',
  };
  return statusMap[status] || status;
};

/**
 * Delete write with confirmation
 * @param {Object} write - Write object to delete
 */
const deleteWrite = (write) => {
  if (confirm(`"${write.title}" yazısını silmek istediğinizden emin misiniz?`)) {
    router.delete(route('writes.destroy', write.id), {
      preserveScroll: true,
      onSuccess: () => {
        // Remove from local array to update UI immediately
        const index = (writes.value || []).findIndex((w) => w.id === write.id);
        if (index > -1) {
          writes.value.splice(index, 1);
        }
      },
      onError: (errors) => {
        console.error('Yazı silinirken hata oluştu:', errors);
        alert('Yazı silinirken bir hata oluştu.');
      },
    });
  }
};

/**
 * Delete category with confirmation
 * @param {number} categoryId - Category ID to delete
 */
const deleteCategory = (categoryId) => {
  if (confirm(`"${category.value.name}" kategorisini silmek istediğinizden emin misiniz?`)) {
    router.delete(route('categories.destroy', categoryId), {
      onSuccess: () => {
        // Redirect to categories index
        router.visit(route('categories.index'));
      },
      onError: (errors) => {
        console.error('Kategori silinirken hata oluştu:', errors);
        alert('Kategori silinirken bir hata oluştu.');
      },
    });
  }
};

onMounted(() => {
  // Simulate initial loading delay
  setTimeout(() => {
    isLoading.value = false;
  }, 300);

  // Setup scroll detection for auto-loading
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Load more when user is near bottom (100px from bottom)
    if (scrollTop + windowHeight >= documentHeight - 100) {
      loadMore();
    }
  };

  window.addEventListener('scroll', handleScroll);

  if (flashSuccess.value) {
    setTimeout(() => {
      flashSuccess.value = null;
    }, 3000);
  }

  // Cleanup on unmount
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
  });
});
</script>

<style scoped>
/* Sade tasarım için minimal stiller */
.min-w-0 {
  min-width: 0;
}

.flex-1 {
  flex: 1 1 0%;
}

/* Text overflow prevention */
.text-base-content {
  word-wrap: break-word;
  overflow-wrap: break-word;
}
</style>
