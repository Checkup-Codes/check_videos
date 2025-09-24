<template>
  <div class="flex flex-col items-center justify-center">
    <!-- Quiz Tamamlandıysa -->
    <div
      v-if="!gameState.isPlaying && gameState.userResponses.length > 0"
      class="w-full max-w-2xl rounded-lg border border-base-300 bg-base-100 p-6"
    >
      <!-- Başlık ve Puan -->
      <div class="mb-4 text-center">
        <h2 class="mb-2 text-xl font-semibold text-base-content">Test Tamamlandı</h2>
        <div class="inline-flex items-center gap-2 rounded bg-base-200 px-3 py-1">
          <span class="text-base-content/70 text-sm">Puan:</span>
          <span class="text-lg font-bold text-base-content">{{ calculateScore }} / 100</span>
        </div>
      </div>

      <!-- İstatistikler -->
      <div class="mb-4 grid grid-cols-2 gap-4">
        <div class="rounded border border-base-300 bg-base-200 p-3 text-center">
          <div class="mb-1">
            <div class="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
              <span class="text-sm font-bold text-green-600">{{ correctCount }}</span>
            </div>
          </div>
          <p class="text-base-content/70 text-xs">Doğru</p>
        </div>
        <div class="rounded border border-base-300 bg-base-200 p-3 text-center">
          <div class="mb-1">
            <div class="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
              <span class="text-sm font-bold text-red-600">{{ incorrectCount }}</span>
            </div>
          </div>
          <p class="text-base-content/70 text-xs">Yanlış</p>
        </div>
      </div>

      <!-- Cevap Listesi -->
      <div class="mb-4">
        <h3 class="mb-2 text-sm font-medium text-base-content">Cevaplarınız</h3>
        <div class="max-h-48 space-y-2 overflow-y-auto">
          <div
            v-for="response in gameState.userResponses"
            :key="response.word_id"
            class="flex items-center justify-between rounded border border-base-300 bg-base-200 p-2"
          >
            <div class="flex items-center gap-2">
              <div
                class="flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold"
                :class="response.correct ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'"
              >
                {{ response.correct ? '✓' : '✗' }}
              </div>
              <div class="flex flex-col">
                <span class="text-sm font-medium text-base-content">
                  {{ wordsMap[response.word_id]?.word || 'Unknown' }}
                </span>
                <span class="text-base-content/70 text-xs">
                  {{ wordsMap[response.word_id]?.meaning || '' }}
                </span>
              </div>
            </div>
            <span
              class="inline-flex items-center rounded px-2 py-1 text-xs font-medium"
              :class="response.correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
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
          class="w-full rounded border border-base-300 bg-base-content px-4 py-2 text-center text-sm font-medium text-base-100 transition hover:bg-base-300 hover:text-base-content"
          :disabled="isUpdating"
        >
          {{ isUpdating ? 'Güncelleniyor...' : 'İstatistikleri Güncelle' }}
        </button>

        <div class="flex gap-2">
          <button
            @click="emit('game-completed')"
            class="flex-1 rounded border border-base-300 bg-base-content px-4 py-2 text-center text-sm font-medium text-base-100 transition hover:bg-base-300 hover:text-base-content"
          >
            Pakete Dön
          </button>
          <button
            @click="restartGame"
            class="flex-1 rounded border border-base-300 px-4 py-2 text-sm font-medium text-base-content transition hover:bg-base-200"
          >
            Tekrar Başla
          </button>
        </div>
      </div>
    </div>

    <!-- Quiz Devam Ediyorsa -->
    <div
      v-else
      class="relative w-full max-w-2xl rounded-lg border border-base-300 bg-base-100 p-6 transition-colors duration-500"
      :class="{
        'bg-base-100': !gameState.showAnswer,
        'bg-green-50': gameState.showAnswer && gameState.isCorrect,
        'bg-red-50': gameState.showAnswer && !gameState.isCorrect,
      }"
    >
      <!-- Progress Bar -->
      <div class="relative mb-4 h-1 w-full overflow-hidden rounded-full bg-base-200">
        <div ref="progressBar" class="h-full w-0 bg-base-content"></div>
        <div
          ref="progressBarGlow"
          class="absolute left-0 top-0 h-full w-[50px] bg-gradient-to-r from-transparent via-white/30 to-transparent"
        ></div>
      </div>

      <!-- Soru Sayacı -->
      <div class="text-base-content/70 mb-4 text-right text-sm">
        Soru {{ gameState.currentIndex + 1 }} / {{ gameState.totalQuestions }}
      </div>

      <!-- Soru -->
      <div v-if="gameState.currentQuestion" class="space-y-4" ref="questionContainer">
        <div>
          <h2 class="mb-2 text-2xl font-semibold text-base-content">"{{ gameState.currentQuestion.word }}"</h2>
          <p class="text-base-content/70 mb-3">Bu kelimenin anlamı nedir?</p>
          <div class="flex items-center justify-between">
            <span
              class="inline-flex items-center rounded border border-base-300 bg-base-200 px-2 py-1 text-xs text-base-content"
            >
              {{ getWordType(gameState.currentQuestion.type) }}
            </span>
            <button
              v-if="
                !gameState.showAnswer &&
                gameState.currentQuestion.example_sentences &&
                gameState.currentQuestion.example_sentences.length > 1
              "
              @click="showHint"
              class="text-base-content/70 text-xs transition-colors hover:text-base-content"
            >
              Sonraki İpucu ({{ gameState.currentHintIndex + 1 }}/{{
                gameState.currentQuestion.example_sentences.length
              }})
            </button>
          </div>
        </div>

        <!-- İpucu Gösterimi -->
        <div v-if="gameState.hintShown" class="rounded border border-base-300 bg-base-200 p-3">
          <p class="text-sm font-medium text-base-content">Örnek Cümle:</p>
          <p
            v-if="gameState.currentQuestion.example_sentences && gameState.currentQuestion.example_sentences.length > 0"
            class="mt-1 text-sm text-base-content"
          >
            {{ gameState.currentQuestion.example_sentences[gameState.currentHintIndex].sentence }}
          </p>
          <p v-else class="mt-1 text-sm text-base-content">Bu kelime için örnek cümle bulunmuyor.</p>
        </div>

        <div class="space-y-4">
          <input
            ref="answerInput"
            v-model="gameState.userInput"
            type="text"
            :disabled="gameState.showAnswer"
            @keyup.enter="checkAnswer"
            placeholder="Cevabınızı yazın..."
            class="w-full rounded border border-base-300 bg-base-100 p-3 text-base-content focus:border-base-content focus:outline-none focus:ring-1 focus:ring-base-content disabled:cursor-not-allowed"
          />
          <button
            @click="checkAnswer"
            :disabled="!gameState.userInput.trim() || gameState.showAnswer"
            class="w-full rounded border border-base-300 bg-base-content px-4 py-3 text-center text-sm font-medium text-base-100 transition hover:bg-base-300 hover:text-base-content disabled:cursor-not-allowed disabled:opacity-50"
          >
            {{ gameState.showAnswer ? 'Sonraki Soru' : 'Cevapla' }}
          </button>
        </div>

        <!-- Cevap gösterimi -->
        <div
          v-if="gameState.showAnswer"
          class="mt-4 rounded border border-base-300 p-4"
          :class="{
            'bg-red-50': !gameState.isCorrect,
            'bg-green-50': gameState.isCorrect,
          }"
        >
          <p
            class="text-sm font-medium"
            :class="{
              'text-red-600': !gameState.isCorrect,
              'text-green-600': gameState.isCorrect,
            }"
          >
            Doğru Cevap:
          </p>
          <p class="mt-1 text-base-content">{{ gameState.currentQuestion.meaning }}</p>

          <!-- Tüm anlamlar -->
          <div v-if="gameState.currentQuestion.meanings && gameState.currentQuestion.meanings.length > 1" class="mt-3">
            <p class="text-base-content/70 text-sm font-medium">Diğer Anlamlar:</p>
            <ul class="mt-1 list-inside list-disc space-y-1 text-sm text-base-content">
              <li v-for="(meaning, index) in gameState.currentQuestion.meanings" :key="index">
                {{ meaning.meaning }}
              </li>
            </ul>
          </div>
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

