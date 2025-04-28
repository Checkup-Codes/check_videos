import { computed, ref, onMounted, onUnmounted, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderComponent, ssrRenderStyle, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import "./GameConfig-BCEvFKg5.js";
const _sfc_main = {
  __name: "WordCompletion",
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
      gameState.value.showAnswer = false;
      gameState.value.selectedLetters = [];
      gameState.value.hintShown = false;
      gameState.value.currentHintIndex = 0;
      const wordLength = gameState.value.currentQuestion.word.length;
      const maskedCount = Math.max(2, Math.floor(wordLength * 0.4));
      const indices = Array.from({ length: wordLength }, (_, i) => i).filter(
        (i) => gameState.value.currentQuestion.word[i] !== " "
      );
      gameState.value.maskedIndices = indices.sort(() => Math.random() - 0.5).slice(0, maskedCount).sort((a, b) => a - b);
    };
    const selectLetter = (letter) => {
      if (gameState.value.selectedLetters.length < gameState.value.maskedIndices.length) {
        gameState.value.selectedLetters.push(letter);
      }
    };
    const checkAnswer = () => {
      if (!isAnswerComplete.value) return;
      const userAnswer = gameState.value.currentQuestion.word.split("").map((char, index) => {
        if (gameState.value.maskedIndices.includes(index)) {
          const letterIndex = gameState.value.maskedIndices.indexOf(index);
          return gameState.value.selectedLetters[letterIndex];
        }
        return char;
      }).join("");
      const isCorrect = userAnswer.toLowerCase() === gameState.value.currentQuestion.word.toLowerCase();
      gameState.value.showAnswer = true;
      gameState.value.isCorrect = isCorrect;
      gameState.value.userResponses.push({
        word_id: gameState.value.currentQuestion.id,
        correct: isCorrect
      });
      gameState.value.progress = (gameState.value.currentIndex + 1) / gameState.value.totalQuestions * 100;
      setTimeout(() => {
        gameState.value.currentIndex++;
        loadNextQuestion();
      }, 3e3);
    };
    const endGame = () => {
      gameState.value.isPlaying = false;
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
    onMounted(() => {
      startGameWithConfig();
      window.addEventListener("keydown", handleKeyPress);
    });
    onUnmounted(() => {
      window.removeEventListener("keydown", handleKeyPress);
    });
    const handleKeyPress = (event) => {
      if (gameState.value.showAnswer || !gameState.value.isPlaying) return;
      const key = event.key.toUpperCase();
      if (/^[A-Z]$/.test(key) || key === " ") {
        selectLetter(key);
      }
      if (event.key === "Backspace") {
        clearLastLetter();
      }
      if (event.key === "Enter" && isAnswerComplete.value) {
        checkAnswer();
      }
    };
    const clearLastLetter = () => {
      if (gameState.value.selectedLetters.length > 0) {
        gameState.value.selectedLetters.pop();
      }
    };
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
          _push(`<div class="space-y-4"><div><div class="flex items-center justify-between"><h2 class="text-xl font-semibold text-gray-900">Eksik harfleri tamamlayın:</h2>`);
          if (!gameState.value.showAnswer) {
            _push(`<button class="rounded-lg border border-gray-200 px-3 py-1 text-sm text-gray-600 hover:bg-gray-50"${ssrIncludeBooleanAttr(
              gameState.value.hintShown && (!gameState.value.currentQuestion.example_sentences || gameState.value.currentQuestion.example_sentences.length <= 1)
            ) ? " disabled" : ""}>${ssrInterpolate(gameState.value.hintShown ? `İpucu (${gameState.value.currentHintIndex + 1}/${((_a = gameState.value.currentQuestion.example_sentences) == null ? void 0 : _a.length) || 0})` : "İpucu Göster")}</button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><p class="mt-1 text-sm text-gray-500">Anlam: ${ssrInterpolate(gameState.value.currentQuestion.meaning)}</p></div>`);
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
          _push(`<div class="flex justify-center space-x-2"><!--[-->`);
          ssrRenderList(gameState.value.currentQuestion.word, (char, index) => {
            var _a2, _b;
            _push(`<div class="${ssrRenderClass([{
              "border-gray-200 bg-gray-50": gameState.value.maskedIndices.includes(index),
              "border-gray-300 bg-white": !gameState.value.maskedIndices.includes(index),
              "text-red-600": gameState.value.showAnswer && !gameState.value.isCorrect && gameState.value.maskedIndices.includes(index) && ((_a2 = gameState.value.selectedLetters[gameState.value.maskedIndices.indexOf(index)]) == null ? void 0 : _a2.toLowerCase()) !== char.toLowerCase(),
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
          ssrRenderList("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""), (char) => {
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
