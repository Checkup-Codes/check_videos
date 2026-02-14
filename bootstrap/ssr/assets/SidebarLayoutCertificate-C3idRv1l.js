import { computed, ref, onMounted, nextTick, onActivated, onDeactivated, onBeforeUnmount, mergeProps, withCtx, unref, createBlock, openBlock, createVNode, toDisplayString, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./SubSidebarScreen-DNe7gM-E.js";
import { useStore } from "vuex";
import { _ as _export_sfc } from "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = /* @__PURE__ */ Object.assign({
  name: "SidebarLayoutCertificate"
}, {
  __name: "SidebarLayoutCertificate",
  __ssrInlineRender: true,
  emits: ["update:isNarrow"],
  setup(__props, { emit: __emit }) {
    const page = usePage();
    const store = useStore();
    const certificates = computed(() => page.props.certificates || []);
    const isLoggedIn = computed(() => {
      var _a;
      return (_a = page.props.auth) == null ? void 0 : _a.user;
    });
    const isNarrow = ref(store.getters["Writes/isCollapsed"]);
    const scrollableRef = ref(null);
    const isActiveCertificate = (slug) => {
      return route().current("certificates.show", slug);
    };
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("tr-TR", { year: "numeric", month: "short" });
    };
    let scrollHandler = null;
    const getScrollElement = () => {
      var _a, _b, _c;
      if ((_b = (_a = scrollableRef.value) == null ? void 0 : _a.$el) == null ? void 0 : _b.value) return scrollableRef.value.$el.value;
      if ((_c = scrollableRef.value) == null ? void 0 : _c.$el) return scrollableRef.value.$el;
      return scrollableRef.value;
    };
    const saveScrollPosition = () => {
      const scrollElement = getScrollElement();
      if (scrollElement) {
        const scrollTop = scrollElement.scrollTop || 0;
        store.dispatch("Certificates/setScrollPosition", scrollTop);
      }
    };
    const restoreScrollPosition = () => {
      nextTick(() => {
        const scrollElement = getScrollElement();
        if (scrollElement) {
          const savedPosition = store.getters["Certificates/scrollPosition"];
          if (savedPosition > 0) {
            scrollElement.scrollTop = savedPosition;
          }
        }
      });
    };
    const setupScrollListener = () => {
      const scrollElement = getScrollElement();
      if (scrollElement && !scrollHandler) {
        scrollHandler = () => saveScrollPosition();
        scrollElement.addEventListener("scroll", scrollHandler, { passive: true });
      }
    };
    const removeScrollListener = () => {
      const scrollElement = getScrollElement();
      if (scrollElement && scrollHandler) {
        scrollElement.removeEventListener("scroll", scrollHandler);
        scrollHandler = null;
      }
    };
    onMounted(() => {
      isNarrow.value = store.getters["Writes/isCollapsed"];
      nextTick(() => {
        setupScrollListener();
        restoreScrollPosition();
      });
    });
    onActivated(() => {
      nextTick(() => {
        setupScrollListener();
        restoreScrollPosition();
      });
    });
    onDeactivated(() => {
      saveScrollPosition();
      removeScrollListener();
    });
    onBeforeUnmount(() => {
      saveScrollPosition();
      removeScrollListener();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ isNarrow: isNarrow.value }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="relative z-10 shrink-0 border-b border-border bg-background p-3" data-v-c907b2e5${_scopeId}><div class="flex items-center justify-between gap-2" data-v-c907b2e5${_scopeId}><span class="text-xs font-semibold uppercase tracking-wider text-muted-foreground" data-v-c907b2e5${_scopeId}>Sertifikalar</span>`);
            if (isLoggedIn.value) {
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("certificates.create"),
                class: "inline-flex items-center justify-center rounded-md bg-primary p-1.5 text-primary-foreground hover:bg-primary/90"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c907b2e5${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-c907b2e5${_scopeId2}></path></svg>`);
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
                          d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
                        })
                      ]))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              ref_key: "scrollableRef",
              ref: scrollableRef,
              class: "sidebar-content-embedded min-h-0 flex-1",
              infoClass: "flex-1 min-h-0"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="space-y-1 p-2" data-v-c907b2e5${_scopeId2}><!--[-->`);
                  ssrRenderList(certificates.value, (certificate) => {
                    _push3(ssrRenderComponent(unref(Link), {
                      key: certificate.id,
                      href: _ctx.route("certificates.show", certificate.slug),
                      class: ["group block rounded-lg border border-transparent p-3 transition-colors hover:border-border hover:bg-accent", { "border-primary bg-primary/5": isActiveCertificate(certificate.slug) }]
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="flex items-start gap-3" data-v-c907b2e5${_scopeId3}><div class="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md bg-muted" data-v-c907b2e5${_scopeId3}>`);
                          if (certificate.image) {
                            _push4(`<img${ssrRenderAttr("src", certificate.image)}${ssrRenderAttr("alt", certificate.title)} class="h-full w-full object-cover" data-v-c907b2e5${_scopeId3}>`);
                          } else {
                            _push4(`<div class="flex h-full items-center justify-center" data-v-c907b2e5${_scopeId3}><svg class="h-6 w-6 text-muted-foreground/30" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c907b2e5${_scopeId3}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-c907b2e5${_scopeId3}></path></svg></div>`);
                          }
                          _push4(`</div><div class="min-w-0 flex-1" data-v-c907b2e5${_scopeId3}><h3 class="${ssrRenderClass([{ "text-primary": isActiveCertificate(certificate.slug) }, "truncate text-sm font-medium text-foreground group-hover:text-primary"])}" data-v-c907b2e5${_scopeId3}>${ssrInterpolate(certificate.title)}</h3><p class="mt-0.5 truncate text-xs text-muted-foreground" data-v-c907b2e5${_scopeId3}>${ssrInterpolate(certificate.issuer)}</p><p class="mt-1 text-xs text-muted-foreground" data-v-c907b2e5${_scopeId3}>${ssrInterpolate(formatDate(certificate.issue_date))}</p></div></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "flex items-start gap-3" }, [
                              createVNode("div", { class: "h-12 w-12 flex-shrink-0 overflow-hidden rounded-md bg-muted" }, [
                                certificate.image ? (openBlock(), createBlock("img", {
                                  key: 0,
                                  src: certificate.image,
                                  alt: certificate.title,
                                  class: "h-full w-full object-cover"
                                }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                                  key: 1,
                                  class: "flex h-full items-center justify-center"
                                }, [
                                  (openBlock(), createBlock("svg", {
                                    class: "h-6 w-6 text-muted-foreground/30",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24"
                                  }, [
                                    createVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      "stroke-width": "2",
                                      d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    })
                                  ]))
                                ]))
                              ]),
                              createVNode("div", { class: "min-w-0 flex-1" }, [
                                createVNode("h3", {
                                  class: ["truncate text-sm font-medium text-foreground group-hover:text-primary", { "text-primary": isActiveCertificate(certificate.slug) }]
                                }, toDisplayString(certificate.title), 3),
                                createVNode("p", { class: "mt-0.5 truncate text-xs text-muted-foreground" }, toDisplayString(certificate.issuer), 1),
                                createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, toDisplayString(formatDate(certificate.issue_date)), 1)
                              ])
                            ])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                  if (certificates.value.length === 0) {
                    _push3(`<div class="py-8 text-center" data-v-c907b2e5${_scopeId2}><svg class="mx-auto h-12 w-12 text-muted-foreground/30" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c907b2e5${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-c907b2e5${_scopeId2}></path></svg><p class="mt-2 text-xs text-muted-foreground" data-v-c907b2e5${_scopeId2}>Henüz sertifika yok</p></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "space-y-1 p-2" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(certificates.value, (certificate) => {
                        return openBlock(), createBlock(unref(Link), {
                          key: certificate.id,
                          href: _ctx.route("certificates.show", certificate.slug),
                          class: ["group block rounded-lg border border-transparent p-3 transition-colors hover:border-border hover:bg-accent", { "border-primary bg-primary/5": isActiveCertificate(certificate.slug) }]
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex items-start gap-3" }, [
                              createVNode("div", { class: "h-12 w-12 flex-shrink-0 overflow-hidden rounded-md bg-muted" }, [
                                certificate.image ? (openBlock(), createBlock("img", {
                                  key: 0,
                                  src: certificate.image,
                                  alt: certificate.title,
                                  class: "h-full w-full object-cover"
                                }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                                  key: 1,
                                  class: "flex h-full items-center justify-center"
                                }, [
                                  (openBlock(), createBlock("svg", {
                                    class: "h-6 w-6 text-muted-foreground/30",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24"
                                  }, [
                                    createVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      "stroke-width": "2",
                                      d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    })
                                  ]))
                                ]))
                              ]),
                              createVNode("div", { class: "min-w-0 flex-1" }, [
                                createVNode("h3", {
                                  class: ["truncate text-sm font-medium text-foreground group-hover:text-primary", { "text-primary": isActiveCertificate(certificate.slug) }]
                                }, toDisplayString(certificate.title), 3),
                                createVNode("p", { class: "mt-0.5 truncate text-xs text-muted-foreground" }, toDisplayString(certificate.issuer), 1),
                                createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, toDisplayString(formatDate(certificate.issue_date)), 1)
                              ])
                            ])
                          ]),
                          _: 2
                        }, 1032, ["href", "class"]);
                      }), 128)),
                      certificates.value.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "py-8 text-center"
                      }, [
                        (openBlock(), createBlock("svg", {
                          class: "mx-auto h-12 w-12 text-muted-foreground/30",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          })
                        ])),
                        createVNode("p", { class: "mt-2 text-xs text-muted-foreground" }, "Henüz sertifika yok")
                      ])) : createCommentVNode("", true)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "relative z-10 shrink-0 border-b border-border bg-background p-3" }, [
                createVNode("div", { class: "flex items-center justify-between gap-2" }, [
                  createVNode("span", { class: "text-xs font-semibold uppercase tracking-wider text-muted-foreground" }, "Sertifikalar"),
                  isLoggedIn.value ? (openBlock(), createBlock(unref(Link), {
                    key: 0,
                    href: _ctx.route("certificates.create"),
                    class: "inline-flex items-center justify-center rounded-md bg-primary p-1.5 text-primary-foreground hover:bg-primary/90"
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
                          d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
                        })
                      ]))
                    ]),
                    _: 1
                  }, 8, ["href"])) : createCommentVNode("", true)
                ])
              ]),
              createVNode(_sfc_main$2, {
                ref_key: "scrollableRef",
                ref: scrollableRef,
                class: "sidebar-content-embedded min-h-0 flex-1",
                infoClass: "flex-1 min-h-0"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "space-y-1 p-2" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(certificates.value, (certificate) => {
                      return openBlock(), createBlock(unref(Link), {
                        key: certificate.id,
                        href: _ctx.route("certificates.show", certificate.slug),
                        class: ["group block rounded-lg border border-transparent p-3 transition-colors hover:border-border hover:bg-accent", { "border-primary bg-primary/5": isActiveCertificate(certificate.slug) }]
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "flex items-start gap-3" }, [
                            createVNode("div", { class: "h-12 w-12 flex-shrink-0 overflow-hidden rounded-md bg-muted" }, [
                              certificate.image ? (openBlock(), createBlock("img", {
                                key: 0,
                                src: certificate.image,
                                alt: certificate.title,
                                class: "h-full w-full object-cover"
                              }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                                key: 1,
                                class: "flex h-full items-center justify-center"
                              }, [
                                (openBlock(), createBlock("svg", {
                                  class: "h-6 w-6 text-muted-foreground/30",
                                  fill: "none",
                                  stroke: "currentColor",
                                  viewBox: "0 0 24 24"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    "stroke-width": "2",
                                    d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                  })
                                ]))
                              ]))
                            ]),
                            createVNode("div", { class: "min-w-0 flex-1" }, [
                              createVNode("h3", {
                                class: ["truncate text-sm font-medium text-foreground group-hover:text-primary", { "text-primary": isActiveCertificate(certificate.slug) }]
                              }, toDisplayString(certificate.title), 3),
                              createVNode("p", { class: "mt-0.5 truncate text-xs text-muted-foreground" }, toDisplayString(certificate.issuer), 1),
                              createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, toDisplayString(formatDate(certificate.issue_date)), 1)
                            ])
                          ])
                        ]),
                        _: 2
                      }, 1032, ["href", "class"]);
                    }), 128)),
                    certificates.value.length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "py-8 text-center"
                    }, [
                      (openBlock(), createBlock("svg", {
                        class: "mx-auto h-12 w-12 text-muted-foreground/30",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        })
                      ])),
                      createVNode("p", { class: "mt-2 text-xs text-muted-foreground" }, "Henüz sertifika yok")
                    ])) : createCommentVNode("", true)
                  ])
                ]),
                _: 1
              }, 512)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Certificates/_layouts/SidebarLayoutCertificate.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const SidebarLayoutCertificate = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c907b2e5"]]);
export {
  SidebarLayoutCertificate as default
};
