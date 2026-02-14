import { computed, withCtx, unref, createVNode, createBlock, openBlock, createCommentVNode, toDisplayString, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import _sfc_main$1 from "./LayoutCertificates-CmzO-wRk.js";
import { _ as _sfc_main$2 } from "./CheckScreen-DjaYf9so.js";
import "./CheckLayout-3_RH6d5N.js";
import "./SidebarLayoutCertificate-BD_mfRTX.js";
import "./SubSidebarScreen-DNe7gM-E.js";
import "vuex";
import "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
import "./FlashMessage-C3JOGPFR.js";
const _sfc_main = {
  __name: "IndexCertificate",
  __ssrInlineRender: true,
  props: {
    certificates: Array,
    screen: Object
  },
  setup(__props) {
    const page = usePage();
    computed(() => {
      var _a;
      return (_a = page.props.auth) == null ? void 0 : _a.user;
    });
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("tr-TR", { year: "numeric", month: "long" });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        screen: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="p-6 pt-12 sm:p-8 sm:pt-16"${_scopeId2}><div class="mb-8"${_scopeId2}><h1 class="text-2xl font-semibold text-foreground sm:text-3xl"${_scopeId2}>Sertifikalar</h1><p class="mt-2 text-sm text-muted-foreground"${_scopeId2}>${ssrInterpolate(__props.certificates.length)} sertifika</p></div>`);
                  if (__props.certificates.length > 0) {
                    _push3(`<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"${_scopeId2}><!--[-->`);
                    ssrRenderList(__props.certificates, (certificate) => {
                      _push3(ssrRenderComponent(unref(Link), {
                        key: certificate.id,
                        href: _ctx.route("certificates.show", certificate.slug),
                        class: "group overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<div class="relative aspect-[4/3] overflow-hidden bg-muted"${_scopeId3}>`);
                            if (certificate.image) {
                              _push4(`<img${ssrRenderAttr("src", certificate.image)}${ssrRenderAttr("alt", certificate.title)} class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"${_scopeId3}>`);
                            } else {
                              _push4(`<div class="flex h-full items-center justify-center"${_scopeId3}><svg class="h-16 w-16 text-muted-foreground/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId3}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"${_scopeId3}></path></svg></div>`);
                            }
                            _push4(`<div class="absolute right-3 top-3"${_scopeId3}>`);
                            if (certificate.status === "expired") {
                              _push4(`<span class="inline-flex items-center rounded-full bg-destructive px-2.5 py-0.5 text-xs font-semibold text-destructive-foreground"${_scopeId3}> Süresi Doldu </span>`);
                            } else if (certificate.status === "draft") {
                              _push4(`<span class="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground"${_scopeId3}> Taslak </span>`);
                            } else {
                              _push4(`<!---->`);
                            }
                            _push4(`</div></div><div class="p-4"${_scopeId3}><h3 class="mb-2 line-clamp-2 text-lg font-semibold text-foreground group-hover:text-primary"${_scopeId3}>${ssrInterpolate(certificate.title)}</h3><p class="mb-3 text-sm text-muted-foreground"${_scopeId3}>${ssrInterpolate(certificate.issuer)}</p><div class="flex items-center gap-2 text-xs text-muted-foreground"${_scopeId3}><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId3}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"${_scopeId3}></path></svg><span${_scopeId3}>${ssrInterpolate(formatDate(certificate.issue_date))}</span></div>`);
                            if (certificate.skills && certificate.skills.length > 0) {
                              _push4(`<div class="mt-3 flex flex-wrap gap-1"${_scopeId3}><!--[-->`);
                              ssrRenderList(certificate.skills.slice(0, 3), (skill, index) => {
                                _push4(`<span class="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"${_scopeId3}>${ssrInterpolate(skill)}</span>`);
                              });
                              _push4(`<!--]-->`);
                              if (certificate.skills.length > 3) {
                                _push4(`<span class="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"${_scopeId3}> +${ssrInterpolate(certificate.skills.length - 3)}</span>`);
                              } else {
                                _push4(`<!---->`);
                              }
                              _push4(`</div>`);
                            } else {
                              _push4(`<!---->`);
                            }
                            _push4(`</div>`);
                          } else {
                            return [
                              createVNode("div", { class: "relative aspect-[4/3] overflow-hidden bg-muted" }, [
                                certificate.image ? (openBlock(), createBlock("img", {
                                  key: 0,
                                  src: certificate.image,
                                  alt: certificate.title,
                                  class: "h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                                  key: 1,
                                  class: "flex h-full items-center justify-center"
                                }, [
                                  (openBlock(), createBlock("svg", {
                                    class: "h-16 w-16 text-muted-foreground/30",
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
                                ])),
                                createVNode("div", { class: "absolute right-3 top-3" }, [
                                  certificate.status === "expired" ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    class: "inline-flex items-center rounded-full bg-destructive px-2.5 py-0.5 text-xs font-semibold text-destructive-foreground"
                                  }, " Süresi Doldu ")) : certificate.status === "draft" ? (openBlock(), createBlock("span", {
                                    key: 1,
                                    class: "inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground"
                                  }, " Taslak ")) : createCommentVNode("", true)
                                ])
                              ]),
                              createVNode("div", { class: "p-4" }, [
                                createVNode("h3", { class: "mb-2 line-clamp-2 text-lg font-semibold text-foreground group-hover:text-primary" }, toDisplayString(certificate.title), 1),
                                createVNode("p", { class: "mb-3 text-sm text-muted-foreground" }, toDisplayString(certificate.issuer), 1),
                                createVNode("div", { class: "flex items-center gap-2 text-xs text-muted-foreground" }, [
                                  (openBlock(), createBlock("svg", {
                                    class: "h-4 w-4",
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
                                  createVNode("span", null, toDisplayString(formatDate(certificate.issue_date)), 1)
                                ]),
                                certificate.skills && certificate.skills.length > 0 ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "mt-3 flex flex-wrap gap-1"
                                }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(certificate.skills.slice(0, 3), (skill, index) => {
                                    return openBlock(), createBlock("span", {
                                      key: index,
                                      class: "inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                                    }, toDisplayString(skill), 1);
                                  }), 128)),
                                  certificate.skills.length > 3 ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    class: "inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
                                  }, " +" + toDisplayString(certificate.skills.length - 3), 1)) : createCommentVNode("", true)
                                ])) : createCommentVNode("", true)
                              ])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]--></div>`);
                  } else {
                    _push3(`<div class="py-12 text-center"${_scopeId2}><svg class="mx-auto h-16 w-16 text-muted-foreground/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"${_scopeId2}></path></svg><h3 class="mt-4 text-lg font-semibold text-foreground"${_scopeId2}>Henüz sertifika yok</h3><p class="mt-2 text-sm text-muted-foreground"${_scopeId2}>Sidebar&#39;daki + butonundan ilk sertifikanızı ekleyebilirsiniz</p></div>`);
                  }
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "p-6 pt-12 sm:p-8 sm:pt-16" }, [
                      createVNode("div", { class: "mb-8" }, [
                        createVNode("h1", { class: "text-2xl font-semibold text-foreground sm:text-3xl" }, "Sertifikalar"),
                        createVNode("p", { class: "mt-2 text-sm text-muted-foreground" }, toDisplayString(__props.certificates.length) + " sertifika", 1)
                      ]),
                      __props.certificates.length > 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.certificates, (certificate) => {
                          return openBlock(), createBlock(unref(Link), {
                            key: certificate.id,
                            href: _ctx.route("certificates.show", certificate.slug),
                            class: "group overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "relative aspect-[4/3] overflow-hidden bg-muted" }, [
                                certificate.image ? (openBlock(), createBlock("img", {
                                  key: 0,
                                  src: certificate.image,
                                  alt: certificate.title,
                                  class: "h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                                  key: 1,
                                  class: "flex h-full items-center justify-center"
                                }, [
                                  (openBlock(), createBlock("svg", {
                                    class: "h-16 w-16 text-muted-foreground/30",
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
                                ])),
                                createVNode("div", { class: "absolute right-3 top-3" }, [
                                  certificate.status === "expired" ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    class: "inline-flex items-center rounded-full bg-destructive px-2.5 py-0.5 text-xs font-semibold text-destructive-foreground"
                                  }, " Süresi Doldu ")) : certificate.status === "draft" ? (openBlock(), createBlock("span", {
                                    key: 1,
                                    class: "inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground"
                                  }, " Taslak ")) : createCommentVNode("", true)
                                ])
                              ]),
                              createVNode("div", { class: "p-4" }, [
                                createVNode("h3", { class: "mb-2 line-clamp-2 text-lg font-semibold text-foreground group-hover:text-primary" }, toDisplayString(certificate.title), 1),
                                createVNode("p", { class: "mb-3 text-sm text-muted-foreground" }, toDisplayString(certificate.issuer), 1),
                                createVNode("div", { class: "flex items-center gap-2 text-xs text-muted-foreground" }, [
                                  (openBlock(), createBlock("svg", {
                                    class: "h-4 w-4",
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
                                  createVNode("span", null, toDisplayString(formatDate(certificate.issue_date)), 1)
                                ]),
                                certificate.skills && certificate.skills.length > 0 ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "mt-3 flex flex-wrap gap-1"
                                }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(certificate.skills.slice(0, 3), (skill, index) => {
                                    return openBlock(), createBlock("span", {
                                      key: index,
                                      class: "inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                                    }, toDisplayString(skill), 1);
                                  }), 128)),
                                  certificate.skills.length > 3 ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    class: "inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
                                  }, " +" + toDisplayString(certificate.skills.length - 3), 1)) : createCommentVNode("", true)
                                ])) : createCommentVNode("", true)
                              ])
                            ]),
                            _: 2
                          }, 1032, ["href"]);
                        }), 128))
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "py-12 text-center"
                      }, [
                        (openBlock(), createBlock("svg", {
                          class: "mx-auto h-16 w-16 text-muted-foreground/30",
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
                        createVNode("h3", { class: "mt-4 text-lg font-semibold text-foreground" }, "Henüz sertifika yok"),
                        createVNode("p", { class: "mt-2 text-sm text-muted-foreground" }, "Sidebar'daki + butonundan ilk sertifikanızı ekleyebilirsiniz")
                      ]))
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "p-6 pt-12 sm:p-8 sm:pt-16" }, [
                    createVNode("div", { class: "mb-8" }, [
                      createVNode("h1", { class: "text-2xl font-semibold text-foreground sm:text-3xl" }, "Sertifikalar"),
                      createVNode("p", { class: "mt-2 text-sm text-muted-foreground" }, toDisplayString(__props.certificates.length) + " sertifika", 1)
                    ]),
                    __props.certificates.length > 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.certificates, (certificate) => {
                        return openBlock(), createBlock(unref(Link), {
                          key: certificate.id,
                          href: _ctx.route("certificates.show", certificate.slug),
                          class: "group overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "relative aspect-[4/3] overflow-hidden bg-muted" }, [
                              certificate.image ? (openBlock(), createBlock("img", {
                                key: 0,
                                src: certificate.image,
                                alt: certificate.title,
                                class: "h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                              }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                                key: 1,
                                class: "flex h-full items-center justify-center"
                              }, [
                                (openBlock(), createBlock("svg", {
                                  class: "h-16 w-16 text-muted-foreground/30",
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
                              ])),
                              createVNode("div", { class: "absolute right-3 top-3" }, [
                                certificate.status === "expired" ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: "inline-flex items-center rounded-full bg-destructive px-2.5 py-0.5 text-xs font-semibold text-destructive-foreground"
                                }, " Süresi Doldu ")) : certificate.status === "draft" ? (openBlock(), createBlock("span", {
                                  key: 1,
                                  class: "inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground"
                                }, " Taslak ")) : createCommentVNode("", true)
                              ])
                            ]),
                            createVNode("div", { class: "p-4" }, [
                              createVNode("h3", { class: "mb-2 line-clamp-2 text-lg font-semibold text-foreground group-hover:text-primary" }, toDisplayString(certificate.title), 1),
                              createVNode("p", { class: "mb-3 text-sm text-muted-foreground" }, toDisplayString(certificate.issuer), 1),
                              createVNode("div", { class: "flex items-center gap-2 text-xs text-muted-foreground" }, [
                                (openBlock(), createBlock("svg", {
                                  class: "h-4 w-4",
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
                                createVNode("span", null, toDisplayString(formatDate(certificate.issue_date)), 1)
                              ]),
                              certificate.skills && certificate.skills.length > 0 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "mt-3 flex flex-wrap gap-1"
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(certificate.skills.slice(0, 3), (skill, index) => {
                                  return openBlock(), createBlock("span", {
                                    key: index,
                                    class: "inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                                  }, toDisplayString(skill), 1);
                                }), 128)),
                                certificate.skills.length > 3 ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: "inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
                                }, " +" + toDisplayString(certificate.skills.length - 3), 1)) : createCommentVNode("", true)
                              ])) : createCommentVNode("", true)
                            ])
                          ]),
                          _: 2
                        }, 1032, ["href"]);
                      }), 128))
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "py-12 text-center"
                    }, [
                      (openBlock(), createBlock("svg", {
                        class: "mx-auto h-16 w-16 text-muted-foreground/30",
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
                      createVNode("h3", { class: "mt-4 text-lg font-semibold text-foreground" }, "Henüz sertifika yok"),
                      createVNode("p", { class: "mt-2 text-sm text-muted-foreground" }, "Sidebar'daki + butonundan ilk sertifikanızı ekleyebilirsiniz")
                    ]))
                  ])
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
export {
  _sfc_main as default
};
