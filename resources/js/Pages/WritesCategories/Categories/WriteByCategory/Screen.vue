<template>
  <!-- Draw view with full width - bypass CheckScreen -->
  <div v-if="showDraw" class="relative h-screen w-full">
    <!-- Back button for draw view -->
    <div class="absolute left-4 top-[53px] z-10 lg:top-4">
      <button
        @click="toggleContent"
        class="flex items-center gap-2 rounded-lg border border-base-300 bg-base-100 px-3 py-2 text-sm text-base-content shadow-lg transition-all duration-200 hover:bg-base-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-4 w-4"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Metne Dön
      </button>
    </div>
    <ExcalidrawComponent :write="write" />
  </div>

  <!-- Content view with CheckScreen wrapper -->
  <CheckScreen v-else>
    <!-- Content view with max width -->
    <div class="mx-auto max-w-4xl">
      <div class="bg-base-100 transition-all duration-200">
        <div class="p-6 pt-12 sm:p-8 sm:pt-16">
          <!-- Title and date section -->
          <div class="mb-8">
            <div v-if="isLoading" class="space-y-3">
              <div class="skeleton h-8 w-3/4 rounded"></div>
              <div class="skeleton h-4 w-24 rounded"></div>
            </div>
            <template v-else>
              <h1 class="mb-3 text-2xl font-bold text-base-content">{{ write.title }}</h1>
              <div class="text-base-content/60 text-sm">
                {{ formatDate(write.created_at) }}
              </div>
            </template>
          </div>

          <!-- Action buttons -->
          <div v-if="!isLoading" class="mb-6 flex items-center justify-between">
            <!-- Toggle content button - visible for everyone -->
            <button
              @click="toggleContent"
              class="flex items-center gap-2 rounded-lg border border-base-300 bg-base-100 px-3 py-2 text-sm transition-all duration-200 hover:bg-base-200"
              :class="showDraw ? 'border-primary bg-primary text-primary-content' : 'text-base-content'"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-4 w-4"
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

            <!-- Admin actions - only for authenticated users -->
            <div v-if="auth.user" class="flex items-center gap-2">
              <Link
                :href="route('writes.edit', write.id)"
                class="flex h-8 w-8 items-center justify-center rounded-lg bg-base-200 text-base-content transition-all duration-200 hover:bg-base-300"
                title="Düzenle"
              >
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
              </Link>

              <button
                @click="deleteWrite(write.id)"
                class="flex h-8 w-8 items-center justify-center rounded-lg bg-base-200 text-error transition-all duration-200 hover:bg-error hover:text-error-content"
                title="Sil"
              >
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
              </button>
            </div>
          </div>

          <!-- Main content area -->
          <div v-if="isLoading" class="space-y-3">
            <div class="skeleton h-4 w-full rounded"></div>
            <div class="skeleton h-4 w-5/6 rounded"></div>
            <div class="skeleton h-4 w-4/6 rounded"></div>
            <div class="skeleton h-4 w-full rounded"></div>
            <div class="skeleton h-4 w-3/4 rounded"></div>
            <div class="skeleton h-4 w-5/6 rounded"></div>
            <div class="skeleton h-32 w-full rounded"></div>
            <div class="skeleton h-4 w-2/3 rounded"></div>
            <div class="skeleton h-4 w-full rounded"></div>
          </div>
          <div v-else>
            <div class="content-container">
              <!-- Summary removed for cleaner design -->

              <!-- Lazy load content with intersection observer -->
              <div
                v-if="contentShouldLoad"
                class="article-content ql-editor"
                ref="contentRef"
                v-html="processedContent"
              ></div>
              <div v-else class="content-placeholder">
                <div class="space-y-3">
                  <div class="skeleton h-4 w-full rounded"></div>
                  <div class="skeleton h-4 w-5/6 rounded"></div>
                  <div class="skeleton h-4 w-4/6 rounded"></div>
                  <div class="skeleton h-4 w-full rounded"></div>
                  <div class="skeleton h-4 w-3/4 rounded"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer metadata - simplified -->
          <div v-if="!isLoading" class="text-base-content/60 mt-8 text-sm">
            {{ formatNumber(write.views_count) }} görüntülenme
          </div>
        </div>
      </div>
    </div>

    <!-- Table of Contents - Sade Tasarım -->
    <!-- Mobile: Fixed sidebar with toggle button -->
    <button
      v-if="!isLoading && showTableOfContents && !showDraw"
      @click="toggleTableOfContents"
      class="fixed right-4 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-base-content text-base-100 shadow-lg transition-all duration-200 hover:bg-base-300 2xl:hidden"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-5 w-5"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
    </button>

    <!-- Mobile: Fixed sidebar -->
    <div
      v-if="!isLoading && showTableOfContents && !showDraw"
      class="fixed right-0 top-0 z-40 h-full w-80 transform bg-base-100 shadow-2xl transition-transform duration-300 2xl:hidden"
      :class="{ 'translate-x-full': !isTableOfContentsOpen }"
    >
      <div class="flex h-full flex-col">
        <div class="flex items-center justify-between border-b border-base-300 p-4">
          <h3 class="text-lg font-semibold text-base-content">İçindekiler</h3>
          <button @click="toggleTableOfContents" class="btn btn-ghost btn-sm">
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
          </button>
        </div>
        <div class="flex-1 overflow-y-auto p-4">
          <div v-if="tableOfContents.length === 0" class="text-base-content/60 py-8 text-center text-sm">
            İçindekiler bulunamadı
          </div>
          <div v-else class="space-y-1">
            <div
              v-for="(item, index) in tableOfContents"
              :key="index"
              @click="scrollToHeading(item.id)"
              class="cursor-pointer rounded-lg p-2 text-sm transition-colors hover:bg-base-200"
              :class="[getTreeHeadingClass(item.level), getActiveHeadingClass(item.id)]"
            >
              <span class="text-base-content">{{ item.text }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Desktop: Toggle button for large screens -->
    <button
      v-if="!isLoading && showTableOfContents && !showDraw"
      @click="toggleTableOfContents"
      class="fixed right-4 top-4 z-50 flex hidden h-10 w-10 items-center justify-center rounded-full bg-base-content text-base-100 shadow-lg transition-all duration-200 hover:bg-base-300 2xl:flex"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-5 w-5"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
    </button>

    <!-- Desktop: Fixed sidebar on the right (15.6 inch and above) -->
    <div
      v-if="!isLoading && showTableOfContents && !showDraw"
      class="fixed right-4 top-4 z-30 hidden w-64 transition-all duration-300 ease-in-out 2xl:block"
      :class="isTableOfContentsOpen ? 'translate-x-0 opacity-100' : 'pointer-events-none translate-x-full opacity-0'"
    >
      <div class="rounded-lg bg-base-100 shadow-lg">
        <div class="flex items-center justify-between border-b border-base-300 p-3">
          <h3 class="text-sm font-semibold text-base-content">İçindekiler</h3>
          <button @click="toggleTableOfContents" class="btn btn-ghost btn-xs">
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
          </button>
        </div>
        <div class="overflow-y-auto p-3" style="max-height: calc(100vh - 120px)">
          <div v-if="tableOfContents.length === 0" class="text-base-content/60 py-4 text-center text-xs">
            İçindekiler bulunamadı
          </div>
          <div v-else class="space-y-1">
            <div
              v-for="(item, index) in tableOfContents"
              :key="index"
              @click="scrollToHeading(item.id)"
              class="cursor-pointer rounded p-2 text-xs transition-colors hover:bg-base-200"
              :class="[getTreeHeadingClass(item.level), getActiveHeadingClass(item.id)]"
            >
              <span class="text-base-content">{{ item.text }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile backdrop -->
    <div
      v-if="!isLoading && showTableOfContents && isTableOfContentsOpen && !showDraw"
      @click="toggleTableOfContents"
      class="fixed inset-0 z-30 bg-black/20 2xl:hidden"
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
const activeHeadingId = ref(null);

// Check if screen is large enough for auto-open
const isLargeScreen = ref(false);

/**
 * Use the centralized Quill content processor with lazy loading
 */
const processedContent = useProcessedQuillContent(
  contentRef,
  computed(() => (contentShouldLoad.value ? write.value.content : ''))
);

/**
 * Format date for display
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const monthNames = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

/**
 * Format number for display
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
const formatNumber = (num) => {
  return new Intl.NumberFormat('tr-TR').format(num);
};

/**
 * Navigate to edit page
 */
const editWrite = () => {
  router.visit(route('writes.edit', write.value.id));
};

/**
 * Intersection Observer for lazy loading content
 */
let contentObserver = null;

/**
 * Handle content after component mount
 */
onMounted(() => {
  // Check screen size for auto-open
  isLargeScreen.value = window.innerWidth >= 1536; // 2xl breakpoint

  // Start with content loading disabled for better initial performance
  contentShouldLoad.value = false;

  // Simulate loading delay
  setTimeout(() => {
    isLoading.value = false;

    // Set up intersection observer for lazy loading
    const contentPlaceholder = document.querySelector('.content-placeholder');
    if (contentPlaceholder) {
      contentObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !contentShouldLoad.value) {
              contentShouldLoad.value = true;
              // Setup link handling after content loads
              nextTick(() => {
                setupLinkHandling();
                // Generate table of contents after content is loaded
                setTimeout(() => {
                  generateTableOfContents();
                  // Auto-open on large screens
                  if (isLargeScreen.value && tableOfContents.value.length > 0) {
                    isTableOfContentsOpen.value = true;
                  }
                }, 100);
              });
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '50px',
        }
      );

      contentObserver.observe(contentPlaceholder);
    } else {
      // Fallback: load content immediately if no placeholder
      contentShouldLoad.value = true;
      nextTick(() => {
        setupLinkHandling();
        // Generate table of contents after content is loaded
        setTimeout(() => {
          generateTableOfContents();
          // Auto-open on large screens
          if (isLargeScreen.value && tableOfContents.value.length > 0) {
            isTableOfContentsOpen.value = true;
          }
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
        level: level,
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
      },
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
    // Set active heading immediately for better UX
    activeHeadingId.value = id;

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
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
 * Get CSS class for tree-style heading level (ağaç dal tasarımı)
 */
const getTreeHeadingClass = (level) => {
  switch (level) {
    case 1:
      return 'pl-0';
    case 2:
      return 'pl-4 relative before:absolute before:left-0 before:top-1/2 before:h-px before:w-3 before:bg-base-300 before:-translate-y-1/2';
    case 3:
      return 'pl-8 relative before:absolute before:left-0 before:top-1/2 before:h-px before:w-3 before:bg-base-300 before:-translate-y-1/2 after:absolute after:left-0 after:top-0 after:h-full after:w-px after:bg-base-300';
    case 4:
      return 'pl-12 relative before:absolute before:left-0 before:top-1/2 before:h-px before:w-3 before:bg-base-300 before:-translate-y-1/2 after:absolute after:left-0 after:top-0 after:h-full after:w-px after:bg-base-300';
    case 5:
      return 'pl-16 relative before:absolute before:left-0 before:top-1/2 before:h-px before:w-3 before:bg-base-300 before:-translate-y-1/2 after:absolute after:left-0 after:top-0 after:h-full after:w-px after:bg-base-300';
    case 6:
      return 'pl-20 relative before:absolute before:left-0 before:top-1/2 before:h-px before:w-3 before:bg-base-300 before:-translate-y-1/2 after:absolute after:left-0 after:top-0 after:h-full after:w-px after:bg-base-300';
    default:
      return 'pl-0';
  }
};

/**
 * Get CSS class for active heading (sade tasarım)
 */
const getActiveHeadingClass = (headingId) => {
  return activeHeadingId.value === headingId
    ? 'bg-base-content/10 text-base-content border-l-2 border-base-content'
    : '';
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
watch(
  processedContent,
  () => {
    if (contentShouldLoad.value && processedContent.value) {
      nextTick(() => {
        generateTableOfContents();
      });
    }
  },
  { flush: 'post' }
);

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

/* Content container - minimal */
.content-container {
  contain: layout;
}

/* Table of Contents styles */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
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

/* Draw view full height */
.h-screen {
  height: 100vh;
  height: 100dvh; /* Dynamic viewport height for mobile */
}
</style>
