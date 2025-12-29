import { computed, withCtx, unref, createBlock, createVNode, openBlock, toDisplayString, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderStyle } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import _sfc_main$1 from "./LayoutJourney-DCMuX6bW.js";
import "./FlashMessage-C3JOGPFR.js";
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
            _push2(`<div class="mx-auto max-w-4xl"${_scopeId}><div class="bg-background transition-colors"${_scopeId}><div class="p-4 pt-6 sm:p-6 sm:pt-10 lg:p-8 lg:pt-12"${_scopeId}><div class="mb-6"${_scopeId}><h1 class="mb-3 text-3xl font-bold leading-tight text-foreground sm:text-4xl"${_scopeId}>${ssrInterpolate(__props.entry.title)}</h1><div class="flex flex-wrap items-center gap-3 text-sm"${_scopeId}><span class="inline-flex items-center gap-1.5 text-muted-foreground"${_scopeId}><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"${_scopeId}></path></svg><span class="font-medium"${_scopeId}>${ssrInterpolate(formatDate(__props.entry.entry_date))}</span></span>`);
            if (__props.entry.status === "draft") {
              _push2(`<span class="rounded-full bg-yellow-500/20 px-2.5 py-0.5 text-xs font-medium text-yellow-600 dark:text-yellow-400"${_scopeId}> Taslak </span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            if (__props.entry.image) {
              _push2(`<div class="mb-8 overflow-hidden rounded-xl"${_scopeId}><img${ssrRenderAttr("src", `/storage/${__props.entry.image}`)}${ssrRenderAttr("alt", __props.entry.title)} class="w-full object-cover" style="${ssrRenderStyle({ "max-height": "500px" })}"${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.entry.description) {
              _push2(`<div class="mb-8"${_scopeId}><p class="whitespace-pre-wrap text-base leading-relaxed text-muted-foreground sm:text-lg"${_scopeId}>${ssrInterpolate(__props.entry.description)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="mt-10 flex items-center justify-between border-t border-border/60 pt-6"${_scopeId}>`);
            if (prevEntry.value) {
              _push2(ssrRenderComponent(unref(Link), {
                href: `/journey/${prevEntry.value.id}`,
                class: "group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<svg class="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"${_scopeId2}></path></svg><span class="max-w-[150px] truncate sm:max-w-[200px]"${_scopeId2}>${ssrInterpolate(prevEntry.value.title)}</span>`);
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
              }, _parent2, _scopeId));
            } else {
              _push2(`<div${_scopeId}></div>`);
            }
            if (nextEntry.value) {
              _push2(ssrRenderComponent(unref(Link), {
                href: `/journey/${nextEntry.value.id}`,
                class: "group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span class="max-w-[150px] truncate sm:max-w-[200px]"${_scopeId2}>${ssrInterpolate(nextEntry.value.title)}</span><svg class="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"${_scopeId2}></path></svg>`);
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
              }, _parent2, _scopeId));
            } else {
              _push2(`<div${_scopeId}></div>`);
            }
            _push2(`</div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "mx-auto max-w-4xl" }, [
                createVNode("div", { class: "bg-background transition-colors" }, [
                  createVNode("div", { class: "p-4 pt-6 sm:p-6 sm:pt-10 lg:p-8 lg:pt-12" }, [
                    createVNode("div", { class: "mb-6" }, [
                      createVNode("h1", { class: "mb-3 text-3xl font-bold leading-tight text-foreground sm:text-4xl" }, toDisplayString(__props.entry.title), 1),
                      createVNode("div", { class: "flex flex-wrap items-center gap-3 text-sm" }, [
                        createVNode("span", { class: "inline-flex items-center gap-1.5 text-muted-foreground" }, [
                          (openBlock(), createBlock("svg", {
                            class: "h-4 w-4",
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
                          createVNode("span", { class: "font-medium" }, toDisplayString(formatDate(__props.entry.entry_date)), 1)
                        ]),
                        __props.entry.status === "draft" ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "rounded-full bg-yellow-500/20 px-2.5 py-0.5 text-xs font-medium text-yellow-600 dark:text-yellow-400"
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
                        class: "w-full object-cover",
                        style: { "max-height": "500px" }
                      }, null, 8, ["src", "alt"])
                    ])) : createCommentVNode("", true),
                    __props.entry.description ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "mb-8"
                    }, [
                      createVNode("p", { class: "whitespace-pre-wrap text-base leading-relaxed text-muted-foreground sm:text-lg" }, toDisplayString(__props.entry.description), 1)
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
                  ])
                ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Journey/ShowJourney.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
