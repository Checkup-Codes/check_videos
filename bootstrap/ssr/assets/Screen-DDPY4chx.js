import { computed, withCtx, unref, createTextVNode, createVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-DjaYf9so.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  props: {
    languagePacks: Array,
    screen: Object
  },
  setup(__props) {
    const props = __props;
    const truncateDescription = (description) => {
      if (!description) return "Açıklama bulunmamaktadır.";
      return description.length > 100 ? description.slice(0, 100) + "..." : description;
    };
    const exportPack = (pack) => {
      const data = {
        name: pack.name,
        slug: pack.slug,
        description: pack.description,
        language: pack.language,
        words: pack.words.map((word) => ({
          id: word.id,
          word: word.word,
          type: word.type,
          language: word.language,
          learning_status: word.learning_status,
          flag: word.flag,
          difficulty_level: word.difficulty_level,
          incorrect_count: word.incorrect_count,
          review_count: word.review_count,
          last_review_date: word.last_review_date,
          created_at: word.created_at,
          updated_at: word.updated_at,
          meanings: word.meanings.map((meaning) => ({
            meaning: meaning.meaning,
            is_primary: meaning.is_primary,
            display_order: meaning.display_order
          })),
          example_sentences: word.example_sentences.map((sentence) => ({
            sentence: sentence.sentence,
            translation: sentence.translation,
            language: sentence.language
          })),
          synonyms: word.synonyms
        }))
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${pack.name.toLowerCase().replace(/\s+/g, "-")}-${pack.language}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    };
    const exportAllPacks = () => {
      const data = props.languagePacks.map((pack) => ({
        name: pack.name,
        slug: pack.slug,
        description: pack.description,
        language: pack.language,
        words: pack.words.map((word) => ({
          id: word.id,
          word: word.word,
          type: word.type,
          language: word.language,
          learning_status: word.learning_status,
          flag: word.flag,
          difficulty_level: word.difficulty_level,
          incorrect_count: word.incorrect_count,
          review_count: word.review_count,
          last_review_date: word.last_review_date,
          created_at: word.created_at,
          updated_at: word.updated_at,
          meanings: word.meanings.map((meaning) => ({
            meaning: meaning.meaning,
            is_primary: meaning.is_primary,
            display_order: meaning.display_order
          })),
          example_sentences: word.example_sentences.map((sentence) => ({
            sentence: sentence.sentence,
            translation: sentence.translation,
            language: sentence.language
          })),
          synonyms: word.synonyms
        }))
      }));
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "all-language-packs.json";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    };
    computed(() => {
      const params = new URLSearchParams(window.location.search);
      return {
        game: params.get("game") || null,
        pack_id: params.get("pack_id") || null
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="rounded-lg border border-border bg-card p-6 shadow-sm"${_scopeId}><div class="mb-4 flex items-center justify-between"${_scopeId}><div class="flex-1"${_scopeId}><h1 class="text-2xl font-bold text-foreground"${_scopeId}>Dil Paketleri</h1></div><div class="flex gap-2"${_scopeId}><button class="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"${_scopeId}>Tümünü Dışa Aktar</button>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("rendition.language-packs.create"),
              class: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Yeni Paket `);
                } else {
                  return [
                    createTextVNode(" Yeni Paket ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="relative my-4"${_scopeId}><div class="absolute inset-0 flex items-center"${_scopeId}><span class="w-full border-t border-border"${_scopeId}></span></div></div><div class="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"${_scopeId}><!--[-->`);
            ssrRenderList(__props.languagePacks, (pack) => {
              _push2(`<div class="rounded-lg border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><h2 class="text-lg font-semibold text-foreground"${_scopeId}>${ssrInterpolate(pack.name)}</h2><div class="inline-flex items-center rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-semibold text-foreground"${_scopeId}>${ssrInterpolate(pack.language)}</div></div><p class="text-muted-foreground mt-2 text-sm"${_scopeId}>${ssrInterpolate(truncateDescription(pack.description))}</p><div class="mt-3 flex items-center justify-between"${_scopeId}><div class="flex gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("rendition.words.show", { word: pack.slug }),
                class: "inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1.5 text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Kelimeleri Göster `);
                  } else {
                    return [
                      createTextVNode(" Kelimeleri Göster ")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`<button class="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1.5 text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"${_scopeId}>Dışa Aktar</button></div><div class="inline-flex items-center rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-semibold text-foreground"${_scopeId}>${ssrInterpolate(pack.word_count || 0)} kelime</div></div></div>`);
            });
            _push2(`<!--]--></div>`);
            if (__props.languagePacks.length === 0) {
              _push2(`<div class="mt-6 rounded-lg border border-border bg-muted p-4"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current text-muted-foreground"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg><span class="text-foreground"${_scopeId}>Hiç dil paketi bulunmamaktadır.</span></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "rounded-lg border border-border bg-card p-6 shadow-sm" }, [
                createVNode("div", { class: "mb-4 flex items-center justify-between" }, [
                  createVNode("div", { class: "flex-1" }, [
                    createVNode("h1", { class: "text-2xl font-bold text-foreground" }, "Dil Paketleri")
                  ]),
                  createVNode("div", { class: "flex gap-2" }, [
                    createVNode("button", {
                      onClick: exportAllPacks,
                      class: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
                    }, "Tümünü Dışa Aktar"),
                    createVNode(unref(Link), {
                      href: _ctx.route("rendition.language-packs.create"),
                      class: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Yeni Paket ")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ])
                ]),
                createVNode("div", { class: "relative my-4" }, [
                  createVNode("div", { class: "absolute inset-0 flex items-center" }, [
                    createVNode("span", { class: "w-full border-t border-border" })
                  ])
                ]),
                createVNode("div", { class: "grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.languagePacks, (pack) => {
                    return openBlock(), createBlock("div", {
                      key: pack.id,
                      class: "rounded-lg border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
                    }, [
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("h2", { class: "text-lg font-semibold text-foreground" }, toDisplayString(pack.name), 1),
                        createVNode("div", { class: "inline-flex items-center rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-semibold text-foreground" }, toDisplayString(pack.language), 1)
                      ]),
                      createVNode("p", { class: "text-muted-foreground mt-2 text-sm" }, toDisplayString(truncateDescription(pack.description)), 1),
                      createVNode("div", { class: "mt-3 flex items-center justify-between" }, [
                        createVNode("div", { class: "flex gap-2" }, [
                          createVNode(unref(Link), {
                            href: _ctx.route("rendition.words.show", { word: pack.slug }),
                            class: "inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1.5 text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Kelimeleri Göster ")
                            ]),
                            _: 1
                          }, 8, ["href"]),
                          createVNode("button", {
                            onClick: ($event) => exportPack(pack),
                            class: "inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1.5 text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
                          }, "Dışa Aktar", 8, ["onClick"])
                        ]),
                        createVNode("div", { class: "inline-flex items-center rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-semibold text-foreground" }, toDisplayString(pack.word_count || 0) + " kelime", 1)
                      ])
                    ]);
                  }), 128))
                ]),
                __props.languagePacks.length === 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "mt-6 rounded-lg border border-border bg-muted p-4"
                }, [
                  createVNode("div", { class: "flex items-center gap-3" }, [
                    (openBlock(), createBlock("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      class: "h-6 w-6 shrink-0 stroke-current text-muted-foreground"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      })
                    ])),
                    createVNode("span", { class: "text-foreground" }, "Hiç dil paketi bulunmamaktadır.")
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Rendition/LanguagePacks/Index/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
