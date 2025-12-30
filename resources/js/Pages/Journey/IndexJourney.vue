<template>
  <LayoutJourney>
    <template #screen>
      <div class="min-h-screen bg-background">

        <!-- Timeline -->
        <div class="mx-auto max-w-4xl px-4 py-8 sm:px-6">
          <h1 class="xl:-translate-x-[80px] mb-5 text-2xl font-bold text-foreground sm:text-3xl">Yolculuk</h1>

          <div 
            v-if="filteredEntries.length > 0" 
            class="relative transition-all duration-300"
            :class="{ 'xl:-translate-x-[80px]': showYearFilter && isYearFilterOpen }"
          >
            <!-- Timeline Line -->
            <div class="absolute bottom-0 left-3 top-0 w-0.5 bg-gradient-to-b from-primary/50 via-border to-border sm:left-4"></div>

            <!-- Entries -->
            <div class="space-y-6">
              <div
                v-for="(entry, index) in filteredEntries"
                :key="entry.id"
                class="timeline-entry relative pl-10 sm:pl-12"
              >
                <!-- Dot with pulse effect for first item -->
                <div 
                  class="absolute left-1 top-4 flex h-5 w-5 items-center justify-center sm:left-2 sm:h-5 sm:w-5"
                >
                  <div 
                    v-if="index === 0" 
                    class="absolute h-5 w-5 animate-ping rounded-full bg-primary/30"
                  ></div>
                  <div 
                    class="relative h-3 w-3 rounded-full border-2 border-primary bg-background sm:h-3 sm:w-3"
                    :class="{ 'bg-primary': index === 0 }"
                  ></div>
                </div>

                <!-- Card -->
                <Link
                  :href="`/journey/${entry.id}`"
                  class="group block overflow-hidden rounded-xl bg-card ring-1 ring-border/50 transition-all duration-200 hover:ring-primary/40 hover:shadow-lg"
                >
                  <!-- Horizontal Layout: Image Left, Content Right -->
                  <div class="flex flex-col sm:flex-row">
                    <!-- Image Container -->
                    <div v-if="entry.image" class="relative w-full flex-shrink-0 sm:w-80 md:w-96 lg:w-[420px]">
                      <div class="aspect-video w-full overflow-hidden">
                        <img 
                          :src="`/storage/${entry.image}`" 
                          :alt="entry.title"
                          class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <!-- Duration/Status Badge on Image -->
                      <span v-if="entry.status === 'draft'" class="absolute bottom-2 right-2 rounded bg-yellow-500/90 px-1.5 py-0.5 text-xs font-medium text-yellow-900">
                        Taslak
                      </span>
                    </div>
                    
                    <!-- Placeholder for no image -->
                    <div v-else class="relative hidden aspect-video w-80 flex-shrink-0 items-center justify-center bg-muted/50 sm:flex md:w-96 lg:w-[420px]">
                      <svg class="h-12 w-12 text-muted-foreground/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span v-if="entry.status === 'draft'" class="absolute bottom-2 right-2 rounded bg-yellow-500/90 px-1.5 py-0.5 text-xs font-medium text-yellow-900">
                        Taslak
                      </span>
                    </div>

                    <!-- Content -->
                    <div class="flex min-w-0 flex-1 flex-col justify-center p-4 sm:p-5">
                      <!-- Date -->
                      <div class="flex items-center gap-2 text-xs text-muted-foreground">
                        <svg class="h-3.5 w-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{{ formatDate(entry.entry_date) }}</span>
                        <span v-if="entry.status === 'draft' && !entry.image" class="rounded bg-yellow-500/20 px-1.5 py-0.5 text-xs font-medium text-yellow-600 dark:text-yellow-400 sm:hidden">
                          Taslak
                        </span>
                      </div>
                      
                      <!-- Title -->
                      <h3 class="mt-2 line-clamp-2 text-base font-semibold text-foreground transition-colors group-hover:text-primary sm:text-lg">
                        {{ entry.title }}
                      </h3>
                      
                      <!-- Description (if exists) -->
                      <p v-if="entry.description" class="mt-2 line-clamp-2 text-sm text-muted-foreground">
                        {{ entry.description }}
                      </p>
                      
                      <!-- Arrow indicator -->
                      <div class="mt-3 flex items-center gap-1 text-xs text-muted-foreground transition-colors group-hover:text-primary">
                        <span>Devamını oku</span>
                        <svg class="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            <!-- End Marker -->
            <div class="relative mt-6 pl-10 sm:pl-12">
              <div class="absolute left-1 top-0 flex h-5 w-5 items-center justify-center sm:left-2">
                <div class="h-2 w-2 rounded-full bg-border"></div>
              </div>
              <p class="text-xs text-muted-foreground">Yolculuğun başlangıcı</p>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="py-16 text-center">
            <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <svg class="h-8 w-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p class="text-muted-foreground">
              {{ selectedYear ? `${selectedYear} yılında kayıt bulunamadı` : 'Henüz kayıt yok' }}
            </p>
          </div>
        </div>

        <!-- Stats -->
        <div v-if="entries.length > 0" class="border-t border-border bg-muted/30">
          <div class="mx-auto max-w-4xl px-4 py-5 sm:px-6">
            <div class="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm">
              <div class="flex items-center gap-2">
                <div class="h-2 w-2 rounded-full bg-primary"></div>
                <span class="text-muted-foreground"><strong class="text-foreground">{{ entries.length }}</strong> kayıt</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="h-2 w-2 rounded-full bg-primary/60"></div>
                <span class="text-muted-foreground"><strong class="text-foreground">{{ years.length }}</strong> yıl</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="h-2 w-2 rounded-full bg-primary/30"></div>
                <span class="text-muted-foreground">{{ oldestYear }} - {{ newestYear }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Year Filter Toggle Button - Mobile -->
      <button
        v-if="showYearFilter"
        @click="toggleYearFilter"
        class="fixed right-4 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:scale-105 xl:hidden"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
      </button>

      <!-- Year Filter Panel - Mobile -->
      <div
        v-if="showYearFilter"
        class="fixed right-0 top-12 z-40 h-[calc(100vh-3rem)] w-72 transform border-l border-border bg-popover shadow-2xl transition-transform duration-300 lg:h-[calc(100vh-5.5rem)] xl:hidden"
        :class="{ 'translate-x-full': !isYearFilterOpen }"
      >
        <div class="flex h-full flex-col">
          <div class="flex items-center justify-between border-b border-border p-4">
            <h3 class="text-lg font-semibold text-foreground">Yıllar</h3>
            <button
              @click="toggleYearFilter"
              class="inline-flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="flex-1 overflow-y-auto p-4">
            <nav class="space-y-1">
              <button
                @click="selectYear(null)"
                class="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors"
                :class="selectedYear === null 
                  ? 'bg-primary text-primary-foreground font-medium' 
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'"
              >
                <span>Tümü</span>
                <span class="text-xs opacity-70">{{ entries.length }}</span>
              </button>
              <button
                v-for="year in years"
                :key="year"
                @click="selectYear(year)"
                class="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors"
                :class="selectedYear === year 
                  ? 'bg-primary text-primary-foreground font-medium' 
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'"
              >
                <span>{{ year }}</span>
                <span class="text-xs opacity-70">{{ getYearCount(year) }}</span>
              </button>
            </nav>
          </div>
        </div>
      </div>

      <!-- Year Filter Toggle Button - Desktop -->
      <button
        v-if="showYearFilter"
        @click="toggleYearFilter"
        class="fixed right-4 top-28 z-50 hidden h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:scale-105 xl:flex"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
      </button>

      <!-- Year Filter Panel - Desktop -->
      <div
        v-if="showYearFilter"
        class="fixed right-4 top-28 z-30 hidden w-48 transition-all duration-300 ease-in-out xl:block"
        :class="isYearFilterOpen ? 'translate-x-0 opacity-100' : 'pointer-events-none translate-x-full opacity-0'"
      >
        <div class="rounded-xl border border-border bg-popover/95 shadow-xl backdrop-blur-sm">
          <div class="flex items-center justify-between border-b border-border px-4 py-3">
            <h3 class="text-sm font-semibold text-foreground">Yıllar</h3>
            <button
              @click="toggleYearFilter"
              class="inline-flex h-6 w-6 items-center justify-center rounded-md text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-3.5 w-3.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="overflow-y-auto p-2" style="max-height: calc(100vh - 200px)">
            <nav class="space-y-0.5">
              <button
                @click="selectYear(null)"
                class="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition-colors"
                :class="selectedYear === null 
                  ? 'bg-primary text-primary-foreground font-medium' 
                  : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'"
              >
                <span>Tümü</span>
                <span class="opacity-70">{{ entries.length }}</span>
              </button>
              <button
                v-for="year in years"
                :key="year"
                @click="selectYear(year)"
                class="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition-colors"
                :class="selectedYear === year 
                  ? 'bg-primary text-primary-foreground font-medium' 
                  : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'"
              >
                <span>{{ year }}</span>
                <span class="opacity-70">{{ getYearCount(year) }}</span>
              </button>
            </nav>
          </div>
        </div>
      </div>

      <!-- Backdrop for mobile -->
      <div
        v-if="showYearFilter && isYearFilterOpen"
        @click="toggleYearFilter"
        class="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm xl:hidden"
      ></div>
    </template>
  </LayoutJourney>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
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

const selectedYear = ref(null);
const isYearFilterOpen = ref(false);
const isLargeScreen = ref(false);

const years = computed(() => {
  return Object.keys(props.entriesByYear || {}).sort((a, b) => Number(b) - Number(a));
});

const showYearFilter = computed(() => years.value.length > 1);

const filteredEntries = computed(() => {
  if (!selectedYear.value) return props.entries;
  return props.entries.filter(entry => formatYear(entry.entry_date) === selectedYear.value);
});

const oldestYear = computed(() => years.value.length > 0 ? years.value[years.value.length - 1] : '-');
const newestYear = computed(() => years.value.length > 0 ? years.value[0] : '-');

const formatYear = (dateString) => {
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

const getYearCount = (year) => {
  return props.entriesByYear[year]?.length || 0;
};

const toggleYearFilter = () => {
  isYearFilterOpen.value = !isYearFilterOpen.value;
};

const selectYear = (year) => {
  selectedYear.value = year;
  if (window.innerWidth < 1280) {
    isYearFilterOpen.value = false;
  }
};

const initializeYearFilterState = () => {
  const isLarge = window.innerWidth >= 1280;
  isLargeScreen.value = isLarge;
  if (isLarge && showYearFilter.value) {
    isYearFilterOpen.value = true;
  } else if (!isLarge) {
    isYearFilterOpen.value = false;
  }
};

let resizeHandler = null;

onMounted(() => {
  initializeYearFilterState();
  resizeHandler = () => {
    initializeYearFilterState();
  };
  window.addEventListener('resize', resizeHandler);
});

onUnmounted(() => {
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler);
  }
});
</script>
