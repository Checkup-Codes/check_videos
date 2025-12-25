<template>
  <CheckScreen>
    <div class="mx-auto max-w-7xl px-4 py-8">
      <!-- Header -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="mb-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Yer İmleri</h1>
          <p v-if="selectedCategory" class="text-sm text-muted-foreground">
            {{ selectedCategory.name }} kategorisindeki yer imleri
          </p>
          <p v-else class="text-sm text-muted-foreground">Tüm yer imleriniz</p>
        </div>
      </div>

      <!-- All Bookmarks Grid (YouTube style) -->
      <div v-if="displayBookmarks.length > 0" class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div
          v-for="bookmark in displayBookmarks"
          :key="bookmark.id"
          class="group relative block overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-md"
        >
          <!-- Preview Image -->
          <div v-if="bookmark.preview_image" class="aspect-video w-full overflow-hidden bg-muted">
            <img
              :src="bookmark.preview_image"
              :alt="bookmark.name"
              class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              @error="handleImageError"
            />
          </div>
          <div v-else class="flex aspect-video items-center justify-center bg-muted">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-12 w-12 text-muted-foreground/30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
          </div>

          <!-- Hover Overlay with Edit Button (if logged in) -->
          <div
            v-if="isLoggedIn && canEdit(bookmark)"
            class="absolute inset-0 z-10 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            <Link
              :href="`/bookmarks/${bookmark.id}/edit`"
              class="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Düzenle
            </Link>
          </div>

          <!-- Content -->
          <div class="p-4">
            <div class="mb-2 flex items-center gap-2">
              <h3
                class="line-clamp-2 flex-1 text-base font-semibold text-foreground transition-colors group-hover:text-primary"
                :title="bookmark.name"
              >
                {{ bookmark.name }}
              </h3>
              <!-- Comment Tooltip Icon -->
              <div
                v-if="bookmark.my_comment"
                class="group/comment relative flex-shrink-0"
                @mouseenter="showTooltip = bookmark.id"
                @mouseleave="showTooltip = null"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 cursor-help text-muted-foreground transition-colors hover:text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <!-- Tooltip -->
                <div
                  v-if="showTooltip === bookmark.id"
                  class="absolute bottom-full right-0 z-20 mb-2 w-64 rounded-lg border border-border bg-popover p-3 text-xs text-popover-foreground shadow-lg"
                >
                  <div class="mb-1 font-semibold">Yorumum:</div>
                  <div class="whitespace-pre-wrap">{{ bookmark.my_comment }}</div>
                </div>
              </div>
            </div>
            <p v-if="bookmark.description" class="mb-2 line-clamp-2 text-sm text-muted-foreground">
              {{ bookmark.description }}
            </p>
            <div class="flex items-center justify-between gap-2">
              <a
                :href="bookmark.link"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1 text-xs text-primary transition-colors hover:text-primary/80"
              >
                <span>{{ getDomain(bookmark.link) }}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
              <div class="flex items-center gap-2">
                <!-- Extended Comment Link Button -->
                <a
                  v-if="bookmark.extended_comment_link"
                  :href="bookmark.extended_comment_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2 py-1 text-xs text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  title="Detaylı yorumu görüntüle"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Detay
                </a>
                <span v-if="bookmark.category" class="text-xs text-muted-foreground">
                  {{ bookmark.category.name }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="rounded-xl border border-dashed border-border bg-card/50 py-16 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="mx-auto mb-4 h-16 w-16 text-muted-foreground/30"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
          />
        </svg>
        <h3 class="mb-2 text-lg font-medium text-foreground">Henüz yer imi yok</h3>
        <p class="mb-4 text-sm text-muted-foreground">İlk yer iminizi ekleyerek başlayın.</p>
        <Link
          v-if="isLoggedIn"
          href="/bookmarks/create"
          class="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Yeni Yer İmi
        </Link>
      </div>
    </div>
  </CheckScreen>
</template>

<script setup>
import { computed, ref } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';

const page = usePage();

const props = defineProps({
  categories: {
    type: Array,
    default: () => [],
  },
  allBookmarks: {
    type: Array,
    default: () => [],
  },
});

// Use allBookmarks directly from props (already filtered by controller)
const displayBookmarks = computed(() => props.allBookmarks || []);

// Check if user is logged in
const isLoggedIn = computed(() => {
  return !!(page.props.auth && page.props.auth.user);
});

// Get current user
const currentUser = computed(() => {
  return page.props.auth?.user || null;
});

// Check if user can edit bookmark
const canEdit = (bookmark) => {
  if (!currentUser.value) return false;
  return bookmark.user_id === currentUser.value.id;
};

// Tooltip state
const showTooltip = ref(null);

// Get selected category from URL
const selectedCategory = computed(() => {
  const url = page.url;
  const urlObj = new URL(url, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
  const categoryId = urlObj.searchParams.get('category');
  if (!categoryId) return null;
  return props.categories.find((cat) => cat.id === categoryId) || null;
});

// Get domain from URL
const getDomain = (url) => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace('www.', '');
  } catch {
    return url;
  }
};

// Handle image error
const handleImageError = (event) => {
  event.target.style.display = 'none';
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>
