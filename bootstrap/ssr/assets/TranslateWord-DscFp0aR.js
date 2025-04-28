import { computed, ref, onMounted, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderComponent, ssrRenderStyle, ssrIncludeBooleanAttr, ssrRenderAttr } from "vue/server-renderer";
import { usePage, Link, router } from "@inertiajs/vue3";
import "./GameConfig-BCEvFKg5.js";
const _sfc_main = {
  __name: "TranslateWord",
  __ssrInlineRender: true,
  props: {
    gameType: String,
    packSlug: String,
    words: Array,
    gameConfig: Object
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
      showAnswer: false,
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
      if (!props.words || props.words.length < 5) {
        alert("Oyunu başlatmak için en az 5 kelime gereklidir.");
        return;
      }
      gameState.value.isLoading = true;
      let filteredWords = [...props.words];
      if (props.gameConfig.difficulty !== "all") {
        filteredWords = filteredWords.filter((word) => word.difficulty_level === parseInt(props.gameConfig.difficulty));
      }
      if (props.gameConfig.learningStatus !== "all") {
        filteredWords = filteredWords.filter((word) => word.learning_status === parseInt(props.gameConfig.learningStatus));
      }
      if (props.gameConfig.wordSelection === "difficult") {
        filteredWords.sort((a, b) => b.incorrect_count - a.incorrect_count);
      } else if (props.gameConfig.wordSelection === "easy") {
        filteredWords.sort((a, b) => a.incorrect_count - b.incorrect_count);
      } else {
        filteredWords.sort(() => Math.random() - 0.5);
      }
      const questionCount = Math.min(parseInt(props.gameConfig.questionCount), filteredWords.length);
      filteredWords = filteredWords.slice(0, questionCount);
      await new Promise((resolve) => {
        words.value = filteredWords;
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
      gameState.value.showAnswer = false;
      gameState.value.progress = 0;
      gameState.value.hintShown = false;
      gameState.value.currentHintIndex = 0;
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
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen flex-col items-center justify-center" }, _attrs))}>`);
      if (!gameState.value.isPlaying && gameState.value.userResponses.length > 0) {
        _push(`<div class="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"><h2 class="mb-2 text-2xl font-semibold text-gray-900">Test Özeti</h2><div class="mb-4 text-center"><p class="text-4xl font-bold text-gray-900">${ssrInterpolate(calculateScore.value)} / 100</p><p class="text-sm text-gray-600">Puan</p></div><div class="mb-4 grid grid-cols-2 gap-4 rounded-lg bg-gray-50 p-4"><div class="text-center"><p class="text-2xl font-bold text-green-600">${ssrInterpolate(correctCount.value)}</p><p class="text-sm text-gray-600">Doğru</p></div><div class="text-center"><p class="text-2xl font-bold text-red-600">${ssrInterpolate(incorrectCount.value)}</p><p class="text-sm text-gray-600">Yanlış</p></div></div><ul class="mb-4 space-y-2 text-left text-sm text-gray-800"><!--[-->`);
        ssrRenderList(gameState.value.userResponses, (response) => {
          var _a2;
          _push(`<li class="flex justify-between rounded-md bg-gray-50 px-4 py-2"><span class="${ssrRenderClass(response.correct ? "text-green-600" : "text-red-600")}">${ssrInterpolate(((_a2 = wordsMap.value[response.word_id]) == null ? void 0 : _a2.word) || "Unknown")}</span><span>${ssrInterpolate(response.correct ? "✓" : "✗")}</span></li>`);
        });
        _push(`<!--]--></ul><div class="flex gap-2">`);
        _push(ssrRenderComponent(unref(Link), {
          href: `/rendition/words/${props.packSlug}`,
          class: "flex-1 rounded-lg bg-black px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-gray-700"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Pakete Dön `);
            } else {
              return [
                createTextVNode(" Pakete Dön ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<button class="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"> Tekrar Başla </button></div></div>`);
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
          _push(`</div><p class="mt-1 text-sm text-gray-500">Kelime Türü: ${ssrInterpolate(getWordType(gameState.value.currentQuestion.word_type))}</p></div>`);
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
          _push(`<input${ssrRenderAttr("value", gameState.value.userInput)}${ssrIncludeBooleanAttr(gameState.value.showAnswer) ? " disabled" : ""} type="text" placeholder="Çeviriyi girin" class="w-full rounded-lg border border-gray-300 p-3 text-base text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500">`);
          if (gameState.value.showAnswer) {
            _push(`<div class="${ssrRenderClass([{
              "bg-green-100": gameState.value.isCorrect,
              "bg-red-100": !gameState.value.isCorrect
            }, "mt-2 rounded-lg p-3"])}"><p class="${ssrRenderClass([{
              "text-green-600": gameState.value.isCorrect,
              "text-red-600": !gameState.value.isCorrect
            }, "text-sm"])}">${ssrInterpolate(gameState.value.isCorrect ? "Doğru!" : "Yanlış!")}</p><p class="mt-1 font-medium text-gray-900">Doğru cevap: ${ssrInterpolate(gameState.value.currentQuestion.meaning)}</p></div>`);
          } else {
            _push(`<!---->`);
          }
          if (!gameState.value.showAnswer) {
            _push(`<button class="w-full rounded-lg bg-black px-4 py-2 text-sm font-medium text-white shadow-md transition hover:bg-gray-700"> Cevabı Gönder </button>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Rendition/_components/TranslateWord.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
