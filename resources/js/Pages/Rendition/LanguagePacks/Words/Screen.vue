<template>
  <CheckScreen>
    <TopScreen :title="`${languagePack.name} - Kelimeler`" />

    <div class="p-4">
      <div class="mb-4 flex justify-between">
        <div>
          <h2 class="text-xl font-bold text-gray-800">{{ languagePack.name }}</h2>
          <p class="text-sm text-gray-600">{{ languagePack.description }}</p>
          <p class="mt-1 text-sm text-gray-600">
            <span class="font-medium">Dil:</span> {{ getLanguageName(languagePack.language) }}
          </p>
        </div>
        <div class="flex space-x-2">
          <button
            v-if="isLoggedIn"
            @click="fetchAvailableWords"
            class="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Kelime Ekle
          </button>
          <a
            :href="route('rendition.language-packs.export', languagePack.id)"
            class="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Dışa Aktar
          </a>
          <a
            :href="route('rendition.language-packs.index')"
            class="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Geri Dön
          </a>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full rounded-lg border border-gray-300 bg-white shadow-md">
          <thead class="bg-gray-200 text-gray-700">
            <tr>
              <th class="border-b px-4 py-3 text-left text-sm font-semibold">Kelime</th>
              <th class="border-b px-4 py-3 text-left text-sm font-semibold">Anlam</th>
              <th class="border-b px-4 py-3 text-left text-sm font-semibold">Tür</th>
              <th class="border-b px-4 py-3 text-left text-sm font-semibold">Zorluk</th>
              <th class="border-b px-4 py-3 text-left text-sm font-semibold">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="!languagePack.words || languagePack.words.length === 0">
              <td colspan="5" class="border-b px-4 py-6 text-center text-gray-500">
                Bu dil paketinde henüz kelime bulunmamaktadır. Kelime ekleyin.
              </td>
            </tr>
            <tr v-for="word in languagePack.words" :key="word.id" class="transition hover:bg-gray-100">
              <td class="border-b px-4 py-3 font-medium">{{ word.word }}</td>
              <td class="border-b px-4 py-3">{{ word.meaning }}</td>
              <td class="border-b px-4 py-3 capitalize">{{ word.type }}</td>
              <td class="border-b px-4 py-3">{{ difficultyText(word.difficulty_level) }}</td>
              <td class="border-b px-4 py-3">
                <button
                  v-if="isLoggedIn"
                  @click="removeWord(word)"
                  class="rounded bg-red-100 px-2 py-1 text-xs font-medium text-red-700 hover:bg-red-200"
                >
                  Kaldır
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Kelime Ekleme Modal -->
    <div v-if="showAddWordsModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg">
        <div class="mb-4 flex items-center justify-between">
          <h3 class="text-lg font-bold">Kelime Ekle</h3>
          <button @click="showAddWordsModal = false" class="text-gray-500 hover:text-gray-700">
            <svg
              class="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Arama Filtresi -->
        <div class="mb-4">
          <label class="mb-1 block text-sm font-medium text-gray-700">Kelime Ara</label>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Kelime veya anlam ara..."
            class="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div class="mb-4">
          <label class="mb-1 block text-sm font-medium text-gray-700">Kelimeler</label>
          <div v-if="loading" class="flex justify-center py-4">
            <div class="h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
          </div>
          <div v-else-if="availableWords.length === 0" class="py-4 text-center text-gray-500">
            Eklenebilecek kelime bulunamadı. Önce yeni kelimeler ekleyin.
          </div>
          <div v-else class="max-h-60 overflow-y-auto rounded-md border border-gray-300 p-2">
            <div
              v-for="word in filteredAvailableWords"
              :key="word.id"
              class="flex items-center rounded px-2 py-1 hover:bg-gray-100"
            >
              <input
                :id="`word-${word.id}`"
                v-model="selectedWords"
                :value="word.id"
                type="checkbox"
                class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label :for="`word-${word.id}`" class="ml-2 block text-sm text-gray-700">
                {{ word.word }} - {{ word.meaning }} ({{ getLanguageName(word.language) }})
              </label>
            </div>
          </div>
        </div>

        <div class="flex justify-end space-x-2">
          <button
            @click="showAddWordsModal = false"
            class="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            İptal
          </button>
          <button
            @click="addWords"
            class="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            :disabled="selectedWords.length === 0 || processing"
          >
            {{ processing ? 'Ekleniyor...' : 'Ekle' }}
          </button>
        </div>
      </div>
    </div>
  </CheckScreen>
</template>

<script setup>
import { ref, computed } from 'vue';
import { router, usePage } from '@inertiajs/vue3';
import axios from 'axios';
import CheckScreen from '@/Components/CekapUI/Modals/CheckScreen.vue';
import TopScreen from '@/Components/CekapUI/Typography/TopScreen.vue';

const props = defineProps({
  languagePack: Object,
  screen: Object,
});

// Kullanıcının giriş yapıp yapmadığını kontrol et
const auth = computed(() => usePage().props.auth);
const isLoggedIn = computed(() => auth.value && auth.value.user);

const showAddWordsModal = ref(false);
const selectedWords = ref([]);
const processing = ref(false);
const loading = ref(false);
const availableWords = ref([]);
const searchQuery = ref('');

// Dil kodunu dil adına çevirme
const getLanguageName = (code) => {
  const languages = {
    tr: 'Türkçe',
    en: 'İngilizce',
    de: 'Almanca',
    fr: 'Fransızca',
    es: 'İspanyolca',
    it: 'İtalyanca',
    ru: 'Rusça',
    ar: 'Arapça',
  };

  return languages[code] || code;
};

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

// Mevcut pakette olmayan kelimeleri getir
const fetchAvailableWords = async () => {
  loading.value = true;
  showAddWordsModal.value = true;
  selectedWords.value = [];

  try {
    const response = await axios.get(route('rendition.words.available-for-pack', props.languagePack.id));
    availableWords.value = response.data;
  } catch (error) {
    console.error('Kelimeler yüklenirken hata oluştu:', error);
  } finally {
    loading.value = false;
  }
};

// Arama filtresine göre kelimeleri filtrele
const filteredAvailableWords = computed(() => {
  if (!searchQuery.value.trim()) return availableWords.value;

  return availableWords.value.filter(
    (word) =>
      word.word.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      word.meaning.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Kelime ekleme fonksiyonu
const addWords = () => {
  if (selectedWords.value.length === 0) return;

  processing.value = true;

  router.post(
    route('rendition.language-packs.add-words', props.languagePack.id),
    {
      word_ids: selectedWords.value,
    },
    {
      onSuccess: () => {
        processing.value = false;
        showAddWordsModal.value = false;
        selectedWords.value = [];
      },
      onError: () => {
        processing.value = false;
      },
    }
  );
};

// Kelime kaldırma fonksiyonu
const removeWord = (word) => {
  if (confirm(`"${word.word}" kelimesini bu paketten kaldırmak istediğinize emin misiniz?`)) {
    router.delete(route('rendition.language-packs.remove-word', [props.languagePack.id, word.id]));
  }
};
</script>
