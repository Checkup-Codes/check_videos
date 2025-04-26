<template>
  <div class="overflow-hidden rounded-lg bg-white shadow">
    <div class="border-b p-4">
      <div class="flex flex-wrap gap-4">
        <div class="min-w-[200px] flex-1">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Kelime veya anlam ara..."
            class="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div class="min-w-[200px] flex-1">
          <select
            v-model="languageFilter"
            class="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Tüm Diller</option>
            <option value="tr">Türkçe (TR)</option>
            <option value="en">İngilizce (EN)</option>
            <option value="de">Almanca (DE)</option>
            <option value="fr">Fransızca (FR)</option>
            <option value="es">İspanyolca (ES)</option>
            <option value="it">İtalyanca (IT)</option>
            <option value="ru">Rusça (RU)</option>
            <option value="ar">Arapça (AR)</option>
          </select>
        </div>
        <button
          @click="clearFilters"
          class="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Filtreleri Temizle
        </button>
      </div>
    </div>

    <!-- Yükleme Durumu -->
    <div v-if="isLoading" class="p-8 text-center">
      <div class="inline-block h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500"></div>
      <p class="mt-2 text-gray-600">Kelime listesi yükleniyor...</p>
    </div>

    <!-- Kelime Tablosu -->
    <div v-else class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Kelime</th>
            <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Anlam</th>
            <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Tür</th>
            <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Başarı Durumu
            </th>
            <th
              v-if="showActions"
              class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              İşlemler
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white">
          <tr v-if="filteredWords.length === 0" class="text-center">
            <td :colspan="showActions ? 5 : 4" class="px-6 py-4 text-sm text-gray-500">
              {{
                searchQuery || languageFilter
                  ? 'Arama kriterlerine uygun kelime bulunamadı.'
                  : 'Henüz kelime bulunmamaktadır.'
              }}
            </td>
          </tr>
          <tr v-for="word in filteredWords" :key="word.id" class="hover:bg-gray-50">
            <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{{ word?.word || '-' }}</td>
            <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{{ word?.meaning || '-' }}</td>
            <td class="whitespace-nowrap px-6 py-4 text-sm capitalize text-gray-500">{{ word?.type || '-' }}</td>
            <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
              <span :class="getSuccessColor(calculateSuccessRate(word))">
                {{ getSuccessStatus(calculateSuccessRate(word)) }}
              </span>
              <span class="ml-1 text-xs text-gray-400"> ({{ calculateSuccessRate(word) }}%) </span>
            </td>
            <td v-if="showActions" class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
              <div class="flex space-x-3">
                <a
                  v-if="word?.id"
                  :href="route('rendition.words.edit', word.id)"
                  class="text-gray-400 hover:text-blue-600"
                  title="Düzenle"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                    />
                  </svg>
                </a>
                <button
                  v-if="word?.id && word?.word"
                  @click="confirmDelete(word)"
                  class="text-gray-400 hover:text-red-600"
                  title="Sil"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fill-rule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Toplam Kelime Sayısı -->
    <div class="border-t bg-gray-50 px-6 py-4">
      <p class="text-sm text-gray-600">Toplam Kelime Sayısı: {{ filteredWords.length }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { router } from '@inertiajs/vue3';

const props = defineProps({
  words: {
    type: Array,
    required: true,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  showActions: {
    type: Boolean,
    default: true,
  },
});

const searchQuery = ref('');
const languageFilter = ref('');

// Filtrelenmiş kelimeler
const filteredWords = computed(() => {
  if (!props.words) return [];

  return props.words.filter((word) => {
    if (!word) return false;

    const matchesSearch =
      !searchQuery.value.trim() ||
      (word.word && word.word.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
      (word.meaning && word.meaning.toLowerCase().includes(searchQuery.value.toLowerCase()));

    const matchesLanguage = !languageFilter.value || (word.language && word.language === languageFilter.value);

    return matchesSearch && matchesLanguage;
  });
});

// Başarı istatistiği hesapla
const calculateSuccessRate = (word) => {
  if (!word) return 0;

  // Temel değerler
  const reviewCount = word.review_count || 0;
  const incorrectCount = word.incorrect_count || 0;
  const difficulty = word.difficulty || 1;
  const sentenceCount = word.sentences?.length || 0;

  // Doğruluk oranı (0-1 arası)
  const accuracy = reviewCount > 0 ? 1 - incorrectCount / reviewCount : 0;

  // Zorluk faktörü (1-4 arası, 1 en kolay)
  const difficultyFactor = 1 - (difficulty - 1) / 3;

  // Cümle sayısı faktörü (0-1 arası, maksimum 5 cümle)
  const sentenceFactor = Math.min(sentenceCount / 5, 1);

  // Toplam başarı puanı (0-100 arası)
  const successRate = Math.round((accuracy * 0.5 + difficultyFactor * 0.3 + sentenceFactor * 0.2) * 100);

  return successRate;
};

// Başarı durumunu metin olarak göster
const getSuccessStatus = (successRate) => {
  if (successRate >= 80) return 'Çok İyi';
  if (successRate >= 60) return 'İyi';
  if (successRate >= 40) return 'Orta';
  if (successRate >= 20) return 'Zayıf';
  return 'Çok Zayıf';
};

// Başarı durumuna göre renk
const getSuccessColor = (successRate) => {
  if (successRate >= 80) return 'text-green-600';
  if (successRate >= 60) return 'text-green-500';
  if (successRate >= 40) return 'text-yellow-500';
  if (successRate >= 20) return 'text-orange-500';
  return 'text-red-500';
};

// Silme işlemi
const confirmDelete = (word) => {
  if (confirm(`"${word.word}" kelimesini silmek istediğinize emin misiniz?`)) {
    router.delete(route('rendition.words.destroy', word.id));
  }
};

// Filtreleri temizleme
const clearFilters = () => {
  searchQuery.value = '';
  languageFilter.value = '';
};
</script>
