<template>
  <CheckScreen>
    <div class="card-body p-6">
      <div class="mb-6 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold">{{ version.version }}</h1>
          <p class="text-sm text-gray-500">
            <span class="badge badge-neutral">{{ formatDate(version.release_date) }}</span>
          </p>
        </div>
        <Link v-if="props.auth.user" :href="`/versions/${version.id}/edit`" class="btn btn-outline btn-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mr-1 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          Düzenle
        </Link>
      </div>

      <!-- Description -->
      <div class="mb-6">
        <h2 class="mb-2 text-lg font-semibold">Açıklama</h2>
        <div class="min-h-[80px] whitespace-pre-wrap rounded-lg bg-base-200 p-4">
          {{ version.description ? version.description : 'Açıklama yok' }}
        </div>
      </div>

      <div class="divider"></div>

      <!-- Features -->
      <div class="mb-6">
        <h2 class="mb-4 text-lg font-semibold">Yeni Özellikler</h2>

        <div v-if="!version.features || version.features.length === 0" class="alert alert-info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="h-6 w-6 shrink-0 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>Bu versiyonda yeni özellik bulunmamaktadır.</span>
        </div>

        <div v-for="(feature, index) in version.features" :key="`feature-${index}`" class="mb-4">
          <div class="rounded-lg border border-base-300 p-4">
            <div class="flex items-center">
              <div class="bg-success/20 mr-3 rounded-full p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-success"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 class="text-md font-semibold">{{ feature.feature_name }}</h3>
            </div>
            <div class="mt-3 pl-10">
              <p class="whitespace-pre-wrap text-gray-600">{{ feature.feature_detail }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="divider"></div>

      <!-- Bugs -->
      <div>
        <h2 class="mb-4 text-lg font-semibold">Düzeltilen Hatalar</h2>

        <div v-if="!version.bugs || version.bugs.length === 0" class="alert alert-info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="h-6 w-6 shrink-0 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>Bu versiyonda düzeltilen hata bulunmamaktadır.</span>
        </div>

        <div v-for="(bug, index) in version.bugs" :key="`bug-${index}`" class="mb-4">
          <div class="rounded-lg border border-base-300 p-4">
            <div class="flex items-center">
              <div class="bg-error/20 mr-3 rounded-full p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-error"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 class="text-md font-semibold">{{ bug.bug_name }}</h3>
            </div>
            <div class="mt-3 pl-10">
              <p class="whitespace-pre-wrap text-gray-600">{{ bug.bug_detail }}</p>
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
import { Link, usePage } from '@inertiajs/vue3';

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
