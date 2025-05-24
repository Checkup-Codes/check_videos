import { computed, ref, onMounted, mergeProps, nextTick, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { usePage, router } from "@inertiajs/vue3";
import { _ as _export_sfc } from "../ssr.js";
import "axios";
import "@fortawesome/vue-fontawesome";
import "vuex";
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
    const emit = __emit;
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
    const isUpdating = ref(false);
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
    ref(null);
    ref(null);
    ref(null);
    ref(null);
    ref(null);
    const endGame = () => {
      gameState.value.isPlaying = false;
      nextTick(() => {
        if (hasUser.value && gameState.value.userResponses.length > 0) {
          console.log("İstatistikler güncelleniyor...");
          updateWordStats();
        }
      });
    };
    const updateWordStats = () => {
      if (!hasUser.value || !gameState.value.userResponses.length || isUpdating.value) return;
      isUpdating.value = true;
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
          onSuccess: () => {
            console.log("İstatistikler başarıyla güncellendi");
            isUpdating.value = false;
            emit("game-completed");
          },
          onError: (error) => {
            console.error("İstatistik güncelleme hatası:", error);
            isUpdating.value = false;
          }
        }
      );
    };
    onMounted(() => {
      startGameWithConfig();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen flex-col items-center justify-center" }, _attrs))} data-v-1460d52d>`);
      if (!gameState.value.isPlaying && gameState.value.userResponses.length > 0) {
        _push(`<div class="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm" data-v-1460d52d><h2 class="mb-2 text-2xl font-semibold text-gray-900" data-v-1460d52d>Test Özeti</h2><div class="mb-4 text-center" data-v-1460d52d><p class="text-4xl font-bold text-gray-900" data-v-1460d52d>${ssrInterpolate(calculateScore.value)} / 100</p><p class="text-sm text-gray-600" data-v-1460d52d>Puan</p></div><div class="mb-4 grid grid-cols-2 gap-4 rounded-lg bg-gray-50 p-4" data-v-1460d52d><div class="text-center" data-v-1460d52d><p class="text-2xl font-bold text-green-600" data-v-1460d52d>${ssrInterpolate(correctCount.value)}</p><p class="text-sm text-gray-600" data-v-1460d52d>Doğru</p></div><div class="text-center" data-v-1460d52d><p class="text-2xl font-bold text-red-600" data-v-1460d52d>${ssrInterpolate(incorrectCount.value)}</p><p class="text-sm text-gray-600" data-v-1460d52d>Yanlış</p></div></div><div class="mb-4 max-h-60 overflow-y-auto" data-v-1460d52d><h3 class="mb-2 font-medium text-gray-700" data-v-1460d52d>Cevaplarınız:</h3><ul class="space-y-2 text-left text-sm text-gray-800" data-v-1460d52d><!--[-->`);
        ssrRenderList(gameState.value.userResponses, (response) => {
          var _a, _b;
          _push(`<li class="flex items-center justify-between rounded-md bg-gray-50 px-4 py-2" data-v-1460d52d><div class="flex flex-col" data-v-1460d52d><span class="${ssrRenderClass(response.correct ? "font-medium text-green-600" : "font-medium text-red-600")}" data-v-1460d52d>${ssrInterpolate(((_a = wordsMap.value[response.word_id]) == null ? void 0 : _a.word) || "Unknown")}</span><span class="text-xs text-gray-500" data-v-1460d52d>${ssrInterpolate(((_b = wordsMap.value[response.word_id]) == null ? void 0 : _b.meaning) || "")}</span></div><span class="${ssrRenderClass(response.correct ? "text-lg text-green-600" : "text-lg text-red-600")}" data-v-1460d52d>${ssrInterpolate(response.correct ? "✓" : "✗")}</span></li>`);
        });
        _push(`<!--]--></ul></div><div class="space-y-2" data-v-1460d52d>`);
        if (hasUser.value) {
          _push(`<button class="w-full rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-blue-700"${ssrIncludeBooleanAttr(isUpdating.value) ? " disabled" : ""} data-v-1460d52d>${ssrInterpolate(isUpdating.value ? "Güncelleniyor..." : "Kelime İstatistiklerini Güncelle")}</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex gap-2" data-v-1460d52d><button class="flex-1 rounded-lg bg-black px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-gray-700" data-v-1460d52d> Pakete Dön </button><button class="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100" data-v-1460d52d> Tekrar Başla </button></div></div></div>`);
      } else {
        _push(`<div class="${ssrRenderClass([{
          "bg-white": !gameState.value.showAnswer,
          "bg-green-50": gameState.value.showAnswer && gameState.value.isCorrect,
          "bg-red-50": gameState.value.showAnswer && !gameState.value.isCorrect
        }, "relative w-full max-w-md rounded-2xl border border-gray-200 p-6 shadow-sm transition-colors duration-500"])}" data-v-1460d52d><div class="relative mb-4 h-1 w-full overflow-hidden rounded-full bg-gray-200" data-v-1460d52d><div class="h-full w-0 bg-black" data-v-1460d52d></div><div class="absolute left-0 top-0 h-full w-[50px] bg-gradient-to-r from-transparent via-white/30 to-transparent" data-v-1460d52d></div></div><div class="mb-4 text-right text-sm text-gray-500" data-v-1460d52d> Soru ${ssrInterpolate(gameState.value.currentIndex + 1)} / ${ssrInterpolate(gameState.value.totalQuestions)}</div>`);
        if (gameState.value.currentQuestion) {
          _push(`<div class="space-y-4" data-v-1460d52d><div data-v-1460d52d><div class="flex items-center justify-between" data-v-1460d52d><h2 class="text-xl font-semibold text-gray-900" data-v-1460d52d>Eksik harfleri tamamlayın:</h2></div><p class="mt-1 text-sm text-gray-500" data-v-1460d52d>Anlam: ${ssrInterpolate(gameState.value.currentQuestion.meaning)}</p></div><div class="flex justify-center space-x-2" data-v-1460d52d><!--[-->`);
          ssrRenderList(gameState.value.maskedIndices, (index, letterIndex) => {
            _push(`<div class="flex h-12 w-12 items-center justify-center rounded-lg border border-gray-300 text-xl font-semibold" data-v-1460d52d>${ssrInterpolate(gameState.value.selectedLetters[letterIndex] || "")}</div>`);
          });
          _push(`<!--]--></div><div class="grid grid-cols-7 gap-2" data-v-1460d52d><!--[-->`);
          ssrRenderList("ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ".split(""), (letter) => {
            _push(`<button${ssrIncludeBooleanAttr(
              gameState.value.showAnswer || gameState.value.selectedLetters.includes(letter) || gameState.value.selectedLetters.length >= gameState.value.maskedIndices.length
            ) ? " disabled" : ""} class="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 text-lg font-medium transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50" data-v-1460d52d>${ssrInterpolate(letter)}</button>`);
          });
          _push(`<!--]--></div><button class="w-full rounded-lg border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-700 transition hover:bg-gray-100" data-v-1460d52d> Seçilen Harfleri Temizle </button><button${ssrIncludeBooleanAttr(gameState.value.showAnswer || !isAnswerComplete.value) ? " disabled" : ""} class="w-full rounded-lg bg-black px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-gray-700 disabled:opacity-50" data-v-1460d52d> Kontrol Et </button></div>`);
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
const WordCompletion = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1460d52d"]]);
export {
  WordCompletion as default
};
