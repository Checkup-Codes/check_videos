import { computed, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, toDisplayString, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-CM3g7Drr.js";
import { _ as _sfc_main$3 } from "./TopScreen-DnNmtdW-.js";
import { _ as _sfc_main$2 } from "./GoBackButton-r241H7w7.js";
import _sfc_main$4 from "./Card-qmctt-Ej.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const project = computed(() => props.project || {});
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, { url: "/projects" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, { title: "Proje Detayı" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, { elevated: "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="mb-6 flex items-center justify-between"${_scopeId2}><div${_scopeId2}><h1 class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(project.value.project_name)}</h1></div>`);
                  _push3(ssrRenderComponent(unref(Link), {
                    href: `/projects/${project.value.id}/edit`,
                    class: "btn btn-sm btn-outline"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId3}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"${_scopeId3}></path></svg> Düzenle `);
                      } else {
                        return [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            class: "mr-1 h-4 w-4",
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
                          ])),
                          createTextVNode(" Düzenle ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div><div class="divider"${_scopeId2}>Müşteri Bilgileri</div>`);
                  if (project.value.customer) {
                    _push3(`<div class="bg-base-200 rounded-lg p-4"${_scopeId2}><div class="grid grid-cols-1 gap-4 md:grid-cols-2"${_scopeId2}><div${_scopeId2}><h3 class="text-sm opacity-70"${_scopeId2}>Müşteri Adı</h3><p class="font-semibold"${_scopeId2}>${ssrInterpolate(project.value.customer.first_name)} ${ssrInterpolate(project.value.customer.last_name)}</p></div><div${_scopeId2}><h3 class="text-sm opacity-70"${_scopeId2}>E-posta</h3><p class="font-semibold"${_scopeId2}>${ssrInterpolate(project.value.customer.email)}</p></div><div${_scopeId2}><h3 class="text-sm opacity-70"${_scopeId2}>Telefon</h3><p class="font-semibold"${_scopeId2}>${ssrInterpolate(project.value.customer.phone || "Telefon bilgisi yok")}</p></div></div></div>`);
                  } else {
                    _push3(`<div class="alert alert-warning"${_scopeId2}><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"${_scopeId2}></path></svg><span${_scopeId2}>Bu projeye atanmış müşteri bulunmamaktadır.</span></div>`);
                  }
                  _push3(`<div class="divider"${_scopeId2}>Servisler</div>`);
                  if (project.value.services && project.value.services.length) {
                    _push3(`<div class="space-y-4"${_scopeId2}><!--[-->`);
                    ssrRenderList(project.value.services, (service) => {
                      _push3(`<div class="border-base-300 rounded-lg border p-4"${_scopeId2}><div class="flex items-center"${_scopeId2}><div class="bg-primary/20 mr-3 rounded-full p-2"${_scopeId2}><svg xmlns="http://www.w3.org/2000/svg" class="text-primary h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"${_scopeId2}></path></svg></div><h3 class="text-md font-semibold"${_scopeId2}>${ssrInterpolate(service.name)}</h3></div><div class="mt-3 pl-10"${_scopeId2}><p class="whitespace-pre-wrap text-gray-600"${_scopeId2}>${ssrInterpolate(service.description || "Açıklama bulunmamaktadır")}</p></div></div>`);
                    });
                    _push3(`<!--]--></div>`);
                  } else {
                    _push3(`<div class="alert alert-info"${_scopeId2}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId2}></path></svg><span${_scopeId2}>Bu projeye atanmış servis bulunmamaktadır.</span></div>`);
                  }
                } else {
                  return [
                    createVNode("div", { class: "mb-6 flex items-center justify-between" }, [
                      createVNode("div", null, [
                        createVNode("h1", { class: "text-2xl font-bold" }, toDisplayString(project.value.project_name), 1)
                      ]),
                      createVNode(unref(Link), {
                        href: `/projects/${project.value.id}/edit`,
                        class: "btn btn-sm btn-outline"
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            class: "mr-1 h-4 w-4",
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
                          ])),
                          createTextVNode(" Düzenle ")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ]),
                    createVNode("div", { class: "divider" }, "Müşteri Bilgileri"),
                    project.value.customer ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "bg-base-200 rounded-lg p-4"
                    }, [
                      createVNode("div", { class: "grid grid-cols-1 gap-4 md:grid-cols-2" }, [
                        createVNode("div", null, [
                          createVNode("h3", { class: "text-sm opacity-70" }, "Müşteri Adı"),
                          createVNode("p", { class: "font-semibold" }, toDisplayString(project.value.customer.first_name) + " " + toDisplayString(project.value.customer.last_name), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("h3", { class: "text-sm opacity-70" }, "E-posta"),
                          createVNode("p", { class: "font-semibold" }, toDisplayString(project.value.customer.email), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("h3", { class: "text-sm opacity-70" }, "Telefon"),
                          createVNode("p", { class: "font-semibold" }, toDisplayString(project.value.customer.phone || "Telefon bilgisi yok"), 1)
                        ])
                      ])
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "alert alert-warning"
                    }, [
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
                      createVNode("span", null, "Bu projeye atanmış müşteri bulunmamaktadır.")
                    ])),
                    createVNode("div", { class: "divider" }, "Servisler"),
                    project.value.services && project.value.services.length ? (openBlock(), createBlock("div", {
                      key: 2,
                      class: "space-y-4"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(project.value.services, (service) => {
                        return openBlock(), createBlock("div", {
                          key: service.id,
                          class: "border-base-300 rounded-lg border p-4"
                        }, [
                          createVNode("div", { class: "flex items-center" }, [
                            createVNode("div", { class: "bg-primary/20 mr-3 rounded-full p-2" }, [
                              (openBlock(), createBlock("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                class: "text-primary h-5 w-5",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                stroke: "currentColor"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M13 10V3L4 14h7v7l9-11h-7z"
                                })
                              ]))
                            ]),
                            createVNode("h3", { class: "text-md font-semibold" }, toDisplayString(service.name), 1)
                          ]),
                          createVNode("div", { class: "mt-3 pl-10" }, [
                            createVNode("p", { class: "whitespace-pre-wrap text-gray-600" }, toDisplayString(service.description || "Açıklama bulunmamaktadır"), 1)
                          ])
                        ]);
                      }), 128))
                    ])) : (openBlock(), createBlock("div", {
                      key: 3,
                      class: "alert alert-info"
                    }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        class: "h-6 w-6 shrink-0 stroke-current"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        })
                      ])),
                      createVNode("span", null, "Bu projeye atanmış servis bulunmamaktadır.")
                    ]))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, { url: "/projects" }),
              createVNode(_sfc_main$3, { title: "Proje Detayı" }),
              createVNode(_sfc_main$4, { elevated: "" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "mb-6 flex items-center justify-between" }, [
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-2xl font-bold" }, toDisplayString(project.value.project_name), 1)
                    ]),
                    createVNode(unref(Link), {
                      href: `/projects/${project.value.id}/edit`,
                      class: "btn btn-sm btn-outline"
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          class: "mr-1 h-4 w-4",
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
                        ])),
                        createTextVNode(" Düzenle ")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ]),
                  createVNode("div", { class: "divider" }, "Müşteri Bilgileri"),
                  project.value.customer ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "bg-base-200 rounded-lg p-4"
                  }, [
                    createVNode("div", { class: "grid grid-cols-1 gap-4 md:grid-cols-2" }, [
                      createVNode("div", null, [
                        createVNode("h3", { class: "text-sm opacity-70" }, "Müşteri Adı"),
                        createVNode("p", { class: "font-semibold" }, toDisplayString(project.value.customer.first_name) + " " + toDisplayString(project.value.customer.last_name), 1)
                      ]),
                      createVNode("div", null, [
                        createVNode("h3", { class: "text-sm opacity-70" }, "E-posta"),
                        createVNode("p", { class: "font-semibold" }, toDisplayString(project.value.customer.email), 1)
                      ]),
                      createVNode("div", null, [
                        createVNode("h3", { class: "text-sm opacity-70" }, "Telefon"),
                        createVNode("p", { class: "font-semibold" }, toDisplayString(project.value.customer.phone || "Telefon bilgisi yok"), 1)
                      ])
                    ])
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "alert alert-warning"
                  }, [
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
                    createVNode("span", null, "Bu projeye atanmış müşteri bulunmamaktadır.")
                  ])),
                  createVNode("div", { class: "divider" }, "Servisler"),
                  project.value.services && project.value.services.length ? (openBlock(), createBlock("div", {
                    key: 2,
                    class: "space-y-4"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(project.value.services, (service) => {
                      return openBlock(), createBlock("div", {
                        key: service.id,
                        class: "border-base-300 rounded-lg border p-4"
                      }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "bg-primary/20 mr-3 rounded-full p-2" }, [
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              class: "text-primary h-5 w-5",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              stroke: "currentColor"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M13 10V3L4 14h7v7l9-11h-7z"
                              })
                            ]))
                          ]),
                          createVNode("h3", { class: "text-md font-semibold" }, toDisplayString(service.name), 1)
                        ]),
                        createVNode("div", { class: "mt-3 pl-10" }, [
                          createVNode("p", { class: "whitespace-pre-wrap text-gray-600" }, toDisplayString(service.description || "Açıklama bulunmamaktadır"), 1)
                        ])
                      ]);
                    }), 128))
                  ])) : (openBlock(), createBlock("div", {
                    key: 3,
                    class: "alert alert-info"
                  }, [
                    (openBlock(), createBlock("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      class: "h-6 w-6 shrink-0 stroke-current"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      })
                    ])),
                    createVNode("span", null, "Bu projeye atanmış servis bulunmamaktadır.")
                  ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/Project/Show/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
