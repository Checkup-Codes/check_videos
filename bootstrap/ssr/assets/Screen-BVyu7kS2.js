import { ref, computed, withCtx, unref, createTextVNode, createBlock, openBlock, createVNode, createCommentVNode, withDirectives, withKeys, vModelText, toDisplayString, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-G62taWZ6.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  props: {
    words: Array,
    languagePacks: Array,
    screen: Object,
    error: {
      type: String,
      default: null
    },
    filters: Object,
    pagination: Object
  },
  setup(__props) {
    const searchQuery = ref("");
    const searchResult = ref(null);
    const isSearching = ref(false);
    const hasSearched = ref(false);
    const auth = computed(() => usePage().props.auth);
    const isLoggedIn = computed(() => auth.value && auth.value.user);
    const searchWord = async () => {
      if (!searchQuery.value.trim()) return;
      isSearching.value = true;
      hasSearched.value = true;
      try {
        const response = await fetch(route("rendition.words.search"), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute("content")
          },
          body: JSON.stringify({
            search: searchQuery.value.trim()
          })
        });
        const data = await response.json();
        if (data.success) {
          searchResult.value = data.word;
        } else {
          searchResult.value = null;
        }
      } catch (error) {
        console.error("Search error:", error);
        searchResult.value = null;
      } finally {
        isSearching.value = false;
      }
    };
    const onSearchInput = () => {
      if (searchQuery.value.trim() === "") {
        searchResult.value = null;
        hasSearched.value = false;
      }
    };
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
    const getLanguageLabel = (language) => {
      switch (language) {
        case "tr":
          return "Türkçe";
        case "en":
          return "İngilizce";
        case "de":
          return "Almanca";
        case "fr":
          return "Fransızca";
        case "es":
          return "İspanyolca";
        default:
          return language;
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="container mx-auto max-w-4xl px-4 py-8"${_scopeId}><div class="mb-12 text-center"${_scopeId}><h1 class="mb-2 text-4xl font-bold tracking-tight"${_scopeId}>Kelime Sözlüğü</h1><p class="text-muted-foreground text-lg"${_scopeId}>Kelime arayın, anlamlarını öğrenin</p></div><div class="mx-auto mb-8 max-w-2xl"${_scopeId}><div class="relative"${_scopeId}><div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"${_scopeId}><svg class="text-muted-foreground h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"${_scopeId}></path></svg></div><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Kelime arayın..." class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-12 w-full rounded-md border px-3 py-2 pl-10 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"${_scopeId}><button${ssrIncludeBooleanAttr(isSearching.value || !searchQuery.value.trim()) ? " disabled" : ""} class="text-primary-foreground ring-offset-background hover:bg-primary/90 focus-visible:ring-ring absolute right-2 top-1/2 inline-flex h-8 -translate-y-1/2 items-center justify-center rounded-md bg-primary px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"${_scopeId}>`);
            if (isSearching.value) {
              _push2(`<span class="flex items-center"${_scopeId}><svg class="-ml-1 mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24"${_scopeId}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"${_scopeId}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"${_scopeId}></path></svg> Aranıyor... </span>`);
            } else {
              _push2(`<span${_scopeId}>Ara</span>`);
            }
            _push2(`</button></div></div>`);
            if (searchResult.value) {
              _push2(`<div class="mx-auto max-w-4xl"${_scopeId}><div class="bg-card text-card-foreground rounded-lg border shadow-sm"${_scopeId}><div class="p-6"${_scopeId}><div class="mb-6 flex items-start justify-between"${_scopeId}><div class="flex-1"${_scopeId}><div class="mb-2 flex items-center gap-3"${_scopeId}><h2 class="text-3xl font-bold"${_scopeId}>${ssrInterpolate(searchResult.value.word)}</h2><div class="flex gap-2"${_scopeId}><span class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"${_scopeId}>${ssrInterpolate(getWordTypeLabel(searchResult.value.type))}</span><span class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"${_scopeId}>${ssrInterpolate(getLanguageLabel(searchResult.value.language))}</span></div></div><p class="text-muted-foreground text-xl"${_scopeId}>${ssrInterpolate(searchResult.value.meaning)}</p></div>`);
              if (isLoggedIn.value) {
                _push2(`<div class="flex gap-2"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("rendition.words.edit", searchResult.value.id),
                  class: "ring-offset-background focus-visible:ring-ring border-input bg-background hover:text-accent-foreground inline-flex h-9 items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
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
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
              if (searchResult.value.meanings && searchResult.value.meanings.length > 1) {
                _push2(`<div class="mb-6"${_scopeId}><h3 class="mb-3 text-lg font-semibold"${_scopeId}>Anlamlar</h3><div class="space-y-2"${_scopeId}><!--[-->`);
                ssrRenderList(searchResult.value.meanings, (meaning, index) => {
                  _push2(`<div class="${ssrRenderClass([meaning.is_primary ? "border-blue-200 bg-blue-50" : "bg-muted/50", "flex items-start gap-3 rounded-md border p-3"])}"${_scopeId}>`);
                  if (meaning.is_primary) {
                    _push2(`<span class="inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800"${_scopeId}> Ana </span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<span class="text-sm"${_scopeId}>${ssrInterpolate(meaning.meaning)}</span></div>`);
                });
                _push2(`<!--]--></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3"${_scopeId}><div class="bg-card rounded-lg border p-4"${_scopeId}><div class="text-muted-foreground text-sm"${_scopeId}>Öğrenme Durumu</div><div class="text-lg font-semibold"${_scopeId}>${ssrInterpolate(getLearningStatusLabel(searchResult.value.learning_status))}</div></div><div class="bg-card rounded-lg border p-4"${_scopeId}><div class="text-muted-foreground text-sm"${_scopeId}>Tekrar Sayısı</div><div class="text-lg font-semibold"${_scopeId}>${ssrInterpolate(searchResult.value.review_count || 0)}</div></div><div class="bg-card rounded-lg border p-4"${_scopeId}><div class="text-muted-foreground text-sm"${_scopeId}>Yanlış Sayısı</div><div class="text-lg font-semibold"${_scopeId}>${ssrInterpolate(searchResult.value.incorrect_count || 0)}</div></div></div>`);
              if (searchResult.value.language_packs && searchResult.value.language_packs.length > 0) {
                _push2(`<div class="mb-6"${_scopeId}><h3 class="mb-3 text-lg font-semibold"${_scopeId}>Bulunduğu Paketler</h3><div class="flex flex-wrap gap-2"${_scopeId}><!--[-->`);
                ssrRenderList(searchResult.value.language_packs, (pack) => {
                  _push2(`<span class="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10"${_scopeId}>${ssrInterpolate(pack.name)}</span>`);
                });
                _push2(`<!--]--></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (searchResult.value.example_sentences && searchResult.value.example_sentences.length > 0) {
                _push2(`<div class="mb-6"${_scopeId}><h3 class="mb-3 text-lg font-semibold"${_scopeId}>Örnek Cümleler</h3><div class="space-y-3"${_scopeId}><!--[-->`);
                ssrRenderList(searchResult.value.example_sentences, (sentence, index) => {
                  _push2(`<div class="bg-card rounded-lg border p-4"${_scopeId}><div class="mb-1 font-medium"${_scopeId}>${ssrInterpolate(sentence.sentence)}</div>`);
                  if (sentence.translation) {
                    _push2(`<div class="text-muted-foreground text-sm"${_scopeId}>${ssrInterpolate(sentence.translation)}</div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div>`);
                });
                _push2(`<!--]--></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (searchResult.value.synonyms && searchResult.value.synonyms.length > 0) {
                _push2(`<div${_scopeId}><h3 class="mb-3 text-lg font-semibold"${_scopeId}>Eş Anlamlılar</h3><div class="flex flex-wrap gap-2"${_scopeId}><!--[-->`);
                ssrRenderList(searchResult.value.synonyms, (synonym) => {
                  _push2(`<span class="inline-flex items-center rounded-md bg-orange-50 px-2 py-1 text-xs font-medium text-orange-700 ring-1 ring-inset ring-orange-700/10"${_scopeId}>${ssrInterpolate(synonym.synonym)}</span>`);
                });
                _push2(`<!--]--></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></div>`);
            } else if (hasSearched.value && !isSearching.value) {
              _push2(`<div class="mx-auto max-w-2xl text-center"${_scopeId}><div class="bg-card text-card-foreground rounded-lg border p-8 shadow-sm"${_scopeId}><div class="text-muted-foreground mb-4"${_scopeId}><svg class="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"${_scopeId}></path></svg></div><h3 class="mb-2 text-xl font-semibold"${_scopeId}>Kelime bulunamadı</h3><p class="text-muted-foreground"${_scopeId}> &quot;${ssrInterpolate(searchQuery.value)}&quot; kelimesi sözlüğümüzde bulunamadı. Farklı bir kelime deneyin. </p></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (isLoggedIn.value) {
              _push2(`<div class="mx-auto mt-8 max-w-2xl text-center"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("rendition.words.create"),
                class: "ring-offset-background focus-visible:ring-ring text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"${_scopeId2}></path></svg> Yeni Kelime Ekle `);
                  } else {
                    return [
                      (openBlock(), createBlock("svg", {
                        class: "mr-2 h-4 w-4",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
                        })
                      ])),
                      createTextVNode(" Yeni Kelime Ekle ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "container mx-auto max-w-4xl px-4 py-8" }, [
                createVNode("div", { class: "mb-12 text-center" }, [
                  createVNode("h1", { class: "mb-2 text-4xl font-bold tracking-tight" }, "Kelime Sözlüğü"),
                  createVNode("p", { class: "text-muted-foreground text-lg" }, "Kelime arayın, anlamlarını öğrenin")
                ]),
                createVNode("div", { class: "mx-auto mb-8 max-w-2xl" }, [
                  createVNode("div", { class: "relative" }, [
                    createVNode("div", { class: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3" }, [
                      (openBlock(), createBlock("svg", {
                        class: "text-muted-foreground h-5 w-5",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        })
                      ]))
                    ]),
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                      type: "text",
                      placeholder: "Kelime arayın...",
                      class: "border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-12 w-full rounded-md border px-3 py-2 pl-10 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                      onKeyup: withKeys(searchWord, ["enter"]),
                      onInput: onSearchInput
                    }, null, 40, ["onUpdate:modelValue"]), [
                      [vModelText, searchQuery.value]
                    ]),
                    createVNode("button", {
                      onClick: searchWord,
                      disabled: isSearching.value || !searchQuery.value.trim(),
                      class: "text-primary-foreground ring-offset-background hover:bg-primary/90 focus-visible:ring-ring absolute right-2 top-1/2 inline-flex h-8 -translate-y-1/2 items-center justify-center rounded-md bg-primary px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    }, [
                      isSearching.value ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "flex items-center"
                      }, [
                        (openBlock(), createBlock("svg", {
                          class: "-ml-1 mr-2 h-4 w-4 animate-spin",
                          fill: "none",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("circle", {
                            class: "opacity-25",
                            cx: "12",
                            cy: "12",
                            r: "10",
                            stroke: "currentColor",
                            "stroke-width": "4"
                          }),
                          createVNode("path", {
                            class: "opacity-75",
                            fill: "currentColor",
                            d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          })
                        ])),
                        createTextVNode(" Aranıyor... ")
                      ])) : (openBlock(), createBlock("span", { key: 1 }, "Ara"))
                    ], 8, ["disabled"])
                  ])
                ]),
                searchResult.value ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "mx-auto max-w-4xl"
                }, [
                  createVNode("div", { class: "bg-card text-card-foreground rounded-lg border shadow-sm" }, [
                    createVNode("div", { class: "p-6" }, [
                      createVNode("div", { class: "mb-6 flex items-start justify-between" }, [
                        createVNode("div", { class: "flex-1" }, [
                          createVNode("div", { class: "mb-2 flex items-center gap-3" }, [
                            createVNode("h2", { class: "text-3xl font-bold" }, toDisplayString(searchResult.value.word), 1),
                            createVNode("div", { class: "flex gap-2" }, [
                              createVNode("span", { class: "inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10" }, toDisplayString(getWordTypeLabel(searchResult.value.type)), 1),
                              createVNode("span", { class: "inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20" }, toDisplayString(getLanguageLabel(searchResult.value.language)), 1)
                            ])
                          ]),
                          createVNode("p", { class: "text-muted-foreground text-xl" }, toDisplayString(searchResult.value.meaning), 1)
                        ]),
                        isLoggedIn.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex gap-2"
                        }, [
                          createVNode(unref(Link), {
                            href: _ctx.route("rendition.words.edit", searchResult.value.id),
                            class: "ring-offset-background focus-visible:ring-ring border-input bg-background hover:text-accent-foreground inline-flex h-9 items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Düzenle ")
                            ]),
                            _: 1
                          }, 8, ["href"])
                        ])) : createCommentVNode("", true)
                      ]),
                      searchResult.value.meanings && searchResult.value.meanings.length > 1 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mb-6"
                      }, [
                        createVNode("h3", { class: "mb-3 text-lg font-semibold" }, "Anlamlar"),
                        createVNode("div", { class: "space-y-2" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(searchResult.value.meanings, (meaning, index) => {
                            return openBlock(), createBlock("div", {
                              key: index,
                              class: ["flex items-start gap-3 rounded-md border p-3", meaning.is_primary ? "border-blue-200 bg-blue-50" : "bg-muted/50"]
                            }, [
                              meaning.is_primary ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800"
                              }, " Ana ")) : createCommentVNode("", true),
                              createVNode("span", { class: "text-sm" }, toDisplayString(meaning.meaning), 1)
                            ], 2);
                          }), 128))
                        ])
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "mb-6 grid grid-cols-1 gap-4 md:grid-cols-3" }, [
                        createVNode("div", { class: "bg-card rounded-lg border p-4" }, [
                          createVNode("div", { class: "text-muted-foreground text-sm" }, "Öğrenme Durumu"),
                          createVNode("div", { class: "text-lg font-semibold" }, toDisplayString(getLearningStatusLabel(searchResult.value.learning_status)), 1)
                        ]),
                        createVNode("div", { class: "bg-card rounded-lg border p-4" }, [
                          createVNode("div", { class: "text-muted-foreground text-sm" }, "Tekrar Sayısı"),
                          createVNode("div", { class: "text-lg font-semibold" }, toDisplayString(searchResult.value.review_count || 0), 1)
                        ]),
                        createVNode("div", { class: "bg-card rounded-lg border p-4" }, [
                          createVNode("div", { class: "text-muted-foreground text-sm" }, "Yanlış Sayısı"),
                          createVNode("div", { class: "text-lg font-semibold" }, toDisplayString(searchResult.value.incorrect_count || 0), 1)
                        ])
                      ]),
                      searchResult.value.language_packs && searchResult.value.language_packs.length > 0 ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "mb-6"
                      }, [
                        createVNode("h3", { class: "mb-3 text-lg font-semibold" }, "Bulunduğu Paketler"),
                        createVNode("div", { class: "flex flex-wrap gap-2" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(searchResult.value.language_packs, (pack) => {
                            return openBlock(), createBlock("span", {
                              key: pack.id,
                              class: "inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10"
                            }, toDisplayString(pack.name), 1);
                          }), 128))
                        ])
                      ])) : createCommentVNode("", true),
                      searchResult.value.example_sentences && searchResult.value.example_sentences.length > 0 ? (openBlock(), createBlock("div", {
                        key: 2,
                        class: "mb-6"
                      }, [
                        createVNode("h3", { class: "mb-3 text-lg font-semibold" }, "Örnek Cümleler"),
                        createVNode("div", { class: "space-y-3" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(searchResult.value.example_sentences, (sentence, index) => {
                            return openBlock(), createBlock("div", {
                              key: index,
                              class: "bg-card rounded-lg border p-4"
                            }, [
                              createVNode("div", { class: "mb-1 font-medium" }, toDisplayString(sentence.sentence), 1),
                              sentence.translation ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "text-muted-foreground text-sm"
                              }, toDisplayString(sentence.translation), 1)) : createCommentVNode("", true)
                            ]);
                          }), 128))
                        ])
                      ])) : createCommentVNode("", true),
                      searchResult.value.synonyms && searchResult.value.synonyms.length > 0 ? (openBlock(), createBlock("div", { key: 3 }, [
                        createVNode("h3", { class: "mb-3 text-lg font-semibold" }, "Eş Anlamlılar"),
                        createVNode("div", { class: "flex flex-wrap gap-2" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(searchResult.value.synonyms, (synonym) => {
                            return openBlock(), createBlock("span", {
                              key: synonym.id,
                              class: "inline-flex items-center rounded-md bg-orange-50 px-2 py-1 text-xs font-medium text-orange-700 ring-1 ring-inset ring-orange-700/10"
                            }, toDisplayString(synonym.synonym), 1);
                          }), 128))
                        ])
                      ])) : createCommentVNode("", true)
                    ])
                  ])
                ])) : hasSearched.value && !isSearching.value ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "mx-auto max-w-2xl text-center"
                }, [
                  createVNode("div", { class: "bg-card text-card-foreground rounded-lg border p-8 shadow-sm" }, [
                    createVNode("div", { class: "text-muted-foreground mb-4" }, [
                      (openBlock(), createBlock("svg", {
                        class: "mx-auto h-16 w-16",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        })
                      ]))
                    ]),
                    createVNode("h3", { class: "mb-2 text-xl font-semibold" }, "Kelime bulunamadı"),
                    createVNode("p", { class: "text-muted-foreground" }, ' "' + toDisplayString(searchQuery.value) + '" kelimesi sözlüğümüzde bulunamadı. Farklı bir kelime deneyin. ', 1)
                  ])
                ])) : createCommentVNode("", true),
                isLoggedIn.value ? (openBlock(), createBlock("div", {
                  key: 2,
                  class: "mx-auto mt-8 max-w-2xl text-center"
                }, [
                  createVNode(unref(Link), {
                    href: _ctx.route("rendition.words.create"),
                    class: "ring-offset-background focus-visible:ring-ring text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock("svg", {
                        class: "mr-2 h-4 w-4",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
                        })
                      ])),
                      createTextVNode(" Yeni Kelime Ekle ")
                    ]),
                    _: 1
                  }, 8, ["href"])
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
