<template>
  <CheckScreen>
    <div class="px-5 transition-all duration-200 dark:border-gray-700 dark:bg-base-100">
      <div class="mb-4 flex items-center justify-between">
        <div class="flex-1">
          <h1 class="p-5 text-2xl font-bold">
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

      <!-- Filtreler -->
      <div v-if="!showGameInterface" class="mb-4 flex flex-wrap gap-3">
        <!-- Arama Kutusu -->
        <div class="form-control min-w-[200px] flex-1">
          <div class="input-group">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Kelime ara..."
              class="input-bordered input input-sm w-52"
              @keyup.enter="filterWords"
            />
            <button class="btn btn-sm btn-square mx-5" @click="filterWords">
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

        <!-- Tür Filtresi
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
        </select> -->

        <!-- Durum Filtresi 
        <select
          v-model="filterStatus"
          class="select-bordered select select-sm min-w-[150px] flex-1"
          @change="filterWords"
        >
          <option value="">Tüm Durumlar</option>
          <option value="0">Öğrenilmedi</option>
          <option value="1">Öğreniliyor</option>
          <option value="2">Öğrenildi</option>
        </select>-->
      </div>

      <!-- Oyun Komponentleri -->
      <transition name="game-transition" mode="out-in">
        <div v-if="showGameInterface" key="game" class="my-20">
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
          <!-- Oyun Ayarları -->
          <div class="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <!-- Oyun Butonları -->
            <div class="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <button
                @click="startGame('multiple-choice')"
                class="group relative flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-blue-500 hover:shadow-md"
                :disabled="!hasEnoughWords"
              >
                <div
                  class="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-500 transition-all group-hover:bg-blue-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <div class="text-left">
                  <h3 class="font-medium text-gray-900">Çoktan Seçmeli</h3>
                  <p class="text-sm text-gray-500">Doğru cevabı seçin</p>
                </div>
              </button>

              <button
                @click="startGame('fill-in-the-blank')"
                class="group relative flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-green-500 hover:shadow-md"
                :disabled="!hasEnoughWords"
              >
                <div
                  class="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-500 transition-all group-hover:bg-green-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </div>
                <div class="text-left">
                  <h3 class="font-medium text-gray-900">Boşluk Doldurma</h3>
                  <p class="text-sm text-gray-500">Eksik kelimeyi yazın</p>
                </div>
              </button>

              <button
                @click="startGame('word-completion')"
                class="group relative flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-purple-500 hover:shadow-md"
                :disabled="!hasEnoughWords"
              >
                <div
                  class="flex h-12 w-12 items-center justify-center rounded-full bg-purple-50 text-purple-500 transition-all group-hover:bg-purple-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                </div>
                <div class="text-left">
                  <h3 class="font-medium text-gray-900">Kelime Tamamlama</h3>
                  <p class="text-sm text-gray-500">Eksik harfleri tamamlayın</p>
                </div>
              </button>
            </div>

            <div v-if="isLoggedIn" class="collapse">
              <input type="checkbox" class="peer" />
              <div class="collapse-title text-sm font-medium text-gray-700">
                Oyun Ayarları ve Filtreler
                <span class="ml-2 text-xs text-gray-500">(Varsayılan: Rastgele)</span>
              </div>
              <div class="collapse-content">
                <div class="space-y-4">
                  <!-- Sıfırlama Butonu -->
                  <div class="flex justify-end">
                    <button @click="resetGameConfig" class="btn btn-ghost btn-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="mr-1 h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      Ayarları Sıfırla
                    </button>
                  </div>

                  <!-- Kelime Türü Filtresi -->
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text font-medium">Kelime Türü</span>
                    </label>
                    <div class="flex flex-wrap gap-2">
                      <label
                        v-for="(count, type) in wordCounts.types"
                        :key="type"
                        class="btn btn-sm"
                        :class="{
                          'btn-primary': gameConfig.wordType === type,
                          'cursor-not-allowed opacity-50': !hasEnoughWords(count),
                        }"
                      >
                        <input
                          type="radio"
                          v-model="gameConfig.wordType"
                          :value="type"
                          class="hidden"
                          :disabled="!hasEnoughWords(count)"
                        />
                        {{ getWordTypeLabel(type) }} ({{ count }})
                      </label>
                    </div>
                  </div>

                  <!-- Öğrenme Durumu Filtresi -->
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text font-medium">Öğrenme Durumu</span>
                    </label>
                    <div class="flex flex-wrap gap-2">
                      <label
                        v-for="(count, status) in wordCounts.status"
                        :key="status"
                        class="btn btn-sm"
                        :class="{
                          'btn-primary': gameConfig.learningStatus === status.toString(),
                          'cursor-not-allowed opacity-50': !hasEnoughWords(count),
                        }"
                      >
                        <input
                          type="radio"
                          v-model="gameConfig.learningStatus"
                          :value="status.toString()"
                          class="hidden"
                          :disabled="!hasEnoughWords(count)"
                        />
                        {{ getLearningStatusLabel(status) }} ({{ count }})
                      </label>
                    </div>
                  </div>

                  <!-- Zorluk Seviyesi Filtresi -->
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text font-medium">Zorluk Seviyesi</span>
                    </label>
                    <div class="flex flex-wrap gap-2">
                      <label
                        v-for="(count, level) in wordCounts.difficulty"
                        :key="level"
                        class="btn btn-sm"
                        :class="{
                          'btn-primary': gameConfig.difficultyLevel === level,
                          'cursor-not-allowed opacity-50': !hasEnoughWords(count),
                        }"
                      >
                        <input
                          type="radio"
                          v-model="gameConfig.difficultyLevel"
                          :value="level"
                          class="hidden"
                          :disabled="!hasEnoughWords(count)"
                        />
                        {{ getDifficultyLabel(level) }} ({{ count }})
                      </label>
                    </div>
                  </div>

                  <!-- Öncelik Filtreleri -->
                  <div class="divider text-xs text-gray-500">Öncelik Filtreleri</div>

                  <div class="grid grid-cols-2 gap-2">
                    <label
                      class="flex cursor-pointer items-center justify-between rounded-lg border p-3 hover:bg-gray-50"
                    >
                      <span class="text-sm">Son Öğrenilenler</span>
                      <input type="checkbox" class="toggle toggle-sm" v-model="gameConfig.prioritizeRecentlyLearned" />
                    </label>

                    <label
                      class="flex cursor-pointer items-center justify-between rounded-lg border p-3 hover:bg-gray-50"
                    >
                      <span class="text-sm">İşaretlenenler</span>
                      <input type="checkbox" class="toggle toggle-sm" v-model="gameConfig.prioritizeFlagged" />
                    </label>

                    <label
                      class="flex cursor-pointer items-center justify-between rounded-lg border p-3 hover:bg-gray-50"
                    >
                      <span class="text-sm">En Çok Yanlış Yapılanlar</span>
                      <input type="checkbox" class="toggle toggle-sm" v-model="gameConfig.prioritizeMostIncorrect" />
                    </label>

                    <label
                      class="flex cursor-pointer items-center justify-between rounded-lg border p-3 hover:bg-gray-50"
                    >
                      <span class="text-sm">En Eski Güncellenenler</span>
                      <input type="checkbox" class="toggle toggle-sm" v-model="gameConfig.prioritizeOldestUpdated" />
                    </label>

                    <label
                      class="flex cursor-pointer items-center justify-between rounded-lg border p-3 hover:bg-gray-50"
                    >
                      <span class="text-sm">Soru Sayısı</span>
                      <select v-model="gameConfig.questionCount" class="select-bordered select select-sm w-24">
                        <option v-if="props.words?.length < 60" :value="props.words?.length">
                          Tüm Paket ({{ props.words?.length }})
                        </option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                      </select>
                    </label>
                  </div>
                </div>
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
                  <th>
                    <div class="flex items-center gap-2">
                      Tür
                      <button
                        class="btn btn-ghost btn-xs"
                        @click="sortTable('type')"
                        :class="{
                          'text-primary': sortState.type !== 'none',
                          'opacity-50': sortState.type === 'none',
                        }"
                      >
                        <svg
                          v-if="sortState.type === 'none'"
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
                            d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                          />
                        </svg>
                        <svg
                          v-else-if="sortState.type === 'asc'"
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                        </svg>
                        <svg
                          v-else
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                  </th>
                  <th>Durum</th>
                  <th>
                    <div class="flex items-center gap-2">
                      Başarı
                      <button
                        class="btn btn-ghost btn-xs"
                        @click="sortTable('success')"
                        :class="{
                          'text-primary': sortState.success !== 'none',
                          'opacity-50': sortState.success === 'none',
                        }"
                      >
                        <svg
                          v-if="sortState.success === 'none'"
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
                            d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                          />
                        </svg>
                        <svg
                          v-else-if="sortState.success === 'asc'"
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                        </svg>
                        <svg
                          v-else
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                  </th>
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
                  <td>{{ getPrimaryMeaning(word) }}</td>
                  <td>
                    <div class="badge">{{ word.type }}</div>
                  </td>
                  <td>
                    <div class="badge badge-sm" :class="getLearningStatusBadgeClass(word.learning_status)">
                      {{ getLearningStatusLabel(word.learning_status) }}
                    </div>
                  </td>
                  <td>
                    <div class="badge badge-sm" :class="getSuccessRateBadgeClass(calculateSuccessRate(word).rate)">
                      {{ calculateSuccessRate(word).label }}
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
          <div v-if="sortedWords.length > perPage" class="mt-4 flex justify-between">
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

