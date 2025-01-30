import { resolveComponent, withCtx, unref, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./CheckSubsidebar-CzPQxoDS.js";
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
      return props.currentUrl === `${href}` ? "px-4 border-l-4 text-theme-text border-primary-500 bg-primary-100 shadow-inner hover:bg-primary-100" : "px-4 bg-theme-background text-theme-text";
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ThemeCustomizer = resolveComponent("ThemeCustomizer");
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(__props.versions, (version) => {
              _push2(`<div class="border-theme"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: `/versions/${version.version}`,
                class: [getLinkClasses(`/versions/${version.version}`), "block rounded-sm duration-200 ease-in-out"]
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="px-3 py-2"${_scopeId2}><div class="text-sm font-semibold"${_scopeId2}>${ssrInterpolate(version.version)}</div><div class="flex items-center"${_scopeId2}><div class="text-sm"${_scopeId2}>${ssrInterpolate(version.release_date)}</div></div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "px-3 py-2" }, [
                        createVNode("div", { class: "text-sm font-semibold" }, toDisplayString(version.version), 1),
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "text-sm" }, toDisplayString(version.release_date), 1)
                        ])
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div>`);
            });
            _push2(`<!--]-->`);
            _push2(ssrRenderComponent(_component_ThemeCustomizer, null, null, _parent2, _scopeId));
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(__props.versions, (version) => {
                return openBlock(), createBlock("div", {
                  class: "border-theme",
                  key: version.id
                }, [
                  createVNode(unref(Link), {
                    href: `/versions/${version.version}`,
                    class: [getLinkClasses(`/versions/${version.version}`), "block rounded-sm duration-200 ease-in-out"]
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "px-3 py-2" }, [
                        createVNode("div", { class: "text-sm font-semibold" }, toDisplayString(version.version), 1),
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "text-sm" }, toDisplayString(version.release_date), 1)
                        ])
                      ])
                    ]),
                    _: 2
                  }, 1032, ["href", "class"])
                ]);
              }), 128)),
              createVNode(_component_ThemeCustomizer)
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
