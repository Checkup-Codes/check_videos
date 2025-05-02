import { mergeProps, unref, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderComponent } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./Button-CxoVCCz0.js";
const _sfc_main = {
  __name: "TopSubsidebar",
  __ssrInlineRender: true,
  props: {
    title: String,
    href: String,
    showExpandCollapseButton: {
      type: Boolean,
      default: false
    },
    isExpanded: {
      type: Boolean,
      default: false
    }
  },
  emits: ["toggle-expand"],
  setup(__props) {
    var _a;
    const { props } = usePage();
    const userName = (_a = props.auth.user) == null ? void 0 : _a.name;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "border-color-one overflow-hidden border-b-2 lg:relative" }, _attrs))}><div class="flex h-12 items-center justify-between px-5 text-sm font-semibold"><span class="">${ssrInterpolate(__props.title)}</span><div class="flex items-center gap-2">`);
      if (__props.showExpandCollapseButton) {
        _push(`<button class="btn btn-ghost btn-xs"${ssrRenderAttr("title", __props.isExpanded ? "Tümünü Daralt" : "Tümünü Genişlet")}><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">`);
        if (__props.isExpanded) {
          _push(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>`);
        } else {
          _push(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>`);
        }
        _push(`</svg></button>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(userName)) {
        _push(ssrRenderComponent(unref(Link), {
          href: __props.href,
          class: "text-primary-500"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$1, {
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
                createVNode(_sfc_main$1, {
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
      _push(`</div></div></div>`);
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
  _sfc_main as _
};
