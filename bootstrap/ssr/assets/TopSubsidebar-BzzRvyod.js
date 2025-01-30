import { mergeProps, useSSRContext, unref, withCtx, createTextVNode, createVNode } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$2 } from "./Button-CWlX4hVa.js";
const _sfc_main$1 = {
  __name: "ToggleSubSidebarButton",
  __ssrInlineRender: true,
  props: {
    isCollapsed: Boolean,
    toggle: Function
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        class: ["top-1/2 z-50 hidden h-8 w-8 -translate-y-1/2 transform items-center rounded-full border-2 bg-white pb-0.5 text-black shadow-lg transition-all duration-300 ease-in-out hover:bg-gray-100 hover:shadow-xl lg:absolute lg:block", [__props.isCollapsed ? "left-52" : "-right-4"]]
      }, _attrs))}><span class="items-center text-xl"> ⇔</span></button>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CekapUI/Buttons/ToggleSubSidebarButton.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "TopSubsidebar",
  __ssrInlineRender: true,
  props: {
    title: String,
    href: String
  },
  setup(__props) {
    var _a;
    const { props } = usePage();
    const userName = (_a = props.auth.user) == null ? void 0 : _a.name;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "border-color-one overflow-hidden border-b-2 lg:relative" }, _attrs))}><div class="flex h-12 items-center justify-between px-5 text-sm font-semibold"><span class="">${ssrInterpolate(__props.title)}</span>`);
      if (unref(userName)) {
        _push(ssrRenderComponent(unref(Link), {
          href: __props.href,
          class: "text-primary-500"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$2, {
                title: __props.title,
                size: "xsmall"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` + `);
                  } else {
                    return [
                      createTextVNode(" + ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_sfc_main$2, {
                  title: __props.title,
                  size: "xsmall"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" + ")
                  ]),
                  _: 1
                }, 8, ["title"])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CekapUI/Typography/TopSubsidebar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main$1 as _,
  _sfc_main as a
};
