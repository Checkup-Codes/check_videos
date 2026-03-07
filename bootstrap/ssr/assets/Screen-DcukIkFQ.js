import { withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-DjaYf9so.js";
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
            _push2(`<div class="mx-auto max-w-4xl"${_scopeId}><div class="mb-6 flex items-center justify-between"${_scopeId}><div${_scopeId}><h1 class="text-xl font-semibold text-foreground"${_scopeId}>${ssrInterpolate(unref(customer).first_name)} ${ssrInterpolate(unref(customer).last_name)}</h1><p class="mt-1 text-xs text-muted-foreground"${_scopeId}>${ssrInterpolate(unref(customer).email)}</p></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: `/customers/${unref(customer).id}/edit`,
              class: "inline-flex h-9 items-center justify-center gap-1.5 rounded-md border border-input bg-background px-3.5 text-xs font-medium text-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"${_scopeId2}></path></svg> Düzenle `);
                } else {
                  return [
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
                        d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      })
                    ])),
                    createTextVNode(" Düzenle ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="rounded-lg border border-border bg-card p-5 shadow-sm"${_scopeId}><div class="space-y-4"${_scopeId}><div class="grid grid-cols-1 gap-4 md:grid-cols-2"${_scopeId}><div class="rounded-lg border border-border bg-muted/30 p-4"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><div class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"${_scopeId}></path></svg></div><div class="flex-1"${_scopeId}><p class="text-xs text-muted-foreground"${_scopeId}>Telefon</p><p class="mt-0.5 text-sm font-medium text-foreground"${_scopeId}>${ssrInterpolate(unref(customer).phone || "Belirtilmemiş")}</p></div></div></div><div class="rounded-lg border border-border bg-muted/30 p-4"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><div class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"${_scopeId}></path></svg></div><div class="flex-1"${_scopeId}><p class="text-xs text-muted-foreground"${_scopeId}>Oluşturulma Tarihi</p><p class="mt-0.5 text-sm font-medium text-foreground"${_scopeId}>${ssrInterpolate(formatDate(unref(customer).created_at))}</p></div></div></div></div><div class="rounded-lg border border-border bg-muted/30 p-4"${_scopeId}><div class="flex items-start gap-3"${_scopeId}><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-600 text-white"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"${_scopeId}></path></svg></div><div class="flex-1"${_scopeId}><p class="text-xs text-muted-foreground"${_scopeId}>Adres</p><p class="mt-0.5 text-sm font-medium text-foreground"${_scopeId}>${ssrInterpolate(unref(customer).address || "Belirtilmemiş")}</p></div></div></div><div class="grid grid-cols-1 gap-4 md:grid-cols-2"${_scopeId}><div class="rounded-lg border border-border bg-muted/30 p-4"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><div class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"${_scopeId}></path></svg></div><div class="flex-1"${_scopeId}><p class="text-xs text-muted-foreground"${_scopeId}>Şehir</p><p class="mt-0.5 text-sm font-medium text-foreground"${_scopeId}>${ssrInterpolate(unref(customer).city || "Belirtilmemiş")}</p></div></div></div><div class="rounded-lg border border-border bg-muted/30 p-4"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><div class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-pink-600 text-white"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"${_scopeId}></path></svg></div><div class="flex-1"${_scopeId}><p class="text-xs text-muted-foreground"${_scopeId}>Bölge</p><p class="mt-0.5 text-sm font-medium text-foreground"${_scopeId}>${ssrInterpolate(unref(customer).state || "Belirtilmemiş")}</p></div></div></div><div class="rounded-lg border border-border bg-muted/30 p-4"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><div class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 text-white"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"${_scopeId}></path></svg></div><div class="flex-1"${_scopeId}><p class="text-xs text-muted-foreground"${_scopeId}>Posta Kodu</p><p class="mt-0.5 text-sm font-medium text-foreground"${_scopeId}>${ssrInterpolate(unref(customer).postal_code || "Belirtilmemiş")}</p></div></div></div><div class="rounded-lg border border-border bg-muted/30 p-4"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><div class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 text-white"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg></div><div class="flex-1"${_scopeId}><p class="text-xs text-muted-foreground"${_scopeId}>Ülke</p><p class="mt-0.5 text-sm font-medium text-foreground"${_scopeId}>${ssrInterpolate(unref(customer).country || "Belirtilmemiş")}</p></div></div></div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "mx-auto max-w-4xl" }, [
                createVNode("div", { class: "mb-6 flex items-center justify-between" }, [
                  createVNode("div", null, [
                    createVNode("h1", { class: "text-xl font-semibold text-foreground" }, toDisplayString(unref(customer).first_name) + " " + toDisplayString(unref(customer).last_name), 1),
                    createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, toDisplayString(unref(customer).email), 1)
                  ]),
                  createVNode(unref(Link), {
                    href: `/customers/${unref(customer).id}/edit`,
                    class: "inline-flex h-9 items-center justify-center gap-1.5 rounded-md border border-input bg-background px-3.5 text-xs font-medium text-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  }, {
                    default: withCtx(() => [
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
                          d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        })
                      ])),
                      createTextVNode(" Düzenle ")
                    ]),
                    _: 1
                  }, 8, ["href"])
                ]),
                createVNode("div", { class: "rounded-lg border border-border bg-card p-5 shadow-sm" }, [
                  createVNode("div", { class: "space-y-4" }, [
                    createVNode("div", { class: "grid grid-cols-1 gap-4 md:grid-cols-2" }, [
                      createVNode("div", { class: "rounded-lg border border-border bg-muted/30 p-4" }, [
                        createVNode("div", { class: "flex items-center gap-3" }, [
                          createVNode("div", { class: "flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white" }, [
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              class: "h-5 w-5",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              stroke: "currentColor",
                              "stroke-width": "2"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                              })
                            ]))
                          ]),
                          createVNode("div", { class: "flex-1" }, [
                            createVNode("p", { class: "text-xs text-muted-foreground" }, "Telefon"),
                            createVNode("p", { class: "mt-0.5 text-sm font-medium text-foreground" }, toDisplayString(unref(customer).phone || "Belirtilmemiş"), 1)
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "rounded-lg border border-border bg-muted/30 p-4" }, [
                        createVNode("div", { class: "flex items-center gap-3" }, [
                          createVNode("div", { class: "flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white" }, [
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              class: "h-5 w-5",
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
                            ]))
                          ]),
                          createVNode("div", { class: "flex-1" }, [
                            createVNode("p", { class: "text-xs text-muted-foreground" }, "Oluşturulma Tarihi"),
                            createVNode("p", { class: "mt-0.5 text-sm font-medium text-foreground" }, toDisplayString(formatDate(unref(customer).created_at)), 1)
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "rounded-lg border border-border bg-muted/30 p-4" }, [
                      createVNode("div", { class: "flex items-start gap-3" }, [
                        createVNode("div", { class: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-600 text-white" }, [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            class: "h-5 w-5",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor",
                            "stroke-width": "2"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            }),
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            })
                          ]))
                        ]),
                        createVNode("div", { class: "flex-1" }, [
                          createVNode("p", { class: "text-xs text-muted-foreground" }, "Adres"),
                          createVNode("p", { class: "mt-0.5 text-sm font-medium text-foreground" }, toDisplayString(unref(customer).address || "Belirtilmemiş"), 1)
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "grid grid-cols-1 gap-4 md:grid-cols-2" }, [
                      createVNode("div", { class: "rounded-lg border border-border bg-muted/30 p-4" }, [
                        createVNode("div", { class: "flex items-center gap-3" }, [
                          createVNode("div", { class: "flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white" }, [
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              class: "h-5 w-5",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              stroke: "currentColor",
                              "stroke-width": "2"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                              })
                            ]))
                          ]),
                          createVNode("div", { class: "flex-1" }, [
                            createVNode("p", { class: "text-xs text-muted-foreground" }, "Şehir"),
                            createVNode("p", { class: "mt-0.5 text-sm font-medium text-foreground" }, toDisplayString(unref(customer).city || "Belirtilmemiş"), 1)
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "rounded-lg border border-border bg-muted/30 p-4" }, [
                        createVNode("div", { class: "flex items-center gap-3" }, [
                          createVNode("div", { class: "flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-pink-600 text-white" }, [
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              class: "h-5 w-5",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              stroke: "currentColor",
                              "stroke-width": "2"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                d: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                              })
                            ]))
                          ]),
                          createVNode("div", { class: "flex-1" }, [
                            createVNode("p", { class: "text-xs text-muted-foreground" }, "Bölge"),
                            createVNode("p", { class: "mt-0.5 text-sm font-medium text-foreground" }, toDisplayString(unref(customer).state || "Belirtilmemiş"), 1)
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "rounded-lg border border-border bg-muted/30 p-4" }, [
                        createVNode("div", { class: "flex items-center gap-3" }, [
                          createVNode("div", { class: "flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 text-white" }, [
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              class: "h-5 w-5",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              stroke: "currentColor",
                              "stroke-width": "2"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              })
                            ]))
                          ]),
                          createVNode("div", { class: "flex-1" }, [
                            createVNode("p", { class: "text-xs text-muted-foreground" }, "Posta Kodu"),
                            createVNode("p", { class: "mt-0.5 text-sm font-medium text-foreground" }, toDisplayString(unref(customer).postal_code || "Belirtilmemiş"), 1)
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "rounded-lg border border-border bg-muted/30 p-4" }, [
                        createVNode("div", { class: "flex items-center gap-3" }, [
                          createVNode("div", { class: "flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 text-white" }, [
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              class: "h-5 w-5",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              stroke: "currentColor",
                              "stroke-width": "2"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                d: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              })
                            ]))
                          ]),
                          createVNode("div", { class: "flex-1" }, [
                            createVNode("p", { class: "text-xs text-muted-foreground" }, "Ülke"),
                            createVNode("p", { class: "mt-0.5 text-sm font-medium text-foreground" }, toDisplayString(unref(customer).country || "Belirtilmemiş"), 1)
                          ])
                        ])
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
