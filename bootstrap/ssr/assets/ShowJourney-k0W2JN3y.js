import { computed, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, toDisplayString, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import _sfc_main$1 from "./LayoutJourney-BImd-DHt.js";
import { _ as _sfc_main$2 } from "./CheckScreen-DjaYf9so.js";
import "./FlashMessage-D-FCyLof.js";
import "./SidebarLayoutJourney-C_y6Q3RS.js";
import "./SubSidebarScreen-DNe7gM-E.js";
import "./JourneyTimeline-Da0328av.js";
import "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "vuex";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = {
  __name: "ShowJourney",
  __ssrInlineRender: true,
  props: {
    entry: {
      type: Object,
      required: true
    },
    entries: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    const props = __props;
    const currentIndex = computed(() => {
      return props.entries.findIndex((e) => e.id === props.entry.id);
    });
    const prevEntry = computed(() => {
      if (currentIndex.value > 0) {
        return props.entries[currentIndex.value - 1];
      }
      return null;
    });
    const nextEntry = computed(() => {
      if (currentIndex.value < props.entries.length - 1) {
        return props.entries[currentIndex.value + 1];
      }
      return null;
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
            _push2(ssrRenderComponent(_sfc_main$2, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="mx-auto max-w-3xl py-8"${_scopeId2}><div class="mb-6"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Link), {
                    href: "/journey",
                    class: "inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId3}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"${_scopeId3}></path></svg> Geri `);
                      } else {
                        return [
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
                              d: "M15 19l-7-7 7-7"
                            })
                          ])),
                          createTextVNode(" Geri ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div><article class="overflow-hidden rounded-xl border border-border bg-card shadow-sm"${_scopeId2}>`);
                  if (__props.entry.image) {
                    _push3(`<div class="aspect-video overflow-hidden"${_scopeId2}><img${ssrRenderAttr("src", `/storage/${__props.entry.image}`)}${ssrRenderAttr("alt", __props.entry.title)} class="h-full w-full object-cover"${_scopeId2}></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<div class="p-6 sm:p-8"${_scopeId2}><div class="mb-4 flex flex-wrap items-center gap-3"${_scopeId2}><span class="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"${_scopeId2}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"${_scopeId2}></path></svg> ${ssrInterpolate(formatDate(__props.entry.entry_date))}</span>`);
                  if (__props.entry.status === "draft") {
                    _push3(`<span class="rounded-full bg-yellow-500/20 px-3 py-1 text-sm font-medium text-yellow-600 dark:text-yellow-400"${_scopeId2}> Taslak </span>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><h1 class="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"${_scopeId2}>${ssrInterpolate(__props.entry.title)}</h1>`);
                  if (__props.entry.description) {
                    _push3(`<div class="prose prose-neutral max-w-none dark:prose-invert"${_scopeId2}><p class="whitespace-pre-wrap text-lg leading-relaxed text-muted-foreground"${_scopeId2}>${ssrInterpolate(__props.entry.description)}</p></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div></article><div class="mt-8 flex items-center justify-between"${_scopeId2}>`);
                  if (prevEntry.value) {
                    _push3(ssrRenderComponent(unref(Link), {
                      href: `/journey/${prevEntry.value.id}`,
                      class: "group flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-sm"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-muted-foreground transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId3}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"${_scopeId3}></path></svg><div class="text-left"${_scopeId3}><div class="text-xs text-muted-foreground"${_scopeId3}>Önceki</div><div class="text-sm font-medium text-foreground"${_scopeId3}>${ssrInterpolate(prevEntry.value.title)}</div></div>`);
                        } else {
                          return [
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              class: "h-5 w-5 text-muted-foreground transition-transform group-hover:-translate-x-1",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              stroke: "currentColor"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M15 19l-7-7 7-7"
                              })
                            ])),
                            createVNode("div", { class: "text-left" }, [
                              createVNode("div", { class: "text-xs text-muted-foreground" }, "Önceki"),
                              createVNode("div", { class: "text-sm font-medium text-foreground" }, toDisplayString(prevEntry.value.title), 1)
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<div${_scopeId2}></div>`);
                  }
                  if (nextEntry.value) {
                    _push3(ssrRenderComponent(unref(Link), {
                      href: `/journey/${nextEntry.value.id}`,
                      class: "group flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-sm"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="text-right"${_scopeId3}><div class="text-xs text-muted-foreground"${_scopeId3}>Sonraki</div><div class="text-sm font-medium text-foreground"${_scopeId3}>${ssrInterpolate(nextEntry.value.title)}</div></div><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId3}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"${_scopeId3}></path></svg>`);
                        } else {
                          return [
                            createVNode("div", { class: "text-right" }, [
                              createVNode("div", { class: "text-xs text-muted-foreground" }, "Sonraki"),
                              createVNode("div", { class: "text-sm font-medium text-foreground" }, toDisplayString(nextEntry.value.title), 1)
                            ]),
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              class: "h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              stroke: "currentColor"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M9 5l7 7-7 7"
                              })
                            ]))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<div${_scopeId2}></div>`);
                  }
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "mx-auto max-w-3xl py-8" }, [
                      createVNode("div", { class: "mb-6" }, [
                        createVNode(unref(Link), {
                          href: "/journey",
                          class: "inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                        }, {
                          default: withCtx(() => [
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
                                d: "M15 19l-7-7 7-7"
                              })
                            ])),
                            createTextVNode(" Geri ")
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("article", { class: "overflow-hidden rounded-xl border border-border bg-card shadow-sm" }, [
                        __props.entry.image ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "aspect-video overflow-hidden"
                        }, [
                          createVNode("img", {
                            src: `/storage/${__props.entry.image}`,
                            alt: __props.entry.title,
                            class: "h-full w-full object-cover"
                          }, null, 8, ["src", "alt"])
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "p-6 sm:p-8" }, [
                          createVNode("div", { class: "mb-4 flex flex-wrap items-center gap-3" }, [
                            createVNode("span", { class: "inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary" }, [
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
                                  d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                })
                              ])),
                              createTextVNode(" " + toDisplayString(formatDate(__props.entry.entry_date)), 1)
                            ]),
                            __props.entry.status === "draft" ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "rounded-full bg-yellow-500/20 px-3 py-1 text-sm font-medium text-yellow-600 dark:text-yellow-400"
                            }, " Taslak ")) : createCommentVNode("", true)
                          ]),
                          createVNode("h1", { class: "mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl" }, toDisplayString(__props.entry.title), 1),
                          __props.entry.description ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "prose prose-neutral max-w-none dark:prose-invert"
                          }, [
                            createVNode("p", { class: "whitespace-pre-wrap text-lg leading-relaxed text-muted-foreground" }, toDisplayString(__props.entry.description), 1)
                          ])) : createCommentVNode("", true)
                        ])
                      ]),
                      createVNode("div", { class: "mt-8 flex items-center justify-between" }, [
                        prevEntry.value ? (openBlock(), createBlock(unref(Link), {
                          key: 0,
                          href: `/journey/${prevEntry.value.id}`,
                          class: "group flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-sm"
                        }, {
                          default: withCtx(() => [
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              class: "h-5 w-5 text-muted-foreground transition-transform group-hover:-translate-x-1",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              stroke: "currentColor"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M15 19l-7-7 7-7"
                              })
                            ])),
                            createVNode("div", { class: "text-left" }, [
                              createVNode("div", { class: "text-xs text-muted-foreground" }, "Önceki"),
                              createVNode("div", { class: "text-sm font-medium text-foreground" }, toDisplayString(prevEntry.value.title), 1)
                            ])
                          ]),
                          _: 1
                        }, 8, ["href"])) : (openBlock(), createBlock("div", { key: 1 })),
                        nextEntry.value ? (openBlock(), createBlock(unref(Link), {
                          key: 2,
                          href: `/journey/${nextEntry.value.id}`,
                          class: "group flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-sm"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "text-right" }, [
                              createVNode("div", { class: "text-xs text-muted-foreground" }, "Sonraki"),
                              createVNode("div", { class: "text-sm font-medium text-foreground" }, toDisplayString(nextEntry.value.title), 1)
                            ]),
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              class: "h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              stroke: "currentColor"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M9 5l7 7-7 7"
                              })
                            ]))
                          ]),
                          _: 1
                        }, 8, ["href"])) : (openBlock(), createBlock("div", { key: 3 }))
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "mx-auto max-w-3xl py-8" }, [
                    createVNode("div", { class: "mb-6" }, [
                      createVNode(unref(Link), {
                        href: "/journey",
                        class: "inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                      }, {
                        default: withCtx(() => [
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
                              d: "M15 19l-7-7 7-7"
                            })
                          ])),
                          createTextVNode(" Geri ")
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("article", { class: "overflow-hidden rounded-xl border border-border bg-card shadow-sm" }, [
                      __props.entry.image ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "aspect-video overflow-hidden"
                      }, [
                        createVNode("img", {
                          src: `/storage/${__props.entry.image}`,
                          alt: __props.entry.title,
                          class: "h-full w-full object-cover"
                        }, null, 8, ["src", "alt"])
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "p-6 sm:p-8" }, [
                        createVNode("div", { class: "mb-4 flex flex-wrap items-center gap-3" }, [
                          createVNode("span", { class: "inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary" }, [
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
                                d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              })
                            ])),
                            createTextVNode(" " + toDisplayString(formatDate(__props.entry.entry_date)), 1)
                          ]),
                          __props.entry.status === "draft" ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "rounded-full bg-yellow-500/20 px-3 py-1 text-sm font-medium text-yellow-600 dark:text-yellow-400"
                          }, " Taslak ")) : createCommentVNode("", true)
                        ]),
                        createVNode("h1", { class: "mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl" }, toDisplayString(__props.entry.title), 1),
                        __props.entry.description ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "prose prose-neutral max-w-none dark:prose-invert"
                        }, [
                          createVNode("p", { class: "whitespace-pre-wrap text-lg leading-relaxed text-muted-foreground" }, toDisplayString(__props.entry.description), 1)
                        ])) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode("div", { class: "mt-8 flex items-center justify-between" }, [
                      prevEntry.value ? (openBlock(), createBlock(unref(Link), {
                        key: 0,
                        href: `/journey/${prevEntry.value.id}`,
                        class: "group flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-sm"
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            class: "h-5 w-5 text-muted-foreground transition-transform group-hover:-translate-x-1",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M15 19l-7-7 7-7"
                            })
                          ])),
                          createVNode("div", { class: "text-left" }, [
                            createVNode("div", { class: "text-xs text-muted-foreground" }, "Önceki"),
                            createVNode("div", { class: "text-sm font-medium text-foreground" }, toDisplayString(prevEntry.value.title), 1)
                          ])
                        ]),
                        _: 1
                      }, 8, ["href"])) : (openBlock(), createBlock("div", { key: 1 })),
                      nextEntry.value ? (openBlock(), createBlock(unref(Link), {
                        key: 2,
                        href: `/journey/${nextEntry.value.id}`,
                        class: "group flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-sm"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-right" }, [
                            createVNode("div", { class: "text-xs text-muted-foreground" }, "Sonraki"),
                            createVNode("div", { class: "text-sm font-medium text-foreground" }, toDisplayString(nextEntry.value.title), 1)
                          ]),
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            class: "h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M9 5l7 7-7 7"
                            })
                          ]))
                        ]),
                        _: 1
                      }, 8, ["href"])) : (openBlock(), createBlock("div", { key: 3 }))
                    ])
                  ])
                ]),
                _: 1
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Journey/ShowJourney.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
