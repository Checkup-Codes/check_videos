import { withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
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
    const customer = props.customer;
    const formatDate = (dateString) => {
      if (!dateString) return "Tarih Yok";
      const options = { year: "numeric", month: "short", day: "numeric" };
      return new Date(dateString).toLocaleDateString("tr-TR", options);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, { url: "/customers" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, { title: "Müşteri Detayı" }, null, _parent2, _scopeId));
            _push2(`<div class="rounded-lg border border-border bg-card shadow-sm"${_scopeId}><div class="p-6"${_scopeId}><div class="mb-6 flex items-center justify-between"${_scopeId}><div${_scopeId}><h1 class="text-2xl font-bold text-foreground"${_scopeId}>${ssrInterpolate(unref(customer).first_name)} ${ssrInterpolate(unref(customer).last_name)}</h1><p class="mt-1 text-sm text-muted-foreground"${_scopeId}>${ssrInterpolate(unref(customer).email)}</p></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: `/customers/${unref(customer).id}/edit`,
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
            _push2(`</div><div class="space-y-6 border-t border-border pt-6"${_scopeId}><div class="grid grid-cols-1 gap-4 md:grid-cols-2"${_scopeId}><div${_scopeId}><h4 class="text-xs font-medium text-muted-foreground"${_scopeId}>Telefon</h4><p class="mt-1 text-sm font-semibold text-foreground"${_scopeId}>${ssrInterpolate(unref(customer).phone || "N/A")}</p></div><div${_scopeId}><h4 class="text-xs font-medium text-muted-foreground"${_scopeId}>Oluşturulma Tarihi</h4><p class="mt-1 text-sm font-semibold text-foreground"${_scopeId}>${ssrInterpolate(formatDate(unref(customer).created_at))}</p></div><div class="md:col-span-2"${_scopeId}><h4 class="text-xs font-medium text-muted-foreground"${_scopeId}>Adres</h4><p class="mt-1 text-sm font-semibold text-foreground"${_scopeId}>${ssrInterpolate(unref(customer).address || "N/A")}</p></div><div${_scopeId}><h4 class="text-xs font-medium text-muted-foreground"${_scopeId}>Şehir</h4><p class="mt-1 text-sm font-semibold text-foreground"${_scopeId}>${ssrInterpolate(unref(customer).city || "N/A")}</p></div><div${_scopeId}><h4 class="text-xs font-medium text-muted-foreground"${_scopeId}>Bölge</h4><p class="mt-1 text-sm font-semibold text-foreground"${_scopeId}>${ssrInterpolate(unref(customer).state || "N/A")}</p></div><div${_scopeId}><h4 class="text-xs font-medium text-muted-foreground"${_scopeId}>Posta Kodu</h4><p class="mt-1 text-sm font-semibold text-foreground"${_scopeId}>${ssrInterpolate(unref(customer).postal_code || "N/A")}</p></div><div${_scopeId}><h4 class="text-xs font-medium text-muted-foreground"${_scopeId}>Ülke</h4><p class="mt-1 text-sm font-semibold text-foreground"${_scopeId}>${ssrInterpolate(unref(customer).country || "N/A")}</p></div></div></div></div></div>`);
          } else {
            return [
              createVNode(_sfc_main$2, { url: "/customers" }),
              createVNode(_sfc_main$3, { title: "Müşteri Detayı" }),
              createVNode("div", { class: "rounded-lg border border-border bg-card shadow-sm" }, [
                createVNode("div", { class: "p-6" }, [
                  createVNode("div", { class: "mb-6 flex items-center justify-between" }, [
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-2xl font-bold text-foreground" }, toDisplayString(unref(customer).first_name) + " " + toDisplayString(unref(customer).last_name), 1),
                      createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, toDisplayString(unref(customer).email), 1)
                    ]),
                    createVNode(unref(Link), {
                      href: `/customers/${unref(customer).id}/edit`,
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
                    createVNode("div", { class: "grid grid-cols-1 gap-4 md:grid-cols-2" }, [
                      createVNode("div", null, [
                        createVNode("h4", { class: "text-xs font-medium text-muted-foreground" }, "Telefon"),
                        createVNode("p", { class: "mt-1 text-sm font-semibold text-foreground" }, toDisplayString(unref(customer).phone || "N/A"), 1)
                      ]),
                      createVNode("div", null, [
                        createVNode("h4", { class: "text-xs font-medium text-muted-foreground" }, "Oluşturulma Tarihi"),
                        createVNode("p", { class: "mt-1 text-sm font-semibold text-foreground" }, toDisplayString(formatDate(unref(customer).created_at)), 1)
                      ]),
                      createVNode("div", { class: "md:col-span-2" }, [
                        createVNode("h4", { class: "text-xs font-medium text-muted-foreground" }, "Adres"),
                        createVNode("p", { class: "mt-1 text-sm font-semibold text-foreground" }, toDisplayString(unref(customer).address || "N/A"), 1)
                      ]),
                      createVNode("div", null, [
                        createVNode("h4", { class: "text-xs font-medium text-muted-foreground" }, "Şehir"),
                        createVNode("p", { class: "mt-1 text-sm font-semibold text-foreground" }, toDisplayString(unref(customer).city || "N/A"), 1)
                      ]),
                      createVNode("div", null, [
                        createVNode("h4", { class: "text-xs font-medium text-muted-foreground" }, "Bölge"),
                        createVNode("p", { class: "mt-1 text-sm font-semibold text-foreground" }, toDisplayString(unref(customer).state || "N/A"), 1)
                      ]),
                      createVNode("div", null, [
                        createVNode("h4", { class: "text-xs font-medium text-muted-foreground" }, "Posta Kodu"),
                        createVNode("p", { class: "mt-1 text-sm font-semibold text-foreground" }, toDisplayString(unref(customer).postal_code || "N/A"), 1)
                      ]),
                      createVNode("div", null, [
                        createVNode("h4", { class: "text-xs font-medium text-muted-foreground" }, "Ülke"),
                        createVNode("p", { class: "mt-1 text-sm font-semibold text-foreground" }, toDisplayString(unref(customer).country || "N/A"), 1)
                      ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/Customers/Show/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
