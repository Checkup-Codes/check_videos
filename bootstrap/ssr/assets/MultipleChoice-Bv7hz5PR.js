import { computed, ref, onMounted, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import { _ as _export_sfc } from "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "vuex";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = {
  __name: "MultipleChoice",
  __ssrInlineRender: true,
  props: {
    gameType: String,
    packSlug: String,
    words: Array,
    gameConfig: Object
  },
  emits: ["game-completed"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const page = usePage();
    const allPacks = page.props.languagePacks || [];
    const hasUser = computed(() => {
      var _a;
      return !!((_a = page.props.auth) == null ? void 0 : _a.user);
    });
    computed(() => {
      if (!props.packSlug) return null;
      return allPacks.find((pack) => pack.slug === props.packSlug);
    });
    const gameState = ref({
      isLoading: true,
      isPlaying: false,
      currentQuestion: null,
      currentOptions: [],
      selectedAnswer: null,
      showAnswer: false,
      isCorrect: false,
      progress: 0,
      currentIndex: 0,
      totalQuestions: 0,
      userResponses: [],
      hintShown: false,
      currentHintIndex: 0
    });
    const words = ref([]);
    const wordsMap = computed(() => Object.fromEntries(words.value.map((word) => [word.id, word])));
    ref(null);
    ref(null);
    ref(null);
    ref(null);
    const isUpdating = ref(false);
    const startGameWithConfig = async () => {
      if (!props.words || props.words.length < 2) {
        alert("Oyunu başlatmak için en az 2 kelime gereklidir.");
        return;
      }
      gameState.value.isLoading = true;
      let gameWords = [...props.words];
      if (props.gameConfig.prioritizeUnlearned) {
        const unlearned = gameWords.filter((w) => w.learning_status === 0);
        const learning = gameWords.filter((w) => w.learning_status === 1);
        const learned = gameWords.filter((w) => w.learning_status === 2);
        gameWords = [...unlearned, ...learning, ...learned];
      }
      if (props.gameConfig.prioritizeRecentlyLearned) {
        gameWords.sort((a, b) => {
          const aDate = new Date(a.last_reviewed_at || 0);
          const bDate = new Date(b.last_reviewed_at || 0);
          return bDate - aDate;
        });
      }
      if (props.gameConfig.prioritizeFlagged) {
        gameWords.sort((a, b) => {
          if (a.is_flagged && !b.is_flagged) return -1;
          if (!a.is_flagged && b.is_flagged) return 1;
          return 0;
        });
      }
      if (props.gameConfig.prioritizeMostIncorrect) {
        gameWords.sort((a, b) => {
          const aIncorrect = a.incorrect_count || 0;
          const bIncorrect = b.incorrect_count || 0;
          return bIncorrect - aIncorrect;
        });
      }
      gameWords = gameWords.sort(() => Math.random() - 0.5);
      const questionCount = Math.min(props.gameConfig.questionCount, gameWords.length);
      gameWords = gameWords.slice(0, questionCount);
      gameState.value = {
        isLoading: false,
        isPlaying: true,
        currentQuestion: gameWords[0],
        currentOptions: [],
        selectedAnswer: null,
        showAnswer: false,
        isCorrect: false,
        progress: 0,
        currentIndex: 0,
        totalQuestions: gameWords.length,
        userResponses: [],
        hintShown: gameWords[0].example_sentences && gameWords[0].example_sentences.length > 0,
        // Otomatik ipucu göster
        currentHintIndex: 0
      };
      words.value = gameWords;
    };
    const calculateScore = computed(() => {
      if (!gameState.value.userResponses.length) return 0;
      const correctAnswers = gameState.value.userResponses.filter((response) => response.correct).length;
      return Math.round(correctAnswers / gameState.value.userResponses.length * 100);
    });
    const getWordType = (type) => {
      switch (type) {
        case "noun":
          return "İsim";
        case "verb":
          return "Fiil";
        case "adjective":
          return "Sıfat";
        case "adverb":
          return "Zarf";
        default:
          return "Bilinmiyor";
      }
    };
    const correctCount = computed(() => {
      return gameState.value.userResponses.filter((response) => response.correct).length;
    });
    const incorrectCount = computed(() => {
      return gameState.value.userResponses.filter((response) => !response.correct).length;
    });
    const shuffledOptions = computed(() => {
      if (!gameState.value.currentQuestion) return [];
      if (gameState.value.currentOptions.length === 0) {
        gameState.value.currentOptions = generateOptions(gameState.value.currentQuestion, words.value);
      }
      return gameState.value.currentOptions;
    });
    const getPrimaryMeaning = (word) => {
      if (!word) return "";
      if (word.meanings && word.meanings.length > 0) {
        const primaryMeaning = word.meanings.find((m) => m.is_primary);
        if (primaryMeaning) {
          return primaryMeaning.meaning;
        }
        return word.meanings[0].meaning;
      }
      return word.meaning || "";
    };
    const isCorrectAnswer = (option, question) => {
      if (!option || !question) return false;
      return option.wordId === question.id;
    };
    const isSelectedAnswer = (option) => {
      var _a;
      return ((_a = gameState.value.selectedAnswer) == null ? void 0 : _a.wordId) === option.wordId;
    };
    const getOptionClasses = (option, index) => {
      if (!gameState.value.showAnswer) {
        return "border-base-300 bg-base-100 text-base-content";
      }
      if (isCorrectAnswer(option, gameState.value.currentQuestion)) {
        return "border-green-500 bg-green-50 text-green-800";
      }
      if (isSelectedAnswer(option)) {
        return "border-red-500 bg-red-50 text-red-800";
      }
      return "border-base-300 bg-base-100 text-base-content";
    };
    const generateOptions = (currentQuestion, allWords, count = 4) => {
      const correctOption = {
        wordId: currentQuestion.id,
        meaningText: getPrimaryMeaning(currentQuestion),
        isCorrect: true
      };
      const filteredWords = allWords.filter(
        (w) => w.id !== currentQuestion.id && getPrimaryMeaning(w) !== getPrimaryMeaning(currentQuestion)
      );
      const shuffledWords = [...filteredWords].sort(() => 0.5 - Math.random());
      const selectedWords = shuffledWords.slice(0, count - 1);
      const incorrectOptions = selectedWords.map((word) => ({
        wordId: word.id,
        meaningText: getPrimaryMeaning(word),
        isCorrect: false
      }));
      return [...incorrectOptions, correctOption].sort(() => 0.5 - Math.random());
    };
    onMounted(() => {
      startGameWithConfig();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col items-center justify-center" }, _attrs))} data-v-a8783795>`);
      if (!gameState.value.isPlaying && gameState.value.userResponses.length > 0) {
        _push(`<div class="w-full max-w-2xl rounded-lg border border-base-300 bg-base-100 p-6" data-v-a8783795><div class="mb-4 text-center" data-v-a8783795><h2 class="mb-2 text-xl font-semibold text-base-content" data-v-a8783795>Test Tamamlandı</h2><div class="inline-flex items-center gap-2 rounded bg-base-200 px-3 py-1" data-v-a8783795><span class="text-base-content/70 text-sm" data-v-a8783795>Puan:</span><span class="text-lg font-bold text-base-content" data-v-a8783795>${ssrInterpolate(calculateScore.value)} / 100</span></div></div><div class="mb-4 grid grid-cols-2 gap-4" data-v-a8783795><div class="rounded border border-base-300 bg-base-200 p-3 text-center" data-v-a8783795><div class="mb-1" data-v-a8783795><div class="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-green-100" data-v-a8783795><span class="text-sm font-bold text-green-600" data-v-a8783795>${ssrInterpolate(correctCount.value)}</span></div></div><p class="text-base-content/70 text-xs" data-v-a8783795>Doğru</p></div><div class="rounded border border-base-300 bg-base-200 p-3 text-center" data-v-a8783795><div class="mb-1" data-v-a8783795><div class="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-red-100" data-v-a8783795><span class="text-sm font-bold text-red-600" data-v-a8783795>${ssrInterpolate(incorrectCount.value)}</span></div></div><p class="text-base-content/70 text-xs" data-v-a8783795>Yanlış</p></div></div><div class="mb-4" data-v-a8783795><h3 class="mb-2 text-sm font-medium text-base-content" data-v-a8783795>Cevaplarınız</h3><div class="max-h-48 space-y-2 overflow-y-auto" data-v-a8783795><!--[-->`);
        ssrRenderList(gameState.value.userResponses, (response) => {
          var _a;
          _push(`<div class="flex items-center justify-between rounded border border-base-300 bg-base-200 p-2" data-v-a8783795><div class="flex items-center gap-2" data-v-a8783795><div class="${ssrRenderClass([response.correct ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600", "flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold"])}" data-v-a8783795>${ssrInterpolate(response.correct ? "✓" : "✗")}</div><div class="flex flex-col" data-v-a8783795><span class="text-sm font-medium text-base-content" data-v-a8783795>${ssrInterpolate(((_a = wordsMap.value[response.word_id]) == null ? void 0 : _a.word) || "Unknown")}</span><span class="text-base-content/70 text-xs" data-v-a8783795>${ssrInterpolate(getPrimaryMeaning(wordsMap.value[response.word_id]))}</span></div></div><span class="${ssrRenderClass([response.correct ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800", "inline-flex items-center rounded px-2 py-1 text-xs font-medium"])}" data-v-a8783795>${ssrInterpolate(response.correct ? "Doğru" : "Yanlış")}</span></div>`);
        });
        _push(`<!--]--></div></div><div class="space-y-2" data-v-a8783795>`);
        if (hasUser.value) {
          _push(`<button class="w-full rounded border border-base-300 bg-base-content px-4 py-2 text-center text-sm font-medium text-base-100 transition hover:bg-base-300 hover:text-base-content"${ssrIncludeBooleanAttr(isUpdating.value) ? " disabled" : ""} data-v-a8783795>${ssrInterpolate(isUpdating.value ? "Güncelleniyor..." : "İstatistikleri Güncelle")}</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex gap-2" data-v-a8783795><button class="flex-1 rounded border border-base-300 bg-base-content px-4 py-2 text-center text-sm font-medium text-base-100 transition hover:bg-base-300 hover:text-base-content" data-v-a8783795> Pakete Dön </button><button class="flex-1 rounded border border-base-300 px-4 py-2 text-sm font-medium text-base-content transition hover:bg-base-200" data-v-a8783795> Tekrar Başla </button></div></div></div>`);
      } else {
        _push(`<div class="w-full max-w-4xl rounded-lg border border-base-300 bg-base-100 p-6" data-v-a8783795><div class="mb-4 h-1 w-full overflow-hidden rounded-full bg-base-200" data-v-a8783795><div class="h-full w-0 bg-base-content transition-all duration-500" data-v-a8783795></div></div><div class="mb-6 text-right" data-v-a8783795><span class="text-base-content/70 text-sm" data-v-a8783795> Soru ${ssrInterpolate(gameState.value.currentIndex + 1)} / ${ssrInterpolate(gameState.value.totalQuestions)}</span></div>`);
        if (gameState.value.currentQuestion) {
          _push(`<div class="space-y-4" data-v-a8783795><div data-v-a8783795><h2 class="mb-2 text-2xl font-semibold text-base-content" data-v-a8783795>&quot;${ssrInterpolate(gameState.value.currentQuestion.word)}&quot;</h2><p class="text-base-content/70 mb-3" data-v-a8783795>Bu kelimenin anlamı nedir?</p><span class="inline-flex items-center rounded border border-base-300 bg-base-200 px-2 py-1 text-xs text-base-content" data-v-a8783795>${ssrInterpolate(getWordType(gameState.value.currentQuestion.type))}</span></div>`);
          if (gameState.value.currentQuestion.example_sentences && gameState.value.currentQuestion.example_sentences.length > 0) {
            _push(`<div class="rounded border border-base-300 bg-base-200 p-3" data-v-a8783795><div class="mb-2 flex items-center justify-between" data-v-a8783795><p class="text-sm font-medium text-base-content" data-v-a8783795>Örnek Cümle</p>`);
            if (gameState.value.currentQuestion.example_sentences.length > 1) {
              _push(`<button class="text-base-content/70 text-xs transition-colors hover:text-base-content" data-v-a8783795> Sonraki (${ssrInterpolate(gameState.value.currentHintIndex + 1)}/${ssrInterpolate(gameState.value.currentQuestion.example_sentences.length)}) </button>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div><p class="text-sm text-base-content" data-v-a8783795>${ssrInterpolate(gameState.value.currentQuestion.example_sentences[gameState.value.currentHintIndex].sentence)}</p></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="space-y-2" data-v-a8783795><!--[-->`);
          ssrRenderList(shuffledOptions.value, (option, index) => {
            _push(`<button${ssrIncludeBooleanAttr(gameState.value.showAnswer) ? " disabled" : ""} class="${ssrRenderClass([getOptionClasses(option), "w-full rounded border border-base-300 bg-base-100 p-3 text-left text-base text-base-content transition-all duration-200 hover:bg-base-200 disabled:cursor-not-allowed"])}" data-v-a8783795><div class="flex items-center gap-3" data-v-a8783795><span class="flex h-6 w-6 items-center justify-center rounded-full bg-base-content text-xs font-bold text-base-100" data-v-a8783795>${ssrInterpolate(String.fromCharCode(65 + index))}</span> ${ssrInterpolate(option.meaningText)}</div></button>`);
          });
          _push(`<!--]--></div>`);
          if (gameState.value.showAnswer) {
            _push(`<div class="text-center" data-v-a8783795><p class="${ssrRenderClass([gameState.value.isCorrect ? "text-green-600" : "text-red-600", "text-lg font-medium"])}" data-v-a8783795>${ssrInterpolate(gameState.value.isCorrect ? "Doğru!" : "Yanlış!")}</p></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Rendition/_components/MultipleChoice.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const MultipleChoice = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a8783795"]]);
export {
  MultipleChoice as default
};
