<template>
  <CheckScreen>
    <div class="p-4 sm:p-6">
      <!-- Title and category section -->
      <div class="mb-6">
        <div v-if="isLoading" class="skeleton-wrapper">
          <div class="skeleton h-6 w-2/3 rounded-lg sm:h-7"></div>
          <div class="mt-2">
            <div class="skeleton h-3 w-24 rounded"></div>
          </div>
        </div>
        <template v-else>
          <div class="flex items-center gap-3">
            <div class="min-w-0 flex-1">
              <h1 class="text-lg font-semibold text-base-content sm:text-xl">
                {{ category.name }}
              </h1>
              <div class="text-base-content/60 mt-1 flex items-center gap-2 text-xs sm:text-sm">
                <span v-if="category.description" class="badge badge-outline badge-xs">
                  {{ category.description }}
                </span>
                <span>{{ filteredWrites?.length || 0 }} yazı</span>
              </div>
            </div>
            <!-- Category icon -->
            <div
              class="bg-primary/10 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-primary sm:h-10 sm:w-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 sm:h-5 sm:w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>

            <div v-if="auth.user && !isLoading" class="mb-4 flex flex-wrap justify-end gap-2">
              <Link :href="route('categories.edit', category.id)" class="btn btn-outline btn-xs shadow-sm sm:btn-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="mr-1 h-3 w-3 sm:h-4 sm:w-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
                Düzenle
              </Link>

              <button @click="deleteCategory(category.id)" class="btn btn-error btn-outline btn-xs shadow-sm sm:btn-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="mr-1 h-3 w-3 sm:h-4 sm:w-4"
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
          </div>
        </template>
      </div>

      <!-- Search and Filter Section -->
      <div v-if="!isLoading" class="mb-6">
        <div class="flex flex-col gap-3">
          <!-- Search Input -->
          <div class="w-full">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                class="input-bordered input w-full pl-10 text-sm shadow-sm"
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
          </div>

          <!-- Filter Buttons -->
          <div class="flex flex-wrap items-center gap-2">
            <button
              @click="statusFilter = 'all'"
              class="btn btn-xs shadow-sm sm:btn-sm"
              :class="statusFilter === 'all' ? 'btn-primary' : 'btn-outline'"
            >
              Tümü
            </button>
            <button
              @click="statusFilter = 'published'"
              class="btn btn-xs shadow-sm sm:btn-sm"
              :class="statusFilter === 'published' ? 'btn-primary' : 'btn-outline'"
            >
              Yayında
            </button>
            <button
              v-if="auth.user"
              @click="statusFilter = 'private'"
              class="btn btn-xs shadow-sm sm:btn-sm"
              :class="statusFilter === 'private' ? 'btn-primary' : 'btn-outline'"
            >
              Gizli
            </button>
            <button
              v-if="auth.user"
              @click="statusFilter = 'link_only'"
              class="btn btn-xs shadow-sm sm:btn-sm"
              :class="statusFilter === 'link_only' ? 'btn-primary' : 'btn-outline'"
            >
              Sadece Link
            </button>
          </div>
        </div>

        <!-- Results Count and Clear Filters -->
        <div class="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div class="text-base-content/70 text-xs sm:text-sm">
            {{ paginatedWrites.length }} / {{ filteredWrites.length || 0 }} yazı gösteriliyor
            <span v-if="debouncedSearchQuery || statusFilter !== 'all'" class="text-base-content/50">
              ({{ writes.length || 0 }} toplam yazıdan)
            </span>
          </div>
          <button
            v-if="debouncedSearchQuery || statusFilter !== 'all'"
            @click="clearFilters"
            class="btn btn-ghost btn-xs self-start shadow-sm sm:btn-sm sm:self-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="mr-1 h-3 w-3 sm:h-4 sm:w-4"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Filtreleri Temizle
          </button>
        </div>
      </div>

      <!-- List view of writes -->
      <div v-if="isLoading" class="space-y-3">
        <div v-for="i in 3" :key="i" class="card border border-base-200 bg-base-100 shadow-sm">
          <div class="card-body p-3">
            <div class="flex items-center gap-3">
              <div class="skeleton h-8 w-8 rounded-lg sm:h-10 sm:w-10"></div>
              <div class="flex-1 space-y-2">
                <div class="skeleton h-4 w-3/4 rounded"></div>
                <div class="skeleton h-3 w-1/2 rounded"></div>
              </div>
              <div class="skeleton h-6 w-16 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      <div v-else>
        <!-- Compact list view -->
        <div class="space-y-2">
          <div
            v-for="write in paginatedWrites"
            :key="write.id"
            class="card border border-base-200 bg-base-100 shadow-sm transition-shadow hover:shadow-md"
          >
            <div class="card-body p-3">
              <div class="flex items-center gap-3">
                <!-- Write icon/status indicator -->
                <div
                  class="bg-primary/10 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-primary sm:h-10 sm:w-10"
                >
                  <svg
                    v-if="write.status === 'private'"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 sm:h-5 sm:w-5"
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
                    class="h-4 w-4 sm:h-5 sm:w-5"
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
                    class="h-4 w-4 sm:h-5 sm:w-5"
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
                    <h3 class="line-clamp-1 text-sm font-medium text-base-content sm:text-base">
                      {{ write.title }}
                    </h3>
                  </Link>

                  <p v-if="write.summary" class="text-base-content/70 mt-1 line-clamp-1 text-xs sm:text-sm">
                    {{ write.summary }}
                  </p>

                  <!-- Metadata -->
                  <div class="text-base-content/60 mt-2 flex flex-wrap items-center gap-2 text-xs">
                    <span class="bg-base-200/50 flex items-center gap-1 rounded px-2 py-0.5">
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
                      {{ write.views_count }}
                    </span>

                    <span class="bg-base-200/50 flex items-center gap-1 rounded px-2 py-0.5">
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
          </div>

          <!-- Load More Section -->
          <div v-if="hasMore || isLoadingMore" class="flex justify-center py-4">
            <div v-if="isLoadingMore" class="flex items-center gap-2">
              <div class="loading loading-spinner loading-sm"></div>
              <span class="text-base-content/70 text-xs">Yükleniyor...</span>
            </div>
            <button v-else @click="loadMore" class="btn btn-outline btn-sm shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="mr-1 h-4 w-4"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
              </svg>
              Daha Fazla
            </button>
          </div>
        </div>

        <div v-if="filteredWrites.length === 0" class="alert alert-info shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="h-4 w-4 shrink-0 stroke-current sm:h-5 sm:w-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <div class="text-xs sm:text-sm">
            <span v-if="debouncedSearchQuery || statusFilter !== 'all'">
              Arama kriterlerinize uygun yazı bulunamadı.
            </span>
            <span v-else> Bu kategoride henüz yazı bulunmuyor. </span>
          </div>
        </div>

        <!-- No more items message -->
        <div v-else-if="!hasMore && paginatedWrites.length > 0" class="text-base-content/60 py-4 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="mx-auto mb-2 h-6 w-6 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p class="text-xs sm:text-sm">Tüm yazılar yüklendi</p>
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
.skeleton {
  @apply bg-base-300;
  background-image: linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0));
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.skeleton-wrapper {
  @apply animate-pulse;
}

