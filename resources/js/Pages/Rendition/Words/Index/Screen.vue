<template>
  <CheckScreen>
    <div class="p-6 pt-12 sm:p-8 sm:pt-16">
      <!-- Header - sade tasarım -->
      <div class="mb-8">
        <h1 class="text-2xl font-semibold text-base-content sm:text-3xl">Kelime Sözlüğü</h1>
        <p class="text-base-content/60 mt-2 text-sm">Kelime arayın, anlamlarını öğrenin</p>
      </div>

      <!-- Search Box - sade tasarım -->
      <div class="mb-8">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Kelime arayın..."
            class="input-bordered input w-full pl-10"
            @keyup.enter="searchWord"
            @input="onSearchInput"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="text-base-content/50 absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <button
            @click="searchWord"
            :disabled="isSearching || !searchQuery.trim()"
            class="btn btn-primary absolute right-2 top-1/2 -translate-y-1/2"
          >
            <span v-if="isSearching" class="flex items-center">
              <div class="loading loading-spinner loading-xs mr-2"></div>
              Aranıyor...
            </span>
            <span v-else>Ara</span>
          </button>
        </div>
      </div>

      <!-- Search Results - sade tasarım -->
      <div v-if="searchResult">
        <!-- Word Card -->
        <div class="rounded-lg bg-base-100 p-6">
          <!-- Word Header -->
          <div class="mb-6 flex items-start justify-between">
            <div class="flex-1">
              <div class="mb-3 flex items-center gap-3">
                <h2 class="text-2xl font-semibold text-base-content">{{ searchResult.word }}</h2>
                <div class="flex gap-2">
                  <span class="badge badge-outline badge-sm">
                    {{ getWordTypeLabel(searchResult.type) }}
                  </span>
                  <span class="badge badge-outline badge-sm">
                    {{ getLanguageLabel(searchResult.language) }}
                  </span>
                </div>
              </div>
              <p class="text-base-content/70 text-lg">{{ searchResult.meaning }}</p>
            </div>
            <div v-if="isLoggedIn" class="flex gap-2">
              <Link :href="route('rendition.words.edit', searchResult.id)" class="btn btn-ghost btn-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-4 w-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
                Düzenle
              </Link>
            </div>
          </div>

          <!-- Meanings Section - sade tasarım -->
          <div v-if="searchResult.meanings && searchResult.meanings.length > 1" class="mb-6">
            <h3 class="mb-3 text-lg font-semibold text-base-content">Anlamlar</h3>
            <div class="space-y-2">
              <div
                v-for="(meaning, index) in searchResult.meanings"
                :key="index"
                class="flex items-start gap-3 rounded-lg p-3"
                :class="meaning.is_primary ? 'bg-primary/10 border-primary/20 border' : 'bg-base-200/50'"
              >
                <span v-if="meaning.is_primary" class="badge badge-primary badge-sm"> Ana </span>
                <span class="text-sm text-base-content">{{ meaning.meaning }}</span>
              </div>
            </div>
          </div>

          <!-- Learning Stats - sade tasarım -->
          <div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div class="bg-base-200/50 rounded-lg p-4">
              <div class="text-base-content/60 text-sm">Öğrenme Durumu</div>
              <div class="text-lg font-semibold text-base-content">
                {{ getLearningStatusLabel(searchResult.learning_status) }}
              </div>
            </div>
            <div class="bg-base-200/50 rounded-lg p-4">
              <div class="text-base-content/60 text-sm">Tekrar Sayısı</div>
              <div class="text-lg font-semibold text-base-content">
                {{ searchResult.review_count || 0 }}
              </div>
            </div>
            <div class="bg-base-200/50 rounded-lg p-4">
              <div class="text-base-content/60 text-sm">Yanlış Sayısı</div>
              <div class="text-lg font-semibold text-base-content">
                {{ searchResult.incorrect_count || 0 }}
              </div>
            </div>
          </div>

          <!-- Language Packs - sade tasarım -->
          <div v-if="searchResult.language_packs && searchResult.language_packs.length > 0" class="mb-6">
            <h3 class="mb-3 text-lg font-semibold text-base-content">Bulunduğu Paketler</h3>
            <div class="flex flex-wrap gap-2">
              <span v-for="pack in searchResult.language_packs" :key="pack.id" class="badge badge-outline badge-sm">
                {{ pack.name }}
              </span>
            </div>
          </div>

          <!-- Example Sentences - sade tasarım -->
          <div v-if="searchResult.example_sentences && searchResult.example_sentences.length > 0" class="mb-6">
            <h3 class="mb-3 text-lg font-semibold text-base-content">Örnek Cümleler</h3>
            <div class="space-y-3">
              <div
                v-for="(sentence, index) in searchResult.example_sentences"
                :key="index"
                class="bg-base-200/50 rounded-lg p-4"
              >
                <div class="mb-1 font-medium text-base-content">{{ sentence.sentence }}</div>
                <div v-if="sentence.translation" class="text-base-content/60 text-sm">
                  {{ sentence.translation }}
                </div>
              </div>
            </div>
          </div>

          <!-- Synonyms - sade tasarım -->
          <div v-if="searchResult.synonyms && searchResult.synonyms.length > 0">
            <h3 class="mb-3 text-lg font-semibold text-base-content">Eş Anlamlılar</h3>
            <div class="flex flex-wrap gap-2">
              <span v-for="synonym in searchResult.synonyms" :key="synonym.id" class="badge badge-outline badge-sm">
                {{ synonym.synonym }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- No Results - sade tasarım -->
      <div v-else-if="hasSearched && !isSearching" class="py-12 text-center">
        <div class="text-base-content/40 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="mx-auto h-12 w-12"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
        <h3 class="mb-2 text-lg font-semibold text-base-content">Kelime bulunamadı</h3>
        <p class="text-base-content/60 text-sm">
          "{{ searchQuery }}" kelimesi sözlüğümüzde bulunamadı. Farklı bir kelime deneyin.
        </p>
      </div>

      <!-- Quick Actions - sade tasarım -->
      <div v-if="isLoggedIn" class="mt-8 text-center">
        <Link :href="route('rendition.words.create')" class="btn btn-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-4 w-4"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
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