// Oyun ayarları
const gameConfig = ref({
  questionCount: 10,
  prioritizeUnlearned: false,
  prioritizeRecentlyLearned: false,
  prioritizeFlagged: false,
  prioritizeMostIncorrect: false,
  prioritizeOldestUpdated: false,
  wordType: '',
  learningStatus: '',
  difficultyLevel: '',
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
  return sortedWords.value.slice(startIndex, startIndex + perPage.value);
});

// Toplam sayfa sayısı
const totalPages = computed(() => {
  return Math.ceil(sortedWords.value.length / perPage.value);
});

// Pagination bilgisi
const paginationInfo = computed(() => {
  const start = (currentPage.value - 1) * perPage.value + 1;
  const end = Math.min(start + perPage.value - 1, sortedWords.value.length);
  return `${start}-${end} / ${sortedWords.value.length}`;
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

  // Kelime türüne göre filtrele
  if (gameConfig.value.wordType) {
    wordsToUse = wordsToUse.filter((word) => word.type === gameConfig.value.wordType);
  }

  // Öğrenme durumuna göre filtrele
  if (gameConfig.value.learningStatus !== '') {
    wordsToUse = wordsToUse.filter((word) => word.learning_status === parseInt(gameConfig.value.learningStatus));
  }

  // Zorluk seviyesine göre filtrele
  if (gameConfig.value.difficultyLevel) {
    wordsToUse = wordsToUse.filter((word) => word.difficulty_level === gameConfig.value.difficultyLevel);
  }

  // Öncelik filtrelerini uygula
  if (gameConfig.value.prioritizeRecentlyLearned) {
    wordsToUse.sort((a, b) => {
      const aDate = new Date(a.last_reviewed_at || 0);
      const bDate = new Date(b.last_reviewed_at || 0);
      return bDate - aDate;
    });
  }

  if (gameConfig.value.prioritizeFlagged) {
    wordsToUse.sort((a, b) => {
      if (a.is_flagged && !b.is_flagged) return -1;
      if (!a.is_flagged && b.is_flagged) return 1;
      return 0;
    });
  }

  if (gameConfig.value.prioritizeMostIncorrect) {
    wordsToUse.sort((a, b) => {
      const aIncorrect = a.incorrect_count || 0;
      const bIncorrect = b.incorrect_count || 0;
      return bIncorrect - aIncorrect;
    });
  }

  if (gameConfig.value.prioritizeOldestUpdated) {
    wordsToUse.sort((a, b) => {
      // Hiç sorulmamış kelimeleri (review_count = 0 veya last_reviewed_at = null) en başa al
      const aNeverReviewed = !a.review_count || a.review_count === 0 || !a.last_reviewed_at;
      const bNeverReviewed = !b.review_count || b.review_count === 0 || !b.last_reviewed_at;

      if (aNeverReviewed && bNeverReviewed) return 0;
      if (aNeverReviewed) return -1;
      if (bNeverReviewed) return 1;

      // Sorulmuş kelimeleri last_reviewed_at'e göre sırala
      const aDate = new Date(a.last_reviewed_at);
      const bDate = new Date(b.last_reviewed_at);
      return aDate - bDate; // En eski tarihli olanlar önce
    });
  }

  // Öğrenilmemiş kelimelere öncelik ver
  if (prioritizeUnlearned.value) {
    wordsToUse.sort((a, b) => {
      return (a.learning_status || 0) - (b.learning_status || 0);
    });
  }

  // Son olarak rastgele karıştır
  wordsToUse = wordsToUse.sort(() => Math.random() - 0.5);

  // Seçilen soru sayısı kadar kelime döndür
  return wordsToUse.slice(0, parseInt(gameConfig.value.questionCount));
});

