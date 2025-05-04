<template>
  <CheckScreen>
    <div
      class="card border border-gray-200 bg-white shadow-lg transition-all duration-200 dark:border-gray-700 dark:bg-base-100"
    >
      <div class="card-body p-6">
        <div class="mb-4 flex items-center justify-between">
          <div class="flex-1">
            <h1 class="text-2xl font-bold">
              {{ props.pack?.name || 'Kelimeler' }}
              <span class="badge badge-outline ml-2">{{ props.words?.length || 0 }} kelime</span>
            </h1>
          </div>
          <div class="flex gap-2">
            <Link
              v-if="isLoggedIn && props.pack"
              :href="route('rendition.language-packs.edit', props.pack.id)"
              class="btn btn-outline btn-sm"
            >
              Paketi Düzenle
            </Link>
            <Link v-if="isLoggedIn" :href="route('rendition.words.create')" class="btn btn-primary btn-sm">
              Yeni Kelime
            </Link>
          </div>
        </div>

        <div class="divider my-2"></div>

        <!-- Filtreler -->
        <div v-if="!showGameInterface" class="mb-4 flex flex-wrap gap-3">
          <!-- Arama Kutusu -->
          <div class="form-control min-w-[200px] flex-1">
            <div class="input-group">
              <input
                type="text"
                v-model="searchQuery"
                placeholder="Kelime ara..."
                class="input-bordered input input-sm w-full"
                @keyup.enter="filterWords"
              />
              <button class="btn btn-sm btn-square" @click="filterWords">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- Tür Filtresi -->
          <select
            v-model="filterType"
            class="select-bordered select select-sm min-w-[150px] flex-1"
            @change="filterWords"
          >
            <option value="">Tüm Türler</option>
            <option value="noun">İsim</option>
            <option value="verb">Fiil</option>
            <option value="adjective">Sıfat</option>
            <option value="adverb">Zarf</option>
          </select>

          <!-- Durum Filtresi -->
          <select
            v-model="filterStatus"
            class="select-bordered select select-sm min-w-[150px] flex-1"
            @change="filterWords"
          >
            <option value="">Tüm Durumlar</option>
            <option value="0">Öğrenilmedi</option>
            <option value="1">Öğreniliyor</option>
            <option value="2">Öğrenildi</option>
          </select>
        </div>

        <!-- Oyun Komponentleri -->
        <transition name="game-transition" mode="out-in">
          <div v-if="showGameInterface" key="game">
            <div v-if="loadingGame" class="flex h-60 items-center justify-center">
              <span class="loading loading-spinner loading-lg"></span>
            </div>

            <MultipleChoice
              v-else-if="currentGame === 'multiple-choice'"
              :gameType="currentGame"
              :packSlug="props.pack?.slug || getPackSlugFromUrl()"
              :words="filteredWords"
              :gameConfig="gameConfig"
              @game-completed="handleGameComplete"
            />
            <TranslateWord
              v-else-if="currentGame === 'fill-in-the-blank'"
              :gameType="currentGame"
              :packSlug="props.pack?.slug || getPackSlugFromUrl()"
              :words="filteredWords"
              :gameConfig="gameConfig"
              @game-completed="handleGameComplete"
            />
            <WordCompletion
              v-else-if="currentGame === 'word-completion'"
              :gameType="currentGame"
              :packSlug="props.pack?.slug || getPackSlugFromUrl()"
              :words="filteredWords"
              :gameConfig="gameConfig"
              @game-completed="handleGameComplete"
            />
          </div>

          <!-- Kelimeler Görünümü -->
          <div v-else key="wordList">
            <!-- Oyun Seçenekleri ve Ayarları -->
            <div v-if="hasEnoughWords" class="mb-6 rounded-lg border border-base-300 bg-base-100 p-4">
              <div class="flex flex-wrap items-center gap-4">
                <div class="form-control">
                  <label class="label cursor-pointer gap-2">
                    <span class="label-text">Soru Sayısı: {{ gameConfig.questionCount }}</span>
                    <input
                      type="range"
                      min="5"
                      max="20"
                      v-model="gameConfig.questionCount"
                      class="range range-primary range-xs"
                    />
                  </label>
                </div>

                <div class="form-control">
                  <label class="label cursor-pointer">
                    <span class="label-text mr-2">Öğrenilmemiş Kelimelere Öncelik Ver</span>
                    <input type="checkbox" class="toggle toggle-sm" v-model="prioritizeUnlearned" />
                  </label>
                </div>

                <div class="divider divider-horizontal"></div>

                <div class="grid grid-cols-3 gap-2">
                  <button
                    v-for="game in games"
                    :key="game.route"
                    @click="startGame(game.route)"
                    class="btn btn-sm"
                    :class="{ 'btn-primary': currentGame === game.route, 'btn-outline': currentGame !== game.route }"
                  >
                    {{ game.name }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Kelime Tablosu -->
            <div class="overflow-x-auto">
              <table class="table table-zebra">
                <thead>
                  <tr>
                    <th>Kelime</th>
                    <th>Anlam</th>
                    <th>Tür</th>
                    <th>Durum</th>
                    <th>Zorluk</th>
                    <th v-if="isLoggedIn"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="isLoading">
                    <td colspan="6" class="text-center">
                      <span class="loading loading-spinner loading-md"></span>
                    </td>
                  </tr>
                  <tr v-else-if="displayedWords.length === 0">
                    <td colspan="6" class="text-center">Sonuç bulunamadı</td>
                  </tr>
                  <tr v-for="word in displayedWords" :key="word.id">
                    <td class="font-medium">{{ word.word }}</td>
                    <td>{{ truncateText(word.meaning, 50) }}</td>
                    <td>
                      <div class="badge">{{ word.type }}</div>
                    </td>
                    <td>
                      <div class="badge badge-sm" :class="getLearningStatusBadgeClass(word.learning_status)">
                        {{ getLearningStatusLabel(word.learning_status) }}
                      </div>
                    </td>
                    <td>
                      <div class="badge badge-sm" :class="getDifficultyBadgeClass(word.difficulty_level)">
                        {{ getDifficultyLabel(word.difficulty_level) }}
                      </div>
                    </td>
                    <td v-if="isLoggedIn">
                      <Link :href="route('rendition.words.edit', word.id)" class="btn btn-ghost btn-xs"> Düzenle </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Pagination -->
            <div v-if="filteredWordList.length > perPage" class="mt-4 flex justify-between">
              <div>
                <span class="text-sm opacity-70">
                  {{ paginationInfo }}
                </span>
              </div>
              <div class="join">
                <button class="btn btn-sm join-item" :disabled="currentPage <= 1" @click="changePage(currentPage - 1)">
                  «
                </button>
                <button class="btn btn-sm join-item">{{ currentPage }}</button>
                <button
                  class="btn btn-sm join-item"
                  :disabled="currentPage >= totalPages"
                  @click="changePage(currentPage + 1)"
                >
                  »
                </button>
              </div>
            </div>

            <div v-if="props.words?.length === 0" class="alert alert-info mt-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="h-6 w-6 shrink-0 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>Bu pakette kelime bulunmamaktadır.</span>
            </div>

            <div v-else-if="!hasEnoughWords" class="alert alert-warning mt-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="h-6 w-6 shrink-0 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                ></path>
              </svg>
              <span>Oyunları başlatabilmek için en az 5 kelime gerekiyor.</span>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </CheckScreen>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { Link, usePage, router } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';
import MultipleChoice from '@/Pages/Rendition/_components/MultipleChoice.vue';
import TranslateWord from '@/Pages/Rendition/_components/TranslateWord.vue';
import WordCompletion from '@/Pages/Rendition/_components/WordCompletion.vue';

const props = defineProps({
  words: Array,
  pack: Object,
  error: String,
  screen: Object,
});

const isLoading = ref(false);
const isLoggedIn = computed(() => !!usePage().props.auth?.user);
const showGameInterface = ref(false);
const currentGame = ref('');
const loadingGame = ref(false);
const prioritizeUnlearned = ref(true);

// Filtreleme ve arama
const searchQuery = ref('');
const filterType = ref('');
const filterStatus = ref('');

// Pagination için state
const currentPage = ref(1);
const perPage = ref(10);

// URL'den paket slug'ını almak için yardımcı fonksiyon
const getPackSlugFromUrl = () => {
  const path = window.location.pathname;
  const segments = path.split('/');
  return segments[segments.length - 1];
};

// Oyun seçenekleri
const games = [
  { name: 'Çoktan Seçmeli', route: 'multiple-choice' },
  { name: 'Boşluk Doldurma', route: 'fill-in-the-blank' },
  { name: 'Kelime Tamamlama', route: 'word-completion' },
];

// Basitleştirilmiş oyun ayarları
const gameConfig = ref({
  questionCount: 10,
});

// Kelimeleri filtrele
const filteredWordList = computed(() => {
  if (!props.words) return [];

  let result = [...props.words];

  // Arama filtresi
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim();
    result = result.filter(
      (word) => word.word.toLowerCase().includes(query) || word.meaning.toLowerCase().includes(query)
    );
  }

  // Tür filtresi
  if (filterType.value) {
    result = result.filter((word) => word.type === filterType.value);
  }

  // Durum filtresi
  if (filterStatus.value !== '') {
    const status = parseInt(filterStatus.value);
    result = result.filter((word) => word.learning_status === status);
  }

  return result;
});

