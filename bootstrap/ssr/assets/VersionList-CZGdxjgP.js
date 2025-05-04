import { withCtx, unref, createVNode, toDisplayString, createBlock, openBlock, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckSubsidebar-BZirZ79m.js";
import "../ssr.js";
import "axios";
import "@fortawesome/vue-fontawesome";
import "vuex";
const _sfc_main = {
  __name: "VersionList",
  __ssrInlineRender: true,
  props: {
    versions: {
      type: Array,
      required: true
    },
    currentUrl: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const getLinkClasses = (href) => {
      return props.currentUrl === href ? "border-l-2 text-primary bg-base-100" : "border-l-2 border-transparent text-base-content";
    };
    function formatDate(dateString) {
      if (!dateString) return "Tarih Yok";
      try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
          return dateString;
        }
        return new Intl.DateTimeFormat("tr-TR", {
          year: "numeric",
          month: "short",
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
            _push2(`<div class="space-y-2 p-2"${_scopeId}>`);
            if (__props.versions && __props.versions.length === 0) {
              _push2(`<div class="alert alert-info"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg><span${_scopeId}>Henüz versiyon bulunmamaktadır.</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(__props.versions, (version) => {
              _push2(`<div class="transition-all duration-200 hover:scale-[1.01]"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: `/versions/${version.version}`,
                class: [
                  getLinkClasses(`/versions/${version.version}`),
                  "card block rounded-lg bg-base-100 shadow-sm hover:shadow"
                ]
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="p-3"${_scopeId2}><div class="mb-1 text-base font-semibold"${_scopeId2}>${ssrInterpolate(version.version)}</div><div class="flex items-center text-sm opacity-70"${_scopeId2}><svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"${_scopeId2}></path></svg><span${_scopeId2}>${ssrInterpolate(formatDate(version.release_date))}</span></div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "p-3" }, [
                        createVNode("div", { class: "mb-1 text-base font-semibold" }, toDisplayString(version.version), 1),
                        createVNode("div", { class: "flex items-center text-sm opacity-70" }, [
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
                              d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            })
                          ])),
                          createVNode("span", null, toDisplayString(formatDate(version.release_date)), 1)
                        ])
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-2 p-2" }, [
                __props.versions && __props.versions.length === 0 ? (openBlock(), createBlock("div", {
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
                  createVNode("span", null, "Henüz versiyon bulunmamaktadır.")
                ])) : createCommentVNode("", true),
                (openBlock(true), createBlock(Fragment, null, renderList(__props.versions, (version) => {
                  return openBlock(), createBlock("div", {
                    key: version.id,
                    class: "transition-all duration-200 hover:scale-[1.01]"
                  }, [
                    createVNode(unref(Link), {
                      href: `/versions/${version.version}`,
                      class: [
                        getLinkClasses(`/versions/${version.version}`),
                        "card block rounded-lg bg-base-100 shadow-sm hover:shadow"
                      ]
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "p-3" }, [
                          createVNode("div", { class: "mb-1 text-base font-semibold" }, toDisplayString(version.version), 1),
                          createVNode("div", { class: "flex items-center text-sm opacity-70" }, [
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
                                d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              })
                            ])),
                            createVNode("span", null, toDisplayString(formatDate(version.release_date)), 1)
                          ])
                        ])
                      ]),
                      _: 2
                    }, 1032, ["href", "class"])
                  ]);
                }), 128))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/FBVersions/_components/VersionList.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
