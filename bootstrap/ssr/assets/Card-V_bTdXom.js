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
      validator: (value) => ["default", "primary", "secondary", "destructive"].includes(value)
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
          return "bg-primary text-primary-foreground border-primary";
        case "secondary":
          return "bg-secondary text-secondary-foreground border-secondary";
        case "destructive":
          return "bg-destructive text-destructive-foreground border-destructive";
        default:
          return "bg-card text-card-foreground border-border";
      }
    });
    const shadowClass = computed(() => {
      return props.elevated ? "shadow-lg" : "shadow-sm";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: [
          "rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-200",
          shadowClass.value,
          bgClass.value
        ]
      }, _attrs))}><div class="${ssrRenderClass(["p-6", { "p-4": __props.compact }])}">`);
      if (_ctx.$slots.header || __props.title) {
        _push(`<div class="mb-4 flex items-center justify-between"><div class="flex items-center gap-2">`);
        ssrRenderSlot(_ctx.$slots, "icon", {}, null, _push, _parent);
        _push(`<h2 class="text-lg font-semibold text-card-foreground">${ssrInterpolate(__props.title)}</h2></div>`);
        ssrRenderSlot(_ctx.$slots, "action", {}, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      if (_ctx.$slots.footer) {
        _push(`<div class="mt-4 flex justify-end">`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/UI/Card.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
