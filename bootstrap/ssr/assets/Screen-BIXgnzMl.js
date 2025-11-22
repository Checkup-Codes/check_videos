import { computed, withCtx, createVNode, createBlock, createCommentVNode, toDisplayString, createTextVNode, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./CheckScreen-BjSTIeRu.js";
import { usePage } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const props = usePage().props;
    const version = computed(() => props.version || {});
    function formatDate(dateString) {
      if (!dateString) return "Tarih Yok";
      try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
          return dateString;
        }
        return new Intl.DateTimeFormat("tr-TR", {
          year: "numeric",
          month: "long",
          day: "numeric"
        }).format(date);
      } catch (error) {
        console.error("Tarih formatı hatası:", error);
        return dateString;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8"${_scopeId}><div class="mb-8"${_scopeId}><div class="mb-3 flex items-center gap-3"${_scopeId}><h1 class="text-2xl font-bold text-foreground sm:text-3xl"${_scopeId}>${ssrInterpolate(version.value.version)}</h1></div><div class="flex items-center gap-2"${_scopeId}><span class="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"${_scopeId}></path></svg> ${ssrInterpolate(formatDate(version.value.release_date))}</span></div></div>`);
            if (version.value.description) {
              _push2(`<div class="mb-8"${_scopeId}><div class="rounded-lg border border-border bg-card p-4 text-sm leading-relaxed text-foreground shadow-sm sm:p-5 sm:text-base"${_scopeId}>${ssrInterpolate(version.value.description)}</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="mb-8"${_scopeId}><div class="mb-4 flex items-center gap-2"${_scopeId}><div class="flex h-8 w-8 items-center justify-center rounded-md bg-green-500/10"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"${_scopeId}></path></svg></div><h2 class="text-lg font-semibold text-foreground sm:text-xl"${_scopeId}>Yeni Özellikler</h2>`);
            if (version.value.features && version.value.features.length > 0) {
              _push2(`<span class="ml-auto rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"${_scopeId}>${ssrInterpolate(version.value.features.length)}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (!version.value.features || version.value.features.length === 0) {
              _push2(`<div class="rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="mx-auto mb-2 h-8 w-8 text-muted-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg><p class="text-sm text-muted-foreground"${_scopeId}>Bu versiyonda yeni özellik bulunmamaktadır.</p></div>`);
            } else {
              _push2(`<div class="space-y-2"${_scopeId}><!--[-->`);
              ssrRenderList(version.value.features, (feature, index) => {
                _push2(`<div class="group relative overflow-hidden rounded-lg border border-border bg-card p-4 transition-all duration-200 hover:border-green-500/30 hover:bg-accent hover:shadow-sm sm:p-5"${_scopeId}><div class="flex items-start gap-3"${_scopeId}><div class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-green-500/10 transition-colors group-hover:bg-green-500/20"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"${_scopeId}></path></svg></div><div class="min-w-0 flex-1"${_scopeId}><h3 class="mb-1 text-sm font-semibold text-foreground sm:text-base"${_scopeId}>${ssrInterpolate(feature.feature_name)}</h3>`);
                if (feature.feature_detail) {
                  _push2(`<p class="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground"${_scopeId}>${ssrInterpolate(feature.feature_detail)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div></div>`);
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`</div><div${_scopeId}><div class="mb-4 flex items-center gap-2"${_scopeId}><div class="flex h-8 w-8 items-center justify-center rounded-md bg-destructive/10"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg></div><h2 class="text-lg font-semibold text-foreground sm:text-xl"${_scopeId}>Düzeltilen Hatalar</h2>`);
            if (version.value.bugs && version.value.bugs.length > 0) {
              _push2(`<span class="ml-auto rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"${_scopeId}>${ssrInterpolate(version.value.bugs.length)}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (!version.value.bugs || version.value.bugs.length === 0) {
              _push2(`<div class="rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="mx-auto mb-2 h-8 w-8 text-muted-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg><p class="text-sm text-muted-foreground"${_scopeId}>Bu versiyonda düzeltilen hata bulunmamaktadır.</p></div>`);
            } else {
              _push2(`<div class="space-y-2"${_scopeId}><!--[-->`);
              ssrRenderList(version.value.bugs, (bug, index) => {
                _push2(`<div class="group relative overflow-hidden rounded-lg border border-border bg-card p-4 transition-all duration-200 hover:border-destructive/30 hover:bg-accent hover:shadow-sm sm:p-5"${_scopeId}><div class="flex items-start gap-3"${_scopeId}><div class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-destructive/10 transition-colors group-hover:bg-destructive/20"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg></div><div class="min-w-0 flex-1"${_scopeId}><h3 class="mb-1 text-sm font-semibold text-foreground sm:text-base"${_scopeId}>${ssrInterpolate(bug.bug_name)}</h3>`);
                if (bug.bug_detail) {
                  _push2(`<p class="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground"${_scopeId}>${ssrInterpolate(bug.bug_detail)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div></div>`);
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8" }, [
                createVNode("div", { class: "mb-8" }, [
                  createVNode("div", { class: "mb-3 flex items-center gap-3" }, [
                    createVNode("h1", { class: "text-2xl font-bold text-foreground sm:text-3xl" }, toDisplayString(version.value.version), 1)
                  ]),
                  createVNode("div", { class: "flex items-center gap-2" }, [
                    createVNode("span", { class: "inline-flex items-center gap-1.5 rounded-md border border-border bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground" }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "h-3.5 w-3.5",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        "stroke-width": "2"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        })
                      ])),
                      createTextVNode(" " + toDisplayString(formatDate(version.value.release_date)), 1)
                    ])
                  ])
                ]),
                version.value.description ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "mb-8"
                }, [
                  createVNode("div", { class: "rounded-lg border border-border bg-card p-4 text-sm leading-relaxed text-foreground shadow-sm sm:p-5 sm:text-base" }, toDisplayString(version.value.description), 1)
                ])) : createCommentVNode("", true),
                createVNode("div", { class: "mb-8" }, [
                  createVNode("div", { class: "mb-4 flex items-center gap-2" }, [
                    createVNode("div", { class: "flex h-8 w-8 items-center justify-center rounded-md bg-green-500/10" }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "h-4 w-4 text-green-500",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        "stroke-width": "2.5"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M5 13l4 4L19 7"
                        })
                      ]))
                    ]),
                    createVNode("h2", { class: "text-lg font-semibold text-foreground sm:text-xl" }, "Yeni Özellikler"),
                    version.value.features && version.value.features.length > 0 ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "ml-auto rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
                    }, toDisplayString(version.value.features.length), 1)) : createCommentVNode("", true)
                  ]),
                  !version.value.features || version.value.features.length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center"
                  }, [
                    (openBlock(), createBlock("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      class: "mx-auto mb-2 h-8 w-8 text-muted-foreground/50",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor",
                      "stroke-width": "1.5"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        d: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      })
                    ])),
                    createVNode("p", { class: "text-sm text-muted-foreground" }, "Bu versiyonda yeni özellik bulunmamaktadır.")
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "space-y-2"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(version.value.features, (feature, index) => {
                      return openBlock(), createBlock("div", {
                        key: `feature-${index}`,
                        class: "group relative overflow-hidden rounded-lg border border-border bg-card p-4 transition-all duration-200 hover:border-green-500/30 hover:bg-accent hover:shadow-sm sm:p-5"
                      }, [
                        createVNode("div", { class: "flex items-start gap-3" }, [
                          createVNode("div", { class: "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-green-500/10 transition-colors group-hover:bg-green-500/20" }, [
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              class: "h-3.5 w-3.5 text-green-500",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              stroke: "currentColor",
                              "stroke-width": "2.5"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                d: "M5 13l4 4L19 7"
                              })
                            ]))
                          ]),
                          createVNode("div", { class: "min-w-0 flex-1" }, [
                            createVNode("h3", { class: "mb-1 text-sm font-semibold text-foreground sm:text-base" }, toDisplayString(feature.feature_name), 1),
                            feature.feature_detail ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground"
                            }, toDisplayString(feature.feature_detail), 1)) : createCommentVNode("", true)
                          ])
                        ])
                      ]);
                    }), 128))
                  ]))
                ]),
                createVNode("div", null, [
                  createVNode("div", { class: "mb-4 flex items-center gap-2" }, [
                    createVNode("div", { class: "flex h-8 w-8 items-center justify-center rounded-md bg-destructive/10" }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "h-4 w-4 text-destructive",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        "stroke-width": "2.5"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M6 18L18 6M6 6l12 12"
                        })
                      ]))
                    ]),
                    createVNode("h2", { class: "text-lg font-semibold text-foreground sm:text-xl" }, "Düzeltilen Hatalar"),
                    version.value.bugs && version.value.bugs.length > 0 ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "ml-auto rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
                    }, toDisplayString(version.value.bugs.length), 1)) : createCommentVNode("", true)
                  ]),
                  !version.value.bugs || version.value.bugs.length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center"
                  }, [
                    (openBlock(), createBlock("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      class: "mx-auto mb-2 h-8 w-8 text-muted-foreground/50",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor",
                      "stroke-width": "1.5"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        d: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      })
                    ])),
                    createVNode("p", { class: "text-sm text-muted-foreground" }, "Bu versiyonda düzeltilen hata bulunmamaktadır.")
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "space-y-2"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(version.value.bugs, (bug, index) => {
                      return openBlock(), createBlock("div", {
                        key: `bug-${index}`,
                        class: "group relative overflow-hidden rounded-lg border border-border bg-card p-4 transition-all duration-200 hover:border-destructive/30 hover:bg-accent hover:shadow-sm sm:p-5"
                      }, [
                        createVNode("div", { class: "flex items-start gap-3" }, [
                          createVNode("div", { class: "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-destructive/10 transition-colors group-hover:bg-destructive/20" }, [
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              class: "h-3.5 w-3.5 text-destructive",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              stroke: "currentColor",
                              "stroke-width": "2.5"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                d: "M6 18L18 6M6 6l12 12"
                              })
                            ]))
                          ]),
                          createVNode("div", { class: "min-w-0 flex-1" }, [
                            createVNode("h3", { class: "mb-1 text-sm font-semibold text-foreground sm:text-base" }, toDisplayString(bug.bug_name), 1),
                            bug.bug_detail ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground"
                            }, toDisplayString(bug.bug_detail), 1)) : createCommentVNode("", true)
                          ])
                        ])
                      ]);
                    }), 128))
                  ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/FBVersions/Versions/Show/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
