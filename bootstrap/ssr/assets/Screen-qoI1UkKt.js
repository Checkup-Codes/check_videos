import { computed, withCtx, createVNode, openBlock, createBlock, toDisplayString, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import _sfc_main$2 from "./ServiceItem-BzmUCtt2.js";
import { _ as _sfc_main$1 } from "./CheckScreen-DjaYf9so.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const services = computed(() => props.services || []);
    const parents = computed(() => services.value.filter((service) => service.sub_category_id === null));
    const averagePrice = computed(() => {
      const servicesWithPrice = services.value.filter((s) => s.price && s.price > 0);
      if (servicesWithPrice.length === 0) return "₺0";
      const total = servicesWithPrice.reduce((sum, s) => sum + parseFloat(s.price), 0);
      const avg = total / servicesWithPrice.length;
      return new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", minimumFractionDigits: 0 }).format(avg);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="min-h-screen bg-background"${_scopeId}><div class="mx-auto max-w-5xl px-4 py-6 sm:px-6"${_scopeId}><div class="mb-6"${_scopeId}><h1 class="text-xl font-semibold text-foreground"${_scopeId}>Hizmetlerimiz</h1><p class="mt-1 text-xs text-muted-foreground"${_scopeId}>Sunduğumuz profesyonel hizmetler</p></div>`);
            if (services.value.length > 0) {
              _push2(`<div class="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4"${_scopeId}><div class="rounded-lg border border-border bg-card p-3"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10"${_scopeId}><svg class="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"${_scopeId}></path></svg></div><div${_scopeId}><p class="text-xs text-muted-foreground"${_scopeId}>Toplam</p><p class="text-lg font-semibold text-foreground"${_scopeId}>${ssrInterpolate(services.value.length)}</p></div></div></div><div class="rounded-lg border border-border bg-card p-3"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><div class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10"${_scopeId}><svg class="h-4 w-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"${_scopeId}></path></svg></div><div${_scopeId}><p class="text-xs text-muted-foreground"${_scopeId}>Ana Hizmet</p><p class="text-lg font-semibold text-foreground"${_scopeId}>${ssrInterpolate(parents.value.length)}</p></div></div></div><div class="rounded-lg border border-border bg-card p-3"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><div class="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/10"${_scopeId}><svg class="h-4 w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"${_scopeId}></path></svg></div><div${_scopeId}><p class="text-xs text-muted-foreground"${_scopeId}>Alt Hizmet</p><p class="text-lg font-semibold text-foreground"${_scopeId}>${ssrInterpolate(services.value.length - parents.value.length)}</p></div></div></div><div class="rounded-lg border border-border bg-card p-3"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><div class="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10"${_scopeId}><svg class="h-4 w-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg></div><div${_scopeId}><p class="text-xs text-muted-foreground"${_scopeId}>Ort. Fiyat</p><p class="text-lg font-semibold text-foreground"${_scopeId}>${ssrInterpolate(averagePrice.value)}</p></div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (!parents.value || parents.value.length === 0) {
              _push2(`<div class="rounded-lg border border-dashed border-border bg-muted/20 p-12 text-center"${_scopeId}><div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted"${_scopeId}><svg class="h-6 w-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"${_scopeId}></path></svg></div><p class="mt-4 text-sm font-medium text-foreground"${_scopeId}>Henüz hizmet bulunmuyor</p><p class="mt-1 text-xs text-muted-foreground"${_scopeId}>İlk hizmetinizi oluşturmak için yukarıdaki butonu kullanın</p></div>`);
            } else {
              _push2(`<div class="space-y-2"${_scopeId}><!--[-->`);
              ssrRenderList(parents.value, (parent) => {
                _push2(ssrRenderComponent(_sfc_main$2, {
                  key: parent.id,
                  service: parent,
                  "all-services": services.value
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "min-h-screen bg-background" }, [
                createVNode("div", { class: "mx-auto max-w-5xl px-4 py-6 sm:px-6" }, [
                  createVNode("div", { class: "mb-6" }, [
                    createVNode("h1", { class: "text-xl font-semibold text-foreground" }, "Hizmetlerimiz"),
                    createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, "Sunduğumuz profesyonel hizmetler")
                  ]),
                  services.value.length > 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4"
                  }, [
                    createVNode("div", { class: "rounded-lg border border-border bg-card p-3" }, [
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        createVNode("div", { class: "flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10" }, [
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
                              d: "M13 10V3L4 14h7v7l9-11h-7z"
                            })
                          ]))
                        ]),
                        createVNode("div", null, [
                          createVNode("p", { class: "text-xs text-muted-foreground" }, "Toplam"),
                          createVNode("p", { class: "text-lg font-semibold text-foreground" }, toDisplayString(services.value.length), 1)
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "rounded-lg border border-border bg-card p-3" }, [
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        createVNode("div", { class: "flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10" }, [
                          (openBlock(), createBlock("svg", {
                            class: "h-4 w-4 text-blue-500",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                            })
                          ]))
                        ]),
                        createVNode("div", null, [
                          createVNode("p", { class: "text-xs text-muted-foreground" }, "Ana Hizmet"),
                          createVNode("p", { class: "text-lg font-semibold text-foreground" }, toDisplayString(parents.value.length), 1)
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "rounded-lg border border-border bg-card p-3" }, [
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        createVNode("div", { class: "flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/10" }, [
                          (openBlock(), createBlock("svg", {
                            class: "h-4 w-4 text-green-500",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            })
                          ]))
                        ]),
                        createVNode("div", null, [
                          createVNode("p", { class: "text-xs text-muted-foreground" }, "Alt Hizmet"),
                          createVNode("p", { class: "text-lg font-semibold text-foreground" }, toDisplayString(services.value.length - parents.value.length), 1)
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "rounded-lg border border-border bg-card p-3" }, [
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        createVNode("div", { class: "flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10" }, [
                          (openBlock(), createBlock("svg", {
                            class: "h-4 w-4 text-purple-500",
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
                          ]))
                        ]),
                        createVNode("div", null, [
                          createVNode("p", { class: "text-xs text-muted-foreground" }, "Ort. Fiyat"),
                          createVNode("p", { class: "text-lg font-semibold text-foreground" }, toDisplayString(averagePrice.value), 1)
                        ])
                      ])
                    ])
                  ])) : createCommentVNode("", true),
                  !parents.value || parents.value.length === 0 ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "rounded-lg border border-dashed border-border bg-muted/20 p-12 text-center"
                  }, [
                    createVNode("div", { class: "mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted" }, [
                      (openBlock(), createBlock("svg", {
                        class: "h-6 w-6 text-muted-foreground",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "1.5",
                          d: "M13 10V3L4 14h7v7l9-11h-7z"
                        })
                      ]))
                    ]),
                    createVNode("p", { class: "mt-4 text-sm font-medium text-foreground" }, "Henüz hizmet bulunmuyor"),
                    createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, "İlk hizmetinizi oluşturmak için yukarıdaki butonu kullanın")
                  ])) : (openBlock(), createBlock("div", {
                    key: 2,
                    class: "space-y-2"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(parents.value, (parent) => {
                      return openBlock(), createBlock(_sfc_main$2, {
                        key: parent.id,
                        service: parent,
                        "all-services": services.value
                      }, null, 8, ["service", "all-services"]);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/Services/Index/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
