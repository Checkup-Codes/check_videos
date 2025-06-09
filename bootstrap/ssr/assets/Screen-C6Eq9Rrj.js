import { ref, computed, watch, onMounted, withCtx, unref, createTextVNode, createVNode, createBlock, createCommentVNode, toDisplayString, openBlock, withDirectives, withKeys, vModelText, Transition, Fragment, renderList, vModelRadio, vModelCheckbox, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderClass, ssrLooseEqual, ssrLooseContain } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-G62taWZ6.js";
import MultipleChoice from "./MultipleChoice-BophYkI2.js";
import TranslateWord from "./TranslateWord-C4JdrgjX.js";
import WordCompletion from "./WordCompletion-Bj79DoxH.js";
import { _ as _export_sfc } from "../ssr.js";
import "gsap";
import "axios";
import "@fortawesome/vue-fontawesome";
import "vuex";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  props: {
    words: Array,
    pack: Object,
    error: String,
    screen: Object
  },
  setup(__props) {
    const props = __props;
    const isLoading = ref(false);
    const isLoggedIn = computed(() => {
      var _a;
      return !!((_a = usePage().props.auth) == null ? void 0 : _a.user);
    });
    const showGameInterface = ref(false);
    const currentGame = ref("");
    const loadingGame = ref(false);
    const prioritizeUnlearned = ref(true);
    const searchQuery = ref("");
    const filterType = ref("");
    const filterStatus = ref("");
    const currentPage = ref(1);
    const perPage = ref(10);
    const getPackSlugFromUrl = () => {
      const path = window.location.pathname;
      const segments = path.split("/");
      return segments[segments.length - 1];
    };
    const gameConfig = ref({
      questionCount: 10,
      prioritizeUnlearned: false,
      prioritizeRecentlyLearned: false,
      prioritizeFlagged: false,
      prioritizeMostIncorrect: false,
      prioritizeOldestUpdated: false,
      wordType: "",
      learningStatus: "",
      difficultyLevel: ""
    });
    const filteredWordList = computed(() => {
      if (!props.words) return [];
      let result = [...props.words];
      if (searchQuery.value.trim()) {
        const query = searchQuery.value.toLowerCase().trim();
        result = result.filter(
          (word) => word.word.toLowerCase().includes(query) || word.meaning.toLowerCase().includes(query)
        );
      }
      if (filterType.value) {
        result = result.filter((word) => word.type === filterType.value);
      }
      if (filterStatus.value !== "") {
        const status = parseInt(filterStatus.value);
        result = result.filter((word) => word.learning_status === status);
      }
      return result;
    });
    const displayedWords = computed(() => {
      const startIndex = (currentPage.value - 1) * perPage.value;
      return sortedWords.value.slice(startIndex, startIndex + perPage.value);
    });
    const totalPages = computed(() => {
      return Math.ceil(sortedWords.value.length / perPage.value);
    });
    const paginationInfo = computed(() => {
      const start = (currentPage.value - 1) * perPage.value + 1;
      const end = Math.min(start + perPage.value - 1, sortedWords.value.length);
      return `${start}-${end} / ${sortedWords.value.length}`;
    });
    const changePage = (page) => {
      if (page < 1 || page > totalPages.value) return;
      currentPage.value = page;
    };
    const filterWords = () => {
      isLoading.value = true;
      currentPage.value = 1;
      setTimeout(() => {
        isLoading.value = false;
      }, 300);
    };
    const filteredWords = computed(() => {
      if (!props.words) return [];
      let wordsToUse = [...props.words];
      if (gameConfig.value.wordType) {
        wordsToUse = wordsToUse.filter((word) => word.type === gameConfig.value.wordType);
      }
      if (gameConfig.value.learningStatus !== "") {
        wordsToUse = wordsToUse.filter((word) => word.learning_status === parseInt(gameConfig.value.learningStatus));
      }
      if (gameConfig.value.difficultyLevel) {
        wordsToUse = wordsToUse.filter((word) => word.difficulty_level === gameConfig.value.difficultyLevel);
      }
      if (gameConfig.value.prioritizeRecentlyLearned) {
        wordsToUse.sort((a, b) => {
          const aDate = new Date(a.last_reviewed_at || 0);
          const bDate = new Date(b.last_reviewed_at || 0);
          return bDate - aDate;
        });
      }
      if (gameConfig.value.prioritizeFlagged) {
        wordsToUse.sort((a, b) => {
          if (a.is_flagged && !b.is_flagged) return -1;
          if (!a.is_flagged && b.is_flagged) return 1;
          return 0;
        });
      }
      if (gameConfig.value.prioritizeMostIncorrect) {
        wordsToUse.sort((a, b) => {
          const aIncorrect = a.incorrect_count || 0;
          const bIncorrect = b.incorrect_count || 0;
          return bIncorrect - aIncorrect;
        });
      }
      if (gameConfig.value.prioritizeOldestUpdated) {
        wordsToUse.sort((a, b) => {
          const aNeverReviewed = !a.review_count || a.review_count === 0 || !a.last_reviewed_at;
          const bNeverReviewed = !b.review_count || b.review_count === 0 || !b.last_reviewed_at;
          if (aNeverReviewed && bNeverReviewed) return 0;
          if (aNeverReviewed) return -1;
          if (bNeverReviewed) return 1;
          const aDate = new Date(a.last_reviewed_at);
          const bDate = new Date(b.last_reviewed_at);
          return aDate - bDate;
        });
      }
      if (prioritizeUnlearned.value) {
        wordsToUse.sort((a, b) => {
          return (a.learning_status || 0) - (b.learning_status || 0);
        });
      }
      wordsToUse = wordsToUse.sort(() => Math.random() - 0.5);
      return wordsToUse.slice(0, parseInt(gameConfig.value.questionCount));
    });
    const wordCounts = computed(() => {
      if (!props.words) return { types: {}, status: {}, difficulty: {} };
      const counts = {
        types: {},
        status: {},
        difficulty: {}
      };
      props.words.forEach((word) => {
        counts.types[word.type] = (counts.types[word.type] || 0) + 1;
        counts.status[word.learning_status] = (counts.status[word.learning_status] || 0) + 1;
        counts.difficulty[word.difficulty_level] = (counts.difficulty[word.difficulty_level] || 0) + 1;
      });
      return counts;
    });
    const hasEnoughWords = (count) => {
      return count >= 5;
    };
    const startGame = (gameType) => {
      var _a, _b, _c, _d;
      let filteredCount = ((_a = props.words) == null ? void 0 : _a.length) || 0;
      if (gameConfig.value.wordType) {
        filteredCount = ((_b = props.words) == null ? void 0 : _b.filter((word) => word.type === gameConfig.value.wordType).length) || 0;
      }
      if (gameConfig.value.learningStatus !== "") {
        filteredCount = ((_c = props.words) == null ? void 0 : _c.filter((word) => word.learning_status === parseInt(gameConfig.value.learningStatus)).length) || 0;
      }
      if (gameConfig.value.difficultyLevel) {
        filteredCount = ((_d = props.words) == null ? void 0 : _d.filter((word) => word.difficulty_level === gameConfig.value.difficultyLevel).length) || 0;
      }
      if (!hasEnoughWords(filteredCount)) {
        alert("Seçili kategoride yeterli kelime bulunmamaktadır. En az 5 kelime gereklidir.");
        return;
      }
      loadingGame.value = true;
      currentGame.value = gameType;
      showGameInterface.value = true;
      setTimeout(() => {
        loadingGame.value = false;
      }, 500);
    };
    const handleGameComplete = () => {
      showGameInterface.value = false;
      currentGame.value = "";
    };
    const queryParams = computed(() => {
      const params = new URLSearchParams(window.location.search);
      return {
        game: params.get("game") || null
      };
    });
    const truncateText = (text, length) => {
      if (!text) return "";
      return text.length > length ? text.substring(0, length) + "..." : text;
    };
    const getDifficultyLabel = (level) => {
      switch (Number(level)) {
        case 1:
          return "Kolay";
        case 2:
          return "Orta";
        case 3:
          return "Zor";
        case 4:
          return "Çok Zor";
        default:
          return "Belirsiz";
      }
    };
    const getLearningStatusBadgeClass = (status) => {
      switch (Number(status)) {
        case 0:
          return "badge-ghost";
        case 1:
          return "badge-warning";
        case 2:
          return "badge-success";
        default:
          return "badge-ghost";
      }
    };
    const getLearningStatusLabel = (status) => {
      switch (Number(status)) {
        case 0:
          return "Öğrenilmedi";
        case 1:
          return "Öğreniliyor";
        case 2:
          return "Öğrenildi";
        default:
          return "Belirsiz";
      }
    };
    const calculateSuccessRate = (word) => {
      const totalShows = word.review_count || 0;
      const incorrectCount = word.incorrect_count || 0;
      if (totalShows === 0) return { rate: 0, label: "Hiç" };
      const successRate = (totalShows - incorrectCount) / totalShows * 100;
      return {
        rate: Math.round(successRate),
        label: `%${Math.round(successRate)}`
      };
    };
    const getSuccessRateBadgeClass = (rate) => {
      if (rate === 0) return "badge-ghost";
      if (rate >= 80) return "badge-success";
      if (rate >= 60) return "badge-info";
      if (rate >= 40) return "badge-warning";
      return "badge-error";
    };
    watch([searchQuery, filterType, filterStatus], () => {
      if (searchQuery.value.length > 2 || searchQuery.value.length === 0) {
        filterWords();
      }
    });
    onMounted(() => {
      const gameParam = queryParams.value.game;
      if (gameParam) {
        startGame(gameParam);
      }
    });
    const getPrimaryMeaning = (word) => {
      if (word.meanings && word.meanings.length > 0) {
        const primaryMeaning = word.meanings.find((m) => m.is_primary);
        if (primaryMeaning) {
          return truncateText(primaryMeaning.meaning, 50);
        }
        return truncateText(word.meanings[0].meaning, 50);
      }
      return word.meaning ? truncateText(word.meaning, 50) : "";
    };
    const sortState = ref({
      type: "none",
      // 'none', 'asc', 'desc'
      success: "none"
    });
    const sortTable = (column) => {
      if (sortState.value[column] === "none") {
        sortState.value[column] = "asc";
      } else if (sortState.value[column] === "asc") {
        sortState.value[column] = "desc";
      } else {
        sortState.value[column] = "none";
      }
      const otherColumn = column === "type" ? "success" : "type";
      sortState.value[otherColumn] = "none";
    };
    const sortedWords = computed(() => {
      let result = [...filteredWordList.value];
      if (sortState.value.type !== "none") {
        result.sort((a, b) => {
          const comparison = a.type.localeCompare(b.type);
          return sortState.value.type === "asc" ? comparison : -comparison;
        });
      }
      if (sortState.value.success !== "none") {
        result.sort((a, b) => {
          const aRate = calculateSuccessRate(a).rate;
          const bRate = calculateSuccessRate(b).rate;
          return sortState.value.success === "asc" ? aRate - bRate : bRate - aRate;
        });
      }
      return result;
    });
    const getWordTypeLabel = (type) => {
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
          return type;
      }
    };
    const resetGameConfig = () => {
      gameConfig.value = {
        questionCount: 10,
        prioritizeUnlearned: false,
        prioritizeRecentlyLearned: false,
        prioritizeFlagged: false,
        prioritizeMostIncorrect: false,
        prioritizeOldestUpdated: false,
        wordType: "",
        learningStatus: "",
        difficultyLevel: ""
      };
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
          if (_push2) {
            _push2(`<div class="px-5 transition-all duration-200 dark:border-gray-700 dark:bg-base-100" data-v-ef32fef4${_scopeId}><div class="mb-4 flex items-center justify-between" data-v-ef32fef4${_scopeId}><div class="flex-1" data-v-ef32fef4${_scopeId}><h1 class="p-5 text-2xl font-bold" data-v-ef32fef4${_scopeId}>${ssrInterpolate(((_a = props.pack) == null ? void 0 : _a.name) || "Kelimeler")} <span class="badge badge-outline ml-2" data-v-ef32fef4${_scopeId}>${ssrInterpolate(((_b = props.words) == null ? void 0 : _b.length) || 0)} kelime</span></h1></div><div class="flex gap-2" data-v-ef32fef4${_scopeId}>`);
            if (isLoggedIn.value && props.pack) {
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("rendition.language-packs.edit", props.pack.id),
                class: "btn btn-outline btn-sm"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Paketi Düzenle `);
                  } else {
                    return [
                      createTextVNode(" Paketi Düzenle ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (isLoggedIn.value) {
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("rendition.words.create"),
                class: "btn btn-primary btn-sm"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Yeni Kelime `);
                  } else {
                    return [
                      createTextVNode(" Yeni Kelime ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            if (!showGameInterface.value) {
              _push2(`<div class="mb-4 flex flex-wrap gap-3" data-v-ef32fef4${_scopeId}><div class="form-control min-w-[200px] flex-1" data-v-ef32fef4${_scopeId}><div class="input-group" data-v-ef32fef4${_scopeId}><input type="text"${ssrRenderAttr("value", searchQuery.value)} placeholder="Kelime ara..." class="input-bordered input input-sm w-52" data-v-ef32fef4${_scopeId}><button class="btn btn-sm btn-square mx-5" data-v-ef32fef4${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ef32fef4${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" data-v-ef32fef4${_scopeId}></path></svg></button></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (showGameInterface.value) {
              _push2(`<div class="my-20" data-v-ef32fef4${_scopeId}>`);
              if (loadingGame.value) {
                _push2(`<div class="flex h-60 items-center justify-center" data-v-ef32fef4${_scopeId}><span class="loading loading-spinner loading-lg" data-v-ef32fef4${_scopeId}></span></div>`);
              } else if (currentGame.value === "multiple-choice") {
                _push2(ssrRenderComponent(MultipleChoice, {
                  gameType: currentGame.value,
                  packSlug: ((_c = props.pack) == null ? void 0 : _c.slug) || getPackSlugFromUrl(),
                  words: filteredWords.value,
                  gameConfig: gameConfig.value,
                  onGameCompleted: handleGameComplete
                }, null, _parent2, _scopeId));
              } else if (currentGame.value === "fill-in-the-blank") {
                _push2(ssrRenderComponent(TranslateWord, {
                  gameType: currentGame.value,
                  packSlug: ((_d = props.pack) == null ? void 0 : _d.slug) || getPackSlugFromUrl(),
                  words: filteredWords.value,
                  gameConfig: gameConfig.value,
                  onGameCompleted: handleGameComplete
                }, null, _parent2, _scopeId));
              } else if (currentGame.value === "word-completion") {
                _push2(ssrRenderComponent(WordCompletion, {
                  gameType: currentGame.value,
                  packSlug: ((_e = props.pack) == null ? void 0 : _e.slug) || getPackSlugFromUrl(),
                  words: filteredWords.value,
                  gameConfig: gameConfig.value,
                  onGameCompleted: handleGameComplete
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<div data-v-ef32fef4${_scopeId}><div class="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm" data-v-ef32fef4${_scopeId}><div class="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3" data-v-ef32fef4${_scopeId}><button class="group relative flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-blue-500 hover:shadow-md"${ssrIncludeBooleanAttr(!hasEnoughWords) ? " disabled" : ""} data-v-ef32fef4${_scopeId}><div class="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-500 transition-all group-hover:bg-blue-100" data-v-ef32fef4${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ef32fef4${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" data-v-ef32fef4${_scopeId}></path></svg></div><div class="text-left" data-v-ef32fef4${_scopeId}><h3 class="font-medium text-gray-900" data-v-ef32fef4${_scopeId}>Çoktan Seçmeli</h3><p class="text-sm text-gray-500" data-v-ef32fef4${_scopeId}>Doğru cevabı seçin</p></div></button><button class="group relative flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-green-500 hover:shadow-md"${ssrIncludeBooleanAttr(!hasEnoughWords) ? " disabled" : ""} data-v-ef32fef4${_scopeId}><div class="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-500 transition-all group-hover:bg-green-100" data-v-ef32fef4${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ef32fef4${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-ef32fef4${_scopeId}></path></svg></div><div class="text-left" data-v-ef32fef4${_scopeId}><h3 class="font-medium text-gray-900" data-v-ef32fef4${_scopeId}>Boşluk Doldurma</h3><p class="text-sm text-gray-500" data-v-ef32fef4${_scopeId}>Eksik kelimeyi yazın</p></div></button><button class="group relative flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-purple-500 hover:shadow-md"${ssrIncludeBooleanAttr(!hasEnoughWords) ? " disabled" : ""} data-v-ef32fef4${_scopeId}><div class="flex h-12 w-12 items-center justify-center rounded-full bg-purple-50 text-purple-500 transition-all group-hover:bg-purple-100" data-v-ef32fef4${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ef32fef4${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" data-v-ef32fef4${_scopeId}></path></svg></div><div class="text-left" data-v-ef32fef4${_scopeId}><h3 class="font-medium text-gray-900" data-v-ef32fef4${_scopeId}>Kelime Tamamlama</h3><p class="text-sm text-gray-500" data-v-ef32fef4${_scopeId}>Eksik harfleri tamamlayın</p></div></button></div>`);
              if (isLoggedIn.value) {
                _push2(`<div class="collapse" data-v-ef32fef4${_scopeId}><input type="checkbox" class="peer" data-v-ef32fef4${_scopeId}><div class="collapse-title text-sm font-medium text-gray-700" data-v-ef32fef4${_scopeId}> Oyun Ayarları ve Filtreler <span class="ml-2 text-xs text-gray-500" data-v-ef32fef4${_scopeId}>(Varsayılan: Rastgele)</span></div><div class="collapse-content" data-v-ef32fef4${_scopeId}><div class="space-y-4" data-v-ef32fef4${_scopeId}><div class="flex justify-end" data-v-ef32fef4${_scopeId}><button class="btn btn-ghost btn-sm" data-v-ef32fef4${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ef32fef4${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" data-v-ef32fef4${_scopeId}></path></svg> Ayarları Sıfırla </button></div><div class="form-control" data-v-ef32fef4${_scopeId}><label class="label" data-v-ef32fef4${_scopeId}><span class="label-text font-medium" data-v-ef32fef4${_scopeId}>Kelime Türü</span></label><div class="flex flex-wrap gap-2" data-v-ef32fef4${_scopeId}><!--[-->`);
                ssrRenderList(wordCounts.value.types, (count, type) => {
                  _push2(`<label class="${ssrRenderClass([{
                    "btn-primary": gameConfig.value.wordType === type,
                    "cursor-not-allowed opacity-50": !hasEnoughWords(count)
                  }, "btn btn-sm"])}" data-v-ef32fef4${_scopeId}><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(gameConfig.value.wordType, type)) ? " checked" : ""}${ssrRenderAttr("value", type)} class="hidden"${ssrIncludeBooleanAttr(!hasEnoughWords(count)) ? " disabled" : ""} data-v-ef32fef4${_scopeId}> ${ssrInterpolate(getWordTypeLabel(type))} (${ssrInterpolate(count)}) </label>`);
                });
                _push2(`<!--]--></div></div><div class="form-control" data-v-ef32fef4${_scopeId}><label class="label" data-v-ef32fef4${_scopeId}><span class="label-text font-medium" data-v-ef32fef4${_scopeId}>Öğrenme Durumu</span></label><div class="flex flex-wrap gap-2" data-v-ef32fef4${_scopeId}><!--[-->`);
                ssrRenderList(wordCounts.value.status, (count, status) => {
                  _push2(`<label class="${ssrRenderClass([{
                    "btn-primary": gameConfig.value.learningStatus === status.toString(),
                    "cursor-not-allowed opacity-50": !hasEnoughWords(count)
                  }, "btn btn-sm"])}" data-v-ef32fef4${_scopeId}><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(gameConfig.value.learningStatus, status.toString())) ? " checked" : ""}${ssrRenderAttr("value", status.toString())} class="hidden"${ssrIncludeBooleanAttr(!hasEnoughWords(count)) ? " disabled" : ""} data-v-ef32fef4${_scopeId}> ${ssrInterpolate(getLearningStatusLabel(status))} (${ssrInterpolate(count)}) </label>`);
                });
                _push2(`<!--]--></div></div><div class="form-control" data-v-ef32fef4${_scopeId}><label class="label" data-v-ef32fef4${_scopeId}><span class="label-text font-medium" data-v-ef32fef4${_scopeId}>Zorluk Seviyesi</span></label><div class="flex flex-wrap gap-2" data-v-ef32fef4${_scopeId}><!--[-->`);
                ssrRenderList(wordCounts.value.difficulty, (count, level) => {
                  _push2(`<label class="${ssrRenderClass([{
                    "btn-primary": gameConfig.value.difficultyLevel === level,
                    "cursor-not-allowed opacity-50": !hasEnoughWords(count)
                  }, "btn btn-sm"])}" data-v-ef32fef4${_scopeId}><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(gameConfig.value.difficultyLevel, level)) ? " checked" : ""}${ssrRenderAttr("value", level)} class="hidden"${ssrIncludeBooleanAttr(!hasEnoughWords(count)) ? " disabled" : ""} data-v-ef32fef4${_scopeId}> ${ssrInterpolate(getDifficultyLabel(level))} (${ssrInterpolate(count)}) </label>`);
                });
                _push2(`<!--]--></div></div><div class="divider text-xs text-gray-500" data-v-ef32fef4${_scopeId}>Öncelik Filtreleri</div><div class="grid grid-cols-2 gap-2" data-v-ef32fef4${_scopeId}><label class="flex cursor-pointer items-center justify-between rounded-lg border p-3 hover:bg-gray-50" data-v-ef32fef4${_scopeId}><span class="text-sm" data-v-ef32fef4${_scopeId}>Son Öğrenilenler</span><input type="checkbox" class="toggle toggle-sm"${ssrIncludeBooleanAttr(Array.isArray(gameConfig.value.prioritizeRecentlyLearned) ? ssrLooseContain(gameConfig.value.prioritizeRecentlyLearned, null) : gameConfig.value.prioritizeRecentlyLearned) ? " checked" : ""} data-v-ef32fef4${_scopeId}></label><label class="flex cursor-pointer items-center justify-between rounded-lg border p-3 hover:bg-gray-50" data-v-ef32fef4${_scopeId}><span class="text-sm" data-v-ef32fef4${_scopeId}>İşaretlenenler</span><input type="checkbox" class="toggle toggle-sm"${ssrIncludeBooleanAttr(Array.isArray(gameConfig.value.prioritizeFlagged) ? ssrLooseContain(gameConfig.value.prioritizeFlagged, null) : gameConfig.value.prioritizeFlagged) ? " checked" : ""} data-v-ef32fef4${_scopeId}></label><label class="flex cursor-pointer items-center justify-between rounded-lg border p-3 hover:bg-gray-50" data-v-ef32fef4${_scopeId}><span class="text-sm" data-v-ef32fef4${_scopeId}>En Çok Yanlış Yapılanlar</span><input type="checkbox" class="toggle toggle-sm"${ssrIncludeBooleanAttr(Array.isArray(gameConfig.value.prioritizeMostIncorrect) ? ssrLooseContain(gameConfig.value.prioritizeMostIncorrect, null) : gameConfig.value.prioritizeMostIncorrect) ? " checked" : ""} data-v-ef32fef4${_scopeId}></label><label class="flex cursor-pointer items-center justify-between rounded-lg border p-3 hover:bg-gray-50" data-v-ef32fef4${_scopeId}><span class="text-sm" data-v-ef32fef4${_scopeId}>En Eski Güncellenenler</span><input type="checkbox" class="toggle toggle-sm"${ssrIncludeBooleanAttr(Array.isArray(gameConfig.value.prioritizeOldestUpdated) ? ssrLooseContain(gameConfig.value.prioritizeOldestUpdated, null) : gameConfig.value.prioritizeOldestUpdated) ? " checked" : ""} data-v-ef32fef4${_scopeId}></label><label class="flex cursor-pointer items-center justify-between rounded-lg border p-3 hover:bg-gray-50" data-v-ef32fef4${_scopeId}><span class="text-sm" data-v-ef32fef4${_scopeId}>Soru Sayısı</span><select class="select-bordered select select-sm w-24" data-v-ef32fef4${_scopeId}>`);
                if (((_f = props.words) == null ? void 0 : _f.length) < 50) {
                  _push2(`<option${ssrRenderAttr("value", (_g = props.words) == null ? void 0 : _g.length)} data-v-ef32fef4${_scopeId}> Tüm Paket (${ssrInterpolate((_h = props.words) == null ? void 0 : _h.length)}) </option>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<option value="5" data-v-ef32fef4${ssrIncludeBooleanAttr(Array.isArray(gameConfig.value.questionCount) ? ssrLooseContain(gameConfig.value.questionCount, "5") : ssrLooseEqual(gameConfig.value.questionCount, "5")) ? " selected" : ""}${_scopeId}>5</option><option value="10" data-v-ef32fef4${ssrIncludeBooleanAttr(Array.isArray(gameConfig.value.questionCount) ? ssrLooseContain(gameConfig.value.questionCount, "10") : ssrLooseEqual(gameConfig.value.questionCount, "10")) ? " selected" : ""}${_scopeId}>10</option><option value="15" data-v-ef32fef4${ssrIncludeBooleanAttr(Array.isArray(gameConfig.value.questionCount) ? ssrLooseContain(gameConfig.value.questionCount, "15") : ssrLooseEqual(gameConfig.value.questionCount, "15")) ? " selected" : ""}${_scopeId}>15</option><option value="20" data-v-ef32fef4${ssrIncludeBooleanAttr(Array.isArray(gameConfig.value.questionCount) ? ssrLooseContain(gameConfig.value.questionCount, "20") : ssrLooseEqual(gameConfig.value.questionCount, "20")) ? " selected" : ""}${_scopeId}>20</option><option value="25" data-v-ef32fef4${ssrIncludeBooleanAttr(Array.isArray(gameConfig.value.questionCount) ? ssrLooseContain(gameConfig.value.questionCount, "25") : ssrLooseEqual(gameConfig.value.questionCount, "25")) ? " selected" : ""}${_scopeId}>25</option></select></label></div></div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="overflow-x-auto" data-v-ef32fef4${_scopeId}><table class="table table-zebra" data-v-ef32fef4${_scopeId}><thead data-v-ef32fef4${_scopeId}><tr data-v-ef32fef4${_scopeId}><th data-v-ef32fef4${_scopeId}>Kelime</th><th data-v-ef32fef4${_scopeId}>Anlam</th><th data-v-ef32fef4${_scopeId}><div class="flex items-center gap-2" data-v-ef32fef4${_scopeId}> Tür <button class="${ssrRenderClass([{
                "text-primary": sortState.value.type !== "none",
                "opacity-50": sortState.value.type === "none"
              }, "btn btn-ghost btn-xs"])}" data-v-ef32fef4${_scopeId}>`);
              if (sortState.value.type === "none") {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ef32fef4${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" data-v-ef32fef4${_scopeId}></path></svg>`);
              } else if (sortState.value.type === "asc") {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ef32fef4${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" data-v-ef32fef4${_scopeId}></path></svg>`);
              } else {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ef32fef4${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-ef32fef4${_scopeId}></path></svg>`);
              }
              _push2(`</button></div></th><th data-v-ef32fef4${_scopeId}>Durum</th><th data-v-ef32fef4${_scopeId}><div class="flex items-center gap-2" data-v-ef32fef4${_scopeId}> Başarı <button class="${ssrRenderClass([{
                "text-primary": sortState.value.success !== "none",
                "opacity-50": sortState.value.success === "none"
              }, "btn btn-ghost btn-xs"])}" data-v-ef32fef4${_scopeId}>`);
              if (sortState.value.success === "none") {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ef32fef4${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" data-v-ef32fef4${_scopeId}></path></svg>`);
              } else if (sortState.value.success === "asc") {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ef32fef4${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" data-v-ef32fef4${_scopeId}></path></svg>`);
              } else {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ef32fef4${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-ef32fef4${_scopeId}></path></svg>`);
              }
              _push2(`</button></div></th>`);
              if (isLoggedIn.value) {
                _push2(`<th data-v-ef32fef4${_scopeId}></th>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</tr></thead><tbody data-v-ef32fef4${_scopeId}>`);
              if (isLoading.value) {
                _push2(`<tr data-v-ef32fef4${_scopeId}><td colspan="6" class="text-center" data-v-ef32fef4${_scopeId}><span class="loading loading-spinner loading-md" data-v-ef32fef4${_scopeId}></span></td></tr>`);
              } else if (displayedWords.value.length === 0) {
                _push2(`<tr data-v-ef32fef4${_scopeId}><td colspan="6" class="text-center" data-v-ef32fef4${_scopeId}>Sonuç bulunamadı</td></tr>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--[-->`);
              ssrRenderList(displayedWords.value, (word) => {
                _push2(`<tr data-v-ef32fef4${_scopeId}><td class="font-medium" data-v-ef32fef4${_scopeId}>${ssrInterpolate(word.word)}</td><td data-v-ef32fef4${_scopeId}>${ssrInterpolate(getPrimaryMeaning(word))}</td><td data-v-ef32fef4${_scopeId}><div class="badge" data-v-ef32fef4${_scopeId}>${ssrInterpolate(word.type)}</div></td><td data-v-ef32fef4${_scopeId}><div class="${ssrRenderClass([getLearningStatusBadgeClass(word.learning_status), "badge badge-sm"])}" data-v-ef32fef4${_scopeId}>${ssrInterpolate(getLearningStatusLabel(word.learning_status))}</div></td><td data-v-ef32fef4${_scopeId}><div class="${ssrRenderClass([getSuccessRateBadgeClass(calculateSuccessRate(word).rate), "badge badge-sm"])}" data-v-ef32fef4${_scopeId}>${ssrInterpolate(calculateSuccessRate(word).label)}</div></td>`);
                if (isLoggedIn.value) {
                  _push2(`<td data-v-ef32fef4${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(Link), {
                    href: _ctx.route("rendition.words.edit", word.id),
                    class: "btn btn-ghost btn-xs"
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(` Düzenle `);
                      } else {
                        return [
                          createTextVNode(" Düzenle ")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                  _push2(`</td>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</tr>`);
              });
              _push2(`<!--]--></tbody></table></div>`);
              if (sortedWords.value.length > perPage.value) {
                _push2(`<div class="mt-4 flex justify-between" data-v-ef32fef4${_scopeId}><div data-v-ef32fef4${_scopeId}><span class="text-sm opacity-70" data-v-ef32fef4${_scopeId}>${ssrInterpolate(paginationInfo.value)}</span></div><div class="join" data-v-ef32fef4${_scopeId}><button class="btn btn-sm join-item"${ssrIncludeBooleanAttr(currentPage.value <= 1) ? " disabled" : ""} data-v-ef32fef4${_scopeId}> « </button><button class="btn btn-sm join-item" data-v-ef32fef4${_scopeId}>${ssrInterpolate(currentPage.value)}</button><button class="btn btn-sm join-item"${ssrIncludeBooleanAttr(currentPage.value >= totalPages.value) ? " disabled" : ""} data-v-ef32fef4${_scopeId}> » </button></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (((_i = props.words) == null ? void 0 : _i.length) === 0) {
                _push2(`<div class="alert alert-info mt-6" data-v-ef32fef4${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current" data-v-ef32fef4${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-ef32fef4${_scopeId}></path></svg><span data-v-ef32fef4${_scopeId}>Bu pakette kelime bulunmamaktadır.</span></div>`);
              } else if (!hasEnoughWords) {
                _push2(`<div class="alert alert-warning mt-6" data-v-ef32fef4${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current" data-v-ef32fef4${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" data-v-ef32fef4${_scopeId}></path></svg><span data-v-ef32fef4${_scopeId}>Oyunları başlatabilmek için en az 5 kelime gerekiyor.</span></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "px-5 transition-all duration-200 dark:border-gray-700 dark:bg-base-100" }, [
                createVNode("div", { class: "mb-4 flex items-center justify-between" }, [
                  createVNode("div", { class: "flex-1" }, [
                    createVNode("h1", { class: "p-5 text-2xl font-bold" }, [
                      createTextVNode(toDisplayString(((_j = props.pack) == null ? void 0 : _j.name) || "Kelimeler") + " ", 1),
                      createVNode("span", { class: "badge badge-outline ml-2" }, toDisplayString(((_k = props.words) == null ? void 0 : _k.length) || 0) + " kelime", 1)
                    ])
                  ]),
                  createVNode("div", { class: "flex gap-2" }, [
                    isLoggedIn.value && props.pack ? (openBlock(), createBlock(unref(Link), {
                      key: 0,
                      href: _ctx.route("rendition.language-packs.edit", props.pack.id),
                      class: "btn btn-outline btn-sm"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Paketi Düzenle ")
                      ]),
                      _: 1
                    }, 8, ["href"])) : createCommentVNode("", true),
                    isLoggedIn.value ? (openBlock(), createBlock(unref(Link), {
                      key: 1,
                      href: _ctx.route("rendition.words.create"),
                      class: "btn btn-primary btn-sm"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Yeni Kelime ")
                      ]),
                      _: 1
                    }, 8, ["href"])) : createCommentVNode("", true)
                  ])
                ]),
                !showGameInterface.value ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "mb-4 flex flex-wrap gap-3"
                }, [
                  createVNode("div", { class: "form-control min-w-[200px] flex-1" }, [
                    createVNode("div", { class: "input-group" }, [
                      withDirectives(createVNode("input", {
                        type: "text",
                        "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                        placeholder: "Kelime ara...",
                        class: "input-bordered input input-sm w-52",
                        onKeyup: withKeys(filterWords, ["enter"])
                      }, null, 40, ["onUpdate:modelValue"]), [
                        [vModelText, searchQuery.value]
                      ]),
                      createVNode("button", {
                        class: "btn btn-sm btn-square mx-5",
                        onClick: filterWords
                      }, [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          class: "h-4 w-4",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          })
                        ]))
                      ])
                    ])
                  ])
                ])) : createCommentVNode("", true),
                createVNode(Transition, {
                  name: "game-transition",
                  mode: "out-in"
                }, {
                  default: withCtx(() => {
                    var _a2, _b2, _c2, _d2, _e2, _f2, _g2;
                    return [
                      showGameInterface.value ? (openBlock(), createBlock("div", {
                        key: "game",
                        class: "my-20"
                      }, [
                        loadingGame.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex h-60 items-center justify-center"
                        }, [
                          createVNode("span", { class: "loading loading-spinner loading-lg" })
                        ])) : currentGame.value === "multiple-choice" ? (openBlock(), createBlock(MultipleChoice, {
                          key: 1,
                          gameType: currentGame.value,
                          packSlug: ((_a2 = props.pack) == null ? void 0 : _a2.slug) || getPackSlugFromUrl(),
                          words: filteredWords.value,
                          gameConfig: gameConfig.value,
                          onGameCompleted: handleGameComplete
                        }, null, 8, ["gameType", "packSlug", "words", "gameConfig"])) : currentGame.value === "fill-in-the-blank" ? (openBlock(), createBlock(TranslateWord, {
                          key: 2,
                          gameType: currentGame.value,
                          packSlug: ((_b2 = props.pack) == null ? void 0 : _b2.slug) || getPackSlugFromUrl(),
                          words: filteredWords.value,
                          gameConfig: gameConfig.value,
                          onGameCompleted: handleGameComplete
                        }, null, 8, ["gameType", "packSlug", "words", "gameConfig"])) : currentGame.value === "word-completion" ? (openBlock(), createBlock(WordCompletion, {
                          key: 3,
                          gameType: currentGame.value,
                          packSlug: ((_c2 = props.pack) == null ? void 0 : _c2.slug) || getPackSlugFromUrl(),
                          words: filteredWords.value,
                          gameConfig: gameConfig.value,
                          onGameCompleted: handleGameComplete
                        }, null, 8, ["gameType", "packSlug", "words", "gameConfig"])) : createCommentVNode("", true)
                      ])) : (openBlock(), createBlock("div", { key: "wordList" }, [
                        createVNode("div", { class: "mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm" }, [
                          createVNode("div", { class: "mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3" }, [
                            createVNode("button", {
                              onClick: ($event) => startGame("multiple-choice"),
                              class: "group relative flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-blue-500 hover:shadow-md",
                              disabled: !hasEnoughWords
                            }, [
                              createVNode("div", { class: "flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-500 transition-all group-hover:bg-blue-100" }, [
                                (openBlock(), createBlock("svg", {
                                  xmlns: "http://www.w3.org/2000/svg",
                                  class: "h-6 w-6",
                                  fill: "none",
                                  viewBox: "0 0 24 24",
                                  stroke: "currentColor"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    "stroke-width": "2",
                                    d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                  })
                                ]))
                              ]),
                              createVNode("div", { class: "text-left" }, [
                                createVNode("h3", { class: "font-medium text-gray-900" }, "Çoktan Seçmeli"),
                                createVNode("p", { class: "text-sm text-gray-500" }, "Doğru cevabı seçin")
                              ])
                            ], 8, ["onClick", "disabled"]),
                            createVNode("button", {
                              onClick: ($event) => startGame("fill-in-the-blank"),
                              class: "group relative flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-green-500 hover:shadow-md",
                              disabled: !hasEnoughWords
                            }, [
                              createVNode("div", { class: "flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-500 transition-all group-hover:bg-green-100" }, [
                                (openBlock(), createBlock("svg", {
                                  xmlns: "http://www.w3.org/2000/svg",
                                  class: "h-6 w-6",
                                  fill: "none",
                                  viewBox: "0 0 24 24",
                                  stroke: "currentColor"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    "stroke-width": "2",
                                    d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                  })
                                ]))
                              ]),
                              createVNode("div", { class: "text-left" }, [
                                createVNode("h3", { class: "font-medium text-gray-900" }, "Boşluk Doldurma"),
                                createVNode("p", { class: "text-sm text-gray-500" }, "Eksik kelimeyi yazın")
                              ])
                            ], 8, ["onClick", "disabled"]),
                            createVNode("button", {
                              onClick: ($event) => startGame("word-completion"),
                              class: "group relative flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-purple-500 hover:shadow-md",
                              disabled: !hasEnoughWords
                            }, [
                              createVNode("div", { class: "flex h-12 w-12 items-center justify-center rounded-full bg-purple-50 text-purple-500 transition-all group-hover:bg-purple-100" }, [
                                (openBlock(), createBlock("svg", {
                                  xmlns: "http://www.w3.org/2000/svg",
                                  class: "h-6 w-6",
                                  fill: "none",
                                  viewBox: "0 0 24 24",
                                  stroke: "currentColor"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    "stroke-width": "2",
                                    d: "M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                                  })
                                ]))
                              ]),
                              createVNode("div", { class: "text-left" }, [
                                createVNode("h3", { class: "font-medium text-gray-900" }, "Kelime Tamamlama"),
                                createVNode("p", { class: "text-sm text-gray-500" }, "Eksik harfleri tamamlayın")
                              ])
                            ], 8, ["onClick", "disabled"])
                          ]),
                          isLoggedIn.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "collapse"
                          }, [
                            createVNode("input", {
                              type: "checkbox",
                              class: "peer"
                            }),
                            createVNode("div", { class: "collapse-title text-sm font-medium text-gray-700" }, [
                              createTextVNode(" Oyun Ayarları ve Filtreler "),
                              createVNode("span", { class: "ml-2 text-xs text-gray-500" }, "(Varsayılan: Rastgele)")
                            ]),
                            createVNode("div", { class: "collapse-content" }, [
                              createVNode("div", { class: "space-y-4" }, [
                                createVNode("div", { class: "flex justify-end" }, [
                                  createVNode("button", {
                                    onClick: resetGameConfig,
                                    class: "btn btn-ghost btn-sm"
                                  }, [
                                    (openBlock(), createBlock("svg", {
                                      xmlns: "http://www.w3.org/2000/svg",
                                      class: "mr-1 h-4 w-4",
                                      fill: "none",
                                      viewBox: "0 0 24 24",
                                      stroke: "currentColor"
                                    }, [
                                      createVNode("path", {
                                        "stroke-linecap": "round",
                                        "stroke-linejoin": "round",
                                        "stroke-width": "2",
                                        d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                      })
                                    ])),
                                    createTextVNode(" Ayarları Sıfırla ")
                                  ])
                                ]),
                                createVNode("div", { class: "form-control" }, [
                                  createVNode("label", { class: "label" }, [
                                    createVNode("span", { class: "label-text font-medium" }, "Kelime Türü")
                                  ]),
                                  createVNode("div", { class: "flex flex-wrap gap-2" }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(wordCounts.value.types, (count, type) => {
                                      return openBlock(), createBlock("label", {
                                        key: type,
                                        class: ["btn btn-sm", {
                                          "btn-primary": gameConfig.value.wordType === type,
                                          "cursor-not-allowed opacity-50": !hasEnoughWords(count)
                                        }]
                                      }, [
                                        withDirectives(createVNode("input", {
                                          type: "radio",
                                          "onUpdate:modelValue": ($event) => gameConfig.value.wordType = $event,
                                          value: type,
                                          class: "hidden",
                                          disabled: !hasEnoughWords(count)
                                        }, null, 8, ["onUpdate:modelValue", "value", "disabled"]), [
                                          [vModelRadio, gameConfig.value.wordType]
                                        ]),
                                        createTextVNode(" " + toDisplayString(getWordTypeLabel(type)) + " (" + toDisplayString(count) + ") ", 1)
                                      ], 2);
                                    }), 128))
                                  ])
                                ]),
                                createVNode("div", { class: "form-control" }, [
                                  createVNode("label", { class: "label" }, [
                                    createVNode("span", { class: "label-text font-medium" }, "Öğrenme Durumu")
                                  ]),
                                  createVNode("div", { class: "flex flex-wrap gap-2" }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(wordCounts.value.status, (count, status) => {
                                      return openBlock(), createBlock("label", {
                                        key: status,
                                        class: ["btn btn-sm", {
                                          "btn-primary": gameConfig.value.learningStatus === status.toString(),
                                          "cursor-not-allowed opacity-50": !hasEnoughWords(count)
                                        }]
                                      }, [
                                        withDirectives(createVNode("input", {
                                          type: "radio",
                                          "onUpdate:modelValue": ($event) => gameConfig.value.learningStatus = $event,
                                          value: status.toString(),
                                          class: "hidden",
                                          disabled: !hasEnoughWords(count)
                                        }, null, 8, ["onUpdate:modelValue", "value", "disabled"]), [
                                          [vModelRadio, gameConfig.value.learningStatus]
                                        ]),
                                        createTextVNode(" " + toDisplayString(getLearningStatusLabel(status)) + " (" + toDisplayString(count) + ") ", 1)
                                      ], 2);
                                    }), 128))
                                  ])
                                ]),
                                createVNode("div", { class: "form-control" }, [
                                  createVNode("label", { class: "label" }, [
                                    createVNode("span", { class: "label-text font-medium" }, "Zorluk Seviyesi")
                                  ]),
                                  createVNode("div", { class: "flex flex-wrap gap-2" }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(wordCounts.value.difficulty, (count, level) => {
                                      return openBlock(), createBlock("label", {
                                        key: level,
                                        class: ["btn btn-sm", {
                                          "btn-primary": gameConfig.value.difficultyLevel === level,
                                          "cursor-not-allowed opacity-50": !hasEnoughWords(count)
                                        }]
                                      }, [
                                        withDirectives(createVNode("input", {
                                          type: "radio",
                                          "onUpdate:modelValue": ($event) => gameConfig.value.difficultyLevel = $event,
                                          value: level,
                                          class: "hidden",
                                          disabled: !hasEnoughWords(count)
                                        }, null, 8, ["onUpdate:modelValue", "value", "disabled"]), [
                                          [vModelRadio, gameConfig.value.difficultyLevel]
                                        ]),
                                        createTextVNode(" " + toDisplayString(getDifficultyLabel(level)) + " (" + toDisplayString(count) + ") ", 1)
                                      ], 2);
                                    }), 128))
                                  ])
                                ]),
                                createVNode("div", { class: "divider text-xs text-gray-500" }, "Öncelik Filtreleri"),
                                createVNode("div", { class: "grid grid-cols-2 gap-2" }, [
                                  createVNode("label", { class: "flex cursor-pointer items-center justify-between rounded-lg border p-3 hover:bg-gray-50" }, [
                                    createVNode("span", { class: "text-sm" }, "Son Öğrenilenler"),
                                    withDirectives(createVNode("input", {
                                      type: "checkbox",
                                      class: "toggle toggle-sm",
                                      "onUpdate:modelValue": ($event) => gameConfig.value.prioritizeRecentlyLearned = $event
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelCheckbox, gameConfig.value.prioritizeRecentlyLearned]
                                    ])
                                  ]),
                                  createVNode("label", { class: "flex cursor-pointer items-center justify-between rounded-lg border p-3 hover:bg-gray-50" }, [
                                    createVNode("span", { class: "text-sm" }, "İşaretlenenler"),
                                    withDirectives(createVNode("input", {
                                      type: "checkbox",
                                      class: "toggle toggle-sm",
                                      "onUpdate:modelValue": ($event) => gameConfig.value.prioritizeFlagged = $event
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelCheckbox, gameConfig.value.prioritizeFlagged]
                                    ])
                                  ]),
                                  createVNode("label", { class: "flex cursor-pointer items-center justify-between rounded-lg border p-3 hover:bg-gray-50" }, [
                                    createVNode("span", { class: "text-sm" }, "En Çok Yanlış Yapılanlar"),
                                    withDirectives(createVNode("input", {
                                      type: "checkbox",
                                      class: "toggle toggle-sm",
                                      "onUpdate:modelValue": ($event) => gameConfig.value.prioritizeMostIncorrect = $event
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelCheckbox, gameConfig.value.prioritizeMostIncorrect]
                                    ])
                                  ]),
                                  createVNode("label", { class: "flex cursor-pointer items-center justify-between rounded-lg border p-3 hover:bg-gray-50" }, [
                                    createVNode("span", { class: "text-sm" }, "En Eski Güncellenenler"),
                                    withDirectives(createVNode("input", {
                                      type: "checkbox",
                                      class: "toggle toggle-sm",
                                      "onUpdate:modelValue": ($event) => gameConfig.value.prioritizeOldestUpdated = $event
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelCheckbox, gameConfig.value.prioritizeOldestUpdated]
                                    ])
                                  ]),
                                  createVNode("label", { class: "flex cursor-pointer items-center justify-between rounded-lg border p-3 hover:bg-gray-50" }, [
                                    createVNode("span", { class: "text-sm" }, "Soru Sayısı"),
                                    withDirectives(createVNode("select", {
                                      "onUpdate:modelValue": ($event) => gameConfig.value.questionCount = $event,
                                      class: "select-bordered select select-sm w-24"
                                    }, [
                                      ((_d2 = props.words) == null ? void 0 : _d2.length) < 50 ? (openBlock(), createBlock("option", {
                                        key: 0,
                                        value: (_e2 = props.words) == null ? void 0 : _e2.length
                                      }, " Tüm Paket (" + toDisplayString((_f2 = props.words) == null ? void 0 : _f2.length) + ") ", 9, ["value"])) : createCommentVNode("", true),
                                      createVNode("option", { value: "5" }, "5"),
                                      createVNode("option", { value: "10" }, "10"),
                                      createVNode("option", { value: "15" }, "15"),
                                      createVNode("option", { value: "20" }, "20"),
                                      createVNode("option", { value: "25" }, "25")
                                    ], 8, ["onUpdate:modelValue"]), [
                                      [vModelSelect, gameConfig.value.questionCount]
                                    ])
                                  ])
                                ])
                              ])
                            ])
                          ])) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "overflow-x-auto" }, [
                          createVNode("table", { class: "table table-zebra" }, [
                            createVNode("thead", null, [
                              createVNode("tr", null, [
                                createVNode("th", null, "Kelime"),
                                createVNode("th", null, "Anlam"),
                                createVNode("th", null, [
                                  createVNode("div", { class: "flex items-center gap-2" }, [
                                    createTextVNode(" Tür "),
                                    createVNode("button", {
                                      class: ["btn btn-ghost btn-xs", {
                                        "text-primary": sortState.value.type !== "none",
                                        "opacity-50": sortState.value.type === "none"
                                      }],
                                      onClick: ($event) => sortTable("type")
                                    }, [
                                      sortState.value.type === "none" ? (openBlock(), createBlock("svg", {
                                        key: 0,
                                        xmlns: "http://www.w3.org/2000/svg",
                                        class: "h-4 w-4",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        stroke: "currentColor"
                                      }, [
                                        createVNode("path", {
                                          "stroke-linecap": "round",
                                          "stroke-linejoin": "round",
                                          "stroke-width": "2",
                                          d: "M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                                        })
                                      ])) : sortState.value.type === "asc" ? (openBlock(), createBlock("svg", {
                                        key: 1,
                                        xmlns: "http://www.w3.org/2000/svg",
                                        class: "h-4 w-4",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        stroke: "currentColor"
                                      }, [
                                        createVNode("path", {
                                          "stroke-linecap": "round",
                                          "stroke-linejoin": "round",
                                          "stroke-width": "2",
                                          d: "M5 15l7-7 7 7"
                                        })
                                      ])) : (openBlock(), createBlock("svg", {
                                        key: 2,
                                        xmlns: "http://www.w3.org/2000/svg",
                                        class: "h-4 w-4",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        stroke: "currentColor"
                                      }, [
                                        createVNode("path", {
                                          "stroke-linecap": "round",
                                          "stroke-linejoin": "round",
                                          "stroke-width": "2",
                                          d: "M19 9l-7 7-7-7"
                                        })
                                      ]))
                                    ], 10, ["onClick"])
                                  ])
                                ]),
                                createVNode("th", null, "Durum"),
                                createVNode("th", null, [
                                  createVNode("div", { class: "flex items-center gap-2" }, [
                                    createTextVNode(" Başarı "),
                                    createVNode("button", {
                                      class: ["btn btn-ghost btn-xs", {
                                        "text-primary": sortState.value.success !== "none",
                                        "opacity-50": sortState.value.success === "none"
                                      }],
                                      onClick: ($event) => sortTable("success")
                                    }, [
                                      sortState.value.success === "none" ? (openBlock(), createBlock("svg", {
                                        key: 0,
                                        xmlns: "http://www.w3.org/2000/svg",
                                        class: "h-4 w-4",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        stroke: "currentColor"
                                      }, [
                                        createVNode("path", {
                                          "stroke-linecap": "round",
                                          "stroke-linejoin": "round",
                                          "stroke-width": "2",
                                          d: "M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                                        })
                                      ])) : sortState.value.success === "asc" ? (openBlock(), createBlock("svg", {
                                        key: 1,
                                        xmlns: "http://www.w3.org/2000/svg",
                                        class: "h-4 w-4",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        stroke: "currentColor"
                                      }, [
                                        createVNode("path", {
                                          "stroke-linecap": "round",
                                          "stroke-linejoin": "round",
                                          "stroke-width": "2",
                                          d: "M5 15l7-7 7 7"
                                        })
                                      ])) : (openBlock(), createBlock("svg", {
                                        key: 2,
                                        xmlns: "http://www.w3.org/2000/svg",
                                        class: "h-4 w-4",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        stroke: "currentColor"
                                      }, [
                                        createVNode("path", {
                                          "stroke-linecap": "round",
                                          "stroke-linejoin": "round",
                                          "stroke-width": "2",
                                          d: "M19 9l-7 7-7-7"
                                        })
                                      ]))
                                    ], 10, ["onClick"])
                                  ])
                                ]),
                                isLoggedIn.value ? (openBlock(), createBlock("th", { key: 0 })) : createCommentVNode("", true)
                              ])
                            ]),
                            createVNode("tbody", null, [
                              isLoading.value ? (openBlock(), createBlock("tr", { key: 0 }, [
                                createVNode("td", {
                                  colspan: "6",
                                  class: "text-center"
                                }, [
                                  createVNode("span", { class: "loading loading-spinner loading-md" })
                                ])
                              ])) : displayedWords.value.length === 0 ? (openBlock(), createBlock("tr", { key: 1 }, [
                                createVNode("td", {
                                  colspan: "6",
                                  class: "text-center"
                                }, "Sonuç bulunamadı")
                              ])) : createCommentVNode("", true),
                              (openBlock(true), createBlock(Fragment, null, renderList(displayedWords.value, (word) => {
                                return openBlock(), createBlock("tr", {
                                  key: word.id
                                }, [
                                  createVNode("td", { class: "font-medium" }, toDisplayString(word.word), 1),
                                  createVNode("td", null, toDisplayString(getPrimaryMeaning(word)), 1),
                                  createVNode("td", null, [
                                    createVNode("div", { class: "badge" }, toDisplayString(word.type), 1)
                                  ]),
                                  createVNode("td", null, [
                                    createVNode("div", {
                                      class: ["badge badge-sm", getLearningStatusBadgeClass(word.learning_status)]
                                    }, toDisplayString(getLearningStatusLabel(word.learning_status)), 3)
                                  ]),
                                  createVNode("td", null, [
                                    createVNode("div", {
                                      class: ["badge badge-sm", getSuccessRateBadgeClass(calculateSuccessRate(word).rate)]
                                    }, toDisplayString(calculateSuccessRate(word).label), 3)
                                  ]),
                                  isLoggedIn.value ? (openBlock(), createBlock("td", { key: 0 }, [
                                    createVNode(unref(Link), {
                                      href: _ctx.route("rendition.words.edit", word.id),
                                      class: "btn btn-ghost btn-xs"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Düzenle ")
                                      ]),
                                      _: 2
                                    }, 1032, ["href"])
                                  ])) : createCommentVNode("", true)
                                ]);
                              }), 128))
                            ])
                          ])
                        ]),
                        sortedWords.value.length > perPage.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-4 flex justify-between"
                        }, [
                          createVNode("div", null, [
                            createVNode("span", { class: "text-sm opacity-70" }, toDisplayString(paginationInfo.value), 1)
                          ]),
                          createVNode("div", { class: "join" }, [
                            createVNode("button", {
                              class: "btn btn-sm join-item",
                              disabled: currentPage.value <= 1,
                              onClick: ($event) => changePage(currentPage.value - 1)
                            }, " « ", 8, ["disabled", "onClick"]),
                            createVNode("button", { class: "btn btn-sm join-item" }, toDisplayString(currentPage.value), 1),
                            createVNode("button", {
                              class: "btn btn-sm join-item",
                              disabled: currentPage.value >= totalPages.value,
                              onClick: ($event) => changePage(currentPage.value + 1)
                            }, " » ", 8, ["disabled", "onClick"])
                          ])
                        ])) : createCommentVNode("", true),
                        ((_g2 = props.words) == null ? void 0 : _g2.length) === 0 ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "alert alert-info mt-6"
                        }, [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            class: "h-6 w-6 shrink-0 stroke-current"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            })
                          ])),
                          createVNode("span", null, "Bu pakette kelime bulunmamaktadır.")
                        ])) : !hasEnoughWords ? (openBlock(), createBlock("div", {
                          key: 2,
                          class: "alert alert-warning mt-6"
                        }, [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            class: "h-6 w-6 shrink-0 stroke-current"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            })
                          ])),
                          createVNode("span", null, "Oyunları başlatabilmek için en az 5 kelime gerekiyor.")
                        ])) : createCommentVNode("", true)
                      ]))
                    ];
                  }),
                  _: 2
                }, 1024)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Rendition/Words/Show/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Screen = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ef32fef4"]]);
export {
  Screen as default
};
