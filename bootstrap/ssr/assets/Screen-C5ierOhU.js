import { computed, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckScreen-BIqwcPls.js";
import { _ as _sfc_main$2 } from "./TopScreen-DnNmtdW-.js";
import { _ as _export_sfc } from "../ssr.js";
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
    const projects = computed(() => props.projects || []);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, { title: "Projeler" }, null, _parent2, _scopeId));
            _push2(`<div class="card border border-gray-200 bg-white shadow-lg transition-all duration-200 dark:border-gray-700 dark:bg-base-100" data-v-d867f30f${_scopeId}><div class="card-body p-6" data-v-d867f30f${_scopeId}><div class="mb-4 flex items-center justify-between" data-v-d867f30f${_scopeId}><div data-v-d867f30f${_scopeId}></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/projects/create",
              class: "btn btn-primary btn-sm"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-1 h-4 w-4" data-v-d867f30f${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" data-v-d867f30f${_scopeId2}></path></svg> Yeni Proje `);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      "stroke-width": "1.5",
                      stroke: "currentColor",
                      class: "mr-1 h-4 w-4"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        d: "M12 4.5v15m7.5-7.5h-15"
                      })
                    ])),
                    createTextVNode(" Yeni Proje ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (!projects.value || projects.value.length === 0) {
              _push2(`<div class="alert alert-info" data-v-d867f30f${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current" data-v-d867f30f${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-d867f30f${_scopeId}></path></svg><span data-v-d867f30f${_scopeId}>Henüz proje bulunmamaktadır.</span></div>`);
            } else {
              _push2(`<div class="overflow-x-auto" data-v-d867f30f${_scopeId}><table class="table table-zebra" data-v-d867f30f${_scopeId}><thead data-v-d867f30f${_scopeId}><tr data-v-d867f30f${_scopeId}><th data-v-d867f30f${_scopeId}>Proje Adı</th><th data-v-d867f30f${_scopeId}>Müşteri</th><th data-v-d867f30f${_scopeId}>E-posta</th><th data-v-d867f30f${_scopeId}>İşlemler</th></tr></thead><tbody data-v-d867f30f${_scopeId}><!--[-->`);
              ssrRenderList(projects.value, (project) => {
                _push2(`<tr class="hover" data-v-d867f30f${_scopeId}><td class="font-semibold" data-v-d867f30f${_scopeId}>${ssrInterpolate(project.project_name)}</td><td data-v-d867f30f${_scopeId}>${ssrInterpolate(project.customer ? `${project.customer.first_name} ${project.customer.last_name}` : "N/A")}</td><td data-v-d867f30f${_scopeId}>${ssrInterpolate(project.customer ? project.customer.email : "N/A")}</td><td class="space-x-2" data-v-d867f30f${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: `/projects/${project.id}`,
                  class: "btn btn-ghost btn-sm"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-d867f30f${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-d867f30f${_scopeId2}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-d867f30f${_scopeId2}></path></svg>`);
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
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(unref(Link), {
                  href: `/projects/${project.id}/edit`,
                  class: "btn btn-ghost btn-sm"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-d867f30f${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-d867f30f${_scopeId2}></path></svg>`);
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
                }, _parent2, _scopeId));
                _push2(`</td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div>`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode(_sfc_main$2, { title: "Projeler" }),
              createVNode("div", { class: "card border border-gray-200 bg-white shadow-lg transition-all duration-200 dark:border-gray-700 dark:bg-base-100" }, [
                createVNode("div", { class: "card-body p-6" }, [
                  createVNode("div", { class: "mb-4 flex items-center justify-between" }, [
                    createVNode("div"),
                    createVNode(unref(Link), {
                      href: "/projects/create",
                      class: "btn btn-primary btn-sm"
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          "stroke-width": "1.5",
                          stroke: "currentColor",
                          class: "mr-1 h-4 w-4"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M12 4.5v15m7.5-7.5h-15"
                          })
                        ])),
                        createTextVNode(" Yeni Proje ")
                      ]),
                      _: 1
                    })
                  ]),
                  !projects.value || projects.value.length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
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
                    createVNode("span", null, "Henüz proje bulunmamaktadır.")
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "overflow-x-auto"
                  }, [
                    createVNode("table", { class: "table table-zebra" }, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Proje Adı"),
                          createVNode("th", null, "Müşteri"),
                          createVNode("th", null, "E-posta"),
                          createVNode("th", null, "İşlemler")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        (openBlock(true), createBlock(Fragment, null, renderList(projects.value, (project) => {
                          return openBlock(), createBlock("tr", {
                            key: project.id,
                            class: "hover"
                          }, [
                            createVNode("td", { class: "font-semibold" }, toDisplayString(project.project_name), 1),
                            createVNode("td", null, toDisplayString(project.customer ? `${project.customer.first_name} ${project.customer.last_name}` : "N/A"), 1),
                            createVNode("td", null, toDisplayString(project.customer ? project.customer.email : "N/A"), 1),
                            createVNode("td", { class: "space-x-2" }, [
                              createVNode(unref(Link), {
                                href: `/projects/${project.id}`,
                                class: "btn btn-ghost btn-sm"
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
                                class: "btn btn-ghost btn-sm"
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
                          ]);
                        }), 128))
                      ])
                    ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/Project/Index/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Screen = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d867f30f"]]);
export {
  Screen as default
};
