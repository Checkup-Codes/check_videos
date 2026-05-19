<template>
  <CheckScreen>
    <div
      class="max-w-full space-y-6 p-3 pt-6 transition-all duration-300 sm:p-6 sm:pt-12 lg:max-w-[920px] lg:pt-16"
      :class="{
        'xl:-translate-x-[100px]': showQuestionNavigation && isQuestionNavigationOpen,
      }"
    >
      <!-- Test Header -->
      <div class="space-y-4 rounded-lg border border-border/70 bg-card p-4 sm:p-5">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div class="min-w-0">
            <p class="text-xs font-medium text-muted-foreground">Test</p>
            <h1 class="mt-2 text-2xl font-semibold leading-tight text-foreground sm:text-3xl">{{ test.title }}</h1>
          </div>
          <div class="grid gap-2 sm:flex sm:shrink-0">
            <Link
              :href="`/tests/${test.slug}/take`"
              class="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto"
            >
              Testi Çöz
            </Link>
          </div>
        </div>

        <div v-if="test.description" class="text-sm leading-6 text-muted-foreground">
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
          <div v-if="test.time_limit" class="flex items-center gap-2">
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{{ test.time_limit }} dakika</span>
          </div>
        </div>
      </div>

      <section v-if="isAdmin" class="space-y-3 rounded-lg border border-border/70 bg-card p-4 sm:p-5">
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 class="text-base font-semibold text-foreground">Kişisel analiz</h2>
            <p class="mt-1 text-sm text-muted-foreground">Bu test için giriş yaptığın sonuçlara göre hesaplanır.</p>
          </div>
          <Link
            v-if="hasAnalysis && testAnalysis.latest_result_id"
            :href="`/tests/result/${testAnalysis.latest_result_id}`"
            class="inline-flex h-9 w-full items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent sm:w-auto"
          >
            Son sonucu aç
          </Link>
        </div>

        <div v-if="hasAnalysis" class="space-y-4">
          <div class="grid grid-cols-2 gap-2 lg:grid-cols-5">
            <div
              v-for="item in analysisStats"
              :key="item.label"
              class="rounded-md border border-border/70 bg-background p-3"
            >
              <p class="text-xl font-semibold text-foreground">{{ item.value }}</p>
              <p class="mt-1 text-xs text-muted-foreground">{{ item.label }}</p>
            </div>
          </div>

          <div class="grid gap-3 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div class="rounded-md border border-border/70 bg-background p-3">
              <div class="flex items-center justify-between gap-3">
                <h3 class="text-sm font-semibold text-foreground">En çok zorlandığın sorular</h3>
                <span class="text-xs text-muted-foreground">{{ testAnalysis.weak_questions?.length || 0 }} kayıt</span>
              </div>
              <div v-if="testAnalysis.weak_questions?.length" class="mt-3 space-y-2">
                <div
                  v-for="(question, index) in testAnalysis.weak_questions"
                  :key="question.question_id"
                  class="rounded-md border border-border/60 bg-card p-3"
                >
                  <div class="flex items-start justify-between gap-3">
                    <p class="min-w-0 text-sm font-medium leading-5 text-foreground">
                      {{ index + 1 }}. {{ question.question_text }}
                    </p>
                    <span
                      class="shrink-0 rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 dark:bg-red-950 dark:text-red-300"
                    >
                      {{ question.wrong_count }} yanlış
                    </span>
                  </div>
                  <p class="mt-2 text-xs text-muted-foreground">
                    {{ question.attempts_count }} denemede %{{ question.wrong_rate }} hata oranı
                  </p>
                </div>
              </div>
              <p v-else class="mt-3 text-sm text-muted-foreground">Bu testte tekrar eden yanlış görünmüyor.</p>
            </div>

            <div class="rounded-md border border-border/70 bg-background p-3">
              <h3 class="text-sm font-semibold text-foreground">Son denemeler</h3>
              <div class="mt-3 space-y-2">
                <Link
                  v-for="attempt in testAnalysis.recent_attempts"
                  :key="attempt.id"
                  :href="`/tests/result/${attempt.id}`"
                  class="flex items-center justify-between gap-3 rounded-md border border-border/60 bg-card px-3 py-2 transition-colors hover:bg-accent"
                >
                  <div class="min-w-0">
                    <p class="text-sm font-medium text-foreground">{{ formatScore(attempt.score) }}</p>
                    <p class="mt-0.5 truncate text-xs text-muted-foreground">{{ formatDate(attempt.completed_at) }}</p>
                  </div>
                  <span class="text-xs text-muted-foreground">
                    {{ attempt.correct_answers }}/{{ attempt.total_questions }}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="rounded-md border border-dashed border-border bg-background p-4">
          <p class="text-sm font-medium text-foreground">Henüz analiz yok</p>
          <p class="mt-1 text-sm text-muted-foreground">
            Giriş yapmış halde testi çözdükten sonra deneme sayısı, skor geçmişi ve zorlandığın sorular burada görünür.
          </p>
        </div>
      </section>

      <!-- Test Questions Preview -->
      <div v-if="test.questions && test.questions.length > 0" class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-semibold text-foreground">Sorular</h2>
          <button
            v-if="!showQuestions"
            @click="showQuestions = true"
            class="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
          >
            Soruları Göster
          </button>
          <button
            v-else
            @click="showQuestions = false"
            class="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
          >
            Soruları Gizle
          </button>
        </div>
        <div
          class="max-w-full space-y-6 lg:max-w-[800px]"
          :class="{ 'pointer-events-none select-none blur-sm': !showQuestions }"
        >
          <div
            v-for="(question, index) in test.questions"
            :key="question.id"
            :id="`question-${question.id}`"
            class="scroll-mt-24 rounded-lg border border-border bg-card p-4"
          >
            <div class="mb-4">
              <span class="text-sm font-medium text-muted-foreground">Soru {{ index + 1 }}</span>
              <p class="mt-2 whitespace-pre-wrap text-foreground">{{ question.question_text }}</p>
            </div>
            <div class="space-y-2">
              <div
                v-for="(option, optIndex) in question.options"
                :key="option.id"
                class="flex items-center gap-2 rounded-md border border-border bg-background p-2"
                :class="option.is_correct ? 'border-green-500 bg-green-50 dark:bg-green-950' : ''"
              >
                <span class="text-sm font-medium text-muted-foreground">{{ String.fromCharCode(65 + optIndex) }}.</span>
                <span class="whitespace-pre-wrap text-sm text-foreground">{{ option.option_text }}</span>
                <span v-if="option.is_correct" class="ml-auto text-xs font-medium text-green-600 dark:text-green-400">
                  ✓ Doğru
                </span>
              </div>
            </div>
            <div v-if="question.explanation" class="mt-3 rounded-md bg-muted p-2 text-sm text-muted-foreground">
              <strong>Açıklama:</strong> <span class="whitespace-pre-wrap">{{ question.explanation }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex gap-4">
        <Link
          href="/tests"
          class="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
        >
          Geri Dön
        </Link>
      </div>
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
              <span class="font-medium">Soru {{ index + 1 }}</span>
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
              <span class="font-medium">Soru {{ index + 1 }}</span>
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
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue';
import { usePage, Link } from '@inertiajs/vue3';
import CheckScreen from '@/Components/CekapUI/Slots/CheckScreen.vue';

const { props } = usePage();
const test = props.test || {};
const isAdmin = props.isAdmin || false;
const testAnalysis = props.testAnalysis || null;

const hasAnalysis = computed(() => {
  return !!testAnalysis?.has_results;
});

const analysisStats = computed(() => {
  if (!hasAnalysis.value) return [];

  return [
    { label: 'Deneme', value: testAnalysis.attempts_count },
    { label: 'Son Skor', value: formatScore(testAnalysis.latest_score) },
    { label: 'Ortalama', value: formatScore(testAnalysis.average_score) },
    { label: 'En İyi', value: formatScore(testAnalysis.best_score) },
    { label: 'Ort. Süre', value: testAnalysis.average_time_taken ? formatTime(testAnalysis.average_time_taken) : '-' },
  ];
});

const formatScore = (score) => {
  if (score === null || score === undefined) return '-';
  return `%${Math.round(Number(score))}`;
};

const formatTime = (seconds) => {
  if (!seconds) return '-';
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (minutes > 0) {
    return `${minutes}dk ${secs}sn`;
  }
  return `${secs}sn`;
};

const formatDate = (dateString) => {
  if (!dateString) return '-';
  return new Intl.DateTimeFormat('tr-TR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString));
};

// Show questions state - default to false (blurred)
const showQuestions = ref(false);

// Question Navigation State
const isQuestionNavigationOpen = ref(false);
const showQuestionNavigation = computed(() => test.questions && test.questions.length > 0 && showQuestions.value);
const currentQuestionId = ref(null);
const questionNavItemRefs = ref(new Map());
const mobileQuestionNavScrollRef = ref(null);
const desktopQuestionNavScrollRef = ref(null);
const isLargeScreen = ref(false);
let questionObserver = null;
let scrollHandler = null;
let isScrollingProgrammatically = false;

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

  const scrollContainer =
    window.innerWidth >= 1280 ? desktopQuestionNavScrollRef.value : mobileQuestionNavScrollRef.value;
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

onMounted(() => {
  initializeQuestionNavigationState();

  nextTick(() => {
    if (showQuestionNavigation.value) {
      setupActiveQuestionTracking();
    }
  });

  const resizeHandler = () => {
    initializeQuestionNavigationState();
  };
  window.addEventListener('resize', resizeHandler);
});

onUnmounted(() => {
  if (questionObserver) {
    questionObserver.disconnect();
    questionObserver = null;
  }
  if (scrollHandler) {
    window.removeEventListener('scroll', scrollHandler);
    scrollHandler = null;
  }
});

watch(currentQuestionId, (newId, oldId) => {
  if (newId && newId !== oldId && !isScrollingProgrammatically) {
    nextTick(() => {
      scrollToActiveQuestionNavItem();
    });
  }
});
</script>
