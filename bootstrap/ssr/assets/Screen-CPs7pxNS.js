import { computed, ref, withCtx, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, withDirectives, vModelText, vModelSelect, Fragment, renderList, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { usePage, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-J_xllE7d.js";
import { _ as _sfc_main$2 } from "./TopScreen-DGs2djGh.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  props: {
    words: Array,
    languagePacks: Array,
    screen: Object
  },
  setup(__props) {
    const props = __props;
    const auth = computed(() => usePage().props.auth);
    const isLoggedIn = computed(() => auth.value && auth.value.user);
    const searchQuery = ref("");
    const languageFilter = ref("");
    const packFilter = ref("");
    const filteredWords = computed(() => {
      return props.words.filter((word) => {
        const matchesSearch = !searchQuery.value.trim() || word.word.toLowerCase().includes(searchQuery.value.toLowerCase()) || word.meaning.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesLanguage = !languageFilter.value || word.language === languageFilter.value;
        const matchesPack = !packFilter.value || word.language_packs.some((pack) => pack.id === packFilter.value);
        return matchesSearch && matchesLanguage && matchesPack;
      });
    });
    const difficultyText = (level) => {
      switch (level) {
        case 1:
          return "Kolay";
        case 2:
          return "Orta";
        case 3:
          return "Zor";
        case 4:
          return "Çok Zor";
        default:
          return "Bilinmiyor";
      }
    };
    const learningStatusText = (status) => {
      switch (status) {
        case 0:
          return "Öğrenilmedi";
        case 1:
          return "Öğreniliyor";
        case 2:
          return "Öğrenildi";
        default:
          return "Bilinmiyor";
      }
    };
    const confirmDelete = (word) => {
      if (confirm(`"${word.word}" kelimesini silmek istediğinize emin misiniz?`)) {
        router.delete(route("rendition.words.destroy", word.id));
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, { title: "Kelimeler" }, null, _parent2, _scopeId));
            _push2(`<div class="p-6"${_scopeId}><div class="mb-6 flex items-center justify-between"${_scopeId}><div${_scopeId}><h2 class="text-xl font-bold text-gray-800"${_scopeId}>Kelime Listesi</h2><p class="text-sm text-gray-600"${_scopeId}>Toplam Kelime Sayısı: ${ssrInterpolate(__props.words.length)}</p></div><div class="flex gap-2"${_scopeId}>`);
            if (isLoggedIn.value) {
              _push2(`<a${ssrRenderAttr("href", _ctx.route("rendition.words.create"))} class="hover:bg-black-700 focus:ring-black-500 rounded-md bg-black px-3 py-2 text-sm text-white focus:outline-none focus:ring-2"${_scopeId}> Yeni Kelime Ekle </a>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3"${_scopeId}><div${_scopeId}><label for="search" class="mb-1 block text-sm font-medium text-gray-700"${_scopeId}>Kelime Ara</label><input id="search"${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Kelime veya anlam ara..." class="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"${_scopeId}></div><div${_scopeId}><label for="language-filter" class="mb-1 block text-sm font-medium text-gray-700"${_scopeId}>Dil Filtresi</label><select id="language-filter" class="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(languageFilter.value) ? ssrLooseContain(languageFilter.value, "") : ssrLooseEqual(languageFilter.value, "")) ? " selected" : ""}${_scopeId}>Tüm Diller</option><option value="tr"${ssrIncludeBooleanAttr(Array.isArray(languageFilter.value) ? ssrLooseContain(languageFilter.value, "tr") : ssrLooseEqual(languageFilter.value, "tr")) ? " selected" : ""}${_scopeId}>Türkçe (TR)</option><option value="en"${ssrIncludeBooleanAttr(Array.isArray(languageFilter.value) ? ssrLooseContain(languageFilter.value, "en") : ssrLooseEqual(languageFilter.value, "en")) ? " selected" : ""}${_scopeId}>İngilizce (EN)</option><option value="de"${ssrIncludeBooleanAttr(Array.isArray(languageFilter.value) ? ssrLooseContain(languageFilter.value, "de") : ssrLooseEqual(languageFilter.value, "de")) ? " selected" : ""}${_scopeId}>Almanca (DE)</option><option value="fr"${ssrIncludeBooleanAttr(Array.isArray(languageFilter.value) ? ssrLooseContain(languageFilter.value, "fr") : ssrLooseEqual(languageFilter.value, "fr")) ? " selected" : ""}${_scopeId}>Fransızca (FR)</option><option value="es"${ssrIncludeBooleanAttr(Array.isArray(languageFilter.value) ? ssrLooseContain(languageFilter.value, "es") : ssrLooseEqual(languageFilter.value, "es")) ? " selected" : ""}${_scopeId}>İspanyolca (ES)</option><option value="it"${ssrIncludeBooleanAttr(Array.isArray(languageFilter.value) ? ssrLooseContain(languageFilter.value, "it") : ssrLooseEqual(languageFilter.value, "it")) ? " selected" : ""}${_scopeId}>İtalyanca (IT)</option><option value="ru"${ssrIncludeBooleanAttr(Array.isArray(languageFilter.value) ? ssrLooseContain(languageFilter.value, "ru") : ssrLooseEqual(languageFilter.value, "ru")) ? " selected" : ""}${_scopeId}>Rusça (RU)</option><option value="ar"${ssrIncludeBooleanAttr(Array.isArray(languageFilter.value) ? ssrLooseContain(languageFilter.value, "ar") : ssrLooseEqual(languageFilter.value, "ar")) ? " selected" : ""}${_scopeId}>Arapça (AR)</option></select></div></div><div class="overflow-x-auto"${_scopeId}><table class="min-w-full rounded-lg border border-gray-300 bg-white shadow-md"${_scopeId}><thead class="bg-gray-200 text-gray-700"${_scopeId}><tr${_scopeId}><th class="border-b px-4 py-3 text-left text-sm font-semibold"${_scopeId}>Kelime</th><th class="border-b px-4 py-3 text-left text-sm font-semibold"${_scopeId}>Anlam</th><th class="border-b px-4 py-3 text-left text-sm font-semibold"${_scopeId}>Tür</th><th class="border-b px-4 py-3 text-left text-sm font-semibold"${_scopeId}>Zorluk</th><th class="border-b px-4 py-3 text-left text-sm font-semibold"${_scopeId}>Öğrenme Durumu</th>`);
            if (isLoggedIn.value) {
              _push2(`<th class="border-b px-4 py-3 text-left text-sm font-semibold"${_scopeId}>İşlemler</th>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tr></thead><tbody${_scopeId}>`);
            if (filteredWords.value.length === 0) {
              _push2(`<tr${_scopeId}><td colspan="8" class="border-b px-4 py-6 text-center text-gray-500"${_scopeId}>${ssrInterpolate(searchQuery.value || languageFilter.value || packFilter.value ? "Arama kriterlerine uygun kelime bulunamadı." : "Henüz kelime bulunmamaktadır.")}</td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(filteredWords.value, (word) => {
              _push2(`<tr class="text-xs transition hover:bg-gray-100"${_scopeId}><td class="border-b px-4 py-3 font-medium"${_scopeId}>${ssrInterpolate(word.word)}</td><td class="border-b px-4 py-3"${_scopeId}>${ssrInterpolate(word.meaning)}</td><td class="border-b px-4 py-3 capitalize"${_scopeId}>${ssrInterpolate(word.type)}</td><td class="border-b px-4 py-3"${_scopeId}>${ssrInterpolate(difficultyText(word.difficulty_level))}</td><td class="border-b px-4 py-3"${_scopeId}><span class="${ssrRenderClass([{
                "bg-red-100 text-red-800": word.learning_status === 0,
                "bg-yellow-100 text-yellow-800": word.learning_status === 1,
                "bg-green-100 text-green-800": word.learning_status === 2
              }, "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"])}"${_scopeId}>${ssrInterpolate(learningStatusText(word.learning_status))}</span></td>`);
              if (isLoggedIn.value) {
                _push2(`<td class="border-b px-4 py-3"${_scopeId}><div class="flex space-x-2"${_scopeId}><a${ssrRenderAttr("href", _ctx.route("rendition.words.edit", word.id))} class="rounded bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700 hover:bg-yellow-200"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5m-6-6l6 6M15 3l6 6"${_scopeId}></path></svg></a><button class="rounded bg-red-100 px-2 py-1 text-xs font-medium text-red-700 hover:bg-red-200"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4a1 1 0 011 1v1H9V4a1 1 0 011-1z"${_scopeId}></path></svg></button></div></td>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</tr>`);
            });
            _push2(`<!--]--></tbody></table></div>`);
            if (searchQuery.value && filteredWords.value.length === 0 && isLoggedIn.value) {
              _push2(`<div class="mt-4 rounded-md bg-blue-50 p-4"${_scopeId}><p class="text-blue-700"${_scopeId}> Aradığınız kelime bulunamadı. <a${ssrRenderAttr("href", _ctx.route("rendition.words.create"))} class="font-medium underline"${_scopeId}>Yeni bir kelime eklemek ister misiniz?</a></p></div>`);
            } else if (searchQuery.value && filteredWords.value.length === 0 && !isLoggedIn.value) {
              _push2(`<div class="mt-4 rounded-md bg-blue-50 p-4"${_scopeId}><p class="text-blue-700"${_scopeId}>Aradığınız kelime bulunamadı.</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode(_sfc_main$2, { title: "Kelimeler" }),
              createVNode("div", { class: "p-6" }, [
                createVNode("div", { class: "mb-6 flex items-center justify-between" }, [
                  createVNode("div", null, [
                    createVNode("h2", { class: "text-xl font-bold text-gray-800" }, "Kelime Listesi"),
                    createVNode("p", { class: "text-sm text-gray-600" }, "Toplam Kelime Sayısı: " + toDisplayString(__props.words.length), 1)
                  ]),
                  createVNode("div", { class: "flex gap-2" }, [
                    isLoggedIn.value ? (openBlock(), createBlock("a", {
                      key: 0,
                      href: _ctx.route("rendition.words.create"),
                      class: "hover:bg-black-700 focus:ring-black-500 rounded-md bg-black px-3 py-2 text-sm text-white focus:outline-none focus:ring-2"
                    }, " Yeni Kelime Ekle ", 8, ["href"])) : createCommentVNode("", true)
                  ])
                ]),
                createVNode("div", { class: "mb-6 grid grid-cols-1 gap-4 md:grid-cols-3" }, [
                  createVNode("div", null, [
                    createVNode("label", {
                      for: "search",
                      class: "mb-1 block text-sm font-medium text-gray-700"
                    }, "Kelime Ara"),
                    withDirectives(createVNode("input", {
                      id: "search",
                      "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                      type: "text",
                      placeholder: "Kelime veya anlam ara...",
                      class: "w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, searchQuery.value]
                    ])
                  ]),
                  createVNode("div", null, [
                    createVNode("label", {
                      for: "language-filter",
                      class: "mb-1 block text-sm font-medium text-gray-700"
                    }, "Dil Filtresi"),
                    withDirectives(createVNode("select", {
                      id: "language-filter",
                      "onUpdate:modelValue": ($event) => languageFilter.value = $event,
                      class: "w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    }, [
                      createVNode("option", { value: "" }, "Tüm Diller"),
                      createVNode("option", { value: "tr" }, "Türkçe (TR)"),
                      createVNode("option", { value: "en" }, "İngilizce (EN)"),
                      createVNode("option", { value: "de" }, "Almanca (DE)"),
                      createVNode("option", { value: "fr" }, "Fransızca (FR)"),
                      createVNode("option", { value: "es" }, "İspanyolca (ES)"),
                      createVNode("option", { value: "it" }, "İtalyanca (IT)"),
                      createVNode("option", { value: "ru" }, "Rusça (RU)"),
                      createVNode("option", { value: "ar" }, "Arapça (AR)")
                    ], 8, ["onUpdate:modelValue"]), [
                      [vModelSelect, languageFilter.value]
                    ])
                  ])
                ]),
                createVNode("div", { class: "overflow-x-auto" }, [
                  createVNode("table", { class: "min-w-full rounded-lg border border-gray-300 bg-white shadow-md" }, [
                    createVNode("thead", { class: "bg-gray-200 text-gray-700" }, [
                      createVNode("tr", null, [
                        createVNode("th", { class: "border-b px-4 py-3 text-left text-sm font-semibold" }, "Kelime"),
                        createVNode("th", { class: "border-b px-4 py-3 text-left text-sm font-semibold" }, "Anlam"),
                        createVNode("th", { class: "border-b px-4 py-3 text-left text-sm font-semibold" }, "Tür"),
                        createVNode("th", { class: "border-b px-4 py-3 text-left text-sm font-semibold" }, "Zorluk"),
                        createVNode("th", { class: "border-b px-4 py-3 text-left text-sm font-semibold" }, "Öğrenme Durumu"),
                        isLoggedIn.value ? (openBlock(), createBlock("th", {
                          key: 0,
                          class: "border-b px-4 py-3 text-left text-sm font-semibold"
                        }, "İşlemler")) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode("tbody", null, [
                      filteredWords.value.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                        createVNode("td", {
                          colspan: "8",
                          class: "border-b px-4 py-6 text-center text-gray-500"
                        }, toDisplayString(searchQuery.value || languageFilter.value || packFilter.value ? "Arama kriterlerine uygun kelime bulunamadı." : "Henüz kelime bulunmamaktadır."), 1)
                      ])) : createCommentVNode("", true),
                      (openBlock(true), createBlock(Fragment, null, renderList(filteredWords.value, (word) => {
                        return openBlock(), createBlock("tr", {
                          key: word.id,
                          class: "text-xs transition hover:bg-gray-100"
                        }, [
                          createVNode("td", { class: "border-b px-4 py-3 font-medium" }, toDisplayString(word.word), 1),
                          createVNode("td", { class: "border-b px-4 py-3" }, toDisplayString(word.meaning), 1),
                          createVNode("td", { class: "border-b px-4 py-3 capitalize" }, toDisplayString(word.type), 1),
                          createVNode("td", { class: "border-b px-4 py-3" }, toDisplayString(difficultyText(word.difficulty_level)), 1),
                          createVNode("td", { class: "border-b px-4 py-3" }, [
                            createVNode("span", {
                              class: ["inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", {
                                "bg-red-100 text-red-800": word.learning_status === 0,
                                "bg-yellow-100 text-yellow-800": word.learning_status === 1,
                                "bg-green-100 text-green-800": word.learning_status === 2
                              }]
                            }, toDisplayString(learningStatusText(word.learning_status)), 3)
                          ]),
                          isLoggedIn.value ? (openBlock(), createBlock("td", {
                            key: 0,
                            class: "border-b px-4 py-3"
                          }, [
                            createVNode("div", { class: "flex space-x-2" }, [
                              createVNode("a", {
                                href: _ctx.route("rendition.words.edit", word.id),
                                class: "rounded bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700 hover:bg-yellow-200"
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
                                    d: "M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5m-6-6l6 6M15 3l6 6"
                                  })
                                ]))
                              ], 8, ["href"]),
                              createVNode("button", {
                                onClick: ($event) => confirmDelete(word),
                                class: "rounded bg-red-100 px-2 py-1 text-xs font-medium text-red-700 hover:bg-red-200"
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
                                    d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4a1 1 0 011 1v1H9V4a1 1 0 011-1z"
                                  })
                                ]))
                              ], 8, ["onClick"])
                            ])
                          ])) : createCommentVNode("", true)
                        ]);
                      }), 128))
                    ])
                  ])
                ]),
                searchQuery.value && filteredWords.value.length === 0 && isLoggedIn.value ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "mt-4 rounded-md bg-blue-50 p-4"
                }, [
                  createVNode("p", { class: "text-blue-700" }, [
                    createTextVNode(" Aradığınız kelime bulunamadı. "),
                    createVNode("a", {
                      href: _ctx.route("rendition.words.create"),
                      class: "font-medium underline"
                    }, "Yeni bir kelime eklemek ister misiniz?", 8, ["href"])
                  ])
                ])) : searchQuery.value && filteredWords.value.length === 0 && !isLoggedIn.value ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "mt-4 rounded-md bg-blue-50 p-4"
                }, [
                  createVNode("p", { class: "text-blue-700" }, "Aradığınız kelime bulunamadı.")
                ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Rendition/Words/Index/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
