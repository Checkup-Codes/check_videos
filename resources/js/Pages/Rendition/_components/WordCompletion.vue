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

      <!-- Toplam Puan -->
      <div class="mb-4 text-center">
        <div class="inline-flex items-center gap-2 rounded bg-base-200 px-3 py-1">
          <span class="text-base-content/70 text-sm">Toplam Puan:</span>
          <span class="text-lg font-bold text-base-content">{{ gameState.totalPoints }}</span>
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
                <span v-if="response.correct" class="text-base-content/70 text-xs">
                  {{ response.points }} puan
                  {{ response.hintsUsed > 0 ? `(${response.hintsUsed} ipucu)` : '' }}
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

      <!-- Soru Sayacı ve Puan -->
      <div class="text-base-content/70 mb-4 flex items-center justify-between text-sm">
        <div>Soru {{ gameState.currentIndex + 1 }} / {{ gameState.totalQuestions }}</div>
        <div class="flex flex-col items-end gap-1">
          <div class="flex items-center gap-2">
            <span class="font-medium text-base-content">{{ gameState.totalPoints }}</span>
            <span>toplam puan</span>
          </div>
          <div class="flex items-center gap-2 text-xs">
            <span class="text-base-content/70 font-medium">{{ currentQuestionPoints }}</span>
            <span>mevcut soru puanı</span>
          </div>
        </div>
      </div>

      <!-- Soru -->
      <div v-if="gameState.currentQuestion" class="space-y-4" ref="questionContainer">
        <div>
          <h2 class="mb-2 text-2xl font-semibold text-base-content">"{{ gameState.currentQuestion.meaning }}"</h2>
          <p class="text-base-content/70 mb-3">Bu kelimenin İngilizce anlamını yazın</p>
          <div class="flex items-center justify-between">
            <span
              class="inline-flex items-center rounded border border-base-300 bg-base-200 px-2 py-1 text-xs text-base-content"
            >
              {{ getWordType(gameState.currentQuestion.type) }}
            </span>
          </div>
        </div>

        <!-- Kelime Gösterimi -->
        <div class="space-y-2">
          <div
            v-if="gameState.currentQuestion && gameState.currentQuestion.word"
            class="flex justify-center space-x-2"
            ref="selectedLettersContainer"
          >
            <div
              v-for="(letter, index) in gameState.currentQuestion.word.split('')"
              :key="`${gameState.currentIndex}-${index}`"
              class="flex h-12 w-12 items-center justify-center rounded border text-xl font-semibold transition-all"
              :class="{
                'border-base-300 bg-base-100': !gameState.selectedLetters[index],
                'border-base-content bg-base-200': !gameState.selectedLetters[index] && index === getNextEmptyIndex(),
                'border-green-500 bg-green-50': gameState.showAnswer && gameState.isCorrect,
                'border-red-500 bg-red-50': gameState.showAnswer && !gameState.isCorrect,
                'border-blue-500': gameState.hintLetterIndices.includes(index) && !gameState.isHintAnimating,
              }"
            >
              <template v-if="gameState.maskedIndices.includes(index)">
                <span :class="{ 'text-blue-600': gameState.hintLetterIndices.includes(index) }">
                  {{ gameState.selectedLetters[index] || '' }}
                </span>
              </template>
              <template v-else>
                {{ letter.toLowerCase() }}
              </template>
            </div>
          </div>

          <!-- Loading state -->
          <div v-else class="text-base-content/70 text-center">
            <p>Harf kutuları yükleniyor...</p>
          </div>

          <!-- Doğru Cevap Önizlemesi -->
          <div v-if="gameState.showAnswer && !gameState.isCorrect" class="flex justify-center space-x-2">
            <div
              v-for="(letter, index) in gameState.currentQuestion.word.split('')"
              :key="index"
              class="flex h-8 w-8 items-center justify-center rounded border border-green-500 bg-green-50 text-sm font-medium text-green-700"
            >
              {{ letter.toLowerCase() }}
            </div>
          </div>
        </div>

        <!-- Kontrol Butonu -->
        <button
          @click="checkAnswer"
          :disabled="gameState.showAnswer || !isAnswerComplete"
          class="w-full rounded border border-base-300 bg-base-content px-4 py-2 text-center text-sm font-medium text-base-100 transition hover:bg-base-300 hover:text-base-content disabled:opacity-50"
        >
          Kontrol Et
        </button>
      </div>

      <!-- Sanal Klavye -->
      <div v-if="showVirtualKeyboard" class="mt-4">
        <div class="flex flex-col gap-1 rounded border border-base-300 bg-base-200 p-2">
          <!-- Üst Sıra -->
          <div class="flex gap-1">
            <button
              v-for="letter in ['q', 'w', 'e', 'r', 't', 'y', 'u', 'ı', 'o', 'p', 'ğ', 'ü']"
              :key="letter"
              @click="selectLetter(letter)"
              class="flex h-10 w-10 items-center justify-center rounded bg-base-100 text-sm font-medium text-base-content transition hover:bg-base-300 active:bg-base-content active:text-base-100"
            >
              {{ letter }}
            </button>
          </div>
          <!-- Orta Sıra -->
          <div class="flex gap-1">
            <button
              v-for="letter in ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ş', 'i']"
              :key="letter"
              @click="selectLetter(letter)"
              class="flex h-10 w-10 items-center justify-center rounded bg-base-100 text-sm font-medium text-base-content transition hover:bg-base-300 active:bg-base-content active:text-base-100"
            >
              {{ letter }}
            </button>
          </div>
          <!-- Alt Sıra -->
          <div class="flex gap-1">
            <button
              v-for="letter in ['z', 'x', 'c', 'v', 'b', 'n', 'm', 'ö', 'ç']"
              :key="letter"
              @click="selectLetter(letter)"
              class="flex h-10 w-10 items-center justify-center rounded bg-base-100 text-sm font-medium text-base-content transition hover:bg-base-300 active:bg-base-content active:text-base-100"
            >
              {{ letter }}
            </button>
          </div>
          <!-- Alt Kontrol Sırası -->
          <div class="flex gap-1">
            <button
              @click="handleBackspace"
              class="flex h-10 flex-1 items-center justify-center rounded bg-base-100 text-sm font-medium text-base-content transition hover:bg-base-300 active:bg-base-content active:text-base-100"
            >
              ←
            </button>
            <button
              @click="handleHint"
              class="flex h-10 flex-1 items-center justify-center rounded bg-base-content text-sm font-medium text-base-100 transition hover:bg-base-300 hover:text-base-content"
            >
              İpucu
            </button>
          </div>
        </div>
      </div>

      <!-- Klavye Açma/Kapama Butonu -->
      <button
        v-if="!showVirtualKeyboard"
        @click="toggleVirtualKeyboard"
        class="mt-4 flex w-full items-center justify-center gap-2 rounded border border-base-300 bg-base-100 px-4 py-2 text-sm font-medium text-base-content transition hover:bg-base-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm-1-5a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1zm0-4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z"
          />
        </svg>
        Klavyeyi Aç
      </button>
      <button
        v-else
        @click="toggleVirtualKeyboard"
        class="mt-4 flex w-full items-center justify-center gap-2 rounded border border-base-300 bg-base-100 px-4 py-2 text-sm font-medium text-base-content transition hover:bg-base-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
        Klavyeyi Kapat
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, onUnmounted } from 'vue';
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
  correctAnswer: '',
  totalPoints: 0,
  displayPoints: 0,
  hintsUsed: 0,
  hintLetterIndices: [],
  isHintAnimating: false, // Track if hint animation is in progress
});

