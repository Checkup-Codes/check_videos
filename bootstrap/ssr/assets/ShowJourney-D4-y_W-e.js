import { computed, withCtx, unref, openBlock, createBlock, createVNode, toDisplayString, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import _sfc_main$1 from "./LayoutJourney-Da2ef_ZG.js";
import { _ as _sfc_main$2 } from "./PageShell-DjZZ5koh.js";
import "./FlashMessage-DLOdJQqX.js";
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
      if (currentIndex.value < props.entries.length - 1) {
        return props.entries[currentIndex.value + 1];
      }
      return null;
    });
    const nextEntry = computed(() => {
      if (currentIndex.value > 0) {
        return props.entries[currentIndex.value - 1];
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
            _push2(ssrRenderComponent(_sfc_main$2, { width: "detail" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="mb-6"${_scopeId2}><h1 class="text-xl font-semibold tracking-tight text-foreground sm:text-2xl"${_scopeId2}>${ssrInterpolate(__props.entry.title)}</h1><div class="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground"${_scopeId2}><span class="inline-flex items-center gap-1.5"${_scopeId2}><svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"${_scopeId2}></path></svg><span${_scopeId2}>${ssrInterpolate(formatDate(__props.entry.entry_date))}</span></span>`);
                  if (__props.entry.status === "draft") {
                    _push3(`<span class="rounded-full bg-yellow-500/20 px-2 py-0.5 text-[10px] font-medium text-yellow-600 dark:text-yellow-400"${_scopeId2}> Taslak </span>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div></div>`);
                  if (__props.entry.image) {
                    _push3(`<div class="mb-8 overflow-hidden rounded-xl"${_scopeId2}><img${ssrRenderAttr("src", `/storage/${__props.entry.image}`)}${ssrRenderAttr("alt", __props.entry.title)} class="max-h-[500px] w-full object-cover"${_scopeId2}></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (__props.entry.description) {
                    _push3(`<div class="mb-8"${_scopeId2}><p class="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground sm:text-base"${_scopeId2}>${ssrInterpolate(__props.entry.description)}</p></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<div class="mt-10 flex items-center justify-between border-t border-border/60 pt-6"${_scopeId2}>`);
                  if (prevEntry.value) {
                    _push3(ssrRenderComponent(unref(Link), {
                      href: `/journey/${prevEntry.value.id}`,
                      class: "group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<svg class="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId3}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"${_scopeId3}></path></svg><span class="max-w-[150px] truncate sm:max-w-[200px]"${_scopeId3}>${ssrInterpolate(prevEntry.value.title)}</span>`);
                        } else {
                          return [
                            (openBlock(), createBlock("svg", {
                              class: "h-4 w-4 transition-transform group-hover:-translate-x-1",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M15 19l-7-7 7-7"
                              })
                            ])),
                            createVNode("span", { class: "max-w-[150px] truncate sm:max-w-[200px]" }, toDisplayString(prevEntry.value.title), 1)
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
                      class: "group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<span class="max-w-[150px] truncate sm:max-w-[200px]"${_scopeId3}>${ssrInterpolate(nextEntry.value.title)}</span><svg class="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId3}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"${_scopeId3}></path></svg>`);
                        } else {
                          return [
                            createVNode("span", { class: "max-w-[150px] truncate sm:max-w-[200px]" }, toDisplayString(nextEntry.value.title), 1),
                            (openBlock(), createBlock("svg", {
                              class: "h-4 w-4 transition-transform group-hover:translate-x-1",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
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
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "mb-6" }, [
                      createVNode("h1", { class: "text-xl font-semibold tracking-tight text-foreground sm:text-2xl" }, toDisplayString(__props.entry.title), 1),
                      createVNode("div", { class: "mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground" }, [
                        createVNode("span", { class: "inline-flex items-center gap-1.5" }, [
                          (openBlock(), createBlock("svg", {
                            class: "h-3.5 w-3.5",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            })
                          ])),
                          createVNode("span", null, toDisplayString(formatDate(__props.entry.entry_date)), 1)
                        ]),
                        __props.entry.status === "draft" ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "rounded-full bg-yellow-500/20 px-2 py-0.5 text-[10px] font-medium text-yellow-600 dark:text-yellow-400"
                        }, " Taslak ")) : createCommentVNode("", true)
                      ])
                    ]),
                    __props.entry.image ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "mb-8 overflow-hidden rounded-xl"
                    }, [
                      createVNode("img", {
                        src: `/storage/${__props.entry.image}`,
                        alt: __props.entry.title,
                        class: "max-h-[500px] w-full object-cover"
                      }, null, 8, ["src", "alt"])
                    ])) : createCommentVNode("", true),
                    __props.entry.description ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "mb-8"
                    }, [
                      createVNode("p", { class: "whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground sm:text-base" }, toDisplayString(__props.entry.description), 1)
                    ])) : createCommentVNode("", true),
                    createVNode("div", { class: "mt-10 flex items-center justify-between border-t border-border/60 pt-6" }, [
                      prevEntry.value ? (openBlock(), createBlock(unref(Link), {
                        key: 0,
                        href: `/journey/${prevEntry.value.id}`,
                        class: "group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock("svg", {
                            class: "h-4 w-4 transition-transform group-hover:-translate-x-1",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M15 19l-7-7 7-7"
                            })
                          ])),
                          createVNode("span", { class: "max-w-[150px] truncate sm:max-w-[200px]" }, toDisplayString(prevEntry.value.title), 1)
                        ]),
                        _: 1
                      }, 8, ["href"])) : (openBlock(), createBlock("div", { key: 1 })),
                      nextEntry.value ? (openBlock(), createBlock(unref(Link), {
                        key: 2,
                        href: `/journey/${nextEntry.value.id}`,
                        class: "group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                      }, {
                        default: withCtx(() => [
                          createVNode("span", { class: "max-w-[150px] truncate sm:max-w-[200px]" }, toDisplayString(nextEntry.value.title), 1),
                          (openBlock(), createBlock("svg", {
                            class: "h-4 w-4 transition-transform group-hover:translate-x-1",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
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
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, { width: "detail" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "mb-6" }, [
                    createVNode("h1", { class: "text-xl font-semibold tracking-tight text-foreground sm:text-2xl" }, toDisplayString(__props.entry.title), 1),
                    createVNode("div", { class: "mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground" }, [
                      createVNode("span", { class: "inline-flex items-center gap-1.5" }, [
                        (openBlock(), createBlock("svg", {
                          class: "h-3.5 w-3.5",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          })
                        ])),
                        createVNode("span", null, toDisplayString(formatDate(__props.entry.entry_date)), 1)
                      ]),
                      __props.entry.status === "draft" ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "rounded-full bg-yellow-500/20 px-2 py-0.5 text-[10px] font-medium text-yellow-600 dark:text-yellow-400"
                      }, " Taslak ")) : createCommentVNode("", true)
                    ])
                  ]),
                  __props.entry.image ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "mb-8 overflow-hidden rounded-xl"
                  }, [
                    createVNode("img", {
                      src: `/storage/${__props.entry.image}`,
                      alt: __props.entry.title,
                      class: "max-h-[500px] w-full object-cover"
                    }, null, 8, ["src", "alt"])
                  ])) : createCommentVNode("", true),
                  __props.entry.description ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "mb-8"
                  }, [
                    createVNode("p", { class: "whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground sm:text-base" }, toDisplayString(__props.entry.description), 1)
                  ])) : createCommentVNode("", true),
                  createVNode("div", { class: "mt-10 flex items-center justify-between border-t border-border/60 pt-6" }, [
                    prevEntry.value ? (openBlock(), createBlock(unref(Link), {
                      key: 0,
                      href: `/journey/${prevEntry.value.id}`,
                      class: "group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock("svg", {
                          class: "h-4 w-4 transition-transform group-hover:-translate-x-1",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M15 19l-7-7 7-7"
                          })
                        ])),
                        createVNode("span", { class: "max-w-[150px] truncate sm:max-w-[200px]" }, toDisplayString(prevEntry.value.title), 1)
                      ]),
                      _: 1
                    }, 8, ["href"])) : (openBlock(), createBlock("div", { key: 1 })),
                    nextEntry.value ? (openBlock(), createBlock(unref(Link), {
                      key: 2,
                      href: `/journey/${nextEntry.value.id}`,
                      class: "group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "max-w-[150px] truncate sm:max-w-[200px]" }, toDisplayString(nextEntry.value.title), 1),
                        (openBlock(), createBlock("svg", {
                          class: "h-4 w-4 transition-transform group-hover:translate-x-1",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
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
