<template>
  <CheckScreen>
    <div class="card border border-base-200 bg-base-100 shadow-md transition-all duration-200">
      <div class="card-body p-4 sm:p-6">
        <!-- Title and category section -->
        <div class="mb-2 sm:mb-4">
          <div v-if="isLoading" class="skeleton-wrapper">
            <div class="skeleton h-8 w-3/4 rounded-lg"></div>
            <div class="mt-2">
              <div class="skeleton h-4 w-24 rounded-lg"></div>
            </div>
          </div>
          <template v-else>
            <h1 class="line-clamp-2 break-words text-xl font-bold sm:text-2xl">{{ category.name }}</h1>
            <div class="mt-2">
              <span v-if="category.description" class="badge badge-outline line-clamp-1 text-xs">
                {{ category.description }}
              </span>
            </div>
          </template>
        </div>

        <!-- Admin controls -->
        <div v-if="auth.user && !isLoading" class="mb-4 flex justify-end gap-2">
          <Link :href="route('categories.edit', category.id)" class="btn btn-ghost btn-sm text-xs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="mr-1 h-4 w-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
            Düzenle
          </Link>

          <button @click="deleteCategory(category.id)" class="btn btn-ghost btn-sm text-xs text-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="mr-1 h-4 w-4"
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

        <!-- List view of writes -->
        <div v-if="isLoading" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="i in 3" :key="i" class="card h-[200px] border border-base-200 bg-base-100 shadow-md">
            <div class="card-body p-4">
              <div class="skeleton h-4 w-3/4 rounded-lg"></div>
              <div class="mt-2 space-y-2">
                <div class="skeleton h-4 w-full rounded-lg"></div>
                <div class="skeleton h-4 w-5/6 rounded-lg"></div>
              </div>
              <div class="mt-4 flex gap-2">
                <div class="skeleton h-4 w-16 rounded-lg"></div>
                <div class="skeleton h-4 w-16 rounded-lg"></div>
                <div class="skeleton h-4 w-16 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div v-if="writes.length > 0" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="write in filteredWrites"
              :key="write.id"
              class="card h-[200px] border border-base-200 bg-base-100 shadow-md"
            >
              <div class="card-body p-4">
                <h2 class="card-title line-clamp-2 text-base">
                  <Link :href="route('categories.showByCategory', { category: category.slug, slug: write.slug })" class="hover:text-primary">
                    {{ write.title }}
                  </Link>
                </h2>
                <p class="text-base-content/70 mt-2 line-clamp-2 text-sm">{{ write.summary }}</p>
                <div class="text-base-content/70 mt-4 flex flex-wrap items-center gap-2 text-xs">
                  <span class="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      class="h-3.5 w-3.5"
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
                  <span class="whitespace-nowrap">{{ formatDate(write.created_at) }}</span>
                  <span v-if="write.updated_at !== write.created_at" class="whitespace-nowrap">
                    Son güncelleme: {{ formatDate(write.updated_at) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="alert alert-info">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="h-5 w-5 shrink-0 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>Bu kategoride henüz yazı bulunmuyor.</span>
          </div>

          <!-- Loading more indicator -->
          <div v-if="isLoadingMore" class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div v-for="i in 3" :key="i" class="card h-[200px] border border-base-200 bg-base-100 shadow-md">
              <div class="card-body p-4">
                <div class="skeleton h-4 w-3/4 rounded-lg"></div>
                <div class="mt-2 space-y-2">
                  <div class="skeleton h-4 w-full rounded-lg"></div>
                  <div class="skeleton h-4 w-5/6 rounded-lg"></div>
                </div>
                <div class="mt-4 flex gap-2">
                  <div class="skeleton h-4 w-16 rounded-lg"></div>
                  <div class="skeleton h-4 w-16 rounded-lg"></div>
                  <div class="skeleton h-4 w-16 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Infinite scroll observer target -->
          <div v-if="hasMore" ref="observerTarget" class="h-4 w-full"></div>
        </div>
      </div>
    </div>
  </CheckScreen>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';
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

/**
 * Filter writes based on user role and status
 */
const filteredWrites = computed(() => {
  if (auth.user) {
    // Admin can see all writes
    return writes.value;
  } else {
    // Regular users can only see published writes
    return writes.value.filter((write) => write.status === 'published');
  }
});

/**
 * Load more writes when scrolling
 */
const loadMore = async () => {
  if (isLoadingMore.value || !hasMore.value) return;

  isLoadingMore.value = true;
  page.value++;

  try {
    const response = await fetch(
      route('api.categories.writes', {
        category: category.value.id,
        page: page.value,
      })
    );
    const data = await response.json();

    if (data.writes.length === 0) {
      hasMore.value = false;
    } else {
      writes.value.push(...data.writes);
    }
  } catch (error) {
    console.error('Error loading more writes:', error);
  } finally {
    isLoadingMore.value = false;
  }
};

/**
 * Setup intersection observer for infinite scroll
 */
const setupInfiniteScroll = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !isLoadingMore.value && hasMore.value) {
        loadMore();
      }
    },
    {
      rootMargin: '100px',
      threshold: 0.1,
    }
  );

  if (observerTarget.value) {
    observer.observe(observerTarget.value);
  }

  return () => {
    if (observerTarget.value) {
      observer.unobserve(observerTarget.value);
    }
  };
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

  // Setup infinite scroll
  setupInfiniteScroll();

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
</style>
