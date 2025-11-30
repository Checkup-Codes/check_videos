<template>
  <CheckScreen>
    <div
      class="mx-auto max-w-4xl space-y-6 p-6 transition-all duration-300"
      :class="{
        'xl:-translate-x-[100px]': showQuestionNavigation && isQuestionNavigationOpen,
      }"
    >
      <!-- Test Header -->
      <div class="space-y-4 rounded-lg border border-border bg-card p-6">
        <div class="flex items-center justify-between">
          <h1 class="text-3xl font-bold text-foreground">{{ test.title }}</h1>
          <div v-if="test.time_limit" class="flex items-center gap-2 rounded-md bg-primary/10 px-4 py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span class="font-mono text-lg font-semibold text-primary">{{ formattedTime }}</span>
          </div>
        </div>

        <div v-if="test.description" class="text-muted-foreground">
          {{ test.description }}
        </div>

        <div class="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div class="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <span>{{ test.total_questions }} soru</span>
          </div>
          <div v-if="test.total_points" class="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
            <span>{{ test.total_points }} puan</span>
          </div>
        </div>
      </div>

      <!-- Progress Bar -->
      <div class="space-y-2">
        <div class="flex items-center justify-between text-sm">
          <span class="text-muted-foreground">İlerleme</span>
          <span class="font-medium text-foreground">{{ answeredCount }} / {{ test.total_questions }} soru cevaplandı</span>
        </div>
        <div class="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            class="h-full bg-primary transition-all duration-300"
            :style="{ width: `${progressPercentage}%` }"
          ></div>
        </div>
      </div>

      <!-- Questions -->
      <form @submit.prevent="submitTest" class="space-y-6">
        <div
          v-for="(question, index) in test.questions"
          :key="question.id"
          :id="`question-${question.id}`"
          :ref="(el) => setQuestionRef(el, question.id)"
          class="space-y-4 rounded-lg border border-border bg-card p-6 scroll-mt-24"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="mb-2 flex items-center gap-2">
                <span class="rounded-md bg-primary px-2 py-1 text-sm font-semibold text-primary-foreground">
                  Soru {{ index + 1 }}
                </span>
                <span class="text-sm text-muted-foreground">({{ question.points }} puan)</span>
              </div>
              <p class="text-lg font-medium text-foreground">{{ question.question_text }}</p>
            </div>
            <div
              v-if="answers[question.id]"
              class="ml-4 flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <div class="space-y-2">
            <label
              v-for="(option, optIndex) in question.options"
              :key="option.id"
              :for="`question-${question.id}-option-${option.id}`"
              class="flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-background p-4 transition-colors hover:bg-accent"
              :class="{
                'border-primary bg-primary/5': answers[question.id] === option.id,
                'border-border': answers[question.id] !== option.id,
              }"
            >
              <input
                :id="`question-${question.id}-option-${option.id}`"
                type="radio"
                :name="`question-${question.id}`"
                :value="option.id"
                v-model="answers[question.id]"
                class="mt-1 h-4 w-4 cursor-pointer text-primary focus:ring-primary"
                @change="updateAnsweredCount"
              />
              <div class="flex-1">
                <div class="flex items-center gap-2">
                  <span class="font-medium text-muted-foreground">{{ String.fromCharCode(65 + optIndex) }}.</span>
                  <span class="text-foreground">{{ option.option_text }}</span>
                </div>
              </div>
            </label>
          </div>
        </div>

        <!-- Participant Name (if not logged in) -->
        <div v-if="!isLoggedIn" class="rounded-lg border border-border bg-card p-6">
          <label for="participant_name" class="mb-2 block text-sm font-medium text-foreground">
            Adınız (Opsiyonel)
          </label>
          <input
            id="participant_name"
            v-model="participantName"
            type="text"
            placeholder="İsminizi girin"
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>

        <!-- Submit Button -->
        <div class="flex gap-4">
          <button
            type="submit"
            :disabled="form.processing || !canSubmit"
            class="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span v-if="form.processing">Gönderiliyor...</span>
            <span v-else>Testi Tamamla</span>
          </button>
          <Link
            :href="`/tests/${test.slug}`"
            class="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
          >
            İptal
          </Link>
        </div>
      </form>
    </div>

    <!-- Mobile Question Navigation Button -->
    <button
      v-if="showQuestionNavigation"
      @click="toggleQuestionNavigation"
      class="fixed right-4 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 xl:hidden"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-5 w-5"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
    </button>

    <!-- Mobile Question Navigation Panel -->
    <div
      v-if="showQuestionNavigation"
      class="fixed right-0 top-12 z-40 h-[calc(100vh-3rem)] w-80 transform border-l border-border bg-popover shadow-2xl transition-transform duration-300 lg:h-[calc(100vh-5.5rem)] xl:hidden"
      :class="{ 'translate-x-full': !isQuestionNavigationOpen }"
    >
      <div class="flex h-full flex-col">
        <div class="flex items-center justify-between border-b border-border p-4">
          <h3 class="text-lg font-semibold text-foreground">Sorular</h3>
          <button
            @click="toggleQuestionNavigation"
            class="inline-flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-4 w-4"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div ref="mobileQuestionNavScrollRef" class="flex-1 overflow-y-auto p-4">
          <nav class="space-y-1">
            <button
              v-for="(question, index) in test.questions"
              :key="question.id"
              :ref="(el) => setQuestionNavItemRef(el, question.id)"
              @click="scrollToQuestion(question.id)"
              class="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors"
              :class="[
                currentQuestionId === question.id
                  ? 'bg-accent font-medium text-accent-foreground'
                  : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground',
              ]"
            >
              <div class="flex items-center gap-2">
                <span class="font-medium">Soru {{ index + 1 }}</span>
              </div>
              <div class="flex items-center gap-2">
                <span
                  v-if="answers[question.id]"
                  class="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white"
                  title="Cevaplandı"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span
                  v-else
                  class="flex h-5 w-5 items-center justify-center rounded-full border-2 border-muted-foreground/30"
                  title="Cevaplanmadı"
                ></span>
              </div>
            </button>
          </nav>
        </div>
      </div>
    </div>

    <!-- Desktop Question Navigation Button -->
    <button
      v-if="showQuestionNavigation"
      @click="toggleQuestionNavigation"
      class="fixed right-4 top-28 z-50 hidden h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 xl:flex"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-5 w-5"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
    </button>

    <!-- Desktop Question Navigation Panel -->
    <div
      v-if="showQuestionNavigation"
      class="fixed right-4 top-28 z-30 hidden w-64 transition-all duration-300 ease-in-out xl:block"
      :class="isQuestionNavigationOpen ? 'translate-x-0 opacity-100' : 'pointer-events-none translate-x-full opacity-0'"
    >
      <div class="rounded-lg border border-border bg-popover shadow-lg">
        <div class="flex items-center justify-between border-b border-border p-3">
          <h3 class="text-sm font-semibold text-foreground">Sorular</h3>
          <button
            @click="toggleQuestionNavigation"
            class="inline-flex h-6 w-6 items-center justify-center rounded-md text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-4 w-4"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div ref="desktopQuestionNavScrollRef" class="overflow-y-auto p-3" style="max-height: calc(100vh - 220px)">
          <nav class="space-y-1">
            <button
              v-for="(question, index) in test.questions"
              :key="question.id"
              :ref="(el) => setQuestionNavItemRef(el, question.id)"
              @click="scrollToQuestion(question.id)"
              class="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-xs transition-colors"
              :class="[
                currentQuestionId === question.id
                  ? 'bg-accent font-medium text-accent-foreground'
                  : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground',
              ]"
            >
              <div class="flex items-center gap-2">
                <span class="font-medium">Soru {{ index + 1 }}</span>
              </div>
              <div class="flex items-center gap-2">
                <span
                  v-if="answers[question.id]"
                  class="flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-white"
                  title="Cevaplandı"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span
                  v-else
                  class="flex h-4 w-4 items-center justify-center rounded-full border-2 border-muted-foreground/30"
                  title="Cevaplanmadı"
                ></span>
              </div>
            </button>
          </nav>
        </div>
      </div>
    </div>

    <!-- Mobile Overlay -->
    <div
      v-if="showQuestionNavigation && isQuestionNavigationOpen"
      @click="toggleQuestionNavigation"
      class="fixed inset-0 z-30 bg-black/20 xl:hidden"
    ></div>
  </CheckScreen>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { usePage, useForm, router, Link } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';

