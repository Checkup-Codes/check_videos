import { computed, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, toDisplayString, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./CheckScreen-Fo9jcdnI.js";
import "./TopScreen-DnNmtdW-.js";
import { _ as _sfc_main$2 } from "./GoBackButton-u55EQwn1.js";
import { usePage, Link } from "@inertiajs/vue3";
import "../ssr.js";
import "axios";
import "@fortawesome/vue-fontawesome";
import "vuex";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const props = usePage().props;
    const version = computed(() => props.version || {});
    function formatDate(dateString) {
      if (!dateString) return "Tarih Yok";
      try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
          return dateString;
        }
        return new Intl.DateTimeFormat("tr-TR", {
          year: "numeric",
          month: "long",
          day: "numeric"
        }).format(date);
      } catch (error) {
        console.error("Tarih formatı hatası:", error);
        return dateString;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, { url: "/versions" }, null, _parent2, _scopeId));
            _push2(`<div class="card border border-gray-200 bg-white shadow-lg transition-all duration-200 dark:border-gray-700 dark:bg-base-100"${_scopeId}><div class="card-body p-6"${_scopeId}><div class="mb-6 flex items-center justify-between"${_scopeId}><div${_scopeId}><h1 class="text-2xl font-bold"${_scopeId}>${ssrInterpolate(version.value.version)}</h1><p class="text-sm text-gray-500"${_scopeId}><span class="badge badge-neutral"${_scopeId}>${ssrInterpolate(formatDate(version.value.release_date))}</span></p></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: `/versions/${version.value.id}/edit`,
              class: "btn btn-outline btn-sm"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"${_scopeId2}></path></svg> Düzenle `);
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
            }, _parent2, _scopeId));
            _push2(`</div><div class="mb-6"${_scopeId}><h2 class="mb-2 text-lg font-semibold"${_scopeId}>Açıklama</h2><div class="min-h-[80px] whitespace-pre-wrap rounded-lg bg-base-200 p-4"${_scopeId}>${ssrInterpolate(version.value.description ? version.value.description : "Açıklama yok")}</div></div><div class="divider"${_scopeId}></div><div class="mb-6"${_scopeId}><h2 class="mb-4 text-lg font-semibold"${_scopeId}>Yeni Özellikler</h2>`);
            if (!version.value.features || version.value.features.length === 0) {
              _push2(`<div class="alert alert-info"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg><span${_scopeId}>Bu versiyonda yeni özellik bulunmamaktadır.</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(version.value.features, (feature, index) => {
              _push2(`<div class="mb-4"${_scopeId}><div class="rounded-lg border border-base-300 p-4"${_scopeId}><div class="flex items-center"${_scopeId}><div class="bg-success/20 mr-3 rounded-full p-2"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"${_scopeId}></path></svg></div><h3 class="text-md font-semibold"${_scopeId}>${ssrInterpolate(feature.feature_name)}</h3></div><div class="mt-3 pl-10"${_scopeId}><p class="whitespace-pre-wrap text-gray-600"${_scopeId}>${ssrInterpolate(feature.feature_detail)}</p></div></div></div>`);
            });
            _push2(`<!--]--></div><div class="divider"${_scopeId}></div><div${_scopeId}><h2 class="mb-4 text-lg font-semibold"${_scopeId}>Düzeltilen Hatalar</h2>`);
            if (!version.value.bugs || version.value.bugs.length === 0) {
              _push2(`<div class="alert alert-info"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg><span${_scopeId}>Bu versiyonda düzeltilen hata bulunmamaktadır.</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(version.value.bugs, (bug, index) => {
              _push2(`<div class="mb-4"${_scopeId}><div class="rounded-lg border border-base-300 p-4"${_scopeId}><div class="flex items-center"${_scopeId}><div class="bg-error/20 mr-3 rounded-full p-2"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg></div><h3 class="text-md font-semibold"${_scopeId}>${ssrInterpolate(bug.bug_name)}</h3></div><div class="mt-3 pl-10"${_scopeId}><p class="whitespace-pre-wrap text-gray-600"${_scopeId}>${ssrInterpolate(bug.bug_detail)}</p></div></div></div>`);
            });
            _push2(`<!--]--></div></div></div>`);
          } else {
            return [
              createVNode(_sfc_main$2, { url: "/versions" }),
              createVNode("div", { class: "card border border-gray-200 bg-white shadow-lg transition-all duration-200 dark:border-gray-700 dark:bg-base-100" }, [
                createVNode("div", { class: "card-body p-6" }, [
                  createVNode("div", { class: "mb-6 flex items-center justify-between" }, [
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-2xl font-bold" }, toDisplayString(version.value.version), 1),
                      createVNode("p", { class: "text-sm text-gray-500" }, [
                        createVNode("span", { class: "badge badge-neutral" }, toDisplayString(formatDate(version.value.release_date)), 1)
                      ])
                    ]),
                    createVNode(unref(Link), {
                      href: `/versions/${version.value.id}/edit`,
                      class: "btn btn-outline btn-sm"
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
                  createVNode("div", { class: "mb-6" }, [
                    createVNode("h2", { class: "mb-2 text-lg font-semibold" }, "Açıklama"),
                    createVNode("div", { class: "min-h-[80px] whitespace-pre-wrap rounded-lg bg-base-200 p-4" }, toDisplayString(version.value.description ? version.value.description : "Açıklama yok"), 1)
                  ]),
                  createVNode("div", { class: "divider" }),
                  createVNode("div", { class: "mb-6" }, [
                    createVNode("h2", { class: "mb-4 text-lg font-semibold" }, "Yeni Özellikler"),
                    !version.value.features || version.value.features.length === 0 ? (openBlock(), createBlock("div", {
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
                      createVNode("span", null, "Bu versiyonda yeni özellik bulunmamaktadır.")
                    ])) : createCommentVNode("", true),
                    (openBlock(true), createBlock(Fragment, null, renderList(version.value.features, (feature, index) => {
                      return openBlock(), createBlock("div", {
                        key: `feature-${index}`,
                        class: "mb-4"
                      }, [
                        createVNode("div", { class: "rounded-lg border border-base-300 p-4" }, [
                          createVNode("div", { class: "flex items-center" }, [
                            createVNode("div", { class: "bg-success/20 mr-3 rounded-full p-2" }, [
                              (openBlock(), createBlock("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                class: "h-5 w-5 text-success",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                stroke: "currentColor"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M5 13l4 4L19 7"
                                })
                              ]))
                            ]),
                            createVNode("h3", { class: "text-md font-semibold" }, toDisplayString(feature.feature_name), 1)
                          ]),
                          createVNode("div", { class: "mt-3 pl-10" }, [
                            createVNode("p", { class: "whitespace-pre-wrap text-gray-600" }, toDisplayString(feature.feature_detail), 1)
                          ])
                        ])
                      ]);
                    }), 128))
                  ]),
                  createVNode("div", { class: "divider" }),
                  createVNode("div", null, [
                    createVNode("h2", { class: "mb-4 text-lg font-semibold" }, "Düzeltilen Hatalar"),
                    !version.value.bugs || version.value.bugs.length === 0 ? (openBlock(), createBlock("div", {
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
                      createVNode("span", null, "Bu versiyonda düzeltilen hata bulunmamaktadır.")
                    ])) : createCommentVNode("", true),
                    (openBlock(true), createBlock(Fragment, null, renderList(version.value.bugs, (bug, index) => {
                      return openBlock(), createBlock("div", {
                        key: `bug-${index}`,
                        class: "mb-4"
                      }, [
                        createVNode("div", { class: "rounded-lg border border-base-300 p-4" }, [
                          createVNode("div", { class: "flex items-center" }, [
                            createVNode("div", { class: "bg-error/20 mr-3 rounded-full p-2" }, [
                              (openBlock(), createBlock("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                class: "h-5 w-5 text-error",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                stroke: "currentColor"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M6 18L18 6M6 6l12 12"
                                })
                              ]))
                            ]),
                            createVNode("h3", { class: "text-md font-semibold" }, toDisplayString(bug.bug_name), 1)
                          ]),
                          createVNode("div", { class: "mt-3 pl-10" }, [
                            createVNode("p", { class: "whitespace-pre-wrap text-gray-600" }, toDisplayString(bug.bug_detail), 1)
                          ])
                        ])
                      ]);
                    }), 128))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/FBVersions/Versions/Show/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
