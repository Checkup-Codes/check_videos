<template>
  <LayoutJourney>
    <template #screen>
        <PageShell width="detail">
          <div class="mb-6">
            <h1 class="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{{ entry.title }}</h1>
            <div class="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span class="inline-flex items-center gap-1.5">
                <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{{ formatDate(entry.entry_date) }}</span>
              </span>
              <span
                v-if="entry.status === 'draft'"
                class="rounded-full bg-yellow-500/20 px-2 py-0.5 text-[10px] font-medium text-yellow-600 dark:text-yellow-400"
              >
                Taslak
              </span>
            </div>
          </div>

          <div v-if="entry.image" class="mb-8 overflow-hidden rounded-xl">
            <img
              :src="`/storage/${entry.image}`"
              :alt="entry.title"
              class="max-h-[500px] w-full object-cover"
            />
          </div>

          <div v-if="entry.description" class="mb-8">
            <p class="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground sm:text-base">
              {{ entry.description }}
            </p>
          </div>

          <div class="mt-10 flex items-center justify-between border-t border-border/60 pt-6">
            <Link
              v-if="prevEntry"
              :href="`/journey/${prevEntry.id}`"
              class="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <svg class="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              <span class="max-w-[150px] truncate sm:max-w-[200px]">{{ prevEntry.title }}</span>
            </Link>
            <div v-else></div>

            <Link
              v-if="nextEntry"
              :href="`/journey/${nextEntry.id}`"
              class="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <span class="max-w-[150px] truncate sm:max-w-[200px]">{{ nextEntry.title }}</span>
              <svg class="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <div v-else></div>
          </div>
        </PageShell>
    </template>
  </LayoutJourney>
</template>

<script setup>
import { computed } from 'vue';
import { Link } from '@inertiajs/vue3';
import LayoutJourney from '@/Pages/Journey/_layouts/LayoutJourney.vue';
import PageShell from '@/Components/CekapUI/Layout/PageShell.vue';

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

const currentIndex = computed(() => {
  return props.entries.findIndex((e) => e.id === props.entry.id);
});

const prevEntry = computed(() => {
  if (currentIndex.value < props.entries.length - 1) {
    return props.entries[currentIndex.value + 1];
  }
  return null;
});

const nextEntry = computed(() => {
  if (currentIndex.value > 0) {
    return props.entries[currentIndex.value - 1];
  }
  return null;
});

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
