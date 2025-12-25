import { withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, createCommentVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-DjaYf9so.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  props: {
    bookmark: {
      type: Object,
      required: true
    },
    categories: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    const getDomain = (url) => {
      try {
        const urlObj = new URL(url);
        return urlObj.hostname.replace("www.", "");
      } catch {
        return url;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mx-auto max-w-3xl py-8"${_scopeId}><div class="mb-6"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/bookmarks",
              class: "inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"${_scopeId2}></path></svg> Geri `);
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
            }, _parent2, _scopeId));
            _push2(`</div><article class="overflow-hidden rounded-xl border border-border bg-card shadow-sm"${_scopeId}>`);
            if (__props.bookmark.preview_image) {
              _push2(`<div class="aspect-video overflow-hidden"${_scopeId}><img${ssrRenderAttr("src", __props.bookmark.preview_image)}${ssrRenderAttr("alt", __props.bookmark.name)} class="h-full w-full object-cover"${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="p-6 sm:p-8"${_scopeId}><div class="mb-4"${_scopeId}>`);
            if (__props.bookmark.category) {
              _push2(`<span class="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"${_scopeId}>${ssrInterpolate(__props.bookmark.category.name)}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><h1 class="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"${_scopeId}>${ssrInterpolate(__props.bookmark.name)}</h1><div class="mb-6"${_scopeId}><a${ssrRenderAttr("href", __props.bookmark.link)} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-primary transition-colors hover:text-primary/80"${_scopeId}><span${_scopeId}>${ssrInterpolate(getDomain(__props.bookmark.link))}</span><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"${_scopeId}></path></svg></a></div>`);
            if (__props.bookmark.description) {
              _push2(`<div class="mb-6"${_scopeId}><h2 class="mb-2 text-lg font-semibold text-foreground"${_scopeId}>Açıklama</h2><p class="whitespace-pre-wrap text-base leading-relaxed text-muted-foreground"${_scopeId}>${ssrInterpolate(__props.bookmark.description)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.bookmark.my_comment) {
              _push2(`<div class="mb-6 rounded-lg border border-border bg-muted/50 p-4"${_scopeId}><h2 class="mb-2 text-lg font-semibold text-foreground"${_scopeId}>Kendi Yorumum</h2><p class="whitespace-pre-wrap text-base leading-relaxed text-foreground"${_scopeId}>${ssrInterpolate(__props.bookmark.my_comment)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.bookmark.extended_comment_link) {
              _push2(`<div class="mb-6"${_scopeId}><a${ssrRenderAttr("href", __props.bookmark.extended_comment_link)} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"${_scopeId}></path></svg> Detaylı Yorumu Görüntüle </a></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex items-center gap-3 border-t border-border pt-6"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: `/bookmarks/${__props.bookmark.id}/edit`,
              class: "inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"${_scopeId2}></path></svg> Düzenle `);
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
                        d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      })
                    ])),
                    createTextVNode(" Düzenle ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<a${ssrRenderAttr("href", __props.bookmark.link)} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"${_scopeId}></path></svg> Siteyi Aç </a></div></div></article></div>`);
          } else {
            return [
              createVNode("div", { class: "mx-auto max-w-3xl py-8" }, [
                createVNode("div", { class: "mb-6" }, [
                  createVNode(unref(Link), {
                    href: "/bookmarks",
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
                  __props.bookmark.preview_image ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "aspect-video overflow-hidden"
                  }, [
                    createVNode("img", {
                      src: __props.bookmark.preview_image,
                      alt: __props.bookmark.name,
                      class: "h-full w-full object-cover"
                    }, null, 8, ["src", "alt"])
                  ])) : createCommentVNode("", true),
                  createVNode("div", { class: "p-6 sm:p-8" }, [
                    createVNode("div", { class: "mb-4" }, [
                      __props.bookmark.category ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                      }, toDisplayString(__props.bookmark.category.name), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("h1", { class: "mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl" }, toDisplayString(__props.bookmark.name), 1),
                    createVNode("div", { class: "mb-6" }, [
                      createVNode("a", {
                        href: __props.bookmark.link,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        class: "inline-flex items-center gap-2 text-primary transition-colors hover:text-primary/80"
                      }, [
                        createVNode("span", null, toDisplayString(getDomain(__props.bookmark.link)), 1),
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
                            d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          })
                        ]))
                      ], 8, ["href"])
                    ]),
                    __props.bookmark.description ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "mb-6"
                    }, [
                      createVNode("h2", { class: "mb-2 text-lg font-semibold text-foreground" }, "Açıklama"),
                      createVNode("p", { class: "whitespace-pre-wrap text-base leading-relaxed text-muted-foreground" }, toDisplayString(__props.bookmark.description), 1)
                    ])) : createCommentVNode("", true),
                    __props.bookmark.my_comment ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "mb-6 rounded-lg border border-border bg-muted/50 p-4"
                    }, [
                      createVNode("h2", { class: "mb-2 text-lg font-semibold text-foreground" }, "Kendi Yorumum"),
                      createVNode("p", { class: "whitespace-pre-wrap text-base leading-relaxed text-foreground" }, toDisplayString(__props.bookmark.my_comment), 1)
                    ])) : createCommentVNode("", true),
                    __props.bookmark.extended_comment_link ? (openBlock(), createBlock("div", {
                      key: 2,
                      class: "mb-6"
                    }, [
                      createVNode("a", {
                        href: __props.bookmark.extended_comment_link,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        class: "inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                      }, [
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
                            d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          })
                        ])),
                        createTextVNode(" Detaylı Yorumu Görüntüle ")
                      ], 8, ["href"])
                    ])) : createCommentVNode("", true),
                    createVNode("div", { class: "flex items-center gap-3 border-t border-border pt-6" }, [
                      createVNode(unref(Link), {
                        href: `/bookmarks/${__props.bookmark.id}/edit`,
                        class: "inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
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
                              d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            })
                          ])),
                          createTextVNode(" Düzenle ")
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode("a", {
                        href: __props.bookmark.link,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        class: "inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                      }, [
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
                            d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          })
                        ])),
                        createTextVNode(" Siteyi Aç ")
                      ], 8, ["href"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Bookmarks/Show/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
