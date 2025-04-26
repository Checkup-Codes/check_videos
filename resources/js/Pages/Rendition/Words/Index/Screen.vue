<template>
  <CheckScreen>
    <TopScreen title="Kelimeler" />

    <!-- Error Alert -->
    <div v-if="props.error" class="mx-6 mt-6 rounded-md bg-red-50 p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800">{{ props.error }}</h3>
        </div>
      </div>
    </div>

    <div class="p-6">
      <div class="mb-6 flex items-center justify-between">
        <div>
          <h2 class="text-xl font-bold text-gray-800">Kelime Listesi</h2>
          <p class="text-sm text-gray-600">Toplam Kelime Sayısı: {{ props.words ? props.words.length : 0 }}</p>
        </div>
        <div class="flex gap-2">
          <a
            v-if="isLoggedIn"
            :href="route('rendition.words.create')"
            class="hover:bg-black-700 focus:ring-black-500 rounded-md bg-black px-3 py-2 text-sm text-white focus:outline-none focus:ring-2"
          >
            Yeni Kelime Ekle
          </a>
        </div>
      </div>

      <!-- Arama ve Filtreleme -->
      <div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <label for="search" class="mb-1 block text-sm font-medium text-gray-700">Kelime Ara</label>
          <input
            id="search"
            v-model="searchQuery"
            type="text"
            placeholder="Kelime veya anlam ara..."
            class="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label for="language-filter" class="mb-1 block text-sm font-medium text-gray-700">Dil Filtresi</label>
          <select
            id="language-filter"
            v-model="languageFilter"
            class="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
      </div>

      <!-- Kelime Tablosu -->
      <div class="overflow-x-auto">
        <table class="min-w-full rounded-lg border border-gray-300 bg-white shadow-md">
          <thead class="bg-gray-200 text-gray-700">
            <tr>
              <th class="border-b px-4 py-3 text-left text-sm font-semibold">Kelime</th>
              <th class="border-b px-4 py-3 text-left text-sm font-semibold">Anlam</th>
              <th class="border-b px-4 py-3 text-left text-sm font-semibold">Tür</th>
              <th class="border-b px-4 py-3 text-left text-sm font-semibold">Zorluk</th>
              <th class="border-b px-4 py-3 text-left text-sm font-semibold">Öğrenme Durumu</th>
              <th v-if="isLoggedIn" class="border-b px-4 py-3 text-left text-sm font-semibold">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filteredWords.length === 0">
              <td colspan="8" class="border-b px-4 py-6 text-center text-gray-500">
                {{
                  searchQuery || languageFilter || packFilter
                    ? 'Arama kriterlerine uygun kelime bulunamadı.'
                    : 'Henüz kelime bulunmamaktadır.'
                }}
              </td>
            </tr>
            <tr v-for="word in filteredWords" :key="word.id" class="text-xs transition hover:bg-gray-100">
              <td class="border-b px-4 py-3 font-medium">{{ word?.word || '-' }}</td>
              <td class="border-b px-4 py-3">{{ word?.meaning || '-' }}</td>
              <td class="border-b px-4 py-3 capitalize">{{ word?.type || '-' }}</td>
              <td class="border-b px-4 py-3">
                {{ word?.difficulty_level ? difficultyText(word.difficulty_level) : '-' }}
              </td>
              <td class="border-b px-4 py-3">
                <span
                  class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                  :class="{
                    'bg-red-100 text-red-800': word?.learning_status === 0,
                    'bg-yellow-100 text-yellow-800': word?.learning_status === 1,
                    'bg-green-100 text-green-800': word?.learning_status === 2,
                    'bg-gray-100 text-gray-800': word?.learning_status === undefined || word?.learning_status === null,
                  }"
                >
                  {{
                    word?.learning_status !== undefined && word?.learning_status !== null
                      ? learningStatusText(word.learning_status)
                      : 'Bilinmiyor'
                  }}
                </span>
              </td>
              <td class="border-b px-4 py-3" v-if="isLoggedIn">
                <div class="flex space-x-2">
                  <a
                    v-if="word?.id"
                    :href="route('rendition.words.edit', word.id)"
                    class="rounded bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700 hover:bg-yellow-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5m-6-6l6 6M15 3l6 6"
                      />
                    </svg>
                  </a>
                  <button
                    v-if="word?.id && word?.word"
                    @click="confirmDelete(word)"
                    class="rounded bg-red-100 px-2 py-1 text-xs font-medium text-red-700 hover:bg-red-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4a1 1 0 011 1v1H9V4a1 1 0 011-1z"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Arama sonucu bulunamazsa yeni kelime ekleme önerisi -->
      <div v-if="searchQuery && filteredWords.length === 0 && isLoggedIn" class="mt-4 rounded-md bg-blue-50 p-4">
        <p class="text-blue-700">
          Aradığınız kelime bulunamadı.
          <a :href="route('rendition.words.create')" class="font-medium underline"
            >Yeni bir kelime eklemek ister misiniz?</a
          >
        </p>
      </div>
      <div v-else-if="searchQuery && filteredWords.length === 0 && !isLoggedIn" class="mt-4 rounded-md bg-blue-50 p-4">
        <p class="text-blue-700">Aradığınız kelime bulunamadı.</p>
      </div>
    </div>
  </CheckScreen>
