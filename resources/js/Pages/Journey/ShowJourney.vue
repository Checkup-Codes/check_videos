<template>
  <LayoutJourney>
    <template #screen>
        <div class="mx-auto max-w-3xl py-8">
          <!-- Back Button -->
          <div class="mb-6">
            <Link
              href="/journey"
              class="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              Geri
            </Link>
          </div>

          <!-- Entry Content -->
          <article class="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <!-- Image -->
            <div v-if="entry.image" class="aspect-video overflow-hidden">
              <img
                :src="`/storage/${entry.image}`"
                :alt="entry.title"
                class="h-full w-full object-cover"
              />
            </div>

            <!-- Content -->
            <div class="p-6 sm:p-8">
              <!-- Date & Status -->
              <div class="mb-4 flex flex-wrap items-center gap-3">
                <span class="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {{ formatDate(entry.entry_date) }}
                </span>
                <span v-if="entry.status === 'draft'" class="rounded-full bg-yellow-500/20 px-3 py-1 text-sm font-medium text-yellow-600 dark:text-yellow-400">
                  Taslak
                </span>
              </div>

              <!-- Title -->
              <h1 class="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {{ entry.title }}
              </h1>

              <!-- Description -->
              <div v-if="entry.description" class="prose prose-neutral max-w-none dark:prose-invert">
                <p class="whitespace-pre-wrap text-lg leading-relaxed text-muted-foreground">
                  {{ entry.description }}
                </p>
              </div>
            </div>
          </article>

          <!-- Navigation -->
          <div class="mt-8 flex items-center justify-between">
            <Link
              v-if="prevEntry"
              :href="`/journey/${prevEntry.id}`"
              class="group flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-muted-foreground transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              <div class="text-left">
                <div class="text-xs text-muted-foreground">Önceki</div>
                <div class="text-sm font-medium text-foreground">{{ prevEntry.title }}</div>
              </div>
            </Link>
            <div v-else></div>
            <Link
              v-if="nextEntry"
              :href="`/journey/${nextEntry.id}`"
              class="group flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-sm"
            >
              <div class="text-right">
                <div class="text-xs text-muted-foreground">Sonraki</div>
                <div class="text-sm font-medium text-foreground">{{ nextEntry.title }}</div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <div v-else></div>
          </div>
        </div>
    </template>
  </LayoutJourney>
</template>

<script setup>
import { computed } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
import LayoutJourney from '@/Pages/Journey/_layouts/LayoutJourney.vue';

const props = defineProps({
  entry: {
    type: Object,
    required: true,
  },
  entries: {
    type: Array,
    default: () => [],
  },
});

// Find previous and next entries
const currentIndex = computed(() => {
  return props.entries.findIndex(e => e.id === props.entry.id);
});

// Since entries are now sorted descending (newest first), prevEntry is the next index (newer) and nextEntry is the previous index (older)
const prevEntry = computed(() => {
  if (currentIndex.value < props.entries.length - 1) {
    return props.entries[currentIndex.value + 1]; // Next in array = newer entry
  }
  return null;
});

const nextEntry = computed(() => {
  if (currentIndex.value > 0) {
    return props.entries[currentIndex.value - 1]; // Previous in array = older entry
  }
  return null;
});

// Format date
const formatDate = (dateString) => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  } catch {
    return dateString;
  }
};
</script>

