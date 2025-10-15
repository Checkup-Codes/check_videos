import { computed, ref, withCtx, createVNode, createBlock, createCommentVNode, toDisplayString, createTextVNode, openBlock, Fragment, renderList, withDirectives, vModelText, vModelCheckbox, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain } from "vue/server-renderer";
import { usePage, router } from "@inertiajs/vue3";
import axios from "axios";
import { _ as _sfc_main$1 } from "./CheckScreen-BIqwcPls.js";
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
            _push2(`<div class="p-4"${_scopeId}><div class="mb-4 flex justify-between"${_scopeId}><div${_scopeId}><h2 class="text-xl font-bold text-base-content"${_scopeId}>${ssrInterpolate(__props.languagePack.name)}</h2><p class="text-base-content/70 text-sm"${_scopeId}>${ssrInterpolate(__props.languagePack.description)}</p><p class="text-base-content/70 mt-1 text-sm"${_scopeId}><span class="font-medium"${_scopeId}>Dil:</span> ${ssrInterpolate(getLanguageName(__props.languagePack.language))}</p></div><div class="flex space-x-2"${_scopeId}>`);
            if (isLoggedIn.value) {
              _push2(`<button class="rounded border border-base-300 bg-base-content px-4 py-2 text-sm font-medium text-base-100 transition hover:bg-base-300 hover:text-base-content"${_scopeId}> Kelime Ekle </button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<a${ssrRenderAttr("href", _ctx.route("rendition.language-packs.export", __props.languagePack.id))} class="rounded border border-base-300 bg-base-100 px-4 py-2 text-sm font-medium text-base-content transition hover:bg-base-200"${_scopeId}> Dışa Aktar </a><a${ssrRenderAttr("href", _ctx.route("rendition.language-packs.index"))} class="rounded border border-base-300 bg-base-100 px-4 py-2 text-sm font-medium text-base-content transition hover:bg-base-200"${_scopeId}> Geri Dön </a></div></div><div class="overflow-x-auto"${_scopeId}><table class="table table-zebra w-full"${_scopeId}><thead${_scopeId}><tr${_scopeId}><th class="border-b px-4 py-3 text-left text-sm font-semibold"${_scopeId}>Kelime</th><th class="border-b px-4 py-3 text-left text-sm font-semibold"${_scopeId}>Anlam</th><th class="border-b px-4 py-3 text-left text-sm font-semibold"${_scopeId}>Tür</th><th class="border-b px-4 py-3 text-left text-sm font-semibold"${_scopeId}>Zorluk</th><th class="border-b px-4 py-3 text-left text-sm font-semibold"${_scopeId}>İşlemler</th></tr></thead><tbody${_scopeId}>`);
            if (!__props.languagePack.words || __props.languagePack.words.length === 0) {
              _push2(`<tr${_scopeId}><td colspan="5" class="text-base-content/70 py-6 text-center"${_scopeId}> Bu dil paketinde henüz kelime bulunmamaktadır. Kelime ekleyin. </td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(__props.languagePack.words, (word) => {
              _push2(`<tr class="hover"${_scopeId}><td class="border-b px-4 py-3 font-medium"${_scopeId}>${ssrInterpolate(word.word)}</td><td class="border-b px-4 py-3"${_scopeId}>${ssrInterpolate(word.meaning)}</td><td class="border-b px-4 py-3 capitalize"${_scopeId}>${ssrInterpolate(word.type)}</td><td class="border-b px-4 py-3"${_scopeId}>${ssrInterpolate(difficultyText(word.difficulty_level))}</td><td class="border-b px-4 py-3"${_scopeId}>`);
              if (isLoggedIn.value) {
                _push2(`<button class="rounded border border-red-300 bg-red-50 px-2 py-1 text-xs font-medium text-red-700 transition hover:bg-red-100"${_scopeId}> Kaldır </button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div></div>`);
            if (showAddWordsModal.value) {
              _push2(`<div class="modal-open modal"${_scopeId}><div class="modal-box max-w-2xl"${_scopeId}><div class="mb-4 flex items-center justify-between"${_scopeId}><h3 class="text-lg font-bold"${_scopeId}>Kelime Ekle</h3><button class="rounded border border-base-300 bg-base-100 p-1 text-base-content transition hover:bg-base-200"${_scopeId}><svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg></button></div><div class="mb-4"${_scopeId}><label class="text-sm font-medium text-base-content"${_scopeId}>Kelime Ara</label><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Kelime veya anlam ara..." class="placeholder-base-content/50 mt-1 w-full rounded border border-base-300 bg-base-100 px-3 py-2 text-base-content focus:border-base-content focus:outline-none focus:ring-1 focus:ring-base-content"${_scopeId}></div><div class="mb-4"${_scopeId}><label class="text-sm font-medium text-base-content"${_scopeId}>Kelimeler</label>`);
              if (loading.value) {
                _push2(`<div class="flex justify-center py-4"${_scopeId}><div class="loading loading-spinner loading-md"${_scopeId}></div></div>`);
              } else if (availableWords.value.length === 0) {
                _push2(`<div class="text-base-content/70 py-4 text-center"${_scopeId}> Eklenebilecek kelime bulunamadı. Önce yeni kelimeler ekleyin. </div>`);
              } else {
                _push2(`<div class="max-h-60 overflow-y-auto rounded-lg border border-base-300 p-2"${_scopeId}><!--[-->`);
                ssrRenderList(filteredAvailableWords.value, (word) => {
                  _push2(`<div class="flex items-center rounded px-2 py-1 hover:bg-base-200"${_scopeId}><input${ssrRenderAttr("id", `word-${word.id}`)}${ssrIncludeBooleanAttr(Array.isArray(selectedWords.value) ? ssrLooseContain(selectedWords.value, word.id) : selectedWords.value) ? " checked" : ""}${ssrRenderAttr("value", word.id)} type="checkbox" class="h-4 w-4 rounded border border-base-300 bg-base-100 text-base-content focus:ring-1 focus:ring-base-content"${_scopeId}><label${ssrRenderAttr("for", `word-${word.id}`)} class="ml-2 block text-sm text-base-content"${_scopeId}>${ssrInterpolate(word.word)} - ${ssrInterpolate(word.meaning)} (${ssrInterpolate(getLanguageName(word.language))}) </label></div>`);
                });
                _push2(`<!--]--></div>`);
              }
              _push2(`</div><div class="modal-action"${_scopeId}><button class="rounded border border-base-300 bg-base-100 px-4 py-2 text-sm font-medium text-base-content transition hover:bg-base-200"${_scopeId}> İptal </button><button class="rounded bg-base-content px-4 py-2 text-sm font-medium text-base-100 transition hover:bg-base-300 hover:text-base-content disabled:opacity-50"${ssrIncludeBooleanAttr(selectedWords.value.length === 0 || processing.value) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(processing.value ? "Ekleniyor..." : "Ekle")}</button></div></div></div>`);
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
                    createVNode("h2", { class: "text-xl font-bold text-base-content" }, toDisplayString(__props.languagePack.name), 1),
                    createVNode("p", { class: "text-base-content/70 text-sm" }, toDisplayString(__props.languagePack.description), 1),
                    createVNode("p", { class: "text-base-content/70 mt-1 text-sm" }, [
                      createVNode("span", { class: "font-medium" }, "Dil:"),
                      createTextVNode(" " + toDisplayString(getLanguageName(__props.languagePack.language)), 1)
                    ])
                  ]),
                  createVNode("div", { class: "flex space-x-2" }, [
                    isLoggedIn.value ? (openBlock(), createBlock("button", {
                      key: 0,
                      onClick: fetchAvailableWords,
                      class: "rounded border border-base-300 bg-base-content px-4 py-2 text-sm font-medium text-base-100 transition hover:bg-base-300 hover:text-base-content"
                    }, " Kelime Ekle ")) : createCommentVNode("", true),
                    createVNode("a", {
                      href: _ctx.route("rendition.language-packs.export", __props.languagePack.id),
                      class: "rounded border border-base-300 bg-base-100 px-4 py-2 text-sm font-medium text-base-content transition hover:bg-base-200"
                    }, " Dışa Aktar ", 8, ["href"]),
                    createVNode("a", {
                      href: _ctx.route("rendition.language-packs.index"),
                      class: "rounded border border-base-300 bg-base-100 px-4 py-2 text-sm font-medium text-base-content transition hover:bg-base-200"
                    }, " Geri Dön ", 8, ["href"])
                  ])
                ]),
                createVNode("div", { class: "overflow-x-auto" }, [
                  createVNode("table", { class: "table table-zebra w-full" }, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", { class: "border-b px-4 py-3 text-left text-sm font-semibold" }, "Kelime"),
                        createVNode("th", { class: "border-b px-4 py-3 text-left text-sm font-semibold" }, "Anlam"),
                        createVNode("th", { class: "border-b px-4 py-3 text-left text-sm font-semibold" }, "Tür"),
                        createVNode("th", { class: "border-b px-4 py-3 text-left text-sm font-semibold" }, "Zorluk"),
                        createVNode("th", { class: "border-b px-4 py-3 text-left text-sm font-semibold" }, "İşlemler")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      !__props.languagePack.words || __props.languagePack.words.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                        createVNode("td", {
                          colspan: "5",
                          class: "text-base-content/70 py-6 text-center"
                        }, " Bu dil paketinde henüz kelime bulunmamaktadır. Kelime ekleyin. ")
                      ])) : createCommentVNode("", true),
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.languagePack.words, (word) => {
                        return openBlock(), createBlock("tr", {
                          key: word.id,
                          class: "hover"
                        }, [
                          createVNode("td", { class: "border-b px-4 py-3 font-medium" }, toDisplayString(word.word), 1),
                          createVNode("td", { class: "border-b px-4 py-3" }, toDisplayString(word.meaning), 1),
                          createVNode("td", { class: "border-b px-4 py-3 capitalize" }, toDisplayString(word.type), 1),
                          createVNode("td", { class: "border-b px-4 py-3" }, toDisplayString(difficultyText(word.difficulty_level)), 1),
                          createVNode("td", { class: "border-b px-4 py-3" }, [
                            isLoggedIn.value ? (openBlock(), createBlock("button", {
                              key: 0,
                              onClick: ($event) => removeWord(word),
                              class: "rounded border border-red-300 bg-red-50 px-2 py-1 text-xs font-medium text-red-700 transition hover:bg-red-100"
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
                class: "modal-open modal"
              }, [
                createVNode("div", { class: "modal-box max-w-2xl" }, [
                  createVNode("div", { class: "mb-4 flex items-center justify-between" }, [
                    createVNode("h3", { class: "text-lg font-bold" }, "Kelime Ekle"),
                    createVNode("button", {
                      onClick: ($event) => showAddWordsModal.value = false,
                      class: "rounded border border-base-300 bg-base-100 p-1 text-base-content transition hover:bg-base-200"
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
                  createVNode("div", { class: "mb-4" }, [
                    createVNode("label", { class: "text-sm font-medium text-base-content" }, "Kelime Ara"),
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                      type: "text",
                      placeholder: "Kelime veya anlam ara...",
                      class: "placeholder-base-content/50 mt-1 w-full rounded border border-base-300 bg-base-100 px-3 py-2 text-base-content focus:border-base-content focus:outline-none focus:ring-1 focus:ring-base-content"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, searchQuery.value]
                    ])
                  ]),
                  createVNode("div", { class: "mb-4" }, [
                    createVNode("label", { class: "text-sm font-medium text-base-content" }, "Kelimeler"),
                    loading.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex justify-center py-4"
                    }, [
                      createVNode("div", { class: "loading loading-spinner loading-md" })
                    ])) : availableWords.value.length === 0 ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "text-base-content/70 py-4 text-center"
                    }, " Eklenebilecek kelime bulunamadı. Önce yeni kelimeler ekleyin. ")) : (openBlock(), createBlock("div", {
                      key: 2,
                      class: "max-h-60 overflow-y-auto rounded-lg border border-base-300 p-2"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(filteredAvailableWords.value, (word) => {
                        return openBlock(), createBlock("div", {
                          key: word.id,
                          class: "flex items-center rounded px-2 py-1 hover:bg-base-200"
                        }, [
                          withDirectives(createVNode("input", {
                            id: `word-${word.id}`,
                            "onUpdate:modelValue": ($event) => selectedWords.value = $event,
                            value: word.id,
                            type: "checkbox",
                            class: "h-4 w-4 rounded border border-base-300 bg-base-100 text-base-content focus:ring-1 focus:ring-base-content"
                          }, null, 8, ["id", "onUpdate:modelValue", "value"]), [
                            [vModelCheckbox, selectedWords.value]
                          ]),
                          createVNode("label", {
                            for: `word-${word.id}`,
                            class: "ml-2 block text-sm text-base-content"
                          }, toDisplayString(word.word) + " - " + toDisplayString(word.meaning) + " (" + toDisplayString(getLanguageName(word.language)) + ") ", 9, ["for"])
                        ]);
                      }), 128))
                    ]))
                  ]),
                  createVNode("div", { class: "modal-action" }, [
                    createVNode("button", {
                      onClick: ($event) => showAddWordsModal.value = false,
                      class: "rounded border border-base-300 bg-base-100 px-4 py-2 text-sm font-medium text-base-content transition hover:bg-base-200"
                    }, " İptal ", 8, ["onClick"]),
                    createVNode("button", {
                      onClick: addWords,
                      class: "rounded bg-base-content px-4 py-2 text-sm font-medium text-base-100 transition hover:bg-base-300 hover:text-base-content disabled:opacity-50",
                      disabled: selectedWords.value.length === 0 || processing.value
                    }, toDisplayString(processing.value ? "Ekleniyor..." : "Ekle"), 9, ["disabled"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Rendition/LanguagePacks/Words/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
