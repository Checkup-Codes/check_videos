<template>
  <CheckScreen>
    <TopScreen :title="`${languagePack.name} - Kelimeler`" />

    <div class="p-4">
      <div class="mb-4 flex justify-between">
        <div>
          <h2 class="text-xl font-bold text-base-content">{{ languagePack.name }}</h2>
          <p class="text-sm text-base-content/70">{{ languagePack.description }}</p>
          <p class="mt-1 text-sm text-base-content/70">
            <span class="font-medium">Dil:</span> {{ getLanguageName(languagePack.language) }}
          </p>
        </div>
        <div class="flex space-x-2">
          <button
            v-if="isLoggedIn"
            @click="fetchAvailableWords"
            class="btn btn-primary"
          >
            Kelime Ekle
          </button>
          <a
            :href="route('rendition.language-packs.export', languagePack.id)"
            class="btn btn-success"
          >
            Dışa Aktar
          </a>
          <a
            :href="route('rendition.language-packs.index')"
            class="btn btn-outline"
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
              <td colspan="5" class="text-center py-6 text-base-content/70">
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
                  class="btn btn-error btn-xs"
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
    <div v-if="showAddWordsModal" class="modal modal-open">
      <div class="modal-box max-w-2xl">
        <div class="mb-4 flex items-center justify-between">
          <h3 class="text-lg font-bold">Kelime Ekle</h3>
          <button @click="showAddWordsModal = false" class="btn btn-ghost btn-sm">
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
          <label class="label">
            <span class="label-text">Kelime Ara</span>
          </label>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Kelime veya anlam ara..."
            class="input input-bordered w-full"
          />
        </div>

        <div class="mb-4">
          <label class="label">
            <span class="label-text">Kelimeler</span>
          </label>
          <div v-if="loading" class="flex justify-center py-4">
            <div class="loading loading-spinner loading-md"></div>
          </div>
          <div v-else-if="availableWords.length === 0" class="py-4 text-center text-base-content/70">
            Eklenebilecek kelime bulunamadı. Önce yeni kelimeler ekleyin.
          </div>
          <div v-else class="max-h-60 overflow-y-auto border border-base-300 rounded-lg p-2">
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
                class="checkbox checkbox-primary"
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
            class="btn btn-outline"
          >
            İptal
          </button>
          <button
            @click="addWords"
            class="btn btn-primary"
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
