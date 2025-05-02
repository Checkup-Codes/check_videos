import { computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderSlot } from "vue/server-renderer";
const _sfc_main = {
  __name: "Button",
  __ssrInlineRender: true,
  props: {
    variant: {
      type: String,
      default: "primary",
      validator: (value) => [
        "default",
        "primary",
        "secondary",
        "accent",
        "info",
        "success",
        "warning",
        "error",
        "link",
        "ghost",
        "neutral"
      ].includes(value)
    },
    size: {
      type: String,
      default: "md",
      validator: (value) => ["xs", "sm", "md", "lg"].includes(value)
    },
    outline: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    },
    circle: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    animated: {
      type: Boolean,
      default: true
    }
  },
  emits: ["click"],
  setup(__props) {
    const props = __props;
    const variantClass = computed(() => {
      if (props.variant === "default") return "";
      return `btn-${props.variant}`;
    });
    const sizeClass = computed(() => {
      if (props.size === "md") return "";
      return `btn-${props.size}`;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        class: [
          "btn",
          variantClass.value,
          sizeClass.value,
          { "btn-outline": __props.outline },
          { "btn-block": __props.block },
          { "btn-circle": __props.circle },
          { "btn-loading": __props.loading },
          { "no-animation": !__props.animated }
        ],
        disabled: __props.disabled || __props.loading
      }, _attrs))}>`);
      if (!__props.loading) {
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      } else {
        _push(`<!---->`);
      }
      if (__props.loading) {
        _push(`<span class="loading loading-spinner"></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/_components/Button.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
