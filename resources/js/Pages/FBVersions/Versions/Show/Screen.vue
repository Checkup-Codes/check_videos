<template>
  <CheckScreen>
    <div class="card-body p-4 sm:p-6">
      <div class="mb-4">
        <h1 class="text-xl font-bold sm:text-2xl">{{ version.version }}</h1>
        <p class="mt-1 text-xs text-gray-500 sm:text-sm">
          <span class="badge badge-neutral badge-sm">{{ formatDate(version.release_date) }}</span>
        </p>
      </div>

      <!-- Description -->
      <div class="mb-4">
        <h2 class="mb-1.5 text-sm font-semibold sm:text-base">Açıklama</h2>
        <div class="border-base-300/30 bg-base-50 rounded-lg border p-2 text-xs sm:text-sm">
          {{ version.description ? version.description : 'Açıklama yok' }}
        </div>
      </div>

      <div class="divider my-4"></div>

      <!-- Features -->
      <div class="mb-4">
        <h2 class="mb-2 text-sm font-semibold sm:text-base">Yeni Özellikler</h2>

        <div
          v-if="!version.features || version.features.length === 0"
          class="border-base-300/30 bg-base-50 rounded-lg border p-2 text-center"
        >
          <p class="text-base-content/50 text-xs">Bu versiyonda yeni özellik bulunmamaktadır.</p>
        </div>

        <div v-else class="space-y-1">
          <div
            v-for="(feature, index) in version.features"
            :key="`feature-${index}`"
            class="border-base-300/30 bg-base-50 flex items-start gap-2 rounded-lg border p-2 transition-colors hover:bg-base-100"
          >
            <div class="mt-0.5 shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3 w-3 text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2.5"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div class="min-w-0 flex-1">
              <h3 class="text-xs font-medium text-base-content sm:text-sm">{{ feature.feature_name }}</h3>
              <p
                v-if="feature.feature_detail"
                class="text-base-content/70 mt-0.5 whitespace-pre-wrap text-xs leading-relaxed"
              >
                {{ feature.feature_detail }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="divider my-4"></div>

      <!-- Bugs -->
      <div>
        <h2 class="mb-2 text-sm font-semibold sm:text-base">Düzeltilen Hatalar</h2>

        <div
          v-if="!version.bugs || version.bugs.length === 0"
          class="border-base-300/30 bg-base-50 rounded-lg border p-2 text-center"
        >
          <p class="text-base-content/50 text-xs">Bu versiyonda düzeltilen hata bulunmamaktadır.</p>
        </div>

        <div v-else class="space-y-1">
          <div
            v-for="(bug, index) in version.bugs"
            :key="`bug-${index}`"
            class="border-base-300/30 bg-base-50 flex items-start gap-2 rounded-lg border p-2 transition-colors hover:bg-base-100"
          >
            <div class="mt-0.5 shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3 w-3 text-error"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2.5"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div class="min-w-0 flex-1">
              <h3 class="text-xs font-medium text-base-content sm:text-sm">{{ bug.bug_name }}</h3>
              <p v-if="bug.bug_detail" class="text-base-content/70 mt-0.5 whitespace-pre-wrap text-xs leading-relaxed">
                {{ bug.bug_detail }}
              </p>
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