// Pagination'a göre kelime listesi
const displayedWords = computed(() => {
  const startIndex = (currentPage.value - 1) * perPage.value;
  return filteredWordList.value.slice(startIndex, startIndex + perPage.value);
});

// Toplam sayfa sayısı
const totalPages = computed(() => {
  return Math.ceil(filteredWordList.value.length / perPage.value);
});

// Pagination bilgisi
const paginationInfo = computed(() => {
  const start = (currentPage.value - 1) * perPage.value + 1;
  const end = Math.min(start + perPage.value - 1, filteredWordList.value.length);
  return `${start}-${end} / ${filteredWordList.value.length}`;
});

// Sayfa değiştirme
const changePage = (page) => {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
};

// Filtreleme işlemi
const filterWords = () => {
  isLoading.value = true;
  currentPage.value = 1;

  // Yapay yükleme süresi
  setTimeout(() => {
    isLoading.value = false;
  }, 300);
};

// Filtered words for game
const filteredWords = computed(() => {
  if (!props.words) return [];

  let wordsToUse = [...props.words];

  // Prioritize unlearned words if selected
  if (prioritizeUnlearned.value) {
    wordsToUse.sort((a, b) => {
      return (a.learning_status || 0) - (b.learning_status || 0);
    });
  }

  // Limit to questionCount words
  return wordsToUse.slice(0, gameConfig.value.questionCount);
});

