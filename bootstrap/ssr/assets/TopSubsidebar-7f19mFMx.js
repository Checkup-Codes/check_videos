import { computed, useSSRContext, mergeProps, unref, withCtx, createTextVNode, createVNode } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderAttr, ssrRenderSlot, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
const _sfc_main$1 = {
  __name: "Button",
  __ssrInlineRender: true,
  props: {
    type: {
      type: String,
      default: "button"
    },
    variant: {
      type: String,
      default: "default",
      validator: (value) => ["default", "primary", "secondary", "outline", "destructive"].includes(value)
    },
    size: {
      type: String,
      default: "medium",
      validator: (value) => ["xsmall", "small", "medium", "large"].includes(value)
    }
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const buttonClasses = computed(() => {
      let baseClasses = "inline-flex my-2 items-center justify-center font-semibold transition-colors focus:outline-none rounded-md";
      const variantClasses = {
        default: "bg-base-300 text-base-content ",
        primary: "bg-indigo-600 text-white hover:bg-indigo-500 focus:ring-indigo-500",
        secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400",
        outline: "border border-gray-300 text-gray-900 hover:bg-gray-100 focus:ring-gray-400",
        destructive: "bg-red-600 text-white hover:bg-red-500 focus:ring-red-500"
      };
      const sizeClasses = {
        xsmall: "px-2 py-1 text-xs",
        small: "px-3 py-1 text-sm",
        medium: "px-4 py-2 text-sm",
        large: "px-6 py-3 text-base"
      };
      return `${baseClasses} ${variantClasses[props.variant]} ${sizeClasses[props.size]}`;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><button class="${ssrRenderClass(buttonClasses.value)}"${ssrRenderAttr("type", __props.type)}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</button></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CekapUI/Buttons/Button.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
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
    var _a, _b;
    const { props } = usePage();
    const userName = (_b = (_a = props.auth) == null ? void 0 : _a.user) == null ? void 0 : _b.name;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "overflow-hidden border-b-2 border-base-300 lg:relative" }, _attrs))}><div class="flex h-12 items-center justify-between px-5 text-sm font-semibold"><span class="">${ssrInterpolate(__props.title)}</span><div class="flex items-center gap-2">`);
      ssrRenderSlot(_ctx.$slots, "actions", {}, null, _push, _parent);
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
      if (unref(userName) && __props.href) {
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
