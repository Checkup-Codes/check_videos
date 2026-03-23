import { ref, computed, onMounted, onUnmounted, watch, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderStyle, ssrRenderList } from "vue/server-renderer";
import { router } from "@inertiajs/vue3";
import { _ as _export_sfc } from "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "vuex";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = {
  __name: "SwipeCards",
  __ssrInlineRender: true,
  props: {
    words: {
      type: Array,
      required: true
    },
    gameConfig: {
      type: Object,
      default: () => ({})
    },
    packSlug: {
      type: String,
      required: true
    }
  },
  emits: ["game-completed"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const currentIndex = ref(0);
    const stats = ref({
      correct: 0,
      incorrect: 0
    });
    const showMeaning = ref(false);
    const hasStartedSwiping = ref(false);
    const isDragging = ref(false);
    const dragX = ref(0);
    const dragY = ref(0);
    const startX = ref(0);
    const startY = ref(0);
    ref(null);
    const results = ref([]);
    const currentWord = computed(() => props.words[currentIndex.value]);
    const totalQuestions = computed(() => props.words.length);
    const progress = computed(() => (currentIndex.value / totalQuestions.value * 100).toFixed(0));
    const cardTransform = computed(() => {
      if (isDragging.value) {
        const rotate = dragX.value / 20;
        return `translate(-50%, -50%) translateX(${dragX.value}px) translateY(${dragY.value}px) rotate(${rotate}deg)`;
      }
      return "translate(-50%, -50%)";
    });
    const onDrag = (e) => {
      if (!isDragging.value) return;
      const clientX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
      const clientY = e.type === "touchmove" ? e.touches[0].clientY : e.clientY;
      dragX.value = clientX - startX.value;
      dragY.value = clientY - startY.value;
    };
    const endDrag = () => {
      if (!isDragging.value) return;
      isDragging.value = false;
      if (Math.abs(dragX.value) > 100) {
        if (dragX.value > 0) {
          handleAnswer(true);
        } else {
          handleAnswer(false);
        }
      }
      dragX.value = 0;
      dragY.value = 0;
      document.removeEventListener("mousemove", onDrag);
      document.removeEventListener("mouseup", endDrag);
      document.removeEventListener("touchmove", onDrag);
      document.removeEventListener("touchend", endDrag);
    };
    const swipeRight = () => {
      hasStartedSwiping.value = true;
      dragX.value = 400;
      setTimeout(() => {
        handleAnswer(true);
        dragX.value = 0;
      }, 300);
    };
    const swipeLeft = () => {
      hasStartedSwiping.value = true;
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
      results.value.push({
        word_id: currentWord.value.id,
        is_correct: isCorrect,
        review_count: 1,
        incorrect_count: isCorrect ? 0 : 1
      });
      if (isCorrect) {
        stats.value.correct++;
      } else {
        stats.value.incorrect++;
      }
      showMeaning.value = false;
      currentIndex.value++;
      if (currentIndex.value >= totalQuestions.value) {
        completeGame();
      }
    };
    const completeGame = () => {
      router.post(
        route("rendition.words.update-words"),
        {
          words: results.value
        },
        {
          preserveState: true,
          preserveScroll: true,
          onSuccess: () => {
            emit("game-completed", {
              totalQuestions: totalQuestions.value,
              correctAnswers: stats.value.correct,
              incorrectAnswers: stats.value.incorrect,
              results: results.value
            });
          }
        }
      );
    };
    const handleKeyPress = (e) => {
      if (!currentWord.value) return;
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          swipeLeft();
          break;
        case "ArrowRight":
          e.preventDefault();
          swipeRight();
          break;
        case " ":
          e.preventDefault();
          toggleMeaning();
          break;
      }
    };
    const getWordTypeLabel = (type) => {
      const labels = {
        noun: "İsim",
        verb: "Fiil",
        adjective: "Sıfat",
        adverb: "Zarf"
      };
      return labels[type] || type;
    };
    onMounted(() => {
      document.addEventListener("keydown", handleKeyPress);
    });
    onUnmounted(() => {
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("mousemove", onDrag);
      document.removeEventListener("mouseup", endDrag);
      document.removeEventListener("touchmove", onDrag);
      document.removeEventListener("touchend", endDrag);
    });
    watch(currentIndex, () => {
      showMeaning.value = false;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex h-full w-full max-w-2xl flex-col justify-center px-4" }, _attrs))} data-v-be309836><div class="mb-4 space-y-2" data-v-be309836><div class="flex items-center justify-between" data-v-be309836><div class="flex items-center gap-4" data-v-be309836><span class="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-2.5 py-1 text-xs font-medium text-green-600 dark:text-green-400" data-v-be309836><svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20" data-v-be309836><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" data-v-be309836></path></svg> ${ssrInterpolate(stats.value.correct)}</span><span class="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-600 dark:text-red-400" data-v-be309836><svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20" data-v-be309836><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" data-v-be309836></path></svg> ${ssrInterpolate(stats.value.incorrect)}</span></div><span class="text-xs font-medium text-muted-foreground" data-v-be309836>${ssrInterpolate(currentIndex.value + 1)} / ${ssrInterpolate(totalQuestions.value)}</span></div><div class="relative h-1 w-full overflow-hidden rounded-full bg-muted/50" data-v-be309836><div class="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary via-primary to-primary/80 transition-all duration-500 ease-out" style="${ssrRenderStyle({ width: `${progress.value}%` })}" data-v-be309836></div></div></div>`);
      if (currentIndex.value === 0 && !hasStartedSwiping.value) {
        _push(`<div class="mb-3 rounded-xl border border-border/50 bg-muted/30 px-4 py-2.5 backdrop-blur-sm" data-v-be309836><div class="flex items-center justify-center gap-3 text-xs" data-v-be309836><div class="flex items-center gap-1.5" data-v-be309836><div class="flex h-5 w-5 items-center justify-center rounded-full bg-green-500/10" data-v-be309836><svg class="h-3 w-3 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-be309836><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" data-v-be309836></path></svg></div><span class="font-medium text-foreground" data-v-be309836>Biliyorum</span></div><span class="text-muted-foreground" data-v-be309836>•</span><div class="flex items-center gap-1.5" data-v-be309836><div class="flex h-5 w-5 items-center justify-center rounded-full bg-red-500/10" data-v-be309836><svg class="h-3 w-3 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-be309836><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" data-v-be309836></path></svg></div><span class="font-medium text-foreground" data-v-be309836>Bilmiyorum</span></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="relative" style="${ssrRenderStyle({ "width": "500px", "height": "450px", "max-width": "90vw" })}" data-v-be309836><!--[-->`);
      ssrRenderList(2, (i) => {
        _push(`<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm" style="${ssrRenderStyle([{ "width": "500px", "height": "450px", "max-width": "90vw" }, {
          transform: `translate(-50%, -50%) scale(${1 - i * 0.04}) translateY(${i * 6}px)`,
          opacity: 0.4 - i * 0.1,
          zIndex: 10 - i
        }])}" data-v-be309836></div>`);
      });
      _push(`<!--]-->`);
      if (currentWord.value) {
        _push(`<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-3xl border border-border bg-card shadow-2xl active:cursor-grabbing overflow-y-auto" style="${ssrRenderStyle([{ "width": "500px", "height": "450px", "max-width": "90vw" }, {
          transform: cardTransform.value,
          transition: isDragging.value ? "none" : "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          zIndex: 20
        }])}" data-v-be309836><div class="pointer-events-none absolute inset-0 flex items-center justify-center rounded-3xl transition-opacity duration-200" style="${ssrRenderStyle({ opacity: Math.abs(dragX.value) > 50 ? Math.min(Math.abs(dragX.value) / 150, 1) : 0 })}" data-v-be309836>`);
        if (dragX.value > 50) {
          _push(`<div class="absolute right-6 top-6 rounded-2xl bg-green-500 p-3 shadow-xl" data-v-be309836><svg class="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-be309836><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" data-v-be309836></path></svg></div>`);
        } else if (dragX.value < -50) {
          _push(`<div class="absolute left-6 top-6 rounded-2xl bg-red-500 p-3 shadow-xl" data-v-be309836><svg class="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-be309836><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12" data-v-be309836></path></svg></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="flex h-full flex-col p-6" data-v-be309836><div class="mb-4 text-center" data-v-be309836><h2 class="mb-2 text-3xl font-bold tracking-tight text-foreground" data-v-be309836>${ssrInterpolate(currentWord.value.word)}</h2><span class="inline-flex items-center rounded-full border border-border/50 bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground" data-v-be309836>${ssrInterpolate(getWordTypeLabel(currentWord.value.type))}</span></div><div class="flex-1" data-v-be309836>`);
        if (showMeaning.value) {
          _push(`<div class="space-y-3" data-v-be309836><div class="rounded-2xl border border-border/50 bg-muted/30 p-4" data-v-be309836><div class="space-y-2" data-v-be309836><!--[-->`);
          ssrRenderList(currentWord.value.meanings.slice(0, 2), (meaning, index) => {
            _push(`<div class="flex items-start gap-2" data-v-be309836><span class="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary" data-v-be309836>${ssrInterpolate(index + 1)}</span><span class="text-sm leading-relaxed text-foreground" data-v-be309836>${ssrInterpolate(meaning.meaning)}</span></div>`);
          });
          _push(`<!--]--></div></div>`);
          if (currentWord.value.example_sentences && currentWord.value.example_sentences.length > 0) {
            _push(`<div class="rounded-2xl border border-border/50 bg-muted/30 p-4" data-v-be309836><p class="text-sm leading-relaxed text-foreground" data-v-be309836>${ssrInterpolate(currentWord.value.example_sentences[0].sentence)}</p>`);
            if (currentWord.value.example_sentences[0].translation) {
              _push(`<p class="mt-2 text-xs text-muted-foreground" data-v-be309836>${ssrInterpolate(currentWord.value.example_sentences[0].translation)}</p>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<div class="flex h-full items-center justify-center" data-v-be309836><div class="text-center" data-v-be309836><div class="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/50" data-v-be309836><svg class="h-8 w-8 text-muted-foreground/50" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-be309836><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-be309836></path></svg></div><p class="text-sm font-medium text-muted-foreground" data-v-be309836>Biliyor musun?</p></div></div>`);
        }
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!currentWord.value && currentIndex.value >= totalQuestions.value) {
        _push(`<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center" style="${ssrRenderStyle({ "width": "500px", "max-width": "90vw" })}" data-v-be309836><div class="rounded-3xl border border-border bg-card p-8 shadow-2xl" data-v-be309836><div class="mb-4 flex justify-center" data-v-be309836><div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10" data-v-be309836><svg class="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-be309836><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-v-be309836></path></svg></div></div><h3 class="mb-2 text-xl font-bold text-foreground" data-v-be309836>Tebrikler!</h3><p class="text-sm text-muted-foreground" data-v-be309836>Tüm kelimeleri tamamladın</p></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (currentWord.value) {
        _push(`<div class="mt-4 flex items-center justify-center gap-4" data-v-be309836><button class="group flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-red-500/20 bg-red-500/5 transition-all hover:scale-105 hover:border-red-500/30 hover:bg-red-500/10 hover:shadow-lg hover:shadow-red-500/20 active:scale-95" data-v-be309836><svg class="h-6 w-6 text-red-600 dark:text-red-400 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-be309836><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" data-v-be309836></path></svg></button><button class="group flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-border bg-card transition-all hover:scale-105 hover:border-primary/30 hover:bg-primary/5 hover:shadow-lg active:scale-95" data-v-be309836><svg class="h-5 w-5 text-foreground transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-be309836><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-be309836></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-be309836></path></svg></button><button class="group flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-green-500/20 bg-green-500/5 transition-all hover:scale-105 hover:border-green-500/30 hover:bg-green-500/10 hover:shadow-lg hover:shadow-green-500/20 active:scale-95" data-v-be309836><svg class="h-6 w-6 text-green-600 dark:text-green-400 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-be309836><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" data-v-be309836></path></svg></button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mt-3 flex items-center justify-center gap-2 text-[10px] text-muted-foreground" data-v-be309836><kbd class="inline-flex h-5 min-w-[20px] items-center justify-center rounded border border-border bg-muted px-1.5 font-mono font-medium" data-v-be309836>←</kbd><span data-v-be309836>•</span><kbd class="inline-flex h-5 items-center justify-center rounded border border-border bg-muted px-1.5 font-mono font-medium" data-v-be309836>Space</kbd><span data-v-be309836>•</span><kbd class="inline-flex h-5 min-w-[20px] items-center justify-center rounded border border-border bg-muted px-1.5 font-mono font-medium" data-v-be309836>→</kbd></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Rendition/Words/Show/Games/SwipeCards.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const SwipeCards = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-be309836"]]);
export {
  SwipeCards as default
};
