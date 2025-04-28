import { ref, computed, onMounted, resolveComponent, withCtx, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, withDirectives, vModelText, vModelRadio, vModelSelect, Fragment, renderList, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseEqual, ssrLooseContain, ssrRenderList } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import { Inertia } from "@inertiajs/inertia";
import { _ as _sfc_main$1 } from "./CheckScreen-J_xllE7d.js";
import { _ as _sfc_main$2 } from "./TopScreen-DGs2djGh.js";
import _sfc_main$3 from "./MultipleChoice-D8mgxKA_.js";
import _sfc_main$4 from "./TranslateWord-DscFp0aR.js";
import _sfc_main$5 from "./WordCompletion-D4dSCUJm.js";
import _sfc_main$6 from "./WordsTable-BqU-bMcA.js";
import "./GameConfig-BCEvFKg5.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  props: {
    words: Array,
    languagePacks: Array,
    screen: Object,
    pack: Object,
    error: String
  },
  setup(__props) {
    var _a;
    const props = __props;
    const gameConfig = ref({
      questionCount: 10,
      wordSelection: "random",
      difficulty: "all",
      learningStatus: "all"
    });
    const isConfigValid = computed(() => {
      return gameConfig.value.questionCount >= 5 && gameConfig.value.questionCount <= 20;
    });
    const isLoading = ref(true);
    const auth = computed(() => usePage().props.auth);
    const isLoggedIn = computed(() => auth.value && auth.value.user);
    const searchQuery = ref("");
    const languageFilter = ref("");
    ref(((_a = props.pack) == null ? void 0 : _a.id) || "");
    const hasEnoughWords = computed(() => props.words && props.words.length >= 5);
    onMounted(() => {
      const params = new URLSearchParams(window.location.search);
      if (params.get("questionCount")) gameConfig.value.questionCount = parseInt(params.get("questionCount"));
      if (params.get("wordSelection")) gameConfig.value.wordSelection = params.get("wordSelection");
      if (params.get("difficulty")) gameConfig.value.difficulty = params.get("difficulty");
      if (params.get("learningStatus")) gameConfig.value.learningStatus = params.get("learningStatus");
      setTimeout(() => {
        isLoading.value = false;
      }, 500);
      if (!props.words || props.words.length === 0) {
        console.warn("Kelime verileri yüklenmedi veya boş");
      } else {
        console.log(`${props.words.length} kelime yüklendi`);
      }
    });
    const filteredWords = computed(() => {
      if (!props.words) {
        console.log("props.words is null or undefined");
        return [];
      }
      return props.words.filter((word) => {
        if (!word || typeof word !== "object") {
          console.log("Invalid word object:", word);
          return false;
        }
        const matchesSearch = !searchQuery.value.trim() || word.word && word.word.toLowerCase().includes(searchQuery.value.toLowerCase()) || word.meaning && word.meaning.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesLanguage = !languageFilter.value || word.language && word.language === languageFilter.value;
        return matchesSearch && matchesLanguage;
      });
    });
    const games = ref([
      { name: "Çoktan Seçmeli", route: "multiple-choice" },
      { name: "Boşluk Doldurma", route: "fill-in-the-blank" },
      { name: "Kelime Tamamlama", route: "word-completion" }
    ]);
    const updateQuery = (gameRoute) => {
      if (!isConfigValid.value) {
        alert("Lütfen geçerli oyun ayarlarını seçiniz.");
        return;
      }
      const currentQuery = new URLSearchParams(window.location.search);
      currentQuery.set("game", gameRoute);
      currentQuery.set("questionCount", gameConfig.value.questionCount);
      currentQuery.set("wordSelection", gameConfig.value.wordSelection);
      currentQuery.set("difficulty", gameConfig.value.difficulty);
      currentQuery.set("learningStatus", gameConfig.value.learningStatus);
      Inertia.visit(`${window.location.pathname}?${currentQuery.toString()}`, {
        method: "get",
        preserveState: true,
        replace: true
      });
    };
    const getPackSlugFromUrl = () => {
      const path = window.location.pathname;
      const parts = path.split("/");
      if (parts.length >= 4) {
        const slugFromUrl = parts[parts.length - 1];
        return slugFromUrl;
      }
      return null;
    };
    const queryParams = computed(() => {
      const params = new URLSearchParams(window.location.search);
      return {
        game: params.get("game") || null,
        questionCount: params.get("questionCount") || gameConfig.value.questionCount,
        wordSelection: params.get("wordSelection") || gameConfig.value.wordSelection,
        difficulty: params.get("difficulty") || gameConfig.value.difficulty,
        learningStatus: params.get("learningStatus") || gameConfig.value.learningStatus
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b, _c, _d, _e, _f;
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, { title: "Kelimeler" }, null, _parent2, _scopeId));
            if (props.error) {
              _push2(`<div class="mx-6 mt-6 rounded-md bg-red-50 p-4"${_scopeId}><div class="flex"${_scopeId}><div class="flex-shrink-0"${_scopeId}><svg class="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"${_scopeId}></path></svg></div><div class="ml-3"${_scopeId}><h3 class="text-sm font-medium text-red-800"${_scopeId}>${ssrInterpolate(props.error)}</h3></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (!props.error && queryParams.value.game === "multiple-choice") {
              _push2(ssrRenderComponent(_sfc_main$3, {
                gameType: queryParams.value.game,
                packSlug: ((_a2 = props.pack) == null ? void 0 : _a2.slug) || getPackSlugFromUrl(),
                words: props.words,
                gameConfig: queryParams.value
              }, null, _parent2, _scopeId));
            } else if (!props.error && queryParams.value.game === "fill-in-the-blank") {
              _push2(ssrRenderComponent(_sfc_main$4, {
                gameType: queryParams.value.game,
                packSlug: ((_b = props.pack) == null ? void 0 : _b.slug) || getPackSlugFromUrl(),
                words: props.words,
                gameConfig: queryParams.value
              }, null, _parent2, _scopeId));
            } else if (!props.error && queryParams.value.game === "word-completion") {
              _push2(ssrRenderComponent(_sfc_main$5, {
                gameType: queryParams.value.game,
                packSlug: ((_c = props.pack) == null ? void 0 : _c.slug) || getPackSlugFromUrl(),
                words: props.words,
                gameConfig: queryParams.value
              }, null, _parent2, _scopeId));
            } else if (!props.error) {
              _push2(`<div${_scopeId}><div class="p-6"${_scopeId}><div class="mb-6 flex items-center justify-between"${_scopeId}><div${_scopeId}><h2 class="text-xl font-bold text-gray-800"${_scopeId}>Kelime Listesi</h2><p class="text-sm text-gray-600"${_scopeId}> Toplam Kelime Sayısı: ${ssrInterpolate(isLoading.value ? "..." : props.words ? props.words.length : 0)}</p></div><div class="flex gap-2"${_scopeId}>`);
              if (isLoggedIn.value && props.pack) {
                _push2(`<a${ssrRenderAttr("href", _ctx.route("rendition.language-packs.edit", props.pack.id))} class="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"${_scopeId}> Paketi Düzenle </a>`);
              } else {
                _push2(`<!---->`);
              }
              if (isLoggedIn.value) {
                _push2(`<a${ssrRenderAttr("href", _ctx.route("rendition.words.create"))} class="hover:bg-black-700 focus:ring-black-500 rounded-md bg-black px-3 py-2 text-sm text-white focus:outline-none focus:ring-2"${_scopeId}> Yeni Kelime Ekle </a>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
              if (hasEnoughWords.value) {
                _push2(`<div class="mt-6 space-y-6"${_scopeId}><div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"${_scopeId}><h3 class="mb-4 text-lg font-semibold text-gray-900"${_scopeId}>Oyun Ayarları</h3><div class="grid gap-6 md:grid-cols-2"${_scopeId}><div class="space-y-4"${_scopeId}><div${_scopeId}><label for="questionCount" class="mb-1 block text-sm font-medium text-gray-700"${_scopeId}>Soru Sayısı</label><div class="flex items-center gap-2"${_scopeId}><input type="range" id="questionCount"${ssrRenderAttr("value", gameConfig.value.questionCount)} min="5" max="20" class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"${_scopeId}><span class="text-sm font-medium text-gray-700"${_scopeId}>${ssrInterpolate(gameConfig.value.questionCount)}</span></div></div><div${_scopeId}><label class="mb-1 block text-sm font-medium text-gray-700"${_scopeId}>Kelime Başarı Durumuna Göre</label><div class="space-y-2"${_scopeId}><div class="flex items-center"${_scopeId}><input type="radio" id="random"${ssrIncludeBooleanAttr(ssrLooseEqual(gameConfig.value.wordSelection, "random")) ? " checked" : ""} value="random" class="h-4 w-4 border-gray-300 text-black focus:ring-gray-500"${_scopeId}><label for="random" class="ml-2 block text-sm text-gray-700"${_scopeId}>Rastgele</label></div><div class="flex items-center"${_scopeId}><input type="radio" id="difficult"${ssrIncludeBooleanAttr(ssrLooseEqual(gameConfig.value.wordSelection, "difficult")) ? " checked" : ""} value="difficult" class="h-4 w-4 border-gray-300 text-black focus:ring-gray-500"${_scopeId}><label for="difficult" class="ml-2 block text-sm text-gray-700"${_scopeId}>Zor Kelimeler</label></div><div class="flex items-center"${_scopeId}><input type="radio" id="easy"${ssrIncludeBooleanAttr(ssrLooseEqual(gameConfig.value.wordSelection, "easy")) ? " checked" : ""} value="easy" class="h-4 w-4 border-gray-300 text-black focus:ring-gray-500"${_scopeId}><label for="easy" class="ml-2 block text-sm text-gray-700"${_scopeId}>Kolay Kelimeler</label></div></div></div></div><div class="space-y-4"${_scopeId}><div${_scopeId}><label for="difficulty" class="mb-1 block text-sm font-medium text-gray-700"${_scopeId}>Zorluk Seviyesi</label><select id="difficulty" class="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"${_scopeId}><option value="all"${ssrIncludeBooleanAttr(Array.isArray(gameConfig.value.difficulty) ? ssrLooseContain(gameConfig.value.difficulty, "all") : ssrLooseEqual(gameConfig.value.difficulty, "all")) ? " selected" : ""}${_scopeId}>Tüm Seviyeler</option><option value="1"${ssrIncludeBooleanAttr(Array.isArray(gameConfig.value.difficulty) ? ssrLooseContain(gameConfig.value.difficulty, "1") : ssrLooseEqual(gameConfig.value.difficulty, "1")) ? " selected" : ""}${_scopeId}>Kolay</option><option value="2"${ssrIncludeBooleanAttr(Array.isArray(gameConfig.value.difficulty) ? ssrLooseContain(gameConfig.value.difficulty, "2") : ssrLooseEqual(gameConfig.value.difficulty, "2")) ? " selected" : ""}${_scopeId}>Orta</option><option value="3"${ssrIncludeBooleanAttr(Array.isArray(gameConfig.value.difficulty) ? ssrLooseContain(gameConfig.value.difficulty, "3") : ssrLooseEqual(gameConfig.value.difficulty, "3")) ? " selected" : ""}${_scopeId}>Zor</option><option value="4"${ssrIncludeBooleanAttr(Array.isArray(gameConfig.value.difficulty) ? ssrLooseContain(gameConfig.value.difficulty, "4") : ssrLooseEqual(gameConfig.value.difficulty, "4")) ? " selected" : ""}${_scopeId}>Çok Zor</option></select></div><div${_scopeId}><label for="learningStatus" class="mb-1 block text-sm font-medium text-gray-700"${_scopeId}>Öğrenme Durumu</label><select id="learningStatus" class="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"${_scopeId}><option value="all"${ssrIncludeBooleanAttr(Array.isArray(gameConfig.value.learningStatus) ? ssrLooseContain(gameConfig.value.learningStatus, "all") : ssrLooseEqual(gameConfig.value.learningStatus, "all")) ? " selected" : ""}${_scopeId}>Tüm Durumlar</option><option value="0"${ssrIncludeBooleanAttr(Array.isArray(gameConfig.value.learningStatus) ? ssrLooseContain(gameConfig.value.learningStatus, "0") : ssrLooseEqual(gameConfig.value.learningStatus, "0")) ? " selected" : ""}${_scopeId}>Öğrenilmedi</option><option value="1"${ssrIncludeBooleanAttr(Array.isArray(gameConfig.value.learningStatus) ? ssrLooseContain(gameConfig.value.learningStatus, "1") : ssrLooseEqual(gameConfig.value.learningStatus, "1")) ? " selected" : ""}${_scopeId}>Öğreniliyor</option><option value="2"${ssrIncludeBooleanAttr(Array.isArray(gameConfig.value.learningStatus) ? ssrLooseContain(gameConfig.value.learningStatus, "2") : ssrLooseEqual(gameConfig.value.learningStatus, "2")) ? " selected" : ""}${_scopeId}>Öğrenildi</option></select></div></div></div></div><div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6"${_scopeId}><!--[-->`);
                ssrRenderList(games.value, (game, index) => {
                  _push2(ssrRenderComponent(_component_Link, {
                    key: index,
                    onClick: ($event) => updateQuery(game.route),
                    class: ["flex cursor-pointer flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-3 text-center text-xs font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-100 hover:shadow-md", { "cursor-not-allowed opacity-50": !isConfigValid.value }]
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<span${_scopeId2}>${ssrInterpolate(game.name)}</span>`);
                      } else {
                        return [
                          createVNode("span", null, toDisplayString(game.name), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                });
                _push2(`<!--]--></div></div>`);
              } else {
                _push2(`<div class="mt-6 rounded-md bg-yellow-100 p-4 text-sm text-yellow-800"${_scopeId}> Oyunları başlatabilmek için en az 5 kelime eklemelisiniz. </div>`);
              }
              _push2(ssrRenderComponent(_sfc_main$6, {
                words: props.words,
                isLoading: isLoading.value,
                showActions: isLoggedIn.value
              }, null, _parent2, _scopeId));
              if (searchQuery.value && filteredWords.value.length === 0 && isLoggedIn.value) {
                _push2(`<div class="mt-4 rounded-md bg-blue-50 p-4"${_scopeId}><p class="text-blue-700"${_scopeId}> Aradığınız kelime bulunamadı. <a${ssrRenderAttr("href", _ctx.route("rendition.words.create"))} class="font-medium underline"${_scopeId}> Yeni bir kelime eklemek ister misiniz? </a></p></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(_sfc_main$2, { title: "Kelimeler" }),
              props.error ? (openBlock(), createBlock("div", {
                key: 0,
                class: "mx-6 mt-6 rounded-md bg-red-50 p-4"
              }, [
                createVNode("div", { class: "flex" }, [
                  createVNode("div", { class: "flex-shrink-0" }, [
                    (openBlock(), createBlock("svg", {
                      class: "h-5 w-5 text-red-400",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      })
                    ]))
                  ]),
                  createVNode("div", { class: "ml-3" }, [
                    createVNode("h3", { class: "text-sm font-medium text-red-800" }, toDisplayString(props.error), 1)
                  ])
                ])
              ])) : createCommentVNode("", true),
              !props.error && queryParams.value.game === "multiple-choice" ? (openBlock(), createBlock(_sfc_main$3, {
                key: 1,
                gameType: queryParams.value.game,
                packSlug: ((_d = props.pack) == null ? void 0 : _d.slug) || getPackSlugFromUrl(),
                words: props.words,
                gameConfig: queryParams.value
              }, null, 8, ["gameType", "packSlug", "words", "gameConfig"])) : !props.error && queryParams.value.game === "fill-in-the-blank" ? (openBlock(), createBlock(_sfc_main$4, {
                key: 2,
                gameType: queryParams.value.game,
                packSlug: ((_e = props.pack) == null ? void 0 : _e.slug) || getPackSlugFromUrl(),
                words: props.words,
                gameConfig: queryParams.value
              }, null, 8, ["gameType", "packSlug", "words", "gameConfig"])) : !props.error && queryParams.value.game === "word-completion" ? (openBlock(), createBlock(_sfc_main$5, {
                key: 3,
                gameType: queryParams.value.game,
                packSlug: ((_f = props.pack) == null ? void 0 : _f.slug) || getPackSlugFromUrl(),
                words: props.words,
                gameConfig: queryParams.value
              }, null, 8, ["gameType", "packSlug", "words", "gameConfig"])) : !props.error ? (openBlock(), createBlock("div", { key: 4 }, [
                createVNode("div", { class: "p-6" }, [
                  createVNode("div", { class: "mb-6 flex items-center justify-between" }, [
                    createVNode("div", null, [
                      createVNode("h2", { class: "text-xl font-bold text-gray-800" }, "Kelime Listesi"),
                      createVNode("p", { class: "text-sm text-gray-600" }, " Toplam Kelime Sayısı: " + toDisplayString(isLoading.value ? "..." : props.words ? props.words.length : 0), 1)
                    ]),
                    createVNode("div", { class: "flex gap-2" }, [
                      isLoggedIn.value && props.pack ? (openBlock(), createBlock("a", {
                        key: 0,
                        href: _ctx.route("rendition.language-packs.edit", props.pack.id),
                        class: "rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
                      }, " Paketi Düzenle ", 8, ["href"])) : createCommentVNode("", true),
                      isLoggedIn.value ? (openBlock(), createBlock("a", {
                        key: 1,
                        href: _ctx.route("rendition.words.create"),
                        class: "hover:bg-black-700 focus:ring-black-500 rounded-md bg-black px-3 py-2 text-sm text-white focus:outline-none focus:ring-2"
                      }, " Yeni Kelime Ekle ", 8, ["href"])) : createCommentVNode("", true)
                    ])
                  ]),
                  hasEnoughWords.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "mt-6 space-y-6"
                  }, [
                    createVNode("div", { class: "rounded-lg border border-gray-200 bg-white p-6 shadow-sm" }, [
                      createVNode("h3", { class: "mb-4 text-lg font-semibold text-gray-900" }, "Oyun Ayarları"),
                      createVNode("div", { class: "grid gap-6 md:grid-cols-2" }, [
                        createVNode("div", { class: "space-y-4" }, [
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "questionCount",
                              class: "mb-1 block text-sm font-medium text-gray-700"
                            }, "Soru Sayısı"),
                            createVNode("div", { class: "flex items-center gap-2" }, [
                              withDirectives(createVNode("input", {
                                type: "range",
                                id: "questionCount",
                                "onUpdate:modelValue": ($event) => gameConfig.value.questionCount = $event,
                                min: "5",
                                max: "20",
                                class: "h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, gameConfig.value.questionCount]
                              ]),
                              createVNode("span", { class: "text-sm font-medium text-gray-700" }, toDisplayString(gameConfig.value.questionCount), 1)
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "mb-1 block text-sm font-medium text-gray-700" }, "Kelime Başarı Durumuna Göre"),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode("div", { class: "flex items-center" }, [
                                withDirectives(createVNode("input", {
                                  type: "radio",
                                  id: "random",
                                  "onUpdate:modelValue": ($event) => gameConfig.value.wordSelection = $event,
                                  value: "random",
                                  class: "h-4 w-4 border-gray-300 text-black focus:ring-gray-500"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelRadio, gameConfig.value.wordSelection]
                                ]),
                                createVNode("label", {
                                  for: "random",
                                  class: "ml-2 block text-sm text-gray-700"
                                }, "Rastgele")
                              ]),
                              createVNode("div", { class: "flex items-center" }, [
                                withDirectives(createVNode("input", {
                                  type: "radio",
                                  id: "difficult",
                                  "onUpdate:modelValue": ($event) => gameConfig.value.wordSelection = $event,
                                  value: "difficult",
                                  class: "h-4 w-4 border-gray-300 text-black focus:ring-gray-500"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelRadio, gameConfig.value.wordSelection]
                                ]),
                                createVNode("label", {
                                  for: "difficult",
                                  class: "ml-2 block text-sm text-gray-700"
                                }, "Zor Kelimeler")
                              ]),
                              createVNode("div", { class: "flex items-center" }, [
                                withDirectives(createVNode("input", {
                                  type: "radio",
                                  id: "easy",
                                  "onUpdate:modelValue": ($event) => gameConfig.value.wordSelection = $event,
                                  value: "easy",
                                  class: "h-4 w-4 border-gray-300 text-black focus:ring-gray-500"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelRadio, gameConfig.value.wordSelection]
                                ]),
                                createVNode("label", {
                                  for: "easy",
                                  class: "ml-2 block text-sm text-gray-700"
                                }, "Kolay Kelimeler")
                              ])
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "space-y-4" }, [
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "difficulty",
                              class: "mb-1 block text-sm font-medium text-gray-700"
                            }, "Zorluk Seviyesi"),
                            withDirectives(createVNode("select", {
                              id: "difficulty",
                              "onUpdate:modelValue": ($event) => gameConfig.value.difficulty = $event,
                              class: "w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            }, [
                              createVNode("option", { value: "all" }, "Tüm Seviyeler"),
                              createVNode("option", { value: "1" }, "Kolay"),
                              createVNode("option", { value: "2" }, "Orta"),
                              createVNode("option", { value: "3" }, "Zor"),
                              createVNode("option", { value: "4" }, "Çok Zor")
                            ], 8, ["onUpdate:modelValue"]), [
                              [vModelSelect, gameConfig.value.difficulty]
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "learningStatus",
                              class: "mb-1 block text-sm font-medium text-gray-700"
                            }, "Öğrenme Durumu"),
                            withDirectives(createVNode("select", {
                              id: "learningStatus",
                              "onUpdate:modelValue": ($event) => gameConfig.value.learningStatus = $event,
                              class: "w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            }, [
                              createVNode("option", { value: "all" }, "Tüm Durumlar"),
                              createVNode("option", { value: "0" }, "Öğrenilmedi"),
                              createVNode("option", { value: "1" }, "Öğreniliyor"),
                              createVNode("option", { value: "2" }, "Öğrenildi")
                            ], 8, ["onUpdate:modelValue"]), [
                              [vModelSelect, gameConfig.value.learningStatus]
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(games.value, (game, index) => {
                        return openBlock(), createBlock(_component_Link, {
                          key: index,
                          onClick: ($event) => updateQuery(game.route),
                          class: ["flex cursor-pointer flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-3 text-center text-xs font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-100 hover:shadow-md", { "cursor-not-allowed opacity-50": !isConfigValid.value }]
                        }, {
                          default: withCtx(() => [
                            createVNode("span", null, toDisplayString(game.name), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick", "class"]);
                      }), 128))
                    ])
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "mt-6 rounded-md bg-yellow-100 p-4 text-sm text-yellow-800"
                  }, " Oyunları başlatabilmek için en az 5 kelime eklemelisiniz. ")),
                  createVNode(_sfc_main$6, {
                    words: props.words,
                    isLoading: isLoading.value,
                    showActions: isLoggedIn.value
                  }, null, 8, ["words", "isLoading", "showActions"]),
                  searchQuery.value && filteredWords.value.length === 0 && isLoggedIn.value ? (openBlock(), createBlock("div", {
                    key: 2,
                    class: "mt-4 rounded-md bg-blue-50 p-4"
                  }, [
                    createVNode("p", { class: "text-blue-700" }, [
                      createTextVNode(" Aradığınız kelime bulunamadı. "),
                      createVNode("a", {
                        href: _ctx.route("rendition.words.create"),
                        class: "font-medium underline"
                      }, " Yeni bir kelime eklemek ister misiniz? ", 8, ["href"])
                    ])
                  ])) : createCommentVNode("", true)
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
export {
  _sfc_main as default
};
