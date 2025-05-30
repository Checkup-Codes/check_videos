import { ref, computed, watch, onMounted, withCtx, unref, createTextVNode, createVNode, createBlock, createCommentVNode, toDisplayString, openBlock, withDirectives, withKeys, vModelText, vModelSelect, Transition, vModelCheckbox, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-Fo9jcdnI.js";
import MultipleChoice from "./MultipleChoice-DLUl3q5Y.js";
import TranslateWord from "./TranslateWord-BiAat_2P.js";
import WordCompletion from "./WordCompletion-CWah1fAT.js";
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
    const games = [
      { name: "Çoktan Seçmeli", route: "multiple-choice" },
      { name: "Boşluk Doldurma", route: "fill-in-the-blank" },
      { name: "Kelime Tamamlama", route: "word-completion" }
    ];
    const gameConfig = ref({
      questionCount: 10
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
      }, 300);
    };
    const filteredWords = computed(() => {
      if (!props.words) return [];
      let wordsToUse = [...props.words];
      if (prioritizeUnlearned.value) {
        wordsToUse.sort((a, b) => {
          return (a.learning_status || 0) - (b.learning_status || 0);
        });
      }
      return wordsToUse.slice(0, gameConfig.value.questionCount);
    });
    const hasEnoughWords = computed(() => props.words && props.words.length >= 5);
    const startGame = (gameType) => {
      if (!hasEnoughWords.value) return;
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
    watch([searchQuery, filterType, filterStatus], () => {
      if (searchQuery.value.length > 2 || searchQuery.value.length === 0) {
        filterWords();
      }
    });
    onMounted(() => {
      const gameParam = queryParams.value.game;
      if (gameParam && hasEnoughWords.value) {
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h;
          if (_push2) {
            _push2(`<div class="px-5 transition-all duration-200 dark:border-gray-700 dark:bg-base-100" data-v-bb7fe81b${_scopeId}><div class="mb-4 flex items-center justify-between" data-v-bb7fe81b${_scopeId}><div class="flex-1" data-v-bb7fe81b${_scopeId}><h1 class="p-5 text-2xl font-bold" data-v-bb7fe81b${_scopeId}>${ssrInterpolate(((_a = props.pack) == null ? void 0 : _a.name) || "Kelimeler")} <span class="badge badge-outline ml-2" data-v-bb7fe81b${_scopeId}>${ssrInterpolate(((_b = props.words) == null ? void 0 : _b.length) || 0)} kelime</span></h1></div><div class="flex gap-2" data-v-bb7fe81b${_scopeId}>`);
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
              _push2(`<div class="mb-4 flex flex-wrap gap-3" data-v-bb7fe81b${_scopeId}><div class="form-control min-w-[200px] flex-1" data-v-bb7fe81b${_scopeId}><div class="input-group" data-v-bb7fe81b${_scopeId}><input type="text"${ssrRenderAttr("value", searchQuery.value)} placeholder="Kelime ara..." class="input-bordered input input-sm w-full" data-v-bb7fe81b${_scopeId}><button class="btn btn-sm btn-square" data-v-bb7fe81b${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-bb7fe81b${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" data-v-bb7fe81b${_scopeId}></path></svg></button></div></div><select class="select-bordered select select-sm min-w-[150px] flex-1" data-v-bb7fe81b${_scopeId}><option value="" data-v-bb7fe81b${ssrIncludeBooleanAttr(Array.isArray(filterType.value) ? ssrLooseContain(filterType.value, "") : ssrLooseEqual(filterType.value, "")) ? " selected" : ""}${_scopeId}>Tüm Türler</option><option value="noun" data-v-bb7fe81b${ssrIncludeBooleanAttr(Array.isArray(filterType.value) ? ssrLooseContain(filterType.value, "noun") : ssrLooseEqual(filterType.value, "noun")) ? " selected" : ""}${_scopeId}>İsim</option><option value="verb" data-v-bb7fe81b${ssrIncludeBooleanAttr(Array.isArray(filterType.value) ? ssrLooseContain(filterType.value, "verb") : ssrLooseEqual(filterType.value, "verb")) ? " selected" : ""}${_scopeId}>Fiil</option><option value="adjective" data-v-bb7fe81b${ssrIncludeBooleanAttr(Array.isArray(filterType.value) ? ssrLooseContain(filterType.value, "adjective") : ssrLooseEqual(filterType.value, "adjective")) ? " selected" : ""}${_scopeId}>Sıfat</option><option value="adverb" data-v-bb7fe81b${ssrIncludeBooleanAttr(Array.isArray(filterType.value) ? ssrLooseContain(filterType.value, "adverb") : ssrLooseEqual(filterType.value, "adverb")) ? " selected" : ""}${_scopeId}>Zarf</option></select><select class="select-bordered select select-sm min-w-[150px] flex-1" data-v-bb7fe81b${_scopeId}><option value="" data-v-bb7fe81b${ssrIncludeBooleanAttr(Array.isArray(filterStatus.value) ? ssrLooseContain(filterStatus.value, "") : ssrLooseEqual(filterStatus.value, "")) ? " selected" : ""}${_scopeId}>Tüm Durumlar</option><option value="0" data-v-bb7fe81b${ssrIncludeBooleanAttr(Array.isArray(filterStatus.value) ? ssrLooseContain(filterStatus.value, "0") : ssrLooseEqual(filterStatus.value, "0")) ? " selected" : ""}${_scopeId}>Öğrenilmedi</option><option value="1" data-v-bb7fe81b${ssrIncludeBooleanAttr(Array.isArray(filterStatus.value) ? ssrLooseContain(filterStatus.value, "1") : ssrLooseEqual(filterStatus.value, "1")) ? " selected" : ""}${_scopeId}>Öğreniliyor</option><option value="2" data-v-bb7fe81b${ssrIncludeBooleanAttr(Array.isArray(filterStatus.value) ? ssrLooseContain(filterStatus.value, "2") : ssrLooseEqual(filterStatus.value, "2")) ? " selected" : ""}${_scopeId}>Öğrenildi</option></select></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (showGameInterface.value) {
              _push2(`<div class="my-20" data-v-bb7fe81b${_scopeId}>`);
              if (loadingGame.value) {
                _push2(`<div class="flex h-60 items-center justify-center" data-v-bb7fe81b${_scopeId}><span class="loading loading-spinner loading-lg" data-v-bb7fe81b${_scopeId}></span></div>`);
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
              _push2(`<div data-v-bb7fe81b${_scopeId}>`);
              if (hasEnoughWords.value) {
                _push2(`<div class="mb-6 rounded-lg border border-base-300 bg-base-100 p-4" data-v-bb7fe81b${_scopeId}><div class="flex flex-wrap items-center gap-4" data-v-bb7fe81b${_scopeId}><div class="form-control" data-v-bb7fe81b${_scopeId}><label class="label cursor-pointer gap-2" data-v-bb7fe81b${_scopeId}><span class="label-text" data-v-bb7fe81b${_scopeId}>Soru Sayısı: ${ssrInterpolate(gameConfig.value.questionCount)}</span><input type="range" min="5" max="20"${ssrRenderAttr("value", gameConfig.value.questionCount)} class="range range-primary range-xs" data-v-bb7fe81b${_scopeId}></label></div><div class="form-control" data-v-bb7fe81b${_scopeId}><label class="label cursor-pointer" data-v-bb7fe81b${_scopeId}><span class="label-text mr-2" data-v-bb7fe81b${_scopeId}>Öğrenilmemiş Kelimelere Öncelik Ver</span><input type="checkbox" class="toggle toggle-sm"${ssrIncludeBooleanAttr(Array.isArray(prioritizeUnlearned.value) ? ssrLooseContain(prioritizeUnlearned.value, null) : prioritizeUnlearned.value) ? " checked" : ""} data-v-bb7fe81b${_scopeId}></label></div><div class="divider divider-horizontal" data-v-bb7fe81b${_scopeId}></div><div class="grid grid-cols-3 gap-2" data-v-bb7fe81b${_scopeId}><!--[-->`);
                ssrRenderList(games, (game) => {
                  _push2(`<button class="${ssrRenderClass([{ "btn-primary": currentGame.value === game.route, "btn-outline": currentGame.value !== game.route }, "btn btn-sm"])}" data-v-bb7fe81b${_scopeId}>${ssrInterpolate(game.name)}</button>`);
                });
                _push2(`<!--]--></div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="overflow-x-auto" data-v-bb7fe81b${_scopeId}><table class="table table-zebra" data-v-bb7fe81b${_scopeId}><thead data-v-bb7fe81b${_scopeId}><tr data-v-bb7fe81b${_scopeId}><th data-v-bb7fe81b${_scopeId}>Kelime</th><th data-v-bb7fe81b${_scopeId}>Anlam</th><th data-v-bb7fe81b${_scopeId}>Tür</th><th data-v-bb7fe81b${_scopeId}>Durum</th><th data-v-bb7fe81b${_scopeId}>Zorluk</th>`);
              if (isLoggedIn.value) {
                _push2(`<th data-v-bb7fe81b${_scopeId}></th>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</tr></thead><tbody data-v-bb7fe81b${_scopeId}>`);
              if (isLoading.value) {
                _push2(`<tr data-v-bb7fe81b${_scopeId}><td colspan="6" class="text-center" data-v-bb7fe81b${_scopeId}><span class="loading loading-spinner loading-md" data-v-bb7fe81b${_scopeId}></span></td></tr>`);
              } else if (displayedWords.value.length === 0) {
                _push2(`<tr data-v-bb7fe81b${_scopeId}><td colspan="6" class="text-center" data-v-bb7fe81b${_scopeId}>Sonuç bulunamadı</td></tr>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--[-->`);
              ssrRenderList(displayedWords.value, (word) => {
                _push2(`<tr data-v-bb7fe81b${_scopeId}><td class="font-medium" data-v-bb7fe81b${_scopeId}>${ssrInterpolate(word.word)}</td><td data-v-bb7fe81b${_scopeId}>${ssrInterpolate(getPrimaryMeaning(word))}</td><td data-v-bb7fe81b${_scopeId}><div class="badge" data-v-bb7fe81b${_scopeId}>${ssrInterpolate(word.type)}</div></td><td data-v-bb7fe81b${_scopeId}><div class="${ssrRenderClass([getLearningStatusBadgeClass(word.learning_status), "badge badge-sm"])}" data-v-bb7fe81b${_scopeId}>${ssrInterpolate(getLearningStatusLabel(word.learning_status))}</div></td><td data-v-bb7fe81b${_scopeId}><div class="${ssrRenderClass([getDifficultyBadgeClass(word.difficulty_level), "badge badge-sm"])}" data-v-bb7fe81b${_scopeId}>${ssrInterpolate(getDifficultyLabel(word.difficulty_level))}</div></td>`);
                if (isLoggedIn.value) {
                  _push2(`<td data-v-bb7fe81b${_scopeId}>`);
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
              if (filteredWordList.value.length > perPage.value) {
                _push2(`<div class="mt-4 flex justify-between" data-v-bb7fe81b${_scopeId}><div data-v-bb7fe81b${_scopeId}><span class="text-sm opacity-70" data-v-bb7fe81b${_scopeId}>${ssrInterpolate(paginationInfo.value)}</span></div><div class="join" data-v-bb7fe81b${_scopeId}><button class="btn btn-sm join-item"${ssrIncludeBooleanAttr(currentPage.value <= 1) ? " disabled" : ""} data-v-bb7fe81b${_scopeId}> « </button><button class="btn btn-sm join-item" data-v-bb7fe81b${_scopeId}>${ssrInterpolate(currentPage.value)}</button><button class="btn btn-sm join-item"${ssrIncludeBooleanAttr(currentPage.value >= totalPages.value) ? " disabled" : ""} data-v-bb7fe81b${_scopeId}> » </button></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (((_f = props.words) == null ? void 0 : _f.length) === 0) {
                _push2(`<div class="alert alert-info mt-6" data-v-bb7fe81b${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current" data-v-bb7fe81b${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-bb7fe81b${_scopeId}></path></svg><span data-v-bb7fe81b${_scopeId}>Bu pakette kelime bulunmamaktadır.</span></div>`);
              } else if (!hasEnoughWords.value) {
                _push2(`<div class="alert alert-warning mt-6" data-v-bb7fe81b${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current" data-v-bb7fe81b${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" data-v-bb7fe81b${_scopeId}></path></svg><span data-v-bb7fe81b${_scopeId}>Oyunları başlatabilmek için en az 5 kelime gerekiyor.</span></div>`);
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
                      createTextVNode(toDisplayString(((_g = props.pack) == null ? void 0 : _g.name) || "Kelimeler") + " ", 1),
                      createVNode("span", { class: "badge badge-outline ml-2" }, toDisplayString(((_h = props.words) == null ? void 0 : _h.length) || 0) + " kelime", 1)
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
                        class: "input-bordered input input-sm w-full",
                        onKeyup: withKeys(filterWords, ["enter"])
                      }, null, 40, ["onUpdate:modelValue"]), [
                        [vModelText, searchQuery.value]
                      ]),
                      createVNode("button", {
                        class: "btn btn-sm btn-square",
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
                  ]),
                  withDirectives(createVNode("select", {
                    "onUpdate:modelValue": ($event) => filterType.value = $event,
                    class: "select-bordered select select-sm min-w-[150px] flex-1",
                    onChange: filterWords
                  }, [
                    createVNode("option", { value: "" }, "Tüm Türler"),
                    createVNode("option", { value: "noun" }, "İsim"),
                    createVNode("option", { value: "verb" }, "Fiil"),
                    createVNode("option", { value: "adjective" }, "Sıfat"),
                    createVNode("option", { value: "adverb" }, "Zarf")
                  ], 40, ["onUpdate:modelValue"]), [
                    [vModelSelect, filterType.value]
                  ]),
                  withDirectives(createVNode("select", {
                    "onUpdate:modelValue": ($event) => filterStatus.value = $event,
                    class: "select-bordered select select-sm min-w-[150px] flex-1",
                    onChange: filterWords
                  }, [
                    createVNode("option", { value: "" }, "Tüm Durumlar"),
                    createVNode("option", { value: "0" }, "Öğrenilmedi"),
                    createVNode("option", { value: "1" }, "Öğreniliyor"),
                    createVNode("option", { value: "2" }, "Öğrenildi")
                  ], 40, ["onUpdate:modelValue"]), [
                    [vModelSelect, filterStatus.value]
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
                        hasEnoughWords.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mb-6 rounded-lg border border-base-300 bg-base-100 p-4"
                        }, [
                          createVNode("div", { class: "flex flex-wrap items-center gap-4" }, [
                            createVNode("div", { class: "form-control" }, [
                              createVNode("label", { class: "label cursor-pointer gap-2" }, [
                                createVNode("span", { class: "label-text" }, "Soru Sayısı: " + toDisplayString(gameConfig.value.questionCount), 1),
                                withDirectives(createVNode("input", {
                                  type: "range",
                                  min: "5",
                                  max: "20",
                                  "onUpdate:modelValue": ($event) => gameConfig.value.questionCount = $event,
                                  class: "range range-primary range-xs"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, gameConfig.value.questionCount]
                                ])
                              ])
                            ]),
                            createVNode("div", { class: "form-control" }, [
                              createVNode("label", { class: "label cursor-pointer" }, [
                                createVNode("span", { class: "label-text mr-2" }, "Öğrenilmemiş Kelimelere Öncelik Ver"),
                                withDirectives(createVNode("input", {
                                  type: "checkbox",
                                  class: "toggle toggle-sm",
                                  "onUpdate:modelValue": ($event) => prioritizeUnlearned.value = $event
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelCheckbox, prioritizeUnlearned.value]
                                ])
                              ])
                            ]),
                            createVNode("div", { class: "divider divider-horizontal" }),
                            createVNode("div", { class: "grid grid-cols-3 gap-2" }, [
                              (openBlock(), createBlock(Fragment, null, renderList(games, (game) => {
                                return createVNode("button", {
                                  key: game.route,
                                  onClick: ($event) => startGame(game.route),
                                  class: ["btn btn-sm", { "btn-primary": currentGame.value === game.route, "btn-outline": currentGame.value !== game.route }]
                                }, toDisplayString(game.name), 11, ["onClick"]);
                              }), 64))
                            ])
                          ])
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "overflow-x-auto" }, [
                          createVNode("table", { class: "table table-zebra" }, [
                            createVNode("thead", null, [
                              createVNode("tr", null, [
                                createVNode("th", null, "Kelime"),
                                createVNode("th", null, "Anlam"),
                                createVNode("th", null, "Tür"),
                                createVNode("th", null, "Durum"),
                                createVNode("th", null, "Zorluk"),
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
                                      class: ["badge badge-sm", getDifficultyBadgeClass(word.difficulty_level)]
                                    }, toDisplayString(getDifficultyLabel(word.difficulty_level)), 3)
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
                        filteredWordList.value.length > perPage.value ? (openBlock(), createBlock("div", {
                          key: 1,
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
                        ((_d2 = props.words) == null ? void 0 : _d2.length) === 0 ? (openBlock(), createBlock("div", {
                          key: 2,
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
                        ])) : !hasEnoughWords.value ? (openBlock(), createBlock("div", {
                          key: 3,
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
                  _: 1
                })
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
const Screen = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bb7fe81b"]]);
export {
  Screen as default
};
