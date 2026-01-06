<template>
  <LayoutJourney>
    <template #screen>
      <div class="min-h-screen bg-background">

        <!-- Timeline -->
        <div class="mx-auto max-w-4xl px-4 py-6 sm:px-6">
          <h1 class="xl:-translate-x-[80px] mb-6 text-2xl font-semibold text-foreground">Yolculuk</h1>

          <div 
            v-if="filteredEntries.length > 0" 
            class="relative transition-all duration-300"
            :class="{ 'xl:-translate-x-[80px]': showYearFilter && isYearFilterOpen }"
          >
            <!-- Timeline Line -->
            <div class="absolute bottom-0 left-2 top-0 w-px bg-border sm:left-3"></div>

            <!-- Entries -->
            <div class="space-y-4">
              <div
                v-for="(entry, index) in filteredEntries"
                :key="entry.id"
                class="timeline-entry relative pl-8 sm:pl-10"
              >
                <!-- Dot -->
                <div 
                  class="absolute left-0 top-3 flex h-4 w-4 items-center justify-center sm:left-1"
                >
                  <div 
                    v-if="index === 0" 
                    class="absolute h-4 w-4 animate-ping rounded-full bg-primary/20"
                  ></div>
                  <div 
                    class="relative h-2 w-2 rounded-full border border-primary bg-background"
                    :class="{ 'bg-primary': index === 0 }"
                  ></div>
                </div>

                <!-- Card -->
                <Link
                  :href="`/journey/${entry.id}`"
                  class="group block rounded-lg border border-border bg-card transition-all hover:border-primary/50 hover:shadow-sm"
                >
                  <!-- Layout: Image (if exists) + Content -->
                  <div :class="entry.image ? 'flex flex-col sm:flex-row' : ''">
                    <!-- Image Container (only if image exists) -->
                    <div v-if="entry.image" class="relative w-full flex-shrink-0 sm:w-64 md:w-72">
                      <div class="aspect-video w-full overflow-hidden rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none">
                        <img 
                          :src="`/storage/${entry.image}`" 
                          :alt="entry.title"
                          class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                      </div>
                      <!-- Status Badge on Image -->
                      <span v-if="entry.status === 'draft'" class="absolute top-2 right-2 rounded-md bg-yellow-500/90 px-1.5 py-0.5 text-xs font-medium text-yellow-900">
                        Taslak
                      </span>
                    </div>

                    <!-- Content -->
                    <div :class="entry.image ? 'flex min-w-0 flex-1 flex-col p-4' : 'p-4'">
                      <!-- Date and Status -->
                      <div class="flex items-center gap-2 text-xs text-muted-foreground">
                        <svg class="h-3 w-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{{ formatDate(entry.entry_date) }}</span>
                        <span v-if="entry.status === 'draft'" class="rounded-md bg-yellow-500/20 px-1.5 py-0.5 text-xs font-medium text-yellow-600 dark:text-yellow-400">
                          Taslak
                        </span>
                      </div>
                      
                      <!-- Title -->
                      <h3 class="mt-2 line-clamp-2 text-sm font-semibold text-foreground transition-colors group-hover:text-primary sm:text-base">
                        {{ entry.title }}
                      </h3>
                      
                      <!-- Description (if exists) -->
                      <p v-if="entry.description" class="mt-2 line-clamp-2 text-xs text-muted-foreground sm:text-sm">
                        {{ entry.description }}
                      </p>
                      
                      <!-- Arrow indicator -->
                      <div class="mt-3 flex items-center gap-1 text-xs text-muted-foreground transition-colors group-hover:text-primary">
                        <span>Devamını oku</span>
                        <svg class="h-3 w-3 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            <!-- End Marker -->
            <div class="relative mt-4 pl-8 sm:pl-10">
              <div class="absolute left-0 top-0 flex h-4 w-4 items-center justify-center sm:left-1">
                <div class="h-1.5 w-1.5 rounded-full bg-border"></div>
              </div>
              <p class="text-xs text-muted-foreground">Yolculuğun başlangıcı</p>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="py-12 text-center">
            <div class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted/50">
              <svg class="h-6 w-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p class="text-sm text-muted-foreground">
              {{ selectedYear ? `${selectedYear} yılında kayıt bulunamadı` : 'Henüz kayıt yok' }}
            </p>
          </div>
        </div>

        <!-- Stats -->
        <div v-if="entries.length > 0" class="border-t border-border bg-muted/20">
          <div class="mx-auto max-w-4xl px-4 py-4 sm:px-6">
            <div class="flex flex-wrap items-center justify-center gap-x-6 gap-y-1.5 text-xs text-muted-foreground">
              <div class="flex items-center gap-1.5">
                <div class="h-1.5 w-1.5 rounded-full bg-primary"></div>
                <span><span class="font-medium text-foreground">{{ entries.length }}</span> kayıt</span>
              </div>
              <div class="flex items-center gap-1.5">
                <div class="h-1.5 w-1.5 rounded-full bg-primary/60"></div>
                <span><span class="font-medium text-foreground">{{ years.length }}</span> yıl</span>
              </div>
              <div class="flex items-center gap-1.5">
                <div class="h-1.5 w-1.5 rounded-full bg-primary/30"></div>
                <span>{{ oldestYear }} - {{ newestYear }}</span>
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
