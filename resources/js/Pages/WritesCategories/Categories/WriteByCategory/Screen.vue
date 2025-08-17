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
              <Link :href="route('writes.edit', write.slug)" class="btn btn-ghost btn-sm text-xs">
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
        <div v-if="isLoading" class="space-y-4">
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

            <!-- Lazy load content with intersection observer -->
            <div 
              v-if="contentShouldLoad" 
              class="article-content ql-editor" 
              ref="contentRef" 
              v-html="processedContent"
            ></div>
            <div v-else class="content-placeholder">
              <div class="skeleton-wrapper space-y-3">
                <div class="skeleton h-4 w-full rounded-lg"></div>
                <div class="skeleton h-4 w-5/6 rounded-lg"></div>
                <div class="skeleton h-4 w-4/6 rounded-lg"></div>
                <div class="skeleton h-4 w-full rounded-lg"></div>
                <div class="skeleton h-4 w-3/4 rounded-lg"></div>
              </div>
            </div>
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

    <!-- Fixed Table of Contents Button -->
    <button
      v-if="!isLoading && showTableOfContents"
      @click="toggleTableOfContents"
      class="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 btn btn-primary btn-circle shadow-lg hover:shadow-xl transition-all duration-200"
      :class="{ 'btn-active': isTableOfContentsOpen }"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-6 w-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    </button>

    <!-- Table of Contents Sidebar -->
    <div
      v-if="!isLoading && showTableOfContents"
      class="fixed right-0 top-0 h-full w-80 bg-base-100 shadow-2xl transform transition-transform duration-300 z-40"
      :class="{ 'translate-x-full': !isTableOfContentsOpen }"
    >
      <div class="flex flex-col h-full">
        <!-- Header -->
        <div class="flex items-center justify-between p-4 border-b border-base-200">
          <h3 class="text-lg font-semibold">İçindekiler</h3>
          <button
            @click="toggleTableOfContents"
            class="btn btn-ghost btn-sm btn-circle"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-5 w-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Content -->
        <div class="flex-1 overflow-y-auto p-4">
          <div v-if="tableOfContents.length === 0" class="text-center text-base-content/60 py-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-12 w-12 mx-auto mb-4 opacity-50"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p>İçindekiler bulunamadı</p>
          </div>
          
          <div v-else class="space-y-2">
            <div
              v-for="(item, index) in tableOfContents"
              :key="index"
              @click="scrollToHeading(item.id)"
              class="cursor-pointer p-3 rounded-lg hover:bg-base-200 transition-colors duration-200"
              :class="getHeadingClass(item.level)"
            >
              <div class="flex items-center gap-2">
                <span class="text-xs text-base-content/50 font-mono">{{ index + 1 }}</span>
                <span class="text-sm font-medium line-clamp-2">{{ item.text }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Backdrop -->
    <div
      v-if="!isLoading && showTableOfContents && isTableOfContentsOpen"
      @click="toggleTableOfContents"
      class="fixed inset-0 bg-black/20 z-30"
    ></div>
  </CheckScreen>
</template>

<script setup>
import { ref, onMounted, computed, nextTick, onUnmounted, watch } from 'vue';
import { usePage, router, Link } from '@inertiajs/vue3';
import ExcalidrawComponent from '@/Components/ExcalidrawComponent.vue';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';
import '@/Shared/Css/quill-custom-styles.css';
import { useProcessedQuillContent } from '@/Pages/WritesCategories/_utils/useProcessedQuillContent.js';

/**
 * Component name definition
 */
defineOptions({
  name: 'WriteByCategoryScreen',
});

/**
 * Get data from page props
 */
const { props } = usePage();
const category = ref(props.category || {});
const write = ref(props.write || {});
const contentRef = ref(null);
const auth = props.auth || {};
const showDraw = ref(false);
const isLoading = ref(true);
const contentShouldLoad = ref(false);
const showTableOfContents = ref(false);
const isTableOfContentsOpen = ref(false);
const tableOfContents = ref([]);

/**
 * Use the centralized Quill content processor with lazy loading
 */
const processedContent = useProcessedQuillContent(
  contentRef,
  computed(() => contentShouldLoad.value ? write.value.content : '')
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
 * Navigate to edit page
 */
const editWrite = () => {
  router.visit(route('writes.edit', write.value.slug));
};

/**
 * Intersection Observer for lazy loading content
 */
let contentObserver = null;

/**
 * Handle content after component mount
 */
onMounted(() => {
  // Start with content loading disabled for better initial performance
  contentShouldLoad.value = false;
  
  // Simulate loading delay
  setTimeout(() => {
    isLoading.value = false;
    
    // Set up intersection observer for lazy loading
    const contentPlaceholder = document.querySelector('.content-placeholder');
    if (contentPlaceholder) {
      contentObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !contentShouldLoad.value) {
            contentShouldLoad.value = true;
            // Setup link handling after content loads
            nextTick(() => {
              setupLinkHandling();
              // Generate table of contents after content is loaded
              setTimeout(() => {
                generateTableOfContents();
              }, 100);
            });
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '50px'
      });
      
      contentObserver.observe(contentPlaceholder);
    } else {
      // Fallback: load content immediately if no placeholder
      contentShouldLoad.value = true;
      nextTick(() => {
        setupLinkHandling();
        // Generate table of contents after content is loaded
        setTimeout(() => {
          generateTableOfContents();
        }, 100);
      });
    }
  }, 300);

  // URL parametrelerine göre çizim/içerik gösterme durumunu belirle
  if (window.location.pathname.includes('categories')) {
    showDraw.value = true;
  } else {
    showDraw.value = props.showDraw || false;
  }
  const urlParams = new URLSearchParams(window.location.search);
  showDraw.value = urlParams.has('draw');

  // İçerik gösteriliyorsa ve görsel yükleme gecikmesi istenmiyorsa,
  // görüntüleme durumuna bağlı olarak görsel önbelleğe alınabilir
  if (!showDraw.value) {
    // İçerik yüklendikten sonra
    nextTick(() => {
      // Görünür pencere içindeki resimleri hemen yükle
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target;
              // Görseli öncelikli yüklenecek şekilde işaretle
              img.setAttribute('loading', 'eager');
              img.setAttribute('importance', 'high');
              observer.unobserve(img);
            }
          });
        },
        {
          rootMargin: '200px 0px', // Görünür alan dışında 200px önceden yüklemeye başla
          threshold: 0.01, // %1'i görünür olduğunda tetikle
        }
      );

      // Görünür alandaki tüm görsel elementlerini gözlemle
      const imgElements = document.querySelectorAll('.article-content img');
      imgElements.forEach((img) => observer.observe(img));
    });
  }

  // Preload images if content contains them
  if (write.value.content && write.value.content.includes('<img')) {
    const imgRegex = /<img[^>]+src="([^"]+)"/g;
    let match;
    while ((match = imgRegex.exec(write.value.content)) !== null) {
      const img = new Image();
      img.src = match[1];
    }
  }
});

