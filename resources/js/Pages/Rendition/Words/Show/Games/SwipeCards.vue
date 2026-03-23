<template>
  <div class="flex h-full w-full max-w-2xl flex-col justify-center px-4">
    <!-- Minimalist Progress Section -->
    <div class="mb-4 space-y-2">
      <!-- Stats Row -->
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <span class="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-2.5 py-1 text-xs font-medium text-green-600 dark:text-green-400">
            <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            {{ stats.correct }}
          </span>
          <span class="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-600 dark:text-red-400">
            <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
            {{ stats.incorrect }}
          </span>
        </div>
        <span class="text-xs font-medium text-muted-foreground">{{ currentIndex + 1 }} / {{ totalQuestions }}</span>
      </div>
      
      <!-- Progress Bar -->
      <div class="relative h-1 w-full overflow-hidden rounded-full bg-muted/50">
        <div
          class="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary via-primary to-primary/80 transition-all duration-500 ease-out"
          :style="{ width: `${progress}%` }"
        ></div>
      </div>
    </div>

    <!-- Minimalist Instructions (only on first card) -->
    <div v-if="currentIndex === 0 && !hasStartedSwiping" class="mb-3 rounded-xl border border-border/50 bg-muted/30 px-4 py-2.5 backdrop-blur-sm">
      <div class="flex items-center justify-center gap-3 text-xs">
        <div class="flex items-center gap-1.5">
          <div class="flex h-5 w-5 items-center justify-center rounded-full bg-green-500/10">
            <svg class="h-3 w-3 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <span class="font-medium text-foreground">Biliyorum</span>
        </div>
        <span class="text-muted-foreground">•</span>
        <div class="flex items-center gap-1.5">
          <div class="flex h-5 w-5 items-center justify-center rounded-full bg-red-500/10">
            <svg class="h-3 w-3 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          <span class="font-medium text-foreground">Bilmiyorum</span>
        </div>
      </div>
    </div>

    <!-- Card Stack Container - Fixed Size -->
    <div class="relative" style="width: 500px; height: 450px; max-width: 90vw">
      <!-- Background Cards (for depth effect) -->
      <div
        v-for="i in 2"
        :key="`bg-${i}`"
        class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm"
        style="width: 500px; height: 450px; max-width: 90vw"
        :style="{
          transform: `translate(-50%, -50%) scale(${1 - i * 0.04}) translateY(${i * 6}px)`,
          opacity: 0.4 - i * 0.1,
          zIndex: 10 - i,
        }"
      ></div>

      <!-- Active Card -->
      <transition name="card-exit" mode="out-in">
        <div
          v-if="currentWord"
          :key="currentWord.id"
          ref="cardRef"
          class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-3xl border border-border bg-card shadow-2xl active:cursor-grabbing overflow-y-auto"
          style="width: 500px; height: 450px; max-width: 90vw"
          :style="{
            transform: cardTransform,
            transition: isDragging ? 'none' : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            zIndex: 20,
          }"
          @mousedown="startDrag"
          @touchstart="startDrag"
        >
          <!-- Swipe Indicators -->
          <div
            class="pointer-events-none absolute inset-0 flex items-center justify-center rounded-3xl transition-opacity duration-200"
            :style="{ opacity: Math.abs(dragX) > 50 ? Math.min(Math.abs(dragX) / 150, 1) : 0 }"
          >
            <div
              v-if="dragX > 50"
              class="absolute right-6 top-6 rounded-2xl bg-green-500 p-3 shadow-xl"
            >
              <svg class="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div
              v-else-if="dragX < -50"
              class="absolute left-6 top-6 rounded-2xl bg-red-500 p-3 shadow-xl"
            >
              <svg class="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>

          <!-- Card Content -->
          <div class="flex h-full flex-col p-6">
            <!-- Word Header -->
            <div class="mb-4 text-center">
              <h2 class="mb-2 text-3xl font-bold tracking-tight text-foreground">{{ currentWord.word }}</h2>
              <span class="inline-flex items-center rounded-full border border-border/50 bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
                {{ getWordTypeLabel(currentWord.type) }}
              </span>
            </div>

            <!-- Meaning Section -->
            <div class="flex-1">
              <transition name="fade" mode="out-in">
                <!-- Revealed Meaning -->
                <div v-if="showMeaning" class="space-y-3">
                  <div class="rounded-2xl border border-border/50 bg-muted/30 p-4">
                    <div class="space-y-2">
                      <div
                        v-for="(meaning, index) in currentWord.meanings.slice(0, 2)"
                        :key="index"
                        class="flex items-start gap-2"
                      >
                        <span class="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                          {{ index + 1 }}
                        </span>
                        <span class="text-sm leading-relaxed text-foreground">{{ meaning.meaning }}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Example Sentence -->
                  <div v-if="currentWord.example_sentences && currentWord.example_sentences.length > 0" class="rounded-2xl border border-border/50 bg-muted/30 p-4">
                    <p class="text-sm leading-relaxed text-foreground">{{ currentWord.example_sentences[0].sentence }}</p>
                    <p v-if="currentWord.example_sentences[0].translation" class="mt-2 text-xs text-muted-foreground">
                      {{ currentWord.example_sentences[0].translation }}
                    </p>
                  </div>
                </div>

                <!-- Placeholder -->
                <div v-else class="flex h-full items-center justify-center">
                  <div class="text-center">
                    <div class="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/50">
                      <svg class="h-8 w-8 text-muted-foreground/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p class="text-sm font-medium text-muted-foreground">Biliyor musun?</p>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </transition>

      <!-- Completion State -->
      <div
        v-if="!currentWord && currentIndex >= totalQuestions"
        class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
        style="width: 500px; max-width: 90vw"
      >
        <div class="rounded-3xl border border-border bg-card p-8 shadow-2xl">
          <div class="mb-4 flex justify-center">
            <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <svg class="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h3 class="mb-2 text-xl font-bold text-foreground">Tebrikler!</h3>
          <p class="text-sm text-muted-foreground">Tüm kelimeleri tamamladın</p>
        </div>
      </div>
    </div>

    <!-- Minimalist Action Buttons -->
    <div v-if="currentWord" class="mt-4 flex items-center justify-center gap-4">
      <button
        @click="swipeLeft"
        class="group flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-red-500/20 bg-red-500/5 transition-all hover:scale-105 hover:border-red-500/30 hover:bg-red-500/10 hover:shadow-lg hover:shadow-red-500/20 active:scale-95"
      >
        <svg class="h-6 w-6 text-red-600 dark:text-red-400 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <button
        @click="toggleMeaning"
        class="group flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-border bg-card transition-all hover:scale-105 hover:border-primary/30 hover:bg-primary/5 hover:shadow-lg active:scale-95"
      >
        <svg class="h-5 w-5 text-foreground transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      </button>

      <button
        @click="swipeRight"
        class="group flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-green-500/20 bg-green-500/5 transition-all hover:scale-105 hover:border-green-500/30 hover:bg-green-500/10 hover:shadow-lg hover:shadow-green-500/20 active:scale-95"
      >
        <svg class="h-6 w-6 text-green-600 dark:text-green-400 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
        </svg>
      </button>
    </div>

    <!-- Minimalist Keyboard Shortcuts -->
    <div class="mt-3 flex items-center justify-center gap-2 text-[10px] text-muted-foreground">
      <kbd class="inline-flex h-5 min-w-[20px] items-center justify-center rounded border border-border bg-muted px-1.5 font-mono font-medium">←</kbd>
      <span>•</span>
      <kbd class="inline-flex h-5 items-center justify-center rounded border border-border bg-muted px-1.5 font-mono font-medium">Space</kbd>
      <span>•</span>
      <kbd class="inline-flex h-5 min-w-[20px] items-center justify-center rounded border border-border bg-muted px-1.5 font-mono font-medium">→</kbd>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { router } from '@inertiajs/vue3';

