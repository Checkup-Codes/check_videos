import { ref, withCtx, unref, createTextVNode, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import dayjs from "dayjs";
import { _ as _sfc_main$1 } from "./CheckScreen-J_xllE7d.js";
import "dayjs/locale/tr.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    dayjs.locale("tr");
    const { props } = usePage();
    const version = ref(props.version);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="rounded-lg bg-theme-background p-6 text-theme-text"${_scopeId}><div class="mb-4 flex items-center justify-between border-b pb-4"${_scopeId}><h1 class="text-2xl font-medium text-theme-text"${_scopeId}>${ssrInterpolate(version.value.version)}</h1>`);
            if (unref(props).auth.user) {
              _push2(ssrRenderComponent(unref(Link), {
                href: `/versions/${version.value.id}/edit`,
                class: "text-sm font-medium text-theme-text-light hover:text-theme-text"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Bu versiyonu düzenle `);
                  } else {
                    return [
                      createTextVNode(" Bu versiyonu düzenle ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><p class="text-sm text-theme-text"${_scopeId}>${ssrInterpolate(version.value.release_date)}</p>`);
            if (version.value.features.length > 0) {
              _push2(`<div class="mt-6"${_scopeId}><h2 class="mb-2 text-lg font-semibold text-theme-text"${_scopeId}>Özellikler</h2><ul class="space-y-2"${_scopeId}><!--[-->`);
              ssrRenderList(version.value.features, (feature) => {
                _push2(`<li class="flex items-start"${_scopeId}><span class="mr-2 text-blue-500"${_scopeId}>•</span><div${_scopeId}><strong class="font-bold text-theme-text"${_scopeId}>${ssrInterpolate(feature.feature_name)}:</strong><span class="whitespace-pre-line text-theme-text"${_scopeId}>${ssrInterpolate(feature.feature_detail)}</span></div></li>`);
              });
              _push2(`<!--]--></ul></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (version.value.bugs.length > 0) {
              _push2(`<div class="mt-6"${_scopeId}><h2 class="mb-2 text-lg font-semibold text-theme-text"${_scopeId}>Düzeltilen Hatalar</h2><ul class="space-y-2"${_scopeId}><!--[-->`);
              ssrRenderList(version.value.bugs, (bug) => {
                _push2(`<li class="flex items-start"${_scopeId}><span class="mr-2 text-red-500"${_scopeId}>•</span><div${_scopeId}><strong class="text-theme-text"${_scopeId}>${ssrInterpolate(bug.bug_name)}:</strong><span class="text-theme-text"${_scopeId}>${ssrInterpolate(bug.bug_detail)}</span></div></li>`);
              });
              _push2(`<!--]--></ul></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "rounded-lg bg-theme-background p-6 text-theme-text" }, [
                createVNode("div", { class: "mb-4 flex items-center justify-between border-b pb-4" }, [
                  createVNode("h1", { class: "text-2xl font-medium text-theme-text" }, toDisplayString(version.value.version), 1),
                  unref(props).auth.user ? (openBlock(), createBlock(unref(Link), {
                    key: 0,
                    href: `/versions/${version.value.id}/edit`,
                    class: "text-sm font-medium text-theme-text-light hover:text-theme-text"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Bu versiyonu düzenle ")
                    ]),
                    _: 1
                  }, 8, ["href"])) : createCommentVNode("", true)
                ]),
                createVNode("p", { class: "text-sm text-theme-text" }, toDisplayString(version.value.release_date), 1),
                version.value.features.length > 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "mt-6"
                }, [
                  createVNode("h2", { class: "mb-2 text-lg font-semibold text-theme-text" }, "Özellikler"),
                  createVNode("ul", { class: "space-y-2" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(version.value.features, (feature) => {
                      return openBlock(), createBlock("li", {
                        key: feature.id,
                        class: "flex items-start"
                      }, [
                        createVNode("span", { class: "mr-2 text-blue-500" }, "•"),
                        createVNode("div", null, [
                          createVNode("strong", { class: "font-bold text-theme-text" }, toDisplayString(feature.feature_name) + ":", 1),
                          createVNode("span", { class: "whitespace-pre-line text-theme-text" }, toDisplayString(feature.feature_detail), 1)
                        ])
                      ]);
                    }), 128))
                  ])
                ])) : createCommentVNode("", true),
                version.value.bugs.length > 0 ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "mt-6"
                }, [
                  createVNode("h2", { class: "mb-2 text-lg font-semibold text-theme-text" }, "Düzeltilen Hatalar"),
                  createVNode("ul", { class: "space-y-2" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(version.value.bugs, (bug) => {
                      return openBlock(), createBlock("li", {
                        key: bug.id,
                        class: "flex items-start"
                      }, [
                        createVNode("span", { class: "mr-2 text-red-500" }, "•"),
                        createVNode("div", null, [
                          createVNode("strong", { class: "text-theme-text" }, toDisplayString(bug.bug_name) + ":", 1),
                          createVNode("span", { class: "text-theme-text" }, toDisplayString(bug.bug_detail), 1)
                        ])
                      ]);
                    }), 128))
                  ])
                ])) : createCommentVNode("", true)
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
