import { computed, ref, onMounted, onUnmounted, mergeProps, nextTick, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import gsap from "gsap";
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
      currentHintIndex: 0,
      correctAnswer: "",
      totalPoints: 0,
      displayPoints: 0,
      hintsUsed: 0,
      hintLetterIndices: [],
      isHintAnimating: false
      // Track if hint animation is in progress
    });
    const words = ref([]);
    const wordsMap = computed(() => Object.fromEntries(words.value.map((word) => [word.id, word])));
    const isAnswerComplete = computed(() => {
      return gameState.value.selectedLetters.every((letter) => letter !== "");
    });
    const isUpdating = ref(false);
    const startGameWithConfig = async () => {
      if (!props.words || props.words.length < 2) {
        alert("Oyunu başlatmak için en az 2 kelime gereklidir.");
        return;
      }
      gameState.value.isLoading = true;
      let gameWords = [...props.words];
      if (props.gameConfig.wordType) {
        gameWords = gameWords.filter((word) => word.type === props.gameConfig.wordType);
      }
      if (props.gameConfig.learningStatus !== "") {
        gameWords = gameWords.filter((word) => word.learning_status === parseInt(props.gameConfig.learningStatus));
      }
      if (props.gameConfig.difficultyLevel) {
        gameWords = gameWords.filter((word) => word.difficulty_level === props.gameConfig.difficultyLevel);
      }
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
    const calculateScore = computed(() => {
      if (!gameState.value.userResponses.length) return 0;
      const correctAnswers = gameState.value.userResponses.filter((response) => response.correct).length;
      return Math.round(correctAnswers / gameState.value.userResponses.length * 100);
    });
    const currentQuestionPoints = computed(() => {
      if (!gameState.value.currentQuestion) return 0;
      const wordLength = gameState.value.currentQuestion.word.length;
      const basePoints = wordLength * 100;
      const hintPenalty = gameState.value.hintsUsed * 100;
      return basePoints - hintPenalty;
    });
    const getAlphabet = () => {
      return "abcçdefgğhıijklmnoöprsştuüvwxyz".split("");
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
      const currentWord = words.value[gameState.value.currentIndex].word;
      const wordLength = currentWord.length;
      console.log("Yeni soru yükleniyor:", {
        currentIndex: gameState.value.currentIndex,
        word: currentWord,
        wordLength
      });
      const baseState = {
        isLoading: gameState.value.isLoading,
        isPlaying: gameState.value.isPlaying,
        currentIndex: gameState.value.currentIndex,
        totalQuestions: gameState.value.totalQuestions,
        userResponses: gameState.value.userResponses,
        totalPoints: gameState.value.totalPoints,
        displayPoints: gameState.value.displayPoints
      };
      const newState = {
        ...baseState,
        currentQuestion: words.value[gameState.value.currentIndex],
        selectedLetters: [],
        // Boş dizi olarak başlat
        showAnswer: false,
        hintShown: false,
        currentHintIndex: 0,
        hintsUsed: 0,
        hintLetterIndices: [],
        // Boş dizi olarak başlat
        isHintAnimating: false,
        progress: 0,
        maskedIndices: []
        // Boş dizi olarak başlat
      };
      gameState.value = newState;
      gameState.value.selectedLetters = Array(wordLength).fill("");
      gameState.value.hintLetterIndices = [];
      gameState.value.maskedIndices = Array.from({ length: wordLength }, (_, i) => i);
      console.log("Yeni state:", {
        selectedLetters: gameState.value.selectedLetters,
        hintLetterIndices: gameState.value.hintLetterIndices,
        maskedIndices: gameState.value.maskedIndices
      });
      nextTick(() => {
        console.log("DOM güncellendi, harf kutuları:", {
          selectedLetters: gameState.value.selectedLetters,
          hintLetterIndices: gameState.value.hintLetterIndices,
          maskedIndices: gameState.value.maskedIndices
        });
        const letterBoxes = selectedLettersContainer.value.children;
        gsap.fromTo(
          letterBoxes,
          {
            y: -50,
            opacity: 0,
            scale: 0.8
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: "back.out(1.7)"
          }
        );
      });
    };
    const progressBar = ref(null);
    ref(null);
    ref(null);
    const selectedLettersContainer = ref(null);
    const getNextEmptyIndex = () => {
      return gameState.value.selectedLetters.findIndex((letter) => !letter);
    };
    const handleKeyPress = (event) => {
      if (gameState.value.showAnswer) return;
      const key = event.key.toLowerCase();
      const alphabet = getAlphabet();
      if (event.key === "Shift") {
        console.log("Shift tuşuna basıldı:", {
          selectedLetters: gameState.value.selectedLetters,
          hintLetterIndices: gameState.value.hintLetterIndices
        });
        if (gameState.value.isHintAnimating) return;
        const emptyIndices = gameState.value.maskedIndices.filter((_, index) => !gameState.value.selectedLetters[index]);
        if (emptyIndices.length > 0) {
          const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
          const correctLetter = gameState.value.currentQuestion.word[randomIndex].toLowerCase();
          gameState.value.isHintAnimating = true;
          const letterBox = selectedLettersContainer.value.children[randomIndex];
          const letters = "abcdefghijklmnopqrstuvwxyz".split("");
          let speed = 50;
          let iterations = 0;
          const maxIterations = 20;
          const letterInterval = setInterval(() => {
            letterBox.textContent = letters[Math.floor(Math.random() * letters.length)];
            if (iterations > maxIterations * 0.7) {
              speed += 10;
            }
            iterations++;
            if (iterations >= maxIterations) {
              clearInterval(letterInterval);
              letterBox.textContent = correctLetter;
              gameState.value.selectedLetters[randomIndex] = correctLetter;
              gameState.value.hintsUsed++;
              gameState.value.hintLetterIndices.push(randomIndex);
              gsap.to(letterBox, {
                scale: 1.1,
                duration: 0.2,
                yoyo: true,
                repeat: 1,
                onComplete: () => {
                  gameState.value.isHintAnimating = false;
                }
              });
            }
          }, speed);
        }
      } else if (alphabet.includes(key) || key === " ") {
        const emptyIndex = gameState.value.selectedLetters.findIndex((letter) => !letter);
        if (emptyIndex !== -1) {
          gameState.value.selectedLetters[emptyIndex] = key;
        }
      } else if (event.key === "Backspace") {
        const lastFilledIndex = [...gameState.value.selectedLetters].reverse().findIndex((letter, index) => {
          const actualIndex = gameState.value.selectedLetters.length - 1 - index;
          return letter && !gameState.value.hintLetterIndices.includes(actualIndex);
        });
        if (lastFilledIndex !== -1) {
          const actualIndex = gameState.value.selectedLetters.length - 1 - lastFilledIndex;
          gameState.value.selectedLetters[actualIndex] = "";
        }
      } else if (event.key === "Enter" && isAnswerComplete.value) {
        checkAnswer();
      }
    };
    const checkAnswer = () => {
      if (gameState.value.showAnswer) return;
      if (!isAnswerComplete.value) return;
      console.log("Cevap kontrolü öncesi:", {
        selectedLetters: gameState.value.selectedLetters,
        hintLetterIndices: gameState.value.hintLetterIndices
      });
      const word = gameState.value.currentQuestion.word.toLowerCase();
      let isCorrect = true;
      let correctAnswer = "";
      for (let i = 0; i < gameState.value.maskedIndices.length; i++) {
        const correctChar = word[gameState.value.maskedIndices[i]];
        const userChar = gameState.value.selectedLetters[i].toLowerCase();
        if (correctChar !== userChar) {
          isCorrect = false;
        }
        correctAnswer += correctChar;
      }
      console.log("Cevap kontrolü sonrası:", {
        isCorrect,
        correctAnswer,
        selectedLetters: gameState.value.selectedLetters,
        hintLetterIndices: gameState.value.hintLetterIndices
      });
      gameState.value.isCorrect = isCorrect;
      gameState.value.correctAnswer = correctAnswer;
      let questionPoints = 0;
      if (isCorrect) {
        questionPoints = word.length * 100;
        questionPoints -= gameState.value.hintsUsed * 100;
      }
      const oldPoints = gameState.value.totalPoints;
      const newPoints = oldPoints + questionPoints;
      gameState.value.displayPoints = oldPoints;
      setTimeout(() => {
        animatePoints(oldPoints, newPoints);
      }, 500);
      gameState.value.userResponses.push({
        word_id: gameState.value.currentQuestion.id,
        correct: isCorrect,
        points: questionPoints,
        hintsUsed: gameState.value.hintsUsed
      });
      gameState.value.showAnswer = true;
      const newProgress = Math.round((gameState.value.currentIndex + 1) / gameState.value.totalQuestions * 100);
      gsap.to(progressBar.value, {
        width: `${newProgress}%`,
        duration: 0.5,
        ease: "power2.out"
      });
      setTimeout(() => {
        gameState.value.currentIndex++;
        loadNextQuestion();
      }, 2e3);
    };
    const animatePoints = (from, to) => {
      gsap.to(gameState.value, {
        displayPoints: to,
        duration: 1,
        ease: "power2.out",
        onUpdate: () => {
          gameState.value.totalPoints = Math.round(gameState.value.displayPoints);
        }
      });
    };
    const endGame = () => {
      console.log("Oyun bitti, özet ekranı gösteriliyor");
      gameState.value.isPlaying = false;
      nextTick(() => {
        const summaryElement = document.querySelector(".game-summary");
        if (summaryElement) {
          gsap.fromTo(
            summaryElement,
            {
              opacity: 0,
              y: 20
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out"
            }
          );
        }
      });
    };
    onMounted(() => {
      startGameWithConfig();
      window.addEventListener("keydown", handleKeyPress);
    });
    onUnmounted(() => {
      window.removeEventListener("keydown", handleKeyPress);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col items-center justify-center" }, _attrs))} data-v-4b6a119a>`);
      if (!gameState.value.isPlaying && gameState.value.userResponses.length > 0) {
        _push(`<div class="game-summary w-full max-w-md rounded-2xl border border-gray-200 bg-white px-6 shadow-sm" data-v-4b6a119a><h2 class="mb-2 text-2xl font-semibold text-gray-900" data-v-4b6a119a>Test Özeti</h2><div class="mb-4 text-center" data-v-4b6a119a><p class="text-4xl font-bold text-gray-900" data-v-4b6a119a>${ssrInterpolate(calculateScore.value)} / 100</p><p class="text-sm text-gray-600" data-v-4b6a119a>Puan</p></div><div class="mb-4 grid grid-cols-2 gap-4 rounded-lg bg-gray-50 p-4" data-v-4b6a119a><div class="text-center" data-v-4b6a119a><p class="text-2xl font-bold text-green-600" data-v-4b6a119a>${ssrInterpolate(correctCount.value)}</p><p class="text-sm text-gray-600" data-v-4b6a119a>Doğru</p></div><div class="text-center" data-v-4b6a119a><p class="text-2xl font-bold text-red-600" data-v-4b6a119a>${ssrInterpolate(incorrectCount.value)}</p><p class="text-sm text-gray-600" data-v-4b6a119a>Yanlış</p></div></div><div class="mb-4 text-center" data-v-4b6a119a><p class="text-3xl font-bold text-blue-600" data-v-4b6a119a>${ssrInterpolate(gameState.value.totalPoints)}</p><p class="text-sm text-gray-600" data-v-4b6a119a>Toplam Puan</p></div><div class="mb-4 max-h-60 overflow-y-auto" data-v-4b6a119a><h3 class="mb-2 font-medium text-gray-700" data-v-4b6a119a>Cevaplarınız:</h3><ul class="space-y-2 text-left text-sm text-gray-800" data-v-4b6a119a><!--[-->`);
        ssrRenderList(gameState.value.userResponses, (response) => {
          var _a, _b;
          _push(`<li class="flex items-center justify-between rounded-md bg-gray-50 px-4 py-2" data-v-4b6a119a><div class="flex flex-col" data-v-4b6a119a><span class="${ssrRenderClass(response.correct ? "font-medium text-green-600" : "font-medium text-red-600")}" data-v-4b6a119a>${ssrInterpolate(((_a = wordsMap.value[response.word_id]) == null ? void 0 : _a.word) || "Unknown")}</span><span class="text-xs text-gray-500" data-v-4b6a119a>${ssrInterpolate(((_b = wordsMap.value[response.word_id]) == null ? void 0 : _b.meaning) || "")}</span>`);
          if (response.correct) {
            _push(`<span class="text-xs text-blue-600" data-v-4b6a119a>${ssrInterpolate(response.points)} puan ${ssrInterpolate(response.hintsUsed > 0 ? `(${response.hintsUsed} ipucu kullanıldı)` : "")}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><span class="${ssrRenderClass(response.correct ? "text-lg text-green-600" : "text-lg text-red-600")}" data-v-4b6a119a>${ssrInterpolate(response.correct ? "✓" : "✗")}</span></li>`);
        });
        _push(`<!--]--></ul></div><div class="space-y-2" data-v-4b6a119a>`);
        if (hasUser.value && !isUpdating.value) {
          _push(`<button class="w-full rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-blue-700" data-v-4b6a119a> Kelime İstatistiklerini Güncelle ve Pakete Dön </button>`);
        } else {
          _push(`<!---->`);
        }
        if (hasUser.value && isUpdating.value) {
          _push(`<button disabled class="w-full rounded-lg bg-blue-400 px-4 py-2 text-center text-sm font-medium text-white" data-v-4b6a119a> Güncelleniyor... </button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex gap-2" data-v-4b6a119a><button class="flex-1 rounded-lg bg-black px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-gray-700" data-v-4b6a119a> Pakete Dön </button><button class="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100" data-v-4b6a119a> Tekrar Başla </button></div></div></div>`);
      } else {
        _push(`<div class="${ssrRenderClass([{
          "bg-white": !gameState.value.showAnswer,
          "bg-green-50": gameState.value.showAnswer && gameState.value.isCorrect,
          "bg-red-50": gameState.value.showAnswer && !gameState.value.isCorrect
        }, "relative w-full max-w-md rounded-2xl border border-gray-200 p-6 shadow-sm transition-colors duration-500"])}" data-v-4b6a119a><div class="relative mb-4 h-1 w-full overflow-hidden rounded-full bg-gray-200" data-v-4b6a119a><div class="h-full w-0 bg-black" data-v-4b6a119a></div><div class="absolute left-0 top-0 h-full w-[50px] bg-gradient-to-r from-transparent via-white/30 to-transparent" data-v-4b6a119a></div></div><div class="mb-4 flex items-center justify-between text-sm text-gray-500" data-v-4b6a119a><div data-v-4b6a119a>Soru ${ssrInterpolate(gameState.value.currentIndex + 1)} / ${ssrInterpolate(gameState.value.totalQuestions)}</div><div class="flex flex-col items-end gap-1" data-v-4b6a119a><div class="flex items-center gap-2" data-v-4b6a119a><span class="font-medium text-blue-600" data-v-4b6a119a>${ssrInterpolate(gameState.value.totalPoints)}</span><span data-v-4b6a119a>toplam puan</span></div><div class="flex items-center gap-2 text-xs" data-v-4b6a119a><span class="font-medium text-gray-600" data-v-4b6a119a>${ssrInterpolate(currentQuestionPoints.value)}</span><span data-v-4b6a119a>mevcut soru puanı</span></div></div></div>`);
        if (gameState.value.currentQuestion) {
          _push(`<div class="space-y-4" data-v-4b6a119a><div data-v-4b6a119a><div class="flex items-center justify-between" data-v-4b6a119a><h2 class="text-xl font-semibold text-gray-900" data-v-4b6a119a>Eksik harfleri tamamlayın:</h2></div><p class="mt-1 text-sm text-gray-500" data-v-4b6a119a>Anlam: ${ssrInterpolate(gameState.value.currentQuestion.meaning)}</p></div><div class="space-y-2" data-v-4b6a119a><div class="flex justify-center space-x-2" data-v-4b6a119a><!--[-->`);
          ssrRenderList(gameState.value.currentQuestion.word.split(""), (letter, index) => {
            _push(`<div class="${ssrRenderClass([{
              "border-gray-300": !gameState.value.selectedLetters[index],
              "border-black bg-gray-50": !gameState.value.selectedLetters[index] && index === getNextEmptyIndex(),
              "border-green-500 bg-green-50": gameState.value.showAnswer && gameState.value.isCorrect,
              "border-red-500 bg-red-50": gameState.value.showAnswer && !gameState.value.isCorrect,
              "border-blue-500": gameState.value.hintLetterIndices.includes(index) && !gameState.value.isHintAnimating
            }, "flex h-12 w-12 items-center justify-center rounded-lg border text-xl font-semibold transition-all"])}" data-v-4b6a119a>`);
            if (gameState.value.maskedIndices.includes(index)) {
              _push(`<span class="${ssrRenderClass({ "text-blue-600": gameState.value.hintLetterIndices.includes(index) })}" data-v-4b6a119a>${ssrInterpolate(gameState.value.selectedLetters[index] || "")}</span>`);
            } else {
              _push(`<!--[-->${ssrInterpolate(letter.toLowerCase())}<!--]-->`);
            }
            _push(`</div>`);
          });
          _push(`<!--]--></div>`);
          if (gameState.value.showAnswer && !gameState.value.isCorrect) {
            _push(`<div class="flex justify-center space-x-2" data-v-4b6a119a><!--[-->`);
            ssrRenderList(gameState.value.currentQuestion.word.split(""), (letter, index) => {
              _push(`<div class="flex h-8 w-8 items-center justify-center rounded-lg border border-green-500 bg-green-50 text-sm font-medium text-green-700" data-v-4b6a119a>${ssrInterpolate(letter.toLowerCase())}</div>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><button${ssrIncludeBooleanAttr(gameState.value.showAnswer || !isAnswerComplete.value) ? " disabled" : ""} class="w-full rounded-lg bg-black px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-gray-700 disabled:opacity-50" data-v-4b6a119a> Kontrol Et </button></div>`);
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
const WordCompletion = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4b6a119a"]]);
export {
  WordCompletion as default
};
