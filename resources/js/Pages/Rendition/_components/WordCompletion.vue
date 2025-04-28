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
      <ul class="mb-4 space-y-2 text-left text-sm text-gray-800">
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
          </span>
        </li>
      </ul>
      <div class="flex gap-2">
        <Link
          :href="`/rendition/words/${props.packSlug}`"
          class="flex-1 rounded-lg bg-black px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-gray-700"
        >
          Pakete Dön
        </Link>
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
            <h2 class="text-xl font-semibold text-gray-900">Eksik harfleri tamamlayın:</h2>
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
          <p class="mt-1 text-sm text-gray-500">Anlam: {{ gameState.currentQuestion.meaning }}</p>
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

        <!-- Kelime Gösterimi -->
        <div class="flex justify-center space-x-2">
          <div
            v-for="(char, index) in gameState.currentQuestion.word"
            :key="index"
            class="flex h-12 w-12 items-center justify-center rounded-lg border-2 text-xl font-bold"
            :class="{
              'border-gray-200 bg-gray-50': gameState.maskedIndices.includes(index),
              'border-gray-300 bg-white': !gameState.maskedIndices.includes(index),
              'text-red-600':
                gameState.showAnswer &&
                !gameState.isCorrect &&
                gameState.maskedIndices.includes(index) &&
                gameState.selectedLetters[gameState.maskedIndices.indexOf(index)]?.toLowerCase() !== char.toLowerCase(),
              'text-green-600':
                gameState.showAnswer &&
                gameState.maskedIndices.includes(index) &&
                gameState.selectedLetters[gameState.maskedIndices.indexOf(index)]?.toLowerCase() === char.toLowerCase(),
            }"
          >
            <template v-if="gameState.maskedIndices.includes(index)">
              <span v-if="gameState.selectedLetters[gameState.maskedIndices.indexOf(index)]">
                {{ gameState.selectedLetters[gameState.maskedIndices.indexOf(index)] }}
              </span>
              <span v-else>_</span>
            </template>
            <span v-else>{{ char }}</span>
          </div>
        </div>

        <!-- Doğru Cevap Gösterimi -->
        <div v-if="gameState.showAnswer && !gameState.isCorrect" class="mt-4 rounded-lg bg-yellow-50 p-4">
          <p class="text-sm text-yellow-800">
            Doğru cevap: <span class="font-bold">{{ gameState.currentQuestion.word }}</span>
          </p>
        </div>

        <!-- Harf Seçimi -->
        <div class="grid grid-cols-7 gap-2">
          <button
            v-for="char in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')"
            :key="char"
            @click="selectLetter(char)"
            :disabled="gameState.showAnswer || gameState.selectedLetters.includes(char)"
            class="h-10 w-10 rounded-lg border border-gray-200 text-center text-lg font-medium transition hover:bg-gray-50 disabled:opacity-50"
          >
            {{ char }}
          </button>
          <button
            @click="selectLetter(' ')"
            :disabled="gameState.showAnswer || gameState.selectedLetters.includes(' ')"
            class="h-10 w-10 rounded-lg border border-gray-200 text-center text-lg font-medium transition hover:bg-gray-50 disabled:opacity-50"
          >
            ␣
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
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { usePage, router, Link } from '@inertiajs/vue3';
import GameConfig from './GameConfig.vue';

