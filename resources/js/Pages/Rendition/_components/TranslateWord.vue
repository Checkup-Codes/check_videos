<template>
  <div class="flex min-h-screen flex-col items-center justify-center">
    <!-- Quiz Sonucu -->
    <div v-if="!gameState.isPlaying" class="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 class="mb-2 text-2xl font-semibold text-gray-900">Quiz Completed!</h2>
      <p class="mb-4 text-gray-600">You have finished the quiz. Here's how you did:</p>
      <ul class="space-y-2 text-left text-sm text-gray-800">
        <li
          v-for="response in gameState.userResponses"
          :key="response.word_id"
          class="flex justify-between rounded-md bg-gray-50 px-4 py-2"
        >
          <span :class="response.correct ? 'text-green-600' : 'text-red-600'">
            {{ wordsMap[response.word_id]?.word || 'Unknown' }}
          </span>
          <span>
            {{ response.correct ? '✓' : '✗' }}
            <span v-if="!response.correct" class="ml-2 text-xs text-gray-500">
              (Correct: {{ wordsMap[response.word_id]?.meaning || 'Unknown' }})
            </span>
          </span>
        </li>
      </ul>
      <button
        @click="restartGame"
        class="mt-6 w-full rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700"
      >
        Restart Quiz
      </button>
    </div>

    <!-- Quiz Soruları -->
    <div v-else class="relative w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <span v-if="words.length" class="absolute right-4 top-3 text-xs text-gray-400">
        {{ questionCounter }}
      </span>
      <h2 v-if="gameState.currentQuestion" class="mb-4 text-xl font-semibold text-gray-900">
        What is the meaning of "{{ gameState.currentQuestion.word }}"?
      </h2>

      <input
        v-model="gameState.userInput"
        :disabled="gameState.showFeedback"
        type="text"
        placeholder="Enter the translation"
        class="w-full rounded-lg border border-gray-300 p-3 text-base text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
        @keyup.enter="checkAnswer"
      />

      <p
        v-if="gameState.showFeedback"
        class="mt-4 text-sm font-medium"
        :class="gameState.isCorrect ? 'text-green-600' : 'text-red-600'"
      >
        {{ feedbackMessage }}
      </p>

      <button
        v-if="!gameState.showFeedback"
        @click="checkAnswer"
        class="mt-6 w-full rounded-lg bg-black px-4 py-2 text-sm font-medium text-white shadow-md transition hover:bg-gray-700"
      >
        Submit Answer
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { usePage, router } from '@inertiajs/vue3';

const props = defineProps({
  gameType: String,
  packSlug: String,
  words: Array,
});

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
  showFeedback: false,
  isCorrect: null,
  currentIndex: 0,
  totalQuestions: 0,
  userResponses: [],
});

// Kelimeleri kullan
const words = ref([]);
const wordsMap = computed(() => Object.fromEntries(words.value.map((word) => [word.id, word])));

// Oyunu başlat
const startGame = async () => {
  if (!props.words || props.words.length < 5) {
    alert('Oyunu başlatmak için en az 5 kelime gereklidir.');
    return;
  }

  gameState.value.isLoading = true;

  // Kelimeleri yükle ve karıştır
  await new Promise((resolve) => {
    words.value = [...props.words].sort(() => Math.random() - 0.5);
    gameState.value.totalQuestions = words.value.length;
    gameState.value.currentIndex = 0;
    gameState.value.userResponses = [];
    resolve();
  });

  gameState.value.isLoading = false;
  gameState.value.isPlaying = true;
  loadNextQuestion();
};

// Sonraki soruyu yükle
const loadNextQuestion = () => {
  if (gameState.value.currentIndex >= words.value.length) {
    endGame();
    return;
  }

  gameState.value.currentQuestion = words.value[gameState.value.currentIndex];
  gameState.value.userInput = '';
  gameState.value.showFeedback = false;
  gameState.value.isCorrect = null;
};

// Cevap kontrolü
const checkAnswer = () => {
  if (!gameState.value.userInput.trim() || gameState.value.showFeedback) return;

  gameState.value.showFeedback = true;
  gameState.value.isCorrect =
    gameState.value.userInput.toLowerCase().trim() === gameState.value.currentQuestion.meaning.toLowerCase().trim();

  // Kullanıcı yanıtını kaydet
  gameState.value.userResponses.push({
    word_id: gameState.value.currentQuestion.id,
    correct: gameState.value.isCorrect,
  });

  // 2 saniye sonra sonraki soruya geç
  setTimeout(() => {
    gameState.value.currentIndex++;
    loadNextQuestion();
  }, 2000);
};

// Oyunu bitir
const endGame = () => {
  gameState.value.isPlaying = false;
  updateWordStats();
};

// Oyunu yeniden başlat
const restartGame = () => {
  startGame();
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

// Geri bildirim mesajı
const feedbackMessage = computed(() => {
  if (!gameState.value.currentQuestion) return '';
  return gameState.value.isCorrect
    ? 'Correct!'
    : `Wrong! The correct translation is: ${gameState.value.currentQuestion.meaning}`;
});

// Soru sayacı
const questionCounter = computed(() => {
  if (!gameState.value.totalQuestions) return '0/0';
  return `${gameState.value.currentIndex + 1}/${gameState.value.totalQuestions}`;
});

// Son soru mu?
const isLastQuestion = computed(() => words.value.length && gameState.value.currentIndex === words.value.length - 1);

// Quiz sıfırla
const restartQuiz = () => {
  if (currentPack.value && currentPack.value.words) {
    words.value = [...currentPack.value.words].sort(() => Math.random() - 0.5);
  } else if (allPacks.length > 0 && allPacks[0].words) {
    words.value = [...allPacks[0].words].sort(() => Math.random() - 0.5);
  } else {
    words.value = [];
  }
  gameState.value.currentIndex = 0;
  gameState.value.userInput = '';
  gameState.value.showFeedback = false;
  gameState.value.isCorrect = null;
  gameState.value.userResponses = [];
};

// Oyunu başlat
onMounted(() => {
  startGame();
});
</script>