// Animasyonlar için ref'ler
const progressBar = ref(null);
const progressBarGlow = ref(null);
const questionContainer = ref(null);
const answerInput = ref(null);

// İstatistik güncelleme durumu
const isUpdating = ref(false);

// Soru animasyonu
const animateNewQuestion = () => {
  gsap.fromTo(questionContainer.value, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });

  gsap.fromTo(
    answerInput.value,
    { opacity: 0, y: 10 },
    {
      opacity: 1,
      y: 0,
      duration: 0.3,
      delay: 0.2,
      ease: 'power2.out',
    }
  );
};

// Doğru cevap animasyonu
const animateCorrectAnswer = () => {
  const timeline = gsap.timeline();

  timeline
    .to(answerInput.value, {
      scale: 1.05,
      duration: 0.2,
      backgroundColor: '#ecfdf5',
      borderColor: '#34d399',
      ease: 'power2.out',
    })
    .to(answerInput.value, {
      scale: 1,
      duration: 0.2,
      ease: 'power2.out',
    });

  // Konfeti efekti
  const confettiCount = 50;
  const colors = ['#34d399', '#10b981', '#059669'];

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'absolute';
    confetti.style.width = '8px';
    confetti.style.height = '8px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.borderRadius = '50%';
    document.body.appendChild(confetti);

    const startX = answerInput.value.getBoundingClientRect().left + answerInput.value.offsetWidth / 2;
    const startY = answerInput.value.getBoundingClientRect().top;

    gsap.fromTo(
      confetti,
      {
        x: startX,
        y: startY,
        scale: 0,
      },
      {
        x: startX + (Math.random() - 0.5) * 200,
        y: startY - 100 - Math.random() * 100,
        scale: 1,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
        onComplete: () => confetti.remove(),
      }
    );
  }
};

