<template>
  <div class="flex min-h-screen flex-col items-center justify-center">
    <!-- Quiz Tamamlandıysa -->
    <div
      v-if="!gameState.isPlaying && gameState.userResponses.length > 0"
      class="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <h2 class="mb-2 text-2xl font-semibold text-gray-900">Test Özeti</h2>
      <div class="mb-4 text-center">
        <p class="text-4xl font-bold text-gray-900">{{ calculateScore }} / 100</p>
        <p class="text-sm text-gray-600">Puan</p>
      </div>
      <div class="mb-4 grid grid-cols-2 gap-4 rounded-lg bg-gray-50 p-4">
        <div class="text-center">
          <p class="text-2xl font-bold text-green-600">{{ correctCount }}</p>
          <p class="text-sm text-gray-600">Doğru</p>
        </div>
        <div class="text-center">
          <p class="text-2xl font-bold text-red-600">{{ incorrectCount }}</p>
          <p class="text-sm text-gray-600">Yanlış</p>
        </div>
      </div>

      <!-- Cevap Listesi -->
      <div class="mb-4 max-h-60 overflow-y-auto">
        <h3 class="mb-2 font-medium text-gray-700">Cevaplarınız:</h3>
        <ul class="space-y-2 text-left text-sm text-gray-800">
          <li
            v-for="response in gameState.userResponses"
            :key="response.word_id"
            class="flex items-center justify-between rounded-md bg-gray-50 px-4 py-2"
          >
            <div class="flex flex-col">
              <span :class="response.correct ? 'font-medium text-green-600' : 'font-medium text-red-600'">
                {{ wordsMap[response.word_id]?.word || 'Unknown' }}
              </span>
              <span class="text-xs text-gray-500">
                {{ wordsMap[response.word_id]?.meaning || '' }}
              </span>
            </div>
            <span :class="response.correct ? 'text-lg text-green-600' : 'text-lg text-red-600'">
              {{ response.correct ? '✓' : '✗' }}
            </span>
          </li>
        </ul>
      </div>

      <div class="flex gap-2">
        <button
          @click="emit('game-completed')"
          class="flex-1 rounded-lg bg-black px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-gray-700"
        >
          Pakete Dön
        </button>
        <button
          @click="restartGame"
          class="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
        >
          Tekrar Başla
        </button>
      </div>
    </div>

    <!-- Quiz Devam Ediyorsa -->
    <div
      v-else
      class="relative w-full max-w-md rounded-2xl border border-gray-200 p-6 shadow-sm transition-colors duration-500"
      :class="{
        'bg-white': !gameState.showAnswer,
        'bg-green-50': gameState.showAnswer && gameState.isCorrect,
        'bg-red-50': gameState.showAnswer && !gameState.isCorrect,
      }"
    >
      <!-- Progress Bar -->
      <div class="mb-4 h-1 w-full overflow-hidden rounded-full bg-gray-200">
        <div class="duration-2000 h-full bg-black transition-all" :style="{ width: `${gameState.progress}%` }"></div>
      </div>

      <!-- Soru Sayacı -->
      <div class="mb-4 text-right text-sm text-gray-500">
        Soru {{ gameState.currentIndex + 1 }} / {{ gameState.totalQuestions }}
      </div>

      <!-- Soru -->
      <div v-if="gameState.currentQuestion" class="space-y-4">
        <div>
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold text-gray-900">Eksik harfleri tamamlayın:</h2>
          </div>
          <p class="mt-1 text-sm text-gray-500">Anlam: {{ gameState.currentQuestion.meaning }}</p>
        </div>

        <!-- Kelime Gösterimi -->
        <div class="flex justify-center space-x-2">
          <div
            v-for="(char, index) in gameState.currentQuestion.word"
            :key="index"
            class="flex h-12 w-12 items-center justify-center rounded-lg border-2 text-xl font-bold"
            :class="{
              'border-gray-200 bg-gray-50': gameState.maskedIndices.includes(index),
              'border-gray-300 bg-white': !gameState.maskedIndices.includes(index),
              'text-red-600':
                gameState.showAnswer &&
                !gameState.isCorrect &&
                gameState.maskedIndices.includes(index) &&
                gameState.selectedLetters[gameState.maskedIndices.indexOf(index)]?.toLowerCase() !== char.toLowerCase(),
              'text-green-600':
                gameState.showAnswer &&
                gameState.maskedIndices.includes(index) &&
                gameState.selectedLetters[gameState.maskedIndices.indexOf(index)]?.toLowerCase() === char.toLowerCase(),
            }"
          >
            <template v-if="gameState.maskedIndices.includes(index)">
              <span v-if="gameState.selectedLetters[gameState.maskedIndices.indexOf(index)]">
                {{ gameState.selectedLetters[gameState.maskedIndices.indexOf(index)] }}
              </span>
              <span v-else>_</span>
            </template>
            <span v-else>{{ char }}</span>
          </div>
        </div>

        <!-- Doğru Cevap Gösterimi -->
        <div v-if="gameState.showAnswer && !gameState.isCorrect" class="mt-4 rounded-lg bg-yellow-50 p-4">
          <p class="text-sm text-yellow-800">
            Doğru cevap: <span class="font-bold">{{ gameState.currentQuestion.word }}</span>
          </p>
        </div>

        <!-- Harf Seçimi -->
        <div class="grid grid-cols-7 gap-2">
          <button
            v-for="char in getAlphabet()"
            :key="char"
            @click="selectLetter(char)"
            :disabled="gameState.showAnswer || gameState.selectedLetters.includes(char)"
            class="h-10 w-10 rounded-lg border border-gray-200 text-center text-lg font-medium transition hover:bg-gray-50 disabled:opacity-50"
          >
            {{ char }}
          </button>
          <button
            @click="selectLetter(' ')"
            :disabled="gameState.showAnswer || gameState.selectedLetters.includes(' ')"
            class="h-10 w-10 rounded-lg border border-gray-200 text-center text-lg font-medium transition hover:bg-gray-50 disabled:opacity-50"
          >
            ␣
          </button>
        </div>

        <!-- Seçilen Harfleri Temizle Butonu -->
        <button
          @click="clearSelectedLetters"
          class="w-full rounded-lg border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-700 transition hover:bg-gray-100"
        >
          Seçilen Harfleri Temizle
        </button>

        <!-- Kontrol Butonu -->
        <button
          @click="checkAnswer"
          :disabled="gameState.showAnswer || !isAnswerComplete"
          class="w-full rounded-lg bg-black px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-gray-700 disabled:opacity-50"
        >
          Kontrol Et
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { usePage, router, Link } from '@inertiajs/vue3';

