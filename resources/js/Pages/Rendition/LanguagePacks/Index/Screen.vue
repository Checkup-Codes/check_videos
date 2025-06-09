<template>
  <CheckScreen>
    <div class="rounded-lg bg-base-100 p-6 shadow-lg">
      <div class="mb-4 flex items-center justify-between">
        <div class="flex-1">
          <h1 class="text-2xl font-bold">Dil Paketleri</h1>
        </div>
        <div class="flex gap-2">
          <button @click="exportAllPacks" class="btn btn-success btn-sm">Tümünü Dışa Aktar</button>
          <Link :href="route('rendition.language-packs.create')" class="btn btn-primary btn-sm"> Yeni Paket </Link>
        </div>
      </div>

      <div class="divider my-2"></div>

      <div class="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        <div
          v-for="pack in languagePacks"
          :key="pack.id"
          class="card-compact card bg-base-100 shadow-xl transition-shadow hover:shadow-2xl"
        >
          <div class="card-body">
            <div class="flex items-center justify-between">
              <h2 class="card-title">{{ pack.name }}</h2>
              <div class="badge badge-outline">{{ pack.language }}</div>
            </div>
            <p class="text-sm opacity-80">{{ truncateDescription(pack.description) }}</p>
            <div class="card-actions mt-3 justify-between">
              <div class="flex gap-2">
                <Link :href="route('rendition.words.show', { word: pack.slug })" class="btn btn-outline btn-sm">
                  Kelimeleri Göster
                </Link>
                <button @click="exportPack(pack)" class="btn btn-success btn-sm">Dışa Aktar</button>
              </div>
              <div class="badge badge-lg">{{ pack.word_count || 0 }} kelime</div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="languagePacks.length === 0" class="alert alert-info mt-6">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>Hiç dil paketi bulunmamaktadır.</span>
      </div>
    </div>
  </CheckScreen>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Link } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';

// Props
const props = defineProps({
  languagePacks: Array,
  screen: Object,
});

const truncateDescription = (description) => {
  if (!description) return 'Açıklama bulunmamaktadır.';
  return description.length > 100 ? description.slice(0, 100) + '...' : description;
};

// Export functions
const exportPack = (pack) => {
  const data = {
    name: pack.name,
    slug: pack.slug,
    description: pack.description,
    language: pack.language,
    words: pack.words.map((word) => ({
      id: word.id,
      word: word.word,
      type: word.type,
      language: word.language,
      learning_status: word.learning_status,
      flag: word.flag,
      difficulty_level: word.difficulty_level,
      incorrect_count: word.incorrect_count,
      review_count: word.review_count,
      last_review_date: word.last_review_date,
      created_at: word.created_at,
      updated_at: word.updated_at,
      meanings: word.meanings.map((meaning) => ({
        meaning: meaning.meaning,
        is_primary: meaning.is_primary,
        display_order: meaning.display_order,
      })),
      example_sentences: word.example_sentences.map((sentence) => ({
        sentence: sentence.sentence,
        translation: sentence.translation,
        language: sentence.language,
      })),
      synonyms: word.synonyms,
    })),
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${pack.name.toLowerCase().replace(/\s+/g, '-')}-${pack.language}.json`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

const exportAllPacks = () => {
  const data = props.languagePacks.map((pack) => ({
    name: pack.name,
    slug: pack.slug,
    description: pack.description,
    language: pack.language,
    words: pack.words.map((word) => ({
      id: word.id,
      word: word.word,
      type: word.type,
      language: word.language,
      learning_status: word.learning_status,
      flag: word.flag,
      difficulty_level: word.difficulty_level,
      incorrect_count: word.incorrect_count,
      review_count: word.review_count,
      last_review_date: word.last_review_date,
      created_at: word.created_at,
      updated_at: word.updated_at,
      meanings: word.meanings.map((meaning) => ({
        meaning: meaning.meaning,
        is_primary: meaning.is_primary,
        display_order: meaning.display_order,
      })),
      example_sentences: word.example_sentences.map((sentence) => ({
        sentence: sentence.sentence,
        translation: sentence.translation,
        language: sentence.language,
      })),
      synonyms: word.synonyms,
    })),
  }));

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'all-language-packs.json';
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

// URL'deki query parametrelerini al
const queryParams = computed(() => {
  const params = new URLSearchParams(window.location.search);
  return {
    game: params.get('game') || null,
    pack_id: params.get('pack_id') || null,
  };
});
</script>

<style scoped>
.badge-outline {
  background-color: transparent;
  border-color: rgba(0, 0, 0, 0.2);
  color: rgba(0, 0, 0, 0.7);
  font-size: 0.75rem;
  height: 1.5rem;
  padding: 0 0.5rem;
  vertical-align: middle;
}
</style>
