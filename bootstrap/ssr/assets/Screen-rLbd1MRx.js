import { ref, computed, onMounted, resolveComponent, withCtx, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, Fragment, renderList, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import { Inertia } from "@inertiajs/inertia";
import { _ as _sfc_main$1 } from "./CheckScreen-J_xllE7d.js";
import { _ as _sfc_main$2 } from "./TopScreen-DGs2djGh.js";
import _sfc_main$3 from "./MultipleChoice-Bx8rUE-5.js";
import _sfc_main$4 from "./TranslateWord-BiHT-xFJ.js";
import _sfc_main$5 from "./WordsTable-cHln5l1Y.js";
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
    const isLoading = ref(true);
    const auth = computed(() => usePage().props.auth);
    const isLoggedIn = computed(() => auth.value && auth.value.user);
    const searchQuery = ref("");
    const languageFilter = ref("");
    ref(((_a = props.pack) == null ? void 0 : _a.id) || "");
    const hasEnoughWords = computed(() => props.words && props.words.length >= 5);
    onMounted(() => {
      setTimeout(() => {
        isLoading.value = false;
      }, 500);
      if (!props.words || props.words.length === 0) {
        console.warn("Kelime verileri yüklenmedi veya boş");
      } else {
        console.log(`${props.words.length} kelime yüklendi`);
        if (props.words[0]) {
          console.log("İlk kelime örneği:", props.words[0]);
        }
      }
    });
    const filteredWords = computed(() => {
      if (!props.words) {
        console.log("props.words is null or undefined");
        return [];
      }
      console.log("All words:", props.words);
      console.log("Search query:", searchQuery.value);
      console.log("Language filter:", languageFilter.value);
      return props.words.filter((word) => {
        if (!word || typeof word !== "object") {
          console.log("Invalid word object:", word);
          return false;
        }
        const matchesSearch = !searchQuery.value.trim() || word.word && word.word.toLowerCase().includes(searchQuery.value.toLowerCase()) || word.meaning && word.meaning.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesLanguage = !languageFilter.value || word.language && word.language === languageFilter.value;
        console.log("Word filtering results:", {
          word: word.word,
          matchesSearch,
          matchesLanguage
        });
        return matchesSearch && matchesLanguage;
      });
    });
    const games = ref([
      { name: "Çoktan Seçmeli", route: "multiple-choice" },
      { name: "Boşluk Doldurma", route: "fill-in-the-blank" },
      { name: "Çeviri", route: "translation" },
      { name: "Eşleştirme", route: "matching" },
      { name: "Hızlı Yanıt", route: "fast-response" },
      { name: "Kelime Tahmini", route: "word-guess" }
    ]);
    const updateQuery = (gameRoute) => {
      const currentQuery = new URLSearchParams(window.location.search);
      currentQuery.set("game", gameRoute);
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
        console.log("Extracting slug from URL:", slugFromUrl);
        return slugFromUrl;
      }
      console.log("No slug found in URL");
      return null;
    };
    console.log("Pack prop:", props.pack);
    console.log("All language packs:", props.languagePacks);
    const queryParams = computed(() => {
      const params = new URLSearchParams(window.location.search);
      return {
        game: params.get("game") || null
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b, _c, _d;
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
                words: props.words
              }, null, _parent2, _scopeId));
            } else if (!props.error && queryParams.value.game === "fill-in-the-blank") {
              _push2(ssrRenderComponent(_sfc_main$4, {
                gameType: queryParams.value.game,
                packSlug: ((_b = props.pack) == null ? void 0 : _b.slug) || getPackSlugFromUrl(),
                words: props.words
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
              if (!queryParams.value.game && !hasEnoughWords.value) {
                _push2(`<div class="mt-6 rounded-md bg-yellow-100 p-4 text-sm text-yellow-800"${_scopeId}> Oyunları başlatabilmek için en az 5 kelime eklemelisiniz. </div>`);
              } else {
                _push2(`<!---->`);
              }
              if (!queryParams.value.game && hasEnoughWords.value) {
                _push2(`<div class="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6"${_scopeId}><!--[-->`);
                ssrRenderList(games.value, (game, index) => {
                  _push2(ssrRenderComponent(_component_Link, {
                    key: index,
                    onClick: ($event) => updateQuery(game.route),
                    class: "flex cursor-pointer flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-3 text-center text-xs font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-100 hover:shadow-md"
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
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(ssrRenderComponent(_sfc_main$5, {
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
                packSlug: ((_c = props.pack) == null ? void 0 : _c.slug) || getPackSlugFromUrl(),
                words: props.words
              }, null, 8, ["gameType", "packSlug", "words"])) : !props.error && queryParams.value.game === "fill-in-the-blank" ? (openBlock(), createBlock(_sfc_main$4, {
                key: 2,
                gameType: queryParams.value.game,
                packSlug: ((_d = props.pack) == null ? void 0 : _d.slug) || getPackSlugFromUrl(),
                words: props.words
              }, null, 8, ["gameType", "packSlug", "words"])) : !props.error ? (openBlock(), createBlock("div", { key: 3 }, [
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
                  !queryParams.value.game && !hasEnoughWords.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "mt-6 rounded-md bg-yellow-100 p-4 text-sm text-yellow-800"
                  }, " Oyunları başlatabilmek için en az 5 kelime eklemelisiniz. ")) : createCommentVNode("", true),
                  !queryParams.value.game && hasEnoughWords.value ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(games.value, (game, index) => {
                      return openBlock(), createBlock(_component_Link, {
                        key: index,
                        onClick: ($event) => updateQuery(game.route),
                        class: "flex cursor-pointer flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-3 text-center text-xs font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-100 hover:shadow-md"
                      }, {
                        default: withCtx(() => [
                          createVNode("span", null, toDisplayString(game.name), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"]);
                    }), 128))
                  ])) : createCommentVNode("", true),
                  createVNode(_sfc_main$5, {
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
