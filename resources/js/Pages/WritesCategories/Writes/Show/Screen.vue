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
    <div
      class="mx-auto max-w-4xl transition-all duration-300"
      :class="{
        'xl:-translate-x-[100px]': !isLoading && showTableOfContents && isTableOfContentsOpen && !showDraw,
      }"
    >
      <div class="bg-background transition-colors">
        <div class="p-6 pt-12 sm:p-8 sm:pt-16">
          <div class="mb-8">
            <div v-if="isLoading" class="space-y-3">
              <div class="skeleton h-8 w-3/4 rounded-md"></div>
              <div class="skeleton h-4 w-24 rounded-md"></div>
            </div>
            <template v-else>
              <h1 class="mb-4 text-3xl font-bold leading-tight text-foreground sm:text-4xl">{{ write.title }}</h1>
              <div class="mb-6 flex flex-wrap items-center gap-3 text-sm">
                <span class="inline-flex items-center gap-1.5 text-muted-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span class="font-medium">{{ formatDate(write.created_at) }}</span>
                </span>
                <template v-if="writeCategories.length > 0">
                  <span class="text-muted-foreground/40">•</span>
                  <div class="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <template v-for="(categoryPath, index) in writeCategories" :key="index">
                      <div class="inline-flex items-center gap-1">
                        <template v-for="(category, catIndex) in categoryPath" :key="category.id">
                          <Link
                            :href="getCategoryRoute(category)"
                            class="font-semibold text-primary transition-colors hover:underline"
                          >
                            {{ category.name }}
                          </Link>
                          <span v-if="catIndex < categoryPath.length - 1" class="text-muted-foreground/50">/</span>
                        </template>
                      </div>
                      <span v-if="index < writeCategories.length - 1" class="text-muted-foreground/40">,</span>
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

          <div v-if="!isLoading" class="mt-10 flex items-center gap-2 border-t border-border/60 pt-6">
            <div class="inline-flex items-center gap-2 rounded-md bg-muted/50 px-3 py-1.5 text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <span class="font-medium text-foreground">{{ formatNumber(write.views_count) }}</span>
              <span class="text-muted-foreground">görüntülenme</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <button
      v-if="!isLoading && showTableOfContents && !showDraw"
      @click="toggleTableOfContents"
      class="fixed right-4 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 xl:hidden"
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
      class="fixed right-0 top-12 z-40 h-[calc(100vh-3rem)] w-80 transform border-l border-border bg-popover shadow-2xl transition-transform duration-300 lg:h-[calc(100vh-5.5rem)] xl:hidden"
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
        <div ref="mobileTocScrollRef" class="flex-1 overflow-y-auto p-4">
          <div v-if="tableOfContents.length === 0" class="py-8 text-center text-sm text-muted-foreground">
            İçindekiler bulunamadı
          </div>
          <nav v-else class="space-y-0.5">
            <a
              v-for="(item, index) in tableOfContents"
              :key="index"
              :ref="(el) => setTocItemRef(el, item.id)"
              @click="
                (e) => {
                  e.preventDefault();
                  scrollToHeading(item.id);
                }
              "
              class="block cursor-pointer rounded-md px-2 py-1.5 text-sm transition-colors"
              :class="[
                getTreeHeadingClass(item.level),
                getActiveHeadingClass(item.id),
                activeHeadingId === item.id
                  ? 'bg-accent font-medium text-accent-foreground'
                  : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground',
              ]"
            >
              {{ item.text }}
            </a>
          </nav>
        </div>
      </div>
    </div>

    <button
      v-if="!isLoading && showTableOfContents && !showDraw"
      @click="toggleTableOfContents"
      class="fixed right-4 top-28 z-50 hidden h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 xl:flex"
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
      class="fixed right-4 top-28 z-30 hidden w-64 transition-all duration-300 ease-in-out xl:block"
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
        <div ref="desktopTocScrollRef" class="overflow-y-auto p-3" style="max-height: calc(100vh - 220px)">
          <div v-if="tableOfContents.length === 0" class="py-4 text-center text-xs text-muted-foreground">
            İçindekiler bulunamadı
          </div>
          <nav v-else class="space-y-0.5">
            <a
              v-for="(item, index) in tableOfContents"
              :key="index"
              :ref="(el) => setTocItemRef(el, item.id)"
              @click="
                (e) => {
                  e.preventDefault();
                  scrollToHeading(item.id);
                }
              "
              class="block cursor-pointer rounded-md px-2 py-1 text-xs transition-colors"
              :class="[
                getTreeHeadingClass(item.level),
                getActiveHeadingClass(item.id),
                activeHeadingId === item.id
                  ? 'bg-accent font-medium text-accent-foreground'
                  : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground',
              ]"
            >
              {{ item.text }}
            </a>
          </nav>
        </div>
      </div>
    </div>

    <div
      v-if="!isLoading && showTableOfContents && isTableOfContentsOpen && !showDraw"
      @click="toggleTableOfContents"
      class="fixed inset-0 z-30 bg-black/20 xl:hidden"
    ></div>
  </CheckScreen>
