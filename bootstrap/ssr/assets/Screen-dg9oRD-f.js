import { ref, watch, computed, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, createCommentVNode, withDirectives, withKeys, vModelText, toDisplayString, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-DjaYf9so.js";
import _sfc_main$2 from "./ActivityHeatmap-yiwzKrSL.js";
import _sfc_main$3 from "./DuplicateModal-DMSbpHKn.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  props: {
    words: Array,
    languagePacks: Array,
    stats: Object,
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
    const showDuplicateModal = ref(false);
    const duplicateData = ref(null);
    const page = usePage();
    watch(
      () => {
        var _a;
        return (_a = page.props.flash) == null ? void 0 : _a.bulk_import_duplicates;
      },
      (newData) => {
        if (newData) {
          duplicateData.value = newData;
          showDuplicateModal.value = true;
        }
      },
      { immediate: true }
    );
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
          var _a, _b, _c, _d, _e, _f;
          if (_push2) {
            _push2(`<div class="p-6 pt-12 sm:p-8 sm:pt-16"${_scopeId}><div class="mb-8 flex items-center justify-between"${_scopeId}><div${_scopeId}><h1 class="text-2xl font-semibold text-foreground sm:text-3xl"${_scopeId}>Kelime Sözlüğü</h1></div>`);
            if (isLoggedIn.value) {
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("rendition.words.create"),
                class: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-2 h-4 w-4"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6"${_scopeId2}></path></svg> Yeni Kelime `);
                  } else {
                    return [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        "stroke-width": "1.5",
                        stroke: "currentColor",
                        class: "mr-2 h-4 w-4"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
                        })
                      ])),
                      createTextVNode(" Yeni Kelime ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (__props.stats) {
              _push2(`<div class="mb-8"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, { stats: __props.stats }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="mb-8"${_scopeId}><div class="flex gap-3"${_scopeId}><div class="flex-1"${_scopeId}><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Kelime arayın..." class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"${_scopeId}></div><button${ssrIncludeBooleanAttr(isSearching.value || !searchQuery.value.trim()) ? " disabled" : ""} class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90"${ssrRenderAttr("title", isSearching.value ? "Arama yapılıyor..." : "Kelime ara")}${_scopeId}>`);
            if (isSearching.value) {
              _push2(`<span class="flex items-center"${_scopeId}><svg class="mr-2 h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${_scopeId}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"${_scopeId}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"${_scopeId}></path></svg> Aranıyor... </span>`);
            } else {
              _push2(`<span class="flex items-center"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-1 h-4 w-4"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"${_scopeId}></path></svg> Kelime Ara </span>`);
            }
            _push2(`</button></div></div>`);
            if (searchResult.value) {
              _push2(`<div${_scopeId}><div class="rounded-lg border border-border bg-card p-6 shadow-sm"${_scopeId}><div class="mb-6 flex items-start justify-between"${_scopeId}><div class="flex-1"${_scopeId}><div class="mb-3 flex items-center gap-3"${_scopeId}><h2 class="text-2xl font-semibold text-foreground"${_scopeId}>${ssrInterpolate(searchResult.value.word)}</h2><div class="flex gap-2"${_scopeId}><span class="inline-flex items-center rounded-full border border-border bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground"${_scopeId}>${ssrInterpolate(getWordTypeLabel(searchResult.value.type))}</span><span class="inline-flex items-center rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-semibold text-foreground"${_scopeId}>${ssrInterpolate(getLanguageLabel(searchResult.value.language))}</span></div></div><p class="text-muted-foreground text-lg"${_scopeId}>${ssrInterpolate(searchResult.value.meaning)}</p></div>`);
              if (isLoggedIn.value) {
                _push2(`<div class="flex gap-2"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("rendition.words.edit", searchResult.value.id),
                  class: "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-3"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-2 h-4 w-4"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"${_scopeId2}></path></svg> Düzenle `);
                    } else {
                      return [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          "stroke-width": "1.5",
                          stroke: "currentColor",
                          class: "mr-2 h-4 w-4"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          })
                        ])),
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
                _push2(`<div class="mb-6"${_scopeId}><h3 class="mb-3 text-lg font-semibold text-foreground"${_scopeId}>Anlamlar</h3><div class="space-y-2"${_scopeId}><!--[-->`);
                ssrRenderList(searchResult.value.meanings, (meaning, index) => {
                  _push2(`<div class="${ssrRenderClass([meaning.is_primary ? "bg-primary text-primary-foreground" : "bg-muted", "flex items-start gap-3 rounded-lg p-3"])}"${_scopeId}>`);
                  if (meaning.is_primary) {
                    _push2(`<span class="${ssrRenderClass([meaning.is_primary ? "bg-primary-foreground text-primary" : "bg-transparent", "inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs font-semibold"])}"${_scopeId}> Ana </span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<span class="${ssrRenderClass([meaning.is_primary ? "text-primary-foreground" : "text-foreground", "text-sm"])}"${_scopeId}>${ssrInterpolate(meaning.meaning)}</span></div>`);
                });
                _push2(`<!--]--></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3"${_scopeId}><div class="rounded-lg border border-border bg-muted p-4"${_scopeId}><div class="text-muted-foreground text-sm"${_scopeId}>Öğrenme Durumu</div><div class="text-lg font-semibold text-foreground"${_scopeId}>${ssrInterpolate(getLearningStatusLabel(searchResult.value.learning_status))}</div></div><div class="rounded-lg border border-border bg-muted p-4"${_scopeId}><div class="text-muted-foreground text-sm"${_scopeId}>Tekrar Sayısı</div><div class="text-lg font-semibold text-foreground"${_scopeId}>${ssrInterpolate(searchResult.value.review_count || 0)}</div></div><div class="rounded-lg border border-border bg-muted p-4"${_scopeId}><div class="text-muted-foreground text-sm"${_scopeId}>Yanlış Sayısı</div><div class="text-lg font-semibold text-foreground"${_scopeId}>${ssrInterpolate(searchResult.value.incorrect_count || 0)}</div></div></div>`);
              if (searchResult.value.language_packs && searchResult.value.language_packs.length > 0) {
                _push2(`<div class="mb-6"${_scopeId}><h3 class="mb-3 text-lg font-semibold text-foreground"${_scopeId}>Bulunduğu Paketler</h3><div class="flex flex-wrap gap-2"${_scopeId}><!--[-->`);
                ssrRenderList(searchResult.value.language_packs, (pack) => {
                  _push2(`<span class="inline-flex items-center rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-semibold text-foreground"${_scopeId}>${ssrInterpolate(pack.name)}</span>`);
                });
                _push2(`<!--]--></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (searchResult.value.example_sentences && searchResult.value.example_sentences.length > 0) {
                _push2(`<div class="mb-6"${_scopeId}><h3 class="mb-3 text-lg font-semibold text-foreground"${_scopeId}>Örnek Cümleler</h3><div class="space-y-3"${_scopeId}><!--[-->`);
                ssrRenderList(searchResult.value.example_sentences, (sentence, index) => {
                  _push2(`<div class="rounded-lg border border-border bg-muted p-4"${_scopeId}><div class="mb-1 font-medium text-foreground"${_scopeId}>${ssrInterpolate(sentence.sentence)}</div>`);
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
                _push2(`<div${_scopeId}><h3 class="mb-3 text-lg font-semibold text-foreground"${_scopeId}>Eş Anlamlılar</h3><div class="flex flex-wrap gap-2"${_scopeId}><!--[-->`);
                ssrRenderList(searchResult.value.synonyms, (synonym) => {
                  _push2(`<span class="inline-flex items-center rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-semibold text-foreground"${_scopeId}>${ssrInterpolate(synonym.synonym)}</span>`);
                });
                _push2(`<!--]--></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            } else if (hasSearched.value && !isSearching.value) {
              _push2(`<div class="py-12 text-center"${_scopeId}><div class="text-muted-foreground/40 mb-4"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mx-auto h-12 w-12"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"${_scopeId}></path></svg></div><h3 class="mb-2 text-lg font-semibold text-foreground"${_scopeId}>Kelime bulunamadı</h3><p class="text-muted-foreground text-sm"${_scopeId}> &quot;${ssrInterpolate(searchQuery.value)}&quot; kelimesi sözlüğümüzde bulunamadı. Farklı bir kelime deneyin. </p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              show: showDuplicateModal.value,
              duplicates: ((_a = duplicateData.value) == null ? void 0 : _a.duplicates) || [],
              "pack-ids": ((_b = duplicateData.value) == null ? void 0 : _b.pack_ids) || [],
              "pack-names": ((_c = duplicateData.value) == null ? void 0 : _c.pack_names) || [],
              onClose: ($event) => showDuplicateModal.value = false
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "p-6 pt-12 sm:p-8 sm:pt-16" }, [
                createVNode("div", { class: "mb-8 flex items-center justify-between" }, [
                  createVNode("div", null, [
                    createVNode("h1", { class: "text-2xl font-semibold text-foreground sm:text-3xl" }, "Kelime Sözlüğü")
                  ]),
                  isLoggedIn.value ? (openBlock(), createBlock(unref(Link), {
                    key: 0,
                    href: _ctx.route("rendition.words.create"),
                    class: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90"
                  }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        "stroke-width": "1.5",
                        stroke: "currentColor",
                        class: "mr-2 h-4 w-4"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
                        })
                      ])),
                      createTextVNode(" Yeni Kelime ")
                    ]),
                    _: 1
                  }, 8, ["href"])) : createCommentVNode("", true)
                ]),
                __props.stats ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "mb-8"
                }, [
                  createVNode(_sfc_main$2, { stats: __props.stats }, null, 8, ["stats"])
                ])) : createCommentVNode("", true),
                createVNode("div", { class: "mb-8" }, [
                  createVNode("div", { class: "flex gap-3" }, [
                    createVNode("div", { class: "flex-1" }, [
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                        type: "text",
                        placeholder: "Kelime arayın...",
                        class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                        onKeyup: withKeys(searchWord, ["enter"]),
                        onInput: onSearchInput
                      }, null, 40, ["onUpdate:modelValue"]), [
                        [vModelText, searchQuery.value]
                      ])
                    ]),
                    createVNode("button", {
                      onClick: searchWord,
                      disabled: isSearching.value || !searchQuery.value.trim(),
                      class: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90",
                      title: isSearching.value ? "Arama yapılıyor..." : "Kelime ara"
                    }, [
                      isSearching.value ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "flex items-center"
                      }, [
                        (openBlock(), createBlock("svg", {
                          class: "mr-2 h-4 w-4 animate-spin",
                          xmlns: "http://www.w3.org/2000/svg",
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
                      ])) : (openBlock(), createBlock("span", {
                        key: 1,
                        class: "flex items-center"
                      }, [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          "stroke-width": "1.5",
                          stroke: "currentColor",
                          class: "mr-1 h-4 w-4"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                          })
                        ])),
                        createTextVNode(" Kelime Ara ")
                      ]))
                    ], 8, ["disabled", "title"])
                  ])
                ]),
                searchResult.value ? (openBlock(), createBlock("div", { key: 1 }, [
                  createVNode("div", { class: "rounded-lg border border-border bg-card p-6 shadow-sm" }, [
                    createVNode("div", { class: "mb-6 flex items-start justify-between" }, [
                      createVNode("div", { class: "flex-1" }, [
                        createVNode("div", { class: "mb-3 flex items-center gap-3" }, [
                          createVNode("h2", { class: "text-2xl font-semibold text-foreground" }, toDisplayString(searchResult.value.word), 1),
                          createVNode("div", { class: "flex gap-2" }, [
                            createVNode("span", { class: "inline-flex items-center rounded-full border border-border bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground" }, toDisplayString(getWordTypeLabel(searchResult.value.type)), 1),
                            createVNode("span", { class: "inline-flex items-center rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-semibold text-foreground" }, toDisplayString(getLanguageLabel(searchResult.value.language)), 1)
                          ])
                        ]),
                        createVNode("p", { class: "text-muted-foreground text-lg" }, toDisplayString(searchResult.value.meaning), 1)
                      ]),
                      isLoggedIn.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex gap-2"
                      }, [
                        createVNode(unref(Link), {
                          href: _ctx.route("rendition.words.edit", searchResult.value.id),
                          class: "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-3"
                        }, {
                          default: withCtx(() => [
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              "stroke-width": "1.5",
                              stroke: "currentColor",
                              class: "mr-2 h-4 w-4"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                              })
                            ])),
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
                      createVNode("h3", { class: "mb-3 text-lg font-semibold text-foreground" }, "Anlamlar"),
                      createVNode("div", { class: "space-y-2" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(searchResult.value.meanings, (meaning, index) => {
                          return openBlock(), createBlock("div", {
                            key: index,
                            class: ["flex items-start gap-3 rounded-lg p-3", meaning.is_primary ? "bg-primary text-primary-foreground" : "bg-muted"]
                          }, [
                            meaning.is_primary ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: ["inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs font-semibold", meaning.is_primary ? "bg-primary-foreground text-primary" : "bg-transparent"]
                            }, " Ana ", 2)) : createCommentVNode("", true),
                            createVNode("span", {
                              class: ["text-sm", meaning.is_primary ? "text-primary-foreground" : "text-foreground"]
                            }, toDisplayString(meaning.meaning), 3)
                          ], 2);
                        }), 128))
                      ])
                    ])) : createCommentVNode("", true),
                    createVNode("div", { class: "mb-6 grid grid-cols-1 gap-4 md:grid-cols-3" }, [
                      createVNode("div", { class: "rounded-lg border border-border bg-muted p-4" }, [
                        createVNode("div", { class: "text-muted-foreground text-sm" }, "Öğrenme Durumu"),
                        createVNode("div", { class: "text-lg font-semibold text-foreground" }, toDisplayString(getLearningStatusLabel(searchResult.value.learning_status)), 1)
                      ]),
                      createVNode("div", { class: "rounded-lg border border-border bg-muted p-4" }, [
                        createVNode("div", { class: "text-muted-foreground text-sm" }, "Tekrar Sayısı"),
                        createVNode("div", { class: "text-lg font-semibold text-foreground" }, toDisplayString(searchResult.value.review_count || 0), 1)
                      ]),
                      createVNode("div", { class: "rounded-lg border border-border bg-muted p-4" }, [
                        createVNode("div", { class: "text-muted-foreground text-sm" }, "Yanlış Sayısı"),
                        createVNode("div", { class: "text-lg font-semibold text-foreground" }, toDisplayString(searchResult.value.incorrect_count || 0), 1)
                      ])
                    ]),
                    searchResult.value.language_packs && searchResult.value.language_packs.length > 0 ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "mb-6"
                    }, [
                      createVNode("h3", { class: "mb-3 text-lg font-semibold text-foreground" }, "Bulunduğu Paketler"),
                      createVNode("div", { class: "flex flex-wrap gap-2" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(searchResult.value.language_packs, (pack) => {
                          return openBlock(), createBlock("span", {
                            key: pack.id,
                            class: "inline-flex items-center rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-semibold text-foreground"
                          }, toDisplayString(pack.name), 1);
                        }), 128))
                      ])
                    ])) : createCommentVNode("", true),
                    searchResult.value.example_sentences && searchResult.value.example_sentences.length > 0 ? (openBlock(), createBlock("div", {
                      key: 2,
                      class: "mb-6"
                    }, [
                      createVNode("h3", { class: "mb-3 text-lg font-semibold text-foreground" }, "Örnek Cümleler"),
                      createVNode("div", { class: "space-y-3" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(searchResult.value.example_sentences, (sentence, index) => {
                          return openBlock(), createBlock("div", {
                            key: index,
                            class: "rounded-lg border border-border bg-muted p-4"
                          }, [
                            createVNode("div", { class: "mb-1 font-medium text-foreground" }, toDisplayString(sentence.sentence), 1),
                            sentence.translation ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "text-muted-foreground text-sm"
                            }, toDisplayString(sentence.translation), 1)) : createCommentVNode("", true)
                          ]);
                        }), 128))
                      ])
                    ])) : createCommentVNode("", true),
                    searchResult.value.synonyms && searchResult.value.synonyms.length > 0 ? (openBlock(), createBlock("div", { key: 3 }, [
                      createVNode("h3", { class: "mb-3 text-lg font-semibold text-foreground" }, "Eş Anlamlılar"),
                      createVNode("div", { class: "flex flex-wrap gap-2" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(searchResult.value.synonyms, (synonym) => {
                          return openBlock(), createBlock("span", {
                            key: synonym.id,
                            class: "inline-flex items-center rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-semibold text-foreground"
                          }, toDisplayString(synonym.synonym), 1);
                        }), 128))
                      ])
                    ])) : createCommentVNode("", true)
                  ])
                ])) : hasSearched.value && !isSearching.value ? (openBlock(), createBlock("div", {
                  key: 2,
                  class: "py-12 text-center"
                }, [
                  createVNode("div", { class: "text-muted-foreground/40 mb-4" }, [
                    (openBlock(), createBlock("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      "stroke-width": "1.5",
                      stroke: "currentColor",
                      class: "mx-auto h-12 w-12"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        d: "M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      })
                    ]))
                  ]),
                  createVNode("h3", { class: "mb-2 text-lg font-semibold text-foreground" }, "Kelime bulunamadı"),
                  createVNode("p", { class: "text-muted-foreground text-sm" }, ' "' + toDisplayString(searchQuery.value) + '" kelimesi sözlüğümüzde bulunamadı. Farklı bir kelime deneyin. ', 1)
                ])) : createCommentVNode("", true)
              ]),
              createVNode(_sfc_main$3, {
                show: showDuplicateModal.value,
                duplicates: ((_d = duplicateData.value) == null ? void 0 : _d.duplicates) || [],
                "pack-ids": ((_e = duplicateData.value) == null ? void 0 : _e.pack_ids) || [],
                "pack-names": ((_f = duplicateData.value) == null ? void 0 : _f.pack_names) || [],
                onClose: ($event) => showDuplicateModal.value = false
              }, null, 8, ["show", "duplicates", "pack-ids", "pack-names", "onClose"])
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
