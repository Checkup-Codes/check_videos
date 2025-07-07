import { computed, ref, onMounted, mergeProps, nextTick, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderAttr } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import gsap from "gsap";
import { _ as _export_sfc } from "../app2.js";
import "@inertiajs/progress";
import "@fortawesome/vue-fontawesome";
import "axios";
import "vuex";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = {
  __name: "TranslateWord",
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
      userInput: "",
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
    const questionContainer = ref(null);
    const answerInput = ref(null);
    const isUpdating = ref(false);
    const animateNewQuestion = () => {
      gsap.fromTo(questionContainer.value, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
      gsap.fromTo(
        answerInput.value,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          delay: 0.2,
          ease: "power2.out"
        }
      );
    };
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
    const loadNextQuestion = () => {
      if (gameState.value.currentIndex >= words.value.length) {
        endGame();
        return;
      }
      gameState.value.currentQuestion = words.value[gameState.value.currentIndex];
      gameState.value.userInput = "";
      gameState.value.showAnswer = false;
      gameState.value.hintShown = false;
      gameState.value.currentHintIndex = 0;
      nextTick(() => {
        animateNewQuestion();
      });
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
    const endGame = () => {
      gameState.value.isPlaying = false;
    };
    const correctCount = computed(() => {
      return gameState.value.userResponses.filter((response) => response.correct).length;
    });
    const incorrectCount = computed(() => {
      return gameState.value.userResponses.filter((response) => !response.correct).length;
    });
    onMounted(() => {
      startGameWithConfig();
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col items-center justify-center" }, _attrs))} data-v-ba0fc5e2>`);
      if (!gameState.value.isPlaying && gameState.value.userResponses.length > 0) {
        _push(`<div class="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm" data-v-ba0fc5e2><h2 class="mb-2 text-2xl font-semibold text-gray-900" data-v-ba0fc5e2>Test Özeti</h2><div class="mb-4 text-center" data-v-ba0fc5e2><p class="text-4xl font-bold text-gray-900" data-v-ba0fc5e2>${ssrInterpolate(calculateScore.value)} / 100</p><p class="text-sm text-gray-600" data-v-ba0fc5e2>Puan</p></div><div class="mb-4 grid grid-cols-2 gap-4 rounded-lg bg-gray-50 p-4" data-v-ba0fc5e2><div class="text-center" data-v-ba0fc5e2><p class="text-2xl font-bold text-green-600" data-v-ba0fc5e2>${ssrInterpolate(correctCount.value)}</p><p class="text-sm text-gray-600" data-v-ba0fc5e2>Doğru</p></div><div class="text-center" data-v-ba0fc5e2><p class="text-2xl font-bold text-red-600" data-v-ba0fc5e2>${ssrInterpolate(incorrectCount.value)}</p><p class="text-sm text-gray-600" data-v-ba0fc5e2>Yanlış</p></div></div><div class="mb-4 max-h-60 overflow-y-auto" data-v-ba0fc5e2><h3 class="mb-2 font-medium text-gray-700" data-v-ba0fc5e2>Cevaplarınız:</h3><ul class="space-y-2 text-left text-sm text-gray-800" data-v-ba0fc5e2><!--[-->`);
        ssrRenderList(gameState.value.userResponses, (response) => {
          var _a2, _b;
          _push(`<li class="flex items-center justify-between rounded-md bg-gray-50 px-4 py-2" data-v-ba0fc5e2><div class="flex flex-col" data-v-ba0fc5e2><span class="${ssrRenderClass(response.correct ? "font-medium text-green-600" : "font-medium text-red-600")}" data-v-ba0fc5e2>${ssrInterpolate(((_a2 = wordsMap.value[response.word_id]) == null ? void 0 : _a2.word) || "Unknown")}</span><span class="text-xs text-gray-500" data-v-ba0fc5e2>${ssrInterpolate(((_b = wordsMap.value[response.word_id]) == null ? void 0 : _b.meaning) || "")}</span></div><span class="${ssrRenderClass(response.correct ? "text-lg text-green-600" : "text-lg text-red-600")}" data-v-ba0fc5e2>${ssrInterpolate(response.correct ? "✓" : "✗")}</span></li>`);
        });
        _push(`<!--]--></ul></div><div class="space-y-2" data-v-ba0fc5e2>`);
        if (hasUser.value) {
          _push(`<button class="w-full rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-blue-700"${ssrIncludeBooleanAttr(isUpdating.value) ? " disabled" : ""} data-v-ba0fc5e2>${ssrInterpolate(isUpdating.value ? "Güncelleniyor..." : "Kelime İstatistiklerini Güncelle")}</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex gap-2" data-v-ba0fc5e2><button class="flex-1 rounded-lg bg-black px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-gray-700" data-v-ba0fc5e2> Pakete Dön </button><button class="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100" data-v-ba0fc5e2> Tekrar Başla </button></div></div></div>`);
      } else {
        _push(`<div class="${ssrRenderClass([{
          "bg-white": !gameState.value.showAnswer,
          "bg-green-50": gameState.value.showAnswer && gameState.value.isCorrect,
          "bg-red-50": gameState.value.showAnswer && !gameState.value.isCorrect
        }, "relative w-full max-w-md rounded-2xl border border-gray-200 p-6 shadow-sm transition-colors duration-500"])}" data-v-ba0fc5e2><div class="relative mb-4 h-1 w-full overflow-hidden rounded-full bg-gray-200" data-v-ba0fc5e2><div class="h-full w-0 bg-black" data-v-ba0fc5e2></div><div class="absolute left-0 top-0 h-full w-[50px] bg-gradient-to-r from-transparent via-white/30 to-transparent" data-v-ba0fc5e2></div></div><div class="mb-4 text-right text-sm text-gray-500" data-v-ba0fc5e2> Soru ${ssrInterpolate(gameState.value.currentIndex + 1)} / ${ssrInterpolate(gameState.value.totalQuestions)}</div>`);
        if (gameState.value.currentQuestion) {
          _push(`<div class="space-y-4" data-v-ba0fc5e2><div data-v-ba0fc5e2><div class="flex items-center justify-between" data-v-ba0fc5e2><h2 class="text-xl font-semibold text-gray-900" data-v-ba0fc5e2> &quot;${ssrInterpolate(gameState.value.currentQuestion.word)}&quot; kelimesinin anlamı nedir? </h2>`);
          if (!gameState.value.showAnswer) {
            _push(`<button class="rounded-lg border border-gray-200 px-3 py-1 text-sm text-gray-600 hover:bg-gray-50"${ssrIncludeBooleanAttr(
              gameState.value.hintShown && (!gameState.value.currentQuestion.example_sentences || gameState.value.currentQuestion.example_sentences.length <= 1)
            ) ? " disabled" : ""} data-v-ba0fc5e2>${ssrInterpolate(gameState.value.hintShown ? `İpucu (${gameState.value.currentHintIndex + 1}/${((_a = gameState.value.currentQuestion.example_sentences) == null ? void 0 : _a.length) || 0})` : "İpucu Göster")}</button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><p class="mt-1 text-sm text-gray-500" data-v-ba0fc5e2>Kelime Türü: ${ssrInterpolate(getWordType(gameState.value.currentQuestion.type))}</p></div>`);
          if (gameState.value.hintShown) {
            _push(`<div class="rounded-lg bg-blue-50 p-3" data-v-ba0fc5e2><p class="text-sm text-blue-600" data-v-ba0fc5e2>Örnek Cümle:</p>`);
            if (gameState.value.currentQuestion.example_sentences && gameState.value.currentQuestion.example_sentences.length > 0) {
              _push(`<p class="mt-1 text-sm text-gray-700" data-v-ba0fc5e2>${ssrInterpolate(gameState.value.currentQuestion.example_sentences[gameState.value.currentHintIndex].sentence)}</p>`);
            } else {
              _push(`<p class="mt-1 text-sm text-gray-700" data-v-ba0fc5e2>Bu kelime için örnek cümle bulunmuyor.</p>`);
            }
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="space-y-4" data-v-ba0fc5e2><input${ssrRenderAttr("value", gameState.value.userInput)} type="text"${ssrIncludeBooleanAttr(gameState.value.showAnswer) ? " disabled" : ""} placeholder="Cevabınızı yazın..." class="w-full rounded-lg border border-gray-300 p-3 text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black disabled:cursor-not-allowed" data-v-ba0fc5e2><button${ssrIncludeBooleanAttr(!gameState.value.userInput.trim() || gameState.value.showAnswer) ? " disabled" : ""} class="w-full rounded-lg bg-black px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50" data-v-ba0fc5e2>${ssrInterpolate(gameState.value.showAnswer ? "Sonraki Soru" : "Cevapla")}</button></div>`);
          if (gameState.value.showAnswer) {
            _push(`<div class="${ssrRenderClass([{
              "bg-red-50": !gameState.value.isCorrect,
              "bg-green-50": gameState.value.isCorrect
            }, "mt-4 rounded-lg p-4"])}" data-v-ba0fc5e2><p class="${ssrRenderClass([{
              "text-red-600": !gameState.value.isCorrect,
              "text-green-600": gameState.value.isCorrect
            }, "text-sm font-medium"])}" data-v-ba0fc5e2> Doğru Cevap: </p><p class="mt-1 text-gray-700" data-v-ba0fc5e2>${ssrInterpolate(gameState.value.currentQuestion.meaning)}</p>`);
            if (gameState.value.currentQuestion.meanings && gameState.value.currentQuestion.meanings.length > 1) {
              _push(`<div class="mt-3" data-v-ba0fc5e2><p class="text-sm font-medium text-gray-600" data-v-ba0fc5e2>Diğer Anlamlar:</p><ul class="mt-1 list-inside list-disc space-y-1 text-sm text-gray-700" data-v-ba0fc5e2><!--[-->`);
              ssrRenderList(gameState.value.currentQuestion.meanings, (meaning, index) => {
                _push(`<li data-v-ba0fc5e2>${ssrInterpolate(meaning.meaning)}</li>`);
              });
              _push(`<!--]--></ul></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
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
const TranslateWord = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ba0fc5e2"]]);
export {
  TranslateWord as default
};