const props = defineProps({
  gameType: String,
  packSlug: String,
  words: Array,
  gameConfig: Object,
});

const emit = defineEmits(['game-completed']);

const page = usePage();
const allPacks = page.props.languagePacks || [];

// Find the pack using the slug
const currentPack = computed(() => {
  if (!props.packSlug) return null;
  return allPacks.find((pack) => pack.slug === props.packSlug);
});

// Oyun durumu
const gameState = ref({
  isLoading: true,
  isPlaying: false,
  currentQuestion: null,
  showAnswer: false,
  isCorrect: false,
  progress: 0,
  currentIndex: 0,
  totalQuestions: 0,
  userResponses: [],
  maskedIndices: [],
  selectedLetters: [],
  hintShown: false,
  currentHintIndex: 0,
});

// Kelimeleri kullan
const words = ref([]);
const wordsMap = computed(() => Object.fromEntries(words.value.map((word) => [word.id, word])));

// Cevabın tamamlanıp tamamlanmadığını kontrol et
const isAnswerComplete = computed(() => {
  return gameState.value.maskedIndices.length === gameState.value.selectedLetters.length;
});

// Oyunu başlat
const startGameWithConfig = async () => {
  if (!props.words || props.words.length < 2) {
    alert('Oyunu başlatmak için en az 2 kelime gereklidir.');
    return;
  }

  gameState.value.isLoading = true;

  // Kelimeleri karıştır
  let gameWords = [...props.words];
  gameWords.sort(() => Math.random() - 0.5);

  // Kelimeleri yükle
  await new Promise((resolve) => {
    words.value = gameWords;
    gameState.value.totalQuestions = words.value.length;
    gameState.value.currentIndex = 0;
    gameState.value.userResponses = [];
    resolve();
  });

  gameState.value.isLoading = false;
  gameState.value.isPlaying = true;
  loadNextQuestion();
};

// Puan hesapla
const calculateScore = computed(() => {
  if (!gameState.value.userResponses.length) return 0;
  const correctAnswers = gameState.value.userResponses.filter((response) => response.correct).length;
  return Math.round((correctAnswers / gameState.value.userResponses.length) * 100);
});

// Türkçe alfabe
const getAlphabet = () => {
  return 'ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ'.split('');
};

// Doğru ve yanlış sayıları
const correctCount = computed(() => {
  return gameState.value.userResponses.filter((response) => response.correct).length;
});

const incorrectCount = computed(() => {
  return gameState.value.userResponses.filter((response) => !response.correct).length;
});

