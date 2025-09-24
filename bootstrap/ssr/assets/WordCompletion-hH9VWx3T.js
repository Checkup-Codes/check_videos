import { computed, ref, onMounted, onUnmounted, mergeProps, nextTick, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
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
    const showVirtualKeyboard = ref(false);
    const startGameWithConfig = () => {
      if (!props.words || props.words.length < 2) {
        alert("Oyunu başlatmak için en az 2 kelime gereklidir.");
        return;
      }
      gameState.value.isLoading = true;
      let gameWords = [...props.words];
      if (props.gameConfig.wordType && props.gameConfig.wordType !== "") {
        gameWords = gameWords.filter((word) => word.type === props.gameConfig.wordType);
      }
      if (props.gameConfig.learningStatus && props.gameConfig.learningStatus !== "") {
        gameWords = gameWords.filter((word) => word.learning_status === parseInt(props.gameConfig.learningStatus));
      }
      if (props.gameConfig.difficultyLevel && props.gameConfig.difficultyLevel !== "") {
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
      const questionCount = Math.min(props.gameConfig.questionCount || 10, gameWords.length);
      gameWords = gameWords.slice(0, questionCount);
      if (gameWords.length === 0) {
        alert("Filtreleme sonucu hiç kelime kalmadı. Lütfen filtreleri kontrol edin.");
        return;
      }
      words.value = gameWords;
      gameState.value.totalQuestions = words.value.length;
      gameState.value.currentIndex = 0;
      gameState.value.userResponses = [];
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
      if (!words.value[gameState.value.currentIndex]) {
        return;
      }
      const currentWord = words.value[gameState.value.currentIndex].word;
      const wordLength = currentWord.length;
      gameState.value.currentQuestion = words.value[gameState.value.currentIndex];
      gameState.value.showAnswer = false;
      gameState.value.hintShown = false;
      gameState.value.currentHintIndex = 0;
      gameState.value.hintsUsed = 0;
      gameState.value.hintLetterIndices = [];
      gameState.value.isHintAnimating = false;
      gameState.value.progress = 0;
      if (gameState.value.currentQuestion.example_sentences && gameState.value.currentQuestion.example_sentences.length > 0) {
        gameState.value.hintShown = true;
        gameState.value.currentHintIndex = 0;
      }
      gameState.value.selectedLetters = Array(wordLength).fill("");
      gameState.value.maskedIndices = Array.from({ length: wordLength }, (_, i) => i);
      nextTick(() => {
        if (selectedLettersContainer.value && selectedLettersContainer.value.children) {
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
        }
      });
    };
    const progressBar = ref(null);
    ref(null);
    ref(null);
    const selectedLettersContainer = ref(null);
    const getNextEmptyIndex = () => {
      return gameState.value.selectedLetters.findIndex((letter) => !letter);
    };
    const getMaxHints = (wordLength) => {
      if (wordLength <= 3) return 1;
      if (wordLength <= 4) return 2;
      if (wordLength <= 5) return 3;
      return 4;
    };
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
        const maxHints = getMaxHints(gameState.value.currentQuestion.word.length);
        if (gameState.value.hintsUsed >= maxHints) {
          console.log("Maksimum ipucu sayısına ulaşıldı");
          return;
        }
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col items-center justify-center" }, _attrs))} data-v-8c3e0a90>`);
      if (!gameState.value.isPlaying && gameState.value.userResponses.length > 0) {
        _push(`<div class="w-full max-w-2xl rounded-lg border border-base-300 bg-base-100 p-6" data-v-8c3e0a90><div class="mb-4 text-center" data-v-8c3e0a90><h2 class="mb-2 text-xl font-semibold text-base-content" data-v-8c3e0a90>Test Tamamlandı</h2><div class="inline-flex items-center gap-2 rounded bg-base-200 px-3 py-1" data-v-8c3e0a90><span class="text-base-content/70 text-sm" data-v-8c3e0a90>Puan:</span><span class="text-lg font-bold text-base-content" data-v-8c3e0a90>${ssrInterpolate(calculateScore.value)} / 100</span></div></div><div class="mb-4 grid grid-cols-2 gap-4" data-v-8c3e0a90><div class="rounded border border-base-300 bg-base-200 p-3 text-center" data-v-8c3e0a90><div class="mb-1" data-v-8c3e0a90><div class="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-green-100" data-v-8c3e0a90><span class="text-sm font-bold text-green-600" data-v-8c3e0a90>${ssrInterpolate(correctCount.value)}</span></div></div><p class="text-base-content/70 text-xs" data-v-8c3e0a90>Doğru</p></div><div class="rounded border border-base-300 bg-base-200 p-3 text-center" data-v-8c3e0a90><div class="mb-1" data-v-8c3e0a90><div class="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-red-100" data-v-8c3e0a90><span class="text-sm font-bold text-red-600" data-v-8c3e0a90>${ssrInterpolate(incorrectCount.value)}</span></div></div><p class="text-base-content/70 text-xs" data-v-8c3e0a90>Yanlış</p></div></div><div class="mb-4 text-center" data-v-8c3e0a90><div class="inline-flex items-center gap-2 rounded bg-base-200 px-3 py-1" data-v-8c3e0a90><span class="text-base-content/70 text-sm" data-v-8c3e0a90>Toplam Puan:</span><span class="text-lg font-bold text-base-content" data-v-8c3e0a90>${ssrInterpolate(gameState.value.totalPoints)}</span></div></div><div class="mb-4" data-v-8c3e0a90><h3 class="mb-2 text-sm font-medium text-base-content" data-v-8c3e0a90>Cevaplarınız</h3><div class="max-h-48 space-y-2 overflow-y-auto" data-v-8c3e0a90><!--[-->`);
        ssrRenderList(gameState.value.userResponses, (response) => {
          var _a, _b;
          _push(`<div class="flex items-center justify-between rounded border border-base-300 bg-base-200 p-2" data-v-8c3e0a90><div class="flex items-center gap-2" data-v-8c3e0a90><div class="${ssrRenderClass([response.correct ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600", "flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold"])}" data-v-8c3e0a90>${ssrInterpolate(response.correct ? "✓" : "✗")}</div><div class="flex flex-col" data-v-8c3e0a90><span class="text-sm font-medium text-base-content" data-v-8c3e0a90>${ssrInterpolate(((_a = wordsMap.value[response.word_id]) == null ? void 0 : _a.word) || "Unknown")}</span><span class="text-base-content/70 text-xs" data-v-8c3e0a90>${ssrInterpolate(((_b = wordsMap.value[response.word_id]) == null ? void 0 : _b.meaning) || "")}</span>`);
          if (response.correct) {
            _push(`<span class="text-base-content/70 text-xs" data-v-8c3e0a90>${ssrInterpolate(response.points)} puan ${ssrInterpolate(response.hintsUsed > 0 ? `(${response.hintsUsed} ipucu)` : "")}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div><span class="${ssrRenderClass([response.correct ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800", "inline-flex items-center rounded px-2 py-1 text-xs font-medium"])}" data-v-8c3e0a90>${ssrInterpolate(response.correct ? "Doğru" : "Yanlış")}</span></div>`);
        });
        _push(`<!--]--></div></div><div class="space-y-2" data-v-8c3e0a90>`);
        if (hasUser.value) {
          _push(`<button class="w-full rounded border border-base-300 bg-base-content px-4 py-2 text-center text-sm font-medium text-base-100 transition hover:bg-base-300 hover:text-base-content"${ssrIncludeBooleanAttr(isUpdating.value) ? " disabled" : ""} data-v-8c3e0a90>${ssrInterpolate(isUpdating.value ? "Güncelleniyor..." : "İstatistikleri Güncelle")}</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex gap-2" data-v-8c3e0a90><button class="flex-1 rounded border border-base-300 bg-base-content px-4 py-2 text-center text-sm font-medium text-base-100 transition hover:bg-base-300 hover:text-base-content" data-v-8c3e0a90> Pakete Dön </button><button class="flex-1 rounded border border-base-300 px-4 py-2 text-sm font-medium text-base-content transition hover:bg-base-200" data-v-8c3e0a90> Tekrar Başla </button></div></div></div>`);
      } else {
        _push(`<div class="${ssrRenderClass([{
          "bg-base-100": !gameState.value.showAnswer,
          "bg-green-50": gameState.value.showAnswer && gameState.value.isCorrect,
          "bg-red-50": gameState.value.showAnswer && !gameState.value.isCorrect
        }, "relative w-full max-w-2xl rounded-lg border border-base-300 bg-base-100 p-6 transition-colors duration-500"])}" data-v-8c3e0a90><div class="relative mb-4 h-1 w-full overflow-hidden rounded-full bg-base-200" data-v-8c3e0a90><div class="h-full w-0 bg-base-content" data-v-8c3e0a90></div><div class="absolute left-0 top-0 h-full w-[50px] bg-gradient-to-r from-transparent via-white/30 to-transparent" data-v-8c3e0a90></div></div><div class="text-base-content/70 mb-4 flex items-center justify-between text-sm" data-v-8c3e0a90><div data-v-8c3e0a90>Soru ${ssrInterpolate(gameState.value.currentIndex + 1)} / ${ssrInterpolate(gameState.value.totalQuestions)}</div><div class="flex flex-col items-end gap-1" data-v-8c3e0a90><div class="flex items-center gap-2" data-v-8c3e0a90><span class="font-medium text-base-content" data-v-8c3e0a90>${ssrInterpolate(gameState.value.totalPoints)}</span><span data-v-8c3e0a90>toplam puan</span></div><div class="flex items-center gap-2 text-xs" data-v-8c3e0a90><span class="text-base-content/70 font-medium" data-v-8c3e0a90>${ssrInterpolate(currentQuestionPoints.value)}</span><span data-v-8c3e0a90>mevcut soru puanı</span></div></div></div>`);
        if (gameState.value.currentQuestion) {
          _push(`<div class="space-y-4" data-v-8c3e0a90><div data-v-8c3e0a90><h2 class="mb-2 text-2xl font-semibold text-base-content" data-v-8c3e0a90>&quot;${ssrInterpolate(gameState.value.currentQuestion.meaning)}&quot;</h2><p class="text-base-content/70 mb-3" data-v-8c3e0a90>Bu kelimenin İngilizce anlamını yazın</p><div class="flex items-center justify-between" data-v-8c3e0a90><span class="inline-flex items-center rounded border border-base-300 bg-base-200 px-2 py-1 text-xs text-base-content" data-v-8c3e0a90>${ssrInterpolate(getWordType(gameState.value.currentQuestion.type))}</span></div></div><div class="space-y-2" data-v-8c3e0a90>`);
          if (gameState.value.currentQuestion && gameState.value.currentQuestion.word) {
            _push(`<div class="flex justify-center space-x-2" data-v-8c3e0a90><!--[-->`);
            ssrRenderList(gameState.value.currentQuestion.word.split(""), (letter, index) => {
              _push(`<div class="${ssrRenderClass([{
                "border-base-300 bg-base-100": !gameState.value.selectedLetters[index],
                "border-base-content bg-base-200": !gameState.value.selectedLetters[index] && index === getNextEmptyIndex(),
                "border-green-500 bg-green-50": gameState.value.showAnswer && gameState.value.isCorrect,
                "border-red-500 bg-red-50": gameState.value.showAnswer && !gameState.value.isCorrect,
                "border-blue-500": gameState.value.hintLetterIndices.includes(index) && !gameState.value.isHintAnimating
              }, "flex h-12 w-12 items-center justify-center rounded border text-xl font-semibold transition-all"])}" data-v-8c3e0a90>`);
              if (gameState.value.maskedIndices.includes(index)) {
                _push(`<span class="${ssrRenderClass({ "text-blue-600": gameState.value.hintLetterIndices.includes(index) })}" data-v-8c3e0a90>${ssrInterpolate(gameState.value.selectedLetters[index] || "")}</span>`);
              } else {
                _push(`<!--[-->${ssrInterpolate(letter.toLowerCase())}<!--]-->`);
              }
              _push(`</div>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<div class="text-base-content/70 text-center" data-v-8c3e0a90><p data-v-8c3e0a90>Harf kutuları yükleniyor...</p></div>`);
          }
          if (gameState.value.showAnswer && !gameState.value.isCorrect) {
            _push(`<div class="flex justify-center space-x-2" data-v-8c3e0a90><!--[-->`);
            ssrRenderList(gameState.value.currentQuestion.word.split(""), (letter, index) => {
              _push(`<div class="flex h-8 w-8 items-center justify-center rounded border border-green-500 bg-green-50 text-sm font-medium text-green-700" data-v-8c3e0a90>${ssrInterpolate(letter.toLowerCase())}</div>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><button${ssrIncludeBooleanAttr(gameState.value.showAnswer || !isAnswerComplete.value) ? " disabled" : ""} class="w-full rounded border border-base-300 bg-base-content px-4 py-2 text-center text-sm font-medium text-base-100 transition hover:bg-base-300 hover:text-base-content disabled:opacity-50" data-v-8c3e0a90> Kontrol Et </button></div>`);
        } else {
          _push(`<!---->`);
        }
        if (showVirtualKeyboard.value) {
          _push(`<div class="mt-4" data-v-8c3e0a90><div class="flex flex-col gap-1 rounded border border-base-300 bg-base-200 p-2" data-v-8c3e0a90><div class="flex gap-1" data-v-8c3e0a90><!--[-->`);
          ssrRenderList(["q", "w", "e", "r", "t", "y", "u", "ı", "o", "p", "ğ", "ü"], (letter) => {
            _push(`<button class="flex h-10 w-10 items-center justify-center rounded bg-base-100 text-sm font-medium text-base-content transition hover:bg-base-300 active:bg-base-content active:text-base-100" data-v-8c3e0a90>${ssrInterpolate(letter)}</button>`);
          });
          _push(`<!--]--></div><div class="flex gap-1" data-v-8c3e0a90><!--[-->`);
          ssrRenderList(["a", "s", "d", "f", "g", "h", "j", "k", "l", "ş", "i"], (letter) => {
            _push(`<button class="flex h-10 w-10 items-center justify-center rounded bg-base-100 text-sm font-medium text-base-content transition hover:bg-base-300 active:bg-base-content active:text-base-100" data-v-8c3e0a90>${ssrInterpolate(letter)}</button>`);
          });
          _push(`<!--]--></div><div class="flex gap-1" data-v-8c3e0a90><!--[-->`);
          ssrRenderList(["z", "x", "c", "v", "b", "n", "m", "ö", "ç"], (letter) => {
            _push(`<button class="flex h-10 w-10 items-center justify-center rounded bg-base-100 text-sm font-medium text-base-content transition hover:bg-base-300 active:bg-base-content active:text-base-100" data-v-8c3e0a90>${ssrInterpolate(letter)}</button>`);
          });
          _push(`<!--]--></div><div class="flex gap-1" data-v-8c3e0a90><button class="flex h-10 flex-1 items-center justify-center rounded bg-base-100 text-sm font-medium text-base-content transition hover:bg-base-300 active:bg-base-content active:text-base-100" data-v-8c3e0a90> ← </button><button class="flex h-10 flex-1 items-center justify-center rounded bg-base-content text-sm font-medium text-base-100 transition hover:bg-base-300 hover:text-base-content" data-v-8c3e0a90> İpucu </button></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (!showVirtualKeyboard.value) {
          _push(`<button class="mt-4 flex w-full items-center justify-center gap-2 rounded border border-base-300 bg-base-100 px-4 py-2 text-sm font-medium text-base-content transition hover:bg-base-200" data-v-8c3e0a90><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" data-v-8c3e0a90><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm-1-5a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1zm0-4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" data-v-8c3e0a90></path></svg> Klavyeyi Aç </button>`);
        } else {
          _push(`<button class="mt-4 flex w-full items-center justify-center gap-2 rounded border border-base-300 bg-base-100 px-4 py-2 text-sm font-medium text-base-content transition hover:bg-base-200" data-v-8c3e0a90><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" data-v-8c3e0a90><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" data-v-8c3e0a90></path></svg> Klavyeyi Kapat </button>`);
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
const WordCompletion = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8c3e0a90"]]);
export {
  WordCompletion as default
};