const hasEnoughWords = computed(() => props.words && props.words.length >= 5);

// Oyunu başlat
const startGame = (gameType) => {
  if (!hasEnoughWords.value) return;

  loadingGame.value = true;
  currentGame.value = gameType;
  showGameInterface.value = true;

  // Artificial delay to ensure component transitions properly
  setTimeout(() => {
    loadingGame.value = false;
  }, 500);
};

// Oyun tamamlandığında
const handleGameComplete = () => {
  showGameInterface.value = false;
  currentGame.value = '';
};

// Helper for parsing URL query parameters
const queryParams = computed(() => {
  const params = new URLSearchParams(window.location.search);
  return {
    game: params.get('game') || null,
  };
});

// Metin kısaltma
const truncateText = (text, length) => {
  if (!text) return '';
  return text.length > length ? text.substring(0, length) + '...' : text;
};

// Zorluk seviyesi için stil ve etiket
const getDifficultyBadgeClass = (level) => {
  switch (Number(level)) {
    case 1:
      return 'badge-success';
    case 2:
      return 'badge-info';
    case 3:
      return 'badge-warning';
    case 4:
      return 'badge-error';
    default:
      return 'badge-ghost';
  }
};

const getDifficultyLabel = (level) => {
  switch (Number(level)) {
    case 1:
      return 'Kolay';
    case 2:
      return 'Orta';
    case 3:
      return 'Zor';
    case 4:
      return 'Çok Zor';
    default:
      return 'Belirsiz';
  }
};

// Öğrenme durumu için stil ve etiket
const getLearningStatusBadgeClass = (status) => {
  switch (Number(status)) {
    case 0:
      return 'badge-ghost';
    case 1:
      return 'badge-warning';
    case 2:
      return 'badge-success';
    default:
      return 'badge-ghost';
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

// Filtrelerdeki değişiklikleri izle
watch([searchQuery, filterType, filterStatus], () => {
  if (searchQuery.value.length > 2 || searchQuery.value.length === 0) {
    filterWords();
  }
});

// Sayfa yüklendiğinde, URL'deki oyun parametresini kontrol et
onMounted(() => {
  const gameParam = queryParams.value.game;
  if (gameParam && hasEnoughWords.value) {
    startGame(gameParam);
  }
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

.game-transition-enter-active,
.game-transition-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.game-transition-enter-from,
.game-transition-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.game-transition-enter-to,
.game-transition-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
