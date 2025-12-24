<template>
  <LayoutJourney>
    <template #screen>
      <CheckScreen>
        <div class="mx-auto max-w-4xl py-8">
          <!-- Hero Section -->
          <div class="mb-12 text-center">
            <h1 class="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Yolculuk
            </h1>
            <p class="mx-auto max-w-2xl text-lg text-muted-foreground">
              Zamanda bir yolculuk. Anılar, deneyimler ve öğrenilenler...
            </p>
          </div>

          <!-- Timeline View -->
          <div v-if="entries.length > 0" class="relative">
            <!-- Main Timeline -->
            <div class="timeline-container">
              <div v-for="(yearEntries, year) in groupedEntries" :key="year" class="year-section mb-16">
                <!-- Year Marker -->
                <div class="year-marker mb-8 flex items-center justify-center">
                  <div class="flex h-12 w-24 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground shadow-lg">
                    {{ year }}
                  </div>
                </div>

                <!-- Entries Grid -->
                <div class="space-y-8">
                  <div
                    v-for="(entry, index) in yearEntries"
                    :key="entry.id"
                    class="entry-card group relative"
                    :class="index % 2 === 0 ? 'lg:pr-[52%]' : 'lg:pl-[52%]'"
                  >
                    <!-- Timeline Dot -->
                    <div class="absolute left-1/2 top-8 hidden h-4 w-4 -translate-x-1/2 rounded-full border-4 border-primary bg-background lg:block"></div>

                    <!-- Card -->
                    <Link
                      :href="`/journey/${entry.id}`"
                      class="block overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg"
                    >
                      <!-- Image -->
                      <div v-if="entry.image" class="aspect-video overflow-hidden">
                        <img
                          :src="`/storage/${entry.image}`"
                          :alt="entry.title"
                          class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <!-- Content -->
                      <div class="p-5">
                        <!-- Date Badge -->
                        <div class="mb-3 flex items-center gap-2">
                          <span class="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {{ formatDate(entry.entry_date) }}
                          </span>
                          <span v-if="entry.status === 'draft'" class="rounded-full bg-yellow-500/20 px-2 py-0.5 text-xs font-medium text-yellow-600 dark:text-yellow-400">
                            Taslak
                          </span>
                        </div>

                        <!-- Title -->
                        <h2 class="mb-2 text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                          {{ entry.title }}
                        </h2>

                        <!-- Description Preview -->
                        <p v-if="entry.description" class="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                          {{ entry.description }}
                        </p>

                        <!-- Read More -->
                        <div class="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
                          <span>Devamını Oku</span>
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <!-- Vertical Timeline Line (Desktop) -->
            <div class="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-primary via-primary/50 to-transparent lg:block"></div>
          </div>

          <!-- Empty State -->
          <div v-else class="rounded-xl border border-dashed border-border bg-card/50 py-16 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto mb-4 h-16 w-16 text-muted-foreground/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 class="mb-2 text-lg font-medium text-foreground">Henüz yolculuk kaydı yok</h3>
            <p class="text-sm text-muted-foreground">Yolculuk kayıtları eklendiğinde burada görünecek.</p>
          </div>
        </div>
      </CheckScreen>
    </template>
  </LayoutJourney>
</template>

<script setup>
import { computed } from 'vue';
import { Link } from '@inertiajs/vue3';
import LayoutJourney from '@/Pages/Journey/_layouts/LayoutJourney.vue';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';

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

// Group entries by year (ascending order) and sort entries within each year by entry_date ascending (oldest first)
// Timeline goes from top (oldest) to bottom (newest)
const groupedEntries = computed(() => {
  const sorted = {};
  Object.keys(props.entriesByYear)
    .sort((a, b) => Number(a) - Number(b)) // Ascending order: 2023 < 2024 < 2025 (oldest at top)
    .forEach((year) => {
      // Sort entries within each year by entry_date ascending (oldest first, newest at bottom)
      const yearEntries = Array.isArray(props.entriesByYear[year]) 
        ? [...props.entriesByYear[year]].sort((a, b) => {
            const dateA = new Date(a.entry_date);
            const dateB = new Date(b.entry_date);
            return dateA - dateB; // Ascending order (oldest first, newest at bottom)
          })
        : props.entriesByYear[year];
      sorted[year] = yearEntries;
    });
  return sorted;
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
.line-clamp-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

/* Timeline alternating layout */
@media (min-width: 1024px) {
  .entry-card:nth-child(even) {
    text-align: right;
  }
  
  .entry-card:nth-child(even) .line-clamp-3,
  .entry-card:nth-child(even) h2,
  .entry-card:nth-child(even) > a > div:last-child {
    text-align: left;
  }
}
</style>

