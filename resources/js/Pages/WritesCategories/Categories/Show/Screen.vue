<template>
  <CheckScreen>
    <div class="card border border-base-200 bg-base-100 shadow-md transition-all duration-200">
      <div class="card-body p-3 sm:p-6">
        <!-- Title and category section -->
        <div class="mb-4 sm:mb-6">
          <div v-if="isLoading" class="skeleton-wrapper">
            <div class="skeleton h-6 sm:h-8 w-3/4 rounded-lg"></div>
            <div class="mt-2">
              <div class="skeleton h-3 sm:h-4 w-24 rounded-lg"></div>
            </div>
          </div>
          <template v-else>
            <div class="flex items-center gap-2 sm:gap-3">
              <div class="flex-1 min-w-0">
                <h1 class="text-lg sm:text-2xl lg:text-3xl font-bold text-base-content break-words">{{ category.name }}</h1>
                <div class="mt-2 flex flex-wrap items-center gap-1 sm:gap-2">
                  <span v-if="category.description" class="badge badge-outline text-xs sm:text-sm">
                    {{ category.description }}
                  </span>
                  <span class="text-base-content/60 text-xs sm:text-sm">
                    {{ filteredWrites.length }} yazı
                  </span>
                </div>
              </div>
              <!-- Category icon -->
              <div class="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
          </template>
        </div>

        <!-- Admin controls -->
        <div v-if="auth.user && !isLoading" class="mb-4 sm:mb-6 flex flex-wrap justify-end gap-1 sm:gap-2">
          <Link :href="route('categories.edit', category.id)" class="btn btn-outline btn-xs sm:btn-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            <span class="hidden sm:inline">Düzenle</span>
            <span class="sm:hidden">Düzenle</span>
          </Link>

          <button @click="deleteCategory(category.id)" class="btn btn-outline btn-error btn-xs sm:btn-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
            <span class="hidden sm:inline">Sil</span>
            <span class="sm:hidden">Sil</span>
          </button>
        </div>

        <!-- Search and Filter Section -->
        <div v-if="!isLoading" class="mb-4 sm:mb-6">
          <div class="flex flex-col gap-3 sm:gap-4">
            <!-- Search Input -->
            <div class="w-full">
              <div class="relative">
                <input 
                  v-model="searchQuery" 
                  type="text" 
                  class="input input-bordered w-full pl-9 sm:pl-10 text-sm sm:text-base" 
                  placeholder="Yazı başlığı ara..."
                />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-base-content/50">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
            </div>

            <!-- Filter Buttons -->
            <div class="flex flex-wrap items-center gap-1 sm:gap-2">
              <button 
                @click="statusFilter = 'all'" 
                class="btn btn-xs sm:btn-sm"
                :class="statusFilter === 'all' ? 'btn-primary' : 'btn-outline'"
              >
                Tümü
              </button>
              <button 
                @click="statusFilter = 'published'" 
                class="btn btn-xs sm:btn-sm"
                :class="statusFilter === 'published' ? 'btn-primary' : 'btn-outline'"
              >
                Yayında
              </button>
              <button 
                v-if="auth.user"
                @click="statusFilter = 'private'" 
                class="btn btn-xs sm:btn-sm"
                :class="statusFilter === 'private' ? 'btn-primary' : 'btn-outline'"
              >
                Gizli
              </button>
              <button 
                v-if="auth.user"
                @click="statusFilter = 'link_only'" 
                class="btn btn-xs sm:btn-sm"
                :class="statusFilter === 'link_only' ? 'btn-primary' : 'btn-outline'"
              >
                Sadece Link
              </button>
            </div>
          </div>

          <!-- Results Count and Clear Filters -->
          <div class="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div class="text-xs sm:text-sm text-base-content/60">
              {{ displayedWrites.length }} / {{ filteredWrites.length }} yazı gösteriliyor
              <span v-if="searchQuery || statusFilter !== 'all'">
                ({{ writes.length }} toplam yazıdan)
              </span>
            </div>
            <button 
              v-if="searchQuery || statusFilter !== 'all'"
              @click="clearFilters" 
              class="btn btn-ghost btn-xs self-start sm:self-auto"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-1 h-3 w-3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Filtreleri Temizle
            </button>
          </div>
        </div>

        <!-- List view of writes -->
        <div v-if="isLoading" class="space-y-3 sm:space-y-4">
          <div v-for="i in 3" :key="i" class="card border border-base-200 bg-base-100 shadow-sm">
            <div class="card-body p-3 sm:p-6">
              <div class="flex items-start gap-3 sm:gap-4">
                <div class="skeleton h-10 w-10 sm:h-12 sm:w-12 rounded-lg"></div>
                <div class="flex-1 space-y-2">
                  <div class="skeleton h-4 sm:h-5 w-3/4 rounded-lg"></div>
                  <div class="skeleton h-3 sm:h-4 w-full rounded-lg"></div>
                  <div class="skeleton h-3 sm:h-4 w-2/3 rounded-lg"></div>
                </div>
                <div class="skeleton h-6 w-16 sm:h-8 sm:w-20 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div v-else>
          <div v-if="writes.length > 0" class="space-y-3 sm:space-y-4">
            <div
              v-for="write in displayedWrites"
              :key="write.id"
              class="card border border-base-200 bg-base-100 shadow-sm"
            >
              <div class="card-body p-3 sm:p-6">
                <div class="flex items-start gap-3 sm:gap-4">
                  <!-- Write icon/status indicator -->
                  <div class="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <svg v-if="write.status === 'private'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <svg v-else-if="write.status === 'link_only'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 010 5.656l-3 3a4 4 0 01-5.656-5.656l1.5-1.5M10.172 13.828a4 4 0 010-5.656l3-3a4 4 0 015.656 5.656l-1.5 1.5" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>

                  <!-- Content -->
                  <div class="flex-1 min-w-0">
                    <Link 
                      :href="route('categories.showByCategory', { category: category.slug, slug: write.slug })" 
                      class="block"
                    >
                      <h3 class="text-base sm:text-lg font-semibold line-clamp-2 mb-1 sm:mb-2 break-words">{{ write.title }}</h3>
                    </Link>
                    
                    <p v-if="write.summary" class="text-base-content/70 text-xs sm:text-sm line-clamp-2 mb-2 sm:mb-3">
                      {{ write.summary }}
                    </p>
                    
                    <!-- Metadata -->
                    <div class="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-base-content/60">
                      <span class="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-3 w-3 sm:h-3.5 sm:w-3.5">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {{ write.views_count }}
                      </span>
                      
                      <span class="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-3 w-3 sm:h-3.5 sm:w-3.5">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span class="hidden sm:inline">{{ formatDate(write.created_at) }}</span>
                        <span class="sm:hidden">{{ formatDateMobile(write.created_at) }}</span>
                      </span>
                      
                      <span v-if="write.updated_at !== write.created_at" class="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-3 w-3 sm:h-3.5 sm:w-3.5">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <span class="hidden sm:inline">Son güncelleme: {{ formatDate(write.updated_at) }}</span>
                        <span class="sm:hidden">Güncelleme: {{ formatDateMobile(write.updated_at) }}</span>
                      </span>
                    </div>
                  </div>

                  <!-- Action buttons -->
                  <div class="flex shrink-0 flex-col sm:flex-row items-center gap-1 sm:gap-2">
                    <Link 
                      :href="route('categories.showByCategory', { category: category.slug, slug: write.slug })" 
                      class="btn btn-primary btn-xs sm:btn-sm w-full sm:w-auto"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-1 h-3 w-3 sm:h-4 sm:w-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.639 0 8.573 3.007 9.542 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.639 0-8.573-3.007-9.542-7.178z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span class="hidden sm:inline">Oku</span>
                      <span class="sm:hidden">Oku</span>
                    </Link>
                    
                    <div v-if="auth.user" class="dropdown dropdown-end w-full sm:w-auto">
                      <button class="btn btn-ghost btn-xs sm:btn-sm w-full sm:w-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-3 w-3 sm:h-4 sm:w-4">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                        </svg>
                      </button>
                      <ul class="dropdown-content menu z-[1] w-40 sm:w-52 rounded-box bg-base-100 p-2 shadow">
                        <li>
                          <Link :href="route('writes.edit', write.slug)" class="flex items-center gap-2 text-xs sm:text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-3 w-3 sm:h-4 sm:w-4">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                            Düzenle
                          </Link>
                        </li>
                        <li>
                          <button @click="deleteWrite(write)" class="flex items-center gap-2 text-error text-xs sm:text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-3 w-3 sm:h-4 sm:w-4">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                            Sil
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div v-else class="alert alert-info">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-4 w-4 sm:h-5 sm:w-5 shrink-0 stroke-current">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div class="text-sm">
              <span v-if="searchQuery || statusFilter !== 'all'">
                Arama kriterlerinize uygun yazı bulunamadı.
              </span>
              <span v-else>
                Bu kategoride henüz yazı bulunmuyor.
              </span>
            </div>
          </div>

          <!-- Loading more indicator -->
          <div v-if="isLoadingMore" class="space-y-3 sm:space-y-4">
            <div v-for="i in 3" :key="i" class="card border border-base-200 bg-base-100 shadow-sm">
              <div class="card-body p-3 sm:p-6">
                <div class="flex items-start gap-3 sm:gap-4">
                  <div class="skeleton h-10 w-10 sm:h-12 sm:w-12 rounded-lg"></div>
                  <div class="flex-1 space-y-2">
                    <div class="skeleton h-4 sm:h-5 w-3/4 rounded-lg"></div>
                    <div class="skeleton h-3 sm:h-4 w-full rounded-lg"></div>
                    <div class="skeleton h-3 sm:h-4 w-2/3 rounded-lg"></div>
                  </div>
                  <div class="skeleton h-6 w-16 sm:h-8 sm:w-20 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Infinite scroll observer target -->
          <div v-if="hasMore" ref="observerTarget" class="h-6 sm:h-8 w-full flex items-center justify-center">
            <div class="loading loading-spinner loading-xs sm:loading-sm"></div>
            <span class="ml-2 text-xs sm:text-sm text-base-content/60">Daha fazla yazı yükleniyor...</span>
          </div>
        </div>
      </div>
    </div>
  </CheckScreen>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue';
