<template>
  <div class="flex min-h-screen flex-col items-center justify-center">
    <!-- Quiz Tamamlandıysa -->
    <div v-if="!gameState.isPlaying" class="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 class="mb-2 text-2xl font-semibold text-gray-900">Quiz Completed</h2>
      <p class="mb-4 text-gray-600">Here's how you did:</p>
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

    <!-- Quiz Devam Ediyorsa -->
    <div v-else class="relative w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <span v-if="words.length" class="absolute right-4 top-3 text-xs text-gray-400">
        {{ questionCounter }}
      </span>
      <h2 v-if="gameState.currentQuestion" class="mb-4 text-xl font-semibold text-gray-900">
        What is the meaning of "{{ gameState.currentQuestion.word }}"?
      </h2>
      <div class="flex flex-col gap-3">
        <button
          v-for="option in shuffledOptions"
          :key="option.id"
          @click="selectAnswer(option)"
          :class="[
            'w-full rounded-lg px-4 py-3 text-sm font-medium transition focus:outline-none',
            gameState.selectedAnswer && option.id === gameState.currentQuestion.id
              ? 'bg-green-500 text-white'
              : gameState.selectedAnswer && option.id === gameState.selectedAnswer
                ? 'bg-red-500 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200',
          ]"
        >
          {{ option.meaning }}
        </button>
      </div>
      <p v-if="gameState.showFeedback" class="mt-4 text-sm text-gray-700">
        {{ feedbackMessage }}
      </p>
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
  selectedAnswer: null,
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
  gameState.value.selectedAnswer = null;
  gameState.value.showFeedback = false;
  gameState.value.isCorrect = null;
};

// Cevap seç
const selectAnswer = (option) => {
  if (gameState.value.selectedAnswer) return;

  gameState.value.selectedAnswer = option.id;
  gameState.value.isCorrect = option.id === gameState.value.currentQuestion.id;
  gameState.value.showFeedback = true;

  // Kullanıcı yanıtını kaydet
  gameState.value.userResponses.push({
    word_id: gameState.value.currentQuestion.id,
    selected_id: option.id,
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

// Oyunu başlat
onMounted(() => {
  startGame();
});

// Rastgele seçenekleri karıştır
const shuffledOptions = computed(() => {
  if (!gameState.value.currentQuestion) return [];
  let options = words.value.filter((word) => word.id !== gameState.value.currentQuestion.id);
  options = options.sort(() => Math.random() - 0.5).slice(0, 3);
  options.push(gameState.value.currentQuestion);
  return options.sort(() => Math.random() - 0.5);
});

// Doğru/yanlış mesajı
const feedbackMessage = computed(() => {
  if (!gameState.value.currentQuestion) return '';
  return gameState.value.selectedAnswer === gameState.value.currentQuestion.id
    ? 'Correct!'
    : `Wrong! The correct answer is: ${gameState.value.currentQuestion.meaning}`;
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
  gameState.value.selectedAnswer = null;
  gameState.value.userResponses = [];
};
</script>
