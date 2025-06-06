<template>
  <div class="flex flex-col items-center justify-center">
    <!-- Quiz Tamamlandıysa -->
    <div
      v-if="!gameState.isPlaying && gameState.userResponses.length > 0"
      class="w-full max-w-md rounded-2xl border border-gray-200 bg-white shadow-sm"
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

      <div class="space-y-2">
        <!-- İstatistik Güncelleme Butonu -->
        <button
          v-if="hasUser"
          @click="updateWordStats"
          class="w-full rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-blue-700"
          :disabled="isUpdating"
        >
          {{ isUpdating ? 'Güncelleniyor...' : 'Kelime İstatistiklerini Güncelle' }}
        </button>

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
      <div class="relative mb-4 h-1 w-full overflow-hidden rounded-full bg-gray-200">
        <div ref="progressBar" class="h-full w-0 bg-black"></div>
        <div
          ref="progressBarGlow"
          class="absolute left-0 top-0 h-full w-[50px] bg-gradient-to-r from-transparent via-white/30 to-transparent"
        ></div>
      </div>

      <!-- Soru Sayacı -->
      <div class="mb-4 text-right text-sm text-gray-500">
        Soru {{ gameState.currentIndex + 1 }} / {{ gameState.totalQuestions }}
      </div>

      <!-- Soru -->
      <div v-if="gameState.currentQuestion" class="space-y-4" ref="questionContainer">
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

        <div class="space-y-2" ref="optionsContainer">
          <button
            v-for="(option, index) in shuffledOptions"
            :key="index"
            @click="selectAnswer(option)"
            :disabled="gameState.showAnswer"
            class="w-full rounded-lg border border-gray-200 p-3 text-left text-base text-gray-900 transition disabled:cursor-not-allowed"
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
import { ref, computed, onMounted, nextTick } from 'vue';
import { usePage, router, Link } from '@inertiajs/vue3';
import gsap from 'gsap';

const props = defineProps({
  gameType: String,
  packSlug: String,
  words: Array,
  gameConfig: Object,
});

const emit = defineEmits(['game-completed']);

const page = usePage();
const allPacks = page.props.languagePacks || [];
const hasUser = computed(() => !!page.props.auth?.user);

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

// Animasyonlar için ref'ler
const optionsContainer = ref(null);
const progressBar = ref(null);
const progressBarGlow = ref(null);
const questionContainer = ref(null);

// İstatistik güncelleme durumu
const isUpdating = ref(false);

// Soru animasyonu
const animateNewQuestion = () => {
  gsap.fromTo(questionContainer.value, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });

  gsap.fromTo(
    optionsContainer.value.children,
    { opacity: 0, x: -20 },
    { opacity: 1, x: 0, duration: 0.3, stagger: 0.1, ease: 'power2.out' }
  );
};

// Doğru cevap animasyonu
const animateCorrectAnswer = (element) => {
  gsap.to(element, {
    scale: 1.05,
    duration: 0.2,
    backgroundColor: '#ecfdf5',
    borderColor: '#34d399',
    ease: 'power2.out',
  });

  gsap.to(element, {
    scale: 1,
    duration: 0.2,
    delay: 0.2,
  });
};

// Yanlış cevap animasyonu
const animateWrongAnswer = (element) => {
  gsap
    .timeline()
    .to(element, {
      scale: 1.05,
      duration: 0.2,
      backgroundColor: '#fef2f2',
      borderColor: '#f87171',
      ease: 'power2.out',
    })
    .to(element, {
      x: -10,
      duration: 0.1,
    })
    .to(element, {
      x: 10,
      duration: 0.1,
    })
    .to(element, {
      x: -5,
      duration: 0.1,
    })
    .to(element, {
      x: 5,
      duration: 0.1,
    })
    .to(element, {
      x: 0,
      scale: 1,
      duration: 0.2,
    });
};

// Progress bar animasyonu
const animateProgress = (progress) => {
  // Ana progress bar animasyonu
  gsap.to(progressBar.value, {
    width: `${progress}%`,
    duration: 0.5,
    ease: 'power2.out',
  });

  // Parlama efekti animasyonu
  gsap.fromTo(
    progressBarGlow.value,
    { x: '-100%' },
    {
      x: '100%',
      duration: 1,
      ease: 'none',
      repeat: -1,
    }
  );

  // Progress değiştiğinde parlama efektini yeniden başlat
  gsap.to(progressBarGlow.value, {
    opacity: progress === 100 ? 0 : 0.5,
    duration: 0.3,
  });
};

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

    // Yeni soru animasyonunu çalıştır
    nextTick(() => {
      animateNewQuestion();
    });
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
  }

  // Son öğrenilenlere öncelik ver
  if (props.gameConfig.prioritizeRecentlyLearned) {
    gameWords.sort((a, b) => {
      const aDate = new Date(a.last_reviewed_at || 0);
      const bDate = new Date(b.last_reviewed_at || 0);
      return bDate - aDate;
    });
  }

  // İşaretlenenlere öncelik ver
  if (props.gameConfig.prioritizeFlagged) {
    gameWords.sort((a, b) => {
      if (a.is_flagged && !b.is_flagged) return -1;
      if (!a.is_flagged && b.is_flagged) return 1;
      return 0;
    });
  }

  // En çok yanlış yapılanlara öncelik ver
  if (props.gameConfig.prioritizeMostIncorrect) {
    gameWords.sort((a, b) => {
      const aIncorrect = a.incorrect_count || 0;
      const bIncorrect = b.incorrect_count || 0;
      return bIncorrect - aIncorrect;
    });
  }

  // Son olarak rastgele karıştır
  gameWords = gameWords.sort(() => Math.random() - 0.5);

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

  // Animasyonları çalıştır
  const buttonElement = event.target;
  if (gameState.value.isCorrect) {
    animateCorrectAnswer(buttonElement);
  } else {
    animateWrongAnswer(buttonElement);
  }

  // Progress bar animasyonu
  const newProgress = Math.round(((gameState.value.currentIndex + 1) / gameState.value.totalQuestions) * 100);
  animateProgress(newProgress);

  // 1.5 saniye sonra bir sonraki soruya geç
  setTimeout(() => {
    // Şıkların stillerini sıfırla
    const optionButtons = optionsContainer.value.children;
    for (let button of optionButtons) {
      gsap.set(button, {
        clearProps: 'all',
      });
      button.style.backgroundColor = '';
      button.style.borderColor = '';
    }
    nextQuestion();
  }, 1500);
};

// Oyunu bitir
const endGame = () => {
  gameState.value.isPlaying = false;
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
  if (!hasUser.value || !gameState.value.userResponses.length || isUpdating.value) return;

  isUpdating.value = true;
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
      onSuccess: () => {
        console.log('İstatistikler başarıyla güncellendi');
        isUpdating.value = false;
        // İstatistikler güncellendikten sonra pakete dön
        emit('game-completed');
      },
      onError: (error) => {
        console.error('İstatistik güncelleme hatası:', error);
        isUpdating.value = false;
      },
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

<style scoped>
.progress-glow {
  filter: blur(4px);
}
</style>
