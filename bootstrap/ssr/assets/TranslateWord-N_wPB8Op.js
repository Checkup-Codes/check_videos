import { computed, ref, onMounted, mergeProps, nextTick, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderAttr } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import gsap from "gsap";
import { _ as _export_sfc } from "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "vuex";
import "axios";
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
      if (gameState.value.currentQuestion.example_sentences && gameState.value.currentQuestion.example_sentences.length > 0) {
        gameState.value.hintShown = true;
        gameState.value.currentHintIndex = 0;
      }
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col items-center justify-center" }, _attrs))} data-v-4b439450>`);
      if (!gameState.value.isPlaying && gameState.value.userResponses.length > 0) {
        _push(`<div class="w-full max-w-2xl rounded-lg border border-base-300 bg-base-100 p-6" data-v-4b439450><div class="mb-4 text-center" data-v-4b439450><h2 class="mb-2 text-xl font-semibold text-base-content" data-v-4b439450>Test Tamamlandı</h2><div class="inline-flex items-center gap-2 rounded bg-base-200 px-3 py-1" data-v-4b439450><span class="text-base-content/70 text-sm" data-v-4b439450>Puan:</span><span class="text-lg font-bold text-base-content" data-v-4b439450>${ssrInterpolate(calculateScore.value)} / 100</span></div></div><div class="mb-4 grid grid-cols-2 gap-4" data-v-4b439450><div class="rounded border border-base-300 bg-base-200 p-3 text-center" data-v-4b439450><div class="mb-1" data-v-4b439450><div class="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-green-100" data-v-4b439450><span class="text-sm font-bold text-green-600" data-v-4b439450>${ssrInterpolate(correctCount.value)}</span></div></div><p class="text-base-content/70 text-xs" data-v-4b439450>Doğru</p></div><div class="rounded border border-base-300 bg-base-200 p-3 text-center" data-v-4b439450><div class="mb-1" data-v-4b439450><div class="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-red-100" data-v-4b439450><span class="text-sm font-bold text-red-600" data-v-4b439450>${ssrInterpolate(incorrectCount.value)}</span></div></div><p class="text-base-content/70 text-xs" data-v-4b439450>Yanlış</p></div></div><div class="mb-4" data-v-4b439450><h3 class="mb-2 text-sm font-medium text-base-content" data-v-4b439450>Cevaplarınız</h3><div class="max-h-48 space-y-2 overflow-y-auto" data-v-4b439450><!--[-->`);
        ssrRenderList(gameState.value.userResponses, (response) => {
          var _a, _b;
          _push(`<div class="flex items-center justify-between rounded border border-base-300 bg-base-200 p-2" data-v-4b439450><div class="flex items-center gap-2" data-v-4b439450><div class="${ssrRenderClass([response.correct ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600", "flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold"])}" data-v-4b439450>${ssrInterpolate(response.correct ? "✓" : "✗")}</div><div class="flex flex-col" data-v-4b439450><span class="text-sm font-medium text-base-content" data-v-4b439450>${ssrInterpolate(((_a = wordsMap.value[response.word_id]) == null ? void 0 : _a.word) || "Unknown")}</span><span class="text-base-content/70 text-xs" data-v-4b439450>${ssrInterpolate(((_b = wordsMap.value[response.word_id]) == null ? void 0 : _b.meaning) || "")}</span></div></div><span class="${ssrRenderClass([response.correct ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800", "inline-flex items-center rounded px-2 py-1 text-xs font-medium"])}" data-v-4b439450>${ssrInterpolate(response.correct ? "Doğru" : "Yanlış")}</span></div>`);
        });
        _push(`<!--]--></div></div><div class="space-y-2" data-v-4b439450>`);
        if (hasUser.value) {
          _push(`<button class="w-full rounded border border-base-300 bg-base-content px-4 py-2 text-center text-sm font-medium text-base-100 transition hover:bg-base-300 hover:text-base-content"${ssrIncludeBooleanAttr(isUpdating.value) ? " disabled" : ""} data-v-4b439450>${ssrInterpolate(isUpdating.value ? "Güncelleniyor..." : "İstatistikleri Güncelle")}</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex gap-2" data-v-4b439450><button class="flex-1 rounded border border-base-300 bg-base-content px-4 py-2 text-center text-sm font-medium text-base-100 transition hover:bg-base-300 hover:text-base-content" data-v-4b439450> Pakete Dön </button><button class="flex-1 rounded border border-base-300 px-4 py-2 text-sm font-medium text-base-content transition hover:bg-base-200" data-v-4b439450> Tekrar Başla </button></div></div></div>`);
      } else {
        _push(`<div class="${ssrRenderClass([{
          "bg-base-100": !gameState.value.showAnswer,
          "bg-green-50": gameState.value.showAnswer && gameState.value.isCorrect,
          "bg-red-50": gameState.value.showAnswer && !gameState.value.isCorrect
        }, "relative w-full max-w-2xl rounded-lg border border-base-300 bg-base-100 p-6 transition-colors duration-500"])}" data-v-4b439450><div class="relative mb-4 h-1 w-full overflow-hidden rounded-full bg-base-200" data-v-4b439450><div class="h-full w-0 bg-base-content" data-v-4b439450></div><div class="absolute left-0 top-0 h-full w-[50px] bg-gradient-to-r from-transparent via-white/30 to-transparent" data-v-4b439450></div></div><div class="text-base-content/70 mb-4 text-right text-sm" data-v-4b439450> Soru ${ssrInterpolate(gameState.value.currentIndex + 1)} / ${ssrInterpolate(gameState.value.totalQuestions)}</div>`);
        if (gameState.value.currentQuestion) {
          _push(`<div class="space-y-4" data-v-4b439450><div data-v-4b439450><h2 class="mb-2 text-2xl font-semibold text-base-content" data-v-4b439450>&quot;${ssrInterpolate(gameState.value.currentQuestion.word)}&quot;</h2><p class="text-base-content/70 mb-3" data-v-4b439450>Bu kelimenin anlamı nedir?</p><div class="flex items-center justify-between" data-v-4b439450><span class="inline-flex items-center rounded border border-base-300 bg-base-200 px-2 py-1 text-xs text-base-content" data-v-4b439450>${ssrInterpolate(getWordType(gameState.value.currentQuestion.type))}</span>`);
          if (!gameState.value.showAnswer && gameState.value.currentQuestion.example_sentences && gameState.value.currentQuestion.example_sentences.length > 1) {
            _push(`<button class="text-base-content/70 text-xs transition-colors hover:text-base-content" data-v-4b439450> Sonraki İpucu (${ssrInterpolate(gameState.value.currentHintIndex + 1)}/${ssrInterpolate(gameState.value.currentQuestion.example_sentences.length)}) </button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
          if (gameState.value.hintShown) {
            _push(`<div class="rounded border border-base-300 bg-base-200 p-3" data-v-4b439450><p class="text-sm font-medium text-base-content" data-v-4b439450>Örnek Cümle:</p>`);
            if (gameState.value.currentQuestion.example_sentences && gameState.value.currentQuestion.example_sentences.length > 0) {
              _push(`<p class="mt-1 text-sm text-base-content" data-v-4b439450>${ssrInterpolate(gameState.value.currentQuestion.example_sentences[gameState.value.currentHintIndex].sentence)}</p>`);
            } else {
              _push(`<p class="mt-1 text-sm text-base-content" data-v-4b439450>Bu kelime için örnek cümle bulunmuyor.</p>`);
            }
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="space-y-4" data-v-4b439450><input${ssrRenderAttr("value", gameState.value.userInput)} type="text"${ssrIncludeBooleanAttr(gameState.value.showAnswer) ? " disabled" : ""} placeholder="Cevabınızı yazın..." class="w-full rounded border border-base-300 bg-base-100 p-3 text-base-content focus:border-base-content focus:outline-none focus:ring-1 focus:ring-base-content disabled:cursor-not-allowed" data-v-4b439450><button${ssrIncludeBooleanAttr(!gameState.value.userInput.trim() || gameState.value.showAnswer) ? " disabled" : ""} class="w-full rounded border border-base-300 bg-base-content px-4 py-3 text-center text-sm font-medium text-base-100 transition hover:bg-base-300 hover:text-base-content disabled:cursor-not-allowed disabled:opacity-50" data-v-4b439450>${ssrInterpolate(gameState.value.showAnswer ? "Sonraki Soru" : "Cevapla")}</button></div>`);
          if (gameState.value.showAnswer) {
            _push(`<div class="${ssrRenderClass([{
              "bg-red-50": !gameState.value.isCorrect,
              "bg-green-50": gameState.value.isCorrect
            }, "mt-4 rounded border border-base-300 p-4"])}" data-v-4b439450><p class="${ssrRenderClass([{
              "text-red-600": !gameState.value.isCorrect,
              "text-green-600": gameState.value.isCorrect
            }, "text-sm font-medium"])}" data-v-4b439450> Doğru Cevap: </p><p class="mt-1 text-base-content" data-v-4b439450>${ssrInterpolate(gameState.value.currentQuestion.meaning)}</p>`);
            if (gameState.value.currentQuestion.meanings && gameState.value.currentQuestion.meanings.length > 1) {
              _push(`<div class="mt-3" data-v-4b439450><p class="text-base-content/70 text-sm font-medium" data-v-4b439450>Diğer Anlamlar:</p><ul class="mt-1 list-inside list-disc space-y-1 text-sm text-base-content" data-v-4b439450><!--[-->`);
              ssrRenderList(gameState.value.currentQuestion.meanings, (meaning, index) => {
                _push(`<li data-v-4b439450>${ssrInterpolate(meaning.meaning)}</li>`);
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
const TranslateWord = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4b439450"]]);
export {
  TranslateWord as default
};
