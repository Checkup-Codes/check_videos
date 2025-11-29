<template>
  <CheckScreen>
    <TopScreen :title="`${languagePack.name} - Kelimeler`" />

    <div class="p-4">
      <div class="mb-4 flex justify-between">
        <div>
          <h2 class="text-xl font-bold text-foreground">{{ languagePack.name }}</h2>
          <p class="text-muted-foreground text-sm">{{ languagePack.description }}</p>
          <p class="text-muted-foreground mt-1 text-sm">
            <span class="font-medium">Dil:</span> {{ getLanguageName(languagePack.language) }}
          </p>
        </div>
        <div class="flex space-x-2">
          <button
            v-if="isLoggedIn"
            @click="fetchAvailableWords"
            class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90"
          >
            Kelime Ekle
          </button>
          <a
            :href="route('rendition.language-packs.export', languagePack.id)"
            class="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
          >
            Dışa Aktar
          </a>
          <a
            :href="route('rendition.language-packs.index')"
            class="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
          >
            Geri Dön
          </a>
        </div>
      </div>

      <div class="overflow-x-auto rounded-lg border border-border">
        <table class="w-full caption-bottom text-sm">
          <thead>
            <tr class="border-b border-border">
              <th class="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Kelime</th>
              <th class="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Anlam</th>
              <th class="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Tür</th>
              <th class="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Zorluk</th>
              <th class="h-10 px-4 text-left align-middle font-medium text-muted-foreground">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="!languagePack.words || languagePack.words.length === 0">
              <td colspan="5" class="text-muted-foreground py-6 text-center">
                Bu dil paketinde henüz kelime bulunmamaktadır. Kelime ekleyin.
              </td>
            </tr>
            <tr v-for="word in languagePack.words" :key="word.id" class="border-b border-border transition-colors hover:bg-muted/50">
              <td class="px-4 py-3 font-medium text-foreground">{{ word.word }}</td>
              <td class="px-4 py-3 text-muted-foreground">{{ word.meaning }}</td>
              <td class="px-4 py-3 capitalize text-muted-foreground">{{ word.type }}</td>
              <td class="px-4 py-3 text-muted-foreground">{{ difficultyText(word.difficulty_level) }}</td>
              <td class="px-4 py-3">
                <button
                  v-if="isLoggedIn"
                  @click="removeWord(word)"
                  class="inline-flex items-center justify-center rounded-md border border-destructive/50 bg-destructive/10 px-2 py-1 text-xs font-medium text-destructive transition-colors hover:bg-destructive/20"
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
    <div v-if="showAddWordsModal" class="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" @click="showAddWordsModal = false">
      <div class="fixed left-[50%] top-[50%] z-50 flex max-h-[90vh] w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] flex-col gap-4 border border-border bg-background shadow-lg sm:rounded-lg" @click.stop>
        <div class="flex flex-shrink-0 items-center justify-between border-b border-border p-6 pb-4">
          <h3 class="text-lg font-semibold text-foreground">Kelime Ekle</h3>
          <button
            @click="showAddWordsModal = false"
            class="inline-flex h-7 w-7 items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
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
        <div class="px-6">
          <label class="text-sm font-medium text-foreground">Kelime Ara</label>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Kelime veya anlam ara..."
            class="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <div class="flex-1 overflow-y-auto px-6">
          <label class="text-sm font-medium text-foreground">Kelimeler</label>
          <div v-if="loading" class="flex justify-center py-4">
            <svg class="h-6 w-6 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <div v-else-if="availableWords.length === 0" class="text-muted-foreground py-4 text-center">
            Eklenebilecek kelime bulunamadı. Önce yeni kelimeler ekleyin.
          </div>
          <div v-else class="mt-2 max-h-60 overflow-y-auto rounded-lg border border-border p-2">
            <div
              v-for="word in filteredAvailableWords"
              :key="word.id"
              class="flex items-center rounded px-2 py-1 transition-colors hover:bg-muted"
            >
              <input
                :id="`word-${word.id}`"
                v-model="selectedWords"
                :value="word.id"
                type="checkbox"
                class="h-4 w-4 rounded border border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"
              />
              <label :for="`word-${word.id}`" class="ml-2 block cursor-pointer text-sm text-foreground">
                {{ word.word }} - {{ word.meaning }} ({{ getLanguageName(word.language) }})
              </label>
            </div>
          </div>
        </div>

        <div class="flex flex-shrink-0 flex-col-reverse border-t border-border p-6 pt-4 sm:flex-row sm:justify-end sm:space-x-2">
          <button
            @click="showAddWordsModal = false"
            class="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
          >
            İptal
          </button>
          <button
            @click="addWords"
            class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90"
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