// Sonraki soruyu yükle
const loadNextQuestion = () => {
  if (gameState.value.currentIndex >= words.value.length) {
    endGame();
    return;
  }

  gameState.value.currentQuestion = words.value[gameState.value.currentIndex];
  gameState.value.selectedLetters = [];
  gameState.value.showAnswer = false;
  gameState.value.hintShown = false;
  gameState.value.currentHintIndex = 0;

  // Rastgele maskeli indeksler oluştur
  createMaskedIndices();
};

// Rastgele maskeli indeksler oluştur
const createMaskedIndices = () => {
  const word = gameState.value.currentQuestion.word;
  const wordLength = word.length;

  // 3-5 arası rastgele maskeli harf sayısı belirle (kelime uzunluğuna bağlı olarak)
  const maskCountMap = {
    1: 1,
    2: 1,
    3: 1,
    4: 2,
    5: 2,
    6: 3,
    7: 3,
    8: 3,
    9: 4,
    10: 4,
  };

  const defaultMaskCount = Math.min(4, Math.floor(wordLength / 2));
  const maskCount = maskCountMap[wordLength] || defaultMaskCount;

  // Unique indeksler oluştur
  const indices = new Set();
  while (indices.size < maskCount) {
    const randomIndex = Math.floor(Math.random() * wordLength);
    indices.add(randomIndex);
  }

  gameState.value.maskedIndices = Array.from(indices).sort((a, b) => a - b);
};

// Harf seç
const selectLetter = (letter) => {
  if (gameState.value.showAnswer) return;
  if (gameState.value.selectedLetters.length >= gameState.value.maskedIndices.length) return;

  gameState.value.selectedLetters.push(letter);

  if (gameState.value.selectedLetters.length === gameState.value.maskedIndices.length) {
    // Otomatik kontrol et
    checkAnswer();
  }
};

// Seçilen harfleri temizle
const clearSelectedLetters = () => {
  if (gameState.value.showAnswer) return;
  gameState.value.selectedLetters = [];
};

// Cevabı kontrol et
const checkAnswer = () => {
  if (gameState.value.showAnswer) return;
  if (!isAnswerComplete.value) return;

  const word = gameState.value.currentQuestion.word;
  let isCorrect = true;

  for (let i = 0; i < gameState.value.maskedIndices.length; i++) {
    const correctChar = word[gameState.value.maskedIndices[i]].toLowerCase();
    const userChar = gameState.value.selectedLetters[i].toLowerCase();

    if (correctChar !== userChar) {
      isCorrect = false;
      break;
    }
  }

  gameState.value.isCorrect = isCorrect;

  // Kullanıcı yanıtını kaydet
  gameState.value.userResponses.push({
    word_id: gameState.value.currentQuestion.id,
    correct: isCorrect,
  });

  // Cevabı göster
  gameState.value.showAnswer = true;

  // Progress bar'ı başlat
  gameState.value.progress = 0;
  const interval = setInterval(() => {
    gameState.value.progress += 1;
    if (gameState.value.progress >= 100) {
      clearInterval(interval);
      // Sonraki soruya geç
      gameState.value.currentIndex++;
      gameState.value.selectedLetters = [];
      gameState.value.showAnswer = false;
      gameState.value.progress = 0;
      loadNextQuestion();
    }
  }, 20); // 2 saniyede 100'e ulaşmak için 20ms aralıklarla artır
};

// Oyunu bitir
const endGame = () => {
  gameState.value.isPlaying = false;
  updateWordStats();
  // Display summary screen without emitting the event
};

// Oyunu yeniden başlat
const restartGame = () => {
  gameState.value = {
    isLoading: true,
    isPlaying: false,
    currentQuestion: null,
    showAnswer: false,
    isCorrect: false,
    progress: 0,
    currentIndex: 0,
    totalQuestions: 0,
    userResponses: [],
    maskedIndices: [],
    selectedLetters: [],
    hintShown: false,
    currentHintIndex: 0,
  };
  startGameWithConfig();
};

// Kelime istatistiklerini güncelle
const updateWordStats = () => {
  if (!gameState.value.userResponses.length) return;

  const updateData = gameState.value.userResponses.map((response) => ({
    word_id: response.word_id,
    review_count: 1,
    incorrect_count: response.correct ? 0 : 1,
  }));

  router.post(
    '/update-words',
    { words: updateData },
    {
      preserveState: true,
      onSuccess: () => console.log('Words updated successfully'),
      onError: (error) => console.error('Failed to update word stats', error),
    }
  );
};

// Sayfa yüklendiğinde oyunu başlat
onMounted(() => {
  startGameWithConfig();
});
</script>