const props = defineProps({
  words: {
    type: Array,
    required: true,
  },
  gameConfig: {
    type: Object,
    default: () => ({}),
  },
  packSlug: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['game-completed']);

// State
const currentIndex = ref(0);
const stats = ref({
  correct: 0,
  incorrect: 0,
});
const showMeaning = ref(false);
const hasStartedSwiping = ref(false);

// Drag state
const isDragging = ref(false);
const dragX = ref(0);
const dragY = ref(0);
const startX = ref(0);
const startY = ref(0);
const cardRef = ref(null);

// Results tracking
const results = ref([]);

// Computed
const currentWord = computed(() => props.words[currentIndex.value]);
const totalQuestions = computed(() => props.words.length);
const progress = computed(() => ((currentIndex.value / totalQuestions.value) * 100).toFixed(0));

const cardTransform = computed(() => {
  if (isDragging.value) {
    const rotate = dragX.value / 20;
    return `translate(-50%, -50%) translateX(${dragX.value}px) translateY(${dragY.value}px) rotate(${rotate}deg)`;
  }
  return 'translate(-50%, -50%)';
});

// Methods
const startDrag = (e) => {
  isDragging.value = true;
  hasStartedSwiping.value = true;
  const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
  const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
  startX.value = clientX;
  startY.value = clientY;

  document.addEventListener('mousemove', onDrag);
  document.addEventListener('mouseup', endDrag);
  document.addEventListener('touchmove', onDrag);
  document.addEventListener('touchend', endDrag);
};

const onDrag = (e) => {
  if (!isDragging.value) return;
  const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
  const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
  dragX.value = clientX - startX.value;
  dragY.value = clientY - startY.value;
};

const endDrag = () => {
  if (!isDragging.value) return;
  isDragging.value = false;

  // Check if swipe was strong enough
  if (Math.abs(dragX.value) > 100) {
    if (dragX.value > 0) {
      handleAnswer(true);
    } else {
      handleAnswer(false);
    }
  }

  // Reset position
  dragX.value = 0;
  dragY.value = 0;

  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup', endDrag);
  document.removeEventListener('touchmove', onDrag);
  document.removeEventListener('touchend', endDrag);
};

const swipeRight = () => {
  hasStartedSwiping.value = true;
  // Animate swipe
  dragX.value = 400;
  setTimeout(() => {
    handleAnswer(true);
    dragX.value = 0;
  }, 300);
};

const swipeLeft = () => {
  hasStartedSwiping.value = true;
  // Animate swipe
  dragX.value = -400;
  setTimeout(() => {
    handleAnswer(false);
    dragX.value = 0;
  }, 300);
};

const toggleMeaning = () => {
  showMeaning.value = !showMeaning.value;
};

const handleAnswer = (isCorrect) => {
  if (!currentWord.value) return;

  // Record result
  results.value.push({
    word_id: currentWord.value.id,
    is_correct: isCorrect,
    review_count: 1,
    incorrect_count: isCorrect ? 0 : 1,
  });

  // Update stats
  if (isCorrect) {
    stats.value.correct++;
  } else {
    stats.value.incorrect++;
  }

  // Reset meaning visibility
  showMeaning.value = false;

  // Move to next word
  currentIndex.value++;

  // Check if game is complete
  if (currentIndex.value >= totalQuestions.value) {
    completeGame();
  }
};

const completeGame = () => {
  // Update words in database
  router.post(
    route('rendition.words.update-words'),
    {
      words: results.value,
    },
    {
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => {
        emit('game-completed', {
          totalQuestions: totalQuestions.value,
          correctAnswers: stats.value.correct,
          incorrectAnswers: stats.value.incorrect,
          results: results.value,
        });
      },
    }
  );
};

// Keyboard shortcuts
const handleKeyPress = (e) => {
  if (!currentWord.value) return;

  switch (e.key) {
    case 'ArrowLeft':
      e.preventDefault();
      swipeLeft();
      break;
    case 'ArrowRight':
      e.preventDefault();
      swipeRight();
      break;
    case ' ':
      e.preventDefault();
      toggleMeaning();
      break;
  }
};

// Helper functions
const getWordTypeLabel = (type) => {
  const labels = {
    noun: 'İsim',
    verb: 'Fiil',
    adjective: 'Sıfat',
    adverb: 'Zarf',
  };
  return labels[type] || type;
};

const getLanguageLabel = (language) => {
  const labels = {
    tr: 'Türkçe',
    en: 'İngilizce',
    de: 'Almanca',
    fr: 'Fransızca',
    es: 'İspanyolca',
  };
  return labels[language] || language;
};

// Lifecycle
onMounted(() => {
  document.addEventListener('keydown', handleKeyPress);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyPress);
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup', endDrag);
  document.removeEventListener('touchmove', onDrag);
  document.removeEventListener('touchend', endDrag);
});

// Watch for word changes to reset meaning visibility
watch(currentIndex, () => {
  showMeaning.value = false;
});
</script>

<style scoped>
.card-exit-leave-active {
  transition: all 0.3s ease-out;
}

.card-exit-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.8);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
