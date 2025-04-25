<template>
  <div class="flex min-h-screen flex-col items-center justify-center">
    <!-- Quiz Sonucu -->
    <div v-if="quizFinished" class="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 class="mb-2 text-2xl font-semibold text-gray-900">Quiz Completed!</h2>
      <p class="mb-4 text-gray-600">You have finished the quiz. Here's how you did:</p>
      <ul class="space-y-2 text-left text-sm text-gray-800">
        <li
          v-for="response in userResponses"
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
        @click="restartQuiz"
        class="mt-6 w-full rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700"
      >
        Restart Quiz
      </button>
    </div>

    <!-- Quiz Soruları -->
    <div v-else class="relative w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <span v-if="words.length" class="absolute right-4 top-3 text-xs text-gray-400">
        {{ currentQuestionIndex + 1 }}/{{ words.length }}
      </span>
      <h2 v-if="currentWord" class="mb-4 text-xl font-semibold text-gray-900">
        {{ currentWord.word }}
      </h2>

      <input
        v-model="userInput"
        :disabled="answered"
        type="text"
        placeholder="Enter the translation"
        class="w-full rounded-lg border border-gray-300 p-3 text-base text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
        @keyup.enter="checkAnswer"
      />

      <p v-if="answered" class="mt-4 text-sm font-medium" :class="isCorrect ? 'text-green-600' : 'text-red-600'">
        {{ feedbackMessage }}
      </p>

      <button
        v-if="!answered"
        @click="checkAnswer"
        class="mt-6 w-full rounded-lg bg-black px-4 py-2 text-sm font-medium text-white shadow-md transition hover:bg-gray-700"
      >
        Submit Answer
      </button>

      <button
        v-if="answered"
        @click="nextQuestion"
        class="mt-4 w-full rounded-lg bg-black px-4 py-2 text-sm font-medium text-white shadow-md transition hover:bg-gray-700"
      >
        {{ isLastQuestion ? 'Analyze' : 'Next' }}
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
});

const page = usePage();
const allPacks = page.props.languagePacks || [];

// Find the pack using the slug
const currentPack = computed(() => {
  if (!props.packSlug) return null;
  return allPacks.find((pack) => pack.slug === props.packSlug);
});

// Kelime listesi al ve karıştır
const words = ref([]);
const wordsMap = computed(() => Object.fromEntries(words.value.map((word) => [word.id, word])));
const currentQuestionIndex = ref(0);
const userInput = ref('');
const answered = ref(false);
const userResponses = ref([]);
const quizFinished = ref(false);

// Load words when component mounts
onMounted(() => {
  console.log('Pack slug (TranslateWord):', props.packSlug);
  console.log('All packs (TranslateWord):', allPacks);

  const foundPack = allPacks.find((pack) => pack.slug === props.packSlug);
  console.log('Found pack (TranslateWord):', foundPack);

  if (foundPack && foundPack.words && foundPack.words.length) {
    console.log('Loading words from found pack, words count:', foundPack.words.length);
    words.value = [...foundPack.words].sort(() => Math.random() - 0.5);
  } else if (allPacks.length > 0 && allPacks[0].words && allPacks[0].words.length) {
    console.log('Fallback to first pack, words count:', allPacks[0].words.length);
    words.value = [...allPacks[0].words].sort(() => Math.random() - 0.5);
  } else {
    console.log('No words found in any pack');
  }
});

// Şu anki kelime
const currentWord = computed(() => (words.value.length ? words.value[currentQuestionIndex.value] : null));

// Kullanıcı cevabı doğru mu?
const isCorrect = computed(() => currentWord.value?.meaning?.toLowerCase() === userInput.value.toLowerCase());

// Kullanıcı yanıtı kontrol et
const checkAnswer = () => {
  if (!userInput.value.trim() || answered.value) return;

  answered.value = true;
  userResponses.value.push({
    word_id: currentWord.value?.id,
    correct: isCorrect.value,
  });
};

// Geri bildirim mesajı
const feedbackMessage = computed(() => {
  if (!currentWord.value) return '';
  return isCorrect.value ? 'Correct!' : `Wrong! The correct translation is: ${currentWord.value.meaning}`;
});

// Son soru mu?
const isLastQuestion = computed(() => words.value.length && currentQuestionIndex.value === words.value.length - 1);

// Sonraki soruya geçme
const nextQuestion = () => {
  if (isLastQuestion.value) {
    quizFinished.value = true;
    updateWordStats(); // Quiz bitince API'ye gönder
  } else {
    currentQuestionIndex.value++;
    userInput.value = '';
    answered.value = false;
  }
};

// Quiz sıfırla
const restartQuiz = () => {
  if (currentPack.value && currentPack.value.words) {
    words.value = [...currentPack.value.words].sort(() => Math.random() - 0.5);
  } else if (allPacks.length > 0 && allPacks[0].words) {
    words.value = [...allPacks[0].words].sort(() => Math.random() - 0.5);
  } else {
    words.value = [];
  }
  currentQuestionIndex.value = 0;
  userInput.value = '';
  answered.value = false;
  userResponses.value = [];
  quizFinished.value = false;
};

// API'ye verileri gönder
const updateWordStats = () => {
  if (!userResponses.value.length) return;

  const updateData = userResponses.value.map((response) => ({
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
</script>
