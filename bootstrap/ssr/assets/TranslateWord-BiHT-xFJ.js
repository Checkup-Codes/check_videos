import { computed, ref, onMounted, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { usePage, router } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "TranslateWord",
  __ssrInlineRender: true,
  props: {
    gameType: String,
    packSlug: String,
    words: Array
  },
  setup(__props) {
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
      userInput: "",
      showFeedback: false,
      isCorrect: null,
      currentIndex: 0,
      totalQuestions: 0,
      userResponses: []
    });
    const words = ref([]);
    const wordsMap = computed(() => Object.fromEntries(words.value.map((word) => [word.id, word])));
    const startGame = async () => {
      if (!props.words || props.words.length < 5) {
        alert("Oyunu başlatmak için en az 5 kelime gereklidir.");
        return;
      }
      gameState.value.isLoading = true;
      await new Promise((resolve) => {
        words.value = [...props.words].sort(() => Math.random() - 0.5);
        gameState.value.totalQuestions = words.value.length;
        gameState.value.currentIndex = 0;
        gameState.value.userResponses = [];
        resolve();
      });
      gameState.value.isLoading = false;
      gameState.value.isPlaying = true;
      loadNextQuestion();
    };
    const loadNextQuestion = () => {
      if (gameState.value.currentIndex >= words.value.length) {
        endGame();
        return;
      }
      gameState.value.currentQuestion = words.value[gameState.value.currentIndex];
      gameState.value.userInput = "";
      gameState.value.showFeedback = false;
      gameState.value.isCorrect = null;
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
    const feedbackMessage = computed(() => {
      if (!gameState.value.currentQuestion) return "";
      return gameState.value.isCorrect ? "Correct!" : `Wrong! The correct translation is: ${gameState.value.currentQuestion.meaning}`;
    });
    const questionCounter = computed(() => {
      if (!gameState.value.totalQuestions) return "0/0";
      return `${gameState.value.currentIndex + 1}/${gameState.value.totalQuestions}`;
    });
    computed(() => words.value.length && gameState.value.currentIndex === words.value.length - 1);
    onMounted(() => {
      startGame();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen flex-col items-center justify-center" }, _attrs))}>`);
      if (!gameState.value.isPlaying) {
        _push(`<div class="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"><h2 class="mb-2 text-2xl font-semibold text-gray-900">Quiz Completed!</h2><p class="mb-4 text-gray-600">You have finished the quiz. Here&#39;s how you did:</p><ul class="space-y-2 text-left text-sm text-gray-800"><!--[-->`);
        ssrRenderList(gameState.value.userResponses, (response) => {
          var _a, _b;
          _push(`<li class="flex justify-between rounded-md bg-gray-50 px-4 py-2"><span class="${ssrRenderClass(response.correct ? "text-green-600" : "text-red-600")}">${ssrInterpolate(((_a = wordsMap.value[response.word_id]) == null ? void 0 : _a.word) || "Unknown")}</span><span>${ssrInterpolate(response.correct ? "✓" : "✗")} `);
          if (!response.correct) {
            _push(`<span class="ml-2 text-xs text-gray-500"> (Correct: ${ssrInterpolate(((_b = wordsMap.value[response.word_id]) == null ? void 0 : _b.meaning) || "Unknown")}) </span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</span></li>`);
        });
        _push(`<!--]--></ul><button class="mt-6 w-full rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700"> Restart Quiz </button></div>`);
      } else {
        _push(`<div class="relative w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">`);
        if (words.value.length) {
          _push(`<span class="absolute right-4 top-3 text-xs text-gray-400">${ssrInterpolate(questionCounter.value)}</span>`);
        } else {
          _push(`<!---->`);
        }
        if (gameState.value.currentQuestion) {
          _push(`<h2 class="mb-4 text-xl font-semibold text-gray-900"> What is the meaning of &quot;${ssrInterpolate(gameState.value.currentQuestion.word)}&quot;? </h2>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<input${ssrRenderAttr("value", gameState.value.userInput)}${ssrIncludeBooleanAttr(gameState.value.showFeedback) ? " disabled" : ""} type="text" placeholder="Enter the translation" class="w-full rounded-lg border border-gray-300 p-3 text-base text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100">`);
        if (gameState.value.showFeedback) {
          _push(`<p class="${ssrRenderClass([gameState.value.isCorrect ? "text-green-600" : "text-red-600", "mt-4 text-sm font-medium"])}">${ssrInterpolate(feedbackMessage.value)}</p>`);
        } else {
          _push(`<!---->`);
        }
        if (!gameState.value.showFeedback) {
          _push(`<button class="mt-6 w-full rounded-lg bg-black px-4 py-2 text-sm font-medium text-white shadow-md transition hover:bg-gray-700"> Submit Answer </button>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Rendition/_components/TranslateWord.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