const { props } = usePage();
const test = props.test || {};
const isLoggedIn = computed(() => !!(props.auth && props.auth.user));

// Form state
const answers = ref({});
const participantName = ref('');
const questionRefs = ref({});
const startTime = ref(Date.now());

// Question Navigation State
const isQuestionNavigationOpen = ref(false);
const showQuestionNavigation = computed(() => test.questions && test.questions.length > 0);
const currentQuestionId = ref(null);
const questionNavItemRefs = ref(new Map());
const mobileQuestionNavScrollRef = ref(null);
const desktopQuestionNavScrollRef = ref(null);
const isLargeScreen = ref(false);
let questionObserver = null;
let scrollHandler = null;
let isScrollingProgrammatically = false;

// Timer
const timeRemaining = ref(test.time_limit ? test.time_limit * 60 : null); // Convert to seconds
const timerInterval = ref(null);

const formattedTime = computed(() => {
  if (!timeRemaining.value) return '';
  const minutes = Math.floor(timeRemaining.value / 60);
  const seconds = timeRemaining.value % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
});

// Progress
const answeredCount = computed(() => {
  return Object.keys(answers.value).filter((key) => answers.value[key] !== null && answers.value[key] !== undefined)
    .length;
});

const progressPercentage = computed(() => {
  if (!test.total_questions || test.total_questions === 0) return 0;
  return (answeredCount.value / test.total_questions) * 100;
});

