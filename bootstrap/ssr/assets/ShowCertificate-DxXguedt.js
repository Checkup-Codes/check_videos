import { computed, withCtx, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, createTextVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
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
  __name: "ShowCertificate",
  __ssrInlineRender: true,
  props: {
    certificate: Object,
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
      return date.toLocaleDateString("tr-TR", { year: "numeric", month: "long", day: "numeric" });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        screen: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="p-6 pt-12 sm:p-8 sm:pt-16"${_scopeId2}><div class="grid grid-cols-1 gap-8 lg:grid-cols-2"${_scopeId2}><div class="space-y-4"${_scopeId2}><div class="overflow-hidden rounded-xl border border-border bg-card"${_scopeId2}>`);
                  if (__props.certificate.image) {
                    _push3(`<div class="relative aspect-[4/3]"${_scopeId2}><img${ssrRenderAttr("src", __props.certificate.image)}${ssrRenderAttr("alt", __props.certificate.title)} class="h-full w-full object-contain"${_scopeId2}></div>`);
                  } else {
                    _push3(`<div class="flex aspect-[4/3] items-center justify-center bg-muted"${_scopeId2}><svg class="h-24 w-24 text-muted-foreground/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"${_scopeId2}></path></svg></div>`);
                  }
                  _push3(`</div>`);
                  if (__props.certificate.credential_id || __props.certificate.credential_url) {
                    _push3(`<div class="rounded-lg border border-border bg-card p-4"${_scopeId2}><h3 class="mb-3 text-sm font-semibold text-foreground"${_scopeId2}>Doğrulama Bilgileri</h3><div class="space-y-2"${_scopeId2}>`);
                    if (__props.certificate.credential_id) {
                      _push3(`<div class="flex items-start gap-2"${_scopeId2}><svg class="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"${_scopeId2}></path></svg><div class="flex-1"${_scopeId2}><p class="text-xs text-muted-foreground"${_scopeId2}>Sertifika ID</p><p class="font-mono text-sm text-foreground"${_scopeId2}>${ssrInterpolate(__props.certificate.credential_id)}</p></div></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    if (__props.certificate.credential_url) {
                      _push3(`<div${_scopeId2}><a${ssrRenderAttr("href", __props.certificate.credential_url)} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-sm text-primary hover:underline"${_scopeId2}><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"${_scopeId2}></path></svg> Sertifikayı Doğrula </a></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="space-y-6"${_scopeId2}><div${_scopeId2}><div class="mb-4"${_scopeId2}><h1 class="text-2xl font-bold text-foreground sm:text-3xl"${_scopeId2}>${ssrInterpolate(__props.certificate.title)}</h1><p class="mt-2 text-lg text-muted-foreground"${_scopeId2}>${ssrInterpolate(__props.certificate.issuer)}</p></div><div class="flex items-center gap-2"${_scopeId2}>`);
                  if (__props.certificate.status === "active") {
                    _push3(`<span class="inline-flex items-center rounded-full bg-green-500/10 px-3 py-1 text-sm font-semibold text-green-600 dark:text-green-400"${_scopeId2}><svg class="mr-1.5 h-3 w-3" fill="currentColor" viewBox="0 0 20 20"${_scopeId2}><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"${_scopeId2}></path></svg> Aktif </span>`);
                  } else if (__props.certificate.status === "expired") {
                    _push3(`<span class="inline-flex items-center rounded-full bg-destructive/10 px-3 py-1 text-sm font-semibold text-destructive"${_scopeId2}> Süresi Doldu </span>`);
                  } else {
                    _push3(`<span class="inline-flex items-center rounded-full bg-muted px-3 py-1 text-sm font-semibold text-muted-foreground"${_scopeId2}> Taslak </span>`);
                  }
                  _push3(`</div></div><div class="grid grid-cols-2 gap-4"${_scopeId2}><div class="rounded-lg border border-border bg-card p-4"${_scopeId2}><div class="flex items-center gap-2 text-sm text-muted-foreground"${_scopeId2}><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"${_scopeId2}></path></svg> Alınma Tarihi </div><p class="mt-2 text-lg font-semibold text-foreground"${_scopeId2}>${ssrInterpolate(formatDate(__props.certificate.issue_date))}</p></div>`);
                  if (__props.certificate.expiry_date) {
                    _push3(`<div class="rounded-lg border border-border bg-card p-4"${_scopeId2}><div class="flex items-center gap-2 text-sm text-muted-foreground"${_scopeId2}><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId2}></path></svg> Geçerlilik Sonu </div><p class="mt-2 text-lg font-semibold text-foreground"${_scopeId2}>${ssrInterpolate(formatDate(__props.certificate.expiry_date))}</p></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                  if (__props.certificate.description) {
                    _push3(`<div class="rounded-lg border border-border bg-card p-4"${_scopeId2}><h3 class="mb-2 text-sm font-semibold text-foreground"${_scopeId2}>Açıklama</h3><p class="text-sm leading-relaxed text-muted-foreground"${_scopeId2}>${ssrInterpolate(__props.certificate.description)}</p></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (__props.certificate.skills && __props.certificate.skills.length > 0) {
                    _push3(`<div class="rounded-lg border border-border bg-card p-4"${_scopeId2}><h3 class="mb-3 text-sm font-semibold text-foreground"${_scopeId2}>İlgili Beceriler</h3><div class="flex flex-wrap gap-2"${_scopeId2}><!--[-->`);
                    ssrRenderList(__props.certificate.skills, (skill, index) => {
                      _push3(`<span class="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"${_scopeId2}>${ssrInterpolate(skill)}</span>`);
                    });
                    _push3(`<!--]--></div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "p-6 pt-12 sm:p-8 sm:pt-16" }, [
                      createVNode("div", { class: "grid grid-cols-1 gap-8 lg:grid-cols-2" }, [
                        createVNode("div", { class: "space-y-4" }, [
                          createVNode("div", { class: "overflow-hidden rounded-xl border border-border bg-card" }, [
                            __props.certificate.image ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "relative aspect-[4/3]"
                            }, [
                              createVNode("img", {
                                src: __props.certificate.image,
                                alt: __props.certificate.title,
                                class: "h-full w-full object-contain"
                              }, null, 8, ["src", "alt"])
                            ])) : (openBlock(), createBlock("div", {
                              key: 1,
                              class: "flex aspect-[4/3] items-center justify-center bg-muted"
                            }, [
                              (openBlock(), createBlock("svg", {
                                class: "h-24 w-24 text-muted-foreground/30",
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
                          __props.certificate.credential_id || __props.certificate.credential_url ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "rounded-lg border border-border bg-card p-4"
                          }, [
                            createVNode("h3", { class: "mb-3 text-sm font-semibold text-foreground" }, "Doğrulama Bilgileri"),
                            createVNode("div", { class: "space-y-2" }, [
                              __props.certificate.credential_id ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "flex items-start gap-2"
                              }, [
                                (openBlock(), createBlock("svg", {
                                  class: "mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground",
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
                                ])),
                                createVNode("div", { class: "flex-1" }, [
                                  createVNode("p", { class: "text-xs text-muted-foreground" }, "Sertifika ID"),
                                  createVNode("p", { class: "font-mono text-sm text-foreground" }, toDisplayString(__props.certificate.credential_id), 1)
                                ])
                              ])) : createCommentVNode("", true),
                              __props.certificate.credential_url ? (openBlock(), createBlock("div", { key: 1 }, [
                                createVNode("a", {
                                  href: __props.certificate.credential_url,
                                  target: "_blank",
                                  rel: "noopener noreferrer",
                                  class: "inline-flex items-center gap-2 text-sm text-primary hover:underline"
                                }, [
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
                                      d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                    })
                                  ])),
                                  createTextVNode(" Sertifikayı Doğrula ")
                                ], 8, ["href"])
                              ])) : createCommentVNode("", true)
                            ])
                          ])) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "space-y-6" }, [
                          createVNode("div", null, [
                            createVNode("div", { class: "mb-4" }, [
                              createVNode("h1", { class: "text-2xl font-bold text-foreground sm:text-3xl" }, toDisplayString(__props.certificate.title), 1),
                              createVNode("p", { class: "mt-2 text-lg text-muted-foreground" }, toDisplayString(__props.certificate.issuer), 1)
                            ]),
                            createVNode("div", { class: "flex items-center gap-2" }, [
                              __props.certificate.status === "active" ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "inline-flex items-center rounded-full bg-green-500/10 px-3 py-1 text-sm font-semibold text-green-600 dark:text-green-400"
                              }, [
                                (openBlock(), createBlock("svg", {
                                  class: "mr-1.5 h-3 w-3",
                                  fill: "currentColor",
                                  viewBox: "0 0 20 20"
                                }, [
                                  createVNode("path", {
                                    "fill-rule": "evenodd",
                                    d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
                                    "clip-rule": "evenodd"
                                  })
                                ])),
                                createTextVNode(" Aktif ")
                              ])) : __props.certificate.status === "expired" ? (openBlock(), createBlock("span", {
                                key: 1,
                                class: "inline-flex items-center rounded-full bg-destructive/10 px-3 py-1 text-sm font-semibold text-destructive"
                              }, " Süresi Doldu ")) : (openBlock(), createBlock("span", {
                                key: 2,
                                class: "inline-flex items-center rounded-full bg-muted px-3 py-1 text-sm font-semibold text-muted-foreground"
                              }, " Taslak "))
                            ])
                          ]),
                          createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                            createVNode("div", { class: "rounded-lg border border-border bg-card p-4" }, [
                              createVNode("div", { class: "flex items-center gap-2 text-sm text-muted-foreground" }, [
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
                                createTextVNode(" Alınma Tarihi ")
                              ]),
                              createVNode("p", { class: "mt-2 text-lg font-semibold text-foreground" }, toDisplayString(formatDate(__props.certificate.issue_date)), 1)
                            ]),
                            __props.certificate.expiry_date ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "rounded-lg border border-border bg-card p-4"
                            }, [
                              createVNode("div", { class: "flex items-center gap-2 text-sm text-muted-foreground" }, [
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
                                    d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                  })
                                ])),
                                createTextVNode(" Geçerlilik Sonu ")
                              ]),
                              createVNode("p", { class: "mt-2 text-lg font-semibold text-foreground" }, toDisplayString(formatDate(__props.certificate.expiry_date)), 1)
                            ])) : createCommentVNode("", true)
                          ]),
                          __props.certificate.description ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "rounded-lg border border-border bg-card p-4"
                          }, [
                            createVNode("h3", { class: "mb-2 text-sm font-semibold text-foreground" }, "Açıklama"),
                            createVNode("p", { class: "text-sm leading-relaxed text-muted-foreground" }, toDisplayString(__props.certificate.description), 1)
                          ])) : createCommentVNode("", true),
                          __props.certificate.skills && __props.certificate.skills.length > 0 ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "rounded-lg border border-border bg-card p-4"
                          }, [
                            createVNode("h3", { class: "mb-3 text-sm font-semibold text-foreground" }, "İlgili Beceriler"),
                            createVNode("div", { class: "flex flex-wrap gap-2" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.certificate.skills, (skill, index) => {
                                return openBlock(), createBlock("span", {
                                  key: index,
                                  class: "inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                                }, toDisplayString(skill), 1);
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
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "p-6 pt-12 sm:p-8 sm:pt-16" }, [
                    createVNode("div", { class: "grid grid-cols-1 gap-8 lg:grid-cols-2" }, [
                      createVNode("div", { class: "space-y-4" }, [
                        createVNode("div", { class: "overflow-hidden rounded-xl border border-border bg-card" }, [
                          __props.certificate.image ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "relative aspect-[4/3]"
                          }, [
                            createVNode("img", {
                              src: __props.certificate.image,
                              alt: __props.certificate.title,
                              class: "h-full w-full object-contain"
                            }, null, 8, ["src", "alt"])
                          ])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "flex aspect-[4/3] items-center justify-center bg-muted"
                          }, [
                            (openBlock(), createBlock("svg", {
                              class: "h-24 w-24 text-muted-foreground/30",
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
                        __props.certificate.credential_id || __props.certificate.credential_url ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "rounded-lg border border-border bg-card p-4"
                        }, [
                          createVNode("h3", { class: "mb-3 text-sm font-semibold text-foreground" }, "Doğrulama Bilgileri"),
                          createVNode("div", { class: "space-y-2" }, [
                            __props.certificate.credential_id ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "flex items-start gap-2"
                            }, [
                              (openBlock(), createBlock("svg", {
                                class: "mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground",
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
                              ])),
                              createVNode("div", { class: "flex-1" }, [
                                createVNode("p", { class: "text-xs text-muted-foreground" }, "Sertifika ID"),
                                createVNode("p", { class: "font-mono text-sm text-foreground" }, toDisplayString(__props.certificate.credential_id), 1)
                              ])
                            ])) : createCommentVNode("", true),
                            __props.certificate.credential_url ? (openBlock(), createBlock("div", { key: 1 }, [
                              createVNode("a", {
                                href: __props.certificate.credential_url,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                class: "inline-flex items-center gap-2 text-sm text-primary hover:underline"
                              }, [
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
                                    d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                  })
                                ])),
                                createTextVNode(" Sertifikayı Doğrula ")
                              ], 8, ["href"])
                            ])) : createCommentVNode("", true)
                          ])
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "space-y-6" }, [
                        createVNode("div", null, [
                          createVNode("div", { class: "mb-4" }, [
                            createVNode("h1", { class: "text-2xl font-bold text-foreground sm:text-3xl" }, toDisplayString(__props.certificate.title), 1),
                            createVNode("p", { class: "mt-2 text-lg text-muted-foreground" }, toDisplayString(__props.certificate.issuer), 1)
                          ]),
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            __props.certificate.status === "active" ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "inline-flex items-center rounded-full bg-green-500/10 px-3 py-1 text-sm font-semibold text-green-600 dark:text-green-400"
                            }, [
                              (openBlock(), createBlock("svg", {
                                class: "mr-1.5 h-3 w-3",
                                fill: "currentColor",
                                viewBox: "0 0 20 20"
                              }, [
                                createVNode("path", {
                                  "fill-rule": "evenodd",
                                  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
                                  "clip-rule": "evenodd"
                                })
                              ])),
                              createTextVNode(" Aktif ")
                            ])) : __props.certificate.status === "expired" ? (openBlock(), createBlock("span", {
                              key: 1,
                              class: "inline-flex items-center rounded-full bg-destructive/10 px-3 py-1 text-sm font-semibold text-destructive"
                            }, " Süresi Doldu ")) : (openBlock(), createBlock("span", {
                              key: 2,
                              class: "inline-flex items-center rounded-full bg-muted px-3 py-1 text-sm font-semibold text-muted-foreground"
                            }, " Taslak "))
                          ])
                        ]),
                        createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                          createVNode("div", { class: "rounded-lg border border-border bg-card p-4" }, [
                            createVNode("div", { class: "flex items-center gap-2 text-sm text-muted-foreground" }, [
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
                              createTextVNode(" Alınma Tarihi ")
                            ]),
                            createVNode("p", { class: "mt-2 text-lg font-semibold text-foreground" }, toDisplayString(formatDate(__props.certificate.issue_date)), 1)
                          ]),
                          __props.certificate.expiry_date ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "rounded-lg border border-border bg-card p-4"
                          }, [
                            createVNode("div", { class: "flex items-center gap-2 text-sm text-muted-foreground" }, [
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
                                  d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                })
                              ])),
                              createTextVNode(" Geçerlilik Sonu ")
                            ]),
                            createVNode("p", { class: "mt-2 text-lg font-semibold text-foreground" }, toDisplayString(formatDate(__props.certificate.expiry_date)), 1)
                          ])) : createCommentVNode("", true)
                        ]),
                        __props.certificate.description ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "rounded-lg border border-border bg-card p-4"
                        }, [
                          createVNode("h3", { class: "mb-2 text-sm font-semibold text-foreground" }, "Açıklama"),
                          createVNode("p", { class: "text-sm leading-relaxed text-muted-foreground" }, toDisplayString(__props.certificate.description), 1)
                        ])) : createCommentVNode("", true),
                        __props.certificate.skills && __props.certificate.skills.length > 0 ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "rounded-lg border border-border bg-card p-4"
                        }, [
                          createVNode("h3", { class: "mb-3 text-sm font-semibold text-foreground" }, "İlgili Beceriler"),
                          createVNode("div", { class: "flex flex-wrap gap-2" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.certificate.skills, (skill, index) => {
                              return openBlock(), createBlock("span", {
                                key: index,
                                class: "inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                              }, toDisplayString(skill), 1);
                            }), 128))
                          ])
                        ])) : createCommentVNode("", true)
                      ])
                    ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Certificates/ShowCertificate.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
