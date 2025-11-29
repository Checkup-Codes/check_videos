<template>
  <div class="flex flex-col items-center justify-center">
    <!-- Quiz Tamamlandıysa -->
    <div
      v-if="!gameState.isPlaying && gameState.userResponses.length > 0"
      class="w-full max-w-2xl rounded-lg border border-border bg-card p-6 shadow-sm"
    >
      <!-- Başlık ve Puan -->
      <div class="mb-4 text-center">
        <h2 class="mb-2 text-xl font-semibold text-foreground">Test Tamamlandı</h2>
        <div class="inline-flex items-center gap-2 rounded bg-muted px-3 py-1">
          <span class="text-muted-foreground text-sm">Puan:</span>
          <span class="text-lg font-bold text-foreground">{{ calculateScore }} / 100</span>
        </div>
      </div>

      <!-- İstatistikler -->
      <div class="mb-4 grid grid-cols-2 gap-4">
        <div class="rounded border border-border bg-muted p-3 text-center">
          <div class="mb-1">
            <div class="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <span class="text-sm font-bold text-green-600 dark:text-green-400">{{ correctCount }}</span>
            </div>
          </div>
          <p class="text-muted-foreground text-xs">Doğru</p>
        </div>
        <div class="rounded border border-border bg-muted p-3 text-center">
          <div class="mb-1">
            <div class="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
              <span class="text-sm font-bold text-red-600 dark:text-red-400">{{ incorrectCount }}</span>
            </div>
          </div>
          <p class="text-muted-foreground text-xs">Yanlış</p>
        </div>
      </div>

      <!-- Cevap Listesi -->
      <div class="mb-4">
        <h3 class="mb-2 text-sm font-medium text-foreground">Cevaplarınız</h3>
        <div class="max-h-48 space-y-2 overflow-y-auto">
          <div
            v-for="response in gameState.userResponses"
            :key="response.word_id"
            class="flex items-center justify-between rounded border border-border bg-muted p-2"
          >
            <div class="flex items-center gap-2">
              <div
                class="flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold"
                :class="response.correct ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'"
              >
                {{ response.correct ? '✓' : '✗' }}
              </div>
              <div class="flex flex-col">
                <span class="text-sm font-medium text-foreground">
                  {{ wordsMap[response.word_id]?.word || 'Unknown' }}
                </span>
                <span class="text-muted-foreground text-xs">
                  {{ getPrimaryMeaning(wordsMap[response.word_id]) }}
                </span>
              </div>
            </div>
            <span
              class="inline-flex items-center rounded px-2 py-1 text-xs font-medium"
              :class="response.correct ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'"
            >
              {{ response.correct ? 'Doğru' : 'Yanlış' }}
            </span>
          </div>
        </div>
      </div>

      <!-- Butonlar -->
      <div class="space-y-2">
        <!-- İstatistik Güncelleme Butonu -->
        <button
          v-if="hasUser"
          @click="updateWordStats"
          class="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90"
          :disabled="isUpdating"
        >
          {{ isUpdating ? 'Güncelleniyor...' : 'İstatistikleri Güncelle' }}
        </button>

        <div class="flex gap-2">
          <button
            @click="emit('game-completed')"
            class="flex-1 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90"
          >
            Pakete Dön
          </button>
          <button
            @click="restartGame"
            class="flex-1 inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
          >
            Tekrar Başla
          </button>
        </div>
      </div>
    </div>

    <!-- Quiz Devam Ediyorsa -->
    <div v-else class="w-full max-w-4xl rounded-lg border border-border bg-card p-6 shadow-sm">
      <!-- Progress Bar -->
      <div class="mb-4 h-1 w-full overflow-hidden rounded-full bg-muted">
        <div ref="progressBar" class="h-full w-0 bg-primary transition-all duration-500"></div>
      </div>

      <!-- Soru Sayacı -->
      <div class="mb-6 text-right">
        <span class="text-muted-foreground text-sm">
          Soru {{ gameState.currentIndex + 1 }} / {{ gameState.totalQuestions }}
        </span>
      </div>

      <!-- Soru -->
      <div v-if="gameState.currentQuestion" class="space-y-4" ref="questionContainer">
        <!-- Ana Soru -->
        <div>
          <h2 class="mb-2 text-2xl font-semibold text-foreground">"{{ gameState.currentQuestion.word }}"</h2>
          <p class="text-muted-foreground mb-3">Bu kelimenin anlamı nedir?</p>
          <span
            class="inline-flex items-center rounded border border-border bg-muted px-2 py-1 text-xs text-foreground"
          >
            {{ getWordType(gameState.currentQuestion.type) }}
          </span>
        </div>

        <!-- İpucu Gösterimi (Varsa otomatik göster) -->
        <div
          v-if="gameState.currentQuestion.example_sentences && gameState.currentQuestion.example_sentences.length > 0"
          class="rounded border border-border bg-muted p-3"
        >
          <div class="mb-2 flex items-center justify-between">
            <p class="text-sm font-medium text-foreground">Örnek Cümle</p>
            <button
              v-if="gameState.currentQuestion.example_sentences.length > 1"
              @click="showHint"
              class="text-muted-foreground text-xs transition-colors hover:text-foreground"
            >
              Sonraki ({{ gameState.currentHintIndex + 1 }}/{{ gameState.currentQuestion.example_sentences.length }})
            </button>
          </div>
          <p class="text-sm text-foreground">
            {{ gameState.currentQuestion.example_sentences[gameState.currentHintIndex].sentence }}
          </p>
        </div>

        <!-- Seçenekler -->
        <div class="space-y-2" ref="optionsContainer">
          <button
            v-for="(option, index) in shuffledOptions"
            :key="`${gameState.currentIndex}-${index}`"
            @click="selectAnswer(option)"
            :disabled="gameState.showAnswer"
            class="w-full rounded border border-border bg-background p-3 text-left text-base text-foreground transition-all duration-200 hover:bg-muted disabled:cursor-not-allowed"
            :class="getOptionClasses(option, index)"
          >
            <div class="flex items-center gap-3">
              <span
                class="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground"
              >
                {{ String.fromCharCode(65 + index) }}
              </span>
              {{ option.meaningText }}
            </div>
          </button>
        </div>

        <!-- Cevap Sonucu -->
        <div v-if="gameState.showAnswer" class="text-center">
          <p class="text-lg font-medium" :class="gameState.isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
            {{ gameState.isCorrect ? 'Doğru!' : 'Yanlış!' }}
          </p>
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
    gameState.value.hintShown =
      words.value[gameState.value.currentIndex].example_sentences &&
      words.value[gameState.value.currentIndex].example_sentences.length > 0; // Otomatik ipucu göster
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
    hintShown: gameWords[0].example_sentences && gameWords[0].example_sentences.length > 0, // Otomatik ipucu göster
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

// Seçenek sınıflarını dinamik olarak hesapla
const getOptionClasses = (option, index) => {
  if (!gameState.value.showAnswer) {
    return 'border-border bg-background text-foreground';
  }

  if (isCorrectAnswer(option, gameState.value.currentQuestion)) {
    return 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200';
  }

  if (isSelectedAnswer(option)) {
    return 'border-red-500 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200';
  }

  return 'border-border bg-background text-foreground';
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
