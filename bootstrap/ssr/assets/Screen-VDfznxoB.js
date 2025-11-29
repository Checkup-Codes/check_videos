import { computed, ref, withCtx, createVNode, createBlock, createCommentVNode, toDisplayString, createTextVNode, openBlock, Fragment, renderList, withModifiers, withDirectives, vModelText, vModelCheckbox, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain } from "vue/server-renderer";
import { usePage, router } from "@inertiajs/vue3";
import axios from "axios";
import { _ as _sfc_main$1 } from "./CheckScreen-juRHZR4N.js";
import { _ as _sfc_main$2 } from "./TopScreen-DnNmtdW-.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  props: {
    languagePack: Object,
    screen: Object
  },
  setup(__props) {
    const props = __props;
    const auth = computed(() => usePage().props.auth);
    const isLoggedIn = computed(() => auth.value && auth.value.user);
    const showAddWordsModal = ref(false);
    const selectedWords = ref([]);
    const processing = ref(false);
    const loading = ref(false);
    const availableWords = ref([]);
    const searchQuery = ref("");
    const getLanguageName = (code) => {
      const languages = {
        tr: "Türkçe",
        en: "İngilizce",
        de: "Almanca",
        fr: "Fransızca",
        es: "İspanyolca",
        it: "İtalyanca",
        ru: "Rusça",
        ar: "Arapça"
      };
      return languages[code] || code;
    };
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
    const fetchAvailableWords = async () => {
      loading.value = true;
      showAddWordsModal.value = true;
      selectedWords.value = [];
      try {
        const response = await axios.get(route("rendition.words.available-for-pack", props.languagePack.id));
        availableWords.value = response.data;
      } catch (error) {
        console.error("Kelimeler yüklenirken hata oluştu:", error);
      } finally {
        loading.value = false;
      }
    };
    const filteredAvailableWords = computed(() => {
      if (!searchQuery.value.trim()) return availableWords.value;
      return availableWords.value.filter(
        (word) => word.word.toLowerCase().includes(searchQuery.value.toLowerCase()) || word.meaning.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });
    const addWords = () => {
      if (selectedWords.value.length === 0) return;
      processing.value = true;
      router.post(
        route("rendition.language-packs.add-words", props.languagePack.id),
        {
          word_ids: selectedWords.value
        },
        {
          onSuccess: () => {
            processing.value = false;
            showAddWordsModal.value = false;
            selectedWords.value = [];
          },
          onError: () => {
            processing.value = false;
          }
        }
      );
    };
    const removeWord = (word) => {
      if (confirm(`"${word.word}" kelimesini bu paketten kaldırmak istediğinize emin misiniz?`)) {
        router.delete(route("rendition.language-packs.remove-word", [props.languagePack.id, word.id]));
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, {
              title: `${__props.languagePack.name} - Kelimeler`
            }, null, _parent2, _scopeId));
            _push2(`<div class="p-4"${_scopeId}><div class="mb-4 flex justify-between"${_scopeId}><div${_scopeId}><h2 class="text-xl font-bold text-foreground"${_scopeId}>${ssrInterpolate(__props.languagePack.name)}</h2><p class="text-muted-foreground text-sm"${_scopeId}>${ssrInterpolate(__props.languagePack.description)}</p><p class="text-muted-foreground mt-1 text-sm"${_scopeId}><span class="font-medium"${_scopeId}>Dil:</span> ${ssrInterpolate(getLanguageName(__props.languagePack.language))}</p></div><div class="flex space-x-2"${_scopeId}>`);
            if (isLoggedIn.value) {
              _push2(`<button class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90"${_scopeId}> Kelime Ekle </button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<a${ssrRenderAttr("href", _ctx.route("rendition.language-packs.export", __props.languagePack.id))} class="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"${_scopeId}> Dışa Aktar </a><a${ssrRenderAttr("href", _ctx.route("rendition.language-packs.index"))} class="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"${_scopeId}> Geri Dön </a></div></div><div class="overflow-x-auto rounded-lg border border-border"${_scopeId}><table class="w-full caption-bottom text-sm"${_scopeId}><thead${_scopeId}><tr class="border-b border-border"${_scopeId}><th class="h-10 px-4 text-left align-middle font-medium text-muted-foreground"${_scopeId}>Kelime</th><th class="h-10 px-4 text-left align-middle font-medium text-muted-foreground"${_scopeId}>Anlam</th><th class="h-10 px-4 text-left align-middle font-medium text-muted-foreground"${_scopeId}>Tür</th><th class="h-10 px-4 text-left align-middle font-medium text-muted-foreground"${_scopeId}>Zorluk</th><th class="h-10 px-4 text-left align-middle font-medium text-muted-foreground"${_scopeId}>İşlemler</th></tr></thead><tbody${_scopeId}>`);
            if (!__props.languagePack.words || __props.languagePack.words.length === 0) {
              _push2(`<tr${_scopeId}><td colspan="5" class="text-muted-foreground py-6 text-center"${_scopeId}> Bu dil paketinde henüz kelime bulunmamaktadır. Kelime ekleyin. </td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(__props.languagePack.words, (word) => {
              _push2(`<tr class="border-b border-border transition-colors hover:bg-muted/50"${_scopeId}><td class="px-4 py-3 font-medium text-foreground"${_scopeId}>${ssrInterpolate(word.word)}</td><td class="px-4 py-3 text-muted-foreground"${_scopeId}>${ssrInterpolate(word.meaning)}</td><td class="px-4 py-3 capitalize text-muted-foreground"${_scopeId}>${ssrInterpolate(word.type)}</td><td class="px-4 py-3 text-muted-foreground"${_scopeId}>${ssrInterpolate(difficultyText(word.difficulty_level))}</td><td class="px-4 py-3"${_scopeId}>`);
              if (isLoggedIn.value) {
                _push2(`<button class="inline-flex items-center justify-center rounded-md border border-destructive/50 bg-destructive/10 px-2 py-1 text-xs font-medium text-destructive transition-colors hover:bg-destructive/20"${_scopeId}> Kaldır </button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div></div>`);
            if (showAddWordsModal.value) {
              _push2(`<div class="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"${_scopeId}><div class="fixed left-[50%] top-[50%] z-50 flex max-h-[90vh] w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] flex-col gap-4 border border-border bg-background shadow-lg sm:rounded-lg"${_scopeId}><div class="flex flex-shrink-0 items-center justify-between border-b border-border p-6 pb-4"${_scopeId}><h3 class="text-lg font-semibold text-foreground"${_scopeId}>Kelime Ekle</h3><button class="inline-flex h-7 w-7 items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"${_scopeId}><svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg></button></div><div class="px-6"${_scopeId}><label class="text-sm font-medium text-foreground"${_scopeId}>Kelime Ara</label><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Kelime veya anlam ara..." class="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"${_scopeId}></div><div class="flex-1 overflow-y-auto px-6"${_scopeId}><label class="text-sm font-medium text-foreground"${_scopeId}>Kelimeler</label>`);
              if (loading.value) {
                _push2(`<div class="flex justify-center py-4"${_scopeId}><svg class="h-6 w-6 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${_scopeId}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"${_scopeId}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"${_scopeId}></path></svg></div>`);
              } else if (availableWords.value.length === 0) {
                _push2(`<div class="text-muted-foreground py-4 text-center"${_scopeId}> Eklenebilecek kelime bulunamadı. Önce yeni kelimeler ekleyin. </div>`);
              } else {
                _push2(`<div class="mt-2 max-h-60 overflow-y-auto rounded-lg border border-border p-2"${_scopeId}><!--[-->`);
                ssrRenderList(filteredAvailableWords.value, (word) => {
                  _push2(`<div class="flex items-center rounded px-2 py-1 transition-colors hover:bg-muted"${_scopeId}><input${ssrRenderAttr("id", `word-${word.id}`)}${ssrIncludeBooleanAttr(Array.isArray(selectedWords.value) ? ssrLooseContain(selectedWords.value, word.id) : selectedWords.value) ? " checked" : ""}${ssrRenderAttr("value", word.id)} type="checkbox" class="h-4 w-4 rounded border border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"${_scopeId}><label${ssrRenderAttr("for", `word-${word.id}`)} class="ml-2 block cursor-pointer text-sm text-foreground"${_scopeId}>${ssrInterpolate(word.word)} - ${ssrInterpolate(word.meaning)} (${ssrInterpolate(getLanguageName(word.language))}) </label></div>`);
                });
                _push2(`<!--]--></div>`);
              }
              _push2(`</div><div class="flex flex-shrink-0 flex-col-reverse border-t border-border p-6 pt-4 sm:flex-row sm:justify-end sm:space-x-2"${_scopeId}><button class="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"${_scopeId}> İptal </button><button class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90"${ssrIncludeBooleanAttr(selectedWords.value.length === 0 || processing.value) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(processing.value ? "Ekleniyor..." : "Ekle")}</button></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(_sfc_main$2, {
                title: `${__props.languagePack.name} - Kelimeler`
              }, null, 8, ["title"]),
              createVNode("div", { class: "p-4" }, [
                createVNode("div", { class: "mb-4 flex justify-between" }, [
                  createVNode("div", null, [
                    createVNode("h2", { class: "text-xl font-bold text-foreground" }, toDisplayString(__props.languagePack.name), 1),
                    createVNode("p", { class: "text-muted-foreground text-sm" }, toDisplayString(__props.languagePack.description), 1),
                    createVNode("p", { class: "text-muted-foreground mt-1 text-sm" }, [
                      createVNode("span", { class: "font-medium" }, "Dil:"),
                      createTextVNode(" " + toDisplayString(getLanguageName(__props.languagePack.language)), 1)
                    ])
                  ]),
                  createVNode("div", { class: "flex space-x-2" }, [
                    isLoggedIn.value ? (openBlock(), createBlock("button", {
                      key: 0,
                      onClick: fetchAvailableWords,
                      class: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90"
                    }, " Kelime Ekle ")) : createCommentVNode("", true),
                    createVNode("a", {
                      href: _ctx.route("rendition.language-packs.export", __props.languagePack.id),
                      class: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
                    }, " Dışa Aktar ", 8, ["href"]),
                    createVNode("a", {
                      href: _ctx.route("rendition.language-packs.index"),
                      class: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
                    }, " Geri Dön ", 8, ["href"])
                  ])
                ]),
                createVNode("div", { class: "overflow-x-auto rounded-lg border border-border" }, [
                  createVNode("table", { class: "w-full caption-bottom text-sm" }, [
                    createVNode("thead", null, [
                      createVNode("tr", { class: "border-b border-border" }, [
                        createVNode("th", { class: "h-10 px-4 text-left align-middle font-medium text-muted-foreground" }, "Kelime"),
                        createVNode("th", { class: "h-10 px-4 text-left align-middle font-medium text-muted-foreground" }, "Anlam"),
                        createVNode("th", { class: "h-10 px-4 text-left align-middle font-medium text-muted-foreground" }, "Tür"),
                        createVNode("th", { class: "h-10 px-4 text-left align-middle font-medium text-muted-foreground" }, "Zorluk"),
                        createVNode("th", { class: "h-10 px-4 text-left align-middle font-medium text-muted-foreground" }, "İşlemler")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      !__props.languagePack.words || __props.languagePack.words.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                        createVNode("td", {
                          colspan: "5",
                          class: "text-muted-foreground py-6 text-center"
                        }, " Bu dil paketinde henüz kelime bulunmamaktadır. Kelime ekleyin. ")
                      ])) : createCommentVNode("", true),
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.languagePack.words, (word) => {
                        return openBlock(), createBlock("tr", {
                          key: word.id,
                          class: "border-b border-border transition-colors hover:bg-muted/50"
                        }, [
                          createVNode("td", { class: "px-4 py-3 font-medium text-foreground" }, toDisplayString(word.word), 1),
                          createVNode("td", { class: "px-4 py-3 text-muted-foreground" }, toDisplayString(word.meaning), 1),
                          createVNode("td", { class: "px-4 py-3 capitalize text-muted-foreground" }, toDisplayString(word.type), 1),
                          createVNode("td", { class: "px-4 py-3 text-muted-foreground" }, toDisplayString(difficultyText(word.difficulty_level)), 1),
                          createVNode("td", { class: "px-4 py-3" }, [
                            isLoggedIn.value ? (openBlock(), createBlock("button", {
                              key: 0,
                              onClick: ($event) => removeWord(word),
                              class: "inline-flex items-center justify-center rounded-md border border-destructive/50 bg-destructive/10 px-2 py-1 text-xs font-medium text-destructive transition-colors hover:bg-destructive/20"
                            }, " Kaldır ", 8, ["onClick"])) : createCommentVNode("", true)
                          ])
                        ]);
                      }), 128))
                    ])
                  ])
                ])
              ]),
              showAddWordsModal.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm",
                onClick: ($event) => showAddWordsModal.value = false
              }, [
                createVNode("div", {
                  class: "fixed left-[50%] top-[50%] z-50 flex max-h-[90vh] w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] flex-col gap-4 border border-border bg-background shadow-lg sm:rounded-lg",
                  onClick: withModifiers(() => {
                  }, ["stop"])
                }, [
                  createVNode("div", { class: "flex flex-shrink-0 items-center justify-between border-b border-border p-6 pb-4" }, [
                    createVNode("h3", { class: "text-lg font-semibold text-foreground" }, "Kelime Ekle"),
                    createVNode("button", {
                      onClick: ($event) => showAddWordsModal.value = false,
                      class: "inline-flex h-7 w-7 items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
                    }, [
                      (openBlock(), createBlock("svg", {
                        class: "h-5 w-5",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        xmlns: "http://www.w3.org/2000/svg"
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
                  createVNode("div", { class: "px-6" }, [
                    createVNode("label", { class: "text-sm font-medium text-foreground" }, "Kelime Ara"),
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                      type: "text",
                      placeholder: "Kelime veya anlam ara...",
                      class: "mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, searchQuery.value]
                    ])
                  ]),
                  createVNode("div", { class: "flex-1 overflow-y-auto px-6" }, [
                    createVNode("label", { class: "text-sm font-medium text-foreground" }, "Kelimeler"),
                    loading.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex justify-center py-4"
                    }, [
                      (openBlock(), createBlock("svg", {
                        class: "h-6 w-6 animate-spin",
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
                      ]))
                    ])) : availableWords.value.length === 0 ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "text-muted-foreground py-4 text-center"
                    }, " Eklenebilecek kelime bulunamadı. Önce yeni kelimeler ekleyin. ")) : (openBlock(), createBlock("div", {
                      key: 2,
                      class: "mt-2 max-h-60 overflow-y-auto rounded-lg border border-border p-2"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(filteredAvailableWords.value, (word) => {
                        return openBlock(), createBlock("div", {
                          key: word.id,
                          class: "flex items-center rounded px-2 py-1 transition-colors hover:bg-muted"
                        }, [
                          withDirectives(createVNode("input", {
                            id: `word-${word.id}`,
                            "onUpdate:modelValue": ($event) => selectedWords.value = $event,
                            value: word.id,
                            type: "checkbox",
                            class: "h-4 w-4 rounded border border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"
                          }, null, 8, ["id", "onUpdate:modelValue", "value"]), [
                            [vModelCheckbox, selectedWords.value]
                          ]),
                          createVNode("label", {
                            for: `word-${word.id}`,
                            class: "ml-2 block cursor-pointer text-sm text-foreground"
                          }, toDisplayString(word.word) + " - " + toDisplayString(word.meaning) + " (" + toDisplayString(getLanguageName(word.language)) + ") ", 9, ["for"])
                        ]);
                      }), 128))
                    ]))
                  ]),
                  createVNode("div", { class: "flex flex-shrink-0 flex-col-reverse border-t border-border p-6 pt-4 sm:flex-row sm:justify-end sm:space-x-2" }, [
                    createVNode("button", {
                      onClick: ($event) => showAddWordsModal.value = false,
                      class: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
                    }, " İptal ", 8, ["onClick"]),
                    createVNode("button", {
                      onClick: addWords,
                      class: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90",
                      disabled: selectedWords.value.length === 0 || processing.value
                    }, toDisplayString(processing.value ? "Ekleniyor..." : "Ekle"), 9, ["disabled"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Rendition/LanguagePacks/Words/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
