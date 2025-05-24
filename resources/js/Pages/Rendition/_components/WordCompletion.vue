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
            <h2 class="text-xl font-semibold text-gray-900">Eksik harfleri tamamlayın:</h2>
          </div>
          <p class="mt-1 text-sm text-gray-500">Anlam: {{ gameState.currentQuestion.meaning }}</p>
        </div>

        <!-- Kelime Gösterimi -->
        <div class="flex justify-center space-x-2" ref="selectedLettersContainer">
          <div
            v-for="(index, letterIndex) in gameState.maskedIndices"
            :key="letterIndex"
            class="flex h-12 w-12 items-center justify-center rounded-lg border border-gray-300 text-xl font-semibold"
          >
            {{ gameState.selectedLetters[letterIndex] || '' }}
          </div>
        </div>

        <!-- Harf Seçimi -->
        <div class="grid grid-cols-7 gap-2" ref="letterButtons">
          <button
            v-for="letter in 'ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ'.split('')"
            :key="letter"
            @click="selectLetter(letter, $event)"
            :disabled="
              gameState.showAnswer ||
              gameState.selectedLetters.includes(letter) ||
              gameState.selectedLetters.length >= gameState.maskedIndices.length
            "
            class="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 text-lg font-medium transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {{ letter }}
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

// İstatistik güncelleme durumu
const isUpdating = ref(false);

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

// Animasyonlar için ref'ler
const letterButtons = ref(null);
const progressBar = ref(null);
const progressBarGlow = ref(null);
const questionContainer = ref(null);
const selectedLettersContainer = ref(null);

// Soru animasyonu
const animateNewQuestion = () => {
  gsap.fromTo(questionContainer.value, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });

  gsap.fromTo(
    letterButtons.value.children,
    { opacity: 0, scale: 0.8 },
    {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      stagger: 0.05,
      ease: 'back.out(1.7)',
    }
  );
};

// Harf seçme animasyonu
const animateLetterSelection = (letter, target) => {
  const clone = target.cloneNode(true);
  clone.style.position = 'absolute';
  clone.style.zIndex = '1000';
  clone.style.left = `${target.offsetLeft}px`;
  clone.style.top = `${target.offsetTop}px`;
  document.body.appendChild(clone);

  const destinationElement = selectedLettersContainer.value.children[gameState.value.selectedLetters.length - 1];
  const destinationRect = destinationElement.getBoundingClientRect();
  const startRect = target.getBoundingClientRect();

  gsap.to(clone, {
    x: destinationRect.left - startRect.left,
    y: destinationRect.top - startRect.top,
    scale: 0.9,
    duration: 0.3,
    ease: 'power2.out',
    onComplete: () => {
      clone.remove();
      gsap.from(destinationElement, {
        scale: 1.2,
        duration: 0.2,
        ease: 'power2.out',
      });
    },
  });
};

// Doğru cevap animasyonu
const animateCorrectAnswer = () => {
  gsap
    .timeline()
    .to(selectedLettersContainer.value.children, {
      scale: 1.1,
      backgroundColor: '#ecfdf5',
      borderColor: '#34d399',
      duration: 0.2,
      stagger: 0.05,
      ease: 'power2.out',
    })
    .to(selectedLettersContainer.value.children, {
      scale: 1,
      duration: 0.2,
      stagger: 0.05,
    });
};

// Yanlış cevap animasyonu
const animateWrongAnswer = () => {
  gsap
    .timeline()
    .to(selectedLettersContainer.value.children, {
      scale: 1.1,
      backgroundColor: '#fef2f2',
      borderColor: '#f87171',
      duration: 0.2,
      stagger: 0.05,
      ease: 'power2.out',
    })
    .to(selectedLettersContainer.value, {
      x: -10,
      duration: 0.1,
    })
    .to(selectedLettersContainer.value, {
      x: 10,
      duration: 0.1,
    })
    .to(selectedLettersContainer.value, {
      x: -5,
      duration: 0.1,
    })
    .to(selectedLettersContainer.value, {
      x: 5,
      duration: 0.1,
    })
    .to(selectedLettersContainer.value, {
      x: 0,
      duration: 0.1,
    })
    .to(selectedLettersContainer.value.children, {
      scale: 1,
      duration: 0.2,
      stagger: 0.05,
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

// Harf seçme fonksiyonunu güncelle
const selectLetter = (letter, event) => {
  if (gameState.value.showAnswer) return;
  if (gameState.value.selectedLetters.length >= gameState.value.maskedIndices.length) return;

  gameState.value.selectedLetters.push(letter);
  animateLetterSelection(letter, event.target);

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

// Cevap kontrol fonksiyonunu güncelle
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

  // Cevabı göster ve animasyonu başlat
  gameState.value.showAnswer = true;
  if (isCorrect) {
    animateCorrectAnswer();
  } else {
    animateWrongAnswer();
  }

  // Progress bar animasyonu
  const newProgress = Math.round(((gameState.value.currentIndex + 1) / gameState.value.totalQuestions) * 100);
  animateProgress(newProgress);

  // Sonraki soruya geç
  setTimeout(() => {
    // Harflerin stillerini sıfırla
    const letterElements = selectedLettersContainer.value.children;
    for (let letter of letterElements) {
      gsap.set(letter, {
        clearProps: 'all',
      });
      letter.style.backgroundColor = '';
      letter.style.borderColor = '';
    }

    gameState.value.currentIndex++;
    gameState.value.selectedLetters = [];
    gameState.value.showAnswer = false;
    gameState.value.progress = 0;
    loadNextQuestion();
  }, 1500);
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

// Sayfa yüklendiğinde oyunu başlat
onMounted(() => {
  startGameWithConfig();
});
</script>

<style scoped>
.progress-glow {
  filter: blur(4px);
}
</style>