/**
 * Cleanup observer on unmount
 */
onUnmounted(() => {
  if (contentObserver) {
    contentObserver.disconnect();
  }
});

/**
 * Setup handling for links in content
 */
const setupLinkHandling = () => {
  if (!contentRef.value) return;

  // Get all links in the content
  const links = contentRef.value.querySelectorAll('a');

  // Add target blank to external links
  links.forEach((link) => {
    const url = link.getAttribute('href');
    if (url && !url.startsWith('/') && !url.startsWith('#')) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });
};

/**
 * Generate table of contents from content
 */
const generateTableOfContents = () => {
  if (!contentRef.value) return;
  
  const headings = contentRef.value.querySelectorAll('h1, h2, h3, h4, h5, h6');
  const toc = [];
  
  headings.forEach((heading, index) => {
    // Generate unique ID if not exists
    if (!heading.id) {
      heading.id = `heading-${index}`;
    }
    
    const level = parseInt(heading.tagName.charAt(1));
    const text = heading.textContent.trim();
    
    if (text) {
      toc.push({
        id: heading.id,
        text: text,
        level: level
      });
    }
  });
  
  tableOfContents.value = toc;
  showTableOfContents.value = toc.length > 0;
};

const toggleContent = () => {
  showDraw.value = !showDraw.value;
  const url = new URL(window.location.href);

  if (showDraw.value) {
    url.searchParams.set('draw', '1');
  } else {
    url.searchParams.delete('draw');
  }

  window.history.pushState({}, '', url);
};

const deleteWrite = (id) => {
  if (confirm('Bu yazıyı silmek istediğinize emin misiniz?')) {
    router.delete(route('writes.destroy', id), {
      onSuccess: () => {
        // Redirect back to category page after deletion
        router.visit(route('categories.show', category.value.slug));
      }
    });
  }
};



/**
 * Scroll to a heading by its ID
 * @param {string} id - The ID of the heading to scroll to
 */
const scrollToHeading = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    
    // Close sidebar on mobile
    if (window.innerWidth < 768) {
      isTableOfContentsOpen.value = false;
    }
  }
};

/**
 * Get heading class based on level
 * @param {number} level - The heading level (1, 2, or 3)
 * @returns {string} Tailwind classes for the heading
 */
const getHeadingClass = (level) => {
  switch (level) {
    case 1:
      return 'border-l-4 border-primary bg-primary/5';
    case 2:
      return 'border-l-4 border-secondary bg-secondary/5 ml-4';
    case 3:
      return 'border-l-4 border-accent bg-accent/5 ml-8';
    case 4:
      return 'border-l-4 border-base-300 bg-base-200/50 ml-12';
    case 5:
      return 'border-l-4 border-base-300 bg-base-200/30 ml-16';
    case 6:
      return 'border-l-4 border-base-300 bg-base-200/20 ml-20';
    default:
      return '';
  }
};

/**
 * Toggle the visibility of the table of contents sidebar
 */
const toggleTableOfContents = () => {
  isTableOfContentsOpen.value = !isTableOfContentsOpen.value;
};

/**
 * Watch for content changes to regenerate table of contents
 */
watch(processedContent, () => {
  if (contentShouldLoad.value && processedContent.value) {
    nextTick(() => {
      generateTableOfContents();
    });
  }
}, { flush: 'post' });

/**
 * Watch for showDraw changes to hide table of contents when drawing is shown
 */
watch(showDraw, (newValue) => {
  if (newValue) {
    isTableOfContentsOpen.value = false;
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

.content-placeholder {
  min-height: 200px;
}

/* Optimize content rendering */
.article-content {
  contain: layout style paint;
  will-change: auto;
}

/* Reduce layout thrashing */
.content-container {
  contain: layout;
}

/* Table of Contents styles */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}

/* Mobile responsive adjustments */
@media (max-width: 768px) {
  .fixed.right-4 {
    right: 1rem;
  }
}
</style>
