<template>
  <CheckScreen>
    <div class="container mx-auto max-w-4xl px-4 py-8">
      <!-- Header -->
      <div class="mb-12 text-center">
        <h1 class="mb-2 text-4xl font-bold tracking-tight">Kelime Sözlüğü</h1>
        <p class="text-muted-foreground text-lg">Kelime arayın, anlamlarını öğrenin</p>
      </div>

      <!-- Search Box -->
      <div class="mx-auto mb-8 max-w-2xl">
        <div class="relative">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg class="text-muted-foreground h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Kelime arayın..."
            class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-12 w-full rounded-md border px-3 py-2 pl-10 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            @keyup.enter="searchWord"
            @input="onSearchInput"
          />
          <button
            @click="searchWord"
            :disabled="isSearching || !searchQuery.trim()"
            class="text-primary-foreground ring-offset-background hover:bg-primary/90 focus-visible:ring-ring absolute right-2 top-1/2 inline-flex h-8 -translate-y-1/2 items-center justify-center rounded-md bg-primary px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            <span v-if="isSearching" class="flex items-center">
              <svg class="-ml-1 mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Aranıyor...
            </span>
            <span v-else>Ara</span>
          </button>
        </div>
      </div>

      <!-- Search Results -->
      <div v-if="searchResult" class="mx-auto max-w-4xl">
        <!-- Word Card -->
        <div class="bg-card text-card-foreground rounded-lg border shadow-sm">
          <div class="p-6">
            <!-- Word Header -->
            <div class="mb-6 flex items-start justify-between">
              <div class="flex-1">
                <div class="mb-2 flex items-center gap-3">
                  <h2 class="text-3xl font-bold">{{ searchResult.word }}</h2>
                  <div class="flex gap-2">
                    <span
                      class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
                    >
                      {{ getWordTypeLabel(searchResult.type) }}
                    </span>
                    <span
                      class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                    >
                      {{ getLanguageLabel(searchResult.language) }}
                    </span>
                  </div>
                </div>
                <p class="text-muted-foreground text-xl">{{ searchResult.meaning }}</p>
              </div>
              <div v-if="isLoggedIn" class="flex gap-2">
                <Link
                  :href="route('rendition.words.edit', searchResult.id)"
                  class="ring-offset-background focus-visible:ring-ring border-input bg-background hover:text-accent-foreground inline-flex h-9 items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                >
                  Düzenle
                </Link>
              </div>
            </div>

            <!-- Meanings Section -->
            <div v-if="searchResult.meanings && searchResult.meanings.length > 1" class="mb-6">
              <h3 class="mb-3 text-lg font-semibold">Anlamlar</h3>
              <div class="space-y-2">
                <div
                  v-for="(meaning, index) in searchResult.meanings"
                  :key="index"
                  class="flex items-start gap-3 rounded-md border p-3"
                  :class="meaning.is_primary ? 'border-blue-200 bg-blue-50' : 'bg-muted/50'"
                >
                  <span
                    v-if="meaning.is_primary"
                    class="inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800"
                  >
                    Ana
                  </span>
                  <span class="text-sm">{{ meaning.meaning }}</span>
                </div>
              </div>
            </div>

            <!-- Learning Stats -->
            <div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div class="bg-card rounded-lg border p-4">
                <div class="text-muted-foreground text-sm">Öğrenme Durumu</div>
                <div class="text-lg font-semibold">
                  {{ getLearningStatusLabel(searchResult.learning_status) }}
                </div>
              </div>
              <div class="bg-card rounded-lg border p-4">
                <div class="text-muted-foreground text-sm">Tekrar Sayısı</div>
                <div class="text-lg font-semibold">
                  {{ searchResult.review_count || 0 }}
                </div>
              </div>
              <div class="bg-card rounded-lg border p-4">
                <div class="text-muted-foreground text-sm">Yanlış Sayısı</div>
                <div class="text-lg font-semibold">
                  {{ searchResult.incorrect_count || 0 }}
                </div>
              </div>
            </div>

            <!-- Language Packs -->
            <div v-if="searchResult.language_packs && searchResult.language_packs.length > 0" class="mb-6">
              <h3 class="mb-3 text-lg font-semibold">Bulunduğu Paketler</h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="pack in searchResult.language_packs"
                  :key="pack.id"
                  class="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10"
                >
                  {{ pack.name }}
                </span>
              </div>
            </div>

            <!-- Example Sentences -->
            <div v-if="searchResult.example_sentences && searchResult.example_sentences.length > 0" class="mb-6">
              <h3 class="mb-3 text-lg font-semibold">Örnek Cümleler</h3>
              <div class="space-y-3">
                <div
                  v-for="(sentence, index) in searchResult.example_sentences"
                  :key="index"
                  class="bg-card rounded-lg border p-4"
                >
                  <div class="mb-1 font-medium">{{ sentence.sentence }}</div>
                  <div v-if="sentence.translation" class="text-muted-foreground text-sm">
                    {{ sentence.translation }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Synonyms -->
            <div v-if="searchResult.synonyms && searchResult.synonyms.length > 0">
              <h3 class="mb-3 text-lg font-semibold">Eş Anlamlılar</h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="synonym in searchResult.synonyms"
                  :key="synonym.id"
                  class="inline-flex items-center rounded-md bg-orange-50 px-2 py-1 text-xs font-medium text-orange-700 ring-1 ring-inset ring-orange-700/10"
                >
                  {{ synonym.synonym }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- No Results -->
      <div v-else-if="hasSearched && !isSearching" class="mx-auto max-w-2xl text-center">
        <div class="bg-card text-card-foreground rounded-lg border p-8 shadow-sm">
          <div class="text-muted-foreground mb-4">
            <svg class="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
          <h3 class="mb-2 text-xl font-semibold">Kelime bulunamadı</h3>
          <p class="text-muted-foreground">
            "{{ searchQuery }}" kelimesi sözlüğümüzde bulunamadı. Farklı bir kelime deneyin.
          </p>
        </div>
      </div>

      <!-- Quick Actions -->
      <div v-if="isLoggedIn" class="mx-auto mt-8 max-w-2xl text-center">
        <Link
          :href="route('rendition.words.create')"
          class="ring-offset-background focus-visible:ring-ring text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
          <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Yeni Kelime Ekle
        </Link>
      </div>
    </div>
  </CheckScreen>
</template>

<script setup>
import { ref, computed } from 'vue';
import { usePage, Link } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';

const props = defineProps({
  words: Array,
  languagePacks: Array,
  screen: Object,
  error: {
    type: String,
    default: null,
  },
  filters: Object,
  pagination: Object,
});

// Reactive data
const searchQuery = ref('');
const searchResult = ref(null);
const isSearching = ref(false);
const hasSearched = ref(false);

// User state
const auth = computed(() => usePage().props.auth);
const isLoggedIn = computed(() => auth.value && auth.value.user);

// Search function
const searchWord = async () => {
  if (!searchQuery.value.trim()) return;

  isSearching.value = true;
  hasSearched.value = true;

  try {
    const response = await fetch(route('rendition.words.search'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
      },
      body: JSON.stringify({
        search: searchQuery.value.trim(),
      }),
    });

    const data = await response.json();

    if (data.success) {
      searchResult.value = data.word;
    } else {
      searchResult.value = null;
    }
  } catch (error) {
    console.error('Search error:', error);
    searchResult.value = null;
  } finally {
    isSearching.value = false;
  }
};

// Handle search input
const onSearchInput = () => {
  if (searchQuery.value.trim() === '') {
    searchResult.value = null;
    hasSearched.value = false;
  }
};

// Helper functions
const getWordTypeLabel = (type) => {
  switch (type) {
    case 'noun':
      return 'İsim';
    case 'verb':
      return 'Fiil';
    case 'adjective':
      return 'Sıfat';
    case 'adverb':
      return 'Zarf';
    default:
      return type;
  }
};

const getLanguageLabel = (language) => {
  switch (language) {
    case 'tr':
      return 'Türkçe';
    case 'en':
      return 'İngilizce';
    case 'de':
      return 'Almanca';
    case 'fr':
      return 'Fransızca';
    case 'es':
      return 'İspanyolca';
    default:
      return language;
  }
};

const getLearningStatusLabel = (status) => {
  switch (Number(status)) {
    case 0:
      return 'Öğrenilmedi';
    case 1:
      return 'Öğreniliyor';
    case 2:
      return 'Öğrenildi';
    default:
      return 'Belirsiz';
  }
};
</script>
