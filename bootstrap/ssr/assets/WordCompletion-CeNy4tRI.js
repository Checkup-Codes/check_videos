import { computed, ref, onMounted, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderStyle, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { usePage, router } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "WordCompletion",
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
    computed(() => {
      if (!props.packSlug) return null;
      return allPacks.find((pack) => pack.slug === props.packSlug);
    });
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
      currentHintIndex: 0
    });
    const words = ref([]);
    const wordsMap = computed(() => Object.fromEntries(words.value.map((word) => [word.id, word])));
    const isAnswerComplete = computed(() => {
      return gameState.value.maskedIndices.length === gameState.value.selectedLetters.length;
    });
    const startGameWithConfig = async () => {
      if (!props.words || props.words.length < 2) {
        alert("Oyunu başlatmak için en az 2 kelime gereklidir.");
        return;
      }
      gameState.value.isLoading = true;
      let gameWords = [...props.words];
      gameWords.sort(() => Math.random() - 0.5);
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
    const calculateScore = computed(() => {
      if (!gameState.value.userResponses.length) return 0;
      const correctAnswers = gameState.value.userResponses.filter((response) => response.correct).length;
      return Math.round(correctAnswers / gameState.value.userResponses.length * 100);
    });
    const getAlphabet = () => {
      return "ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ".split("");
    };
    const correctCount = computed(() => {
      return gameState.value.userResponses.filter((response) => response.correct).length;
    });
    const incorrectCount = computed(() => {
      return gameState.value.userResponses.filter((response) => !response.correct).length;
    });
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
      createMaskedIndices();
    };
    const createMaskedIndices = () => {
      const word = gameState.value.currentQuestion.word;
      const wordLength = word.length;
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
        10: 4
      };
      const defaultMaskCount = Math.min(4, Math.floor(wordLength / 2));
      const maskCount = maskCountMap[wordLength] || defaultMaskCount;
      const indices = /* @__PURE__ */ new Set();
      while (indices.size < maskCount) {
        const randomIndex = Math.floor(Math.random() * wordLength);
        indices.add(randomIndex);
      }
      gameState.value.maskedIndices = Array.from(indices).sort((a, b) => a - b);
    };
    const endGame = () => {
      gameState.value.isPlaying = false;
      updateWordStats();
    };
    const updateWordStats = () => {
      if (!gameState.value.userResponses.length) return;
      const updateData = gameState.value.userResponses.map((response) => ({
        word_id: response.word_id,
        review_count: 1,
        incorrect_count: response.correct ? 0 : 1
      }));
      router.post(
        "/update-words",
        { words: updateData },
        {
          preserveState: true,
          onSuccess: () => console.log("Words updated successfully"),
          onError: (error) => console.error("Failed to update word stats", error)
        }
      );
    };
    onMounted(() => {
      startGameWithConfig();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen flex-col items-center justify-center" }, _attrs))}>`);
      if (!gameState.value.isPlaying && gameState.value.userResponses.length > 0) {
        _push(`<div class="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"><h2 class="mb-2 text-2xl font-semibold text-gray-900">Test Özeti</h2><div class="mb-4 text-center"><p class="text-4xl font-bold text-gray-900">${ssrInterpolate(calculateScore.value)} / 100</p><p class="text-sm text-gray-600">Puan</p></div><div class="mb-4 grid grid-cols-2 gap-4 rounded-lg bg-gray-50 p-4"><div class="text-center"><p class="text-2xl font-bold text-green-600">${ssrInterpolate(correctCount.value)}</p><p class="text-sm text-gray-600">Doğru</p></div><div class="text-center"><p class="text-2xl font-bold text-red-600">${ssrInterpolate(incorrectCount.value)}</p><p class="text-sm text-gray-600">Yanlış</p></div></div><div class="mb-4 max-h-60 overflow-y-auto"><h3 class="mb-2 font-medium text-gray-700">Cevaplarınız:</h3><ul class="space-y-2 text-left text-sm text-gray-800"><!--[-->`);
        ssrRenderList(gameState.value.userResponses, (response) => {
          var _a, _b;
          _push(`<li class="flex items-center justify-between rounded-md bg-gray-50 px-4 py-2"><div class="flex flex-col"><span class="${ssrRenderClass(response.correct ? "font-medium text-green-600" : "font-medium text-red-600")}">${ssrInterpolate(((_a = wordsMap.value[response.word_id]) == null ? void 0 : _a.word) || "Unknown")}</span><span class="text-xs text-gray-500">${ssrInterpolate(((_b = wordsMap.value[response.word_id]) == null ? void 0 : _b.meaning) || "")}</span></div><span class="${ssrRenderClass(response.correct ? "text-lg text-green-600" : "text-lg text-red-600")}">${ssrInterpolate(response.correct ? "✓" : "✗")}</span></li>`);
        });
        _push(`<!--]--></ul></div><div class="flex gap-2"><button class="flex-1 rounded-lg bg-black px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-gray-700"> Pakete Dön </button><button class="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"> Tekrar Başla </button></div></div>`);
      } else {
        _push(`<div class="${ssrRenderClass([{
          "bg-white": !gameState.value.showAnswer,
          "bg-green-50": gameState.value.showAnswer && gameState.value.isCorrect,
          "bg-red-50": gameState.value.showAnswer && !gameState.value.isCorrect
        }, "relative w-full max-w-md rounded-2xl border border-gray-200 p-6 shadow-sm transition-colors duration-500"])}"><div class="mb-4 h-1 w-full overflow-hidden rounded-full bg-gray-200"><div class="duration-2000 h-full bg-black transition-all" style="${ssrRenderStyle({ width: `${gameState.value.progress}%` })}"></div></div><div class="mb-4 text-right text-sm text-gray-500"> Soru ${ssrInterpolate(gameState.value.currentIndex + 1)} / ${ssrInterpolate(gameState.value.totalQuestions)}</div>`);
        if (gameState.value.currentQuestion) {
          _push(`<div class="space-y-4"><div><div class="flex items-center justify-between"><h2 class="text-xl font-semibold text-gray-900">Eksik harfleri tamamlayın:</h2></div><p class="mt-1 text-sm text-gray-500">Anlam: ${ssrInterpolate(gameState.value.currentQuestion.meaning)}</p></div><div class="flex justify-center space-x-2"><!--[-->`);
          ssrRenderList(gameState.value.currentQuestion.word, (char, index) => {
            var _a, _b;
            _push(`<div class="${ssrRenderClass([{
              "border-gray-200 bg-gray-50": gameState.value.maskedIndices.includes(index),
              "border-gray-300 bg-white": !gameState.value.maskedIndices.includes(index),
              "text-red-600": gameState.value.showAnswer && !gameState.value.isCorrect && gameState.value.maskedIndices.includes(index) && ((_a = gameState.value.selectedLetters[gameState.value.maskedIndices.indexOf(index)]) == null ? void 0 : _a.toLowerCase()) !== char.toLowerCase(),
              "text-green-600": gameState.value.showAnswer && gameState.value.maskedIndices.includes(index) && ((_b = gameState.value.selectedLetters[gameState.value.maskedIndices.indexOf(index)]) == null ? void 0 : _b.toLowerCase()) === char.toLowerCase()
            }, "flex h-12 w-12 items-center justify-center rounded-lg border-2 text-xl font-bold"])}">`);
            if (gameState.value.maskedIndices.includes(index)) {
              _push(`<!--[-->`);
              if (gameState.value.selectedLetters[gameState.value.maskedIndices.indexOf(index)]) {
                _push(`<span>${ssrInterpolate(gameState.value.selectedLetters[gameState.value.maskedIndices.indexOf(index)])}</span>`);
              } else {
                _push(`<span>_</span>`);
              }
              _push(`<!--]-->`);
            } else {
              _push(`<span>${ssrInterpolate(char)}</span>`);
            }
            _push(`</div>`);
          });
          _push(`<!--]--></div>`);
          if (gameState.value.showAnswer && !gameState.value.isCorrect) {
            _push(`<div class="mt-4 rounded-lg bg-yellow-50 p-4"><p class="text-sm text-yellow-800"> Doğru cevap: <span class="font-bold">${ssrInterpolate(gameState.value.currentQuestion.word)}</span></p></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="grid grid-cols-7 gap-2"><!--[-->`);
          ssrRenderList(getAlphabet(), (char) => {
            _push(`<button${ssrIncludeBooleanAttr(gameState.value.showAnswer || gameState.value.selectedLetters.includes(char)) ? " disabled" : ""} class="h-10 w-10 rounded-lg border border-gray-200 text-center text-lg font-medium transition hover:bg-gray-50 disabled:opacity-50">${ssrInterpolate(char)}</button>`);
          });
          _push(`<!--]--><button${ssrIncludeBooleanAttr(gameState.value.showAnswer || gameState.value.selectedLetters.includes(" ")) ? " disabled" : ""} class="h-10 w-10 rounded-lg border border-gray-200 text-center text-lg font-medium transition hover:bg-gray-50 disabled:opacity-50"> ␣ </button></div><button class="w-full rounded-lg border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-700 transition hover:bg-gray-100"> Seçilen Harfleri Temizle </button><button${ssrIncludeBooleanAttr(gameState.value.showAnswer || !isAnswerComplete.value) ? " disabled" : ""} class="w-full rounded-lg bg-black px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-gray-700 disabled:opacity-50"> Kontrol Et </button></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Rendition/_components/WordCompletion.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
