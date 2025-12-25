<template>
  <CheckScreen>
    <div class="mx-auto max-w-3xl py-8">
      <!-- Back Button -->
      <div class="mb-6">
        <Link
          href="/bookmarks"
          class="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Geri
        </Link>
      </div>

      <!-- Bookmark Content -->
      <article class="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <!-- Preview Image -->
        <div v-if="bookmark.preview_image" class="aspect-video overflow-hidden">
          <img :src="bookmark.preview_image" :alt="bookmark.name" class="h-full w-full object-cover" />
        </div>

        <!-- Content -->
        <div class="p-6 sm:p-8">
          <!-- Category Badge -->
          <div class="mb-4">
            <span
              v-if="bookmark.category"
              class="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
            >
              {{ bookmark.category.name }}
            </span>
          </div>

          <!-- Title -->
          <h1 class="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {{ bookmark.name }}
          </h1>

          <!-- Link -->
          <div class="mb-6">
            <a
              :href="bookmark.link"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 text-primary transition-colors hover:text-primary/80"
            >
              <span>{{ getDomain(bookmark.link) }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>

          <!-- Description -->
          <div v-if="bookmark.description" class="mb-6">
            <h2 class="mb-2 text-lg font-semibold text-foreground">Açıklama</h2>
            <p class="whitespace-pre-wrap text-base leading-relaxed text-muted-foreground">
              {{ bookmark.description }}
            </p>
          </div>

          <!-- My Comment -->
          <div v-if="bookmark.my_comment" class="mb-6 rounded-lg border border-border bg-muted/50 p-4">
            <h2 class="mb-2 text-lg font-semibold text-foreground">Kendi Yorumum</h2>
            <p class="whitespace-pre-wrap text-base leading-relaxed text-foreground">
              {{ bookmark.my_comment }}
            </p>
          </div>

          <!-- Extended Comment Link -->
          <div v-if="bookmark.extended_comment_link" class="mb-6">
            <a
              :href="bookmark.extended_comment_link"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Detaylı Yorumu Görüntüle
            </a>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-3 border-t border-border pt-6">
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
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Düzenle
            </Link>
            <a
              :href="bookmark.link"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              Siteyi Aç
            </a>
          </div>
        </div>
      </article>
    </div>
  </CheckScreen>
</template>

<script setup>
import { computed } from 'vue';
import { Link } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';

const props = defineProps({
  bookmark: {
    type: Object,
    required: true,
  },
  categories: {
    type: Array,
    default: () => [],
  },
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
</script>

