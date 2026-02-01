<template>
  <div class="space-y-6">
    <!-- Tabs -->
    <div class="flex gap-2 border-b border-border">
      <button
        @click="activeTab = 'added'"
        class="relative px-4 py-2 text-sm font-medium transition-colors"
        :class="activeTab === 'added' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'"
      >
        Eklenen Kelimeler
        <div v-if="activeTab === 'added'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
      </button>
      <button
        @click="activeTab = 'reviewed'"
        class="relative px-4 py-2 text-sm font-medium transition-colors"
        :class="activeTab === 'reviewed' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'"
      >
        Çalışılan Kelimeler
        <div v-if="activeTab === 'reviewed'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
      </button>
    </div>

    <!-- Summary Stats -->
    <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <div class="rounded-lg border border-border bg-card p-4">
        <div class="text-2xl font-bold text-foreground">
          {{ activeTab === 'added' ? stats.summary.totalWordsAdded : stats.summary.totalWordsReviewed }}
        </div>
        <div class="text-xs text-muted-foreground">
          {{ activeTab === 'added' ? 'Toplam Eklenen' : 'Toplam Çalışılan' }}
        </div>
      </div>
      <div class="rounded-lg border border-border bg-card p-4">
        <div class="text-2xl font-bold text-foreground">
          {{ activeTab === 'added' ? stats.summary.avgWordsAddedPerDay : stats.summary.avgWordsReviewedPerDay }}
        </div>
        <div class="text-xs text-muted-foreground">Günlük Ortalama</div>
      </div>
      <div class="rounded-lg border border-border bg-card p-4">
        <div class="text-2xl font-bold text-foreground">
          {{ stats.summary.currentStreak }}
        </div>
        <div class="text-xs text-muted-foreground">Güncel Seri</div>
      </div>
      <div class="rounded-lg border border-border bg-card p-4">
        <div class="text-2xl font-bold text-foreground">
          {{ stats.summary.longestStreak }}
        </div>
        <div class="text-xs text-muted-foreground">En Uzun Seri</div>
      </div>
    </div>

    <!-- Heatmap -->
    <div class="rounded-xl border border-border bg-card p-3 sm:p-6">
      <div class="mb-3 flex flex-col gap-2 sm:mb-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 class="text-sm font-medium text-foreground">{{ new Date().getFullYear() }} Yılı Aktivitesi</h3>
        <div class="flex items-center gap-2 text-xs text-muted-foreground">
          <span class="hidden sm:inline">Az</span>
          <div class="flex gap-0.5 sm:gap-1">
            <div class="h-2 w-2 rounded-sm sm:h-3 sm:w-3" :style="{ backgroundColor: getColor(0) }" />
            <div class="h-2 w-2 rounded-sm sm:h-3 sm:w-3" :style="{ backgroundColor: getColor(1) }" />
            <div class="h-2 w-2 rounded-sm sm:h-3 sm:w-3" :style="{ backgroundColor: getColor(5) }" />
            <div class="h-2 w-2 rounded-sm sm:h-3 sm:w-3" :style="{ backgroundColor: getColor(10) }" />
            <div class="h-2 w-2 rounded-sm sm:h-3 sm:w-3" :style="{ backgroundColor: getColor(20) }" />
          </div>
          <span class="hidden sm:inline">Çok</span>
        </div>
      </div>

      <!-- Heatmap Grid - Responsive -->
      <div class="w-full overflow-x-auto">
        <div class="inline-flex min-w-full flex-col gap-0.5 sm:gap-1">
          <!-- Month Labels -->
          <div class="flex gap-0.5 pl-4 sm:gap-1 sm:pl-8">
            <div
              v-for="(month, index) in monthLabels"
              :key="index"
              class="text-[10px] text-muted-foreground sm:text-xs"
              :style="{ width: month.width + 'px', textAlign: 'left' }"
            >
              {{ month.label }}
            </div>
          </div>

          <!-- Grid -->
          <div class="flex gap-0.5 sm:gap-1">
            <!-- Day Labels -->
            <div class="flex flex-col justify-around text-[10px] text-muted-foreground sm:text-xs">
              <div>Pzt</div>
              <div class="hidden sm:block">Çar</div>
              <div>Cum</div>
            </div>

            <!-- Weeks -->
            <div class="flex gap-0.5 sm:gap-1">
              <div
                v-for="(week, weekIndex) in weeks"
                :key="weekIndex"
                class="flex flex-col gap-0.5 sm:gap-1"
              >
                <div
                  v-for="(day, dayIndex) in week"
                  :key="dayIndex"
                  class="group relative h-2 w-2 rounded-[2px] transition-all sm:h-3 sm:w-3 sm:rounded-sm"
                  :class="day && !day.is_future ? 'hover:ring-1 hover:ring-primary sm:hover:ring-2 cursor-pointer' : day?.is_future ? 'cursor-not-allowed opacity-60' : ''"
                  :style="{ backgroundColor: getCellColor(day) }"
                  @mouseenter="day && !day.is_future ? showTooltip(day, $event) : null"
                  @mouseleave="hideTooltip"
                  @touchstart="day && !day.is_future ? showTooltip(day, $event) : null"
                  @touchend="hideTooltip"
                >
                  <!-- Lock icon for future dates (only on desktop) -->
                  <div v-if="day?.is_future" class="absolute inset-0 hidden items-center justify-center sm:flex">
                    <svg class="h-1.5 w-1.5 text-muted-foreground/40" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  
                  <!-- Tooltip (only for past dates) -->
                  <div
                    v-if="!day?.is_future && tooltip.show && tooltip.day === day"
                    class="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-lg"
                  >
                    <div class="font-medium text-foreground">
                      {{ formatDate(day.date) }}
                    </div>
                    <div class="text-muted-foreground">
                      {{ activeTab === 'added' ? day.added : day.reviewed }} kelime
                      {{ activeTab === 'added' ? 'eklendi' : 'çalışıldı' }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  stats: {
    type: Object,
    required: true,
  },
});

