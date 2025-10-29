import { computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderSlot } from "vue/server-renderer";
const _sfc_main = {
  __name: "CheckSubsidebar",
  __ssrInlineRender: true,
  props: {
    infoClass: {
      type: String,
      default: ""
    },
    isNarrow: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    const computedClass = computed(() => {
      const baseClasses = `${props.infoClass} bg-base-100/95 backdrop-blur-md overscroll-none border-r border-base-300/50 subsidebar-enhanced`;
      return props.isNarrow ? `${baseClasses} subsidebar-narrow` : baseClasses;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: computedClass.value }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CekapUI/Slots/CheckSubsidebar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