// Kelimeleri kullan
const words = ref([]);
const wordsMap = computed(() => Object.fromEntries(words.value.map((word) => [word.id, word])));

// Cevabın tamamlanıp tamamlanmadığını kontrol et
const isAnswerComplete = computed(() => {
  return gameState.value.selectedLetters.every((letter) => letter !== '');
});

// İstatistik güncelleme durumu
const isUpdating = ref(false);

// Sanal klavye durumu
const showVirtualKeyboard = ref(false);

// Klavyeyi aç/kapat
const toggleVirtualKeyboard = () => {
  showVirtualKeyboard.value = !showVirtualKeyboard.value;
};

// Backspace işlemi
const handleBackspace = () => {
  const lastFilledIndex = [...gameState.value.selectedLetters].reverse().findIndex((letter, index) => {
    const actualIndex = gameState.value.selectedLetters.length - 1 - index;
    return letter && !gameState.value.hintLetterIndices.includes(actualIndex);
  });

  if (lastFilledIndex !== -1) {
    const actualIndex = gameState.value.selectedLetters.length - 1 - lastFilledIndex;
    gameState.value.selectedLetters[actualIndex] = '';
  }
};

// İpucu işlemi
const handleHint = () => {
  // Shift tuşu mantığını buraya taşıyoruz
  if (gameState.value.showAnswer) return;
  if (gameState.value.isHintAnimating) return;

  // Maksimum ipucu sayısını kontrol et
  const maxHints = getMaxHints(gameState.value.currentQuestion.word.length);
  if (gameState.value.hintsUsed >= maxHints) {
    console.log('Maksimum ipucu sayısına ulaşıldı');
    return;
  }

  // Rastgele bir boş harfi doğru harfle doldur
  const emptyIndices = gameState.value.maskedIndices.filter((_, index) => !gameState.value.selectedLetters[index]);

  if (emptyIndices.length > 0) {
    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    const correctLetter = gameState.value.currentQuestion.word[randomIndex].toLowerCase();

    gameState.value.isHintAnimating = true;

    // Önce boş kutuya animasyon ekle
    const letterBox = selectedLettersContainer.value.children[randomIndex];

    // Slot machine efekti için harfleri oluştur
    const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
    let currentIndex = 0;
    let speed = 50;
    let iterations = 0;
    const maxIterations = 20;

    const letterInterval = setInterval(() => {
      letterBox.textContent = letters[Math.floor(Math.random() * letters.length)];

      if (iterations > maxIterations * 0.7) {
        speed += 10;
      }

      iterations++;

      if (iterations >= maxIterations) {
        clearInterval(letterInterval);
        letterBox.textContent = correctLetter;
        gameState.value.selectedLetters[randomIndex] = correctLetter;
        gameState.value.hintsUsed++;
        gameState.value.hintLetterIndices.push(randomIndex);

        gsap.to(letterBox, {
          scale: 1.1,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          onComplete: () => {
            gameState.value.isHintAnimating = false;
          },
        });
      }
    }, speed);
  }
};