import { usePage, Link, router } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';
import gsap from 'gsap';

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

// Infinite scroll states
const isLoading = ref(true);
const isLoadingMore = ref(false);
const page = ref(1);
const hasMore = ref(true);
const observerTarget = ref(null);

// Search and filter states
const searchQuery = ref('');
const statusFilter = ref('all');

/**
 * Filter writes based on user role and status
 */
const filteredWrites = computed(() => {
  let filtered = writes.value;

  if (searchQuery.value) {
    filtered = filtered.filter(write => 
      write.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  if (statusFilter.value !== 'all') {
    filtered = filtered.filter(write => write.status === statusFilter.value);
  }

  return filtered;
});

/**
 * Get displayed writes with pagination
 */
const displayedWrites = computed(() => {
  const startIndex = 0;
  const endIndex = page.value * 10;
  return filteredWrites.value.slice(startIndex, endIndex);
});

/**
 * Load more writes when scrolling (client-side pagination)
 */
const loadMore = () => {
  if (isLoadingMore.value || !hasMore.value) return;

  isLoadingMore.value = true;
  page.value++;

  // Simulate loading delay
  setTimeout(() => {
    checkHasMore();
    isLoadingMore.value = false;
  }, 300);
};

/**
 * Clear search and filters
 */
const clearFilters = () => {
  searchQuery.value = '';
  statusFilter.value = 'all';
  page.value = 1;
  checkHasMore();
};

/**
 * Watch for filter changes and reset pagination
 */
watch([searchQuery, statusFilter], () => {
  // Reset pagination when filters change
  page.value = 1;
  checkHasMore();
});

/**
 * Setup scroll-based infinite scroll
 */
const setupInfiniteScroll = () => {
  // Find the scroll container from CheckScreen
  let scrollContainer = document.querySelector('.h-screen-minus-12.overflow-y-auto');
  
  if (!scrollContainer) {
    // Try alternative selector
    const altContainer = document.querySelector('.overflow-y-auto');
    if (!altContainer) {
      return;
    }
    scrollContainer = altContainer;
  }

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
    const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;

    // Load more when user scrolls to 80% of the content
    if (scrollPercentage > 0.8 && !isLoadingMore.value && hasMore.value) {
      loadMore();
    }
  };

  scrollContainer.addEventListener('scroll', handleScroll);

  // Also set up intersection observer as backup
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isLoadingMore.value && hasMore.value) {
          loadMore();
        }
      });
    },
    {
      root: scrollContainer,
      rootMargin: '200px',
      threshold: 0.1,
    }
  );

  if (observerTarget.value) {
    observer.observe(observerTarget.value);
  }

  return () => {
    scrollContainer.removeEventListener('scroll', handleScroll);
    if (observerTarget.value) {
      observer.unobserve(observerTarget.value);
    }
  };
};