const canSubmit = computed(() => {
  return answeredCount.value > 0;
});

// Form
const form = useForm({
  answers: [],
  participant_name: '',
  time_taken: null,
});

const updateAnsweredCount = () => {
  // This is called when an answer is selected
};

const setQuestionRef = (el, questionId) => {
  if (el) {
    questionRefs.value[questionId] = el;
  }
};

const setQuestionNavItemRef = (el, questionId) => {
  if (el) {
    questionNavItemRefs.value.set(questionId, el);
  } else {
    questionNavItemRefs.value.delete(questionId);
  }
};

const toggleQuestionNavigation = () => {
  isQuestionNavigationOpen.value = !isQuestionNavigationOpen.value;
};

const scrollToQuestion = (questionId) => {
  if (!questionId) return;

  const element = document.getElementById(`question-${questionId}`);
  if (!element) return;

  // Find the CheckScreen scroll container (the overflow-y-auto div)
  const scrollContainer = element.closest('.overflow-y-auto');
  if (!scrollContainer) return;

  isScrollingProgrammatically = true;
  currentQuestionId.value = questionId;

  nextTick(() => {
    scrollToActiveQuestionNavItem();
  });

  // Calculate scroll position relative to the scroll container
  const containerRect = scrollContainer.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();
  const scrollTop = scrollContainer.scrollTop;
  const elementOffsetTop = elementRect.top - containerRect.top + scrollTop;
  const headerOffset = 80; // Account for sticky header

  scrollContainer.scrollTo({
    top: elementOffsetTop - headerOffset,
    behavior: 'smooth',
  });

  setTimeout(() => {
    isScrollingProgrammatically = false;
  }, 600);

  if (window.innerWidth < 1280) {
    isQuestionNavigationOpen.value = false;
  }
};

const scrollToActiveQuestionNavItem = () => {
  if (!currentQuestionId.value) return;

  const activeItem = questionNavItemRefs.value.get(currentQuestionId.value);
  if (!activeItem) return;

  const scrollContainer = window.innerWidth >= 1280 ? desktopQuestionNavScrollRef.value : mobileQuestionNavScrollRef.value;
  if (!scrollContainer) return;

  const containerRect = scrollContainer.getBoundingClientRect();
  const itemRect = activeItem.getBoundingClientRect();

  const isAboveViewport = itemRect.top < containerRect.top;
  const isBelowViewport = itemRect.bottom > containerRect.bottom;

  if (isAboveViewport || isBelowViewport) {
    const scrollTop = scrollContainer.scrollTop;
    const itemOffsetTop = activeItem.offsetTop;
    const containerHeight = scrollContainer.clientHeight;
    const itemHeight = activeItem.offsetHeight;

    const targetScrollTop = itemOffsetTop - containerHeight / 2 + itemHeight / 2;

    scrollContainer.scrollTo({
      top: targetScrollTop,
      behavior: 'smooth',
    });
  }
};

