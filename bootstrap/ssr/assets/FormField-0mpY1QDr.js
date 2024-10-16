import { ref, watch, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderDynamicModel } from "vue/server-renderer";
const linkedStyle = "block font-bold mb-1 text-sm rounded";
const linkedStyle2 = "mt-1 block w-full rounded";
const _sfc_main = {
  __name: "FormField",
  __ssrInlineRender: true,
  props: {
    modelValue: {
      type: [String, Number],
      required: true
    },
    label: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: "text"
    },
    id: {
      type: String,
      required: true
    },
    error: {
      type: String,
      default: ""
    }
  },
  emits: ["update:modelValue", "clearError"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const value = ref(props.modelValue);
    watch(value, (newValue) => {
      emit("update:modelValue", newValue);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mb-4" }, _attrs))}><label${ssrRenderAttr("for", __props.id)} class="${ssrRenderClass(linkedStyle)}">${ssrInterpolate(__props.label)}</label><input${ssrRenderAttr("type", __props.type)}${ssrRenderAttr("id", __props.id)} class="${ssrRenderClass(linkedStyle2)}"${ssrRenderDynamicModel(__props.type, value.value, null)}>`);
      if (__props.error) {
        _push(`<p class="text-sm text-red-500">${ssrInterpolate(__props.error)}</p>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WritesCategories/Writes/Create/FormField.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
