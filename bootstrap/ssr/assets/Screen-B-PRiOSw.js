import { withCtx, unref, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-DjaYf9so.js";
/* empty css                      */
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const service = props.service;
    const formatPrice = (price) => {
      if (!price) return "₺0";
      return new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", minimumFractionDigits: 0 }).format(price);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mx-auto max-w-4xl"${_scopeId}><div class="mb-6"${_scopeId}><h1 class="text-2xl font-bold text-foreground"${_scopeId}>${ssrInterpolate(unref(service).name)}</h1>`);
            if (unref(service).price) {
              _push2(`<div class="mt-2 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 px-4 py-2"${_scopeId}><svg class="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg><span class="text-sm font-semibold text-primary"${_scopeId}>${ssrInterpolate(formatPrice(unref(service).price))}</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (unref(service).description) {
              _push2(`<div class="quill-content prose prose-sm dark:prose-invert mb-6 rounded-lg border border-border bg-card p-6"${_scopeId}>${unref(service).description ?? ""}</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(service).parentCategory) {
              _push2(`<div class="mb-6"${_scopeId}><h3 class="mb-3 text-sm font-semibold text-foreground"${_scopeId}>Üst Kategori</h3><div class="rounded-lg border border-border bg-card p-4"${_scopeId}><div class="flex items-start justify-between gap-3"${_scopeId}><div class="flex-1"${_scopeId}><h4 class="text-sm font-semibold text-foreground"${_scopeId}>${ssrInterpolate(unref(service).parentCategory.name)}</h4>`);
              if (unref(service).parentCategory.description) {
                _push2(`<div class="quill-content prose prose-sm dark:prose-invert mt-2"${_scopeId}>${unref(service).parentCategory.description ?? ""}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
              if (unref(service).parentCategory.price) {
                _push2(`<div class="shrink-0 rounded-md bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary"${_scopeId}>${ssrInterpolate(formatPrice(unref(service).parentCategory.price))}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(service).subCategories && unref(service).subCategories.length) {
              _push2(`<div class="mb-6"${_scopeId}><h3 class="mb-3 text-sm font-semibold text-foreground"${_scopeId}>Alt Hizmetler</h3><ul class="space-y-2"${_scopeId}><!--[-->`);
              ssrRenderList(unref(service).subCategories, (subCategory) => {
                _push2(`<li class="group rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-sm"${_scopeId}><div class="flex items-start justify-between gap-3"${_scopeId}><div class="flex-1"${_scopeId}><h4 class="text-sm font-semibold text-foreground group-hover:text-primary transition-colors"${_scopeId}>${ssrInterpolate(subCategory.name)}</h4>`);
                if (subCategory.description) {
                  _push2(`<div class="quill-content prose prose-sm dark:prose-invert mt-2"${_scopeId}>${subCategory.description ?? ""}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
                if (subCategory.price) {
                  _push2(`<div class="shrink-0 rounded-md bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary"${_scopeId}>${ssrInterpolate(formatPrice(subCategory.price))}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></li>`);
              });
              _push2(`<!--]--></ul></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "mx-auto max-w-4xl" }, [
                createVNode("div", { class: "mb-6" }, [
                  createVNode("h1", { class: "text-2xl font-bold text-foreground" }, toDisplayString(unref(service).name), 1),
                  unref(service).price ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "mt-2 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 px-4 py-2"
                  }, [
                    (openBlock(), createBlock("svg", {
                      class: "h-4 w-4 text-primary",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      })
                    ])),
                    createVNode("span", { class: "text-sm font-semibold text-primary" }, toDisplayString(formatPrice(unref(service).price)), 1)
                  ])) : createCommentVNode("", true)
                ]),
                unref(service).description ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "quill-content prose prose-sm dark:prose-invert mb-6 rounded-lg border border-border bg-card p-6",
                  innerHTML: unref(service).description
                }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
                unref(service).parentCategory ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "mb-6"
                }, [
                  createVNode("h3", { class: "mb-3 text-sm font-semibold text-foreground" }, "Üst Kategori"),
                  createVNode("div", { class: "rounded-lg border border-border bg-card p-4" }, [
                    createVNode("div", { class: "flex items-start justify-between gap-3" }, [
                      createVNode("div", { class: "flex-1" }, [
                        createVNode("h4", { class: "text-sm font-semibold text-foreground" }, toDisplayString(unref(service).parentCategory.name), 1),
                        unref(service).parentCategory.description ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "quill-content prose prose-sm dark:prose-invert mt-2",
                          innerHTML: unref(service).parentCategory.description
                        }, null, 8, ["innerHTML"])) : createCommentVNode("", true)
                      ]),
                      unref(service).parentCategory.price ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "shrink-0 rounded-md bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary"
                      }, toDisplayString(formatPrice(unref(service).parentCategory.price)), 1)) : createCommentVNode("", true)
                    ])
                  ])
                ])) : createCommentVNode("", true),
                unref(service).subCategories && unref(service).subCategories.length ? (openBlock(), createBlock("div", {
                  key: 2,
                  class: "mb-6"
                }, [
                  createVNode("h3", { class: "mb-3 text-sm font-semibold text-foreground" }, "Alt Hizmetler"),
                  createVNode("ul", { class: "space-y-2" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(service).subCategories, (subCategory) => {
                      return openBlock(), createBlock("li", {
                        key: subCategory.id,
                        class: "group rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-sm"
                      }, [
                        createVNode("div", { class: "flex items-start justify-between gap-3" }, [
                          createVNode("div", { class: "flex-1" }, [
                            createVNode("h4", { class: "text-sm font-semibold text-foreground group-hover:text-primary transition-colors" }, toDisplayString(subCategory.name), 1),
                            subCategory.description ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "quill-content prose prose-sm dark:prose-invert mt-2",
                              innerHTML: subCategory.description
                            }, null, 8, ["innerHTML"])) : createCommentVNode("", true)
                          ]),
                          subCategory.price ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "shrink-0 rounded-md bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary"
                          }, toDisplayString(formatPrice(subCategory.price)), 1)) : createCommentVNode("", true)
                        ])
                      ]);
                    }), 128))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/Services/Show/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