// Kelime sayılarını hesapla
const wordCounts = computed(() => {
  if (!props.words) return { types: {}, status: {}, difficulty: {} };

  const counts = {
    types: {},
    status: {},
    difficulty: {},
  };

  props.words.forEach((word) => {
    // Kelime türü sayıları
    counts.types[word.type] = (counts.types[word.type] || 0) + 1;

    // Öğrenme durumu sayıları
    counts.status[word.learning_status] = (counts.status[word.learning_status] || 0) + 1;

    // Zorluk seviyesi sayıları
    counts.difficulty[word.difficulty_level] = (counts.difficulty[word.difficulty_level] || 0) + 1;
  });

  return counts;
});

// Yeterli kelime var mı kontrol et
const hasEnoughWords = (count) => {
  return count >= 5;
};

// Oyunu başlat
const startGame = (gameType) => {
  // Seçili filtreye göre kelime sayısını kontrol et
  let filteredCount = props.words?.length || 0;

  if (gameConfig.value.wordType) {
    filteredCount = props.words?.filter((word) => word.type === gameConfig.value.wordType).length || 0;
  }

  if (gameConfig.value.learningStatus !== '') {
    filteredCount =
      props.words?.filter((word) => word.learning_status === parseInt(gameConfig.value.learningStatus)).length || 0;
  }

  if (gameConfig.value.difficultyLevel) {
    filteredCount =
      props.words?.filter((word) => word.difficulty_level === gameConfig.value.difficultyLevel).length || 0;
  }

  if (!hasEnoughWords(filteredCount)) {
    alert('Seçili kategoride yeterli kelime bulunmamaktadır. En az 5 kelime gereklidir.');
    return;
  }

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

// Başarı yüzdesini hesapla
const calculateSuccessRate = (word) => {
  const totalShows = word.review_count || 0;
  const incorrectCount = word.incorrect_count || 0;

  if (totalShows === 0) return { rate: 0, label: 'Hiç' };

  const successRate = ((totalShows - incorrectCount) / totalShows) * 100;
  return {
    rate: Math.round(successRate),
    label: `%${Math.round(successRate)}`,
  };
};

// Başarı yüzdesine göre renk sınıfını belirle
const getSuccessRateBadgeClass = (rate) => {
  if (rate === 0) return 'badge-ghost';
  if (rate >= 80) return 'badge-success';
  if (rate >= 60) return 'badge-info';
  if (rate >= 40) return 'badge-warning';
  return 'badge-error';
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
  if (gameParam) {
    startGame(gameParam);
  }
});

