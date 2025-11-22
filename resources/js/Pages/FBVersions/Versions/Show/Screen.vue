<template>
  <CheckScreen>
    <div class="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
      <!-- Header Section -->
      <div class="mb-8">
        <div class="mb-3 flex items-center gap-3">
          <h1 class="text-2xl font-bold text-foreground sm:text-3xl">{{ version.version }}</h1>
        </div>
        <div class="flex items-center gap-2">
          <span
            class="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {{ formatDate(version.release_date) }}
          </span>
        </div>
      </div>

      <!-- Description -->
      <div v-if="version.description" class="mb-8">
        <div
          class="rounded-lg border border-border bg-card p-4 text-sm leading-relaxed text-foreground shadow-sm sm:p-5 sm:text-base"
        >
          {{ version.description }}
        </div>
      </div>

      <!-- Features Section -->
      <div class="mb-8">
        <div class="mb-4 flex items-center gap-2">
          <div class="flex h-8 w-8 items-center justify-center rounded-md bg-green-500/10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2.5"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 class="text-lg font-semibold text-foreground sm:text-xl">Yeni Özellikler</h2>
          <span
            v-if="version.features && version.features.length > 0"
            class="ml-auto rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
          >
            {{ version.features.length }}
          </span>
        </div>

        <div
          v-if="!version.features || version.features.length === 0"
          class="rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mx-auto mb-2 h-8 w-8 text-muted-foreground/50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p class="text-sm text-muted-foreground">Bu versiyonda yeni özellik bulunmamaktadır.</p>
        </div>

        <div v-else class="space-y-2">
          <div
            v-for="(feature, index) in version.features"
            :key="`feature-${index}`"
            class="group relative overflow-hidden rounded-lg border border-border bg-card p-4 transition-all duration-200 hover:border-green-500/30 hover:bg-accent hover:shadow-sm sm:p-5"
          >
            <div class="flex items-start gap-3">
              <div
                class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-green-500/10 transition-colors group-hover:bg-green-500/20"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3.5 w-3.5 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2.5"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div class="min-w-0 flex-1">
                <h3 class="mb-1 text-sm font-semibold text-foreground sm:text-base">{{ feature.feature_name }}</h3>
                <p
                  v-if="feature.feature_detail"
                  class="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground"
                >
                  {{ feature.feature_detail }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bugs Section -->
      <div>
        <div class="mb-4 flex items-center gap-2">
          <div class="flex h-8 w-8 items-center justify-center rounded-md bg-destructive/10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-destructive"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2.5"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 class="text-lg font-semibold text-foreground sm:text-xl">Düzeltilen Hatalar</h2>
          <span
            v-if="version.bugs && version.bugs.length > 0"
            class="ml-auto rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
          >
            {{ version.bugs.length }}
          </span>
        </div>

        <div
          v-if="!version.bugs || version.bugs.length === 0"
          class="rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mx-auto mb-2 h-8 w-8 text-muted-foreground/50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p class="text-sm text-muted-foreground">Bu versiyonda düzeltilen hata bulunmamaktadır.</p>
        </div>

        <div v-else class="space-y-2">
          <div
            v-for="(bug, index) in version.bugs"
            :key="`bug-${index}`"
            class="group relative overflow-hidden rounded-lg border border-border bg-card p-4 transition-all duration-200 hover:border-destructive/30 hover:bg-accent hover:shadow-sm sm:p-5"
          >
            <div class="flex items-start gap-3">
              <div
                class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-destructive/10 transition-colors group-hover:bg-destructive/20"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3.5 w-3.5 text-destructive"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2.5"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div class="min-w-0 flex-1">
                <h3 class="mb-1 text-sm font-semibold text-foreground sm:text-base">{{ bug.bug_name }}</h3>
                <p v-if="bug.bug_detail" class="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                  {{ bug.bug_detail }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </CheckScreen>
</template>

<script setup>
import { computed } from 'vue';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';
import { usePage } from '@inertiajs/vue3';

const props = usePage().props;
const version = computed(() => props.version || {});

function formatDate(dateString) {
  if (!dateString) return 'Tarih Yok';

  try {
    // Tarih formatını kontrol et
    const date = new Date(dateString);

    // Geçerli tarih kontrolü
    if (isNaN(date.getTime())) {
      return dateString; // Eğer geçersizse, orijinal string'i döndür
    }

    return new Intl.DateTimeFormat('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  } catch (error) {
    console.error('Tarih formatı hatası:', error);
    return dateString; // Hata durumunda orijinal string'i döndür
  }
}
</script>
