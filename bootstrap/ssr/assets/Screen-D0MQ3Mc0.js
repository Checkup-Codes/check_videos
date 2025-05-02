import { withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, toDisplayString, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import { _ as _sfc_main$2 } from "./TopScreen-DnNmtdW-.js";
import { _ as _sfc_main$1 } from "./CheckScreen-CM3g7Drr.js";
import _sfc_main$3 from "./Card-qmctt-Ej.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  props: {
    projects: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    const formatDate = (date) => {
      if (!date) return "-";
      const options = { year: "numeric", month: "short", day: "numeric" };
      return new Date(date).toLocaleDateString("tr-TR", options);
    };
    const getStatusText = (status) => {
      const statusMap = {
        1: "Devam Ediyor",
        2: "Tamamlandı",
        3: "İptal Edildi",
        4: "Beklemede"
      };
      return statusMap[status] || "Bilinmiyor";
    };
    const getStatusClass = (status) => {
      const statusClassMap = {
        1: "badge-primary",
        2: "badge-success",
        3: "badge-error",
        4: "badge-warning"
      };
      return statusClassMap[status] || "badge-neutral";
    };
    const truncateText = (text, length) => {
      if (!text) return "";
      return text.length > length ? text.substring(0, length) + "..." : text;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, { title: "PROJELER" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Link), {
                    href: "/projects/create",
                    class: "btn btn-primary btn-sm"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId3}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"${_scopeId3}></path></svg> Yeni Proje `);
                      } else {
                        return [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            class: "mr-1 h-5 w-5",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M12 4v16m8-8H4"
                            })
                          ])),
                          createTextVNode(" Yeni Proje ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(Link), {
                      href: "/projects/create",
                      class: "btn btn-primary btn-sm"
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          class: "mr-1 h-5 w-5",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M12 4v16m8-8H4"
                          })
                        ])),
                        createTextVNode(" Yeni Proje ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="mb-5 w-full"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, { class: "card-compact w-full shadow-md" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (__props.projects.length === 0) {
                    _push3(`<div class="p-4"${_scopeId2}><div class="alert alert-warning"${_scopeId2}><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"${_scopeId2}></path></svg><span${_scopeId2}>Henüz proje bulunamadı.</span></div></div>`);
                  } else {
                    _push3(`<div class="overflow-x-auto"${_scopeId2}><table class="table-zebra table"${_scopeId2}><thead${_scopeId2}><tr${_scopeId2}><th class="text-left"${_scopeId2}>#</th><th class="text-left"${_scopeId2}>İsim</th><th class="text-center"${_scopeId2}>Durum</th><th class="text-center"${_scopeId2}>Müşteri</th><th class="text-center"${_scopeId2}>Oluşturma Tarihi</th><th class="text-center"${_scopeId2}>İşlemler</th></tr></thead><tbody${_scopeId2}><!--[-->`);
                    ssrRenderList(__props.projects, (project) => {
                      _push3(`<tr class="hover"${_scopeId2}><td${_scopeId2}>${ssrInterpolate(project.id)}</td><td${_scopeId2}><div class="font-medium"${_scopeId2}>${ssrInterpolate(project.name)}</div>`);
                      if (project.description) {
                        _push3(`<div class="text-sm opacity-70"${_scopeId2}>${ssrInterpolate(truncateText(project.description, 50))}</div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</td><td class="text-center"${_scopeId2}><div class="${ssrRenderClass([getStatusClass(project.status), "badge"])}"${_scopeId2}>${ssrInterpolate(getStatusText(project.status))}</div></td><td class="text-center"${_scopeId2}>`);
                      if (project.customer) {
                        _push3(ssrRenderComponent(unref(Link), {
                          href: `/customers/${project.customer.id}`,
                          class: "link link-hover link-primary"
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`${ssrInterpolate(project.customer.first_name)} ${ssrInterpolate(project.customer.last_name)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(project.customer.first_name) + " " + toDisplayString(project.customer.last_name), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      } else {
                        _push3(`<span class="opacity-70"${_scopeId2}>-</span>`);
                      }
                      _push3(`</td><td class="text-center"${_scopeId2}>${ssrInterpolate(formatDate(project.created_at))}</td><td class="text-center"${_scopeId2}><div class="flex justify-center space-x-1"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(Link), {
                        href: `/projects/${project.id}`,
                        class: "btn btn-xs btn-ghost"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId3}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"${_scopeId3}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"${_scopeId3}></path></svg>`);
                          } else {
                            return [
                              (openBlock(), createBlock("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                class: "h-4 w-4",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                stroke: "currentColor"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                }),
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                })
                              ]))
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(unref(Link), {
                        href: `/projects/${project.id}/edit`,
                        class: "btn btn-xs btn-ghost"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId3}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"${_scopeId3}></path></svg>`);
                          } else {
                            return [
                              (openBlock(), createBlock("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                class: "h-4 w-4",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                stroke: "currentColor"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                })
                              ]))
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`</div></td></tr>`);
                    });
                    _push3(`<!--]--></tbody></table></div>`);
                  }
                } else {
                  return [
                    __props.projects.length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "p-4"
                    }, [
                      createVNode("div", { class: "alert alert-warning" }, [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          class: "h-6 w-6 shrink-0 stroke-current",
                          fill: "none",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                          })
                        ])),
                        createVNode("span", null, "Henüz proje bulunamadı.")
                      ])
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "overflow-x-auto"
                    }, [
                      createVNode("table", { class: "table-zebra table" }, [
                        createVNode("thead", null, [
                          createVNode("tr", null, [
                            createVNode("th", { class: "text-left" }, "#"),
                            createVNode("th", { class: "text-left" }, "İsim"),
                            createVNode("th", { class: "text-center" }, "Durum"),
                            createVNode("th", { class: "text-center" }, "Müşteri"),
                            createVNode("th", { class: "text-center" }, "Oluşturma Tarihi"),
                            createVNode("th", { class: "text-center" }, "İşlemler")
                          ])
                        ]),
                        createVNode("tbody", null, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.projects, (project) => {
                            return openBlock(), createBlock("tr", {
                              key: project.id,
                              class: "hover"
                            }, [
                              createVNode("td", null, toDisplayString(project.id), 1),
                              createVNode("td", null, [
                                createVNode("div", { class: "font-medium" }, toDisplayString(project.name), 1),
                                project.description ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "text-sm opacity-70"
                                }, toDisplayString(truncateText(project.description, 50)), 1)) : createCommentVNode("", true)
                              ]),
                              createVNode("td", { class: "text-center" }, [
                                createVNode("div", {
                                  class: ["badge", getStatusClass(project.status)]
                                }, toDisplayString(getStatusText(project.status)), 3)
                              ]),
                              createVNode("td", { class: "text-center" }, [
                                project.customer ? (openBlock(), createBlock(unref(Link), {
                                  key: 0,
                                  href: `/customers/${project.customer.id}`,
                                  class: "link link-hover link-primary"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(project.customer.first_name) + " " + toDisplayString(project.customer.last_name), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["href"])) : (openBlock(), createBlock("span", {
                                  key: 1,
                                  class: "opacity-70"
                                }, "-"))
                              ]),
                              createVNode("td", { class: "text-center" }, toDisplayString(formatDate(project.created_at)), 1),
                              createVNode("td", { class: "text-center" }, [
                                createVNode("div", { class: "flex justify-center space-x-1" }, [
                                  createVNode(unref(Link), {
                                    href: `/projects/${project.id}`,
                                    class: "btn btn-xs btn-ghost"
                                  }, {
                                    default: withCtx(() => [
                                      (openBlock(), createBlock("svg", {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        class: "h-4 w-4",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        stroke: "currentColor"
                                      }, [
                                        createVNode("path", {
                                          "stroke-linecap": "round",
                                          "stroke-linejoin": "round",
                                          "stroke-width": "2",
                                          d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        }),
                                        createVNode("path", {
                                          "stroke-linecap": "round",
                                          "stroke-linejoin": "round",
                                          "stroke-width": "2",
                                          d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                        })
                                      ]))
                                    ]),
                                    _: 2
                                  }, 1032, ["href"]),
                                  createVNode(unref(Link), {
                                    href: `/projects/${project.id}/edit`,
                                    class: "btn btn-xs btn-ghost"
                                  }, {
                                    default: withCtx(() => [
                                      (openBlock(), createBlock("svg", {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        class: "h-4 w-4",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        stroke: "currentColor"
                                      }, [
                                        createVNode("path", {
                                          "stroke-linecap": "round",
                                          "stroke-linejoin": "round",
                                          "stroke-width": "2",
                                          d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                        })
                                      ]))
                                    ]),
                                    _: 2
                                  }, 1032, ["href"])
                                ])
                              ])
                            ]);
                          }), 128))
                        ])
                      ])
                    ]))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode(_sfc_main$2, { title: "PROJELER" }, {
                default: withCtx(() => [
                  createVNode(unref(Link), {
                    href: "/projects/create",
                    class: "btn btn-primary btn-sm"
                  }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "mr-1 h-5 w-5",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M12 4v16m8-8H4"
                        })
                      ])),
                      createTextVNode(" Yeni Proje ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode("div", { class: "mb-5 w-full" }, [
                createVNode(_sfc_main$3, { class: "card-compact w-full shadow-md" }, {
                  default: withCtx(() => [
                    __props.projects.length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "p-4"
                    }, [
                      createVNode("div", { class: "alert alert-warning" }, [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          class: "h-6 w-6 shrink-0 stroke-current",
                          fill: "none",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                          })
                        ])),
                        createVNode("span", null, "Henüz proje bulunamadı.")
                      ])
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "overflow-x-auto"
                    }, [
                      createVNode("table", { class: "table-zebra table" }, [
                        createVNode("thead", null, [
                          createVNode("tr", null, [
                            createVNode("th", { class: "text-left" }, "#"),
                            createVNode("th", { class: "text-left" }, "İsim"),
                            createVNode("th", { class: "text-center" }, "Durum"),
                            createVNode("th", { class: "text-center" }, "Müşteri"),
                            createVNode("th", { class: "text-center" }, "Oluşturma Tarihi"),
                            createVNode("th", { class: "text-center" }, "İşlemler")
                          ])
                        ]),
                        createVNode("tbody", null, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.projects, (project) => {
                            return openBlock(), createBlock("tr", {
                              key: project.id,
                              class: "hover"
                            }, [
                              createVNode("td", null, toDisplayString(project.id), 1),
                              createVNode("td", null, [
                                createVNode("div", { class: "font-medium" }, toDisplayString(project.name), 1),
                                project.description ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "text-sm opacity-70"
                                }, toDisplayString(truncateText(project.description, 50)), 1)) : createCommentVNode("", true)
                              ]),
                              createVNode("td", { class: "text-center" }, [
                                createVNode("div", {
                                  class: ["badge", getStatusClass(project.status)]
                                }, toDisplayString(getStatusText(project.status)), 3)
                              ]),
                              createVNode("td", { class: "text-center" }, [
                                project.customer ? (openBlock(), createBlock(unref(Link), {
                                  key: 0,
                                  href: `/customers/${project.customer.id}`,
                                  class: "link link-hover link-primary"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(project.customer.first_name) + " " + toDisplayString(project.customer.last_name), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["href"])) : (openBlock(), createBlock("span", {
                                  key: 1,
                                  class: "opacity-70"
                                }, "-"))
                              ]),
                              createVNode("td", { class: "text-center" }, toDisplayString(formatDate(project.created_at)), 1),
                              createVNode("td", { class: "text-center" }, [
                                createVNode("div", { class: "flex justify-center space-x-1" }, [
                                  createVNode(unref(Link), {
                                    href: `/projects/${project.id}`,
                                    class: "btn btn-xs btn-ghost"
                                  }, {
                                    default: withCtx(() => [
                                      (openBlock(), createBlock("svg", {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        class: "h-4 w-4",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        stroke: "currentColor"
                                      }, [
                                        createVNode("path", {
                                          "stroke-linecap": "round",
                                          "stroke-linejoin": "round",
                                          "stroke-width": "2",
                                          d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        }),
                                        createVNode("path", {
                                          "stroke-linecap": "round",
                                          "stroke-linejoin": "round",
                                          "stroke-width": "2",
                                          d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                        })
                                      ]))
                                    ]),
                                    _: 2
                                  }, 1032, ["href"]),
                                  createVNode(unref(Link), {
                                    href: `/projects/${project.id}/edit`,
                                    class: "btn btn-xs btn-ghost"
                                  }, {
                                    default: withCtx(() => [
                                      (openBlock(), createBlock("svg", {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        class: "h-4 w-4",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        stroke: "currentColor"
                                      }, [
                                        createVNode("path", {
                                          "stroke-linecap": "round",
                                          "stroke-linejoin": "round",
                                          "stroke-width": "2",
                                          d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                        })
                                      ]))
                                    ]),
                                    _: 2
                                  }, 1032, ["href"])
                                ])
                              ])
                            ]);
                          }), 128))
                        ])
                      ])
                    ]))
                  ]),
                  _: 1
                })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/Index/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
