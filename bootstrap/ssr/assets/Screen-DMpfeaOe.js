import { ref, computed, watch, onMounted, withCtx, unref, createTextVNode, createBlock, openBlock, createVNode, createCommentVNode, toDisplayString, withDirectives, withKeys, vModelText, vModelSelect, Transition, Fragment, renderList, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-faNUnK3u.js";
import MultipleChoice from "./MultipleChoice-Bv7hz5PR.js";
import TranslateWord from "./TranslateWord-N_wPB8Op.js";
import WordCompletion from "./WordCompletion-CBRJ0lDw.js";
import { _ as _export_sfc } from "../ssr.js";
import "gsap";
import "@fortawesome/vue-fontawesome";
import "vuex";
import "axios";
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
    ref(false);
    computed(() => {
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
        result = result.filter((word) => {
          if (word.word.toLowerCase().includes(query)) return true;
          if (word.meanings && word.meanings.length > 0) {
            return word.meanings.some((meaning) => meaning.meaning.toLowerCase().includes(query));
          }
          if (word.meaning && word.meaning.toLowerCase().includes(query)) return true;
          return false;
        });
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
      return filteredWordList.value.slice(startIndex, startIndex + perPage.value);
    });
    const totalPages = computed(() => {
      return Math.ceil(filteredWordList.value.length / perPage.value);
    });
    const paginationInfo = computed(() => {
      const start = (currentPage.value - 1) * perPage.value + 1;
      const end = Math.min(start + perPage.value - 1, filteredWordList.value.length);
      return `${start}-${end} / ${filteredWordList.value.length}`;
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
      }, 200);
    };
    const filteredWords = computed(() => {
      let wordsToUse = filteredWordsForGame.value.length > 0 ? [...filteredWordsForGame.value] : [...props.words || []];
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
    const showFilteredWordsModal = ref(false);
    const hasEnoughWords = computed(() => {
      return filteredWordsForGame.value.length >= 5;
    });
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
    const stopGame = () => {
      showGameInterface.value = false;
      currentGame.value = "";
      loadingGame.value = false;
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
    watch([searchQuery, filterType, filterStatus], () => {
      currentPage.value = 1;
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
    const getSentenceText = (sentence) => {
      if (typeof sentence === "string") return sentence;
      if (sentence && sentence.sentence) return sentence.sentence;
      if (sentence && sentence.translation) return sentence.translation;
      return "";
    };
    const getSentenceTranslation = (sentence) => {
      if (typeof sentence === "string") return "";
      if (sentence && sentence.translation) return sentence.translation;
      return "";
    };
    const getWordTypeStats = (words) => {
      const stats = {};
      words.forEach((word) => {
        stats[word.type] = (stats[word.type] || 0) + 1;
      });
      return stats;
    };
    const getDifficultyStats = (words) => {
      const stats = {};
      words.forEach((word) => {
        stats[word.difficulty_level] = (stats[word.difficulty_level] || 0) + 1;
      });
      return stats;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h;
          if (_push2) {
            _push2(`<div class="container mx-auto max-w-7xl px-4 py-6" data-v-92d0d7d3${_scopeId}><div class="mb-8" data-v-92d0d7d3${_scopeId}><div class="flex items-center justify-between" data-v-92d0d7d3${_scopeId}><div data-v-92d0d7d3${_scopeId}><h1 class="text-3xl font-bold tracking-tight" data-v-92d0d7d3${_scopeId}>${ssrInterpolate(((_a = props.pack) == null ? void 0 : _a.name) || "Kelimeler")}</h1><p class="text-muted-foreground mt-1" data-v-92d0d7d3${_scopeId}>${ssrInterpolate(((_b = props.words) == null ? void 0 : _b.length) || 0)} kelime bulundu</p></div><div class="flex items-center gap-2" data-v-92d0d7d3${_scopeId}>`);
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
                class: "btn btn-sm bg-base-content text-base-100 hover:bg-base-300 hover:text-base-content"
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
            _push2(`</div></div></div>`);
            if (!showGameInterface.value) {
              _push2(`<div class="mb-6 space-y-4" data-v-92d0d7d3${_scopeId}><div class="flex max-w-sm gap-3" data-v-92d0d7d3${_scopeId}><div class="flex-1" data-v-92d0d7d3${_scopeId}><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Kelime veya anlam ara..." class="input-bordered input w-full" data-v-92d0d7d3${_scopeId}></div><button class="btn btn-sm bg-base-content text-base-100 hover:bg-base-300 hover:text-base-content" data-v-92d0d7d3${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4" data-v-92d0d7d3${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" data-v-92d0d7d3${_scopeId}></path></svg></button></div><div class="space-y-3" data-v-92d0d7d3${_scopeId}><div class="flex flex-wrap gap-2" data-v-92d0d7d3${_scopeId}><button class="btn btn-outline"${ssrIncludeBooleanAttr(!hasEnoughWords.value) ? " disabled" : ""} data-v-92d0d7d3${_scopeId}> Çoktan Seçmeli </button><button class="btn btn-outline"${ssrIncludeBooleanAttr(!hasEnoughWords.value) ? " disabled" : ""} data-v-92d0d7d3${_scopeId}> Boşluk Doldurma </button><button class="btn btn-outline"${ssrIncludeBooleanAttr(!hasEnoughWords.value) ? " disabled" : ""} data-v-92d0d7d3${_scopeId}> Kelime Tamamlama </button></div><div class="flex flex-wrap gap-2" data-v-92d0d7d3${_scopeId}><select class="select-bordered select" data-v-92d0d7d3${_scopeId}><option value="all" data-v-92d0d7d3${ssrIncludeBooleanAttr(Array.isArray(gameConfig.value.smartFilter) ? ssrLooseContain(gameConfig.value.smartFilter, "all") : ssrLooseEqual(gameConfig.value.smartFilter, "all")) ? " selected" : ""}${_scopeId}>Tüm Kelimeler</option><option value="never-answered" data-v-92d0d7d3${ssrIncludeBooleanAttr(Array.isArray(gameConfig.value.smartFilter) ? ssrLooseContain(gameConfig.value.smartFilter, "never-answered") : ssrLooseEqual(gameConfig.value.smartFilter, "never-answered")) ? " selected" : ""}${_scopeId}>Hiç Cevaplanmamış</option><option value="most-mistakes" data-v-92d0d7d3${ssrIncludeBooleanAttr(Array.isArray(gameConfig.value.smartFilter) ? ssrLooseContain(gameConfig.value.smartFilter, "most-mistakes") : ssrLooseEqual(gameConfig.value.smartFilter, "most-mistakes")) ? " selected" : ""}${_scopeId}>Çok Hata Yapılan</option><option value="flagged" data-v-92d0d7d3${ssrIncludeBooleanAttr(Array.isArray(gameConfig.value.smartFilter) ? ssrLooseContain(gameConfig.value.smartFilter, "flagged") : ssrLooseEqual(gameConfig.value.smartFilter, "flagged")) ? " selected" : ""}${_scopeId}>İşaretlenen</option><option value="unlearned" data-v-92d0d7d3${ssrIncludeBooleanAttr(Array.isArray(gameConfig.value.smartFilter) ? ssrLooseContain(gameConfig.value.smartFilter, "unlearned") : ssrLooseEqual(gameConfig.value.smartFilter, "unlearned")) ? " selected" : ""}${_scopeId}>Öğrenilmemiş</option><option value="nouns" data-v-92d0d7d3${ssrIncludeBooleanAttr(Array.isArray(gameConfig.value.smartFilter) ? ssrLooseContain(gameConfig.value.smartFilter, "nouns") : ssrLooseEqual(gameConfig.value.smartFilter, "nouns")) ? " selected" : ""}${_scopeId}>İsimler</option><option value="verbs" data-v-92d0d7d3${ssrIncludeBooleanAttr(Array.isArray(gameConfig.value.smartFilter) ? ssrLooseContain(gameConfig.value.smartFilter, "verbs") : ssrLooseEqual(gameConfig.value.smartFilter, "verbs")) ? " selected" : ""}${_scopeId}>Fiiller</option><option value="adjectives" data-v-92d0d7d3${ssrIncludeBooleanAttr(Array.isArray(gameConfig.value.smartFilter) ? ssrLooseContain(gameConfig.value.smartFilter, "adjectives") : ssrLooseEqual(gameConfig.value.smartFilter, "adjectives")) ? " selected" : ""}${_scopeId}>Sıfatlar</option></select><select class="select-bordered select" data-v-92d0d7d3${_scopeId}><option value="5" data-v-92d0d7d3${ssrIncludeBooleanAttr(Array.isArray(gameConfig.value.questionCount) ? ssrLooseContain(gameConfig.value.questionCount, "5") : ssrLooseEqual(gameConfig.value.questionCount, "5")) ? " selected" : ""}${_scopeId}>5 Soru</option><option value="10" data-v-92d0d7d3${ssrIncludeBooleanAttr(Array.isArray(gameConfig.value.questionCount) ? ssrLooseContain(gameConfig.value.questionCount, "10") : ssrLooseEqual(gameConfig.value.questionCount, "10")) ? " selected" : ""}${_scopeId}>10 Soru</option><option value="15" data-v-92d0d7d3${ssrIncludeBooleanAttr(Array.isArray(gameConfig.value.questionCount) ? ssrLooseContain(gameConfig.value.questionCount, "15") : ssrLooseEqual(gameConfig.value.questionCount, "15")) ? " selected" : ""}${_scopeId}>15 Soru</option><option value="20" data-v-92d0d7d3${ssrIncludeBooleanAttr(Array.isArray(gameConfig.value.questionCount) ? ssrLooseContain(gameConfig.value.questionCount, "20") : ssrLooseEqual(gameConfig.value.questionCount, "20")) ? " selected" : ""}${_scopeId}>20 Soru</option><option value="25" data-v-92d0d7d3${ssrIncludeBooleanAttr(Array.isArray(gameConfig.value.questionCount) ? ssrLooseContain(gameConfig.value.questionCount, "25") : ssrLooseEqual(gameConfig.value.questionCount, "25")) ? " selected" : ""}${_scopeId}>25 Soru</option></select><button class="btn btn-outline" data-v-92d0d7d3${_scopeId}>Sıfırla</button></div>`);
              if (gameConfig.value.smartFilter !== "all") {
                _push2(`<div class="rounded-lg bg-base-200 p-3" data-v-92d0d7d3${_scopeId}><div class="flex items-center justify-between" data-v-92d0d7d3${_scopeId}><div class="flex items-center gap-2 text-sm" data-v-92d0d7d3${_scopeId}><svg class="text-base-content/70 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-92d0d7d3${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-92d0d7d3${_scopeId}></path></svg><span class="text-base-content/70" data-v-92d0d7d3${_scopeId}>${ssrInterpolate(getFilterDescription(gameConfig.value.smartFilter).description)} <span class="font-medium text-base-content" data-v-92d0d7d3${_scopeId}>${ssrInterpolate(filteredWordsForGame.value.length)} kelime</span> bulundu. </span></div><button class="btn btn-outline btn-xs"${ssrIncludeBooleanAttr(filteredWordsForGame.value.length === 0) ? " disabled" : ""} data-v-92d0d7d3${_scopeId}><svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-92d0d7d3${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-92d0d7d3${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-92d0d7d3${_scopeId}></path></svg> Detayları Gör </button></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (showGameInterface.value) {
              _push2(`<div class="my-8" data-v-92d0d7d3${_scopeId}><div class="mb-4 flex justify-end" data-v-92d0d7d3${_scopeId}><button class="btn btn-outline btn-sm" data-v-92d0d7d3${_scopeId}><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-92d0d7d3${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-92d0d7d3${_scopeId}></path></svg> Oyunu Durdur </button></div>`);
              if (loadingGame.value) {
                _push2(`<div class="flex h-60 items-center justify-center" data-v-92d0d7d3${_scopeId}><div class="loading loading-spinner loading-lg" data-v-92d0d7d3${_scopeId}></div></div>`);
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
            } else if (!showGameInterface.value) {
              _push2(`<div data-v-92d0d7d3${_scopeId}><div class="rounded-lg border border-base-300" data-v-92d0d7d3${_scopeId}><div class="relative w-full overflow-auto" data-v-92d0d7d3${_scopeId}><table class="w-full caption-bottom text-sm" data-v-92d0d7d3${_scopeId}><thead class="[&amp;_tr]:border-b" data-v-92d0d7d3${_scopeId}><tr class="border-b border-base-300 transition-colors hover:bg-base-200" data-v-92d0d7d3${_scopeId}><th class="text-base-content/70 h-10 px-2 text-left align-middle font-medium [&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px]" data-v-92d0d7d3${_scopeId}> Kelime </th><th class="text-base-content/70 h-10 px-2 text-left align-middle font-medium [&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px]" data-v-92d0d7d3${_scopeId}> Anlam </th><th class="text-base-content/70 h-10 px-2 text-left align-middle font-medium [&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px]" data-v-92d0d7d3${_scopeId}> İşlem </th></tr></thead><tbody class="[&amp;_tr:last-child]:border-0" data-v-92d0d7d3${_scopeId}>`);
              if (isLoading.value) {
                _push2(`<tr class="border-b border-base-300 transition-colors hover:bg-base-200" data-v-92d0d7d3${_scopeId}><td colspan="3" class="p-4 text-center" data-v-92d0d7d3${_scopeId}><div class="loading loading-spinner loading-md" data-v-92d0d7d3${_scopeId}></div></td></tr>`);
              } else if (displayedWords.value.length === 0) {
                _push2(`<tr class="border-b border-base-300 transition-colors hover:bg-base-200" data-v-92d0d7d3${_scopeId}><td colspan="3" class="text-base-content/70 p-4 text-center" data-v-92d0d7d3${_scopeId}>Sonuç bulunamadı</td></tr>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--[-->`);
              ssrRenderList(displayedWords.value, (word) => {
                _push2(`<tr class="cursor-pointer border-b border-base-300 transition-colors hover:bg-base-200" data-v-92d0d7d3${_scopeId}><td class="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px]" data-v-92d0d7d3${_scopeId}><div class="font-medium text-base-content" data-v-92d0d7d3${_scopeId}>${ssrInterpolate(word.word)}</div></td><td class="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px]" data-v-92d0d7d3${_scopeId}><div class="text-base-content/70" data-v-92d0d7d3${_scopeId}>${ssrInterpolate(getPrimaryMeaning(word))}</div></td><td class="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px]" data-v-92d0d7d3${_scopeId}><div class="flex items-center gap-2" data-v-92d0d7d3${_scopeId}><button class="btn btn-ghost btn-xs btn-square" data-v-92d0d7d3${_scopeId}><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-92d0d7d3${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-92d0d7d3${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-92d0d7d3${_scopeId}></path></svg></button>`);
                if (isLoggedIn.value) {
                  _push2(ssrRenderComponent(unref(Link), {
                    href: _ctx.route("rendition.words.edit", word.id),
                    class: "btn btn-ghost btn-xs btn-square",
                    onClick: () => {
                    }
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-92d0d7d3${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-92d0d7d3${_scopeId2}></path></svg>`);
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
              _push2(`<!--]--></tbody></table></div></div>`);
              if (filteredWordsForGame.value.length > perPage.value) {
                _push2(`<div class="mt-4 flex items-center justify-between" data-v-92d0d7d3${_scopeId}><div class="text-base-content/70 text-sm" data-v-92d0d7d3${_scopeId}>${ssrInterpolate(paginationInfo.value)}</div><div class="flex items-center space-x-2" data-v-92d0d7d3${_scopeId}><button${ssrIncludeBooleanAttr(currentPage.value <= 1) ? " disabled" : ""} class="btn btn-outline" data-v-92d0d7d3${_scopeId}> Önceki </button><span class="text-sm font-medium text-base-content" data-v-92d0d7d3${_scopeId}>${ssrInterpolate(currentPage.value)}</span><button${ssrIncludeBooleanAttr(currentPage.value >= totalPages.value) ? " disabled" : ""} class="btn btn-outline" data-v-92d0d7d3${_scopeId}> Sonraki </button></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (((_f = props.words) == null ? void 0 : _f.length) === 0) {
                _push2(`<div class="mt-8 text-center" data-v-92d0d7d3${_scopeId}><div class="text-base-content/40 mx-auto h-12 w-12" data-v-92d0d7d3${_scopeId}><svg fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-92d0d7d3${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-92d0d7d3${_scopeId}></path></svg></div><h3 class="mt-4 text-lg font-semibold text-base-content" data-v-92d0d7d3${_scopeId}>Kelime bulunamadı</h3><p class="text-base-content/70 mt-2" data-v-92d0d7d3${_scopeId}>Bu pakette henüz kelime bulunmamaktadır.</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (selectedWord.value) {
              _push2(`<div class="bg-base-content/20 fixed inset-0 z-50" data-v-92d0d7d3${_scopeId}><div class="fixed left-[50%] top-[50%] z-50 flex grid max-h-[80vh] w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] flex-col gap-4 border border-base-300 bg-base-100 shadow-xl duration-200 sm:rounded-xl" data-v-92d0d7d3${_scopeId}><div class="flex flex-shrink-0 flex-col space-y-1.5 border-b border-base-300 bg-base-100 p-6 pb-4 text-center sm:text-left" data-v-92d0d7d3${_scopeId}><div class="flex items-center justify-between" data-v-92d0d7d3${_scopeId}><h3 class="text-lg font-semibold leading-none tracking-tight text-base-content" data-v-92d0d7d3${_scopeId}>${ssrInterpolate(selectedWord.value.word)}</h3><button class="btn btn-ghost btn-xs btn-square" data-v-92d0d7d3${_scopeId}><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-92d0d7d3${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-92d0d7d3${_scopeId}></path></svg></button></div><p class="text-base-content/70 text-sm" data-v-92d0d7d3${_scopeId}>${ssrInterpolate(getWordTypeLabel(selectedWord.value.type))} • ${ssrInterpolate(getDifficultyLabel(selectedWord.value.difficulty_level))}</p></div><div class="flex-1 overflow-y-auto p-6 pt-4" data-v-92d0d7d3${_scopeId}><div class="space-y-4" data-v-92d0d7d3${_scopeId}><div data-v-92d0d7d3${_scopeId}><h4 class="text-sm font-medium leading-none text-base-content" data-v-92d0d7d3${_scopeId}>Anlamlar</h4><div class="mt-2 space-y-2" data-v-92d0d7d3${_scopeId}><!--[-->`);
              ssrRenderList(selectedWord.value.meanings, (meaning, index) => {
                _push2(`<div class="${ssrRenderClass([meaning.is_primary ? "bg-base-content text-base-100" : "bg-base-200", "flex items-start gap-3 rounded-lg border border-base-300 p-3"])}" data-v-92d0d7d3${_scopeId}><span class="${ssrRenderClass([meaning.is_primary ? "bg-base-100 text-base-content" : "bg-base-300 text-base-content", "flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-medium"])}" data-v-92d0d7d3${_scopeId}>${ssrInterpolate(index + 1)}</span><div class="min-w-0 flex-1" data-v-92d0d7d3${_scopeId}><span class="${ssrRenderClass([meaning.is_primary ? "text-base-100" : "text-base-content", "text-sm"])}" data-v-92d0d7d3${_scopeId}>${ssrInterpolate(meaning.meaning)}</span>`);
                if (meaning.is_primary) {
                  _push2(`<span class="${ssrRenderClass([meaning.is_primary ? "bg-base-100 text-base-content" : "bg-base-300 text-base-content", "ml-2 inline-flex items-center rounded-full px-2 py-1 text-xs font-medium"])}" data-v-92d0d7d3${_scopeId}> Birincil </span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div>`);
              });
              _push2(`<!--]--></div></div><div class="grid grid-cols-2 gap-4" data-v-92d0d7d3${_scopeId}><div class="rounded-lg border border-base-300 bg-base-200 p-3" data-v-92d0d7d3${_scopeId}><h4 class="text-sm font-medium leading-none text-base-content" data-v-92d0d7d3${_scopeId}>Öğrenme Durumu</h4><div class="text-base-content/70 mt-2 space-y-1 text-sm" data-v-92d0d7d3${_scopeId}><div class="flex justify-between" data-v-92d0d7d3${_scopeId}><span data-v-92d0d7d3${_scopeId}>Durum:</span><span class="font-medium text-base-content" data-v-92d0d7d3${_scopeId}>${ssrInterpolate(getLearningStatusLabel(selectedWord.value.learning_status))}</span></div><div class="flex justify-between" data-v-92d0d7d3${_scopeId}><span data-v-92d0d7d3${_scopeId}>Toplam:</span><span class="font-medium text-base-content" data-v-92d0d7d3${_scopeId}>${ssrInterpolate(selectedWord.value.review_count || 0)}</span></div><div class="flex justify-between" data-v-92d0d7d3${_scopeId}><span data-v-92d0d7d3${_scopeId}>Yanlış:</span><span class="font-medium text-base-content" data-v-92d0d7d3${_scopeId}>${ssrInterpolate(selectedWord.value.incorrect_count || 0)}</span></div><div class="flex justify-between" data-v-92d0d7d3${_scopeId}><span data-v-92d0d7d3${_scopeId}>Başarı:</span><span class="font-medium text-base-content" data-v-92d0d7d3${_scopeId}>${ssrInterpolate(calculateSuccessRate(selectedWord.value).label)}</span></div></div></div><div class="rounded-lg border border-base-300 bg-base-200 p-3" data-v-92d0d7d3${_scopeId}><h4 class="text-sm font-medium leading-none text-base-content" data-v-92d0d7d3${_scopeId}>Diğer Bilgiler</h4><div class="text-base-content/70 mt-2 space-y-1 text-sm" data-v-92d0d7d3${_scopeId}>`);
              if (selectedWord.value.synonyms && selectedWord.value.synonyms.length > 0) {
                _push2(`<div data-v-92d0d7d3${_scopeId}><span class="font-medium text-base-content" data-v-92d0d7d3${_scopeId}>Eş Anlamlılar:</span><div class="mt-1 flex flex-wrap gap-1" data-v-92d0d7d3${_scopeId}><!--[-->`);
                ssrRenderList(selectedWord.value.synonyms, (synonym) => {
                  _push2(`<span class="inline-flex items-center rounded-md bg-base-300 px-2 py-1 text-xs text-base-content" data-v-92d0d7d3${_scopeId}>${ssrInterpolate(typeof synonym === "object" ? synonym.synonym : synonym)}</span>`);
                });
                _push2(`<!--]--></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (selectedWord.value.flag) {
                _push2(`<div class="flex items-center gap-1" data-v-92d0d7d3${_scopeId}><svg class="h-4 w-4 text-base-content" fill="currentColor" viewBox="0 0 20 20" data-v-92d0d7d3${_scopeId}><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" data-v-92d0d7d3${_scopeId}></path></svg><span class="font-medium text-base-content" data-v-92d0d7d3${_scopeId}>Öne çıkarılmış</span></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></div>`);
              if (selectedWord.value.example_sentences && selectedWord.value.example_sentences.length > 0) {
                _push2(`<div data-v-92d0d7d3${_scopeId}><h4 class="text-sm font-medium leading-none text-base-content" data-v-92d0d7d3${_scopeId}>Örnek Cümleler</h4><div class="mt-2 space-y-2" data-v-92d0d7d3${_scopeId}><!--[-->`);
                ssrRenderList(selectedWord.value.example_sentences, (sentence, index) => {
                  _push2(`<div class="rounded-lg border border-base-300 bg-base-200 p-3" data-v-92d0d7d3${_scopeId}><div class="flex items-start gap-3" data-v-92d0d7d3${_scopeId}><span class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-base-content text-xs font-medium text-base-100" data-v-92d0d7d3${_scopeId}>${ssrInterpolate(index + 1)}</span><div class="min-w-0 flex-1" data-v-92d0d7d3${_scopeId}><p class="text-sm font-medium text-base-content" data-v-92d0d7d3${_scopeId}>${ssrInterpolate(getSentenceText(sentence))}</p>`);
                  if (getSentenceTranslation(sentence)) {
                    _push2(`<p class="text-base-content/70 mt-1 text-xs" data-v-92d0d7d3${_scopeId}>${ssrInterpolate(getSentenceTranslation(sentence))}</p>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div></div></div>`);
                });
                _push2(`<!--]--></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div><div class="flex flex-shrink-0 flex-col-reverse border-t border-base-300 bg-base-100 p-6 pt-4 sm:flex-row sm:justify-end sm:space-x-2" data-v-92d0d7d3${_scopeId}><button class="btn btn-outline" data-v-92d0d7d3${_scopeId}>Kapat</button>`);
              if (isLoggedIn.value) {
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("rendition.words.edit", selectedWord.value.id),
                  class: "btn bg-base-content text-base-100 hover:bg-base-300 hover:text-base-content",
                  onClick: ($event) => selectedWord.value = null
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
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (showFilteredWordsModal.value) {
              _push2(`<div class="bg-base-content/20 fixed inset-0 z-50" data-v-92d0d7d3${_scopeId}><div class="fixed left-[50%] top-[50%] z-50 flex grid max-h-[80vh] w-full max-w-4xl translate-x-[-50%] translate-y-[-50%] flex-col gap-4 border border-base-300 bg-base-100 shadow-xl duration-200 sm:rounded-xl" data-v-92d0d7d3${_scopeId}><div class="flex flex-shrink-0 flex-col space-y-1.5 border-b border-base-300 bg-base-100 p-6 pb-4 text-center sm:text-left" data-v-92d0d7d3${_scopeId}><div class="flex items-center justify-between" data-v-92d0d7d3${_scopeId}><div data-v-92d0d7d3${_scopeId}><h3 class="text-lg font-semibold leading-none tracking-tight text-base-content" data-v-92d0d7d3${_scopeId}>${ssrInterpolate(getFilterDescription(gameConfig.value.smartFilter).title)}</h3><p class="text-base-content/70 mt-1 text-sm" data-v-92d0d7d3${_scopeId}>${ssrInterpolate(filteredWordsForGame.value.length)} kelime bulundu</p></div><button class="btn btn-ghost btn-xs btn-square" data-v-92d0d7d3${_scopeId}><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-92d0d7d3${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-92d0d7d3${_scopeId}></path></svg></button></div><p class="text-base-content/70 text-sm" data-v-92d0d7d3${_scopeId}>${ssrInterpolate(getFilterDescription(gameConfig.value.smartFilter).description)}</p></div><div class="flex-1 overflow-y-auto p-6 pt-4" data-v-92d0d7d3${_scopeId}><div class="space-y-4" data-v-92d0d7d3${_scopeId}><div class="rounded-lg border border-base-300 bg-base-200 p-3" data-v-92d0d7d3${_scopeId}><h4 class="mb-2 text-sm font-medium leading-none text-base-content" data-v-92d0d7d3${_scopeId}>Filtre Kriterleri</h4><p class="text-base-content/70 text-sm" data-v-92d0d7d3${_scopeId}>${ssrInterpolate(getFilterDescription(gameConfig.value.smartFilter).criteria)}</p></div><div class="space-y-2" data-v-92d0d7d3${_scopeId}><h4 class="text-sm font-medium leading-none text-base-content" data-v-92d0d7d3${_scopeId}>Filtrelenmiş Kelimeler</h4><div class="max-h-96 overflow-y-auto" data-v-92d0d7d3${_scopeId}><div class="space-y-2" data-v-92d0d7d3${_scopeId}><!--[-->`);
              ssrRenderList(filteredWordsForGame.value, (word, index) => {
                _push2(`<div class="flex cursor-pointer items-center justify-between rounded-lg border border-base-300 bg-base-200 p-3 transition-colors hover:bg-base-300" data-v-92d0d7d3${_scopeId}><div class="flex items-center gap-3" data-v-92d0d7d3${_scopeId}><span class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-base-content text-xs font-medium text-base-100" data-v-92d0d7d3${_scopeId}>${ssrInterpolate(index + 1)}</span><div data-v-92d0d7d3${_scopeId}><div class="font-medium text-base-content" data-v-92d0d7d3${_scopeId}>${ssrInterpolate(word.word)}</div><div class="text-base-content/70 text-sm" data-v-92d0d7d3${_scopeId}>${ssrInterpolate(getPrimaryMeaning(word))}</div></div></div><div class="flex items-center gap-2" data-v-92d0d7d3${_scopeId}><span class="badge bg-base-300 text-xs text-base-content" data-v-92d0d7d3${_scopeId}>${ssrInterpolate(getWordTypeLabel(word.type))}</span><span class="badge bg-base-content text-xs text-base-100" data-v-92d0d7d3${_scopeId}>${ssrInterpolate(getDifficultyLabel(word.difficulty_level))}</span><span class="badge bg-base-200 text-xs text-base-content" data-v-92d0d7d3${_scopeId}>${ssrInterpolate(getLearningStatusLabel(word.learning_status))}</span><button class="btn btn-ghost btn-xs btn-square" data-v-92d0d7d3${_scopeId}><svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-92d0d7d3${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-92d0d7d3${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-92d0d7d3${_scopeId}></path></svg></button></div></div>`);
              });
              _push2(`<!--]--></div></div></div><div class="grid grid-cols-2 gap-4" data-v-92d0d7d3${_scopeId}><div class="rounded-lg border border-base-300 bg-base-200 p-3" data-v-92d0d7d3${_scopeId}><h4 class="text-sm font-medium leading-none text-base-content" data-v-92d0d7d3${_scopeId}>Tür Dağılımı</h4><div class="text-base-content/70 mt-2 space-y-1 text-sm" data-v-92d0d7d3${_scopeId}><!--[-->`);
              ssrRenderList(getWordTypeStats(filteredWordsForGame.value), (count, type) => {
                _push2(`<div class="flex justify-between" data-v-92d0d7d3${_scopeId}><span data-v-92d0d7d3${_scopeId}>${ssrInterpolate(getWordTypeLabel(type))}:</span><span class="font-medium text-base-content" data-v-92d0d7d3${_scopeId}>${ssrInterpolate(count)}</span></div>`);
              });
              _push2(`<!--]--></div></div><div class="rounded-lg border border-base-300 bg-base-200 p-3" data-v-92d0d7d3${_scopeId}><h4 class="text-sm font-medium leading-none text-base-content" data-v-92d0d7d3${_scopeId}>Zorluk Dağılımı</h4><div class="text-base-content/70 mt-2 space-y-1 text-sm" data-v-92d0d7d3${_scopeId}><!--[-->`);
              ssrRenderList(getDifficultyStats(filteredWordsForGame.value), (count, level) => {
                _push2(`<div class="flex justify-between" data-v-92d0d7d3${_scopeId}><span data-v-92d0d7d3${_scopeId}>${ssrInterpolate(getDifficultyLabel(level))}:</span><span class="font-medium text-base-content" data-v-92d0d7d3${_scopeId}>${ssrInterpolate(count)}</span></div>`);
              });
              _push2(`<!--]--></div></div></div></div></div><div class="flex flex-shrink-0 flex-col-reverse border-t border-base-300 bg-base-100 p-6 pt-4 sm:flex-row sm:justify-end sm:space-x-2" data-v-92d0d7d3${_scopeId}><button class="btn btn-outline" data-v-92d0d7d3${_scopeId}>Kapat</button><button class="btn bg-base-content text-base-100 hover:bg-base-300 hover:text-base-content" data-v-92d0d7d3${_scopeId}><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-92d0d7d3${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-92d0d7d3${_scopeId}></path></svg> Dışa Aktar </button></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "container mx-auto max-w-7xl px-4 py-6" }, [
                createVNode("div", { class: "mb-8" }, [
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-3xl font-bold tracking-tight" }, toDisplayString(((_g = props.pack) == null ? void 0 : _g.name) || "Kelimeler"), 1),
                      createVNode("p", { class: "text-muted-foreground mt-1" }, toDisplayString(((_h = props.words) == null ? void 0 : _h.length) || 0) + " kelime bulundu", 1)
                    ]),
                    createVNode("div", { class: "flex items-center gap-2" }, [
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
                        class: "btn btn-sm bg-base-content text-base-100 hover:bg-base-300 hover:text-base-content"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Yeni Kelime ")
                        ]),
                        _: 1
                      }, 8, ["href"])) : createCommentVNode("", true)
                    ])
                  ])
                ]),
                !showGameInterface.value ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "mb-6 space-y-4"
                }, [
                  createVNode("div", { class: "flex max-w-sm gap-3" }, [
                    createVNode("div", { class: "flex-1" }, [
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                        type: "text",
                        placeholder: "Kelime veya anlam ara...",
                        class: "input-bordered input w-full",
                        onKeyup: withKeys(filterWords, ["enter"])
                      }, null, 40, ["onUpdate:modelValue"]), [
                        [vModelText, searchQuery.value]
                      ])
                    ]),
                    createVNode("button", {
                      onClick: filterWords,
                      class: "btn btn-sm bg-base-content text-base-100 hover:bg-base-300 hover:text-base-content"
                    }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        "stroke-width": "1.5",
                        stroke: "currentColor",
                        class: "h-4 w-4"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        })
                      ]))
                    ])
                  ]),
                  createVNode("div", { class: "space-y-3" }, [
                    createVNode("div", { class: "flex flex-wrap gap-2" }, [
                      createVNode("button", {
                        onClick: ($event) => startGame("multiple-choice"),
                        class: "btn btn-outline",
                        disabled: !hasEnoughWords.value
                      }, " Çoktan Seçmeli ", 8, ["onClick", "disabled"]),
                      createVNode("button", {
                        onClick: ($event) => startGame("fill-in-the-blank"),
                        class: "btn btn-outline",
                        disabled: !hasEnoughWords.value
                      }, " Boşluk Doldurma ", 8, ["onClick", "disabled"]),
                      createVNode("button", {
                        onClick: ($event) => startGame("word-completion"),
                        class: "btn btn-outline",
                        disabled: !hasEnoughWords.value
                      }, " Kelime Tamamlama ", 8, ["onClick", "disabled"])
                    ]),
                    createVNode("div", { class: "flex flex-wrap gap-2" }, [
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => gameConfig.value.smartFilter = $event,
                        class: "select-bordered select"
                      }, [
                        createVNode("option", { value: "all" }, "Tüm Kelimeler"),
                        createVNode("option", { value: "never-answered" }, "Hiç Cevaplanmamış"),
                        createVNode("option", { value: "most-mistakes" }, "Çok Hata Yapılan"),
                        createVNode("option", { value: "flagged" }, "İşaretlenen"),
                        createVNode("option", { value: "unlearned" }, "Öğrenilmemiş"),
                        createVNode("option", { value: "nouns" }, "İsimler"),
                        createVNode("option", { value: "verbs" }, "Fiiller"),
                        createVNode("option", { value: "adjectives" }, "Sıfatlar")
                      ], 8, ["onUpdate:modelValue"]), [
                        [vModelSelect, gameConfig.value.smartFilter]
                      ]),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => gameConfig.value.questionCount = $event,
                        class: "select-bordered select"
                      }, [
                        createVNode("option", { value: "5" }, "5 Soru"),
                        createVNode("option", { value: "10" }, "10 Soru"),
                        createVNode("option", { value: "15" }, "15 Soru"),
                        createVNode("option", { value: "20" }, "20 Soru"),
                        createVNode("option", { value: "25" }, "25 Soru")
                      ], 8, ["onUpdate:modelValue"]), [
                        [vModelSelect, gameConfig.value.questionCount]
                      ]),
                      createVNode("button", {
                        onClick: resetGameConfig,
                        class: "btn btn-outline"
                      }, "Sıfırla")
                    ]),
                    gameConfig.value.smartFilter !== "all" ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "rounded-lg bg-base-200 p-3"
                    }, [
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("div", { class: "flex items-center gap-2 text-sm" }, [
                          (openBlock(), createBlock("svg", {
                            class: "text-base-content/70 h-4 w-4",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            })
                          ])),
                          createVNode("span", { class: "text-base-content/70" }, [
                            createTextVNode(toDisplayString(getFilterDescription(gameConfig.value.smartFilter).description) + " ", 1),
                            createVNode("span", { class: "font-medium text-base-content" }, toDisplayString(filteredWordsForGame.value.length) + " kelime", 1),
                            createTextVNode(" bulundu. ")
                          ])
                        ]),
                        createVNode("button", {
                          onClick: ($event) => showFilteredWordsModal.value = true,
                          class: "btn btn-outline btn-xs",
                          disabled: filteredWordsForGame.value.length === 0
                        }, [
                          (openBlock(), createBlock("svg", {
                            class: "h-3 w-3",
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
                          ])),
                          createTextVNode(" Detayları Gör ")
                        ], 8, ["onClick", "disabled"])
                      ])
                    ])) : createCommentVNode("", true)
                  ])
                ])) : createCommentVNode("", true),
                createVNode(Transition, {
                  name: "game-transition",
                  mode: "out-in"
                }, {
                  default: withCtx(() => {
                    var _a2, _b2, _c2, _d2;
                    return [
                      showGameInterface.value ? (openBlock(), createBlock("div", {
                        key: "game",
                        class: "my-8"
                      }, [
                        createVNode("div", { class: "mb-4 flex justify-end" }, [
                          createVNode("button", {
                            onClick: stopGame,
                            class: "btn btn-outline btn-sm"
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
                            ])),
                            createTextVNode(" Oyunu Durdur ")
                          ])
                        ]),
                        loadingGame.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex h-60 items-center justify-center"
                        }, [
                          createVNode("div", { class: "loading loading-spinner loading-lg" })
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
                      ])) : !showGameInterface.value ? (openBlock(), createBlock("div", { key: "wordList" }, [
                        createVNode("div", { class: "rounded-lg border border-base-300" }, [
                          createVNode("div", { class: "relative w-full overflow-auto" }, [
                            createVNode("table", { class: "w-full caption-bottom text-sm" }, [
                              createVNode("thead", { class: "[&_tr]:border-b" }, [
                                createVNode("tr", { class: "border-b border-base-300 transition-colors hover:bg-base-200" }, [
                                  createVNode("th", { class: "text-base-content/70 h-10 px-2 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]" }, " Kelime "),
                                  createVNode("th", { class: "text-base-content/70 h-10 px-2 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]" }, " Anlam "),
                                  createVNode("th", { class: "text-base-content/70 h-10 px-2 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]" }, " İşlem ")
                                ])
                              ]),
                              createVNode("tbody", { class: "[&_tr:last-child]:border-0" }, [
                                isLoading.value ? (openBlock(), createBlock("tr", {
                                  key: 0,
                                  class: "border-b border-base-300 transition-colors hover:bg-base-200"
                                }, [
                                  createVNode("td", {
                                    colspan: "3",
                                    class: "p-4 text-center"
                                  }, [
                                    createVNode("div", { class: "loading loading-spinner loading-md" })
                                  ])
                                ])) : displayedWords.value.length === 0 ? (openBlock(), createBlock("tr", {
                                  key: 1,
                                  class: "border-b border-base-300 transition-colors hover:bg-base-200"
                                }, [
                                  createVNode("td", {
                                    colspan: "3",
                                    class: "text-base-content/70 p-4 text-center"
                                  }, "Sonuç bulunamadı")
                                ])) : createCommentVNode("", true),
                                (openBlock(true), createBlock(Fragment, null, renderList(displayedWords.value, (word) => {
                                  return openBlock(), createBlock("tr", {
                                    key: word.id,
                                    class: "cursor-pointer border-b border-base-300 transition-colors hover:bg-base-200",
                                    onClick: ($event) => showWordDetails(word)
                                  }, [
                                    createVNode("td", { class: "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]" }, [
                                      createVNode("div", { class: "font-medium text-base-content" }, toDisplayString(word.word), 1)
                                    ]),
                                    createVNode("td", { class: "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]" }, [
                                      createVNode("div", { class: "text-base-content/70" }, toDisplayString(getPrimaryMeaning(word)), 1)
                                    ]),
                                    createVNode("td", { class: "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]" }, [
                                      createVNode("div", { class: "flex items-center gap-2" }, [
                                        createVNode("button", { class: "btn btn-ghost btn-xs btn-square" }, [
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
                                          class: "btn btn-ghost btn-xs btn-square",
                                          onClick: withModifiers(() => {
                                          }, ["stop"])
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
                                          _: 1
                                        }, 8, ["href", "onClick"])) : createCommentVNode("", true)
                                      ])
                                    ])
                                  ], 8, ["onClick"]);
                                }), 128))
                              ])
                            ])
                          ])
                        ]),
                        filteredWordsForGame.value.length > perPage.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-4 flex items-center justify-between"
                        }, [
                          createVNode("div", { class: "text-base-content/70 text-sm" }, toDisplayString(paginationInfo.value), 1),
                          createVNode("div", { class: "flex items-center space-x-2" }, [
                            createVNode("button", {
                              onClick: ($event) => changePage(currentPage.value - 1),
                              disabled: currentPage.value <= 1,
                              class: "btn btn-outline"
                            }, " Önceki ", 8, ["onClick", "disabled"]),
                            createVNode("span", { class: "text-sm font-medium text-base-content" }, toDisplayString(currentPage.value), 1),
                            createVNode("button", {
                              onClick: ($event) => changePage(currentPage.value + 1),
                              disabled: currentPage.value >= totalPages.value,
                              class: "btn btn-outline"
                            }, " Sonraki ", 8, ["onClick", "disabled"])
                          ])
                        ])) : createCommentVNode("", true),
                        ((_d2 = props.words) == null ? void 0 : _d2.length) === 0 ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "mt-8 text-center"
                        }, [
                          createVNode("div", { class: "text-base-content/40 mx-auto h-12 w-12" }, [
                            (openBlock(), createBlock("svg", {
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              })
                            ]))
                          ]),
                          createVNode("h3", { class: "mt-4 text-lg font-semibold text-base-content" }, "Kelime bulunamadı"),
                          createVNode("p", { class: "text-base-content/70 mt-2" }, "Bu pakette henüz kelime bulunmamaktadır.")
                        ])) : createCommentVNode("", true)
                      ])) : createCommentVNode("", true)
                    ];
                  }),
                  _: 1
                })
              ]),
              selectedWord.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "bg-base-content/20 fixed inset-0 z-50",
                onClick: ($event) => selectedWord.value = null
              }, [
                createVNode("div", {
                  class: "fixed left-[50%] top-[50%] z-50 flex grid max-h-[80vh] w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] flex-col gap-4 border border-base-300 bg-base-100 shadow-xl duration-200 sm:rounded-xl",
                  onClick: withModifiers(() => {
                  }, ["stop"])
                }, [
                  createVNode("div", { class: "flex flex-shrink-0 flex-col space-y-1.5 border-b border-base-300 bg-base-100 p-6 pb-4 text-center sm:text-left" }, [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("h3", { class: "text-lg font-semibold leading-none tracking-tight text-base-content" }, toDisplayString(selectedWord.value.word), 1),
                      createVNode("button", {
                        onClick: ($event) => selectedWord.value = null,
                        class: "btn btn-ghost btn-xs btn-square"
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
                    createVNode("p", { class: "text-base-content/70 text-sm" }, toDisplayString(getWordTypeLabel(selectedWord.value.type)) + " • " + toDisplayString(getDifficultyLabel(selectedWord.value.difficulty_level)), 1)
                  ]),
                  createVNode("div", { class: "flex-1 overflow-y-auto p-6 pt-4" }, [
                    createVNode("div", { class: "space-y-4" }, [
                      createVNode("div", null, [
                        createVNode("h4", { class: "text-sm font-medium leading-none text-base-content" }, "Anlamlar"),
                        createVNode("div", { class: "mt-2 space-y-2" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(selectedWord.value.meanings, (meaning, index) => {
                            return openBlock(), createBlock("div", {
                              key: index,
                              class: ["flex items-start gap-3 rounded-lg border border-base-300 p-3", meaning.is_primary ? "bg-base-content text-base-100" : "bg-base-200"]
                            }, [
                              createVNode("span", {
                                class: ["flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-medium", meaning.is_primary ? "bg-base-100 text-base-content" : "bg-base-300 text-base-content"]
                              }, toDisplayString(index + 1), 3),
                              createVNode("div", { class: "min-w-0 flex-1" }, [
                                createVNode("span", {
                                  class: ["text-sm", meaning.is_primary ? "text-base-100" : "text-base-content"]
                                }, toDisplayString(meaning.meaning), 3),
                                meaning.is_primary ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: ["ml-2 inline-flex items-center rounded-full px-2 py-1 text-xs font-medium", meaning.is_primary ? "bg-base-100 text-base-content" : "bg-base-300 text-base-content"]
                                }, " Birincil ", 2)) : createCommentVNode("", true)
                              ])
                            ], 2);
                          }), 128))
                        ])
                      ]),
                      createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                        createVNode("div", { class: "rounded-lg border border-base-300 bg-base-200 p-3" }, [
                          createVNode("h4", { class: "text-sm font-medium leading-none text-base-content" }, "Öğrenme Durumu"),
                          createVNode("div", { class: "text-base-content/70 mt-2 space-y-1 text-sm" }, [
                            createVNode("div", { class: "flex justify-between" }, [
                              createVNode("span", null, "Durum:"),
                              createVNode("span", { class: "font-medium text-base-content" }, toDisplayString(getLearningStatusLabel(selectedWord.value.learning_status)), 1)
                            ]),
                            createVNode("div", { class: "flex justify-between" }, [
                              createVNode("span", null, "Toplam:"),
                              createVNode("span", { class: "font-medium text-base-content" }, toDisplayString(selectedWord.value.review_count || 0), 1)
                            ]),
                            createVNode("div", { class: "flex justify-between" }, [
                              createVNode("span", null, "Yanlış:"),
                              createVNode("span", { class: "font-medium text-base-content" }, toDisplayString(selectedWord.value.incorrect_count || 0), 1)
                            ]),
                            createVNode("div", { class: "flex justify-between" }, [
                              createVNode("span", null, "Başarı:"),
                              createVNode("span", { class: "font-medium text-base-content" }, toDisplayString(calculateSuccessRate(selectedWord.value).label), 1)
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "rounded-lg border border-base-300 bg-base-200 p-3" }, [
                          createVNode("h4", { class: "text-sm font-medium leading-none text-base-content" }, "Diğer Bilgiler"),
                          createVNode("div", { class: "text-base-content/70 mt-2 space-y-1 text-sm" }, [
                            selectedWord.value.synonyms && selectedWord.value.synonyms.length > 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                              createVNode("span", { class: "font-medium text-base-content" }, "Eş Anlamlılar:"),
                              createVNode("div", { class: "mt-1 flex flex-wrap gap-1" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(selectedWord.value.synonyms, (synonym) => {
                                  return openBlock(), createBlock("span", {
                                    key: synonym,
                                    class: "inline-flex items-center rounded-md bg-base-300 px-2 py-1 text-xs text-base-content"
                                  }, toDisplayString(typeof synonym === "object" ? synonym.synonym : synonym), 1);
                                }), 128))
                              ])
                            ])) : createCommentVNode("", true),
                            selectedWord.value.flag ? (openBlock(), createBlock("div", {
                              key: 1,
                              class: "flex items-center gap-1"
                            }, [
                              (openBlock(), createBlock("svg", {
                                class: "h-4 w-4 text-base-content",
                                fill: "currentColor",
                                viewBox: "0 0 20 20"
                              }, [
                                createVNode("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" })
                              ])),
                              createVNode("span", { class: "font-medium text-base-content" }, "Öne çıkarılmış")
                            ])) : createCommentVNode("", true)
                          ])
                        ])
                      ]),
                      selectedWord.value.example_sentences && selectedWord.value.example_sentences.length > 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                        createVNode("h4", { class: "text-sm font-medium leading-none text-base-content" }, "Örnek Cümleler"),
                        createVNode("div", { class: "mt-2 space-y-2" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(selectedWord.value.example_sentences, (sentence, index) => {
                            return openBlock(), createBlock("div", {
                              key: index,
                              class: "rounded-lg border border-base-300 bg-base-200 p-3"
                            }, [
                              createVNode("div", { class: "flex items-start gap-3" }, [
                                createVNode("span", { class: "flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-base-content text-xs font-medium text-base-100" }, toDisplayString(index + 1), 1),
                                createVNode("div", { class: "min-w-0 flex-1" }, [
                                  createVNode("p", { class: "text-sm font-medium text-base-content" }, toDisplayString(getSentenceText(sentence)), 1),
                                  getSentenceTranslation(sentence) ? (openBlock(), createBlock("p", {
                                    key: 0,
                                    class: "text-base-content/70 mt-1 text-xs"
                                  }, toDisplayString(getSentenceTranslation(sentence)), 1)) : createCommentVNode("", true)
                                ])
                              ])
                            ]);
                          }), 128))
                        ])
                      ])) : createCommentVNode("", true)
                    ])
                  ]),
                  createVNode("div", { class: "flex flex-shrink-0 flex-col-reverse border-t border-base-300 bg-base-100 p-6 pt-4 sm:flex-row sm:justify-end sm:space-x-2" }, [
                    createVNode("button", {
                      onClick: ($event) => selectedWord.value = null,
                      class: "btn btn-outline"
                    }, "Kapat", 8, ["onClick"]),
                    isLoggedIn.value ? (openBlock(), createBlock(unref(Link), {
                      key: 0,
                      href: _ctx.route("rendition.words.edit", selectedWord.value.id),
                      class: "btn bg-base-content text-base-100 hover:bg-base-300 hover:text-base-content",
                      onClick: ($event) => selectedWord.value = null
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Düzenle ")
                      ]),
                      _: 1
                    }, 8, ["href", "onClick"])) : createCommentVNode("", true)
                  ])
                ], 8, ["onClick"])
              ], 8, ["onClick"])) : createCommentVNode("", true),
              showFilteredWordsModal.value ? (openBlock(), createBlock("div", {
                key: 1,
                class: "bg-base-content/20 fixed inset-0 z-50",
                onClick: ($event) => showFilteredWordsModal.value = false
              }, [
                createVNode("div", {
                  class: "fixed left-[50%] top-[50%] z-50 flex grid max-h-[80vh] w-full max-w-4xl translate-x-[-50%] translate-y-[-50%] flex-col gap-4 border border-base-300 bg-base-100 shadow-xl duration-200 sm:rounded-xl",
                  onClick: withModifiers(() => {
                  }, ["stop"])
                }, [
                  createVNode("div", { class: "flex flex-shrink-0 flex-col space-y-1.5 border-b border-base-300 bg-base-100 p-6 pb-4 text-center sm:text-left" }, [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", null, [
                        createVNode("h3", { class: "text-lg font-semibold leading-none tracking-tight text-base-content" }, toDisplayString(getFilterDescription(gameConfig.value.smartFilter).title), 1),
                        createVNode("p", { class: "text-base-content/70 mt-1 text-sm" }, toDisplayString(filteredWordsForGame.value.length) + " kelime bulundu", 1)
                      ]),
                      createVNode("button", {
                        onClick: ($event) => showFilteredWordsModal.value = false,
                        class: "btn btn-ghost btn-xs btn-square"
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
                    createVNode("p", { class: "text-base-content/70 text-sm" }, toDisplayString(getFilterDescription(gameConfig.value.smartFilter).description), 1)
                  ]),
                  createVNode("div", { class: "flex-1 overflow-y-auto p-6 pt-4" }, [
                    createVNode("div", { class: "space-y-4" }, [
                      createVNode("div", { class: "rounded-lg border border-base-300 bg-base-200 p-3" }, [
                        createVNode("h4", { class: "mb-2 text-sm font-medium leading-none text-base-content" }, "Filtre Kriterleri"),
                        createVNode("p", { class: "text-base-content/70 text-sm" }, toDisplayString(getFilterDescription(gameConfig.value.smartFilter).criteria), 1)
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode("h4", { class: "text-sm font-medium leading-none text-base-content" }, "Filtrelenmiş Kelimeler"),
                        createVNode("div", { class: "max-h-96 overflow-y-auto" }, [
                          createVNode("div", { class: "space-y-2" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(filteredWordsForGame.value, (word, index) => {
                              return openBlock(), createBlock("div", {
                                key: word.id,
                                class: "flex cursor-pointer items-center justify-between rounded-lg border border-base-300 bg-base-200 p-3 transition-colors hover:bg-base-300",
                                onClick: ($event) => showWordDetails(word)
                              }, [
                                createVNode("div", { class: "flex items-center gap-3" }, [
                                  createVNode("span", { class: "flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-base-content text-xs font-medium text-base-100" }, toDisplayString(index + 1), 1),
                                  createVNode("div", null, [
                                    createVNode("div", { class: "font-medium text-base-content" }, toDisplayString(word.word), 1),
                                    createVNode("div", { class: "text-base-content/70 text-sm" }, toDisplayString(getPrimaryMeaning(word)), 1)
                                  ])
                                ]),
                                createVNode("div", { class: "flex items-center gap-2" }, [
                                  createVNode("span", { class: "badge bg-base-300 text-xs text-base-content" }, toDisplayString(getWordTypeLabel(word.type)), 1),
                                  createVNode("span", { class: "badge bg-base-content text-xs text-base-100" }, toDisplayString(getDifficultyLabel(word.difficulty_level)), 1),
                                  createVNode("span", { class: "badge bg-base-200 text-xs text-base-content" }, toDisplayString(getLearningStatusLabel(word.learning_status)), 1),
                                  createVNode("button", { class: "btn btn-ghost btn-xs btn-square" }, [
                                    (openBlock(), createBlock("svg", {
                                      class: "h-3 w-3",
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
                                  ])
                                ])
                              ], 8, ["onClick"]);
                            }), 128))
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                        createVNode("div", { class: "rounded-lg border border-base-300 bg-base-200 p-3" }, [
                          createVNode("h4", { class: "text-sm font-medium leading-none text-base-content" }, "Tür Dağılımı"),
                          createVNode("div", { class: "text-base-content/70 mt-2 space-y-1 text-sm" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(getWordTypeStats(filteredWordsForGame.value), (count, type) => {
                              return openBlock(), createBlock("div", {
                                key: type,
                                class: "flex justify-between"
                              }, [
                                createVNode("span", null, toDisplayString(getWordTypeLabel(type)) + ":", 1),
                                createVNode("span", { class: "font-medium text-base-content" }, toDisplayString(count), 1)
                              ]);
                            }), 128))
                          ])
                        ]),
                        createVNode("div", { class: "rounded-lg border border-base-300 bg-base-200 p-3" }, [
                          createVNode("h4", { class: "text-sm font-medium leading-none text-base-content" }, "Zorluk Dağılımı"),
                          createVNode("div", { class: "text-base-content/70 mt-2 space-y-1 text-sm" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(getDifficultyStats(filteredWordsForGame.value), (count, level) => {
                              return openBlock(), createBlock("div", {
                                key: level,
                                class: "flex justify-between"
                              }, [
                                createVNode("span", null, toDisplayString(getDifficultyLabel(level)) + ":", 1),
                                createVNode("span", { class: "font-medium text-base-content" }, toDisplayString(count), 1)
                              ]);
                            }), 128))
                          ])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "flex flex-shrink-0 flex-col-reverse border-t border-base-300 bg-base-100 p-6 pt-4 sm:flex-row sm:justify-end sm:space-x-2" }, [
                    createVNode("button", {
                      onClick: ($event) => showFilteredWordsModal.value = false,
                      class: "btn btn-outline"
                    }, "Kapat", 8, ["onClick"]),
                    createVNode("button", {
                      onClick: exportFilteredWords,
                      class: "btn bg-base-content text-base-100 hover:bg-base-300 hover:text-base-content"
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
                          d: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        })
                      ])),
                      createTextVNode(" Dışa Aktar ")
                    ])
                  ])
                ], 8, ["onClick"])
              ], 8, ["onClick"])) : createCommentVNode("", true)
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
const Screen = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-92d0d7d3"]]);
export {
  Screen as default
};
