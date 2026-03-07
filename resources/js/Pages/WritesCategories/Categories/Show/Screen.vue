<template>
  <CheckScreen>
    <div class="p-3 pt-4 sm:p-6 sm:pt-6 lg:p-8 lg:pt-8">
      <!-- Minimalist Header -->
      <div v-if="!isLoading" class="mb-6">
        <!-- Breadcrumb - çok kompakt -->
        <nav v-if="categoryBreadcrumb.length > 1" class="mb-2 flex items-center gap-1 text-xs text-muted-foreground">
          <template v-for="(breadcrumbItem, index) in categoryBreadcrumb" :key="breadcrumbItem.id">
            <Link
              v-if="index < categoryBreadcrumb.length - 1"
              :href="route('categories.show', { category: breadcrumbItem.slug })"
              class="transition-colors hover:text-foreground"
            >
              {{ breadcrumbItem.name }}
            </Link>
            <span v-else class="text-foreground">{{ breadcrumbItem.name }}</span>
            <span v-if="index < categoryBreadcrumb.length - 1" class="text-muted-foreground/40">/</span>
          </template>
        </nav>

        <!-- Title & Stats -->
        <div class="mb-4 flex items-end justify-between gap-4">
          <div class="min-w-0 flex-1">
            <h1 class="mb-1 text-2xl font-bold text-foreground sm:text-3xl">
              {{ category.name }}
            </h1>
            <p v-if="category.description" class="text-sm text-muted-foreground line-clamp-1">
              {{ category.description }}
            </p>
          </div>
          <div class="shrink-0 text-right">
            <div class="text-2xl font-bold text-foreground">{{ filteredWrites?.length || 0 }}</div>
            <div class="text-xs text-muted-foreground">yazı</div>
          </div>
        </div>

        <!-- Filters - inline ve kompakt -->
        <div class="flex flex-wrap items-center gap-1.5">
          <button
            @click="statusFilter = 'all'"
            class="inline-flex h-7 items-center rounded-md px-3 text-xs font-medium transition-all"
            :class="statusFilter === 'all' 
              ? 'bg-foreground text-background' 
              : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'"
          >
            Tümü
          </button>
          <button
            @click="statusFilter = 'published'"
            class="inline-flex h-7 items-center rounded-md px-3 text-xs font-medium transition-all"
            :class="statusFilter === 'published' 
              ? 'bg-foreground text-background' 
              : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'"
          >
            Yayında
          </button>
          <button
            v-if="auth.user"
            @click="statusFilter = 'private'"
            class="inline-flex h-7 items-center rounded-md px-3 text-xs font-medium transition-all"
            :class="statusFilter === 'private' 
              ? 'bg-foreground text-background' 
              : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'"
          >
            Gizli
          </button>
          <button
            v-if="auth.user"
            @click="statusFilter = 'link_only'"
            class="inline-flex h-7 items-center rounded-md px-3 text-xs font-medium transition-all"
            :class="statusFilter === 'link_only' 
              ? 'bg-foreground text-background' 
              : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'"
          >
            Link
          </button>
          <button
            v-if="statusFilter !== 'all'"
            @click="clearFilters"
            class="inline-flex h-7 w-7 items-center justify-center rounded-md bg-muted text-muted-foreground transition-all hover:bg-destructive/10 hover:text-destructive"
            title="Filtreyi temizle"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="h-3.5 w-3.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="space-y-2">
        <div v-for="i in 5" :key="i" class="rounded-lg border border-border bg-card p-4">
          <div class="mb-2 h-5 w-3/4 animate-pulse rounded bg-muted"></div>
          <div class="h-3 w-1/2 animate-pulse rounded bg-muted"></div>
        </div>
      </div>

      <!-- Yazı Listesi - Ultra Minimalist -->
      <div v-else class="space-y-2">
        <div
          v-for="write in paginatedWrites"
          :key="write.id"
          @click="router.visit(route('categories.showByCategory', { category: category.slug, slug: write.slug }))"
          class="group flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-card p-3 transition-all duration-200 hover:border-primary/50 hover:bg-accent/30 hover:shadow-sm sm:gap-4 sm:p-4"
        >
          <!-- Status Icon - minimal -->
          <div class="shrink-0">
            <div 
              class="flex h-8 w-8 items-center justify-center rounded-full transition-colors"
              :class="{
                'bg-green-500/10 text-green-600 dark:text-green-400': write.status === 'published',
                'bg-amber-500/10 text-amber-600 dark:text-amber-400': write.status === 'private',
                'bg-blue-500/10 text-blue-600 dark:text-blue-400': write.status === 'link_only',
              }"
            >
              <svg
                v-if="write.status === 'private'"
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <svg
                v-else-if="write.status === 'link_only'"
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 010 5.656l-3 3a4 4 0 01-5.656-5.656l1.5-1.5M10.172 13.828a4 4 0 010-5.656l3-3a4 4 0 015.656 5.656l-1.5 1.5" />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>

          <!-- Content -->
          <div class="min-w-0 flex-1">
            <h3 class="mb-1 line-clamp-1 font-semibold text-foreground transition-colors group-hover:text-primary">
              {{ write.title }}
            </h3>
            <p v-if="write.summary" class="mb-2 line-clamp-1 text-xs text-muted-foreground sm:text-sm">
              {{ write.summary }}
            </p>
            <div class="flex items-center gap-3 text-xs text-muted-foreground">
              <span class="inline-flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-3 w-3" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {{ formatNumber(write.views_count) }}
              </span>
              <span class="inline-flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-3 w-3" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {{ formatDateMobile(write.created_at) }}
              </span>
            </div>
          </div>

          <!-- Arrow -->
          <div class="shrink-0 text-muted-foreground/40 transition-all group-hover:translate-x-0.5 group-hover:text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="h-4 w-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </div>
        </div>

        <!-- Load More -->
        <div v-if="(hasMore || isLoadingMore) && filteredWrites.length > perPage" class="flex justify-center py-6">
          <div v-if="isLoadingMore" class="flex items-center gap-2 text-xs text-muted-foreground">
            <div class="h-3 w-3 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
            Yükleniyor...
          </div>
          <button
            v-else
            @click="loadMore"
            class="inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-background px-4 text-xs font-medium text-foreground transition-all hover:bg-accent"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-3.5 w-3.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
            </svg>
            Daha Fazla
          </button>
        </div>

        <!-- Empty State -->
        <div v-if="filteredWrites.length === 0" class="py-16 text-center">
          <div class="mb-3 text-muted-foreground/30">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="mx-auto h-16 w-16">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p class="text-sm text-muted-foreground">
            <span v-if="statusFilter !== 'all'">Seçilen filtreye uygun yazı bulunamadı</span>
            <span v-else>Bu kategoride henüz yazı yok</span>
          </p>
        </div>

        <!-- End Message -->
        <div v-else-if="!hasMore && paginatedWrites.length > 0" class="py-6 text-center">
          <p class="text-xs text-muted-foreground/50">Tüm yazılar gösteriliyor</p>
        </div>
      </div>
    </div>
  </CheckScreen>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch, onUnmounted } from 'vue';
import { usePage, Link, router } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';
import Card from '@/Components/UI/Card.vue';
import Button from '@/Components/UI/Button.vue';
import Badge from '@/Components/UI/Badge.vue';

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
const categories = ref(props.categories || []);
const auth = props.auth;
const flashSuccess = ref(props.flash?.success);

// Loading states
const isLoading = ref(true);

/**
 * Get category breadcrumb path (parent > child > current)
 * @returns {Array} Array of category objects in breadcrumb order
 */
const categoryBreadcrumb = computed(() => {
  if (!category.value || !category.value.id || !categories.value || categories.value.length === 0) {
    return [];
  }

  const findCategory = (id) => {
    return categories.value.find((cat) => cat && cat.id === id);
  };

  const buildBreadcrumb = (categoryId, breadcrumb = []) => {
    const cat = findCategory(categoryId);
    if (!cat) return breadcrumb;

    breadcrumb.unshift(cat);

    if (cat.parent_id) {
      return buildBreadcrumb(cat.parent_id, breadcrumb);
    }

    return breadcrumb;
  };

  return buildBreadcrumb(category.value.id);
});

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
.text-foreground {
  word-wrap: break-word;
  overflow-wrap: break-word;
}
</style>