</template>

<script setup>
import { ref, computed } from 'vue';
import { router, usePage } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Modals/CheckScreen.vue';
import TopScreen from '@/Components/CekapUI/Typography/TopScreen.vue';

const props = defineProps({
  words: Array,
  languagePacks: Array,
  screen: Object,
  error: String,
});

// Kullanıcının giriş yapıp yapmadığını kontrol et
const auth = computed(() => usePage().props.auth);
const isLoggedIn = computed(() => auth.value && auth.value.user);

// Arama ve filtreleme değişkenleri
const searchQuery = ref('');
const languageFilter = ref('');
const packFilter = ref('');

// Filtrelenmiş kelimeleri hesaplayan computed property
const filteredWords = computed(() => {
  // Add a safety check for props.words
  if (!props.words) return [];

  return props.words.filter((word) => {
    // Skip if word is not a valid object
    if (!word || typeof word !== 'object') return false;

    // Arama sorgusu filtresi
    const matchesSearch =
      !searchQuery.value.trim() ||
      (word.word && word.word.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
      (word.meaning && word.meaning.toLowerCase().includes(searchQuery.value.toLowerCase()));

    // Dil filtresi
    const matchesLanguage = !languageFilter.value || (word.language && word.language === languageFilter.value);

    // Paket filtresi - Safely check if language_packs exists
    const matchesPack =
      !packFilter.value ||
      (word.language_packs && word.language_packs.some((pack) => pack && pack.id === packFilter.value));

    return matchesSearch && matchesLanguage && matchesPack;
  });
});

// Zorluk seviyesini metne dönüştürme fonksiyonu
const difficultyText = (level) => {
  switch (level) {
    case 1:
      return 'Kolay';
    case 2:
      return 'Orta';
    case 3:
      return 'Zor';
    case 4:
      return 'Çok Zor';
    default:
      return 'Bilinmiyor';
  }
};

// Öğrenme durumunu metne dönüştürme fonksiyonu
const learningStatusText = (status) => {
  switch (status) {
    case 0:
      return 'Öğrenilmedi';
    case 1:
      return 'Öğreniliyor';
    case 2:
      return 'Öğrenildi';
    default:
      return 'Bilinmiyor';
  }
};

// Silme işlemi için onay
const confirmDelete = (word) => {
  if (confirm(`"${word.word}" kelimesini silmek istediğinize emin misiniz?`)) {
    router.delete(route('rendition.words.destroy', word.id));
  }
};
</script>