// İpucu göster (örnek cümle için)
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

// Oyunu başlat
const startGameWithConfig = () => {
  if (!props.words || props.words.length < 2) {
    alert('Oyunu başlatmak için en az 2 kelime gereklidir.');
    return;
  }

  gameState.value.isLoading = true;

  // Kelimeleri filtrele
  let gameWords = [...props.words];

  // Kelime türüne göre filtrele
  if (props.gameConfig.wordType && props.gameConfig.wordType !== '') {
    gameWords = gameWords.filter((word) => word.type === props.gameConfig.wordType);
  }

  // Öğrenme durumuna göre filtrele
  if (props.gameConfig.learningStatus && props.gameConfig.learningStatus !== '') {
    gameWords = gameWords.filter((word) => word.learning_status === parseInt(props.gameConfig.learningStatus));
  }

  // Zorluk seviyesine göre filtrele
  if (props.gameConfig.difficultyLevel && props.gameConfig.difficultyLevel !== '') {
    gameWords = gameWords.filter((word) => word.difficulty_level === props.gameConfig.difficultyLevel);
  }

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

  // Soru sayısını sınırla
  const questionCount = Math.min(props.gameConfig.questionCount || 10, gameWords.length);
  gameWords = gameWords.slice(0, questionCount);

  // Eğer hiç kelime kalmadıysa hata ver
  if (gameWords.length === 0) {
    alert('Filtreleme sonucu hiç kelime kalmadı. Lütfen filtreleri kontrol edin.');
    return;
  }

  // Kelimeleri yükle
  words.value = gameWords;
  gameState.value.totalQuestions = words.value.length;
  gameState.value.currentIndex = 0;
  gameState.value.userResponses = [];

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

// Mevcut sorunun puanını hesapla
const currentQuestionPoints = computed(() => {
  if (!gameState.value.currentQuestion) return 0;
  const wordLength = gameState.value.currentQuestion.word.length;
  const basePoints = wordLength * 100;
  const hintPenalty = gameState.value.hintsUsed * 100;
  return basePoints - hintPenalty;
});

// Türkçe alfabe
const getAlphabet = () => {
  return 'abcçdefgğhıijklmnoöprsştuüvwxyz'.split('');
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

  if (!words.value[gameState.value.currentIndex]) {
    return;
  }

  const currentWord = words.value[gameState.value.currentIndex].word;
  const wordLength = currentWord.length;

  // Mevcut state'i koruyarak sadece gerekli alanları güncelle
  gameState.value.currentQuestion = words.value[gameState.value.currentIndex];
  gameState.value.showAnswer = false;
  gameState.value.hintShown = false;
  gameState.value.currentHintIndex = 0;
  gameState.value.hintsUsed = 0;
  gameState.value.hintLetterIndices = [];
  gameState.value.isHintAnimating = false;
  gameState.value.progress = 0;

  // Eğer örnek cümle varsa otomatik olarak ipucunu göster
  if (
    gameState.value.currentQuestion.example_sentences &&
    gameState.value.currentQuestion.example_sentences.length > 0
  ) {
    gameState.value.hintShown = true;
    gameState.value.currentHintIndex = 0;
  }

  // Dizileri manuel olarak doldur
  gameState.value.selectedLetters = Array(wordLength).fill('');
  gameState.value.maskedIndices = Array.from({ length: wordLength }, (_, i) => i);

  // DOM güncellemesinden sonra animasyonu başlat
  nextTick(() => {
    // Harf kutularını yukarıdan aşağı kaydır
    if (selectedLettersContainer.value && selectedLettersContainer.value.children) {
      const letterBoxes = selectedLettersContainer.value.children;
      gsap.fromTo(
        letterBoxes,
        {
          y: -50,
          opacity: 0,
          scale: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: 'back.out(1.7)',
        }
      );
    }
  });
};

// Rastgele maskeli indeksler oluştur
const createMaskedIndices = () => {
  const word = gameState.value.currentQuestion.word;
  const wordLength = word.length;

  // Tüm harfleri maskeli yap ve seçili harfleri sıfırla
  gameState.value.maskedIndices = Array.from({ length: wordLength }, (_, i) => i);
  gameState.value.selectedLetters = Array(wordLength).fill('');
  gameState.value.hintLetterIndices = [];
};

// Animasyonlar için ref'ler
const progressBar = ref(null);
const progressBarGlow = ref(null);
const questionContainer = ref(null);
const selectedLettersContainer = ref(null);

// Harf seçme animasyonu
const animateLetterSelection = (letter) => {
  const emptyIndex = gameState.value.selectedLetters.findIndex((l) => !l);
  if (emptyIndex === -1) return;

  const destinationElement = selectedLettersContainer.value.children[emptyIndex];
  gsap.from(destinationElement, {
    scale: 1.2,
    duration: 0.2,
    ease: 'power2.out',
  });
};

// Harf seçme fonksiyonunu güncelle
const selectLetter = (letter) => {
  if (gameState.value.showAnswer) return;

  // Boş olan ilk indeksi bul
  const emptyIndex = gameState.value.selectedLetters.findIndex((l) => !l);

  // Eğer boş yer varsa harfi ekle
  if (emptyIndex !== -1) {
    gameState.value.selectedLetters[emptyIndex] = letter.toLowerCase();
    animateLetterSelection(letter);
  }
};

// Boş olan ilk indeksi bul
const getNextEmptyIndex = () => {
  return gameState.value.selectedLetters.findIndex((letter) => !letter);
};

// Kelime uzunluğuna göre maksimum ipucu sayısını hesapla
const getMaxHints = (wordLength) => {
  if (wordLength <= 3) return 1;
  if (wordLength <= 4) return 2;
  if (wordLength <= 5) return 3;
  return 4; // 6 ve üzeri harfler için
};

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

// Handle keyboard input
const handleKeyPress = (event) => {
  if (gameState.value.showAnswer) return;

  const key = event.key.toLowerCase();
  const alphabet = getAlphabet();

  if (event.key === 'Shift') {
    console.log('Shift tuşuna basıldı:', {
      selectedLetters: gameState.value.selectedLetters,
      hintLetterIndices: gameState.value.hintLetterIndices,
    });
    // Eğer animasyon devam ediyorsa yeni hint isteğini engelle
    if (gameState.value.isHintAnimating) return;

    // Maksimum ipucu sayısını kontrol et
    const maxHints = getMaxHints(gameState.value.currentQuestion.word.length);
    if (gameState.value.hintsUsed >= maxHints) {
      console.log('Maksimum ipucu sayısına ulaşıldı');
      return;
    }

    // Rastgele bir boş harfi doğru harfle doldur
    const emptyIndices = gameState.value.maskedIndices.filter((_, index) => !gameState.value.selectedLetters[index]);

    if (emptyIndices.length > 0) {
      const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
      const correctLetter = gameState.value.currentQuestion.word[randomIndex].toLowerCase();

      gameState.value.isHintAnimating = true;

      // Önce boş kutuya animasyon ekle
      const letterBox = selectedLettersContainer.value.children[randomIndex];

      // Slot machine efekti için harfleri oluştur
      const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
      let currentIndex = 0;
      let speed = 50; // Başlangıç hızı
      let iterations = 0;
      const maxIterations = 20; // Toplam iterasyon sayısı

      const letterInterval = setInterval(() => {
        // Rastgele harf göster
        letterBox.textContent = letters[Math.floor(Math.random() * letters.length)];

        // Hızı yavaşlat
        if (iterations > maxIterations * 0.7) {
          speed += 10;
        }

        iterations++;

        // Animasyonu bitir
        if (iterations >= maxIterations) {
          clearInterval(letterInterval);

          // Son harfi göster
          letterBox.textContent = correctLetter;

          // Harfi ekle
          gameState.value.selectedLetters[randomIndex] = correctLetter;
          gameState.value.hintsUsed++;
          gameState.value.hintLetterIndices.push(randomIndex);

          // Final vurgu animasyonu
          gsap.to(letterBox, {
            scale: 1.1,
            duration: 0.2,
            yoyo: true,
            repeat: 1,
            onComplete: () => {
              gameState.value.isHintAnimating = false;
            },
          });
        }
      }, speed);
    }
  } else if (alphabet.includes(key) || key === ' ') {
    // Boş bir yere harf ekle
    const emptyIndex = gameState.value.selectedLetters.findIndex((letter) => !letter);
    if (emptyIndex !== -1) {
      gameState.value.selectedLetters[emptyIndex] = key;
    }
  } else if (event.key === 'Backspace') {
    // Son eklenen harfi sil (eğer hint ile gelmediyse)
    const lastFilledIndex = [...gameState.value.selectedLetters].reverse().findIndex((letter, index) => {
      const actualIndex = gameState.value.selectedLetters.length - 1 - index;
      return letter && !gameState.value.hintLetterIndices.includes(actualIndex);
    });

    if (lastFilledIndex !== -1) {
      const actualIndex = gameState.value.selectedLetters.length - 1 - lastFilledIndex;
      gameState.value.selectedLetters[actualIndex] = '';
    }
  } else if (event.key === 'Enter' && isAnswerComplete.value) {
    checkAnswer();
  }
};

// Cevap kontrol fonksiyonunu güncelle
const checkAnswer = () => {
  if (gameState.value.showAnswer) return;
  if (!isAnswerComplete.value) return;

  console.log('Cevap kontrolü öncesi:', {
    selectedLetters: gameState.value.selectedLetters,
    hintLetterIndices: gameState.value.hintLetterIndices,
  });

  const word = gameState.value.currentQuestion.word.toLowerCase();
  let isCorrect = true;
  let correctAnswer = '';

  for (let i = 0; i < gameState.value.maskedIndices.length; i++) {
    const correctChar = word[gameState.value.maskedIndices[i]];
    const userChar = gameState.value.selectedLetters[i].toLowerCase();

    if (correctChar !== userChar) {
      isCorrect = false;
    }
    correctAnswer += correctChar;
  }

  console.log('Cevap kontrolü sonrası:', {
    isCorrect,
    correctAnswer,
    selectedLetters: gameState.value.selectedLetters,
    hintLetterIndices: gameState.value.hintLetterIndices,
  });

  gameState.value.isCorrect = isCorrect;
  gameState.value.correctAnswer = correctAnswer;

  // Calculate points for this question
  let questionPoints = 0;
  if (isCorrect) {
    // Base points: 100 per letter
    questionPoints = word.length * 100;
    // Penalty for using hints: -100 per hint
    questionPoints -= gameState.value.hintsUsed * 100;
  }

  // Animate points
  const oldPoints = gameState.value.totalPoints;
  const newPoints = oldPoints + questionPoints;

  // Önce puanı göster, sonra animasyonu başlat
  gameState.value.displayPoints = oldPoints;
  setTimeout(() => {
    animatePoints(oldPoints, newPoints);
  }, 500);

  // Kullanıcı yanıtını kaydet
  gameState.value.userResponses.push({
    word_id: gameState.value.currentQuestion.id,
    correct: isCorrect,
    points: questionPoints,
    hintsUsed: gameState.value.hintsUsed,
  });

  // Cevabı göster
  gameState.value.showAnswer = true;

  // Progress bar animasyonu
  const newProgress = Math.round(((gameState.value.currentIndex + 1) / gameState.value.totalQuestions) * 100);
  gsap.to(progressBar.value, {
    width: `${newProgress}%`,
    duration: 0.5,
    ease: 'power2.out',
  });

  // Sonraki soruya geç
  setTimeout(() => {
    gameState.value.currentIndex++;
    loadNextQuestion();
  }, 2000);
};

// Puan animasyonu
const animatePoints = (from, to) => {
  gsap.to(gameState.value, {
    displayPoints: to,
    duration: 1,
    ease: 'power2.out',
    onUpdate: () => {
      gameState.value.totalPoints = Math.round(gameState.value.displayPoints);
    },
  });
};

// Oyunu bitir
const endGame = () => {
  console.log('Oyun bitti, özet ekranı gösteriliyor');

  // Oyun durumunu güncelle
  gameState.value.isPlaying = false;

  // Özet ekranını göster
  nextTick(() => {
    // Özet ekranının görünür olduğundan emin ol
    const summaryElement = document.querySelector('.game-summary');
    if (summaryElement) {
      gsap.fromTo(
        summaryElement,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        }
      );
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
    correctAnswer: '',
    totalPoints: 0,
    displayPoints: 0,
    hintsUsed: 0,
    hintLetterIndices: [],
    isHintAnimating: false,
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
        setTimeout(() => {
          emit('game-completed');
        }, 1000); // 1 saniye bekle
      },
      onError: (error) => {
        console.error('İstatistik güncelleme hatası:', error);
        isUpdating.value = false;
      },
    }
  );
};

