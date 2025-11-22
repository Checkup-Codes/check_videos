<template>
  <div v-if="showDraw" class="relative h-[calc(100vh-3rem)] w-full lg:h-[calc(100vh-5.5rem)]">
    <div class="absolute left-4 top-[53px] z-10 lg:top-4">
      <button
        @click="toggleContent"
        class="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground shadow-lg transition-all hover:bg-accent"
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
    <ExcalidrawComponent ref="excalidrawRef" :write="write" />
  </div>

  <CheckScreen v-else>
    <div class="mx-auto max-w-4xl">
      <div class="bg-background transition-colors">
        <div class="p-6 pt-12 sm:p-8 sm:pt-16">
          <div class="mb-8">
            <div v-if="isLoading" class="space-y-3">
              <div class="skeleton h-8 w-3/4 rounded-md"></div>
              <div class="skeleton h-4 w-24 rounded-md"></div>
            </div>
            <template v-else>
              <h1 class="mb-2 text-2xl font-bold text-foreground sm:mb-3">{{ write.title }}</h1>
              <div class="mb-2 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs sm:mb-0">
                <span class="text-muted-foreground">{{ formatDate(write.created_at) }}</span>
                <template v-if="writeCategories.length > 0">
                  <span class="text-muted-foreground/40">•</span>
                  <div class="flex flex-wrap items-center gap-x-1.5 gap-y-1">
                    <template v-for="(categoryPath, index) in writeCategories" :key="index">
                      <div class="inline-flex items-center gap-0.5 text-muted-foreground">
                        <template v-for="(category, catIndex) in categoryPath" :key="category.id">
                          <Link
                            :href="getCategoryRoute(category)"
                            class="font-medium transition-colors hover:text-foreground"
                          >
                            {{ category.name }}
                          </Link>
                          <span v-if="catIndex < categoryPath.length - 1" class="text-muted-foreground/40">/</span>
                        </template>
                      </div>
                      <span v-if="index < writeCategories.length - 1" class="text-muted-foreground/30">,</span>
                    </template>
                  </div>
                </template>
                <template v-if="write.hasDraw || (write.writeDraws && write.writeDraws.length > 0)">
                  <span class="text-muted-foreground/40">•</span>
                  <button
                    @click="toggleContent"
                    class="inline-flex h-6 items-center justify-center gap-1 rounded-md border border-input bg-background px-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    :class="showDraw ? 'bg-accent text-accent-foreground' : ''"
                    :title="showDraw ? 'Metne Dön' : 'Çizime Git'"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="h-3 w-3"
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
                    <span class="hidden sm:inline">{{ showDraw ? 'Metne Dön' : 'Çizime Git' }}</span>
                  </button>
                </template>
                <template v-if="auth.user">
                  <span class="text-muted-foreground/40">•</span>
                  <div class="flex items-center gap-1">
                    <Link
                      :href="route('writes.edit', write.id)"
                      class="inline-flex h-6 items-center justify-center gap-1 rounded-md border border-input bg-background px-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      title="Düzenle"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="h-3 w-3"
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
                      class="inline-flex h-6 items-center justify-center gap-1 rounded-md border border-destructive/20 bg-background px-2 text-xs font-medium text-destructive transition-colors hover:bg-destructive hover:text-destructive-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      title="Sil"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="h-3 w-3"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </template>
              </div>
            </template>
          </div>

          <div v-if="isLoading" class="space-y-3">
            <div class="skeleton h-4 w-full rounded-md"></div>
            <div class="skeleton h-4 w-5/6 rounded-md"></div>
            <div class="skeleton h-4 w-4/6 rounded-md"></div>
            <div class="skeleton h-4 w-full rounded-md"></div>
            <div class="skeleton h-4 w-3/4 rounded-md"></div>
            <div class="skeleton h-4 w-5/6 rounded-md"></div>
            <div class="skeleton h-32 w-full rounded-md"></div>
            <div class="skeleton h-4 w-2/3 rounded-md"></div>
            <div class="skeleton h-4 w-full rounded-md"></div>
          </div>
          <div v-else>
            <div class="content-container">
              <div
                v-if="contentShouldLoad"
                class="article-content ql-editor"
                ref="contentRef"
                v-html="processedContent"
              ></div>
              <div v-else class="content-placeholder">
                <div class="space-y-3">
                  <div class="skeleton h-4 w-full rounded-md"></div>
                  <div class="skeleton h-4 w-5/6 rounded-md"></div>
                  <div class="skeleton h-4 w-4/6 rounded-md"></div>
                  <div class="skeleton h-4 w-full rounded-md"></div>
                  <div class="skeleton h-4 w-3/4 rounded-md"></div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="!isLoading" class="mt-8 text-sm text-muted-foreground">
            {{ formatNumber(write.views_count) }} görüntülenme
          </div>
        </div>
      </div>
    </div>

    <button
      v-if="!isLoading && showTableOfContents && !showDraw"
      @click="toggleTableOfContents"
      class="fixed right-4 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 2xl:hidden"
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

    <div
      v-if="!isLoading && showTableOfContents && !showDraw"
      class="fixed right-0 top-12 z-40 h-[calc(100vh-3rem)] w-80 transform border-l border-border bg-popover shadow-2xl transition-transform duration-300 2xl:hidden"
      :class="{ 'translate-x-full': !isTableOfContentsOpen }"
    >
      <div class="flex h-full flex-col">
        <div class="flex items-center justify-between border-b border-border p-4">
          <h3 class="text-lg font-semibold text-foreground">İçindekiler</h3>
          <button
            @click="toggleTableOfContents"
            class="inline-flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
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
          </button>
        </div>
        <div class="flex-1 overflow-y-auto p-4">
          <div v-if="tableOfContents.length === 0" class="py-8 text-center text-sm text-muted-foreground">
            İçindekiler bulunamadı
          </div>
          <div v-else class="space-y-1">
            <div
              v-for="(item, index) in tableOfContents"
              :key="index"
              @click="scrollToHeading(item.id)"
              class="cursor-pointer rounded-lg p-2 text-sm transition-colors hover:bg-accent"
              :class="[getTreeHeadingClass(item.level), getActiveHeadingClass(item.id)]"
            >
              <span class="text-foreground">{{ item.text }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <button
      v-if="!isLoading && showTableOfContents && !showDraw"
      @click="toggleTableOfContents"
      class="fixed right-4 top-28 z-50 hidden h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 2xl:flex"
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

    <div
      v-if="!isLoading && showTableOfContents && !showDraw"
      class="fixed right-4 top-28 z-30 hidden w-64 transition-all duration-300 ease-in-out 2xl:block"
      :class="isTableOfContentsOpen ? 'translate-x-0 opacity-100' : 'pointer-events-none translate-x-full opacity-0'"
    >
      <div class="rounded-lg border border-border bg-popover shadow-lg">
        <div class="flex items-center justify-between border-b border-border p-3">
          <h3 class="text-sm font-semibold text-foreground">İçindekiler</h3>
          <button
            @click="toggleTableOfContents"
            class="inline-flex h-6 w-6 items-center justify-center rounded-md text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
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
          </button>
        </div>
        <div class="overflow-y-auto p-3" style="max-height: calc(100vh - 220px)">
          <div v-if="tableOfContents.length === 0" class="py-4 text-center text-xs text-muted-foreground">
            İçindekiler bulunamadı
          </div>
          <div v-else class="space-y-1">
            <div
              v-for="(item, index) in tableOfContents"
              :key="index"
              @click="scrollToHeading(item.id)"
              class="cursor-pointer rounded p-2 text-xs transition-colors hover:bg-accent"
              :class="[getTreeHeadingClass(item.level), getActiveHeadingClass(item.id)]"
            >
              <span class="text-foreground">{{ item.text }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="!isLoading && showTableOfContents && isTableOfContentsOpen && !showDraw"
      @click="toggleTableOfContents"
      class="fixed inset-0 z-30 bg-black/20 2xl:hidden"
    ></div>
  </CheckScreen>
</template>

<script setup>
import { ref, onMounted, computed, nextTick, onUnmounted, watch, inject } from 'vue';
import { usePage, router, Link } from '@inertiajs/vue3';
import ExcalidrawComponent from '@/Components/ExcalidrawComponent.vue';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';
import '@/Shared/Css/quill-custom-styles.css';
import { useGsapFadeIn } from '@/Pages/WritesCategories/_utils/useGsapAnimation.js';
import { useProcessedQuillContent } from '@/Pages/WritesCategories/_utils/useProcessedQuillContent.js';

defineOptions({
  name: 'WriteByCategoryScreen',
});

const { props } = usePage();
const category = ref(props.category || {});
const write = ref(props.write || {});
const contentRef = ref(null);
const excalidrawRef = ref(null);
const auth = props.auth || {};
const showDraw = ref(false);
const contentShouldLoad = ref(false);

// Get categories from inject or props
const injectedCategories = inject('categories', null);
const allCategories = computed(() => {
  if (injectedCategories && Array.isArray(injectedCategories) && injectedCategories.length > 0) {
    return injectedCategories;
  }
  if (props.categories && Array.isArray(props.categories) && props.categories.length > 0) {
    return props.categories;
  }
  return [];
});

// Get category hierarchy for write
const writeCategories = computed(() => {
  if (!write.value) {
    return [];
  }

  const categories = allCategories.value;
  if (categories.length === 0) {
    return [];
  }

  const categoryPaths = [];
  const categoryIds = new Set();

  // Check for write.categories (belongsToMany relationship)
  if (write.value.categories && Array.isArray(write.value.categories) && write.value.categories.length > 0) {
    write.value.categories.forEach((category) => {
      if (category && category.id && !categoryIds.has(category.id)) {
        categoryIds.add(category.id);
        const path = getCategoryPath(category.id, categories);
        if (path.length > 0) {
          categoryPaths.push(path);
        }
      }
    });
  }

  // Check for write.category (belongsTo relationship - full object)
  if (write.value.category && write.value.category.id && !categoryIds.has(write.value.category.id)) {
    categoryIds.add(write.value.category.id);
    const path = getCategoryPath(write.value.category.id, categories);
    if (path.length > 0) {
      categoryPaths.push(path);
    }
  }

  // Check for write.category_id (belongsTo relationship - just ID)
  if (write.value.category_id && !categoryIds.has(write.value.category_id)) {
    categoryIds.add(write.value.category_id);
    const path = getCategoryPath(write.value.category_id, categories);
    if (path.length > 0) {
      categoryPaths.push(path);
    }
  }

  return categoryPaths;
});

// Get full category path (parent > child > subchild)
const getCategoryPath = (categoryId, categories) => {
  if (!categoryId || !categories || categories.length === 0) {
    return [];
  }

  const category = categories.find((cat) => cat && cat.id === categoryId);
  if (!category) {
    return [];
  }

  const path = [category];
  let currentCategory = category;

  // Build path from child to parent
  while (currentCategory && currentCategory.parent_id) {
    const parent = categories.find((cat) => cat && cat.id === currentCategory.parent_id);
    if (parent) {
      path.unshift(parent);
      currentCategory = parent;
    } else {
      break;
    }
  }

  return path;
};

// Get category route
const getCategoryRoute = (category) => {
  return route('categories.show', { category: category.slug });
};

const isTableOfContentsOpen = ref(false);
const tableOfContents = ref([]);
const showTableOfContents = ref(false);
const activeHeadingId = ref(null);
const isLargeScreen = ref(false);

const initializeTableOfContentsState = () => {
  const isLarge = window.innerWidth >= 1536;
  isLargeScreen.value = isLarge;
  if (isLarge && showTableOfContents.value && tableOfContents.value.length > 0) {
    isTableOfContentsOpen.value = true;
  } else if (!isLarge) {
    isTableOfContentsOpen.value = false;
  }
};

const isLoading = computed(() => !write.value.title);

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

let headingObserver = null;
let contentObserver = null;
let resizeHandler = null;
let beforeUnloadHandler = null;

const setupActiveHeadingTracking = () => {
  if (!contentRef.value) return;
  if (headingObserver) {
    headingObserver.disconnect();
  }
  const headings = contentRef.value.querySelectorAll('h1, h2, h3, h4, h5, h6');
  if (headings.length === 0) return;
  headingObserver = new IntersectionObserver(
    (entries) => {
      const visibleHeadings = entries.filter((entry) => entry.isIntersecting);
      if (visibleHeadings.length > 0) {
        visibleHeadings.sort((a, b) => {
          if (a.intersectionRatio !== b.intersectionRatio) {
            return b.intersectionRatio - a.intersectionRatio;
          }
          return a.boundingClientRect.top - b.boundingClientRect.top;
        });
        const topHeading = visibleHeadings[0];
        if (topHeading.target.id) {
          activeHeadingId.value = topHeading.target.id;
        }
      }
    },
    {
      rootMargin: '-20% 0px -70% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1],
    }
  );
  headings.forEach((heading) => {
    if (heading.id) {
      headingObserver.observe(heading);
    }
  });
};

onMounted(() => {
  initializeTableOfContentsState();
  resizeHandler = () => {
    initializeTableOfContentsState();
  };
  window.addEventListener('resize', resizeHandler);

  // Handle browser beforeunload event for unsaved changes
  beforeUnloadHandler = (e) => {
    if (showDraw.value && excalidrawRef.value && excalidrawRef.value.hasUnsavedChanges) {
      e.preventDefault();
      e.returnValue = 'Kaydedilmemiş değişiklikler var. Sayfadan ayrılmak istediğinizden emin misiniz?';
      return e.returnValue;
    }
  };
  window.addEventListener('beforeunload', beforeUnloadHandler);

  contentShouldLoad.value = false;
  const contentPlaceholder = document.querySelector('.content-placeholder');
  if (contentPlaceholder) {
    contentObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !contentShouldLoad.value) {
            contentShouldLoad.value = true;
            nextTick(() => {
              useGsapFadeIn(contentRef, { duration: 0.8 });
              setTimeout(() => {
                generateTableOfContents();
                if (tableOfContents.value.length > 0) {
                  setupActiveHeadingTracking();
                  if (isLargeScreen.value) {
                    isTableOfContentsOpen.value = true;
                  }
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
    contentShouldLoad.value = true;
    nextTick(() => {
      useGsapFadeIn(contentRef, { duration: 0.8 });
      setTimeout(() => {
        generateTableOfContents();
        if (tableOfContents.value.length > 0) {
          setupActiveHeadingTracking();
          if (isLargeScreen.value) {
            isTableOfContentsOpen.value = true;
          }
        }
      }, 100);
    });
  }
  const urlParams = new URLSearchParams(window.location.search);
  showDraw.value = urlParams.has('draw');

  if (write.value.content && write.value.content.includes('<img')) {
    const imgRegex = /<img[^>]+src="([^"]+)"/g;
    let match;
    while ((match = imgRegex.exec(write.value.content)) !== null) {
      const img = new Image();
      img.src = match[1];
    }
  }
});

onUnmounted(() => {
  if (contentObserver) {
    contentObserver.disconnect();
  }
  if (headingObserver) {
    headingObserver.disconnect();
  }
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler);
  }
  if (beforeUnloadHandler) {
    window.removeEventListener('beforeunload', beforeUnloadHandler);
  }
});

router.on('before', (event) => {
  // Check for unsaved changes in Excalidraw
  if (showDraw.value && excalidrawRef.value && excalidrawRef.value.hasUnsavedChanges) {
    if (!confirm('Kaydedilmemiş değişiklikler var. Sayfadan ayrılmak istediğinizden emin misiniz?')) {
      event.preventDefault();
      return;
    }
  }

  const writeListElement = document.querySelector('.write-list-container');
  if (writeListElement) {
    localStorage.setItem('writeListScrollPosition', writeListElement.scrollTop.toString());
  }
});

const generateTableOfContents = () => {
  if (!contentRef.value) return;
  const headings = contentRef.value.querySelectorAll(
    '.heading-wrapper h1, .heading-wrapper h2, .heading-wrapper h3, .heading-wrapper h4, .heading-wrapper h5, .heading-wrapper h6'
  );
  const toc = [];
  headings.forEach((heading) => {
    // Get ID from the heading or its wrapper
    const headingId =
      heading.id ||
      heading.closest('.heading-wrapper')?.querySelector('a.heading-anchor')?.href?.split('#')[1] ||
      `heading-${toc.length}`;
    if (!heading.id) {
      heading.id = headingId;
    }
    const level = parseInt(heading.tagName.charAt(1));
    const text = heading.textContent.trim();
    if (text) {
      toc.push({
        id: headingId,
        text: text,
        level: level,
      });
    }
  });
  tableOfContents.value = toc;
  showTableOfContents.value = toc.length > 0;
};

const toggleContent = () => {
  // Check for unsaved changes before switching to text view
  if (showDraw.value && excalidrawRef.value && excalidrawRef.value.hasUnsavedChanges) {
    if (!confirm('Kaydedilmemiş değişiklikler var. Metne dönmek istediğinizden emin misiniz?')) {
      return;
    }
  }

  showDraw.value = !showDraw.value;
  if (!showDraw.value && !contentShouldLoad.value) {
    contentShouldLoad.value = true;
  }
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

const scrollToHeading = (headingId) => {
  const element = document.getElementById(headingId);
  if (element) {
    activeHeadingId.value = headingId;
    // Account for header height when scrolling
    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
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

const getTreeHeadingClass = (level) => {
  switch (level) {
    case 1:
      return 'pl-0';
    case 2:
      return 'pl-4 relative before:absolute before:left-0 before:top-1/2 before:h-px before:w-3 before:bg-border before:-translate-y-1/2';
    case 3:
      return 'pl-8 relative before:absolute before:left-0 before:top-1/2 before:h-px before:w-3 before:bg-border before:-translate-y-1/2 after:absolute after:left-0 after:top-0 after:h-full after:w-px after:bg-border';
    case 4:
      return 'pl-12 relative before:absolute before:left-0 before:top-1/2 before:h-px before:w-3 before:bg-border before:-translate-y-1/2 after:absolute after:left-0 after:top-0 after:h-full after:w-px after:bg-border';
    case 5:
      return 'pl-16 relative before:absolute before:left-0 before:top-1/2 before:h-px before:w-3 before:bg-border before:-translate-y-1/2 after:absolute after:left-0 after:top-0 after:h-full after:w-px after:bg-border';
    case 6:
      return 'pl-20 relative before:absolute before:left-0 before:top-1/2 before:h-px before:w-3 before:bg-border before:-translate-y-1/2 after:absolute after:left-0 after:top-0 after:h-full after:w-px after:bg-border';
    default:
      return 'pl-0';
  }
};

const getActiveHeadingClass = (headingId) => {
  return activeHeadingId.value === headingId ? 'bg-muted/50 text-foreground border-l-2 border-primary' : '';
};

const toggleTableOfContents = () => {
  isTableOfContentsOpen.value = !isTableOfContentsOpen.value;
};

watch(
  processedContent,
  () => {
    if (contentShouldLoad.value && processedContent.value) {
      nextTick(() => {
        generateTableOfContents();
        if (tableOfContents.value.length > 0) {
          setupActiveHeadingTracking();
          if (isLargeScreen.value) {
            isTableOfContentsOpen.value = true;
          }
        }
      });
    }
  },
  { flush: 'post' }
);
</script>

<style scoped>
.skeleton {
  @apply bg-muted;
  background-image: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
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

.content-placeholder {
  min-height: 200px;
}

.content-container {
  contain: layout;
}
</style>
