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
                {{ getPrimaryMeaning(wordsMap[response.word_id]) }}
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

        <div class="space-y-2">
          <button
            v-for="(option, index) in shuffledOptions"
            :key="index"
            @click="selectAnswer(option)"
            :disabled="gameState.showAnswer"
            class="w-full rounded-lg border border-gray-200 p-3 text-left text-base text-gray-900 transition hover:bg-gray-50 disabled:cursor-not-allowed"
            :class="{
              'border-green-500 bg-green-50':
                gameState.showAnswer && isCorrectAnswer(option, gameState.currentQuestion),
              'border-red-500 bg-red-50':
                gameState.showAnswer && !isCorrectAnswer(option, gameState.currentQuestion) && isSelectedAnswer(option),
            }"
          >
            {{ option.meaningText }}
          </button>
        </div>
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
  currentOptions: [],
  selectedAnswer: null,
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

// Go to the next question
const nextQuestion = () => {
  gameState.value.currentIndex++;
  gameState.value.progress = Math.round((gameState.value.currentIndex / gameState.value.totalQuestions) * 100);

  if (gameState.value.currentIndex < gameState.value.totalQuestions) {
    gameState.value.selectedAnswer = null;
    gameState.value.showAnswer = false;
    gameState.value.currentOptions = [];
    gameState.value.hintShown = false;
    gameState.value.currentHintIndex = 0;
    gameState.value.currentQuestion = words.value[gameState.value.currentIndex];
  } else {
    // Game over
    gameState.value.isPlaying = false;
  }
};

// Oyunu başlat
const startGameWithConfig = async () => {
  if (!props.words || props.words.length < 2) {
    alert('Oyunu başlatmak için en az 2 kelime gereklidir.');
    return;
  }

  gameState.value.isLoading = true;

  // Kelimeleri karıştır
  let gameWords = [...props.words];

  // Öğrenilmemiş kelimelere öncelik ver
  if (props.gameConfig.prioritizeUnlearned) {
    // Öğrenilmiş, öğreniliyor ve öğrenilmemiş olarak ayır
    const unlearned = gameWords.filter((w) => w.learning_status === 0);
    const learning = gameWords.filter((w) => w.learning_status === 1);
    const learned = gameWords.filter((w) => w.learning_status === 2);

    // Önce öğrenilmemiş, sonra öğreniliyor, sonra öğrenilmiş kelimelerden soru oluştur
    gameWords = [...unlearned, ...learning, ...learned];
  } else {
    // Rastgele karıştır
    gameWords = gameWords.sort(() => 0.5 - Math.random());
  }

  // Soru sayısını sınırla
  const questionCount = Math.min(props.gameConfig.questionCount, gameWords.length);
  gameWords = gameWords.slice(0, questionCount);

  // Oyun durumunu başlat
  gameState.value = {
    isLoading: false,
    isPlaying: true,
    currentQuestion: gameWords[0],
    currentOptions: [],
    selectedAnswer: null,
    showAnswer: false,
    isCorrect: false,
    progress: 0,
    currentIndex: 0,
    totalQuestions: gameWords.length,
    userResponses: [],
    hintShown: false,
    currentHintIndex: 0,
  };

  // Kelimeleri kaydet
  words.value = gameWords;
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

// Doğru ve yanlış sayıları
const correctCount = computed(() => {
  return gameState.value.userResponses.filter((response) => response.correct).length;
});

const incorrectCount = computed(() => {
  return gameState.value.userResponses.filter((response) => !response.correct).length;
});

// Karıştırılmış seçenekler
const shuffledOptions = computed(() => {
  if (!gameState.value.currentQuestion) return [];

  if (gameState.value.currentOptions.length === 0) {
    gameState.value.currentOptions = generateOptions(gameState.value.currentQuestion, words.value);
  }

  return gameState.value.currentOptions;
});

// Cevap seçimi
const selectAnswer = (option) => {
  gameState.value.selectedAnswer = option;
  gameState.value.showAnswer = true;
  gameState.value.isCorrect = isCorrectAnswer(option, gameState.value.currentQuestion);

  // Cevabı kaydet
  gameState.value.userResponses.push({
    word_id: gameState.value.currentQuestion.id,
    selected_option: option.meaningText,
    correct: gameState.value.isCorrect,
  });

  // Doğru ya da yanlış cevapların sayısını güncelle
  if (gameState.value.isCorrect) {
    // Nada
  } else {
    // Yanlış sayısını artır
    incrementIncorrectCount(gameState.value.currentQuestion.id);
  }

  // 1.5 saniye sonra bir sonraki soruya geç
  setTimeout(() => {
    nextQuestion();
  }, 1500);
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
    currentOptions: [],
    selectedAnswer: null,
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

// API'ye verileri gönder
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

// Helper functions for multiple meanings
const getPrimaryMeaning = (word) => {
  if (!word) return '';

  if (word.meanings && word.meanings.length > 0) {
    // Find the primary meaning
    const primaryMeaning = word.meanings.find((m) => m.is_primary);
    // If a primary meaning exists, return it, otherwise return the first meaning
    if (primaryMeaning) {
      return primaryMeaning.meaning;
    }
    return word.meanings[0].meaning;
  }

  // Fallback to the old way (for backward compatibility)
  return word.meaning || '';
};

const isCorrectAnswer = (option, question) => {
  if (!option || !question) return false;
  return option.wordId === question.id;
};

const isSelectedAnswer = (option) => {
  return gameState.value.selectedAnswer?.wordId === option.wordId;
};

// Generate answer options
const generateOptions = (currentQuestion, allWords, count = 4) => {
  // Create the correct option
  const correctOption = {
    wordId: currentQuestion.id,
    meaningText: getPrimaryMeaning(currentQuestion),
    isCorrect: true,
  };

  // Filter out words that have the same meaning as the correct answer
  const filteredWords = allWords.filter(
    (w) => w.id !== currentQuestion.id && getPrimaryMeaning(w) !== getPrimaryMeaning(currentQuestion)
  );

  // Shuffle and take the required number of words
  const shuffledWords = [...filteredWords].sort(() => 0.5 - Math.random());
  const selectedWords = shuffledWords.slice(0, count - 1);

  // Create incorrect options
  const incorrectOptions = selectedWords.map((word) => ({
    wordId: word.id,
    meaningText: getPrimaryMeaning(word),
    isCorrect: false,
  }));

  // Combine and shuffle the options
  return [...incorrectOptions, correctOption].sort(() => 0.5 - Math.random());
};

// Oyunu başlat
onMounted(() => {
  startGameWithConfig();
});
</script>
