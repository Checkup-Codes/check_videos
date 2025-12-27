<template>
  <LayoutJourney>
    <template #screen>
      <div class="journey-page h-full overflow-hidden bg-background">
        <!-- Main Container - Calculated height for header/sidebar -->
        <div class="flex h-full flex-col">
          <!-- Timeline Container -->
          <div class="flex-1 flex items-center overflow-hidden">
            <!-- Horizontal Scroll Container -->
            <div 
              ref="scrollContainer"
              class="w-full overflow-x-auto overflow-y-hidden hide-scrollbar px-4 sm:px-6"
              @scroll="handleScroll"
            >
              <div class="inline-flex items-start gap-3 py-4 sm:gap-4">
                <!-- Cards -->
                <div
                  v-for="(entry, index) in entries"
                  :key="entry.id"
                  :ref="el => cardRefs[index] = el"
                  :data-year="getYear(entry.entry_date)"
                  class="card-item flex-shrink-0 flex flex-col"
                  @mouseenter="hoveredIndex = index"
                  @mouseleave="hoveredIndex = null"
                >
                  <!-- Date Above Card -->
                  <div class="mb-2 text-xs font-medium text-muted-foreground">
                    {{ formatDate(entry.entry_date) }}
                  </div>

                  <Link
                    :href="`/journey/${entry.id}`"
                    class="group relative block overflow-hidden rounded-xl card-height"
                    :class="cardWidthClass"
                  >
                    <!-- Image -->
                    <div class="absolute inset-0 bg-muted">
                      <img 
                        v-if="entry.image"
                        :src="`/storage/${entry.image}`" 
                        :alt="entry.title"
                        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div v-else class="h-full w-full bg-gradient-to-br from-primary/30 to-primary/5"></div>
                    </div>

                    <!-- Gradient Overlay -->
                    <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                    <!-- Content - Bottom -->
                    <div class="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                      <h3 class="text-sm font-bold text-white line-clamp-2 sm:text-base">
                        {{ entry.title }}
                      </h3>
                    </div>

                    <!-- Draft Badge -->
                    <div v-if="entry.status === 'draft'" class="absolute right-2 top-2 z-10">
                      <span class="rounded-full bg-yellow-500/90 px-2 py-0.5 text-xs font-semibold text-yellow-950">
                        Taslak
                      </span>
                    </div>

                    <!-- Hover Border -->
                    <div class="absolute inset-0 rounded-xl border-2 border-white/0 transition-colors group-hover:border-primary/50"></div>
                  </Link>

                  <!-- Hover Description - Below Card -->
                  <div class="mt-2 h-5 overflow-hidden" :class="cardWidthClass">
                    <p 
                      class="text-xs text-muted-foreground transition-all duration-300"
                      :class="hoveredIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'"
                    >
                      {{ truncateText(entry.description, 50) }}
                    </p>
                  </div>
                </div>

                <!-- End Spacer -->
                <div class="w-4 flex-shrink-0 sm:w-6"></div>
              </div>
            </div>
          </div>

          <!-- Bottom Timeline Bar -->
          <div class="flex-shrink-0 border-t border-border bg-background/95 backdrop-blur-sm">
            <div class="px-4 py-2 sm:px-6 sm:py-3">
              <!-- Progress Bar -->
              <div class="mb-2 h-1 overflow-hidden rounded-full bg-muted">
                <div 
                  class="h-full rounded-full bg-primary transition-all duration-300"
                  :style="{ width: `${scrollProgress}%` }"
                ></div>
              </div>

              <!-- Year Pills -->
              <div class="flex items-center justify-center gap-2 overflow-x-auto hide-scrollbar">
                <button
                  v-for="year in years"
                  :key="year"
                  @click="scrollToYear(year)"
                  class="flex-shrink-0 rounded-full px-3 py-1 text-xs font-semibold transition-all"
                  :class="currentYear === year 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'"
                >
                  {{ year }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Arrows -->
        <button
          v-if="entries.length > 0"
          @click="scroll(-1)"
          class="absolute left-2 top-1/2 z-20 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 text-foreground shadow-lg backdrop-blur-sm transition-all hover:bg-background hover:scale-110 sm:left-4 sm:h-10 sm:w-10"
        >
          <svg class="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          v-if="entries.length > 0"
          @click="scroll(1)"
          class="absolute right-2 top-1/2 z-20 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 text-foreground shadow-lg backdrop-blur-sm transition-all hover:bg-background hover:scale-110 sm:right-4 sm:h-10 sm:w-10"
        >
          <svg class="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <!-- Empty State -->
        <div v-if="entries.length === 0" class="absolute inset-0 flex items-center justify-center">
          <div class="text-center">
            <div class="mx-auto mb-4 h-16 w-16 rounded-full bg-muted flex items-center justify-center">
              <svg class="h-8 w-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p class="text-muted-foreground">Henüz kayıt yok</p>
          </div>
        </div>
      </div>
    </template>
  </LayoutJourney>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
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

const scrollContainer = ref(null);
const cardRefs = ref({});
const currentYear = ref('');
const scrollProgress = ref(0);
const hoveredIndex = ref(null);

// Responsive card width class
const cardWidthClass = computed(() => {
  return 'w-[240px] sm:w-[220px] lg:w-[260px]';
});

// Get years sorted descending (newest first)
const years = computed(() => {
  return Object.keys(props.entriesByYear || {}).sort((a, b) => Number(b) - Number(a));
});

// Set initial year and scroll to start (newest entries on left)
onMounted(() => {
  if (years.value.length > 0) {
    currentYear.value = years.value[0]; // En yeni yıl (en solda)
  }
  
  // Scroll to start (newest entries - left side)
  nextTick(() => {
    if (scrollContainer.value) {
      scrollContainer.value.scrollLeft = 0;
    }
  });
  
  // Keyboard navigation
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});

const handleKeydown = (e) => {
  if (e.key === 'ArrowLeft') scroll(-1);
  if (e.key === 'ArrowRight') scroll(1);
};

// Scroll navigation
const scroll = (direction) => {
  if (!scrollContainer.value) return;
  const cardWidth = window.innerWidth < 640 ? 256 : window.innerWidth < 1024 ? 236 : 276;
  scrollContainer.value.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });
};

