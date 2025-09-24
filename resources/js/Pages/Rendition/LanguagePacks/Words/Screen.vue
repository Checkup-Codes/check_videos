<template>
  <CheckScreen>
    <TopScreen :title="`${languagePack.name} - Kelimeler`" />

    <div class="p-4">
      <div class="mb-4 flex justify-between">
        <div>
          <h2 class="text-xl font-bold text-base-content">{{ languagePack.name }}</h2>
          <p class="text-base-content/70 text-sm">{{ languagePack.description }}</p>
          <p class="text-base-content/70 mt-1 text-sm">
            <span class="font-medium">Dil:</span> {{ getLanguageName(languagePack.language) }}
          </p>
        </div>
        <div class="flex space-x-2">
          <button
            v-if="isLoggedIn"
            @click="fetchAvailableWords"
            class="rounded border border-base-300 bg-base-content px-4 py-2 text-sm font-medium text-base-100 transition hover:bg-base-300 hover:text-base-content"
          >
            Kelime Ekle
          </button>
          <a
            :href="route('rendition.language-packs.export', languagePack.id)"
            class="rounded border border-base-300 bg-base-100 px-4 py-2 text-sm font-medium text-base-content transition hover:bg-base-200"
          >
            Dışa Aktar
          </a>
          <a
            :href="route('rendition.language-packs.index')"
            class="rounded border border-base-300 bg-base-100 px-4 py-2 text-sm font-medium text-base-content transition hover:bg-base-200"
          >
            Geri Dön
          </a>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="table table-zebra w-full">
          <thead>
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
              <td colspan="5" class="text-base-content/70 py-6 text-center">
                Bu dil paketinde henüz kelime bulunmamaktadır. Kelime ekleyin.
              </td>
            </tr>
            <tr v-for="word in languagePack.words" :key="word.id" class="hover">
              <td class="border-b px-4 py-3 font-medium">{{ word.word }}</td>
              <td class="border-b px-4 py-3">{{ word.meaning }}</td>
              <td class="border-b px-4 py-3 capitalize">{{ word.type }}</td>
              <td class="border-b px-4 py-3">{{ difficultyText(word.difficulty_level) }}</td>
              <td class="border-b px-4 py-3">
                <button
                  v-if="isLoggedIn"
                  @click="removeWord(word)"
                  class="rounded border border-red-300 bg-red-50 px-2 py-1 text-xs font-medium text-red-700 transition hover:bg-red-100"
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
    <div v-if="showAddWordsModal" class="modal-open modal">
      <div class="modal-box max-w-2xl">
        <div class="mb-4 flex items-center justify-between">
          <h3 class="text-lg font-bold">Kelime Ekle</h3>
          <button
            @click="showAddWordsModal = false"
            class="rounded border border-base-300 bg-base-100 p-1 text-base-content transition hover:bg-base-200"
          >
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
          <label class="text-sm font-medium text-base-content">Kelime Ara</label>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Kelime veya anlam ara..."
            class="placeholder-base-content/50 mt-1 w-full rounded border border-base-300 bg-base-100 px-3 py-2 text-base-content focus:border-base-content focus:outline-none focus:ring-1 focus:ring-base-content"
          />
        </div>

        <div class="mb-4">
          <label class="text-sm font-medium text-base-content">Kelimeler</label>
          <div v-if="loading" class="flex justify-center py-4">
            <div class="loading loading-spinner loading-md"></div>
          </div>
          <div v-else-if="availableWords.length === 0" class="text-base-content/70 py-4 text-center">
            Eklenebilecek kelime bulunamadı. Önce yeni kelimeler ekleyin.
          </div>
          <div v-else class="max-h-60 overflow-y-auto rounded-lg border border-base-300 p-2">
            <div
              v-for="word in filteredAvailableWords"
              :key="word.id"
              class="flex items-center rounded px-2 py-1 hover:bg-base-200"
            >
              <input
                :id="`word-${word.id}`"
                v-model="selectedWords"
                :value="word.id"
                type="checkbox"
                class="h-4 w-4 rounded border border-base-300 bg-base-100 text-base-content focus:ring-1 focus:ring-base-content"
              />
              <label :for="`word-${word.id}`" class="ml-2 block text-sm text-base-content">
                {{ word.word }} - {{ word.meaning }} ({{ getLanguageName(word.language) }})
              </label>
            </div>
          </div>
        </div>

        <div class="modal-action">
          <button
            @click="showAddWordsModal = false"
            class="rounded border border-base-300 bg-base-100 px-4 py-2 text-sm font-medium text-base-content transition hover:bg-base-200"
          >
            İptal
          </button>
          <button
            @click="addWords"
            class="rounded bg-base-content px-4 py-2 text-sm font-medium text-base-100 transition hover:bg-base-300 hover:text-base-content disabled:opacity-50"
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
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';
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
