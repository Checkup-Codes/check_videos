<template>
  <CheckSubsidebar>
    <div class="space-y-2 p-2">
      <div v-if="versions && versions.length === 0" class="alert alert-info">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>Henüz versiyon bulunmamaktadır.</span>
      </div>

      <div v-for="version in versions" :key="version.id" class="transition-all duration-200 hover:scale-[1.01]">
        <Link
          :href="`/versions/${version.version}`"
          :class="[
            getLinkClasses(`/versions/${version.version}`),
            'card block rounded-lg bg-base-100 shadow-sm hover:shadow',
          ]"
        >
          <div class="p-3">
            <div class="mb-1 text-base font-semibold">
              {{ version.version }}
            </div>
            <div class="flex items-center text-sm opacity-70">
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>{{ formatDate(version.release_date) }}</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  </CheckSubsidebar>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';
import CheckSubsidebar from '@/Components/CekapUI/Slots/CheckSubsidebar.vue';
import ThemeSwitcher from '@/Components/CekapUI/Buttons/ThemeSwitcher.vue';

// Props tanımı
const props = defineProps({
  versions: {
    type: Array,
    required: true,
  },
  currentUrl: {
    type: String,
    required: true,
  },
});

// Sınıf hesaplama işlevi
const getLinkClasses = (href) => {
  return props.currentUrl === href
    ? 'border-l-2 text-primary bg-base-100'
    : 'border-l-2 border-transparent text-base-content';
};

// Tarih formatlama işlevi
function formatDate(dateString) {
  if (!dateString) return 'Tarih Yok';

  try {
    // Tarih formatını kontrol et - YYYY-MM-DD biçiminde olmalı
    const date = new Date(dateString);

    // Geçerli tarih kontrolü
    if (isNaN(date.getTime())) {
      return dateString; // Eğer geçersizse, orijinal string'i döndür
    }

    return new Intl.DateTimeFormat('tr-TR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  } catch (error) {
    console.error('Tarih formatı hatası:', error);
    return dateString; // Hata durumunda orijinal string'i döndür
  }
}
</script>
