<template>
  <CheckScreen>
    <TopScreen title="Kelimeler" />

    <!-- Oyun component'leri -->
    <MultipleChoice
      v-if="queryParams.game === 'multiple-choice'"
      :gameType="queryParams.game"
      :packSlug="props.pack?.slug || getPackSlugFromUrl()"
    />
    <TranslateWord
      v-else-if="queryParams.game === 'fill-in-the-blank'"
      :gameType="queryParams.game"
      :packSlug="props.pack?.slug || getPackSlugFromUrl()"
    />

    <!-- Liste görünümü -->
    <div v-else>
      <div class="p-6">
        <div class="mb-6 flex items-center justify-between">
          <div>
            <h2 class="text-xl font-bold text-gray-800">Kelime Listesi</h2>
            <p class="text-sm text-gray-600">Toplam Kelime Sayısı: {{ words.length }}</p>
          </div>
          <div class="flex gap-2">
            <a
              v-if="isLoggedIn"
              :href="route('rendition.language-packs.edit', props.languagePacks[0].id)"
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
        <!-- Arama ve Filtreleme -->
        <div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label for="search" class="mb-1 block text-sm font-medium text-gray-700">Kelime Ara</label>
            <input
              id="search"
              v-model="searchQuery"
              type="text"
              placeholder="Kelime veya anlam ara..."
              class="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label for="language-filter" class="mb-1 block text-sm font-medium text-gray-700">Dil Filtresi</label>
            <select
              id="language-filter"
              v-model="languageFilter"
              class="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tüm Diller</option>
              <option value="tr">Türkçe (TR)</option>
              <option value="en">İngilizce (EN)</option>
              <option value="de">Almanca (DE)</option>
              <option value="fr">Fransızca (FR)</option>
              <option value="es">İspanyolca (ES)</option>
              <option value="it">İtalyanca (IT)</option>
              <option value="ru">Rusça (RU)</option>
              <option value="ar">Arapça (AR)</option>
            </select>
          </div>
        </div>

        <div
          v-if="!queryParams.game && !hasEnoughWords"
          class="mb-6 rounded-md bg-yellow-100 p-4 text-sm text-yellow-800"
        >
          Oyunları başlatabilmek için en az 5 kelime eklemelisiniz.
        </div>

        <div
          v-if="!queryParams.game && hasEnoughWords"
          class="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6"
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

        <!-- Kelime Tablosu -->
        <div class="overflow-x-auto">
          <table class="min-w-full rounded-lg border border-gray-300 bg-white shadow-md">
            <thead class="bg-gray-200 text-gray-700">
              <tr>
                <th class="border-b px-4 py-3 text-left text-sm font-semibold">Kelime</th>
                <th class="border-b px-4 py-3 text-left text-sm font-semibold">Anlam</th>
                <th class="border-b px-4 py-3 text-left text-sm font-semibold">Tür</th>
                <th class="border-b px-4 py-3 text-left text-sm font-semibold">Zorluk</th>
                <th class="border-b px-4 py-3 text-left text-sm font-semibold">Öğrenme Durumu</th>
                <th v-if="isLoggedIn" class="border-b px-4 py-3 text-left text-sm font-semibold">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="filteredWords.length === 0">
                <td colspan="8" class="border-b px-4 py-6 text-center text-gray-500">
                  {{
                    searchQuery || languageFilter || packFilter
                      ? 'Arama kriterlerine uygun kelime bulunamadı.'
                      : 'Henüz kelime bulunmamaktadır.'
                  }}
                </td>
              </tr>
              <tr v-for="word in filteredWords" :key="word.id" class="text-xs transition hover:bg-gray-100">
                <td class="border-b px-4 py-3 font-medium">{{ word.word }}</td>
                <td class="border-b px-4 py-3">{{ word.meaning }}</td>
                <td class="border-b px-4 py-3 capitalize">{{ word.type }}</td>
                <td class="border-b px-4 py-3">{{ difficultyText(word.difficulty_level) }}</td>
                <td class="border-b px-4 py-3">
                  <span
                    class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                    :class="{
                      'bg-red-100 text-red-800': word.learning_status === 0,
                      'bg-yellow-100 text-yellow-800': word.learning_status === 1,
                      'bg-green-100 text-green-800': word.learning_status === 2,
                    }"
                  >
                    {{ learningStatusText(word.learning_status) }}
                  </span>
                </td>
                <td class="border-b px-4 py-3" v-if="isLoggedIn">
                  <div class="flex space-x-2">
                    <a
                      :href="route('rendition.words.edit', word.id)"
                      class="rounded bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700 hover:bg-yellow-200"
                    >
                      <!-- edit icon -->
                      ✎
                    </a>
                    <button
                      @click="confirmDelete(word)"
                      class="rounded bg-red-100 px-2 py-1 text-xs font-medium text-red-700 hover:bg-red-200"
                    >
                      <!-- delete icon -->
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

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
import { ref, computed } from 'vue';
import { router, usePage } from '@inertiajs/vue3';
import { Inertia } from '@inertiajs/inertia';
import CheckScreen from '@/Components/CekapUI/Modals/CheckScreen.vue';
import TopScreen from '@/Components/CekapUI/Typography/TopScreen.vue';
import MultipleChoice from '@/Pages/Rendition/_components/MultipleChoice.vue';
import TranslateWord from '@/Pages/Rendition/_components/TranslateWord.vue';

// Props
const props = defineProps({
  words: Array,
  languagePacks: Array,
  screen: Object,
});

// Kullanıcı durumu
const auth = computed(() => usePage().props.auth);
const isLoggedIn = computed(() => auth.value && auth.value.user);

// Filtreler
const searchQuery = ref('');
const languageFilter = ref('');
const packFilter = ref(props.pack?.id || '');

const hasEnoughWords = computed(() => props.words.length >= 5);

// Arama ve filtreleme
const filteredWords = computed(() => {
  return props.words.filter((word) => {
    const matchesSearch =
      !searchQuery.value.trim() ||
      word.word.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      word.meaning.toLowerCase().includes(searchQuery.value.toLowerCase());

    const matchesLanguage = !languageFilter.value || word.language === languageFilter.value;
    const matchesPack = !packFilter.value || word.language_packs.some((pack) => pack.id === packFilter.value);

    return matchesSearch && matchesLanguage && matchesPack;
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
</script>
