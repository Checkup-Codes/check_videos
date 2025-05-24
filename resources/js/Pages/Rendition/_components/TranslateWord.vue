<template>
  <div class="flex flex-col items-center justify-center">
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

        <div class="space-y-4">
          <input
            ref="answerInput"
            v-model="gameState.userInput"
            type="text"
            :disabled="gameState.showAnswer"
            @keyup.enter="checkAnswer"
            placeholder="Cevabınızı yazın..."
            class="w-full rounded-lg border border-gray-300 p-3 text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black disabled:cursor-not-allowed"
          />
          <button
            @click="checkAnswer"
            :disabled="!gameState.userInput.trim() || gameState.showAnswer"
            class="w-full rounded-lg bg-black px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cevapla
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

  // Yeni soru animasyonunu çalıştır
  nextTick(() => {
    animateNewQuestion();
  });
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

  // Sonraki soruya geç
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
  }, 1500);
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

  // DOM güncellemesinden sonra istatistikleri güncelle
  nextTick(() => {
    if (hasUser.value && gameState.value.userResponses.length > 0) {
      console.log('İstatistikler güncelleniyor...');
      updateWordStats();
    }
  });
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
        emit('game-completed');
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