// Scroll to specific year
const scrollToYear = (year) => {
  const index = props.entries.findIndex(e => getYear(e.entry_date) === year);
  if (index !== -1 && cardRefs.value[index]) {
    cardRefs.value[index].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }
};

// Handle scroll to update current year and progress
const handleScroll = () => {
  if (!scrollContainer.value) return;
  
  const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.value;
  scrollProgress.value = scrollWidth > clientWidth ? (scrollLeft / (scrollWidth - clientWidth)) * 100 : 0;
  
  // Find visible card to determine current year
  const containerRect = scrollContainer.value.getBoundingClientRect();
  const centerX = containerRect.left + containerRect.width / 2;
  
  for (const [index, el] of Object.entries(cardRefs.value)) {
    if (el) {
      const rect = el.getBoundingClientRect();
      if (rect.left <= centerX && rect.right >= centerX) {
        const entry = props.entries[index];
        if (entry) {
          currentYear.value = getYear(entry.entry_date);
        }
        break;
      }
    }
  }
};

// Date helpers
const getYear = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).getFullYear().toString();
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('tr-TR', { 
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

const truncateText = (text, length) => {
  if (!text) return '';
  return text.length > length ? text.substring(0, length) + '...' : text;
};
</script>

<style scoped>
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

/* Card height - responsive */
.card-height {
  height: calc(100vh - 220px); /* Mobile: header(48px) + bottom bar(~60px) + padding + date */
}

@media (min-width: 640px) {
  .card-height {
    height: calc(100vh - 240px); /* Tablet */
  }
}

@media (min-width: 1024px) {
  .card-height {
    height: calc(100vh - 260px); /* Desktop: header(48px) + sidebar(36px) + bottom bar + padding */
  }
}
</style>
