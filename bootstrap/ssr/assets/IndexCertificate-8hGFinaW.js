import { withCtx, unref, createVNode, openBlock, createBlock, createCommentVNode, toDisplayString, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import _sfc_main$1 from "./LayoutCertificates-C-R2ygJ9.js";
import { _ as _sfc_main$2 } from "./CheckScreen-ChCDBWK6.js";
import { _ as _sfc_main$3 } from "./PageShell-DjZZ5koh.js";
import { _ as _sfc_main$4 } from "./PageHeader-FZ8QTap0.js";
import { _ as _export_sfc } from "../ssr.js";
import "./CheckLayout-ULa51pW8.js";
import "./FlashMessage-DLOdJQqX.js";
import "@fortawesome/vue-fontawesome";
import "vuex";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = {
  __name: "IndexCertificate",
  __ssrInlineRender: true,
  props: {
    certificates: {
      type: Array,
      default: () => []
    },
    screen: Object
  },
  setup(__props) {
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("tr-TR", { year: "numeric", month: "short" });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        screen: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$3, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$4, {
                          title: "Sertifikalar",
                          description: `${__props.certificates.length} sertifika`
                        }, null, _parent4, _scopeId3));
                        if (__props.certificates.length > 0) {
                          _push4(`<div class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" data-v-176420e8${_scopeId3}><!--[-->`);
                          ssrRenderList(__props.certificates, (certificate) => {
                            _push4(ssrRenderComponent(unref(Link), {
                              key: certificate.id,
                              href: _ctx.route("certificates.show", certificate.slug),
                              class: "group block"
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<div class="relative aspect-video overflow-hidden rounded-xl bg-muted" data-v-176420e8${_scopeId4}>`);
                                  if (certificate.image) {
                                    _push5(`<img${ssrRenderAttr("src", certificate.image)}${ssrRenderAttr("alt", certificate.title)} class="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.03]" data-v-176420e8${_scopeId4}>`);
                                  } else {
                                    _push5(`<div class="flex h-full items-center justify-center" data-v-176420e8${_scopeId4}><svg class="h-12 w-12 text-muted-foreground/25" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-176420e8${_scopeId4}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-176420e8${_scopeId4}></path></svg></div>`);
                                  }
                                  if (certificate.status === "expired") {
                                    _push5(`<span class="absolute right-2 top-2 rounded-md bg-destructive/90 px-2 py-0.5 text-[10px] font-medium text-destructive-foreground" data-v-176420e8${_scopeId4}> Süresi doldu </span>`);
                                  } else if (certificate.status === "draft") {
                                    _push5(`<span class="absolute right-2 top-2 rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm" data-v-176420e8${_scopeId4}> Taslak </span>`);
                                  } else {
                                    _push5(`<!---->`);
                                  }
                                  _push5(`</div><div class="mt-3 space-y-1 pr-1" data-v-176420e8${_scopeId4}><h3 class="line-clamp-2 text-sm font-medium leading-snug text-foreground transition-colors group-hover:text-primary"${ssrRenderAttr("title", certificate.title)} data-v-176420e8${_scopeId4}>${ssrInterpolate(certificate.title)}</h3><p class="line-clamp-1 text-xs text-muted-foreground" data-v-176420e8${_scopeId4}>${ssrInterpolate(certificate.issuer)} · ${ssrInterpolate(formatDate(certificate.issue_date))}</p></div>`);
                                } else {
                                  return [
                                    createVNode("div", { class: "relative aspect-video overflow-hidden rounded-xl bg-muted" }, [
                                      certificate.image ? (openBlock(), createBlock("img", {
                                        key: 0,
                                        src: certificate.image,
                                        alt: certificate.title,
                                        class: "h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
                                      }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                                        key: 1,
                                        class: "flex h-full items-center justify-center"
                                      }, [
                                        (openBlock(), createBlock("svg", {
                                          class: "h-12 w-12 text-muted-foreground/25",
                                          fill: "none",
                                          stroke: "currentColor",
                                          viewBox: "0 0 24 24"
                                        }, [
                                          createVNode("path", {
                                            "stroke-linecap": "round",
                                            "stroke-linejoin": "round",
                                            "stroke-width": "1.5",
                                            d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                          })
                                        ]))
                                      ])),
                                      certificate.status === "expired" ? (openBlock(), createBlock("span", {
                                        key: 2,
                                        class: "absolute right-2 top-2 rounded-md bg-destructive/90 px-2 py-0.5 text-[10px] font-medium text-destructive-foreground"
                                      }, " Süresi doldu ")) : certificate.status === "draft" ? (openBlock(), createBlock("span", {
                                        key: 3,
                                        class: "absolute right-2 top-2 rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm"
                                      }, " Taslak ")) : createCommentVNode("", true)
                                    ]),
                                    createVNode("div", { class: "mt-3 space-y-1 pr-1" }, [
                                      createVNode("h3", {
                                        class: "line-clamp-2 text-sm font-medium leading-snug text-foreground transition-colors group-hover:text-primary",
                                        title: certificate.title
                                      }, toDisplayString(certificate.title), 9, ["title"]),
                                      createVNode("p", { class: "line-clamp-1 text-xs text-muted-foreground" }, toDisplayString(certificate.issuer) + " · " + toDisplayString(formatDate(certificate.issue_date)), 1)
                                    ])
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          });
                          _push4(`<!--]--></div>`);
                        } else {
                          _push4(`<div class="rounded-xl border border-dashed border-border py-16 text-center" data-v-176420e8${_scopeId3}><svg class="mx-auto h-14 w-14 text-muted-foreground/25" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-176420e8${_scopeId3}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-176420e8${_scopeId3}></path></svg><h3 class="mt-4 text-base font-medium text-foreground" data-v-176420e8${_scopeId3}>Henüz sertifika yok</h3><p class="mt-1 text-sm text-muted-foreground" data-v-176420e8${_scopeId3}>Sidebar&#39;dan yeni sertifika ekleyebilirsiniz.</p></div>`);
                        }
                      } else {
                        return [
                          createVNode(_sfc_main$4, {
                            title: "Sertifikalar",
                            description: `${__props.certificates.length} sertifika`
                          }, null, 8, ["description"]),
                          __props.certificates.length > 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.certificates, (certificate) => {
                              return openBlock(), createBlock(unref(Link), {
                                key: certificate.id,
                                href: _ctx.route("certificates.show", certificate.slug),
                                class: "group block"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "relative aspect-video overflow-hidden rounded-xl bg-muted" }, [
                                    certificate.image ? (openBlock(), createBlock("img", {
                                      key: 0,
                                      src: certificate.image,
                                      alt: certificate.title,
                                      class: "h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
                                    }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                                      key: 1,
                                      class: "flex h-full items-center justify-center"
                                    }, [
                                      (openBlock(), createBlock("svg", {
                                        class: "h-12 w-12 text-muted-foreground/25",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24"
                                      }, [
                                        createVNode("path", {
                                          "stroke-linecap": "round",
                                          "stroke-linejoin": "round",
                                          "stroke-width": "1.5",
                                          d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        })
                                      ]))
                                    ])),
                                    certificate.status === "expired" ? (openBlock(), createBlock("span", {
                                      key: 2,
                                      class: "absolute right-2 top-2 rounded-md bg-destructive/90 px-2 py-0.5 text-[10px] font-medium text-destructive-foreground"
                                    }, " Süresi doldu ")) : certificate.status === "draft" ? (openBlock(), createBlock("span", {
                                      key: 3,
                                      class: "absolute right-2 top-2 rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm"
                                    }, " Taslak ")) : createCommentVNode("", true)
                                  ]),
                                  createVNode("div", { class: "mt-3 space-y-1 pr-1" }, [
                                    createVNode("h3", {
                                      class: "line-clamp-2 text-sm font-medium leading-snug text-foreground transition-colors group-hover:text-primary",
                                      title: certificate.title
                                    }, toDisplayString(certificate.title), 9, ["title"]),
                                    createVNode("p", { class: "line-clamp-1 text-xs text-muted-foreground" }, toDisplayString(certificate.issuer) + " · " + toDisplayString(formatDate(certificate.issue_date)), 1)
                                  ])
                                ]),
                                _: 2
                              }, 1032, ["href"]);
                            }), 128))
                          ])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "rounded-xl border border-dashed border-border py-16 text-center"
                          }, [
                            (openBlock(), createBlock("svg", {
                              class: "mx-auto h-14 w-14 text-muted-foreground/25",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "1.5",
                                d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              })
                            ])),
                            createVNode("h3", { class: "mt-4 text-base font-medium text-foreground" }, "Henüz sertifika yok"),
                            createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, "Sidebar'dan yeni sertifika ekleyebilirsiniz.")
                          ]))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$3, null, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$4, {
                          title: "Sertifikalar",
                          description: `${__props.certificates.length} sertifika`
                        }, null, 8, ["description"]),
                        __props.certificates.length > 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.certificates, (certificate) => {
                            return openBlock(), createBlock(unref(Link), {
                              key: certificate.id,
                              href: _ctx.route("certificates.show", certificate.slug),
                              class: "group block"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "relative aspect-video overflow-hidden rounded-xl bg-muted" }, [
                                  certificate.image ? (openBlock(), createBlock("img", {
                                    key: 0,
                                    src: certificate.image,
                                    alt: certificate.title,
                                    class: "h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
                                  }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                                    key: 1,
                                    class: "flex h-full items-center justify-center"
                                  }, [
                                    (openBlock(), createBlock("svg", {
                                      class: "h-12 w-12 text-muted-foreground/25",
                                      fill: "none",
                                      stroke: "currentColor",
                                      viewBox: "0 0 24 24"
                                    }, [
                                      createVNode("path", {
                                        "stroke-linecap": "round",
                                        "stroke-linejoin": "round",
                                        "stroke-width": "1.5",
                                        d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                      })
                                    ]))
                                  ])),
                                  certificate.status === "expired" ? (openBlock(), createBlock("span", {
                                    key: 2,
                                    class: "absolute right-2 top-2 rounded-md bg-destructive/90 px-2 py-0.5 text-[10px] font-medium text-destructive-foreground"
                                  }, " Süresi doldu ")) : certificate.status === "draft" ? (openBlock(), createBlock("span", {
                                    key: 3,
                                    class: "absolute right-2 top-2 rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm"
                                  }, " Taslak ")) : createCommentVNode("", true)
                                ]),
                                createVNode("div", { class: "mt-3 space-y-1 pr-1" }, [
                                  createVNode("h3", {
                                    class: "line-clamp-2 text-sm font-medium leading-snug text-foreground transition-colors group-hover:text-primary",
                                    title: certificate.title
                                  }, toDisplayString(certificate.title), 9, ["title"]),
                                  createVNode("p", { class: "line-clamp-1 text-xs text-muted-foreground" }, toDisplayString(certificate.issuer) + " · " + toDisplayString(formatDate(certificate.issue_date)), 1)
                                ])
                              ]),
                              _: 2
                            }, 1032, ["href"]);
                          }), 128))
                        ])) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "rounded-xl border border-dashed border-border py-16 text-center"
                        }, [
                          (openBlock(), createBlock("svg", {
                            class: "mx-auto h-14 w-14 text-muted-foreground/25",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "1.5",
                              d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            })
                          ])),
                          createVNode("h3", { class: "mt-4 text-base font-medium text-foreground" }, "Henüz sertifika yok"),
                          createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, "Sidebar'dan yeni sertifika ekleyebilirsiniz.")
                        ]))
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, null, {
                default: withCtx(() => [
                  createVNode(_sfc_main$3, null, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$4, {
                        title: "Sertifikalar",
                        description: `${__props.certificates.length} sertifika`
                      }, null, 8, ["description"]),
                      __props.certificates.length > 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.certificates, (certificate) => {
                          return openBlock(), createBlock(unref(Link), {
                            key: certificate.id,
                            href: _ctx.route("certificates.show", certificate.slug),
                            class: "group block"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "relative aspect-video overflow-hidden rounded-xl bg-muted" }, [
                                certificate.image ? (openBlock(), createBlock("img", {
                                  key: 0,
                                  src: certificate.image,
                                  alt: certificate.title,
                                  class: "h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
                                }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                                  key: 1,
                                  class: "flex h-full items-center justify-center"
                                }, [
                                  (openBlock(), createBlock("svg", {
                                    class: "h-12 w-12 text-muted-foreground/25",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24"
                                  }, [
                                    createVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      "stroke-width": "1.5",
                                      d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    })
                                  ]))
                                ])),
                                certificate.status === "expired" ? (openBlock(), createBlock("span", {
                                  key: 2,
                                  class: "absolute right-2 top-2 rounded-md bg-destructive/90 px-2 py-0.5 text-[10px] font-medium text-destructive-foreground"
                                }, " Süresi doldu ")) : certificate.status === "draft" ? (openBlock(), createBlock("span", {
                                  key: 3,
                                  class: "absolute right-2 top-2 rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm"
                                }, " Taslak ")) : createCommentVNode("", true)
                              ]),
                              createVNode("div", { class: "mt-3 space-y-1 pr-1" }, [
                                createVNode("h3", {
                                  class: "line-clamp-2 text-sm font-medium leading-snug text-foreground transition-colors group-hover:text-primary",
                                  title: certificate.title
                                }, toDisplayString(certificate.title), 9, ["title"]),
                                createVNode("p", { class: "line-clamp-1 text-xs text-muted-foreground" }, toDisplayString(certificate.issuer) + " · " + toDisplayString(formatDate(certificate.issue_date)), 1)
                              ])
                            ]),
                            _: 2
                          }, 1032, ["href"]);
                        }), 128))
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "rounded-xl border border-dashed border-border py-16 text-center"
                      }, [
                        (openBlock(), createBlock("svg", {
                          class: "mx-auto h-14 w-14 text-muted-foreground/25",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "1.5",
                            d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          })
                        ])),
                        createVNode("h3", { class: "mt-4 text-base font-medium text-foreground" }, "Henüz sertifika yok"),
                        createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, "Sidebar'dan yeni sertifika ekleyebilirsiniz.")
                      ]))
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Certificates/IndexCertificate.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const IndexCertificate = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-176420e8"]]);
export {
  IndexCertificate as default
};