// Yanlış cevap animasyonu
const animateWrongAnswer = () => {
  gsap
    .timeline()
    .to(answerInput.value, {
      scale: 1.05,
      duration: 0.2,
      backgroundColor: '#fef2f2',
      borderColor: '#f87171',
      ease: 'power2.out',
    })
    .to(answerInput.value, {
      x: -10,
      duration: 0.1,
    })
    .to(answerInput.value, {
      x: 10,
      duration: 0.1,
    })
    .to(answerInput.value, {
      x: -5,
      duration: 0.1,
    })
    .to(answerInput.value, {
      x: 5,
      duration: 0.1,
    })
    .to(answerInput.value, {
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
    const unlearned = gameWords.filter((w) => w.learning_status === 0);
    const learning = gameWords.filter((w) => w.learning_status === 1);
    const learned = gameWords.filter((w) => w.learning_status === 2);
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

  // Eğer örnek cümle varsa otomatik olarak ipucunu göster
  if (
    gameState.value.currentQuestion.example_sentences &&
    gameState.value.currentQuestion.example_sentences.length > 0
  ) {
    gameState.value.hintShown = true;
    gameState.value.currentHintIndex = 0;
  }

  // Yeni soru animasyonunu çalıştır
  nextTick(() => {
    animateNewQuestion();
  });
};

// Cevabı kontrol et
const checkAnswer = () => {
  if (!gameState.value.userInput.trim()) return;

  const userAnswer = gameState.value.userInput.trim().toLowerCase();

  // Tüm anlamları kontrol et
  const meanings = gameState.value.currentQuestion.meanings || [{ meaning: gameState.value.currentQuestion.meaning }];
  const isCorrect = meanings.some((meaning) => meaning.meaning.toLowerCase() === userAnswer);

  gameState.value.isCorrect = isCorrect;

  // Kullanıcı yanıtını kaydet
  gameState.value.userResponses.push({
    word_id: gameState.value.currentQuestion.id,
    correct: gameState.value.isCorrect,
  });

  // Cevabı göster ve animasyonu başlat
  gameState.value.showAnswer = true;
  if (gameState.value.isCorrect) {
    animateCorrectAnswer();
  } else {
    animateWrongAnswer();
  }

  // Progress bar animasyonu
  const newProgress = Math.round(((gameState.value.currentIndex + 1) / gameState.value.totalQuestions) * 100);
  animateProgress(newProgress);

  // 2 saniye sonra sonraki soruya geç
  setTimeout(() => {
    // Input alanının stillerini sıfırla
    gsap.set(answerInput.value, {
      clearProps: 'all',
    });
    answerInput.value.style.backgroundColor = '';
    answerInput.value.style.borderColor = '';

    gameState.value.currentIndex++;
    gameState.value.userInput = '';
    gameState.value.showAnswer = false;
    gameState.value.progress = 0;
    loadNextQuestion();
  }, 2000);
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
};

// Kelime istatistiklerini güncelle
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
        setTimeout(() => {
          emit('game-completed');
        }, 1000);
      },
      onError: (error) => {
        console.error('İstatistik güncelleme hatası:', error);
        isUpdating.value = false;
      },
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

<style scoped>
.progress-glow {
  filter: blur(4px);
}
</style>