const props = defineProps({
  gameType: String,
  packSlug: String,
  words: Array,
  gameConfig: Object,
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

// Oyunu başlat
const startGameWithConfig = async () => {
  if (!props.words || props.words.length < 5) {
    alert('Oyunu başlatmak için en az 5 kelime gereklidir.');
    return;
  }

  gameState.value.isLoading = true;

  // Kelimeleri filtrele
  let filteredWords = [...props.words];

  // Zorluk seviyesine göre filtrele
  if (props.gameConfig.difficulty !== 'all') {
    filteredWords = filteredWords.filter((word) => word.difficulty_level === parseInt(props.gameConfig.difficulty));
  }

  // Öğrenme durumuna göre filtrele
  if (props.gameConfig.learningStatus !== 'all') {
    filteredWords = filteredWords.filter((word) => word.learning_status === parseInt(props.gameConfig.learningStatus));
  }

  // Kelime seçimine göre sırala
  if (props.gameConfig.wordSelection === 'difficult') {
    filteredWords.sort((a, b) => b.incorrect_count - a.incorrect_count);
  } else if (props.gameConfig.wordSelection === 'easy') {
    filteredWords.sort((a, b) => a.incorrect_count - b.incorrect_count);
  } else {
    filteredWords.sort(() => Math.random() - 0.5);
  }

  // Soru sayısını ayarla
  const questionCount = Math.min(parseInt(props.gameConfig.questionCount), filteredWords.length);
  filteredWords = filteredWords.slice(0, questionCount);

  // Kelimeleri yükle
  await new Promise((resolve) => {
    words.value = filteredWords;
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
  if (!gameState.value.currentQuestion.example_sentences) return;

  if (!gameState.value.hintShown) {
    gameState.value.hintShown = true;
    gameState.value.currentHintIndex = 0;
  } else if (gameState.value.currentQuestion.example_sentences.length > gameState.value.currentHintIndex + 1) {
    gameState.value.currentHintIndex++;
  }
};

// Sonraki soruyu yükle
const loadNextQuestion = () => {
  if (gameState.value.currentIndex >= words.value.length) {
    endGame();
    return;
  }

  gameState.value.currentQuestion = words.value[gameState.value.currentIndex];
  gameState.value.showAnswer = false;
  gameState.value.selectedLetters = [];
  gameState.value.hintShown = false;
  gameState.value.currentHintIndex = 0;

  // Kelimenin uzunluğuna göre maskelenecek harf sayısını belirle
  const wordLength = gameState.value.currentQuestion.word.length;
  const maskedCount = Math.max(2, Math.floor(wordLength * 0.4)); // Kelimenin %40'ı kadar harf maskelenir

  // Rastgele harfleri maskele, boşluk karakterlerini maskeleme
  const indices = Array.from({ length: wordLength }, (_, i) => i).filter(
    (i) => gameState.value.currentQuestion.word[i] !== ' '
  ); // Boşluk karakterlerini hariç tut

  gameState.value.maskedIndices = indices
    .sort(() => Math.random() - 0.5)
    .slice(0, maskedCount)
    .sort((a, b) => a - b);
};

// Harf seç
const selectLetter = (letter) => {
  if (gameState.value.selectedLetters.length < gameState.value.maskedIndices.length) {
    gameState.value.selectedLetters.push(letter);
  }
};

// Cevabı kontrol et
const checkAnswer = () => {
  if (!isAnswerComplete.value) return;

  const userAnswer = gameState.value.currentQuestion.word
    .split('')
    .map((char, index) => {
      if (gameState.value.maskedIndices.includes(index)) {
        const letterIndex = gameState.value.maskedIndices.indexOf(index);
        return gameState.value.selectedLetters[letterIndex];
      }
      return char;
    })
    .join('');

  const isCorrect = userAnswer.toLowerCase() === gameState.value.currentQuestion.word.toLowerCase();

  gameState.value.showAnswer = true;
  gameState.value.isCorrect = isCorrect;

  // Kullanıcı yanıtını kaydet
  gameState.value.userResponses.push({
    word_id: gameState.value.currentQuestion.id,
    correct: isCorrect,
  });

  // İlerlemeyi güncelle
  gameState.value.progress = ((gameState.value.currentIndex + 1) / gameState.value.totalQuestions) * 100;

  // 3 saniye sonra sonraki soruya geç
  setTimeout(() => {
    gameState.value.currentIndex++;
    loadNextQuestion();
  }, 3000);
};

// Oyunu bitir
const endGame = () => {
  gameState.value.isPlaying = false;
};

// Oyunu yeniden başlat
const restartGame = () => {
  gameState.value.currentIndex = 0;
  gameState.value.userResponses = [];
  gameState.value.isPlaying = true;
  loadNextQuestion();
};

// Puan hesapla
const calculateScore = computed(() => {
  if (!gameState.value.userResponses.length) return 0;
  const correctAnswers = gameState.value.userResponses.filter((response) => response.correct).length;
  return Math.round((correctAnswers / gameState.value.userResponses.length) * 100);
});

// Doğru ve yanlış sayılarını hesapla
const correctCount = computed(() => {
  return gameState.value.userResponses.filter((response) => response.correct).length;
});

const incorrectCount = computed(() => {
  return gameState.value.userResponses.filter((response) => !response.correct).length;
});

// Klavye olaylarını dinle
onMounted(() => {
  startGameWithConfig();
  window.addEventListener('keydown', handleKeyPress);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress);
});

// Klavye girişini işle
const handleKeyPress = (event) => {
  if (gameState.value.showAnswer || !gameState.value.isPlaying) return;

  const key = event.key.toUpperCase();

  // Sadece A-Z arası harfleri ve boşluk karakterini kabul et
  if (/^[A-Z]$/.test(key) || key === ' ') {
    selectLetter(key);
  }

  // Backspace ile son harfi sil
  if (event.key === 'Backspace') {
    clearLastLetter();
  }

  // Enter ile cevabı kontrol et
  if (event.key === 'Enter' && isAnswerComplete.value) {
    checkAnswer();
  }
};

// Son harfi sil
const clearLastLetter = () => {
  if (gameState.value.selectedLetters.length > 0) {
    gameState.value.selectedLetters.pop();
  }
};

// Tüm seçilen harfleri temizle
const clearSelectedLetters = () => {
  gameState.value.selectedLetters = [];
};
</script>