</template>

<script setup>
import { ref, onMounted, computed, nextTick, onUnmounted, watch, inject } from 'vue';
import { usePage, router, Link } from '@inertiajs/vue3';
import ExcalidrawComponent from '@/Components/ExcalidrawComponent.vue';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';
import '@/Shared/Css/quill-styles.css';
import { useGsapFadeIn } from '@/Pages/WritesCategories/_utils/useGsapAnimation.js';
import { useProcessedQuillContent } from '@/Pages/WritesCategories/_utils/useProcessedQuillContent.js';

defineOptions({
  name: 'ShowWriteScreen',
});

const { props } = usePage();
const write = ref(props.write || {});
const contentRef = ref(null);
const excalidrawRef = ref(null);
const showDraw = ref(false);
const contentShouldLoad = ref(false);

// Get categories from inject or props
const injectedCategories = inject('categories', null);
const allCategories = computed(() => {
  // Try inject first, then props, then empty array
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
const mobileTocScrollRef = ref(null);
const desktopTocScrollRef = ref(null);
const tocItemRefs = ref(new Map()); // Map to store refs by heading ID

const initializeTableOfContentsState = () => {
  const isLarge = window.innerWidth >= 1280; // xl breakpoint
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

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const monthNames = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

const formatNumber = (num) => {
  return new Intl.NumberFormat('tr-TR').format(num);
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

let headingObserver = null;
let scrollHandler = null;
let isScrollingProgrammatically = false;

const setupActiveHeadingTracking = () => {
  if (!contentRef.value) return;

  // Cleanup previous observers and handlers
  if (headingObserver) {
    headingObserver.disconnect();
    headingObserver = null;
  }
  if (scrollHandler) {
    window.removeEventListener('scroll', scrollHandler);
    scrollHandler = null;
  }

  // Find headings within heading-wrapper (Quill processes headings and wraps them)
  // Also check for direct headings in case they exist
  const headings = contentRef.value.querySelectorAll(
    '.heading-wrapper h1, .heading-wrapper h2, .heading-wrapper h3, .heading-wrapper h4, .heading-wrapper h5, .heading-wrapper h6, h1, h2, h3, h4, h5, h6'
  );
  if (headings.length === 0) return;

  // Header offset for sticky navigation
  const headerOffset = 80;

  // Function to update active heading based on scroll position
  const updateActiveHeading = () => {
    // Skip update if we're programmatically scrolling
    if (isScrollingProgrammatically) return;

    let currentHeading = null;
    let closestDistance = Infinity;

    // Find the heading that is currently at or just above the header offset
    headings.forEach((heading) => {
      if (!heading.id) return;

      const rect = heading.getBoundingClientRect();
      const distanceFromTop = rect.top - headerOffset;

      // If heading is at or above the header offset and visible
      if (rect.top <= headerOffset + 50 && rect.bottom > 0) {
        // Prefer headings that are at or just above the header
        if (distanceFromTop <= 50 && Math.abs(distanceFromTop) < closestDistance) {
          closestDistance = Math.abs(distanceFromTop);
          currentHeading = heading.id;
        }
      }
    });

    // If no heading found above, find the one closest to the top
    if (!currentHeading) {
      headings.forEach((heading) => {
        if (!heading.id) return;
        const rect = heading.getBoundingClientRect();
        if (rect.top < headerOffset + 200 && rect.bottom > 0) {
          const distance = Math.abs(rect.top - headerOffset);
          if (distance < closestDistance) {
            closestDistance = distance;
            currentHeading = heading.id;
          }
        }
      });
    }

    // Update active heading if found
    if (currentHeading && activeHeadingId.value !== currentHeading) {
      activeHeadingId.value = currentHeading;
    }
  };

  // Use IntersectionObserver for efficient tracking
  headingObserver = new IntersectionObserver(
    (entries) => {
      if (!isScrollingProgrammatically) {
        updateActiveHeading();
      }
    },
    {
      root: null,
      rootMargin: `-${headerOffset + 10}px 0px -60% 0px`,
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
    }
  );

  // Observe all headings (wrapper içindeki başlıklar)
  headings.forEach((heading) => {
    if (heading.id) {
      headingObserver.observe(heading);
    }
  });

  // Add scroll event listener for real-time updates
  scrollHandler = () => {
    if (!isScrollingProgrammatically) {
      updateActiveHeading();
    }
  };

  window.addEventListener('scroll', scrollHandler, { passive: true });

  // Initial update
  updateActiveHeading();
};

const generateTableOfContents = () => {
  if (!contentRef.value) return;

  // Find headings within heading-wrapper (Quill processes headings and wraps them)
  // Priority: wrapper içindeki başlıklar, sonra direkt başlıklar
  const headings = contentRef.value.querySelectorAll(
    '.heading-wrapper h1, .heading-wrapper h2, .heading-wrapper h3, .heading-wrapper h4, .heading-wrapper h5, .heading-wrapper h6, h1, h2, h3, h4, h5, h6'
  );

  const toc = [];
  const seenIds = new Set();

  headings.forEach((heading) => {
    // Get ID from the heading itself (Quill sets ID on the cloned heading inside wrapper)
    // Or try to get from anchor link href
    let headingId = heading.id;

    // If no ID, try to get from anchor link in wrapper
    if (!headingId) {
      const wrapper = heading.closest('.heading-wrapper');
      if (wrapper) {
        const anchor = wrapper.querySelector('a.heading-anchor');
        if (anchor && anchor.href) {
          headingId = anchor.href.split('#')[1];
        }
      }
    }

    // Generate unique ID if still not found
    if (!headingId) {
      const text = heading.textContent
        .trim()
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .substring(0, 50);
      headingId = text || `heading-${toc.length}`;

      // Ensure uniqueness
      let uniqueId = headingId;
      let counter = 1;
      while (seenIds.has(uniqueId)) {
        uniqueId = `${headingId}-${counter}`;
        counter++;
      }
      headingId = uniqueId;

      // Set ID on heading if it doesn't have one
      if (!heading.id) {
        heading.id = headingId;
      }
    }

    // Skip if we've already seen this ID (avoid duplicates)
    if (seenIds.has(headingId)) {
      return;
    }

    seenIds.add(headingId);

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

const toggleTableOfContents = () => {
  isTableOfContentsOpen.value = !isTableOfContentsOpen.value;
};

// Store refs for TOC items
const setTocItemRef = (el, headingId) => {
  if (el) {
    tocItemRefs.value.set(headingId, el);
  } else {
    tocItemRefs.value.delete(headingId);
  }
};

// Scroll to active item in TOC panel
const scrollToActiveTocItem = () => {
  if (!activeHeadingId.value) return;

  const activeItem = tocItemRefs.value.get(activeHeadingId.value);
  if (!activeItem) return;

  // Determine which scroll container to use based on screen size
  const scrollContainer = window.innerWidth >= 1280 ? desktopTocScrollRef.value : mobileTocScrollRef.value;
  if (!scrollContainer) return;

  // Get container and item positions
  const containerRect = scrollContainer.getBoundingClientRect();
  const itemRect = activeItem.getBoundingClientRect();

  // Calculate if item is outside visible area
  const isAboveViewport = itemRect.top < containerRect.top;
  const isBelowViewport = itemRect.bottom > containerRect.bottom;

  if (isAboveViewport || isBelowViewport) {
    // Calculate scroll position to center the item in viewport
    const scrollTop = scrollContainer.scrollTop;
    const itemOffsetTop = activeItem.offsetTop;
    const containerHeight = scrollContainer.clientHeight;
    const itemHeight = activeItem.offsetHeight;

    // Center the item in the container
    const targetScrollTop = itemOffsetTop - containerHeight / 2 + itemHeight / 2;

    scrollContainer.scrollTo({
      top: targetScrollTop,
      behavior: 'smooth',
    });
  }
};

const scrollToHeading = (headingId) => {
  if (!headingId) return;

  // Find element by ID
  let element = document.getElementById(headingId);

  // If not found, search in contentRef
  if (!element && contentRef.value) {
    element = contentRef.value.querySelector(`#${headingId}`);
  }

  // If still not found, search all headings
  if (!element && contentRef.value) {
    const allHeadings = contentRef.value.querySelectorAll(
      '.heading-wrapper h1, .heading-wrapper h2, .heading-wrapper h3, .heading-wrapper h4, .heading-wrapper h5, .heading-wrapper h6, h1, h2, h3, h4, h5, h6'
    );
    for (const heading of allHeadings) {
      if (heading.id === headingId) {
        element = heading;
        break;
      }
    }
  }

  if (!element) return;

  // Set flag and active heading
  isScrollingProgrammatically = true;
  activeHeadingId.value = headingId;

  // Scroll TOC panel to show active item
  nextTick(() => {
    scrollToActiveTocItem();
  });

  // Find the CheckScreen scroll container (the overflow-y-auto div)
  const scrollContainer = element.closest('.overflow-y-auto');
  if (scrollContainer) {
    // Calculate scroll position relative to the scroll container
    const containerRect = scrollContainer.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    const scrollTop = scrollContainer.scrollTop;
    const elementOffsetTop = elementRect.top - containerRect.top + scrollTop;
    const headerOffset = 80; // Account for sticky header

    scrollContainer.scrollTo({
      top: elementOffsetTop - headerOffset,
      behavior: 'smooth',
    });
  } else {
    // Fallback to scrollIntoView if container not found
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  // Reset flag after scroll
  setTimeout(() => {
    isScrollingProgrammatically = false;
  }, 600);

  // Close mobile menu
  if (window.innerWidth < 1280) {
    isTableOfContentsOpen.value = false;
  }
};

const getHeadingClass = (level) => {
  switch (level) {
    case 1:
      return 'border-l-4 border-primary bg-primary/5';
    case 2:
      return 'border-l-4 border-secondary bg-secondary/5 ml-4';
    case 3:
      return 'border-l-4 border-accent bg-accent/5 ml-8';
    case 4:
      return 'border-l-4 border-border bg-muted/50 ml-12';
    case 5:
      return 'border-l-4 border-border bg-muted/30 ml-16';
    case 6:
      return 'border-l-4 border-border bg-muted/20 ml-20';
    default:
      return '';
  }
};

const getTreeHeadingClass = (level) => {
  switch (level) {
    case 1:
      return 'pl-0';
    case 2:
      return 'pl-4';
    case 3:
      return 'pl-6';
    case 4:
      return 'pl-8';
    case 5:
      return 'pl-10';
    case 6:
      return 'pl-12';
    default:
      return 'pl-0';
  }
};

const getActiveHeadingClass = (headingId) => {
  return '';
};

let contentObserver = null;
let resizeHandler = null;
let beforeUnloadHandler = null;

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
    headingObserver = null;
  }
  if (scrollHandler) {
    window.removeEventListener('scroll', scrollHandler);
    scrollHandler = null;
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

// Watch activeHeadingId to scroll TOC panel to active item
watch(activeHeadingId, (newId, oldId) => {
  // Only scroll if heading changed and we're not programmatically scrolling
  if (newId && newId !== oldId && !isScrollingProgrammatically) {
    nextTick(() => {
      scrollToActiveTocItem();
    });
  }
});
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
