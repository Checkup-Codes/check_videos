<template>
  <div class="version-list-container space-y-2 p-3">
    <!-- Empty state -->
    <div v-if="versions && versions.length === 0" class="flex h-32 items-center justify-center text-center opacity-50">
      <div>Henüz versiyon bulunmuyor</div>
    </div>

    <!-- Version List - Minimalist design like WriteList -->
    <div v-else class="space-y-2">
      <Link
        v-for="version in versions"
        :key="version.id"
        :href="`/versions/${version.version}`"
        :class="[
          'block rounded-lg p-3 transition-all duration-200',
          getLinkClasses(`/versions/${version.version}`)
            ? 'bg-base-content text-base-100'
            : 'border border-base-300 bg-base-100 hover:bg-base-300',
        ]"
      >
        <!-- Version Number -->
        <div class="mb-1">
          <h3
            class="text-sm font-medium leading-tight"
            :class="getLinkClasses(`/versions/${version.version}`) ? 'text-base-100' : 'text-base-content'"
          >
            {{ version.version }}
          </h3>
        </div>

        <!-- Meta bilgiler -->
        <div
          class="flex items-center gap-3 text-xs"
          :class="getLinkClasses(`/versions/${version.version}`) ? 'text-base-100/70' : 'text-base-content/70'"
        >
          <span class="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3 w-3 flex-shrink-0"
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
            <span class="truncate">{{ formatDate(version.release_date) }}</span>
          </span>
        </div>
      </Link>
    </div>
  </div>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';

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

// Sınıf hesaplama işlevi - aktif versiyon kontrolü
const getLinkClasses = (href) => {
  return props.currentUrl === href || props.currentUrl.startsWith(href + '/');
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
