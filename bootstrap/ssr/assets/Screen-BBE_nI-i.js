import { computed, withCtx, unref, openBlock, createBlock, createVNode, createTextVNode, toDisplayString, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-DjaYf9so.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const customers = computed(() => props.customers || []);
    const activeCustomersCount = computed(() => {
      return customers.value.filter((customer) => {
        return true;
      }).length;
    });
    const customersWithEmail = computed(() => {
      return customers.value.filter((c) => c.email).length;
    });
    const getInitials = (firstName, lastName) => {
      const first = firstName ? firstName.charAt(0).toUpperCase() : "";
      const last = lastName ? lastName.charAt(0).toUpperCase() : "";
      return first + last || "?";
    };
    const formatDate = (dateString) => {
      if (!dateString) return "Tarih Yok";
      try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;
        return new Intl.DateTimeFormat("tr-TR", {
          day: "numeric",
          month: "short",
          year: "numeric"
        }).format(date);
      } catch (error) {
        return dateString;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="min-h-screen bg-background"${_scopeId}><div class="mx-auto max-w-6xl px-4 py-6 sm:px-6"${_scopeId}><div class="mb-6 flex items-center justify-between"${_scopeId}><div${_scopeId}><h1 class="text-xl font-semibold text-foreground"${_scopeId}>Müşteriler</h1><p class="mt-1 text-xs text-muted-foreground"${_scopeId}>Müşterilerinizi görüntüleyin ve yönetin</p></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/customers/create",
              class: "inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-primary px-3.5 text-xs font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-md"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"${_scopeId2}></path></svg> Yeni Müşteri `);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      class: "h-3.5 w-3.5",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M12 4v16m8-8H4"
                      })
                    ])),
                    createTextVNode(" Yeni Müşteri ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (customers.value.length > 0) {
              _push2(`<div class="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3"${_scopeId}><div class="rounded-lg border border-border bg-card p-3"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10"${_scopeId}><svg class="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"${_scopeId}></path></svg></div><div${_scopeId}><p class="text-xs text-muted-foreground"${_scopeId}>Toplam Müşteri</p><p class="text-lg font-semibold text-foreground"${_scopeId}>${ssrInterpolate(customers.value.length)}</p></div></div></div><div class="rounded-lg border border-border bg-card p-3"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><div class="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/10"${_scopeId}><svg class="h-4 w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg></div><div${_scopeId}><p class="text-xs text-muted-foreground"${_scopeId}>Aktif Proje</p><p class="text-lg font-semibold text-foreground"${_scopeId}>${ssrInterpolate(activeCustomersCount.value)}</p></div></div></div><div class="rounded-lg border border-border bg-card p-3"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><div class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10"${_scopeId}><svg class="h-4 w-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"${_scopeId}></path></svg></div><div${_scopeId}><p class="text-xs text-muted-foreground"${_scopeId}>E-posta Kayıtlı</p><p class="text-lg font-semibold text-foreground"${_scopeId}>${ssrInterpolate(customersWithEmail.value)}</p></div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (customers.value.length === 0) {
              _push2(`<div class="rounded-lg border border-dashed border-border bg-muted/20 p-12 text-center"${_scopeId}><div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted"${_scopeId}><svg class="h-6 w-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"${_scopeId}></path></svg></div><p class="mt-4 text-sm font-medium text-foreground"${_scopeId}>Henüz müşteri bulunmuyor</p><p class="mt-1 text-xs text-muted-foreground"${_scopeId}>İlk müşterinizi eklemek için yukarıdaki butonu kullanın</p></div>`);
            } else {
              _push2(`<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"${_scopeId}><!--[-->`);
              ssrRenderList(customers.value, (customer) => {
                _push2(ssrRenderComponent(unref(Link), {
                  key: customer.id,
                  href: `/customers/${customer.id}`,
                  class: "group rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-md"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="mb-3 flex items-center gap-3"${_scopeId2}><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary"${_scopeId2}>${ssrInterpolate(getInitials(customer.first_name, customer.last_name))}</div><div class="min-w-0 flex-1"${_scopeId2}><h3 class="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors"${_scopeId2}>${ssrInterpolate(customer.first_name)} ${ssrInterpolate(customer.last_name)}</h3>`);
                      if (customer.email) {
                        _push3(`<p class="text-xs text-muted-foreground truncate"${_scopeId2}>${ssrInterpolate(customer.email)}</p>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div></div><div class="space-y-1.5 mb-3"${_scopeId2}>`);
                      if (customer.phone) {
                        _push3(`<div class="flex items-center gap-2 text-xs text-muted-foreground"${_scopeId2}><svg class="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"${_scopeId2}></path></svg><span class="truncate"${_scopeId2}>${ssrInterpolate(customer.phone)}</span></div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      if (customer.city || customer.country) {
                        _push3(`<div class="flex items-center gap-2 text-xs text-muted-foreground"${_scopeId2}><svg class="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"${_scopeId2}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"${_scopeId2}></path></svg><span class="truncate"${_scopeId2}>${ssrInterpolate([customer.city, customer.country].filter(Boolean).join(", "))}</span></div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div><div class="flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground"${_scopeId2}><div class="flex items-center gap-1"${_scopeId2}><svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"${_scopeId2}></path></svg><span${_scopeId2}>${ssrInterpolate(formatDate(customer.created_at))}</span></div><div class="flex items-center gap-1 text-primary opacity-0 transition-opacity group-hover:opacity-100"${_scopeId2}><span${_scopeId2}>Detaylar</span><svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"${_scopeId2}></path></svg></div></div>`);
                    } else {
                      return [
                        createVNode("div", { class: "mb-3 flex items-center gap-3" }, [
                          createVNode("div", { class: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary" }, toDisplayString(getInitials(customer.first_name, customer.last_name)), 1),
                          createVNode("div", { class: "min-w-0 flex-1" }, [
                            createVNode("h3", { class: "text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors" }, toDisplayString(customer.first_name) + " " + toDisplayString(customer.last_name), 1),
                            customer.email ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-xs text-muted-foreground truncate"
                            }, toDisplayString(customer.email), 1)) : createCommentVNode("", true)
                          ])
                        ]),
                        createVNode("div", { class: "space-y-1.5 mb-3" }, [
                          customer.phone ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex items-center gap-2 text-xs text-muted-foreground"
                          }, [
                            (openBlock(), createBlock("svg", {
                              class: "h-3.5 w-3.5 shrink-0",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                              })
                            ])),
                            createVNode("span", { class: "truncate" }, toDisplayString(customer.phone), 1)
                          ])) : createCommentVNode("", true),
                          customer.city || customer.country ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "flex items-center gap-2 text-xs text-muted-foreground"
                          }, [
                            (openBlock(), createBlock("svg", {
                              class: "h-3.5 w-3.5 shrink-0",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              }),
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              })
                            ])),
                            createVNode("span", { class: "truncate" }, toDisplayString([customer.city, customer.country].filter(Boolean).join(", ")), 1)
                          ])) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground" }, [
                          createVNode("div", { class: "flex items-center gap-1" }, [
                            (openBlock(), createBlock("svg", {
                              class: "h-3 w-3",
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
                            createVNode("span", null, toDisplayString(formatDate(customer.created_at)), 1)
                          ]),
                          createVNode("div", { class: "flex items-center gap-1 text-primary opacity-0 transition-opacity group-hover:opacity-100" }, [
                            createVNode("span", null, "Detaylar"),
                            (openBlock(), createBlock("svg", {
                              class: "h-3 w-3",
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
                          ])
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "min-h-screen bg-background" }, [
                createVNode("div", { class: "mx-auto max-w-6xl px-4 py-6 sm:px-6" }, [
                  createVNode("div", { class: "mb-6 flex items-center justify-between" }, [
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-xl font-semibold text-foreground" }, "Müşteriler"),
                      createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, "Müşterilerinizi görüntüleyin ve yönetin")
                    ]),
                    createVNode(unref(Link), {
                      href: "/customers/create",
                      class: "inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-primary px-3.5 text-xs font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-md"
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock("svg", {
                          class: "h-3.5 w-3.5",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M12 4v16m8-8H4"
                          })
                        ])),
                        createTextVNode(" Yeni Müşteri ")
                      ]),
                      _: 1
                    })
                  ]),
                  customers.value.length > 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3"
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
                              d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            })
                          ]))
                        ]),
                        createVNode("div", null, [
                          createVNode("p", { class: "text-xs text-muted-foreground" }, "Toplam Müşteri"),
                          createVNode("p", { class: "text-lg font-semibold text-foreground" }, toDisplayString(customers.value.length), 1)
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
                              d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            })
                          ]))
                        ]),
                        createVNode("div", null, [
                          createVNode("p", { class: "text-xs text-muted-foreground" }, "Aktif Proje"),
                          createVNode("p", { class: "text-lg font-semibold text-foreground" }, toDisplayString(activeCustomersCount.value), 1)
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
                              d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            })
                          ]))
                        ]),
                        createVNode("div", null, [
                          createVNode("p", { class: "text-xs text-muted-foreground" }, "E-posta Kayıtlı"),
                          createVNode("p", { class: "text-lg font-semibold text-foreground" }, toDisplayString(customersWithEmail.value), 1)
                        ])
                      ])
                    ])
                  ])) : createCommentVNode("", true),
                  customers.value.length === 0 ? (openBlock(), createBlock("div", {
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
                          d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        })
                      ]))
                    ]),
                    createVNode("p", { class: "mt-4 text-sm font-medium text-foreground" }, "Henüz müşteri bulunmuyor"),
                    createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, "İlk müşterinizi eklemek için yukarıdaki butonu kullanın")
                  ])) : (openBlock(), createBlock("div", {
                    key: 2,
                    class: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(customers.value, (customer) => {
                      return openBlock(), createBlock(unref(Link), {
                        key: customer.id,
                        href: `/customers/${customer.id}`,
                        class: "group rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-md"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "mb-3 flex items-center gap-3" }, [
                            createVNode("div", { class: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary" }, toDisplayString(getInitials(customer.first_name, customer.last_name)), 1),
                            createVNode("div", { class: "min-w-0 flex-1" }, [
                              createVNode("h3", { class: "text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors" }, toDisplayString(customer.first_name) + " " + toDisplayString(customer.last_name), 1),
                              customer.email ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-xs text-muted-foreground truncate"
                              }, toDisplayString(customer.email), 1)) : createCommentVNode("", true)
                            ])
                          ]),
                          createVNode("div", { class: "space-y-1.5 mb-3" }, [
                            customer.phone ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "flex items-center gap-2 text-xs text-muted-foreground"
                            }, [
                              (openBlock(), createBlock("svg", {
                                class: "h-3.5 w-3.5 shrink-0",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                })
                              ])),
                              createVNode("span", { class: "truncate" }, toDisplayString(customer.phone), 1)
                            ])) : createCommentVNode("", true),
                            customer.city || customer.country ? (openBlock(), createBlock("div", {
                              key: 1,
                              class: "flex items-center gap-2 text-xs text-muted-foreground"
                            }, [
                              (openBlock(), createBlock("svg", {
                                class: "h-3.5 w-3.5 shrink-0",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                }),
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                })
                              ])),
                              createVNode("span", { class: "truncate" }, toDisplayString([customer.city, customer.country].filter(Boolean).join(", ")), 1)
                            ])) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground" }, [
                            createVNode("div", { class: "flex items-center gap-1" }, [
                              (openBlock(), createBlock("svg", {
                                class: "h-3 w-3",
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
                              createVNode("span", null, toDisplayString(formatDate(customer.created_at)), 1)
                            ]),
                            createVNode("div", { class: "flex items-center gap-1 text-primary opacity-0 transition-opacity group-hover:opacity-100" }, [
                              createVNode("span", null, "Detaylar"),
                              (openBlock(), createBlock("svg", {
                                class: "h-3 w-3",
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
                            ])
                          ])
                        ]),
                        _: 2
                      }, 1032, ["href"]);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/Customers/Index/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