/**
 * Check if there are more writes to load
 */
const checkHasMore = () => {
  const endIndex = page.value * 10;
  const totalWrites = filteredWrites.value.length;
  hasMore.value = endIndex < totalWrites;
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
 * Navigate to edit page
 */
const editCategory = () => {
  router.visit(route('categories.edit', { category: category.value.id }));
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
        const index = writes.value.findIndex((w) => w.id === write.id);
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

const truncateSummary = (summary) => {
  if (!summary) return 'Açıklama bulunmamaktadır.';

  // Eğer içerik HTML etiketleri içeriyorsa, temizleyerek metin olarak işle
  if (summary.includes('<') && summary.includes('>')) {
    // Geçici bir div oluştur ve HTML'i yükle
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = summary;

    // Düz metni çıkar
    const plainText = tempDiv.textContent || tempDiv.innerText || '';

    // Metni kısalt
    return plainText.length > 100 ? plainText.slice(0, 100) + '...' : plainText;
  }

  // HTML içermeyen düz metin için doğrudan kısalt
  return summary.length > 100 ? summary.slice(0, 100) + '...' : summary;
};

/**
 * Animate skeleton loading
 */
const animateSkeleton = () => {
  const skeletons = document.querySelectorAll('.skeleton');
  gsap.to(skeletons, {
    opacity: 0.5,
    duration: 0.8,
    stagger: 0.1,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut',
  });
};

onMounted(() => {
  // Start skeleton animation
  animateSkeleton();

  // Simulate initial loading delay
  setTimeout(() => {
    isLoading.value = false;
  }, 800);

  // Setup infinite scroll with delay to ensure DOM is ready
  setTimeout(() => {
    setupInfiniteScroll();
    checkHasMore();
    
    // Also set up window scroll as fallback
    const handleWindowScroll = () => {
      const scrollPercentage = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
      if (scrollPercentage > 0.8 && !isLoadingMore.value && hasMore.value) {
        loadMore();
      }
    };
    
    window.addEventListener('scroll', handleWindowScroll);
  }, 100);

  if (flashSuccess.value) {
    setTimeout(() => {
      flashSuccess.value = null;
    }, 3000);
  }
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
}

.card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-title {
  margin-bottom: 0.5rem;
}

/* Ensure links don't overflow */
.card-title a {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
}

/* Add smooth transition for loading more content */
.card {
  transition: all 0.3s ease-in-out;
}

/* Ensure skeleton animations are smooth */
.skeleton {
  transition: opacity 0.3s ease-in-out;
}

/* Card styling without hover effects */
.card {
  /* No transitions or hover effects */
}

/* Line clamp utilities */
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

/* No transitions for interactive elements */
.btn, .badge {
  /* No transitions */
}

/* No dropdown animations */
.dropdown-content {
  /* No animations */
}

/* Mobile responsive improvements */
@media (max-width: 640px) {
  /* Ensure proper text wrapping on mobile */
  .break-words {
    word-break: break-word;
    overflow-wrap: break-word;
  }
  
  /* Optimize button sizes for touch */
  .btn-xs {
    min-height: 2rem;
    padding: 0.25rem 0.5rem;
  }
  
  /* Ensure dropdowns are properly sized on mobile */
  .dropdown-content {
    min-width: 8rem;
  }
  
  /* Optimize card spacing for mobile */
  .card-body {
    padding: 0.75rem;
  }
  
  /* Ensure proper icon sizing on mobile */
  .h-3.w-3 {
    width: 0.75rem;
    height: 0.75rem;
  }
  
  /* Optimize text sizes for mobile readability */
  .text-xs {
    font-size: 0.75rem;
    line-height: 1rem;
  }
  
  /* Ensure proper spacing between elements */
  .gap-1 {
    gap: 0.25rem;
  }
  
  .gap-2 {
    gap: 0.5rem;
  }
  
  .gap-3 {
    gap: 0.75rem;
  }
}

/* Tablet responsive improvements */
@media (min-width: 641px) and (max-width: 1024px) {
  /* Optimize for tablet screens */
  .card-body {
    padding: 1rem 1.5rem;
  }
  
  /* Ensure proper button sizing on tablets */
  .btn-sm {
    min-height: 2.25rem;
    padding: 0.375rem 0.75rem;
  }
}

/* Ensure proper touch targets on mobile */
@media (max-width: 640px) {
  .btn, .dropdown button {
    min-height: 2.5rem;
    min-width: 2.5rem;
  }
  
  /* Ensure proper spacing for touch interactions */
  .flex-col > * + * {
    margin-top: 0.5rem;
  }
}
</style>
