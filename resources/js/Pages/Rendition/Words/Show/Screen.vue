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

    <!-- Oyun component'leri -->
    <MultipleChoice
      v-if="!props.error && queryParams.game === 'multiple-choice'"
      :gameType="queryParams.game"
      :packSlug="props.pack?.slug || getPackSlugFromUrl()"
      :words="props.words"
    />
    <TranslateWord
      v-else-if="!props.error && queryParams.game === 'fill-in-the-blank'"
      :gameType="queryParams.game"
      :packSlug="props.pack?.slug || getPackSlugFromUrl()"
      :words="props.words"
    />

    <!-- Liste görünümü -->
    <div v-else-if="!props.error">
      <div class="p-6">
        <div class="mb-6 flex items-center justify-between">
          <div>
            <h2 class="text-xl font-bold text-gray-800">Kelime Listesi</h2>
            <p class="text-sm text-gray-600">
              Toplam Kelime Sayısı: {{ isLoading ? '...' : props.words ? props.words.length : 0 }}
            </p>
          </div>
          <div class="flex gap-2">
            <a
              v-if="isLoggedIn && props.pack"
              :href="route('rendition.language-packs.edit', props.pack.id)"
              class="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Paketi Düzenle
            </a>
            <a
              v-if="isLoggedIn"
              :href="route('rendition.words.create')"
              class="hover:bg-black-700 focus:ring-black-500 rounded-md bg-black px-3 py-2 text-sm text-white focus:outline-none focus:ring-2"
            >
              Yeni Kelime Ekle
            </a>
          </div>
        </div>

        <!-- Oyun Seçenekleri -->
        <div
          v-if="!queryParams.game && !hasEnoughWords"
          class="mt-6 rounded-md bg-yellow-100 p-4 text-sm text-yellow-800"
        >
          Oyunları başlatabilmek için en az 5 kelime eklemelisiniz.
        </div>

        <div
          v-if="!queryParams.game && hasEnoughWords"
          class="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6"
        >
          <Link
            v-for="(game, index) in games"
            :key="index"
            @click="updateQuery(game.route)"
            class="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-3 text-center text-xs font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-100 hover:shadow-md"
          >
            <span>{{ game.name }}</span>
          </Link>
        </div>

        <WordsTable :words="props.words" :isLoading="isLoading" :showActions="isLoggedIn" />

        <div v-if="searchQuery && filteredWords.length === 0 && isLoggedIn" class="mt-4 rounded-md bg-blue-50 p-4">
          <p class="text-blue-700">
            Aradığınız kelime bulunamadı.
            <a :href="route('rendition.words.create')" class="font-medium underline">
              Yeni bir kelime eklemek ister misiniz?
            </a>
          </p>
        </div>
      </div>
    </div>
  </CheckScreen>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { router, usePage } from '@inertiajs/vue3';
import { Inertia } from '@inertiajs/inertia';
import CheckScreen from '@/Components/CekapUI/Modals/CheckScreen.vue';
import TopScreen from '@/Components/CekapUI/Typography/TopScreen.vue';
import MultipleChoice from '@/Pages/Rendition/_components/MultipleChoice.vue';
import TranslateWord from '@/Pages/Rendition/_components/TranslateWord.vue';
import WordsTable from '@/Pages/Rendition/_components/WordsTable.vue';

// Props
const props = defineProps({
  words: Array,
  languagePacks: Array,
  screen: Object,
  pack: Object,
  error: String,
});

// Yükleme durumunu takip et
const isLoading = ref(true);

// Kullanıcı durumu
const auth = computed(() => usePage().props.auth);
const isLoggedIn = computed(() => auth.value && auth.value.user);

// Filtreler
const searchQuery = ref('');
const languageFilter = ref('');
const packFilter = ref(props.pack?.id || '');

const hasEnoughWords = computed(() => props.words && props.words.length >= 5);

// Verilerin yüklenmesini simüle edelim
onMounted(() => {
  // Sayfa yüklendiğinde 500ms sonra yükleme durumunu kaldır
  setTimeout(() => {
    isLoading.value = false;
  }, 500);

  // Eğer kelime yoksa veya veriler yüklenemediyse hata konsola yazdırılabilir
  if (!props.words || props.words.length === 0) {
    console.warn('Kelime verileri yüklenmedi veya boş');
  } else {
    console.log(`${props.words.length} kelime yüklendi`);
    // İlk kelimeyi log'layarak inceleyebiliriz
    if (props.words[0]) {
      console.log('İlk kelime örneği:', props.words[0]);
    }
  }
});

// Arama ve filtreleme
const filteredWords = computed(() => {
  // Add a safety check for props.words
  if (!props.words) {
    console.log('props.words is null or undefined');
    return [];
  }

  console.log('All words:', props.words);
  console.log('Search query:', searchQuery.value);
  console.log('Language filter:', languageFilter.value);

  return props.words.filter((word) => {
    // Skip if word is not a valid object
    if (!word || typeof word !== 'object') {
      console.log('Invalid word object:', word);
      return false;
    }

    const matchesSearch =
      !searchQuery.value.trim() ||
      (word.word && word.word.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
      (word.meaning && word.meaning.toLowerCase().includes(searchQuery.value.toLowerCase()));

    const matchesLanguage = !languageFilter.value || (word.language && word.language === languageFilter.value);

    console.log('Word filtering results:', {
      word: word.word,
      matchesSearch,
      matchesLanguage,
    });

    return matchesSearch && matchesLanguage;
  });
});

// Zorluk
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

// Öğrenme durumu
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

// Sil
const confirmDelete = (word) => {
  if (confirm(`"${word.word}" kelimesini silmek istediğinize emin misiniz?`)) {
    router.delete(route('rendition.words.destroy', word.id));
  }
};

// Oyunlar
const games = ref([
  { name: 'Çoktan Seçmeli', route: 'multiple-choice' },
  { name: 'Boşluk Doldurma', route: 'fill-in-the-blank' },
  { name: 'Çeviri', route: 'translation' },
  { name: 'Eşleştirme', route: 'matching' },
  { name: 'Hızlı Yanıt', route: 'fast-response' },
  { name: 'Kelime Tahmini', route: 'word-guess' },
]);

// Query parametre yönetimi
const updateQuery = (gameRoute) => {
  const currentQuery = new URLSearchParams(window.location.search);
  currentQuery.set('game', gameRoute);

  Inertia.visit(`${window.location.pathname}?${currentQuery.toString()}`, {
    method: 'get',
    preserveState: true,
    replace: true,
  });
};

// URL'den paket slug'ını al
const getPackSlugFromUrl = () => {
  const path = window.location.pathname;
  const parts = path.split('/');
  // URL yapısı: /rendition/words/[packSlug]
  // packSlug genellikle sondan bir önceki parça
  if (parts.length >= 4) {
    const slugFromUrl = parts[parts.length - 1];
    console.log('Extracting slug from URL:', slugFromUrl);
    return slugFromUrl;
  }
  console.log('No slug found in URL');
  return null;
};

// Log pack props for debugging
console.log('Pack prop:', props.pack);
console.log('All language packs:', props.languagePacks);

// Game parametresi
const queryParams = computed(() => {
  const params = new URLSearchParams(window.location.search);
  return {
    game: params.get('game') || null,
  };
});

// Filtreleri temizleme fonksiyonunu ekle
const clearFilters = () => {
  searchQuery.value = '';
  languageFilter.value = '';
};
</script>