// Helper function to get the primary meaning from the word's meanings array
const getPrimaryMeaning = (word) => {
  if (word.meanings && word.meanings.length > 0) {
    // Find the primary meaning
    const primaryMeaning = word.meanings.find((m) => m.is_primary);
    // If a primary meaning exists, return it, otherwise return the first meaning
    if (primaryMeaning) {
      return truncateText(primaryMeaning.meaning, 50);
    }
    return truncateText(word.meanings[0].meaning, 50);
  }
  // Fallback to the old way (for backward compatibility)
  return word.meaning ? truncateText(word.meaning, 50) : '';
};

// Sıralama durumu
const sortState = ref({
  type: 'none', // 'none', 'asc', 'desc'
  success: 'none',
});

// Sıralama fonksiyonu
const sortTable = (column) => {
  if (sortState.value[column] === 'none') {
    sortState.value[column] = 'asc';
  } else if (sortState.value[column] === 'asc') {
    sortState.value[column] = 'desc';
  } else {
    sortState.value[column] = 'none';
  }

  // Diğer sütunun sıralamasını sıfırla
  const otherColumn = column === 'type' ? 'success' : 'type';
  sortState.value[otherColumn] = 'none';
};

// Sıralanmış kelimeler
const sortedWords = computed(() => {
  let result = [...filteredWordList.value];

  if (sortState.value.type !== 'none') {
    result.sort((a, b) => {
      const comparison = a.type.localeCompare(b.type);
      return sortState.value.type === 'asc' ? comparison : -comparison;
    });
  }

  if (sortState.value.success !== 'none') {
    result.sort((a, b) => {
      const aRate = calculateSuccessRate(a).rate;
      const bRate = calculateSuccessRate(b).rate;
      return sortState.value.success === 'asc' ? aRate - bRate : bRate - aRate;
    });
  }

  return result;
});

// Kelime türlerini Türkçe'ye çevir
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

// Ayarları sıfırla
const resetGameConfig = () => {
  gameConfig.value = {
    questionCount: 10,
    prioritizeUnlearned: false,
    prioritizeRecentlyLearned: false,
    prioritizeFlagged: false,
    prioritizeMostIncorrect: false,
    prioritizeOldestUpdated: false,
    wordType: '',
    learningStatus: '',
    difficultyLevel: '',
  };
};
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
