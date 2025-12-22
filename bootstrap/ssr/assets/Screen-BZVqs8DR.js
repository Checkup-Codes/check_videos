import { withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, createCommentVNode, toDisplayString, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-juRHZR4N.js";
import { _ as _sfc_main$3 } from "./TopScreen-DnNmtdW-.js";
import { _ as _sfc_main$2 } from "./GoBackButton-u55EQwn1.js";
import "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "vuex";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const service = props.service;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, { url: "/services" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, { title: "Servis Detayı" }, null, _parent2, _scopeId));
            _push2(`<div class="rounded-lg border border-border bg-card shadow-sm"${_scopeId}><div class="p-6"${_scopeId}><div class="mb-6 flex items-center justify-between"${_scopeId}><div${_scopeId}><h1 class="text-2xl font-bold text-foreground"${_scopeId}>${ssrInterpolate(unref(service).name)}</h1>`);
            if (unref(service).description) {
              _push2(`<p class="mt-2 text-sm text-muted-foreground"${_scopeId}>${ssrInterpolate(unref(service).description)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: `/services/${unref(service).id}/edit`,
              class: "inline-flex h-9 items-center justify-center gap-2 rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"${_scopeId2}></path></svg> Düzenle `);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      class: "h-4 w-4",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor",
                      "stroke-width": "2"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      })
                    ])),
                    createTextVNode(" Düzenle ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="space-y-6 border-t border-border pt-6"${_scopeId}><div${_scopeId}><h4 class="text-xs font-medium text-muted-foreground"${_scopeId}>Fiyat</h4><p class="mt-1 text-sm font-semibold text-foreground"${_scopeId}>`);
            if (unref(service).price) {
              _push2(`<span${_scopeId}>${ssrInterpolate(unref(service).price)} USD</span>`);
            } else {
              _push2(`<span class="text-muted-foreground"${_scopeId}>Uygun Değil</span>`);
            }
            _push2(`</p></div>`);
            if (unref(service).parentCategory) {
              _push2(`<div class="space-y-4 border-t border-border pt-6"${_scopeId}><h3 class="text-sm font-semibold text-foreground"${_scopeId}>Üst Kategori</h3><div class="rounded-md border border-border bg-muted/30 p-4"${_scopeId}><h4 class="text-sm font-semibold text-foreground"${_scopeId}>${ssrInterpolate(unref(service).parentCategory.name)}</h4>`);
              if (unref(service).parentCategory.description) {
                _push2(`<p class="mt-1 text-sm text-muted-foreground"${_scopeId}>${ssrInterpolate(unref(service).parentCategory.description)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<p class="mt-2 text-sm font-semibold text-foreground"${_scopeId}> Fiyat: `);
              if (unref(service).parentCategory.price) {
                _push2(`<span${_scopeId}>${ssrInterpolate(unref(service).parentCategory.price)} USD</span>`);
              } else {
                _push2(`<span class="text-muted-foreground"${_scopeId}>Uygun Değil</span>`);
              }
              _push2(`</p></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(service).subCategories && unref(service).subCategories.length) {
              _push2(`<div class="space-y-4 border-t border-border pt-6"${_scopeId}><h3 class="text-sm font-semibold text-foreground"${_scopeId}>Alt Kategoriler</h3><ul class="space-y-3"${_scopeId}><!--[-->`);
              ssrRenderList(unref(service).subCategories, (subCategory) => {
                _push2(`<li class="rounded-md border-l-4 border-l-primary border border-border bg-card p-4"${_scopeId}><h4 class="text-sm font-semibold text-foreground"${_scopeId}>${ssrInterpolate(subCategory.name)}</h4>`);
                if (subCategory.description) {
                  _push2(`<p class="mt-1 text-sm text-muted-foreground"${_scopeId}>${ssrInterpolate(subCategory.description)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<p class="mt-2 text-sm font-semibold text-foreground"${_scopeId}> Fiyat: `);
                if (subCategory.price) {
                  _push2(`<span${_scopeId}>${ssrInterpolate(subCategory.price)} USD</span>`);
                } else {
                  _push2(`<span class="text-muted-foreground"${_scopeId}>Uygun Değil</span>`);
                }
                _push2(`</p></li>`);
              });
              _push2(`<!--]--></ul></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode(_sfc_main$2, { url: "/services" }),
              createVNode(_sfc_main$3, { title: "Servis Detayı" }),
              createVNode("div", { class: "rounded-lg border border-border bg-card shadow-sm" }, [
                createVNode("div", { class: "p-6" }, [
                  createVNode("div", { class: "mb-6 flex items-center justify-between" }, [
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-2xl font-bold text-foreground" }, toDisplayString(unref(service).name), 1),
                      unref(service).description ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "mt-2 text-sm text-muted-foreground"
                      }, toDisplayString(unref(service).description), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode(unref(Link), {
                      href: `/services/${unref(service).id}/edit`,
                      class: "inline-flex h-9 items-center justify-center gap-2 rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          class: "h-4 w-4",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor",
                          "stroke-width": "2"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          })
                        ])),
                        createTextVNode(" Düzenle ")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ]),
                  createVNode("div", { class: "space-y-6 border-t border-border pt-6" }, [
                    createVNode("div", null, [
                      createVNode("h4", { class: "text-xs font-medium text-muted-foreground" }, "Fiyat"),
                      createVNode("p", { class: "mt-1 text-sm font-semibold text-foreground" }, [
                        unref(service).price ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(unref(service).price) + " USD", 1)) : (openBlock(), createBlock("span", {
                          key: 1,
                          class: "text-muted-foreground"
                        }, "Uygun Değil"))
                      ])
                    ]),
                    unref(service).parentCategory ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "space-y-4 border-t border-border pt-6"
                    }, [
                      createVNode("h3", { class: "text-sm font-semibold text-foreground" }, "Üst Kategori"),
                      createVNode("div", { class: "rounded-md border border-border bg-muted/30 p-4" }, [
                        createVNode("h4", { class: "text-sm font-semibold text-foreground" }, toDisplayString(unref(service).parentCategory.name), 1),
                        unref(service).parentCategory.description ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-1 text-sm text-muted-foreground"
                        }, toDisplayString(unref(service).parentCategory.description), 1)) : createCommentVNode("", true),
                        createVNode("p", { class: "mt-2 text-sm font-semibold text-foreground" }, [
                          createTextVNode(" Fiyat: "),
                          unref(service).parentCategory.price ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(unref(service).parentCategory.price) + " USD", 1)) : (openBlock(), createBlock("span", {
                            key: 1,
                            class: "text-muted-foreground"
                          }, "Uygun Değil"))
                        ])
                      ])
                    ])) : createCommentVNode("", true),
                    unref(service).subCategories && unref(service).subCategories.length ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "space-y-4 border-t border-border pt-6"
                    }, [
                      createVNode("h3", { class: "text-sm font-semibold text-foreground" }, "Alt Kategoriler"),
                      createVNode("ul", { class: "space-y-3" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(service).subCategories, (subCategory) => {
                          return openBlock(), createBlock("li", {
                            key: subCategory.id,
                            class: "rounded-md border-l-4 border-l-primary border border-border bg-card p-4"
                          }, [
                            createVNode("h4", { class: "text-sm font-semibold text-foreground" }, toDisplayString(subCategory.name), 1),
                            subCategory.description ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "mt-1 text-sm text-muted-foreground"
                            }, toDisplayString(subCategory.description), 1)) : createCommentVNode("", true),
                            createVNode("p", { class: "mt-2 text-sm font-semibold text-foreground" }, [
                              createTextVNode(" Fiyat: "),
                              subCategory.price ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(subCategory.price) + " USD", 1)) : (openBlock(), createBlock("span", {
                                key: 1,
                                class: "text-muted-foreground"
                              }, "Uygun Değil"))
                            ])
                          ]);
                        }), 128))
                      ])
                    ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/Services/Show/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
