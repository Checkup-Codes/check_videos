import { computed, withCtx, unref, createBlock, createCommentVNode, createVNode, openBlock, createTextVNode, toDisplayString, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderAttr } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import _sfc_main$1 from "./LayoutJourney-EqBIhKAw.js";
import { _ as _export_sfc } from "../ssr.js";
import "./FlashMessage-C3JOGPFR.js";
import "./CheckScreen-DjaYf9so.js";
import "@fortawesome/vue-fontawesome";
import "vuex";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = {
  __name: "IndexJourney",
  __ssrInlineRender: true,
  props: {
    entries: {
      type: Array,
      default: () => []
    },
    entriesByYear: {
      type: Object,
      default: () => ({})
    }
  },
  setup(__props) {
    const props = __props;
    const groupedEntries = computed(() => {
      return Object.entries(props.entriesByYear || {}).map(([year, entries]) => [
        year,
        Array.isArray(entries) ? [...entries].sort((a, b) => {
          const dateA = new Date(a.entry_date);
          const dateB = new Date(b.entry_date);
          return dateB - dateA;
        }) : entries
      ]).sort(([yearA], [yearB]) => Number(yearB) - Number(yearA));
    });
    const formatDate = (dateString) => {
      if (!dateString) return "";
      try {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("tr-TR", {
          day: "numeric",
          month: "long",
          year: "numeric"
        }).format(date);
      } catch {
        return dateString;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        screen: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mx-auto max-w-4xl py-8" data-v-2f5a3548${_scopeId}><div class="mb-12 text-center" data-v-2f5a3548${_scopeId}><h1 class="mb-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl" data-v-2f5a3548${_scopeId}>Yolculuk</h1></div>`);
            if (__props.entries.length > 0) {
              _push2(`<div class="relative" data-v-2f5a3548${_scopeId}><div class="timeline-container" data-v-2f5a3548${_scopeId}><!--[-->`);
              ssrRenderList(groupedEntries.value, ([year, yearEntries]) => {
                _push2(`<div class="year-section mb-8" data-v-2f5a3548${_scopeId}><div class="year-marker mb-4 flex items-center justify-center" data-v-2f5a3548${_scopeId}><div class="flex h-10 w-20 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-md" data-v-2f5a3548${_scopeId}>${ssrInterpolate(year)}</div></div><div class="space-y-4" data-v-2f5a3548${_scopeId}><!--[-->`);
                ssrRenderList(yearEntries, (entry, index) => {
                  _push2(`<div class="${ssrRenderClass([index % 2 === 0 ? "lg:pr-[52%]" : "lg:pl-[52%]", "entry-card group relative"])}" data-v-2f5a3548${_scopeId}><div class="absolute left-1/2 top-4 hidden h-4 w-4 -translate-x-1/2 rounded-full border-4 border-primary bg-background lg:block" data-v-2f5a3548${_scopeId}></div>`);
                  _push2(ssrRenderComponent(unref(Link), {
                    href: `/journey/${entry.id}`,
                    class: "relative block overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-md"
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        if (entry.image) {
                          _push3(`<div class="absolute inset-0 opacity-10" data-v-2f5a3548${_scopeId2}><img${ssrRenderAttr("src", `/storage/${entry.image}`)}${ssrRenderAttr("alt", entry.title)} class="h-full w-full object-cover" data-v-2f5a3548${_scopeId2}></div>`);
                        } else {
                          _push3(`<!---->`);
                        }
                        _push3(`<div class="relative p-3" data-v-2f5a3548${_scopeId2}><div class="mb-2 flex items-center gap-2" data-v-2f5a3548${_scopeId2}><span class="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary" data-v-2f5a3548${_scopeId2}><svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-2f5a3548${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" data-v-2f5a3548${_scopeId2}></path></svg> ${ssrInterpolate(formatDate(entry.entry_date))}</span>`);
                        if (entry.status === "draft") {
                          _push3(`<span class="rounded-full bg-yellow-500/20 px-1.5 py-0.5 text-[10px] font-medium text-yellow-600 dark:text-yellow-400" data-v-2f5a3548${_scopeId2}> Taslak </span>`);
                        } else {
                          _push3(`<!---->`);
                        }
                        _push3(`</div><h2 class="mb-1 text-base font-semibold text-foreground transition-colors group-hover:text-primary" data-v-2f5a3548${_scopeId2}>${ssrInterpolate(entry.title)}</h2>`);
                        if (entry.description) {
                          _push3(`<p class="line-clamp-1 text-xs leading-relaxed text-muted-foreground" data-v-2f5a3548${_scopeId2}>${ssrInterpolate(entry.description)}</p>`);
                        } else {
                          _push3(`<!---->`);
                        }
                        _push3(`</div>`);
                      } else {
                        return [
                          entry.image ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "absolute inset-0 opacity-10"
                          }, [
                            createVNode("img", {
                              src: `/storage/${entry.image}`,
                              alt: entry.title,
                              class: "h-full w-full object-cover"
                            }, null, 8, ["src", "alt"])
                          ])) : createCommentVNode("", true),
                          createVNode("div", { class: "relative p-3" }, [
                            createVNode("div", { class: "mb-2 flex items-center gap-2" }, [
                              createVNode("span", { class: "inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary" }, [
                                (openBlock(), createBlock("svg", {
                                  xmlns: "http://www.w3.org/2000/svg",
                                  class: "h-3 w-3",
                                  fill: "none",
                                  viewBox: "0 0 24 24",
                                  stroke: "currentColor"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    "stroke-width": "2",
                                    d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  })
                                ])),
                                createTextVNode(" " + toDisplayString(formatDate(entry.entry_date)), 1)
                              ]),
                              entry.status === "draft" ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "rounded-full bg-yellow-500/20 px-1.5 py-0.5 text-[10px] font-medium text-yellow-600 dark:text-yellow-400"
                              }, " Taslak ")) : createCommentVNode("", true)
                            ]),
                            createVNode("h2", { class: "mb-1 text-base font-semibold text-foreground transition-colors group-hover:text-primary" }, toDisplayString(entry.title), 1),
                            entry.description ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "line-clamp-1 text-xs leading-relaxed text-muted-foreground"
                            }, toDisplayString(entry.description), 1)) : createCommentVNode("", true)
                          ])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                  _push2(`</div>`);
                });
                _push2(`<!--]--></div></div>`);
              });
              _push2(`<!--]--></div><div class="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-primary via-primary/50 to-transparent lg:block" data-v-2f5a3548${_scopeId}></div></div>`);
            } else {
              _push2(`<div class="rounded-xl border border-dashed border-border bg-card/50 py-16 text-center" data-v-2f5a3548${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="mx-auto mb-4 h-16 w-16 text-muted-foreground/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-2f5a3548${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" data-v-2f5a3548${_scopeId}></path></svg><h3 class="mb-2 text-lg font-medium text-foreground" data-v-2f5a3548${_scopeId}>Henüz yolculuk kaydı yok</h3><p class="text-sm text-muted-foreground" data-v-2f5a3548${_scopeId}>Yolculuk kayıtları eklendiğinde burada görünecek.</p></div>`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "mx-auto max-w-4xl py-8" }, [
                createVNode("div", { class: "mb-12 text-center" }, [
                  createVNode("h1", { class: "mb-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl" }, "Yolculuk")
                ]),
                __props.entries.length > 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "relative"
                }, [
                  createVNode("div", { class: "timeline-container" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(groupedEntries.value, ([year, yearEntries]) => {
                      return openBlock(), createBlock("div", {
                        key: year,
                        class: "year-section mb-8"
                      }, [
                        createVNode("div", { class: "year-marker mb-4 flex items-center justify-center" }, [
                          createVNode("div", { class: "flex h-10 w-20 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-md" }, toDisplayString(year), 1)
                        ]),
                        createVNode("div", { class: "space-y-4" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(yearEntries, (entry, index) => {
                            return openBlock(), createBlock("div", {
                              key: entry.id,
                              class: ["entry-card group relative", index % 2 === 0 ? "lg:pr-[52%]" : "lg:pl-[52%]"]
                            }, [
                              createVNode("div", { class: "absolute left-1/2 top-4 hidden h-4 w-4 -translate-x-1/2 rounded-full border-4 border-primary bg-background lg:block" }),
                              createVNode(unref(Link), {
                                href: `/journey/${entry.id}`,
                                class: "relative block overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-md"
                              }, {
                                default: withCtx(() => [
                                  entry.image ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "absolute inset-0 opacity-10"
                                  }, [
                                    createVNode("img", {
                                      src: `/storage/${entry.image}`,
                                      alt: entry.title,
                                      class: "h-full w-full object-cover"
                                    }, null, 8, ["src", "alt"])
                                  ])) : createCommentVNode("", true),
                                  createVNode("div", { class: "relative p-3" }, [
                                    createVNode("div", { class: "mb-2 flex items-center gap-2" }, [
                                      createVNode("span", { class: "inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary" }, [
                                        (openBlock(), createBlock("svg", {
                                          xmlns: "http://www.w3.org/2000/svg",
                                          class: "h-3 w-3",
                                          fill: "none",
                                          viewBox: "0 0 24 24",
                                          stroke: "currentColor"
                                        }, [
                                          createVNode("path", {
                                            "stroke-linecap": "round",
                                            "stroke-linejoin": "round",
                                            "stroke-width": "2",
                                            d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                          })
                                        ])),
                                        createTextVNode(" " + toDisplayString(formatDate(entry.entry_date)), 1)
                                      ]),
                                      entry.status === "draft" ? (openBlock(), createBlock("span", {
                                        key: 0,
                                        class: "rounded-full bg-yellow-500/20 px-1.5 py-0.5 text-[10px] font-medium text-yellow-600 dark:text-yellow-400"
                                      }, " Taslak ")) : createCommentVNode("", true)
                                    ]),
                                    createVNode("h2", { class: "mb-1 text-base font-semibold text-foreground transition-colors group-hover:text-primary" }, toDisplayString(entry.title), 1),
                                    entry.description ? (openBlock(), createBlock("p", {
                                      key: 0,
                                      class: "line-clamp-1 text-xs leading-relaxed text-muted-foreground"
                                    }, toDisplayString(entry.description), 1)) : createCommentVNode("", true)
                                  ])
                                ]),
                                _: 2
                              }, 1032, ["href"])
                            ], 2);
                          }), 128))
                        ])
                      ]);
                    }), 128))
                  ]),
                  createVNode("div", { class: "absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-primary via-primary/50 to-transparent lg:block" })
                ])) : (openBlock(), createBlock("div", {
                  key: 1,
                  class: "rounded-xl border border-dashed border-border bg-card/50 py-16 text-center"
                }, [
                  (openBlock(), createBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    class: "mx-auto mb-4 h-16 w-16 text-muted-foreground/30",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "1",
                      d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    })
                  ])),
                  createVNode("h3", { class: "mb-2 text-lg font-medium text-foreground" }, "Henüz yolculuk kaydı yok"),
                  createVNode("p", { class: "text-sm text-muted-foreground" }, "Yolculuk kayıtları eklendiğinde burada görünecek.")
                ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Journey/IndexJourney.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const IndexJourney = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2f5a3548"]]);
export {
  IndexJourney as default
};