const setupActiveQuestionTracking = () => {
  if (!test.questions || test.questions.length === 0) return;

  const questionElements = test.questions.map((q) => document.getElementById(`question-${q.id}`)).filter(Boolean);
  if (questionElements.length === 0) return;

  const headerOffset = 80;

  const updateActiveQuestion = () => {
    if (isScrollingProgrammatically) return;

    let currentQuestion = null;
    let closestDistance = Infinity;

    questionElements.forEach((element) => {
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const distanceFromTop = rect.top - headerOffset;

      if (rect.top <= headerOffset + 50 && rect.bottom > 0) {
        if (distanceFromTop <= 50 && Math.abs(distanceFromTop) < closestDistance) {
          closestDistance = Math.abs(distanceFromTop);
          const questionId = element.id.replace('question-', '');
          currentQuestion = questionId;
        }
      }
    });

    if (!currentQuestion) {
      questionElements.forEach((element) => {
        if (!element) return;
        const rect = element.getBoundingClientRect();
        if (rect.top < headerOffset + 200 && rect.bottom > 0) {
          const distance = Math.abs(rect.top - headerOffset);
          if (distance < closestDistance) {
            closestDistance = distance;
            const questionId = element.id.replace('question-', '');
            currentQuestion = questionId;
          }
        }
      });
    }

    if (currentQuestion && currentQuestionId.value !== currentQuestion) {
      currentQuestionId.value = currentQuestion;
    }
  };

  questionObserver = new IntersectionObserver(
    () => {
      if (!isScrollingProgrammatically) {
        updateActiveQuestion();
      }
    },
    {
      root: null,
      rootMargin: `-${headerOffset + 10}px 0px -60% 0px`,
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
    }
  );

  questionElements.forEach((element) => {
    if (element) {
      questionObserver.observe(element);
    }
  });

  scrollHandler = () => {
    if (!isScrollingProgrammatically) {
      updateActiveQuestion();
    }
  };

  window.addEventListener('scroll', scrollHandler, { passive: true });
  updateActiveQuestion();
};

const initializeQuestionNavigationState = () => {
  const isLarge = window.innerWidth >= 1280;
  isLargeScreen.value = isLarge;
  if (isLarge && showQuestionNavigation.value) {
    isQuestionNavigationOpen.value = true;
  } else if (!isLarge) {
    isQuestionNavigationOpen.value = false;
  }
};

// Timer
const startTimer = () => {
  if (!test.time_limit) return;

  timerInterval.value = setInterval(() => {
    if (timeRemaining.value > 0) {
      timeRemaining.value--;
    } else {
      // Time's up - auto submit
      clearInterval(timerInterval.value);
      submitTest(true);
    }
  }, 1000);
};

const stopTimer = () => {
  if (timerInterval.value) {
    clearInterval(timerInterval.value);
    timerInterval.value = null;
  }
};

// Submit
const submitTest = (autoSubmit = false) => {
  if (autoSubmit || !canSubmit.value) {
    if (autoSubmit && !canSubmit.value) {
      alert('Süre doldu! Test otomatik olarak gönderildi.');
    }
  }

  // Prepare answers array
  const answersArray = test.questions.map((question) => ({
    question_id: question.id,
    option_id: answers.value[question.id] || null,
  }));

  // Calculate time taken
  const timeTaken = Math.floor((Date.now() - startTime.value) / 1000); // in seconds

  form.answers = answersArray;
  form.participant_name = participantName.value;
  form.time_taken = timeTaken;

  form.post(route('tests.submit', test.slug), {
    onSuccess: () => {
      stopTimer();
      // Controller will redirect to result page
    },
    onError: (errors) => {
      console.error('Test submission error:', errors);
      alert('Test gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
    },
  });
};

// Lifecycle
onMounted(() => {
  startTimer();
  initializeQuestionNavigationState();
  
  // Setup question navigation tracking
  nextTick(() => {
    if (showQuestionNavigation.value) {
      setupActiveQuestionTracking();
    }
  });

  // Handle resize
  const resizeHandler = () => {
    initializeQuestionNavigationState();
  };
  window.addEventListener('resize', resizeHandler);
  
  // Warn before leaving if there are answers
  window.addEventListener('beforeunload', handleBeforeUnload);
});

onUnmounted(() => {
  stopTimer();
  if (questionObserver) {
    questionObserver.disconnect();
    questionObserver = null;
  }
  if (scrollHandler) {
    window.removeEventListener('scroll', scrollHandler);
    scrollHandler = null;
  }
  window.removeEventListener('beforeunload', handleBeforeUnload);
});

const handleBeforeUnload = (e) => {
  if (answeredCount.value > 0) {
    e.preventDefault();
    e.returnValue = '';
  }
};

// Watch for time limit
watch(
  () => timeRemaining.value,
  (newValue) => {
    if (newValue === 0) {
      // Time's up
      stopTimer();
    }
  }
);

// Watch currentQuestionId to scroll navigation panel
watch(currentQuestionId, (newId, oldId) => {
  if (newId && newId !== oldId && !isScrollingProgrammatically) {
    nextTick(() => {
      scrollToActiveQuestionNavItem();
    });
  }
});
</script>