const activeTab = ref('added');
const tooltip = ref({
  show: false,
  day: null,
});
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1024);

// Update window width on resize
const updateWidth = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', updateWidth);
  }
});

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', updateWidth);
  }
});

// Organize data into weeks (7 days per week, starting from Monday)
const weeks = computed(() => {
  const data = props.stats.data || [];
  const result = [];
  let currentWeek = [];

  data.forEach((day, index) => {
    const date = new Date(day.date);
    const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, ...

    // Convert to Monday-based (0 = Monday, 6 = Sunday)
    const mondayBased = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    // Fill empty days at the start of first week
    if (index === 0 && mondayBased > 0) {
      for (let i = 0; i < mondayBased; i++) {
        currentWeek.push(null);
      }
    }

    currentWeek.push(day);

    // Start new week on Sunday
    if (mondayBased === 6 || index === data.length - 1) {
      // Fill empty days at the end of last week
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      result.push(currentWeek);
      currentWeek = [];
    }
  });

  return result;
});

// Month labels for the top
const monthLabels = computed(() => {
  const data = props.stats.data || [];
  const labels = [];
  let currentMonth = null;
  let weekCount = 0;

  weeks.value.forEach((week) => {
    const firstDay = week.find((d) => d !== null);
    if (firstDay) {
      const date = new Date(firstDay.date);
      const month = date.toLocaleDateString('tr-TR', { month: 'short' });

      if (month !== currentMonth) {
        labels.push({
          label: month,
          width: 12, // Will be adjusted
          weekIndex: weekCount,
        });
        currentMonth = month;
      }
    }
    weekCount++;
  });

  // Calculate widths
  labels.forEach((label, index) => {
    const nextIndex = index + 1 < labels.length ? labels[index + 1].weekIndex : weeks.value.length;
    // Mobilde 10px (8px cell + 2px gap), desktop'ta 16px (12px cell + 4px gap)
    const cellWidth = windowWidth.value < 640 ? 10 : 16;
    label.width = (nextIndex - label.weekIndex) * cellWidth;
  });

  return labels;
});

// Get color based on count
const getColor = (count) => {
  if (count === 0) return 'rgb(var(--muted) / 0.3)';
  if (count <= 2) return 'rgb(34, 197, 94, 0.3)'; // green-500/30
  if (count <= 5) return 'rgb(34, 197, 94, 0.5)'; // green-500/50
  if (count <= 10) return 'rgb(34, 197, 94, 0.7)'; // green-500/70
  return 'rgb(34, 197, 94, 1)'; // green-500
};

const getCellColor = (day) => {
  if (!day) return 'transparent';
  
  // Gelecek günler için kilitli görünüm
  if (day.is_future) {
    return 'rgb(var(--muted) / 0.15)';
  }
  
  const count = activeTab.value === 'added' ? day.added : day.reviewed;
  return getColor(count);
};

const showTooltip = (day, event) => {
  if (!day) return;
  tooltip.value = {
    show: true,
    day: day,
  };
};

const hideTooltip = () => {
  tooltip.value.show = false;
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};
</script>
