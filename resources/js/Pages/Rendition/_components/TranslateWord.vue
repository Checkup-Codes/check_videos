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
            <h2 class="text-xl font-semibold text-gray-900">
              "{{ gameState.currentQuestion.word }}" kelimesinin anlamı nedir?
            </h2>
            <button
              v-if="!gameState.showAnswer"
              @click="showHint"
              class="rounded-lg border border-gray-200 px-3 py-1 text-sm text-gray-600 hover:bg-gray-50"
              :disabled="
                gameState.hintShown &&
                (!gameState.currentQuestion.example_sentences ||
                  gameState.currentQuestion.example_sentences.length <= 1)
              "
            >
              {{
                gameState.hintShown
                  ? `İpucu (${gameState.currentHintIndex + 1}/${gameState.currentQuestion.example_sentences?.length || 0})`
                  : 'İpucu Göster'
              }}
            </button>
          </div>
          <p class="mt-1 text-sm text-gray-500">Kelime Türü: {{ getWordType(gameState.currentQuestion.type) }}</p>
        </div>

        <!-- İpucu Gösterimi -->
        <div v-if="gameState.hintShown" class="rounded-lg bg-blue-50 p-3">
          <p class="text-sm text-blue-600">Örnek Cümle:</p>
          <p
            v-if="gameState.currentQuestion.example_sentences && gameState.currentQuestion.example_sentences.length > 0"
            class="mt-1 text-sm text-gray-700"
          >
            {{ gameState.currentQuestion.example_sentences[gameState.currentHintIndex].sentence }}
          </p>
          <p v-else class="mt-1 text-sm text-gray-700">Bu kelime için örnek cümle bulunmuyor.</p>
        </div>

        <input
          v-model="gameState.userInput"
          :disabled="gameState.showAnswer"
          type="text"
          placeholder="Çeviriyi girin"
          class="w-full rounded-lg border border-gray-300 p-3 text-base text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          @keyup.enter="checkAnswer"
        />

        <!-- Cevap Gösterimi -->
        <div
          v-if="gameState.showAnswer"
          class="mt-2 rounded-lg p-3"
          :class="{
            'bg-green-100': gameState.isCorrect,
            'bg-red-100': !gameState.isCorrect,
          }"
        >
          <p
            class="text-sm"
            :class="{
              'text-green-600': gameState.isCorrect,
              'text-red-600': !gameState.isCorrect,
            }"
          >
            {{ gameState.isCorrect ? 'Doğru!' : 'Yanlış!' }}
          </p>
          <p class="mt-1 font-medium text-gray-900">Doğru cevap: {{ gameState.currentQuestion.meaning }}</p>
        </div>

        <button
          v-if="!gameState.showAnswer"
          @click="checkAnswer"
          class="w-full rounded-lg bg-black px-4 py-2 text-sm font-medium text-white shadow-md transition hover:bg-gray-700"
        >
          Cevabı Gönder
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
  userInput: '',
  showAnswer: false,
  isCorrect: false,
  progress: 0,
  currentIndex: 0,
  totalQuestions: 0,
  userResponses: [],
  hintShown: false,
  currentHintIndex: 0,
});

// Kelimeleri kullan
const words = ref([]);
const wordsMap = computed(() => Object.fromEntries(words.value.map((word) => [word.id, word])));

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

// İpucu göster
const showHint = () => {
  if (
    !gameState.value.currentQuestion.example_sentences ||
    gameState.value.currentQuestion.example_sentences.length === 0
  ) {
    gameState.value.hintShown = true;
    return;
  }

  if (!gameState.value.hintShown) {
    gameState.value.hintShown = true;
    gameState.value.currentHintIndex = 0;
  } else {
    gameState.value.currentHintIndex =
      (gameState.value.currentHintIndex + 1) % gameState.value.currentQuestion.example_sentences.length;
  }
};

// Sonraki soruyu yükle
const loadNextQuestion = () => {
  if (gameState.value.currentIndex >= words.value.length) {
    endGame();
    return;
  }

  gameState.value.currentQuestion = words.value[gameState.value.currentIndex];
  gameState.value.userInput = '';
  gameState.value.showAnswer = false;
  gameState.value.hintShown = false;
  gameState.value.currentHintIndex = 0;
};

// Cevabı kontrol et
const checkAnswer = () => {
  if (!gameState.value.userInput.trim() || gameState.value.showAnswer) return;

  const userAnswer = gameState.value.userInput.trim().toLowerCase();
  const correctAnswer = gameState.value.currentQuestion.meaning.toLowerCase();

  gameState.value.isCorrect = userAnswer === correctAnswer;

  // Kullanıcı yanıtını kaydet
  gameState.value.userResponses.push({
    word_id: gameState.value.currentQuestion.id,
    correct: gameState.value.isCorrect,
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
      gameState.value.userInput = '';
      gameState.value.showAnswer = false;
      gameState.value.progress = 0;
      loadNextQuestion();
    }
  }, 20); // 2 saniyede 100'e ulaşmak için 20ms aralıklarla artır
};

// Puan hesapla
const calculateScore = computed(() => {
  if (!gameState.value.userResponses.length) return 0;
  const correctAnswers = gameState.value.userResponses.filter((response) => response.correct).length;
  return Math.round((correctAnswers / gameState.value.userResponses.length) * 100);
});

// Kelime türü metni
const getWordType = (type) => {
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
      return 'Bilinmiyor';
  }
};

// Oyunu bitir
const endGame = () => {
  gameState.value.isPlaying = false;
  updateWordStats();
  // Display summary screen without emitting the event
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

// Doğru ve yanlış sayıları
const correctCount = computed(() => {
  return gameState.value.userResponses.filter((response) => response.correct).length;
});

const incorrectCount = computed(() => {
  return gameState.value.userResponses.filter((response) => !response.correct).length;
});

// Oyunu yeniden başlat
const restartGame = () => {
  gameState.value = {
    isLoading: true,
    isPlaying: false,
    currentQuestion: null,
    userInput: '',
    showAnswer: false,
    isCorrect: false,
    progress: 0,
    currentIndex: 0,
    totalQuestions: 0,
    userResponses: [],
    hintShown: false,
    currentHintIndex: 0,
  };
  startGameWithConfig();
};

// Oyunu başlat
onMounted(() => {
  startGameWithConfig();
});
</script>
