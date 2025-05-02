import { computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderSlot } from "vue/server-renderer";
const _sfc_main = {
  __name: "TextField",
  __ssrInlineRender: true,
  props: {
    modelValue: {
      type: [String, Number],
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
    },
    rows: {
      type: [String, Number],
      default: 3
    },
    variant: {
      type: String,
      default: "default",
      validator: (value) => ["default", "primary", "secondary", "accent", "info", "success", "warning", "error", "ghost"].includes(value)
    },
    size: {
      type: String,
      default: "md",
      validator: (value) => ["xs", "sm", "md", "lg"].includes(value)
    },
    bordered: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ""
    },
    hint: {
      type: String,
      default: ""
    },
    optional: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue"],
  setup(__props) {
    const props = __props;
    const sizeClass = computed(() => {
      switch (props.size) {
        case "xs":
          return props.type === "textarea" ? "textarea-xs" : "input-xs";
        case "sm":
          return props.type === "textarea" ? "textarea-sm" : "input-sm";
        case "lg":
          return props.type === "textarea" ? "textarea-lg" : "input-lg";
        default:
          return "";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "form-control w-full" }, _attrs))}>`);
      if (__props.label) {
        _push(`<label class="label"><span class="label-text">${ssrInterpolate(__props.label)}</span>`);
        if (__props.optional) {
          _push(`<span class="label-text-alt opacity-70">Opsiyonel</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</label>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="relative">`);
      if (__props.type !== "textarea") {
        _push(`<input${ssrRenderAttr("type", __props.type)}${ssrRenderAttr("value", __props.modelValue)}${ssrRenderAttr("placeholder", __props.placeholder)}${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""}${ssrIncludeBooleanAttr(__props.readonly) ? " readonly" : ""} class="${ssrRenderClass([
          "input w-full",
          { "input-bordered": __props.bordered },
          { "input-primary": __props.variant === "primary" },
          { "input-secondary": __props.variant === "secondary" },
          { "input-accent": __props.variant === "accent" },
          { "input-info": __props.variant === "info" },
          { "input-success": __props.variant === "success" },
          { "input-warning": __props.variant === "warning" },
          { "input-error": __props.variant === "error" || __props.error },
          { "input-ghost": __props.variant === "ghost" },
          sizeClass.value
        ])}">`);
      } else {
        _push(`<textarea${ssrRenderAttr("placeholder", __props.placeholder)}${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""}${ssrIncludeBooleanAttr(__props.readonly) ? " readonly" : ""}${ssrRenderAttr("rows", __props.rows)} class="${ssrRenderClass([
          "textarea w-full",
          { "textarea-bordered": __props.bordered },
          { "textarea-primary": __props.variant === "primary" },
          { "textarea-secondary": __props.variant === "secondary" },
          { "textarea-accent": __props.variant === "accent" },
          { "textarea-info": __props.variant === "info" },
          { "textarea-success": __props.variant === "success" },
          { "textarea-warning": __props.variant === "warning" },
          { "textarea-error": __props.variant === "error" || __props.error },
          { "textarea-ghost": __props.variant === "ghost" },
          sizeClass.value
        ])}">${ssrInterpolate(__props.modelValue)}</textarea>`);
      }
      if (_ctx.$slots.append) {
        _push(`<div class="absolute inset-y-0 right-0 flex items-center pr-3">`);
        ssrRenderSlot(_ctx.$slots, "append", {}, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (__props.error) {
        _push(`<label class="label"><span class="label-text-alt text-error">${ssrInterpolate(__props.error)}</span></label>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.hint && !__props.error) {
        _push(`<label class="label"><span class="label-text-alt">${ssrInterpolate(__props.hint)}</span></label>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/_components/TextField.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
