import { computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderSlot, ssrInterpolate } from "vue/server-renderer";
const _sfc_main = {
  __name: "Card",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      default: ""
    },
    variant: {
      type: String,
      default: "default",
      validator: (value) => ["default", "primary", "secondary", "accent", "info", "success", "warning", "error"].includes(value)
    },
    elevated: {
      type: Boolean,
      default: false
    },
    compact: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    const bgClass = computed(() => {
      switch (props.variant) {
        case "primary":
          return "bg-primary text-primary-content";
        case "secondary":
          return "bg-secondary text-secondary-content";
        case "accent":
          return "bg-accent text-accent-content";
        case "info":
          return "bg-info text-info-content";
        case "success":
          return "bg-success text-success-content";
        case "warning":
          return "bg-warning text-warning-content";
        case "error":
          return "bg-error text-error-content";
        default:
          return "bg-base-100";
      }
    });
    const shadowClass = computed(() => {
      return props.elevated ? "shadow-lg" : "shadow-sm";
    });
    const padding = computed(() => {
      return props.compact ? "p-4" : "p-6";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["card", bgClass.value, shadowClass.value, "transition-all duration-200"]
      }, _attrs))}><div class="${ssrRenderClass(["card-body", padding.value])}">`);
      if (_ctx.$slots.header || __props.title) {
        _push(`<div class="card-title flex items-center justify-between"><div class="flex items-center gap-2">`);
        ssrRenderSlot(_ctx.$slots, "icon", {}, null, _push, _parent);
        _push(`<h2>${ssrInterpolate(__props.title)}</h2></div>`);
        ssrRenderSlot(_ctx.$slots, "action", {}, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      if (_ctx.$slots.footer) {
        _push(`<div class="card-actions mt-4 justify-end">`);
        ssrRenderSlot(_ctx.$slots, "footer", {}, null, _push, _parent);
        _push(`</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/_components/Card.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
