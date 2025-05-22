import { computed, ref, onMounted, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderStyle, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
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
      } else {
        gameWords = gameWords.sort(() => 0.5 - Math.random());
      }
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
        hintShown: false,
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
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen flex-col items-center justify-center" }, _attrs))}>`);
      if (!gameState.value.isPlaying && gameState.value.userResponses.length > 0) {
        _push(`<div class="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"><h2 class="mb-2 text-2xl font-semibold text-gray-900">Test Özeti</h2><div class="mb-4 text-center"><p class="text-4xl font-bold text-gray-900">${ssrInterpolate(calculateScore.value)} / 100</p><p class="text-sm text-gray-600">Puan</p></div><div class="mb-4 grid grid-cols-2 gap-4 rounded-lg bg-gray-50 p-4"><div class="text-center"><p class="text-2xl font-bold text-green-600">${ssrInterpolate(correctCount.value)}</p><p class="text-sm text-gray-600">Doğru</p></div><div class="text-center"><p class="text-2xl font-bold text-red-600">${ssrInterpolate(incorrectCount.value)}</p><p class="text-sm text-gray-600">Yanlış</p></div></div><div class="mb-4 max-h-60 overflow-y-auto"><h3 class="mb-2 font-medium text-gray-700">Cevaplarınız:</h3><ul class="space-y-2 text-left text-sm text-gray-800"><!--[-->`);
        ssrRenderList(gameState.value.userResponses, (response) => {
          var _a2;
          _push(`<li class="flex items-center justify-between rounded-md bg-gray-50 px-4 py-2"><div class="flex flex-col"><span class="${ssrRenderClass(response.correct ? "font-medium text-green-600" : "font-medium text-red-600")}">${ssrInterpolate(((_a2 = wordsMap.value[response.word_id]) == null ? void 0 : _a2.word) || "Unknown")}</span><span class="text-xs text-gray-500">${ssrInterpolate(getPrimaryMeaning(wordsMap.value[response.word_id]))}</span></div><span class="${ssrRenderClass(response.correct ? "text-lg text-green-600" : "text-lg text-red-600")}">${ssrInterpolate(response.correct ? "✓" : "✗")}</span></li>`);
        });
        _push(`<!--]--></ul></div><div class="flex gap-2"><button class="flex-1 rounded-lg bg-black px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-gray-700"> Pakete Dön </button><button class="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"> Tekrar Başla </button></div></div>`);
      } else {
        _push(`<div class="${ssrRenderClass([{
          "bg-white": !gameState.value.showAnswer,
          "bg-green-50": gameState.value.showAnswer && gameState.value.isCorrect,
          "bg-red-50": gameState.value.showAnswer && !gameState.value.isCorrect
        }, "relative w-full max-w-md rounded-2xl border border-gray-200 p-6 shadow-sm transition-colors duration-500"])}"><div class="mb-4 h-1 w-full overflow-hidden rounded-full bg-gray-200"><div class="duration-2000 h-full bg-black transition-all" style="${ssrRenderStyle({ width: `${gameState.value.progress}%` })}"></div></div><div class="mb-4 text-right text-sm text-gray-500"> Soru ${ssrInterpolate(gameState.value.currentIndex + 1)} / ${ssrInterpolate(gameState.value.totalQuestions)}</div>`);
        if (gameState.value.currentQuestion) {
          _push(`<div class="space-y-4"><div><div class="flex items-center justify-between"><h2 class="text-xl font-semibold text-gray-900"> &quot;${ssrInterpolate(gameState.value.currentQuestion.word)}&quot; kelimesinin anlamı nedir? </h2>`);
          if (!gameState.value.showAnswer) {
            _push(`<button class="rounded-lg border border-gray-200 px-3 py-1 text-sm text-gray-600 hover:bg-gray-50"${ssrIncludeBooleanAttr(
              gameState.value.hintShown && (!gameState.value.currentQuestion.example_sentences || gameState.value.currentQuestion.example_sentences.length <= 1)
            ) ? " disabled" : ""}>${ssrInterpolate(gameState.value.hintShown ? `İpucu (${gameState.value.currentHintIndex + 1}/${((_a = gameState.value.currentQuestion.example_sentences) == null ? void 0 : _a.length) || 0})` : "İpucu Göster")}</button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><p class="mt-1 text-sm text-gray-500">Kelime Türü: ${ssrInterpolate(getWordType(gameState.value.currentQuestion.type))}</p></div>`);
          if (gameState.value.hintShown) {
            _push(`<div class="rounded-lg bg-blue-50 p-3"><p class="text-sm text-blue-600">Örnek Cümle:</p>`);
            if (gameState.value.currentQuestion.example_sentences && gameState.value.currentQuestion.example_sentences.length > 0) {
              _push(`<p class="mt-1 text-sm text-gray-700">${ssrInterpolate(gameState.value.currentQuestion.example_sentences[gameState.value.currentHintIndex].sentence)}</p>`);
            } else {
              _push(`<p class="mt-1 text-sm text-gray-700">Bu kelime için örnek cümle bulunmuyor.</p>`);
            }
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="space-y-2"><!--[-->`);
          ssrRenderList(shuffledOptions.value, (option, index) => {
            _push(`<button${ssrIncludeBooleanAttr(gameState.value.showAnswer) ? " disabled" : ""} class="${ssrRenderClass([{
              "border-green-500 bg-green-50": gameState.value.showAnswer && isCorrectAnswer(option, gameState.value.currentQuestion),
              "border-red-500 bg-red-50": gameState.value.showAnswer && !isCorrectAnswer(option, gameState.value.currentQuestion) && isSelectedAnswer(option)
            }, "w-full rounded-lg border border-gray-200 p-3 text-left text-base text-gray-900 transition hover:bg-gray-50 disabled:cursor-not-allowed"])}">${ssrInterpolate(option.meaningText)}</button>`);
          });
          _push(`<!--]--></div></div>`);
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
export {
  _sfc_main as default
};
