import { ssrRenderAttrs, ssrRenderClass, ssrRenderAttr, ssrRenderSlot } from "vue/server-renderer";
import { computed, useSSRContext } from "vue";
const _sfc_main = {
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CekapUI/Buttons/Button.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
