import { ref, computed, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, createCommentVNode, withDirectives, withKeys, vModelText, toDisplayString, Fragment, renderList, useSSRContext } from "vue";
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
            _push2(`<div class="p-6 pt-12 sm:p-8 sm:pt-16"${_scopeId}><div class="mb-8"${_scopeId}><h1 class="text-2xl font-semibold text-base-content sm:text-3xl"${_scopeId}>Kelime Sözlüğü</h1><p class="text-base-content/60 mt-2 text-sm"${_scopeId}>Kelime arayın, anlamlarını öğrenin</p></div><div class="mb-8"${_scopeId}><div class="relative"${_scopeId}><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Kelime arayın..." class="input-bordered input w-full pl-10"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-base-content/50 absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"${_scopeId}></path></svg><button${ssrIncludeBooleanAttr(isSearching.value || !searchQuery.value.trim()) ? " disabled" : ""} class="btn btn-primary absolute right-2 top-1/2 -translate-y-1/2"${_scopeId}>`);
            if (isSearching.value) {
              _push2(`<span class="flex items-center"${_scopeId}><div class="loading loading-spinner loading-xs mr-2"${_scopeId}></div> Aranıyor... </span>`);
            } else {
              _push2(`<span${_scopeId}>Ara</span>`);
            }
            _push2(`</button></div></div>`);
            if (searchResult.value) {
              _push2(`<div${_scopeId}><div class="rounded-lg bg-base-100 p-6"${_scopeId}><div class="mb-6 flex items-start justify-between"${_scopeId}><div class="flex-1"${_scopeId}><div class="mb-3 flex items-center gap-3"${_scopeId}><h2 class="text-2xl font-semibold text-base-content"${_scopeId}>${ssrInterpolate(searchResult.value.word)}</h2><div class="flex gap-2"${_scopeId}><span class="badge badge-outline badge-sm"${_scopeId}>${ssrInterpolate(getWordTypeLabel(searchResult.value.type))}</span><span class="badge badge-outline badge-sm"${_scopeId}>${ssrInterpolate(getLanguageLabel(searchResult.value.language))}</span></div></div><p class="text-base-content/70 text-lg"${_scopeId}>${ssrInterpolate(searchResult.value.meaning)}</p></div>`);
              if (isLoggedIn.value) {
                _push2(`<div class="flex gap-2"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("rendition.words.edit", searchResult.value.id),
                  class: "btn btn-ghost btn-sm"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"${_scopeId2}></path></svg> Düzenle `);
                    } else {
                      return [
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
                _push2(`<div class="mb-6"${_scopeId}><h3 class="mb-3 text-lg font-semibold text-base-content"${_scopeId}>Anlamlar</h3><div class="space-y-2"${_scopeId}><!--[-->`);
                ssrRenderList(searchResult.value.meanings, (meaning, index) => {
                  _push2(`<div class="${ssrRenderClass([meaning.is_primary ? "bg-primary/10 border-primary/20 border" : "bg-base-200/50", "flex items-start gap-3 rounded-lg p-3"])}"${_scopeId}>`);
                  if (meaning.is_primary) {
                    _push2(`<span class="badge badge-primary badge-sm"${_scopeId}> Ana </span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<span class="text-sm text-base-content"${_scopeId}>${ssrInterpolate(meaning.meaning)}</span></div>`);
                });
                _push2(`<!--]--></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3"${_scopeId}><div class="bg-base-200/50 rounded-lg p-4"${_scopeId}><div class="text-base-content/60 text-sm"${_scopeId}>Öğrenme Durumu</div><div class="text-lg font-semibold text-base-content"${_scopeId}>${ssrInterpolate(getLearningStatusLabel(searchResult.value.learning_status))}</div></div><div class="bg-base-200/50 rounded-lg p-4"${_scopeId}><div class="text-base-content/60 text-sm"${_scopeId}>Tekrar Sayısı</div><div class="text-lg font-semibold text-base-content"${_scopeId}>${ssrInterpolate(searchResult.value.review_count || 0)}</div></div><div class="bg-base-200/50 rounded-lg p-4"${_scopeId}><div class="text-base-content/60 text-sm"${_scopeId}>Yanlış Sayısı</div><div class="text-lg font-semibold text-base-content"${_scopeId}>${ssrInterpolate(searchResult.value.incorrect_count || 0)}</div></div></div>`);
              if (searchResult.value.language_packs && searchResult.value.language_packs.length > 0) {
                _push2(`<div class="mb-6"${_scopeId}><h3 class="mb-3 text-lg font-semibold text-base-content"${_scopeId}>Bulunduğu Paketler</h3><div class="flex flex-wrap gap-2"${_scopeId}><!--[-->`);
                ssrRenderList(searchResult.value.language_packs, (pack) => {
                  _push2(`<span class="badge badge-outline badge-sm"${_scopeId}>${ssrInterpolate(pack.name)}</span>`);
                });
                _push2(`<!--]--></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (searchResult.value.example_sentences && searchResult.value.example_sentences.length > 0) {
                _push2(`<div class="mb-6"${_scopeId}><h3 class="mb-3 text-lg font-semibold text-base-content"${_scopeId}>Örnek Cümleler</h3><div class="space-y-3"${_scopeId}><!--[-->`);
                ssrRenderList(searchResult.value.example_sentences, (sentence, index) => {
                  _push2(`<div class="bg-base-200/50 rounded-lg p-4"${_scopeId}><div class="mb-1 font-medium text-base-content"${_scopeId}>${ssrInterpolate(sentence.sentence)}</div>`);
                  if (sentence.translation) {
                    _push2(`<div class="text-base-content/60 text-sm"${_scopeId}>${ssrInterpolate(sentence.translation)}</div>`);
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
                _push2(`<div${_scopeId}><h3 class="mb-3 text-lg font-semibold text-base-content"${_scopeId}>Eş Anlamlılar</h3><div class="flex flex-wrap gap-2"${_scopeId}><!--[-->`);
                ssrRenderList(searchResult.value.synonyms, (synonym) => {
                  _push2(`<span class="badge badge-outline badge-sm"${_scopeId}>${ssrInterpolate(synonym.synonym)}</span>`);
                });
                _push2(`<!--]--></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            } else if (hasSearched.value && !isSearching.value) {
              _push2(`<div class="py-12 text-center"${_scopeId}><div class="text-base-content/40 mb-4"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mx-auto h-12 w-12"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"${_scopeId}></path></svg></div><h3 class="mb-2 text-lg font-semibold text-base-content"${_scopeId}>Kelime bulunamadı</h3><p class="text-base-content/60 text-sm"${_scopeId}> &quot;${ssrInterpolate(searchQuery.value)}&quot; kelimesi sözlüğümüzde bulunamadı. Farklı bir kelime deneyin. </p></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (isLoggedIn.value) {
              _push2(`<div class="mt-8 text-center"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("rendition.words.create"),
                class: "btn btn-primary"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6"${_scopeId2}></path></svg> Yeni Kelime Ekle `);
                  } else {
                    return [
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
              createVNode("div", { class: "p-6 pt-12 sm:p-8 sm:pt-16" }, [
                createVNode("div", { class: "mb-8" }, [
                  createVNode("h1", { class: "text-2xl font-semibold text-base-content sm:text-3xl" }, "Kelime Sözlüğü"),
                  createVNode("p", { class: "text-base-content/60 mt-2 text-sm" }, "Kelime arayın, anlamlarını öğrenin")
                ]),
                createVNode("div", { class: "mb-8" }, [
                  createVNode("div", { class: "relative" }, [
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                      type: "text",
                      placeholder: "Kelime arayın...",
                      class: "input-bordered input w-full pl-10",
                      onKeyup: withKeys(searchWord, ["enter"]),
                      onInput: onSearchInput
                    }, null, 40, ["onUpdate:modelValue"]), [
                      [vModelText, searchQuery.value]
                    ]),
                    (openBlock(), createBlock("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      "stroke-width": "1.5",
                      stroke: "currentColor",
                      class: "text-base-content/50 absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        d: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      })
                    ])),
                    createVNode("button", {
                      onClick: searchWord,
                      disabled: isSearching.value || !searchQuery.value.trim(),
                      class: "btn btn-primary absolute right-2 top-1/2 -translate-y-1/2"
                    }, [
                      isSearching.value ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "flex items-center"
                      }, [
                        createVNode("div", { class: "loading loading-spinner loading-xs mr-2" }),
                        createTextVNode(" Aranıyor... ")
                      ])) : (openBlock(), createBlock("span", { key: 1 }, "Ara"))
                    ], 8, ["disabled"])
                  ])
                ]),
                searchResult.value ? (openBlock(), createBlock("div", { key: 0 }, [
                  createVNode("div", { class: "rounded-lg bg-base-100 p-6" }, [
                    createVNode("div", { class: "mb-6 flex items-start justify-between" }, [
                      createVNode("div", { class: "flex-1" }, [
                        createVNode("div", { class: "mb-3 flex items-center gap-3" }, [
                          createVNode("h2", { class: "text-2xl font-semibold text-base-content" }, toDisplayString(searchResult.value.word), 1),
                          createVNode("div", { class: "flex gap-2" }, [
                            createVNode("span", { class: "badge badge-outline badge-sm" }, toDisplayString(getWordTypeLabel(searchResult.value.type)), 1),
                            createVNode("span", { class: "badge badge-outline badge-sm" }, toDisplayString(getLanguageLabel(searchResult.value.language)), 1)
                          ])
                        ]),
                        createVNode("p", { class: "text-base-content/70 text-lg" }, toDisplayString(searchResult.value.meaning), 1)
                      ]),
                      isLoggedIn.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex gap-2"
                      }, [
                        createVNode(unref(Link), {
                          href: _ctx.route("rendition.words.edit", searchResult.value.id),
                          class: "btn btn-ghost btn-sm"
                        }, {
                          default: withCtx(() => [
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
                      createVNode("h3", { class: "mb-3 text-lg font-semibold text-base-content" }, "Anlamlar"),
                      createVNode("div", { class: "space-y-2" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(searchResult.value.meanings, (meaning, index) => {
                          return openBlock(), createBlock("div", {
                            key: index,
                            class: ["flex items-start gap-3 rounded-lg p-3", meaning.is_primary ? "bg-primary/10 border-primary/20 border" : "bg-base-200/50"]
                          }, [
                            meaning.is_primary ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "badge badge-primary badge-sm"
                            }, " Ana ")) : createCommentVNode("", true),
                            createVNode("span", { class: "text-sm text-base-content" }, toDisplayString(meaning.meaning), 1)
                          ], 2);
                        }), 128))
                      ])
                    ])) : createCommentVNode("", true),
                    createVNode("div", { class: "mb-6 grid grid-cols-1 gap-4 md:grid-cols-3" }, [
                      createVNode("div", { class: "bg-base-200/50 rounded-lg p-4" }, [
                        createVNode("div", { class: "text-base-content/60 text-sm" }, "Öğrenme Durumu"),
                        createVNode("div", { class: "text-lg font-semibold text-base-content" }, toDisplayString(getLearningStatusLabel(searchResult.value.learning_status)), 1)
                      ]),
                      createVNode("div", { class: "bg-base-200/50 rounded-lg p-4" }, [
                        createVNode("div", { class: "text-base-content/60 text-sm" }, "Tekrar Sayısı"),
                        createVNode("div", { class: "text-lg font-semibold text-base-content" }, toDisplayString(searchResult.value.review_count || 0), 1)
                      ]),
                      createVNode("div", { class: "bg-base-200/50 rounded-lg p-4" }, [
                        createVNode("div", { class: "text-base-content/60 text-sm" }, "Yanlış Sayısı"),
                        createVNode("div", { class: "text-lg font-semibold text-base-content" }, toDisplayString(searchResult.value.incorrect_count || 0), 1)
                      ])
                    ]),
                    searchResult.value.language_packs && searchResult.value.language_packs.length > 0 ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "mb-6"
                    }, [
                      createVNode("h3", { class: "mb-3 text-lg font-semibold text-base-content" }, "Bulunduğu Paketler"),
                      createVNode("div", { class: "flex flex-wrap gap-2" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(searchResult.value.language_packs, (pack) => {
                          return openBlock(), createBlock("span", {
                            key: pack.id,
                            class: "badge badge-outline badge-sm"
                          }, toDisplayString(pack.name), 1);
                        }), 128))
                      ])
                    ])) : createCommentVNode("", true),
                    searchResult.value.example_sentences && searchResult.value.example_sentences.length > 0 ? (openBlock(), createBlock("div", {
                      key: 2,
                      class: "mb-6"
                    }, [
                      createVNode("h3", { class: "mb-3 text-lg font-semibold text-base-content" }, "Örnek Cümleler"),
                      createVNode("div", { class: "space-y-3" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(searchResult.value.example_sentences, (sentence, index) => {
                          return openBlock(), createBlock("div", {
                            key: index,
                            class: "bg-base-200/50 rounded-lg p-4"
                          }, [
                            createVNode("div", { class: "mb-1 font-medium text-base-content" }, toDisplayString(sentence.sentence), 1),
                            sentence.translation ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "text-base-content/60 text-sm"
                            }, toDisplayString(sentence.translation), 1)) : createCommentVNode("", true)
                          ]);
                        }), 128))
                      ])
                    ])) : createCommentVNode("", true),
                    searchResult.value.synonyms && searchResult.value.synonyms.length > 0 ? (openBlock(), createBlock("div", { key: 3 }, [
                      createVNode("h3", { class: "mb-3 text-lg font-semibold text-base-content" }, "Eş Anlamlılar"),
                      createVNode("div", { class: "flex flex-wrap gap-2" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(searchResult.value.synonyms, (synonym) => {
                          return openBlock(), createBlock("span", {
                            key: synonym.id,
                            class: "badge badge-outline badge-sm"
                          }, toDisplayString(synonym.synonym), 1);
                        }), 128))
                      ])
                    ])) : createCommentVNode("", true)
                  ])
                ])) : hasSearched.value && !isSearching.value ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "py-12 text-center"
                }, [
                  createVNode("div", { class: "text-base-content/40 mb-4" }, [
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
                  createVNode("h3", { class: "mb-2 text-lg font-semibold text-base-content" }, "Kelime bulunamadı"),
                  createVNode("p", { class: "text-base-content/60 text-sm" }, ' "' + toDisplayString(searchQuery.value) + '" kelimesi sözlüğümüzde bulunamadı. Farklı bir kelime deneyin. ', 1)
                ])) : createCommentVNode("", true),
                isLoggedIn.value ? (openBlock(), createBlock("div", {
                  key: 2,
                  class: "mt-8 text-center"
                }, [
                  createVNode(unref(Link), {
                    href: _ctx.route("rendition.words.create"),
                    class: "btn btn-primary"
                  }, {
                    default: withCtx(() => [
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