/* Prevent text overflow */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Ensure consistent card heights */
.card {
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  overflow: hidden;
}

.card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Gradient backgrounds for icons */
.bg-gradient-to-br {
  background: linear-gradient(
    135deg,
    var(--fallback-p, oklch(var(--p) / 0.2)),
    var(--fallback-p, oklch(var(--p) / 0.1))
  );
}

/* Improved button styles */
.btn {
  border-radius: 0.75rem;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
}

/* Enhanced input styles */
.input {
  border-radius: 0.75rem;
  transition: all 0.2s ease-in-out;
}

/* Badge improvements */
.badge {
  border-radius: 0.5rem;
  font-weight: 500;
}

/* Dropdown improvements */
.dropdown-content {
  border-radius: 1rem;
  backdrop-filter: blur(10px);
}

/* Mobile responsive improvements */
@media (max-width: 640px) {
  /* Ensure proper text wrapping on mobile */
  .break-words {
    word-break: break-word;
    overflow-wrap: break-word;
  }

  /* Optimize button sizes for touch */
  .btn-sm {
    min-height: 2.5rem;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }

  /* Ensure dropdowns are properly sized on mobile */
  .dropdown-content {
    min-width: 12rem;
    max-width: 90vw;
  }

  /* Optimize card spacing for mobile */
  .card-body {
    padding: 1rem;
  }

  /* Ensure proper icon sizing on mobile */
  .h-4.w-4 {
    width: 1rem;
    height: 1rem;
  }

  /* Optimize text sizes for mobile readability */
  .text-sm {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  /* Ensure proper spacing between elements */
  .gap-2 {
    gap: 0.5rem;
  }

  .gap-3 {
    gap: 0.75rem;
  }

  .gap-4 {
    gap: 1rem;
  }

  /* Improve touch targets */
  .btn,
  .dropdown button {
    min-height: 2.75rem;
    min-width: 2.75rem;
  }

  /* Better spacing for mobile layouts */
  .flex-col > * + * {
    margin-top: 0.75rem;
  }

  /* Optimize metadata display for mobile */
  .flex-wrap {
    gap: 0.5rem;
  }

  /* Better button grouping on mobile */
  .flex.flex-wrap {
    gap: 0.5rem;
  }

  /* Optimize metadata badges for mobile */
  .bg-base-200\/50 {
    padding: 0.375rem 0.75rem;
    font-size: 0.75rem;
  }
}

/* Tablet responsive improvements */
@media (min-width: 641px) and (max-width: 1024px) {
  /* Optimize for tablet screens */
  .card-body {
    padding: 1.5rem;
  }

  /* Ensure proper button sizing on tablets */
  .btn-md {
    min-height: 2.75rem;
    padding: 0.625rem 1.25rem;
    font-size: 0.9375rem;
  }

  /* Better spacing for tablet layouts */
  .gap-4 {
    gap: 1.5rem;
  }

  .gap-6 {
    gap: 2rem;
  }
}

/* Desktop improvements */
@media (min-width: 1025px) {
  /* Larger touch targets for desktop */
  .btn-md {
    min-height: 3rem;
    padding: 0.75rem 1.5rem;
  }

  /* Better spacing for desktop */
  .gap-6 {
    gap: 2.5rem;
  }

  .gap-8 {
    gap: 3rem;
  }
}

/* Ensure proper touch targets on all devices */
@media (max-width: 640px) {
  /* Ensure proper spacing for touch interactions */
  .flex-col > * + * {
    margin-top: 0.75rem;
  }

  /* Optimize metadata display for mobile */
  .flex-wrap {
    gap: 0.5rem;
  }

  /* Better button grouping on mobile */
  .flex.flex-wrap {
    gap: 0.5rem;
  }
}

/* Animation improvements */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

.transition-transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

.transition-colors {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

/* Enhanced focus states */
.btn:focus-visible,
.input:focus-visible {
  outline: 2px solid var(--fallback-p, oklch(var(--p)));
  outline-offset: 2px;
}

/* Improved accessibility */
@media (prefers-reduced-motion: reduce) {
  .transition-all,
  .transition-transform,
  .transition-colors {
    transition: none;
  }
}

/* Fix text overflow issues */
.min-w-0 {
  min-width: 0;
}

.flex-1 {
  flex: 1 1 0%;
}

/* Ensure content fits properly */
.card-body > div {
  width: 100%;
}

/* Prevent text from overflowing cards */
.text-base-content {
  word-wrap: break-word;
  overflow-wrap: break-word;
}

/* Ensure proper line height for better readability */
.leading-relaxed {
  line-height: 1.625;
}

/* Optimize metadata badges */
.bg-base-200\/50 {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}
</style>
