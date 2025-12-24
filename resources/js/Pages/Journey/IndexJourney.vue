<template>
  <LayoutJourney>
    <template #screen>
      <div class="mx-auto max-w-4xl py-8">
        <!-- Hero Section -->
        <div class="mb-12 text-center">
          <h1 class="mb-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Yolculuk</h1>
        </div>

        <!-- Timeline View -->
        <div v-if="entries.length > 0" class="relative">
          <!-- Main Timeline -->
          <div class="timeline-container">
            <div v-for="[year, yearEntries] in groupedEntries" :key="year" class="year-section mb-8">
              <!-- Year Marker -->
              <div class="year-marker mb-4 flex items-center justify-center">
                <div
                  class="flex h-10 w-20 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-md"
                >
                  {{ year }}
                </div>
              </div>

              <!-- Entries Grid -->
              <div class="space-y-4">
                <div
                  v-for="(entry, index) in yearEntries"
                  :key="entry.id"
                  class="entry-card group relative"
                  :class="index % 2 === 0 ? 'lg:pr-[52%]' : 'lg:pl-[52%]'"
                >
                  <!-- Timeline Dot -->
                  <div
                    class="absolute left-1/2 top-4 hidden h-4 w-4 -translate-x-1/2 rounded-full border-4 border-primary bg-background lg:block"
                  ></div>

                  <!-- Card -->
                  <Link
                    :href="`/journey/${entry.id}`"
                    class="relative block overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-md"
                  >
                    <!-- Background Image with opacity -->
                    <div v-if="entry.image" class="absolute inset-0 opacity-10">
                      <img :src="`/storage/${entry.image}`" :alt="entry.title" class="h-full w-full object-cover" />
                    </div>

                    <!-- Content -->
                    <div class="relative p-3">
                      <!-- Date Badge -->
                      <div class="mb-2 flex items-center gap-2">
                        <span
                          class="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                        >
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
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          {{ formatDate(entry.entry_date) }}
                        </span>
                        <span
                          v-if="entry.status === 'draft'"
                          class="rounded-full bg-yellow-500/20 px-1.5 py-0.5 text-[10px] font-medium text-yellow-600 dark:text-yellow-400"
                        >
                          Taslak
                        </span>
                      </div>

                      <!-- Title -->
                      <h2
                        class="mb-1 text-base font-semibold text-foreground transition-colors group-hover:text-primary"
                      >
                        {{ entry.title }}
                      </h2>

                      <!-- Description Preview -->
                      <p v-if="entry.description" class="line-clamp-1 text-xs leading-relaxed text-muted-foreground">
                        {{ entry.description }}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <!-- Vertical Timeline Line (Desktop) -->
          <div
            class="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-primary via-primary/50 to-transparent lg:block"
          ></div>
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
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 class="mb-2 text-lg font-medium text-foreground">Henüz yolculuk kaydı yok</h3>
          <p class="text-sm text-muted-foreground">Yolculuk kayıtları eklendiğinde burada görünecek.</p>
        </div>
      </div>
    </template>
  </LayoutJourney>
</template>

<script setup>
import { computed } from 'vue';
import { Link } from '@inertiajs/vue3';
import LayoutJourney from '@/Pages/Journey/_layouts/LayoutJourney.vue';

const props = defineProps({
  entries: {
    type: Array,
    default: () => [],
  },
  entriesByYear: {
    type: Object,
    default: () => ({}),
  },
});

// Group entries by year (descending order) and sort entries within each year by entry_date descending (newest first)
// Timeline goes from top (newest) to bottom (oldest)
// Return as array of [year, entries] pairs to maintain order
const groupedEntries = computed(() => {
  // Convert to array of [year, entries] pairs, sort by year descending
  return Object.entries(props.entriesByYear || {})
    .map(([year, entries]) => [
      year,
      Array.isArray(entries)
        ? [...entries].sort((a, b) => {
            const dateA = new Date(a.entry_date);
            const dateB = new Date(b.entry_date);
            return dateB - dateA; // Descending order (newest first, oldest at bottom)
          })
        : entries,
    ])
    .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA)); // Descending order: 2025 > 2024 > 2023 (newest at top)
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

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}

/* Timeline alternating layout */
@media (min-width: 1024px) {
  .entry-card:nth-child(even) {
    text-align: right;
  }

  .entry-card:nth-child(even) .line-clamp-1,
  .entry-card:nth-child(even) h2,
  .entry-card:nth-child(even) > a > div {
    text-align: left;
  }
}
</style>
