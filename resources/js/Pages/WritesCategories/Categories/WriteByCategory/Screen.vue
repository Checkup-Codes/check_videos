<template>
  <CheckScreen>
    <div class="card border border-base-200 bg-base-100 shadow-md transition-all duration-200">
      <div class="card-body p-4 sm:p-6">
        <!-- Title and category section -->
        <div class="mb-2 sm:mb-4">
          <h1 class="break-words text-xl font-bold sm:text-2xl">{{ write.title }}</h1>
          <div class="mt-2">
            <span v-if="write.category" class="badge badge-outline text-xs">
              {{ write.category.name }}
            </span>
          </div>
        </div>

        <!-- Mobile action buttons (fixed at bottom on mobile) -->
        <div class="sticky">
          <div class="flex items-center justify-between">
            <!-- Left side: Toggle content button -->
            <button
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
            <div v-if="auth.user" class="flex gap-2">
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

        <!-- Footer metadata -->
        <div
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
import GoBackButton from '@/Components/GoBackButton.vue';
import { useGsapFadeIn } from '@/Pages/WritesCategories/_utils/useGsapAnimation.js';
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
 * Navigate to edit page
 */
const editWrite = () => {
  router.visit(route('writes.edit', { write: write.value.slug }));
};

/**
 * Handle content after component mount
 */
onMounted(() => {
  if (contentRef.value) {
    setupLinkHandling();
  }

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

  // Animate Quill content with fade-in effect on mount
  useGsapFadeIn(contentRef);
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
    router.delete(route('writes.destroy', id));
  }
};
</script>

<style>
/* İçeriğin mobil uyumlu ve düzgün görüntülenmesi için */
.content-container {
  max-width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  word-wrap: break-word;
}

.article-content {
  font-family:
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont;
  line-height: 1.6;
  overflow-wrap: break-word;
  word-break: break-word;
  max-width: 100%;
}

/* Empty paragraphs treatment */
.article-content p:empty,
.article-content p:has(br:only-child) {
  min-height: 1.5rem;
  margin-bottom: 1rem;
}

/* Improve paragraph spacing */
.article-content p {
  margin-bottom: 1rem;
}

.article-content p + p {
  margin-top: 0.5rem; /* Add extra space between consecutive paragraphs */
}

/* Improved quill-specific elements */
.article-content li[data-list='ordered'] {
  list-style-type: none !important;
  list-style-position: outside !important;
  display: block !important;
  position: relative !important;
  padding-left: 0.5rem !important;
}

.article-content li[data-list='ordered']::before {
  content: counter(list-0) '.';
  position: absolute;
  left: -1.8em;
  width: 1.8em;
  text-align: right;
}

.article-content li[data-list='bullet'] {
  list-style-type: none !important;
  list-style-position: outside !important;
  display: block !important;
  position: relative !important;
  padding-left: 0.5rem !important;
}

.article-content li[data-list='bullet']::before {
  content: '•';
  position: absolute;
  left: -1.5em;
  width: 1.5em;
  text-align: center;
}

/* Explicit hide of quill ui elements */
.article-content .ql-ui {
  display: none !important;
}

/* DIRECT MOCKUP CODE STYLING - Start */
.article-content .ql-code-block-container,
.content-container .ql-code-block-container {
  background-color: hsl(var(--n)) !important;
  color: hsl(var(--nc)) !important;
  border-radius: 0.5rem !important;
  margin: 1.5rem 0 !important;
  padding: 1rem !important;
  width: 100% !important;
  display: block !important;
  overflow: hidden !important;
  border: none !important;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
}

.article-content .ql-code-block,
.content-container .ql-code-block {
  background-color: transparent !important;
  color: hsl(var(--nc)) !important;
  padding: 0 !important;
  margin: 0 !important;
  border: none !important;
  white-space: pre-wrap !important;
  word-break: break-word !important;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
}

/* Custom mockup-code fallback */
.mockup-code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
  background-color: hsl(var(--n)) !important;
  color: hsl(var(--nc)) !important;
  border-radius: 0.5rem !important;
  padding: 1rem !important;
  white-space: pre-wrap !important;
  overflow-x: auto !important;
}

.mockup-code pre {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
  padding: 0.3rem 0.75rem !important;
  margin: 0 !important;
}

.mockup-code code {
  background-color: transparent !important;
  padding: 0 !important;
  margin: 0 !important;
  border: none !important;
  color: hsl(var(--nc)) !important;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
}
/* DIRECT MOCKUP CODE STYLING - End */

.article-content .ql-code-block-container {
  margin: 1.25rem 0;
  background-color: hsl(var(--b2));
  border-radius: 0.5rem;
  overflow: hidden;
  display: block;
  width: 100%;
  border: 1px solid hsl(var(--b3));
}

.article-content .ql-code-block {
  padding: 1rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  background-color: hsl(var(--b2));
  color: hsl(var(--bc));
  white-space: pre;
  overflow-x: auto;
  display: block;
  width: 100%;
}

.article-content p[class*='ql-align-'] {
  margin: 1rem 0;
}

.article-content span[style*='color'] {
  display: inline-block; /* Ensures color styling works properly */
}

.article-content span[style*='background-color'] {
  padding: 0.1rem 0.3rem;
  border-radius: 0.25rem;
}

.article-content .ql-font-monospace {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

/* Code element için özel tasarım - en yüksek öncelikli */
.article-content code:not(.ql-syntax *) {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace !important;
  background-color: hsl(var(--b2)) !important;
  color: hsl(var(--bc)) !important;
  border-radius: 0.35rem !important;
  border: 1px solid hsl(var(--b3)) !important;
  padding: 0.15rem 0.4rem !important;
  margin: 0 0.1rem !important;
  font-size: 0.9em !important;
  display: inline !important;
  white-space: pre-wrap !important;
  word-break: normal !important;
}

/* Skeleton animation */
.skeleton {
  background: linear-gradient(90deg, hsl(var(--b3)) 25%, hsl(var(--b2)) 50%, hsl(var(--b3)) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* Mobil için ek düzenlemeler */
@media (max-width: 640px) {
  /* İçerik alanı */
  .article-content {
    font-size: 0.95rem;
    /* Add more bottom padding to prevent content from being hidden behind fixed action bar */
    padding-bottom: 3rem;
  }

  /* Badge boyutu */
  .badge {
    font-size: 0.7rem;
  }

  /* Sticky action buttons */
  .sticky {
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  }
}
</style>
