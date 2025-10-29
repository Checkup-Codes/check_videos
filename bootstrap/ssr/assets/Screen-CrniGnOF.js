import { computed, withCtx, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./CheckScreen-BjSTIeRu.js";
import { usePage } from "@inertiajs/vue3";
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
            _push2(`<div class="card-body p-4 sm:p-6"${_scopeId}><div class="mb-4"${_scopeId}><h1 class="text-xl font-bold sm:text-2xl"${_scopeId}>${ssrInterpolate(version.value.version)}</h1><p class="mt-1 text-xs text-gray-500 sm:text-sm"${_scopeId}><span class="badge badge-neutral badge-sm"${_scopeId}>${ssrInterpolate(formatDate(version.value.release_date))}</span></p></div><div class="mb-4"${_scopeId}><h2 class="mb-1.5 text-sm font-semibold sm:text-base"${_scopeId}>Açıklama</h2><div class="border-base-300/30 bg-base-50 rounded-lg border p-2 text-xs sm:text-sm"${_scopeId}>${ssrInterpolate(version.value.description ? version.value.description : "Açıklama yok")}</div></div><div class="divider my-4"${_scopeId}></div><div class="mb-4"${_scopeId}><h2 class="mb-2 text-sm font-semibold sm:text-base"${_scopeId}>Yeni Özellikler</h2>`);
            if (!version.value.features || version.value.features.length === 0) {
              _push2(`<div class="border-base-300/30 bg-base-50 rounded-lg border p-2 text-center"${_scopeId}><p class="text-base-content/50 text-xs"${_scopeId}>Bu versiyonda yeni özellik bulunmamaktadır.</p></div>`);
            } else {
              _push2(`<div class="space-y-1"${_scopeId}><!--[-->`);
              ssrRenderList(version.value.features, (feature, index) => {
                _push2(`<div class="border-base-300/30 bg-base-50 flex items-start gap-2 rounded-lg border p-2 transition-colors hover:bg-base-100"${_scopeId}><div class="mt-0.5 shrink-0"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"${_scopeId}></path></svg></div><div class="min-w-0 flex-1"${_scopeId}><h3 class="text-xs font-medium text-base-content sm:text-sm"${_scopeId}>${ssrInterpolate(feature.feature_name)}</h3>`);
                if (feature.feature_detail) {
                  _push2(`<p class="text-base-content/70 mt-0.5 whitespace-pre-wrap text-xs leading-relaxed"${_scopeId}>${ssrInterpolate(feature.feature_detail)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div>`);
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`</div><div class="divider my-4"${_scopeId}></div><div${_scopeId}><h2 class="mb-2 text-sm font-semibold sm:text-base"${_scopeId}>Düzeltilen Hatalar</h2>`);
            if (!version.value.bugs || version.value.bugs.length === 0) {
              _push2(`<div class="border-base-300/30 bg-base-50 rounded-lg border p-2 text-center"${_scopeId}><p class="text-base-content/50 text-xs"${_scopeId}>Bu versiyonda düzeltilen hata bulunmamaktadır.</p></div>`);
            } else {
              _push2(`<div class="space-y-1"${_scopeId}><!--[-->`);
              ssrRenderList(version.value.bugs, (bug, index) => {
                _push2(`<div class="border-base-300/30 bg-base-50 flex items-start gap-2 rounded-lg border p-2 transition-colors hover:bg-base-100"${_scopeId}><div class="mt-0.5 shrink-0"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg></div><div class="min-w-0 flex-1"${_scopeId}><h3 class="text-xs font-medium text-base-content sm:text-sm"${_scopeId}>${ssrInterpolate(bug.bug_name)}</h3>`);
                if (bug.bug_detail) {
                  _push2(`<p class="text-base-content/70 mt-0.5 whitespace-pre-wrap text-xs leading-relaxed"${_scopeId}>${ssrInterpolate(bug.bug_detail)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div>`);
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "card-body p-4 sm:p-6" }, [
                createVNode("div", { class: "mb-4" }, [
                  createVNode("h1", { class: "text-xl font-bold sm:text-2xl" }, toDisplayString(version.value.version), 1),
                  createVNode("p", { class: "mt-1 text-xs text-gray-500 sm:text-sm" }, [
                    createVNode("span", { class: "badge badge-neutral badge-sm" }, toDisplayString(formatDate(version.value.release_date)), 1)
                  ])
                ]),
                createVNode("div", { class: "mb-4" }, [
                  createVNode("h2", { class: "mb-1.5 text-sm font-semibold sm:text-base" }, "Açıklama"),
                  createVNode("div", { class: "border-base-300/30 bg-base-50 rounded-lg border p-2 text-xs sm:text-sm" }, toDisplayString(version.value.description ? version.value.description : "Açıklama yok"), 1)
                ]),
                createVNode("div", { class: "divider my-4" }),
                createVNode("div", { class: "mb-4" }, [
                  createVNode("h2", { class: "mb-2 text-sm font-semibold sm:text-base" }, "Yeni Özellikler"),
                  !version.value.features || version.value.features.length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "border-base-300/30 bg-base-50 rounded-lg border p-2 text-center"
                  }, [
                    createVNode("p", { class: "text-base-content/50 text-xs" }, "Bu versiyonda yeni özellik bulunmamaktadır.")
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "space-y-1"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(version.value.features, (feature, index) => {
                      return openBlock(), createBlock("div", {
                        key: `feature-${index}`,
                        class: "border-base-300/30 bg-base-50 flex items-start gap-2 rounded-lg border p-2 transition-colors hover:bg-base-100"
                      }, [
                        createVNode("div", { class: "mt-0.5 shrink-0" }, [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            class: "h-3 w-3 text-success",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor",
                            "stroke-width": "2.5"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              d: "M5 13l4 4L19 7"
                            })
                          ]))
                        ]),
                        createVNode("div", { class: "min-w-0 flex-1" }, [
                          createVNode("h3", { class: "text-xs font-medium text-base-content sm:text-sm" }, toDisplayString(feature.feature_name), 1),
                          feature.feature_detail ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-base-content/70 mt-0.5 whitespace-pre-wrap text-xs leading-relaxed"
                          }, toDisplayString(feature.feature_detail), 1)) : createCommentVNode("", true)
                        ])
                      ]);
                    }), 128))
                  ]))
                ]),
                createVNode("div", { class: "divider my-4" }),
                createVNode("div", null, [
                  createVNode("h2", { class: "mb-2 text-sm font-semibold sm:text-base" }, "Düzeltilen Hatalar"),
                  !version.value.bugs || version.value.bugs.length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "border-base-300/30 bg-base-50 rounded-lg border p-2 text-center"
                  }, [
                    createVNode("p", { class: "text-base-content/50 text-xs" }, "Bu versiyonda düzeltilen hata bulunmamaktadır.")
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "space-y-1"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(version.value.bugs, (bug, index) => {
                      return openBlock(), createBlock("div", {
                        key: `bug-${index}`,
                        class: "border-base-300/30 bg-base-50 flex items-start gap-2 rounded-lg border p-2 transition-colors hover:bg-base-100"
                      }, [
                        createVNode("div", { class: "mt-0.5 shrink-0" }, [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            class: "h-3 w-3 text-error",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor",
                            "stroke-width": "2.5"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              d: "M6 18L18 6M6 6l12 12"
                            })
                          ]))
                        ]),
                        createVNode("div", { class: "min-w-0 flex-1" }, [
                          createVNode("h3", { class: "text-xs font-medium text-base-content sm:text-sm" }, toDisplayString(bug.bug_name), 1),
                          bug.bug_detail ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-base-content/70 mt-0.5 whitespace-pre-wrap text-xs leading-relaxed"
                          }, toDisplayString(bug.bug_detail), 1)) : createCommentVNode("", true)
                        ])
                      ]);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/FBVersions/Versions/Show/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
