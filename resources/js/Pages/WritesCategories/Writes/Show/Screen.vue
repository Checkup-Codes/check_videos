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
            <h1 class="break-words text-xl font-bold sm:text-2xl">{{ write.title }}</h1>
            <div class="mt-2">
              <span v-if="write.category" class="badge badge-outline text-xs">
                {{ write.category.name }}
              </span>
            </div>
          </template>
        </div>

        <!-- Mobile action buttons (fixed at bottom on mobile) -->
        <div class="sticky">
          <div class="flex items-center justify-between">
            <!-- Left side: Toggle content button -->
            <button
              v-if="!isLoading"
              @click="toggleContent"
              class="btn btn-sm grow-0 sm:grow-0"
              :class="showDraw ? 'btn-primary' : 'btn-outline'"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="mr-1 h-4 w-4"
              >
                <path
                  v-if="showDraw"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
                <path
                  v-else
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {{ showDraw ? 'Metni Göster' : 'Çizimi Göster' }}
            </button>

            <!-- Right side: Admin actions -->
            <div v-if="auth.user && !isLoading" class="flex gap-2">
              <Link :href="route('writes.edit', write.id)" class="btn btn-ghost btn-sm text-xs">
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
              </Link>

              <button @click="deleteWrite(write.id)" class="btn btn-ghost btn-sm text-xs text-error">
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
              </button>
            </div>
          </div>
        </div>

        <div class="divider my-1"></div>

        <!-- Main content area -->
        <div v-if="isLoading" class="skeleton-wrapper space-y-4">
          <div class="skeleton h-4 w-full rounded-lg"></div>
          <div class="skeleton h-4 w-5/6 rounded-lg"></div>
          <div class="skeleton h-4 w-4/6 rounded-lg"></div>
          <div class="skeleton h-4 w-full rounded-lg"></div>
          <div class="skeleton h-4 w-3/4 rounded-lg"></div>
          <div class="skeleton h-4 w-5/6 rounded-lg"></div>
          <div class="skeleton h-32 w-full rounded-lg"></div>
          <div class="skeleton h-4 w-2/3 rounded-lg"></div>
          <div class="skeleton h-4 w-full rounded-lg"></div>
        </div>
        <div v-else>
          <div v-if="showDraw" class="min-h-[500px]">
            <ExcalidrawComponent :write="write" />
          </div>
          <div v-else class="content-container">
            <div v-if="write.summary" class="alert alert-info mb-4 px-3 py-2 text-sm sm:mb-6 sm:p-4">
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
              <span>{{ write.summary }}</span>
            </div>

            <div class="article-content ql-editor" ref="contentRef" v-html="processedContent"></div>
          </div>
        </div>

        <!-- Footer metadata -->
        <div
          v-if="!isLoading"
          class="text-base-content/70 mt-4 flex flex-col space-y-2 p-2 text-xs sm:mt-6 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 sm:p-3 sm:text-sm"
        >
          <div>Oluşturma: {{ formatDate(write.created_at) }}</div>
          <div class="flex flex-wrap items-center gap-2">
            <span class="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                class="h-3.5 w-3.5 sm:h-4 sm:w-4"
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
              {{ write.views_count }} görüntüleme
            </span>
            <span v-if="write.updated_at !== write.created_at" class="whitespace-nowrap">
              Son güncelleme: {{ formatDate(write.updated_at) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </CheckScreen>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from 'vue';
import { usePage, router, Link } from '@inertiajs/vue3';
import ExcalidrawComponent from '@/Components/ExcalidrawComponent.vue';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';
import '@/Shared/Css/quill-custom-styles.css';
import { useGsapFadeIn } from '@/Pages/WritesCategories/_utils/useGsapAnimation.js';
import { useProcessedQuillContent } from '@/Pages/WritesCategories/_utils/useProcessedQuillContent.js';
import gsap from 'gsap';

/**
 * Component name definition
 */
defineOptions({
  name: 'ShowWriteScreen',
});

/**
 * Get write data from page props
 */
const { props } = usePage();
const write = ref(props.write || {});
const auth = props.auth;
const contentRef = ref(null);
const showDraw = ref(false);
const isLoading = ref(true);

/**
 * Use the centralized Quill content processor
 */
const processedContent = useProcessedQuillContent(
  contentRef,
  computed(() => write.value.content)
);

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
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Toggle between content and drawing views
 */
const toggleContent = () => {
  showDraw.value = !showDraw.value;
};

/**
 * Delete write with confirmation
 */
const deleteWrite = async (id) => {
  if (!confirm('Bu yazıyı silmek istediğinizden emin misiniz?')) {
    return;
  }

  try {
    await router.delete(route('writes.destroy', { write: id }));
  } catch (error) {
    console.error('Error deleting write:', error);
  }
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

/**
 * Apply GSAP animation on mount and restore write list scroll position
 */
onMounted(() => {
  // Start skeleton animation
  animateSkeleton();

  // Simulate loading delay
  setTimeout(() => {
    isLoading.value = false;
    useGsapFadeIn(contentRef);
  }, 800);

  // Restore write list scroll position after a short delay
  // to ensure the list component is fully mounted
  nextTick(() => {
    const writeListElement = document.querySelector('.write-list-container');
    if (writeListElement) {
      const savedScrollTop = localStorage.getItem('writeListScrollPosition');
      if (savedScrollTop) {
        writeListElement.scrollTop = parseInt(savedScrollTop, 10);
      }
    }
  });
});

/**
 * Save write list scroll position before navigating away
 */
router.on('before', () => {
  const writeListElement = document.querySelector('.write-list-container');
  if (writeListElement) {
    localStorage.setItem('writeListScrollPosition', writeListElement.scrollTop.toString());
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
</style>