// Add keyboard event listener
onMounted(() => {
  startGameWithConfig();
  window.addEventListener('keydown', handleKeyPress);
});

// Clean up event listener
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress);
});
</script>

<style scoped>
.progress-glow {
  filter: blur(4px);
}

/* Hint harfleri için özel stil */
.border-blue-500 {
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.3);
}

/* Mobil cihazlar için özel stiller */
@media (max-width: 640px) {
  .w-10 {
    width: 3.5rem;
  }
  .h-10 {
    height: 3.5rem;
  }
  .text-sm {
    font-size: 1.25rem;
  }
  .gap-1 {
    gap: 0.2rem;
  }
  .p-2 {
    padding: 0.2rem;
  }
  /* Tuşlar arası boşluğu kaldır ve kenarları birleştir */
  .flex > button {
    border-radius: 0;
    margin: 0;
  }
  /* Sıralar arası boşluğu azalt */
  .flex-col > .flex {
    margin-bottom: 0.25rem;
  }
  /* İlk tuşun sol üst köşesini yuvarla */
  .flex-col > .flex:first-child > button:first-child {
    border-top-left-radius: 0.5rem;
  }
  /* Son tuşun sağ üst köşesini yuvarla */
  .flex-col > .flex:first-child > button:last-child {
    border-top-right-radius: 0.5rem;
  }
  /* Alt sıradaki ilk tuşun sol alt köşesini yuvarla */
  .flex-col > .flex:last-child > button:first-child {
    border-bottom-left-radius: 0.5rem;
  }
  /* Alt sıradaki son tuşun sağ alt köşesini yuvarla */
  .flex-col > .flex:last-child > button:last-child {
    border-bottom-right-radius: 0.5rem;
  }
}
</style>
