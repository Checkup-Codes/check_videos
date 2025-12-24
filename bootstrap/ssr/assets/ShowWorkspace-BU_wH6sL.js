import { withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, Fragment, renderList, createCommentVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-DjaYf9so.js";
const _sfc_main = {
  __name: "ShowWorkspace",
  __ssrInlineRender: true,
  props: {
    workspace: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mx-auto max-w-6xl py-8"${_scopeId}><div class="mb-6"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/workspace",
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
            if (__props.workspace.images && __props.workspace.images.length > 0) {
              _push2(`<div class="grid grid-cols-1 gap-2 p-4 md:grid-cols-2 lg:grid-cols-3"${_scopeId}><!--[-->`);
              ssrRenderList(__props.workspace.images, (image, index) => {
                _push2(`<div class="group relative overflow-hidden rounded-lg"${_scopeId}><img${ssrRenderAttr("src", `/storage/${image}`)}${ssrRenderAttr("alt", `Çalışma Alanı Resim ${index + 1}`)} class="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"${_scopeId}></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div class="flex aspect-video items-center justify-center bg-muted"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-muted-foreground/30" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"${_scopeId}></path></svg></div>`);
            }
            _push2(`<div class="p-6 sm:p-8"${_scopeId}><div class="mb-4 flex flex-wrap items-center gap-3"${_scopeId}>`);
            if (__props.workspace.status === "draft") {
              _push2(`<span class="rounded-full bg-yellow-500/20 px-3 py-1 text-sm font-medium text-yellow-600 dark:text-yellow-400"${_scopeId}> Taslak </span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (__props.workspace.products && __props.workspace.products.length > 0) {
              _push2(`<div class="mt-8"${_scopeId}><h2 class="mb-6 text-2xl font-bold tracking-tight text-foreground"${_scopeId}>Ürünler</h2><ul class="space-y-3"${_scopeId}><!--[-->`);
              ssrRenderList(__props.workspace.products, (product) => {
                _push2(`<li class="flex items-start justify-between gap-4 rounded-lg border border-border bg-background p-4 transition-all hover:border-primary/50 hover:shadow-sm"${_scopeId}><div class="flex-1"${_scopeId}><h3 class="mb-1 text-lg font-semibold text-foreground"${_scopeId}>${ssrInterpolate(product.name)}</h3>`);
                if (product.features) {
                  _push2(`<p class="text-sm leading-relaxed text-muted-foreground whitespace-pre-line"${_scopeId}>${ssrInterpolate(product.features)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
                if (product.link) {
                  _push2(`<div class="flex-shrink-0"${_scopeId}><a${ssrRenderAttr("href", product.link)} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"${_scopeId}><span${_scopeId}>Satın Al</span><svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"${_scopeId}></path></svg></a></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</li>`);
              });
              _push2(`<!--]--></ul></div>`);
            } else {
              _push2(`<div class="mt-8 rounded-lg border border-dashed border-border bg-muted/30 py-8 text-center"${_scopeId}><p class="text-sm text-muted-foreground"${_scopeId}>Henüz ürün eklenmemiş.</p></div>`);
            }
            _push2(`</div></article></div>`);
          } else {
            return [
              createVNode("div", { class: "mx-auto max-w-6xl py-8" }, [
                createVNode("div", { class: "mb-6" }, [
                  createVNode(unref(Link), {
                    href: "/workspace",
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
                  __props.workspace.images && __props.workspace.images.length > 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "grid grid-cols-1 gap-2 p-4 md:grid-cols-2 lg:grid-cols-3"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.workspace.images, (image, index) => {
                      return openBlock(), createBlock("div", {
                        key: index,
                        class: "group relative overflow-hidden rounded-lg"
                      }, [
                        createVNode("img", {
                          src: `/storage/${image}`,
                          alt: `Çalışma Alanı Resim ${index + 1}`,
                          class: "h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        }, null, 8, ["src", "alt"])
                      ]);
                    }), 128))
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "flex aspect-video items-center justify-center bg-muted"
                  }, [
                    (openBlock(), createBlock("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      class: "h-16 w-16 text-muted-foreground/30",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "1",
                        d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      })
                    ]))
                  ])),
                  createVNode("div", { class: "p-6 sm:p-8" }, [
                    createVNode("div", { class: "mb-4 flex flex-wrap items-center gap-3" }, [
                      __props.workspace.status === "draft" ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "rounded-full bg-yellow-500/20 px-3 py-1 text-sm font-medium text-yellow-600 dark:text-yellow-400"
                      }, " Taslak ")) : createCommentVNode("", true)
                    ]),
                    __props.workspace.products && __props.workspace.products.length > 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "mt-8"
                    }, [
                      createVNode("h2", { class: "mb-6 text-2xl font-bold tracking-tight text-foreground" }, "Ürünler"),
                      createVNode("ul", { class: "space-y-3" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.workspace.products, (product) => {
                          return openBlock(), createBlock("li", {
                            key: product.id,
                            class: "flex items-start justify-between gap-4 rounded-lg border border-border bg-background p-4 transition-all hover:border-primary/50 hover:shadow-sm"
                          }, [
                            createVNode("div", { class: "flex-1" }, [
                              createVNode("h3", { class: "mb-1 text-lg font-semibold text-foreground" }, toDisplayString(product.name), 1),
                              product.features ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm leading-relaxed text-muted-foreground whitespace-pre-line"
                              }, toDisplayString(product.features), 1)) : createCommentVNode("", true)
                            ]),
                            product.link ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "flex-shrink-0"
                            }, [
                              createVNode("a", {
                                href: product.link,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                class: "inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                              }, [
                                createVNode("span", null, "Satın Al"),
                                (openBlock(), createBlock("svg", {
                                  xmlns: "http://www.w3.org/2000/svg",
                                  class: "h-3.5 w-3.5",
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
                            ])) : createCommentVNode("", true)
                          ]);
                        }), 128))
                      ])
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "mt-8 rounded-lg border border-dashed border-border bg-muted/30 py-8 text-center"
                    }, [
                      createVNode("p", { class: "text-sm text-muted-foreground" }, "Henüz ürün eklenmemiş.")
                    ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Workspace/ShowWorkspace.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
