import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderSlot } from "vue/server-renderer";
const _sfc_main$1 = {
  __name: "TextInput",
  __ssrInlineRender: true,
  props: {
    label: String,
    id: String,
    modelValue: String,
    type: {
      type: String,
      default: "text"
    },
    labelClass: {
      type: String,
      default: "block font-semibold mb-2 text-sm text-theme-text"
    },
    inputClass: {
      type: String,
      default: `
      block w-full px-4 py-2 border border-gray-300 rounded-lg 
      bg-gray-50 text-sm text-black
      focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100
      transition-shadow duration-150 ease-in-out
    `
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative mb-6" }, _attrs))}><label${ssrRenderAttr("for", __props.id)} class="${ssrRenderClass(__props.labelClass)}">${ssrInterpolate(__props.label)}</label><input${ssrRenderAttr("value", __props.modelValue)}${ssrRenderAttr("type", __props.type)}${ssrRenderAttr("id", __props.id)} class="${ssrRenderClass(__props.inputClass)}"></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CekapUI/Inputs/TextInput.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Form",
  __ssrInlineRender: true,
  props: {
    onSubmit: Function
  },
  emits: ["submit"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<form${ssrRenderAttrs(mergeProps({ class: "mx-auto w-[90%]" }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</form>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CekapUI/Forms/Form.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _,
  _sfc_main$1 as a
};
