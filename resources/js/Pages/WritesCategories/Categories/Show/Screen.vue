<template>
  <CheckScreen>
    <div class="p-4 pt-6 sm:p-6 sm:pt-8">
      <!-- Compact Header Section -->
      <div v-if="!isLoading" class="border-base-300/30 mb-6 border-b pb-4">
        <div class="flex items-start justify-between gap-4">
          <div class="min-w-0 flex-1">
            <h1 class="truncate text-xl font-semibold text-base-content sm:text-2xl">
              {{ category.name }}
            </h1>
            <div class="text-base-content/60 mt-1.5 flex flex-wrap items-center gap-2.5 text-xs">
              <span class="font-medium">{{ filteredWrites?.length || 0 }} yazı</span>
              <span v-if="category.description" class="text-base-content/40">•</span>
              <span v-if="category.description" class="line-clamp-1">{{ category.description }}</span>
            </div>
          </div>

          <!-- Minimalist Filter Buttons -->
          <div class="flex shrink-0 items-center gap-1.5">
            <button
              @click="statusFilter = 'all'"
              class="rounded-md px-2.5 py-1 text-xs transition-colors"
              :class="
                statusFilter === 'all'
                  ? 'bg-base-content text-base-100'
                  : 'bg-base-200/60 text-base-content/70 hover:bg-base-200'
              "
            >
              Tümü
            </button>
            <button
              @click="statusFilter = 'published'"
              class="rounded-md px-2.5 py-1 text-xs transition-colors"
              :class="
                statusFilter === 'published'
                  ? 'bg-base-content text-base-100'
                  : 'bg-base-200/60 text-base-content/70 hover:bg-base-200'
              "
            >
              Yayında
            </button>
            <button
              v-if="auth.user"
              @click="statusFilter = 'private'"
              class="rounded-md px-2.5 py-1 text-xs transition-colors"
              :class="
                statusFilter === 'private'
                  ? 'bg-base-content text-base-100'
                  : 'bg-base-200/60 text-base-content/70 hover:bg-base-200'
              "
            >
              Gizli
            </button>
            <button
              v-if="auth.user"
              @click="statusFilter = 'link_only'"
              class="rounded-md px-2.5 py-1 text-xs transition-colors"
              :class="
                statusFilter === 'link_only'
                  ? 'bg-base-content text-base-100'
                  : 'bg-base-200/60 text-base-content/70 hover:bg-base-200'
              "
            >
              Link
            </button>
            <button
              v-if="statusFilter !== 'all'"
              @click="clearFilters"
              class="text-base-content/50 ml-1 p-1 transition-colors hover:text-base-content"
              title="Filtreyi temizle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="h-3.5 w-3.5"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- List view of writes - clean and readable -->
      <div v-if="isLoading" class="space-y-2">
        <div v-for="i in 5" :key="i" class="border-base-300/30 bg-base-50 rounded border p-4">
          <div class="mb-2 h-5 w-3/4 rounded bg-base-200"></div>
          <div class="h-3 w-1/2 rounded bg-base-200"></div>
        </div>
      </div>

      <div v-else>
        <!-- Clean list view - focused on writes -->
        <div class="space-y-2">
          <Link
            v-for="write in paginatedWrites"
            :key="write.id"
            :href="route('categories.showByCategory', { category: category.slug, slug: write.slug })"
            class="border-base-300/30 bg-base-50 group block rounded-lg border p-4 transition-all duration-200 hover:border-base-300 hover:bg-base-100 hover:shadow-sm"
          >
            <div class="flex items-start justify-between gap-4">
              <!-- Main Content -->
              <div class="min-w-0 flex-1">
                <div class="mb-1.5 flex items-center gap-2">
                  <!-- Status Indicator -->
                  <span class="inline-flex shrink-0 items-center" :title="getStatusText(write.status)">
                    <svg
                      v-if="write.status === 'private'"
                      xmlns="http://www.w3.org/2000/svg"
                      class="text-base-content/50 h-3.5 w-3.5"
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
                      class="text-base-content/50 h-3.5 w-3.5"
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
                      class="text-base-content/50 h-3.5 w-3.5"
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
                  </span>
                  <h3
                    class="line-clamp-1 text-base font-medium text-base-content transition-colors group-hover:text-primary"
                  >
                    {{ write.title }}
                  </h3>
                </div>

                <p v-if="write.summary" class="text-base-content/70 mb-2 line-clamp-2 text-sm">
                  {{ write.summary }}
                </p>

                <!-- Metadata - compact -->
                <div class="text-base-content/50 flex flex-wrap items-center gap-3 text-xs">
                  <span class="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      class="h-3 w-3"
                      stroke-width="2"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    {{ formatNumber(write.views_count) }}
                  </span>
                  <span class="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      class="h-3 w-3"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {{ formatDateMobile(write.created_at) }}
                  </span>
                </div>
              </div>

              <!-- Arrow indicator -->
              <div class="text-base-content/30 shrink-0 transition-colors group-hover:text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="h-4 w-4"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            </div>
          </Link>

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

        <!-- Empty state -->
        <div v-if="filteredWrites.length === 0" class="py-16 text-center">
          <div class="text-base-content/30 mb-3">
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
            <span v-if="statusFilter !== 'all'">Seçilen filtreye uygun yazı bulunamadı.</span>
            <span v-else>Bu kategoride henüz yazı bulunmuyor.</span>
          </p>
        </div>

        <!-- No more items message -->
        <div v-else-if="!hasMore && paginatedWrites.length > 0" class="py-8 text-center">
          <p class="text-base-content/40 text-xs">Tüm yazılar gösteriliyor</p>
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

// Filter state
const statusFilter = ref('all');

// Pagination states
const page = ref(1);
const perPage = 10;
const isLoadingMore = ref(false);
const hasMore = ref(true);

/**
 * Filter writes based on status
 */
const filteredWrites = computed(() => {
  let filtered = writes.value || [];

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
watch([statusFilter], () => {
  page.value = 1;
  hasMore.value = true;
});

/**
 * Clear filters
 */
const clearFilters = () => {
  statusFilter.value = 'all';
  page.value = 1;
  hasMore.value = true;
};

/**
 * Format number for display
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
const formatNumber = (num) => {
  if (!num) return '0';
  return new Intl.NumberFormat('tr-TR').format(num);
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
