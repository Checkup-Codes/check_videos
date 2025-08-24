import { ref, computed, watch, onMounted, withCtx, unref, createTextVNode, createBlock, openBlock, createVNode, createCommentVNode, toDisplayString, withDirectives, withKeys, vModelText, Transition, vModelRadio, vModelSelect, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderClass, ssrLooseEqual, ssrLooseContain, ssrRenderList } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-G62taWZ6.js";
import MultipleChoice from "./MultipleChoice-BJVRV-to.js";
import TranslateWord from "./TranslateWord-C_EqYf5d.js";
import WordCompletion from "./WordCompletion-CPGcKJBv.js";
import { _ as _export_sfc } from "../ssr.js";
import "gsap";
import "@fortawesome/vue-fontawesome";
import "axios";
import "vuex";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
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
    ref(true);
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
      smartFilter: "all",
      // Yeni akıllı filtre
      successRateThreshold: 50
      // Başarı oranı eşiği
    });
    ref(false);
    const showFilters = ref(false);
    const wordCounts = computed(() => {
      if (!props.words) return { types: {}, status: {}, difficulty: {} };
      const counts = {
        types: {},
        status: {},
        difficulty: {},
        neverAnswered: 0,
        mostMistakes: 0,
        leastKnown: 0,
        flagged: 0,
        recentlyLearned: 0
      };
      props.words.forEach((word) => {
        counts.types[word.type] = (counts.types[word.type] || 0) + 1;
        counts.status[word.learning_status] = (counts.status[word.learning_status] || 0) + 1;
        counts.difficulty[word.difficulty_level] = (counts.difficulty[word.difficulty_level] || 0) + 1;
        if (!word.review_count || word.review_count === 0) {
          counts.neverAnswered++;
        }
        if (word.incorrect_count && word.incorrect_count >= 3) {
          counts.mostMistakes++;
        }
        if (word.review_count && word.review_count > 0) {
          const successRate = (word.review_count - (word.incorrect_count || 0)) / word.review_count * 100;
          if (successRate < 50) {
            counts.leastKnown++;
          }
        }
        if (word.is_flagged) {
          counts.flagged++;
        }
        if (word.last_reviewed_at) {
          const lastReview = new Date(word.last_reviewed_at);
          const weekAgo = /* @__PURE__ */ new Date();
          weekAgo.setDate(weekAgo.getDate() - 7);
          if (lastReview > weekAgo) {
            counts.recentlyLearned++;
          }
        }
      });
      return counts;
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
      return filteredWordsForGame.value.slice(startIndex, startIndex + perPage.value);
    });
    const totalPages = computed(() => {
      return Math.ceil(filteredWordsForGame.value.length / perPage.value);
    });
    const paginationInfo = computed(() => {
      const start = (currentPage.value - 1) * perPage.value + 1;
      const end = Math.min(start + perPage.value - 1, filteredWordsForGame.value.length);
      return `${start}-${end} / ${filteredWordsForGame.value.length}`;
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
      let wordsToUse = [...filteredWordsForGame.value];
      wordsToUse = wordsToUse.sort(() => Math.random() - 0.5);
      return wordsToUse.slice(0, parseInt(gameConfig.value.questionCount));
    });
    const filteredWordsForGame = computed(() => {
      if (!props.words) return [];
      let wordsToUse = [...props.words];
      switch (gameConfig.value.smartFilter) {
        case "never-answered":
          wordsToUse = wordsToUse.filter((word) => !word.review_count || word.review_count === 0);
          break;
        case "most-mistakes":
          wordsToUse = wordsToUse.filter((word) => word.incorrect_count && word.incorrect_count >= 3);
          wordsToUse.sort((a, b) => (b.incorrect_count || 0) - (a.incorrect_count || 0));
          break;
        case "success-rate":
          wordsToUse = wordsToUse.filter((word) => {
            if (!word.review_count || word.review_count === 0) return false;
            const successRate = (word.review_count - (word.incorrect_count || 0)) / word.review_count * 100;
            return successRate < gameConfig.value.successRateThreshold;
          });
          wordsToUse.sort((a, b) => {
            const aRate = (a.review_count - (a.incorrect_count || 0)) / a.review_count * 100;
            const bRate = (b.review_count - (b.incorrect_count || 0)) / b.review_count * 100;
            return aRate - bRate;
          });
          break;
        case "flagged":
          wordsToUse = wordsToUse.filter((word) => word.is_flagged);
          break;
        case "recently-learned":
          const weekAgo = /* @__PURE__ */ new Date();
          weekAgo.setDate(weekAgo.getDate() - 7);
          wordsToUse = wordsToUse.filter((word) => {
            if (!word.last_reviewed_at) return false;
            return new Date(word.last_reviewed_at) > weekAgo;
          });
          wordsToUse.sort((a, b) => new Date(b.last_reviewed_at) - new Date(a.last_reviewed_at));
          break;
        case "nouns":
          wordsToUse = wordsToUse.filter((word) => word.type === "noun");
          break;
        case "verbs":
          wordsToUse = wordsToUse.filter((word) => word.type === "verb");
          break;
        case "adjectives":
          wordsToUse = wordsToUse.filter((word) => word.type === "adjective");
          break;
        case "difficult":
          wordsToUse = wordsToUse.filter((word) => word.difficulty_level >= 3);
          wordsToUse.sort((a, b) => b.difficulty_level - a.difficulty_level);
          break;
        case "easy":
          wordsToUse = wordsToUse.filter((word) => word.difficulty_level <= 2);
          wordsToUse.sort((a, b) => a.difficulty_level - b.difficulty_level);
          break;
        case "unlearned":
          wordsToUse = wordsToUse.filter((word) => word.learning_status === 0);
          break;
        case "all":
        default:
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
              const aDate = new Date(a.updated_at || 0);
              const bDate = new Date(b.updated_at || 0);
              return aDate - bDate;
            });
          }
          break;
      }
      return wordsToUse;
    });
    const getSmartFilterLabel = (filter) => {
      switch (filter) {
        case "never-answered":
          return "Hiç Cevaplanmamışlar";
        case "most-mistakes":
          return "Çok Hata Yapılanlar";
        case "success-rate":
          return `Başarı Oranı %${gameConfig.value.successRateThreshold} Altında`;
        case "flagged":
          return "İşaretlenenler";
        case "recently-learned":
          return "Son Öğrenilenler";
        case "nouns":
          return "İsimler";
        case "verbs":
          return "Fiiller";
        case "adjectives":
          return "Sıfatlar";
        case "difficult":
          return "Zor Kelimeler";
        case "easy":
          return "Kolay Kelimeler";
        case "unlearned":
          return "Öğrenilmemiş";
        case "all":
        default:
          return "Tüm Kelimeler";
      }
    };
    const getFilterDescription = (filter) => {
      switch (filter) {
        case "never-answered":
          return {
            title: "🆕 Hiç Cevaplanmamış Kelimeler",
            description: "Daha önce hiç sorulmamış, henüz test edilmemiş kelimeler. Yeni başlayanlar için ideal.",
            criteria: "review_count = 0 olan kelimeler"
          };
        case "most-mistakes":
          return {
            title: "❌ Çok Hata Yapılan Kelimeler",
            description: "En çok yanlış cevaplanan kelimeler. Bu kelimeler üzerinde daha fazla çalışmanız gerekiyor.",
            criteria: "incorrect_count >= 3 olan kelimeler"
          };
        case "success-rate":
          return {
            title: `📊 Başarı Oranı %${gameConfig.value.successRateThreshold} Altındaki Kelimeler`,
            description: "Başarı oranı belirlenen eşiğin altında olan kelimeler. Bu kelimeleri tekrar etmeniz önerilir.",
            criteria: `(doğru cevap / toplam sorulma) * 100 < ${gameConfig.value.successRateThreshold}%`
          };
        case "flagged":
          return {
            title: "⭐ İşaretlenen Kelimeler",
            description: "Öne çıkarılan, önemli olduğu düşünülen kelimeler. Özel olarak işaretlenmiş kelimeler.",
            criteria: "is_flagged = true olan kelimeler"
          };
        case "recently-learned":
          return {
            title: "🕒 Son Öğrenilen Kelimeler",
            description: "Yakın zamanda (son 7 gün içinde) öğrenilen kelimeler. Tekrar için ideal zaman.",
            criteria: "last_reviewed_at son 7 gün içinde olan kelimeler"
          };
        case "nouns":
          return {
            title: "📝 İsim Türündeki Kelimeler",
            description: "Sadece isim türündeki kelimeler. İsim odaklı çalışma için.",
            criteria: 'type = "noun" olan kelimeler'
          };
        case "verbs":
          return {
            title: "🏃 Fiil Türündeki Kelimeler",
            description: "Sadece fiil türündeki kelimeler. Fiil odaklı çalışma için.",
            criteria: 'type = "verb" olan kelimeler'
          };
        case "adjectives":
          return {
            title: "🎨 Sıfat Türündeki Kelimeler",
            description: "Sadece sıfat türündeki kelimeler. Sıfat odaklı çalışma için.",
            criteria: 'type = "adjective" olan kelimeler'
          };
        case "difficult":
          return {
            title: "🔥 Zor Seviyedeki Kelimeler",
            description: "Zor ve çok zor seviyedeki kelimeler. İleri seviye çalışma için.",
            criteria: "difficulty_level >= 3 olan kelimeler"
          };
        case "easy":
          return {
            title: "😊 Kolay Seviyedeki Kelimeler",
            description: "Kolay ve orta seviyedeki kelimeler. Temel çalışma için.",
            criteria: "difficulty_level <= 2 olan kelimeler"
          };
        case "unlearned":
          return {
            title: "📖 Öğrenilmemiş Kelimeler",
            description: "Henüz öğrenilmemiş kelimeler. Yeni kelimeler öğrenmek için.",
            criteria: "learning_status = 0 olan kelimeler"
          };
        default:
          return {
            title: "📚 Tüm Kelimeler",
            description: "Filtre olmadan tüm kelimeler. Genel çalışma için.",
            criteria: "Tüm kelimeler gösteriliyor"
          };
      }
    };
    const exportFilteredWords = () => {
      if (filteredWordsForGame.value.length === 0) return;
      const csvContent = [
        ["Kelime", "Anlam", "Tür", "Zorluk", "Durum", "Başarı Oranı", "Toplam Sorulma", "Yanlış Sayısı"],
        ...filteredWordsForGame.value.map((word) => [
          word.word,
          getPrimaryMeaning(word),
          getWordTypeLabel(word.type),
          getDifficultyLabel(word.difficulty_level),
          getLearningStatusLabel(word.learning_status),
          word.review_count > 0 ? calculateSuccessRate(word).label : "-",
          word.review_count || 0,
          word.incorrect_count || 0
        ])
      ].map((row) => row.join(",")).join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `filtrelenmis_kelimeler_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.csv`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    const selectedWord = ref(null);
    const showWordDetails = (word) => {
      selectedWord.value = word;
    };
    const hasEnoughWords = (count) => {
      return count >= 5;
    };
    const startGame = (gameType) => {
      if (filteredWordsForGame.value.length < 5) {
        alert("Seçili filtrelerle yeterli kelime bulunmamaktadır. En az 5 kelime gereklidir.");
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
    const getDifficultyBadgeClass = (level) => {
      switch (Number(level)) {
        case 1:
          return "badge-success";
        case 2:
          return "badge-info";
        case 3:
          return "badge-warning";
        case 4:
          return "badge-error";
        default:
          return "badge-ghost";
      }
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
    computed(() => {
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
        smartFilter: "all",
        successRateThreshold: 50
      };
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q;
          if (_push2) {
            _push2(`<div class="px-5 transition-all duration-200 dark:border-gray-700 dark:bg-base-100" data-v-6e44dcc6${_scopeId}><div class="mb-4 flex items-center justify-between" data-v-6e44dcc6${_scopeId}><div class="flex-1" data-v-6e44dcc6${_scopeId}><h1 class="p-5 text-2xl font-bold" data-v-6e44dcc6${_scopeId}>${ssrInterpolate(((_a = props.pack) == null ? void 0 : _a.name) || "Kelimeler")} <span class="badge badge-outline ml-2" data-v-6e44dcc6${_scopeId}>${ssrInterpolate(((_b = props.words) == null ? void 0 : _b.length) || 0)} kelime</span></h1></div><div class="flex gap-2" data-v-6e44dcc6${_scopeId}>`);
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
              _push2(`<div class="mb-4 flex flex-wrap gap-3" data-v-6e44dcc6${_scopeId}><div class="form-control min-w-[200px] flex-1" data-v-6e44dcc6${_scopeId}><div class="input-group" data-v-6e44dcc6${_scopeId}><input type="text"${ssrRenderAttr("value", searchQuery.value)} placeholder="Kelime ara..." class="input-bordered input input-sm w-52" data-v-6e44dcc6${_scopeId}><button class="btn btn-sm btn-square mx-5" data-v-6e44dcc6${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-6e44dcc6${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" data-v-6e44dcc6${_scopeId}></path></svg></button></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (showGameInterface.value) {
              _push2(`<div class="my-20" data-v-6e44dcc6${_scopeId}>`);
              if (loadingGame.value) {
                _push2(`<div class="flex h-60 items-center justify-center" data-v-6e44dcc6${_scopeId}><span class="loading loading-spinner loading-lg" data-v-6e44dcc6${_scopeId}></span></div>`);
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
              _push2(`<div data-v-6e44dcc6${_scopeId}><div class="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm" data-v-6e44dcc6${_scopeId}><div class="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3" data-v-6e44dcc6${_scopeId}><button class="group relative flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-blue-500 hover:shadow-md"${ssrIncludeBooleanAttr(!hasEnoughWords) ? " disabled" : ""} data-v-6e44dcc6${_scopeId}><div class="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-500 transition-all group-hover:bg-blue-100" data-v-6e44dcc6${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-6e44dcc6${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" data-v-6e44dcc6${_scopeId}></path></svg></div><div class="text-left" data-v-6e44dcc6${_scopeId}><h3 class="font-medium text-gray-900" data-v-6e44dcc6${_scopeId}>Çoktan Seçmeli</h3><p class="text-sm text-gray-500" data-v-6e44dcc6${_scopeId}>Doğru cevabı seçin</p></div></button><button class="group relative flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-green-500 hover:shadow-md"${ssrIncludeBooleanAttr(!hasEnoughWords) ? " disabled" : ""} data-v-6e44dcc6${_scopeId}><div class="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-500 transition-all group-hover:bg-green-100" data-v-6e44dcc6${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-6e44dcc6${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-6e44dcc6${_scopeId}></path></svg></div><div class="text-left" data-v-6e44dcc6${_scopeId}><h3 class="font-medium text-gray-900" data-v-6e44dcc6${_scopeId}>Boşluk Doldurma</h3><p class="text-sm text-gray-500" data-v-6e44dcc6${_scopeId}>Eksik kelimeyi yazın</p></div></button><button class="group relative flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-purple-500 hover:shadow-md"${ssrIncludeBooleanAttr(!hasEnoughWords) ? " disabled" : ""} data-v-6e44dcc6${_scopeId}><div class="flex h-12 w-12 items-center justify-center rounded-full bg-purple-50 text-purple-500 transition-all group-hover:bg-purple-100" data-v-6e44dcc6${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-6e44dcc6${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" data-v-6e44dcc6${_scopeId}></path></svg></div><div class="text-left" data-v-6e44dcc6${_scopeId}><h3 class="font-medium text-gray-900" data-v-6e44dcc6${_scopeId}>Kelime Tamamlama</h3><p class="text-sm text-gray-500" data-v-6e44dcc6${_scopeId}>Eksik harfleri tamamlayın</p></div></button></div><div class="mt-6" data-v-6e44dcc6${_scopeId}><div class="flex items-center justify-between mb-4" data-v-6e44dcc6${_scopeId}><button class="btn btn-outline btn-sm flex items-center gap-2" data-v-6e44dcc6${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-6e44dcc6${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" data-v-6e44dcc6${_scopeId}></path></svg> ${ssrInterpolate(showFilters.value ? "Filtreleri Gizle" : "Filtreleri Göster")}</button><button class="btn btn-ghost btn-sm" data-v-6e44dcc6${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-6e44dcc6${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" data-v-6e44dcc6${_scopeId}></path></svg> Sıfırla </button></div>`);
              if (showFilters.value) {
                _push2(`<div class="space-y-4" data-v-6e44dcc6${_scopeId}><div class="bg-base-200 p-4 rounded-lg" data-v-6e44dcc6${_scopeId}><h4 class="font-semibold text-base-content mb-3" data-v-6e44dcc6${_scopeId}>🧠 Akıllı Filtreler</h4><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2" data-v-6e44dcc6${_scopeId}><label class="${ssrRenderClass([{ "btn-primary": gameConfig.value.smartFilter === "never-answered", "btn-outline": gameConfig.value.smartFilter !== "never-answered" }, "btn btn-sm"])}" data-v-6e44dcc6${_scopeId}><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(gameConfig.value.smartFilter, "never-answered")) ? " checked" : ""} value="never-answered" class="hidden" data-v-6e44dcc6${_scopeId}> 🆕 Hiç Cevaplanmamış (${ssrInterpolate(wordCounts.value.neverAnswered || 0)}) </label><label class="${ssrRenderClass([{ "btn-primary": gameConfig.value.smartFilter === "most-mistakes", "btn-outline": gameConfig.value.smartFilter !== "most-mistakes" }, "btn btn-sm"])}" data-v-6e44dcc6${_scopeId}><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(gameConfig.value.smartFilter, "most-mistakes")) ? " checked" : ""} value="most-mistakes" class="hidden" data-v-6e44dcc6${_scopeId}> ❌ Çok Hata (${ssrInterpolate(wordCounts.value.mostMistakes || 0)}) </label><label class="${ssrRenderClass([{ "btn-primary": gameConfig.value.smartFilter === "flagged", "btn-outline": gameConfig.value.smartFilter !== "flagged" }, "btn btn-sm"])}" data-v-6e44dcc6${_scopeId}><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(gameConfig.value.smartFilter, "flagged")) ? " checked" : ""} value="flagged" class="hidden" data-v-6e44dcc6${_scopeId}> ⭐ İşaretlenen (${ssrInterpolate(wordCounts.value.flagged || 0)}) </label><label class="${ssrRenderClass([{ "btn-primary": gameConfig.value.smartFilter === "recently-learned", "btn-outline": gameConfig.value.smartFilter !== "recently-learned" }, "btn btn-sm"])}" data-v-6e44dcc6${_scopeId}><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(gameConfig.value.smartFilter, "recently-learned")) ? " checked" : ""} value="recently-learned" class="hidden" data-v-6e44dcc6${_scopeId}> 🕒 Son Öğrenilen (${ssrInterpolate(wordCounts.value.recentlyLearned || 0)}) </label><label class="${ssrRenderClass([{ "btn-primary": gameConfig.value.smartFilter === "unlearned", "btn-outline": gameConfig.value.smartFilter !== "unlearned" }, "btn btn-sm"])}" data-v-6e44dcc6${_scopeId}><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(gameConfig.value.smartFilter, "unlearned")) ? " checked" : ""} value="unlearned" class="hidden" data-v-6e44dcc6${_scopeId}> 📖 Öğrenilmemiş (${ssrInterpolate(((_f = wordCounts.value.status) == null ? void 0 : _f[0]) || 0)}) </label></div></div><div class="bg-base-200 p-4 rounded-lg" data-v-6e44dcc6${_scopeId}><h4 class="font-semibold text-base-content mb-3" data-v-6e44dcc6${_scopeId}>📊 Başarı Oranı Filtresi</h4><div class="space-y-3" data-v-6e44dcc6${_scopeId}><div class="flex flex-col sm:flex-row items-start sm:items-center gap-3" data-v-6e44dcc6${_scopeId}><label class="${ssrRenderClass([{ "btn-primary": gameConfig.value.smartFilter === "success-rate", "btn-outline": gameConfig.value.smartFilter !== "success-rate" }, "btn btn-sm whitespace-nowrap"])}" data-v-6e44dcc6${_scopeId}><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(gameConfig.value.smartFilter, "success-rate")) ? " checked" : ""} value="success-rate" class="hidden" data-v-6e44dcc6${_scopeId}> Başarı Oranı Altında </label><div class="flex-1 w-full sm:w-auto" data-v-6e44dcc6${_scopeId}><input type="range"${ssrRenderAttr("value", gameConfig.value.successRateThreshold)} min="0" max="100" step="5" class="range range-primary range-sm w-full"${ssrIncludeBooleanAttr(gameConfig.value.smartFilter !== "success-rate") ? " disabled" : ""} data-v-6e44dcc6${_scopeId}></div><span class="text-sm font-medium min-w-[3rem] text-center" data-v-6e44dcc6${_scopeId}>%${ssrInterpolate(gameConfig.value.successRateThreshold)}</span></div><div class="text-xs text-base-content/70" data-v-6e44dcc6${_scopeId}> Başarı oranı %${ssrInterpolate(gameConfig.value.successRateThreshold)}&#39;in altında olan kelimeler gösterilecek </div></div></div><div class="bg-base-200 p-4 rounded-lg" data-v-6e44dcc6${_scopeId}><h4 class="font-semibold text-base-content mb-3" data-v-6e44dcc6${_scopeId}>📝 Kelime Türü</h4><div class="grid grid-cols-1 sm:grid-cols-3 gap-2" data-v-6e44dcc6${_scopeId}><label class="${ssrRenderClass([{ "btn-primary": gameConfig.value.smartFilter === "nouns", "btn-outline": gameConfig.value.smartFilter !== "nouns" }, "btn btn-sm"])}" data-v-6e44dcc6${_scopeId}><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(gameConfig.value.smartFilter, "nouns")) ? " checked" : ""} value="nouns" class="hidden" data-v-6e44dcc6${_scopeId}> 📝 İsimler (${ssrInterpolate(((_g = wordCounts.value.types) == null ? void 0 : _g.noun) || 0)}) </label><label class="${ssrRenderClass([{ "btn-primary": gameConfig.value.smartFilter === "verbs", "btn-outline": gameConfig.value.smartFilter !== "verbs" }, "btn btn-sm"])}" data-v-6e44dcc6${_scopeId}><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(gameConfig.value.smartFilter, "verbs")) ? " checked" : ""} value="verbs" class="hidden" data-v-6e44dcc6${_scopeId}> 🏃 Fiiller (${ssrInterpolate(((_h = wordCounts.value.types) == null ? void 0 : _h.verb) || 0)}) </label><label class="${ssrRenderClass([{ "btn-primary": gameConfig.value.smartFilter === "adjectives", "btn-outline": gameConfig.value.smartFilter !== "adjectives" }, "btn btn-sm"])}" data-v-6e44dcc6${_scopeId}><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(gameConfig.value.smartFilter, "adjectives")) ? " checked" : ""} value="adjectives" class="hidden" data-v-6e44dcc6${_scopeId}> 🎨 Sıfatlar (${ssrInterpolate(((_i = wordCounts.value.types) == null ? void 0 : _i.adjective) || 0)}) </label></div></div><div class="bg-base-200 p-4 rounded-lg" data-v-6e44dcc6${_scopeId}><h4 class="font-semibold text-base-content mb-3" data-v-6e44dcc6${_scopeId}>🎯 Zorluk Seviyesi</h4><div class="grid grid-cols-1 sm:grid-cols-2 gap-2" data-v-6e44dcc6${_scopeId}><label class="${ssrRenderClass([{ "btn-primary": gameConfig.value.smartFilter === "easy", "btn-outline": gameConfig.value.smartFilter !== "easy" }, "btn btn-sm"])}" data-v-6e44dcc6${_scopeId}><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(gameConfig.value.smartFilter, "easy")) ? " checked" : ""} value="easy" class="hidden" data-v-6e44dcc6${_scopeId}> 😊 Kolay (${ssrInterpolate((((_j = wordCounts.value.difficulty) == null ? void 0 : _j[1]) || 0) + (((_k = wordCounts.value.difficulty) == null ? void 0 : _k[2]) || 0))}) </label><label class="${ssrRenderClass([{ "btn-primary": gameConfig.value.smartFilter === "difficult", "btn-outline": gameConfig.value.smartFilter !== "difficult" }, "btn btn-sm"])}" data-v-6e44dcc6${_scopeId}><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(gameConfig.value.smartFilter, "difficult")) ? " checked" : ""} value="difficult" class="hidden" data-v-6e44dcc6${_scopeId}> 🔥 Zor (${ssrInterpolate((((_l = wordCounts.value.difficulty) == null ? void 0 : _l[3]) || 0) + (((_m = wordCounts.value.difficulty) == null ? void 0 : _m[4]) || 0))}) </label></div></div><div class="bg-base-200 p-4 rounded-lg" data-v-6e44dcc6${_scopeId}><label class="${ssrRenderClass([{ "btn-primary": gameConfig.value.smartFilter === "all", "btn-outline": gameConfig.value.smartFilter !== "all" }, "btn btn-sm w-full"])}" data-v-6e44dcc6${_scopeId}><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(gameConfig.value.smartFilter, "all")) ? " checked" : ""} value="all" class="hidden" data-v-6e44dcc6${_scopeId}> 📚 Tüm Kelimeler (${ssrInterpolate(((_n = props.words) == null ? void 0 : _n.length) || 0)}) </label></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (gameConfig.value.smartFilter !== "all") {
                _push2(`<div class="mt-4 p-4 bg-info/10 border border-info/20 rounded-lg" data-v-6e44dcc6${_scopeId}><div class="flex items-start gap-3" data-v-6e44dcc6${_scopeId}><div class="text-info" data-v-6e44dcc6${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-6e44dcc6${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-6e44dcc6${_scopeId}></path></svg></div><div class="flex-1" data-v-6e44dcc6${_scopeId}><h5 class="font-semibold text-base-content mb-1" data-v-6e44dcc6${_scopeId}>${ssrInterpolate(getFilterDescription(gameConfig.value.smartFilter).title)}</h5><p class="text-sm text-base-content/70" data-v-6e44dcc6${_scopeId}>${ssrInterpolate(getFilterDescription(gameConfig.value.smartFilter).description)}</p><div class="mt-2 text-xs text-base-content/60" data-v-6e44dcc6${_scopeId}><strong data-v-6e44dcc6${_scopeId}>Filtreleme Kriteri:</strong> ${ssrInterpolate(getFilterDescription(gameConfig.value.smartFilter).criteria)}</div></div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="mt-6 p-4 bg-base-200 rounded-lg" data-v-6e44dcc6${_scopeId}><h4 class="font-semibold text-base-content mb-3" data-v-6e44dcc6${_scopeId}>🎮 Oyun Ayarları</h4><div class="flex flex-col sm:flex-row items-start sm:items-center gap-4" data-v-6e44dcc6${_scopeId}><div class="form-control w-full sm:w-auto" data-v-6e44dcc6${_scopeId}><label class="label" data-v-6e44dcc6${_scopeId}><span class="label-text font-medium" data-v-6e44dcc6${_scopeId}>Soru Sayısı</span></label><select class="select select-bordered select-sm w-full sm:w-auto" data-v-6e44dcc6${_scopeId}>`);
              if (filteredWordsForGame.value.length < 60) {
                _push2(`<option${ssrRenderAttr("value", filteredWordsForGame.value.length)} data-v-6e44dcc6${_scopeId}> Tümü (${ssrInterpolate(filteredWordsForGame.value.length)}) </option>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<option value="5" data-v-6e44dcc6${ssrIncludeBooleanAttr(Array.isArray(gameConfig.value.questionCount) ? ssrLooseContain(gameConfig.value.questionCount, "5") : ssrLooseEqual(gameConfig.value.questionCount, "5")) ? " selected" : ""}${_scopeId}>5 Soru</option><option value="10" data-v-6e44dcc6${ssrIncludeBooleanAttr(Array.isArray(gameConfig.value.questionCount) ? ssrLooseContain(gameConfig.value.questionCount, "10") : ssrLooseEqual(gameConfig.value.questionCount, "10")) ? " selected" : ""}${_scopeId}>10 Soru</option><option value="15" data-v-6e44dcc6${ssrIncludeBooleanAttr(Array.isArray(gameConfig.value.questionCount) ? ssrLooseContain(gameConfig.value.questionCount, "15") : ssrLooseEqual(gameConfig.value.questionCount, "15")) ? " selected" : ""}${_scopeId}>15 Soru</option><option value="20" data-v-6e44dcc6${ssrIncludeBooleanAttr(Array.isArray(gameConfig.value.questionCount) ? ssrLooseContain(gameConfig.value.questionCount, "20") : ssrLooseEqual(gameConfig.value.questionCount, "20")) ? " selected" : ""}${_scopeId}>20 Soru</option><option value="25" data-v-6e44dcc6${ssrIncludeBooleanAttr(Array.isArray(gameConfig.value.questionCount) ? ssrLooseContain(gameConfig.value.questionCount, "25") : ssrLooseEqual(gameConfig.value.questionCount, "25")) ? " selected" : ""}${_scopeId}>25 Soru</option></select></div></div></div></div></div><div class="mt-6" data-v-6e44dcc6${_scopeId}><div class="flex items-center justify-between mb-4" data-v-6e44dcc6${_scopeId}><div class="flex items-center gap-3" data-v-6e44dcc6${_scopeId}><h3 class="text-lg font-bold text-base-content" data-v-6e44dcc6${_scopeId}>📋 Kelime Listesi</h3><div class="badge badge-primary badge-lg" data-v-6e44dcc6${_scopeId}>${ssrInterpolate(filteredWordsForGame.value.length)} kelime </div>`);
              if (gameConfig.value.smartFilter !== "all") {
                _push2(`<div class="badge badge-secondary badge-sm" data-v-6e44dcc6${_scopeId}>${ssrInterpolate(getSmartFilterLabel(gameConfig.value.smartFilter))} filtresi aktif </div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="flex gap-2" data-v-6e44dcc6${_scopeId}><button class="btn btn-success btn-sm"${ssrIncludeBooleanAttr(filteredWordsForGame.value.length === 0) ? " disabled" : ""} data-v-6e44dcc6${_scopeId}><svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-6e44dcc6${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-6e44dcc6${_scopeId}></path></svg> Dışa Aktar </button></div></div>`);
              if (filteredWordsForGame.value.length === 0) {
                _push2(`<div class="alert alert-warning mb-4" data-v-6e44dcc6${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24" data-v-6e44dcc6${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" data-v-6e44dcc6${_scopeId}></path></svg><span data-v-6e44dcc6${_scopeId}>Seçili filtrelerle eşleşen kelime bulunamadı. Lütfen filtreleri değiştirin.</span></div>`);
              } else if (filteredWordsForGame.value.length < 5) {
                _push2(`<div class="alert alert-info mb-4" data-v-6e44dcc6${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6" data-v-6e44dcc6${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-6e44dcc6${_scopeId}></path></svg><span data-v-6e44dcc6${_scopeId}>Seçili filtrelerle sadece ${ssrInterpolate(filteredWordsForGame.value.length)} kelime bulundu. Oyun için en az 5 kelime önerilir.</span></div>`);
              } else {
                _push2(`<div class="alert alert-success mb-4" data-v-6e44dcc6${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24" data-v-6e44dcc6${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-v-6e44dcc6${_scopeId}></path></svg><span data-v-6e44dcc6${_scopeId}>${ssrInterpolate(filteredWordsForGame.value.length)} kelime hazır! Oyunu başlatabilirsiniz.</span></div>`);
              }
              _push2(`<div class="card bg-base-100 shadow-sm" data-v-6e44dcc6${_scopeId}><div class="card-body p-0" data-v-6e44dcc6${_scopeId}><div class="overflow-x-auto" data-v-6e44dcc6${_scopeId}><table class="table table-zebra w-full" data-v-6e44dcc6${_scopeId}><thead data-v-6e44dcc6${_scopeId}><tr data-v-6e44dcc6${_scopeId}><th class="text-left" data-v-6e44dcc6${_scopeId}>Kelime</th><th class="text-left" data-v-6e44dcc6${_scopeId}>Anlam</th><th class="text-center" data-v-6e44dcc6${_scopeId}><div class="flex items-center justify-center gap-2" data-v-6e44dcc6${_scopeId}> Tür <button class="${ssrRenderClass([{
                "text-primary": sortState.value.type !== "none",
                "opacity-50": sortState.value.type === "none"
              }, "btn btn-ghost btn-xs"])}" data-v-6e44dcc6${_scopeId}>`);
              if (sortState.value.type === "none") {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-6e44dcc6${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" data-v-6e44dcc6${_scopeId}></path></svg>`);
              } else if (sortState.value.type === "asc") {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-6e44dcc6${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" data-v-6e44dcc6${_scopeId}></path></svg>`);
              } else {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-6e44dcc6${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-6e44dcc6${_scopeId}></path></svg>`);
              }
              _push2(`</button></div></th><th class="text-center" data-v-6e44dcc6${_scopeId}>Zorluk</th><th class="text-center" data-v-6e44dcc6${_scopeId}>Durum</th><th class="text-center" data-v-6e44dcc6${_scopeId}><div class="flex items-center justify-center gap-2" data-v-6e44dcc6${_scopeId}> Başarı <button class="${ssrRenderClass([{
                "text-primary": sortState.value.success !== "none",
                "opacity-50": sortState.value.success === "none"
              }, "btn btn-ghost btn-xs"])}" data-v-6e44dcc6${_scopeId}>`);
              if (sortState.value.success === "none") {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-6e44dcc6${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" data-v-6e44dcc6${_scopeId}></path></svg>`);
              } else if (sortState.value.success === "asc") {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-6e44dcc6${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" data-v-6e44dcc6${_scopeId}></path></svg>`);
              } else {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-6e44dcc6${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-6e44dcc6${_scopeId}></path></svg>`);
              }
              _push2(`</button></div></th><th class="text-center" data-v-6e44dcc6${_scopeId}>İşlem</th></tr></thead><tbody data-v-6e44dcc6${_scopeId}>`);
              if (isLoading.value) {
                _push2(`<tr data-v-6e44dcc6${_scopeId}><td colspan="6" class="text-center py-8" data-v-6e44dcc6${_scopeId}><span class="loading loading-spinner loading-md" data-v-6e44dcc6${_scopeId}></span></td></tr>`);
              } else if (displayedWords.value.length === 0) {
                _push2(`<tr data-v-6e44dcc6${_scopeId}><td colspan="6" class="text-center py-8" data-v-6e44dcc6${_scopeId}><div class="text-base-content/70" data-v-6e44dcc6${_scopeId}>Sonuç bulunamadı</div></td></tr>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--[-->`);
              ssrRenderList(displayedWords.value, (word) => {
                _push2(`<tr class="hover:bg-base-200 cursor-pointer" data-v-6e44dcc6${_scopeId}><td class="font-semibold text-base-content" data-v-6e44dcc6${_scopeId}>${ssrInterpolate(word.word)}</td><td class="text-base-content/80" data-v-6e44dcc6${_scopeId}>${ssrInterpolate(getPrimaryMeaning(word))}</td><td class="text-center" data-v-6e44dcc6${_scopeId}><span class="badge badge-outline badge-sm" data-v-6e44dcc6${_scopeId}>${ssrInterpolate(getWordTypeLabel(word.type))}</span></td><td class="text-center" data-v-6e44dcc6${_scopeId}><span class="${ssrRenderClass([getDifficultyBadgeClass(word.difficulty_level), "badge badge-sm"])}" data-v-6e44dcc6${_scopeId}>${ssrInterpolate(getDifficultyLabel(word.difficulty_level))}</span></td><td class="text-center" data-v-6e44dcc6${_scopeId}><span class="${ssrRenderClass([getLearningStatusBadgeClass(word.learning_status), "badge badge-sm"])}" data-v-6e44dcc6${_scopeId}>${ssrInterpolate(getLearningStatusLabel(word.learning_status))}</span></td><td class="text-center" data-v-6e44dcc6${_scopeId}>`);
                if (word.review_count > 0) {
                  _push2(`<span class="${ssrRenderClass([getSuccessRateBadgeClass(calculateSuccessRate(word).rate), "badge badge-sm"])}" data-v-6e44dcc6${_scopeId}>${ssrInterpolate(calculateSuccessRate(word).label)}</span>`);
                } else {
                  _push2(`<span class="text-xs text-base-content/50" data-v-6e44dcc6${_scopeId}>-</span>`);
                }
                _push2(`</td><td class="text-center" data-v-6e44dcc6${_scopeId}><div class="flex gap-1 justify-center" data-v-6e44dcc6${_scopeId}><button class="btn btn-ghost btn-xs" data-v-6e44dcc6${_scopeId}><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-6e44dcc6${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-6e44dcc6${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-6e44dcc6${_scopeId}></path></svg></button>`);
                if (isLoggedIn.value) {
                  _push2(ssrRenderComponent(unref(Link), {
                    href: _ctx.route("rendition.words.edit", word.id),
                    class: "btn btn-ghost btn-xs"
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-6e44dcc6${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-6e44dcc6${_scopeId2}></path></svg>`);
                      } else {
                        return [
                          (openBlock(), createBlock("svg", {
                            class: "h-4 w-4",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            })
                          ]))
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div></div></div></div>`);
              if (filteredWordsForGame.value.length > perPage.value) {
                _push2(`<div class="mt-4 flex justify-between" data-v-6e44dcc6${_scopeId}><div data-v-6e44dcc6${_scopeId}><span class="text-sm opacity-70" data-v-6e44dcc6${_scopeId}>${ssrInterpolate(paginationInfo.value)}</span></div><div class="join" data-v-6e44dcc6${_scopeId}><button class="btn btn-sm join-item"${ssrIncludeBooleanAttr(currentPage.value <= 1) ? " disabled" : ""} data-v-6e44dcc6${_scopeId}> « </button><button class="btn btn-sm join-item" data-v-6e44dcc6${_scopeId}>${ssrInterpolate(currentPage.value)}</button><button class="btn btn-sm join-item"${ssrIncludeBooleanAttr(currentPage.value >= totalPages.value) ? " disabled" : ""} data-v-6e44dcc6${_scopeId}> » </button></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (((_o = props.words) == null ? void 0 : _o.length) === 0) {
                _push2(`<div class="alert alert-info mt-6" data-v-6e44dcc6${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current" data-v-6e44dcc6${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-6e44dcc6${_scopeId}></path></svg><span data-v-6e44dcc6${_scopeId}>Bu pakette kelime bulunmamaktadır.</span></div>`);
              } else if (filteredWordsForGame.value.length < 5) {
                _push2(`<div class="alert alert-warning mt-6" data-v-6e44dcc6${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current" data-v-6e44dcc6${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" data-v-6e44dcc6${_scopeId}></path></svg><span data-v-6e44dcc6${_scopeId}>Seçili filtrelerle yeterli kelime bulunamadı. En az 5 kelime gerekiyor.</span></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            }
            _push2(`</div>`);
            if (selectedWord.value) {
              _push2(`<div class="modal modal-open" data-v-6e44dcc6${_scopeId}><div class="modal-box max-w-2xl" data-v-6e44dcc6${_scopeId}><div class="flex items-center justify-between mb-4" data-v-6e44dcc6${_scopeId}><h3 class="font-bold text-lg text-base-content" data-v-6e44dcc6${_scopeId}>${ssrInterpolate(selectedWord.value.word)}</h3><button class="btn btn-ghost btn-sm btn-circle" data-v-6e44dcc6${_scopeId}><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-6e44dcc6${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-6e44dcc6${_scopeId}></path></svg></button></div><div class="space-y-4" data-v-6e44dcc6${_scopeId}><div data-v-6e44dcc6${_scopeId}><h4 class="font-semibold text-base-content mb-2" data-v-6e44dcc6${_scopeId}>Anlamlar</h4><div class="space-y-2" data-v-6e44dcc6${_scopeId}><!--[-->`);
              ssrRenderList(selectedWord.value.meanings, (meaning, index) => {
                _push2(`<div class="${ssrRenderClass([meaning.is_primary ? "bg-primary/10 border border-primary/20" : "bg-base-200", "flex items-center gap-2 p-2 rounded-lg"])}" data-v-6e44dcc6${_scopeId}><span class="text-sm font-medium" data-v-6e44dcc6${_scopeId}>${ssrInterpolate(index + 1)}.</span><span class="text-base-content" data-v-6e44dcc6${_scopeId}>${ssrInterpolate(meaning.meaning)}</span>`);
                if (meaning.is_primary) {
                  _push2(`<span class="badge badge-primary badge-xs" data-v-6e44dcc6${_scopeId}>Birincil</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              });
              _push2(`<!--]--></div></div><div class="grid grid-cols-2 gap-4" data-v-6e44dcc6${_scopeId}><div data-v-6e44dcc6${_scopeId}><h4 class="font-semibold text-base-content mb-2" data-v-6e44dcc6${_scopeId}>Temel Bilgiler</h4><div class="space-y-2 text-sm" data-v-6e44dcc6${_scopeId}><div class="flex justify-between" data-v-6e44dcc6${_scopeId}><span class="text-base-content/70" data-v-6e44dcc6${_scopeId}>Tür:</span><span class="text-base-content" data-v-6e44dcc6${_scopeId}>${ssrInterpolate(getWordTypeLabel(selectedWord.value.type))}</span></div><div class="flex justify-between" data-v-6e44dcc6${_scopeId}><span class="text-base-content/70" data-v-6e44dcc6${_scopeId}>Zorluk:</span><span class="${ssrRenderClass([getDifficultyBadgeClass(selectedWord.value.difficulty_level), "badge badge-sm"])}" data-v-6e44dcc6${_scopeId}>${ssrInterpolate(getDifficultyLabel(selectedWord.value.difficulty_level))}</span></div><div class="flex justify-between" data-v-6e44dcc6${_scopeId}><span class="text-base-content/70" data-v-6e44dcc6${_scopeId}>Durum:</span><span class="${ssrRenderClass([getLearningStatusBadgeClass(selectedWord.value.learning_status), "badge badge-sm"])}" data-v-6e44dcc6${_scopeId}>${ssrInterpolate(getLearningStatusLabel(selectedWord.value.learning_status))}</span></div><div class="flex justify-between" data-v-6e44dcc6${_scopeId}><span class="text-base-content/70" data-v-6e44dcc6${_scopeId}>Öne Çıkar:</span><span class="text-base-content" data-v-6e44dcc6${_scopeId}>${ssrInterpolate(selectedWord.value.is_flagged ? "Evet" : "Hayır")}</span></div></div></div><div data-v-6e44dcc6${_scopeId}><h4 class="font-semibold text-base-content mb-2" data-v-6e44dcc6${_scopeId}>İstatistikler</h4><div class="space-y-2 text-sm" data-v-6e44dcc6${_scopeId}><div class="flex justify-between" data-v-6e44dcc6${_scopeId}><span class="text-base-content/70" data-v-6e44dcc6${_scopeId}>Toplam Sorulma:</span><span class="text-base-content" data-v-6e44dcc6${_scopeId}>${ssrInterpolate(selectedWord.value.review_count || 0)}</span></div><div class="flex justify-between" data-v-6e44dcc6${_scopeId}><span class="text-base-content/70" data-v-6e44dcc6${_scopeId}>Yanlış Sayısı:</span><span class="text-base-content" data-v-6e44dcc6${_scopeId}>${ssrInterpolate(selectedWord.value.incorrect_count || 0)}</span></div><div class="flex justify-between" data-v-6e44dcc6${_scopeId}><span class="text-base-content/70" data-v-6e44dcc6${_scopeId}>Başarı Oranı:</span><span class="${ssrRenderClass([getSuccessRateBadgeClass(calculateSuccessRate(selectedWord.value).rate), "badge badge-sm"])}" data-v-6e44dcc6${_scopeId}>${ssrInterpolate(calculateSuccessRate(selectedWord.value).label)}</span></div><div class="flex justify-between" data-v-6e44dcc6${_scopeId}><span class="text-base-content/70" data-v-6e44dcc6${_scopeId}>Son Güncelleme:</span><span class="text-base-content" data-v-6e44dcc6${_scopeId}>${ssrInterpolate(new Date(selectedWord.value.updated_at).toLocaleDateString("tr-TR"))}</span></div></div></div></div>`);
              if (selectedWord.value.example_sentences && selectedWord.value.example_sentences.length > 0) {
                _push2(`<div data-v-6e44dcc6${_scopeId}><h4 class="font-semibold text-base-content mb-2" data-v-6e44dcc6${_scopeId}>Örnek Cümleler</h4><div class="space-y-2" data-v-6e44dcc6${_scopeId}><!--[-->`);
                ssrRenderList(selectedWord.value.example_sentences, (sentence, index) => {
                  _push2(`<div class="p-3 bg-base-200 rounded-lg" data-v-6e44dcc6${_scopeId}><div class="text-base-content font-medium" data-v-6e44dcc6${_scopeId}>${ssrInterpolate(sentence)}</div>`);
                  if (selectedWord.value.example_translations && selectedWord.value.example_translations[index]) {
                    _push2(`<div class="text-sm text-base-content/70 mt-1" data-v-6e44dcc6${_scopeId}>${ssrInterpolate(selectedWord.value.example_translations[index])}</div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div>`);
                });
                _push2(`<!--]--></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (selectedWord.value.synonyms && selectedWord.value.synonyms.length > 0) {
                _push2(`<div data-v-6e44dcc6${_scopeId}><h4 class="font-semibold text-base-content mb-2" data-v-6e44dcc6${_scopeId}>Eş Anlamlılar</h4><div class="flex flex-wrap gap-2" data-v-6e44dcc6${_scopeId}><!--[-->`);
                ssrRenderList(selectedWord.value.synonyms, (synonym) => {
                  _push2(`<span class="badge badge-outline" data-v-6e44dcc6${_scopeId}>${ssrInterpolate(synonym)}</span>`);
                });
                _push2(`<!--]--></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="modal-action" data-v-6e44dcc6${_scopeId}><button class="btn btn-outline" data-v-6e44dcc6${_scopeId}>Kapat</button></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "px-5 transition-all duration-200 dark:border-gray-700 dark:bg-base-100" }, [
                createVNode("div", { class: "mb-4 flex items-center justify-between" }, [
                  createVNode("div", { class: "flex-1" }, [
                    createVNode("h1", { class: "p-5 text-2xl font-bold" }, [
                      createTextVNode(toDisplayString(((_p = props.pack) == null ? void 0 : _p.name) || "Kelimeler") + " ", 1),
                      createVNode("span", { class: "badge badge-outline ml-2" }, toDisplayString(((_q = props.words) == null ? void 0 : _q.length) || 0) + " kelime", 1)
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
                    var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j2, _k2, _l2, _m2;
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
                          createVNode("div", { class: "mt-6" }, [
                            createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                              createVNode("button", {
                                onClick: ($event) => showFilters.value = !showFilters.value,
                                class: "btn btn-outline btn-sm flex items-center gap-2"
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
                                    d: "M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"
                                  })
                                ])),
                                createTextVNode(" " + toDisplayString(showFilters.value ? "Filtreleri Gizle" : "Filtreleri Göster"), 1)
                              ], 8, ["onClick"]),
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
                                createTextVNode(" Sıfırla ")
                              ])
                            ]),
                            showFilters.value ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "space-y-4"
                            }, [
                              createVNode("div", { class: "bg-base-200 p-4 rounded-lg" }, [
                                createVNode("h4", { class: "font-semibold text-base-content mb-3" }, "🧠 Akıllı Filtreler"),
                                createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2" }, [
                                  createVNode("label", {
                                    class: ["btn btn-sm", { "btn-primary": gameConfig.value.smartFilter === "never-answered", "btn-outline": gameConfig.value.smartFilter !== "never-answered" }]
                                  }, [
                                    withDirectives(createVNode("input", {
                                      type: "radio",
                                      "onUpdate:modelValue": ($event) => gameConfig.value.smartFilter = $event,
                                      value: "never-answered",
                                      class: "hidden"
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelRadio, gameConfig.value.smartFilter]
                                    ]),
                                    createTextVNode(" 🆕 Hiç Cevaplanmamış (" + toDisplayString(wordCounts.value.neverAnswered || 0) + ") ", 1)
                                  ], 2),
                                  createVNode("label", {
                                    class: ["btn btn-sm", { "btn-primary": gameConfig.value.smartFilter === "most-mistakes", "btn-outline": gameConfig.value.smartFilter !== "most-mistakes" }]
                                  }, [
                                    withDirectives(createVNode("input", {
                                      type: "radio",
                                      "onUpdate:modelValue": ($event) => gameConfig.value.smartFilter = $event,
                                      value: "most-mistakes",
                                      class: "hidden"
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelRadio, gameConfig.value.smartFilter]
                                    ]),
                                    createTextVNode(" ❌ Çok Hata (" + toDisplayString(wordCounts.value.mostMistakes || 0) + ") ", 1)
                                  ], 2),
                                  createVNode("label", {
                                    class: ["btn btn-sm", { "btn-primary": gameConfig.value.smartFilter === "flagged", "btn-outline": gameConfig.value.smartFilter !== "flagged" }]
                                  }, [
                                    withDirectives(createVNode("input", {
                                      type: "radio",
                                      "onUpdate:modelValue": ($event) => gameConfig.value.smartFilter = $event,
                                      value: "flagged",
                                      class: "hidden"
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelRadio, gameConfig.value.smartFilter]
                                    ]),
                                    createTextVNode(" ⭐ İşaretlenen (" + toDisplayString(wordCounts.value.flagged || 0) + ") ", 1)
                                  ], 2),
                                  createVNode("label", {
                                    class: ["btn btn-sm", { "btn-primary": gameConfig.value.smartFilter === "recently-learned", "btn-outline": gameConfig.value.smartFilter !== "recently-learned" }]
                                  }, [
                                    withDirectives(createVNode("input", {
                                      type: "radio",
                                      "onUpdate:modelValue": ($event) => gameConfig.value.smartFilter = $event,
                                      value: "recently-learned",
                                      class: "hidden"
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelRadio, gameConfig.value.smartFilter]
                                    ]),
                                    createTextVNode(" 🕒 Son Öğrenilen (" + toDisplayString(wordCounts.value.recentlyLearned || 0) + ") ", 1)
                                  ], 2),
                                  createVNode("label", {
                                    class: ["btn btn-sm", { "btn-primary": gameConfig.value.smartFilter === "unlearned", "btn-outline": gameConfig.value.smartFilter !== "unlearned" }]
                                  }, [
                                    withDirectives(createVNode("input", {
                                      type: "radio",
                                      "onUpdate:modelValue": ($event) => gameConfig.value.smartFilter = $event,
                                      value: "unlearned",
                                      class: "hidden"
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelRadio, gameConfig.value.smartFilter]
                                    ]),
                                    createTextVNode(" 📖 Öğrenilmemiş (" + toDisplayString(((_d2 = wordCounts.value.status) == null ? void 0 : _d2[0]) || 0) + ") ", 1)
                                  ], 2)
                                ])
                              ]),
                              createVNode("div", { class: "bg-base-200 p-4 rounded-lg" }, [
                                createVNode("h4", { class: "font-semibold text-base-content mb-3" }, "📊 Başarı Oranı Filtresi"),
                                createVNode("div", { class: "space-y-3" }, [
                                  createVNode("div", { class: "flex flex-col sm:flex-row items-start sm:items-center gap-3" }, [
                                    createVNode("label", {
                                      class: ["btn btn-sm whitespace-nowrap", { "btn-primary": gameConfig.value.smartFilter === "success-rate", "btn-outline": gameConfig.value.smartFilter !== "success-rate" }]
                                    }, [
                                      withDirectives(createVNode("input", {
                                        type: "radio",
                                        "onUpdate:modelValue": ($event) => gameConfig.value.smartFilter = $event,
                                        value: "success-rate",
                                        class: "hidden"
                                      }, null, 8, ["onUpdate:modelValue"]), [
                                        [vModelRadio, gameConfig.value.smartFilter]
                                      ]),
                                      createTextVNode(" Başarı Oranı Altında ")
                                    ], 2),
                                    createVNode("div", { class: "flex-1 w-full sm:w-auto" }, [
                                      withDirectives(createVNode("input", {
                                        type: "range",
                                        "onUpdate:modelValue": ($event) => gameConfig.value.successRateThreshold = $event,
                                        min: "0",
                                        max: "100",
                                        step: "5",
                                        class: "range range-primary range-sm w-full",
                                        disabled: gameConfig.value.smartFilter !== "success-rate"
                                      }, null, 8, ["onUpdate:modelValue", "disabled"]), [
                                        [vModelText, gameConfig.value.successRateThreshold]
                                      ])
                                    ]),
                                    createVNode("span", { class: "text-sm font-medium min-w-[3rem] text-center" }, "%" + toDisplayString(gameConfig.value.successRateThreshold), 1)
                                  ]),
                                  createVNode("div", { class: "text-xs text-base-content/70" }, " Başarı oranı %" + toDisplayString(gameConfig.value.successRateThreshold) + "'in altında olan kelimeler gösterilecek ", 1)
                                ])
                              ]),
                              createVNode("div", { class: "bg-base-200 p-4 rounded-lg" }, [
                                createVNode("h4", { class: "font-semibold text-base-content mb-3" }, "📝 Kelime Türü"),
                                createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-3 gap-2" }, [
                                  createVNode("label", {
                                    class: ["btn btn-sm", { "btn-primary": gameConfig.value.smartFilter === "nouns", "btn-outline": gameConfig.value.smartFilter !== "nouns" }]
                                  }, [
                                    withDirectives(createVNode("input", {
                                      type: "radio",
                                      "onUpdate:modelValue": ($event) => gameConfig.value.smartFilter = $event,
                                      value: "nouns",
                                      class: "hidden"
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelRadio, gameConfig.value.smartFilter]
                                    ]),
                                    createTextVNode(" 📝 İsimler (" + toDisplayString(((_e2 = wordCounts.value.types) == null ? void 0 : _e2.noun) || 0) + ") ", 1)
                                  ], 2),
                                  createVNode("label", {
                                    class: ["btn btn-sm", { "btn-primary": gameConfig.value.smartFilter === "verbs", "btn-outline": gameConfig.value.smartFilter !== "verbs" }]
                                  }, [
                                    withDirectives(createVNode("input", {
                                      type: "radio",
                                      "onUpdate:modelValue": ($event) => gameConfig.value.smartFilter = $event,
                                      value: "verbs",
                                      class: "hidden"
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelRadio, gameConfig.value.smartFilter]
                                    ]),
                                    createTextVNode(" 🏃 Fiiller (" + toDisplayString(((_f2 = wordCounts.value.types) == null ? void 0 : _f2.verb) || 0) + ") ", 1)
                                  ], 2),
                                  createVNode("label", {
                                    class: ["btn btn-sm", { "btn-primary": gameConfig.value.smartFilter === "adjectives", "btn-outline": gameConfig.value.smartFilter !== "adjectives" }]
                                  }, [
                                    withDirectives(createVNode("input", {
                                      type: "radio",
                                      "onUpdate:modelValue": ($event) => gameConfig.value.smartFilter = $event,
                                      value: "adjectives",
                                      class: "hidden"
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelRadio, gameConfig.value.smartFilter]
                                    ]),
                                    createTextVNode(" 🎨 Sıfatlar (" + toDisplayString(((_g2 = wordCounts.value.types) == null ? void 0 : _g2.adjective) || 0) + ") ", 1)
                                  ], 2)
                                ])
                              ]),
                              createVNode("div", { class: "bg-base-200 p-4 rounded-lg" }, [
                                createVNode("h4", { class: "font-semibold text-base-content mb-3" }, "🎯 Zorluk Seviyesi"),
                                createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-2" }, [
                                  createVNode("label", {
                                    class: ["btn btn-sm", { "btn-primary": gameConfig.value.smartFilter === "easy", "btn-outline": gameConfig.value.smartFilter !== "easy" }]
                                  }, [
                                    withDirectives(createVNode("input", {
                                      type: "radio",
                                      "onUpdate:modelValue": ($event) => gameConfig.value.smartFilter = $event,
                                      value: "easy",
                                      class: "hidden"
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelRadio, gameConfig.value.smartFilter]
                                    ]),
                                    createTextVNode(" 😊 Kolay (" + toDisplayString((((_h2 = wordCounts.value.difficulty) == null ? void 0 : _h2[1]) || 0) + (((_i2 = wordCounts.value.difficulty) == null ? void 0 : _i2[2]) || 0)) + ") ", 1)
                                  ], 2),
                                  createVNode("label", {
                                    class: ["btn btn-sm", { "btn-primary": gameConfig.value.smartFilter === "difficult", "btn-outline": gameConfig.value.smartFilter !== "difficult" }]
                                  }, [
                                    withDirectives(createVNode("input", {
                                      type: "radio",
                                      "onUpdate:modelValue": ($event) => gameConfig.value.smartFilter = $event,
                                      value: "difficult",
                                      class: "hidden"
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelRadio, gameConfig.value.smartFilter]
                                    ]),
                                    createTextVNode(" 🔥 Zor (" + toDisplayString((((_j2 = wordCounts.value.difficulty) == null ? void 0 : _j2[3]) || 0) + (((_k2 = wordCounts.value.difficulty) == null ? void 0 : _k2[4]) || 0)) + ") ", 1)
                                  ], 2)
                                ])
                              ]),
                              createVNode("div", { class: "bg-base-200 p-4 rounded-lg" }, [
                                createVNode("label", {
                                  class: ["btn btn-sm w-full", { "btn-primary": gameConfig.value.smartFilter === "all", "btn-outline": gameConfig.value.smartFilter !== "all" }]
                                }, [
                                  withDirectives(createVNode("input", {
                                    type: "radio",
                                    "onUpdate:modelValue": ($event) => gameConfig.value.smartFilter = $event,
                                    value: "all",
                                    class: "hidden"
                                  }, null, 8, ["onUpdate:modelValue"]), [
                                    [vModelRadio, gameConfig.value.smartFilter]
                                  ]),
                                  createTextVNode(" 📚 Tüm Kelimeler (" + toDisplayString(((_l2 = props.words) == null ? void 0 : _l2.length) || 0) + ") ", 1)
                                ], 2)
                              ])
                            ])) : createCommentVNode("", true),
                            gameConfig.value.smartFilter !== "all" ? (openBlock(), createBlock("div", {
                              key: 1,
                              class: "mt-4 p-4 bg-info/10 border border-info/20 rounded-lg"
                            }, [
                              createVNode("div", { class: "flex items-start gap-3" }, [
                                createVNode("div", { class: "text-info" }, [
                                  (openBlock(), createBlock("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    class: "h-5 w-5",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    stroke: "currentColor"
                                  }, [
                                    createVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      "stroke-width": "2",
                                      d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    })
                                  ]))
                                ]),
                                createVNode("div", { class: "flex-1" }, [
                                  createVNode("h5", { class: "font-semibold text-base-content mb-1" }, toDisplayString(getFilterDescription(gameConfig.value.smartFilter).title), 1),
                                  createVNode("p", { class: "text-sm text-base-content/70" }, toDisplayString(getFilterDescription(gameConfig.value.smartFilter).description), 1),
                                  createVNode("div", { class: "mt-2 text-xs text-base-content/60" }, [
                                    createVNode("strong", null, "Filtreleme Kriteri:"),
                                    createTextVNode(" " + toDisplayString(getFilterDescription(gameConfig.value.smartFilter).criteria), 1)
                                  ])
                                ])
                              ])
                            ])) : createCommentVNode("", true),
                            createVNode("div", { class: "mt-6 p-4 bg-base-200 rounded-lg" }, [
                              createVNode("h4", { class: "font-semibold text-base-content mb-3" }, "🎮 Oyun Ayarları"),
                              createVNode("div", { class: "flex flex-col sm:flex-row items-start sm:items-center gap-4" }, [
                                createVNode("div", { class: "form-control w-full sm:w-auto" }, [
                                  createVNode("label", { class: "label" }, [
                                    createVNode("span", { class: "label-text font-medium" }, "Soru Sayısı")
                                  ]),
                                  withDirectives(createVNode("select", {
                                    "onUpdate:modelValue": ($event) => gameConfig.value.questionCount = $event,
                                    class: "select select-bordered select-sm w-full sm:w-auto"
                                  }, [
                                    filteredWordsForGame.value.length < 60 ? (openBlock(), createBlock("option", {
                                      key: 0,
                                      value: filteredWordsForGame.value.length
                                    }, " Tümü (" + toDisplayString(filteredWordsForGame.value.length) + ") ", 9, ["value"])) : createCommentVNode("", true),
                                    createVNode("option", { value: "5" }, "5 Soru"),
                                    createVNode("option", { value: "10" }, "10 Soru"),
                                    createVNode("option", { value: "15" }, "15 Soru"),
                                    createVNode("option", { value: "20" }, "20 Soru"),
                                    createVNode("option", { value: "25" }, "25 Soru")
                                  ], 8, ["onUpdate:modelValue"]), [
                                    [vModelSelect, gameConfig.value.questionCount]
                                  ])
                                ])
                              ])
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "mt-6" }, [
                          createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                            createVNode("div", { class: "flex items-center gap-3" }, [
                              createVNode("h3", { class: "text-lg font-bold text-base-content" }, "📋 Kelime Listesi"),
                              createVNode("div", { class: "badge badge-primary badge-lg" }, toDisplayString(filteredWordsForGame.value.length) + " kelime ", 1),
                              gameConfig.value.smartFilter !== "all" ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "badge badge-secondary badge-sm"
                              }, toDisplayString(getSmartFilterLabel(gameConfig.value.smartFilter)) + " filtresi aktif ", 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "flex gap-2" }, [
                              createVNode("button", {
                                onClick: exportFilteredWords,
                                class: "btn btn-success btn-sm",
                                disabled: filteredWordsForGame.value.length === 0
                              }, [
                                (openBlock(), createBlock("svg", {
                                  class: "h-4 w-4 mr-1",
                                  fill: "none",
                                  stroke: "currentColor",
                                  viewBox: "0 0 24 24"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    "stroke-width": "2",
                                    d: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                  })
                                ])),
                                createTextVNode(" Dışa Aktar ")
                              ], 8, ["disabled"])
                            ])
                          ]),
                          filteredWordsForGame.value.length === 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "alert alert-warning mb-4"
                          }, [
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              class: "stroke-current shrink-0 h-6 w-6",
                              fill: "none",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                              })
                            ])),
                            createVNode("span", null, "Seçili filtrelerle eşleşen kelime bulunamadı. Lütfen filtreleri değiştirin.")
                          ])) : filteredWordsForGame.value.length < 5 ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "alert alert-info mb-4"
                          }, [
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              class: "stroke-current shrink-0 w-6 h-6"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              })
                            ])),
                            createVNode("span", null, "Seçili filtrelerle sadece " + toDisplayString(filteredWordsForGame.value.length) + " kelime bulundu. Oyun için en az 5 kelime önerilir.", 1)
                          ])) : (openBlock(), createBlock("div", {
                            key: 2,
                            class: "alert alert-success mb-4"
                          }, [
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              class: "stroke-current shrink-0 h-6 w-6",
                              fill: "none",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              })
                            ])),
                            createVNode("span", null, toDisplayString(filteredWordsForGame.value.length) + " kelime hazır! Oyunu başlatabilirsiniz.", 1)
                          ])),
                          createVNode("div", { class: "card bg-base-100 shadow-sm" }, [
                            createVNode("div", { class: "card-body p-0" }, [
                              createVNode("div", { class: "overflow-x-auto" }, [
                                createVNode("table", { class: "table table-zebra w-full" }, [
                                  createVNode("thead", null, [
                                    createVNode("tr", null, [
                                      createVNode("th", { class: "text-left" }, "Kelime"),
                                      createVNode("th", { class: "text-left" }, "Anlam"),
                                      createVNode("th", { class: "text-center" }, [
                                        createVNode("div", { class: "flex items-center justify-center gap-2" }, [
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
                                      createVNode("th", { class: "text-center" }, "Zorluk"),
                                      createVNode("th", { class: "text-center" }, "Durum"),
                                      createVNode("th", { class: "text-center" }, [
                                        createVNode("div", { class: "flex items-center justify-center gap-2" }, [
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
                                      createVNode("th", { class: "text-center" }, "İşlem")
                                    ])
                                  ]),
                                  createVNode("tbody", null, [
                                    isLoading.value ? (openBlock(), createBlock("tr", { key: 0 }, [
                                      createVNode("td", {
                                        colspan: "6",
                                        class: "text-center py-8"
                                      }, [
                                        createVNode("span", { class: "loading loading-spinner loading-md" })
                                      ])
                                    ])) : displayedWords.value.length === 0 ? (openBlock(), createBlock("tr", { key: 1 }, [
                                      createVNode("td", {
                                        colspan: "6",
                                        class: "text-center py-8"
                                      }, [
                                        createVNode("div", { class: "text-base-content/70" }, "Sonuç bulunamadı")
                                      ])
                                    ])) : createCommentVNode("", true),
                                    (openBlock(true), createBlock(Fragment, null, renderList(displayedWords.value, (word) => {
                                      return openBlock(), createBlock("tr", {
                                        key: word.id,
                                        class: "hover:bg-base-200 cursor-pointer",
                                        onClick: ($event) => showWordDetails(word)
                                      }, [
                                        createVNode("td", { class: "font-semibold text-base-content" }, toDisplayString(word.word), 1),
                                        createVNode("td", { class: "text-base-content/80" }, toDisplayString(getPrimaryMeaning(word)), 1),
                                        createVNode("td", { class: "text-center" }, [
                                          createVNode("span", { class: "badge badge-outline badge-sm" }, toDisplayString(getWordTypeLabel(word.type)), 1)
                                        ]),
                                        createVNode("td", { class: "text-center" }, [
                                          createVNode("span", {
                                            class: ["badge badge-sm", getDifficultyBadgeClass(word.difficulty_level)]
                                          }, toDisplayString(getDifficultyLabel(word.difficulty_level)), 3)
                                        ]),
                                        createVNode("td", { class: "text-center" }, [
                                          createVNode("span", {
                                            class: ["badge badge-sm", getLearningStatusBadgeClass(word.learning_status)]
                                          }, toDisplayString(getLearningStatusLabel(word.learning_status)), 3)
                                        ]),
                                        createVNode("td", { class: "text-center" }, [
                                          word.review_count > 0 ? (openBlock(), createBlock("span", {
                                            key: 0,
                                            class: ["badge badge-sm", getSuccessRateBadgeClass(calculateSuccessRate(word).rate)]
                                          }, toDisplayString(calculateSuccessRate(word).label), 3)) : (openBlock(), createBlock("span", {
                                            key: 1,
                                            class: "text-xs text-base-content/50"
                                          }, "-"))
                                        ]),
                                        createVNode("td", { class: "text-center" }, [
                                          createVNode("div", { class: "flex gap-1 justify-center" }, [
                                            createVNode("button", { class: "btn btn-ghost btn-xs" }, [
                                              (openBlock(), createBlock("svg", {
                                                class: "h-4 w-4",
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24"
                                              }, [
                                                createVNode("path", {
                                                  "stroke-linecap": "round",
                                                  "stroke-linejoin": "round",
                                                  "stroke-width": "2",
                                                  d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                }),
                                                createVNode("path", {
                                                  "stroke-linecap": "round",
                                                  "stroke-linejoin": "round",
                                                  "stroke-width": "2",
                                                  d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                })
                                              ]))
                                            ]),
                                            isLoggedIn.value ? (openBlock(), createBlock(unref(Link), {
                                              key: 0,
                                              href: _ctx.route("rendition.words.edit", word.id),
                                              class: "btn btn-ghost btn-xs"
                                            }, {
                                              default: withCtx(() => [
                                                (openBlock(), createBlock("svg", {
                                                  class: "h-4 w-4",
                                                  fill: "none",
                                                  stroke: "currentColor",
                                                  viewBox: "0 0 24 24"
                                                }, [
                                                  createVNode("path", {
                                                    "stroke-linecap": "round",
                                                    "stroke-linejoin": "round",
                                                    "stroke-width": "2",
                                                    d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                  })
                                                ]))
                                              ]),
                                              _: 2
                                            }, 1032, ["href"])) : createCommentVNode("", true)
                                          ])
                                        ])
                                      ], 8, ["onClick"]);
                                    }), 128))
                                  ])
                                ])
                              ])
                            ])
                          ])
                        ]),
                        filteredWordsForGame.value.length > perPage.value ? (openBlock(), createBlock("div", {
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
                        ((_m2 = props.words) == null ? void 0 : _m2.length) === 0 ? (openBlock(), createBlock("div", {
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
                        ])) : filteredWordsForGame.value.length < 5 ? (openBlock(), createBlock("div", {
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
                          createVNode("span", null, "Seçili filtrelerle yeterli kelime bulunamadı. En az 5 kelime gerekiyor.")
                        ])) : createCommentVNode("", true)
                      ]))
                    ];
                  }),
                  _: 1
                })
              ]),
              selectedWord.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "modal modal-open"
              }, [
                createVNode("div", { class: "modal-box max-w-2xl" }, [
                  createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                    createVNode("h3", { class: "font-bold text-lg text-base-content" }, toDisplayString(selectedWord.value.word), 1),
                    createVNode("button", {
                      onClick: ($event) => selectedWord.value = null,
                      class: "btn btn-ghost btn-sm btn-circle"
                    }, [
                      (openBlock(), createBlock("svg", {
                        class: "h-4 w-4",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M6 18L18 6M6 6l12 12"
                        })
                      ]))
                    ], 8, ["onClick"])
                  ]),
                  createVNode("div", { class: "space-y-4" }, [
                    createVNode("div", null, [
                      createVNode("h4", { class: "font-semibold text-base-content mb-2" }, "Anlamlar"),
                      createVNode("div", { class: "space-y-2" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(selectedWord.value.meanings, (meaning, index) => {
                          return openBlock(), createBlock("div", {
                            key: index,
                            class: ["flex items-center gap-2 p-2 rounded-lg", meaning.is_primary ? "bg-primary/10 border border-primary/20" : "bg-base-200"]
                          }, [
                            createVNode("span", { class: "text-sm font-medium" }, toDisplayString(index + 1) + ".", 1),
                            createVNode("span", { class: "text-base-content" }, toDisplayString(meaning.meaning), 1),
                            meaning.is_primary ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "badge badge-primary badge-xs"
                            }, "Birincil")) : createCommentVNode("", true)
                          ], 2);
                        }), 128))
                      ])
                    ]),
                    createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                      createVNode("div", null, [
                        createVNode("h4", { class: "font-semibold text-base-content mb-2" }, "Temel Bilgiler"),
                        createVNode("div", { class: "space-y-2 text-sm" }, [
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", { class: "text-base-content/70" }, "Tür:"),
                            createVNode("span", { class: "text-base-content" }, toDisplayString(getWordTypeLabel(selectedWord.value.type)), 1)
                          ]),
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", { class: "text-base-content/70" }, "Zorluk:"),
                            createVNode("span", {
                              class: ["badge badge-sm", getDifficultyBadgeClass(selectedWord.value.difficulty_level)]
                            }, toDisplayString(getDifficultyLabel(selectedWord.value.difficulty_level)), 3)
                          ]),
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", { class: "text-base-content/70" }, "Durum:"),
                            createVNode("span", {
                              class: ["badge badge-sm", getLearningStatusBadgeClass(selectedWord.value.learning_status)]
                            }, toDisplayString(getLearningStatusLabel(selectedWord.value.learning_status)), 3)
                          ]),
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", { class: "text-base-content/70" }, "Öne Çıkar:"),
                            createVNode("span", { class: "text-base-content" }, toDisplayString(selectedWord.value.is_flagged ? "Evet" : "Hayır"), 1)
                          ])
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("h4", { class: "font-semibold text-base-content mb-2" }, "İstatistikler"),
                        createVNode("div", { class: "space-y-2 text-sm" }, [
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", { class: "text-base-content/70" }, "Toplam Sorulma:"),
                            createVNode("span", { class: "text-base-content" }, toDisplayString(selectedWord.value.review_count || 0), 1)
                          ]),
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", { class: "text-base-content/70" }, "Yanlış Sayısı:"),
                            createVNode("span", { class: "text-base-content" }, toDisplayString(selectedWord.value.incorrect_count || 0), 1)
                          ]),
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", { class: "text-base-content/70" }, "Başarı Oranı:"),
                            createVNode("span", {
                              class: ["badge badge-sm", getSuccessRateBadgeClass(calculateSuccessRate(selectedWord.value).rate)]
                            }, toDisplayString(calculateSuccessRate(selectedWord.value).label), 3)
                          ]),
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", { class: "text-base-content/70" }, "Son Güncelleme:"),
                            createVNode("span", { class: "text-base-content" }, toDisplayString(new Date(selectedWord.value.updated_at).toLocaleDateString("tr-TR")), 1)
                          ])
                        ])
                      ])
                    ]),
                    selectedWord.value.example_sentences && selectedWord.value.example_sentences.length > 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                      createVNode("h4", { class: "font-semibold text-base-content mb-2" }, "Örnek Cümleler"),
                      createVNode("div", { class: "space-y-2" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(selectedWord.value.example_sentences, (sentence, index) => {
                          return openBlock(), createBlock("div", {
                            key: index,
                            class: "p-3 bg-base-200 rounded-lg"
                          }, [
                            createVNode("div", { class: "text-base-content font-medium" }, toDisplayString(sentence), 1),
                            selectedWord.value.example_translations && selectedWord.value.example_translations[index] ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "text-sm text-base-content/70 mt-1"
                            }, toDisplayString(selectedWord.value.example_translations[index]), 1)) : createCommentVNode("", true)
                          ]);
                        }), 128))
                      ])
                    ])) : createCommentVNode("", true),
                    selectedWord.value.synonyms && selectedWord.value.synonyms.length > 0 ? (openBlock(), createBlock("div", { key: 1 }, [
                      createVNode("h4", { class: "font-semibold text-base-content mb-2" }, "Eş Anlamlılar"),
                      createVNode("div", { class: "flex flex-wrap gap-2" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(selectedWord.value.synonyms, (synonym) => {
                          return openBlock(), createBlock("span", {
                            key: synonym,
                            class: "badge badge-outline"
                          }, toDisplayString(synonym), 1);
                        }), 128))
                      ])
                    ])) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "modal-action" }, [
                    createVNode("button", {
                      onClick: ($event) => selectedWord.value = null,
                      class: "btn btn-outline"
                    }, "Kapat", 8, ["onClick"])
                  ])
                ])
              ])) : createCommentVNode("", true)
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
const Screen = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6e44dcc6"]]);
export {
  Screen as default
};
