<template>
  <div class="overflow-hidden rounded-lg border bg-card shadow-sm">
    <div class="border-b border-border p-4">
      <div class="flex flex-wrap gap-4">
        <div class="min-w-[200px] flex-1">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Kelime veya anlam ara..."
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <div class="min-w-[200px] flex-1">
          <select
            v-model="languageFilter"
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
          class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        >
          Filtreleri Temizle
        </button>
      </div>
    </div>

    <!-- Yükleme Durumu -->
    <div v-if="isLoading" class="p-8 text-center">
      <div class="inline-block h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
      <p class="mt-2 text-muted-foreground">Kelime listesi yükleniyor...</p>
    </div>

    <!-- Kelime Tablosu -->
    <div v-else class="overflow-x-auto">
      <table class="min-w-full divide-y divide-border">
        <thead class="bg-muted">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Kelime</th>
            <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Anlam</th>
            <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Tür</th>
            <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Başarı Durumu
            </th>
            <th
              v-if="showActions"
              class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground"
            >
              İşlemler
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-border bg-background">
          <tr v-if="filteredWords.length === 0" class="text-center">
            <td :colspan="showActions ? 5 : 4" class="px-6 py-4 text-sm text-muted-foreground">
              {{
                searchQuery || languageFilter
                  ? 'Arama kriterlerine uygun kelime bulunamadı.'
                  : 'Henüz kelime bulunmamaktadır.'
              }}
            </td>
          </tr>
          <tr v-for="word in filteredWords" :key="word.id" class="hover:bg-muted/50">
            <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-foreground">{{ word?.word || '-' }}</td>
            <td class="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground">{{ word?.meaning || '-' }}</td>
            <td class="whitespace-nowrap px-6 py-4 text-sm capitalize text-muted-foreground">{{ word?.type || '-' }}</td>
            <td class="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground">
              <span :class="getSuccessColor(calculateSuccessRate(word))">
                {{ getSuccessStatus(calculateSuccessRate(word)) }}
              </span>
              <span class="ml-1 text-xs text-muted-foreground/70"> ({{ calculateSuccessRate(word) }}%) </span>
            </td>
            <td v-if="showActions" class="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground">
              <div class="flex space-x-3">
                <a
                  v-if="word?.id"
                  :href="route('rendition.words.edit', word.id)"
                  class="text-muted-foreground hover:text-primary transition-colors"
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
                  class="text-muted-foreground hover:text-destructive transition-colors"
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
    <div class="border-t border-border bg-muted px-6 py-4">
      <p class="text-sm text-muted-foreground">Toplam Kelime Sayısı: {{ filteredWords.length }}</p>
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
  const lastReviewDate = word.last_review_date ? new Date(word.last_review_date) : null;
  const now = new Date();

  // İnceleme sayısı faktörü (0-1 arası)
  const reviewFactor = Math.min(reviewCount / 10, 1); // 10 incelemeden sonra maksimum değere ulaşır

  // Doğruluk oranı (0-1 arası)
  const accuracy = reviewCount > 0 ? 1 - incorrectCount / reviewCount : 0;

  // Zorluk faktörü (1-4 arası, 1 en kolay)
  const difficultyFactor = 1 - (difficulty - 1) / 3;

  // Cümle sayısı faktörü (0-1 arası, maksimum 5 cümle)
  const sentenceFactor = Math.min(sentenceCount / 5, 1);

  // Son inceleme tarihi faktörü (0-1 arası, 30 gün sonra etkisi azalır)
  const daysSinceLastReview = lastReviewDate ? (now - lastReviewDate) / (1000 * 60 * 60 * 24) : 30;
  const recencyFactor = Math.max(0, 1 - daysSinceLastReview / 30);

  // Yanlış cevap ceza faktörü (0-1 arası)
  const penaltyFactor = Math.max(0, 1 - incorrectCount * 0.2); // Her yanlış cevap %20 ceza

  // Toplam başarı puanı (0-100 arası)
  const successRate = Math.round(
    (accuracy * 0.3 +
      reviewFactor * 0.2 +
      difficultyFactor * 0.15 +
      sentenceFactor * 0.15 +
      recencyFactor * 0.1 +
      penaltyFactor * 0.1) *
      100
  );

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
  if (successRate >= 80) return 'text-green-600 dark:text-green-400';
  if (successRate >= 60) return 'text-green-500 dark:text-green-400';
  if (successRate >= 40) return 'text-yellow-500 dark:text-yellow-400';
  if (successRate >= 20) return 'text-orange-500 dark:text-orange-400';
  return 'text-red-500 dark:text-red-400';
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
