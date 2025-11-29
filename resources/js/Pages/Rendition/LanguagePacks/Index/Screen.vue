<template>
  <CheckScreen>
    <div class="rounded-lg border border-border bg-card p-6 shadow-sm">
      <div class="mb-4 flex items-center justify-between">
        <div class="flex-1">
          <h1 class="text-2xl font-bold text-foreground">Dil Paketleri</h1>
        </div>
        <div class="flex gap-2">
          <button @click="exportAllPacks" class="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground">Tümünü Dışa Aktar</button>
          <Link
            :href="route('rendition.language-packs.create')"
            class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90"
          >
            Yeni Paket
          </Link>
        </div>
      </div>

      <div class="relative my-4">
        <div class="absolute inset-0 flex items-center">
          <span class="w-full border-t border-border"></span>
        </div>
      </div>

      <div class="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        <div
          v-for="pack in languagePacks"
          :key="pack.id"
          class="rounded-lg border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
        >
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold text-foreground">{{ pack.name }}</h2>
            <div class="inline-flex items-center rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-semibold text-foreground">{{ pack.language }}</div>
          </div>
          <p class="text-muted-foreground mt-2 text-sm">{{ truncateDescription(pack.description) }}</p>
          <div class="mt-3 flex items-center justify-between">
            <div class="flex gap-2">
              <Link :href="route('rendition.words.show', { word: pack.slug })" class="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1.5 text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground">
                Kelimeleri Göster
              </Link>
              <button @click="exportPack(pack)" class="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1.5 text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground">Dışa Aktar</button>
            </div>
            <div class="inline-flex items-center rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-semibold text-foreground">{{ pack.word_count || 0 }} kelime</div>
          </div>
        </div>
      </div>

      <div v-if="languagePacks.length === 0" class="mt-6 rounded-lg border border-border bg-muted p-4">
        <div class="flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="h-6 w-6 shrink-0 stroke-current text-muted-foreground"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span class="text-foreground">Hiç dil paketi bulunmamaktadır.</span>
        </div>
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

