<template>
  <div class="flex min-h-screen flex-col items-center justify-center">
    <!-- Quiz Tamamlandıysa -->
    <div v-if="quizFinished" class="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 class="mb-2 text-2xl font-semibold text-gray-900">Quiz Completed</h2>
      <p class="mb-4 text-gray-600">Here's how you did:</p>
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

    <!-- Quiz Devam Ediyorsa -->
    <div v-else class="relative w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <span v-if="words.length" class="absolute right-4 top-3 text-xs text-gray-400">
        {{ currentQuestionIndex + 1 }}/{{ words.length }}
      </span>
      <h2 v-if="currentWord" class="mb-4 text-xl font-semibold text-gray-900">
        {{ currentWord.word }}
      </h2>
      <div class="flex flex-col gap-3">
        <button
          v-for="option in shuffledOptions"
          :key="option.id"
          @click="selectAnswer(option)"
          :class="[
            'w-full rounded-lg px-4 py-3 text-sm font-medium transition focus:outline-none',
            selectedAnswer && option.id === currentWord.id
              ? 'bg-green-500 text-white'
              : selectedAnswer && option.id === selectedAnswer
                ? 'bg-red-500 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200',
          ]"
        >
          {{ option.meaning }}
        </button>
      </div>
      <p v-if="selectedAnswer" class="mt-4 text-sm text-gray-700">
        {{ feedbackMessage }}
      </p>
      <button
        v-if="selectedAnswer"
        @click="nextQuestion"
        class="mt-6 w-full rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700"
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
const selectedAnswer = ref(null);
const userResponses = ref([]);
const quizFinished = ref(false);

// Load words when component mounts
onMounted(() => {
  console.log('Pack slug:', props.packSlug);
  console.log('All packs:', allPacks);

  const foundPack = allPacks.find((pack) => pack.slug === props.packSlug);
  console.log('Found pack:', foundPack);

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

// Rastgele seçenekleri karıştır
const shuffledOptions = computed(() => {
  if (!currentWord.value) return [];
  let options = words.value.filter((word) => word.id !== currentWord.value.id);
  options = options.sort(() => Math.random() - 0.5).slice(0, 3);
  options.push(currentWord.value);
  return options.sort(() => Math.random() - 0.5);
});

// Kullanıcı seçimi
const selectAnswer = (option) => {
  if (!selectedAnswer.value) {
    selectedAnswer.value = option.id;
    userResponses.value.push({
      word_id: currentWord.value?.id,
      selected_id: option.id,
      correct: option.id === currentWord.value?.id,
    });
  }
};

// Doğru/yanlış mesajı
const feedbackMessage = computed(() => {
  if (!currentWord.value) return '';
  return selectedAnswer.value === currentWord.value.id
    ? 'Correct!'
    : `Wrong! The correct answer is: ${currentWord.value.meaning}`;
});

// Son soru mu?
const isLastQuestion = computed(() => words.value.length && currentQuestionIndex.value === words.value.length - 1);

// Sonraki soruya geçme
const nextQuestion = () => {
  if (isLastQuestion.value) {
    quizFinished.value = true;
    updateWordStats(); // Quiz bitince API'ye gönder
  } else if (words.value.length) {
    currentQuestionIndex.value++;
    selectedAnswer.value = null;
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
  selectedAnswer.value = null;
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
