<template>
  <div class="journey-timeline p-2">
    <!-- Empty State -->
    <div v-if="!hasEntries" class="flex h-32 items-center justify-center text-center text-muted-foreground">
      <div class="space-y-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="mx-auto h-8 w-8 opacity-50"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p class="text-sm">Henüz kayıt yok</p>
      </div>
    </div>

    <!-- Timeline by Year -->
    <div v-else class="space-y-6">
      <div v-for="(yearEntries, year) in sortedEntriesByYear" :key="year" class="year-group">
        <!-- Year Header -->
        <div class="mb-3 flex items-center gap-2">
          <div
            class="flex h-8 items-center rounded-full bg-primary px-3 text-xs font-bold text-primary-foreground shadow-sm"
          >
            {{ year }}
          </div>
          <div class="h-px flex-1 bg-border"></div>
        </div>

        <!-- Timeline Items -->
        <div class="relative ml-4">
          <!-- Vertical Line -->
          <div class="absolute left-2 top-0 h-full w-px bg-border"></div>

          <!-- Entries - sorted by entry_date descending (newest first) -->
          <div class="space-y-3">
            <Link
              v-for="entry in sortedYearEntries(yearEntries)"
              :key="entry.id"
              :href="`/journey/${entry.id}`"
              class="timeline-item group relative block pl-8"
            >
              <!-- Timeline Dot -->
              <div
                class="absolute left-0 top-2 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors"
                :class="
                  isActive(entry.id)
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-background group-hover:border-primary group-hover:bg-primary/10'
                "
              >
                <div
                  v-if="!isActive(entry.id)"
                  class="h-2 w-2 rounded-full bg-muted-foreground/40 group-hover:bg-primary"
                ></div>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-2.5 w-2.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="3"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <!-- Entry Card -->
              <div
                class="rounded-lg border p-3 transition-all"
                :class="
                  isActive(entry.id)
                    ? 'border-primary bg-primary text-primary-foreground shadow-md'
                    : 'border-border bg-card hover:border-primary/50 hover:shadow-sm'
                "
              >
                <!-- Date -->
                <div
                  class="mb-1 flex items-center gap-1.5 text-xs"
                  :class="isActive(entry.id) ? 'text-primary-foreground/70' : 'text-muted-foreground'"
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
                  <span>{{ formatDate(entry.entry_date) }}</span>
                  <span
                    v-if="entry.status === 'draft'"
                    class="ml-auto rounded bg-yellow-500/20 px-1.5 py-0.5 text-[10px] font-medium text-yellow-600 dark:text-yellow-400"
                  >
                    Taslak
                  </span>
                </div>

                <!-- Title -->
                <h3
                  class="line-clamp-2 text-sm font-medium leading-snug"
                  :class="isActive(entry.id) ? 'text-primary-foreground' : 'text-foreground'"
                >
                  {{ entry.title }}
                </h3>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { usePage, Link } from '@inertiajs/vue3';

const props = defineProps({
  entriesByYear: {
    type: Object,
    default: () => ({}),
  },
});

const page = usePage();

// Check if there are any entries
const hasEntries = computed(() => {
  return Object.keys(props.entriesByYear).length > 0;
});

// Sort years in ascending order (oldest first) - timeline goes from top (oldest) to bottom (newest)
const sortedEntriesByYear = computed(() => {
  const sorted = {};
  Object.keys(props.entriesByYear)
    .sort((a, b) => Number(a) - Number(b)) // Ascending order: 2023 < 2024 < 2025 (oldest at top)
    .forEach((year) => {
      // Ensure entries within each year are sorted by entry_date descending (newest first)
      const yearEntries = Array.isArray(props.entriesByYear[year])
        ? [...props.entriesByYear[year]].sort((a, b) => {
            const dateA = new Date(a.entry_date);
            const dateB = new Date(b.entry_date);
            return dateB - dateA; // Descending order (newest first)
          })
        : props.entriesByYear[year];
      sorted[year] = yearEntries;
    });
  return sorted;
});

// Sort entries within a year by entry_date ascending (oldest first) - timeline goes from top (oldest) to bottom (newest)
const sortedYearEntries = (yearEntries) => {
  if (!Array.isArray(yearEntries)) return [];
  return [...yearEntries].sort((a, b) => {
    const dateA = new Date(a.entry_date);
    const dateB = new Date(b.entry_date);
    return dateA - dateB; // Ascending order (oldest first, newest at bottom)
  });
};

// Check if entry is active
const isActive = (id) => {
  const currentUrl = page.url || window.location.pathname;
  return currentUrl.includes(`/journey/${id}`);
};

// Format date
const formatDate = (dateString) => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('tr-TR', {
      day: 'numeric',
      month: 'long',
    }).format(date);
  } catch {
    return dateString;
  }
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: 9px;
  top: 24px;
  bottom: -12px;
  width: 1px;
  background: hsl(var(--border));
}

.timeline-item:last-child::before {
  display: none;
}
</style>
