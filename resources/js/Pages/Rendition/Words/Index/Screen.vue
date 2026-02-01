<template>
  <CheckScreen>
    <div class="p-6 pt-12 sm:p-8 sm:pt-16">
      <!-- Header - sade tasarım -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-semibold text-foreground sm:text-3xl">Kelime Sözlüğü</h1>
        </div>
        <Link v-if="isLoggedIn" :href="route('rendition.words.create')" class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="mr-2 h-4 w-4"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Yeni Kelime
        </Link>
      </div>

      <!-- Activity Heatmap -->
      <div v-if="stats" class="mb-8">
        <ActivityHeatmap :stats="stats" />
      </div>

      <!-- Search Box - sade tasarım -->
      <div class="mb-8">
        <div class="flex gap-3">
          <div class="flex-1">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Kelime arayın..."
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              @keyup.enter="searchWord"
              @input="onSearchInput"
            />
          </div>
          <button
            @click="searchWord"
            :disabled="isSearching || !searchQuery.trim()"
            class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90"
            :title="isSearching ? 'Arama yapılıyor...' : 'Kelime ara'"
          >
            <span v-if="isSearching" class="flex items-center">
              <svg class="mr-2 h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Aranıyor...
            </span>
            <span v-else class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="mr-1 h-4 w-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              Kelime Ara
            </span>
          </button>
        </div>
      </div>

      <!-- Search Results - sade tasarım -->
      <div v-if="searchResult">
        <!-- Word Card -->
        <div class="rounded-lg border border-border bg-card p-6 shadow-sm">
          <!-- Word Header -->
          <div class="mb-6 flex items-start justify-between">
            <div class="flex-1">
              <div class="mb-3 flex items-center gap-3">
                <h2 class="text-2xl font-semibold text-foreground">{{ searchResult.word }}</h2>
                <div class="flex gap-2">
                  <span class="inline-flex items-center rounded-full border border-border bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
                    {{ getWordTypeLabel(searchResult.type) }}
                  </span>
                  <span class="inline-flex items-center rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-semibold text-foreground">
                    {{ getLanguageLabel(searchResult.language) }}
                  </span>
                </div>
              </div>
              <p class="text-muted-foreground text-lg">{{ searchResult.meaning }}</p>
            </div>
            <div v-if="isLoggedIn" class="flex gap-2">
              <Link :href="route('rendition.words.edit', searchResult.id)" class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="mr-2 h-4 w-4"
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
            <h3 class="mb-3 text-lg font-semibold text-foreground">Anlamlar</h3>
            <div class="space-y-2">
              <div
                v-for="(meaning, index) in searchResult.meanings"
                :key="index"
                class="flex items-start gap-3 rounded-lg p-3"
                :class="meaning.is_primary ? 'bg-primary text-primary-foreground' : 'bg-muted'"
              >
                <span
                  v-if="meaning.is_primary"
                  class="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs font-semibold"
                  :class="meaning.is_primary ? 'bg-primary-foreground text-primary' : 'bg-transparent'"
                >
                  Ana
                </span>
                <span class="text-sm" :class="meaning.is_primary ? 'text-primary-foreground' : 'text-foreground'">{{
                  meaning.meaning
                }}</span>
              </div>
            </div>
          </div>

          <!-- Learning Stats - sade tasarım -->
          <div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div class="rounded-lg border border-border bg-muted p-4">
              <div class="text-muted-foreground text-sm">Öğrenme Durumu</div>
              <div class="text-lg font-semibold text-foreground">
                {{ getLearningStatusLabel(searchResult.learning_status) }}
              </div>
            </div>
            <div class="rounded-lg border border-border bg-muted p-4">
              <div class="text-muted-foreground text-sm">Tekrar Sayısı</div>
              <div class="text-lg font-semibold text-foreground">
                {{ searchResult.review_count || 0 }}
              </div>
            </div>
            <div class="rounded-lg border border-border bg-muted p-4">
              <div class="text-muted-foreground text-sm">Yanlış Sayısı</div>
              <div class="text-lg font-semibold text-foreground">
                {{ searchResult.incorrect_count || 0 }}
              </div>
            </div>
          </div>

          <!-- Language Packs - sade tasarım -->
          <div v-if="searchResult.language_packs && searchResult.language_packs.length > 0" class="mb-6">
            <h3 class="mb-3 text-lg font-semibold text-foreground">Bulunduğu Paketler</h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="pack in searchResult.language_packs"
                :key="pack.id"
                class="inline-flex items-center rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-semibold text-foreground"
              >
                {{ pack.name }}
              </span>
            </div>
          </div>

          <!-- Example Sentences - sade tasarım -->
          <div v-if="searchResult.example_sentences && searchResult.example_sentences.length > 0" class="mb-6">
            <h3 class="mb-3 text-lg font-semibold text-foreground">Örnek Cümleler</h3>
            <div class="space-y-3">
              <div
                v-for="(sentence, index) in searchResult.example_sentences"
                :key="index"
                class="rounded-lg border border-border bg-muted p-4"
              >
                <div class="mb-1 font-medium text-foreground">{{ sentence.sentence }}</div>
                <div v-if="sentence.translation" class="text-muted-foreground text-sm">
                  {{ sentence.translation }}
                </div>
              </div>
            </div>
          </div>

          <!-- Synonyms - sade tasarım -->
          <div v-if="searchResult.synonyms && searchResult.synonyms.length > 0">
            <h3 class="mb-3 text-lg font-semibold text-foreground">Eş Anlamlılar</h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="synonym in searchResult.synonyms"
                :key="synonym.id"
                class="inline-flex items-center rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-semibold text-foreground"
              >
                {{ synonym.synonym }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- No Results - sade tasarım -->
      <div v-else-if="hasSearched && !isSearching" class="py-12 text-center">
        <div class="text-muted-foreground/40 mb-4">
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
        <h3 class="mb-2 text-lg font-semibold text-foreground">Kelime bulunamadı</h3>
        <p class="text-muted-foreground text-sm">
          "{{ searchQuery }}" kelimesi sözlüğümüzde bulunamadı. Farklı bir kelime deneyin.
        </p>
      </div>


    </div>

    <!-- Duplicate Modal -->
    <DuplicateModal
      :show="showDuplicateModal"
      :duplicates="duplicateData?.duplicates || []"
      :pack-ids="duplicateData?.pack_ids || []"
      :pack-names="duplicateData?.pack_names || []"
      @close="showDuplicateModal = false"
    />
  </CheckScreen>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { usePage, Link } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';
import ActivityHeatmap from './ActivityHeatmap.vue';
import DuplicateModal from './DuplicateModal.vue';

const props = defineProps({
  words: Array,
  languagePacks: Array,
  stats: Object,
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

// Duplicate modal state
const showDuplicateModal = ref(false);
const duplicateData = ref(null);

// Check for duplicate data in session
const page = usePage();

// Watch for flash data changes (handles both initial load and navigation)
watch(
  () => page.props.flash?.bulk_import_duplicates,
  (newData) => {
    if (newData) {
      duplicateData.value = newData;
      showDuplicateModal.value = true;
    }
  },
  { immediate: true }
);

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
