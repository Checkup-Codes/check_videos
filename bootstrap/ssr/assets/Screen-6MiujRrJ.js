import { withCtx, unref, createVNode, createBlock, createCommentVNode, toDisplayString, openBlock, createTextVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-DjaYf9so.js";
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
    const formatPrice = (price) => {
      if (!price) return "Uygun Değil";
      return new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", minimumFractionDigits: 2 }).format(price);
    };
    const formatDescription = (text) => {
      if (!text) return "";
      return text.replace(/\n/g, "<br>").replace(/  /g, " &nbsp;");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mx-auto max-w-4xl"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, { url: "/services" }, null, _parent2, _scopeId));
            _push2(`<div class="mt-6"${_scopeId}><h1 class="text-2xl font-bold text-foreground"${_scopeId}>${ssrInterpolate(unref(service).name)}</h1>`);
            if (unref(service).description) {
              _push2(`<div class="mt-4 whitespace-pre-wrap rounded-lg border border-border bg-muted/30 p-4 text-sm leading-relaxed text-foreground"${_scopeId}>${formatDescription(unref(service).description) ?? ""}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="mt-6 space-y-6 rounded-lg border border-border bg-card p-6 shadow-sm"${_scopeId}><div${_scopeId}><h4 class="text-xs font-medium text-muted-foreground"${_scopeId}>Fiyat</h4><p class="mt-1 text-sm font-semibold text-foreground"${_scopeId}>`);
            if (unref(service).price) {
              _push2(`<span${_scopeId}>${ssrInterpolate(formatPrice(unref(service).price))}</span>`);
            } else {
              _push2(`<span class="text-muted-foreground"${_scopeId}>Uygun Değil</span>`);
            }
            _push2(`</p></div>`);
            if (unref(service).parentCategory) {
              _push2(`<div class="border-t border-border pt-6"${_scopeId}><h3 class="mb-4 text-sm font-semibold text-foreground"${_scopeId}>Üst Kategori</h3><div class="rounded-md border border-border bg-muted/30 p-4"${_scopeId}><h4 class="text-sm font-semibold text-foreground"${_scopeId}>${ssrInterpolate(unref(service).parentCategory.name)}</h4>`);
              if (unref(service).parentCategory.description) {
                _push2(`<div class="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground"${_scopeId}>${formatDescription(unref(service).parentCategory.description) ?? ""}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<p class="mt-3 text-sm font-semibold text-foreground"${_scopeId}> Fiyat: `);
              if (unref(service).parentCategory.price) {
                _push2(`<span${_scopeId}>${ssrInterpolate(formatPrice(unref(service).parentCategory.price))}</span>`);
              } else {
                _push2(`<span class="text-muted-foreground"${_scopeId}>Uygun Değil</span>`);
              }
              _push2(`</p></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(service).subCategories && unref(service).subCategories.length) {
              _push2(`<div class="border-t border-border pt-6"${_scopeId}><h3 class="mb-4 text-sm font-semibold text-foreground"${_scopeId}>Alt Kategoriler</h3><ul class="space-y-3"${_scopeId}><!--[-->`);
              ssrRenderList(unref(service).subCategories, (subCategory) => {
                _push2(`<li class="rounded-md border-l-4 border-l-primary border border-border bg-card p-4"${_scopeId}><h4 class="text-sm font-semibold text-foreground"${_scopeId}>${ssrInterpolate(subCategory.name)}</h4>`);
                if (subCategory.description) {
                  _push2(`<div class="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground"${_scopeId}>${formatDescription(subCategory.description) ?? ""}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<p class="mt-3 text-sm font-semibold text-foreground"${_scopeId}> Fiyat: `);
                if (subCategory.price) {
                  _push2(`<span${_scopeId}>${ssrInterpolate(formatPrice(subCategory.price))}</span>`);
                } else {
                  _push2(`<span class="text-muted-foreground"${_scopeId}>Uygun Değil</span>`);
                }
                _push2(`</p></li>`);
              });
              _push2(`<!--]--></ul></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "mx-auto max-w-4xl" }, [
                createVNode(_sfc_main$2, { url: "/services" }),
                createVNode("div", { class: "mt-6" }, [
                  createVNode("h1", { class: "text-2xl font-bold text-foreground" }, toDisplayString(unref(service).name), 1),
                  unref(service).description ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "mt-4 whitespace-pre-wrap rounded-lg border border-border bg-muted/30 p-4 text-sm leading-relaxed text-foreground",
                    innerHTML: formatDescription(unref(service).description)
                  }, null, 8, ["innerHTML"])) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "mt-6 space-y-6 rounded-lg border border-border bg-card p-6 shadow-sm" }, [
                  createVNode("div", null, [
                    createVNode("h4", { class: "text-xs font-medium text-muted-foreground" }, "Fiyat"),
                    createVNode("p", { class: "mt-1 text-sm font-semibold text-foreground" }, [
                      unref(service).price ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(formatPrice(unref(service).price)), 1)) : (openBlock(), createBlock("span", {
                        key: 1,
                        class: "text-muted-foreground"
                      }, "Uygun Değil"))
                    ])
                  ]),
                  unref(service).parentCategory ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "border-t border-border pt-6"
                  }, [
                    createVNode("h3", { class: "mb-4 text-sm font-semibold text-foreground" }, "Üst Kategori"),
                    createVNode("div", { class: "rounded-md border border-border bg-muted/30 p-4" }, [
                      createVNode("h4", { class: "text-sm font-semibold text-foreground" }, toDisplayString(unref(service).parentCategory.name), 1),
                      unref(service).parentCategory.description ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mt-2 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground",
                        innerHTML: formatDescription(unref(service).parentCategory.description)
                      }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
                      createVNode("p", { class: "mt-3 text-sm font-semibold text-foreground" }, [
                        createTextVNode(" Fiyat: "),
                        unref(service).parentCategory.price ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(formatPrice(unref(service).parentCategory.price)), 1)) : (openBlock(), createBlock("span", {
                          key: 1,
                          class: "text-muted-foreground"
                        }, "Uygun Değil"))
                      ])
                    ])
                  ])) : createCommentVNode("", true),
                  unref(service).subCategories && unref(service).subCategories.length ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "border-t border-border pt-6"
                  }, [
                    createVNode("h3", { class: "mb-4 text-sm font-semibold text-foreground" }, "Alt Kategoriler"),
                    createVNode("ul", { class: "space-y-3" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(service).subCategories, (subCategory) => {
                        return openBlock(), createBlock("li", {
                          key: subCategory.id,
                          class: "rounded-md border-l-4 border-l-primary border border-border bg-card p-4"
                        }, [
                          createVNode("h4", { class: "text-sm font-semibold text-foreground" }, toDisplayString(subCategory.name), 1),
                          subCategory.description ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-2 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground",
                            innerHTML: formatDescription(subCategory.description)
                          }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
                          createVNode("p", { class: "mt-3 text-sm font-semibold text-foreground" }, [
                            createTextVNode(" Fiyat: "),
                            subCategory.price ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(formatPrice(subCategory.price)), 1)) : (openBlock(), createBlock("span", {
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
