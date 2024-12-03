import { ref, withCtx, unref, createTextVNode, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import dayjs from "dayjs";
import { _ as _sfc_main$1 } from "./CheckScreen-BzwoG4_t.js";
import "dayjs/locale/tr.js";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    dayjs.locale("tr");
    const { props } = usePage();
    const version = ref(props.version);
    function formattedDate(date) {
      return dayjs(date).format("D MMMM YYYY, HH:mm");
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="rounded-lg bg-white p-6 shadow-lg"${_scopeId}><div class="flex justify-between"${_scopeId}><h1 class="mb-4 text-3xl font-bold"${_scopeId}>${ssrInterpolate(version.value.version)}</h1>`);
            if (unref(props).auth.user) {
              _push2(ssrRenderComponent(unref(Link), {
                href: `/versions/${version.value.id}/edit`,
                class: "underline"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Bu versiyonu düzenler misin`);
                  } else {
                    return [
                      createTextVNode("Bu versiyonu düzenler misin")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><p class="text-gray-500"${_scopeId}>${ssrInterpolate(formattedDate(version.value.created_at))}</p>`);
            if (version.value.features.length > 0) {
              _push2(`<div class="mt-6"${_scopeId}><h2 class="mb-2 text-xl font-semibold"${_scopeId}>Özellikler:</h2><ul class="list-inside list-disc"${_scopeId}><!--[-->`);
              ssrRenderList(version.value.features, (feature) => {
                _push2(`<li${_scopeId}><strong${_scopeId}>${ssrInterpolate(feature.feature_name)}:</strong> ${ssrInterpolate(feature.feature_detail)}</li>`);
              });
              _push2(`<!--]--></ul></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (version.value.bugs.length > 0) {
              _push2(`<div class="mt-6"${_scopeId}><h2 class="mb-2 text-xl font-semibold"${_scopeId}>Düzeltilen Hatalar:</h2><ul class="list-inside list-disc"${_scopeId}><!--[-->`);
              ssrRenderList(version.value.bugs, (bug) => {
                _push2(`<li${_scopeId}><strong${_scopeId}>${ssrInterpolate(bug.bug_name)}:</strong> ${ssrInterpolate(bug.bug_detail)}</li>`);
              });
              _push2(`<!--]--></ul></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "rounded-lg bg-white p-6 shadow-lg" }, [
                createVNode("div", { class: "flex justify-between" }, [
                  createVNode("h1", { class: "mb-4 text-3xl font-bold" }, toDisplayString(version.value.version), 1),
                  unref(props).auth.user ? (openBlock(), createBlock(unref(Link), {
                    key: 0,
                    href: `/versions/${version.value.id}/edit`,
                    class: "underline"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Bu versiyonu düzenler misin")
                    ]),
                    _: 1
                  }, 8, ["href"])) : createCommentVNode("", true)
                ]),
                createVNode("p", { class: "text-gray-500" }, toDisplayString(formattedDate(version.value.created_at)), 1),
                version.value.features.length > 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "mt-6"
                }, [
                  createVNode("h2", { class: "mb-2 text-xl font-semibold" }, "Özellikler:"),
                  createVNode("ul", { class: "list-inside list-disc" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(version.value.features, (feature) => {
                      return openBlock(), createBlock("li", {
                        key: feature.id
                      }, [
                        createVNode("strong", null, toDisplayString(feature.feature_name) + ":", 1),
                        createTextVNode(" " + toDisplayString(feature.feature_detail), 1)
                      ]);
                    }), 128))
                  ])
                ])) : createCommentVNode("", true),
                version.value.bugs.length > 0 ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "mt-6"
                }, [
                  createVNode("h2", { class: "mb-2 text-xl font-semibold" }, "Düzeltilen Hatalar:"),
                  createVNode("ul", { class: "list-inside list-disc" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(version.value.bugs, (bug) => {
                      return openBlock(), createBlock("li", {
                        key: bug.id
                      }, [
                        createVNode("strong", null, toDisplayString(bug.bug_name) + ":", 1),
                        createTextVNode(" " + toDisplayString(bug.bug_detail), 1)
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
